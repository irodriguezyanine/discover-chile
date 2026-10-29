"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/cn";

const links = [
  ["plan", "plan"],
  ["destinations", "destinations"],
  ["routes", "routes"],
  ["parks", "parks"],
  ["stays", "stays"],
  ["visa", "visa"],
] as const;

export function SiteHeader({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname.split("/").filter(Boolean).length === 1;
  const href = (path: string) => `/${locale}${path}`;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-40",
        isHome ? "absolute" : "sticky bg-sand/90 backdrop-blur border-b border-line",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
        <Link
          href={href("/")}
          className={cn(
            "font-display text-xl tracking-tight",
            isHome ? "text-cream" : "text-ink",
          )}
        >
          Discover Chile
        </Link>
        <nav
          className={cn(
            "hidden items-center gap-6 text-sm lg:flex",
            isHome ? "text-cream/85" : "text-ink-soft",
          )}
        >
          {links.map(([key, path]) => (
            <Link
              key={key}
              href={href(`/${path}`)}
              className={isHome ? "hover:text-glacier" : "hover:text-terracotta"}
            >
              {messages.nav[key]}
            </Link>
          ))}
          <LanguageSwitcher
            locale={locale}
            label={messages.common.language}
            light={isHome}
          />
          <Link
            href={href("/plan")}
            className="rounded-full bg-terracotta px-4 py-2 font-medium text-cream hover:bg-terracotta-deep"
          >
            {messages.nav.plan}
          </Link>
        </nav>
        <button
          type="button"
          className={cn(
            "rounded-full border p-2 lg:hidden",
            isHome ? "border-white/20 text-cream" : "border-line text-ink",
          )}
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="mx-4 rounded-3xl bg-night/95 p-5 text-cream shadow-2xl backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3 text-base">
            {links.map(([key, path]) => (
              <Link
                key={key}
                href={href(`/${path}`)}
                onClick={() => setOpen(false)}
              >
                {messages.nav[key]}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} label={messages.common.language} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
