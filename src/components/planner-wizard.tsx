"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Messages } from "@/i18n/en";
import { countryToLocale, type Locale } from "@/i18n/config";
import {
  allCountryCodes,
  countryName,
  getCountryProfile,
  popularCountryCodes,
} from "@/data/countries";
import { destinations } from "@/data/destinations";
import { airlines } from "@/data/stays";
import type { Interest, TravelStyle } from "@/data/types";
import {
  defaultBudget,
  emptyEstimate,
  estimateTrip,
  type PlannerInput,
} from "@/lib/estimate";
import { convertFromUsd, fallbackRates, formatMoney } from "@/lib/currency";
import { pick } from "@/i18n/loc";
import { flagEmoji } from "@/lib/interpolate";
import { interpolate } from "@/lib/interpolate";
import { QuotePanel } from "@/components/quote-panel";
import { cn } from "@/lib/cn";

const styles: TravelStyle[] = ["backpacker", "mid", "luxury", "camper"];
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

const initial: PlannerInput = {
  country: "US",
  travelers: 2,
  days: 12,
  budgetUsd: 4000,
  style: "mid",
  interests: [],
  regions: [],
  eco: false,
};

export function PlannerWizard({
  locale,
  messages,
  seed,
}: {
  locale: Locale;
  messages: Messages;
  seed?: Partial<PlannerInput>;
}) {
  const router = useRouter();
  const [step, setStep] = useState(seed?.regions?.length ? 5 : 0);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);
  const [plan, setPlan] = useState<PlannerInput>({
    ...initial,
    ...seed,
    country: seed?.country || "US",
  });

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
    () =>
      plan.regions.length
        ? estimateTrip({ ...plan, eco })
        : emptyEstimate(),
    [plan, eco],
  );

  const localTotal = convertFromUsd(estimate.totalUsd, currency, rates);
  const budgetLocal = convertFromUsd(plan.budgetUsd, currency, rates);
  const suggestedLang = countryToLocale[plan.country];

  const countries = useMemo(() => {
    const all = allCountryCodes();
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter((code) =>
      countryName(code, locale).toLowerCase().includes(q) ||
      code.toLowerCase().includes(q),
    );
  }, [query, locale]);

  const update = (patch: Partial<PlannerInput>) =>
    setPlan((current) => ({ ...current, ...patch }));

  const share = async () => {
    const url = new URL(window.location.href);
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">
          {messages.planner.step} {step + 1} {messages.planner.of} {steps.length}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand-deep">
          <div
            className="h-full bg-terracotta transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <h1 className="mt-6 font-display text-3xl md:text-5xl">{steps[step]}</h1>

        {step === 0 ? (
          <div className="mt-6">
            <p className="text-ink-soft">{messages.planner.countryHint}</p>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={messages.planner.search}
              className="mt-4 w-full rounded-2xl border border-line bg-cream px-4 py-3 outline-none ring-terracotta focus:ring-2"
            />
            <p className="mt-5 text-xs uppercase tracking-wider text-ink-soft">
              {messages.planner.popular}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {popularCountryCodes.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => update({ country: code, eco: getCountryProfile(code).ecoBias })}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm",
                    plan.country === code
                      ? "border-terracotta bg-terracotta text-cream"
                      : "border-line bg-cream",
                  )}
                >
                  {flagEmoji(code)} {countryName(code, locale)}
                </button>
              ))}
            </div>
            {query.trim() ? (
            <div className="mt-4 grid max-h-64 grid-cols-1 gap-1 overflow-auto md:grid-cols-2">
              {countries.slice(0, 80).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => update({ country: code, eco: getCountryProfile(code).ecoBias })}
                  className={cn(
                    "rounded-xl px-3 py-2 text-left text-sm",
                    plan.country === code ? "bg-pine text-cream" : "hover:bg-sand-deep",
                  )}
                >
                  {flagEmoji(code)} {countryName(code, locale)}
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
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <label className="rounded-3xl bg-cream p-5">
              <span className="text-sm text-ink-soft">{messages.planner.travelers}</span>
              <input
                type="range"
                min={1}
                max={8}
                value={plan.travelers}
                onChange={(event) => update({ travelers: Number(event.target.value) })}
                className="mt-4 w-full"
              />
              <p className="mt-2 font-display text-4xl">{plan.travelers}</p>
            </label>
            <label className="rounded-3xl bg-cream p-5">
              <span className="text-sm text-ink-soft">{messages.planner.days}</span>
              <input
                type="range"
                min={5}
                max={28}
                value={plan.days}
                onChange={(event) => update({ days: Number(event.target.value) })}
                className="mt-4 w-full"
              />
              <p className="mt-2 font-display text-4xl">{plan.days}</p>
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8">
            <p className="text-ink-soft">{messages.planner.budgetHint}</p>
            <input
              type="range"
              min={800}
              max={20000}
              step={100}
              value={plan.budgetUsd}
              onChange={(event) => update({ budgetUsd: Number(event.target.value) })}
              className="mt-5 w-full"
            />
            <p className="mt-2 font-display text-4xl">
              {formatMoney(convertFromUsd(plan.budgetUsd, currency, rates), currency, locale)}
            </p>
            <p className="text-sm text-ink-soft">
              {formatMoney(plan.budgetUsd, "USD", "en")} {messages.planner.inUsd}
            </p>
            <p className="mt-8 text-sm uppercase tracking-wider text-ink-soft">
              {messages.planner.styleQ}
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {styles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() =>
                    update({
                      style,
                      budgetUsd: defaultBudget(style, plan.days, plan.travelers),
                    })
                  }
                  className={cn(
                    "rounded-3xl border p-4 text-left",
                    plan.style === style
                      ? "border-terracotta bg-cream"
                      : "border-transparent bg-sand-deep/60",
                  )}
                >
                  <p className="font-medium">{messages.styles[style]}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {messages.styles[`${style}D` as keyof typeof messages.styles]}
                  </p>
                </button>
              ))}
            </div>
            <label className="mt-5 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={plan.eco}
                onChange={(event) => update({ eco: event.target.checked })}
              />
              {messages.planner.ecoNote}
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {interestIds.map((interest) => {
              const active = plan.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() =>
                    update({
                      interests: active
                        ? plan.interests.filter((item) => item !== interest)
                        : [...plan.interests, interest],
                    })
                  }
                  className={cn(
                    "rounded-full border px-4 py-2",
                    active
                      ? "border-pine bg-pine text-cream"
                      : "border-line bg-cream",
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
            <p className="text-ink-soft">{messages.planner.regionsHint}</p>
            <div className="mt-4 grid gap-4">
              {destinations.map((destination) => {
                const active = plan.regions.includes(destination.id);
                const delta = estimateTrip({
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
                      update({
                        regions: active
                          ? plan.regions.filter((id) => id !== destination.id)
                          : [...plan.regions, destination.id],
                      })
                    }
                    className={cn(
                      "flex overflow-hidden rounded-3xl border bg-cream text-left",
                      active ? "border-terracotta" : "border-transparent",
                      !matchesInterest ? "opacity-60" : "",
                    )}
                  >
                    <div className="relative h-28 w-28 shrink-0 md:h-32 md:w-40">
                      <Image
                        src={destination.image}
                        alt={pick(destination.imageAlt, locale)}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3 p-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-terracotta">
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
                      <p className="shrink-0 text-sm font-medium">
                        {delta >= 0 ? "+" : "−"}
                        {formatMoney(Math.abs(delta), "USD", "en")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="mt-6 space-y-5">
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
                <ol className="space-y-4">
                  {estimate.allocation.map((item, index) => {
                    const destination = destinations.find((entry) => entry.id === item.id);
                    const leg = estimate.legs.find((entry) => entry.to === item.id);
                    if (!destination) return null;
                    return (
                      <li key={item.id} className="rounded-3xl bg-cream p-4">
                        {leg ? (
                          <p className="mb-2 text-xs uppercase tracking-wider text-terracotta">
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
                <div className="rounded-3xl bg-pine p-5 text-cream">
                  <p className="text-xs uppercase tracking-wider text-glacier">
                    {messages.planner.visa}
                  </p>
                  <p className="mt-2 text-sm">
                    {messages.visa[profile.visa === "id" ? "id" : profile.visa === "required" ? "required" : profile.visa === "us_waiver" ? "usWaiver" : "free"]}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-glacier">
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
                  <p className="text-xs uppercase tracking-wider text-ink-soft">
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

        <div className="mt-8 mb-24 flex gap-3 no-print lg:mb-0">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((value) => value - 1)}
              className="rounded-full border border-line px-5 py-3"
            >
              {messages.planner.back}
            </button>
          ) : null}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((value) => value + 1)}
              className="rounded-full bg-terracotta px-5 py-3 text-cream"
            >
              {messages.planner.next}
            </button>
          ) : null}
        </div>
      </div>

      <div className="hidden lg:sticky lg:top-6 lg:block lg:self-start">
        <QuotePanel
          messages={messages}
          estimate={estimate}
          localTotal={localTotal}
          currency={currency}
          locale={locale}
          budgetLocal={budgetLocal}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur no-print lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-soft">
              {messages.planner.liveTotal}
            </p>
            <p className="font-display text-2xl">
              {formatMoney(localTotal, currency, locale)}
            </p>
          </div>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((value) => value + 1)}
              className="rounded-full bg-terracotta px-4 py-2 text-cream"
            >
              {messages.planner.next}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
