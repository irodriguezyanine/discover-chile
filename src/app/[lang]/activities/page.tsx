import { notFound } from "next/navigation";
import { activities, type ActivityKind } from "@/data/activities";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/page-hero";
import { ActivityBlock, kindLabel } from "@/components/activity-block";

const kinds: ActivityKind[] = ["rafting", "stars", "wine", "trek", "volcano", "wildlife"];

export default async function ActivitiesPage({
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
        <PageHero
          kicker={messages.nav.activities}
          title={messages.actsPage.title}
          lead={messages.actsPage.lead}
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {kinds.map((kind) => (
            <a
              key={kind}
              href={`#${kind}`}
              className="rounded-full border border-line bg-cream px-4 py-1.5 text-sm hover:border-terracotta"
            >
              {kindLabel(kind, messages)}
            </a>
          ))}
        </div>
        <div className="mt-10 space-y-8">
          {kinds.map((kind) => (
            <section key={kind} id={kind} className="scroll-mt-28 space-y-6">
              {activities
                .filter((item) => item.kind === kind)
                .map((activity) => (
                  <ActivityBlock
                    key={activity.id}
                    activity={activity}
                    locale={locale}
                    messages={messages}
                  />
                ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
