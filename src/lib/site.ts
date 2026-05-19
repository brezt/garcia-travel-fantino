export const siteConfig = {
  name: "Garcia Travel Fantino",
  legalName: "Garcia Travel Fantino",
  description:
    "Agencia de viajes en Fantino, Republica Dominicana. Cotiza vuelos, hoteles, excursiones, cruceros y paquetes turisticos nacionales e internacionales con asesoria personalizada.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://garciatravelfantino.com",
  phone: "+1 829 884 6811",
  phoneHref: "+18298846811",
  email: "info@garciatravelfantino.com",
  address: {
    locality: "Fantino",
    region: "Sanchez Ramirez",
    country: "DO",
  },
  mapsUrl: "https://maps.app.goo.gl/fRjMFPPwmgQexGEbA",
  instagram: "https://www.instagram.com/garciatravelfantino/",
  facebook: "https://www.facebook.com/GarciaTravelFantino/",
  logoPath: "/images/logo-garcia-travel-fantino.png",
  promoImagePath: "/images/promo-feria-flores-medellin.png",
};

export const getSiteUrl = (path = "/") => {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};
