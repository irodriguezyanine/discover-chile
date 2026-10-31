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

/**
 * Geographic Chile silhouette — long thin strip (not stacked rectangles/blobs).
 * Zones share borders so the country reads as one continuous drawing.
 * viewBox 0 0 320 760 — Chiloé + Rapa Nui as insets.
 */
export const mapZones: {
  id: MapZoneId;
  d: string;
  fill: string;
  island?: boolean;
}[] = [
  {
    id: "atacama",
    fill: "#d4b896",
    // Arica → San Pedro: thin desert ribbon, Pacific west / altiplano east
    d: "M196 22 C204 20 214 24 220 32 C228 48 234 72 238 100 C242 130 244 158 240 182 C236 198 228 206 218 210 L186 206 C178 188 174 160 176 132 C178 100 182 68 186 44 C188 30 190 24 196 22 Z",
  },
  {
    id: "santiago-wine",
    fill: "#c45c26",
    // La Serena → Valparaíso / Santiago corridor
    d: "M186 206 C200 208 214 210 218 210 C226 220 230 238 228 258 C224 278 214 292 200 296 L172 290 C164 274 162 252 164 234 C166 218 174 208 186 206 Z",
  },
  {
    id: "ski",
    fill: "#7eb8c6",
    // Andes ski belt east of Santiago
    d: "M218 210 C230 214 240 224 242 242 C240 258 232 268 222 270 L214 258 C212 240 214 222 218 210 Z",
  },
  {
    id: "lakes",
    fill: "#1f4a3c",
    // Temuco → Puerto Varas lakes district
    d: "M172 290 C190 294 206 300 212 316 C218 336 216 358 210 378 C202 396 188 404 174 402 L152 390 C148 368 150 344 154 324 C158 308 164 294 172 290 Z",
  },
  {
    id: "chiloe",
    fill: "#3f735f",
    island: true,
    // Chiloé archipelago west of the lakes
    d: "M112 368 C124 358 142 364 148 380 C150 400 140 420 126 426 C112 420 104 396 108 380 C110 372 110 368 112 368 Z",
  },
  {
    id: "carretera",
    fill: "#4f7a68",
    // Carretera Austral: narrow fjord spine
    d: "M152 390 C168 398 184 408 190 426 C196 450 198 478 194 508 C188 540 176 562 164 574 L146 552 C142 520 140 484 142 452 C144 424 146 404 152 390 Z",
  },
  {
    id: "patagonia",
    fill: "#3d6d7a",
    // Magallanes flare + tip toward Cape Horn
    d: "M146 552 C160 564 174 580 184 604 C194 632 206 660 210 686 C204 708 188 720 168 722 C150 718 140 704 136 684 C132 656 134 624 138 598 C140 576 142 560 146 552 Z",
  },
  {
    id: "rapanui",
    fill: "#9a3f16",
    island: true,
    // Rapa Nui inset in the Pacific
    d: "M44 200 C56 188 78 192 84 210 C82 230 64 242 46 234 C34 224 34 208 44 200 Z",
  },
];

/** Static fallback — prefer live pins from Supabase `chile_region_pins`. */
export const mapPins: MapPin[] = [
  { id: "arica", zone: "atacama", x: 204, y: 42, label: "Arica", featured: true },
  { id: "iquique", zone: "atacama", x: 216, y: 82, label: "Iquique" },
  { id: "calama", zone: "atacama", x: 232, y: 128, label: "Calama" },
  { id: "spa", zone: "atacama", x: 224, y: 172, label: "San Pedro", featured: true },
  { id: "serena", zone: "santiago-wine", x: 176, y: 222, label: "La Serena" },
  { id: "valpo", zone: "santiago-wine", x: 172, y: 252, label: "Valparaíso", featured: true },
  { id: "scl", zone: "santiago-wine", x: 198, y: 264, label: "Santiago", featured: true },
  { id: "farellones", zone: "ski", x: 232, y: 246, label: "Farellones" },
  { id: "temuco", zone: "lakes", x: 180, y: 332, label: "Temuco" },
  { id: "pucon", zone: "lakes", x: 196, y: 358, label: "Pucón", featured: true },
  { id: "varas", zone: "lakes", x: 170, y: 384, label: "Pto. Varas" },
  { id: "castro", zone: "chiloe", x: 128, y: 398, label: "Castro", featured: true },
  { id: "coyhaique", zone: "carretera", x: 176, y: 486, label: "Coyhaique", featured: true },
  { id: "castillo", zone: "carretera", x: 182, y: 528, label: "Cerro Castillo" },
  { id: "natales", zone: "patagonia", x: 182, y: 636, label: "Natales", featured: true },
  { id: "punta", zone: "patagonia", x: 192, y: 684, label: "Punta Arenas", featured: true },
  { id: "hanga", zone: "rapanui", x: 64, y: 218, label: "Hanga Roa", featured: true },
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
