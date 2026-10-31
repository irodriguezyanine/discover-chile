"use client";

import {
  Bus,
  Car,
  Clock3,
  Leaf,
  Plane,
  Route,
  Ship,
  Sparkles,
} from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import type { TravelStyle } from "@/data/types";
import type { Estimate } from "@/lib/estimate";
import { airlines } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { formatMoney } from "@/lib/currency";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

type Mix = "flight" | "land" | "mixed" | "road" | "empty";

function placeName(id: string | null | undefined, locale: Locale) {
  if (!id) return "SCL";
  const destination = destinations.find((item) => item.id === id);
  return destination ? pick(destination.name, locale) : id;
}

export function MoveOptionsCard({
  messages,
  locale,
  estimate,
  eco,
  style,
  regions,
}: {
  messages: Messages;
  locale: Locale;
  estimate: Estimate;
  eco: boolean;
  style: TravelStyle;
  regions: string[];
}) {
  const legs = estimate.legs.filter((leg) => leg.mode !== "none");
  const flightLegs = legs.filter((leg) => leg.mode === "flight");
  const busLegs = legs.filter((leg) => leg.mode === "bus");
  const hasIsland = regions.includes("rapanui");
  const isRoad = style === "camper";

  const mix: Mix = !regions.length
    ? "empty"
    : isRoad
      ? "road"
      : flightLegs.length && busLegs.length
        ? "mixed"
        : flightLegs.length
          ? "flight"
          : busLegs.length
            ? "land"
            : hasIsland
              ? "flight"
              : "land";

  const mixLabel =
    mix === "flight"
      ? messages.planner.moveMixFlight
      : mix === "land"
        ? messages.planner.moveMixLand
        : mix === "mixed"
          ? messages.planner.moveMixMixed
          : mix === "road"
            ? messages.planner.moveMixRoad
            : messages.planner.moveMixEmpty;

  const MixIcon =
    mix === "flight" || mix === "empty"
      ? Plane
      : mix === "road"
        ? Car
        : mix === "mixed"
          ? Route
          : Bus;

  const operators = airlines.filter((airline) => {
    if (mix === "road") return airline.id === "buses" || airline.id === "latam";
    if (mix === "land") return airline.id === "buses";
    if (mix === "flight") return airline.id !== "buses" || hasIsland;
    if (mix === "mixed") return true;
    return airline.id === "latam";
  });

  const why =
    mix === "road"
      ? messages.planner.moveWhyDrive
      : mix === "land"
        ? messages.planner.moveWhyBus
        : messages.planner.moveWhyFlight;

  return (
    <div className="mt-5 max-w-2xl">
      <p className="text-sm leading-relaxed text-ink-soft">
        {messages.planner.moveHint}
      </p>

      <article className="mt-5 overflow-hidden rounded-[1.7rem] border border-line bg-white shadow-[0_16px_40px_rgba(16,32,24,0.1)]">
        <header className="relative overflow-hidden bg-night px-5 py-5 text-cream">
          <div className="absolute -right-8 -bottom-10 size-36 rounded-full bg-terracotta/25 blur-2xl" />
          <div className="absolute -top-10 left-16 size-28 rounded-full bg-pine/30 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream/10 ring-1 ring-white/15">
              <MixIcon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-glacier">
                {messages.planner.moveQ}
              </p>
              <h2 className="mt-1 font-display text-2xl leading-tight">
                {mixLabel}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{why}</p>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap gap-1.5">
            {eco ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-pine/30 px-2.5 py-1 text-[11px] font-medium text-glacier">
                <Leaf size={12} />
                {messages.planner.moveTagEco}
              </span>
            ) : null}
            {hasIsland ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <Ship size={12} />
                {messages.planner.moveTagIsland}
              </span>
            ) : null}
            {flightLegs.length ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/35 px-2.5 py-1 text-[11px] font-medium">
                <Plane size={12} />
                {flightLegs.length} {messages.planner.moveTagFlight}
              </span>
            ) : null}
            {busLegs.length ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <Bus size={12} />
                {busLegs.length} {messages.planner.moveTagBus}
              </span>
            ) : null}
            {isRoad ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <Car size={12} />
                {messages.planner.moveTagDrive}
              </span>
            ) : null}
            {regions.length ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                <Sparkles size={12} />
                {regions.length} zonas
              </span>
            ) : null}
          </div>
        </header>

        <div className="space-y-4 p-4 md:p-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              {messages.planner.moveLegs}
            </p>
            {legs.length === 0 ? (
              <p className="mt-3 rounded-[1.2rem] border border-dashed border-line bg-sand/40 px-4 py-6 text-sm text-ink-soft">
                {messages.planner.moveMixEmpty}
              </p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {legs.map((leg) => {
                  const flight = leg.mode === "flight";
                  return (
                    <li
                      key={`${leg.from}-${leg.to}-${leg.mode}`}
                      className={cn(
                        "flex gap-3 rounded-[1.25rem] border px-3.5 py-3",
                        flight
                          ? "border-terracotta/20 bg-gradient-to-r from-terracotta/[0.07] to-transparent"
                          : "border-pine/20 bg-gradient-to-r from-pine/[0.07] to-transparent",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-11 shrink-0 place-items-center rounded-2xl text-cream shadow-sm",
                          flight ? "bg-terracotta" : "bg-pine",
                        )}
                      >
                        {flight ? <Plane size={17} /> : <Bus size={17} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
                              flight
                                ? "bg-terracotta/15 text-terracotta"
                                : "bg-pine/15 text-pine",
                            )}
                          >
                            {flight
                              ? messages.planner.moveTagFlight
                              : messages.planner.moveTagBus}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-ink-soft">
                            <Clock3 size={11} />
                            {leg.hours}
                            {messages.common.hours}
                          </span>
                        </div>
                        <p className="mt-1 font-medium text-ink">
                          {placeName(leg.from, locale)}
                          <span className="text-ink-soft"> → </span>
                          {placeName(leg.to, locale)}
                        </p>
                        <p className="mt-0.5 text-sm text-ink-soft">
                          {formatMoney(leg.usd, "USD", "en")}
                          {leg.reason === "island"
                            ? ` · ${messages.planner.moveTagIsland}`
                            : leg.reason === "eco"
                              ? ` · ${messages.planner.moveTagEco}`
                              : ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {operators.length ? (
            <div className="rounded-[1.35rem] bg-sand-deep/55 p-3.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                {messages.planner.moveOperators}
              </p>
              <ul className="mt-2.5 grid gap-2">
                {operators.slice(0, 3).map((airline) => {
                  const Icon =
                    airline.id === "buses"
                      ? Bus
                      : airline.id === "latam"
                        ? Plane
                        : Sparkles;
                  return (
                    <li key={airline.id}>
                      <a
                        href={airline.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-3 rounded-[1.1rem] bg-white px-3 py-3 ring-1 ring-line/70 transition hover:ring-terracotta/40"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-night text-cream">
                          <Icon size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-ink">
                            {airline.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                            {pick(airline.note, locale)}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
