import { loc } from "@/i18n/loc";
import type { Localized, TravelStyle } from "@/data/types";

export type Stay = {
  id: string;
  name: string;
  place: Localized;
  style: TravelStyle;
  region: string;
  kind: "stay" | "eat";
  blurb: Localized;
  fromUsd: number;
};

export const stays: Stay[] = [
  {
    id: "explora-atacama",
    name: "Explora Atacama",
    place: loc({ en: "San Pedro de Atacama", es: "San Pedro de Atacama" }),
    style: "luxury",
    region: "atacama",
    kind: "stay",
    blurb: loc({
      en: "All-inclusive desert lodge. The quote jumps when this is on the table.",
      es: "Lodge all inclusive en el desierto. La cotización salta cuando entra esto.",
    }),
    fromUsd: 900,
  },
  {
    id: "hostal-sonchek",
    name: "Hostal-style San Pedro",
    place: loc({ en: "San Pedro de Atacama", es: "San Pedro de Atacama" }),
    style: "backpacker",
    region: "atacama",
    kind: "stay",
    blurb: loc({
      en: "Dorms and simple courtyards. Still budget for tours: the desert is the expensive part.",
      es: "Dormis y patios simples. Igual presupuesta tours: lo caro es el desierto.",
    }),
    fromUsd: 22,
  },
  {
    id: "lastarria",
    name: "Lastarria boutique",
    place: loc({ en: "Santiago", es: "Santiago" }),
    style: "mid",
    region: "santiago-wine",
    kind: "stay",
    blurb: loc({
      en: "Walkable, restaurants, museums. Best first/last nights in Chile.",
      es: "Caminable, restaurantes, museos. Mejores primeras y últimas noches en Chile.",
    }),
    fromUsd: 110,
  },
  {
    id: "valpo-cerro",
    name: "Cerro Alegre stay",
    place: loc({ en: "Valparaíso", es: "Valparaíso" }),
    style: "mid",
    region: "santiago-wine",
    kind: "stay",
    blurb: loc({
      en: "A night on the hills beats a rushed day trip.",
      es: "Una noche en los cerros gana a un day trip apurado.",
    }),
    fromUsd: 85,
  },
  {
    id: "tierra-patagonia",
    name: "Tierra Patagonia",
    place: loc({ en: "Torres del Paine", es: "Torres del Paine" }),
    style: "luxury",
    region: "patagonia",
    kind: "stay",
    blurb: loc({
      en: "Window-on-the-towers luxury. This is why Patagonia luxury quotes look wild.",
      es: "Lujo con ventana a las Torres. Por esto las cotizaciones luxury de Patagonia se ven imposibles.",
    }),
    fromUsd: 800,
  },
  {
    id: "w-refugio",
    name: "Refugio on the W",
    place: loc({ en: "Torres del Paine", es: "Torres del Paine" }),
    style: "backpacker",
    region: "patagonia",
    kind: "stay",
    blurb: loc({
      en: "Bunk + meals. Book Vertice/Las Torres early or you sleep outside the park.",
      es: "Camarote + comidas. Reserva Vertice/Las Torres temprano o duermes fuera del parque.",
    }),
    fromUsd: 145,
  },
  {
    id: "hanga-roa",
    name: "Hanga Roa guesthouse",
    place: loc({ en: "Rapa Nui", es: "Rapa Nui" }),
    style: "mid",
    region: "rapanui",
    kind: "stay",
    blurb: loc({
      en: "Must be registered with SERNATUR. The island imports almost everything.",
      es: "Debe estar inscrito en SERNATUR. La isla importa casi todo.",
    }),
    fromUsd: 140,
  },
  {
    id: "camper-wicked",
    name: "Campervan hire",
    place: loc({ en: "Santiago pickup", es: "Retiro en Santiago" }),
    style: "camper",
    region: "santiago-wine",
    kind: "stay",
    blurb: loc({
      en: "The honest way to do lakes + Carretera Austral. Not for Rapa Nui or a 7-day dash.",
      es: "La forma honesta de hacer lagos + Carretera Austral. No sirve para Rapa Nui ni para 7 días.",
    }),
    fromUsd: 95,
  },
  {
    id: "borago",
    name: "Boragó",
    place: loc({ en: "Santiago", es: "Santiago" }),
    style: "luxury",
    region: "santiago-wine",
    kind: "eat",
    blurb: loc({
      en: "Endemic Chilean tasting. Book before you land.",
      es: "Menú de producto endémico chileno. Reserva antes de aterrizar.",
    }),
    fromUsd: 180,
  },
  {
    id: "mercado-central",
    name: "Mercado Central",
    place: loc({ en: "Santiago", es: "Santiago" }),
    style: "backpacker",
    region: "santiago-wine",
    kind: "eat",
    blurb: loc({
      en: "Congrio, machas, noisy and touristy — still the right first lunch.",
      es: "Congrio, machas, ruidoso y turístico: igual el primer almuerzo correcto.",
    }),
    fromUsd: 18,
  },
  {
    id: "curanto",
    name: "Curanto en hoyo",
    place: loc({ en: "Chiloé", es: "Chiloé" }),
    style: "mid",
    region: "chiloe",
    kind: "eat",
    blurb: loc({
      en: "Earth-oven seafood, meat and chapalele. This is the island.",
      es: "Mariscos, carne y chapalele en hoyo. Esto es la isla.",
    }),
    fromUsd: 25,
  },
  {
    id: "cordero",
    name: "Patagonian lamb",
    place: loc({ en: "Puerto Natales", es: "Puerto Natales" }),
    style: "mid",
    region: "patagonia",
    kind: "eat",
    blurb: loc({
      en: "Fire-roasted cordero. Eat well the night before the park.",
      es: "Cordero al palo. Come bien la noche antes del parque.",
    }),
    fromUsd: 28,
  },
];

export const airlines = [
  {
    id: "latam",
    name: "LATAM",
    note: loc({
      en: "The spine of Chile. Only airline to Rapa Nui. Book the island first.",
      es: "La columna vertebral de Chile. Única aerolínea a Rapa Nui. Reserva la isla primero.",
    }),
  },
  {
    id: "sky",
    name: "Sky Airline",
    note: loc({
      en: "Often the cheaper domestic hop: Calama, Puerto Montt, Punta Arenas.",
      es: "Suele ser el hop doméstico más barato: Calama, Puerto Montt, Punta Arenas.",
    }),
  },
  {
    id: "jetsmart",
    name: "JetSMART",
    note: loc({
      en: "Ultra-low-cost. Good if you pack light and pay extras on purpose.",
      es: "Ultra low-cost. Sirve si viajas liviano y pagas extras a propósito.",
    }),
  },
  {
    id: "buses",
    name: "Turbus / Pullman / overnight",
    note: loc({
      en: "Night buses replace a hotel. The German eco option that actually works up to ~12 hours.",
      es: "El night bus reemplaza un hotel. La opción eco alemana que sí funciona hasta ~12 horas.",
    }),
  },
];
