"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronUp,
  Handshake,
  LifeBuoy,
  Shirt,
  Utensils,
  X,
} from "lucide-react";
import { chileanFoods, chileanPhrases } from "@/data/chile-desk";
import { img } from "@/data/images";
import { tipSheets } from "@/data/tip-sheets";
import { fuelBrands } from "@/data/fuel";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

type TipTab = "culture" | "slang" | "customs";
type TipFact = "apps" | "money" | "sos" | "plug" | "tip" | "move";

const tipImages = {
  culture: img.santiago,
  slang: img.valparaiso,
  customs: img.wine,
  apps: img.santiago,
  money:
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1400&q=80",
  plug: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80",
  sos: img.stars,
  tip: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  move: img.santiago,
} as const;

const sizeMin: Record<"sm" | "md" | "hero", string> = {
  sm: "min-h-[8.6rem]",
  md: "min-h-[11rem]",
  hero: "min-h-[18rem] h-full md:min-h-[22rem]",
};

const sizeTitle: Record<"sm" | "md" | "hero", string> = {
  sm: "text-[1.4rem]",
  md: "text-[1.65rem]",
  hero: "text-[2.1rem] md:text-4xl",
};

function TipTile({
  image,
  title,
  hint,
  onClick,
  light,
  size = "sm",
  className,
}: {
  image: string;
  title: string;
  hint: string;
  onClick: () => void;
  light?: boolean;
  size?: "sm" | "md" | "hero";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative isolate overflow-hidden rounded-[1.35rem] text-left ring-1 ring-black/10",
        sizeMin[size],
        className,
      )}
    >
      <Image src={image} alt="" fill className="object-cover" sizes="280px" />
      <span className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent" />
      <span
        className={cn(
          "relative z-10 flex h-full flex-col justify-end p-2.5",
          sizeMin[size],
        )}
      >
        <span
          className={cn(
            "rounded-[1.05rem] px-3 py-2 shadow-[0_10px_28px_rgba(8,20,16,0.22)]",
            light ? "bg-cream/95 text-ink" : "bg-night/88 text-cream",
          )}
        >
          <span className="block text-[10px] uppercase tracking-[0.16em] text-terracotta">
            {hint}
          </span>
          <span className={cn("font-display leading-tight", sizeTitle[size])}>
            {title}
          </span>
        </span>
      </span>
    </button>
  );
}

