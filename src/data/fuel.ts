import { loc } from "@/i18n/loc";
import type { Localized } from "@/data/types";

export type FuelBrand = {
  id: string;
  name: string;
  operator: string;
  color: string;
  site: string;
  app: string;
  appName: string;
  locator: string;
  stores: string;
  note: Localized;
  coverage: Localized;
};

export type FuelStop = {
  id: string;
  brand: string;
  town: Localized;
  highway: string;
  region: string;
  maps: string;
  hours: Localized;
  note: Localized;
  services: Localized[];
};

export const fuelBrands: FuelBrand[] = [
  {
    id: "copec",
    name: "Copec",
    operator: "Empresas Copec",
    color: "#FFCD00",
    site: "https://www.copec.cl",
    app: "https://www.copec.cl/app",
    appName: "App Copec",
    locator: "https://www.google.com/maps/search/?api=1&query=Copec+Chile",
    stores: "Pronto / Punto / Full",
    note: loc({
      en: "The densest network from Arica to Puerto Williams. Copec Pay, Full points, Pronto shops, and the only serious coverage on the Carretera Austral (including Cerro Castillo).",
      es: "La red más densa de Arica a Puerto Williams. Copec Pay, puntos Full, tiendas Pronto y la cobertura seria de la Carretera Austral (incluye Cerro Castillo).",
    }),
    coverage: loc({
      en: "Best default for campers. Fill whenever you see one south of Coyhaique.",
      es: "El default del camper. Al sur de Coyhaique, carga cada vez que veas una.",
    }),
  },
  {
    id: "shell",
    name: "Shell",
    operator: "Enex (licenciataria Shell)",
    color: "#F2D117",
    site: "https://www.micopiloto.cl",
    app: "https://www.micopiloto.cl",
    appName: "Micopiloto",
    locator: "https://www.google.com/maps/search/?api=1&query=Shell+estacion+Chile",
    stores: "upa! / upita",
    note: loc({
      en: "360+ stations. Micopiloto pays with a Chilean card, finds the next Shell, and has a trip-cost calculator. upa! shops are the snack stop.",
      es: "Más de 360 estaciones. Micopiloto paga con tarjeta chilena, ubica la siguiente Shell y calcula el viaje. Las upa! son el snack.",
    }),
    coverage: loc({
      en: "Strong on Ruta 5 and cities. Thinner on the Austral — La Junta is a known Shell.",
      es: "Fuerte en Ruta 5 y ciudades. Más flaca en la Austral: La Junta es una Shell conocida.",
    }),
  },
  {
    id: "aramco",
    name: "Aramco",
    operator: "Esmax (ex Esso)",
    color: "#00A651",
    site: "https://www.aramcoestaciones.cl",
    app: "https://www.aramcoestaciones.cl/app",
    appName: "Aramco Estaciones",
    locator: "https://www.google.com/maps/search/?api=1&query=Aramco+estacion+Chile",
    stores: "Aramco / ex Esso",
    note: loc({
      en: "The old Esso network, now Aramco. App pays by QR and can stack LATAM Pass miles or Club Lider pesos — useful if you already fly LATAM.",
      es: "La red que era Esso, ahora Aramco. La app paga con QR y acumula millas LATAM Pass o pesos Club Lider: útil si ya vuelas LATAM.",
    }),
    coverage: loc({
      en: "Cities and Ruta 5. Do not count on it for the Austral.",
      es: "Ciudades y Ruta 5. No cuentes con ella en la Austral.",
    }),
  },
  {
    id: "terpel",
    name: "Terpel",
    operator: "Terpel Chile (ex Petrobras)",
    color: "#C8102E",
    site: "https://www.terpel.com",
    app: "https://www.google.com/maps/search/?api=1&query=Terpel+Chile",
    appName: "Mapa Terpel",
    locator: "https://www.google.com/maps/search/?api=1&query=Terpel+estacion+Chile",
    stores: "Altoque / Terpel",
    note: loc({
      en: "Absorbed much of the old Petrobras Chile network. Handy in some cities; not the Austral backbone.",
      es: "Se quedó con gran parte de la red Petrobras Chile. Sirve en algunas ciudades; no es la columna de la Austral.",
    }),
    coverage: loc({
      en: "Patchy. Always cross-check with Bencina en Línea before a long empty stretch.",
      es: "Discontinua. Cruza siempre con Bencina en Línea antes de un tramo vacío.",
    }),
  },
  {
    id: "cne",
    name: "Bencina en Línea",
    operator: "CNE · Ministerio de Energía",
    color: "#1B3C32",
    site: "https://appbencinaenlinea.cne.cl",
    app: "https://appbencinaenlinea.cne.cl",
    appName: "Bencina en Línea",
    locator: "https://appbencinaenlinea.cne.cl",
    stores: "Todas las marcas",
    note: loc({
      en: "Official live prices for every pump in Chile, every brand. This is how you compare Copec vs Shell vs Aramco vs Terpel on the same corner.",
      es: "Precios oficiales en vivo de todas las bombas de Chile, todas las marcas. Así comparas Copec, Shell, Aramco y Terpel en la misma esquina.",
    }),
    coverage: loc({
      en: "Use it the night before a long drive. Prices move; the Austral is always dearer.",
      es: "Úsala la noche antes de un tramo largo. Los precios se mueven; la Austral siempre es más cara.",
    }),
  },
];

