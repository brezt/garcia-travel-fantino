export const phoneNumber = "18298846811";

export const getWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
};

export const openWhatsApp = (message: string) => {
  const whatsappUrl = getWhatsAppUrl(message);
  window.location.assign(whatsappUrl);
};
