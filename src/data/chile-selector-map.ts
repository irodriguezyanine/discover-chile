/** Recovered from Oct 30 production bundle (module 51580) + /maps/chile-regions.png */

export type SelectorZoneId =
  | "atacama"
  | "coquimbo"
  | "valparaiso"
  | "santiago"
  | "santiago-wine"
  | "volcanes"
  | "lakes"
  | "chiloe"
  | "carretera"
  | "parques"
  | "patagonia"
  | "rapanui"
;

export type SelectorPin = {
  id: string;
  zone: SelectorZoneId;
  x: number;
  y: number;
  label: string;
};

export type SelectorHitZone = {
  id: SelectorZoneId;
  d: string;
  island?: boolean;
  poster?: string;
};

export const selectorCycle: SelectorZoneId[] = [
  "atacama",
  "coquimbo",
  "valparaiso",
  "santiago",
  "santiago-wine",
  "volcanes",
  "lakes",
  "chiloe",
  "carretera",
  "parques",
  "patagonia",
  "rapanui",
];

/** Mainland labels only — Rapa Nui uses the bottom pill. */
export const selectorRailIds: SelectorZoneId[] = selectorCycle.filter(
  (id) => id !== "rapanui",
);

export const selectorAnchors: Record<SelectorZoneId, { x: number; y: number }> = {
  "atacama": { x: 332, y: 180 },
  "coquimbo": { x: 290, y: 430 },
  "valparaiso": { x: 252, y: 500 },
  "santiago": { x: 300, y: 508 },
  "santiago-wine": { x: 296, y: 582 },
  "volcanes": { x: 284, y: 654 },
  "lakes": { x: 280, y: 720 },
  "chiloe": { x: 228, y: 748 },
  "carretera": { x: 268, y: 884 },
  "parques": { x: 256, y: 1040 },
  "patagonia": { x: 300, y: 1220 },
  "rapanui": { x: 104, y: 300 },
};

export const selectorLabels: Record<SelectorZoneId, string> = {
  "atacama": "Atacama",
  "coquimbo": "Coquimbo",
  "valparaiso": "Valparaíso",
  "santiago": "Santiago",
  "santiago-wine": "Vinos",
  "volcanes": "volcanes",
  "lakes": "Pucón",
  "chiloe": "Chiloé",
  "carretera": "Austral",
  "parques": "Parques",
  "patagonia": "Patagonia",
  "rapanui": "Rapa Nui",
};

export const selectorImage = "/maps/chile-regions.png";
export const selectorImageSize = { width: 504, height: 1404 } as const;
export const selectorPhoneViewBox = "168 8 280 1388";
export const selectorDeskViewBox = "0 0 504 1404";

export const selectorPins: SelectorPin[] = [
  { id: "arica", zone: "atacama", x: 300.0, y: 60.0, label: "Arica" },
  { id: "spa", zone: "atacama", x: 364.0, y: 228.0, label: "San Pedro" },
  { id: "coquimbo", zone: "coquimbo", x: 300.0, y: 430.0, label: "Coquimbo" },
  { id: "valpo", zone: "valparaiso", x: 236.0, y: 500.0, label: "Valparaíso" },
  { id: "scl", zone: "santiago", x: 308.0, y: 508.0, label: "Santiago" },
  { id: "pucon", zone: "lakes", x: 292.0, y: 720.0, label: "Pucón" },
  { id: "castro", zone: "chiloe", x: 204.0, y: 748.0, label: "Castro" },
  { id: "coyhaique", zone: "carretera", x: 276.0, y: 884.0, label: "Coyhaique" },
  { id: "tortel", zone: "parques", x: 240.0, y: 1040.0, label: "Tortel" },
  { id: "natales", zone: "patagonia", x: 260.0, y: 1172.0, label: "Natales" },
  { id: "punta", zone: "patagonia", x: 348.0, y: 1276.0, label: "Punta Arenas" },
  { id: "hanga", zone: "rapanui", x: 104.0, y: 300.0, label: "Hanga Roa" },
];