export const fuelStops: FuelStop[] = [
  {
    id: "spa-copec",
    brand: "copec",
    town: loc({ en: "San Pedro de Atacama", es: "San Pedro de Atacama" }),
    highway: "Ruta 23 / pueblo",
    region: "atacama",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+San+Pedro+de+Atacama",
    hours: loc({ en: "Long hours; do not assume 24h on holidays.", es: "Horario largo; no asumas 24h en festivos." }),
    note: loc({
      en: "Fill here before Valle de la Luna or the altiplano. Next reliable pumps are back toward Calama.",
      es: "Carga aquí antes del Valle de la Luna o el altiplano. Lo seguro después es Calama.",
    }),
    services: [
      loc({ en: "93 / 95 / 97 / diesel", es: "93 / 95 / 97 / diésel" }),
      loc({ en: "Pronto snacks", es: "Snacks Pronto" }),
    ],
  },
  {
    id: "calama-mix",
    brand: "copec",
    town: loc({ en: "Calama", es: "Calama" }),
    highway: "Ruta 25 / Ruta 24",
    region: "atacama",
    maps: "https://www.google.com/maps/search/?api=1&query=estaciones+de+servicio+Calama+Chile",
    hours: loc({ en: "24h options in town", es: "Opciones 24h en la ciudad" }),
    note: loc({
      en: "Airport city. Copec, Shell and Aramco all exist. Fill before the 100 km to San Pedro.",
      es: "Ciudad del aeropuerto. Hay Copec, Shell y Aramco. Carga antes de los 100 km a San Pedro.",
    }),
    services: [
      loc({ en: "All grades + diesel", es: "Todos los octanajes + diésel" }),
      loc({ en: "ATMs nearby", es: "Cajeros cerca" }),
    ],
  },
  {
    id: "scl-r5",
    brand: "shell",
    town: loc({ en: "Ruta 5 — Santiago belt", es: "Ruta 5 — cintura de Santiago" }),
    highway: "Ruta 5",
    region: "santiago-wine",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Ruta+5+Santiago",
    hours: loc({ en: "Mostly 24h", es: "Casi todas 24h" }),
    note: loc({
      en: "Leave the capital full. North or south, Ruta 5 is never the problem — the Austral is.",
      es: "Sal de la capital con estanque lleno. Norte o sur, la Ruta 5 nunca es el problema: la Austral sí.",
    }),
    services: [
      loc({ en: "Copec / Shell / Aramco / Terpel", es: "Copec / Shell / Aramco / Terpel" }),
      loc({ en: "Pronto and upa!", es: "Pronto y upa!" }),
    ],
  },
  {
    id: "casablanca-copec",
    brand: "copec",
    town: loc({ en: "Casablanca wine valley", es: "Valle de Casablanca" }),
    highway: "Ruta 68",
    region: "santiago-wine",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Casablanca+Chile",
    hours: loc({ en: "Day and evening", es: "Día y tarde-noche" }),
    note: loc({
      en: "On the Santiago–Valparaíso wine road. Easy top-up between tastings.",
      es: "En la ruta Santiago–Valparaíso. Carga fácil entre catas.",
    }),
    services: [loc({ en: "93 / 95 / diesel", es: "93 / 95 / diésel" })],
  },
  {
    id: "pucon-copec",
    brand: "copec",
    town: loc({ en: "Pucón", es: "Pucón" }),
    highway: "Ruta 199",
    region: "lakes",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Pucon",
    hours: loc({ en: "Long summer hours", es: "Horario largo en verano" }),
    note: loc({
      en: "Fill before Villarrica volcano, Caburgua or the Seven Lakes. Winter queues on ski weekends.",
      es: "Carga antes del Villarrica, Caburgua o Siete Lagos. En invierno hay fila los fines de ski.",
    }),
    services: [
      loc({ en: "Copec in town", es: "Copec en el pueblo" }),
      loc({ en: "Shell on the approach", es: "Shell en el acceso" }),
    ],
  },
  {
    id: "ptovaras-shell",
    brand: "shell",
    town: loc({ en: "Puerto Varas / Puerto Montt", es: "Puerto Varas / Puerto Montt" }),
    highway: "Ruta 5 / Ruta 225",
    region: "lakes",
    maps: "https://www.google.com/maps/search/?api=1&query=estaciones+de+servicio+Puerto+Montt",
    hours: loc({ en: "24h in Puerto Montt", es: "24h en Puerto Montt" }),
    note: loc({
      en: "Last full supermarket + multi-brand fuel before the Austral ferries. Fill to the brim.",
      es: "Último supermercado serio y multi-marca antes de los ferries de la Austral. Llena hasta arriba.",
    }),
    services: [
      loc({ en: "All four brands", es: "Las cuatro marcas" }),
      loc({ en: "Camper water nearby", es: "Agua para camper cerca" }),
    ],
  },
  {
    id: "chiloe-castro",
    brand: "copec",
    town: loc({ en: "Castro, Chiloé", es: "Castro, Chiloé" }),
    highway: "Ruta 5 sur isla",
    region: "chiloe",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Castro+Chiloe",
    hours: loc({ en: "Town hours", es: "Horario de pueblo" }),
    note: loc({
      en: "Fill in Ancud or Castro. The island is short; the ferry is the constraint, not petrol.",
      es: "Carga en Ancud o Castro. La isla es corta; el cuello es el ferry, no la bencina.",
    }),
    services: [loc({ en: "Copec + Shell", es: "Copec + Shell" })],
  },
  {
    id: "junta-shell",
    brand: "shell",
    town: loc({ en: "La Junta", es: "La Junta" }),
    highway: "Ruta 7 · km 269",
    region: "carretera",
    maps: "https://www.google.com/maps/search/?api=1&query=Shell+La+Junta+Carretera+Austral",
    hours: loc({ en: "Confirm; not always 24h", es: "Confirma; no siempre 24h" }),
    note: loc({
      en: "A known Shell on the Austral. Treat every pump south of here as a gift.",
      es: "Una Shell conocida de la Austral. Cada bomba al sur de aquí es un regalo.",
    }),
    services: [loc({ en: "Fuel + kerosene", es: "Combustible + kerosene" })],
  },
  {
    id: "cisnes-copec",
    brand: "copec",
    town: loc({ en: "Puerto Cisnes", es: "Puerto Cisnes" }),
    highway: "Ruta 7 · 1050",
    region: "carretera",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Ruta+7+Puerto+Cisnes",
    hours: loc({ en: "Often 24h", es: "Suele ser 24h" }),
    note: loc({
      en: "Copec on the Austral proper. Diesel and 93–97. Do not skip it heading to Coyhaique.",
      es: "Copec en la Austral misma. Diésel y 93–97. No la saltes rumbo a Coyhaique.",
    }),
    services: [
      loc({ en: "93 / 95 / 97 / diesel / kerosene", es: "93 / 95 / 97 / diésel / kerosene" }),
      loc({ en: "Bank cards", es: "Tarjetas bancarias" }),
    ],
  },
  {
    id: "coyhaique-mix",
    brand: "copec",
    town: loc({ en: "Coyhaique", es: "Coyhaique" }),
    highway: "Ruta 7 / Ruta 240",
    region: "carretera",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Coyhaique",
    hours: loc({ en: "City hours + some 24h", es: "Horario de ciudad + algunas 24h" }),
    note: loc({
      en: "The Austral capital. Fill completely. Next stretch toward Cochrane has long gaps.",
      es: "La capital de la Austral. Llena completo. Hacia Cochrane hay huecos largos.",
    }),
    services: [
      loc({ en: "Copec and Shell", es: "Copec y Shell" }),
      loc({ en: "Workshops, LPG, water", es: "Talleres, gas, agua" }),
    ],
  },
  {
    id: "castillo-copec",
    brand: "copec",
    town: loc({ en: "Cerro Castillo", es: "Cerro Castillo" }),
    highway: "Ruta 7",
    region: "carretera",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Cerro+Castillo+Aysen",
    hours: loc({ en: "Day hours; Starlink on site", es: "Horario diurno; Starlink en el recinto" }),
    note: loc({
      en: "Newer Copec with Pronto Express and motorhome parking. Still fill again in Cochrane if going south.",
      es: "Copec nueva con Pronto Express y estacionamiento motorhome. Igual vuelve a cargar en Cochrane si sigues al sur.",
    }),
    services: [
      loc({ en: "93–97, diesel, kerosene", es: "93–97, diésel, kerosene" }),
      loc({ en: "Starlink / bike racks", es: "Starlink / bicicletero" }),
    ],
  },
  {
    id: "cochrane-copec",
    brand: "copec",
    town: loc({ en: "Cochrane", es: "Cochrane" }),
    highway: "Ruta 7",
    region: "carretera",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Cochrane+Aysen",
    hours: loc({ en: "Town hours — arrive before dusk", es: "Horario de pueblo — llega de día" }),
    note: loc({
      en: "Last serious pump before Villa O'Higgins. If it is closed, wait. Do not gamble.",
      es: "Última bomba seria antes de Villa O'Higgins. Si está cerrada, espera. No apuestes.",
    }),
    services: [loc({ en: "Diesel + gasoline", es: "Diésel + bencina" })],
  },
  {
    id: "natales-copec",
    brand: "copec",
    town: loc({ en: "Puerto Natales", es: "Puerto Natales" }),
    highway: "Ruta 9",
    region: "patagonia",
    maps: "https://www.google.com/maps/search/?api=1&query=Copec+Puerto+Natales",
    hours: loc({ en: "Long hours in season", es: "Horario largo en temporada" }),
    note: loc({
      en: "Fill here. Torres del Paine has no public pumps. Same on the way back.",
      es: "Carga aquí. Torres del Paine no tiene bombas públicas. Lo mismo al volver.",
    }),
    services: [
      loc({ en: "Copec + Shell in town", es: "Copec + Shell en el pueblo" }),
      loc({ en: "Camper dump / water", es: "Descarga y agua camper" }),
    ],
  },
  {
    id: "punta-arenas",
    brand: "aramco",
    town: loc({ en: "Punta Arenas", es: "Punta Arenas" }),
    highway: "Ruta 9",
    region: "patagonia",
    maps: "https://www.google.com/maps/search/?api=1&query=estaciones+de+servicio+Punta+Arenas",
    hours: loc({ en: "24h options", es: "Opciones 24h" }),
    note: loc({
      en: "All brands. Fill before the 250 km to Natales if you land here.",
      es: "Todas las marcas. Carga antes de los 250 km a Natales si aterrizas aquí.",
    }),
    services: [loc({ en: "Copec / Shell / Aramco / Terpel", es: "Copec / Shell / Aramco / Terpel" })],
  },
];

export function fuelByRegion(region: string) {
  return fuelStops.filter((stop) => stop.region === region);
}

export function brandById(id: string) {
  return fuelBrands.find((brand) => brand.id === id);
}

export function fuelStopById(id: string) {
  return fuelStops.find((stop) => stop.id === id);
}
