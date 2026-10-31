"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronRight,
  Copy,
  Leaf,
  MapPinned,
  Pencil,
  Plane,
  Printer,
  Bus,
  Share2,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { countryName, getCountryProfile } from "@/data/countries";
import { destinations, getDestination } from "@/data/destinations";
import { ChileFlag } from "@/components/chile-flag";
import { CountryFlag } from "@/components/country-flag";
import { QuotePanel } from "@/components/quote-panel";
import { usePlanner } from "@/components/planner-context";
import { convertFromUsd, fallbackRates, formatMoney } from "@/lib/currency";
import { emptyEstimate, estimateTrip } from "@/lib/estimate";
import { interpolate } from "@/lib/interpolate";
import { planToSearchParams } from "@/lib/plan-seed";
import { planStepIndex } from "@/lib/plan-steps";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

export function PlanProfile({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const {
    plan,
    guest,
    planSavedAt,
    openPlanner,
    setStep,
    closePlanner,
  } = usePlanner();
  const [rates, setRates] = useState(fallbackRates);
  const [copied, setCopied] = useState(false);
  const [openStop, setOpenStop] = useState<string | null>(
    plan.regions[0] ?? null,
  );
  const [activeDay, setActiveDay] = useState(0);
  const desk = messages.planDesk;

  useEffect(() => {
    // Ensure wizard is not covering the profile desk.
    closePlanner();
  }, [closePlanner]);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (data.rates) setRates({ USD: 1, ...data.rates });
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!plan.regions.length) return;
    if (!plan.regions.includes(openStop ?? "")) {
      setOpenStop(plan.regions[0] ?? null);
    }
  }, [plan.regions, openStop]);

  const profile = getCountryProfile(plan.country);
  const currency = profile.currency;
  const eco = plan.eco || profile.ecoBias;
  const estimate = useMemo(
    () => (plan.regions.length ? estimateTrip({ ...plan, eco }) : emptyEstimate()),
    [plan, eco],
  );
  const localTotal = convertFromUsd(estimate.totalUsd, currency, rates);
  const partyBudgetUsd = plan.budgetUsd * Math.max(1, plan.travelers);
  const budgetLocal = convertFromUsd(partyBudgetUsd, currency, rates);
  const budgetPerPersonLocal = convertFromUsd(plan.budgetUsd, currency, rates);
  const over = budgetLocal > 0 && localTotal > budgetLocal;

  const daySpans = useMemo(() => {
    let cursor = 1;
    return estimate.allocation.map((item) => {
      const start = cursor;
      const end = cursor + Math.max(1, item.days) - 1;
      cursor = end + 1;
      return { id: item.id, days: item.days, start, end };
    });
  }, [estimate.allocation]);

  const heroStops = useMemo(
    () =>
      plan.regions
        .map((id) => getDestination(id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .slice(0, 3),
    [plan.regions],
  );

  const savedLabel = useMemo(() => {
    if (!planSavedAt) return desk.statusDraft;
    const delta = Date.now() - planSavedAt;
    if (delta < 60_000) return desk.savedJustNow;
    try {
      const time = new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(planSavedAt);
      return interpolate(desk.savedAt, { time });
    } catch {
      return desk.savedBadge;
    }
  }, [desk, locale, planSavedAt]);

  const title = guest?.name?.trim()
    ? interpolate(desk.titleNamed, { name: guest.name.trim().split(/\s+/)[0] })
    : desk.title;

  const copyLink = async () => {
    const url = new URL(window.location.origin);
    url.pathname = `/${locale}/plan`;
    const params = planToSearchParams(plan, eco);
    params.forEach((value, key) => url.searchParams.set(key, value));
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const editInWizard = () => {
    setStep(planStepIndex("route", guest));
    openPlanner();
  };

  if (!plan.regions.length) {
    return (
      <main className="relative overflow-hidden pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(196,92,38,0.16),transparent_42%),radial-gradient(circle_at_88%_18%,rgba(27,60,50,0.18),transparent_40%)]" />
        <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-28 md:px-6">
          <Breadcrumb locale={locale} messages={messages} />
          <p className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-terracotta">
            <ChileFlag variant="circle" className="size-6 ring-1 ring-black/10" />
            {desk.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">{desk.emptyTitle}</h1>
          <p className="mt-4 max-w-xl text-ink-soft">{desk.emptyLead}</p>
          <button
            type="button"
            onClick={() => openPlanner()}
            className="mt-8 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream hover:bg-terracotta-deep"
          >
            {desk.emptyCta}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="plan-desk-rise relative pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-24">
      {/* 1 Atmosphere gradient · 2 Full-bleed hero plane · 3 No inset card hero */}
      <section className="relative overflow-hidden bg-night text-cream">
        <div className="pointer-events-none absolute inset-0">
          {heroStops[0] ? (
            <Image
              src={heroStops[0].image}
              alt=""
              fill
              priority
              className="object-cover opacity-45"
              sizes="100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/75 to-sand" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(142,201,214,0.22),transparent_35%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-24 md:px-6 md:pb-14 md:pt-28">
          <Breadcrumb locale={locale} messages={messages} light />

          {/* 4 Status + saved pill · 5 Brand-adjacent eyebrow */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-glacier backdrop-blur">
              <Sparkles size={12} />
              {planSavedAt ? desk.savedBadge : desk.statusDraft}
            </p>
            <p className="rounded-full border border-white/10 bg-night/40 px-3 py-1 text-xs text-cream/70 backdrop-blur">
              {savedLabel}
            </p>
            {eco ? (
              <p className="inline-flex items-center gap-1.5 rounded-full border border-glacier/30 bg-glacier/10 px-3 py-1 text-xs text-glacier">
                <Leaf size={12} />
                {desk.ecoOn}
              </p>
            ) : null}
          </div>

          {/* 6 Named title · 7 Supporting lead · 8 Country chip */}
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl leading-tight md:text-5xl lg:text-[3.4rem]">
                {title}
              </h1>
              <p className="mt-3 max-w-xl text-base text-cream/75 md:text-lg">
                {desk.lead}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-cream/80">
                <CountryFlag code={plan.country} className="size-5" />
                {countryName(plan.country, locale)}
                <span className="text-cream/35">·</span>
                {messages.styles[plan.style]}
              </p>
            </div>
            {/* 9 Primary CTA group */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={editInWizard}
                className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-sm font-medium text-night hover:bg-white"
              >
                <Pencil size={15} />
                {desk.editWizard}
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-cream hover:bg-white/10"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? desk.linkCopied : desk.copyLink}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-cream hover:bg-white/10 no-print"
              >
                <Printer size={15} />
                {desk.printPlan}
              </button>
            </div>
          </div>

          {/* 10–14 Summary metric strip (days / travelers / stops / budget / estimate) */}
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            <Metric
              icon={<CalendarDays size={16} />}
              label={interpolate(desk.summaryDays, { n: plan.days })}
              value={
                heroStops[0]
                  ? `${desk.firstStop} ${pick(heroStops[0].name, locale)}`
                  : desk.statusReady
              }
            />
            <Metric
              icon={<Users size={16} />}
              label={interpolate(desk.summaryTravelers, { n: plan.travelers })}
              value={messages.styles[plan.style]}
            />
            <Metric
              icon={<MapPinned size={16} />}
              label={interpolate(desk.summaryStops, { n: plan.regions.length })}
              value={
                heroStops[heroStops.length - 1]
                  ? `${desk.lastStop}: ${pick(heroStops[heroStops.length - 1].name, locale)}`
                  : "—"
              }
            />
            <Metric
              icon={<Wallet size={16} />}
              label={desk.summaryBudget}
              value={formatMoney(budgetLocal, currency, locale)}
            />
            <Metric
              icon={<Sparkles size={16} />}
              label={desk.totalEstimate}
              value={formatMoney(localTotal, currency, locale)}
              className="col-span-2 sm:col-span-1"
              emphasize
            />
          </div>

          {/* 15 Hero collage of stops (edge-aware, not floating cards overlay) */}
          {heroStops.length > 1 ? (
            <div className="mt-8 grid grid-cols-3 gap-2 md:gap-3">
              {heroStops.map((stop, index) => (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => {
                    setOpenStop(stop.id);
                    setActiveDay(index);
                    document
                      .getElementById(`stop-${stop.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group relative aspect-[5/3] overflow-hidden rounded-[1.1rem] ring-1 ring-white/15"
                >
                  <Image
                    src={stop.image}
                    alt={pick(stop.imageAlt, locale)}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 truncate text-left text-xs font-medium md:text-sm">
                    {index + 1}. {pick(stop.name, locale)}
                  </p>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* 16 Dock hint · 17 Keep-working banner */}
      <div className="border-b border-line bg-cream/80 no-print">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-ink-soft md:px-6">
          <p className="inline-flex items-center gap-2">
            <ChileFlag variant="circle" className="size-5" />
            {desk.dockHint}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#agenda"
              className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-terracotta"
            >
              {desk.focusAgenda}
            </a>
            <a
              href="#quote"
              className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-terracotta"
            >
              {desk.focusQuote}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[minmax(0,1fr)_300px] md:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          {/* 18 Interest chips · 19 Style badge row */}
          <section aria-label={desk.interestsLabel}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-pine px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-glacier">
                {desk.styleLabel}: {messages.styles[plan.style]}
              </span>
              {plan.interests.length ? (
                plan.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs text-ink-soft"
                  >
                    {messages.interests[interest as keyof typeof messages.interests] ??
                      interest}
                  </span>
                ))
              ) : (
                <span className="text-xs text-ink-soft">{desk.interestsEmpty}</span>
              )}
            </div>
          </section>

          {/* 20 Warnings */}
          {estimate.daysShort || estimate.tooAmbitious ? (
            <section
              aria-label={desk.warningsTitle}
              className="space-y-2 rounded-[1.4rem] border border-terracotta/30 bg-[#fff4ec] p-4"
            >
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-terracotta">
                <AlertTriangle size={14} />
                {desk.warningsTitle}
              </p>
              {estimate.daysShort ? (
                <p className="text-sm text-ink-soft">
                  {interpolate(messages.planner.warningDays, {
                    n: estimate.minDays,
                    d: plan.days,
                  })}
                </p>
              ) : null}
              {estimate.tooAmbitious ? (
                <p className="text-sm text-ink-soft">
                  {messages.planner.warningAmbition}
                </p>
              ) : null}
            </section>
          ) : null}

          {/* 21 Day rail · 22 Agenda header */}
          <section id="agenda" className="scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">{desk.agendaTitle}</h2>
                <p className="mt-2 max-w-xl text-sm text-ink-soft">{desk.agendaLead}</p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                {desk.dayRail}
              </p>
            </div>

            {/* 23 Horizontal day scrubber */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {daySpans.map((span, index) => (
                <button
                  key={span.id}
                  type="button"
                  onClick={() => {
                    setActiveDay(index);
                    setOpenStop(span.id);
                    document
                      .getElementById(`stop-${span.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs tabular-nums transition",
                    activeDay === index
                      ? "border-night bg-night text-cream"
                      : "border-line bg-cream text-ink-soft hover:border-terracotta",
                  )}
                >
                  {span.start === span.end
                    ? interpolate(desk.daySingle, { n: span.start })
                    : interpolate(desk.dayOf, { start: span.start, end: span.end })}
                </button>
              ))}
            </div>

            {/* 24–35 Stop cards with photo, nights, why, season, panoramas, deep link */}
            <ol className="mt-6 space-y-4">
              {daySpans.map((span, index) => {
                const destination = getDestination(span.id);
                if (!destination) return null;
                const open = openStop === span.id;
                const highlights = plan.stopHighlights[span.id] ?? [];
                return (
                  <li
                    key={span.id}
                    id={`stop-${span.id}`}
                    className="scroll-mt-28 overflow-hidden rounded-[1.6rem] border border-line bg-cream shadow-[0_12px_40px_rgba(16,32,24,0.06)]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpenStop(open ? null : span.id);
                        setActiveDay(index);
                      }}
                      className="grid w-full grid-cols-[96px_minmax(0,1fr)] text-left sm:grid-cols-[128px_minmax(0,1fr)]"
                      aria-expanded={open}
                    >
                      <div className="relative min-h-[96px] sm:min-h-[112px]">
                        <Image
                          src={destination.image}
                          alt={pick(destination.imageAlt, locale)}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                      <div className="flex items-start justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-terracotta">
                            {span.start === span.end
                              ? interpolate(desk.daySingle, { n: span.start })
                              : interpolate(desk.dayOf, {
                                  start: span.start,
                                  end: span.end,
                                })}
                            <span className="mx-2 text-line">·</span>
                            {interpolate(desk.stopNights, { n: span.days })}
                          </p>
                          <h3 className="mt-1 font-display text-2xl leading-tight">
                            {index + 1}. {pick(destination.name, locale)}
                          </h3>
                          <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
                            {pick(destination.region, locale)}
                          </p>
                        </div>
                        <ChevronRight
                          size={18}
                          className={cn(
                            "mt-1 shrink-0 text-ink-soft transition",
                            open && "rotate-90",
                          )}
                        />
                      </div>
                    </button>
                    {open ? (
                      <div className="space-y-4 border-t border-line px-4 py-4 sm:px-5">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                            {desk.stopWhy}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                            {pick(destination.why, locale)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                            {desk.stopSeason}
                          </p>
                          <p className="mt-1.5 text-sm text-ink-soft">
                            {pick(destination.season, locale)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                            {desk.stopPanoramas}
                          </p>
                          {highlights.length ? (
                            <ul className="mt-2 flex flex-wrap gap-2">
                              {highlights.map((hi) => {
                                const label = destination.highlights[hi];
                                if (!label) return null;
                                return (
                                  <li
                                    key={hi}
                                    className="rounded-full bg-pine/10 px-3 py-1 text-xs text-pine"
                                  >
                                    {pick(label, locale)}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="mt-1.5 text-sm text-ink-soft">
                              {desk.stopEmptyPanoramas}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <Link
                            href={`/${locale}/destinations/${destination.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs hover:border-terracotta"
                          >
                            {desk.stopOpen}
                            <ChevronRight size={12} />
                          </Link>
                          <button
                            type="button"
                            onClick={editInWizard}
                            className="inline-flex items-center gap-1.5 rounded-full bg-night px-3 py-1.5 text-xs text-cream"
                          >
                            <Pencil size={12} />
                            {desk.editWizard}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </section>

          {/* 36 Transport legs */}
          <section className="rounded-[1.6rem] border border-line bg-cream p-5">
            <h2 className="font-display text-2xl">{desk.legsTitle}</h2>
            <p className="mt-1 text-sm text-ink-soft">{desk.legsLead}</p>
            {estimate.legs.length ? (
              <ul className="mt-4 space-y-3">
                {estimate.legs.map((leg, index) => {
                  const from = getDestination(leg.from);
                  const to = getDestination(leg.to);
                  if (!from || !to) return null;
                  const Icon = leg.mode === "flight" ? Plane : Bus;
                  return (
                    <li
                      key={`${leg.from}-${leg.to}-${index}`}
                      className="flex items-start gap-3 rounded-[1.1rem] bg-sand/80 px-3 py-3"
                    >
                      <span className="mt-0.5 grid size-9 place-items-center rounded-full bg-night text-cream">
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {pick(from.name, locale)}
                          <span className="mx-2 text-ink-soft/50">→</span>
                          {pick(to.name, locale)}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-soft">
                          {leg.mode === "flight" ? desk.legFlight : desk.legBus}
                          {" · "}
                          {interpolate(desk.legHours, { n: leg.hours })}
                          {" · "}
                          {formatMoney(leg.usd, "USD", "en")}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-soft">{desk.noLegs}</p>
            )}
          </section>

          {/* 37 Visa · 38 Market tip */}
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.6rem] bg-pine p-5 text-cream">
              <p className="text-[11px] uppercase tracking-[0.2em] text-glacier">
                {desk.visaTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed">
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
            </article>
            <article className="rounded-[1.6rem] border border-line bg-cream p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                {desk.tipTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {messages.tips[profile.tipKey as keyof typeof messages.tips] ??
                  messages.tips.generic}
              </p>
            </article>
          </div>

          {/* 39 Camper fuel note */}
          {plan.style === "camper" ? (
            <article className="rounded-[1.6rem] border border-line bg-sand p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                {desk.fuelNoteTitle}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{messages.planner.fuelNote}</p>
            </article>
          ) : null}

          {/* 40 Zone chips map hint */}
          <section>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              {desk.mapHint}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {plan.regions.map((id) => {
                const destination = getDestination(id) ?? destinations.find((d) => d.id === id);
                if (!destination) return null;
                return (
                  <Link
                    key={id}
                    href={`/${locale}/destinations/${destination.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-cream py-1 pl-1 pr-3 text-xs hover:border-terracotta"
                  >
                    <span className="relative size-7 overflow-hidden rounded-full">
                      <Image
                        src={destination.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </span>
                    {pick(destination.name, locale)}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 41 Next actions */}
          <section className="rounded-[1.6rem] border border-line bg-cream p-5">
            <h2 className="font-display text-2xl">{desk.actionsTitle}</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Link
                href={`/${locale}/destinations`}
                className="rounded-[1.1rem] bg-sand px-4 py-3 text-sm hover:ring-1 hover:ring-terracotta"
              >
                {desk.actionDestinations}
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="rounded-[1.1rem] bg-sand px-4 py-3 text-sm hover:ring-1 hover:ring-terracotta"
              >
                {desk.actionRoutes}
              </Link>
              <Link
                href={`/${locale}/fuel`}
                className="rounded-[1.1rem] bg-sand px-4 py-3 text-sm hover:ring-1 hover:ring-terracotta"
              >
                {desk.actionFuel}
              </Link>
            </div>
          </section>
        </div>

        {/* 42 Sticky quote column (desktop) · 43 Budget vs estimate */}
        <aside id="quote" className="scroll-mt-24 md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-[1.6rem] border border-line shadow-[0_18px_50px_rgba(16,32,24,0.08)]">
            <QuotePanel
              messages={messages}
              estimate={estimate}
              localTotal={localTotal}
              currency={currency}
              locale={locale}
              budgetLocal={budgetLocal}
              budgetPerPersonLocal={budgetPerPersonLocal}
              travelers={plan.travelers}
              budgetFlexible={plan.budgetFlexible}
            />
          </div>
          {/* 44 Compact budget verdict under quote */}
          <p
            className={cn(
              "mt-3 text-center text-xs uppercase tracking-[0.18em]",
              over ? "text-[#9a3f16]" : "text-pine",
            )}
          >
            {desk.vsBudget}: {over ? desk.overBudget : desk.underBudget}
          </p>
          <p className="mt-4 text-center text-xs text-ink-soft no-print">
            {desk.keepWorking}
          </p>
        </aside>
      </div>

      {/* 45–50 Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-cream/95 px-4 py-3 backdrop-blur no-print md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl gap-2">
          <button
            type="button"
            onClick={editInWizard}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-night py-3 text-sm font-medium text-cream"
          >
            <Pencil size={15} />
            {desk.stickyEdit}
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line py-3 text-sm"
          >
            <Share2 size={15} />
            {copied ? desk.linkCopied : desk.stickyShare}
          </button>
        </div>
      </div>
    </main>
  );
}

function Breadcrumb({
  locale,
  messages,
  light = false,
}: {
  locale: Locale;
  messages: Messages;
  light?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em]",
        light ? "text-cream/65" : "text-ink-soft",
      )}
    >
      <Link href={`/${locale}`} className="hover:underline">
        {messages.planDesk.breadcrumbHome}
      </Link>
      <span aria-hidden>/</span>
      <span className={light ? "text-cream" : "text-ink"}>
        {messages.planDesk.breadcrumbPlan}
      </span>
    </nav>
  );
}

function Metric({
  icon,
  label,
  value,
  className,
  emphasize = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.2rem] border border-white/12 bg-white/8 p-3 backdrop-blur",
        emphasize && "ring-1 ring-glacier/40",
        className,
      )}
    >
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-glacier">
        {icon}
        {label}
      </p>
      <p className="mt-1.5 truncate text-sm text-cream/90">{value}</p>
    </div>
  );
}
