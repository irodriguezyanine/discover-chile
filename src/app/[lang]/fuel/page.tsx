import { notFound } from "next/navigation";
import { fuelBrands, fuelStops } from "@/data/fuel";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/page-hero";
import { FuelBrandCard } from "@/components/fuel-brand-card";
import { FuelStopCard } from "@/components/fuel-stop-card";

export default async function FuelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);

  return (
    <div className="bg-sand pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PageHero
          kicker={messages.nav.fuel}
          title={messages.fuelPage.title}
          lead={messages.fuelPage.lead}
        />
        <p className="mt-6 max-w-3xl rounded-[1.4rem] bg-wine/10 px-5 py-4 text-sm text-wine">
          {messages.fuelPage.warning}
        </p>
        <p className="mt-4 text-sm text-ink-soft">{messages.fuelPage.pricesNote}</p>

        <h2 className="mt-12 font-display text-3xl">{messages.fuelPage.appsTitle}</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {fuelBrands.map((brand) => (
            <FuelBrandCard key={brand.id} brand={brand} locale={locale} messages={messages} />
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">{messages.fuelPage.alongTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fuelStops.map((stop) => (
            <FuelStopCard key={stop.id} stop={stop} locale={locale} messages={messages} />
          ))}
        </div>
      </div>
    </div>
  );
}
