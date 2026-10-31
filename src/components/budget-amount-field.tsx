"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  convertFromUsd,
  convertToUsd,
  currencySymbol,
  formatMoney,
} from "@/lib/currency";
import { cn } from "@/lib/cn";

const BUDGET_USD_MIN = 800;
const BUDGET_USD_MAX = 20000;
const BUDGET_USD_STEP = 100;

function clampBudgetUsd(value: number) {
  const stepped = Math.round(value / BUDGET_USD_STEP) * BUDGET_USD_STEP;
  return Math.min(BUDGET_USD_MAX, Math.max(BUDGET_USD_MIN, stepped));
}

function roundLocal(amount: number, currency: string) {
  if (currency === "CLP" || currency === "JPY" || currency === "KRW" || amount >= 1000) {
    return Math.round(amount);
  }
  return Math.round(amount * 100) / 100;
}

function formatDraft(amount: number, locale: string) {
  try {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: amount >= 1000 ? 0 : 2,
    }).format(amount);
  } catch {
    return String(Math.round(amount));
  }
}

function parseDraft(raw: string) {
  const cleaned = raw
    .replace(/[^\d.,\s-]/g, "")
    .replace(/\s/g, "")
    .trim();
  if (!cleaned) return null;

  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");
  let normalized = cleaned;
  if (hasComma && hasDot) {
    // Last separator is the decimal mark.
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = cleaned.replace(/,/g, "");
    }
  } else if (hasComma) {
    const parts = cleaned.split(",");
    normalized =
      parts.length === 2 && parts[1].length <= 2
        ? `${parts[0].replace(/\./g, "")}.${parts[1]}`
        : cleaned.replace(/,/g, "");
  }

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function BudgetAmountField({
  budgetUsd,
  currency,
  locale,
  rates,
  travelers,
  inUsdLabel,
  perPersonLabel,
  partyTotalLabel,
  editAria,
  onChangeUsd,
}: {
  budgetUsd: number;
  currency: string;
  locale: string;
  rates: Record<string, number>;
  travelers: number;
  inUsdLabel: string;
  perPersonLabel: string;
  partyTotalLabel: string;
  editAria: string;
  onChangeUsd: (nextUsd: number) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const localAmount = roundLocal(
    convertFromUsd(budgetUsd, currency, rates),
    currency,
  );
  const symbol = currencySymbol(currency, locale);

  useEffect(() => {
    if (!editing) {
      setDraft(formatDraft(localAmount, locale));
    }
  }, [editing, localAmount, locale]);

  const commitDraft = () => {
    const parsed = parseDraft(draft);
    setEditing(false);
    if (parsed == null || parsed <= 0) {
      setDraft(formatDraft(localAmount, locale));
      return;
    }
    const nextUsd = clampBudgetUsd(convertToUsd(parsed, currency, rates));
    onChangeUsd(nextUsd);
    setDraft(
      formatDraft(roundLocal(convertFromUsd(nextUsd, currency, rates), currency), locale),
    );
  };

  const partyUsd = budgetUsd * Math.max(1, travelers);
  const partyLocal = roundLocal(
    convertFromUsd(partyUsd, currency, rates),
    currency,
  );

  return (
    <div className="mt-6 space-y-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-terracotta">
        {perPersonLabel}
      </p>
      <label
        htmlFor={inputId}
        className={cn(
          "group flex items-baseline gap-2 rounded-[1.35rem] border border-line/80 bg-white px-4 py-3 shadow-sm transition",
          "focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20",
          "md:px-5 md:py-4",
        )}
      >
        <span className="select-none font-display text-3xl leading-none text-ink-soft md:text-4xl">
          {symbol}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          inputMode="decimal"
          enterKeyHint="done"
          autoComplete="off"
          spellCheck={false}
          aria-label={editAria}
          value={editing ? draft : formatDraft(localAmount, locale)}
          onFocus={() => {
            setEditing(true);
            setDraft(formatDraft(localAmount, locale));
            requestAnimationFrame(() => inputRef.current?.select());
          }}
          onChange={(event) => {
            setEditing(true);
            setDraft(event.target.value);
          }}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              inputRef.current?.blur();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              setDraft(formatDraft(localAmount, locale));
              setEditing(false);
              inputRef.current?.blur();
            }
          }}
          className="min-w-0 flex-1 bg-transparent font-display text-4xl leading-none tracking-tight text-ink outline-none tabular-nums md:text-5xl"
        />
        <span className="hidden shrink-0 text-sm text-ink-soft sm:inline">
          {perPersonLabel}
        </span>
      </label>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[1.1rem] bg-sand-deep/70 px-3.5 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {partyTotalLabel}
          </p>
          <p className="mt-0.5 font-display text-2xl tabular-nums text-ink">
            {formatMoney(partyLocal, currency, locale)}
          </p>
        </div>
        <p className="text-right text-sm text-ink-soft">
          {formatMoney(budgetUsd, "USD", "en")} {perPersonLabel}
          <span className="mt-0.5 block text-xs text-ink-soft/70">
            {formatMoney(partyUsd, "USD", "en")} {inUsdLabel}
          </span>
        </p>
      </div>
      <input
        type="range"
        min={BUDGET_USD_MIN}
        max={BUDGET_USD_MAX}
        step={BUDGET_USD_STEP}
        value={budgetUsd}
        onChange={(event) => onChangeUsd(Number(event.target.value))}
        className="planner-range w-full"
        aria-label={editAria}
      />
      <div className="flex justify-between text-[11px] uppercase tracking-[0.18em] text-ink-soft/80">
        <span>{formatMoney(BUDGET_USD_MIN, "USD", "en")}</span>
        <span>{formatMoney(BUDGET_USD_MAX, "USD", "en")}</span>
      </div>
    </div>
  );
}

export function BudgetFlexSwitch({
  flexible,
  flexibleLabel,
  fixedLabel,
  onChange,
}: {
  flexible: boolean;
  flexibleLabel: string;
  fixedLabel: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <div
      className="mt-5 inline-flex w-full max-w-md rounded-full border border-line bg-sand-deep/60 p-1"
      role="group"
      aria-label={`${flexibleLabel} / ${fixedLabel}`}
    >
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={flexible}
        className={cn(
          "flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition",
          flexible
            ? "bg-white text-ink shadow-sm"
            : "text-ink-soft hover:text-ink",
        )}
      >
        {flexibleLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!flexible}
        className={cn(
          "flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition",
          !flexible
            ? "bg-white text-ink shadow-sm"
            : "text-ink-soft hover:text-ink",
        )}
      >
        {fixedLabel}
      </button>
    </div>
  );
}
