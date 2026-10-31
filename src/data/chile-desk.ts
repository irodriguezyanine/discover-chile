import { loc } from "@/i18n/loc";
import type { Localized } from "@/data/types";
import type { Locale } from "@/i18n/config";

export type Phrase = {
  id: string;
  say: string;
  how: string;
  mean: Localized;
};

export const chileanPhrases: Phrase[] = [
  {
    id: "cachai",
    say: "¿Cachai?",
    how: "ka-CHAI",
    mean: loc({
      en: "You get it? Chileans tag this on the end of a sentence.",
      es: "¿Entiendes? Se pega al final de la frase.",
    }),
  },
  {
    id: "al-tiro",
    say: "Al tiro",
    how: "al TI-ro",
    mean: loc({
      en: "Right now. Not later. The honest speed of a Santiago waiter.",
      es: "Ahora mismo. No después. La velocidad honesta de un garzón.",
    }),
  },
  {
    id: "po",
    say: "Sí po / ya po",
    how: "see POH",
    mean: loc({
      en: "The national particle. It does not mean much. It means you are here.",
      es: "La partícula nacional. No significa mucho. Significa que estás.",
    }),
  },
  {
    id: "once",
    say: "La once",
    how: "la ON-seh",
    mean: loc({
      en: "Afternoon tea, bread, avocado, something sweet. Not 11 o’clock.",
      es: "Té de la tarde, pan, palta, algo dulce. No son las 11.",
    }),
  },
  {
    id: "completo",
    say: "Un completo italiano",
    how: "kom-PLE-to i-ta-LIA-no",
    mean: loc({
      en: "Hot dog with avocado, tomato, mayo — the colours of the Italian flag, not Italy.",
      es: "Vienesa con palta, tomate y mayo: los colores de Italia, no Italia.",
    }),
  },
  {
    id: "bacan",
    say: "Bacán",
    how: "ba-KAN",
    mean: loc({ en: "Cool. The word you want after Torres.", es: "Genial. La palabra que quieres después de las Torres." }),
  },
  {
    id: "fome",
    say: "Qué fome",
    how: "keh FO-meh",
    mean: loc({ en: "How boring. Also: a grey day in Puerto Montt.", es: "Qué aburrido. También: un día gris en Puerto Montt." }),
  },
  {
    id: "micro",
    say: "La micro",
    how: "la MEE-kro",
    mean: loc({
      en: "The city bus. In Santiago it is RED. Not a small thing.",
      es: "El bus de la ciudad. En Santiago es RED. No es una cosa chica.",
    }),
  },
  {
    id: "regala",
    say: "¿Me regala la cuenta?",
    how: "meh re-GA-la la KWEN-ta",
    mean: loc({
      en: "Could I have the bill? Chilean polite: they ‘gift’ you things they are selling.",
      es: "¿Me da la cuenta? El cortés chileno: te ‘regalan’ lo que te cobran.",
    }),
  },
  {
    id: "permiso",
    say: "Permiso",
    how: "per-MEE-so",
    mean: loc({
      en: "Excuse me, coming through. Use it in the Mercado and on the micro.",
      es: "Con permiso, voy pasando. En el Mercado y en la micro.",
    }),
  },
  {
    id: "estai",
    say: "¿Cómo estái?",
    how: "KO-mo es-TAI",
    mean: loc({
      en: "How are you? Chilean voseo: estái, vai, cachai. Not Spain’s estás.",
      es: "¿Cómo estás? Voseo chileno: estái, vai, cachai. No el estás de España.",
    }),
  },
  {
    id: "sag",
    say: "Declare en el SAG",
    how: "sag",
    mean: loc({
      en: "Agriculture checkpoint. Fruit, cheese, seeds: declare or lose the afternoon.",
      es: "Control agrícola. Fruta, queso, semillas: declara o pierdes la tarde.",
    }),
  },
  {
    id: "palta",
    say: "Palta",
    how: "PAL-ta",
    mean: loc({
      en: "Avocado. Never aguacate here. It goes on the completo, the once, the city.",
      es: "Aguacate. Acá no se dice aguacate. Va en el completo, en la once, en la ciudad.",
    }),
  },
  {
    id: "ya",
    say: "Ya",
    how: "yah",
    mean: loc({
      en: "Ok, deal, I heard you. One syllable that closes a Chilean conversation.",
      es: "Ok, trato, te escuché. Una sílaba que cierra la conversación chilena.",
    }),
  },
  {
    id: "pololo",
    say: "Pololo / polola",
    how: "po-LO-lo",
    mean: loc({
      en: "Boyfriend / girlfriend. Not novio until it is serious — ask Isidora, not the textbook.",
      es: "Pareja. No es novio hasta que es serio: pregúntale a Isidora, no al manual.",
    }),
  },
]

