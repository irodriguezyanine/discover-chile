"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  Backpack,
  CalendarDays,
  Check,
  Gem,
  Hotel,
  Minus,
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
import { fuelBrands, fuelByRegion } from "@/data/fuel";
import type { TravelStyle } from "@/data/types";
import {
  emptyEstimate,
  estimateTrip,
} from "@/lib/estimate";
import { convertFromUsd, fallbackRates, formatMoney } from "@/lib/currency";
import { pick } from "@/i18n/loc";
import { interpolate } from "@/lib/interpolate";
import { QuotePanel } from "@/components/quote-panel";
import { CountryFlag } from "@/components/country-flag";
import { ChileFlag } from "@/components/chile-flag";
import {
  BudgetAmountField,
  BudgetFlexSwitch,
} from "@/components/budget-amount-field";
import { InterestPicker } from "@/components/interest-picker";
import { JourneyProgress } from "@/components/journey-progress";
import { MoveOptionsCard } from "@/components/move-options-card";
import { SuggestedSpine } from "@/components/suggested-spine";
import { usePlanner } from "@/components/planner-context";
import { cn } from "@/lib/cn";
import {
  journeyStepCount,
  plannerJourneyIndex,
} from "@/lib/journey-steps";
import { planStepIds, type PlanStepId } from "@/lib/plan-steps";

function useIsDesktopViewport() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(min-width: 768px)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false,
  );
}

