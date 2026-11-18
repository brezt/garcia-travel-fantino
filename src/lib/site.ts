export const siteConfig = {
  name: "Garcia Travel Fantino",
  legalName: "Garcia Travel Fantino",
  description:
    "Agencia de viajes en Fantino, República Dominicana. Cotiza vuelos, hoteles, excursiones, cruceros y paquetes turísticos a Punta Cana, Samaná, Bayahibe y destinos internacionales con asesoría personalizada.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://garciatravelfantino.com",
  phone: "+1 829 884 6811",
  phoneHref: "+18298846811",
  email: "info@garciatravelfantino.com",
  // Igual que en el Perfil de Empresa de Google (verificado): mismos datos en todas partes ayuda al SEO local.
  address: {
    street: "Calle Hermanas Mirabal",
    postalCode: "43000",
    locality: "Fantino",
    region: "Sánchez Ramírez",
    country: "DO",
  },
  /** Horario de la oficina (formato 24 h). Por WhatsApp e Instagram atienden a cualquier hora. */
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
    label: "Oficina: lunes a sábado, de 8:00 a. m. a 6:00 p. m.",
    onlineLabel: "Por WhatsApp y redes: todos los días, a cualquier hora",
  },
  mapsUrl: "https://maps.app.goo.gl/fRjMFPPwmgQexGEbA",
  instagram: "https://www.instagram.com/garciatravelfantino/",
  /** Enlace de Google para dejar una reseña (Perfil de Empresa → "Pedir reseñas"). */
  reviewUrl: "https://g.page/r/CVpJOkEWoD7zEBM/review",
  facebook: "https://www.facebook.com/GarciaTravelFantino/",
  logoPath: "/images/logo-garcia-travel-fantino.png",
  promoImagePath: "/images/promo-feria-flores-medellin.png",
  shareImagePath: "/images/hero-beach.jpg",
};

/**
 * Fecha (AAAA-MM-DD) del último cambio del contenido fijo de la web (textos que no
 * vienen del panel). Se usa como "lastmod" en el sitemap: actualízala al cambiar textos.
 */
export const SITE_UPDATED_AT = "2026-11-18";

export const getSiteUrl = (path = "/") => {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};
