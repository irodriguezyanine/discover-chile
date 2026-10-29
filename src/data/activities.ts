import { loc } from "@/i18n/loc";
import type { Localized } from "@/data/types";

export type ActivityKind =
  | "rafting"
  | "stars"
  | "wine"
  | "trek"
  | "volcano"
  | "wildlife";

export type Operator = {
  id: string;
  name: string;
  url: string;
  fromUsd: number;
  fromClp?: number;
  note: Localized;
};

export type Activity = {
  id: string;
  kind: ActivityKind;
  region: string;
  name: Localized;
  river?: Localized;
  level?: string;
  season: Localized;
  summary: Localized;
  operators: Operator[];
};

export const activities: Activity[] = [
  {
    id: "maipo-raft",
    kind: "rafting",
    region: "santiago-wine",
    name: loc({
      en: "Rafting the Maipo — 60 minutes from Santiago",
      es: "Rafting en el Maipo — a 60 minutos de Santiago",
    }),
    river: loc({ en: "Río Maipo · Cajón del Maipo", es: "Río Maipo · Cajón del Maipo" }),
    level: "III–IV",
    season: loc({
      en: "October–March, three daily slots typical",
      es: "Octubre a marzo, tres salidas diarias típicas",
    }),
    summary: loc({
      en: "The honest first adrenaline day if you only have Santiago. ~9 km, class III, no experience required. Pair with a vineyard the next morning.",
      es: "La primera adrenalina honesta si solo tienes Santiago. ~9 km, clase III, sin experiencia. Al día siguiente, un viñedo.",
    }),
    operators: [
      {
        id: "maipo-rafting",
        name: "Maipo Rafting",
        url: "https://maiporafting.cl/",
        fromUsd: 32,
        fromClp: 30000,
        note: loc({
          en: "Longest advertised section (~9 km, 90 min on the water). Hypalon boats, ISO 9001. Slots 11:00 / 14:00 / 17:30.",
          es: "El tramo más largo que publicitan (~9 km, 90 min en el agua). Balsas Hypalon, ISO 9001. 11:00 / 14:00 / 17:30.",
        }),
      },
      {
        id: "ruta-vertical",
        name: "Ruta Vertical",
        url: "https://www.rutavertical.cl/rafting",
        fromUsd: 32,
        fromClp: 30000,
        note: loc({
          en: "Tripadvisor Travellers' Choice. Photo included, lockers, hot showers. Camino al Volcán 19635, San José de Maipo.",
          es: "Travellers' Choice de Tripadvisor. Foto incluida, lockers, duchas calientes. Camino al Volcán 19635, San José de Maipo.",
        }),
      },
      {
        id: "cascada-animas",
        name: "Cascada de las Ánimas",
        url: "https://www.cascadadelasanimas.cl",
        fromUsd: 38,
        note: loc({
          en: "Lodge + rafting + zip-line on the same property. Good if you want to sleep in the canyon.",
          es: "Lodge + rafting + canopy en el mismo recinto. Sirve si quieres dormir en el cajón.",
        }),
      },
      {
        id: "manzur",
        name: "Manzur Expediciones",
        url: "https://www.manzurexpediciones.cl",
        fromUsd: 35,
        note: loc({
          en: "Classic Cajón operator: rafting, horse treks, and El Morado. Pickup from Santiago hotels.",
          es: "Operador clásico del Cajón: rafting, caballos y El Morado. Pickup desde hoteles de Santiago.",
        }),
      },
      {
        id: "isoterma",
        name: "Isoterma",
        url: "https://www.isoterma.cl",
        fromUsd: 34,
        note: loc({
          en: "Listed by Guías de Rafting Chile as a year-round Maipo operator. Ask for water level in winter.",
          es: "En el listado de Guías de Rafting Chile como operador del Maipo todo el año. Pregunta el caudal en invierno.",
        }),
      },
    ],
  },
  {
    id: "trancura-raft",
    kind: "rafting",
    region: "lakes",
    name: loc({
      en: "Río Trancura — the Pucón classic",
      es: "Río Trancura — el clásico de Pucón",
    }),
    river: loc({ en: "Río Trancura · Pucón", es: "Río Trancura · Pucón" }),
    level: "III (alto in spring)",
    season: loc({
      en: "Year-round; biggest water in spring melt",
      es: "Todo el año; más caudal en el deshielo",
    }),
    summary: loc({
      en: "Half-day, village pickup, volcano on the horizon. The activity Brazilians and backpackers actually book.",
      es: "Medio día, pickup en el pueblo, volcán al fondo. La actividad que sí reservan brasileños y backpackers.",
    }),
    operators: [
      {
        id: "solynieve",
        name: "Sol y Nieve Pucón",
        url: "https://www.solynievepucon.cl",
        fromUsd: 42,
        note: loc({
          en: "Rafting + volcano + ski in winter. Year-round on the Trancura.",
          es: "Rafting + volcán + ski en invierno. Trancura todo el año.",
        }),
      },
      {
        id: "lleuque",
        name: "Camping Lléuque",
        url: "https://www.campinglleuquepucon.cl",
        fromUsd: 38,
        note: loc({
          en: "Raft + camp on the river. Listed by Guías de Rafting Chile.",
          es: "Raft y camping en el río. En el listado de Guías de Rafting Chile.",
        }),
      },
      {
        id: "politur",
        name: "Politur",
        url: "https://www.politur.com",
        fromUsd: 45,
        note: loc({
          en: "Pucón veteran: rafting, canopy, hydrospeed. Easy to book from hostels.",
          es: "Veterano de Pucón: rafting, canopy, hidrospeed. Fácil de reservar desde hostales.",
        }),
      },
      {
        id: "aguaventura",
        name: "Aguaventura",
        url: "https://www.aguaventura.com",
        fromUsd: 40,
        note: loc({
          en: "Kayak school + rafting. Better if someone in the group actually wants to paddle.",
          es: "Escuela de kayak + rafting. Mejor si alguien del grupo quiere remar de verdad.",
        }),
      },
      {
        id: "otroaire-pucon",
        name: "Otro Aire Aventura (Pucón)",
        url: "https://www.otroaireaventura.com",
        fromUsd: 44,
        note: loc({
          en: "Carhuello km 4.6. Same company that runs Petrohué and Futaleufú — useful if you continue south.",
          es: "Carhuello km 4.6. La misma empresa del Petrohué y Futaleufú: útil si sigues al sur.",
        }),
      },
    ],
  },
  {
    id: "petrohue-raft",
    kind: "rafting",
    region: "lakes",
    name: loc({
      en: "Petrohué — Osorno in the background",
      es: "Petrohué — el Osorno de fondo",
    }),
    river: loc({ en: "Río Petrohué · Ensenada", es: "Río Petrohué · Ensenada" }),
    level: "III–IV",
    season: loc({
      en: "November–March peak; check volcanic sediment",
      es: "Noviembre a marzo peak; checa sedimento volcánico",
    }),
    summary: loc({
      en: "From Puerto Varas / Ensenada. Combine with Petrohué Falls and a lake crossing. Not a substitute for Futaleufú.",
      es: "Desde Puerto Varas / Ensenada. Combina con los Saltos y un cruce de lago. No reemplaza al Futaleufú.",
    }),
    operators: [
      {
        id: "terrasur",
        name: "Terra Sur Ecoaventura",
        url: "https://www.terrasurecoaventura.com",
        fromUsd: 48,
        note: loc({
          en: "Year-round Petrohué operator on the rafting guides list.",
          es: "Operador del Petrohué todo el año en el listado de guías.",
        }),
      },
      {
        id: "otroaire-pv",
        name: "Otro Aire Aventura (Ensenada)",
        url: "https://www.otroaireaventura.com",
        fromUsd: 50,
        note: loc({
          en: "Base on Ruta 225 km 41.4. Rafting + kayak on the same river family.",
          es: "Base en Ruta 225 km 41.4. Rafting y kayak en la misma familia de ríos.",
        }),
      },
      {
        id: "kokayak",
        name: "Ko'Kayak",
        url: "https://www.kokayak.cl",
        fromUsd: 52,
        note: loc({
          en: "Sea kayak on Llanquihue/Todos los Santos plus river days. Good mixed-skill groups.",
          es: "Kayak en Llanquihue/Todos los Santos y días de río. Bueno para grupos mixtos.",
        }),
      },
      {
        id: "alsur",
        name: "Al Sur Expediciones",
        url: "https://www.alsurexpediciones.cl",
        fromUsd: 55,
        note: loc({
          en: "Kayak and trekking around the lake district; book rafting as an add-on day.",
          es: "Kayak y trekking en la cuenca; el rafting se suma como día extra.",
        }),
      },
      {
        id: "turismo-cabalgatas",
        name: "Turismo Cabalgatas / local desks",
        url: "https://www.puertovaras.cl",
        fromUsd: 45,
        note: loc({
          en: "Hotel desks in Puerto Varas sell the same Petrohué slot. Confirm the actual boat operator.",
          es: "Los desks de Puerto Varas venden el mismo slot del Petrohué. Confirma quién pone la balsa.",
        }),
      },
    ],
  },
  {
    id: "futaleufu-raft",
    kind: "rafting",
    region: "carretera",
    name: loc({
      en: "Futaleufú — class IV/V, not a day trip",
      es: "Futaleufú — clase IV/V, no es un day trip",
    }),
    river: loc({ en: "Río Futaleufú", es: "Río Futaleufú" }),
    level: "IV–V+",
    season: loc({
      en: "December–March. Need extra days on the Austral.",
      es: "Diciembre a marzo. Pide días extra en la Austral.",
    }),
    summary: loc({
      en: "One of the world's great whitewater rivers. Puente a Puente is the heart (class IV). Macal adds two class V rapids. Fly or drive via Chaitén; this is not an add-on to Torres del Paine.",
      es: "Uno de los grandes ríos de aguas blancas del mundo. Puente a Puente es el corazón (clase IV). Macal suma dos rápidos clase V. Se llega por Chaitén; no es un extra de Torres del Paine.",
    }),
    operators: [
      {
        id: "rio-futa",
        name: "Río Futaleufú Rafting",
        url: "https://es.riofutaleufu.com/",
        fromUsd: 85,
        fromClp: 80000,
        note: loc({
          en: "Owner-run. Puente a Puente from CLP 80.000; Puente–Macal from 95.000; Terminator–Macal full day 130.000. Pedro Aguirre Cerda 697.",
          es: "De dueños. Puente a Puente desde CLP 80.000; Puente–Macal 95.000; Terminator–Macal full day 130.000. Pedro Aguirre Cerda 697.",
        }),
      },
      {
        id: "otroaire-futa",
        name: "Otro Aire Aventura",
        url: "https://www.otroaireaventura.com/actividades-rafting-en-futaleufu",
        fromUsd: 64,
        fromClp: 60000,
        note: loc({
          en: "Puente a puente CLP 60.000 (11 km); Puente–Macal 75.000; Azul–Macal 105.000. Cataraft safety, GoPro per boat.",
          es: "Puente a puente CLP 60.000 (11 km); Puente–Macal 75.000; Azul–Macal 105.000. Cataraft de seguridad y GoPro por balsa.",
        }),
      },
      {
        id: "exp-chile",
        name: "Expediciones Chile",
        url: "https://www.exchile.com",
        fromUsd: 120,
        note: loc({
          en: "Multi-day Futaleufú packages, kayak clinics, lodge. The US/Europe booking channel.",
          es: "Paquetes de varios días, clínicas de kayak, lodge. El canal de reserva USA/Europa.",
        }),
      },
      {
        id: "patagonia-elements",
        name: "Patagonia Elements",
        url: "https://www.patagoniaelements.com",
        fromUsd: 90,
        note: loc({
          en: "Rafting plus family floats on the Espolón when the Futa is too big.",
          es: "Rafting y flotadas familiares en el Espolón cuando el Futa viene grande.",
        }),
      },
      {
        id: "biobio-exp",
        name: "Bio Bio Expeditions",
        url: "https://www.bbxrafting.com",
        fromUsd: 140,
        note: loc({
          en: "International outfitter, multi-day camps. Book months ahead for January.",
          es: "Outfitter internacional, campamentos de varios días. Reserva con meses para enero.",
        }),
      },
    ],
  },
  {
    id: "atacama-stars",
    kind: "stars",
    region: "atacama",
    name: loc({
      en: "Atacama night sky",
      es: "Cielo nocturno del Atacama",
    }),
    season: loc({
      en: "Year-round; new moon is the prize",
      es: "Todo el año; luna nueva es el premio",
    }),
    summary: loc({
      en: "The desert is the product. Book a proper observatory, not a phone-flashlight tour. Combine with Valle de la Luna at dusk.",
      es: "El desierto es el producto. Reserva observatorio de verdad, no un tour con linterna. Combina con Valle de la Luna al atardecer.",
    }),
    operators: [
      {
        id: "space",
        name: "SPACE / San Pedro de Atacama Celestial Explorations",
        url: "https://www.spaceobs.com",
        fromUsd: 55,
        note: loc({
          en: "The classic observatory south of town. English and French desks. Book the night you land.",
          es: "El observatorio clásico al sur del pueblo. Escritorio en inglés y francés. Reserva la noche que llegas.",
        }),
      },
      {
        id: "ahlarke",
        name: "Ahlarké",
        url: "https://www.ahlarke.cl",
        fromUsd: 48,
        note: loc({
          en: "Smaller groups, bilingual. Good if SPACE is sold out.",
          es: "Grupos más chicos, bilingüe. Sirve si SPACE está lleno.",
        }),
      },
      {
        id: "alto-atacama",
        name: "Alto Atacama (in-house)",
        url: "https://www.altoatacama.com",
        fromUsd: 0,
        note: loc({
          en: "Included if you sleep at the lodge. Not a walk-in for town backpackers.",
          es: "Incluido si duermes en el lodge. No es walk-in para backpackers del pueblo.",
        }),
      },
      {
        id: "explora-sky",
        name: "Explora Atacama sky",
        url: "https://www.explora.com",
        fromUsd: 0,
        note: loc({
          en: "In-house astronomer. Already in the lodge rate — do not double-pay a town tour.",
          es: "Astrónomo in-house. Ya va en la tarifa del lodge: no dobles con un tour del pueblo.",
        }),
      },
      {
        id: "tierra-atacama-sky",
        name: "Tierra Atacama observatory",
        url: "https://www.tierrahotels.com",
        fromUsd: 0,
        note: loc({
          en: "On-site telescopes for hotel guests. Same rule: included, not extra.",
          es: "Telescopios en el hotel para huéspedes. Misma regla: va incluido.",
        }),
      },
    ],
  },
  {
    id: "wine-maipo",
    kind: "wine",
    region: "santiago-wine",
    name: loc({
      en: "Maipo, Casablanca and Colchagua",
      es: "Maipo, Casablanca y Colchagua",
    }),
    season: loc({
      en: "Year-round. Harvest March–May.",
      es: "Todo el año. Vendimia marzo a mayo.",
    }),
    summary: loc({
      en: "Do one valley well. Casablanca is on the way to Valparaíso. Maipo is a half-day from Lastarria. Colchagua wants a night.",
      es: "Haz un valle bien. Casablanca queda de camino a Valparaíso. Maipo es medio día desde Lastarria. Colchagua pide noche.",
    }),
    operators: [
      {
        id: "concha",
        name: "Concha y Toro · Pirque",
        url: "https://www.conchaytoro.com",
        fromUsd: 28,
        note: loc({
          en: "The one everyone has heard of. Book the tour, skip the gift-shop-only visit.",
          es: "La que todos han oído. Reserva el tour, no solo la tienda.",
        }),
      },
      {
        id: "undurraga",
        name: "Viña Undurraga",
        url: "https://www.undurraga.cl",
        fromUsd: 24,
        note: loc({
          en: "Close to the city, easy for a first afternoon.",
          es: "Cerca de la ciudad, fácil para la primera tarde.",
        }),
      },
      {
        id: "santa-rita",
        name: "Santa Rita + Museo Andino",
        url: "https://www.santarita.com",
        fromUsd: 30,
        note: loc({
          en: "Wine plus a serious pre-Columbian museum. Better than a third tasting room.",
          es: "Vino más un museo precolombino serio. Mejor que una tercera sala de cata.",
        }),
      },
      {
        id: "casas-bosque",
        name: "Casas del Bosque · Casablanca",
        url: "https://www.casasdelbosque.cl",
        fromUsd: 32,
        note: loc({
          en: "On Ruta 68 toward Valparaíso. Cool-climate whites. Lunch on site.",
          es: "En la Ruta 68 hacia Valparaíso. Blancos de clima frío. Almuerzo en el lugar.",
        }),
      },
      {
        id: "emiliana",
        name: "Emiliana Orgánica",
        url: "https://www.emiliana.cl",
        fromUsd: 34,
        note: loc({
          en: "Organic/biodynamic. The eco-bias market (DE, NL, FR) actually cares.",
          es: "Orgánica/biodinámica. El mercado eco (DE, NL, FR) sí le importa.",
        }),
      },
    ],
  },
  {
    id: "tdp-trek",
    kind: "trek",
    region: "patagonia",
    name: loc({
      en: "W and O circuits — Torres del Paine",
      es: "Circuitos W y O — Torres del Paine",
    }),
    season: loc({
      en: "October–April. Book refugios months ahead.",
      es: "Octubre a abril. Reserva refugios con meses.",
    }),
    summary: loc({
      en: "The W is 4–5 days. The O is 7–9. You cannot walk up and find a bed in January. Day hikes from a hotel in Natales are the honest Plan B.",
      es: "El W son 4–5 días. El O, 7–9. En enero no llegas a buscar cama. Day hikes desde un hotel en Natales son el plan B honesto.",
    }),
    operators: [
      {
        id: "vertice",
        name: "Vertice Patagonia",
        url: "https://www.verticepatagonia.com",
        fromUsd: 160,
        note: loc({
          en: "Refugios on the Grey / Paine Grande side. Book as soon as dates exist.",
          es: "Refugios del lado Grey / Paine Grande. Reserva apenas existan fechas.",
        }),
      },
      {
        id: "las-torres",
        name: "Hotel Las Torres / Fantástico Sur",
        url: "https://www.lastorres.com",
        fromUsd: 180,
        note: loc({
          en: "Eastern W: Chileno, Los Cuernos, Central. The sunrise-to-the-towers logistics sit here.",
          es: "W oriente: Chileno, Los Cuernos, Central. Aquí vive la logística del amanecer a las Torres.",
        }),
      },
      {
        id: "chile-nativo",
        name: "Chile Nativo",
        url: "https://www.chilenativo.travel",
        fromUsd: 220,
        note: loc({
          en: "Guided W with packs supported. Mid/comfort groups who do not want to gamble on beds.",
          es: "W guiado con porteo. Grupos mid que no quieren apostar la cama.",
        }),
      },
      {
        id: "fantasticosur",
        name: "Fantástico Sur camps",
        url: "https://www.fantasticosur.com",
        fromUsd: 90,
        note: loc({
          en: "Camps and refugios. The backpacker booking that still sells out.",
          es: "Campings y refugios. La reserva backpacker que igual se agota.",
        }),
      },
      {
        id: "erratic-rock",
        name: "Erratic Rock (Natales briefing)",
        url: "https://www.erraticrock.com",
        fromUsd: 0,
        note: loc({
          en: "Free 3pm briefing in Puerto Natales. Still the best public orientation before you pay anyone.",
          es: "Briefing gratis a las 15:00 en Puerto Natales. Sigue siendo la mejor orientación pública antes de pagarle a alguien.",
        }),
      },
    ],
  },
  {
    id: "villarrica-volcano",
    kind: "volcano",
    region: "lakes",
    name: loc({
      en: "Villarrica crater climb",
      es: "Cumbre del volcán Villarrica",
    }),
    season: loc({
      en: "December–March summit; winter ski on the lower slopes",
      es: "Cumbre diciembre–marzo; ski en ladera en invierno",
    }),
    summary: loc({
      en: "Guided only when CONAF and the volcano allow it. Ice axe, crampons, midnight pickup. Not a casual hike.",
      es: "Solo guiado cuando CONAF y el volcán lo permiten. Piolet, crampones, pickup de madrugada. No es un trekking casual.",
    }),
    operators: [
      {
        id: "solynieve-volcan",
        name: "Sol y Nieve",
        url: "https://www.solynievepucon.cl",
        fromUsd: 160,
        note: loc({ en: "Standard summit day from Pucón.", es: "Día de cumbre estándar desde Pucón." }),
      },
      {
        id: "politur-volcan",
        name: "Politur",
        url: "https://www.politur.com",
        fromUsd: 155,
        note: loc({ en: "Gear included. Cancel if the crater is closed — it often is.", es: "Equipo incluido. Se cancela si el cráter está cerrado: pasa seguido." }),
      },
      {
        id: "kayakchile",
        name: "Kayakchile Pucón",
        url: "https://www.kayakchile.net",
        fromUsd: 150,
        note: loc({ en: "Volcano + river combo weeks.", es: "Semanas combo volcán + río." }),
      },
      {
        id: "summit-chile",
        name: "Summit Chile",
        url: "https://www.summitchile.org",
        fromUsd: 170,
        note: loc({ en: "Smaller summit teams.", es: "Grupos de cumbre más chicos." }),
      },
      {
        id: "conaf-desk",
        name: "CONAF / park desk",
        url: "https://www.conaf.cl",
        fromUsd: 12,
        note: loc({
          en: "Check the restriction the evening before. Guides cannot override a red volcano.",
          es: "Revisa la restricción la noche anterior. El guía no pasa por sobre un volcán en rojo.",
        }),
      },
    ],
  },
  {
    id: "pinguineras",
    kind: "wildlife",
    region: "chiloe",
    name: loc({
      en: "Penguin colonies and wetlands — Chiloé",
      es: "Pingüineras y humedales — Chiloé",
    }),
    season: loc({
      en: "October–March for Magellanic / Humboldt mix",
      es: "Octubre a marzo para Magallánicos / Humboldt",
    }),
    summary: loc({
      en: "Puñihuil is the easy colony from Ancud. Do not skip a church and a curanto for a second boat.",
      es: "Puñihuil es la colonia fácil desde Ancud. No sacrifiques una iglesia y un curanto por un segundo bote.",
    }),
    operators: [
      {
        id: "punihuil",
        name: "Pingüineras Puñihuil",
        url: "https://www.google.com/maps/search/?api=1&query=Pinguineras+Punihuil",
        fromUsd: 22,
        note: loc({ en: "Short boat from the beach. Go early for less swell.", es: "Bote corto desde la playa. Ve temprano: menos oleaje." }),
      },
      {
        id: "aulen",
        name: "Aulen Safari Chilote",
        url: "https://www.aulensafari.cl",
        fromUsd: 40,
        note: loc({ en: "Longer coastal wildlife runs.", es: "Salidas más largas de fauna costera." }),
      },
      {
        id: "quemchi-tours",
        name: "Local Castro desks",
        url: "https://www.chiloe.travel",
        fromUsd: 28,
        note: loc({ en: "Churches + park + penguin combos sold in Castro.", es: "Combos iglesia + parque + pingüinos en Castro." }),
      },
      {
        id: "conaf-chiloe",
        name: "CONAF Chiloé NP",
        url: "https://www.conaf.cl",
        fromUsd: 10,
        note: loc({ en: "Cucao / Chanquín side: dunes and sea, not penguins.", es: "Lado Cucao / Chanquín: dunas y mar, no pingüinos." }),
      },
      {
        id: "curanto-dona",
        name: "Curanto kitchens (Castro / Dalcahue)",
        url: "https://www.google.com/maps/search/?api=1&query=curanto+Castro+Chiloe",
        fromUsd: 25,
        note: loc({ en: "Not wildlife — but this is why you came to the island.", es: "No es fauna: pero por esto viniste a la isla." }),
      },
    ],
  },
];

export function activitiesByRegion(region: string) {
  return activities.filter((item) => item.region === region);
}

export function activityById(id: string) {
  return activities.find((item) => item.id === id);
}
