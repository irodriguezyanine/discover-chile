export const fallbackRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.76,
  CAD: 1.37,
  AUD: 1.52,
  NZD: 1.68,
  JPY: 151,
  CNY: 7.15,
  KRW: 1380,
  BRL: 5.45,
  ARS: 1450,
  CLP: 950,
  MXN: 18.2,
  COP: 4100,
  PEN: 3.72,
  BOB: 6.9,
  UYU: 41,
  PYG: 7900,
  CHF: 0.85,
  SEK: 10.4,
  NOK: 10.6,
  DKK: 6.85,
  PLN: 3.9,
  INR: 84,
  ILS: 3.7,
  ZAR: 18.1,
  AED: 3.67,
  SAR: 3.75,
  RUB: 92,
  TWD: 32.4,
  HKD: 7.8,
  SGD: 1.34,
};

export const currencies = [
  "USD",
  "EUR",
  "GBP",
  "BRL",
  "ARS",
  "MXN",
  "CAD",
  "AUD",
  "NZD",
  "JPY",
  "CNY",
  "KRW",
  "COP",
  "PEN",
  "BOB",
  "UYU",
  "PYG",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "INR",
  "ILS",
  "ZAR",
  "AED",
  "SAR",
  "RUB",
  "TWD",
  "HKD",
  "SGD",
  "CLP",
] as const;

export type CurrencyCode = (typeof currencies)[number];

export function isCurrency(value: string): value is CurrencyCode {
  return (currencies as readonly string[]).includes(value);
}

export async function fetchUsdRates(): Promise<Record<string, number>> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!response.ok) return fallbackRates;
    const data = (await response.json()) as { rates?: Record<string, number> };
    return { USD: 1, ...(data.rates ?? {}) };
  } catch {
    return fallbackRates;
  }
}

export function convertFromUsd(
  amountUsd: number,
  currency: string,
  rates: Record<string, number>,
) {
  const rate = rates[currency] ?? fallbackRates[currency] ?? 1;
  return amountUsd * rate;
}

export function formatMoney(amount: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: amount >= 1000 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}
