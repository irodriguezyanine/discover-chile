"use client";

import { cn } from "@/lib/cn";

/** Segmented line progress for the full welcome→plan journey (no numbers). */
export function JourneyProgress({
  total,
  current,
  label,
  className,
}: {
  total: number;
  current: number;
  label: string;
  className?: string;
}) {
  const safeTotal = Math.max(1, total);
  const safeCurrent = Math.min(Math.max(current, 0), safeTotal - 1);

  return (
    <ol
      className={cn("flex gap-1", className)}
      aria-label={label}
    >
      {Array.from({ length: safeTotal }, (_, index) => (
        <li key={index} className="min-w-0 flex-1">
          <span
            className={cn(
              "block h-1.5 w-full rounded-full transition-colors duration-300",
              index < safeCurrent
                ? "bg-pine"
                : index === safeCurrent
                  ? "bg-terracotta"
                  : "bg-sand-deep",
            )}
            aria-current={index === safeCurrent ? "step" : undefined}
          />
        </li>
      ))}
    </ol>
  );
}
