"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Backpack,
  Bus,
  CalendarDays,
  Check,
  Gem,
  Hotel,
  Minus,
  Plane,
  Plus,
  Search,
  Users,
  Van,
} from "lucide-react";
import type { Messages } from "@/i18n/en";
import { countryToLocale } from "@/i18n/config";
import {
  allCountryCodes,
  countryName,
  getCountryProfile,
  popularCountryCodes,
} from "@/data/countries";
import { destinations } from "@/data/destinations";
import { airlines } from "@/data/stays";
import { activitiesByRegion } from "@/data/activities";
import { fuelBrands, fuelByRegion } from "@/data/fuel";
import { sampleRoutes } from "@/data/routes";
import Link from "next/link";
import type { Interest, TravelStyle } from "@/data/types";
import {
  defaultBudget,
  emptyEstimate,
  estimateTrip,
} from "@/lib/estimate";
import { convertFromUsd, fallbackRates, formatMoney } from "@/lib/currency";
import { pick } from "@/i18n/loc";
import { interpolate } from "@/lib/interpolate";
import { QuotePanel } from "@/components/quote-panel";
import { CountryFlag } from "@/components/country-flag";
import { ChileFlag } from "@/components/chile-flag";
import { TravelOptions } from "@/components/travel-options";
import { usePlanner } from "@/components/planner-context";
import { cn } from "@/lib/cn";

const styles: TravelStyle[] = ["backpacker", "mid", "luxury", "camper"];
const styleIcons = {
  backpacker: Backpack,
  mid: Hotel,
  luxury: Gem,
  camper: Van,
} as const;
const interestIds: Interest[] = [
  "beach",
  "desert",
  "hike",
  "wine",
  "culture",
  "snow",
  "parks",
  "wildlife",
];

