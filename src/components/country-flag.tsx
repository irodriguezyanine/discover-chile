import { flagEmoji } from "@/lib/flag-emoji";
import { cn } from "@/lib/cn";

export function CountryFlag({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-5 shrink-0 place-items-center overflow-hidden rounded-full bg-sand-deep text-[0.95rem] leading-none shadow-sm ring-1 ring-black/10",
        className,
      )}
      aria-hidden
    >
      {flagEmoji(code)}
    </span>
  );
}
