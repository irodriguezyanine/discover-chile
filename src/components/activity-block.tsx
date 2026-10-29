import type { Activity } from "@/data/activities";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";
import { ExternalLink } from "@/components/external-link";

export function kindLabel(kind: Activity["kind"], messages: Messages) {
  return messages.actsPage[kind];
}

export function ActivityBlock({
  activity,
  locale,
  messages,
}: {
  activity: Activity;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <article className="rounded-[1.8rem] bg-cream p-6 md:p-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
        {kindLabel(activity.kind, messages)}
        {activity.level ? ` · ${messages.actsPage.level} ${activity.level}` : ""}
      </p>
      <h2 className="mt-2 font-display text-3xl">{pick(activity.name, locale)}</h2>
      {activity.river ? (
        <p className="mt-2 text-sm text-ink-soft">
          {messages.actsPage.river}: {pick(activity.river, locale)}
        </p>
      ) : null}
      <p className="mt-3 max-w-3xl text-ink-soft">{pick(activity.summary, locale)}</p>
      <p className="mt-3 text-sm">
        {messages.actsPage.season}: {pick(activity.season, locale)}
      </p>
      <h3 className="mt-6 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {activity.operators.length} {messages.actsPage.operators}
      </h3>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {activity.operators.map((operator) => (
          <li key={operator.id} className="rounded-2xl border border-line/70 bg-sand/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-xl">{operator.name}</p>
              <p className="shrink-0 text-sm tabular-nums text-terracotta">
                {messages.actsPage.from} {formatMoney(operator.fromUsd, "USD", "en")}
                {operator.fromClp ? ` · CLP ${operator.fromClp.toLocaleString("es-CL")}` : ""}
              </p>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{pick(operator.note, locale)}</p>
            <ExternalLink href={operator.url} className="mt-3">
              {messages.actsPage.website}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </article>
  );
}
