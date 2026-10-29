import { loc } from "@/i18n/loc";
import type { Localized } from "@/data/types";

export type SampleRoute = {
  id: string;
  days: number;
  regions: string[];
  name: Localized;
  summary: Localized;
};

export const sampleRoutes: SampleRoute[] = [
  {
    id: "desert-capital",
    days: 8,
    regions: ["santiago-wine", "atacama"],
    name: loc({
      en: "Santiago to the Moon",
      es: "De Santiago a la Luna",
      pt: "De Santiago à Lua",
      de: "Von Santiago zum Mond",
      fr: "De Santiago à la Lune",
    }),
    summary: loc({
      en: "The honest first Chile: capital, wine, then four nights in Atacama. No Patagonia lie.",
      es: "El primer Chile honesto: capital, vino y cuatro noches en Atacama. Sin mentira patagónica.",
    }),
  },
  {
    id: "classic-12",
    days: 12,
    regions: ["santiago-wine", "atacama", "patagonia"],
    name: loc({
      en: "The 12-day spine",
      es: "La columna de 12 días",
      pt: "A espinha de 12 dias",
      de: "Die 12-Tage-Achse",
      fr: "L'épine de 12 jours",
    }),
    summary: loc({
      en: "Only if every long hop is a flight. This is the itinerary people draw on napkins — we make it physically possible.",
      es: "Solo si cada salto largo es avión. Es el itinerario que dibujan en servilletas: nosotros lo hacemos físicamente posible.",
    }),
  },
  {
    id: "lakes-slow",
    days: 10,
    regions: ["santiago-wine", "lakes", "chiloe"],
    name: loc({
      en: "Lakes, ferry, mythology",
      es: "Lagos, ferry, mitología",
      pt: "Lagos, balsa, mitologia",
      de: "Seen, Fähre, Mythologie",
      fr: "Lacs, ferry, mythologie",
    }),
    summary: loc({
      en: "The Chile you can actually drive or night-bus. Germans and campers, this is yours.",
      es: "El Chile que sí se puede manejar o hacer en night bus. Alemanes y campers, este es el de ustedes.",
    }),
  },
  {
    id: "winter-br",
    days: 9,
    regions: ["santiago-wine", "ski"],
    name: loc({
      en: "July snow + Carménère",
      es: "Nieve de julio + Carménère",
      pt: "Neve de julho + Carménère",
      de: "Julischnee + Carménère",
      fr: "Neige de juillet + Carménère",
    }),
    summary: loc({
      en: "Why Brazilians fill the winter planes. Ski the Andes, drink in the valleys, skip Patagonia in July.",
      es: "Por qué los brasileños llenan los aviones de invierno. Ski en los Andes, vino en los valles, Patagonia fuera en julio.",
    }),
  },
  {
    id: "island",
    days: 7,
    regions: ["santiago-wine", "rapanui"],
    name: loc({
      en: "Moai week",
      es: "Semana moái",
      pt: "Semana moai",
      de: "Moai-Woche",
      fr: "Semaine moai",
    }),
    summary: loc({
      en: "Two nights in Santiago, then the island as its own country. Do not bolt this onto Patagonia in the same fortnight unless you have money and patience.",
      es: "Dos noches en Santiago y la isla como país propio. No lo cuelgues de la Patagonia en la misma quincena salvo que tengas plata y paciencia.",
    }),
  },
];
