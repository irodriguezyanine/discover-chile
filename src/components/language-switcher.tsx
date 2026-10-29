"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
  light = true,
}: {
  locale: Locale;
  label: string;
  light?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    const query = window.location.search;
    const path = segments.join("/") || `/${next}`;
    router.push(`${path}${query}`);
  };

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{label}</span>
      <select
        value={locale}
        onChange={(event) => onChange(event.target.value)}
        className={
          light
            ? "rounded-full border border-white/20 bg-night/40 px-3 py-1.5 text-cream outline-none backdrop-blur hover:border-terracotta"
            : "rounded-full border border-line bg-cream px-3 py-1.5 text-ink outline-none hover:border-terracotta"
        }
        aria-label={label}
      >
        {locales.map((item) => (
          <option key={item} value={item} className="text-ink">
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
