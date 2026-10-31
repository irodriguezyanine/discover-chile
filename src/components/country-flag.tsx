"use client";

import { useState } from "react";
import { countryFlagUrl } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";

export function CountryFlag({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const normalized = code.trim().toUpperCase();
  const [src, setSrc] = useState(countryFlagUrl(normalized));

  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-sand-deep shadow-sm ring-1 ring-black/10",
        className,
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={80}
        height={80}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
        onError={() => {
          const fallback = `https://flagcdn.com/w80/${normalized.toLowerCase()}.png`;
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </span>
  );
}
