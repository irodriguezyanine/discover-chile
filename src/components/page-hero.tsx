import { ChileFlag } from "@/components/chile-flag";

export function PageHero({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-terracotta">
        <ChileFlag variant="circle" className="size-5 ring-1 ring-black/10" />
        {kicker}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{title}</h1>
      {lead ? <p className="mt-4 text-lg text-ink-soft">{lead}</p> : null}
    </header>
  );
}
