"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Destination } from "@/data/types";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/en";
import { pick } from "@/i18n/loc";
import { cn } from "@/lib/cn";
import {
  layoutSelectorRail,
  selectorCycle,
  selectorDeskViewBox,
  selectorHitZones,
  selectorImage,
  selectorImageSize,
  selectorLabels,
  selectorPhoneViewBox,
  selectorPins,
  type SelectorZoneId,
} from "@/data/chile-selector-map";

export function ChileLiveMap({
  destinations,
  locale,
  messages,
  active,
  onActive,
  onPreview,
  phone = false,
  hideChips = false,
}: {
  destinations: Destination[];
  locale: Locale;
  messages: Messages;
  active: SelectorZoneId;
  onActive: (id: SelectorZoneId) => void;
  onPreview?: (id: SelectorZoneId | null) => void;
  phone?: boolean;
  hideChips?: boolean;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hover, setHover] = useState<SelectorZoneId | null>(null);

  const setPreview = (id: SelectorZoneId | null) => {
    if (phone) return;
    setHover(id);
    onPreview?.(id);
  };

  const step = useCallback(
    (delta: number) => {
      const index = selectorCycle.indexOf(active);
      const next =
        selectorCycle[(index + delta + selectorCycle.length) % selectorCycle.length];
      if (next) onActive(next);
    },
    [active, onActive],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const mapSvg = (viewBox: string, compact: boolean) => (
    <svg
      viewBox={viewBox}
      className={
        compact
          ? "block h-full w-auto max-w-full"
          : "mx-auto block max-w-full"
      }
      style={
        compact
          ? undefined
          : { height: "min(70vh, 640px)", width: "auto" }
      }
      role="group"
      aria-label={messages.desk.mapAria}
      tabIndex={0}
      preserveAspectRatio="xMidYMid meet"
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
      <image
        href={selectorImage}
        width={selectorImageSize.width}
        height={selectorImageSize.height}
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none"
      />
      {compact ? null : (
        <line
          x1="104"
          y1="300"
          x2="260"
          y2="462"
          stroke="#c45c26"
          strokeDasharray="8 10"
          strokeWidth="2"
          strokeOpacity="0.55"
          className="pointer-events-none"
        />
      )}
      {selectorHitZones.map((zone) => {
        if (compact && zone.id === "rapanui") return null;
        const destination = destinations.find((item) => item.id === zone.id);
        const selected = active === zone.id;
        const hot = selected || hover === zone.id;
        return (
          <g key={zone.id}>
            <path
              d={zone.d}
              fill="transparent"
              stroke="transparent"
              strokeWidth={zone.island || compact ? 28 : 22}
              className="cursor-pointer"
              data-zone={zone.id}
              onClick={() => onActive(zone.id)}
              onPointerEnter={() => setPreview(zone.id)}
              onFocus={() => {
                if (!compact) setPreview(zone.id);
              }}
              tabIndex={0}
              role="button"
              aria-pressed={selected}
              aria-label={
                destination ? pick(destination.name, locale) : selectorLabels[zone.id]
              }
            />
            <path
              d={zone.d}
              fill={
                selected
                  ? "rgba(196,92,38,0.48)"
                  : hot
                    ? "rgba(196,92,38,0.22)"
                    : "rgba(255,255,255,0.02)"
              }
              stroke={
                selected
                  ? "#c45c26"
                  : hot
                    ? "rgba(196,92,38,0.8)"
                    : "transparent"
              }
              strokeWidth={selected ? 7 : hot ? 5 : 2.5}
              className="pointer-events-none"
            />
          </g>
        );
      })}
      {selectorPins.map((pin) => {
        const on = active === pin.zone || hover === pin.zone;
        if (compact && pin.zone === "rapanui") return null;
        return (
          <g
            key={pin.id}
            data-pin={pin.id}
            className="cursor-pointer"
            onClick={() => onActive(pin.zone)}
            onPointerEnter={() => setPreview(pin.zone)}
            role="button"
            tabIndex={0}
            aria-label={pin.label}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onActive(pin.zone);
              }
            }}
          >
            <circle
              cx={pin.x}
              cy={pin.y}
              r={compact ? 36 : 34}
              fill="transparent"
            />
            {on && !reduceMotion ? (
              <circle
                cx={pin.x}
                cy={pin.y}
                r="16"
                fill="#c45c26"
                fillOpacity="0.18"
              >
                <animate
                  attributeName="r"
                  values="8;22;8"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            ) : null}
            <circle
              cx={pin.x}
              cy={pin.y}
              r={on ? 7 : 4.5}
              fill={on ? "#c45c26" : "#1c2420"}
            />
            {compact ? null : (
              <text
                x={pin.x + (pin.x < 240 ? -14 : 14)}
                y={pin.y + 5}
                textAnchor={pin.x < 240 ? "end" : "start"}
                fill="#1c2420"
                fontSize={18}
                fontWeight={on ? 700 : 400}
                opacity={on ? 1 : 0.78}
                className="pointer-events-none"
              >
                {pin.label}
              </text>
            )}
          </g>
        );
      })}
      {compact ? null : (
        <text
          x="24"
          y="230"
          fill="#1c2420"
          fontSize="16"
          letterSpacing="0.12em"
          opacity="0.75"
          className="pointer-events-none"
        >
          ISLA DE PASCUA
        </text>
      )}
    </svg>
  );

  if (phone) {
    return (
      <PhoneMapSelector
        messages={messages}
        active={active}
        onActive={onActive}
        mapSvg={mapSvg(selectorPhoneViewBox, true)}
      />
    );
  }

  return (
    <div className="relative">
      <div
        className="relative"
        onPointerLeave={() => setPreview(null)}
      >
        {mapSvg(selectorDeskViewBox, false)}
      </div>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {messages.desk.cycle} · 4.300 km
      </p>
      {hideChips ? null : (
        <ZoneChips
          destinations={destinations}
          locale={locale}
          active={active}
          onActive={onActive}
        />
      )}
    </div>
  );
}

