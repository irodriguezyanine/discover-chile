import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/page-hero";

export default async function VisaPage({
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
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <PageHero kicker={messages.nav.visa} title={messages.visa.title} lead={messages.visa.lead} />
        <div className="mt-8 space-y-4">
          {[
            messages.visa.free,
            messages.visa.id,
            messages.visa.required,
            messages.visa.usWaiver,
            messages.visa.solvency,
            messages.visa.sag,
          ].map((item) => (
            <p key={item} className="rounded-3xl bg-cream p-5">
              {item}
            </p>
          ))}
          <section className="rounded-3xl bg-pine p-6 text-cream">
            <h2 className="font-display text-3xl">{messages.visa.rapanui}</h2>
            <p className="mt-3">{messages.planner.rapanuiRules}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
