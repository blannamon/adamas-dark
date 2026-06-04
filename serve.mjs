import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";

  // Try the path as-is, then append index.html for directory URLs (Netlify pretty URLs)
  const candidates = [
    path.join(__dirname, urlPath),
    path.join(__dirname, urlPath, "index.html"),
    path.join(__dirname, urlPath.replace(/\/$/, "") + ".html"),
  ];

  function tryNext(i) {
    if (i >= candidates.length) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    fs.readFile(candidates[i], (err, data) => {
      if (err) { tryNext(i + 1); return; }
      const ext = path.extname(candidates[i]);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  }

  tryNext(0);
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
