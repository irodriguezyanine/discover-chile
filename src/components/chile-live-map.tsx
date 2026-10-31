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
  tone = "light",
}: {
  destinations: Destination[];
  locale: Locale;
  messages: Messages;
  active: MapZoneId;
  onActive: (id: MapZoneId) => void;
  mapData?: LiveMapData;
  tone?: "light" | "dark";
}) {
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const light = tone === "light";

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

  const label = light ? "#3d5248" : "#fffaf2";
  const ocean = light ? "#5a8f9c" : "#8ec9d6";
  const pinFill = light ? "#102018" : "#fffaf2";
  const strokeIdle = light ? "rgba(16,32,24,0.22)" : "rgba(255,250,242,0.28)";
  const strokeActive = light ? "#102018" : "#fffaf2";

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
      <div
        className={cn(
          "mx-auto w-full max-w-[360px] rounded-[2rem] p-3 md:max-w-[420px]",
          light
            ? "bg-gradient-to-b from-cream via-[#eef5f2] to-[#d9ebe6] shadow-[0_24px_60px_rgba(16,32,24,0.12)] ring-1 ring-ink/10"
            : "",
        )}
      >
        <svg
          viewBox="0 0 320 760"
          className="mx-auto h-auto w-full"
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
          <defs>
            <linearGradient id="chile-sea" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={light ? "#cfe4e2" : "#0c2420"} stopOpacity="0.9" />
              <stop offset="100%" stopColor={light ? "#e8f2ef" : "#081410"} stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="760" fill="url(#chile-sea)" rx="18" />

          <text
            x="208"
            y="28"
            fill={label}
            fillOpacity="0.55"
            fontSize="10"
            letterSpacing="0.18em"
          >
            PERÚ
          </text>
          <text
            x="246"
            y="108"
            fill={label}
            fillOpacity="0.5"
            fontSize="10"
            letterSpacing="0.12em"
          >
            BOLIVIA
          </text>
          <text
            x="268"
            y="300"
            fill={ocean}
            fillOpacity="0.55"
            fontSize="11"
            letterSpacing="0.28em"
            transform="rotate(90 268 300)"
          >
            ARGENTINA
          </text>
          <text
            x="16"
            y="360"
            fill={ocean}
            fillOpacity="0.55"
            fontSize="10"
            letterSpacing="0.32em"
          >
            PACÍFICO
          </text>

          <line
            x1="92"
            y1="220"
            x2="176"
            y2="208"
            stroke={ocean}
            strokeDasharray="5 6"
            strokeOpacity="0.45"
          />

          {zoneList.map((zone) => {
            const destination = destinations.find((item) => item.id === zone.id);
            const selected = active === zone.id;
            return (
              <path
                key={zone.id}
                d={zone.d}
                fill={zone.fill}
                fillOpacity={selected ? 1 : light ? 0.88 : 0.76}
                stroke={selected ? strokeActive : strokeIdle}
                strokeWidth={selected ? 2.4 : 1.1}
                strokeLinejoin="round"
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
                  <circle cx={pin.x} cy={pin.y} r="9" fill={pinFill} fillOpacity="0.12">
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
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={on ? 3.6 : 2.3}
                  fill={on ? "#c45c26" : pinFill}
                />
                <text
                  x={pin.x + 7}
                  y={pin.y + 3}
                  fill={pinFill}
                  fontSize="9"
                  opacity={on ? 1 : 0.62}
                >
                  {pin.label}
                </text>
              </g>
            );
          })}

          <text
            x="34"
            y="186"
            fill={label}
            fontSize="9"
            letterSpacing="0.16em"
            opacity="0.7"
          >
            ISLA DE PASCUA
          </text>
        </svg>
      </div>
      <p
        className={cn(
          "mt-3 text-center text-[11px] uppercase tracking-[0.22em]",
          light ? "text-ink-soft" : "text-cream/50",
        )}
      >
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
                  : light
                    ? "bg-cream text-ink-soft ring-1 ring-ink/10 hover:bg-sand-deep"
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
