import type { FuelStop } from "@/data/fuel";
import { brandById } from "@/data/fuel";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { ExternalLink } from "@/components/external-link";

export function FuelStopCard({
  stop,
  locale,
  messages,
}: {
  stop: FuelStop;
  locale: Locale;
  messages: Messages;
}) {
  const brand = brandById(stop.brand);
  return (
    <article className="rounded-[1.4rem] border border-line/70 bg-cream p-5">
      <div className="flex items-center gap-2">
        <span
          className="size-2.5 rounded-full"
          style={{ background: brand?.color ?? "#C45C26" }}
        />
        <p className="text-xs uppercase tracking-[0.18em] text-terracotta">
          {brand?.name ?? stop.brand} · {stop.highway}
        </p>
      </div>
      <h3 className="mt-2 font-display text-2xl">{pick(stop.town, locale)}</h3>
      <p className="mt-2 text-sm text-ink-soft">{pick(stop.note, locale)}</p>
      <p className="mt-3 text-sm">
        {messages.fuelPage.hours}: {pick(stop.hours, locale)}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {stop.services.map((service) => (
          <li
            key={pick(service, locale)}
            className="rounded-full bg-sand px-3 py-1 text-xs text-ink-soft"
          >
            {pick(service, locale)}
          </li>
        ))}
      </ul>
      <ExternalLink href={stop.maps} className="mt-4">
        {messages.fuelPage.map}
      </ExternalLink>
    </article>
  );
}
