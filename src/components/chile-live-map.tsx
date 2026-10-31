"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Destination } from "@/data/types";
import {
  mapCycle as staticCycle,
  mapPins as staticPins,
  mapZones as staticZones,
  type MapZoneId,
} from "@/data/chile-map";
import type { LiveMapData } from "@/data/chile-map";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";

export function ChileLiveMap({
  destinations,
  locale,
  messages,
  active,
  onActive,
  mapData,
}: {
  destinations: Destination[];
  locale: Locale;
  messages: Messages;
  active: MapZoneId;
  onActive: (id: MapZoneId) => void;
  mapData?: LiveMapData;
}) {
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const zoneList = mapData?.zones?.length ? mapData.zones : staticZones;
  const pinList = mapData?.pins?.length ? mapData.pins : staticPins;
  const cycle = useMemo(
    () => (mapData?.cycle?.length ? mapData.cycle : staticCycle),
    [mapData?.cycle],
  );

  const step = useCallback(
    (delta: number) => {
      const index = cycle.indexOf(active);
      const next = cycle[(index + delta + cycle.length) % cycle.length];
      if (next) onActive(next);
    },
    [active, cycle, onActive],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => step(1), 4200);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, step]);

  return (
    <div
      className="relative flex min-h-[min(72dvh,640px)] flex-col justify-center md:min-h-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <svg
        viewBox="0 0 320 760"
        className="mx-auto h-auto w-full max-w-[340px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:max-w-[400px]"
        role="img"
        aria-label={messages.desk.mapAria}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        <text x="210" y="28" fill="#fffaf2" fillOpacity="0.42" fontSize="10" letterSpacing="0.18em">
          PERÚ
        </text>
        <text x="248" y="108" fill="#fffaf2" fillOpacity="0.38" fontSize="10" letterSpacing="0.12em">
          BOLIVIA
        </text>
        <text
          x="268"
          y="300"
          fill="#8ec9d6"
          fillOpacity="0.45"
          fontSize="11"
          letterSpacing="0.28em"
          transform="rotate(90 268 300)"
        >
          ARGENTINA
        </text>
        <text x="18" y="360" fill="#8ec9d6" fillOpacity="0.4" fontSize="10" letterSpacing="0.32em">
          PACÍFICO
        </text>

        <line
          x1="90"
          y1="222"
          x2="168"
          y2="186"
          stroke="#8ec9d6"
          strokeDasharray="5 6"
          strokeOpacity="0.35"
        />

        {zoneList.map((zone) => {
          const destination = destinations.find((item) => item.id === zone.id);
          const selected = active === zone.id;
          return (
            <path
              key={zone.id}
              d={zone.d}
              fill={zone.fill}
              fillOpacity={selected ? 1 : 0.76}
              stroke={selected ? "#fffaf2" : "rgba(255,250,242,0.28)"}
              strokeWidth={selected ? 2.6 : 1}
              className="cursor-pointer transition-[fill-opacity,stroke-width] duration-300"
              onClick={() => onActive(zone.id)}
              onFocus={() => onActive(zone.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selected}
              aria-label={destination ? pick(destination.name, locale) : zone.id}
            />
          );
        })}

        {pinList.map((pin) => {
          const on = active === pin.zone;
          if (!on && pin.featured !== true) return null;
          return (
            <g key={pin.id} className="pointer-events-none">
              {on ? (
                <circle cx={pin.x} cy={pin.y} r="9" fill="#fffaf2" fillOpacity="0.18">
                  {reduceMotion ? null : (
                    <animate
                      attributeName="r"
                      values="4;11;4"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              ) : null}
              <circle cx={pin.x} cy={pin.y} r={on ? 3.6 : 2.3} fill="#fffaf2" />
              <text
                x={pin.x + 7}
                y={pin.y + 3}
                fill="#fffaf2"
                fontSize="9"
                opacity={on ? 1 : 0.68}
              >
                {pin.label}
              </text>
            </g>
          );
        })}

        <text x="38" y="188" fill="#fffaf2" fontSize="9" letterSpacing="0.16em" opacity="0.75">
          ISLA DE PASCUA
        </text>
      </svg>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-cream/50">
        {paused ? messages.desk.pause : messages.desk.cycle} · 4.300 km
      </p>
      <div className="mt-4 hidden flex-wrap justify-center gap-1.5 md:flex">
        {cycle.map((id) => {
          const destination = destinations.find((item) => item.id === id);
          if (!destination) return null;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onActive(id)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wider",
                active === id
                  ? "bg-terracotta text-cream"
                  : "bg-white/10 text-cream/75 hover:bg-white/16",
              )}
            >
              {pick(destination.region, locale)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
