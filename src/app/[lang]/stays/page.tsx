import { notFound } from "next/navigation";
import { stays } from "@/data/stays";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/page-hero";
import { StayCard } from "@/components/stay-card";

export default async function StaysPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);
  const hostels = stays.filter((stay) => stay.kind === "hostel");
  const lodgings = stays.filter((stay) => stay.kind === "stay");
  const eats = stays.filter((stay) => stay.kind === "eat");

  return (
    <div className="bg-sand pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PageHero
          kicker={messages.nav.stays}
          title={messages.staysPage.title}
          lead={messages.staysPage.lead}
        />
        <section className="mt-12">
          <h2 className="font-display text-3xl">{messages.staysPage.hostel}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {hostels.map((stay) => (
              <StayCard key={stay.id} stay={stay} locale={locale} messages={messages} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-3xl">{messages.staysPage.stay}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {lodgings.map((stay) => (
              <StayCard key={stay.id} stay={stay} locale={locale} messages={messages} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-3xl">{messages.staysPage.eat}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {eats.map((stay) => (
              <StayCard key={stay.id} stay={stay} locale={locale} messages={messages} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
