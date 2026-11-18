/**
 * Cargador de imágenes de next/image sin usar el servidor (Hostinger compartido):
 * pide a cada CDN la imagen ya recortada al ancho que necesita la pantalla y en
 * formato moderno (WebP/AVIF). Las imágenes de /public se sirven tal cual, así que
 * deben subirse ya optimizadas (WebP y al tamaño en que se muestran).
 */
type LoaderProps = { src: string; width: number; quality?: number };

const withParams = (src: string, params: Record<string, string>) => {
  const url = new URL(src);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
};

export default function imageLoader({ src, width, quality }: LoaderProps) {
  const q = String(quality ?? 70);

  if (src.startsWith("https://images.unsplash.com/")) {
    return withParams(src, { w: String(width), q, auto: "format", fit: "crop" });
  }
  if (src.startsWith("https://cdn.sanity.io/images/")) {
    return withParams(src, { w: String(width), q, auto: "format", fit: "max" });
  }
  return src;
}
