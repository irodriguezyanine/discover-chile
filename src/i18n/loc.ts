import { locales, type Locale } from "@/i18n/config";
import type { Localized } from "@/data/types";

type LocInput = Partial<Localized> & { en: string; es: string };

export function loc(input: LocInput): Localized {
  const fallback: Localized = {
    en: input.en,
    es: input.es,
    pt: input.pt ?? input.es,
    de: input.de ?? input.en,
    fr: input.fr ?? input.en,
    it: input.it ?? input.en,
    nl: input.nl ?? input.en,
    ja: input.ja ?? input.en,
    ko: input.ko ?? input.en,
    zh: input.zh ?? input.en,
    ru: input.ru ?? input.en,
    ar: input.ar ?? input.en,
  };

  return Object.fromEntries(
    locales.map((locale) => [locale, input[locale] ?? fallback[locale]]),
  ) as Localized;
}

export function pick(text: Localized, locale: Locale): string {
  return text[locale] || text.en;
}
