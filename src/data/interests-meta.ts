import type { Interest } from "@/data/types";
import { destinations } from "@/data/destinations";

export const INTEREST_ORDER: Interest[] = [
  "beach",
  "desert",
  "hike",
  "wine",
  "culture",
  "snow",
  "parks",
  "wildlife",
];

/** Destination ids most associated with each interest (for region tags). */
export function regionIdsForInterest(interest: Interest) {
  return destinations
    .filter((destination) => destination.interests.includes(interest))
    .map((destination) => destination.id);
}

export const INTEREST_ACCENTS: Record<
  Interest,
  { tint: string; ring: string; soft: string }
> = {
  beach: {
    tint: "text-[#1d6a7a]",
    ring: "ring-[#1d6a7a]/25",
    soft: "bg-[#e8f4f6]",
  },
  desert: {
    tint: "text-[#b45a1a]",
    ring: "ring-[#b45a1a]/25",
    soft: "bg-[#f8efe4]",
  },
  hike: {
    tint: "text-[#2f5d3a]",
    ring: "ring-[#2f5d3a]/25",
    soft: "bg-[#e8f0ea]",
  },
  wine: {
    tint: "text-[#7a2f45]",
    ring: "ring-[#7a2f45]/25",
    soft: "bg-[#f6e9ed]",
  },
  culture: {
    tint: "text-[#3d4a6b]",
    ring: "ring-[#3d4a6b]/25",
    soft: "bg-[#eceff6]",
  },
  snow: {
    tint: "text-[#3a5f8a]",
    ring: "ring-[#3a5f8a]/25",
    soft: "bg-[#e8eef6]",
  },
  parks: {
    tint: "text-[#1f6b4a]",
    ring: "ring-[#1f6b4a]/25",
    soft: "bg-[#e6f3ec]",
  },
  wildlife: {
    tint: "text-[#6b4a1f]",
    ring: "ring-[#6b4a1f]/25",
    soft: "bg-[#f3eee4]",
  },
};
