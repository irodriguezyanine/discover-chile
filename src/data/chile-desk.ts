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

export const chileanFoods: { id: string; name: Localized; note: Localized }[] = [
  {
    id: "pino",
    name: loc({ en: "Empanada de pino", es: "Empanada de pino" }),
    note: loc({
      en: "Beef, onion, olive, egg. The airport one is a lie; wait for a source oven.",
      es: "Carne, cebolla, aceituna, huevo. La del aeropuerto es mentira; espera un horno de barro.",
    }),
  },
  {
    id: "choclo",
    name: loc({ en: "Pastel de choclo", es: "Pastel de choclo" }),
    note: loc({
      en: "Sweet corn crust over a savoury pino. Summer in the Central Valley.",
      es: "Costra de choclo dulce sobre pino. Verano del valle central.",
    }),
  },
  {
    id: "congrio",
    name: loc({ en: "Congrio", es: "Congrio" }),
    note: loc({
      en: "The fish Neruda wrote. Mercado Central, not a mall.",
      es: "El pescado que escribió Neruda. Mercado Central, no un mall.",
    }),
  },
  {
    id: "curanto",
    name: loc({ en: "Curanto en hoyo", es: "Curanto en hoyo" }),
    note: loc({
      en: "Chiloé: shellfish, meat, potato bread in a pit. This is the island.",
      es: "Chiloé: mariscos, carne, milcao en hoyo. Esto es la isla.",
    }),
  },
  {
    id: "carmenere",
    name: loc({ en: "Carménère", es: "Carménère" }),
    note: loc({
      en: "The grape Chile kept when France thought it was dead. Casablanca and Maipo.",
      es: "La cepa que Chile guardó cuando Francia la daba por muerta. Casablanca y Maipo.",
    }),
  },
  {
    id: "cordero",
    name: loc({ en: "Cordero al palo", es: "Cordero al palo" }),
    note: loc({
      en: "Patagonian lamb on a spit. Eat it the night before the W.",
      es: "Cordero patagónico al palo. Cómelo la noche antes de la W.",
    }),
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
