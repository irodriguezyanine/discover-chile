import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DocumentLang } from "@/components/document-lang";
import { PlannerProvider } from "@/components/planner-context";
import { CurrencyProvider } from "@/components/currency-context";
import { PlannerDesk } from "@/components/planner-desk";
import { DeskWelcome } from "@/components/desk-welcome";
import { GateShell } from "@/components/gate-shell";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const messages = getDictionary(locale);
  return {
    title: {
      default: `${messages.brand} — ${messages.tagline}`,
      template: `%s · ${messages.brand}`,
    },
    description: messages.hero.subtitle,
    metadataBase: new URL("https://discover-chile.vercel.app"),
    openGraph: {
      title: messages.brand,
      description: messages.hero.subtitle,
      locale,
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const messages = getDictionary(locale);

  return (
    <div
      className={`${outfit.variable} ${fraunces.variable} flex min-h-dvh flex-col bg-transparent font-sans text-ink`}
    >
      <PlannerProvider locale={locale}>
        <CurrencyProvider>
          <DocumentLang locale={locale} />
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <GateShell
            welcome={<DeskWelcome messages={messages} locale={locale} />}
            header={<SiteHeader locale={locale} messages={messages} />}
            footer={<SiteFooter locale={locale} messages={messages} />}
            planner={
              <Suspense fallback={null}>
                <PlannerDesk messages={messages} />
              </Suspense>
            }
          >
            {children}
          </GateShell>
        </CurrencyProvider>
      </PlannerProvider>
    </div>
  );
}