export function PlannerWizard({ messages }: { messages: Messages }) {
  const router = useRouter();
  const { plan, updatePlan, step, setStep, locale } = usePlanner();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (data.rates) setRates({ USD: 1, ...data.rates });
      })
      .catch(() => undefined);
  }, []);

  const profile = getCountryProfile(plan.country);
  const currency = profile.currency;
  const eco = plan.eco || profile.ecoBias;
  const estimate = useMemo(
    () => (plan.regions.length ? estimateTrip({ ...plan, eco }) : emptyEstimate()),
    [plan, eco],
  );
  const matchingRoutes = useMemo(
    () =>
      sampleRoutes.filter((route) => route.regions.some((id) => plan.regions.includes(id))),
    [plan.regions],
  );
  const relatedActs = useMemo(
    () => plan.regions.flatMap((id) => activitiesByRegion(id)),
    [plan.regions],
  );
  const relatedFuel = useMemo(
    () => plan.regions.flatMap((id) => fuelByRegion(id)),
    [plan.regions],
  );
  const showFuel =
    plan.style === "camper" ||
    plan.regions.some((id) =>
      ["carretera", "lakes", "chiloe", "patagonia", "atacama"].includes(id),
    );

  const localTotal = convertFromUsd(estimate.totalUsd, currency, rates);
  const budgetLocal = convertFromUsd(plan.budgetUsd, currency, rates);
  const suggestedLang = countryToLocale[plan.country];

  const countries = useMemo(() => {
    const all = allCountryCodes();
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      (code) =>
        countryName(code, locale).toLowerCase().includes(q) ||
        code.toLowerCase().includes(q),
    );
  }, [query, locale]);

  const share = async () => {
    const url = new URL(window.location.origin);
    url.pathname = `/${locale}/plan`;
    url.searchParams.set("c", plan.country);
    url.searchParams.set("d", String(plan.days));
    url.searchParams.set("t", String(plan.travelers));
    url.searchParams.set("b", String(plan.budgetUsd));
    url.searchParams.set("s", plan.style);
    url.searchParams.set("r", plan.regions.join(","));
    url.searchParams.set("i", plan.interests.join(","));
    url.searchParams.set("eco", eco ? "1" : "0");
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    messages.planner.countryQ,
    messages.planner.partyQ,
    messages.planner.budgetQ,
    messages.planner.interestsQ,
    messages.planner.regionsQ,
    messages.planner.bestRoute,
  ];

  const nudge = (key: "travelers" | "days", delta: number, min: number, max: number) => {
    updatePlan({ [key]: Math.min(max, Math.max(min, plan[key] + delta)) });
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col px-5 py-5 md:px-8 md:py-7">
          <ol className="flex gap-1.5">
            {steps.map((_, index) => (
              <li key={index} className="flex-1">
                <button
                  type="button"
                  onClick={() => {
                    if (index <= step) setStep(index);
                  }}
                  className={cn(
                    "h-1.5 w-full rounded-full transition",
                    index < step
                      ? "bg-pine"
                      : index === step
                        ? "bg-terracotta"
                        : "bg-sand-deep",
                  )}
                  aria-label={`${messages.planner.step} ${index + 1}`}
                />
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-terracotta">
            {messages.planner.step} {step + 1} {messages.planner.of} {steps.length}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-[1.85rem] leading-[1.15] text-ink md:text-4xl">
            {steps[step]}
          </h1>

          {step === 0 ? (
            <div className="mt-6">
              <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
                {messages.planner.countryHint}
              </p>
              <label className="relative mt-5 block">
                <Search
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft/70"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={messages.planner.search}
                  className="w-full rounded-full border border-line bg-white px-11 py-3 text-sm outline-none ring-terracotta/30 transition focus:border-terracotta focus:ring-4"
                />
              </label>
              <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                {messages.planner.popular}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {popularCountryCodes.map((code) => {
                  const active = plan.country === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() =>
                        updatePlan({
                          country: code,
                          eco: getCountryProfile(code).ecoBias,
                        })
                      }
                      className={cn(
                        "flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left text-sm transition",
                        active
                          ? "border-terracotta bg-terracotta/8 text-ink shadow-sm"
                          : "border-line/80 bg-white hover:border-terracotta/40",
                      )}
                    >
                      <CountryFlag code={code} className="size-7" />
                      <span className="min-w-0 truncate">
                        {countryName(code, locale)}
                      </span>
                      {active ? (
                        <Check size={14} className="ml-auto shrink-0 text-terracotta" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {query.trim() ? (
                <div className="mt-4 grid max-h-56 grid-cols-1 gap-1 overflow-auto md:grid-cols-2">
                  {countries.slice(0, 80).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() =>
                        updatePlan({
                          country: code,
                          eco: getCountryProfile(code).ecoBias,
                        })
                      }
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm",
                        plan.country === code
                          ? "bg-pine text-cream"
                          : "hover:bg-sand-deep",
                      )}
                    >
                      <CountryFlag code={code} className="size-6" />
                      {countryName(code, locale)}
                    </button>
                  ))}
                </div>
              ) : null}
              {suggestedLang && suggestedLang !== locale ? (
                <button
                  type="button"
                  className="mt-4 text-sm text-terracotta underline"
                  onClick={() => {
                    document.cookie = `NEXT_LOCALE=${suggestedLang}; path=/; max-age=31536000`;
                    const parts = window.location.pathname.split("/");
                    parts[1] = suggestedLang;
                    router.push(parts.join("/"));
                  }}
                >
                  {messages.common.language}: {suggestedLang.toUpperCase()}
                </button>
              ) : null}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-line bg-white p-6">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  <Users size={14} /> {messages.planner.travelers}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full border border-line hover:border-terracotta"
                    onClick={() => nudge("travelers", -1, 1, 8)}
                    aria-label="-"
                  >
                    <Minus size={16} />
                  </button>
                  <p className="font-display text-6xl leading-none">{plan.travelers}</p>
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full border border-line hover:border-terracotta"
                    onClick={() => nudge("travelers", 1, 1, 8)}
                    aria-label="+"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="rounded-[1.6rem] border border-line bg-white p-6">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  <CalendarDays size={14} /> {messages.planner.days}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full border border-line hover:border-terracotta"
                    onClick={() => nudge("days", -1, 5, 28)}
                    aria-label="-"
                  >
                    <Minus size={16} />
                  </button>
                  <p className="font-display text-6xl leading-none">{plan.days}</p>
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full border border-line hover:border-terracotta"
                    onClick={() => nudge("days", 1, 5, 28)}
                    aria-label="+"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <input
                  type="range"
                  min={5}
                  max={28}
                  value={plan.days}
                  onChange={(event) => updatePlan({ days: Number(event.target.value) })}
                  className="planner-range mt-6 w-full"
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="mt-7">
              <p className="text-sm text-ink-soft">{messages.planner.budgetHint}</p>
              <p className="mt-5 font-display text-5xl tracking-tight">
                {formatMoney(
                  convertFromUsd(plan.budgetUsd, currency, rates),
                  currency,
                  locale,
                )}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                {formatMoney(plan.budgetUsd, "USD", "en")} {messages.planner.inUsd}
              </p>
              <input
                type="range"
                min={800}
                max={20000}
                step={100}
                value={plan.budgetUsd}
                onChange={(event) => updatePlan({ budgetUsd: Number(event.target.value) })}
                className="planner-range mt-5 w-full"
              />
              <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                {messages.planner.styleQ}
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {styles.map((style) => {
                  const Icon = styleIcons[style];
                  const active = plan.style === style;
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() =>
                        updatePlan({
                          style,
                          budgetUsd: defaultBudget(style, plan.days, plan.travelers),
                        })
                      }
                      className={cn(
                        "flex gap-3 rounded-[1.4rem] border p-4 text-left transition",
                        active
                          ? "border-terracotta bg-white shadow-sm"
                          : "border-transparent bg-sand-deep/70 hover:bg-sand-deep",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-full",
                          active ? "bg-terracotta text-cream" : "bg-white text-ink",
                        )}
                      >
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block font-medium">{messages.styles[style]}</span>
                        <span className="mt-1 block text-sm text-ink-soft">
                          {messages.styles[`${style}D` as keyof typeof messages.styles]}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <label className="mt-5 flex items-center gap-2.5 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={plan.eco}
                  onChange={(event) => updatePlan({ eco: event.target.checked })}
                  className="size-4 accent-pine"
                />
                {messages.planner.ecoNote}
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {interestIds.map((interest) => {
                const active = plan.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      updatePlan({
                        interests: active
                          ? plan.interests.filter((item) => item !== interest)
                          : [...plan.interests, interest],
                      })
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      active
                        ? "border-pine bg-pine text-cream"
                        : "border-line bg-white hover:border-pine/40",
                    )}
                  >
                    {messages.interests[interest]}
                  </button>
                );
              })}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="mt-6">
              <p className="text-sm text-ink-soft">{messages.planner.regionsHint}</p>
              <div className="mt-4 grid gap-3">
                {destinations.map((destination) => {
                  const active = plan.regions.includes(destination.id);
                  const delta =
                    estimateTrip({
                      ...plan,
                      eco,
                      regions: active
                        ? plan.regions.filter((id) => id !== destination.id)
                        : [...plan.regions, destination.id],
                    }).totalUsd - estimate.totalUsd;
                  const hidden =
                    plan.style === "camper" && !destination.camperFriendly;
                  const matchesInterest =
                    plan.interests.length === 0 ||
                    destination.interests.some((item) => plan.interests.includes(item));
                  return (
                    <button
                      key={destination.id}
                      type="button"
                      onClick={() =>
                        updatePlan({
                          regions: active
                            ? plan.regions.filter((id) => id !== destination.id)
                            : [...plan.regions, destination.id],
                        })
                      }
                      className={cn(
                        "flex overflow-hidden rounded-[1.4rem] border bg-white text-left transition",
                        active ? "border-terracotta shadow-sm" : "border-line/70",
                        !matchesInterest ? "opacity-55" : "",
                      )}
                    >
                      <div className="relative h-28 w-24 shrink-0 md:h-32 md:w-40">
                        <Image
                          src={destination.image}
                          alt={pick(destination.imageAlt, locale)}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                        <ChileFlag
                          variant="circle"
                          className="absolute top-2 left-2 size-6 ring-1 ring-white/70"
                        />
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-3 p-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-terracotta">
                            {pick(destination.region, locale)}
                          </p>
                          <p className="font-display text-xl">
                            {pick(destination.name, locale)}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                            {pick(destination.summary, locale)}
                          </p>
                          {hidden ? (
                            <p className="mt-2 text-xs text-wine">
                              {messages.styles.camperD}
                            </p>
                          ) : null}
                        </div>
                        <p className="shrink-0 rounded-full bg-sand px-2.5 py-1 text-xs font-medium tabular-nums">
                          {delta >= 0 ? "+" : "−"}
                          {formatMoney(Math.abs(delta), "USD", "en")}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              {plan.regions.length ? (
                <div className="mt-6">
                  <TravelOptions
                    zoneId={plan.regions[plan.regions.length - 1] ?? plan.regions[0]}
                    locale={locale}
                    messages={messages}
                    compact
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 5 ? (
            <div className="mt-6 space-y-4">
              {plan.regions.length === 0 ? (
                <p>{messages.planner.emptyRegions}</p>
              ) : (
                <>
                  {estimate.daysShort ? (
                    <p className="rounded-2xl bg-wine/10 px-4 py-3 text-sm text-wine">
                      {interpolate(messages.planner.warningDays, {
                        n: estimate.minDays,
                        d: plan.days,
                      })}
                    </p>
                  ) : null}
                  {estimate.tooAmbitious ? (
                    <p className="rounded-2xl bg-terracotta/10 px-4 py-3 text-sm">
                      {messages.planner.warningAmbition}
                    </p>
                  ) : null}
                  {plan.style === "camper" && plan.regions.includes("rapanui") ? (
                    <p className="rounded-2xl bg-wine/10 px-4 py-3 text-sm text-wine">
                      {messages.planner.rapanuiRules}
                    </p>
                  ) : null}
                  {matchingRoutes.length ? (
                    <div className="space-y-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                        {messages.planner.bestRoute}
                      </p>
                      {matchingRoutes.slice(0, 3).map((route) => (
                        <Link
                          key={route.id}
                          href={`/${locale}/routes/${route.slug}`}
                          className="block rounded-[1.4rem] border border-line bg-white p-4 hover:border-terracotta"
                        >
                          <p className="text-xs uppercase tracking-wider text-terracotta">
                            {route.days} {messages.common.days} · {route.km} {messages.routes.km}
                          </p>
                          <p className="mt-1 font-display text-xl">{pick(route.name, locale)}</p>
                          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                            {pick(route.summary, locale)}
                          </p>
                          <p className="mt-2 text-sm text-terracotta">{messages.planner.openRoute}</p>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  {showFuel ? (
                    <div className="rounded-[1.4rem] bg-sand p-5">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
                        {messages.planner.apps}
                      </p>
                      <p className="mt-2 text-sm text-ink-soft">{messages.planner.fuelNote}</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        {fuelBrands.map((brand) => (
                          <li key={brand.id} className="flex flex-wrap items-baseline justify-between gap-2">
                            <span>
                              <strong>{brand.name}</strong> · {brand.appName}
                            </span>
                            <a
                              href={brand.app}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-terracotta hover:underline"
                            >
                              {messages.common.openApp}
                            </a>
                          </li>
                        ))}
                      </ul>
                      {relatedFuel.length ? (
                        <p className="mt-4 text-xs uppercase tracking-wider text-ink-soft">
                          {messages.planner.fuelStops} · {relatedFuel.length}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {relatedActs.length ? (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                        {messages.planner.relatedActs}
                      </p>
                      <ul className="mt-2 space-y-2 text-sm">
                        {relatedActs.slice(0, 4).map((activity) => (
                          <li key={activity.id}>
                            <Link
                              href={`/${locale}/activities#${activity.kind}`}
                              className="font-medium text-terracotta hover:underline"
                            >
                              {pick(activity.name, locale)}
                            </Link>
                            <span className="text-ink-soft">
                              {" "}
                              · {activity.operators.length} {messages.routes.providers}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <ol className="space-y-3">
                    {estimate.allocation.map((item, index) => {
                      const destination = destinations.find((entry) => entry.id === item.id);
                      const leg = estimate.legs.find((entry) => entry.to === item.id);
                      if (!destination) return null;
                      return (
                        <li
                          key={item.id}
                          className="rounded-[1.4rem] border border-line bg-white p-4"
                        >
                          {leg ? (
                            <p className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-terracotta">
                              {leg.mode === "flight" ? (
                                <Plane size={12} />
                              ) : (
                                <Bus size={12} />
                              )}
                              {leg.mode === "flight"
                                ? messages.planner.flyHere
                                : messages.planner.takeBus}{" "}
                              · {leg.hours}
                              {messages.common.hours} · {formatMoney(leg.usd, "USD", "en")}
                            </p>
                          ) : null}
                          <p className="font-display text-2xl">
                            {index + 1}. {pick(destination.name, locale)}
                          </p>
                          <p className="text-sm text-ink-soft">
                            {item.days} {messages.common.days} · {pick(destination.why, locale)}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                  <div className="rounded-[1.4rem] bg-pine p-5 text-cream">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-glacier">
                      {messages.planner.visa}
                    </p>
                    <p className="mt-2 text-sm">
                      {
                        messages.visa[
                          profile.visa === "id"
                            ? "id"
                            : profile.visa === "required"
                              ? "required"
                              : profile.visa === "us_waiver"
                                ? "usWaiver"
                                : "free"
                        ]
                      }
                    </p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-glacier">
                      {messages.planner.marketTip}
                    </p>
                    <p className="mt-2 text-sm">
                      {messages.tips[profile.tipKey as keyof typeof messages.tips] ??
                        messages.tips.generic}
                    </p>
                    {plan.regions.includes("rapanui") ? (
                      <p className="mt-4 text-sm text-glacier">
                        {messages.planner.rapanuiRules}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      {messages.planner.airlines}
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {airlines.map((airline) => (
                        <li key={airline.id}>
                          <strong>{airline.name}.</strong> {pick(airline.note, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={share}
                    className="rounded-full bg-night px-5 py-3 text-cream"
                  >
                    {copied ? messages.planner.copied : messages.planner.share}
                  </button>
                </>
              )}
            </div>
          ) : null}
          <div className="sticky bottom-0 mt-auto flex items-center justify-between gap-3 border-t border-line bg-cream/95 pt-4 pb-1 backdrop-blur">
            <div className="min-w-0">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((value) => value - 1)}
                  className="rounded-full border border-line px-4 py-2 text-sm hover:border-terracotta"
                >
                  {messages.planner.back}
                </button>
              ) : (
                <p className="truncate text-sm text-ink-soft lg:hidden">
                  {formatMoney(localTotal, currency, locale)}
                </p>
              )}
            </div>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((value) => value + 1)}
                className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream hover:bg-terracotta-deep"
              >
                {messages.planner.next}
              </button>
            ) : (
              <p className="font-display text-xl lg:hidden">
                {formatMoney(localTotal, currency, locale)}
              </p>
            )}
          </div>
          </div>
        </div>
      </div>

      <div className="hidden w-[300px] shrink-0 overflow-y-auto border-l border-line lg:block xl:w-[320px]">
        <QuotePanel
          messages={messages}
          estimate={estimate}
          localTotal={localTotal}
          currency={currency}
          locale={locale}
          budgetLocal={budgetLocal}
        />
      </div>
    </div>
  );
}