export const selectorHitZones: SelectorHitZone[] = [
  { id: "atacama", d: "M296.0 32.5L284.0 40.5L284.0 48.5L280.0 56.5L268.0 64.5L268.0 72.5L268.0 80.5L268.0 88.5L272.0 96.5L272.0 104.5L276.0 112.5L276.0 120.5L280.0 128.5L280.0 136.5L276.0 144.5L280.0 152.5L280.0 160.5L284.0 168.5L284.0 176.5L280.0 184.5L276.0 192.5L276.0 200.5L276.0 208.5L276.0 216.5L276.0 224.5L268.0 232.5L268.0 240.5L276.0 248.5L272.0 256.5L268.0 264.5L268.0 272.5L268.0 280.5L268.0 288.5L272.0 296.5L276.0 304.5L276.0 312.5L272.0 320.5L268.0 328.5L272.0 336.5L272.0 344.5L272.0 352.5L268.0 360.5L268.0 368.5L268.0 376.5L268.0 384.5L268.0 392.5L268.0 399.5L332.0 399.5L332.0 392.5L336.0 384.5L344.0 376.5L352.0 368.5L356.0 360.5L352.0 352.5L344.0 344.5L348.0 336.5L348.0 328.5L344.0 320.5L344.0 312.5L344.0 304.5L348.0 296.5L344.0 288.5L352.0 280.5L360.0 272.5L376.0 264.5L380.0 256.5L384.0 248.5L384.0 240.5L388.0 232.5L388.0 224.5L384.0 216.5L360.0 208.5L360.0 200.5L356.0 192.5L356.0 184.5L352.0 176.5L348.0 168.5L348.0 160.5L348.0 152.5L340.0 144.5L336.0 136.5L332.0 128.5L336.0 120.5L336.0 112.5L336.0 104.5L340.0 96.5L328.0 88.5L324.0 80.5L320.0 72.5L320.0 64.5L316.0 56.5L316.0 48.5L308.0 40.5L300.0 32.5Z", poster: "desert" },
  { id: "coquimbo", d: "M264.0 400.5L264.0 408.5L260.0 416.5L260.0 424.5L260.0 432.5L256.0 440.5L256.0 448.5L260.0 456.5L260.0 461.5L312.0 461.5L308.0 456.5L308.0 448.5L312.0 440.5L312.0 432.5L312.0 424.5L316.0 416.5L320.0 408.5L328.0 400.5Z" },
  { id: "valparaiso", d: "M244.0 462.5L244.0 464.5L244.0 472.5L244.0 480.5L236.0 488.5L236.0 496.5L236.0 504.5L240.0 512.5L240.0 520.5L240.0 528.5L244.0 536.5L244.0 544.5L244.0 552.5L248.0 560.5L248.0 568.5L248.0 584.5L244.0 592.5L248.0 600.5L244.0 608.5L240.0 616.5L240.0 617.5L268.0 617.5L268.0 616.5L268.0 608.5L268.0 600.5L268.0 592.5L268.0 584.5L268.0 568.5L268.0 560.5L268.0 552.5L268.0 544.5L268.0 536.5L268.0 528.5L268.0 520.5L268.0 512.5L268.0 504.5L268.0 496.5L268.0 488.5L268.0 480.5L268.0 472.5L268.0 464.5L268.0 462.5Z" },
  { id: "santiago", d: "M268.0 462.5L268.0 464.5L268.0 472.5L268.0 480.5L268.0 488.5L268.0 496.5L268.0 504.5L268.0 512.5L268.0 520.5L268.0 528.5L268.0 536.5L268.0 548.5L304.0 548.5L308.0 544.5L304.0 536.5L300.0 528.5L296.0 520.5L300.0 512.5L304.0 504.5L304.0 496.5L308.0 488.5L312.0 480.5L312.0 472.5L312.0 464.5L312.0 462.5Z" },
  { id: "santiago-wine", d: "M268.0 548.5L268.0 552.5L268.0 560.5L268.0 568.5L268.0 576.5L268.0 584.5L268.0 592.5L268.0 600.5L268.0 608.5L268.0 616.5L268.0 617.5L324.0 617.5L324.0 616.5L324.0 608.5L320.0 600.5L324.0 592.5L320.0 584.5L316.0 576.5L316.0 568.5L312.0 560.5L308.0 552.5L304.0 548.5Z" },
  { id: "volcanes", d: "M256.0 618.5L256.0 624.5L256.0 632.5L256.0 640.5L256.0 648.5L252.0 656.5L248.0 664.5L244.0 672.5L244.0 680.5L240.0 688.5L240.0 689.5L312.0 689.5L312.0 688.5L316.0 680.5L316.0 672.5L312.0 664.5L312.0 656.5L312.0 648.5L316.0 640.5L316.0 632.5L320.0 624.5L324.0 618.5Z" },
  { id: "lakes", d: "M245.0 690.5L245.0 696.5L245.0 704.5L245.0 712.5L245.0 720.5L245.0 728.5L245.0 736.5L245.0 744.5L245.0 752.5L245.0 753.5L300.0 753.5L300.0 752.5L296.0 744.5L296.0 736.5L296.0 728.5L296.0 720.5L296.0 712.5L300.0 704.5L308.0 696.5L312.0 690.5Z" },
  { id: "chiloe", d: "M240.0 690.5L240.0 696.5L240.0 704.5L236.0 712.5L232.0 720.5L232.0 728.5L220.0 736.5L224.0 744.5L224.0 752.5L228.0 760.5L228.0 768.5L228.0 776.5L232.0 784.5L236.0 792.5L236.0 798.5L245.0 798.5L245.0 792.5L245.0 784.5L245.0 776.5L245.0 768.5L245.0 760.5L245.0 752.5L245.0 744.5L245.0 736.5L245.0 728.5L245.0 720.5L245.0 712.5L245.0 704.5L245.0 696.5L245.0 690.5Z", island: true },
  { id: "carretera", d: "M245.0 754.5L245.0 760.5L245.0 768.5L245.0 776.5L245.0 784.5L245.0 792.5L240.0 800.5L240.0 808.5L240.0 816.5L236.0 824.5L232.0 832.5L232.0 840.5L232.0 848.5L228.0 856.5L228.0 864.5L228.0 872.5L232.0 880.5L236.0 888.5L228.0 896.5L228.0 904.5L228.0 912.5L228.0 920.5L232.0 928.5L228.0 936.5L228.0 944.5L216.0 952.5L216.0 960.5L260.0 968.5L240.0 976.5L240.0 979.5L316.0 979.5L316.0 976.5L304.0 968.5L304.0 960.5L300.0 952.5L296.0 944.5L296.0 936.5L292.0 928.5L284.0 920.5L288.0 912.5L288.0 904.5L296.0 896.5L292.0 888.5L292.0 880.5L288.0 872.5L288.0 864.5L288.0 856.5L288.0 848.5L288.0 840.5L288.0 832.5L292.0 824.5L292.0 816.5L292.0 808.5L296.0 800.5L296.0 792.5L296.0 784.5L304.0 776.5L304.0 768.5L300.0 760.5L300.0 754.5Z" },
  { id: "parques", d: "M236.0 980.5L228.0 984.5L220.0 992.5L264.0 1000.5L240.0 1008.5L248.0 1016.5L236.0 1024.5L236.0 1032.5L224.0 1040.5L224.0 1048.5L216.0 1056.5L212.0 1064.5L212.0 1072.5L216.0 1080.5L240.0 1088.5L240.0 1096.5L244.0 1104.5L228.0 1112.5L220.0 1120.5L224.0 1128.5L224.0 1129.5L296.0 1129.5L296.0 1128.5L296.0 1120.5L300.0 1112.5L296.0 1104.5L296.0 1096.5L300.0 1088.5L304.0 1080.5L308.0 1072.5L308.0 1064.5L308.0 1056.5L312.0 1048.5L308.0 1040.5L308.0 1032.5L308.0 1024.5L308.0 1016.5L316.0 1008.5L312.0 1000.5L316.0 992.5L316.0 984.5L320.0 980.5Z" },
  { id: "patagonia", d: "M224.0 1130.5L220.0 1136.5L224.0 1144.5L228.0 1152.5L228.0 1160.5L232.0 1168.5L232.0 1176.5L236.0 1184.5L236.0 1192.5L236.0 1200.5L236.0 1208.5L260.0 1216.5L256.0 1224.5L244.0 1232.5L244.0 1240.5L256.0 1248.5L252.0 1256.5L256.0 1264.5L260.0 1272.5L264.0 1280.5L264.0 1288.5L272.0 1296.5L296.0 1304.5L292.0 1312.5L300.0 1320.5L316.0 1328.5L332.0 1336.5L340.0 1344.5L348.0 1352.5L356.0 1360.5L384.0 1368.5L384.0 1371.5L416.0 1371.5L416.0 1368.5L412.0 1360.5L432.0 1352.5L428.0 1344.5L404.0 1336.5L404.0 1328.5L404.0 1320.5L404.0 1312.5L404.0 1304.5L400.0 1296.5L400.0 1288.5L400.0 1280.5L400.0 1272.5L400.0 1264.5L376.0 1256.5L380.0 1248.5L364.0 1240.5L312.0 1232.5L308.0 1224.5L308.0 1216.5L308.0 1208.5L304.0 1200.5L288.0 1192.5L288.0 1184.5L280.0 1176.5L280.0 1168.5L280.0 1160.5L284.0 1152.5L292.0 1144.5L296.0 1136.5L296.0 1130.5Z", poster: "end" },
  { id: "rapanui", d: "M104 244 a56 56 0 1 1 0.1 0 Z", island: true },
];

