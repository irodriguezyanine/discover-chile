import { notFound } from "next/navigation";
import Link from "next/link";
import { sampleRoutes, getRouteBySlug } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { activityById } from "@/data/activities";
import { fuelStopById } from "@/data/fuel";
import { stays } from "@/data/stays";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";
import { PageHero } from "@/components/page-hero";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { ActivityBlock } from "@/components/activity-block";
import { FuelStopCard } from "@/components/fuel-stop-card";
import { StayCard } from "@/components/stay-card";

export function generateStaticParams() {
  return sampleRoutes.flatMap((route) =>
    locales.map((lang) => ({ lang, slug: route.slug })),
  );
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const route = getRouteBySlug(slug);
  if (!route) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);
  const relatedActs = route.activityIds
    .map((id) => activityById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedFuel = route.fuelStopIds
    .map((id) => fuelStopById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedStay = stays.filter((stay) => route.stayIds.includes(stay.id));

  return (
    <div className="bg-sand pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm text-terracotta">
          <Link href={`/${locale}/routes`} className="hover:underline">
            {messages.nav.routes}
          </Link>
        </p>
        <PageHero
          kicker={`${route.days} ${messages.routes.days} · ${route.km} ${messages.routes.km}`}
          title={pick(route.name, locale)}
          lead={pick(route.summary, locale)}
        />
        <p className="mt-4 text-sm">
          {route.regions
            .map((id) => getDestination(id))
            .filter(Boolean)
            .map((destination) => pick(destination!.name, locale))
            .join(" → ")}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <p className="rounded-[1.4rem] bg-cream p-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {messages.routes.who}
            </span>
            <span className="mt-2 block text-sm text-ink-soft">{pick(route.who, locale)}</span>
          </p>
          <p className="rounded-[1.4rem] bg-cream p-5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {messages.routes.style}
            </span>
            <span className="mt-2 block text-sm text-ink-soft">{pick(route.style, locale)}</span>
          </p>
        </div>
        <OpenPlannerLink
          seed={{ days: route.days, regions: route.regions }}
          className="mt-6 inline-flex rounded-full bg-pine px-5 py-2.5 text-cream"
        >
          {messages.dest.add}
        </OpenPlannerLink>

        <h2 className="mt-14 font-display text-3xl">{messages.routes.itinerary}</h2>
        <ol className="mt-6 space-y-4">
          {route.itinerary.map((day) => (
            <li
              key={day.day}
              className="grid gap-4 rounded-[1.6rem] bg-cream p-5 md:grid-cols-[4.5rem_1fr]"
            >
              <p className="font-display text-3xl text-terracotta">
                {String(day.day).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-2xl">{pick(day.title, locale)}</h3>
                <dl className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                      {messages.routes.move}
                    </dt>
                    <dd className="mt-1">{pick(day.move, locale)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                      {messages.routes.sleep}
                    </dt>
                    <dd className="mt-1">{pick(day.sleep, locale)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                      {messages.routes.fuel}
                    </dt>
                    <dd className="mt-1">{pick(day.fuel, locale)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-ink-soft">{pick(day.notes, locale)}</p>
                {day.km ? (
                  <p className="mt-2 text-xs uppercase tracking-wider text-terracotta">
                    {day.km} {messages.routes.km}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        {relatedFuel.length ? (
          <section className="mt-14">
            <h2 className="font-display text-3xl">{messages.routes.relatedFuel}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedFuel.map((stop) => (
                <FuelStopCard key={stop.id} stop={stop} locale={locale} messages={messages} />
              ))}
            </div>
          </section>
        ) : null}

        {relatedActs.length ? (
          <section className="mt-14 space-y-6">
            <h2 className="font-display text-3xl">{messages.routes.relatedActs}</h2>
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
          <section className="mt-14">
            <h2 className="font-display text-3xl">{messages.routes.relatedStay}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedStay.map((stay) => (
                <StayCard key={stay.id} stay={stay} locale={locale} messages={messages} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
