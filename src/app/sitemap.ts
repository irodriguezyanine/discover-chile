import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { sampleRoutes } from "@/data/routes";
import { locales } from "@/i18n/config";

const paths = [
  "",
  "/plan",
  "/destinations",
  "/routes",
  "/activities",
  "/stays",
  "/fuel",
  "/parks",
  "/visa",
  "/faq",
  "/about",
  ...destinations.map((destination) => `/destinations/${destination.slug}`),
  ...sampleRoutes.map((route) => `/routes/${route.slug}`),
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
