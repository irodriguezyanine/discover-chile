"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getCountryProfile } from "@/data/countries";
import type { PlannerInput } from "@/lib/estimate";
import { planStepIndex } from "@/lib/plan-steps";
import { persistGuestToSupabase } from "@/lib/supabase/guests";

export const initialPlan: PlannerInput = {
  country: "US",
  travelers: 2,
  days: 12,
  budgetUsd: 2000,
  budgetFlexible: true,
  style: "mid",
  interests: [],
  regions: [],
  eco: false,
};

export type GuestProfile = {
  name: string;
  country: string;
  cursor: string;
  party?: string;
  travelers?: number;
  motive?: string;
  firstChile?: boolean;
  days?: number;
  style?: PlannerInput["style"];
  onboarded?: boolean;
  onboardedSteps?: number;
};

type PlannerContextValue = {
  open: boolean;
  plan: PlannerInput;
  step: number;
  locale: Locale;
  gate: boolean;
  guest: GuestProfile | null;
  setStep: Dispatch<SetStateAction<number>>;
  updatePlan: (patch: Partial<PlannerInput>) => void;
  hydratePlan: (seed: Partial<PlannerInput>) => void;
  openPlanner: (seed?: Partial<PlannerInput>) => void;
  minimize: () => void;
  completeOnboarding: (
    profile: GuestProfile,
    next?: "home" | "plan",
  ) => void;
  skipGate: () => void;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);

const GUEST_KEY = "discoverchile.guest";
const GATE_KEY = "discoverchile.gate";

function isHomePath(pathname: string) {
  return pathname.split("/").filter(Boolean).length === 1;
}

let cachedGuestRaw: string | null = null;
let cachedGuest: GuestProfile | null = null;

function readGuest(): GuestProfile | null {
  try {
    const raw = window.localStorage.getItem(GUEST_KEY);
    if (raw === cachedGuestRaw) return cachedGuest;
    cachedGuestRaw = raw;
    if (!raw) {
      cachedGuest = null;
      return null;
    }
    cachedGuest = JSON.parse(raw) as GuestProfile;
    return cachedGuest;
  } catch {
    cachedGuestRaw = null;
    cachedGuest = null;
    return null;
  }
}

function readGateOpen() {
  const guest = readGuest();
  const skipped = window.localStorage.getItem(GATE_KEY) === "skip";
  return !(guest?.onboarded || skipped);
}

function subscribeStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function planFromGuest(guest: GuestProfile): PlannerInput {
  return {
    ...initialPlan,
    country: guest.country,
    eco: getCountryProfile(guest.country).ecoBias,
    travelers: guest.travelers ?? initialPlan.travelers,
    days: guest.days ?? initialPlan.days,
    style: guest.style ?? initialPlan.style,
  };
}

export function PlannerProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const storedGuest = useSyncExternalStore(
    subscribeStorage,
    readGuest,
    () => null,
  );
  const storedGate = useSyncExternalStore(
    subscribeStorage,
    readGateOpen,
    () => false,
  );

  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<PlannerInput>(initialPlan);
  const [step, setStep] = useState(0);
  const [gateOverride, setGateOverride] = useState<boolean | null>(null);
  const [guestOverride, setGuestOverride] = useState<
    GuestProfile | null | undefined
  >(undefined);
  const [planTouched, setPlanTouched] = useState(false);
  const home = `/${locale}`;

  const guest = guestOverride === undefined ? storedGuest : guestOverride;
  const gate = gateOverride ?? storedGate;
  const guestSeedPlan = useMemo(
    () => (storedGuest ? planFromGuest(storedGuest) : null),
    [storedGuest],
  );
  const planValue =
    !planTouched && guestOverride === undefined && guestSeedPlan
      ? guestSeedPlan
      : plan;

  const updatePlan = useCallback((patch: Partial<PlannerInput>) => {
    setPlanTouched(true);
    setPlan((current) => ({ ...current, ...patch }));
  }, []);

  const hydratePlan = useCallback(
    (seed: Partial<PlannerInput>) => {
      setPlanTouched(true);
      setPlan((current) => {
        const next = { ...current, ...seed };
        if (seed.country) {
          next.eco = seed.eco ?? getCountryProfile(seed.country).ecoBias;
        }
        return next;
      });
      if (seed.regions?.length) {
        setStep(planStepIndex("regions", guest));
      }
      setOpen(true);
      setGateOverride(false);
    },
    [guest],
  );

  const goHome = useCallback(() => {
    if (!isHomePath(pathname)) router.push(home);
  }, [home, pathname, router]);

  const openPlanner = useCallback(
    (seed?: Partial<PlannerInput>) => {
      if (seed) {
        setPlanTouched(true);
        setPlan((current) => {
          const next = { ...current, ...seed };
          if (seed.regions?.length) {
            next.regions = Array.from(
              new Set([...current.regions, ...seed.regions]),
            );
          }
          if (seed.country) {
            next.eco = seed.eco ?? getCountryProfile(seed.country).ecoBias;
          }
          return next;
        });
        if (seed.regions?.length) {
          setStep(planStepIndex("regions", guest));
        }
      }
      setGateOverride(false);
      setOpen(true);
      goHome();
    },
    [goHome, guest],
  );

  const minimize = useCallback(() => {
    setOpen(false);
    goHome();
  }, [goHome]);

  const completeOnboarding = useCallback(
    (profile: GuestProfile, next: "home" | "plan" = "home") => {
      const saved: GuestProfile = { ...profile, onboarded: true };
      window.localStorage.setItem(GUEST_KEY, JSON.stringify(saved));
      window.localStorage.setItem(GATE_KEY, "done");
      setGuestOverride(saved);
      setPlanTouched(true);
      setPlan(planFromGuest(saved));
      setGateOverride(false);
      if (next === "plan") {
        setOpen(true);
        // Welcome already collected country — plan steps start at party (index 0).
        setStep(planStepIndex("party", saved));
      }
      void persistGuestToSupabase({
        name: saved.name,
        country: saved.country,
        cursor: saved.cursor,
        travelers: saved.travelers,
        days: saved.days,
        style: saved.style,
      });
      goHome();
    },
    [goHome],
  );

  const skipGate = useCallback(() => {
    window.localStorage.setItem(GATE_KEY, "skip");
    setGateOverride(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      plan: planValue,
      step,
      locale,
      gate,
      guest,
      setStep,
      updatePlan,
      hydratePlan,
      openPlanner,
      minimize,
      completeOnboarding,
      skipGate,
    }),
    [
      open,
      planValue,
      step,
      locale,
      gate,
      guest,
      updatePlan,
      hydratePlan,
      openPlanner,
      minimize,
      completeOnboarding,
      skipGate,
    ],
  );

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used within PlannerProvider");
  }
  return context;
}
