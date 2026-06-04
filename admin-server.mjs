import http      from 'http';
import fs        from 'fs';
import fsp       from 'fs/promises';
import path      from 'path';
import { fileURLToPath } from 'url';
import crypto    from 'crypto';
import sharp     from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3001;

// ── CONFIG ────────────────────────────────────────────────────────────────
const ADMIN_LOGIN    = 'adamasadmin';
const ADMIN_PASSWORD = 'adamasgoldchisinaumd';
const SUPABASE_URL   = 'https://rqrsmlbrsgmvsfxfthba.supabase.co';
// Найди ключ: Supabase Dashboard → Settings → API → service_role (secret)
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnNtbGJyc2dtdnNmeGZ0aGJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgxMTgyNywiZXhwIjoyMDk1Mzg3ODI3fQ.GTUCGbfUG9zC914_q8ph1Y9OMJItvkm-hxRsrxvaflI';

// ── SESSIONS ──────────────────────────────────────────────────────────────
const sessions = new Map();

// ── HELPERS ───────────────────────────────────────────────────────────────
function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type, x-admin-token',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try   { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

function checkAuth(req) {
  const token = req.headers['x-admin-token'];
  return token && sessions.has(token);
}

async function sbFetch(method, endpoint, body) {
  const opts = {
    method,
    headers: {
      'apikey':       SUPABASE_SERVICE_KEY,
      'Authorization':'Bearer ' + SUPABASE_SERVICE_KEY,
      'Content-Type': 'application/json',
      'Prefer':       'return=representation',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res  = await fetch(SUPABASE_URL + endpoint, opts);
  const text = await res.text();
  return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null };
}

// Save uploaded image to all 4 render slots (full-size + thumbnail)
const DARK_DIR   = path.join(__dirname, 'assets/renders/Dark');
const DARK_THUMB = path.join(__dirname, 'assets/renders/Dark/renders_thumbs');

// Return sorted list of existing WebP photos for a product id (all in renders_thumbs)
async function listPhotos(id) {
  const files = await fsp.readdir(DARK_THUMB);
  const re    = new RegExp(`^m${id}(-\\d+)?\\.webp$`);
  return files
    .filter(f => re.test(f))
    .sort((a, b) => {
      const numA = (a.match(/-(\d+)\./) || [0, 0])[1];
      const numB = (b.match(/-(\d+)\./) || [0, 0])[1];
      return Number(numA) - Number(numB);
    });
}

// Next available filename — always .webp
async function nextFilename(id) {
  const existing = await listPhotos(id);
  const main = `m${id}.webp`;
  if (!existing.includes(main)) return main;
  for (let n = 2; n < 99; n++) {
    const name = `m${id}-${n}.webp`;
    if (!existing.includes(name)) return name;
  }
}

// Convert any image to WebP and save to renders_thumbs/
async function savePhoto(id, base64, filename) {
  const buf      = Buffer.from(base64.replace(/^data:[^;]+;base64,/, ''), 'base64');
  const webpName = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '') + '.webp';
  const dest     = path.join(DARK_THUMB, webpName);
  await sharp(buf).webp({ quality: 88 }).toFile(dest);
  console.log(`Сохранено: renders_thumbs/${webpName}`);
}

// Called from product save (main image)
async function saveImages(id, darkBase64) {
  if (!darkBase64) return;
  await savePhoto(id, darkBase64, `m${id}.webp`);
}

