"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Calculator, Users } from "lucide-react";
import {
  convertFromUsd,
  convertToUsd,
  currencySymbol,
  formatMoney,
} from "@/lib/currency";
import { cn } from "@/lib/cn";

const BUDGET_USD_MIN = 400;
const BUDGET_USD_MAX = 12000;
const BUDGET_USD_STEP = 50;

const QUICK_USD = [800, 1500, 2500, 4000, 6000] as const;

function clampBudgetUsd(value: number) {
  const stepped = Math.round(value / BUDGET_USD_STEP) * BUDGET_USD_STEP;
  return Math.min(BUDGET_USD_MAX, Math.max(BUDGET_USD_MIN, stepped));
}

function roundLocal(amount: number, currency: string) {
  if (
    currency === "CLP" ||
    currency === "JPY" ||
    currency === "KRW" ||
    amount >= 1000
  ) {
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
  approxLabel,
  partyTotalLabel,
  partyMathLabel,
  ceilingLabel,
  quickLabel,
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
  approxLabel: string;
  partyTotalLabel: string;
  partyMathLabel: string;
  ceilingLabel: string;
  quickLabel: string;
  editAria: string;
  onChangeUsd: (nextUsd: number) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const people = Math.max(1, travelers);
  const localAmount = roundLocal(
    convertFromUsd(budgetUsd, currency, rates),
    currency,
  );
  const symbol = currencySymbol(currency, locale);
  const partyUsd = budgetUsd * people;
  const partyLocal = roundLocal(
    convertFromUsd(partyUsd, currency, rates),
    currency,
  );
  const sliderPct =
    ((budgetUsd - BUDGET_USD_MIN) / (BUDGET_USD_MAX - BUDGET_USD_MIN)) * 100;

  useEffect(() => {
    if (!editing) setDraft(formatDraft(localAmount, locale));
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
      formatDraft(
        roundLocal(convertFromUsd(nextUsd, currency, rates), currency),
        locale,
      ),
    );
  };

  return (
    <div className="mt-5 space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta">
        <Users size={12} />
        {approxLabel}
      </div>

      <div className="grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
        <label
          htmlFor={inputId}
          className={cn(
            "group flex flex-col rounded-[1.45rem] border border-line/80 bg-white p-4 shadow-sm transition",
            "focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20",
            "md:p-5",
          )}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            {perPersonLabel}
          </span>
          <span className="mt-2 flex items-baseline gap-2">
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
          </span>
          <span className="mt-2 text-sm text-ink-soft">
            {formatMoney(budgetUsd, "USD", "en")} {perPersonLabel}
          </span>
        </label>

        <div className="rounded-[1.45rem] bg-night px-4 py-4 text-cream shadow-[0_14px_34px_rgba(8,20,16,0.22)] md:px-5">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-glacier">
            <Calculator size={12} />
            {ceilingLabel}
          </p>
          <p className="mt-2 font-display text-3xl leading-none tracking-tight tabular-nums md:text-4xl">
            {formatMoney(partyLocal, currency, locale)}
          </p>
          <p className="mt-2 text-sm text-cream/65">
            {partyMathLabel}
          </p>
          <p className="mt-1 text-xs text-cream/45">
            {formatMoney(partyUsd, "USD", "en")} {inUsdLabel}
          </p>
          <p className="mt-3 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-cream/80">
            {partyTotalLabel}
          </p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          <span>{perPersonLabel}</span>
          <span className="tabular-nums text-ink">
            {formatMoney(localAmount, currency, locale)}
          </span>
        </div>
        <input
          type="range"
          min={BUDGET_USD_MIN}
          max={BUDGET_USD_MAX}
          step={BUDGET_USD_STEP}
          value={budgetUsd}
          onChange={(event) => onChangeUsd(Number(event.target.value))}
          className="planner-range w-full"
          style={{
            background: `linear-gradient(90deg, var(--terracotta) ${sliderPct}%, var(--sand-deep) ${sliderPct}%)`,
          }}
          aria-label={editAria}
        />
        <div className="mt-1.5 flex justify-between text-[11px] uppercase tracking-[0.16em] text-ink-soft/80">
          <span>
            {formatMoney(
              roundLocal(convertFromUsd(BUDGET_USD_MIN, currency, rates), currency),
              currency,
              locale,
            )}
          </span>
          <span>
            {formatMoney(
              roundLocal(convertFromUsd(BUDGET_USD_MAX, currency, rates), currency),
              currency,
              locale,
            )}
          </span>
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          {quickLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {QUICK_USD.map((amount) => {
            const active = budgetUsd === amount;
            const local = roundLocal(
              convertFromUsd(amount, currency, rates),
              currency,
            );
            return (
              <button
                key={amount}
                type="button"
                onClick={() => onChangeUsd(amount)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs tabular-nums transition",
                  active
                    ? "border-terracotta bg-terracotta text-cream"
                    : "border-line bg-white text-ink-soft hover:border-terracotta/40 hover:text-ink",
                )}
              >
                {formatMoney(local, currency, locale)}
              </button>
            );
          })}
        </div>
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
