import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type TravelStyle = "backpacker" | "mid" | "luxury" | "camper";

export type Interest =
  | "beach"
  | "desert"
  | "hike"
  | "wine"
  | "culture"
  | "snow"
  | "parks"
  | "wildlife";

export type VisaKind = "free" | "id" | "required" | "us_waiver";

export type DailyCost = {
  stay: number;
  food: number;
  activities: number;
};

export type Destination = {
  id: string;
  slug: string;
  image: string;
  imageAlt: Localized;
  name: Localized;
  region: Localized;
  summary: Localized;
  why: Localized;
  highlights: Localized[];
  minDays: number;
  recommendedDays: number;
  daily: Record<TravelStyle, DailyCost>;
  feesUsd: number;
  flightFromSclHours: number;
  flightFromSclUsd: number;
  busFromSclHours: number | null;
  busFromSclUsd: number | null;
  interests: Interest[];
  expensive: boolean;
  camperFriendly: boolean;
  season: Localized;
};

export type CountryProfile = {
  code: string;
  currency: string;
  visa: VisaKind;
  flightHoursToScl: number;
  ecoBias: boolean;
  prefersSnow: boolean;
  drives: boolean;
  tipKey: string;
};
