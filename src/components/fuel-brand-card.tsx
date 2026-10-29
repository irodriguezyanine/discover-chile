import type { FuelBrand } from "@/data/fuel";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { ExternalLink } from "@/components/external-link";

export function FuelBrandCard({
  brand,
  locale,
  messages,
}: {
  brand: FuelBrand;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] bg-cream">
      <div className="h-1.5" style={{ background: brand.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl">{brand.name}</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-soft">
              {messages.fuelPage.operator} · {brand.operator}
            </p>
          </div>
          {brand.id === "cne" ? (
            <span className="rounded-full bg-pine px-3 py-1 text-[11px] text-cream">
              {messages.fuelPage.cneNote}
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-ink-soft">{pick(brand.note, locale)}</p>
        <p className="mt-3 text-sm">
          <span className="text-ink-soft">{messages.fuelPage.coverage}: </span>
          {pick(brand.coverage, locale)}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-terracotta">{brand.stores}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <ExternalLink href={brand.app}>{messages.fuelPage.openApp} · {brand.appName}</ExternalLink>
          <ExternalLink href={brand.locator}>{messages.fuelPage.map}</ExternalLink>
          <ExternalLink href={brand.site}>{messages.common.website}</ExternalLink>
        </div>
      </div>
    </article>
  );
}
