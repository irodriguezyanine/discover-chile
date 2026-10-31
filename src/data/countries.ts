import type { CountryProfile } from "@/data/types";

export const popularCountryCodes = [
  "AR",
  "BR",
  "US",
  "DE",
  "FR",
  "ES",
  "GB",
  "AU",
  "MX",
  "CO",
  "IT",
  "PE",
  "CA",
  "JP",
  "CN",
  "NL",
  "CH",
  "KR",
  "UY",
  "BO",
] as const;

export const countryProfiles: CountryProfile[] = [
  { code: "AR", currency: "ARS", visa: "id", flightHoursToScl: 2, ecoBias: false, prefersSnow: true, drives: true, tipKey: "ar" },
  { code: "BR", currency: "BRL", visa: "id", flightHoursToScl: 4, ecoBias: false, prefersSnow: true, drives: false, tipKey: "br" },
  { code: "US", currency: "USD", visa: "free", flightHoursToScl: 10, ecoBias: false, prefersSnow: false, drives: false, tipKey: "us" },
  { code: "CA", currency: "CAD", visa: "free", flightHoursToScl: 12, ecoBias: true, prefersSnow: false, drives: false, tipKey: "us" },
  { code: "MX", currency: "MXN", visa: "free", flightHoursToScl: 8, ecoBias: false, prefersSnow: false, drives: false, tipKey: "mx" },
  { code: "CO", currency: "COP", visa: "id", flightHoursToScl: 6, ecoBias: false, prefersSnow: false, drives: false, tipKey: "co" },
  { code: "PE", currency: "PEN", visa: "id", flightHoursToScl: 4, ecoBias: false, prefersSnow: false, drives: true, tipKey: "pe" },
  { code: "BO", currency: "BOB", visa: "id", flightHoursToScl: 3, ecoBias: false, prefersSnow: false, drives: true, tipKey: "bo" },
  { code: "UY", currency: "UYU", visa: "id", flightHoursToScl: 2.5, ecoBias: false, prefersSnow: false, drives: true, tipKey: "ar" },
  { code: "PY", currency: "PYG", visa: "id", flightHoursToScl: 3, ecoBias: false, prefersSnow: false, drives: true, tipKey: "ar" },
  { code: "EC", currency: "USD", visa: "id", flightHoursToScl: 5, ecoBias: false, prefersSnow: false, drives: false, tipKey: "pe" },
  { code: "DE", currency: "EUR", visa: "free", flightHoursToScl: 14, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "AT", currency: "EUR", visa: "free", flightHoursToScl: 15, ecoBias: true, prefersSnow: true, drives: false, tipKey: "de" },
  { code: "CH", currency: "CHF", visa: "free", flightHoursToScl: 15, ecoBias: true, prefersSnow: true, drives: false, tipKey: "de" },
  { code: "NL", currency: "EUR", visa: "free", flightHoursToScl: 14, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "BE", currency: "EUR", visa: "free", flightHoursToScl: 14, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "FR", currency: "EUR", visa: "free", flightHoursToScl: 14, ecoBias: true, prefersSnow: false, drives: false, tipKey: "fr" },
  { code: "ES", currency: "EUR", visa: "free", flightHoursToScl: 13, ecoBias: false, prefersSnow: false, drives: false, tipKey: "es" },
  { code: "IT", currency: "EUR", visa: "free", flightHoursToScl: 14, ecoBias: false, prefersSnow: false, drives: false, tipKey: "it" },
  { code: "PT", currency: "EUR", visa: "free", flightHoursToScl: 12, ecoBias: false, prefersSnow: false, drives: false, tipKey: "es" },
  { code: "GB", currency: "GBP", visa: "free", flightHoursToScl: 14, ecoBias: true, prefersSnow: false, drives: false, tipKey: "gb" },
  { code: "IE", currency: "EUR", visa: "free", flightHoursToScl: 14, ecoBias: true, prefersSnow: false, drives: false, tipKey: "gb" },
  { code: "AU", currency: "AUD", visa: "free", flightHoursToScl: 13, ecoBias: false, prefersSnow: false, drives: false, tipKey: "au" },
  { code: "NZ", currency: "NZD", visa: "free", flightHoursToScl: 12, ecoBias: true, prefersSnow: false, drives: false, tipKey: "au" },
  { code: "JP", currency: "JPY", visa: "free", flightHoursToScl: 20, ecoBias: false, prefersSnow: false, drives: false, tipKey: "jp" },
  { code: "KR", currency: "KRW", visa: "free", flightHoursToScl: 20, ecoBias: false, prefersSnow: false, drives: false, tipKey: "kr" },
  { code: "CN", currency: "CNY", visa: "us_waiver", flightHoursToScl: 22, ecoBias: false, prefersSnow: false, drives: false, tipKey: "cn" },
  { code: "TW", currency: "TWD", visa: "free", flightHoursToScl: 22, ecoBias: false, prefersSnow: false, drives: false, tipKey: "cn" },
  { code: "HK", currency: "HKD", visa: "free", flightHoursToScl: 22, ecoBias: false, prefersSnow: false, drives: false, tipKey: "cn" },
  { code: "IN", currency: "INR", visa: "us_waiver", flightHoursToScl: 22, ecoBias: false, prefersSnow: false, drives: false, tipKey: "in" },
  { code: "IL", currency: "ILS", visa: "free", flightHoursToScl: 16, ecoBias: false, prefersSnow: false, drives: false, tipKey: "us" },
  { code: "ZA", currency: "ZAR", visa: "free", flightHoursToScl: 12, ecoBias: false, prefersSnow: false, drives: false, tipKey: "au" },
  { code: "SE", currency: "SEK", visa: "free", flightHoursToScl: 16, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "NO", currency: "NOK", visa: "free", flightHoursToScl: 16, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "DK", currency: "DKK", visa: "free", flightHoursToScl: 15, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "FI", currency: "EUR", visa: "free", flightHoursToScl: 16, ecoBias: true, prefersSnow: false, drives: false, tipKey: "de" },
  { code: "PL", currency: "PLN", visa: "free", flightHoursToScl: 15, ecoBias: false, prefersSnow: false, drives: false, tipKey: "gb" },
  { code: "RU", currency: "RUB", visa: "required", flightHoursToScl: 18, ecoBias: false, prefersSnow: false, drives: false, tipKey: "ru" },
  { code: "AE", currency: "AED", visa: "free", flightHoursToScl: 16, ecoBias: false, prefersSnow: false, drives: false, tipKey: "ae" },
  { code: "SA", currency: "SAR", visa: "required", flightHoursToScl: 16, ecoBias: false, prefersSnow: false, drives: false, tipKey: "ae" },
  { code: "DO", currency: "DOP", visa: "us_waiver", flightHoursToScl: 9, ecoBias: false, prefersSnow: false, drives: false, tipKey: "mx" },
  { code: "CL", currency: "CLP", visa: "free", flightHoursToScl: 0, ecoBias: false, prefersSnow: false, drives: true, tipKey: "cl" },
];

