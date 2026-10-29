import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

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
        <h1 className="font-display text-5xl">{messages.about.title}</h1>
        <p className="mt-6 text-lg leading-relaxed">{messages.about.body}</p>
        <p className="mt-6 leading-relaxed text-ink-soft">{messages.about.video}</p>
        <p className="mt-10 text-sm text-ink-soft">{messages.footer.contact}</p>
      </div>
    </div>
  );
}
