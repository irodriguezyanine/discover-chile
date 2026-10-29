import Image from "next/image";
import { notFound } from "next/navigation";
import { parks } from "@/data/parks";
import { getDestination } from "@/data/destinations";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";
import { PageHero } from "@/components/page-hero";
import { ExternalLink } from "@/components/external-link";

export default async function ParksPage({
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
          kicker={messages.nav.parks}
          title={messages.parksPage.title}
          lead={messages.parksPage.lead}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {parks.map((park) => {
            const region = getDestination(park.region);
            return (
              <article key={park.id} className="overflow-hidden rounded-[1.8rem] bg-cream">
                <div className="relative h-52">
                  <Image
                    src={park.image}
                    alt={pick(park.name, locale)}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="p-5">
                  {region ? (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                      {messages.parksPage.region} · {pick(region.name, locale)}
                    </p>
                  ) : null}
                  <h2 className="mt-2 font-display text-2xl">{pick(park.name, locale)}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{pick(park.note, locale)}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <p>
                      {messages.planner.fees}: {formatMoney(park.feeUsd, "USD", "en")}
                    </p>
                    {park.book ? (
                      <ExternalLink href={park.book}>{messages.parksPage.website}</ExternalLink>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
