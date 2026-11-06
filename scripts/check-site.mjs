#!/usr/bin/env node
/**
 * Checks the production build in dist/.
 *
 *   npm run build && npm run check
 *   npm run check -- --external    # also request every outbound link
 *
 * Verifies for each page: one <h1>, a <title>, a meta description, an
 * absolute canonical URL on the configured origin, an absolute og:image
 * that exists in dist, images with alt text and dimensions, and that every
 * internal link, asset, and #anchor resolves. Exits non-zero on problems.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const checkExternal = process.argv.includes('--external');

if (!existsSync(dist)) {
  console.error('dist/ not found. Run "npm run build" first.');
  process.exit(1);
}

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};

const pages = await walk(dist);
const problems = [];
const external = new Set();
const ids = new Map();
const docs = new Map();

const urlFor = (file) => {
  const rel = '/' + path.relative(dist, file).split(path.sep).join('/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const url = urlFor(file);
  docs.set(url, html);
  ids.set(url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const resolveLocal = (from, href) => {
  const u = new URL(href, `https://x${from}`);
  let p = decodeURIComponent(u.pathname);
  const candidates = p.endsWith('/') ? [p + 'index.html'] : [p, p + '/index.html'];
  const hit = candidates.find((c) => existsSync(path.join(dist, c)));
  return { hit, pathname: p.endsWith('/') || hit?.endsWith('/index.html') ? (p.endsWith('/') ? p : p + '/') : p, hash: u.hash.slice(1) };
};

let origin;
for (const [url, html] of docs) {
  const isMoved = /http-equiv="refresh"/.test(html);
  const where = `${url}:`;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) problems.push(`${where} missing <title>`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) problems.push(`${where} missing or short meta description`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical || !/^https:\/\//.test(canonical)) problems.push(`${where} canonical is missing or not absolute`);
  else {
    const o = new URL(canonical).origin;
    origin ??= o;
    if (o !== origin) problems.push(`${where} canonical origin ${o} differs from ${origin}`);
  }
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (!og || !/^https:\/\//.test(og)) problems.push(`${where} og:image missing or not absolute`);
  else if (!existsSync(path.join(dist, new URL(og).pathname))) problems.push(`${where} og:image file not in dist: ${og}`);
  if (!isMoved) {
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) problems.push(`${where} has ${h1s} <h1> elements`);
  }

  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    const a = m[1];
    if (!/\salt="/.test(a)) problems.push(`${where} <img> without alt: ${a.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(a) && !/data-img/.test(a)) problems.push(`${where} <img> without width/height: ${a.slice(0, 80)}`);
  }

  // Preconnect hints point at bare origins and aren't real links.
  const linkable = html.replace(/<link rel="preconnect"[^>]*>/g, '');
  for (const m of linkable.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(href)) continue;
    if (/^https?:\/\//.test(href)) {
      if (!href.startsWith(origin ?? '\0')) external.add(href);
      continue;
    }
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (id && !ids.get(url)?.has(id)) problems.push(`${where} broken in-page anchor ${href}`);
      continue;
    }
    const { hit, pathname, hash } = resolveLocal(url, href);
    if (!hit) {
      problems.push(`${where} broken link ${href}`);
      continue;
    }
    if (hash && hit.endsWith('.html')) {
      const target = ids.get(pathname) ?? ids.get(hit);
      if (target && !target.has(hash)) problems.push(`${where} link ${href} points at a missing anchor`);
    }
  }
}

for (const f of ['sitemap.xml', 'robots.txt', '404.html']) {
  if (!existsSync(path.join(dist, f))) problems.push(`missing ${f}`);
}

const size = async (dir) => {
  let total = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    total += e.isDirectory() ? await size(p) : (await stat(p)).size;
  }
  return total;
};

console.log(`Checked ${docs.size} HTML files on ${origin}.`);
console.log(`Assets: ${((await size(path.join(dist, 'assets'))) / 1024).toFixed(1)} KB JS+CSS, ${external.size} distinct outbound links.`);

if (checkExternal) {
  console.log('Requesting outbound links (some sites block automated requests; 401/403/429/999 are reported as "blocked", not broken)…');
  const results = await Promise.all(
    [...external].map(async (u) => {
      try {
        const res = await fetch(u, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (site link check)' }, signal: AbortSignal.timeout(15000) });
        return [u, res.status];
      } catch (e) {
        return [u, `error: ${e.cause?.code ?? e.message}`];
      }
    }),
  );
  for (const [u, s] of results.sort()) {
    const blocked = [401, 403, 429, 999].includes(s);
    if (typeof s === 'number' && s < 400) continue;
    if (blocked) console.log(`  blocked ${s}  ${u}`);
    else problems.push(`outbound ${s}: ${u}`);
  }
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('No problems found.');
