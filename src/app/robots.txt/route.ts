import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * robots.txt escrito a mano porque el formato de Next.js no admite "Content-Signal".
 * Content Signals (https://contentsignals.org) dicen qué usos de IA permitimos:
 * - search: aparecer en buscadores y resultados con enlaces.
 * - ai-input: que asistentes como ChatGPT, Claude o Perplexity lean la web para responder.
 * - ai-train: que se use para entrenar modelos. Cambia a "no" si la agencia no lo quiere.
 */
export function GET() {
  const body = [
    "# Garcia Travel Fantino",
    "# Versión para IA: " + getSiteUrl("/llms.txt"),
    "",
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /api/",
    "Disallow: /md/",
    "",
    `Sitemap: ${getSiteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
