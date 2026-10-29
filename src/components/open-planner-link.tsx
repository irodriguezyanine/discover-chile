"use client";

import type { PlannerInput } from "@/lib/estimate";
import { usePlanner } from "@/components/planner-context";
import { cn } from "@/lib/cn";

export function OpenPlannerLink({
  seed,
  className,
  children,
}: {
  seed?: Partial<PlannerInput>;
  className?: string;
  children: React.ReactNode;
}) {
  const { openPlanner } = usePlanner();
  return (
    <button
      type="button"
      className={cn("cursor-pointer text-left", className)}
      onClick={() => openPlanner(seed)}
    >
      {children}
    </button>
  );
}