export const extraCountryCodes = [
  "AF","AL","DZ","AD","AO","AM","AZ","BH","BD","BY","BJ","BT","BA","BW","BN","BG","BF","BI","KH","CM","CV","CF","TD","KM","CG","CD","CI","HR","CY","CZ","DJ","EG","GQ","ER","EE","ET","FJ","GA","GM","GE","GH","GR","GN","GW","GY","HT","HU","IS","ID","IR","IQ","JM","JO","KZ","KE","KW","KG","LA","LV","LB","LS","LR","LY","LT","LU","MG","MW","MY","MV","ML","MT","MR","MU","MD","MC","MN","ME","MA","MZ","MM","NA","NP","NE","NG","MK","OM","PK","PS","PH","QA","RO","RW","SN","RS","SG","SK","SI","SO","LK","SD","SR","SZ","SY","TJ","TZ","TH","TL","TG","TN","TR","TM","UG","UA","UZ","VN","YE","ZM","ZW",
];

export function getCountryProfile(code: string): CountryProfile {
  return (
    countryProfiles.find((country) => country.code === code) ?? {
      code,
      currency: "USD",
      visa: "required",
      flightHoursToScl: 16,
      ecoBias: false,
      prefersSnow: false,
      drives: false,
      tipKey: "generic",
    }
  );
}

let cachedAllCountryCodes: string[] | null = null;

export function allCountryCodes(): string[] {
  if (cachedAllCountryCodes) return cachedAllCountryCodes;
  const profileCodes = new Set(countryProfiles.map((country) => country.code));
  const extras = extraCountryCodes.filter((code) => !profileCodes.has(code));
  cachedAllCountryCodes = [
    ...countryProfiles.map((country) => country.code),
    ...extras,
  ].sort();
  return cachedAllCountryCodes;
}

const displayNamesCache = new Map<string, Intl.DisplayNames>();

export function countryName(code: string, locale: string): string {
  try {
    let names = displayNamesCache.get(locale);
    if (!names) {
      names = new Intl.DisplayNames([locale], { type: "region" });
      displayNamesCache.set(locale, names);
    }
    return names.of(code) ?? code;
  } catch {
    return code;
  }
}
