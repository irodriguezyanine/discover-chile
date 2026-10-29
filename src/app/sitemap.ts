import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { locales } from "@/i18n/config";

const paths = [
  "",
  "/plan",
  "/destinations",
  "/routes",
  "/parks",
  "/stays",
  "/visa",
  "/faq",
  "/about",
  ...destinations.map((destination) => `/destinations/${destination.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://discover-chile.vercel.app";
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
