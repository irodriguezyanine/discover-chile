import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlanProfile } from "@/components/plan-profile";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = getDictionary(lang);
  return {
    title: messages.planDesk.title,
    description: messages.planDesk.lead,
  };
}

export default async function PlanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);

  return <PlanProfile locale={locale} messages={messages} />;
}
