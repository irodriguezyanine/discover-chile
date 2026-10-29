import { notFound } from "next/navigation";
import { stays } from "@/data/stays";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { pick } from "@/i18n/loc";
import { formatMoney } from "@/lib/currency";

export default async function StaysPage({
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
        <h1 className="font-display text-5xl">{messages.staysPage.title}</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">{messages.staysPage.lead}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {stays.map((stay) => (
            <article key={stay.id} className="rounded-[1.6rem] bg-cream p-5">
              <p className="text-xs uppercase tracking-wider text-terracotta">
                {stay.kind === "eat" ? messages.staysPage.eat : messages.staysPage.stay} ·{" "}
                {messages.styles[stay.style]}
              </p>
              <h2 className="mt-2 font-display text-2xl">{stay.name}</h2>
              <p className="text-sm text-ink-soft">{pick(stay.place, locale)}</p>
              <p className="mt-3 text-sm">{pick(stay.blurb, locale)}</p>
              <p className="mt-4 text-sm">
                {messages.staysPage.from} {formatMoney(stay.fromUsd, "USD", "en")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
