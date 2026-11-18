import { INDEXNOW_KEY } from "@/lib/indexnow";

export const dynamic = "force-static";

/** Archivo de verificación de IndexNow: Bing comprueba que contiene la clave. */
export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
