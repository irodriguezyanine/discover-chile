import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { ChileFlag } from "@/components/chile-flag";
import { OpenPlannerLink } from "@/components/open-planner-link";
import Link from "next/link";

export function SiteFooter({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const href = (path: string) => `/${locale}${path}`;
  return (
    <footer className="bg-night text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="flex items-center gap-3 font-display text-2xl">
            <ChileFlag
              variant="circle"
              className="size-10 shrink-0 ring-2 ring-white/35"
            />
            Discover Chile
          </p>
          <p className="mt-3 max-w-sm text-sm text-cream/70">{messages.footer.blurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-cream/80">
          <OpenPlannerLink>{messages.nav.plan}</OpenPlannerLink>
          <Link href={href("/destinations")}>{messages.nav.destinations}</Link>
          <Link href={href("/routes")}>{messages.nav.routes}</Link>
          <Link href={href("/activities")}>{messages.nav.activities}</Link>
          <Link href={href("/stays")}>{messages.nav.stays}</Link>
          <Link href={href("/fuel")}>{messages.nav.fuel}</Link>
          <Link href={href("/parks")}>{messages.nav.parks}</Link>
          <Link href={href("/visa")}>{messages.nav.visa}</Link>
          <Link href={href("/faq")}>{messages.nav.faq}</Link>
          <Link href={href("/about")}>{messages.nav.about}</Link>
        </div>
        <div className="text-sm text-cream/70">
          <p>{messages.footer.contact}</p>
          <p className="mt-4 text-xs">{messages.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
