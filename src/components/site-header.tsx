"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Minus, X } from "lucide-react";
import type { Messages } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ChileFlag } from "@/components/chile-flag";
import { usePlanner } from "@/components/planner-context";
import { cn } from "@/lib/cn";

const links = [
  ["destinations", "destinations"],
  ["routes", "routes"],
  ["activities", "activities"],
  ["stays", "stays"],
  ["fuel", "fuel"],
  ["parks", "parks"],
] as const;

export function SiteHeader({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname.split("/").filter(Boolean).length === 1;
  const { open, openPlanner, minimize } = usePlanner();
  const href = (path: string) => `/${locale}${path}`;
  const light = isHome && !open;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50",
        isHome
          ? cn("absolute", open && "bg-night/70 backdrop-blur-md")
          : "sticky border-b border-line bg-sand/90 backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href={href("/")}
          onClick={() => {
            if (open) minimize();
          }}
          className={cn(
            "flex items-center gap-3 font-display text-xl tracking-tight",
            light ? "text-cream" : isHome ? "text-cream" : "text-ink",
          )}
        >
          <ChileFlag
            variant="circle"
            className={cn(
              "size-10 shrink-0 shadow-[0_6px_16px_rgba(8,20,16,0.35)]",
              light || isHome ? "ring-2 ring-white/85" : "ring-2 ring-black/10",
            )}
          />
          Discover Chile
        </Link>
        <nav
          className={cn(
            "hidden items-center gap-4 text-[13px] lg:flex xl:gap-6 xl:text-sm",
            light || isHome ? "text-cream/85" : "text-ink-soft",
          )}
        >
          {links.map(([key, path]) => (
            <Link
              key={key}
              href={href(`/${path}`)}
              onClick={() => {
                if (open) minimize();
              }}
              className={light || isHome ? "hover:text-glacier" : "hover:text-terracotta"}
            >
              {messages.nav[key]}
            </Link>
          ))}
          <LanguageSwitcher
            locale={locale}
            label={messages.common.language}
            light={light || isHome}
          />
          <button
            type="button"
            onClick={() => (open ? minimize() : openPlanner())}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 font-medium text-cream hover:bg-terracotta-deep"
            aria-label={open ? messages.planner.minimize : messages.nav.plan}
            title={open ? messages.planner.minimize : messages.nav.plan}
          >
            {open ? <Minus size={16} /> : messages.nav.plan}
          </button>
        </nav>
        <button
          type="button"
          className={cn(
            "rounded-full border p-2 lg:hidden",
            light || isHome ? "border-white/20 text-cream" : "border-line text-ink",
          )}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen ? (
        <div className="mx-4 rounded-3xl bg-night/95 p-5 text-cream shadow-2xl backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3 text-base">
            <button
              type="button"
              className="text-left"
              onClick={() => {
                setMenuOpen(false);
                open ? minimize() : openPlanner();
              }}
            >
              {open ? messages.planner.minimize : messages.nav.plan}
            </button>
            {links.map(([key, path]) => (
              <Link
                key={key}
                href={href(`/${path}`)}
                onClick={() => {
                  setMenuOpen(false);
                  if (open) minimize();
                }}
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
