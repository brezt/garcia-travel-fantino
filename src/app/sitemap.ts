import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const lastModified = new Date("2026-05-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
