import { getSiteUrl, siteConfig } from "@/lib/site";

/**
 * Clave de IndexNow (https://www.indexnow.org). No es secreta: Bing la lee en
 * https://garciatravelfantino.com/e3c0ef11f628c8853e347ed513847066.txt para comprobar que la web es nuestra.
 */
export const INDEXNOW_KEY = "e3c0ef11f628c8853e347ed513847066";

/**
 * Avisa a Bing (y a los demás buscadores que usan IndexNow, como Yandex o Seznam)
 * de que estas páginas cambiaron, para que las vuelvan a leer sin esperar.
 */
export const submitToIndexNow = async (paths: string[]) => {
  const host = new URL(siteConfig.url).host;
  const urlList = [...new Set(paths)].map((path) => getSiteUrl(path));

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: getSiteUrl(`/${INDEXNOW_KEY}.txt`),
        urlList,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return { ok: response.ok, status: response.status, urlList };
  } catch (error) {
    console.error("[indexnow]", error instanceof Error ? error.message : error);
    return { ok: false, status: 0, urlList };
  }
};
