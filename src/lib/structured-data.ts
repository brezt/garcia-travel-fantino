import { getSiteUrl, siteConfig } from "@/lib/site";
import { aboutIntro, services } from "@/lib/about";
import { isExpired, resolveContentImageUrl, type ContentPage } from "@/lib/travel-content";

/** Identificadores estables para enlazar las entidades entre páginas. */
export const ORGANIZATION_ID = getSiteUrl("/#travel-agency");
export const WEBSITE_ID = getSiteUrl("/#website");

/**
 * Ficha de la agencia (schema.org TravelAgency). Solo lleva datos reales que ya
 * están en la web: faltan dirección exacta, código postal, horario y coordenadas.
 */
export const getOrganizationJsonLd = () => ({
  // "Organization" explícito porque algunos analizadores no reconocen TravelAgency como subtipo.
  "@type": ["TravelAgency", "Organization"],
  "@id": ORGANIZATION_ID,
  name: siteConfig.name,
  // Formas en que la gente busca la agencia (con tilde, sin "Fantino").
  alternateName: ["García Travel Fantino", "Garcia Travel", "García Travel"],
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  disambiguatingDescription: aboutIntro,
  url: getSiteUrl(),
  logo: {
    "@type": "ImageObject",
    url: getSiteUrl(siteConfig.logoPath),
    width: 1024,
    height: 1024,
  },
  image: getSiteUrl(siteConfig.shareImagePath),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  hasMap: siteConfig.mapsUrl,
  areaServed: [
    { "@type": "Country", name: "República Dominicana" },
    { "@type": "City", name: siteConfig.address.locality },
  ],
  knowsLanguage: "es",
  sameAs: [siteConfig.instagram, siteConfig.facebook, siteConfig.mapsUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      areaServed: "DO",
      availableLanguage: ["es"],
      url: getSiteUrl("/contacto"),
    },
    {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "sales",
      contactOption: "WhatsApp",
      areaServed: "DO",
      availableLanguage: ["es"],
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de viaje",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  },
  publishingPrinciples: getSiteUrl("/terminos"),
});

export const getWebSiteJsonLd = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: siteConfig.name,
  url: getSiteUrl(),
  description: siteConfig.description,
  inLanguage: "es-DO",
  publisher: { "@id": ORGANIZATION_ID },
});

/** JSON-LD común a todas las páginas: la agencia y el sitio web. */
export const getSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [getOrganizationJsonLd(), getWebSiteJsonLd()],
});

export type Crumb = { name: string; path: string };

export const getBreadcrumbJsonLd = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Inicio", path: "/" }, ...crumbs].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: getSiteUrl(crumb.path),
  })),
});

/** Página simple (nosotros, contacto, legales, blog) con su ruta de migas. */
export const getPageJsonLd = (
  type: "AboutPage" | "ContactPage" | "WebPage" | "CollectionPage",
  name: string,
  path: string,
  description?: string
) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": type,
      "@id": getSiteUrl(`${path}#webpage`),
      name,
      description,
      url: getSiteUrl(path),
      inLanguage: "es-DO",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
    },
    getBreadcrumbJsonLd([{ name, path }]),
  ],
});

/** Saca el precio numérico y la moneda de textos como "USD 850 p/p en DBL-TPL". */
const parsePrice = (price?: string) => {
  if (!price) return undefined;
  const currency = /US\$|USD|\$/i.test(price) ? "USD" : /RD\$|DOP/i.test(price) ? "DOP" : undefined;
  const amount = price.match(/\d[\d.,]*/)?.[0]?.replace(/,/g, "");
  return currency && amount ? { price: amount, priceCurrency: currency } : undefined;
};

export const getContentPath = (page: ContentPage) =>
  page.type === "package" ? `/paquetes/${page.slug}` : `/destinos/${page.slug}`;

/** Paquete (TouristTrip + Offer) o destino (TouristDestination), con migas y preguntas frecuentes. */
export const getContentJsonLd = (page: ContentPage) => {
  const path = getContentPath(page);
  const url = getSiteUrl(path);
  const image = resolveContentImageUrl(page.heroImage);
  const parsedPrice = parsePrice(page.price);

  const main =
    page.type === "package"
      ? {
          "@type": "TouristTrip",
          "@id": `${url}#trip`,
          name: page.title,
          description: page.description,
          url,
          image,
          ...(page.location ? { itinerary: { "@type": "Place", name: page.location } } : {}),
          provider: { "@id": ORGANIZATION_ID },
          offers: {
            "@type": "Offer",
            url,
            ...(parsedPrice ?? {}),
            ...(page.price ? { description: page.price } : {}),
            ...(page.validUntil ? { validThrough: page.validUntil } : {}),
            availability: isExpired(page)
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
            seller: { "@id": ORGANIZATION_ID },
          },
        }
      : {
          "@type": "TouristDestination",
          "@id": `${url}#destination`,
          name: page.title,
          description: page.description,
          url,
          image,
          ...(page.location ? { containedInPlace: { "@type": "Place", name: page.location } } : {}),
          ...(page.highlights.length > 0
            ? {
                includesAttraction: page.highlights.map((highlight) => ({
                  "@type": "TouristAttraction",
                  name: highlight,
                })),
              }
            : {}),
          provider: { "@id": ORGANIZATION_ID },
        };

  return {
    "@context": "https://schema.org",
    "@graph": [
      main,
      getBreadcrumbJsonLd([
        {
          name: page.type === "package" ? "Paquetes" : "Destinos",
          path: page.type === "package" ? "/paquetes" : "/destinos",
        },
        { name: page.shortTitle, path },
      ]),
      ...(page.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: page.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };
};

/** Portada: la página y la lista de destinos y promociones que muestra. */
export const getHomeJsonLd = (pages: ContentPage[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": getSiteUrl("/#webpage"),
      name: siteConfig.name,
      description: siteConfig.description,
      url: getSiteUrl(),
      inLanguage: "es-DO",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: { "@id": getSiteUrl("/#destinos-y-promociones") },
    },
    {
      "@type": "ItemList",
      "@id": getSiteUrl("/#destinos-y-promociones"),
      name: "Destinos y promociones",
      itemListElement: pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.title,
        url: getSiteUrl(getContentPath(page)),
      })),
    },
  ],
});

/** Página de listado (/destinos o /paquetes): la colección, sus elementos y las migas. */
export const getListJsonLd = (name: string, path: string, description: string, pages: ContentPage[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": getSiteUrl(`${path}#webpage`),
      name,
      description,
      url: getSiteUrl(path),
      inLanguage: "es-DO",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: pages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: getSiteUrl(getContentPath(page)),
        })),
      },
    },
    getBreadcrumbJsonLd([{ name, path }]),
  ],
});
