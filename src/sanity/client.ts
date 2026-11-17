import { createClient } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  timeout: 10_000,
  maxRetries: 2,
});

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const imageUrl = (source: SanityImageSource, width = 1600) =>
  imageBuilder.image(source).width(width).fit("max").auto("format").url();

/** Etiqueta de caché que el webhook de Sanity invalida al publicar. */
export const SANITY_CACHE_TAG = "sanity";
