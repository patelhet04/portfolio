// Serves a static export the way GitHub Pages does: /experience/dash → dash.html,
// directories → index.html, anything else → 404.html. Used by the end-to-end tests.
// Run with: node scripts/serve-out.mjs [dir=out] [port=4173]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
};

const isFile = (f) => stat(f).then((s) => s.isFile(), () => false);

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const base = path.join(root, path.normalize(url).replace(/^(\.\.[/\\])+/, ""));
  const candidates = [base, `${base}.html`, path.join(base, "index.html")];
  for (const file of candidates) {
    if (file.startsWith(root) && (await isFile(file))) {
      res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
      return res.end(await readFile(file));
    }
  }
  res.writeHead(404, { "content-type": types[".html"] });
  res.end(await readFile(path.join(root, "404.html")).catch(() => "Not found"));
}).listen(port, "127.0.0.1", () => console.log(`Serving ${path.relative(process.cwd(), root)}/ on http://127.0.0.1:${port}`));
