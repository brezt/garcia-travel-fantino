import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

/**
 * Feed de Instagram de la agencia (posts e historias activas).
 *
 * Usa la "API de Instagram con inicio de sesión de Instagram". El token largo
 * (60 días) va en la variable INSTAGRAM_ACCESS_TOKEN de Hostinger. La web lo
 * renueva sola cada semana y guarda el token renovado en un archivo fuera de la
 * carpeta del proyecto, para que sobreviva a cada despliegue.
 */

const GRAPH_URL = process.env.INSTAGRAM_GRAPH_URL || "https://graph.instagram.com";
const API_VERSION = "v27.0";
const REFRESH_EVERY_MS = 7 * 24 * 60 * 60 * 1000;
/** Segundos que se guarda el feed antes de volver a pedirlo a Instagram. */
export const INSTAGRAM_REVALIDATE_SECONDS = 600;

const tokenFile =
  process.env.INSTAGRAM_TOKEN_FILE || path.join(homedir(), ".garcia-travel", "instagram-token.json");

type StoredToken = {
  token: string;
  refreshedAt: number;
  /** Final del token de Hostinger del que salió este, para notar si lo cambian. */
  source: string;
};

export type InstagramMedia = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  /** Imagen para mostrar (en videos, la miniatura). */
  imageUrl: string;
  /** Solo en videos. */
  videoUrl?: string;
  permalink: string;
  timestamp: string;
};

export type InstagramFeed = {
  username?: string;
  posts: InstagramMedia[];
  stories: InstagramMedia[];
};

type RawMedia = {
  id: string;
  caption?: string;
  media_type: InstagramMedia["mediaType"];
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

const readStoredToken = async (): Promise<StoredToken | null> => {
  try {
    const stored = JSON.parse(await readFile(tokenFile, "utf8")) as StoredToken;
    return stored.token ? stored : null;
  } catch {
    return null;
  }
};

const saveToken = async (stored: StoredToken) => {
  try {
    await mkdir(path.dirname(tokenFile), { recursive: true });
    await writeFile(tokenFile, JSON.stringify(stored), { mode: 0o600 });
  } catch (error) {
    console.error("[instagram] No se pudo guardar el token renovado:", (error as Error).message);
  }
};

const refreshToken = async (token: string) => {
  const url = new URL("/refresh_access_token", GRAPH_URL);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);
  // Sin "no-store": la portada se regenera en segundo plano (ISR) y no puede
  // usar peticiones sin caché. La URL lleva el token, así que no se reutiliza.
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`refresh ${response.status}`);
  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("refresh sin token");
  return data.access_token;
};

/** Devuelve un token válido, renovándolo si toca. */
const getAccessToken = async () => {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!envToken) return null;

  const source = envToken.slice(-12);
  const stored = await readStoredToken();
  // Si alguien pone un token nuevo en Hostinger, ese manda sobre el guardado.
  const current: StoredToken =
    stored?.source === source ? stored : { token: envToken, refreshedAt: 0, source };

  if (Date.now() - current.refreshedAt < REFRESH_EVERY_MS) {
    return current.token;
  }

  try {
    const token = await refreshToken(current.token);
    await saveToken({ token, refreshedAt: Date.now(), source });
    return token;
  } catch (error) {
    // Un token recién creado (menos de 24 h) todavía no se puede renovar: se usa tal cual.
    console.error("[instagram] No se pudo renovar el token:", (error as Error).message);
    return current.token;
  }
};

const mediaFields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

const graphGet = async <T>(pathname: string, token: string, params: Record<string, string> = {}) => {
  const url = new URL(`/${API_VERSION}${pathname}`, GRAPH_URL);
  url.searchParams.set("access_token", token);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, { next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS, tags: ["instagram"] } });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${pathname} ${response.status} ${body.slice(0, 200)}`);
  }
  return (await response.json()) as T;
};

const toMedia = (raw: RawMedia): InstagramMedia | null => {
  const imageUrl = raw.media_type === "VIDEO" ? raw.thumbnail_url : raw.media_url;
  if (!imageUrl && !raw.media_url) return null;
  return {
    id: raw.id,
    caption: raw.caption ?? "",
    mediaType: raw.media_type,
    imageUrl: imageUrl ?? raw.media_url ?? "",
    videoUrl: raw.media_type === "VIDEO" ? raw.media_url : undefined,
    permalink: raw.permalink ?? "",
    timestamp: raw.timestamp ?? "",
  };
};

/** Feed de Instagram, o null si la cuenta todavía no está conectada o falla. */
export const getInstagramFeed = async (): Promise<InstagramFeed | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const [profile, media] = await Promise.all([
      graphGet<{ username?: string }>("/me", token, { fields: "username" }).catch(() => ({ username: undefined })),
      graphGet<{ data: RawMedia[] }>("/me/media", token, { fields: mediaFields, limit: "12" }),
    ]);

    // Las historias solo existen 24 h. Si la API no las da, la sección sigue con los posts.
    const stories = await graphGet<{ data: RawMedia[] }>("/me/stories", token, { fields: mediaFields })
      .then((response) => response.data)
      .catch((error: Error) => {
        console.error("[instagram] Historias no disponibles:", error.message);
        return [] as RawMedia[];
      });

    return {
      username: profile.username,
      posts: media.data.map(toMedia).filter((item): item is InstagramMedia => item !== null),
      stories: stories.map(toMedia).filter((item): item is InstagramMedia => item !== null),
    };
  } catch (error) {
    console.error("[instagram] No se pudo leer el feed:", (error as Error).message);
    return null;
  }
};
