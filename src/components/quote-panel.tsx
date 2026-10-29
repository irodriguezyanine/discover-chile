import type { Messages } from "@/i18n/en";
import type { Estimate } from "@/lib/estimate";
import { formatMoney } from "@/lib/currency";

export function QuotePanel({
  messages,
  estimate,
  localTotal,
  currency,
  locale,
  budgetLocal,
}: {
  messages: Messages;
  estimate: Estimate;
  localTotal: number;
  currency: string;
  locale: string;
  budgetLocal: number;
}) {
  const over = budgetLocal > 0 && localTotal > budgetLocal;
  const items = [
    [messages.planner.lodging, estimate.lodgingUsd],
    [messages.planner.food, estimate.foodUsd],
    [messages.planner.activities, estimate.activitiesUsd],
    [messages.planner.transport, estimate.transportUsd],
    [messages.planner.fees, estimate.feesUsd],
  ] as const;
  const ratio =
    budgetLocal > 0 ? Math.min(100, Math.round((localTotal / budgetLocal) * 100)) : 0;

  return (
    <aside className="quote-shadow rounded-3xl bg-cream p-5 text-ink">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
        {messages.planner.liveTotal}
      </p>
      <p className="mt-2 font-display text-4xl leading-none">
        {formatMoney(localTotal, currency, locale)}
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        {formatMoney(estimate.totalUsd, "USD", "en")} · {messages.planner.inUsd}
        {estimate.perPersonUsd > 0
          ? ` · ${formatMoney(estimate.perPersonUsd, "USD", "en")} ${messages.planner.perPerson}`
          : ""}
      </p>
      {budgetLocal > 0 ? (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-ink-soft">
            <span>{messages.planner.vsBudget}</span>
            <span className={over ? "text-wine" : "text-pine"}>
              {over ? messages.planner.over : messages.planner.under}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand-deep">
            <div
              className={`h-full ${over ? "bg-wine" : "bg-terracotta"}`}
              style={{ width: `${ratio}%` }}
            />
          </div>
        </div>
      ) : null}
      <dl className="mt-5 space-y-2 text-sm">
        <p className="text-xs uppercase tracking-wider text-ink-soft">
          {messages.planner.breakdown}
        </p>
        {items.map(([label, usd]) => (
          <div key={label} className="flex justify-between">
            <dt>{label}</dt>
            <dd>{formatMoney(usd, "USD", "en")}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
