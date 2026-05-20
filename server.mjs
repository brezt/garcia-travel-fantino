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
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const getCacheControl = (filePath) => {
  const normalizedPath = filePath.replaceAll("\\", "/");
  const extension = path.extname(filePath);

  if (normalizedPath.includes("/_next/static/")) {
    return "public, max-age=31536000, immutable";
  }

  if ([".css", ".js", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".ico"].includes(extension)) {
    return "public, max-age=604800";
  }

  return "public, max-age=300";
};

const resolveFile = async (requestPath) => {
  const cleanPath = decodeURIComponent(requestPath.split("?")[0] || "/");
  const normalized = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(outDir, normalized);

  if (!filePath.startsWith(outDir)) {
    return null;
  }

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      return path.join(filePath, "index.html");
    }
    return filePath;
  } catch {
    return path.join(outDir, "index.html");
  }
};

createServer(async (req, res) => {
  try {
    const filePath = await resolveFile(req.url || "/");
    if (!filePath) {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    const body = await readFile(filePath);
    const contentType = contentTypes[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, {
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
