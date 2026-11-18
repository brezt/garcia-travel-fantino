import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  /** Título de la página (sin el nombre de la agencia, se añade solo). */
  title: string;
  description: string;
  /** Ruta de la página, por ejemplo "/nosotros". */
  path: string;
  /** Usa el título tal cual, sin añadir " | Garcia Travel Fantino". */
  absoluteTitle?: boolean;
  /** Imagen para compartir en redes. Por defecto, la playa de la portada. */
  image?: { url: string; alt?: string };
  /** Versión en Markdown para agentes de IA (ver src/app/md). */
  markdownPath?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/**
 * Metadatos completos de una página: título, descripción, URL canónica y vista previa
 * al compartir (Open Graph y X/Twitter).
 *
 * Next.js no combina "openGraph" entre el layout y la página: si una página no define el
 * suyo, hereda el de la portada y al compartirla en WhatsApp o Facebook aparece el título
 * y la URL de la portada. Por eso cada página pública usa esta función.
 */
export const pageMetadata = ({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
  markdownPath,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataOptions): Metadata => {
  const url = getSiteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const shareImage = image ?? {
    url: siteConfig.shareImagePath,
    alt: "Playa tropical, viajes con Garcia Travel Fantino",
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      ...(markdownPath ? { types: { "text/markdown": markdownPath } } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      locale: "es_DO",
      siteName: siteConfig.name,
      url,
      title: fullTitle,
      description,
      images: [shareImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
};
