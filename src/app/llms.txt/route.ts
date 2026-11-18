import { getSiteUrl, siteConfig } from "@/lib/site";
import { aboutIntro, services } from "@/lib/about";
import { getContentPath } from "@/lib/structured-data";
import { getActivePackages, getDestinations, getPosts } from "@/lib/cms";

// Se regenera como mucho cada minuto para incluir lo que se publique en el panel.
export const revalidate = 60;

/** Guía del sitio para modelos de lenguaje (formato https://llmstxt.org). */
export async function GET() {
  const [destinations, packages, posts] = await Promise.all([
    getDestinations(),
    getActivePackages(),
    getPosts(20),
  ]);

  const md = (path: string) => getSiteUrl(path === "/" ? "/index.md" : `${path}.md`);

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    aboutIntro,
    "",
    `Servicios: ${services.join(", ")}.`,
    `Contacto: teléfono y WhatsApp ${siteConfig.phone}, correo ${siteConfig.email}. Ubicación: ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.locality}, ${siteConfig.address.region}, República Dominicana.`,
    "Las cotizaciones son personalizadas y se hacen por WhatsApp o con el formulario de contacto.",
    "Cada página está disponible en Markdown añadiendo .md a la dirección, o pidiendo la página con la cabecera Accept: text/markdown.",
    "",
    "## Agencia",
    "",
    `- [Inicio](${md("/")}): resumen de la agencia, destinos, promociones y contacto`,
    `- [Sobre nosotros](${md("/nosotros")}): misión, visión, valores y servicios`,
    `- [Contacto](${md("/contacto")}): teléfono, WhatsApp, correo y ubicación`,
    "",
    "## Destinos",
    "",
    ...destinations.map((page) => `- [${page.title}](${md(getContentPath(page))}): ${page.description}`),
    "",
    "## Promociones vigentes",
    "",
    ...(packages.length > 0
      ? packages.map(
          (page) =>
            `- [${page.title}](${md(getContentPath(page))}): ${page.description}${page.price ? ` Precio: ${page.price}.` : ""}`
        )
      : ["- No hay promociones publicadas en este momento."]),
    ...(posts.length > 0
      ? ["", "## Blog", "", ...posts.map((post) => `- [${post.title}](${md(`/blog/${post.slug}`)})${post.excerpt ? `: ${post.excerpt}` : ""}`)]
      : []),
    "",
    "## Optional",
    "",
    `- [Política de privacidad](${md("/privacidad")})`,
    `- [Términos y condiciones](${md("/terminos")})`,
    `- [Sitemap](${getSiteUrl("/sitemap.xml")})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
