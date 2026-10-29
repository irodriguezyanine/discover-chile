"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  Handshake,
  HandCoins,
  Languages,
  Plug,
  Shirt,
  Stamp,
  Utensils,
} from "lucide-react";
import type { Destination } from "@/data/types";
import { chileanFoods, chileanPhrases, localeTipKey } from "@/data/chile-desk";
import { mapCycle, type MapZoneId } from "@/data/chile-map";
import type { Locale } from "@/i18n/config";
import { localeLabels } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { ChileLiveMap } from "@/components/chile-live-map";
import { ChileFlag } from "@/components/chile-flag";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { TravelOptions } from "@/components/travel-options";
import { cn } from "@/lib/cn";

export function TravelDesk({
  destinations,
  locale,
  messages,
}: {
  destinations: Destination[];
  locale: Locale;
  messages: Messages;
}) {
  const [active, setActive] = useState<MapZoneId>("atacama");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);

  const zone = destinations.find((item) => item.id === active) ?? destinations[0];
  const phrase = chileanPhrases[phraseIndex % chileanPhrases.length];
  const parade = useMemo(() => Object.entries(localeLabels), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const phrases = window.setInterval(() => {
      setPhraseIndex((value) => (value + 1) % chileanPhrases.length);
    }, 3800);
    const langs = window.setInterval(() => {
      setLangIndex((value) => (value + 1) % parade.length);
    }, 2600);
    return () => {
      window.clearInterval(phrases);
      window.clearInterval(langs);
    };
  }, [parade.length]);

  const tip =
    messages.tips[localeTipKey[locale] as keyof typeof messages.tips] ??
    messages.tips.generic;

  return (
    <div className="bg-night text-cream">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(196,92,38,0.22),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(142,201,214,0.14),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 pb-12 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:pt-32">
          <div className="order-2 md:order-1">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-glacier">
              <ChileFlag variant="circle" className="size-7 ring-2 ring-white/50" />
              {messages.hero.kicker}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              {messages.desk.heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-cream/75">{messages.desk.heroLead}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(
                [
                  [Stamp, messages.desk.factVisa],
                  [Languages, messages.desk.factLang],
                  [Banknote, messages.desk.factMoney],
                  [Plug, messages.desk.factPlug],
                ] as const
              ).map(([Icon, label]) => (
                <p
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
                >
                  <Icon size={14} className="text-glacier" />
                  {label}
                </p>
              ))}
            </div>
            {zone ? (
              <article className="mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
                <div className="relative h-36">
                  <Image
                    src={zone.image}
                    alt={pick(zone.imageAlt, locale)}
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
                  <p className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.2em] text-glacier">
                    {pick(zone.region, locale)}
                  </p>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-3xl">{pick(zone.name, locale)}</h2>
                  <p className="mt-2 text-sm text-cream/70">{pick(zone.summary, locale)}</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-terracotta">
                    {zone.recommendedDays} {messages.dest.rec} · {zone.flightFromSclHours}
                    {messages.common.hours} {messages.dest.flight}
                    {zone.busFromSclHours
                      ? ` · ${zone.busFromSclHours}${messages.common.hours} ${messages.dest.bus}`
                      : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/${locale}/destinations/${zone.slug}`}
                      className="rounded-full bg-cream px-4 py-2 text-sm text-night"
                    >
                      {messages.desk.openZone}
                    </Link>
                    <OpenPlannerLink
                      seed={{ regions: [zone.id] }}
                      className="rounded-full bg-terracotta px-4 py-2 text-sm text-cream"
                    >
                      {messages.dest.add}
                    </OpenPlannerLink>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
          <div className="order-1 md:order-2">
            <ChileLiveMap
              destinations={destinations}
              locale={locale}
              messages={messages}
              active={active}
              onActive={setActive}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-night">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-glacier">
            {messages.desk.languagesLive}
          </p>
          <p className="font-display text-2xl text-cream" aria-live="polite">
            {parade[langIndex]?.[1]}
            <span className="mx-3 text-terracotta">·</span>
            {phrase.say}
          </p>
        </div>
      </section>

      <section className="bg-sand px-4 py-10 text-ink md:px-6">
        <div className="mx-auto max-w-6xl">
          <TravelOptions zoneId={active} locale={locale} messages={messages} />
        </div>
      </section>

      <section className="bg-sand text-ink">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 pb-10 md:grid-cols-2 lg:grid-cols-4 md:px-6">
          <article className="rounded-[1.5rem] bg-cream p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {messages.desk.when}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>{messages.desk.when1}</li>
              <li>{messages.desk.when2}</li>
              <li>{messages.desk.when3}</li>
              <li>{messages.desk.when4}</li>
            </ul>
          </article>
          <article className="rounded-[1.5rem] bg-cream p-5">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-terracotta">
              <HandCoins size={14} />
              {messages.desk.tipping}
            </p>
            <p className="mt-3 font-display text-3xl">10%</p>
            <p className="mt-2 text-sm text-ink-soft">{messages.desk.tippingD}</p>
          </article>
          <article className="rounded-[1.5rem] bg-cream p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {messages.desk.manners}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>{messages.desk.manners1}</li>
              <li>{messages.desk.manners2}</li>
              <li>{messages.desk.manners3}</li>
            </ul>
          </article>
          <article className="rounded-[1.5rem] bg-pine p-5 text-cream">
            <p className="text-[11px] uppercase tracking-[0.2em] text-glacier">
              {messages.desk.forYou}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{tip}</p>
          </article>
        </div>
      </section>

      <section className="bg-sand text-ink">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 pb-10 md:grid-cols-3 md:px-6">
          <article className="rounded-[1.5rem] bg-cream p-5">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-terracotta">
              <Handshake size={14} />
              {messages.desk.greet}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>{messages.desk.greet1}</li>
              <li>{messages.desk.greet2}</li>
              <li>{messages.desk.greet3}</li>
            </ul>
          </article>
          <article className="rounded-[1.5rem] bg-cream p-5">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-terracotta">
              <Shirt size={14} />
              {messages.desk.dress}
            </p>
            <p className="mt-3 text-sm text-ink-soft">{messages.desk.dress1}</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {messages.desk.practical}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              <li>{messages.desk.emergency}</li>
              <li>{messages.desk.sim}</li>
              <li>{messages.desk.water}</li>
              <li>{messages.desk.time}</li>
              <li>{messages.desk.sag}</li>
              <li>{messages.desk.plugD}</li>
              <li>{messages.desk.moneyD}</li>
            </ul>
          </article>
          <article className="rounded-[1.5rem] bg-cream p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {messages.desk.sights}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>{messages.desk.sight1}</li>
              <li>{messages.desk.sight2}</li>
              <li>{messages.desk.sight3}</li>
              <li>{messages.desk.sight4}</li>
              <li>{messages.desk.sight5}</li>
              <li>{messages.desk.sight6}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-sand text-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-6 md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <article className="rounded-[1.8rem] bg-cream p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
              {messages.desk.speak}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{messages.desk.speakLead}</p>
            <p className="mt-4 font-display text-5xl" aria-live="polite">
              {phrase.say}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink-soft">{phrase.how}</p>
            <p className="mt-4 text-lg">{pick(phrase.mean, locale)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {chileanPhrases.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPhraseIndex(index)}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm",
                    index === phraseIndex
                      ? "bg-night text-cream"
                      : "bg-sand text-ink-soft hover:bg-sand-deep",
                  )}
                >
                  {item.say}
                </button>
              ))}
            </div>
          </article>
          <article className="rounded-[1.8rem] bg-cream p-6 md:p-8">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-terracotta">
              <Utensils size={14} />
              {messages.desk.foods}
            </p>
            <ul className="mt-5 space-y-4">
              {chileanFoods.map((food) => (
                <li key={food.id}>
                  <p className="font-display text-xl">{pick(food.name, locale)}</p>
                  <p className="text-sm text-ink-soft">{pick(food.note, locale)}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-sand pb-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
            {messages.desk.spine}
          </p>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {mapCycle.map((id) => {
              const destination = destinations.find((item) => item.id === id);
              if (!destination) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActive(id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="min-w-[200px] overflow-hidden rounded-[1.3rem] bg-cream text-left"
                >
                  <div className="relative h-24">
                    <Image
                      src={destination.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <p className="px-3 py-3 font-display text-lg">
                    {pick(destination.name, locale)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
