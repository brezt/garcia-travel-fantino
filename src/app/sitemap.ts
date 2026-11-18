import type { MetadataRoute } from "next";
import { getSiteUrl, SITE_UPDATED_AT } from "@/lib/site";
import { LEGAL_UPDATED_AT } from "@/lib/legal";
import { getContentPath } from "@/lib/structured-data";
import { isExpired } from "@/lib/travel-content";
import { getDestinations, getPackages, getPosts } from "@/lib/cms";

export const revalidate = 60;

/** La más reciente de varias fechas (texto ISO o AAAA-MM-DD). */
const latest = (...dates: (string | undefined)[]) =>
  new Date(
    Math.max(...dates.filter((date): date is string => Boolean(date)).map((date) => new Date(date).getTime()))
  );

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, packages, posts] = await Promise.all([
    getDestinations(),
    getPackages(),
    getPosts(),
  ]);

  const contentPages = [...destinations, ...packages].filter((page) => !isExpired(page));
  const postDates = posts.map((post) => post.updatedAt ?? post.publishedAt);
  // La portada muestra destinos, promociones y artículos: cambia cuando cambia cualquiera de ellos.
  const homeUpdatedAt = latest(SITE_UPDATED_AT, ...contentPages.map((page) => page.updatedAt), ...postDates);

  return [
    {
      url: getSiteUrl(),
      lastModified: homeUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["/destinos", "/paquetes"].map((path) => ({
      url: getSiteUrl(path),
      lastModified: homeUpdatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...["/nosotros", "/contacto"].map((path) => ({
      url: getSiteUrl(path),
      lastModified: latest(SITE_UPDATED_AT),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...["/privacidad", "/terminos"].map((path) => ({
      url: getSiteUrl(path),
      lastModified: latest(LEGAL_UPDATED_AT),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...contentPages.map((page) => ({
      url: getSiteUrl(getContentPath(page)),
      lastModified: latest(page.updatedAt ?? SITE_UPDATED_AT),
      changeFrequency: "monthly" as const,
      priority: page.type === "package" ? 0.9 : 0.85,
    })),
    ...(posts.length > 0
      ? [
          {
            url: getSiteUrl("/blog"),
            lastModified: latest(...postDates),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: getSiteUrl(`/blog/${post.slug}`),
      lastModified: latest(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
