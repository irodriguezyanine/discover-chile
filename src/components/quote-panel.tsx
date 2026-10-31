import type { Messages } from "@/i18n/en";
import type { Estimate } from "@/lib/estimate";
import { formatMoney } from "@/lib/currency";
import { ChileFlag } from "@/components/chile-flag";
import { cn } from "@/lib/cn";

export function QuotePanel({
  messages,
  estimate,
  localTotal,
  currency,
  locale,
  budgetLocal,
  budgetPerPersonLocal,
  travelers,
  budgetFlexible = true,
}: {
  messages: Messages;
  estimate: Estimate;
  localTotal: number;
  currency: string;
  locale: string;
  budgetLocal: number;
  budgetPerPersonLocal: number;
  travelers: number;
  budgetFlexible?: boolean;
}) {
  const over = budgetLocal > 0 && localTotal > budgetLocal;
  const remaining = budgetLocal - localTotal;
  const items = [
    [messages.planner.lodging, estimate.lodgingUsd],
    [messages.planner.food, estimate.foodUsd],
    [messages.planner.activities, estimate.activitiesUsd],
    [messages.planner.transport, estimate.transportUsd],
    [messages.planner.fees, estimate.feesUsd],
    [messages.planner.fuel, estimate.fuelUsd],
  ] as const;
  const ratio =
    budgetLocal > 0
      ? Math.min(100, Math.round((localTotal / budgetLocal) * 100))
      : 0;

  return (
    <aside className="flex h-full flex-col bg-night p-5 text-cream">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.28em] text-glacier">
          {messages.planner.liveTotal}
        </p>
        <ChileFlag variant="circle" className="size-6 ring-1 ring-white/30" />
      </div>
      <p className="mt-3 font-display text-[2.35rem] leading-none tracking-tight">
        {formatMoney(localTotal, currency, locale)}
      </p>
      <p className="mt-2 text-sm text-cream/55">
        {formatMoney(estimate.totalUsd, "USD", "en")} · {messages.planner.inUsd}
        {estimate.perPersonUsd > 0
          ? ` · ${formatMoney(estimate.perPersonUsd, "USD", "en")} ${messages.planner.perPerson}`
          : ""}
      </p>

      {budgetLocal > 0 ? (
        <div className="mt-5 space-y-3 rounded-[1.2rem] bg-white/5 p-3.5 ring-1 ring-white/10">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-glacier">
                {messages.planner.budgetCeiling}
              </p>
              <p className="mt-1 font-display text-xl tabular-nums">
                {formatMoney(budgetLocal, currency, locale)}
              </p>
              <p className="mt-0.5 text-xs text-cream/50">
                {formatMoney(budgetPerPersonLocal, currency, locale)}{" "}
                {messages.planner.budgetPerPerson}
                {" · "}
                {travelers}×
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.12em]",
                budgetFlexible
                  ? "bg-glacier/20 text-glacier"
                  : "bg-white/10 text-cream/70",
              )}
            >
              {budgetFlexible
                ? messages.planner.budgetFlexible
                : messages.planner.budgetFixed}
            </span>
          </div>

          <div>
            <div className="mb-1.5 flex justify-between gap-2 text-[11px] uppercase tracking-wider text-cream/50">
              <span>{messages.planner.vsBudget}</span>
              <span className={over ? "text-[#f0a3ad]" : "text-glacier"}>
                {over ? messages.planner.over : messages.planner.under}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={cn(
                  "h-full rounded-full",
                  over ? "bg-[#c45c6e]" : "bg-terracotta",
                )}
                style={{ width: `${ratio}%` }}
              />
            </div>
            <p
              className={cn(
                "mt-2 text-xs",
                over ? "text-[#f0a3ad]" : "text-cream/55",
              )}
            >
              {over ? messages.planner.budgetOver : messages.planner.budgetRemaining}
              {": "}
              {formatMoney(Math.abs(remaining), currency, locale)}
            </p>
          </div>
        </div>
      ) : null}

      <dl className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
        <p className="text-[10px] uppercase tracking-[0.22em] text-glacier">
          {messages.planner.breakdown}
        </p>
        {items
          .filter(([label, usd]) => usd > 0 || label !== messages.planner.fuel)
          .map(([label, usd]) => (
            <div key={label} className="flex justify-between text-cream/80">
              <dt>{label}</dt>
              <dd className="tabular-nums">{formatMoney(usd, "USD", "en")}</dd>
            </div>
          ))}
      </dl>
    </aside>
  );
}
