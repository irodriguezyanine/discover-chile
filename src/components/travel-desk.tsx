"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Footprints,
  Fuel,
  Utensils,
} from "lucide-react";
import type { Destination } from "@/data/types";
import { chileanFoods, chileanPhrases, localeTipKey } from "@/data/chile-desk";
import type { MapZoneId } from "@/data/chile-map";
import {
  selectorCycle,
  selectorToDestinationId,
  type SelectorZoneId,
} from "@/data/chile-selector-map";
import type { Locale } from "@/i18n/config";
import { localeLabels } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import type { LiveMapData } from "@/data/chile-map";
import { ChileLiveMap } from "@/components/chile-live-map";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { TipsHub } from "@/components/tips-hub";
import { TravelOptions } from "@/components/travel-options";
import {
  PhoneDeskDock,
  type PhoneDeskTab,
} from "@/components/phone-desk-dock";
import { cn } from "@/lib/cn";
import { useIsPhone } from "@/hooks/use-is-phone";
import { usePlanner } from "@/components/planner-context";

export function TravelDesk({
  destinations,
  locale,
  messages,
  mapData: _mapData,
}: {
  destinations: Destination[];
  locale: Locale;
  messages: Messages;
  mapData?: LiveMapData;
}) {
  const phone = useIsPhone();
  const { guest } = usePlanner();
  const [active, setActive] = useState<SelectorZoneId>(selectorCycle[0] ?? "atacama");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const [jump, setJump] = useState<string | null>(null);
  const [tab, setTab] = useState<PhoneDeskTab>("map");

  const destinationId = selectorToDestinationId(active) as MapZoneId;
  const zone =
    destinations.find((item) => item.id === destinationId) ?? destinations[0];
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

  const quick = [
    {
      id: "walk",
      label: messages.desk.wantWalk,
      icon: Footprints,
      href: `/${locale}/activities`,
      jump: false,
    },
    {
      id: "stay",
      label: messages.desk.wantStay,
      icon: BedDouble,
      href: `/${locale}/stays`,
      jump: true,
    },
    {
      id: "eat",
      label: messages.desk.wantEat,
      icon: Utensils,
      href: `/${locale}/stays`,
      jump: true,
    },
    {
      id: "ride",
      label: messages.desk.wantRide,
      icon: Fuel,
      href: `/${locale}/fuel`,
      jump: false,
    },
  ] as const;

  return (
    <div className={cn("relative text-ink", phone && "pb-28")}>
      {phone && tab === "tips" ? (
        <section className="fixed inset-x-0 top-[calc(3.55rem+env(safe-area-inset-top))] bottom-[4.7rem] z-10 overflow-y-auto px-4 py-4">
          <TipsHub locale={locale} messages={messages} />
        </section>
      ) : null}

      {phone && tab === "map" ? (
        <section className="fixed inset-x-0 top-[calc(3.55rem+env(safe-area-inset-top))] bottom-[4.7rem] z-10 overflow-hidden bg-sand/92">
          <ChileLiveMap
            destinations={destinations}
            locale={locale}
            messages={messages}
            active={active}
            onActive={setActive}
            phone
            hideChips
          />
        </section>
      ) : null}

      {phone ? null : (
        <>
          <section className="relative z-10">
            <div className="mx-auto max-w-6xl px-4 pb-4 pt-24 md:px-6 md:pt-32">
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.34em] text-terracotta">
                  {guest?.name
                    ? `${messages.desk.phoneHi} ${guest.name}`
                    : messages.desk.holaPo}
                </p>
                <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
                  {messages.desk.heroTitle}
                </h1>
                <p className="mt-3 max-w-2xl text-base text-ink-soft md:text-lg">
                  {messages.desk.heroLead}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {quick.map((item) => (
                    <li key={item.id}>
                      {item.jump ? (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-black/[0.08] transition hover:bg-sand-deep hover:ring-terracotta/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                        >
                          <item.icon size={14} />
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (jump === item.id) {
                              window.location.assign(item.href);
                              return;
                            }
                            setJump(item.id);
                            window.requestAnimationFrame(() => {
                              document
                                .getElementById(`pack-${item.id}`)
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            });
                          }}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ring-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
                            jump === item.id
                              ? "bg-terracotta text-cream ring-terracotta"
                              : "bg-white text-ink ring-black/[0.08] hover:bg-sand-deep hover:ring-terracotta/40",
                          )}
                        >
                          <item.icon size={14} />
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                <TipsHub locale={locale} messages={messages} />
              </div>
            </div>
          </section>

          <section className="relative z-10">
            <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-4 md:grid-cols-[0.9fr_1.1fr] md:px-6 md:py-8">
              <div>
                <p className="mb-3 text-sm text-terracotta">
                  {messages.desk.sayHover}
                </p>
                <ChileLiveMap
                  destinations={destinations}
                  locale={locale}
                  messages={messages}
                  active={active}
                  onActive={setActive}
                />
              </div>

              <div>
                {zone ? (
                  <article className="mb-16 overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-black/10 sm:mb-0">
                    <div className="relative h-48 md:h-56">
                      <Image
                        src={zone.image}
                        alt={pick(zone.imageAlt, locale)}
                        fill
                        className="object-cover"
                        sizes="640px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <p className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm text-ink">
                        {pick(zone.region, locale)}
                      </p>
                      <h2 className="absolute bottom-3 left-4 font-display text-3xl text-white md:text-4xl">
                        {pick(zone.name, locale)}
                      </h2>
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="text-sm leading-relaxed text-ink-soft">
                        {pick(zone.summary, locale)}
                      </p>
                      <p className="mt-3 text-sm text-ink-soft">
                        {zone.recommendedDays} {messages.common.days} ·{" "}
                        {zone.flightFromSclHours}
                        {messages.common.hours} {messages.dest.flight}
                        {zone.busFromSclHours
                          ? ` · ${zone.busFromSclHours}${messages.common.hours} ${messages.dest.bus}`
                          : ""}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/${locale}/destinations/${zone.slug}`}
                          className="inline-flex h-12 items-center rounded-full bg-ink px-5 text-sm text-cream"
                        >
                          {messages.desk.openZone}
                        </Link>
                        <OpenPlannerLink
                          seed={{ regions: [zone.id] }}
                          className="inline-flex h-12 items-center rounded-full bg-terracotta px-5 text-sm text-cream"
                        >
                          {messages.dest.add}
                        </OpenPlannerLink>
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>
            </div>
          </section>

          <section id="pack-ride" className="relative z-10 border-t border-ink/8 px-4 py-10 md:px-6">
            <div className="mx-auto max-w-6xl">
              <TravelOptions zoneId={destinationId} locale={locale} messages={messages} />
            </div>
          </section>

          <section id="pack-walk" className="relative z-10 px-4 pb-8 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[1.8rem] bg-cream p-6 ring-1 ring-ink/8 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
                  {messages.desk.speak}
                </p>
                <p className="mt-2 text-sm text-ink-soft">{messages.desk.speakLead}</p>
                <p className="mt-4 font-display text-5xl" aria-live="polite">
                  {phrase.say}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink-soft">
                  {phrase.how}
                </p>
                <p className="mt-4 text-lg">{pick(phrase.mean, locale)}</p>
                <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
                  {parade[langIndex]?.[1]}
                  <span className="mx-2 text-terracotta">·</span>
                  {tip}
                </p>
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
              <article className="rounded-[1.8rem] bg-cream p-6 ring-1 ring-ink/8 md:p-8">
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

          <section className="relative z-10 border-t border-ink/8 px-4 py-8 md:px-6">
            <div className="mx-auto max-w-6xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
                {messages.desk.sights}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{messages.desk.more}</p>
              <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-3">
                <li>{messages.desk.sight1}</li>
                <li>{messages.desk.sight2}</li>
                <li>{messages.desk.sight3}</li>
                <li>{messages.desk.sight4}</li>
                <li>{messages.desk.sight5}</li>
                <li>{messages.desk.sight6}</li>
              </ul>
            </div>
          </section>

          <section className="relative z-10 pb-10">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
                {messages.desk.spine}
              </p>
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {selectorCycle.map((id) => {
                  const destId = selectorToDestinationId(id);
                  const destination = destinations.find((item) => item.id === destId);
                  if (!destination) return null;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setActive(id);
                        window.scrollTo({ top: 280, behavior: "smooth" });
                      }}
                      className="min-w-[200px] max-w-[220px] overflow-hidden rounded-[1.3rem] bg-white text-left ring-1 ring-black/10"
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
        </>
      )}

      <PhoneDeskDock messages={messages} tab={tab} onTab={setTab} />
    </div>
  );
}
