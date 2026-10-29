import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { activitiesByRegion } from "@/data/activities";
import { fuelByRegion } from "@/data/fuel";
import { parksByRegion } from "@/data/parks";
import { routesByRegion } from "@/data/routes";
import { staysByRegion } from "@/data/stays";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";
import { ChileFlag } from "@/components/chile-flag";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { ActivityBlock } from "@/components/activity-block";
import { FuelStopCard } from "@/components/fuel-stop-card";
import { StayCard } from "@/components/stay-card";

export function generateStaticParams() {
  return destinations.flatMap((destination) =>
    ["en", "es", "pt", "de", "fr", "it", "nl", "ja", "ko", "zh", "ru", "ar"].map(
      (lang) => ({ lang, slug: destination.slug }),
    ),
  );
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);
  const relatedActs = activitiesByRegion(destination.id);
  const relatedFuel = fuelByRegion(destination.id);
  const relatedStay = staysByRegion(destination.id);
  const relatedParks = parksByRegion(destination.id);
  const relatedRoutes = routesByRegion(destination.id);

  return (
    <article className="bg-sand pt-24 pb-20">
      <div className="relative h-[52vh] min-h-[320px]">
        <Image
          src={destination.image}
          alt={pick(destination.imageAlt, locale)}
          fill
          className="object-cover"
          sizes="100vw"
          preload
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-6xl px-4 text-cream md:px-6">
          <p className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-glacier">
            <ChileFlag variant="circle" className="size-6 ring-1 ring-white/40" />
            {pick(destination.region, locale)}
          </p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl">
            {pick(destination.name, locale)}
          </h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_0.8fr] md:px-6">
        <div>
          <p className="text-lg text-ink-soft">{pick(destination.summary, locale)}</p>
          <h2 className="mt-10 font-display text-3xl">{messages.dest.why}</h2>
          <p className="mt-3">{pick(destination.why, locale)}</p>
          <ul className="mt-8 grid gap-3">
            {destination.highlights.map((item) => (
              <li key={pick(item, locale)} className="rounded-2xl bg-cream px-4 py-3">
                {pick(item, locale)}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-[1.8rem] bg-night p-6 text-cream">
          <p>
            {messages.dest.min}: {destination.minDays} · {messages.dest.rec}:{" "}
            {destination.recommendedDays}
          </p>
          <p className="mt-3 text-sm text-cream/70">
            {messages.dest.fromScl}: {destination.flightFromSclHours}
            {messages.common.hours} {messages.dest.flight}
            {destination.busFromSclHours
              ? ` · ${destination.busFromSclHours}${messages.common.hours} ${messages.dest.bus}`
              : ""}
          </p>
          <p className="mt-3 text-sm">
            {messages.dest.season}: {pick(destination.season, locale)}
          </p>
          <p className="mt-4 text-sm">
            {messages.planner.fees}: {formatMoney(destination.feesUsd, "USD", "en")}
          </p>
          <OpenPlannerLink
            seed={{ regions: [destination.id] }}
            className="mt-6 inline-flex rounded-full bg-terracotta px-5 py-3"
          >
            {messages.dest.add}
          </OpenPlannerLink>
        </aside>
      </div>

      {relatedRoutes.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6">
          <h2 className="font-display text-3xl">{messages.nav.routes}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedRoutes.map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/routes/${route.slug}`}
                className="rounded-[1.4rem] bg-cream p-5 hover:ring-1 hover:ring-terracotta"
              >
                <p className="text-xs uppercase tracking-wider text-terracotta">
                  {route.days} {messages.routes.days} · {route.km} {messages.routes.km}
                </p>
                <p className="mt-2 font-display text-2xl">{pick(route.name, locale)}</p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                  {pick(route.summary, locale)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {relatedActs.length ? (
        <section className="mx-auto max-w-6xl space-y-6 px-4 pb-10 md:px-6">
          <h2 className="font-display text-3xl">{messages.nav.activities}</h2>
          {relatedActs.map((activity) => (
            <ActivityBlock
              key={activity.id}
              activity={activity}
              locale={locale}
              messages={messages}
            />
          ))}
        </section>
      ) : null}

      {relatedStay.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6">
          <h2 className="font-display text-3xl">{messages.nav.stays}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedStay.map((stay) => (
              <StayCard key={stay.id} stay={stay} locale={locale} messages={messages} />
            ))}
          </div>
        </section>
      ) : null}

      {relatedFuel.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6">
          <h2 className="font-display text-3xl">{messages.nav.fuel}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedFuel.map((stop) => (
              <FuelStopCard key={stop.id} stop={stop} locale={locale} messages={messages} />
            ))}
          </div>
        </section>
      ) : null}

      {relatedParks.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-4 md:px-6">
          <h2 className="font-display text-3xl">{messages.nav.parks}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedParks.map((park) => (
              <article key={park.id} className="overflow-hidden rounded-[1.4rem] bg-cream">
                <div className="relative h-40">
                  <Image
                    src={park.image}
                    alt={pick(park.name, locale)}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl">{pick(park.name, locale)}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{pick(park.note, locale)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
