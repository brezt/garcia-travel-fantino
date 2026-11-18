import type { PortableTextBlock } from "next-sanity";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { aboutIntro, mission, services, values, vision } from "@/lib/about";
import { LEGAL_UPDATED_AT, privacySections, termsSections, type LegalSection } from "@/lib/legal";
import { getContentPath } from "@/lib/structured-data";
import { isExpired, type ContentPage } from "@/lib/travel-content";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  getActivePackages,
  getDestinationBySlug,
  getDestinations,
  getPackageBySlug,
  getPostBySlug,
  getPosts,
  type PostSummary,
} from "@/lib/cms";

/**
 * Versiones en Markdown de las páginas, para asistentes de IA y agentes.
 * Se sirven en /index.md, /destinos/<slug>.md, etc., y también cuando un agente
 * pide la página normal con la cabecera "Accept: text/markdown".
 */

const link = (text: string, path: string) => `[${text}](${getSiteUrl(path)})`;

const contactBlock = () =>
  [
    "## Contacto",
    "",
    `- Teléfono y WhatsApp: ${siteConfig.phone}`,
    `- WhatsApp directo: ${getWhatsAppUrl("Hola Garcia Travel, me gustaría cotizar un viaje.")}`,
    `- Correo: ${siteConfig.email}`,
    `- Horario: ${siteConfig.openingHours.label}. ${siteConfig.openingHours.onlineLabel}.`,
    `- Ubicación: ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.locality}, provincia ${siteConfig.address.region}, República Dominicana ([Google Maps](${siteConfig.mapsUrl}))`,
    `- Instagram: ${siteConfig.instagram}`,
    `- Facebook: ${siteConfig.facebook}`,
    `- Formulario: ${getSiteUrl("/contacto")}`,
  ].join("\n");

const pageList = (pages: ContentPage[]) =>
  pages
    .map((page) => `- ${link(page.title, getContentPath(page))}: ${page.description}`)
    .join("\n");

const postList = (posts: PostSummary[]) =>
  posts.map((post) => `- ${link(post.title, `/blog/${post.slug}`)}${post.excerpt ? `: ${post.excerpt}` : ""}`).join("\n");

export const homeMarkdown = async () => {
  const [destinations, packages, posts] = await Promise.all([
    getDestinations(),
    getActivePackages(),
    getPosts(10),
  ]);

  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    aboutIntro,
    "",
    "## Servicios",
    "",
    services.map((service) => `- ${service}`).join("\n"),
    "",
    "Todas las cotizaciones son personalizadas: escríbenos por WhatsApp con destino, fechas y cantidad de personas.",
    "",
    "## Destinos",
    "",
    pageList(destinations),
    "",
    "## Promociones vigentes",
    "",
    packages.length > 0 ? pageList(packages) : "No hay promociones publicadas en este momento. Pregunta por WhatsApp por las próximas salidas.",
    ...(posts.length > 0 ? ["", "## Blog", "", postList(posts)] : []),
    "",
    contactBlock(),
    "",
    "## Más información",
    "",
    `- ${link("Sobre nosotros", "/nosotros")}`,
    `- ${link("Política de privacidad", "/privacidad")}`,
    `- ${link("Términos y condiciones", "/terminos")}`,
  ].join("\n");
};

export const contentPageMarkdown = (page: ContentPage) =>
  [
    `# ${page.title}`,
    "",
    `> ${page.description}`,
    "",
    ...(isExpired(page) ? ["**Esta promoción ya finalizó.** Escríbenos para conocer próximas salidas.", ""] : []),
    ...(page.location ? [`- Ubicación: ${page.location}`] : []),
    ...(page.duration ? [`- Fechas o duración: ${page.duration}`] : []),
    ...(page.price ? [`- Precio: ${page.price}`] : []),
    ...(page.validUntil ? [`- Válido hasta: ${page.validUntil}`] : []),
    `- Página: ${getSiteUrl(getContentPath(page))}`,
    "",
    ...(page.highlights.length > 0
      ? ["## Incluye / destacados", "", page.highlights.map((item) => `- ${item}`).join("\n"), ""]
      : []),
    ...page.sections.flatMap((section) => [`## ${section.title}`, "", section.body, ""]),
    ...(page.documents && page.documents.length > 0
      ? ["## Documentos", "", page.documents.map((doc) => `- [${doc.title}](${doc.url})`).join("\n"), ""]
      : []),
    ...(page.faq.length > 0
      ? [
          "## Preguntas frecuentes",
          "",
          page.faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n"),
          "",
        ]
      : []),
    "## Cotizar",
    "",
    `Escríbenos por WhatsApp: ${getWhatsAppUrl(page.whatsappMessage)}`,
    "",
    contactBlock(),
  ].join("\n");