/** Stack rail labels inside the phone map height (recovered layout fn). */
export function layoutSelectorRail(
  height: number,
  minGap = 32,
  pad = 16,
): { id: SelectorZoneId; y: number }[] {
  const rows = selectorRailIds.map((id) => {
    const raw = ((selectorAnchors[id].y - 8) / 1388) * height;
    return {
      id,
      y: Math.min(height - pad, Math.max(pad, raw)),
    };
  });
  for (let i = 1; i < rows.length; i += 1) {
    const prev = rows[i - 1];
    const cur = rows[i];
    if (prev && cur && cur.y < prev.y + minGap) cur.y = prev.y + minGap;
  }
  const last = rows[rows.length - 1];
  const overflow = last ? last.y - (height - pad) : 0;
  if (overflow > 0) {
    for (const row of rows) row.y -= overflow;
  }
  const first = rows[0];
  if (first && first.y < pad) {
    const span = height - 2 * pad;
    rows.forEach((row, index) => {
      row.y = pad + (span * index) / Math.max(1, rows.length - 1);
    });
  }
  return rows;
}

/** Map selector zone → destination id used by the rest of the desk. */
export function selectorToDestinationId(
  id: SelectorZoneId,
): string {
  switch (id) {
    case "coquimbo":
      return "atacama";
    case "valparaiso":
    case "santiago":
      return "santiago-wine";
    case "volcanes":
      return "ski";
    case "parques":
      return "carretera";
    default:
      return id;
  }
}

