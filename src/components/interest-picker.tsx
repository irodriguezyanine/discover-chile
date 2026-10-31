"use client";

import {
  Bird,
  Check,
  Droplets,
  Footprints,
  Grape,
  Landmark,
  Mountain,
  Snowflake,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import type { Interest } from "@/data/types";
import { getDestination } from "@/data/destinations";
import {
  INTEREST_ACCENTS,
  INTEREST_ORDER,
  regionIdsForInterest,
} from "@/data/interests-meta";
import { interpolate } from "@/lib/interpolate";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

const INTEREST_ICONS: Record<Interest, LucideIcon> = {
  beach: Waves,
  desert: Droplets,
  hike: Footprints,
  wine: Grape,
  culture: Landmark,
  snow: Snowflake,
  parks: Trees,
  wildlife: Bird,
};

function interestDescription(
  messages: Messages,
  interest: Interest,
): string {
  const key = `${interest}D` as keyof typeof messages.interests;
  return messages.interests[key] ?? "";
}

export function InterestPicker({
  messages,
  locale,
  selected,
  onChange,
}: {
  messages: Messages;
  locale: Locale;
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const selectedSet = new Set(selected);
  const count = selected.length;

  const toggle = (interest: Interest) => {
    if (selectedSet.has(interest)) {
      onChange(selected.filter((item) => item !== interest));
      return;
    }
    onChange([...selected, interest]);
  };

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
          {messages.planner.interestsHint}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] tabular-nums",
              count > 0
                ? "bg-pine/10 text-pine"
                : "bg-sand-deep text-ink-soft",
            )}
          >
            {interpolate(messages.planner.interestsSelected, {
              n: String(count),
            })}
          </span>
          {count > 0 ? (
            <button
              type="button"
              onClick={() => onChange([])}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft transition hover:border-terracotta hover:text-ink"
            >
              {messages.planner.interestsClear}
            </button>
          ) : null}
        </div>
      </div>

      <div
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="group"
        aria-label={messages.planner.interestsQ}
      >
        {INTEREST_ORDER.map((interest) => {
          const active = selectedSet.has(interest);
          const Icon = INTEREST_ICONS[interest];
          const accent = INTEREST_ACCENTS[interest];
          const regions = regionIdsForInterest(interest)
            .map((id) => getDestination(id))
            .filter(Boolean)
            .slice(0, 3);

          return (
            <button
              key={interest}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(interest)}
              className={cn(
                "group relative flex min-h-[9.5rem] flex-col rounded-[1.35rem] border p-4 text-left transition duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                active
                  ? "border-pine bg-pine/[0.06] shadow-[0_10px_28px_rgba(24,64,40,0.12)]"
                  : "border-line/80 bg-white hover:-translate-y-0.5 hover:border-pine/35 hover:shadow-[0_12px_28px_rgba(16,32,24,0.08)]",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-2xl transition",
                    active
                      ? "bg-pine text-cream shadow-sm"
                      : cn(accent.soft, accent.tint, "ring-1", accent.ring),
                  )}
                >
                  {interest === "hike" ? (
                    <Mountain size={18} strokeWidth={1.75} />
                  ) : (
                    <Icon size={18} strokeWidth={1.75} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-[1.15rem] leading-tight text-ink">
                      {messages.interests[interest]}
                    </p>
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition",
                        active
                          ? "border-pine bg-pine text-cream"
                          : "border-line bg-sand-deep/40 text-transparent group-hover:border-pine/40",
                      )}
                      aria-hidden
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-ink-soft">
                    {interestDescription(messages, interest)}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft/70">
                  {messages.planner.interestsRegions}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {regions.map((destination) =>
                    destination ? (
                      <span
                        key={destination.id}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
                          active
                            ? "bg-pine/15 text-pine"
                            : "bg-sand-deep/80 text-ink-soft",
                        )}
                      >
                        {pick(destination.region, locale)}
                        <span className="text-ink-soft/50"> · </span>
                        {pick(destination.name, locale)}
                      </span>
                    ) : null,
                  )}
                </div>
              </div>

              <span
                className={cn(
                  "pointer-events-none absolute inset-x-4 bottom-0 h-0.5 rounded-full transition",
                  active ? "bg-pine/50" : "bg-transparent group-hover:bg-terracotta/35",
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
