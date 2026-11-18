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

/** Un agente que pide "Accept: text/markdown" recibe Markdown en vez de HTML. */
const wantsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

/** Cabecera Link de la portada: anuncia a los agentes dónde está la versión para IA. */
const homeLinkHeader = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</nosotros>; rel="about"',
  '</privacidad>; rel="privacy-policy"',
  '</terminos>; rel="terms-of-service"',
].join(", ");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
  async rewrites() {
    return {
      beforeFiles: [
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
