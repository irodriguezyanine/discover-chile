import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/page-hero";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);
  const items = [
    [messages.faq.q1, messages.faq.a1],
    [messages.faq.q2, messages.faq.a2],
    [messages.faq.q3, messages.faq.a3],
    [messages.faq.q4, messages.faq.a4],
    [messages.faq.q5, messages.faq.a5],
    [messages.faq.q6, messages.faq.a6],
    [messages.faq.q7, messages.faq.a7],
    [messages.faq.q8, messages.faq.a8],
  ];

  return (
    <div className="bg-sand pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <PageHero kicker={messages.nav.faq} title={messages.faq.title} lead="" />
        <div className="mt-10 space-y-4">
          {items.map(([q, a]) => (
            <details key={q} className="rounded-3xl bg-cream px-5 py-4" open>
              <summary className="cursor-pointer font-display text-2xl">{q}</summary>
              <p className="mt-3 text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