// ── SERVER ────────────────────────────────────────────────────────────────
http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { pathname } = url;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':'Content-Type, x-admin-token',
      'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
    });
    return res.end();
  }

  // Serve admin HTML
  if (req.method === 'GET' && (pathname === '/' || pathname === '/admin.html')) {
    try {
      const html = await fsp.readFile(path.join(__dirname, 'admin.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(html);
    } catch {
      res.writeHead(500); return res.end('admin.html not found');
    }
  }

  // Serve static assets (renders, etc.)
  if (req.method === 'GET' && pathname.startsWith('/assets/')) {
    const MIME = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif' };
    const filePath = path.join(__dirname, pathname);
    try {
      const data = await fsp.readFile(filePath);
      const ext  = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      return res.end(data);
    } catch {
      res.writeHead(404); return res.end('Not found');
    }
  }

  // POST /api/login
  if (req.method === 'POST' && pathname === '/api/login') {
    const { login, password } = await parseBody(req);
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, Date.now());
      return sendJson(res, 200, { ok: true, token });
    }
    return sendJson(res, 401, { ok: false, error: 'Неверный логин или пароль' });
  }

  // Check service key status (public endpoint for UI warning)
  if (req.method === 'GET' && pathname === '/api/status') {
    return sendJson(res, 200, { keyConfigured: !SUPABASE_SERVICE_KEY.startsWith('REPLACE') });
  }

  // All /api/* routes below require auth
  if (pathname.startsWith('/api/') && !checkAuth(req)) {
    return sendJson(res, 401, { ok: false, error: 'Не авторизован' });
  }

  // GET /api/products
  if (req.method === 'GET' && pathname === '/api/products') {
    const r = await sbFetch('GET', '/rest/v1/products?select=*&order=id.asc');
    return sendJson(res, r.status, r.data ?? []);
  }

  // POST /api/products  — create
  if (req.method === 'POST' && pathname === '/api/products') {
    const body = await parseBody(req);
    const { darkImage, ...product } = body;
    product.id      = Number(product.id);
    product.popular = Number(product.popular ?? 5);
    const r = await sbFetch('POST', '/rest/v1/products', product);
    if (r.ok && darkImage) {
      await saveImages(product.id, darkImage);
    }
    return sendJson(res, r.status, r.data ?? { error: r.status });
  }

  // PUT /api/products/:id  — update
  if (req.method === 'PUT' && pathname.startsWith('/api/products/')) {
    const id   = pathname.split('/')[3];
    const body = await parseBody(req);
    const { darkImage, ...product } = body;
    delete product.id;
    product.popular = Number(product.popular ?? 5);
    const r = await sbFetch('PATCH', `/rest/v1/products?id=eq.${id}`, product);
    if (r.ok && darkImage) {
      await saveImages(id, darkImage);
    }
    return sendJson(res, r.status, r.data ?? { error: r.status });
  }

  // DELETE /api/products/:id
  if (req.method === 'DELETE' && pathname.startsWith('/api/products/') && pathname.split('/').length === 4) {
    const id = pathname.split('/')[3];
    const r  = await sbFetch('DELETE', `/rest/v1/products?id=eq.${id}`);
    return sendJson(res, r.ok ? 200 : r.status, { ok: r.ok });
  }

  // GET /api/photos/:id  — list existing photos
  if (req.method === 'GET' && pathname.startsWith('/api/photos/')) {
    const id     = pathname.split('/')[3];
    const photos = await listPhotos(id).catch(() => []);
    return sendJson(res, 200, photos.map(f => ({
      filename: f,
      url:      `/assets/renders/Dark/renders_thumbs/${f}`,
      isMain:   f === `m${id}.webp`,
    })));
  }

  // POST /api/photos/:id  — upload additional photos
  if (req.method === 'POST' && pathname.startsWith('/api/photos/')) {
    const id   = pathname.split('/')[3];
    const body = await parseBody(req);
    const images = Array.isArray(body.images) ? body.images : [body.images].filter(Boolean);
    const saved  = [];
    for (const b64 of images) {
      const filename = await nextFilename(id, 'png');
      await savePhoto(id, b64, filename);
      saved.push(filename);
    }
    return sendJson(res, 200, { ok: true, saved });
  }

  // DELETE /api/photos/:id/:filename  — delete a specific photo
  if (req.method === 'DELETE' && pathname.startsWith('/api/photos/')) {
    const parts    = pathname.split('/');
    const id       = parts[3];
    const filename = parts[4];
    if (!filename) return sendJson(res, 400, { ok: false });
    const safeRe = new RegExp(`^m${id}(-\\d+)?\\.webp$`);
    if (!safeRe.test(filename)) return sendJson(res, 400, { ok: false, error: 'Invalid filename' });
    try {
      await fsp.unlink(path.join(DARK_THUMB, filename));
    } catch { return sendJson(res, 404, { ok: false }); }
    return sendJson(res, 200, { ok: true });
  }

  res.writeHead(404); res.end('Not found');

}).listen(PORT, () => {
  console.log(`🔐 Adamas Admin: http://localhost:${PORT}`);
  if (SUPABASE_SERVICE_KEY.startsWith('REPLACE')) {
    console.warn('⚠️  Supabase service key не настроен — только чтение через anon key будет работать.');
    console.warn('   Открой admin-server.mjs и замени SUPABASE_SERVICE_KEY.');
  }
});
