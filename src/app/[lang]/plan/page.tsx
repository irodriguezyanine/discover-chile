import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";

export const instant = false;

export default async function PlanPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const query = await searchParams;
  const qs = new URLSearchParams();
  qs.set("plan", "1");
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string" && value && key !== "plan") qs.set(key, value);
  }
  redirect(`/${lang}?${qs.toString()}`);
}
