import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/page-hero";

export default async function AboutPage({
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
        <PageHero kicker={messages.nav.about} title={messages.about.title} lead="" />
        <p className="mt-6 text-lg leading-relaxed">{messages.about.body}</p>
        <p className="mt-6 leading-relaxed text-ink-soft">{messages.about.video}</p>
        <div className="mt-10 grid gap-3 text-sm">
          <Link href={`/${locale}/fuel`} className="text-terracotta hover:underline">
            {messages.field.fuel} — {messages.field.fuelD}
          </Link>
          <Link href={`/${locale}/activities`} className="text-terracotta hover:underline">
            {messages.field.raft} — {messages.field.raftD}
          </Link>
          <Link href={`/${locale}/stays`} className="text-terracotta hover:underline">
            {messages.field.stay} — {messages.field.stayD}
          </Link>
        </div>
        <p className="mt-10 text-sm text-ink-soft">{messages.footer.contact}</p>
      </div>
    </div>
  );
}
