import type { Stay } from "@/data/stays";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";
import { ExternalLink } from "@/components/external-link";

export function stayKindLabel(kind: Stay["kind"], messages: Messages) {
  if (kind === "eat") return messages.staysPage.eat;
  if (kind === "hostel") return messages.staysPage.hostel;
  return messages.staysPage.stay;
}

export function StayCard({
  stay,
  locale,
  messages,
}: {
  stay: Stay;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <article className="flex flex-col rounded-[1.6rem] bg-cream p-5">
      <p className="text-xs uppercase tracking-wider text-terracotta">
        {stayKindLabel(stay.kind, messages)} · {messages.styles[stay.style]}
      </p>
      <h2 className="mt-2 font-display text-2xl">{stay.name}</h2>
      <p className="text-sm text-ink-soft">{pick(stay.place, locale)}</p>
      <p className="mt-3 flex-1 text-sm">{pick(stay.blurb, locale)}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <p>
          {messages.staysPage.from} {formatMoney(stay.fromUsd, "USD", "en")}
        </p>
        {stay.url ? (
          <ExternalLink href={stay.url}>{messages.staysPage.website}</ExternalLink>
        ) : null}
      </div>
    </article>
  );
}