function SheetLines({
  lead,
  lines,
  locale,
}: {
  lead: string;
  lines: { title: string; body: string }[];
  locale: Locale;
}) {
  return (
    <>
      <p className="text-sm leading-relaxed text-ink">{lead}</p>
      <ul className="mt-4 space-y-2">
        {lines.map((line) => (
          <li
            key={line.title}
            className="rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.06]"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-terracotta">
              {line.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{line.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function TipSheetModal({
  open,
  title,
  onClose,
  children,
  messages,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  messages: Messages;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-night/40 p-3 sm:place-items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[min(88vh,44rem)] w-full max-w-xl overflow-y-auto rounded-[1.6rem] bg-cream p-5 shadow-[0_24px_80px_rgba(8,20,16,0.28)] ring-1 ring-black/10 md:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-black/10"
            title={messages.common.close}
            aria-label={messages.common.close}
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CustomsPanel({ messages }: { messages: Messages }) {
  const desk = messages.desk;
  return (
    <div className="space-y-3">
      <article className="rounded-[1.3rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-terracotta">
          <Handshake size={13} />
          {desk.greet}
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[desk.greet1, desk.greet2, desk.greet3].map((text) => (
            <p key={text} className="rounded-xl bg-sand px-1 py-3">
              <Handshake size={18} className="mx-auto text-terracotta" />
              <span className="mt-2 block text-[11px] leading-snug text-ink-soft">
                {text}
              </span>
            </p>
          ))}
        </div>
      </article>
      <article className="rounded-[1.3rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-terracotta">
          <Utensils size={13} />
          {desk.manners}
        </p>
        <ul className="mt-3 space-y-2">
          {[desk.manners1, desk.manners2, desk.manners3].map((text) => (
            <li
              key={text}
              className="rounded-xl bg-sand px-3 py-2.5 text-sm leading-snug"
            >
              {text}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-[1.3rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-terracotta">
          <Shirt size={13} />
          {desk.dress}
        </p>
        <p className="mt-2 text-sm leading-relaxed">{desk.dress1}</p>
      </article>
      <ul className="grid gap-2 sm:grid-cols-2">
        {[desk.sag, desk.sim, desk.water, desk.time].map((text) => (
          <li
            key={text}
            className="rounded-[1.2rem] bg-white px-4 py-3 text-sm leading-snug ring-1 ring-black/[0.06]"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SlangPanel({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [index, setIndex] = useState(0);
  const phrase = chileanPhrases[index % chileanPhrases.length];
  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">{messages.desk.speakLead}</p>
      <div className="rounded-[1.4rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-terracotta">
          {messages.desk.speak}
        </p>
        <p className="mt-2 font-display text-4xl leading-none">{phrase.say}</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          {phrase.how}
        </p>
        <p className="mt-3 text-sm leading-relaxed">{pick(phrase.mean, locale)}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {chileanPhrases.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm ring-1 transition",
              i === index
                ? "bg-ink text-cream ring-ink"
                : "bg-white text-ink ring-black/10 hover:ring-terracotta/40",
            )}
          >
            {item.say}
          </button>
        ))}
      </div>
    </div>
  );
}

function CulturePanel({ locale, messages }: { locale: Locale; messages: Messages }) {
  const desk = messages.desk;
  return (
    <div className="space-y-4">
      <article className="rounded-[1.3rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-terracotta">
          {desk.when}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          {[desk.when1, desk.when2, desk.when3, desk.when4].map((text) => (
            <li key={text} className="rounded-xl bg-sand px-3 py-2.5">
              {text}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-[1.3rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-terracotta">
          {desk.foods}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          {chileanFoods.slice(0, 4).map((food) => (
            <li key={food.id} className="rounded-xl bg-sand px-3 py-2.5">
              <span className="font-medium text-ink">{pick(food.name, locale)}</span>
              {" — "}
              {pick(food.note, locale)}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-[1.3rem] bg-white px-4 py-4 ring-1 ring-black/[0.06]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-terracotta">
          {desk.sights}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          {[desk.sight1, desk.sight2, desk.sight3, desk.sight4, desk.sight5, desk.sight6].map(
            (text) => (
              <li key={text}>{text}</li>
            ),
          )}
        </ul>
      </article>
    </div>
  );
}

function AppsPanel({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-soft">{messages.desk.appsLead}</p>
      <ul className="space-y-2">
        {fuelBrands.map((brand) => (
          <li
            key={brand.id}
            className="flex items-center justify-between gap-3 rounded-[1.2rem] bg-white px-4 py-3 ring-1 ring-black/[0.06]"
          >
            <div>
              <p className="font-medium">{brand.name}</p>
              <p className="text-xs text-ink-soft">{pick(brand.note, locale)}</p>
            </div>
            <a
              href={brand.app || brand.site}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-terracotta"
            >
              {brand.appName}
            </a>
          </li>
        ))}
      </ul>
      <Link
        href={`/${locale}/fuel`}
        className="inline-flex rounded-full bg-ink px-4 py-2 text-sm text-cream"
      >
        {messages.desk.appsTitle}
      </Link>
    </div>
  );
}

function PlugPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <figure className="rounded-2xl bg-white px-3 py-4 ring-1 ring-black/[0.07]">
        <figcaption className="text-center text-sm font-medium">Tipo C</figcaption>
        <p className="text-center text-xs text-ink-soft">Europlug · 2 pines · la mayoría de hoteles</p>
      </figure>
      <figure className="rounded-2xl bg-white px-3 py-4 ring-1 ring-black/[0.07]">
        <figcaption className="text-center text-sm font-medium">Tipo L</figcaption>
        <p className="text-center text-xs text-ink-soft">Italiano de tres · edificios viejos</p>
      </figure>
    </div>
  );
}

export function TipsHub({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const desk = messages.desk;
  const [tab, setTab] = useState<TipTab | null>(null);
  const [fact, setFact] = useState<TipFact | null>(null);
  const [folded, setFolded] = useState(false);

  useEffect(() => {
    try {
      setFolded(sessionStorage.getItem("dc-consejos") === "fold");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!tab) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTab(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab]);

  const tiles: {
    id: TipTab | TipFact;
    title: string;
    hint: string;
    image: string;
    light?: boolean;
    size: "sm" | "md" | "hero";
    className?: string;
    kind: "tab" | "fact";
  }[] = [
    {
      id: "culture",
      title: desk.tipsCulture,
      hint: desk.tipsCultureHint,
      image: tipImages.culture,
      light: true,
      size: "hero",
      className: "col-span-2 row-span-2",
      kind: "tab",
    },
    {
      id: "slang",
      title: desk.tipsSlang,
      hint: desk.tipsSlangHint,
      image: tipImages.slang,
      size: "md",
      kind: "tab",
    },
    {
      id: "customs",
      title: desk.tipsCustoms,
      hint: desk.tipsCustomsHint,
      image: tipImages.customs,
      size: "md",
      kind: "tab",
    },
    {
      id: "apps",
      title: desk.tipsApps,
      hint: desk.tipsAppsHint,
      image: tipImages.apps,
      size: "md",
      kind: "fact",
    },
    {
      id: "money",
      title: desk.tipsMoney,
      hint: desk.tipsMoneyHint,
      image: tipImages.money,
      size: "md",
      kind: "fact",
    },
    {
      id: "plug",
      title: desk.tipsPlug,
      hint: desk.tipsPlugHint,
      image: tipImages.plug,
      size: "sm",
      kind: "fact",
    },
    {
      id: "sos",
      title: desk.tipsSos,
      hint: desk.tipsSosHint,
      image: tipImages.sos,
      size: "sm",
      kind: "fact",
    },
    {
      id: "tip",
      title: desk.tipsTip,
      hint: desk.tipsTipHint,
      image: tipImages.tip,
      size: "sm",
      kind: "fact",
    },
    {
      id: "move",
      title: pick(tipSheets.move.title, locale),
      hint: desk.moveShort,
      image: tipImages.move,
      size: "sm",
      kind: "fact",
    },
  ];

  const tabButtons: { id: TipTab; label: string }[] = [
    { id: "culture", label: desk.tipsCulture },
    { id: "slang", label: desk.tipsSlang },
    { id: "customs", label: desk.tipsCustoms },
  ];

  return (
    <div className="relative mt-5">
      <div
        className={cn(
          "flex items-start justify-between gap-3",
          tab && "invisible",
        )}
      >
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.28em] text-terracotta">
            {desk.phoneTabTips}
          </p>
          <h2 className="mt-1 font-display text-3xl leading-tight">{desk.tipsHub}</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setFolded((value) => {
              const next = !value;
              try {
                sessionStorage.setItem("dc-consejos", next ? "fold" : "open");
              } catch {
                /* ignore */
              }
              return next;
            });
            if (!folded) {
              setTab(null);
              setFact(null);
            }
          }}
          className="mt-1 grid size-11 shrink-0 place-items-center rounded-full bg-white ring-1 ring-black/10 transition hover:ring-terracotta/40"
          aria-expanded={!folded}
          title={folded ? desk.tipsUnfold : desk.tipsFold}
          aria-label={folded ? desk.tipsUnfold : desk.tipsFold}
        >
          <ChevronUp
            size={18}
            className={cn("transition", folded ? "" : "rotate-180")}
          />
        </button>
      </div>

      {folded ? null : (
        <nav
          className={cn(
            "mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3",
            tab && "invisible pointer-events-none",
          )}
        >
          {tiles.map((tile) => (
            <TipTile
              key={tile.id}
              image={tile.image}
              title={tile.title}
              hint={tile.hint}
              light={tile.light}
              size={tile.size}
              className={tile.className}
              onClick={() => {
                if (tile.kind === "tab") {
                  setFact(null);
                  setTab((current) =>
                    current === tile.id ? current : (tile.id as TipTab),
                  );
                } else {
                  setTab(null);
                  setFact(tile.id as TipFact);
                }
              }}
            />
          ))}
        </nav>
      )}

      {tab ? (
        <div
          id="desk-consejos-panel"
          className="absolute inset-x-0 top-0 z-20 min-h-full rounded-[1.6rem] bg-cream p-4 shadow-[0_24px_80px_rgba(8,20,16,0.14)] ring-1 ring-black/10 md:p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            {tabButtons.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm ring-1 transition",
                  tab === item.id
                    ? "bg-ink text-cream ring-ink"
                    : "bg-white text-ink ring-black/10 hover:ring-terracotta/40",
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setTab(null)}
              className="ml-auto grid size-10 place-items-center rounded-full bg-white ring-1 ring-black/10"
              title={messages.common.close}
              aria-label={messages.common.close}
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-5">
            {tab === "culture" ? (
              <CulturePanel locale={locale} messages={messages} />
            ) : null}
            {tab === "slang" ? (
              <SlangPanel locale={locale} messages={messages} />
            ) : null}
            {tab === "customs" ? <CustomsPanel messages={messages} /> : null}
          </div>
        </div>
      ) : null}

      <TipSheetModal
        open={fact === "apps"}
        title={desk.tipsApps}
        onClose={() => setFact(null)}
        messages={messages}
      >
        <AppsPanel locale={locale} messages={messages} />
      </TipSheetModal>

      <TipSheetModal
        open={fact === "tip"}
        title={pick(tipSheets.tip.title, locale)}
        onClose={() => setFact(null)}
        messages={messages}
      >
        <div className="relative mb-4 h-40 overflow-hidden rounded-[1.2rem] md:h-48">
          <Image
            src={tipImages.tip}
            alt={pick(tipSheets.tip.title, locale)}
            fill
            className="object-cover"
            sizes="640px"
          />
        </div>
        <p className="font-display text-4xl text-terracotta">10%</p>
        <div className="mt-3">
          <SheetLines
            lead={pick(tipSheets.tip.lead, locale)}
            lines={tipSheets.tip.lines.map((line) => ({
              title: pick(line.title, locale),
              body: pick(line.body, locale),
            }))}
            locale={locale}
          />
        </div>
      </TipSheetModal>

      <TipSheetModal
        open={fact === "money"}
        title={pick(tipSheets.money.title, locale)}
        onClose={() => setFact(null)}
        messages={messages}
      >
        <SheetLines
          lead={pick(tipSheets.money.lead, locale)}
          lines={tipSheets.money.lines.map((line) => ({
            title: pick(line.title, locale),
            body: pick(line.body, locale),
          }))}
          locale={locale}
        />
      </TipSheetModal>

      <TipSheetModal
        open={fact === "plug"}
        title={pick(tipSheets.plug.title, locale)}
        onClose={() => setFact(null)}
        messages={messages}
      >
        <PlugPanel />
        <div className="mt-5">
          <SheetLines
            lead={pick(tipSheets.plug.lead, locale)}
            lines={tipSheets.plug.lines.map((line) => ({
              title: pick(line.title, locale),
              body: pick(line.body, locale),
            }))}
            locale={locale}
          />
        </div>
      </TipSheetModal>

      <TipSheetModal
        open={fact === "sos"}
        title={pick(tipSheets.sos.title, locale)}
        onClose={() => setFact(null)}
        messages={messages}
      >
        <ul className="mb-5 grid grid-cols-3 gap-2">
          {(
            [
              ["133", desk.police, "tel:133"],
              ["131", desk.ambulance, "tel:131"],
              ["132", desk.fire, "tel:132"],
            ] as const
          ).map(([num, label, href]) => (
            <li key={num}>
              <a
                href={href}
                className="flex flex-col items-center rounded-[1.2rem] bg-white px-2 py-4 text-center ring-1 ring-black/[0.06]"
              >
                <LifeBuoy size={18} className="text-terracotta" />
                <span className="mt-2 font-display text-2xl">{num}</span>
                <span className="mt-1 text-[11px] uppercase tracking-wider text-ink-soft">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <SheetLines
          lead={pick(tipSheets.sos.lead, locale)}
          lines={tipSheets.sos.lines.map((line) => ({
            title: pick(line.title, locale),
            body: pick(line.body, locale),
          }))}
          locale={locale}
        />
      </TipSheetModal>

      <TipSheetModal
        open={fact === "move"}
        title={pick(tipSheets.move.title, locale)}
        onClose={() => setFact(null)}
        messages={messages}
      >
        <SheetLines
          lead={pick(tipSheets.move.lead, locale)}
          lines={tipSheets.move.lines.map((line) => ({
            title: pick(line.title, locale),
            body: pick(line.body, locale),
          }))}
          locale={locale}
        />
        <Link
          href={`/${locale}/activities`}
          className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-cream"
        >
          {desk.wantRide}
        </Link>
      </TipSheetModal>

    </div>
  );
}
