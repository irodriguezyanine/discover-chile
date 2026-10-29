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
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-sand-deep shadow-sm ring-1 ring-black/10",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
        alt=""
        draggable={false}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
