import { loc } from "@/i18n/loc";
import type { Localized } from "@/data/types";

export type TipSheetLine = { title: Localized; body: Localized };
export type TipSheet = {
  kicker: Localized;
  title: Localized;
  lead: Localized;
  lines: TipSheetLine[];
};

export const tipSheets = {
  tip: {
    kicker: loc({ en: "10%", es: "10%" }),
    title: loc({ en: "Tipping in Chile", es: "La propina en Chile" }),
    lead: loc({ en: "In restaurants you leave 10%. Often a tilde on the card machine. It is a suggestion, not a trap. It does not follow you onto micros, Uber or taxis.", es: "En restorán se deja el 10%. A menudo un tilde en la máquina. Es sugerencia, no trampa. No aplica a micros, Uber ni taxis — ahí se redondea." }),
    lines: [
      { title: loc({ en: "Restaurants", es: "Restaurantes" }), body: loc({ en: "Código del Trabajo art. 64: the employer must suggest at least 10%. You may refuse. SERNAC backs that. If the machine already ticked «propina», look before you sign.", es: "Código del Trabajo art. 64: el empleador debe sugerir al menos 10%. Puedes rechazarla. SERNAC lo respalda. Si la máquina ya marcó «propina», mira antes de firmar." }) },
      { title: loc({ en: "Once and cafés", es: "Once y cafés" }), body: loc({ en: "Once is afternoon tea — not 11 o’clock. A café with table service usually offers the 10%. A counter coffee, a bakery queue, a fuente de soda with a ticket: skip it. Round coins in the tip jar if you want, never because someone stared.", es: "La once es el té de la tarde — no las 11. Un café con mesa suele ofrecer el 10%. Un café en barra, la cola de la panadería, una fuente de soda con ticket: no. Si quieres, deja monedas en el frasco, nunca porque alguien te miró." }) },
      { title: loc({ en: "Lodges and hotels", es: "Lodges y hoteles" }), body: loc({ en: "All-inclusive Atacama and Patagonia lodges often fold service into the rate. Do not double-tip the same dinner. Housekeeping: a small cash envelope at the end is kind, not required. Hotel restaurants still show the 10% on the machine.", es: "Los lodges all-inclusive de Atacama y Patagonia suelen incluir el servicio. No dobles la misma cena. Housekeeping: un sobre chico al final es amable, no obligatorio. El restaurante del hotel igual muestra el 10% en la máquina." }) },
      { title: loc({ en: "What you do not tip", es: "Dónde no se deja" }), body: loc({ en: "Micros and RED buses: never. Metro: never. Uber / Cabify / Didi: the fare is the fare — a star, not a percentage. Street taxis: round up a few hundred pesos if the drop was clean. Tours with a posted price: ask if the guide is included before you add 10%.", es: "Micros y buses RED: nunca. Metro: nunca. Uber / Cabify / Didi: la tarifa es la tarifa — una estrella, no un porcentaje. Taxi de calle: redondea unos cientos de pesos si el viaje fue limpio. Tours con precio publicado: pregunta si el guía ya está incluido antes de sumar 10%." }) },
    ],
  } satisfies TipSheet,
  money: {
    kicker: loc({ en: "CLP", es: "CLP" }),
    title: loc({ en: "Chilean peso", es: "Peso chileno" }),
    lead: loc({ en: "The country runs on pesos. USD is how we quote the trip, not how you pay for a completo. The number on the tile is live from the market, not a postcard from 2019.", es: "El país corre en pesos. El dólar es cómo cotizamos el viaje, no cómo pagas un completo. El número de la tarjeta es del mercado, no un recuerdo de 2019." }),
    lines: [
      { title: loc({ en: "Cards and cash", es: "Tarjeta y efectivo" }), body: loc({ en: "Visa / Mastercard in restos, Copec, pharmacies. Redbanc ATMs in cities. Airport casas de cambio are a bad first trade — a little cash for the bus, then an ATM in town. Tell your bank Chile exists so they do not freeze the card.", es: "Visa / Mastercard en restos, Copec, farmacias. Cajeros Redbanc en ciudades. Las casas de cambio del aeropuerto son un mal primer trato — poco efectivo para el bus, después un cajero en la ciudad. Avisa al banco que Chile existe para que no te congelen." }) },
      { title: loc({ en: "What cash is for", es: "Para qué el efectivo" }), body: loc({ en: "Ferries, village kiosks, housekeeping envelopes, and a taxi that still wants bills. RED in Santiago is bip! or QR — not coins on the micro. Street vendors want pesos, not leftover dollars.", es: "Ferries, kioskos de pueblo, sobres de housekeeping, y un taxi que aún quiere billetes. RED en Santiago es bip! o QR — no monedas en la micro. Los de la calle quieren pesos, no tus dólares sueltos." }) },
      { title: loc({ en: "Bills you will actually see", es: "Billetes que vas a ver" }), body: loc({ en: "1.000, 2.000, 5.000, 10.000, 20.000. Coins 10–500 still exist; a 1-peso piece is a souvenir. People round. A «luca» is a thousand pesos.", es: "1.000, 2.000, 5.000, 10.000, 20.000. Las monedas de 10 a 500 existen; el peso de 1 es souvenir. La gente redondea. Una luca es mil pesos." }) },
      { title: loc({ en: "ATM manners", es: "Cajeros" }), body: loc({ en: "BancoEstado and Banco de Chile machines in malls feel calmer than a dark street. Decline dynamic currency conversion — pay in CLP, not USD, or the airport rate follows you.", es: "Los cajeros de BancoEstado y Banco de Chile en malls se sienten más calmos que una calle oscura. Rechaza la conversión dinámica: paga en CLP, no en USD, o el tipo del aeropuerto te persigue." }) },
      { title: loc({ en: "IVA is already in the price", es: "El IVA ya está" }), body: loc({ en: "Shop and restaurant prices include 19% IVA. Foreigners sometimes get a tax-free desk in malls — ask, do not assume. The 10% tip sits on top of the bill, not inside IVA.", es: "Precios de tienda y restorán incluyen IVA 19%. A veces hay tax-free para extranjeros en malls: pregunta, no asumas. El 10% de propina va encima de la cuenta, no dentro del IVA." }) },
    ],
  } satisfies TipSheet,
  sos: {
    kicker: loc({ en: "133 · 131 · 132", es: "133 · 131 · 132" }),
    title: loc({ en: "Emergency numbers", es: "Números de emergencia" }),
    lead: loc({ en: "Chile does not run on 911 the way the US does. Save these three. They work from a local SIM and most roaming phones.", es: "Chile no corre en 911 como EE.UU. Guarda estos tres. Funcionan con SIM local y la mayoría de los teléfonos en roaming." }),
    lines: [
      { title: loc({ en: "133 — Police", es: "133 — Policía" }), body: loc({ en: "Carabineros. Theft, a crash, a night that went sideways. In tourist areas they will try English; start in Spanish anyway: «necesito a Carabineros».", es: "Carabineros. Robo, un choque, una noche que se torció. En zonas turísticas intentan inglés; parte en español igual: «necesito a Carabineros»." }) },
      { title: loc({ en: "131 — Ambulance", es: "131 — Ambulancia" }), body: loc({ en: "SAMU. Say the comuna and a landmark. Travel insurance still matters after they pick you up — public emergency is the door, not the whole bill.", es: "SAMU. Di la comuna y un hito. El seguro de viaje sigue importando después de que te recojan — la urgencia pública es la puerta, no toda la cuenta." }) },
      { title: loc({ en: "132 — Fire", es: "132 — Bomberos" }), body: loc({ en: "Bomberos de Chile are volunteers in many towns and still come fast. Smoke in a wooden hostel, a stove, a forest edge in summer: this number, then get out.", es: "Bomberos de Chile son voluntarios en muchos pueblos y igual llegan rápido. Humo en un hostal de madera, una cocina, un borde de bosque en verano: este número, y sal." }) },
    ],
  } satisfies TipSheet,
  plug: {
    kicker: loc({ en: "220V", es: "220V" }),
    title: loc({ en: "Power in Chile", es: "Corriente en Chile" }),
    lead: loc({ en: "220 volts, 50 hertz. Wall sockets are Type C (two round pins) and Type L (Italian three-pin). A US 110-volt hair dryer will cry. USB-C in a new hotel does not save an iron from home.", es: "220 voltios, 50 hertz. Enchufes tipo C (dos pines redondos) y tipo L (italiano de tres). Un secador de 110 de EE.UU. va a llorar. El USB-C del hotel nuevo no salva la plancha de casa." }),
    lines: [
      { title: loc({ en: "What to pack", es: "Qué llevar" }), body: loc({ en: "A C/L adaptor, or a universal brick with a fuse. Phones and laptops already eat 100–240V — they only need the shape. Hair tools, CPAP machines, and cheap US kettles need a transformer, not just an adaptor. Duty-free at SCL sells the cheap plastic ones; a grounded L is kinder to a laptop brick.", es: "Un adaptador C/L, o un ladrillo universal con fusible. Celulares y notebooks ya comen 100–240V: solo necesitan la forma. Secadores, CPAP y hervidores baratos de EE.UU. piden transformador, no solo adaptador. El duty-free de SCL vende los de plástico; un L con tierra es más amable con el cargador." }) },
      { title: loc({ en: "C versus L", es: "C versus L" }), body: loc({ en: "Type C slides into most hotel walls. Type L is the three-pin Chilean/Italian shape — some older buildings only take L. If C feels loose, you are in an L socket. Do not force it.", es: "El tipo C entra en casi todos los hoteles. El L es el de tres pines chileno/italiano — edificios viejos a veces solo L. Si el C queda flojo, es un enchufe L. No lo fuerces." }) },
      { title: loc({ en: "Lodges and the Austral", es: "Lodges y la Austral" }), body: loc({ en: "Atacama and Torres lodges have sockets by the bed. Cabins on the Carretera Austral may share one power strip for the table. Charge at Copec when you see one. Generators sleep at night — so should your laptop.", es: "Los lodges de Atacama y Torres tienen enchufe al lado de la cama. Las cabañas de la Austral a veces comparten una zapatilla. Carga en el Copec cuando lo veas. Los generadores duermen de noche — tu notebook también." }) },
      { title: loc({ en: "USB and power banks", es: "USB y power banks" }), body: loc({ en: "USB-A is still everywhere. USB-C PD in newer cafés. A 20.000 mAh bank is the honest Austral companion. Airlines still treat big banks as carry-on, not hold.", es: "USB-A sigue en todos lados. USB-C PD en cafés nuevos. Un banco de 20.000 mAh es el compañero honesto de la Austral. Los aviones quieren el banco en cabina, no en bodega." }) },
    ],
  } satisfies TipSheet,
  move: {
    kicker: loc({ en: "Move", es: "Moverse" }),
    title: loc({ en: "How will you move?", es: "¿Cómo te vas a mover?" }),
    lead: loc({ en: "Chile has one of the strongest metros and public-transport desks in Latin America. Santiago’s ticket is digital (RED / bip!). From Arturo Merino Benítez you reach the city — the metro does not pull up at the gate.", es: "Chile tiene de los mejores metros de LatAm. Ticket digital RED. Del aeropuerto sí llegas a Santiago — el metro no te espera en la puerta." }),
    lines: [
      { title: loc({ en: "The honest spine", es: "La columna honesta" }), body: loc({ en: "Santiago: Metro + RED buses. Regions: LATAM, Sky, JetSMART, then Turbus / Pullman / ETM night buses. TerraSur train exists — Santiago to Chillán, not a tourist train to Patagonia.", es: "Santiago: Metro + buses RED. Regiones: LATAM, Sky, JetSMART, después bus cama Turbus / Pullman / ETM. El tren TerraSur existe — Santiago a Chillán, no un tren turista a la Patagonia." }) },
      { title: loc({ en: "From the airport", es: "Desde el aeropuerto" }), body: loc({ en: "Official buses sit in the CTR between T1 and T2. Centropuerto and Turbus drop you on Metro Línea 1 (Pajaritos or República). Uber and Cabify only from the app. Pirate taxis wait in the arrivals hug.", es: "Los buses oficiales están en el CTR entre T1 y T2. Centropuerto y Turbus te dejan en Metro Línea 1 (Pajaritos o República). Uber y Cabify solo desde la app. Los taxis pirata esperan en el abrazo de llegadas." }) },
    ],
  } satisfies TipSheet,
} as const;

