"use client";

import { Compass, Map, NotebookPen } from "lucide-react";
import type { Messages } from "@/i18n/en";
import { cn } from "@/lib/cn";
import { useIsPhone } from "@/hooks/use-is-phone";
import { usePlanner } from "@/components/planner-context";

export type PhoneDeskTab = "map" | "plan" | "tips";

export function PhoneDeskDock({
  messages,
  tab,
  onTab,
}: {
  messages: Messages;
  tab: PhoneDeskTab;
  onTab: (tab: PhoneDeskTab) => void;
}) {
  const phone = useIsPhone();
  const { open, gate, openPlanner, minimize } = usePlanner();

  if (!phone || gate) return null;

  const items: {
    id: PhoneDeskTab;
    label: string;
    Icon: typeof Map;
  }[] = [
    { id: "map", label: messages.desk.phoneTabMap, Icon: Map },
    { id: "plan", label: messages.desk.phoneTabPlan, Icon: NotebookPen },
    { id: "tips", label: messages.desk.phoneTabTips, Icon: Compass },
  ];

  return (
    <nav
      className="fixed inset-x-3 bottom-[max(0.45rem,env(safe-area-inset-bottom))] z-[75] grid grid-cols-3 gap-1 rounded-[1.35rem] bg-night/95 p-1 text-cream shadow-[0_18px_40px_rgba(8,20,16,0.35)] ring-1 ring-white/10 backdrop-blur-md"
      aria-label={messages.desk.phoneDock}
    >
      {items.map(({ id, label, Icon }) => {
        const current = id === "plan" ? open : tab === id && !open;
        return (
          <button
            key={id}
            type="button"
            aria-current={current ? "page" : undefined}
            aria-label={label}
            onClick={() => {
              try {
                navigator.vibrate?.(8);
              } catch {
                /* ignore */
              }
              if (id === "plan") {
                onTab("plan");
                if (!open) openPlanner();
                return;
              }
              if (open) minimize();
              onTab(id);
            }}
            className={cn(
              "flex h-[3.15rem] min-h-12 flex-col items-center justify-center rounded-[1.1rem] text-[10px] uppercase tracking-wider transition",
              current ? "bg-terracotta text-cream" : "text-cream/70",
            )}
          >
            <Icon size={16} strokeWidth={current ? 2.4 : 1.8} />
            <span className="mt-0.5">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
