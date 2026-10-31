"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, Search } from "lucide-react";
import {
  allCountryCodes,
  countryName,
  getCountryProfile,
  popularCountryCodes,
} from "@/data/countries";
import { deskCursors, persistCursor } from "@/data/cursors";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { currencies, isCurrency, useCurrency } from "@/components/currency-context";
import { CountryFlag } from "@/components/country-flag";
import { cn } from "@/lib/cn";

const localeOrder: Locale[] = [
  "es",
  "en",
  "pt",
  "de",
  "fr",
  "it",
  "nl",
  "ja",
  "ko",
  "zh",
  "ru",
  "ar",
];

function LanguageSelect({
  locale,
  title,
  onBeforePick,
}: {
  locale: Locale;
  title: string;
  onBeforePick?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (next: string) => {
    if (next === locale) return;
    onBeforePick?.();
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    const segments = pathname.split("/");
    segments[1] = next;
    router.replace(segments.join("/") || `/${next}`);
  };

  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
        {title}
      </span>
      <select
        value={locale}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-full bg-white px-4 text-sm outline-none ring-1 ring-black/10"
        aria-label={title}
      >
        {localeOrder
          .filter((item) => locales.includes(item))
          .map((item) => (
            <option key={item} value={item}>
              {localeLabels[item]}
            </option>
          ))}
      </select>
    </label>
  );
}

export function WelcomeIdentityFields({
  locale,
  messages,
  name,
  onName,
  country,
  onCountry,
  cursor,
  onCursor,
  onBeforeLocale,
}: {
  locale: Locale;
  messages: Messages;
  name: string;
  onName: (value: string) => void;
  country: string;
  onCountry: (value: string) => void;
  cursor: string;
  onCursor: (value: string) => void;
  onBeforeLocale?: () => void;
}) {
  const desk = messages.desk;
  const { currency, setCurrency } = useCurrency();
  const [query, setQuery] = useState("");
  const [currencyTouched, setCurrencyTouched] = useState(false);

  const matches = useMemo(() => {
    const all = allCountryCodes();
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return all.filter(
      (code) =>
        countryName(code, locale).toLowerCase().includes(q) ||
        code.toLowerCase().includes(q),
    );
  }, [locale, query]);

  const visible = query.trim()
    ? matches.slice(0, 8)
    : ["CL", ...popularCountryCodes].slice(0, 8);

  const pickCurrency = (code: string) => {
    setCurrencyTouched(true);
    setCurrency(code, "user");
  };

  const pickCountry = (code: string) => {
    onCountry(code);
    setQuery("");
    if (currencyTouched) return;
    const next = getCountryProfile(code).currency;
    if (isCurrency(next)) setCurrency(next, "country");
  };

  return (
    <div className="space-y-5">
      <LanguageSelect
        locale={locale}
        title={desk.phoneLangQ}
        onBeforePick={onBeforeLocale}
      />

      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
          {desk.phoneCurrencyQ}
        </span>
        <select
          value={currency}
          onChange={(event) => pickCurrency(event.target.value)}
          className="mt-2 h-11 w-full rounded-full bg-white px-4 text-sm outline-none ring-1 ring-black/10"
          aria-label={desk.phoneCurrencyQ}
        >
          {currencies.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
          {messages.planner.countryQ}
        </p>
        <label className="relative mt-2 block">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft/70"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={messages.planner.search}
            className="h-12 w-full rounded-full border border-line bg-white px-11 text-base outline-none focus:border-terracotta"
          />
        </label>
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {visible.map((code) => {
            const active = country === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => pickCountry(code)}
                className={cn(
                  "flex min-h-11 items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 text-left text-xs ring-1",
                  active ? "ring-2 ring-terracotta" : "ring-black/10",
                )}
              >
                <CountryFlag code={code} className="size-5 shrink-0" />
                <span className="min-w-0 truncate">
                  {countryName(code, locale)}
                </span>
                {active ? (
                  <Check
                    size={12}
                    className="ml-auto shrink-0 text-terracotta"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
          {desk.holaPo}
        </span>
        <span className="mt-2 block font-display text-2xl leading-tight">
          {desk.phoneNameQ}
        </span>
        <input
          value={name}
          onChange={(event) => onName(event.target.value.slice(0, 32))}
          placeholder={desk.phoneNamePh}
          autoComplete="given-name"
          autoCapitalize="words"
          maxLength={32}
          className="mt-3 h-12 w-full rounded-[1.1rem] bg-white px-4 text-base outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-terracotta"
        />
      </label>

      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
          {desk.deskCursorQ}
        </p>
        <ul className="mt-3 grid grid-cols-4 gap-2">
          {deskCursors.map((item) => {
            const active = cursor === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onCursor(item.id);
                    persistCursor(item.id);
                  }}
                  title={item.label}
                  aria-label={item.label}
                  aria-pressed={active}
                  className={cn(
                    "grid h-[4.6rem] w-full place-items-center rounded-[1.2rem] bg-white ring-1 transition",
                    active
                      ? "ring-2 ring-terracotta"
                      : "ring-black/10 hover:ring-terracotta/40",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    className="max-h-10 max-w-8 object-contain"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
