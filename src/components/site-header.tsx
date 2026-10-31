"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname.split("/").filter(Boolean).length === 1;
  const { open, openPlanner, minimize } = usePlanner();
  const href = (path: string) => `/${locale}${path}`;
  const light = isHome && !open && !scrolled;
  const goHomeMinimize = () => {
    // Logo always returns home with the planner closed / minimized.
    minimize();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Planner owns the viewport — logo / hamburger live only when it is closed.
  if (open) return null;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50",
        isHome
          ? cn(
              "fixed",
              light ? "bg-transparent" : "bg-sand/90 backdrop-blur border-b border-line",
            )
          : "sticky border-b border-line bg-sand/90 backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href={href("/")}
          onClick={(event) => {
            event.preventDefault();
            goHomeMinimize();
          }}
          className={cn(
            "flex items-center gap-3 font-display text-xl tracking-tight",
            light || (isHome && open) ? "text-cream" : "text-ink",
          )}
          aria-label={`${messages.brand} — ${messages.nav.home}`}
          title={messages.nav.home}
        >
          <ChileFlag
            variant="circle"
            className={cn(
              "size-10 shrink-0 shadow-[0_6px_16px_rgba(8,20,16,0.35)]",
              light || (isHome && open) ? "ring-2 ring-white/85" : "ring-2 ring-black/10",
            )}
          />
          {messages.brand}
        </Link>
        <nav
          className={cn(
            "hidden items-center gap-4 text-[13px] lg:flex xl:gap-6 xl:text-sm",
            light || (isHome && open) ? "text-cream/85" : "text-ink-soft",
          )}
        >
          {links.map(([key, path]) => (
            <Link
              key={key}
              href={href(`/${path}`)}
              onClick={() => {
                if (open) minimize();
              }}
              className={
                light || (isHome && open) ? "hover:text-glacier" : "hover:text-terracotta"
              }
            >
              {messages.nav[key]}
            </Link>
          ))}
          <LanguageSwitcher
            locale={locale}
            label={messages.common.language}
            light={light || (isHome && open)}
          />
          <Link
            href={href("/plan")}
            onClick={() => {
              if (open) minimize();
            }}
            className={
              light || (isHome && open) ? "hover:text-glacier" : "hover:text-terracotta"
            }
          >
            {messages.nav.plan}
          </Link>
          <button
            type="button"
            onClick={() => (open ? minimize() : openPlanner())}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 font-medium text-cream hover:bg-terracotta-deep"
            aria-label={open ? messages.planner.minimize : messages.hero.cta}
            title={open ? messages.planner.minimize : messages.hero.cta}
          >
            {open ? <Minus size={16} /> : messages.hero.cta}
          </button>
        </nav>
        <button
          type="button"
          className={cn(
            "rounded-full border p-2 lg:hidden",
            light || (isHome && open) ? "border-white/20 text-cream" : "border-line text-ink",
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
            <Link
              href={href("/plan")}
              onClick={() => {
                setMenuOpen(false);
                if (open) minimize();
              }}
            >
              {messages.nav.plan}
            </Link>
            <button
              type="button"
              className="text-left"
              onClick={() => {
                setMenuOpen(false);
                open ? minimize() : openPlanner();
              }}
            >
              {open ? messages.planner.minimize : messages.hero.cta}
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
