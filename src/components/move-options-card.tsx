"use client";

import { Bus, Leaf, Plane, Route } from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import type { Estimate } from "@/lib/estimate";
import { airlines } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { formatMoney } from "@/lib/currency";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

export function MoveOptionsCard({
  messages,
  locale,
  estimate,
  eco,
}: {
  messages: Messages;
  locale: Locale;
  estimate: Estimate;
  eco: boolean;
}) {
  const legs = estimate.legs.filter((leg) => leg.mode !== "none");
  const flightCount = legs.filter((leg) => leg.mode === "flight").length;
  const busCount = legs.filter((leg) => leg.mode === "bus").length;

  return (
    <div className="mt-6 max-w-2xl">
      <p className="text-sm leading-relaxed text-ink-soft">
        {messages.planner.moveHint}
      </p>

      <article className="mt-5 overflow-hidden rounded-[1.6rem] border border-line bg-white shadow-[0_12px_32px_rgba(16,32,24,0.08)]">
        <div className="flex flex-wrap items-center gap-2 border-b border-line/70 bg-sand-deep/50 px-4 py-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-night px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-cream">
            <Route size={12} />
            {messages.planner.airlines}
          </span>
          {eco ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-pine/15 px-2.5 py-1 text-[11px] font-medium text-pine">
              <Leaf size={12} />
              Eco
            </span>
          ) : null}
          {flightCount ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/15 px-2.5 py-1 text-[11px] font-medium text-terracotta">
              <Plane size={12} />
              {flightCount} avión
            </span>
          ) : null}
          {busCount ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-pine/10 px-2.5 py-1 text-[11px] font-medium text-pine">
              <Bus size={12} />
              {busCount} tierra
            </span>
          ) : null}
        </div>

        <div className="space-y-3 p-4 md:p-5">
          {legs.length === 0 ? (
            <p className="text-sm text-ink-soft">
              {messages.planner.emptyRegions}
            </p>
          ) : (
            legs.map((leg) => {
              const to = destinations.find((item) => item.id === leg.to);
              const from = destinations.find((item) => item.id === leg.from);
              return (
                <div
                  key={`${leg.from}-${leg.to}-${leg.mode}`}
                  className={cn(
                    "flex gap-3 rounded-[1.2rem] border px-3.5 py-3",
                    leg.mode === "flight"
                      ? "border-terracotta/25 bg-terracotta/[0.04]"
                      : "border-pine/20 bg-pine/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl",
                      leg.mode === "flight"
                        ? "bg-terracotta text-cream"
                        : "bg-pine text-cream",
                    )}
                  >
                    {leg.mode === "flight" ? (
                      <Plane size={16} />
                    ) : (
                      <Bus size={16} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                      {leg.mode === "flight"
                        ? messages.planner.flyHere
                        : messages.planner.takeBus}
                    </p>
                    <p className="mt-0.5 font-medium text-ink">
                      {from ? pick(from.name, locale) : "SCL"}
                      {" → "}
                      {to ? pick(to.name, locale) : leg.to}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {leg.hours}
                      {messages.common.hours}
                      {" · "}
                      {formatMoney(leg.usd, "USD", "en")}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-line/70 bg-sand/50 px-4 py-4 md:px-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            {messages.planner.airlines}
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {airlines.slice(0, 4).map((airline) => (
              <li
                key={airline.id}
                className="rounded-xl bg-white px-3 py-2.5 text-sm ring-1 ring-line/70"
              >
                <strong className="font-medium">{airline.name}</strong>
                <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                  {pick(airline.note, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
