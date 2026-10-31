import { destinationOrder, destinations, getDestination } from "@/data/destinations";
import type { TravelStyle } from "@/data/types";

export type PlannerInput = {
  country: string;
  travelers: number;
  days: number;
  budgetUsd: number;
  budgetFlexible: boolean;
  style: TravelStyle;
  interests: string[];
  regions: string[];
  /** Selected panorama/highlight indexes per destination id (camper spine editor). */
  stopHighlights: Record<string, number[]>;
  eco: boolean;
};

export type TransportLeg = {
  from: string;
  to: string;
  mode: "flight" | "bus" | "none";
  hours: number;
  usd: number;
  reason: "distance" | "island" | "eco" | "hub";
};

export type Estimate = {
  totalUsd: number;
  perPersonUsd: number;
  lodgingUsd: number;
  foodUsd: number;
  activitiesUsd: number;
  transportUsd: number;
  feesUsd: number;
  fuelUsd: number;
  allocation: { id: string; days: number }[];
  legs: TransportLeg[];
  minDays: number;
  daysShort: boolean;
  tooAmbitious: boolean;
};

const CAMPER_KM: Record<string, number> = {
  atacama: 420,
  "santiago-wine": 180,
  lakes: 480,
  chiloe: 160,
  carretera: 980,
  patagonia: 300,
  ski: 140,
  rapanui: 0,
};

const BUS_LIMIT_HOURS = 14;

function orderedRegions(ids: string[]) {
  return destinationOrder
    .filter((id) => ids.includes(id))
    .map((id) => getDestination(id))
    .filter((destination): destination is NonNullable<typeof destination> => Boolean(destination));
}

function vanCount(travelers: number) {
  return Math.max(1, Math.ceil(travelers / 2));
}

export function buildLegs(
  regionIds: string[],
  eco: boolean,
  travelers: number,
  style: TravelStyle,
): TransportLeg[] {
  const regions = orderedRegions(regionIds);
  const legs: TransportLeg[] = [];
  const people = Math.max(1, travelers);

  for (let index = 0; index < regions.length; index += 1) {
    const current = regions[index];
    const previous = index === 0 ? null : regions[index - 1];

    if (!previous) {
      if (current.id === "santiago-wine") continue;
      const busOk =
        eco &&
        current.busFromSclHours !== null &&
        current.busFromSclHours <= BUS_LIMIT_HOURS;
      const island = current.id === "rapanui";
      const mode: TransportLeg["mode"] = island || !busOk ? "flight" : "bus";
      const hours =
        mode === "bus" ? (current.busFromSclHours ?? 0) : current.flightFromSclHours;
      const usd =
        (mode === "bus" ? (current.busFromSclUsd ?? 0) : current.flightFromSclUsd) *
        people;
      if (hours > 0) {
        legs.push({
          from: "santiago-wine",
          to: current.id,
          mode,
          hours,
          usd,
          reason: island ? "island" : busOk ? "eco" : "distance",
        });
      }
      continue;
    }

    if (current.id === "rapanui" || previous.id === "rapanui") {
      legs.push({
        from: previous.id,
        to: current.id,
        mode: "flight",
        hours: 5.5 + (previous.id === "santiago-wine" ? 0 : previous.flightFromSclHours),
        usd: current.id === "rapanui" ? current.flightFromSclUsd * people : previous.flightFromSclUsd * people,
        reason: "island",
      });
      continue;
    }

    const farSouthJump =
      (previous.id === "atacama" && ["patagonia", "carretera"].includes(current.id)) ||
      (previous.id === "santiago-wine" && current.id === "patagonia") ||
      (previous.id === "lakes" && current.id === "patagonia") ||
      (previous.id === "chiloe" && current.id === "patagonia");

    if (farSouthJump) {
      const hours = current.flightFromSclHours || 3.3;
      legs.push({
        from: previous.id,
        to: current.id,
        mode: "flight",
        hours,
        usd: Math.max(current.flightFromSclUsd, 140) * people,
        reason: "distance",
      });
      continue;
    }

    const busHours = Math.max(
      3,
      Math.abs((current.busFromSclHours ?? 8) - (previous.busFromSclHours ?? 0)),
    );
    const useBus = eco ? busHours <= 16 : busHours <= 8;
    legs.push({
      from: previous.id,
      to: current.id,
      mode: useBus ? "bus" : "flight",
      hours: useBus ? busHours : Math.max(1.5, Math.abs(current.flightFromSclHours - previous.flightFromSclHours) || 2),
      usd:
        (useBus ? 28 : 85) *
        (style === "camper" && useBus ? vanCount(people) : people),
      reason: useBus && eco ? "eco" : useBus ? "hub" : "distance",
    });
  }

  return legs;
}

