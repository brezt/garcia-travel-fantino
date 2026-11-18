import type { NextConfig } from "next";

/** Páginas públicas que también existen en Markdown (ver src/app/md). */
const markdownPages = [
  "/nosotros",
  "/contacto",
  "/privacidad",
  "/terminos",
  "/blog",
  "/blog/:slug",
  "/destinos/:slug",
  "/paquetes/:slug",
];

/**
 * Alias en inglés de las páginas institucionales. Los analizadores de IA (como el de
 * Hostinger) buscan enlaces con "about" y "terms"; el contenido es el mismo y la URL
 * canónica sigue siendo la española.
 */
const englishAliases = [
  { source: "/about", destination: "/nosotros" },
  { source: "/terms", destination: "/terminos" },
];

/** Un agente que pide "Accept: text/markdown" recibe Markdown en vez de HTML. */
const wantsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

/** Cabecera Link de la portada: anuncia a los agentes dónde está la versión para IA. */
const homeLinkHeader = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
  '</nosotros>; rel="about"',
  '</privacidad>; rel="privacy-policy"',
  '</terminos>; rel="terms-of-service"',
].join(", ");

const nextConfig: NextConfig = {
  images: {
    // Sin optimizar en el servidor: cada CDN entrega la imagen al tamaño justo (ver image-loader.ts).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    // Dirección corta para pedir reseñas en Google (tarjetas, folletos, QR).
    return ["/resena", "/resenas", "/opinion"].map((source) => ({
      source,
      destination: "https://g.page/r/CVpJOkEWoD7zEBM/review",
      permanent: false,
    }));
  },
  async rewrites() {
    return {
      beforeFiles: [
        ...englishAliases,
        { source: "/index.md", destination: "/md" },
        ...markdownPages.map((page) => ({ source: `${page}.md`, destination: `/md${page}` })),
        { source: "/", has: wantsMarkdown, destination: "/md" },
        ...markdownPages.map((page) => ({ source: page, has: wantsMarkdown, destination: `/md${page}` })),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      // Imágenes y tipografías de /public: caché larga. Si se reemplaza un archivo,
      // súbelo con otro nombre para que los navegadores lo vuelvan a descargar.
      ...["/images/:path*", "/fonts/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      })),
      {
        source: "/",
        headers: [
          { key: "Link", value: homeLinkHeader },
          { key: "Vary", value: "Accept" },
        ],
      },
      ...markdownPages.map((page) => ({
        source: page,
        headers: [{ key: "Vary", value: "Accept" }],
      })),
    ];
  },
};

export default nextConfig;
