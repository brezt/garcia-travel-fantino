import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { sanityClient, SANITY_CACHE_TAG } from "@/sanity/client";

/**
 * El panel (/admin) llama aquí justo después de publicar. Hace dos cosas:
 * 1. Renueva la caché de la web para que el cambio se vea enseguida.
 * 2. Avisa a Bing por IndexNow de las páginas que cambiaron.
 *
 * No lleva contraseña, así que solo actúa si el documento de verdad se publicó
 * en los últimos minutos, y como mucho una vez por minuto por documento.
 */

const RECENT_MS = 5 * 60 * 1000;
const THROTTLE_MS = 60 * 1000;
const lastRun = new Map<string, number>();

const pathsByType: Record<string, (slug?: string) => string[]> = {
  post: (slug) => ["/", "/blog", ...(slug ? [`/blog/${slug}`] : [])],
  destino: (slug) => ["/", "/destinos", ...(slug ? [`/destinos/${slug}`] : [])],
  paquete: (slug) => ["/", "/paquetes", ...(slug ? [`/paquetes/${slug}`] : [])],
  testimonio: () => ["/"],
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { type?: unknown; slug?: unknown } | null;
  const type = typeof body?.type === "string" ? body.type : "";
  const slug = typeof body?.slug === "string" && /^[a-z0-9-]{1,96}$/.test(body.slug) ? body.slug : undefined;

  if (!(type in pathsByType)) {
    return Response.json({ message: "Tipo no válido" }, { status: 400 });
  }

  const throttleKey = `${type}:${slug ?? ""}`;
  if (Date.now() - (lastRun.get(throttleKey) ?? 0) < THROTTLE_MS) {
    return Response.json({ message: "Ya se avisó hace poco" }, { status: 429 });
  }

  // Comprueba en el panel (sin la caché del CDN) que se acaba de publicar.
  const updatedAt = await sanityClient
    .withConfig({ useCdn: false })
    .fetch<string | null>(
      slug
        ? `*[_type == $type && slug.current == $slug][0]._updatedAt`
        : `*[_type == $type] | order(_updatedAt desc)[0]._updatedAt`,
      slug ? { type, slug } : { type }
    )
    .catch(() => null);

  if (!updatedAt || Date.now() - new Date(updatedAt).getTime() > RECENT_MS) {
    return Response.json({ message: "No hay una publicación reciente" }, { status: 404 });
  }

  lastRun.set(throttleKey, Date.now());
  revalidateTag(SANITY_CACHE_TAG, { expire: 0 });

  const indexNow = await submitToIndexNow(pathsByType[type](slug));
  return Response.json({ revalidated: true, indexNow });
}
