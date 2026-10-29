import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/destination-card";
import { PageHero } from "@/components/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export default async function DestinationsPage({
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
          kicker={messages.nav.destinations}
          title={messages.dest.title}
          lead={messages.dest.lead}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              locale={locale}
              messages={messages}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
