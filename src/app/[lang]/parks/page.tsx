import Image from "next/image";
import { notFound } from "next/navigation";
import { parks } from "@/data/parks";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";

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
        <h1 className="font-display text-5xl">{messages.parksPage.title}</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">{messages.parksPage.lead}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {parks.map((park) => (
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
                <h2 className="font-display text-2xl">{pick(park.name, locale)}</h2>
                <p className="mt-2 text-sm text-ink-soft">{pick(park.note, locale)}</p>
                <p className="mt-3 text-sm">
                  {messages.planner.fees}: {formatMoney(park.feeUsd, "USD", "en")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
