"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Maximize2, Minus } from "lucide-react";
import type { Messages } from "@/i18n/en";
import { countryName } from "@/data/countries";
import { ChileFlag } from "@/components/chile-flag";
import { CountryFlag } from "@/components/country-flag";
import { PlannerWizard } from "@/components/planner-wizard";
import { usePlanner } from "@/components/planner-context";
import { seedFromSearchParams } from "@/lib/plan-seed";
import { cn } from "@/lib/cn";

export function PlannerDesk({ messages }: { messages: Messages }) {
  const { open, plan, locale, minimize, openPlanner, hydratePlan } = usePlanner();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useRef(false);
  const [mounted, setMounted] = useState(false);
  const home = `/${locale}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hydrated.current) return;
    const seed = seedFromSearchParams(searchParams);
    if (!seed) return;
    hydrated.current = true;
    const forceOpen = searchParams.get("plan") === "1";
    const parts = pathname.split("/").filter(Boolean);
    const onPlanPage = parts.length === 2 && parts[1] === "plan";
    // /plan share links land on the profile desk (wizard stays closed).
    // ?plan=1 on other routes still opens the wizard (legacy deep links).
    hydratePlan(seed, { open: forceOpen && !onPlanPage });
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
          "fixed inset-0 z-[70] no-print",
          open ? "pointer-events-auto" : "hidden",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label={messages.planner.minimize}
          className="absolute inset-0 hidden bg-night/55 backdrop-blur-[6px] md:block"
          onClick={minimize}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={messages.planner.windowTitle}
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden bg-cream pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-[0_40px_80px_rgba(8,20,16,0.45)] md:inset-x-6 md:inset-y-4 md:mx-auto md:max-w-6xl md:rounded-[1.75rem] md:pt-0 md:pb-0",
            open ? "planner-window opacity-100" : "opacity-0",
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line bg-night px-4 py-3 text-cream md:px-5">
            <Link
              href={home}
              onClick={(event) => {
                event.preventDefault();
                minimize();
              }}
              className="flex min-w-0 items-center gap-3 font-display text-lg leading-tight tracking-tight text-cream md:text-xl"
              aria-label={`${messages.brand} — ${messages.nav.home}`}
              title={messages.nav.home}
            >
              <ChileFlag
                variant="circle"
                className="size-9 shrink-0 ring-2 ring-white/70 shadow-[0_6px_16px_rgba(8,20,16,0.35)]"
              />
              <span className="truncate">{messages.brand}</span>
            </Link>
            <button
              type="button"
              onClick={minimize}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-cream hover:bg-white/10"
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
