import type { TravelStyle } from "@/data/types";
import type { PlannerInput } from "@/lib/estimate";

export function readNumberParam(value: string | null) {
  if (value == null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** Build a plan seed from share/query params. Returns null when nothing useful is present. */
export function seedFromSearchParams(
  params: URLSearchParams,
): Partial<PlannerInput> | null {
  const country = params.get("c") || undefined;
  const days = readNumberParam(params.get("d"));
  const travelers = readNumberParam(params.get("t"));
  const budgetUsd = readNumberParam(params.get("b"));
  const budgetFlexibleParam = params.get("bf");
  const style = (params.get("s") as TravelStyle | null) || undefined;
  const regions = params.get("r")?.split(",").filter(Boolean);
  const interests = params.get("i")?.split(",").filter(Boolean);
  const eco = params.get("eco");
  const openFlag = params.get("plan") === "1";
  if (
    !openFlag &&
    !country &&
    days == null &&
    travelers == null &&
    budgetUsd == null &&
    budgetFlexibleParam == null &&
    !style &&
    !regions &&
    !interests &&
    !eco
  ) {
    return null;
  }
  const seed: Partial<PlannerInput> = {};
  if (country) seed.country = country;
  if (days != null) seed.days = days;
  if (travelers != null) seed.travelers = travelers;
  if (budgetUsd != null) seed.budgetUsd = budgetUsd;
  if (budgetFlexibleParam === "1") seed.budgetFlexible = true;
  if (budgetFlexibleParam === "0") seed.budgetFlexible = false;
  if (style) seed.style = style;
  if (regions?.length) seed.regions = regions;
  if (interests?.length) seed.interests = interests;
  if (eco === "1") seed.eco = true;
  if (eco === "0") seed.eco = false;
  return seed;
}

export function planToSearchParams(plan: PlannerInput, eco: boolean) {
  const params = new URLSearchParams();
  params.set("c", plan.country);
  params.set("d", String(plan.days));
  params.set("t", String(plan.travelers));
  params.set("b", String(plan.budgetUsd));
  params.set("bf", plan.budgetFlexible ? "1" : "0");
  params.set("s", plan.style);
  params.set("r", plan.regions.join(","));
  params.set("i", plan.interests.join(","));
  params.set("eco", eco ? "1" : "0");
  return params;
}
