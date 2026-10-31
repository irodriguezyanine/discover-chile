"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { ChileFlag } from "@/components/chile-flag";
import {
  type WelcomeStepId,
  WelcomeCountryStep,
  WelcomeCurrencyStep,
  WelcomeCursorStep,
  WelcomeLanguageStep,
  WelcomeNameStep,
} from "@/components/welcome-identity-fields";
import { JourneyProgress } from "@/components/journey-progress";
import { persistCursor } from "@/data/cursors";
import { usePlanner, type GuestProfile } from "@/components/planner-context";
import {
  journeyStepCount,
  welcomeProgressIndex,
  welcomeStepsForViewport,
} from "@/lib/journey-steps";

const DRAFT_KEY = "discoverchile.identity.draft";

type Draft = {
  name?: string;
  country?: string;
  cursor?: string;
  step?: WelcomeStepId;
  currencyTouched?: boolean;
};

function readDraft(): Draft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function writeDraft(draft: Draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Private mode / quota — ignore.
  }
}

function bootIdentity(guest: GuestProfile | null, steps: WelcomeStepId[]) {
  const draft = readDraft();
  const fallbackStep = steps[0] ?? "language";
  const step =
    draft?.step && steps.includes(draft.step) ? draft.step : fallbackStep;

  if (draft?.name || draft?.country || draft?.cursor || draft?.step) {
    return {
      name: draft.name || "",
      country: draft.country || "US",
      cursor: draft.cursor || "moai",
      step,
      currencyTouched: Boolean(draft.currencyTouched),
    };
  }
  if (guest?.name) {
    return {
      name: guest.name,
      country: guest.country || "US",
      cursor: guest.cursor || "moai",
      step: fallbackStep,
      currencyTouched: false,
    };
  }
  return {
    name: "",
    country: "US",
    cursor: "moai",
    step: fallbackStep,
    currencyTouched: false,
  };
}

function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

function useIsDesktop() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(min-width: 768px)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false,
  );
}

function WelcomeBackdrop({ desktop }: { desktop: boolean }) {
  const src = desktop
    ? "/welcome/chile-desktop.webp"
    : "/welcome/chile-mobile.webp";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Plain <img>: one asset, no Next image double-decode of both views. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        decoding="async"
        fetchPriority="high"
        className="welcome-bg-photo absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="welcome-bg-wash absolute inset-0" />
    </div>
  );
}

