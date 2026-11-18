import { analyticsEnabled, trackWhatsAppClick } from "@/lib/analytics";

export const phoneNumber = "18298846811";

export const getWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
};

/**
 * Abre WhatsApp con el mensaje. `origen` indica desde qué botón se abrió
 * (se usa en Google Analytics y el píxel de Meta, si están activos).
 */
export const openWhatsApp = (message: string, origen = "boton") => {
  const whatsappUrl = getWhatsAppUrl(message);
  if (!analyticsEnabled) {
    window.location.assign(whatsappUrl);
    return;
  }
  trackWhatsAppClick(origen);
  // Breve espera para que la medición salga antes de dejar la página.
  window.setTimeout(() => window.location.assign(whatsappUrl), 150);
};
