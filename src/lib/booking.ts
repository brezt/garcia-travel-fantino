/**
 * Enlaces de afiliado a Booking.com para la pestaña «Solo hotel» del buscador.
 *
 * Se configura con la variable de entorno NEXT_PUBLIC_BOOKING_AFFILIATE en Hostinger
 * (hay que volver a publicar el sitio después de cambiarla). Acepta dos formatos:
 *
 * 1. El ID de afiliado de Booking («aid»), solo números. Ej.: 1234567
 *    Se añade como ?aid=1234567 al enlace de búsqueda de Booking.
 *
 * 2. Un enlace profundo de CJ Affiliate que termine en «url=». Ej.:
 *    https://www.anrdoezrs.net/click-1234567-7654321?url=
 *    Se le añade al final la búsqueda de Booking codificada.
 *
 * Si la variable está vacía, la pestaña «Solo hotel» no se muestra.
 */
const affiliate = (process.env.NEXT_PUBLIC_BOOKING_AFFILIATE || "").trim();

export const isBookingEnabled = affiliate.length > 0;

export type HotelSearch = {
  destination: string;
  checkin: string; // AAAA-MM-DD
  checkout: string; // AAAA-MM-DD
  adults: number;
  children: number;
  rooms: number;
};

export const buildBookingSearchUrl = (search: HotelSearch) => {
  const params = new URLSearchParams({
    ss: search.destination,
    group_adults: String(search.adults),
    group_children: String(search.children),
    no_rooms: String(search.rooms),
    lang: "es",
    selected_currency: "USD",
  });

  if (search.checkin) params.set("checkin", search.checkin);
  if (search.checkout) params.set("checkout", search.checkout);

  if (/^\d+$/.test(affiliate)) {
    params.set("aid", affiliate);
  }

  const bookingUrl = `https://www.booking.com/searchresults.es.html?${params.toString()}`;

  if (/^https:\/\//.test(affiliate) && affiliate.endsWith("url=")) {
    return `${affiliate}${encodeURIComponent(bookingUrl)}`;
  }

  return bookingUrl;
};
