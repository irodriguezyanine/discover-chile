"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Maximize2, Minus } from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { TravelStyle } from "@/data/types";
import { countryName } from "@/data/countries";
import { ChileFlag } from "@/components/chile-flag";
import { CountryFlag } from "@/components/country-flag";
import { PlannerWizard } from "@/components/planner-wizard";
import { usePlanner } from "@/components/planner-context";
import type { PlannerInput } from "@/lib/estimate";
import { cn } from "@/lib/cn";

export function PlannerDesk({ messages }: { messages: Messages }) {
  const { open, plan, locale, minimize, openPlanner, hydratePlan } = usePlanner();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hydrated.current) return;
    const seed = seedFromParams(searchParams);
    if (!seed) return;
    hydrated.current = true;
    hydratePlan(seed);
    router.replace(pathname);
  }, [hydratePlan, pathname, router, searchParams]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") minimize();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, minimize]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 no-print",
          open ? "pointer-events-auto" : "hidden",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label={messages.planner.minimize}
          className="absolute inset-0 bg-night/55 backdrop-blur-[6px]"
          onClick={minimize}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={messages.planner.windowTitle}
          className={cn(
            "absolute inset-x-0 top-0 bottom-0 flex max-w-6xl flex-col overflow-hidden bg-cream shadow-[0_40px_80px_rgba(8,20,16,0.45)] md:inset-x-6 md:top-[4.6rem] md:bottom-3 md:mx-auto md:rounded-[1.75rem]",
            open ? "planner-window opacity-100" : "opacity-0",
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line bg-night px-4 py-3 text-cream md:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <ChileFlag
                variant="circle"
                className="hidden size-9 shrink-0 ring-2 ring-white/80 shadow-md md:block"
              />
              <div className="min-w-0">
                <p className="hidden text-[10px] uppercase tracking-[0.28em] text-glacier md:block">
                  Discover Chile
                </p>
                <p className="truncate font-display text-lg leading-tight md:text-xl">
                  {messages.planner.windowTitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={minimize}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-cream hover:bg-white/10"
              title={messages.planner.minimize}
              aria-label={messages.planner.minimize}
            >
              <Minus size={18} />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <PlannerWizard messages={messages} />
          </div>
        </div>
      </div>

      {!open ? (
        <button
          type="button"
          onClick={() => openPlanner()}
          className="planner-dock no-print fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-night px-2 py-2 pr-4 text-cream shadow-[0_18px_50px_rgba(8,20,16,0.4)] ring-1 ring-white/10"
        >
          <ChileFlag
            variant="circle"
            className="size-11 shrink-0 ring-2 ring-white/70"
          />
          <span className="text-left">
            <span className="block text-[10px] uppercase tracking-[0.22em] text-glacier">
              {messages.planner.restore}
            </span>
            <span className="flex items-center gap-2 text-sm">
              <CountryFlag code={plan.country} className="size-4" />
              {countryName(plan.country, locale)}
              <span className="text-cream/45">·</span>
              {plan.travelers}
              <span className="text-cream/45">·</span>
              {plan.days}
              {messages.common.days}
            </span>
          </span>
          <Maximize2 size={16} className="ml-1 text-glacier" />
        </button>
      ) : null}
    </>
  );
}

function readNumber(value: string | null) {
  if (value == null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function seedFromParams(
  params: URLSearchParams,
): Partial<PlannerInput> | null {
  const country = params.get("c") || undefined;
  const days = readNumber(params.get("d"));
  const travelers = readNumber(params.get("t"));
  const budgetUsd = readNumber(params.get("b"));
  const budgetFlexibleParam = params.get("bf");
  const style = (params.get("s") as TravelStyle | null) || undefined;
  const regions = params.get("r")?.split(",").filter(Boolean);
  const interests = params.get("i")?.split(",").filter(Boolean);
  const eco = params.get("eco");
  const openFlag = params.get("plan") === "1";
  if (
    !openFlag &&
    !country &&
    days == null &&
    travelers == null &&
    budgetUsd == null &&
    budgetFlexibleParam == null &&
    !style &&
    !regions &&
    !interests &&
    !eco
  ) {
    return null;
  }
  const seed: Partial<PlannerInput> = {};
  if (country) seed.country = country;
  if (days != null) seed.days = days;
  if (travelers != null) seed.travelers = travelers;
  if (budgetUsd != null) seed.budgetUsd = budgetUsd;
  if (budgetFlexibleParam === "1") seed.budgetFlexible = true;
  if (budgetFlexibleParam === "0") seed.budgetFlexible = false;
  if (style) seed.style = style;
  if (regions?.length) seed.regions = regions;
  if (interests?.length) seed.interests = interests;
  if (eco === "1") seed.eco = true;
  if (eco === "0") seed.eco = false;
  return seed;
}
