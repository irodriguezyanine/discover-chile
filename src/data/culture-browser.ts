import { loc } from "@/i18n/loc";
import type { Localized } from "@/data/types";

/** Nested Cultura browser recovered from Oct 30 tip-hub deploy (fj8y48o8g era). */
export type CultureFact = { title: Localized; body: Localized };
export type CultureColor = { hex: string; name: Localized };
export type CultureStat = { label: Localized; value: string };
export type CultureNode = {
  id: string;
  title: Localized;
  hint?: Localized;
  lead?: Localized;
  image?: string;
  light?: boolean;
  contain?: boolean;
  focus?: string;
  logo?: string;
  colors?: CultureColor[];
  stats?: CultureStat[];
  facts?: CultureFact[];
  children?: CultureNode[];
  special?: "slang";
};

export function cultureAt(path: string[]): CultureNode | null {
  let node: CultureNode | undefined = cultureRoot;
  for (const id of path) {
    node = node.children?.find((child) => child.id === id);
    if (!node) return null;
  }
  return node ?? null;
}

export const cultureRoot: CultureNode = 
{
  id: "culture",
  title: loc({ en: "Culture", es: "Cultura" }),
  hint: loc({ en: "Food, games, sport", es: "Comida, juegos, deporte" }),
  lead: loc({ en: "Pick a Chile. Each card is its own desk.", es: "Elige un Chile. Cada tarjeta es su propio escritorio." }),
  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
  light: true,
  children: [
    {
      id: "foods",
      title: loc({ en: "Food", es: "Comidas" }),
      hint: loc({ en: "Sea, land, the counter", es: "Mar, tierra, el mesón" }),
      lead: loc({ en: "Three desks. Sea, land, or the fuente de soda. Then the plate, then the city that cooks it.", es: "Tres escritorios. Mar, tierra, o la fuente de soda. Después el plato, después la ciudad que lo cocina." }),
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
      focus: "object-[82%_center]",
      children: [
        {
          id: "mar",
          title: loc({ en: "Sea", es: "Mar" }),
          hint: loc({ en: "The Humboldt table", es: "La mesa de Humboldt" }),
          lead: loc({ en: "Cold Pacific, not a tropical buffet. Congrio, locos, machas, curanto. The coast changes every 400 km.", es: "Pacífico frío, no un buffet tropical. Congrio, locos, machas, curanto. La costa cambia cada 400 km." }),
          image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
          children: [
            {
              id: "congrio",
              title: loc({ en: "Congrio", es: "Congrio" }),
              hint: loc({ en: "Neruda’s fish", es: "El pescado de Neruda" }),
              lead: loc({ en: "Fried, baked, or in caldillo. The honest plate of the central coast. Not a mall food court.", es: "Frito, al horno o en caldillo. El plato honesto de la costa central. No es patio de comida de mall." }),
              image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Ask", es: "Pregunta" }), body: loc({ en: "Caldillo is the soup. Frito is the fillet. Say which.", es: "Caldillo es la sopa. Frito es el filete. Di cuál." }) },
                { title: loc({ en: "Bone", es: "Espina" }), body: loc({ en: "A whole congrio has bones. The fillet does not. Tourists order the fillet.", es: "El congrio entero trae espina. El filete no. El visitante pide filete." }) },
              ],
              children: [
                {
                  id: "congrio-scl",
                  title: loc({ en: "Mercado Central", es: "Mercado Central" }),
                  hint: loc({ en: "Santiago", es: "Santiago" }),
                  lead: loc({ en: "The tourist room is loud. The stalls behind it still cook fish. Midday, not dinner.", es: "El salón turista es ruido. Los puestos de atrás siguen cocinando pescado. Almuerzo, no cena." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                  facts: [
                    { title: loc({ en: "Metro", es: "Metro" }), body: loc({ en: "Cal y Canto, then the market. Card works; cash is faster at the stall.", es: "Cal y Canto y el mercado. La tarjeta sirve; el efectivo es más rápido en el puesto." }) },
                  ],
                },
                {
                  id: "congrio-valpo",
                  title: loc({ en: "Valparaíso & Viña", es: "Valparaíso y Viña" }),
                  hint: loc({ en: "Port catch", es: "Pesca del puerto" }),
                  lead: loc({ en: "A caleta plate, not a cerro tasting menu. Congrio here tastes of the bay.", es: "Un plato de caleta, no un menú de cerro. El congrio acá sabe a bahía." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "congrio-coq",
                  title: loc({ en: "Coquimbo & Serena", es: "Coquimbo y Serena" }),
                  hint: loc({ en: "North-central", es: "Norte chico" }),
                  lead: loc({ en: "The fish is closer to the boat. Lunch in the caleta beats a hotel buffet.", es: "El pescado está más cerca del bote. El almuerzo en la caleta gana al buffet del hotel." }),
                  image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "caldillo",
              title: loc({ en: "Caldillo de congrio", es: "Caldillo de congrio" }),
              hint: loc({ en: "The poem in a bowl", es: "El poema en un plato" }),
              lead: loc({ en: "Onion, tomato, potato, the fish. A winter lunch on the coast. If it is only broth and a cube, walk.", es: "Cebolla, tomate, papa, el pescado. Almuerzo de invierno en la costa. Si es solo caldo y un cubo, ándate." }),
              image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Wine", es: "Vino" }), body: loc({ en: "A cheap white on the table is correct. A cocktail is not.", es: "Un blanco barato en la mesa es correcto. Un cóctel no." }) },
              ],
              children: [
                {
                  id: "caldillo-mercado",
                  title: loc({ en: "Santiago market", es: "Mercado de Santiago" }),
                  hint: loc({ en: "Indoor sea", es: "Mar bajo techo" }),
                  lead: loc({ en: "Order caldillo at a stall that has a queue of office workers, not a menu in four languages.", es: "Pide caldillo en un puesto con fila de oficina, no con carta en cuatro idiomas." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "caldillo-costa",
                  title: loc({ en: "The coast", es: "La costa" }),
                  hint: loc({ en: "Valpo to Constitución", es: "De Valpo a Constitución" }),
                  lead: loc({ en: "The bowl should smell of fish, not of stock powder.", es: "El plato tiene que oler a pescado, no a caldo en polvo." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "locos",
              title: loc({ en: "Locos", es: "Locos" }),
              hint: loc({ en: "Abalone, Chilean", es: "El abalón chileno" }),
              lead: loc({ en: "A closed season exists for a reason. If a beach stall is selling a bucket in January, ask twice.", es: "Hay veda por una razón. Si un puesto de playa vende un balde en enero, pregunta dos veces." }),
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Mayo", es: "Mayo" }), body: loc({ en: "Locos mayo is the classic: sliced, mayo, lemon. Not a ceviche.", es: "Locos mayo es el clásico: láminas, mayo, limón. No es un ceviche." }) },
                { title: loc({ en: "Veda", es: "Veda" }), body: loc({ en: "Sernapesca sets the season. A restaurant that always has locos is a story.", es: "Sernapesca fija la temporada. Un restorán que siempre tiene locos es un cuento." }) },
              ],
              children: [
                {
                  id: "locos-valpo",
                  title: loc({ en: "Valparaíso coast", es: "Costa de Valparaíso" }),
                  hint: loc({ en: "When open", es: "Cuando hay" }),
                  lead: loc({ en: "Viña and the caletas. Price is the tell: cheap locos are a warning.", es: "Viña y las caletas. El precio delata: locos baratos son una alerta." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "locos-sur",
                  title: loc({ en: "South coast", es: "Costa sur" }),
                  hint: loc({ en: "Chiloé, Los Lagos", es: "Chiloé, Los Lagos" }),
                  lead: loc({ en: "A plate on the island when the season allows. Not every week.", es: "Un plato en la isla cuando la veda deja. No todas las semanas." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "machas",
              title: loc({ en: "Machas a la parmesana", es: "Machas a la parmesana" }),
              hint: loc({ en: "The surf clam", es: "La almeja de ola" }),
              lead: loc({ en: "Baked with cheese. A Reñaca and Viña classic. Shellfish: skip if that is your allergy.", es: "Al horno con queso. Un clásico de Reñaca y Viña. Marisco: no si hay alergia." }),
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Cheese", es: "Queso" }), body: loc({ en: "Parmesan is the name. The clam is the point.", es: "Parmesano es el nombre. La macha es el punto." }) },
                { title: loc({ en: "Half dozen", es: "Media docena" }), body: loc({ en: "Order a half dozen to share. A dozen is a lunch.", es: "Pide media docena para compartir. Una docena es un almuerzo." }) },
              ],
              children: [
                {
                  id: "machas-vina",
                  title: loc({ en: "Viña & Reñaca", es: "Viña y Reñaca" }),
                  hint: loc({ en: "The postcard plate", es: "El plato postal" }),
                  lead: loc({ en: "Caleta restaurants. Go at lunch. The afternoon wind is for a walk, not a wait.", es: "Restoranes de caleta. Ve al almuerzo. El viento de la tarde es para caminar, no para esperar." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "machas-norte",
                  title: loc({ en: "Norte Chico", es: "Norte Chico" }),
                  hint: loc({ en: "Serena, Coquimbo", es: "Serena, Coquimbo" }),
                  lead: loc({ en: "Same clam, a drier coast. Ask if they are local that day.", es: "La misma almeja, una costa más seca. Pregunta si son del día." }),
                  image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "paila",
              title: loc({ en: "Paila marina", es: "Paila marina" }),
              hint: loc({ en: "The mixed bowl", es: "El bowl mixto" }),
              lead: loc({ en: "A hot mix of shellfish. Every caleta has a version. Name the allergy before they pour.", es: "Un mix caliente de mariscos. Cada caleta tiene el suyo. Nombra la alergia antes de que sirvan." }),
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Heat", es: "Calor" }), body: loc({ en: "It arrives boiling. Wait. The bowl is the oven.", es: "Llega hirviendo. Espera. El bowl es el horno." }) },
              ],
              children: [
                {
                  id: "paila-valpo",
                  title: loc({ en: "Valparaíso", es: "Valparaíso" }),
                  hint: loc({ en: "After the shift", es: "Después del turno" }),
                  lead: loc({ en: "A port lunch. The paila is the day’s catch, not a frozen mix if the place is serious.", es: "Almuerzo de puerto. La paila es la pesca del día, no un mix congelado si el lugar es serio." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "paila-sur",
                  title: loc({ en: "South", es: "Sur" }),
                  hint: loc({ en: "Constitución to Chiloé", es: "De Constitución a Chiloé" }),
                  lead: loc({ en: "Wetter, heavier, more nalca on the table if you are lucky.", es: "Más húmedo, más pesado, nalca en la mesa si hay suerte." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "curanto",
              title: loc({ en: "Curanto", es: "Curanto" }),
              hint: loc({ en: "Chiloé in a pit", es: "Chiloé en un hoyo" }),
              lead: loc({ en: "Shellfish, meat, milcao, chapalele, nalca leaves. The island, not a Santiago gimmick.", es: "Mariscos, carne, milcao, chapalele, hojas de nalca. La isla, no un truco de Santiago." }),
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Hoyo", es: "Hoyo" }), body: loc({ en: "The real one is in the ground. A pot on a stove is curanto en olla — still good, not the same.", es: "El de verdad es en la tierra. La olla sigue siendo curanto en olla: rico, no lo mismo." }) },
                { title: loc({ en: "Allergy", es: "Alergia" }), body: loc({ en: "Hard no if shellfish is a problem. The meat does not save you.", es: "No si hay alergia a mariscos. La carne no te salva." }) },
              ],
              children: [
                {
                  id: "curanto-castro",
                  title: loc({ en: "Castro & Dalcahue", es: "Castro y Dalcahue" }),
                  hint: loc({ en: "The island plate", es: "El plato de la isla" }),
                  lead: loc({ en: "Sunday, a family, a hole. Book if a restaurant does the pit. Walk-in is the olla.", es: "Domingo, una familia, un hoyo. Reserva si el restorán hace el hoyo. Sin reserva es la olla." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "curanto-ancud",
                  title: loc({ en: "Ancud", es: "Ancud" }),
                  hint: loc({ en: "North of the island", es: "El norte de la isla" }),
                  lead: loc({ en: "Closer to the ferry. Still Chiloé. Still a half day, not a snack.", es: "Más cerca del ferry. Sigue siendo Chiloé. Sigue siendo medio día, no un snack." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "erizos",
              title: loc({ en: "Erizos", es: "Erizos" }),
              hint: loc({ en: "Sea urchin", es: "El erizo" }),
              lead: loc({ en: "Raw, lemon, a raw bar on the south coast. Strong. Not a first bite if you are unsure.", es: "Crudo, limón, una barra en la costa sur. Fuerte. No es el primer bocado si dudas." }),
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Season", es: "Temporada" }), body: loc({ en: "Winter is kinder. Summer urchin can be thin.", es: "El invierno es más amable. El erizo de verano a veces viene flaco." }) },
              ],
              children: [
                {
                  id: "erizos-valdivia",
                  title: loc({ en: "Valdivia", es: "Valdivia" }),
                  hint: loc({ en: "River and sea", es: "Río y mar" }),
                  lead: loc({ en: "A market or a caleta. Eat them the hour they opened.", es: "Feria o caleta. Cómelo la hora que lo abrieron." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "erizos-chiloe",
                  title: loc({ en: "Chiloé", es: "Chiloé" }),
                  hint: loc({ en: "The island raw", es: "Crudo de isla" }),
                  lead: loc({ en: "If they offer milcao on the side, say yes.", es: "Si hay milcao al lado, di que sí." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "centolla",
              title: loc({ en: "Centolla", es: "Centolla" }),
              hint: loc({ en: "King crab of the south", es: "El cangrejo del sur" }),
              lead: loc({ en: "Magallanes. Expensive, seasonal, worth one night in Punta Arenas if the boat came in.", es: "Magallanes. Cara, de temporada, vale una noche en Punta Arenas si llegó el barco." }),
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Price", es: "Precio" }), body: loc({ en: "If it is cheap in Santiago, it travelled badly or it is not centolla.", es: "Si está barata en Santiago, viajó mal o no es centolla." }) },
              ],
              children: [
                {
                  id: "centolla-punta",
                  title: loc({ en: "Punta Arenas", es: "Punta Arenas" }),
                  hint: loc({ en: "The city plate", es: "El plato de la ciudad" }),
                  lead: loc({ en: "A restaurant that names the boat is the one. Not every night.", es: "Un restorán que nombra el barco es el que vale. No todas las noches." }),
                  image: "https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "centolla-natales",
                  title: loc({ en: "Puerto Natales", es: "Puerto Natales" }),
                  hint: loc({ en: "Before the park", es: "Antes del parque" }),
                  lead: loc({ en: "A dinner if Paine left you hungry. Still Magallanes money.", es: "Una cena si Paine te dejó con hambre. Sigue siendo plata de Magallanes." }),
                  image: "https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "atun",
              title: loc({ en: "Hanga Roa tuna", es: "Atún de Hanga Roa" }),
              hint: loc({ en: "The island catch", es: "La pesca de la isla" }),
              lead: loc({ en: "Rapa Nui. Almost everything else on the island is imported. This is the local plate.", es: "Rapa Nui. Casi todo lo demás en la isla se importa. Este es el plato local." }),
              image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Ask", es: "Pregunta" }), body: loc({ en: "Ask if they froze it. Fresh is the reason you pay island prices.", es: "Pregunta si vino congelado. El fresco es por qué pagas precio de isla." }) },
              ],
              children: [
                {
                  id: "atun-hanga",
                  title: loc({ en: "Hanga Roa", es: "Hanga Roa" }),
                  hint: loc({ en: "The only town", es: "El único pueblo" }),
                  lead: loc({ en: "A grill near the caleta. Lunch. The evening is for the airport wind.", es: "Una parrilla cerca de la caleta. Almuerzo. La tarde es del viento del aeropuerto." }),
                  image: "https://images.unsplash.com/photo-1524536120883-854d2c00bf1f?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
          ],
        },
        {
          id: "tierra",
          title: loc({ en: "Land", es: "Tierra" }),
          hint: loc({ en: "Corn, fire, broth", es: "Choclo, fuego, caldo" }),
          lead: loc({ en: "The valley table. Empanada, pastel de choclo, cazuela, asado, lamb in the south. This is Sunday and the 18.", es: "La mesa del valle. Empanada, pastel de choclo, cazuela, asado, cordero en el sur. Esto es el domingo y el 18." }),
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
          children: [
            {
              id: "empanada",
              title: loc({ en: "Empanada de pino", es: "Empanada de pino" }),
              hint: loc({ en: "The national bite", es: "El bocado nacional" }),
              lead: loc({ en: "Beef, onion, olive, egg. Not Spain’s empanada. Wait for a clay oven.", es: "Carne, cebolla, aceituna, huevo. No es la de España. Espera horno de barro." }),
              image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
              facts: [
                { title: loc({ en: "Pino", es: "Pino" }), body: loc({ en: "Pino is the filling, not a pine tree.", es: "Pino es el relleno, no un pino." }) },
                { title: loc({ en: "Airport", es: "Aeropuerto" }), body: loc({ en: "The airport one is a lie.", es: "La del aeropuerto es mentira." }) },
              ],
              children: [
                {
                  id: "empanada-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "Fuente de soda", es: "Fuente de soda" }),
                  lead: loc({ en: "A corner oven at lunch. Saturday is better than the 18 queue.", es: "Un horno de esquina al almuerzo. El sábado es mejor que la fila del 18." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                  facts: [
                    { title: loc({ en: "Barrio", es: "Barrio" }), body: loc({ en: "Yungay, Ñuñoa, a club on Sunday. Not Lastarria first.", es: "Yungay, Ñuñoa, un club el domingo. No Lastarria primero." }) },
                  ],
                },
                {
                  id: "empanada-campo",
                  title: loc({ en: "The valley", es: "El valle" }),
                  hint: loc({ en: "Clay oven", es: "Horno de barro" }),
                  lead: loc({ en: "A fundo, a ramada, a wood oven. This is the one you wanted.", es: "Un fundo, una ramada, un horno a leña. Esta es la que querías." }),
                  image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "empanada-18",
                  title: loc({ en: "Dieciocho", es: "El 18" }),
                  hint: loc({ en: "September", es: "Septiembre" }),
                  lead: loc({ en: "Every fuente fills. Order early. The line is the point.", es: "Cada fuente se llena. Pide temprano. La fila es el punto." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "choclo",
              title: loc({ en: "Pastel de choclo", es: "Pastel de choclo" }),
              hint: loc({ en: "Summer in a pan", es: "Verano en fuente" }),
              lead: loc({ en: "Sweet corn crust over savoury pino. Central Valley summer. Winter versions feel frozen.", es: "Costra de choclo dulce sobre pino. Verano del valle. En invierno suele venir congelado." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Sugar", es: "Azúcar" }), body: loc({ en: "A little sugar on top is correct, not a dessert.", es: "Un poco de azúcar arriba es correcto, no es postre." }) },
                { title: loc({ en: "Season", es: "Temporada" }), body: loc({ en: "January–March. The rest of the year is a compromise.", es: "Enero a marzo. El resto del año es un compromiso." }) },
              ],
              children: [
                {
                  id: "choclo-valle",
                  title: loc({ en: "Maipo & Colchagua", es: "Maipo y Colchagua" }),
                  hint: loc({ en: "The right pan", es: "La fuente correcta" }),
                  lead: loc({ en: "A vineyard lunch or a ramada. The crust should blister.", es: "Almuerzo de viña o ramada. La costra tiene que abultarse." }),
                  image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "choclo-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "A good picada", es: "Una buena picada" }),
                  lead: loc({ en: "A neighbourhood cazuela house in summer. Not a hotel buffet tray.", es: "Una cazuela de barrio en verano. No una bandeja de hotel." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "cazuela",
              title: loc({ en: "Cazuela", es: "Cazuela" }),
              hint: loc({ en: "The weekday soup", es: "La sopa de diario" }),
              lead: loc({ en: "Broth, meat, pumpkin, potato, rice. A whole lunch. Beef or chicken — ask.", es: "Caldo, carne, zapallo, papa, arroz. Un almuerzo entero. Vacuno o pollo: pregunta." }),
              image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Rain", es: "Lluvia" }), body: loc({ en: "Santiago eats this when the smog sits low.", es: "Santiago la pide cuando el smog se sienta." }) },
                { title: loc({ en: "South", es: "Sur" }), body: loc({ en: "In the lakes it comes heavier. Same name, more winter.", es: "En los lagos viene más pesada. Mismo nombre, más invierno." }) },
              ],
              children: [
                {
                  id: "cazuela-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "Office lunch", es: "Almuerzo de oficina" }),
                  lead: loc({ en: "A picada with a set menu. The cazuela is the daily, not a tourist special.", es: "Una picada con menú. La cazuela es el diario, no un especial de turista." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "cazuela-sur",
                  title: loc({ en: "Sur", es: "Sur" }),
                  hint: loc({ en: "Temuco to Valdivia", es: "De Temuco a Valdivia" }),
                  lead: loc({ en: "A wet day, a wooden room, a bowl that ends the walk.", es: "Un día mojado, una sala de madera, un plato que cierra la caminata." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "porotos",
              title: loc({ en: "Porotos granados", es: "Porotos granados" }),
              hint: loc({ en: "Summer beans", es: "Porotos de verano" }),
              lead: loc({ en: "Cranberry beans, corn, squash, basil. A January lunch in the valley. Not a winter stew.", es: "Porotos, choclo, zapallo, albahaca. Un almuerzo de enero en el valle. No es un guiso de invierno." }),
              image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Mazorca", es: "Mazorca" }), body: loc({ en: "Fresh corn, not a can. If the beans are from a bag in July, it is another dish.", es: "Choclo fresco, no lata. Si los porotos son de bolsa en julio, es otro plato." }) },
              ],
              children: [
                {
                  id: "porotos-valle",
                  title: loc({ en: "Central valley", es: "Valle central" }),
                  hint: loc({ en: "January table", es: "Mesa de enero" }),
                  lead: loc({ en: "A house lunch. Restaurants do it when the market has choclo.", es: "Un almuerzo de casa. Los restoranes lo hacen cuando la feria tiene choclo." }),
                  image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "porotos-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "A picada in heat", es: "Picada con calor" }),
                  lead: loc({ en: "Ask if it is the day’s pot. Reheated beans are a different mood.", es: "Pregunta si es la olla del día. Los porotos recalentados son otro ánimo." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "humitas",
              title: loc({ en: "Humitas", es: "Humitas" }),
              hint: loc({ en: "Corn in a leaf", es: "Choclo en hoja" }),
              lead: loc({ en: "Fresh corn steamed in its husk. Summer. Savoury, sometimes sugar. Not a Mexican tamal.", es: "Choclo fresco al vapor en su hoja. Verano. Saladas, a veces azúcar. No es un tamal mexicano." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Leaf", es: "Hoja" }), body: loc({ en: "You unwrap it. The leaf is not food.", es: "La abres. La hoja no se come." }) },
              ],
              children: [
                {
                  id: "humitas-valle",
                  title: loc({ en: "Valley summer", es: "Verano del valle" }),
                  hint: loc({ en: "A ramada", es: "Una ramada" }),
                  lead: loc({ en: "Next to a pastel de choclo. Order both if it is January.", es: "Al lado de un pastel de choclo. Pide los dos si es enero." }),
                  image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "charquican",
              title: loc({ en: "Charquicán", es: "Charquicán" }),
              hint: loc({ en: "The mashed plate", es: "El plato pisado" }),
              lead: loc({ en: "Pumpkin, potato, beef or charqui, a fried egg if they like you. A weekday, not a feast.", es: "Zapallo, papa, carne o charqui, un huevo frito si te quieren. Un diario, no una fiesta." }),
              image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Egg", es: "Huevo" }), body: loc({ en: "The egg on top is correct. Skip it if you do not eat egg.", es: "El huevo arriba es correcto. Sáltalo si no comes huevo." }) },
              ],
              children: [
                {
                  id: "charqui-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "A set lunch", es: "Un menú" }),
                  lead: loc({ en: "The picada that still writes it on a chalkboard.", es: "La picada que todavía lo anota en pizarra." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "charqui-sur",
                  title: loc({ en: "South", es: "Sur" }),
                  hint: loc({ en: "Heavier", es: "Más pesado" }),
                  lead: loc({ en: "More potato, more winter. Same name.", es: "Más papa, más invierno. Mismo nombre." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "asado",
              title: loc({ en: "Asado", es: "Asado" }),
              hint: loc({ en: "Sunday", es: "El domingo" }),
              lead: loc({ en: "Fire, meat, salad, and three more hours than you planned. Do not touch the fire.", es: "Fuego, carne, ensalada, y tres horas más de las que pensaste. No toques el fuego." }),
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Host", es: "El asador" }), body: loc({ en: "Bring wine or a salad. The fire is not yours.", es: "Lleva vino o una ensalada. El fuego no es tuyo." }) },
                { title: loc({ en: "Cut", es: "Corte" }), body: loc({ en: "Vacío, prietas, choripán first. The steakhouse rib is another country.", es: "Vacío, prietas, choripán primero. El rib de steakhouse es otro país." }) },
              ],
              children: [
                {
                  id: "asado-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "A backyard", es: "Un patio" }),
                  lead: loc({ en: "Someone’s house, not a resto. If you are invited, you go.", es: "La casa de alguien, no un restorán. Si te invitan, vai." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "asado-sur",
                  title: loc({ en: "Lakes & south", es: "Lagos y sur" }),
                  hint: loc({ en: "A wet fire", es: "Un fuego mojado" }),
                  lead: loc({ en: "The rain does not cancel it. The shed does the work.", es: "La lluvia no lo cancela. El galpón hace el trabajo." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "cordero",
              title: loc({ en: "Cordero al palo", es: "Cordero al palo" }),
              hint: loc({ en: "Patagonia fire", es: "Fuego patagón" }),
              lead: loc({ en: "Lamb on a spit. Hours. If it arrives in twenty minutes, walk.", es: "Cordero al palo. Horas. Si llega en veinte minutos, ándate." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Night", es: "Noche" }), body: loc({ en: "The night before the W, or a Sunday in Magallanes.", es: "La noche antes de la W, o un domingo en Magallanes." }) },
              ],
              children: [
                {
                  id: "cordero-punta",
                  title: loc({ en: "Punta Arenas", es: "Punta Arenas" }),
                  hint: loc({ en: "The spit", es: "El palo" }),
                  lead: loc({ en: "A restaurant that starts the fire at noon. Evening plate.", es: "Un restorán que prende al mediodía. Plato de noche." }),
                  image: "https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "cordero-natales",
                  title: loc({ en: "Puerto Natales", es: "Puerto Natales" }),
                  hint: loc({ en: "Park door", es: "Puerta del parque" }),
                  lead: loc({ en: "Eat it here, not in the refugio. The refugio is pasta.", es: "Cómelo acá, no en el refugio. El refugio es pasta." }),
                  image: "https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "cordero-aysen",
                  title: loc({ en: "Aysén", es: "Aysén" }),
                  hint: loc({ en: "A village spit", es: "Un palo de pueblo" }),
                  lead: loc({ en: "Coyhaique or a road lodge. Same fire, fewer tourists.", es: "Coyhaique o un lodge de ruta. El mismo fuego, menos visita." }),
                  image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "plateada",
              title: loc({ en: "Plateada", es: "Plateada" }),
              hint: loc({ en: "The slow cut", es: "El corte lento" }),
              lead: loc({ en: "A pot roast of the valley. Sunday. Mechada in a roll is the sandwich cousin.", es: "Un asado de olla del valle. Domingo. La mechada en pan es la prima sándwich." }),
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Bread", es: "Pan" }), body: loc({ en: "Leftovers become a sandwich the next day. That is the point.", es: "Las sobras son un sándwich al día siguiente. Ese es el punto." }) },
              ],
              children: [
                {
                  id: "plateada-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "A family pot", es: "Olla de familia" }),
                  lead: loc({ en: "A picada that still does a Sunday plateada. Ask the day before.", es: "Una picada que todavía hace plateada de domingo. Pregunta el día anterior." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "plateada-valle",
                  title: loc({ en: "Wine valleys", es: "Valles del vino" }),
                  hint: loc({ en: "After the tasting", es: "Después de la cata" }),
                  lead: loc({ en: "A heavy lunch. Do not plan a hike at four.", es: "Un almuerzo pesado. No armes un trekking a las cuatro." }),
                  image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
          ],
        },
        {
          id: "fast",
          title: loc({ en: "Fast food", es: "Fast food" }),
          hint: loc({ en: "Fuente de soda", es: "Fuente de soda" }),
          lead: loc({ en: "The Chilean fast table is a counter, not a chain. Vienesas, beef sandwiches, fried dough in the rain.", es: "La mesa rápida chilena es un mesón, no una cadena. Vienesas, sándwich de carne, masa frita cuando llueve." }),
          image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
          children: [
            {
              id: "completos",
              title: loc({ en: "Completos", es: "Completos" }),
              hint: loc({ en: "The Chilean hot dog", es: "La vienesa chilena" }),
              lead: loc({ en: "A vienesa in a bun. The toppings are the country. Fuente de soda, not a tasting menu.", es: "Una vienesa en pan. Los agregados son el país. Fuente de soda, no un menú degustación." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Palta", es: "Palta" }), body: loc({ en: "Avocado. Never aguacate here.", es: "Palta. Acá no se dice aguacate." }) },
              ],
              children: [
                {
                  id: "italiano",
                  title: loc({ en: "Completo italiano", es: "Completo italiano" }),
                  hint: loc({ en: "Italian flag, not Italy", es: "Bandera italiana, no Italia" }),
                  lead: loc({ en: "Palta, tomato, mayo. The colours of Italy. The taste is Chilean.", es: "Palta, tomate, mayo. Los colores de Italia. El gusto es chileno." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                  facts: [
                    { title: loc({ en: "Mayo", es: "Mayo" }), body: loc({ en: "They put more than you expect. That is correct.", es: "Ponen más de la que esperas. Así es." }) },
                    { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Santiago counters, Valpo at night, every fuente on the Alameda.", es: "Mesones de Santiago, Valpo de noche, cada fuente en la Alameda." }) },
                  ],
                },
                {
                  id: "dinamico",
                  title: loc({ en: "Completo dinámico", es: "Completo dinámico" }),
                  hint: loc({ en: "The loaded one", es: "El cargado" }),
                  lead: loc({ en: "Italiano plus sauerkraut, chili, green sauce. A mess. A late plate.", es: "Italiano más chucrut, chili, salsa verde. Un desastre. Un plato de tarde." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                  facts: [
                    { title: loc({ en: "Napkins", es: "Servilletas" }), body: loc({ en: "Take the pile. Eat standing if the table is full.", es: "Lleva el fajo. Come de pie si la mesa está llena." }) },
                  ],
                },
                {
                  id: "completo-simple",
                  title: loc({ en: "Completo", es: "Completo" }),
                  hint: loc({ en: "Ketchup and mustard", es: "Ketchup y mostaza" }),
                  lead: loc({ en: "The base. Say italiano if you want the Chilean one. Completo alone is quieter.", es: "La base. Di italiano si quieres el chileno. Completo solo es más quieto." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "completo-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "The counters", es: "Los mesones" }),
                  lead: loc({ en: "Fuente Alemana, local counters in Ñuñoa and downtown. Lunch and after midnight.", es: "Fuente Alemana, mesones de Ñuñoa y el centro. Almuerzo y después de medianoche." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                  facts: [
                    { title: loc({ en: "Line", es: "Fila" }), body: loc({ en: "A queue at a fuente is a good sign. A plastic menu in English is not.", es: "Una fila en una fuente es buen signo. Una carta de plástico en inglés no." }) },
                  ],
                },
                {
                  id: "completo-valpo",
                  title: loc({ en: "Valparaíso", es: "Valparaíso" }),
                  hint: loc({ en: "Night", es: "De noche" }),
                  lead: loc({ en: "After the cerros. A counter near the port, not a B&B breakfast.", es: "Después de los cerros. Un mesón cerca del puerto, no el desayuno del B&B." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "churrascos",
              title: loc({ en: "Churrascos", es: "Churrascos" }),
              hint: loc({ en: "The beef sandwich", es: "El sándwich de carne" }),
              lead: loc({ en: "Thin beef on a bun. The name of the topping is the order. A fuente, a lunch, a hangover.", es: "Carne delgada en pan. El nombre del agregado es el pedido. Una fuente, un almuerzo, un día después." }),
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Bread", es: "Pan" }), body: loc({ en: "Marraqueta or a soft bun. Ask. The bread is half the sandwich.", es: "Marraqueta o pan suave. Pregunta. El pan es la mitad del sándwich." }) },
              ],
              children: [
                {
                  id: "churrasco-italiano",
                  title: loc({ en: "Churrasco italiano", es: "Churrasco italiano" }),
                  hint: loc({ en: "Same flag", es: "La misma bandera" }),
                  lead: loc({ en: "Beef, palta, tomato, mayo. The completo’s older cousin.", es: "Carne, palta, tomate, mayo. El primo mayor del completo." }),
                  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
                },
                {
                  id: "luco",
                  title: loc({ en: "Barros Luco", es: "Barros Luco" }),
                  hint: loc({ en: "Beef and melted cheese", es: "Carne y queso fundido" }),
                  lead: loc({ en: "Named after a president who ate this. No salad required.", es: "Lleva el nombre de un presidente que lo comía. No pide ensalada." }),
                  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Cheese", es: "Queso" }), body: loc({ en: "It should drip. If it is a cold slice, send it back with your eyes.", es: "Tiene que chorrear. Si es una lámina fría, devuélvelo con la mirada." }) },
                  ],
                },
                {
                  id: "jarpa",
                  title: loc({ en: "Barros Jarpa", es: "Barros Jarpa" }),
                  hint: loc({ en: "Ham and cheese", es: "Jamón y queso" }),
                  lead: loc({ en: "The Luco without the beef. A quieter lunch.", es: "El Luco sin la carne. Un almuerzo más quieto." }),
                  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
                },
                {
                  id: "chacarero",
                  title: loc({ en: "Chacarero", es: "Chacarero" }),
                  hint: loc({ en: "Green beans and tomato", es: "Porotos verdes y tomate" }),
                  lead: loc({ en: "Beef, green beans, tomato, chili. A summer sandwich. The beans should snap.", es: "Carne, porotos verdes, tomate, ají. Un sándwich de verano. El poroto tiene que crocantear." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "pobre",
                  title: loc({ en: "Churrasco a lo pobre", es: "Churrasco a lo pobre" }),
                  hint: loc({ en: "Egg, onion, fries", es: "Huevo, cebolla, papas" }),
                  lead: loc({ en: "Not poor. Onion, fried egg, fries on the beef. A full lunch in a bun — or on a plate.", es: "No es pobre. Cebolla, huevo frito, papas sobre la carne. Un almuerzo entero en pan — o en plato." }),
                  image: "https://images.unsplash.com/photo-1573080494122-16fd4d324d28?auto=format&fit=crop&w=1400&q=80",
                },
                {
                  id: "churrasco-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "Fuente and Fuente", es: "Fuente y fuente" }),
                  lead: loc({ en: "Downtown and Providencia counters. Say the full name: churrasco italiano, not ‘a sandwich’.", es: "Mesones del centro y Providencia. Di el nombre entero: churrasco italiano, no «un sándwich»." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "sopaipillas",
              title: loc({ en: "Sopaipillas", es: "Sopaipillas" }),
              hint: loc({ en: "Rain food", es: "Comida de lluvia" }),
              lead: loc({ en: "Fried pumpkin dough. Pebre when it rains in Santiago. Chancaca in the south.", es: "Masa de zapallo frita. Pebre cuando llueve en Santiago. Chancaca en el sur." }),
              facts: [
                { title: loc({ en: "Street", es: "Calle" }), body: loc({ en: "A pasacalle with a pot of oil. Follow the rain.", es: "Un pasacalle con un pote de aceite. Sigue la lluvia." }) },
              ],
              children: [
                {
                  id: "sopa-pebre",
                  title: loc({ en: "Con pebre", es: "Con pebre" }),
                  hint: loc({ en: "Santiago rain", es: "Lluvia de Santiago" }),
                  lead: loc({ en: "Savoury. Tomato, onion, chili, coriander. Eat standing. The paper soaks.", es: "Salada. Tomate, cebolla, ají, cilantro. Come de pie. El papel se empapa." }),
                  facts: [
                    { title: loc({ en: "Rain", es: "Lluvia" }), body: loc({ en: "The city decides. A dry January has fewer pots on the corner.", es: "La ciudad decide. Un enero seco tiene menos potes en la esquina." }) },
                  ],
                },
                {
                  id: "sopa-chancaca",
                  title: loc({ en: "Con chancaca", es: "Con chancaca" }),
                  hint: loc({ en: "The south, sweet", es: "El sur, dulce" }),
                  lead: loc({ en: "A dark sugar syrup. Same dough, other country. Lakes and the far south.", es: "Un jarabe de chancaca. Misma masa, otro país. Lagos y el sur largo." }),
                },
                {
                  id: "sopa-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "The corner pot", es: "El pote de esquina" }),
                  lead: loc({ en: "When it rains, the street sells them. Pebre. Cash.", es: "Cuando llueve, la calle las vende. Pebre. Efectivo." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "sopa-sur",
                  title: loc({ en: "Sur", es: "Sur" }),
                  hint: loc({ en: "Chancaca country", es: "País chancaca" }),
                  lead: loc({ en: "Temuco, Valdivia, the lakes. Sweet first. Pebre if you ask.", es: "Temuco, Valdivia, los lagos. Dulce primero. Pebre si pides." }),
                  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "chorrillana",
              title: loc({ en: "Chorrillana", es: "Chorrillana" }),
              hint: loc({ en: "Valparaíso late", es: "Valparaíso de noche" }),
              lead: loc({ en: "Fries, onion, egg, strips of beef. A table, not a plate. Order one for two.", es: "Papas, cebolla, huevo, tiras de carne. Una mesa, no un plato. Pide una para dos." }),
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Share", es: "Para compartir" }), body: loc({ en: "Or don’t, and sleep.", es: "O no, y duerme." }) },
                { title: loc({ en: "Port", es: "Puerto" }), body: loc({ en: "Born in Valparaíso bars after the shift.", es: "Nació en bares de Valparaíso después del turno." }) },
              ],
              children: [
                {
                  id: "chorri-valpo",
                  title: loc({ en: "Valparaíso", es: "Valparaíso" }),
                  hint: loc({ en: "The original mess", es: "El desastre original" }),
                  lead: loc({ en: "A bar on a cerro or downtown. Night. Beer, not a pisco sour.", es: "Un bar en un cerro o en el plan. Noche. Cerveza, no un pisco sour." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "chorri-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "The copy", es: "La copia" }),
                  lead: loc({ en: "Every pub does one. Fine. The port still owns the name.", es: "Cada pub hace una. Sirve. El puerto sigue dueño del nombre." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
            {
              id: "lomito",
              title: loc({ en: "Lomito", es: "Lomito" }),
              hint: loc({ en: "The pork cousin", es: "El primo de cerdo" }),
              lead: loc({ en: "Slow pork in a bun. Italiano works here too. A fuente lunch that is not a completo.", es: "Cerdo lento en pan. El italiano también vale. Un almuerzo de fuente que no es un completo." }),
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Juice", es: "Jugo" }), body: loc({ en: "The pork should wet the bread. Dry lomito is leftover.", es: "El cerdo tiene que mojar el pan. El lomito seco es sobra." }) },
              ],
              children: [
                {
                  id: "lomito-scl",
                  title: loc({ en: "Santiago", es: "Santiago" }),
                  hint: loc({ en: "The pork counter", es: "El mesón de cerdo" }),
                  lead: loc({ en: "Same fuentes as the completo. Say lomito italiano.", es: "Las mismas fuentes que el completo. Di lomito italiano." }),
                  image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
                },
                {
                  id: "lomito-valpo",
                  title: loc({ en: "Valparaíso", es: "Valparaíso" }),
                  hint: loc({ en: "Port pork", es: "Cerdo de puerto" }),
                  lead: loc({ en: "A lunch before the cerros. Heavy. Plan the walk after.", es: "Un almuerzo antes de los cerros. Pesado. Deja el cerro para después." }),
                  image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "drinks",
      title: loc({ en: "Drinks", es: "Bebestibles" }),
      hint: loc({ en: "Pisco and after", es: "Pisco y después" }),
      lead: loc({ en: "Pisco is not Peru’s fight at the table. It is the bottle in front of you.", es: "El pisco no es la pelea con Perú en la mesa. Es la botella de adelante." }),
      children: [
        {
          id: "sour",
          title: loc({ en: "Pisco sour", es: "Pisco sour" }),
          hint: loc({ en: "The welcome", es: "La bienvenida" }),
          lead: loc({ en: "Pisco, lime, sugar, egg white. Elqui in a glass.", es: "Pisco, limón, azúcar, clara. Elqui en un vaso." }),
          focus: "object-center",
          facts: [
            { title: loc({ en: "35°", es: "35°" }), body: loc({ en: "A decent bottle says 35 or 40. Skip the supermarket mystery.", es: "Una botella decente dice 35 o 40. Salta el misterio de supermercado." }) },
            { title: loc({ en: "Egg", es: "Huevo" }), body: loc({ en: "Classic sour uses white. Skip it if you don’t eat egg.", es: "El sour clásico lleva clara. Sáltalo si no comes huevo." }) },
            { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Elqui and Limarí. Not a Casablanca Cabernet.", es: "Elqui y Limarí. No un Cabernet de Casablanca." }) },
          ],
        },
        {
          id: "piscola",
          title: loc({ en: "Piscola", es: "Piscola" }),
          hint: loc({ en: "The everyday", es: "La de todos los días" }),
          lead: loc({ en: "Pisco and cola. Ice. A long night.", es: "Pisco y cola. Hielo. Una noche larga." }),
          image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1400&q=80",
          facts: [
            { title: loc({ en: "Ratio", es: "La medida" }), body: loc({ en: "They pour. You don’t measure like a bar in New York.", es: "Ellos sirven. No se mide como un bar en Nueva York." }) },
            { title: loc({ en: "Brand", es: "Marca" }), body: loc({ en: "Alto del Carmen, Mistral, Capel — pick one and stay.", es: "Alto del Carmen, Mistral, Capel: elige una y quédate." }) },
          ],
        },
        {
          id: "terremoto",
          title: loc({ en: "Terremoto", es: "Terremoto" }),
          hint: loc({ en: "Pipeño + ice cream", es: "Pipeño con helado" }),
          lead: loc({ en: "Pipeño wine, pineapple ice cream. The aftershock is the second glass.", es: "Pipeño, helado de piña. La réplica es el segundo vaso." }),
          facts: [
            { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Born after the 1985 quake. It knocks you the same way.", es: "Nació después del terremoto del 85. Tira igual." }) },
            { title: loc({ en: "Bar", es: "Bar" }), body: loc({ en: "A cheap bar in Santiago or Valparaíso. Not a lodge.", es: "Bar barato en Santiago o Valparaíso. No un lodge." }) },
          ],
        },
        {
          id: "mote",
          title: loc({ en: "Mote con huesillo", es: "Mote con huesillo" }),
          hint: loc({ en: "Summer street", es: "La calle en verano" }),
          lead: loc({ en: "Dried peach, wheat, sweet juice. A cup, not a cocktail.", es: "Durazno seco, trigo, jugo dulce. Un vaso, no un cocktail." }),
          image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
          facts: [
            { title: loc({ en: "Cart", es: "Carrito" }), body: loc({ en: "Buy it from a street cart. The mall one is a cousin.", es: "Cómpralo en carrito. El del mall es primo." }) },
            { title: loc({ en: "Heat", es: "Calor" }), body: loc({ en: "January in Santiago. This is the air conditioner.", es: "Enero en Santiago. Esto es el aire acondicionado." }) },
          ],
        },
        {
          id: "carmenere",
          title: loc({ en: "Carménère", es: "Carménère" }),
          hint: loc({ en: "The grape Chile kept", es: "La cepa que Chile guardó" }),
          lead: loc({ en: "France thought it was dead. Maipo and Colchagua kept it.", es: "Francia la daba por muerta. Maipo y Colchagua la guardaron." }),
          image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80",
          facts: [
            { title: loc({ en: "Valley", es: "Valle" }), body: loc({ en: "Maipo, Colchagua, Casablanca for whites nearby.", es: "Maipo, Colchagua; Casablanca para los blancos al lado." }) },
            { title: loc({ en: "Taste", es: "Gusto" }), body: loc({ en: "Green pepper if the year was cool. That is the grape talking.", es: "Pimentón si el año fue frío. Es la cepa hablando." }) },
          ],
        },
        {
          id: "jote",
          title: loc({ en: "Jote", es: "Jote" }),
          hint: loc({ en: "Wine + cola", es: "Vino con cola" }),
          lead: loc({ en: "Red wine and cola. Student fuel.", es: "Vino tinto y cola. Combustible de estudiante." }),
          image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1400&q=80",
          facts: [
            { title: loc({ en: "Cheap", es: "Barato" }), body: loc({ en: "Do not order this in a tasting room.", es: "No lo pidas en una cata." }) },
          ],
        },
        {
          id: "navegado",
          title: loc({ en: "Navegado", es: "Navegado" }),
          hint: loc({ en: "Winter wine", es: "Vino de invierno" }),
          lead: loc({ en: "Warm red wine, orange, spices. Rain in the valley.", es: "Vino tinto caliente, naranja, especias. Lluvia en el valle." }),
          image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80",
          facts: [
            { title: loc({ en: "Cold", es: "Frío" }), body: loc({ en: "July in the Central Valley. Not a pisco night.", es: "Julio en el valle. No es noche de pisco." }) },
          ],
        },
        {
          id: "colademono",
          title: loc({ en: "Cola de mono", es: "Cola de mono" }),
          hint: loc({ en: "Christmas", es: "Navidad" }),
          lead: loc({ en: "Milk, coffee, cloves, aguardiente. December only, really.", es: "Leche, café, clavo, aguardiente. Diciembre, en serio." }),
          facts: [
            { title: loc({ en: "Family", es: "Familia" }), body: loc({ en: "Someone’s grandmother made it. Accept the cup.", es: "Lo hizo la abuela de alguien. Acepta el vaso." }) },
          ],
        },
      ],
    },
    {
      id: "games",
      title: loc({ en: "Games", es: "Juegos" }),
      hint: loc({ en: "The 18th, and after", es: "El 18, y después" }),
      lead: loc({ en: "Chilean play is a backyard, a plaza, a 18 de septiembre.", es: "El juego chileno es patio, plaza, un 18." }),
      children: [
        {
          id: "trompo",
          title: loc({ en: "Trompo", es: "Trompo" }),
          hint: loc({ en: "The wooden top", es: "El pion" }),
          lead: loc({ en: "A wooden top and a string. The plaza still knows.", es: "Madera y piola. La plaza todavía sabe." }),
          facts: [
            { title: loc({ en: "How", es: "Cómo" }), body: loc({ en: "Wind the string, throw, and hope it stands.", es: "Enrolla la piola, tira, y espera que se pare." }) },
            { title: loc({ en: "18", es: "El 18" }), body: loc({ en: "Fondas fill with kids and the smell of oil.", es: "Las fondas se llenan de cabros y olor a aceite." }) },
          ],
        },
        {
          id: "rayuela",
          title: loc({ en: "Rayuela", es: "Rayuela" }),
          hint: loc({ en: "The tejo", es: "El tejo" }),
          lead: loc({ en: "A metal disc, a box of clay, a line in the dirt.", es: "Un tejo, una cajón de greda, una raya en la tierra." }),
          image: "https://images.unsplash.com/photo-1661547231185-8cd274de670e?auto=format&fit=crop&w=1600&q=80",
          facts: [
            { title: loc({ en: "Aim", es: "La pinta" }), body: loc({ en: "Land on the cachimba. That is the point.", es: "Cae en la cachimba. Ese es el punto." }) },
            { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "A club behind a football field, a fonda, a backyard.", es: "Un club detrás de la cancha, una fonda, un patio." }) },
          ],
        },
        {
          id: "emboque",
          title: loc({ en: "Emboque", es: "Emboque" }),
          hint: loc({ en: "Cup and ball", es: "Argolla y palo" }),
          lead: loc({ en: "A wooden cup on a string. Catch it. Again.", es: "Una argolla en una piola. Atrápalo. Otra vez." }),
          facts: [
            { title: loc({ en: "Hands", es: "Manos" }), body: loc({ en: "It looks easy. It is not, after the terremoto.", es: "Se ve fácil. No lo es, después del terremoto." }) },
          ],
        },
        {
          id: "volantin",
          title: loc({ en: "Volantín", es: "Volantín" }),
          hint: loc({ en: "September sky", es: "Cielo de septiembre" }),
          lead: loc({ en: "A kite with a tail. The 18th belongs to the wind.", es: "Un volantín con cola. El 18 es del viento." }),
          facts: [
            { title: loc({ en: "Hilo", es: "Hilo" }), body: loc({ en: "Glass-coated string is illegal and still happens. Don’t.", es: "El hilo curado es ilegal y igual aparece. No." }) },
            { title: loc({ en: "Roof", es: "Techumbre" }), body: loc({ en: "Every September a kite dies on a Santiago roof.", es: "Cada septiembre un volantín se muere en un techo." }) },
          ],
        },
        {
          id: "luche",
          title: loc({ en: "Luche", es: "Luche" }),
          hint: loc({ en: "Hopscotch", es: "La rayuela del piso" }),
          lead: loc({ en: "Squares on the ground. A stone. One foot.", es: "Cuadros en el piso. Una piedra. Un pie." }),
          image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
          facts: [
            { title: loc({ en: "School", es: "Colegio" }), body: loc({ en: "Recess in every Chilean school still draws it.", es: "El recreo de cada colegio todavía lo dibuja." }) },
          ],
        },
        {
          id: "palo",
          title: loc({ en: "Palo encebado", es: "Palo encebado" }),
          hint: loc({ en: "The greased pole", es: "El palo con grasa" }),
          lead: loc({ en: "Climb a soaped pole for a prize at the fonda.", es: "Sube un palo enjabonado por un premio en la fonda." }),
          image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
          facts: [
            { title: loc({ en: "18", es: "El 18" }), body: loc({ en: "Someone always makes it. Everyone else laughs.", es: "Alguien siempre llega. El resto se ríe." }) },
          ],
        },
      ],
    },
    {
      id: "sports",
      title: loc({ en: "Sports", es: "Deportes" }),
      hint: loc({ en: "Shirts and hills", es: "Camisetas y cerros" }),
      lead: loc({ en: "Football first. Then the ones Chile actually plays.", es: "El fútbol primero. Después los que Chile sí juega." }),
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
      children: [
        {
          id: "futbol",
          title: loc({ en: "Football", es: "Fútbol" }),
          hint: loc({ en: "The country stops", es: "El país para" }),
          lead: loc({ en: "Saturday at 4. A radio in a Copec. Pick a shirt and don’t switch.", es: "Sábado a las 4. Una radio en un Copec. Elige una camiseta y no cambies." }),
          image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
          facts: [
            { title: loc({ en: "League", es: "La liga" }), body: loc({ en: "Campeonato Nacional. Summer is when it bites.", es: "Campeonato Nacional. El verano es cuando muerde." }) },
            { title: loc({ en: "Clásico", es: "Clásico" }), body: loc({ en: "Colo-Colo vs La U is the one that empties the street.", es: "Colo-Colo contra La U es el que vacía la calle." }) },
          ],
          children: [
            {
              id: "colo",
              title: loc({ en: "Colo-Colo", es: "Colo-Colo" }),
              hint: loc({ en: "The Cacique", es: "El Cacique" }),
              lead: loc({ en: "The popular shirt. Macul turns white and black.", es: "La camiseta popular. Macul se pone blanco y negro." }),
              image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
              colors: [
                { hex: "#FFFFFF", name: loc({ en: "White", es: "Blanco" }) },
                { hex: "#111111", name: loc({ en: "Black", es: "Negro" }) },
                { hex: "#C8102E", name: loc({ en: "Red", es: "Rojo" }) },
              ],
              stats: [
                { label: loc({ en: "Founded", es: "Fundación" }), value: "19.04.1925" },
                { label: loc({ en: "Libertadores", es: "Libertadores" }), value: "1991" },
                { label: loc({ en: "Fans", es: "Hinchada" }), value: "42%" },
              ],
              facts: [
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Estadio Monumental David Arellano.", es: "Estadio Monumental David Arellano." }) },
                { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "About 47.347.", es: "Unos 47.347." }) },
                { title: loc({ en: "Who", es: "Quién" }), body: loc({ en: "Arellano founded the club and died playing. The stand is not a marketing name.", es: "Arellano fundó el club y se murió jugando. La tribuna no es un nombre de marketing." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "El Cacique. The barra is Garra Blanca.", es: "El Cacique. La barra es Garra Blanca." }) },
                { title: loc({ en: "How many", es: "Cuántos" }), body: loc({ en: "Adimark 2017: about 42%. First, by a distance.", es: "Adimark 2017: alrededor del 42%. Primera, de lejos." }) },
              ],
              children: [
                {
                  id: "monumental-colo",
                  title: loc({ en: "Monumental", es: "Monumental" }),
                  hint: loc({ en: "Macul", es: "Macul" }),
                  lead: loc({ en: "David Arellano’s ground. A neighbourhood that shakes.", es: "La cancha de David Arellano. Un barrio que tiembla." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Estadio Monumental David Arellano.", es: "Estadio Monumental David Arellano." }) },
                    { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "About 47.347.", es: "Unos 47.347." }) },
                    { title: loc({ en: "Who", es: "Quién" }), body: loc({ en: "Arellano founded the club and died playing. The stand is not a marketing name.", es: "Arellano fundó el club y se murió jugando. La tribuna no es un nombre de marketing." }) },
                  ],
                },
                {
                  id: "garra",
                  title: loc({ en: "Garra Blanca", es: "Garra Blanca" }),
                  hint: loc({ en: "The stand", es: "La tribuna" }),
                  lead: loc({ en: "The largest shirt in Chile. Do not wear green that day.", es: "La camiseta más grande de Chile. Ese día no uses verde." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "El Cacique. The barra is Garra Blanca.", es: "El Cacique. La barra es Garra Blanca." }) },
                    { title: loc({ en: "How many", es: "Cuántos" }), body: loc({ en: "Adimark 2017: about 42%. First, by a distance.", es: "Adimark 2017: alrededor del 42%. Primera, de lejos." }) },
                  ],
                },
              ],
            },
            {
              id: "u",
              title: loc({ en: "Universidad de Chile", es: "Universidad de Chile" }),
              hint: loc({ en: "La U", es: "La U" }),
              lead: loc({ en: "Blue. The other half of Santiago.", es: "Azul. La otra mitad de Santiago." }),
              image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
              colors: [
                { hex: "#003DA5", name: loc({ en: "Blue", es: "Azul" }) },
                { hex: "#E30613", name: loc({ en: "Red", es: "Rojo" }) },
                { hex: "#FFFFFF", name: loc({ en: "White", es: "Blanco" }) },
              ],
              stats: [
                { label: loc({ en: "Founded", es: "Fundación" }), value: "24.05.1927" },
                { label: loc({ en: "Sudamericana", es: "Sudamericana" }), value: "2011" },
                { label: loc({ en: "Fans", es: "Hinchada" }), value: "21%" },
              ],
              facts: [
                { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "About 48.665.", es: "Unos 48.665." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Julio Martínez Prádanos. People say Nacional.", es: "Julio Martínez Prádanos. La gente dice Nacional." }) },
                { title: loc({ en: "Home", es: "Casa" }), body: loc({ en: "La U borrows it. A new house has been a rumour for years.", es: "La U lo pide prestado. La casa propia es rumor de años." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "La U. The barra is Los de Abajo.", es: "La U. La barra es Los de Abajo." }) },
                { title: loc({ en: "How many", es: "Cuántos" }), body: loc({ en: "Adimark 2017: about 21%. Second.", es: "Adimark 2017: alrededor del 21%. Segunda." }) },
              ],
              children: [
                {
                  id: "nacional-u",
                  title: loc({ en: "Estadio Nacional", es: "Estadio Nacional" }),
                  hint: loc({ en: "Ñuñoa — borrowed", es: "Ñuñoa — prestado" }),
                  lead: loc({ en: "They do not own it. They fill it.", es: "No es de ellos. Lo llenan." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "About 48.665.", es: "Unos 48.665." }) },
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Julio Martínez Prádanos. People say Nacional.", es: "Julio Martínez Prádanos. La gente dice Nacional." }) },
                    { title: loc({ en: "Home", es: "Casa" }), body: loc({ en: "La U borrows it. A new house has been a rumour for years.", es: "La U lo pide prestado. La casa propia es rumor de años." }) },
                  ],
                },
                {
                  id: "abajo",
                  title: loc({ en: "Los de Abajo", es: "Los de Abajo" }),
                  hint: loc({ en: "The stand", es: "La tribuna" }),
                  lead: loc({ en: "Second shirt in the country. Romántico Viajero when they tour.", es: "Segunda camiseta del país. Romántico Viajero cuando salen." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "La U. The barra is Los de Abajo.", es: "La U. La barra es Los de Abajo." }) },
                    { title: loc({ en: "How many", es: "Cuántos" }), body: loc({ en: "Adimark 2017: about 21%. Second.", es: "Adimark 2017: alrededor del 21%. Segunda." }) },
                  ],
                },
              ],
            },
            {
              id: "catolica",
              title: loc({ en: "Universidad Católica", es: "Universidad Católica" }),
              hint: loc({ en: "Cruzados", es: "Cruzados" }),
              lead: loc({ en: "White, blue, a cross. The hill in Las Condes.", es: "Blanco, azul, una cruz. El cerro en Las Condes." }),
              image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
              colors: [
                { hex: "#FFFFFF", name: loc({ en: "White", es: "Blanco" }) },
                { hex: "#0033A0", name: loc({ en: "Blue", es: "Azul" }) },
                { hex: "#E30613", name: loc({ en: "Red", es: "Rojo" }) },
              ],
              stats: [
                { label: loc({ en: "Founded", es: "Fundación" }), value: "21.04.1937" },
                { label: loc({ en: "League", es: "Liga" }), value: "16" },
                { label: loc({ en: "Fans", es: "Hinchada" }), value: "8%" },
              ],
              facts: [
                { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Av. Las Flores 13.000, Las Condes. Almost 1.000 m up.", es: "Av. Las Flores 13.000, Las Condes. Casi 1.000 m de altura." }) },
                { title: loc({ en: "Opened", es: "Inauguración" }), body: loc({ en: "4 September 1988. Reopened 23 August 2025.", es: "4 de septiembre de 1988. Reinaugurado el 23 de agosto de 2025." }) },
                { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "20.249 seated. The old boards are gone.", es: "20.249 sentados. Los tablones se fueron." }) },
                { title: loc({ en: "First night", es: "La primera noche" }), body: loc({ en: "2–0 v Unión Española. Zampedri scored first. 20.141 inside.", es: "2-0 a Unión Española. Zampedri abrió. 20.141 adentro." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Claro Arena on the shirt. People still say San Carlos.", es: "Claro Arena en la camiseta. La gente igual dice San Carlos." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Los Cruzados. Also La Franja, UC.", es: "Los Cruzados. También La Franja, UC." }) },
              ],
              children: [
                {
                  id: "claro-arena",
                  title: loc({ en: "Claro Arena", es: "Claro Arena" }),
                  hint: loc({ en: "San Carlos, new bowl", es: "San Carlos, el bowl nuevo" }),
                  lead: loc({ en: "The old San Carlos. The new Claro Arena. Same hill, 20.249 seats.", es: "El viejo San Carlos. El nuevo Claro Arena. El mismo cerro, 20.249 asientos." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Av. Las Flores 13.000, Las Condes. Almost 1.000 m up.", es: "Av. Las Flores 13.000, Las Condes. Casi 1.000 m de altura." }) },
                    { title: loc({ en: "Opened", es: "Inauguración" }), body: loc({ en: "4 September 1988. Reopened 23 August 2025.", es: "4 de septiembre de 1988. Reinaugurado el 23 de agosto de 2025." }) },
                    { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "20.249 seated. The old boards are gone.", es: "20.249 sentados. Los tablones se fueron." }) },
                    { title: loc({ en: "First night", es: "La primera noche" }), body: loc({ en: "2–0 v Unión Española. Zampedri scored first. 20.141 inside.", es: "2-0 a Unión Española. Zampedri abrió. 20.141 adentro." }) },
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Claro Arena on the shirt. People still say San Carlos.", es: "Claro Arena en la camiseta. La gente igual dice San Carlos." }) },
                  ],
                },
                {
                  id: "cruzados-barra",
                  title: loc({ en: "Los Cruzados", es: "Los Cruzados" }),
                  hint: loc({ en: "The stand", es: "La tribuna" }),
                  lead: loc({ en: "The barra was born in 1992. The third shirt in the country.", es: "La barra nace en 1992. La tercera camiseta del país." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Los Cruzados. Also La Franja, UC.", es: "Los Cruzados. También La Franja, UC." }) },
                    { title: loc({ en: "How many", es: "Cuántos" }), body: loc({ en: "Polls put Católica around 8–13%. Third, after Colo-Colo and La U.", es: "Las encuestas la dejan en 8–13%. Tercera, detrás de Colo-Colo y La U." }) },
                    { title: loc({ en: "2017", es: "2017" }), body: loc({ en: "Adimark: Colo-Colo 42%, La U 21%, Católica 8%.", es: "Adimark: Colo-Colo 42%, La U 21%, Católica 8%." }) },
                    { title: loc({ en: "The night", es: "La noche" }), body: loc({ en: "Flags on every seat. The 1937 banner. Smoke in Cruzado blue.", es: "Una bandera en cada asiento. El lienzo 1937. Humo azul cruzado." }) },
                  ],
                },
                {
                  id: "colores-uc",
                  title: loc({ en: "Colours", es: "Colores" }),
                  hint: loc({ en: "The crest", es: "El escudo" }),
                  lead: loc({ en: "A white pennant, a blue cross, red letters. Medieval on purpose.", es: "Un banderín blanco, una cruz azul, letras rojas. Medieval a propósito." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Shirt", es: "Camiseta" }), body: loc({ en: "White with a blue stripe. La Franja is the stripe.", es: "Blanca con una franja azul. La Franja es la franja." }) },
                    { title: loc({ en: "Crest", es: "Escudo" }), body: loc({ en: "CDUC in red. The cross is the crusade, not a church window.", es: "CDUC en rojo. La cruz es la cruzada, no un vitral." }) },
                    { title: loc({ en: "Motto", es: "Lema" }), body: loc({ en: "Por la Patria, Dios y la Universidad.", es: "Por la Patria, Dios y la Universidad." }) },
                  ],
                },
                {
                  id: "clasico-uc",
                  title: loc({ en: "Clásico Universitario", es: "Clásico Universitario" }),
                  hint: loc({ en: "v La U", es: "Contra La U" }),
                  lead: loc({ en: "The oldest university derby. Not the Superclásico. This one has a library.", es: "El clásico universitario más viejo. No es el Superclásico. Este tiene biblioteca." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Who", es: "Quién" }), body: loc({ en: "Universidad Católica v Universidad de Chile.", es: "Universidad Católica contra Universidad de Chile." }) },
                    { title: loc({ en: "First", es: "El primero" }), body: loc({ en: "1909, Cancha del Carmen. They already hated the result.", es: "1909, Cancha del Carmen. Ya odiaban el marcador." }) },
                    { title: loc({ en: "House", es: "Casa" }), body: loc({ en: "For years Las Condes banned it at San Carlos. It came back.", es: "Años Las Condes lo vetó en San Carlos. Volvió." }) },
                  ],
                },
              ],
            },
            {
              id: "wanderers",
              title: loc({ en: "Santiago Wanderers", es: "Santiago Wanderers" }),
              hint: loc({ en: "The dean, 1892", es: "El Decano, 1892" }),
              lead: loc({ en: "Valparaíso, not Santiago. Green of the port.", es: "Valparaíso, no Santiago. Verde del puerto." }),
              image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
              colors: [
                { hex: "#009A44", name: loc({ en: "Green", es: "Verde" }) },
                { hex: "#FFFFFF", name: loc({ en: "White", es: "Blanco" }) },
              ],
              stats: [
                { label: loc({ en: "Founded", es: "Fundación" }), value: "15.08.1892" },
                { label: loc({ en: "League", es: "Liga" }), value: "3" },
                { label: loc({ en: "City", es: "Ciudad" }), value: "Valparaíso" },
              ],
              facts: [
                { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "25.568.", es: "25.568." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Elías Figueroa Brander — the best Chilean to play.", es: "Elías Figueroa Brander: el mejor chileno que jugó." }) },
                { title: loc({ en: "City", es: "Ciudad" }), body: loc({ en: "They are Valparaíso. The Santiago in the name is a 19th-century dodge.", es: "Son Valparaíso. El Santiago del nombre es un truco del siglo XIX." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Caturros, Panzers, Porteños, Decano.", es: "Caturros, Panzers, Porteños, Decano." }) },
                { title: loc({ en: "City", es: "Ciudad" }), body: loc({ en: "Intangible heritage of Valparaíso, 2007.", es: "Patrimonio intangible de Valparaíso, 2007." }) },
              ],
              children: [
                {
                  id: "figueroa-w",
                  title: loc({ en: "Elías Figueroa", es: "Elías Figueroa" }),
                  hint: loc({ en: "Playa Ancha", es: "Playa Ancha" }),
                  lead: loc({ en: "The Pacific behind one stand. 25.568 seats.", es: "El Pacífico detrás de una tribuna. 25.568 asientos." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "25.568.", es: "25.568." }) },
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Elías Figueroa Brander — the best Chilean to play.", es: "Elías Figueroa Brander: el mejor chileno que jugó." }) },
                    { title: loc({ en: "City", es: "Ciudad" }), body: loc({ en: "They are Valparaíso. The Santiago in the name is a 19th-century dodge.", es: "Son Valparaíso. El Santiago del nombre es un truco del siglo XIX." }) },
                  ],
                },
                {
                  id: "panzers",
                  title: loc({ en: "Los Panzers", es: "Los Panzers" }),
                  hint: loc({ en: "Caturros", es: "Caturros" }),
                  lead: loc({ en: "The dean’s stand. Heritage of the port.", es: "La tribuna del Decano. Patrimonio del puerto." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Caturros, Panzers, Porteños, Decano.", es: "Caturros, Panzers, Porteños, Decano." }) },
                    { title: loc({ en: "City", es: "Ciudad" }), body: loc({ en: "Intangible heritage of Valparaíso, 2007.", es: "Patrimonio intangible de Valparaíso, 2007." }) },
                  ],
                },
              ],
            },
            {
              id: "huachipato",
              title: loc({ en: "Huachipato", es: "Huachipato" }),
              hint: loc({ en: "The steel", es: "Los acereros" }),
              lead: loc({ en: "Talcahuano. A mill, a steel stadium, three stars.", es: "Talcahuano. Una usina, un estadio de acero, tres estrellas." }),
              image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
              colors: [
                { hex: "#001F5B", name: loc({ en: "Navy", es: "Azul noche" }) },
                { hex: "#111111", name: loc({ en: "Black", es: "Negro" }) },
              ],
              stats: [
                { label: loc({ en: "Founded", es: "Fundación" }), value: "07.06.1947" },
                { label: loc({ en: "League", es: "Liga" }), value: "3" },
                { label: loc({ en: "Last", es: "Última" }), value: "2023" },
              ],
              facts: [
                { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "10.032. Wikipedia also lists 10.500.", es: "10.032. Wikipedia también anota 10.500." }) },
                { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Las Higueras, Talcahuano. The mill is next door.", es: "Las Higueras, Talcahuano. La usina está al lado." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Acereros, Siderúrgicos, Campeón del Sur.", es: "Acereros, Siderúrgicos, Campeón del Sur." }) },
                { title: loc({ en: "Classic", es: "Clásico" }), body: loc({ en: "Naval — the Clásico Chorero.", es: "Naval: el Clásico Chorero." }) },
              ],
              children: [
                {
                  id: "cap",
                  title: loc({ en: "CAP Acero", es: "CAP Acero" }),
                  hint: loc({ en: "Las Higueras", es: "Las Higueras" }),
                  lead: loc({ en: "Built of steel. 10.032 seats. Their own house.", es: "Hecho de acero. 10.032 asientos. Casa propia." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "10.032. Wikipedia also lists 10.500.", es: "10.032. Wikipedia también anota 10.500." }) },
                    { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Las Higueras, Talcahuano. The mill is next door.", es: "Las Higueras, Talcahuano. La usina está al lado." }) },
                  ],
                },
                {
                  id: "acereros",
                  title: loc({ en: "Acereros", es: "Acereros" }),
                  hint: loc({ en: "The stand", es: "La tribuna" }),
                  lead: loc({ en: "Los de la Usina. The south that actually wins.", es: "Los de la Usina. El sur que sí gana." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Acereros, Siderúrgicos, Campeón del Sur.", es: "Acereros, Siderúrgicos, Campeón del Sur." }) },
                    { title: loc({ en: "Classic", es: "Clásico" }), body: loc({ en: "Naval — the Clásico Chorero.", es: "Naval: el Clásico Chorero." }) },
                  ],
                },
              ],
            },
            {
              id: "everton",
              title: loc({ en: "Everton", es: "Everton" }),
              hint: loc({ en: "Oro y cielo", es: "Oro y cielo" }),
              lead: loc({ en: "Viña del Mar. Yellow of the casino and the lagoon.", es: "Viña del Mar. Amarillo del casino y la laguna." }),
              image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
              colors: [
                { hex: "#FFD100", name: loc({ en: "Gold", es: "Oro" }) },
                { hex: "#7EC8E3", name: loc({ en: "Sky", es: "Cielo" }) },
              ],
              stats: [
                { label: loc({ en: "Founded", es: "Fundación" }), value: "24.06.1909" },
                { label: loc({ en: "League", es: "Liga" }), value: "4" },
                { label: loc({ en: "City", es: "Ciudad" }), value: "Viña" },
              ],
              facts: [
                { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "23.423.", es: "23.423." }) },
                { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Santa Inés, Viña del Mar, by the lagoon.", es: "Santa Inés, Viña del Mar, junto a la laguna." }) },
                { title: loc({ en: "Classic", es: "Clásico" }), body: loc({ en: "Wanderers — the Clásico Porteño.", es: "Wanderers: el Clásico Porteño." }) },
                { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Ruleteros, Oro y Cielo, Guata Amarilla, Everforever.", es: "Ruleteros, Oro y Cielo, Guata Amarilla, Everforever." }) },
              ],
              children: [
                {
                  id: "sausalito-e",
                  title: loc({ en: "Sausalito", es: "Sausalito" }),
                  hint: loc({ en: "The lagoon", es: "La laguna" }),
                  lead: loc({ en: "World Cup 1962 ground. Rebuilt after 2010. 23.423 seats.", es: "Cancha del Mundial 1962. Se rehizo después del 2010. 23.423 asientos." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Seats", es: "Aforo" }), body: loc({ en: "23.423.", es: "23.423." }) },
                    { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Santa Inés, Viña del Mar, by the lagoon.", es: "Santa Inés, Viña del Mar, junto a la laguna." }) },
                    { title: loc({ en: "Classic", es: "Clásico" }), body: loc({ en: "Wanderers — the Clásico Porteño.", es: "Wanderers: el Clásico Porteño." }) },
                  ],
                },
                {
                  id: "ruleteros",
                  title: loc({ en: "Ruleteros", es: "Ruleteros" }),
                  hint: loc({ en: "Guata amarilla", es: "Guata amarilla" }),
                  lead: loc({ en: "The casino once paid a cut. The nickname stayed.", es: "El casino alguna vez puso un porcentaje. El apodo se quedó." }),
                  image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
                  facts: [
                    { title: loc({ en: "Name", es: "Nombre" }), body: loc({ en: "Ruleteros, Oro y Cielo, Guata Amarilla, Everforever.", es: "Ruleteros, Oro y Cielo, Guata Amarilla, Everforever." }) },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "rodeo",
          title: loc({ en: "Rodeo", es: "Rodeo" }),
          hint: loc({ en: "The national sport", es: "El deporte nacional" }),
          lead: loc({ en: "Two riders, one steer, a medialuna of packed earth.", es: "Dos jinetes, un novillo, una medialuna de tierra." }),
          image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=80",
          facts: [
            { title: loc({ en: "Since 1962", es: "Desde 1962" }), body: loc({ en: "National sport by law. Football is the religion.", es: "Deporte nacional por ley. El fútbol es la religión." }) },
            { title: loc({ en: "Huaso", es: "Huaso" }), body: loc({ en: "Chilean horseman. Hat, manta, a horse that turns on a peso.", es: "Jinete chileno. Sombrero, manta, un caballo que gira en un peso." }) },
          ],
          children: [
            {
              id: "medialuna",
              title: loc({ en: "Medialuna", es: "Medialuna" }),
              hint: loc({ en: "The half-moon", es: "La media luna" }),
              lead: loc({ en: "A crescent of clay. The wall is the point.", es: "Una media luna de greda. El apiñadero es el punto." }),
              image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Score", es: "Puntaje" }), body: loc({ en: "Pin the steer on the cushioned wall. Points for the place.", es: "Pega el novillo en la quilcha. Los puntos van por el lugar." }) },
              ],
            },
            {
              id: "rancagua",
              title: loc({ en: "Championnat", es: "Campeonato" }),
              hint: loc({ en: "Rancagua, April", es: "Rancagua, abril" }),
              lead: loc({ en: "The national final sits in Rancagua.", es: "La final nacional se sienta en Rancagua." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "When", es: "Cuándo" }), body: loc({ en: "Autumn. Book a bed if you go — the city fills.", es: "Otoño. Reserva cama si vas: la ciudad se llena." }) },
              ],
            },
            {
              id: "cueca",
              title: loc({ en: "Cueca after", es: "Cueca después" }),
              hint: loc({ en: "The dance", es: "El baile" }),
              lead: loc({ en: "When the run ends, someone starts a cueca.", es: "Cuando se acaba la atajada, alguien parte una cueca." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              light: true,
              facts: [
                { title: loc({ en: "Pañuelo", es: "Pañuelo" }), body: loc({ en: "A handkerchief. Don’t fake the steps if you don’t know.", es: "Un pañuelo. No finjas los pasos si no los sabes." }) },
              ],
            },
          ],
        },
        {
          id: "tenis",
          title: loc({ en: "Tennis", es: "Tenis" }),
          hint: loc({ en: "Athens 2004", es: "Atenas 2004" }),
          lead: loc({ en: "A gold medal in doubles changed the country’s Sunday.", es: "Un oro en dobles cambió el domingo del país." }),
          children: [
            {
              id: "massu",
              title: loc({ en: "Nicolás Massú", es: "Nicolás Massú" }),
              hint: loc({ en: "Gold, Athens", es: "Oro, Atenas" }),
              lead: loc({ en: "Singles and doubles gold in 2004. The captain later.", es: "Oro en singles y dobles el 2004. Después el capitán." }),
              facts: [
                { title: loc({ en: "2004", es: "2004" }), body: loc({ en: "Nobody left the TV. Taxi drivers still use his name as a date.", es: "Nadie dejó la tele. Los taxistas siguen usando su nombre como fecha." }) },
              ],
            },
            {
              id: "gonzalez",
              title: loc({ en: "Fernando González", es: "Fernando González" }),
              hint: loc({ en: "The bombardero", es: "El bombardero" }),
              lead: loc({ en: "Forehand like a door slamming. Olympic medals, a Slam final.", es: "Derecha como un portazo. Medallas olímpicas, una final de Slam." }),
              facts: [
                { title: loc({ en: "Style", es: "Estilo" }), body: loc({ en: "He hit through people. Chile loved that.", es: "Pegaba a través de la gente. Chile amó eso." }) },
              ],
            },
            {
              id: "tabilo",
              title: loc({ en: "Alejandro Tabilo", es: "Alejandro Tabilo" }),
              hint: loc({ en: "Lefty, now", es: "Zurdo, ahora" }),
              lead: loc({ en: "The current Chilean who wins in Europe on a Tuesday.", es: "El chileno de ahora que gana un martes en Europa." }),
              facts: [
                { title: loc({ en: "Watch", es: "Míralo" }), body: loc({ en: "Davis Cup week still stops a bar.", es: "La Copa Davis todavía para un bar." }) },
              ],
            },
            {
              id: "jarry",
              title: loc({ en: "Nicolás Jarry", es: "Nicolás Jarry" }),
              hint: loc({ en: "The serve", es: "El saque" }),
              lead: loc({ en: "A tall serve from Santiago. When he’s on, the stadium leans in.", es: "Un saque alto de Santiago. Cuando anda, el estadio se inclina." }),
              facts: [
                { title: loc({ en: "Home", es: "Casa" }), body: loc({ en: "Club Manquehue and the national courts.", es: "Club Manquehue y las canchas nacionales." }) },
              ],
            },
          ],
        },
        {
          id: "ski",
          title: loc({ en: "Ski", es: "Ski" }),
          hint: loc({ en: "June to September", es: "Junio a septiembre" }),
          lead: loc({ en: "Cordillera above Santiago. Brazilians already booked the powder.", es: "Cordillera sobre Santiago. Los brasileños ya reservaron la nieve." }),
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
          children: [
            {
              id: "nevado",
              title: loc({ en: "Valle Nevado", es: "Valle Nevado" }),
              hint: loc({ en: "40 km from the city", es: "40 km de la ciudad" }),
              lead: loc({ en: "The big one above Santiago. Hotel, hire, altitude.", es: "El grande sobre Santiago. Hotel, arriendo, altura." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Road", es: "Ruta" }), body: loc({ en: "Chains in winter. Leave early or sit in the switchbacks.", es: "Cadenas en invierno. Sal temprano o siéntate en las curvas." }) },
              ],
            },
            {
              id: "portillo",
              title: loc({ en: "Portillo", es: "Portillo" }),
              hint: loc({ en: "The lake", es: "El lago" }),
              lead: loc({ en: "A yellow hotel on the border road. Speed records in the 60s.", es: "Un hotel amarillo en la ruta al Cristo. Récords de velocidad en los 60." }),
              image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Season", es: "Temporada" }), body: loc({ en: "Short and high. Book the hotel with the lift.", es: "Corta y alta. Reserva el hotel con el andarivel." }) },
              ],
            },
            {
              id: "parva",
              title: loc({ en: "La Parva / Colorado", es: "La Parva / Colorado" }),
              hint: loc({ en: "The locals", es: "Los de aquí" }),
              lead: loc({ en: "Santiago’s backyard hills. Linked on a good snow year.", es: "Los cerros de patio de Santiago. Se juntan un año de nieve." }),
              image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Day", es: "Día" }), body: loc({ en: "Up and down in a day if the road is clean.", es: "Subes y bajas en el día si la ruta está limpia." }) },
              ],
            },
            {
              id: "chillan",
              title: loc({ en: "Nevados de Chillán", es: "Nevados de Chillán" }),
              hint: loc({ en: "Volcano snow", es: "Nieve de volcán" }),
              lead: loc({ en: "Further south. Hot springs after the run.", es: "Más al sur. Termas después de la pista." }),
              image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Trip", es: "Viaje" }), body: loc({ en: "A weekend, not a Santiago afternoon.", es: "Un fin de semana, no una tarde de Santiago." }) },
              ],
            },
          ],
        },
        {
          id: "surf",
          title: loc({ en: "Surf", es: "Surf" }),
          hint: loc({ en: "Lefts and fog", es: "Izquierdas y niebla" }),
          lead: loc({ en: "The Pacific here is cold. A steamer, not a postcard board.", es: "El Pacífico acá está frío. Un steamer, no una tabla de postal." }),
          children: [
            {
              id: "pichilemu",
              title: loc({ en: "Pichilemu", es: "Pichilemu" }),
              hint: loc({ en: "Punta de Lobos", es: "Punta de Lobos" }),
              lead: loc({ en: "One of the world’s serious lefts. O’Higgins coast.", es: "Una de las izquierdas serias del mundo. Costa de O’Higgins." }),
              facts: [
                { title: loc({ en: "Water", es: "Agua" }), body: loc({ en: "12–14 °C. Rent a steamer. The beach break is friendlier.", es: "12–14 °C. Arrienda steamer. El beach es más amable." }) },
                { title: loc({ en: "Town", es: "Pueblo" }), body: loc({ en: "Pichilemu fills in summer. Punta de Lobos is the point.", es: "Pichilemu se llena en verano. Punta de Lobos es la punta." }) },
              ],
            },
            {
              id: "arica",
              title: loc({ en: "Arica", es: "Arica" }),
              hint: loc({ en: "El Gringo", es: "El Gringo" }),
              lead: loc({ en: "The north. A reef that collects swell from another hemisphere.", es: "El norte. Un reef que junta swell de otro hemisferio." }),
              image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Season", es: "Temporada" }), body: loc({ en: "Winter swells. The desert sits right behind the parking.", es: "Swell de invierno. El desierto se sienta detrás del estacionamiento." }) },
              ],
            },
          ],
        },
        {
          id: "trekking",
          title: loc({ en: "Trekking", es: "Trekking" }),
          hint: loc({ en: "The W and after", es: "La W y después" }),
          lead: loc({ en: "Chile hikes. Parks first, then a volcano if the legs are still there.", es: "Chile camina. Parques primero, un volcán si las piernas siguen." }),
          image: "https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?auto=format&fit=crop&w=1600&q=80",
          children: [
            {
              id: "w",
              title: loc({ en: "W, Torres del Paine", es: "W, Torres del Paine" }),
              hint: loc({ en: "The one they fly for", es: "Por la que vuelan" }),
              lead: loc({ en: "Four or five days. Wind is a person on this trail.", es: "Cuatro o cinco días. El viento es una persona en este sendero." }),
              image: "https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Book", es: "Reserva" }), body: loc({ en: "Refugios and the park ticket go early.", es: "Refugios y el ticket del parque se van temprano." }) },
                { title: loc({ en: "Fuel", es: "Bencina" }), body: loc({ en: "Fill before the gate. There is no pump inside.", es: "Llena antes de la portería. Adentro no hay bomba." }) },
              ],
            },
            {
              id: "villarrica",
              title: loc({ en: "Villarrica", es: "Villarrica" }),
              hint: loc({ en: "The cone", es: "El cono" }),
              lead: loc({ en: "A volcano you can walk with a guide if it’s open.", es: "Un volcán que se camina con guía si está abierto." }),
              image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Pucón", es: "Pucón" }), body: loc({ en: "Start in Pucón. The mountain decides, not the brochure.", es: "Parte en Pucón. El cerro decide, no el folleto." }) },
              ],
            },
          ],
        },
        {
          id: "rally",
          title: loc({ en: "Rally", es: "Rally" }),
          hint: loc({ en: "Atacama dust", es: "Polvo del Atacama" }),
          lead: loc({ en: "Dakar lived here. The desert is still a stage.", es: "El Dakar vivió aquí. El desierto sigue siendo un especial." }),
          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
          children: [
            {
              id: "dakar",
              title: loc({ en: "Dakar", es: "Dakar" }),
              hint: loc({ en: "2009–2019", es: "2009–2019" }),
              lead: loc({ en: "Ten years of bikes and trucks on Chilean salt.", es: "Diez años de motos y camiones sobre sal chilena." }),
              image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Years", es: "Años" }), body: loc({ en: "2009–2019 the rally ran Chile. San Pedro heard the bikes at night.", es: "2009–2019 el rally corrió Chile. San Pedro escuchó las motos de noche." }) },
                { title: loc({ en: "Watch", es: "Mirar" }), body: loc({ en: "From a dune, not the track. Dust eats cameras.", es: "Desde una duna, no la huella. El polvo se come las cámaras." }) },
              ],
            },
            {
              id: "local-rally",
              title: loc({ en: "Chilean rallies", es: "Rally chileno" }),
              hint: loc({ en: "Still running", es: "Siguen corriendo" }),
              lead: loc({ en: "Local stages still cut the salt when Dakar left.", es: "Los especiales locales siguen cortando la sal cuando el Dakar se fue." }),
              image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
              facts: [
                { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Atacama and the north. Ask in San Pedro who is racing that weekend.", es: "Atacama y el norte. Pregunta en San Pedro quién corre ese fin de semana." }) },
              ],
            },
          ],
        },
        {
          id: "hockey",
          title: loc({ en: "Roller hockey", es: "Hockey patín" }),
          hint: loc({ en: "World champions", es: "Campeones del mundo" }),
          lead: loc({ en: "Chile wins this one. A gym, a stick, a quiet pride.", es: "Chile gana este. Un gimnasio, un stick, un orgullo quieto." }),
          image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1400&q=80",
          children: [
            {
              id: "mundial-hockey",
              title: loc({ en: "Worlds", es: "Mundial" }),
              hint: loc({ en: "The top step", es: "El primer cajón" }),
              lead: loc({ en: "The national team has stood on the top step. Few tourists know.", es: "La selección se ha parado en el primer cajón. Pocos turistas lo saben." }),
              image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Quiet", es: "Callado" }), body: loc({ en: "No Monumental. A gym and a flag.", es: "No hay Monumental. Un gimnasio y una bandera." }) },
              ],
            },
            {
              id: "club-hockey",
              title: loc({ en: "A club gym", es: "Un gimnasio de club" }),
              hint: loc({ en: "Ask locally", es: "Pregunta acá" }),
              lead: loc({ en: "Municipal wood, not the Nacional.", es: "Madera municipal, no el Nacional." }),
              image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1400&q=80",
              facts: [
                { title: loc({ en: "Where", es: "Dónde" }), body: loc({ en: "Ask a local club. Entry is cheap. The noise is not.", es: "Pregunta en un club. La entrada es barata. El ruido no." }) },
              ],
            },
          ],
        },
      ],
    },
  ],
};
