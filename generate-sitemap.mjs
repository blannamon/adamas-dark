import { writeFileSync } from 'fs';

const BASE = 'https://adamasdark.netlify.app';
const SUPABASE_URL = 'https://rqrsmlbrsgmvsfxfthba.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnNtbGJyc2dtdnNmeGZ0aGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTE4MjcsImV4cCI6MjA5NTM4NzgyN30.0JNhYQxBSS7HPhOR5lrNXLiP5zyT8jW-6jbsrJMzwBo';

const today = new Date().toISOString().split('T')[0];

const STATIC_PAGES = [
  { loc: `${BASE}/`,                        changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE}/portfolio.html`,          changefreq: 'monthly', priority: '0.7' },
  { loc: `${BASE}/contacts.html`,           changefreq: 'monthly', priority: '0.6' },
  { loc: `${BASE}/workshop-services.html`,  changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE}/workshop-articles.html`,  changefreq: 'weekly',  priority: '0.7' },
];

function url({ loc, changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function fetchProductIds() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) throw new Error(`Supabase HTTP ${res.status}`);
  return res.json();
}

const products = await fetchProductIds();
console.log(`Получено товаров: ${products.length}`);

const productUrls = products.map(p => url({
  loc: `${BASE}/product.html?id=${p.id}`,
  changefreq: 'monthly',
  priority: '0.9'
}));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(url).join('\n')}
${productUrls.join('\n')}
</urlset>`;

writeFileSync('sitemap.xml', xml, 'utf8');
console.log(`sitemap.xml создан: ${STATIC_PAGES.length} статичных + ${products.length} товаров`);
