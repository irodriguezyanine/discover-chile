import Link from "next/link";
import { notFound } from "next/navigation";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { PageHero } from "@/components/page-hero";
import { sampleRoutes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
import { activityById } from "@/data/activities";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";

export default async function RoutesPage({
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
          kicker={messages.nav.routes}
          title={messages.routes.title}
          lead={messages.routes.lead}
        />
        <div className="mt-10 grid gap-6">
          {sampleRoutes.map((route) => {
            const providers = route.activityIds.reduce(
              (count, id) => count + (activityById(id)?.operators.length ?? 0),
              0,
            );
            return (
            <article key={route.id} className="rounded-[1.8rem] bg-cream p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-terracotta">
                <span>
                  {route.days} {messages.routes.days}
                </span>
                <span>·</span>
                <span>
                  {route.km} {messages.routes.km}
                </span>
                <span>·</span>
                <span>
                  {providers} {messages.routes.providers}
                </span>
              </div>
              <h2 className="mt-2 font-display text-3xl">{pick(route.name, locale)}</h2>
              <p className="mt-3 max-w-3xl text-ink-soft">{pick(route.summary, locale)}</p>
              <p className="mt-4 text-sm">
                {route.regions
                  .map((id) => getDestination(id))
                  .filter(Boolean)
                  .map((destination) => pick(destination!.name, locale))
                  .join(" → ")}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{pick(route.who, locale)}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/routes/${route.slug}`}
                  className="inline-flex rounded-full bg-night px-5 py-2 text-cream"
                >
                  {messages.routes.open}
                </Link>
                <OpenPlannerLink
                  seed={{ days: route.days, regions: route.regions }}
                  className="inline-flex rounded-full bg-pine px-5 py-2 text-cream"
                >
                  {messages.dest.add}
                </OpenPlannerLink>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
