import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PlannerWizard } from "@/components/planner-wizard";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import type { PlannerInput } from "@/lib/estimate";
import type { TravelStyle } from "@/data/types";

function PlanFallback() {
  return (
    <div className="bg-sand pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="h-10 w-48 rounded-full bg-sand-deep" />
        <div className="mt-6 h-24 rounded-3xl bg-cream" />
      </div>
    </div>
  );
}

async function PlanInner({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);
  const query = await searchParams;
  const seed: Partial<PlannerInput> = {
    country: typeof query.c === "string" ? query.c : undefined,
    days: Number.isFinite(Number(query.d)) ? Number(query.d) : undefined,
    travelers: Number.isFinite(Number(query.t)) ? Number(query.t) : undefined,
    budgetUsd: Number.isFinite(Number(query.b)) ? Number(query.b) : undefined,
    style: typeof query.s === "string" ? (query.s as TravelStyle) : undefined,
    regions: typeof query.r === "string" ? query.r.split(",").filter(Boolean) : undefined,
    interests: typeof query.i === "string" ? query.i.split(",").filter(Boolean) : undefined,
    eco: query.eco === "1",
  };

  return (
    <div className="bg-sand pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-terracotta">
          {messages.planner.title}
        </p>
        <PlannerWizard locale={locale} messages={messages} seed={seed} />
      </div>
    </div>
  );
}

export default function PlanPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<PlanFallback />}>
      <PlanInner params={params} searchParams={searchParams} />
    </Suspense>
  );
}