function DeskWelcomeForm({
  messages,
  locale,
  guest,
}: {
  messages: Messages;
  locale: Locale;
  guest: GuestProfile | null;
}) {
  const { completeOnboarding, skipGate, openPlanner } = usePlanner();
  const desk = messages.desk;
  const alreadyOnboarded = Boolean(guest?.onboarded);
  const isDesktop = useIsDesktop();
  const steps = welcomeStepsForViewport(isDesktop) as WelcomeStepId[];

  const bootRef = useRef<ReturnType<typeof bootIdentity> | null>(null);
  if (!bootRef.current) {
    bootRef.current = bootIdentity(guest, steps);
  }
  const boot = bootRef.current;

  const [name, setName] = useState(boot.name);
  const [country, setCountry] = useState(boot.country);
  const [cursor, setCursor] = useState(boot.cursor);
  const [currencyTouched, setCurrencyTouched] = useState(boot.currencyTouched);
  const [step, setStep] = useState<WelcomeStepId>(boot.step);

  const draftRef = useRef({
    name: boot.name,
    country: boot.country,
    cursor: boot.cursor,
    currencyTouched: boot.currencyTouched,
    step: boot.step,
  });
  const persistTimer = useRef<number | null>(null);

  const flushDraft = useCallback((patch?: Partial<Draft>) => {
    draftRef.current = { ...draftRef.current, ...patch };
    writeDraft(draftRef.current);
  }, []);

  const scheduleDraft = useCallback(
    (patch?: Partial<Draft>) => {
      draftRef.current = { ...draftRef.current, ...patch };
      if (persistTimer.current != null) {
        window.clearTimeout(persistTimer.current);
      }
      persistTimer.current = window.setTimeout(() => {
        persistTimer.current = null;
        writeDraft(draftRef.current);
      }, 280);
    },
    [],
  );

  useEffect(
    () => () => {
      if (persistTimer.current != null) {
        window.clearTimeout(persistTimer.current);
        writeDraft(draftRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!steps.includes(step)) {
      const fallback = steps[0] ?? "language";
      setStep(fallback);
      flushDraft({ step: fallback });
    }
  }, [steps, step, flushDraft]);

  const activeStep = steps.includes(step) ? step : (steps[0] ?? "language");
  const stepIndex = Math.max(0, steps.indexOf(activeStep));
  const isFirst = stepIndex <= 0;
  const isLast = stepIndex >= steps.length - 1;
  const journeyTotal = journeyStepCount(isDesktop, guest);
  const journeyCurrent = welcomeProgressIndex(activeStep, isDesktop);
  const nameReady = name.trim().length >= 2;
  const nameStepIndex = steps.indexOf("name");
  const pastName = nameReady && nameStepIndex >= 0 && stepIndex > nameStepIndex;
  const greeting = pastName
    ? `${desk.holaPo}, ${name.trim()}`
    : desk.holaPo;
  const canContinue =
    activeStep === "name"
      ? nameReady
      : activeStep === "country"
        ? Boolean(country)
        : activeStep === "cursor"
          ? Boolean(cursor)
          : true;

  const goNext = () => {
    if (!canContinue || isLast) return;
    const nextStep = steps[stepIndex + 1];
    if (!nextStep) return;
    startTransition(() => setStep(nextStep));
    flushDraft({
      step: nextStep,
      name,
      country,
      cursor,
      currencyTouched,
    });
  };

  const goBack = () => {
    if (isFirst) return;
    const prevStep = steps[stepIndex - 1];
    if (!prevStep) return;
    startTransition(() => setStep(prevStep));
    flushDraft({
      step: prevStep,
      name,
      country,
      cursor,
      currencyTouched,
    });
  };

  const finish = (next: "home" | "plan") => {
    if (!nameReady || !country) return;
    persistCursor(isDesktop ? cursor : "moai");
    sessionStorage.removeItem(DRAFT_KEY);
    completeOnboarding(
      {
        name: name.trim(),
        country,
        cursor: isDesktop ? cursor : "moai",
        party: guest?.party ?? "couple",
        travelers: guest?.travelers ?? 2,
        motive: guest?.motive ?? "vacaciones",
        firstChile: guest?.firstChile ?? true,
        days: guest?.days ?? 12,
        style: guest?.style ?? "mid",
        onboardedSteps: guest?.onboardedSteps ?? 1,
      },
      next,
    );
  };

  return (
    <div
      className="welcome-screen fixed inset-0 z-[100] flex flex-col overflow-x-hidden bg-sand px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:overflow-y-auto md:px-6 md:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="desk-welcome-title"
    >
      <WelcomeBackdrop desktop={isDesktop} />

      <div className="welcome-panel relative z-10 mx-auto my-auto flex w-full max-w-[34rem] flex-col rounded-[1.7rem] px-5 py-5 ring-1 ring-white/55 md:rounded-[2rem] md:px-8 md:py-8">
        <JourneyProgress
          total={journeyTotal}
          current={journeyCurrent}
          label={messages.planner.title}
          className="mb-5 gap-1"
        />
        {alreadyOnboarded ? (
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(DRAFT_KEY);
              skipGate();
              openPlanner();
            }}
            className="mb-4 h-11 self-start rounded-full bg-white/95 px-4 text-sm shadow-sm ring-1 ring-black/10 md:mb-6"
          >
            {messages.planner.back}
          </button>
        ) : !isFirst ? (
          <button
            type="button"
            onClick={goBack}
            className="mb-4 h-11 self-start rounded-full bg-white/95 px-4 text-sm shadow-sm ring-1 ring-black/10 md:mb-6"
          >
            {messages.planner.back}
          </button>
        ) : (
          <div className="mb-2 h-8 md:mb-6 md:h-11" aria-hidden />
        )}

        <ChileFlag
          variant="circle"
          className="welcome-flag mx-auto size-20 shadow-[0_10px_28px_rgba(16,32,24,0.18)] md:size-24"
        />

        <h1
          id="desk-welcome-title"
          className="welcome-title mt-4 text-center font-display text-3xl leading-tight text-ink md:mt-5 md:text-4xl"
        >
          {greeting}
        </h1>

        {activeStep === "language" ? (
          <p className="mt-3 text-center text-sm text-ink-soft">
            {desk.phoneWelcomeLead}
          </p>
        ) : null}

        <div className="mt-6 md:mt-8">
          {activeStep === "language" ? (
            <WelcomeLanguageStep
              locale={locale}
              title={desk.phoneLangQ}
              onBeforePick={() =>
                flushDraft({
                  name,
                  country,
                  cursor,
                  step: "language",
                  currencyTouched,
                })
              }
            />
          ) : null}

          {activeStep === "cursor" ? (
            <WelcomeCursorStep
              title={desk.deskCursorQ}
              cursor={cursor}
              onCursor={(value) => {
                setCursor(value);
                flushDraft({ cursor: value, step: "cursor" });
              }}
            />
          ) : null}

          {activeStep === "name" ? (
            <WelcomeNameStep
              title={desk.phoneNameQ}
              name={name}
              onName={(value) => {
                setName(value);
                scheduleDraft({ name: value, step: "name" });
              }}
              placeholder={desk.phoneNamePh}
            />
          ) : null}

          {activeStep === "country" ? (
            <WelcomeCountryStep
              locale={locale}
              messages={messages}
              country={country}
              currencyTouched={currencyTouched}
              onCountry={(value) => {
                setCountry(value);
                flushDraft({ country: value, step: "country" });
              }}
            />
          ) : null}

          {activeStep === "currency" ? (
            <WelcomeCurrencyStep
              title={desk.phoneCurrencyQ}
              onUserPick={() => {
                setCurrencyTouched(true);
                flushDraft({ currencyTouched: true, step: "currency" });
              }}
            />
          ) : null}
        </div>

        <div className="mt-8">
          {isLast ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => finish("home")}
                className="h-12 rounded-full bg-white text-sm font-medium shadow-sm ring-1 ring-black/10 disabled:opacity-40"
              >
                {desk.deskGoHome}
              </button>
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => finish("plan")}
                className="h-12 rounded-full bg-terracotta text-sm font-medium text-cream shadow-[0_8px_20px_rgba(196,92,38,0.22)] disabled:opacity-40"
              >
                {desk.deskPlanTrip}
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-welcome-next
              disabled={!canContinue}
              onClick={goNext}
              className="h-12 w-full rounded-full bg-terracotta text-sm font-medium text-cream shadow-[0_8px_20px_rgba(196,92,38,0.22)] disabled:opacity-40"
            >
              {desk.phoneContinue}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function DeskWelcome({
  messages,
  locale,
}: {
  messages: Messages;
  locale: Locale;
}) {
  const mounted = useHasMounted();
  const { gate, guest } = usePlanner();

  if (!mounted || !gate) return null;

  return (
    <DeskWelcomeForm messages={messages} locale={locale} guest={guest} />
  );
}