const styles: TravelStyle[] = ["backpacker", "mid", "luxury", "camper"];
const styleIcons = {
  backpacker: Backpack,
  mid: Hotel,
  luxury: Gem,
  camper: Van,
} as const;
export function PlannerWizard({ messages }: { messages: Messages }) {
  const router = useRouter();
  const { plan, updatePlan, step, setStep, locale, guest } = usePlanner();
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
  const relatedFuel = useMemo(
    () => plan.regions.flatMap((id) => fuelByRegion(id)),
    [plan.regions],
  );
  const showFuel = plan.style === "camper";

  const localTotal = convertFromUsd(estimate.totalUsd, currency, rates);
  const partyBudgetUsd = plan.budgetUsd * Math.max(1, plan.travelers);
  const budgetLocal = convertFromUsd(partyBudgetUsd, currency, rates);
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
    url.searchParams.set("bf", plan.budgetFlexible ? "1" : "0");
    url.searchParams.set("s", plan.style);
    url.searchParams.set("r", plan.regions.join(","));
    url.searchParams.set("i", plan.interests.join(","));
    url.searchParams.set("eco", eco ? "1" : "0");
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const finishPlan = async () => {
    await share();
  };

  const isDesktop = useIsDesktopViewport();
  const stepIds = useMemo(() => planStepIds(guest), [guest]);
  const titles: Record<PlanStepId, string> = {
    country: messages.planner.countryQ,
    party: messages.planner.partyQ,
    budget: messages.planner.budgetQ,
    style: messages.planner.styleQ,
    interests: messages.planner.interestsQ,
    regions: messages.planner.regionsQ,
    move: messages.planner.moveQ,
    route: messages.planner.bestRoute,
  };
  const steps = stepIds.map((id) => titles[id]);
  const safeStep = Math.min(Math.max(step, 0), Math.max(steps.length - 1, 0));
  const activeId = stepIds[safeStep] ?? "party";
  const journeyTotal = journeyStepCount(isDesktop, guest);
  const journeyCurrent = plannerJourneyIndex(activeId, isDesktop, guest);

  useEffect(() => {
    if (step !== safeStep) setStep(safeStep);
  }, [step, safeStep, setStep]);

  const nudge = (key: "travelers" | "days", delta: number, min: number, max: number) => {
    updatePlan({ [key]: Math.min(max, Math.max(min, plan[key] + delta)) });
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col px-5 py-5 md:px-8 md:py-7">
          <JourneyProgress
            total={journeyTotal}
            current={journeyCurrent}
            label={messages.planner.title}
            className="gap-1"
          />
          <h1 className="mt-5 max-w-3xl font-display text-[1.85rem] leading-[1.15] text-ink md:text-4xl">
            {titles[activeId]}
          </h1>

          {activeId === "country" ? (
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

          {activeId === "party" ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-line bg-white p-6">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  <Users size={14} /> {messages.planner.travelers}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:border-terracotta disabled:opacity-40"
                    onClick={() => nudge("travelers", -1, 1, Number.POSITIVE_INFINITY)}
                    disabled={plan.travelers <= 1}
                    aria-label="-"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={plan.travelers}
                    aria-label={messages.planner.travelers}
                    onChange={(event) => {
                      const digits = event.target.value.replace(/\D/g, "");
                      if (!digits) {
                        updatePlan({ travelers: 1 });
                        return;
                      }
                      updatePlan({
                        travelers: Math.max(1, Number.parseInt(digits, 10)),
                      });
                    }}
                    className="w-full min-w-0 bg-transparent text-center font-display text-6xl leading-none text-ink outline-none"
                  />
                  <button
                    type="button"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:border-terracotta"
                    onClick={() => nudge("travelers", 1, 1, Number.POSITIVE_INFINITY)}
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

          {activeId === "budget" ? (
            <div className="mt-7 max-w-xl">
              <p className="text-sm leading-relaxed text-ink-soft">
                {messages.planner.budgetHint}
              </p>
              <BudgetFlexSwitch
                flexible={plan.budgetFlexible}
                flexibleLabel={messages.planner.budgetFlexible}
                fixedLabel={messages.planner.budgetFixed}
                onChange={(budgetFlexible) => updatePlan({ budgetFlexible })}
              />
              <BudgetAmountField
                budgetUsd={plan.budgetUsd}
                currency={currency}
                locale={locale}
                rates={rates}
                travelers={plan.travelers}
                inUsdLabel={messages.planner.inUsd}
                perPersonLabel={messages.planner.budgetPerPerson}
                partyTotalLabel={interpolate(messages.planner.budgetPartyTotal, {
                  n: String(plan.travelers),
                })}
                editAria={messages.planner.budgetEditAria}
                onChangeUsd={(budgetUsd) => updatePlan({ budgetUsd })}
              />
            </div>
          ) : null}

          {activeId === "style" ? (
            <div className="mt-7">
              <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
                {messages.planner.styleHint}
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {styles.map((style) => {
                  const Icon = styleIcons[style];
                  const active = plan.style === style;
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => updatePlan({ style })}
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

          {activeId === "interests" ? (
            <InterestPicker
              messages={messages}
              locale={locale}
              selected={plan.interests}
              onChange={(interests) => updatePlan({ interests })}
            />
          ) : null}

          {activeId === "regions" ? (
            <div className="mt-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
                  {messages.planner.regionsHint}
                </p>
                <span className="rounded-full bg-pine/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-pine">
                  {plan.regions.length} {messages.planner.addedToPlan}
                </span>
              </div>
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
                    destination.interests.some((item) =>
                      plan.interests.includes(item),
                    );
                  return (
                    <button
                      key={destination.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        updatePlan({
                          regions: active
                            ? plan.regions.filter((id) => id !== destination.id)
                            : [...plan.regions, destination.id],
                        })
                      }
                      className={cn(
                        "group flex overflow-hidden rounded-[1.45rem] border text-left transition duration-200",
                        active
                          ? "border-pine/40 bg-[#14261c] text-cream shadow-[0_14px_34px_rgba(12,40,24,0.28)]"
                          : "border-line/70 bg-white hover:-translate-y-0.5 hover:border-pine/30 hover:shadow-md",
                        !matchesInterest && !active ? "opacity-55" : "",
                      )}
                    >
                      <div className="relative h-28 w-24 shrink-0 md:h-32 md:w-40">
                        <Image
                          src={destination.image}
                          alt={pick(destination.imageAlt, locale)}
                          fill
                          className={cn(
                            "object-cover transition",
                            active ? "brightness-95 saturate-110" : "",
                          )}
                          sizes="160px"
                        />
                        <ChileFlag
                          variant="circle"
                          className="absolute top-2 left-2 size-6 ring-1 ring-white/70"
                        />
                        {active ? (
                          <span className="absolute right-2 bottom-2 rounded-full bg-pine px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-cream">
                            {messages.planner.addedToPlan}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-3 p-4">
                        <div>
                          <p
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em]",
                              active ? "text-glacier" : "text-terracotta",
                            )}
                          >
                            {pick(destination.region, locale)}
                          </p>
                          <p className="font-display text-xl">
                            {pick(destination.name, locale)}
                          </p>
                          <p
                            className={cn(
                              "mt-1 line-clamp-2 text-sm",
                              active ? "text-cream/70" : "text-ink-soft",
                            )}
                          >
                            {pick(destination.summary, locale)}
                          </p>
                          {hidden ? (
                            <p className="mt-2 text-xs text-[#f0a3ad]">
                              {messages.styles.camperD}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <p
                            className={cn(
                              "rounded-full px-2.5 py-1 text-xs font-medium tabular-nums",
                              active
                                ? "bg-white/10 text-cream"
                                : "bg-sand text-ink",
                            )}
                          >
                            {delta >= 0 ? "+" : "−"}
                            {formatMoney(Math.abs(delta), "USD", "en")}
                          </p>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]",
                              active
                                ? "bg-glacier/20 text-glacier"
                                : "bg-sand-deep text-ink-soft",
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
          ) : null}

          {activeId === "move" ? (
            <MoveOptionsCard
              messages={messages}
              locale={locale}
              estimate={estimate}
              eco={eco}
            />
          ) : null}

          {activeId === "route" ? (
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
                  {plan.style === "camper" ? (
                    <>
                      <SuggestedSpine
                        messages={messages}
                        locale={locale}
                        regionIds={plan.regions}
                        days={plan.days}
                        onChangeRegions={(regions) => updatePlan({ regions })}
                        onChangeDays={(days) => updatePlan({ days })}
                      />
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
                    </>
                  ) : (
                    <ol className="space-y-3">
                      {estimate.allocation.map((item, index) => {
                        const destination = destinations.find((entry) => entry.id === item.id);
                        if (!destination) return null;
                        return (
                          <li
                            key={item.id}
                            className="rounded-[1.4rem] border border-line bg-white p-4"
                          >
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
                  )}
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
                  </div>
                  <button
                    type="button"
                    onClick={finishPlan}
                    className="w-full rounded-full bg-night px-5 py-3.5 text-sm font-medium text-cream md:w-auto"
                  >
                    {copied ? messages.planner.planSaved : messages.planner.finishPlan}
                  </button>
                </>
              )}
            </div>
          ) : null}
          <div className="sticky bottom-0 mt-auto flex items-center justify-between gap-3 border-t border-line bg-cream/95 pt-4 pb-1 backdrop-blur">
            <div className="min-w-0">
              {safeStep > 0 ? (
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
            {safeStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((value) => value + 1)}
                className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream hover:bg-terracotta-deep"
              >
                {messages.planner.next}
              </button>
            ) : (
              <button
                type="button"
                onClick={finishPlan}
                className="rounded-full bg-night px-5 py-2.5 text-sm font-medium text-cream hover:bg-night/90"
              >
                {copied ? messages.planner.planSaved : messages.planner.finishPlan}
              </button>
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
          budgetFlexible={plan.budgetFlexible}
        />
      </div>
    </div>
  );
}
