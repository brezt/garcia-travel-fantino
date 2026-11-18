import { markdownForPath } from "@/lib/markdown";
import { getSiteUrl } from "@/lib/site";

// Se regenera como mucho cada minuto, igual que las páginas.
export const revalidate = 60;

/**
 * Markdown de cada página para agentes de IA. No se enlaza directamente:
 * llega aquí por /index.md, /<ruta>.md o con "Accept: text/markdown" (ver next.config.ts).
 */
export async function GET(request: Request, ctx: RouteContext<"/md/[[...path]]">) {
  const { path = [] } = await ctx.params;
  const markdown = await markdownForPath(path);

  if (markdown === null) {
    return new Response("# Página no encontrada\n", {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const htmlPath = path.length === 0 || path[0] === "index" ? "/" : `/${path.join("/")}`;

  return new Response(`${markdown.trim()}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${getSiteUrl(htmlPath)}>; rel="canonical"`,
      Vary: "Accept",
      // Si llegó por "Accept: text/markdown" a una dirección normal, que ninguna caché
      // intermedia guarde este Markdown y se lo muestre a un navegador.
      "Cache-Control": request.headers.get("accept")?.includes("text/markdown")
        ? "private, no-cache"
        : "public, max-age=0, s-maxage=60",
    },
  });
}
