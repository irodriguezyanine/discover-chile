"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getCountryProfile } from "@/data/countries";
import type { PlannerInput } from "@/lib/estimate";

export const initialPlan: PlannerInput = {
  country: "US",
  travelers: 2,
  days: 12,
  budgetUsd: 4000,
  style: "mid",
  interests: [],
  regions: [],
  eco: false,
};

type PlannerContextValue = {
  open: boolean;
  plan: PlannerInput;
  step: number;
  locale: Locale;
  setStep: Dispatch<SetStateAction<number>>;
  updatePlan: (patch: Partial<PlannerInput>) => void;
  hydratePlan: (seed: Partial<PlannerInput>) => void;
  openPlanner: (seed?: Partial<PlannerInput>) => void;
  minimize: () => void;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);

function isHomePath(pathname: string) {
  return pathname.split("/").filter(Boolean).length === 1;
}

export function PlannerProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(() => isHomePath(pathname));
  const [plan, setPlan] = useState<PlannerInput>(initialPlan);
  const [step, setStep] = useState(0);
  const home = `/${locale}`;

  const updatePlan = useCallback((patch: Partial<PlannerInput>) => {
    setPlan((current) => ({ ...current, ...patch }));
  }, []);

  const hydratePlan = useCallback((seed: Partial<PlannerInput>) => {
    setPlan((current) => {
      const next = { ...current, ...seed };
      if (seed.country) {
        next.eco = seed.eco ?? getCountryProfile(seed.country).ecoBias;
      }
      return next;
    });
    if (seed.regions?.length) setStep(4);
    setOpen(true);
  }, []);

  const goHome = useCallback(() => {
    if (!isHomePath(pathname)) router.push(home);
  }, [home, pathname, router]);

  const openPlanner = useCallback(
    (seed?: Partial<PlannerInput>) => {
      if (seed) {
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
        if (seed.regions?.length) setStep(4);
      }
      setOpen(true);
      goHome();
    },
    [goHome],
  );

  const minimize = useCallback(() => {
    setOpen(false);
    goHome();
  }, [goHome]);

  const value = useMemo(
    () => ({
      open,
      plan,
      step,
      locale,
      setStep,
      updatePlan,
      hydratePlan,
      openPlanner,
      minimize,
    }),
    [open, plan, step, locale, updatePlan, hydratePlan, openPlanner, minimize],
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
