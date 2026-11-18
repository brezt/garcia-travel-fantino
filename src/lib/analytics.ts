/**
 * Medición de visitas: Google Analytics 4 y píxel de Meta (Facebook/Instagram).
 *
 * Los IDs no son secretos (aparecen en el HTML de cualquier web que los use).
 *   Google Analytics: DEFAULT_GA_ID, o NEXT_PUBLIC_GA_ID en Hostinger para cambiarlo
 *     (NEXT_PUBLIC_GA_ID=off lo desactiva).
 *   Píxel de Meta: NEXT_PUBLIC_META_PIXEL_ID en Hostinger (o DEFAULT_META_PIXEL_ID).
 * Las variables se leen al compilar: tras cambiarlas hay que volver a implementar.
 * Guía: ANALYTICS_SETUP.md
 */

const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;
const META_PIXEL_PATTERN = /^\d{6,20}$/;

/** Propiedad "Garcia Travel Fantino" de Google Analytics (flujo web, creado el 2026-11-18). */
const DEFAULT_GA_ID = "G-4CT4YG1F19";
/** Píxel de Meta: vacío hasta crearlo. */
const DEFAULT_META_PIXEL_ID = "";

const rawGaId = (process.env.NEXT_PUBLIC_GA_ID?.trim() || DEFAULT_GA_ID).toUpperCase();
const rawPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || DEFAULT_META_PIXEL_ID;

/** ID de Google Analytics, o cadena vacía si no está configurado o no es válido. */
export const GA_ID = GA_ID_PATTERN.test(rawGaId) ? rawGaId : "";
/** ID del píxel de Meta, o cadena vacía si no está configurado o no es válido. */
export const META_PIXEL_ID = META_PIXEL_PATTERN.test(rawPixelId) ? rawPixelId : "";

export const analyticsEnabled = Boolean(GA_ID || META_PIXEL_ID);

/** Rutas donde no se mide nada (el panel de administración). */
export const isUntrackedPath = (pathname: string | null | undefined) =>
  !!pathname && (pathname === "/admin" || pathname.startsWith("/admin/"));

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const getWindow = (): AnalyticsWindow | null =>
  typeof window === "undefined" ? null : (window as AnalyticsWindow);

/** Registra una visita de página en el píxel de Meta (GA4 ya las cuenta solo). */
export const trackMetaPageView = () => {
  const w = getWindow();
  if (META_PIXEL_ID && w?.fbq) w.fbq("track", "PageView");
};

/**
 * Clic en cualquier botón o enlace de WhatsApp.
 * `origen` dice desde dónde se hizo clic (p. ej. "header", "paquete", "formulario").
 */
export const trackWhatsAppClick = (origen: string) => {
  const w = getWindow();
  if (!w || isUntrackedPath(w.location.pathname)) return;
  const pagina = w.location.pathname;
  if (GA_ID && w.gtag) {
    w.gtag("event", "whatsapp_click", { origen, pagina, transport_type: "beacon" });
  }
  if (META_PIXEL_ID && w.fbq) {
    w.fbq("track", "Contact", { content_name: origen, content_category: "whatsapp" });
  }
};

/** Envío del formulario de contacto (cuenta como cliente potencial). */
export const trackContactFormSubmit = () => {
  const w = getWindow();
  if (!w) return;
  const pagina = w.location.pathname;
  if (GA_ID && w.gtag) {
    w.gtag("event", "generate_lead", { origen: "formulario", pagina, transport_type: "beacon" });
  }
  if (META_PIXEL_ID && w.fbq) {
    w.fbq("track", "Lead", { content_name: "formulario de contacto" });
  }
};

/** Devuelve true si la URL abre una conversación de WhatsApp. */
export const isWhatsAppUrl = (href: string) =>
  /^https?:\/\/(api\.whatsapp\.com|wa\.me|web\.whatsapp\.com|chat\.whatsapp\.com)\//i.test(href);
