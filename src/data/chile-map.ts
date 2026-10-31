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
 * Geographic-feeling Chile silhouette (not blocky rectangles).
 * viewBox 0 0 320 760 — long thin strip with fjords, Chiloé and Rapa Nui inset.
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
    d: "M188 28 C196 26 214 30 222 38 C232 52 238 72 244 96 C250 124 254 152 248 176 C242 196 228 208 214 214 L176 210 C168 190 166 164 168 138 C170 108 174 78 178 54 C180 40 182 32 188 28 Z",
  },
  {
    id: "santiago-wine",
    fill: "#c45c26",
    d: "M176 210 C196 212 214 214 222 224 C230 238 234 256 232 274 C228 292 214 304 196 306 L164 300 C156 284 154 262 156 244 C158 228 164 216 176 210 Z",
  },
  {
    id: "ski",
    fill: "#7eb8c6",
    d: "M222 224 C236 228 248 236 250 252 C248 268 238 278 226 280 L218 268 C216 252 218 236 222 224 Z",
  },
  {
    id: "lakes",
    fill: "#1f4a3c",
    d: "M164 300 C184 304 204 308 214 322 C222 340 220 362 214 384 C206 404 190 414 172 412 L148 400 C144 376 146 350 150 328 C154 312 158 304 164 300 Z",
  },
  {
    id: "chiloe",
    fill: "#3f735f",
    island: true,
    d: "M118 372 C132 362 152 368 158 386 C160 408 148 430 132 436 C116 430 108 404 112 386 C114 376 116 372 118 372 Z",
  },
  {
    id: "carretera",
    fill: "#4f7a68",
    d: "M148 400 C168 408 188 414 198 430 C206 452 210 480 204 512 C196 544 182 568 168 580 L146 556 C142 520 140 480 142 448 C144 422 146 408 148 400 Z",
  },
  {
    id: "patagonia",
    fill: "#3d6d7a",
    d: "M146 556 C162 568 178 584 190 610 C202 640 214 668 218 692 C212 712 196 724 176 726 C158 722 146 708 140 688 C136 660 138 628 142 600 C144 578 146 564 146 556 Z",
  },
  {
    id: "rapanui",
    fill: "#9a3f16",
    island: true,
    d: "M48 206 C62 192 86 196 92 216 C90 238 70 250 50 242 C36 230 36 214 48 206 Z",
  },
];

/** Static fallback — prefer live pins from Supabase `chile_region_pins`. */
export const mapPins: MapPin[] = [
  { id: "arica", zone: "atacama", x: 200, y: 48, label: "Arica", featured: true },
  { id: "iquique", zone: "atacama", x: 214, y: 88, label: "Iquique" },
  { id: "calama", zone: "atacama", x: 236, y: 132, label: "Calama" },
  { id: "spa", zone: "atacama", x: 228, y: 168, label: "San Pedro", featured: true },
  { id: "serena", zone: "santiago-wine", x: 172, y: 226, label: "La Serena" },
  { id: "valpo", zone: "santiago-wine", x: 168, y: 258, label: "Valparaíso", featured: true },
  { id: "scl", zone: "santiago-wine", x: 198, y: 268, label: "Santiago", featured: true },
  { id: "farellones", zone: "ski", x: 236, y: 252, label: "Farellones" },
  { id: "temuco", zone: "lakes", x: 176, y: 340, label: "Temuco" },
  { id: "pucon", zone: "lakes", x: 192, y: 368, label: "Pucón", featured: true },
  { id: "varas", zone: "lakes", x: 168, y: 392, label: "Pto. Varas" },
  { id: "castro", zone: "chiloe", x: 134, y: 404, label: "Castro", featured: true },
  { id: "coyhaique", zone: "carretera", x: 178, y: 492, label: "Coyhaique", featured: true },
  { id: "castillo", zone: "carretera", x: 186, y: 532, label: "Cerro Castillo" },
  { id: "natales", zone: "patagonia", x: 186, y: 640, label: "Natales", featured: true },
  { id: "punta", zone: "patagonia", x: 198, y: 688, label: "Punta Arenas", featured: true },
  { id: "hanga", zone: "rapanui", x: 68, y: 222, label: "Hanga Roa", featured: true },
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
