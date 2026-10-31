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
  budgetFlexible = true,
}: {
  messages: Messages;
  estimate: Estimate;
  localTotal: number;
  currency: string;
  locale: string;
  budgetLocal: number;
  budgetFlexible?: boolean;
}) {
  const over = budgetLocal > 0 && localTotal > budgetLocal;
  const items = [
    [messages.planner.lodging, estimate.lodgingUsd],
    [messages.planner.food, estimate.foodUsd],
    [messages.planner.activities, estimate.activitiesUsd],
    [messages.planner.transport, estimate.transportUsd],
    [messages.planner.fees, estimate.feesUsd],
    [messages.planner.fuel, estimate.fuelUsd],
  ] as const;
  const ratio =
    budgetLocal > 0 ? Math.min(100, Math.round((localTotal / budgetLocal) * 100)) : 0;

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
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between gap-2 text-[11px] uppercase tracking-wider text-cream/50">
            <span className="min-w-0 truncate">
              {messages.planner.vsBudget}
              <span className="text-cream/35">
                {" "}
                ·{" "}
                {budgetFlexible
                  ? messages.planner.budgetFlexible
                  : messages.planner.budgetFixed}
              </span>
            </span>
            <span className={over ? "shrink-0 text-[#f0a3ad]" : "shrink-0 text-glacier"}>
              {over ? messages.planner.over : messages.planner.under}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className={cn("h-full rounded-full", over ? "bg-[#c45c6e]" : "bg-terracotta")}
              style={{ width: `${ratio}%` }}
            />
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
