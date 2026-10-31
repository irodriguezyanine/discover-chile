"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  CalendarDays,
  MessageCircle,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import type { Destination } from "@/data/types";
import { chileanFoods, chileanPhrases, localeTipKey } from "@/data/chile-desk";
import { mapCycle as staticCycle, type MapZoneId } from "@/data/chile-map";
import type { Locale } from "@/i18n/config";
import { localeLabels } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import type { LiveMapData } from "@/data/chile-map";
import { ChileLiveMap } from "@/components/chile-live-map";
import { ChileFlag } from "@/components/chile-flag";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { TravelOptions } from "@/components/travel-options";
import { cn } from "@/lib/cn";

type TipId =
  | "when"
  | "tipping"
  | "manners"
  | "greet"
  | "dress"
  | "foods"
  | "forYou"
  | "practical";

export function TravelDesk({
  destinations,
  locale,
  messages,
  mapData,
}: {
  destinations: Destination[];
  locale: Locale;
  messages: Messages;
  mapData?: LiveMapData;
}) {
  const cycle = mapData?.cycle?.length ? mapData.cycle : staticCycle;
  const [active, setActive] = useState<MapZoneId>(cycle[0] ?? "atacama");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const [tipId, setTipId] = useState<TipId>("when");

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

  const tipCards: {
    id: TipId;
    label: string;
    icon: typeof HandCoins;
    accent?: "pine";
    preview: ReactNode;
    detail: ReactNode;
  }[] = [
    {
      id: "when",
      label: messages.desk.when,
      icon: CalendarDays,
      preview: (
        <ul className="mt-2 space-y-1 text-xs text-ink-soft">
          <li className="line-clamp-2">{messages.desk.when1}</li>
          <li className="line-clamp-1 text-ink-soft/80">{messages.desk.when2}</li>
        </ul>
      ),
      detail: (
        <ul className="space-y-2 text-sm text-ink-soft">
          <li>{messages.desk.when1}</li>
          <li>{messages.desk.when2}</li>
          <li>{messages.desk.when3}</li>
          <li>{messages.desk.when4}</li>
        </ul>
      ),
    },
    {
      id: "tipping",
      label: messages.desk.tipping,
      icon: HandCoins,
      preview: (
        <>
          <p className="mt-2 font-display text-3xl leading-none">10%</p>
          <p className="mt-2 line-clamp-2 text-xs text-ink-soft">{messages.desk.tippingD}</p>
        </>
      ),
      detail: (
        <>
          <p className="font-display text-4xl">10%</p>
          <p className="mt-2 text-sm text-ink-soft">{messages.desk.tippingD}</p>
        </>
      ),
    },
    {
      id: "manners",
      label: messages.desk.manners,
      icon: Utensils,
      preview: (
        <ul className="mt-2 space-y-1 text-xs text-ink-soft">
          <li className="line-clamp-2">{messages.desk.manners1}</li>
          <li className="line-clamp-1">{messages.desk.manners2}</li>
        </ul>
      ),
      detail: (
        <ul className="space-y-2 text-sm text-ink-soft">
          <li>{messages.desk.manners1}</li>
          <li>{messages.desk.manners2}</li>
          <li>{messages.desk.manners3}</li>
        </ul>
      ),
    },
    {
      id: "greet",
      label: messages.desk.greet,
      icon: Handshake,
      preview: (
        <ul className="mt-2 space-y-1 text-xs text-ink-soft">
          <li className="line-clamp-2">{messages.desk.greet1}</li>
          <li className="line-clamp-1">{messages.desk.greet2}</li>
        </ul>
      ),
      detail: (
        <ul className="space-y-2 text-sm text-ink-soft">
          <li>{messages.desk.greet1}</li>
          <li>{messages.desk.greet2}</li>
          <li>{messages.desk.greet3}</li>
        </ul>
      ),
    },
    {
      id: "dress",
      label: messages.desk.dress,
      icon: Shirt,
      preview: <p className="mt-2 line-clamp-3 text-xs text-ink-soft">{messages.desk.dress1}</p>,
      detail: <p className="text-sm text-ink-soft">{messages.desk.dress1}</p>,
    },
    {
      id: "foods",
      label: `${messages.desk.foods} · ${messages.desk.speak}`,
      icon: MessageCircle,
      preview: (
        <p className="mt-2 line-clamp-3 text-xs text-ink-soft">
          {phrase.say} — {pick(phrase.mean, locale)}
        </p>
      ),
      detail: (
        <div className="space-y-4">
          <div>
            <p className="font-display text-3xl">{phrase.say}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-soft">{phrase.how}</p>
            <p className="mt-2 text-sm">{pick(phrase.mean, locale)}</p>
          </div>
          <ul className="space-y-2 border-t border-ink/10 pt-3 text-sm text-ink-soft">
            {chileanFoods.slice(0, 3).map((food) => (
              <li key={food.id}>
                <span className="font-medium text-ink">{pick(food.name, locale)}</span>
                {" — "}
                {pick(food.note, locale)}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "forYou",
      label: messages.desk.forYou,
      icon: Sparkles,
      accent: "pine",
      preview: <p className="mt-2 line-clamp-4 text-xs text-cream/85">{tip}</p>,
      detail: <p className="text-sm leading-relaxed text-cream/90">{tip}</p>,
    },
    {
      id: "practical",
      label: messages.desk.practical,
      icon: LifeBuoy,
      preview: (
        <ul className="mt-2 space-y-1 text-xs text-ink-soft">
          <li className="line-clamp-1">{messages.desk.emergency}</li>
          <li className="line-clamp-1">{messages.desk.sim}</li>
        </ul>
      ),
      detail: (
        <ul className="space-y-1.5 text-sm text-ink-soft">
          <li>{messages.desk.emergency}</li>
          <li>{messages.desk.sim}</li>
          <li>{messages.desk.water}</li>
          <li>{messages.desk.time}</li>
          <li>{messages.desk.sag}</li>
          <li>{messages.desk.plugD}</li>
          <li>{messages.desk.moneyD}</li>
        </ul>
      ),
    },
  ];

  const selectedTip = tipCards.find((card) => card.id === tipId) ?? tipCards[0];

  return (
    <div className="bg-sand text-ink">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(196,92,38,0.12),transparent_42%),radial-gradient(circle_at_88%_20%,rgba(31,74,60,0.08),transparent_44%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-24 md:px-6 md:pt-28">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-pine">
            <ChileFlag variant="circle" className="size-7 ring-2 ring-ink/10" />
            {messages.hero.kicker}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink md:text-5xl">
            {messages.desk.heroTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-soft md:text-lg">{messages.desk.heroLead}</p>
          <div className="mt-5 flex flex-wrap gap-2">
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
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-3 py-1.5 text-sm text-ink-soft"
              >
                <Icon size={14} className="text-terracotta" />
                {label}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/8 bg-cream/60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-terracotta">
                {messages.desk.customsMenu}
              </p>
              <p className="mt-1 max-w-xl text-sm text-ink-soft">{messages.desk.customsMenuLead}</p>
            </div>
            <p className="text-sm text-ink-soft" aria-live="polite">
              {parade[langIndex]?.[1]}
              <span className="mx-2 text-terracotta">·</span>
              {phrase.say}
            </p>
          </div>

          <div className="-mx-1 mt-5 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
            {tipCards.map((card) => {
              const Icon = card.icon;
              const selected = tipId === card.id;
              const pine = card.accent === "pine";
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setTipId(card.id)}
                  aria-pressed={selected}
                  className={cn(
                    "min-w-[168px] max-w-[200px] shrink-0 rounded-[1.35rem] p-4 text-left transition ring-offset-2 ring-offset-sand",
                    pine
                      ? selected
                        ? "bg-pine text-cream ring-2 ring-pine"
                        : "bg-pine/90 text-cream hover:bg-pine"
                      : selected
                        ? "bg-cream text-ink ring-2 ring-terracotta shadow-sm"
                        : "bg-cream/80 text-ink ring-1 ring-ink/10 hover:bg-cream",
                  )}
                >
                  <p
                    className={cn(
                      "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]",
                      pine ? "text-glacier" : "text-terracotta",
                    )}
                  >
                    <Icon size={14} />
                    {card.label}
                  </p>
                  {card.preview}
                </button>
              );
            })}
          </div>

          <article
            className={cn(
              "mt-4 rounded-[1.5rem] p-5 md:p-6",
              selectedTip.accent === "pine" ? "bg-pine text-cream" : "bg-cream ring-1 ring-ink/8",
            )}
          >
            <p
              className={cn(
                "text-[11px] uppercase tracking-[0.22em]",
                selectedTip.accent === "pine" ? "text-glacier" : "text-terracotta",
              )}
            >
              {selectedTip.label}
            </p>
            <div className="mt-3">{selectedTip.detail}</div>
          </article>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 md:grid-cols-[0.95fr_1.05fr] md:px-6">
          <div>
            <ChileLiveMap
              destinations={destinations}
              locale={locale}
              messages={messages}
              active={active}
              onActive={setActive}
              mapData={mapData}
              tone="light"
            />
          </div>
          <div>
            {zone ? (
              <article className="overflow-hidden rounded-[1.6rem] bg-cream shadow-[0_18px_50px_rgba(16,32,24,0.08)] ring-1 ring-ink/8">
                <div className="relative h-44 md:h-52">
                  <Image
                    src={zone.image}
                    alt={pick(zone.imageAlt, locale)}
                    fill
                    className="object-cover"
                    sizes="520px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                  <p className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.2em] text-cream/90">
                    {pick(zone.region, locale)}
                  </p>
                </div>
                <div className="p-5 md:p-6">
                  <h2 className="font-display text-3xl">{pick(zone.name, locale)}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{pick(zone.summary, locale)}</p>
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
                      className="rounded-full bg-night px-4 py-2 text-sm text-cream"
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
        </div>
      </section>

      <section className="border-t border-ink/8 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-6xl">
          <TravelOptions zoneId={active} locale={locale} messages={messages} />
        </div>
      </section>

      <section className="px-4 pb-8 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.8rem] bg-cream p-6 ring-1 ring-ink/8 md:p-8">
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

      <section className="border-t border-ink/8 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
                {messages.desk.sights}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{messages.desk.more}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setTipId("when");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-terracotta underline-offset-4 hover:underline"
            >
              {messages.desk.customsMenu}
            </button>
          </div>
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

      <section className="pb-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
            {messages.desk.spine}
          </p>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {cycle.map((id) => {
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
                  className="min-w-[200px] overflow-hidden rounded-[1.3rem] bg-cream text-left ring-1 ring-ink/8"
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
