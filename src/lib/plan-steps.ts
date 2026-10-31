type GuestCountrySource = {
  onboarded?: boolean;
  country?: string;
} | null | undefined;

export const PLAN_STEP_IDS = [
  "country",
  "party",
  "budget",
  "style",
  "interests",
  "regions",
  "route",
] as const;

export type PlanStepId = (typeof PLAN_STEP_IDS)[number];

/** Country was already answered at welcome — omit it from the plan flow. */
export function shouldSkipPlanCountry(guest: GuestCountrySource) {
  return Boolean(guest?.onboarded && guest.country);
}

export function planStepIds(guest: GuestCountrySource): PlanStepId[] {
  if (shouldSkipPlanCountry(guest)) {
    return PLAN_STEP_IDS.filter((id) => id !== "country");
  }
  return [...PLAN_STEP_IDS];
}

export function planStepIndex(id: PlanStepId, guest: GuestCountrySource) {
  const index = planStepIds(guest).indexOf(id);
  return index >= 0 ? index : 0;
}