function PhoneMapSelector({
  messages,
  active,
  onActive,
  mapSvg,
}: {
  messages: Messages;
  active: SelectorZoneId;
  onActive: (id: SelectorZoneId) => void;
  mapSvg: ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const node = railRef.current;
    if (!node) return;
    const measure = () => {
      const next = node.getBoundingClientRect().height;
      if (next > 0) setHeight(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const rows = height > 40 ? layoutSelectorRail(height) : [];

  return (
    <div className="flex h-full min-h-0 flex-col px-2 pb-1 pt-1">
      <div className="flex min-h-0 flex-1">
        <div className="relative flex w-[38%] max-w-[9.5rem] shrink-0 flex-col items-center">
          <span className="text-[9px] font-semibold tracking-[0.22em] text-ink-soft">
            {messages.desk.phoneNorth}
          </span>
          <div ref={railRef} className="relative min-h-0 w-full flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
              {mapSvg}
            </div>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.22em] text-ink-soft">
            {messages.desk.phoneSouth}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <span className="invisible text-[9px] font-semibold tracking-[0.22em]">
            {messages.desk.phoneNorth}
          </span>
          <div className="relative min-h-0 flex-1">
            {rows.map((row) => {
              const selected = active === row.id;
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => onActive(row.id)}
                  aria-pressed={selected}
                  aria-label={selectorLabels[row.id]}
                  className={cn(
                    "absolute right-1 left-0 flex h-8 -translate-y-1/2 items-center gap-2 pr-1 text-left",
                    selected ? "text-terracotta" : "text-ink",
                  )}
                  style={{ top: row.y }}
                >
                  <span
                    className={cn(
                      "h-px min-w-3 flex-1",
                      selected ? "bg-terracotta" : "bg-ink/15",
                    )}
                  />
                  <span
                    className={cn(
                      "shrink-0 text-[12.5px] leading-none tracking-wide",
                      selected
                        ? "font-display text-[15px] font-medium"
                        : "font-medium",
                    )}
                  >
                    {selectorLabels[row.id]}
                  </span>
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      selected ? "bg-terracotta" : "bg-ink/25",
                    )}
                  />
                </button>
              );
            })}
          </div>
          <span className="invisible text-[9px] font-semibold tracking-[0.22em]">
            {messages.desk.phoneSouth}
          </span>
        </div>
      </div>

      <div className="mt-1 flex shrink-0 items-center justify-between gap-2 px-1 pb-1">
        <button
          type="button"
          onClick={() => onActive("rapanui")}
          aria-pressed={active === "rapanui"}
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[11px] uppercase tracking-[0.14em] ring-1 transition",
            active === "rapanui"
              ? "bg-terracotta text-cream ring-terracotta"
              : "bg-white text-ink ring-black/10",
          )}
        >
          <span className="size-1.5 rounded-full bg-current opacity-70" />
          {selectorLabels.rapanui}
          <span className="text-[9px] tracking-wider opacity-60">
            {messages.desk.phoneIsland}
          </span>
        </button>
        <p className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          4.300 KM
        </p>
      </div>
    </div>
  );
}

function ZoneChips({
  destinations,
  locale,
  active,
  onActive,
  phone = false,
}: {
  destinations: Destination[];
  locale: Locale;
  active: SelectorZoneId;
  onActive: (id: SelectorZoneId) => void;
  phone?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!phone || !active) return;
    const node = ref.current?.querySelector(`[data-zone-chip="${active}"]`);
    node?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active, phone]);

  return (
    <div
      ref={ref}
      className={cn(
        "no-scrollbar flex snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto",
        phone
          ? "shrink-0 px-4 py-2"
          : "mt-3 -mx-4 justify-start px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0",
      )}
    >
      {selectorCycle.map((id) => {
        const destination = destinations.find((item) => item.id === id);
        const label = destination
          ? pick(destination.name, locale)
          : selectorLabels[id];
        return (
          <button
            key={id}
            type="button"
            data-zone-chip={id}
            onClick={() => onActive(id)}
            className={cn(
              "snap-center rounded-full px-3.5 py-2 text-xs uppercase tracking-wider transition",
              phone ? "min-h-11 shrink-0" : "",
              active === id
                ? "bg-terracotta text-cream"
                : "bg-white text-ink-soft ring-1 ring-black/10 hover:bg-sand-deep",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
