import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(rootDir, "out");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".webm": "video/webm",
  ".xml": "application/xml; charset=utf-8",
};

const getCacheControl = (filePath) => {
  const normalizedPath = filePath.replaceAll("\\", "/");
  const extension = path.extname(filePath);

  if (normalizedPath.includes("/_next/static/")) {
    return "public, max-age=31536000, immutable";
  }

  if ([".css", ".js", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".ico", ".mp4", ".webm"].includes(extension)) {
    return "public, max-age=604800";
  }

  return "public, max-age=300";
};

const isFile = async (filePath) => {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
};

// Devuelve { filePath, status }. Las páginas exportadas viven como
// /destinos/punta-cana.html, así que también se prueba la extensión .html.
const resolveFile = async (requestPath) => {
  const cleanPath = decodeURIComponent(requestPath.split("?")[0] || "/");
  const normalized = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(outDir, normalized);

  if (!filePath.startsWith(outDir)) {
    return null;
  }

  const candidates = [
    filePath,
    `${filePath.replace(/[/\\]$/, "")}.html`,
    path.join(filePath, "index.html"),
  ];

  for (const candidate of candidates) {
    if (await isFile(candidate)) {
      return { filePath: candidate, status: 200 };
    }
  }

  return { filePath: path.join(outDir, "404.html"), status: 404 };
};

createServer(async (req, res) => {
  try {
    const resolved = await resolveFile(req.url || "/");
    if (!resolved) {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    const { filePath, status } = resolved;
    const body = await readFile(filePath);
    const contentType = contentTypes[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(status, {
      "Cache-Control": getCacheControl(filePath),
      "Content-Type": contentType,
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, hostname, () => {
  console.log(`Garcia Travel Fantino static server ready on http://${hostname}:${port}`);
});
