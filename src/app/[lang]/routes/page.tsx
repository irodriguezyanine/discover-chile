import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleRoutes } from "@/data/routes";
import { getDestination } from "@/data/destinations";
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
        <h1 className="font-display text-5xl">{messages.routes.title}</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">{messages.routes.lead}</p>
        <div className="mt-10 grid gap-6">
          {sampleRoutes.map((route) => (
            <article key={route.id} className="rounded-[1.8rem] bg-cream p-6 md:p-8">
              <p className="text-sm uppercase tracking-wider text-terracotta">
                {route.days} {messages.routes.days}
              </p>
              <h2 className="mt-2 font-display text-3xl">{pick(route.name, locale)}</h2>
              <p className="mt-3 max-w-3xl text-ink-soft">{pick(route.summary, locale)}</p>
              <p className="mt-4 text-sm">
                {route.regions
                  .map((id) => getDestination(id))
                  .filter(Boolean)
                  .map((destination) => pick(destination!.name, locale))
                  .join(" → ")}
              </p>
              <Link
                href={`/${locale}/plan?d=${route.days}&r=${route.regions.join(",")}`}
                className="mt-5 inline-flex rounded-full bg-pine px-5 py-2 text-cream"
              >
                {messages.dest.add}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
