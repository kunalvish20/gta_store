import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {PRODUCT, PRODUCT_PATH, SITE} from '../src/data/catalog.js';
import {FAQ_ITEMS} from '../src/data/faq.js';
import {INFO_PAGES} from '../src/data/infoPages.js';
import {getSeoPage, INDEXABLE_PATHS} from '../src/data/seo.js';
import {format} from '../src/lib/format.js';

const dist = join(process.cwd(), 'dist');
const shell = await readFile(join(dist, 'index.html'), 'utf8');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');

if (!shell.includes('<!-- SEO_HEAD -->') || !shell.includes('<!-- SEO_FALLBACK -->')) {
  throw new Error('SEO placeholders are missing from the built index.html');
}
for (const path of INDEXABLE_PATHS) {
  if (!sitemap.includes(`<loc>${SITE.origin}${path}</loc>`)) {
    throw new Error(`Sitemap is missing ${path}`);
  }
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const tag = (name, value, attribute = 'name') => `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`;

function renderHead(page) {
  const tags = [
    tag('description', page.description),
    tag('robots', page.robots),
    tag('og:site_name', SITE.name, 'property'),
    tag('og:locale', 'en_IN', 'property'),
    tag('og:type', page.path === PRODUCT_PATH ? 'product' : 'website', 'property'),
    tag('og:title', page.title, 'property'),
    tag('og:description', page.description, 'property'),
    tag('og:url', page.url, 'property'),
    tag('og:image', page.image, 'property'),
    tag('twitter:card', 'summary_large_image'),
    tag('twitter:title', page.title),
    tag('twitter:description', page.description),
    tag('twitter:image', page.image),
    `<link rel="canonical" href="${escapeHtml(page.url)}" />`
  ];
  if (page.robots.startsWith('index')) {
    const json = JSON.stringify({'@context': 'https://schema.org', '@graph': page.graph}).replace(/</g, '\\u003c');
    tags.push(`<script id="seo-json-ld" type="application/ld+json">${json}</script>`);
  }
  return tags.join('\n    ');
}

function renderFaq() {
  return `<section aria-labelledby="seo-faq-title"><h2 id="seo-faq-title">Pre-order questions</h2>${FAQ_ITEMS.map(([question, answer]) =>
    `<section><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></section>`
  ).join('')}</section>`;
}

function renderFallback(page) {
  let content = `<h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.description)}</p>`;
  if (page.path === '/' || page.path === PRODUCT_PATH) {
    content += `<p>Pre-order price: ${escapeHtml(format(PRODUCT.price))}. The box includes 9 Collector's Edition items. Standard delivery is free.</p>`;
    content += `<a href="${PRODUCT_PATH}">Explore the Collector's Box</a>`;
    if (page.path === PRODUCT_PATH) {
      content += `<h2>Inside the box</h2><ul>${PRODUCT.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    }
    content += renderFaq();
  } else if (INFO_PAGES[page.path.slice(1)]) {
    const info = INFO_PAGES[page.path.slice(1)];
    content += `<ul>${info.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }
  return `<main class="seo-fallback">${content}</main>`;
}

function renderPage(path) {
  const page = getSeoPage(path);
  return shell
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace('<!-- SEO_HEAD -->', renderHead(page))
    .replace('<!-- SEO_FALLBACK -->', renderFallback(page));
}

await writeFile(join(dist, 'index.html'), renderPage('/'));
await mkdir(join(dist, '_seo'), {recursive: true});
for (const path of [...INDEXABLE_PATHS.filter(path => path !== '/'), '/cart', '/checkout']) {
  const file = path === PRODUCT_PATH ? 'product' : path.slice(1);
  await writeFile(join(dist, '_seo', `${file}.html`), renderPage(path));
}
