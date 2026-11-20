/**
 * Reseñas del Perfil de Empresa de Google (Places API, versión nueva).
 *
 * Se activan solas cuando existe la variable de entorno GOOGLE_PLACES_API_KEY
 * (ver GOOGLE_REVIEWS_SETUP.md). Opcional: GOOGLE_PLACE_ID; si falta, se busca
 * el lugar por su nombre. Google devuelve como máximo 5 reseñas (las que
 * considera más relevantes) y la nota media. Se piden como mucho una vez al día.
 * Si algo falla, devuelve null y la web muestra los testimonios del panel.
 */

const API = "https://places.googleapis.com/v1";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const SEARCH_QUERY = "Agencia de Viaje García Travel Fantino, Fantino, República Dominicana";

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  when: string;
};

export type GoogleReviews = {
  rating: number;
  total: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

const findPlaceId = async (key: string) => {
  const response = await fetch(`${API}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: SEARCH_QUERY, languageCode: "es" }),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error(`searchText ${response.status}`);
  const data = (await response.json()) as { places?: { id: string }[] };
  return data.places?.[0]?.id;
};

export const getGoogleReviews = async (): Promise<GoogleReviews | null> => {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!key) return null;

  try {
    const placeId = process.env.GOOGLE_PLACE_ID?.trim() || (await findPlaceId(key));
    if (!placeId) throw new Error("no se encontró el lugar");

    const response = await fetch(`${API}/places/${encodeURIComponent(placeId)}?languageCode=es`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`place ${response.status}`);
    const place = (await response.json()) as PlaceResponse;

    const reviews = (place.reviews ?? [])
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "Cliente de Google",
        authorUrl: review.authorAttribution?.uri,
        authorPhoto: review.authorAttribution?.photoUri,
        rating: review.rating ?? 5,
        text: (review.originalText?.text ?? review.text?.text ?? "").trim(),
        when: review.relativePublishTimeDescription ?? "",
      }))
      // Se muestran tal como las da Google (sin elegir por estrellas); solo se omiten las que no tienen texto.
      .filter((review) => review.text);

    if (!place.rating || reviews.length === 0) return null;

    return {
      rating: place.rating,
      total: place.userRatingCount ?? reviews.length,
      mapsUrl: place.googleMapsUri,
      reviews,
    };
  } catch (error) {
    console.error("[google-reviews] No se pudieron leer las reseñas:", error instanceof Error ? error.message : error);
    return null;
  }
};
