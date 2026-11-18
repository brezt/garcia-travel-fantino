import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { imageUrl, sanityClient, SANITY_CACHE_TAG } from "@/sanity/client";
import { siteConfig } from "@/lib/site";
import {
  destinations as localDestinations,
  isExpired,
  packages as localPackages,
  type ContentPage,
} from "@/lib/travel-content";

/**
 * Capa de datos del sitio. Lee del panel (Sanity) y, si el panel todavía no
 * tiene contenido de un tipo o no responde, usa el contenido que ya estaba en
 * el código. Así la web nunca se queda vacía.
 */

/** Segundos que una página se guarda antes de volver a preguntar al panel. */
export const CMS_REVALIDATE_SECONDS = 60;

const cmsFetch = async <T>(query: string, params: Record<string, string> = {}) => {
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { tags: [SANITY_CACHE_TAG], revalidate: CMS_REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error(
      "[cms] No se pudo leer el panel, uso el contenido de respaldo:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
};

type SanityImage = SanityImageSource & { alt?: string };

type SanityContentPage = {
  _type: "destino" | "paquete";
  _updatedAt?: string;
  slug: string;
  title: string;
  shortTitle?: string;
  eyebrow?: string;
  location?: string;
  description?: string;
  heroImage?: SanityImage;
  promoImage?: SanityImage;
  highlights?: string[];
  sections?: ContentPage["sections"];
  faq?: ContentPage["faq"];
  whatsappMessage?: string;
  featured?: boolean;
  validUntil?: string;
  duration?: string;
  price?: string;
  documents?: { title?: string; url?: string }[];
};

const contentProjection = `{
  _type,
  _updatedAt,
  "slug": slug.current,
  title,
  shortTitle,
  eyebrow,
  location,
  description,
  heroImage,
  promoImage,
  highlights,
  sections[]{title, body},
  faq[]{question, answer},
  whatsappMessage,
  featured,
  validUntil,
  duration,
  price,
  "documents": documents[]{title, "url": asset->url}
}`;

const toContentPage = (doc: SanityContentPage): ContentPage => {
  const type = doc._type === "paquete" ? "package" : "destination";
  const heroImage = doc.heroImage ? imageUrl(doc.heroImage) : siteConfig.shareImagePath;

  return {
    slug: doc.slug,
    type,
    title: doc.title,
    shortTitle: doc.shortTitle || doc.title,
    metaTitle: `${doc.title} | ${siteConfig.name}`,
    description: doc.description || "",
    heroImage,
    imageAlt: doc.heroImage?.alt || doc.title,
    eyebrow: doc.eyebrow || (type === "package" ? "Promoción" : "Destino"),
    location: doc.location || "",
    duration: doc.duration || undefined,
    price: doc.price || undefined,
    validUntil: doc.validUntil || undefined,
    featured: Boolean(doc.featured),
    promoImage: doc.promoImage ? imageUrl(doc.promoImage, 2000) : undefined,
    documents: (doc.documents ?? []).filter(
      (document): document is { title: string; url: string } => Boolean(document.title && document.url)
    ),
    highlights: doc.highlights ?? [],
    sections: doc.sections ?? [],
    faq: doc.faq ?? [],
    updatedAt: doc._updatedAt,
    whatsappMessage:
      doc.whatsappMessage ||
      `Hola Garcia Travel, me interesa "${doc.title}". ¿Me pueden dar más información?`,
  };
};

const withFallback = <T>(items: T[] | null, fallback: T[]) =>
  items && items.length > 0 ? items : fallback;

export const getDestinations = async () => {
  const docs = await cmsFetch<SanityContentPage[]>(
    `*[_type == "destino" && defined(slug.current)] | order(title asc) ${contentProjection}`
  );
  return withFallback(docs?.map(toContentPage) ?? null, localDestinations);
};

export const getPackages = async () => {
  const docs = await cmsFetch<SanityContentPage[]>(
    `*[_type == "paquete" && defined(slug.current)] | order(coalesce(validUntil, "9999-12-31") asc) ${contentProjection}`
  );
  return withFallback(docs?.map(toContentPage) ?? null, localPackages);
};

export const getDestinationBySlug = async (slug: string) =>
  (await getDestinations()).find((destination) => destination.slug === slug);

export const getPackageBySlug = async (slug: string) =>
  (await getPackages()).find((travelPackage) => travelPackage.slug === slug);

export const getActivePackages = async () =>
  (await getPackages()).filter((travelPackage) => !isExpired(travelPackage));

export type Testimonial = {
  name: string;
  role: string;
  content: string;
  highlight: boolean;
};

const localTestimonials: Testimonial[] = [
  { name: "María Rodríguez", role: "Viaje a Punta Cana", content: "Fantástica experiencia. El equipo de Garcia Travel se encargó de todo. ¡Definitivamente volveremos a viajar con ellos!", highlight: false },
  { name: "David Suriel", role: "Viaje a Europa", content: "Nuestra luna de miel fue espectacular gracias a Garcia Travel. Su atención a cada detalle marcó una gran diferencia.", highlight: true },
  { name: "Laura Jiménez", role: "Viaje Familiar", content: "Los niños disfrutaron muchísimo. Encontraron el resort perfecto para nosotros. ¡100% recomendados!", highlight: false },
];

export const getTestimonials = async () => {
  const docs = await cmsFetch<Testimonial[]>(
    `*[_type == "testimonio"] | order(coalesce(order, 999) asc, _createdAt desc)[0...3]{
      name,
      "role": coalesce(trip, ""),
      content,
      "highlight": coalesce(highlight, false)
    }`
  );
  return withFallback(docs, localTestimonials);
};

export type PostSummary = {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  coverImage?: string;
  coverAlt: string;
};

export type Post = PostSummary & {
  body: PortableTextBlock[];
};

type SanityPost = Omit<PostSummary, "coverImage" | "coverAlt" | "updatedAt"> & {
  _updatedAt?: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
};

const toPostSummary = ({ coverImage, ...post }: SanityPost): PostSummary => ({
  slug: post.slug,
  title: post.title,
  publishedAt: post.publishedAt,
  updatedAt: post._updatedAt,
  excerpt: post.excerpt ?? "",
  coverImage: coverImage ? imageUrl(coverImage, 1600) : undefined,
  coverAlt: coverImage?.alt || post.title,
});

const postFilter = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

export const getPosts = async (limit = 50) =>
  (
    (await cmsFetch<SanityPost[]>(
      `*[${postFilter}] | order(publishedAt desc)[0...$limit]{
        "slug": slug.current, _updatedAt, title, publishedAt, excerpt, coverImage
      }`.replace("$limit", String(limit))
    )) ?? []
  ).map(toPostSummary);

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const post = await cmsFetch<SanityPost | null>(
    `*[${postFilter} && slug.current == $slug][0]{
      "slug": slug.current, _updatedAt, title, publishedAt, excerpt, coverImage, body
    }`,
    { slug }
  );
  return post ? { ...toPostSummary(post), body: post.body ?? [] } : undefined;
};
