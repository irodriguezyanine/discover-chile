"use client";

import { useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { ChileFlag } from "@/components/chile-flag";
import { WelcomeIdentityFields } from "@/components/welcome-identity-fields";
import { persistCursor } from "@/data/cursors";
import { usePlanner, type GuestProfile } from "@/components/planner-context";

const DRAFT_KEY = "discoverchile.identity.draft";

type Draft = {
  name?: string;
  country?: string;
  cursor?: string;
};

function readDraft(): Draft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function initialIdentity(guest: GuestProfile | null) {
  const draft = readDraft();
  if (draft?.name) {
    return {
      name: draft.name,
      country: draft.country || "US",
      cursor: draft.cursor || "moai",
    };
  }
  if (guest?.name) {
    return {
      name: guest.name,
      country: guest.country || "US",
      cursor: guest.cursor || "moai",
    };
  }
  return { name: "", country: "US", cursor: "moai" };
}

function useHasMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
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
  const boot = initialIdentity(guest);
  const [name, setName] = useState(boot.name);
  const [country, setCountry] = useState(boot.country);
  const [cursor, setCursor] = useState(boot.cursor);
  const ready = name.trim().length >= 2 && Boolean(country);

  const finish = (next: "home" | "plan") => {
    if (!ready) return;
    persistCursor(cursor);
    sessionStorage.removeItem(DRAFT_KEY);
    completeOnboarding(
      {
        name: name.trim(),
        country,
        cursor,
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
      className="welcome-screen fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-sand px-5 py-10 md:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="desk-welcome-title"
    >
      <div className="mx-auto w-full max-w-[34rem] pb-8">
        {alreadyOnboarded ? (
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(DRAFT_KEY);
              skipGate();
              openPlanner();
            }}
            className="mb-6 h-11 rounded-full bg-white px-4 text-sm ring-1 ring-black/10"
          >
            {messages.planner.back}
          </button>
        ) : null}

        <ChileFlag
          variant="circle"
          className="welcome-flag mx-auto size-24"
        />
        <h1
          id="desk-welcome-title"
          className="mt-6 text-center font-display text-4xl leading-tight"
        >
          {desk.phoneWelcome}
        </h1>
        <p className="mt-3 text-center text-sm text-ink-soft">
          {desk.phoneWelcomeLead}
        </p>

        <div className="mt-8">
          <WelcomeIdentityFields
            locale={locale}
            messages={messages}
            name={name}
            onName={setName}
            country={country}
            onCountry={setCountry}
            cursor={cursor}
            onCursor={setCursor}
            onBeforeLocale={() => {
              sessionStorage.setItem(
                DRAFT_KEY,
                JSON.stringify({ name, country, cursor }),
              );
            }}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!ready}
            onClick={() => finish("home")}
            className="h-12 rounded-full bg-white text-sm font-medium ring-1 ring-black/10 disabled:opacity-40"
          >
            {desk.deskGoHome}
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => finish("plan")}
            className="h-12 rounded-full bg-terracotta text-sm font-medium text-cream disabled:opacity-40"
          >
            {desk.deskPlanTrip}
          </button>
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