const portableTextToMarkdown = (blocks: PortableTextBlock[]) =>
  blocks
    .map((block) => {
      const text = Array.isArray(block.children)
        ? block.children.map((child) => ("text" in child ? String(child.text) : "")).join("")
        : "";
      if (!text.trim()) return "";
      switch (block.style) {
        case "h2":
          return `## ${text}`;
        case "h3":
          return `### ${text}`;
        case "h4":
          return `#### ${text}`;
        case "blockquote":
          return `> ${text}`;
        default:
          return block.listItem ? `- ${text}` : text;
      }
    })
    .filter(Boolean)
    .join("\n\n");

const blogMarkdown = async () => {
  const posts = await getPosts();
  return [
    "# Blog de viajes",
    "",
    `> Consejos, destinos y novedades de viaje de ${siteConfig.name}.`,
    "",
    posts.length > 0 ? postList(posts) : "Todavía no hay artículos publicados.",
  ].join("\n");
};

const aboutMarkdown = () =>
  [
    `# Sobre ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    aboutIntro,
    "",
    "## Misión",
    "",
    mission,
    "",
    "## Visión",
    "",
    vision,
    "",
    "## Valores",
    "",
    values.map((value) => `- ${value}`).join("\n"),
    "",
    "## Servicios",
    "",
    services.map((service) => `- ${service}`).join("\n"),
    "",
    contactBlock(),
  ].join("\n");

const contactMarkdown = () =>
  [
    `# Contacto de ${siteConfig.name}`,
    "",
    "Cotiza tu viaje con un asesor. La forma más rápida es WhatsApp.",
    "",
    contactBlock(),
  ].join("\n");

const legalMarkdown = (title: string, sections: LegalSection[]) =>
  [
    `# ${title}`,
    "",
    `Última actualización: ${LEGAL_UPDATED_AT}`,
    "",
    ...sections.flatMap((section) => [`## ${section.title}`, "", section.body.join("\n\n"), ""]),
  ].join("\n");

/** Devuelve el Markdown de una ruta pública, o null si no existe. */
export const markdownForPath = async (segments: string[]): Promise<string | null> => {
  const [first, second, ...rest] = segments;
  if (rest.length > 0) return null;

  if (!first || first === "index") return second ? null : homeMarkdown();

  if (!second) {
    switch (first) {
      case "nosotros":
        return aboutMarkdown();
      case "contacto":
        return contactMarkdown();
      case "privacidad":
        return legalMarkdown("Política de privacidad", privacySections);
      case "terminos":
        return legalMarkdown("Términos y condiciones", termsSections);
      case "blog":
        return blogMarkdown();
      default:
        return null;
    }
  }

  if (first === "destinos") {
    const page = await getDestinationBySlug(second);
    return page ? contentPageMarkdown(page) : null;
  }
  if (first === "paquetes") {
    const page = await getPackageBySlug(second);
    return page ? contentPageMarkdown(page) : null;
  }
  if (first === "blog") {
    const post = await getPostBySlug(second);
    if (!post) return null;
    return [
      `# ${post.title}`,
      "",
      `Publicado: ${post.publishedAt.slice(0, 10)}`,
      "",
      ...(post.excerpt ? [`> ${post.excerpt}`, ""] : []),
      portableTextToMarkdown(post.body),
      "",
      contactBlock(),
    ].join("\n");
  }
  return null;
};
