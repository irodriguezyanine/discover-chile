export type MapZoneId =
  | "atacama"
  | "santiago-wine"
  | "ski"
  | "lakes"
  | "chiloe"
  | "carretera"
  | "patagonia"
  | "rapanui";

export type MapPin = {
  id: string;
  zone: MapZoneId;
  x: number;
  y: number;
  label: string;
  /** Always drawn; non-featured pins appear when their zone is active. */
  featured?: boolean;
};

export const mapZones: {
  id: MapZoneId;
  d: string;
  fill: string;
  island?: boolean;
}[] = [
  {
    id: "atacama",
    fill: "#c4a574",
    d: "M198 36 L226 42 L238 88 L252 132 L246 176 L228 188 L168 186 L160 142 L168 88 L180 48 Z",
  },
  {
    id: "santiago-wine",
    fill: "#c45c26",
    d: "M168 186 L228 188 L236 228 L242 268 L228 292 L158 286 L150 248 L156 214 Z",
  },
  {
    id: "ski",
    fill: "#8ec9d6",
    d: "M228 214 L248 222 L252 258 L236 268 L228 248 Z",
  },
  {
    id: "lakes",
    fill: "#1b3c32",
    d: "M158 286 L228 292 L222 338 L214 378 L198 396 L150 388 L144 344 L148 310 Z",
  },
  {
    id: "chiloe",
    fill: "#3d6b5c",
    island: true,
    d: "M118 368 C128 360 148 366 152 384 C150 408 138 428 122 430 C108 422 106 392 118 368 Z",
  },
  {
    id: "carretera",
    fill: "#4f7464",
    d: "M150 388 L198 396 L206 438 L200 486 L188 528 L168 538 L154 500 L148 454 L146 414 Z",
  },
  {
    id: "patagonia",
    fill: "#3d6d7a",
    d: "M168 538 L188 528 L210 560 L238 602 L248 648 L232 692 L198 708 L162 698 L148 662 L158 618 L164 576 Z",
  },
  {
    id: "rapanui",
    fill: "#9a3f16",
    island: true,
    d: "M52 214 C64 200 86 204 90 222 C86 242 66 250 50 240 C40 230 40 220 52 214 Z",
  },
];

/** Static fallback — prefer live pins from Supabase `chile_region_pins`. */
export const mapPins: MapPin[] = [
  { id: "arica", zone: "atacama", x: 206, y: 52, label: "Arica", featured: true },
  { id: "iquique", zone: "atacama", x: 218, y: 88, label: "Iquique" },
  { id: "calama", zone: "atacama", x: 244, y: 128, label: "Calama" },
  { id: "spa", zone: "atacama", x: 238, y: 148, label: "San Pedro", featured: true },
  { id: "serena", zone: "santiago-wine", x: 170, y: 200, label: "La Serena" },
  { id: "valpo", zone: "santiago-wine", x: 164, y: 236, label: "Valparaíso", featured: true },
  { id: "scl", zone: "santiago-wine", x: 198, y: 248, label: "Santiago", featured: true },
  { id: "farellones", zone: "ski", x: 240, y: 236, label: "Farellones" },
  { id: "temuco", zone: "lakes", x: 176, y: 320, label: "Temuco" },
  { id: "pucon", zone: "lakes", x: 186, y: 352, label: "Pucón", featured: true },
  { id: "varas", zone: "lakes", x: 168, y: 372, label: "Pto. Varas" },
  { id: "castro", zone: "chiloe", x: 132, y: 398, label: "Castro", featured: true },
  { id: "coyhaique", zone: "carretera", x: 178, y: 478, label: "Coyhaique", featured: true },
  { id: "castillo", zone: "carretera", x: 186, y: 510, label: "Cerro Castillo" },
  { id: "natales", zone: "patagonia", x: 196, y: 628, label: "Natales", featured: true },
  { id: "punta", zone: "patagonia", x: 214, y: 668, label: "Punta Arenas", featured: true },
  { id: "hanga", zone: "rapanui", x: 70, y: 226, label: "Hanga Roa", featured: true },
];

export const mapCycle: MapZoneId[] = [
  "atacama",
  "santiago-wine",
  "ski",
  "lakes",
  "chiloe",
  "carretera",
  "patagonia",
  "rapanui",
];

export type LiveMapZone = {
  id: MapZoneId;
  d: string;
  fill: string;
  island?: boolean;
  labelEn?: string;
  labelEs?: string;
};

export type LiveMapData = {
  zones: LiveMapZone[];
  pins: MapPin[];
  cycle: MapZoneId[];
  source: "supabase" | "static";
};
