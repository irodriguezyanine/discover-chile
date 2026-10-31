"use client";

import Image from "next/image";
import { Check, MapPinned, MoonStar, Plus } from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { destinations } from "@/data/destinations";
import { estimateTrip, type PlannerInput } from "@/lib/estimate";
import { formatMoney } from "@/lib/currency";
import { pick } from "@/i18n/loc";
import { ChileFlag } from "@/components/chile-flag";
import { cn } from "@/lib/cn";

export function RegionPicker({
  messages,
  locale,
  plan,
  eco,
  onChangeRegions,
}: {
  messages: Messages;
  locale: Locale;
  plan: PlannerInput;
  eco: boolean;
  onChangeRegions: (regions: string[]) => void;
}) {
  const selected = new Set(plan.regions);
  const ordered = [...destinations].sort((a, b) => {
    const aMatch =
      plan.interests.length === 0 ||
      a.interests.some((item) => plan.interests.includes(item));
    const bMatch =
      plan.interests.length === 0 ||
      b.interests.some((item) => plan.interests.includes(item));
    if (aMatch !== bMatch) return aMatch ? -1 : 1;
    const aOn = selected.has(a.id);
    const bOn = selected.has(b.id);
    if (aOn !== bOn) return aOn ? -1 : 1;
    return 0;
  });

  const toggle = (id: string) => {
    onChangeRegions(
      selected.has(id)
        ? plan.regions.filter((item) => item !== id)
        : [...plan.regions, id],
    );
  };

  return (
    <div className="mt-6">
      <div className="sticky top-0 z-10 -mx-1 mb-4 rounded-[1.2rem] border border-line/70 bg-cream/95 px-3 py-2.5 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
            {messages.planner.regionsHint}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
                plan.regions.length
                  ? "bg-pine text-cream"
                  : "bg-sand-deep text-ink-soft",
              )}
            >
              <MapPinned size={12} />
              {plan.regions.length} {messages.planner.addedToPlan}
            </span>
            {plan.regions.length ? (
              <button
                type="button"
                onClick={() => onChangeRegions([])}
                className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:border-terracotta hover:text-ink"
              >
                {messages.planner.interestsClear}
              </button>
            ) : null}
          </div>
        </div>
        {plan.regions.length ? (
          <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
            {plan.regions.map((id, index) => {
              const destination = destinations.find((item) => item.id === id);
              if (!destination) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pine/10 px-2.5 py-1 text-xs text-pine"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-pine text-[10px] text-cream">
                    {index + 1}
                  </span>
                  {pick(destination.name, locale)}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="grid gap-3">
        {ordered.map((destination) => {
          const active = selected.has(destination.id);
          const order = active ? plan.regions.indexOf(destination.id) + 1 : 0;
          const delta =
            estimateTrip({
              ...plan,
              eco,
              regions: active
                ? plan.regions.filter((id) => id !== destination.id)
                : [...plan.regions, destination.id],
            }).totalUsd -
            (plan.regions.length
              ? estimateTrip({ ...plan, eco }).totalUsd
              : 0);
          const camperBlocked =
            plan.style === "camper" && !destination.camperFriendly;
          const matchesInterest =
            plan.interests.length === 0 ||
            destination.interests.some((item) =>
              plan.interests.includes(item),
            );
          const interestTags = destination.interests
            .filter((item) => plan.interests.includes(item))
            .slice(0, 3);

          return (
            <button
              key={destination.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(destination.id)}
              className={cn(
                "group relative flex overflow-hidden rounded-[1.5rem] border text-left transition duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                active
                  ? "border-transparent bg-[#123024] text-cream shadow-[0_18px_40px_rgba(10,36,24,0.35)] ring-1 ring-pine/50"
                  : "border-line/70 bg-white hover:-translate-y-0.5 hover:border-pine/35 hover:shadow-[0_12px_28px_rgba(16,32,24,0.08)]",
                !matchesInterest && !active ? "opacity-50" : "",
              )}
            >
              <div className="relative h-[7.25rem] w-[5.75rem] shrink-0 sm:h-32 sm:w-36 md:w-44">
                <Image
                  src={destination.image}
                  alt={pick(destination.imageAlt, locale)}
                  fill
                  className={cn(
                    "object-cover transition duration-300",
                    active ? "scale-105 brightness-90 saturate-125" : "group-hover:scale-[1.03]",
                  )}
                  sizes="176px"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition",
                    active
                      ? "bg-gradient-to-t from-[#123024]/80 via-transparent to-black/10"
                      : "bg-gradient-to-t from-black/25 to-transparent",
                  )}
                />
                <ChileFlag
                  variant="circle"
                  className="absolute top-2 left-2 size-6 ring-1 ring-white/70"
                />
                {active ? (
                  <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-pine text-cream shadow-md ring-2 ring-cream/80">
                    <Check size={14} strokeWidth={3} />
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/90 text-ink-soft opacity-0 shadow-sm transition group-hover:opacity-100">
                    <Plus size={14} />
                  </span>
                )}
                {active ? (
                  <span className="absolute bottom-2 left-2 grid size-6 place-items-center rounded-full bg-cream font-display text-xs text-pine">
                    {order}
                  </span>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2 p-3.5 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-[10px] uppercase tracking-[0.2em]",
                        active ? "text-[#9fd0b8]" : "text-terracotta",
                      )}
                    >
                      {pick(destination.region, locale)}
                    </p>
                    <p className="mt-0.5 font-display text-[1.15rem] leading-tight sm:text-xl">
                      {pick(destination.name, locale)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium tabular-nums",
                      active
                        ? delta >= 0
                          ? "bg-white/10 text-cream"
                          : "bg-[#9fd0b8]/20 text-[#9fd0b8]"
                        : delta >= 0
                          ? "bg-sand text-ink"
                          : "bg-pine/10 text-pine",
                    )}
                  >
                    {delta >= 0 ? "+" : "−"}
                    {formatMoney(Math.abs(delta), "USD", "en")}
                  </span>
                </div>

                <p
                  className={cn(
                    "line-clamp-2 text-sm leading-snug",
                    active ? "text-cream/72" : "text-ink-soft",
                  )}
                >
                  {pick(destination.summary, locale)}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]",
                      active ? "bg-white/10 text-cream/85" : "bg-sand-deep text-ink-soft",
                    )}
                  >
                    <MoonStar size={11} />
                    {destination.minDays}–{destination.recommendedDays}{" "}
                    {messages.common.days}
                  </span>
                  {interestTags.map((interest) => (
                    <span
                      key={interest}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        active
                          ? "bg-[#9fd0b8]/20 text-[#c8ebd9]"
                          : "bg-terracotta/10 text-terracotta",
                      )}
                    >
                      {messages.interests[interest]}
                    </span>
                  ))}
                  {camperBlocked ? (
                    <span className="rounded-full bg-[#f0a3ad]/20 px-2 py-0.5 text-[10px] font-medium text-[#f0a3ad]">
                      {messages.styles.camper}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                      active
                        ? "bg-[#9fd0b8] text-[#0f241c]"
                        : "bg-sand-deep text-ink-soft group-hover:bg-pine/10 group-hover:text-pine",
                    )}
                  >
                    {active
                      ? messages.planner.addedToPlan
                      : messages.planner.addToPlan}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
