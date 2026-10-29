"use client";

import { useMemo, useState } from "react";
import {
  Bus,
  Car,
  ChevronDown,
  Clock,
  Footprints,
  Fuel,
  Hotel,
  Leaf,
  Plane,
  Route,
  ShieldAlert,
  Ship,
  Users,
  Wind,
  Mountain,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import { fuelBrands } from "@/data/fuel";
import {
  decorateRides,
  rideSites,
  ridesForZone,
  type DecoratedRide,
  type RideMode,
} from "@/data/how-to-get";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { fallbackRates, formatMoney } from "@/lib/currency";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { cn } from "@/lib/cn";

type Filter = "all" | "flight" | "bus" | "drive" | "ferry" | "other";
type SortKey = "time" | "price" | "eco";

const flightModes: RideMode[] = ["flight"];
const busModes: RideMode[] = ["bus", "nightbus"];
const driveModes: RideMode[] = ["drive"];
const ferryModes: RideMode[] = ["ferry"];

function modeLabel(mode: RideMode, messages: Messages) {
  return messages.go[mode] ?? messages.go.combo;
}

function ModeIcon({ mode, size = 18 }: { mode: RideMode; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (mode === "flight") return <Plane {...props} />;
  if (mode === "nightbus" || mode === "bus") return <Bus {...props} />;
  if (mode === "drive") return <Car {...props} />;
  if (mode === "ferry") return <Ship {...props} />;
  if (mode === "van") return <Bus {...props} />;
  if (mode === "rideshare") return <Users {...props} />;
  if (mode === "walk") return <Footprints {...props} />;
  return <Route {...props} />;
}

function matchesFilter(option: DecoratedRide, filter: Filter) {
  if (filter === "all") return true;
  const modes = [option.mode, ...option.hops.map((hop) => hop.mode)];
  if (filter === "flight") return modes.some((mode) => flightModes.includes(mode));
  if (filter === "bus") return modes.some((mode) => busModes.includes(mode));
  if (filter === "drive") return modes.some((mode) => driveModes.includes(mode));
  if (filter === "ferry") return modes.some((mode) => ferryModes.includes(mode));
  return !modes.some((mode) =>
    [...flightModes, ...busModes, ...driveModes, ...ferryModes].includes(mode),
  );
}

function formatHours(hours: number) {
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  if (whole === 0) return `${minutes} min`;
  if (minutes === 0) return `${whole} h`;
  return `${whole} h ${minutes} min`;
}

export function TravelOptions({
  zoneId,
  locale,
  messages,
  compact = false,
  tone = "sand",
}: {
  zoneId: string;
  locale: Locale;
  messages: Messages;
  compact?: boolean;
  tone?: "sand" | "night";
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("time");
  const [openId, setOpenId] = useState<string | null>(null);

  const destination = destinations.find((item) => item.id === zoneId);
  const rows = useMemo(() => {
    const decorated = decorateRides(ridesForZone(zoneId));
    const filtered = decorated.filter((item) => matchesFilter(item, filter));
    return [...filtered].sort((a, b) => {
      if (sort === "price") return a.usdMin - b.usdMin;
      if (sort === "eco") return a.co2kg - b.co2kg;
      return a.hours - b.hours;
    });
  }, [zoneId, filter, sort]);

  const night = tone === "night";
  const clp = fallbackRates.CLP ?? 950;

  if (!destination) return null;
  if (!ridesForZone(zoneId).length) {
    return (
      <p className={cn("text-sm", night ? "text-cream/70" : "text-ink-soft")}>
        {messages.go.empty}
      </p>
    );
  }

  const filters: [Filter, string][] = [
    ["all", messages.go.filterAll],
    ["flight", messages.go.filterFlight],
    ["bus", messages.go.filterBus],
    ["drive", messages.go.filterDrive],
    ["ferry", messages.go.filterFerry],
    ["other", messages.go.filterOther],
  ];

  return (
    <section
      className={cn(
        "rounded-[1.8rem]",
        night ? "bg-white/5 text-cream" : "bg-cream text-ink",
        compact ? "p-4" : "p-5 md:p-7",
      )}
      aria-label={messages.go.compare}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
            {messages.go.from} · {pick(destination.name, locale)}
          </p>
          <h2 className={cn("mt-1 font-display", compact ? "text-2xl" : "text-3xl md:text-4xl")}>
            {messages.go.title}
          </h2>
          {compact ? null : (
            <p className={cn("mt-2 max-w-2xl text-sm", night ? "text-cream/70" : "text-ink-soft")}>
              {messages.go.lead}
            </p>
          )}
        </div>
        <div className="flex gap-1 rounded-full bg-sand p-1 text-ink">
          {(["time", "price", "eco"] as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={cn(
                "rounded-full px-3 py-1 text-xs uppercase tracking-wider",
                sort === key ? "bg-night text-cream" : "text-ink-soft hover:bg-sand-deep",
              )}
            >
              {key === "time"
                ? messages.go.sortTime
                : key === "price"
                  ? messages.go.sortPrice
                  : messages.go.sortEco}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {filters.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              "rounded-full px-3 py-1 text-xs uppercase tracking-wider",
              filter === id
                ? "bg-terracotta text-cream"
                : night
                  ? "bg-white/10 text-cream/80"
                  : "bg-sand text-ink-soft hover:bg-sand-deep",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className={cn("mt-5 text-sm", night ? "text-cream/70" : "text-ink-soft")}>
          {messages.go.empty}
        </p>
      ) : null}

      <ul className="mt-5 divide-y divide-line/70">
        {rows.map((option) => {
          const expanded = openId === option.id;
          const site = option.site ?? rideSites[option.operators[0] ?? ""] ?? option.site;
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : option.id)}
                className="flex w-full flex-col gap-3 py-4 text-left md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-11 shrink-0 items-center gap-1 rounded-2xl px-2",
                      night ? "bg-white/10" : "bg-sand",
                    )}
                  >
                    {option.hops.slice(0, 3).map((hop, index) => (
                      <ModeIcon key={`${hop.label}-${index}`} mode={hop.mode} />
                    ))}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xl">
                      {modeLabel(option.mode, messages)}
                      <span className={cn("ml-2 text-sm font-sans", night ? "text-cream/60" : "text-ink-soft")}>
                        {option.operators.join(" · ")}
                      </span>
                    </p>
                    <p className={cn("mt-1 text-sm", night ? "text-cream/65" : "text-ink-soft")}>
                      SCL → {option.to} · {pick(option.toName, locale)}
                      {option.km ? ` · ${option.km} ${messages.go.km}` : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {option.best ? <Badge tone="pine">{messages.go.best}</Badge> : null}
                      {option.isCheapest ? <Badge tone="glacier">{messages.go.cheap}</Badge> : null}
                      {option.isFastest ? <Badge tone="terracotta">{messages.go.fast}</Badge> : null}
                      {option.isDirect ? <Badge>{messages.go.direct}</Badge> : null}
                      {option.nightBus ? <Badge>{messages.go.night}</Badge> : null}
                      {option.savesHotel ? <Badge>{messages.go.savesHotel}</Badge> : null}
                      {option.roundTripOnly ? <Badge tone="wine">{messages.go.onlyFlight}</Badge> : null}
                      {option.isGreenest ? <Badge>{messages.go.green}</Badge> : null}
                      {option.bagsExtra ? <Badge>{messages.go.bags}</Badge> : null}
                      {option.seasonal ? <Badge>{messages.go.seasonal}</Badge> : null}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-6 md:flex-col md:items-end">
                  <p className="inline-flex items-center gap-1.5 text-sm">
                    <Clock size={14} />
                    {formatHours(option.hours)}
                    {option.hoursMax ? `–${formatHours(option.hoursMax)}` : ""}
                  </p>
                  <p className="text-right">
                    <span className="font-display text-2xl">
                      {formatMoney(option.usdMin, "USD", "en")}
                      {option.usdMax !== option.usdMin
                        ? `–${formatMoney(option.usdMax, "USD", "en")}`
                        : ""}
                    </span>
                    <span className={cn("mt-0.5 block text-[11px]", night ? "text-cream/50" : "text-ink-soft")}>
                      {messages.go.clpHint} {Math.round(option.usdMin * clp).toLocaleString("es-CL")}
                    </span>
                  </p>
                  <ChevronDown
                    size={18}
                    className={cn("transition", expanded ? "rotate-180" : "")}
                  />
                </div>
              </button>
              {expanded ? (
                <div className={cn("mb-4 rounded-[1.3rem] p-4", night ? "bg-night/50" : "bg-sand")}>
                  <ol className="space-y-2">
                    {option.hops.map((hop, index) => (
                      <li key={`${hop.label}-${index}`} className="flex items-center gap-3 text-sm">
                        <ModeIcon mode={hop.mode} size={16} />
                        <span className="flex-1">{hop.label}</span>
                        <span className="tabular-nums">{formatHours(hop.hours)}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 text-sm leading-relaxed">{pick(option.note, locale)}</p>
                  {option.warning ? (
                    <p className="mt-2 flex items-start gap-2 text-sm text-terracotta">
                      <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                      {pick(option.warning, locale)}
                    </p>
                  ) : null}
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-wider text-ink-soft">
                    <li>
                      {option.connections === 0
                        ? messages.go.stops0
                        : `${option.connections} ${messages.go.stops1}`}
                    </li>
                    <li>
                      {messages.go.co2} {option.co2kg} kg
                    </li>
                    <li>
                      {messages.go.typical}: {option.typical}
                    </li>
                    {option.savesHotel ? (
                      <li className="inline-flex items-center gap-1">
                        <Hotel size={12} /> {messages.go.hotelSave}
                      </li>
                    ) : null}
                    {option.sag ? (
                      <li className="inline-flex items-center gap-1">
                        <ShieldAlert size={12} /> {messages.go.sag}
                      </li>
                    ) : null}
                    {option.altitude ? (
                      <li className="inline-flex items-center gap-1">
                        <Mountain size={12} /> {messages.go.altitude}
                      </li>
                    ) : null}
                    {option.chains ? <li>{messages.go.chains}</li> : null}
                    {option.wind ? (
                      <li className="inline-flex items-center gap-1">
                        <Wind size={12} /> {messages.go.rain}
                      </li>
                    ) : null}
                    {option.fuel ? <li>{messages.go.australFuel}</li> : null}
                  </ul>
                  {option.fuel ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fuelBrands.slice(0, 4).map((brand) => (
                        <a
                          key={brand.id}
                          href={brand.app}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs text-ink"
                        >
                          <Fuel size={12} />
                          {brand.appName}
                        </a>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {site ? (
                      <a
                        href={site}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-night px-4 py-2 text-sm text-cream"
                      >
                        {messages.go.book}
                      </a>
                    ) : null}
                    <OpenPlannerLink
                      seed={{ regions: [zoneId] }}
                      className="rounded-full bg-terracotta px-4 py-2 text-sm text-cream"
                    >
                      {messages.go.addPlan}
                    </OpenPlannerLink>
                    <span className={cn("self-center text-xs", night ? "text-cream/50" : "text-ink-soft")}>
                      <Leaf size={12} className="mr-1 inline" />
                      {messages.go.co2} {option.co2kg} kg
                    </span>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p className={cn("mt-4 text-[11px] uppercase tracking-[0.16em]", night ? "text-cream/40" : "text-ink-soft")}>
        {messages.go.noTrain}
      </p>
    </section>
  );
}

function Badge({
  children,
  tone = "sand",
}: {
  children: React.ReactNode;
  tone?: "sand" | "pine" | "glacier" | "terracotta" | "wine";
}) {
  const map = {
    sand: "bg-sand text-ink",
    pine: "bg-pine text-cream",
    glacier: "bg-glacier text-night",
    terracotta: "bg-terracotta text-cream",
    wine: "bg-wine text-cream",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]", map[tone])}>
      {children}
    </span>
  );
}
