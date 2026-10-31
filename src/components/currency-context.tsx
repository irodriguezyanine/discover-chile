"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getCountryProfile } from "@/data/countries";
import {
  convertFromUsd,
  fallbackRates,
  formatMoney,
  isCurrency,
} from "@/lib/currency";
import { usePlanner } from "@/components/planner-context";

const CURRENCY_KEY = "dc-currency";
const MANUAL_KEY = "dc-currency-manual";

type CurrencyContextValue = {
  currency: string;
  rates: Record<string, number>;
  live: boolean;
  setCurrency: (code: string, source?: "user" | "country") => void;
  fromUsd: (amountUsd: number) => number;
  amount: (amountUsd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function subscribeStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

// Cache for stored currency values to prevent infinite loop
const defaultCurrency = { currency: "USD", manual: false };
let cachedStoredCurrency = defaultCurrency;

function readStoredCurrency() {
  const stored = window.localStorage.getItem(CURRENCY_KEY);
  const manual = window.localStorage.getItem(MANUAL_KEY) === "1";
  if (stored && isCurrency(stored)) {
    const newValue = { currency: stored, manual };
    // Only update cache if values actually changed
    if (cachedStoredCurrency.currency !== stored || cachedStoredCurrency.manual !== manual) {
      cachedStoredCurrency = newValue;
    }
    return cachedStoredCurrency;
  }
  return defaultCurrency;
}

// Cached server snapshot to prevent infinite loop
function getServerSnapshot() {
  return defaultCurrency;
}

function useRates() {
  const [rates, setRates] = useState(fallbackRates);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (!cancelled && data.rates) {
          setRates({ USD: 1, ...data.rates });
          setLive(true);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return { rates, live };
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { plan, guest } = usePlanner();
  const { rates, live } = useRates();
  const stored = useSyncExternalStore(
    subscribeStorage,
    readStoredCurrency,
    getServerSnapshot,
  );
  const [override, setOverride] = useState<{
    currency: string;
    manual: boolean;
  } | null>(null);

  const currencyState = override ?? stored;
  const countryCode = guest?.country || plan.country;
  const countryCurrency = getCountryProfile(countryCode).currency;
  const resolvedCurrency =
    currencyState.manual || !isCurrency(countryCurrency)
      ? currencyState.currency
      : countryCurrency;

  const setCurrency = useCallback(
    (code: string, source: "user" | "country" = "user") => {
      if (!isCurrency(code)) return;
      const manual = source === "user" ? true : currencyState.manual;
      window.localStorage.setItem(CURRENCY_KEY, code);
      if (source === "user") {
        window.localStorage.setItem(MANUAL_KEY, "1");
      }
      setOverride({ currency: code, manual });
    },
    [currencyState.manual],
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency: resolvedCurrency,
      rates,
      live,
      setCurrency,
      fromUsd: (amountUsd) =>
        convertFromUsd(amountUsd, resolvedCurrency, rates),
      amount: (amountUsd) =>
        formatMoney(
          convertFromUsd(amountUsd, resolvedCurrency, rates),
          resolvedCurrency,
          "es-CL",
        ),
    }),
    [live, rates, resolvedCurrency, setCurrency],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}

export { currencies, isCurrency } from "@/lib/currency";
