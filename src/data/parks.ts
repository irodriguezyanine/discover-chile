import { loc } from "@/i18n/loc";
import { img } from "@/data/images";
import type { Localized } from "@/data/types";

export type Park = {
  id: string;
  name: Localized;
  region: string;
  image: string;
  feeUsd: number;
  note: Localized;
  book?: string;
};

export const parks: Park[] = [
  {
    id: "tdp",
    name: loc({ en: "Torres del Paine National Park", es: "Parque Nacional Torres del Paine" }),
    region: "patagonia",
    image: img.patagonia,
    feeUsd: 42,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Foreign adult via pasesparques.cl. W/O beds with Vertice / Las Torres months ahead. No fuel inside the park — fill in Puerto Natales.",
      es: "Adulto extranjero en pasesparques.cl. Camas W/O con Vertice / Las Torres con meses. No hay bencina en el parque: carga en Puerto Natales.",
    }),
  },
  {
    id: "rapa",
    name: loc({ en: "Rapa Nui National Park", es: "Parque Nacional Rapa Nui" }),
    region: "rapanui",
    image: img.rapanui,
    feeUsd: 80,
    book: "https://www.conaf.cl/parques/parque-nacional-rapa-nui/",
    note: loc({
      en: "Valid 10 days. Orongo and Rano Raraku require an accredited guide. Official name of the park; the island in this product is Isla de Pascua.",
      es: "Válido 10 días. Orongo y Rano Raraku exigen guía acreditado. Nombre oficial del parque; en este producto la isla se llama Isla de Pascua.",
    }),
  },
  {
    id: "lauca",
    name: loc({ en: "Lauca National Park", es: "Parque Nacional Lauca" }),
    region: "atacama",
    image: img.atacama,
    feeUsd: 10,
    note: loc({
      en: "Altiplano, Parinacota, vicuñas near Putre. Sleep a night at altitude before you hike. Fill in Arica or Putre.",
      es: "Altiplano, Parinacota, vicuñas cerca de Putre. Duerme una noche en altura antes de caminar. Carga en Arica o Putre.",
    }),
  },
  {
    id: "flamencos",
    name: loc({ en: "Los Flamencos National Reserve", es: "Reserva Nacional Los Flamencos" }),
    region: "atacama",
    image: img.atacamaMoon,
    feeUsd: 18,
    note: loc({
      en: "Valle de la Luna, Chaxa lagoon, altiplanic lagoons. The tickets San Pedro actually uses. Sunset slots sell.",
      es: "Valle de la Luna, laguna Chaxa, lagunas altiplánicas. Los tickets que sí usa San Pedro. El atardecer se agota.",
    }),
  },
  {
    id: "pan-azucar",
    name: loc({ en: "Pan de Azúcar National Park", es: "Parque Nacional Pan de Azúcar" }),
    region: "atacama",
    image: img.atacama,
    feeUsd: 10,
    note: loc({
      en: "Coastal desert north of Chañaral. Penguins, cactus, empty beach. A camper stop on Ruta 5, not a San Pedro day.",
      es: "Desierto costero al norte de Chañaral. Pingüinos, cactus, playa vacía. Parada camper en Ruta 5, no un día de San Pedro.",
    }),
  },
  {
    id: "conguillio",
    name: loc({ en: "Conguillío National Park", es: "Parque Nacional Conguillío" }),
    region: "lakes",
    image: img.lakes,
    feeUsd: 12,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Araucaria forests and Llaima. A camper classic. Fill in Melipeuco or Curacautín — inside is thin.",
      es: "Araucarias y volcán Llaima. Clásico camper. Carga en Melipeuco o Curacautín: adentro hay poco.",
    }),
  },
  {
    id: "huerquehue",
    name: loc({ en: "Huerquehue National Park", es: "Parque Nacional Huerquehue" }),
    region: "lakes",
    image: img.lakes,
    feeUsd: 12,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Day hike from Pucón / Caburgua. Lakes stacked on a ridge. Pair with Trancura rafting, not with a volcano summit the same day.",
      es: "Day hike desde Pucón / Caburgua. Lagos en una cordillera chica. Júntalo con el Trancura, no con la cumbre el mismo día.",
    }),
  },
  {
    id: "villarrica-np",
    name: loc({ en: "Villarrica National Park", es: "Parque Nacional Villarrica" }),
    region: "lakes",
    image: img.volcano,
    feeUsd: 12,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "The volcano you came to Pucón for. CONAF + a certified guide. Closed when the crater is red.",
      es: "El volcán por el que viniste a Pucón. CONAF + guía certificado. Cerrado si el cráter está en rojo.",
    }),
  },
  {
    id: "vicente",
    name: loc({ en: "Vicente Pérez Rosales", es: "Vicente Pérez Rosales" }),
    region: "lakes",
    image: img.volcano,
    feeUsd: 10,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Petrohué Falls and Osorno. Easy from Puerto Varas. Rafting the Petrohué is next door, not in the falls car park.",
      es: "Saltos del Petrohué y Osorno. Fácil desde Puerto Varas. El rafting del Petrohué queda al lado, no en el estacionamiento de los saltos.",
    }),
  },
  {
    id: "alerce",
    name: loc({ en: "Alerce Andino National Park", es: "Parque Nacional Alerce Andino" }),
    region: "lakes",
    image: img.glacier,
    feeUsd: 10,
    note: loc({
      en: "Thousand-year alerces near Puerto Montt. A wet day before the Austral ferry.",
      es: "Alerces milenarios cerca de Puerto Montt. Un día húmedo antes del ferry de la Austral.",
    }),
  },
  {
    id: "chiloe-np",
    name: loc({ en: "Chiloé National Park", es: "Parque Nacional Chiloé" }),
    region: "chiloe",
    image: img.volcano,
    feeUsd: 10,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Cucao and Chanquín: dunes and Pacific. Churches are a different day, in Castro / Achao.",
      es: "Cucao y Chanquín: dunas y Pacífico. Las iglesias son otro día, en Castro / Achao.",
    }),
  },
  {
    id: "queulat",
    name: loc({ en: "Queulat National Park", es: "Parque Nacional Queulat" }),
    region: "carretera",
    image: img.glacier,
    feeUsd: 12,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Hanging glacier over the Austral. Fill in La Junta or Puyuhuapi first — the park is not a pump.",
      es: "Ventisquero colgante sobre la Austral. Carga en La Junta o Puyuhuapi antes: el parque no es bomba.",
    }),
  },
  {
    id: "castillo-np",
    name: loc({ en: "Cerro Castillo National Park", es: "Parque Nacional Cerro Castillo" }),
    region: "carretera",
    image: img.patagonia,
    feeUsd: 12,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "The other granite. New Copec in the village with Starlink. Trek is 4 days; the viewpoint is an afternoon.",
      es: "El otro granito. Copec nueva en el pueblo con Starlink. El trekking son 4 días; el mirador es una tarde.",
    }),
  },
  {
    id: "laguna-sr",
    name: loc({ en: "Laguna San Rafael National Park", es: "Parque Nacional Laguna San Rafael" }),
    region: "carretera",
    image: img.glacier,
    feeUsd: 20,
    note: loc({
      en: "Catamaran from Puerto Chacabuco / Bahía Exploradores. Weather cancels. Not a self-drive into the ice.",
      es: "Catamarán desde Puerto Chacabuco / Bahía Exploradores. El clima cancela. No es un self-drive al hielo.",
    }),
  },
  {
    id: "campana",
    name: loc({ en: "La Campana National Park", es: "Parque Nacional La Campana" }),
    region: "santiago-wine",
    image: img.santiago,
    feeUsd: 8,
    book: "https://www.pasesparques.cl",
    note: loc({
      en: "Darwin's palm forest, a day from Santiago or Valparaíso. Palmas de Ocoa sector in spring.",
      es: "Palmas que vio Darwin, un día desde Santiago o Valparaíso. Sector Palmas de Ocoa en primavera.",
    }),
  },
];

export function parksByRegion(region: string) {
  return parks.filter((park) => park.region === region);
}
