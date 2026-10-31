"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { destinations, getDestination } from "@/data/destinations";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

export function SuggestedSpine({
  messages,
  locale,
  regionIds,
  days,
  onChangeRegions,
  onChangeDays,
}: {
  messages: Messages;
  locale: Locale;
  regionIds: string[];
  days: number;
  onChangeRegions: (ids: string[]) => void;
  onChangeDays: (days: number) => void;
}) {
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openDays, setOpenDays] = useState<string | null>(regionIds[0] ?? null);

  const allocation = useMemo(() => {
    if (!regionIds.length) return [] as { id: string; days: number }[];
    const base = Math.floor(days / regionIds.length);
    let rest = days - base * regionIds.length;
    return regionIds.map((id) => {
      const extra = rest > 0 ? 1 : 0;
      rest -= extra;
      return { id, days: Math.max(1, base + extra) };
    });
  }, [regionIds, days]);

  const catalogByRegion = useMemo(() => {
    const map = new Map<string, typeof destinations>();
    for (const destination of destinations) {
      const label = pick(destination.region, locale);
      const list = map.get(label) ?? [];
      list.push(destination);
      map.set(label, list);
    }
    return [...map.entries()];
  }, [locale]);

  const setStopDays = (id: string, nextDays: number) => {
    const clamped = Math.max(1, Math.min(21, nextDays));
    const others = allocation
      .filter((item) => item.id !== id)
      .reduce((sum, item) => sum + item.days, 0);
    onChangeDays(others + clamped);
  };

  const removeStop = (id: string) => {
    onChangeRegions(regionIds.filter((item) => item !== id));
  };

  const addStop = (id: string) => {
    if (regionIds.includes(id)) return;
    onChangeRegions([...regionIds, id]);
    setOpenDays(id);
  };

  return (
    <div className="mt-5 space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
            {messages.planner.bestRoute}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {messages.planner.regionsHint}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpenCatalog((value) => !value)}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium hover:border-terracotta"
        >
          {messages.planner.addToPlan}
          <ChevronDown
            size={14}
            className={cn("transition", openCatalog ? "rotate-180" : "")}
          />
        </button>
      </div>

      {openCatalog ? (
        <div className="space-y-2 rounded-[1.35rem] border border-line bg-white p-3">
          {catalogByRegion.map(([regionLabel, items]) => (
            <details key={regionLabel} className="group rounded-xl bg-sand-deep/50 open:bg-sand-deep/80">
              <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium marker:content-none">
                <span className="flex items-center justify-between gap-2">
                  {regionLabel}
                  <ChevronDown
                    size={14}
                    className="text-ink-soft transition group-open:rotate-180"
                  />
                </span>
              </summary>
              <ul className="space-y-1 px-2 pb-2">
                {items.map((destination) => {
                  const active = regionIds.includes(destination.id);
                  return (
                    <li key={destination.id}>
                      <button
                        type="button"
                        onClick={() =>
                          active
                            ? removeStop(destination.id)
                            : addStop(destination.id)
                        }
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition",
                          active
                            ? "bg-pine/15 text-pine"
                            : "hover:bg-white",
                        )}
                      >
                        <span>{pick(destination.name, locale)}</span>
                        {active ? <Check size={14} /> : <Plus size={14} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
        </div>
      ) : null}

      <ol className="space-y-3">
        {allocation.map((item, index) => {
          const destination = getDestination(item.id);
          if (!destination) return null;
          const open = openDays === item.id;
          return (
            <li
              key={item.id}
              className="overflow-hidden rounded-[1.35rem] border border-pine/20 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenDays(open ? null : item.id)}
                className="flex w-full items-start justify-between gap-3 p-4 text-left"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-terracotta">
                    {index + 1} · {pick(destination.region, locale)}
                  </p>
                  <p className="font-display text-xl">
                    {pick(destination.name, locale)}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {item.days} {messages.common.days}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    "mt-1 shrink-0 text-ink-soft transition",
                    open ? "rotate-180" : "",
                  )}
                />
              </button>
              {open ? (
                <div className="border-t border-line/70 bg-sand/40 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                      {messages.planner.days}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="grid size-9 place-items-center rounded-full border border-line bg-white"
                        onClick={() => setStopDays(item.id, item.days - 1)}
                        aria-label="-"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-display text-xl tabular-nums">
                        {item.days}
                      </span>
                      <button
                        type="button"
                        className="grid size-9 place-items-center rounded-full border border-line bg-white"
                        onClick={() => setStopDays(item.id, item.days + 1)}
                        aria-label="+"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-soft">
                    {pick(destination.summary, locale)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeStop(item.id)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-wine hover:text-wine"
                  >
                    <Trash2 size={12} />
                    {messages.common.close}
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
