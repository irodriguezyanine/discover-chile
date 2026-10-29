import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/data/types";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";

export function DestinationCard({
  destination,
  locale,
  messages,
}: {
  destination: Destination;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <Link
      href={`/${locale}/destinations/${destination.slug}`}
      className="group overflow-hidden rounded-[1.75rem] bg-cream shadow-sm"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={destination.image}
          alt={pick(destination.imageAlt, locale)}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-xs uppercase tracking-wider text-cream">
          {pick(destination.region, locale)}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl">{pick(destination.name, locale)}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink-soft">
          {pick(destination.summary, locale)}
        </p>
        <p className="mt-4 text-xs uppercase tracking-wider text-terracotta">
          {destination.recommendedDays} {messages.dest.rec} · {messages.dest.fromScl}{" "}
          {destination.flightFromSclHours}
          {messages.common.hours}
        </p>
      </div>
    </Link>
  );
}