export function estimateTrip(input: PlannerInput): Estimate {
  const travelers = Math.max(1, input.travelers);
  const days = Math.max(3, input.days);
  const style = input.style;
  const regions = orderedRegions(input.regions);
  const minDays = regions.reduce((sum, region) => sum + region.minDays, 0);
  const weight = regions.map((region) => region.recommendedDays);
  const totalWeight = weight.reduce((sum, value) => sum + value, 0) || 1;

  let remaining = days;
  const allocation = regions.map((region, index) => {
    if (index === regions.length - 1) {
      return { id: region.id, days: Math.max(1, remaining) };
    }
    const slice = Math.max(1, Math.round((days * weight[index]) / totalWeight));
    remaining -= slice;
    return { id: region.id, days: slice };
  });

  if (remaining < 0 && allocation.length) {
    allocation[allocation.length - 1].days = Math.max(
      1,
      allocation[allocation.length - 1].days + remaining,
    );
  }

  let lodgingUsd = 0;
  let foodUsd = 0;
  let activitiesUsd = 0;
  let feesUsd = 0;

  for (const item of allocation) {
    const region = getDestination(item.id);
    if (!region) continue;
    const daily = region.daily[style];
    if (style === "camper" && !region.camperFriendly) {
      const fallback = region.daily.mid;
      lodgingUsd += fallback.stay * item.days * travelers;
      foodUsd += fallback.food * item.days * travelers;
      activitiesUsd += fallback.activities * item.days * travelers;
    } else if (style === "camper") {
      lodgingUsd += daily.stay * item.days * vanCount(travelers);
      foodUsd += daily.food * item.days * travelers;
      activitiesUsd += daily.activities * item.days * travelers;
    } else {
      lodgingUsd += daily.stay * item.days * travelers;
      foodUsd += daily.food * item.days * travelers;
      activitiesUsd += daily.activities * item.days * travelers;
    }
    feesUsd += region.feesUsd * travelers;
  }

  const legs = buildLegs(input.regions, input.eco, travelers, style);
  const transportUsd = legs.reduce((sum, leg) => sum + leg.usd, 0);
  const driveKm = style === "camper"
    ? input.regions.reduce((sum, id) => sum + (CAMPER_KM[id] ?? 0), 0)
    : 0;
  const fuelUsd = Math.round(driveKm * 0.22 * vanCount(travelers));
  const totalUsd = Math.round(
    lodgingUsd + foodUsd + activitiesUsd + transportUsd + feesUsd + fuelUsd,
  );
  const daysShort = days < minDays && regions.length > 0;
  const tooAmbitious = regions.length >= 4 && days < 16;

  return {
    totalUsd,
    perPersonUsd: Math.round(totalUsd / travelers),
    lodgingUsd: Math.round(lodgingUsd),
    foodUsd: Math.round(foodUsd),
    activitiesUsd: Math.round(activitiesUsd),
    transportUsd: Math.round(transportUsd),
    feesUsd: Math.round(feesUsd),
    fuelUsd,
    allocation,
    legs,
    minDays,
    daysShort,
    tooAmbitious,
  };
}

/** Approximate budget ceiling per person (not party total). */
export function defaultBudget(style: TravelStyle, days: number, _travelers = 1) {
  const perDay = { backpacker: 70, mid: 160, luxury: 380, camper: 110 }[style];
  return perDay * days;
}

export function emptyEstimate(): Estimate {
  return {
    totalUsd: 0,
    perPersonUsd: 0,
    lodgingUsd: 0,
    foodUsd: 0,
    activitiesUsd: 0,
    transportUsd: 0,
    feesUsd: 0,
    fuelUsd: 0,
    allocation: [],
    legs: [],
    minDays: 0,
    daysShort: false,
    tooAmbitious: false,
  };
}

export const allDestinations = destinations;
