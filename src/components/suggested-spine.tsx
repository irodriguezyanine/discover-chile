"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  Minus,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
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
  stopHighlights,
  onChangeRegions,
  onChangeDays,
  onChangeHighlights,
}: {
  messages: Messages;
  locale: Locale;
  regionIds: string[];
  days: number;
  stopHighlights: Record<string, number[]>;
  onChangeRegions: (ids: string[]) => void;
  onChangeDays: (days: number) => void;
  onChangeHighlights: (next: Record<string, number[]>) => void;
}) {
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openStop, setOpenStop] = useState<string | null>(regionIds[0] ?? null);
  const [query, setQuery] = useState("");

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
    const q = query.trim().toLowerCase();
    const map = new Map<string, typeof destinations>();
    for (const destination of destinations) {
      if (!destination.camperFriendly) continue;
      const name = pick(destination.name, locale).toLowerCase();
      const region = pick(destination.region, locale);
      const regionLower = region.toLowerCase();
      const highlightHit = destination.highlights.some((item) =>
        pick(item, locale).toLowerCase().includes(q),
      );
      if (
        q &&
        !name.includes(q) &&
        !regionLower.includes(q) &&
        !highlightHit
      ) {
        continue;
      }
      const list = map.get(region) ?? [];
      list.push(destination);
      map.set(region, list);
    }
    return [...map.entries()];
  }, [locale, query]);

  const setStopDays = (id: string, nextDays: number) => {
    const clamped = Math.max(1, Math.min(21, nextDays));
    const others = allocation
      .filter((item) => item.id !== id)
      .reduce((sum, item) => sum + item.days, 0);
    onChangeDays(Math.max(regionIds.length, others + clamped));
  };

  const removeStop = (id: string) => {
    onChangeRegions(regionIds.filter((item) => item !== id));
    const next = { ...stopHighlights };
    delete next[id];
    onChangeHighlights(next);
    if (openStop === id) setOpenStop(null);
  };

  const addStop = (id: string) => {
    if (regionIds.includes(id)) return;
    onChangeRegions([...regionIds, id]);
    const destination = getDestination(id);
    if (destination && !stopHighlights[id]) {
      onChangeHighlights({
        ...stopHighlights,
        [id]: destination.highlights.map((_, index) => index).slice(0, 2),
      });
    }
    setOpenStop(id);
    setOpenCatalog(false);
  };

  const moveStop = (id: string, direction: -1 | 1) => {
    const index = regionIds.indexOf(id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= regionIds.length) return;
    const next = [...regionIds];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChangeRegions(next);
  };

  const toggleHighlight = (stopId: string, highlightIndex: number) => {
    const current = stopHighlights[stopId] ?? [];
    const next = current.includes(highlightIndex)
      ? current.filter((item) => item !== highlightIndex)
      : [...current, highlightIndex].sort((a, b) => a - b);
    onChangeHighlights({ ...stopHighlights, [stopId]: next });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-pine/15 bg-pine/[0.04] px-4 py-3.5">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-terracotta">
          {messages.planner.bestRoute}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {messages.planner.spineHint}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOpenCatalog((value) => !value)}
          aria-expanded={openCatalog}
          className="inline-flex items-center gap-1.5 rounded-full bg-night px-3.5 py-2 text-xs font-medium text-cream"
        >
          <Plus size={14} />
          {messages.planner.spineAddZone}
          <ChevronDown
            size={14}
            className={cn("transition", openCatalog ? "rotate-180" : "")}
          />
        </button>
        <span className="rounded-full bg-sand-deep px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          {regionIds.length} · {days} {messages.common.days}
        </span>
      </div>

      {openCatalog ? (
        <div className="space-y-3 rounded-[1.4rem] border border-line bg-white p-3 shadow-sm">
          <label className="relative block">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-soft"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={messages.planner.spineSearch}
              className="h-11 w-full rounded-full border border-line bg-sand/40 pr-4 pl-10 text-sm outline-none focus:border-terracotta"
            />
          </label>
          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {catalogByRegion.length === 0 ? (
              <p className="px-2 py-4 text-sm text-ink-soft">
                {messages.planner.spineEmpty}
              </p>
            ) : (
              catalogByRegion.map(([regionLabel, items]) => (
                <details
                  key={regionLabel}
                  open={Boolean(query.trim()) || catalogByRegion.length <= 3}
                  className="group rounded-xl bg-sand-deep/55 open:bg-sand-deep/80"
                >
                  <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium marker:content-none">
                    <span className="flex items-center justify-between gap-2">
                      <span>
                        {regionLabel}
                        <span className="ml-2 text-[11px] font-normal text-ink-soft">
                          {items.length}
                        </span>
                      </span>
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
                            <span className="min-w-0">
                              <span className="block truncate font-medium">
                                {pick(destination.name, locale)}
                              </span>
                              <span className="block truncate text-xs text-ink-soft">
                                {pick(destination.summary, locale)}
                              </span>
                            </span>
                            {active ? <Check size={14} /> : <Plus size={14} />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ))
            )}
          </div>
        </div>
      ) : null}

      {!regionIds.length ? (
        <p className="rounded-[1.3rem] border border-dashed border-line bg-white px-4 py-8 text-center text-sm text-ink-soft">
          {messages.planner.spineEmpty}
        </p>
      ) : (
        <ol className="space-y-3">
          {allocation.map((item, index) => {
            const destination = getDestination(item.id);
            if (!destination) return null;
            const open = openStop === item.id;
            const selected =
              stopHighlights[item.id] ??
              destination.highlights.map((_, highlightIndex) => highlightIndex).slice(0, 2);

            return (
              <li
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-[1.4rem] border bg-white shadow-sm transition",
                  open ? "border-pine/35 ring-1 ring-pine/15" : "border-line/80",
                )}
              >
                <div className="flex items-stretch">
                  <div className="flex w-10 flex-col items-center justify-center gap-1 border-r border-line/70 bg-sand/50 py-2">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveStop(item.id, -1)}
                      className="grid size-7 place-items-center rounded-full text-ink-soft hover:bg-white disabled:opacity-30"
                      aria-label={messages.planner.spineReorderUp}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <span className="font-display text-sm text-terracotta">
                      {index + 1}
                    </span>
                    <button
                      type="button"
                      disabled={index === allocation.length - 1}
                      onClick={() => moveStop(item.id, 1)}
                      className="grid size-7 place-items-center rounded-full text-ink-soft hover:bg-white disabled:opacity-30"
                      aria-label={messages.planner.spineReorderDown}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setOpenStop(open ? null : item.id)}
                      className="flex w-full items-start justify-between gap-3 p-4 text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-terracotta">
                          {pick(destination.region, locale)}
                        </p>
                        <p className="truncate font-display text-xl">
                          {pick(destination.name, locale)}
                        </p>
                        <p className="mt-1 text-sm text-ink-soft">
                          {item.days} {messages.planner.spineNights}
                          {selected.length
                            ? ` · ${selected.length} ${messages.planner.spinePanoramas.toLowerCase()}`
                            : ""}
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
                      <div className="space-y-4 border-t border-line/70 bg-sand/35 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                            {messages.planner.spineNights}
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

                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                            {messages.planner.spinePanoramas}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {destination.highlights.map((highlight, highlightIndex) => {
                              const active = selected.includes(highlightIndex);
                              return (
                                <button
                                  key={`${item.id}-${highlightIndex}`}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() =>
                                    toggleHighlight(item.id, highlightIndex)
                                  }
                                  className={cn(
                                    "rounded-full border px-3 py-1.5 text-left text-xs transition",
                                    active
                                      ? "border-pine bg-pine text-cream"
                                      : "border-line bg-white text-ink-soft hover:border-pine/40",
                                  )}
                                >
                                  {pick(highlight, locale)}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-ink-soft">
                          {pick(destination.why, locale)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeStop(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-wine hover:text-wine"
                        >
                          <Trash2 size={12} />
                          {messages.planner.spineRemoveStop}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