/** Expanded from Oct 30 tip-hub deploy (16 plates — mar, tierra, fuente de soda). */
export const chileanFoods: {
  id: string;
  name: Localized;
  note: Localized;
  aka?: Localized;
  origin?: string;
  allergies?: string[];
  image?: string;
  zones?: string[];
}[] = [
  {
    id: "pino",
    name: loc({ en: "Empanada de pino", es: "Empanada de pino" }),
    aka: loc({ en: "Beef + onion + olive + egg in dough. Not a Cornish pastry.", es: "Carne, cebolla, aceituna, huevo. No es la empanada de España." }),
    note: loc({ en: "The airport one is a lie; wait for a source oven.", es: "La del aeropuerto es mentira; espera un horno de barro." }),
    origin: "land",
    allergies: ["gluten", "egg"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    zones: ["atacama", "coquimbo", "santiago", "santiago-wine", "valparaiso", "volcanes", "lakes", "chiloe", "carretera", "parques"],
  },
  {
    id: "choclo",
    name: loc({ en: "Pastel de choclo", es: "Pastel de choclo" }),
    aka: loc({ en: "Sweet corn crust over savoury pino. Summer in the Central Valley.", es: "Costra de choclo dulce sobre pino. Verano del valle central." }),
    note: loc({ en: "Corn, beef, sometimes chicken. Dairy in the crust.", es: "Choclo, carne, a veces pollo. Lácteos en la costra." }),
    origin: "land",
    allergies: ["gluten", "dairy", "egg"],
    image: "https://images.unsplash.com/photo-1536304993881-ff5e16ae29dd?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "santiago-wine", "volcanes", "lakes"],
  },
  {
    id: "congrio",
    name: loc({ en: "Congrio", es: "Congrio" }),
    aka: loc({ en: "Conger eel — the fish Neruda wrote. Mercado Central, not a mall.", es: "El pescado que escribió Neruda. Mercado Central, no un mall." }),
    note: loc({ en: "Fried or in soup (caldillo). Ask if you are allergic to fish.", es: "Frito o en caldillo. Avisa si hay alergia a pescado." }),
    origin: "sea",
    allergies: ["fish"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    zones: ["coquimbo", "santiago", "santiago-wine", "valparaiso", "chiloe"],
  },
  {
    id: "curanto",
    name: loc({ en: "Curanto en hoyo", es: "Curanto en hoyo" }),
    aka: loc({ en: "Chiloé pit feast: shellfish, meat, milcao. This is the island.", es: "Chiloé: mariscos, carne, milcao en hoyo. Esto es la isla." }),
    note: loc({ en: "Shellfish + pork + potato bread. Hard no if you have a shellfish allergy.", es: "Mariscos + cerdo + milcao. No si hay alergia a mariscos." }),
    origin: "sea",
    allergies: ["shellfish", "gluten"],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    zones: ["chiloe"],
  },
  {
    id: "carmenere",
    name: loc({ en: "Carménère", es: "Carménère" }),
    aka: loc({ en: "The grape Chile kept when France thought it was dead.", es: "La cepa que Chile guardó cuando Francia la daba por muerta." }),
    note: loc({ en: "Casablanca and Maipo. Sulphites as with any wine.", es: "Casablanca y Maipo. Sulfitos, como todo vino." }),
    origin: "land",
    allergies: [],
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago-wine"],
  },
  {
    id: "cordero",
    name: loc({ en: "Cordero al palo", es: "Cordero al palo" }),
    aka: loc({ en: "Patagonian lamb on a spit. Eat it the night before the W.", es: "Cordero patagónico al palo. Cómelo la noche antes de la W." }),
    note: loc({ en: "Land, fire, Magallanes. No shellfish, no gluten unless they serve bread.", es: "Tierra, fuego, Magallanes. Sin mariscos; el pan aparte." }),
    origin: "land",
    allergies: [],
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80",
    zones: ["patagonia", "carretera", "parques"],
  },
  {
    id: "italiano",
    name: loc({ en: "Completo italiano", es: "Completo italiano" }),
    aka: loc({ en: "Hot dog + palta + tomato + mayo. Italian flag colours. Not Italy.", es: "Vienesa + palta + tomate + mayo. Colores de Italia. No es Italia." }),
    note: loc({ en: "Mayo is dairy-adjacent. Palta is avocado, never aguacate.", es: "La mayo puede traer lácteos. Palta es palta, nunca aguacate." }),
    origin: "fast",
    allergies: ["gluten", "egg", "dairy"],
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "santiago-wine", "valparaiso"],
  },
  {
    id: "churrasco",
    name: loc({ en: "Churrasco italiano", es: "Churrasco italiano" }),
    aka: loc({ en: "Thin beef, palta, tomato, mayo. The completo’s older cousin.", es: "Carne delgada, palta, tomate, mayo. El primo mayor del completo." }),
    note: loc({ en: "Say the full name at the counter. ‘A sandwich’ will not help.", es: "Di el nombre entero en el mesón. «Un sándwich» no ayuda." }),
    origin: "fast",
    allergies: ["gluten", "dairy"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "santiago-wine", "valparaiso"],
  },
  {
    id: "sopaipilla",
    name: loc({ en: "Sopaipilla", es: "Sopaipilla" }),
    aka: loc({ en: "Fried pumpkin dough. Pebre in the rain, chancaca in the south.", es: "Masa de zapallo frita. Pebre cuando llueve, chancaca en el sur." }),
    note: loc({ en: "Street food. Cash. Follow the rain in Santiago.", es: "Comida de calle. Efectivo. En Santiago sigue la lluvia." }),
    origin: "fast",
    allergies: ["gluten"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "volcanes", "lakes"],
  },
  {
    id: "chorrillana",
    name: loc({ en: "Chorrillana", es: "Chorrillana" }),
    aka: loc({ en: "Fries, onion, egg, beef. A table, not a plate. Valparaíso after the shift.", es: "Papas, cebolla, huevo, carne. Una mesa, no un plato. Valparaíso después del turno." }),
    note: loc({ en: "Order one for two. Gluten in the fries’ kitchen, egg on top.", es: "Pide una para dos. Gluten en la cocina de las papas, huevo arriba." }),
    origin: "fast",
    allergies: ["gluten", "egg"],
    image: "https://images.unsplash.com/photo-1573080494122-16fd4d324d28?auto=format&fit=crop&w=1200&q=80",
    zones: ["valparaiso", "santiago"],
  },
  {
    id: "lomito",
    name: loc({ en: "Lomito", es: "Lomito" }),
    aka: loc({ en: "Slow pork in a bun. Italiano works here too.", es: "Cerdo lento en pan. El italiano también vale." }),
    note: loc({ en: "The pork should wet the bread. A fuente lunch that is not a completo.", es: "El cerdo tiene que mojar el pan. Un almuerzo de fuente que no es un completo." }),
    origin: "fast",
    allergies: ["gluten", "dairy"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "valparaiso"],
  },
  {
    id: "machas",
    name: loc({ en: "Machas a la parmesana", es: "Machas a la parmesana" }),
    aka: loc({ en: "Surf clams baked with cheese. Viña and Reñaca.", es: "Almejas al horno con queso. Viña y Reñaca." }),
    note: loc({ en: "Shellfish. A half dozen to share.", es: "Marisco. Media docena para compartir." }),
    origin: "sea",
    allergies: ["shellfish", "dairy"],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    zones: ["valparaiso", "coquimbo"],
  },
  {
    id: "cazuela",
    name: loc({ en: "Cazuela", es: "Cazuela" }),
    aka: loc({ en: "Broth, meat, pumpkin, potato. The weekday lunch.", es: "Caldo, carne, zapallo, papa. El almuerzo de diario." }),
    note: loc({ en: "Beef or chicken — ask. Santiago when the smog sits low.", es: "Vacuno o pollo: pregunta. Santiago cuando el smog se sienta." }),
    origin: "land",
    allergies: [],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "santiago-wine", "volcanes", "lakes"],
  },
  {
    id: "porotos",
    name: loc({ en: "Porotos granados", es: "Porotos granados" }),
    aka: loc({ en: "Summer beans, corn, squash. January in the valley.", es: "Porotos de verano, choclo, zapallo. Enero en el valle." }),
    note: loc({ en: "Fresh corn, not a can. A January lunch.", es: "Choclo fresco, no lata. Un almuerzo de enero." }),
    origin: "land",
    allergies: [],
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80",
    zones: ["santiago", "santiago-wine"],
  },
  {
    id: "pisco",
    name: loc({ en: "Pisco sour", es: "Pisco sour" }),
    aka: loc({ en: "Elqui grape brandy, not a Casablanca Cabernet.", es: "Pisco del Elqui, no un Cabernet de Casablanca." }),
    note: loc({ en: "Egg white in the classic sour. Skip it if you do not eat egg.", es: "Clara de huevo en el sour clásico. Sáltalo si no comes huevo." }),
    origin: "land",
    allergies: ["egg"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    zones: ["coquimbo", "valparaiso"],
  },
  {
    id: "atun",
    name: loc({ en: "Hanga Roa tuna", es: "Atún de Hanga Roa" }),
    aka: loc({ en: "The island catch. This is Isla de Pascua, not Mercado Central.", es: "La pesca de la isla. Esto es Isla de Pascua, no el Mercado Central." }),
    note: loc({ en: "Fish. Ask if they froze it. Almost everything else is imported.", es: "Pescado. Pregunta si vino congelado. Casi todo lo demás se importa." }),
    origin: "sea",
    allergies: [],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    zones: ["rapanui"],
  },
];

export const localeTipKey: Record<Locale, string> = {
  en: "us",
  es: "es",
  pt: "br",
  de: "de",
  fr: "fr",
  it: "it",
  nl: "de",
  ja: "jp",
  ko: "kr",
  zh: "cn",
  ru: "ru",
  ar: "ae",
};
