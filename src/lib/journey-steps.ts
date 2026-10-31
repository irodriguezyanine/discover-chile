import { planStepIds, type PlanStepId } from "@/lib/plan-steps";

export const WELCOME_STEPS_MOBILE = [
  "language",
  "name",
  "country",
  "currency",
] as const;

export const WELCOME_STEPS_DESKTOP = [
  "language",
  "cursor",
  "name",
  "country",
  "currency",
] as const;

export type WelcomeJourneyStepId =
  | (typeof WELCOME_STEPS_MOBILE)[number]
  | (typeof WELCOME_STEPS_DESKTOP)[number];

type GuestCountrySource = {
  onboarded?: boolean;
  country?: string;
} | null | undefined;

export function welcomeStepsForViewport(isDesktop: boolean) {
  return isDesktop ? [...WELCOME_STEPS_DESKTOP] : [...WELCOME_STEPS_MOBILE];
}

/** Full journey: welcome identity + planner stages (country skipped when already answered). */
export function journeyStepCount(
  isDesktop: boolean,
  guest: GuestCountrySource,
) {
  return welcomeStepsForViewport(isDesktop).length + planStepIds(guest).length;
}

export function welcomeProgressIndex(
  welcomeStepId: WelcomeJourneyStepId,
  isDesktop: boolean,
) {
  const steps = welcomeStepsForViewport(isDesktop);
  const index = steps.indexOf(welcomeStepId as (typeof steps)[number]);
  return index >= 0 ? index : 0;
}

/** Absolute index in the full journey while inside the planner. */
export function plannerJourneyIndex(
  planStepId: PlanStepId,
  isDesktop: boolean,
  guest: GuestCountrySource,
) {
  const welcomeCount = welcomeStepsForViewport(isDesktop).length;
  const planIds = planStepIds(guest);
  const planIndex = planIds.indexOf(planStepId);
  return welcomeCount + (planIndex >= 0 ? planIndex : 0);
}
