import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import { img } from "@/data/images";
import { DestinationCard } from "@/components/destination-card";
import { TravelDesk } from "@/components/travel-desk";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { OpenPlannerLink } from "@/components/open-planner-link";
import { getLiveMapData } from "@/lib/supabase/regions";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);
  const mapData = await getLiveMapData();
  const featured = destinations.filter((item) =>
    ["atacama", "santiago-wine", "patagonia", "rapanui"].includes(item.id),
  );

  return (
    <>
      <TravelDesk
        destinations={destinations}
        locale={locale}
        messages={messages}
        mapData={mapData}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3 md:px-6">
        {[messages.stats.solo, messages.stats.forbes, messages.stats.km].map((item) => (
          <p
            key={item}
            className="rounded-3xl bg-cream px-5 py-6 text-sm leading-relaxed text-ink-soft"
          >
            {item}
          </p>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="font-display text-4xl md:text-5xl">{messages.how.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [messages.how.s1t, messages.how.s1d],
            [messages.how.s2t, messages.how.s2d],
            [messages.how.s3t, messages.how.s3d],
          ].map(([title, body], index) => (
            <article key={title} className="rounded-[1.8rem] bg-pine p-6 text-cream">
              <p className="text-glacier">0{index + 1}</p>
              <h3 className="mt-3 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm text-cream/75">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">{messages.dest.title}</h2>
          <Link href={`/${locale}/destinations`} className="text-sm text-terracotta">
            {messages.hero.secondary}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              locale={locale}
              messages={messages}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="font-display text-4xl">{messages.field.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [`/${locale}/fuel`, messages.field.fuel, messages.field.fuelD],
            [`/${locale}/activities`, messages.field.raft, messages.field.raftD],
            [`/${locale}/stays`, messages.field.stay, messages.field.stayD],
          ].map(([href, title, body]) => (
            <Link
              key={href}
              href={href}
              className="rounded-[1.6rem] bg-cream p-6 hover:ring-1 hover:ring-terracotta"
            >
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm text-ink-soft">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-4 my-8 overflow-hidden rounded-[2rem] md:mx-auto md:max-w-6xl">
        <div className="relative min-h-[420px]">
          <Image
            src={img.atacamaMoon}
            alt={messages.distances.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-night/55" />
          <div className="relative max-w-2xl px-6 py-16 text-cream md:px-12">
            <h2 className="font-display text-4xl md:text-5xl">{messages.distances.title}</h2>
            <p className="mt-4 text-cream/85">{messages.distances.body}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="rounded-[2rem] bg-terracotta px-6 py-12 text-cream md:px-12">
          <h2 className="font-display text-4xl">{messages.cta.title}</h2>
          <p className="mt-4 max-w-2xl text-cream/90">{messages.cta.body}</p>
          <OpenPlannerLink className="mt-6 inline-flex rounded-full bg-night px-6 py-3">
            {messages.hero.cta}
          </OpenPlannerLink>
        </div>
      </section>
    </>
  );
}
