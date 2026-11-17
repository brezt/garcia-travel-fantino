import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { isExpired } from "@/lib/travel-content";
import { getDestinations, getPackages, getPosts } from "@/lib/cms";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, packages, posts] = await Promise.all([
    getDestinations(),
    getPackages(),
    getPosts(),
  ]);

  return [
    {
      url: getSiteUrl(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...[...destinations, ...packages]
      .filter((page) => !isExpired(page))
      .map((page) => ({
        url: getSiteUrl(
          page.type === "package" ? `/paquetes/${page.slug}` : `/destinos/${page.slug}`
        ),
        changeFrequency: "monthly" as const,
        priority: page.type === "package" ? 0.9 : 0.85,
      })),
    ...(posts.length > 0
      ? [{ url: getSiteUrl("/blog"), changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...posts.map((post) => ({
      url: getSiteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
