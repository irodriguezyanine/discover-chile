import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";

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
          <p className="text-sm uppercase tracking-[0.3em] text-glacier">
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
          <Link
            href={`/${locale}/plan?r=${destination.id}`}
            className="mt-6 inline-flex rounded-full bg-terracotta px-5 py-3"
          >
            {messages.dest.add}
          </Link>
        </aside>
      </div>
    </article>
  );
}
