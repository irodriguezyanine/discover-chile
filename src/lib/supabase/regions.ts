import {
  mapCycle,
  mapPins,
  mapZones,
  type LiveMapData,
  type LiveMapZone,
  type MapPin,
  type MapZoneId,
} from "@/data/chile-map";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type { LiveMapData, LiveMapZone };

type RegionRow = {
  id: string;
  fill: string;
  path_d: string;
  island: boolean | null;
  label_en: string | null;
  label_es: string | null;
  sort_order: number | null;
  active: boolean | null;
};

type PinRow = {
  id: string;
  region_id: string;
  label: string;
  x: number | string;
  y: number | string;
  sort_order: number | null;
  featured: boolean | null;
};

const ZONE_IDS = new Set<string>(mapCycle);

function asZoneId(id: string): MapZoneId | null {
  return ZONE_IDS.has(id) ? (id as MapZoneId) : null;
}

function staticMapData(): LiveMapData {
  return {
    zones: mapZones.map((zone) => ({ ...zone })),
    pins: mapPins.map((pin) => ({ ...pin })),
    cycle: [...mapCycle],
    source: "static",
  };
}

export async function getLiveMapData(): Promise<LiveMapData> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return staticMapData();

  try {
    const [regionsRes, pinsRes] = await Promise.all([
      supabase
        .from("chile_regions")
        .select(
          "id, fill, path_d, island, label_en, label_es, sort_order, active",
        )
        .eq("active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("chile_region_pins")
        .select("id, region_id, label, x, y, sort_order, featured")
        .order("sort_order", { ascending: true }),
    ]);

    if (regionsRes.error || pinsRes.error || !regionsRes.data?.length) {
      return staticMapData();
    }

    const zones: LiveMapZone[] = [];
    for (const row of regionsRes.data as RegionRow[]) {
      const id = asZoneId(row.id);
      if (!id || !row.path_d || !row.fill) continue;
      zones.push({
        id,
        d: row.path_d,
        fill: row.fill,
        island: Boolean(row.island),
        labelEn: row.label_en ?? undefined,
        labelEs: row.label_es ?? undefined,
      });
    }

    if (zones.length < 4) return staticMapData();

    const pins: MapPin[] = [];
    for (const row of (pinsRes.data ?? []) as PinRow[]) {
      const zone = asZoneId(row.region_id);
      if (!zone) continue;
      const x = Number(row.x);
      const y = Number(row.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      pins.push({
        id: row.id,
        zone,
        x,
        y,
        label: row.label,
        featured: Boolean(row.featured),
      });
    }

    const cycle = zones.map((zone) => zone.id);

    return {
      zones,
      pins: pins.length ? pins : mapPins.map((pin) => ({ ...pin })),
      cycle: cycle.length ? cycle : [...mapCycle],
      source: "supabase",
    };
  } catch {
    return staticMapData();
  }
}
