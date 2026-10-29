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
};

export const parks: Park[] = [
  {
    id: "tdp",
    name: loc({ en: "Torres del Paine National Park", es: "Parque Nacional Torres del Paine" }),
    region: "patagonia",
    image: img.patagonia,
    feeUsd: 40,
    note: loc({
      en: "Foreign adult fee. Book W/O circuit months ahead.",
      es: "Tarifa adulto extranjero. Reserva el W/O con meses de anticipación.",
    }),
  },
  {
    id: "rapa",
    name: loc({ en: "Rapa Nui National Park", es: "Parque Nacional Rapa Nui" }),
    region: "rapanui",
    image: img.rapanui,
    feeUsd: 80,
    note: loc({
      en: "Valid 10 days. Orongo and Rano Raraku require an accredited guide.",
      es: "Válido 10 días. Orongo y Rano Raraku exigen guía acreditado.",
    }),
  },
  {
    id: "lauca",
    name: loc({ en: "Lauca National Park", es: "Parque Nacional Lauca" }),
    region: "atacama",
    image: img.atacama,
    feeUsd: 10,
    note: loc({
      en: "Altiplano, volcanoes and vicuñas near Putre. Watch the altitude.",
      es: "Altiplano, volcanes y vicuñas cerca de Putre. Cuidado con la altura.",
    }),
  },
  {
    id: "conguillio",
    name: loc({ en: "Conguillío National Park", es: "Parque Nacional Conguillío" }),
    region: "lakes",
    image: img.lakes,
    feeUsd: 12,
    note: loc({
      en: "Araucaria forests and Llaima volcano. A camper classic.",
      es: "Araucarias y volcán Llaima. Un clásico para camper.",
    }),
  },
  {
    id: "vicente",
    name: loc({ en: "Vicente Pérez Rosales", es: "Vicente Pérez Rosales" }),
    region: "lakes",
    image: img.volcano,
    feeUsd: 10,
    note: loc({
      en: "Petrohué Falls and Osorno volcano. Easy add-on from Puerto Varas.",
      es: "Saltos del Petrohué y volcán Osorno. Fácil desde Puerto Varas.",
    }),
  },
  {
    id: "queulat",
    name: loc({ en: "Queulat National Park", es: "Parque Nacional Queulat" }),
    region: "carretera",
    image: img.glacier,
    feeUsd: 12,
    note: loc({
      en: "Hanging glacier over the Carretera Austral.",
      es: "Ventisquero colgante sobre la Carretera Austral.",
    }),
  },
];
