import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { contentPages, isExpired } from "@/lib/travel-content";

export const dynamic = "force-static";

const lastModified = new Date("2026-05-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...contentPages.filter((page) => !isExpired(page)).map((page) => ({
      url: getSiteUrl(
        page.type === "package"
          ? `/paquetes/${page.slug}`
          : `/destinos/${page.slug}`
      ),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.type === "package" ? 0.9 : 0.85,
    })),
  ];
}
