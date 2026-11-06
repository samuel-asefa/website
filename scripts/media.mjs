#!/usr/bin/env node
/**
 * Responsive media derivatives.
 *
 *   npm run media           # process new or changed images
 *   npm run media -- --force
 *
 * Scans src/content and src/render for "/images/…" references, then for each original in
 * public/images writes:
 *   public/media/<name>-<width>.webp   (160, 480, 800, 1200, 1800, 2400; never upscaled)
 *   public/media/share/<name>.jpg      (1200×630 crop for social previews)
 * and records size, placeholder colour, and widths in
 * src/content/media-manifest.json. Originals are never modified.
 */
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(root, 'src/content');
const PUBLIC = path.join(root, 'public');
const OUT = path.join(PUBLIC, 'media');
const MANIFEST = path.join(CONTENT, 'media-manifest.json');
const WIDTHS = [160, 480, 800, 1200, 1800, 2400];
const force = process.argv.includes('--force');

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(ts|json)$/.test(entry.name) && entry.name !== 'media-manifest.json') out.push(p);
  }
  return out;
};

const refs = new Set();
const sources = [...(await walk(CONTENT)), ...(await walk(path.join(root, 'src/render')))];
for (const file of sources) {
  const text = await readFile(file, 'utf8');
  for (const m of text.matchAll(/["'`](\/images\/[^"'`]+\.(?:jpe?g|png|webp))["'`]/gi)) refs.add(m[1]);
}

const previous = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {};
const manifest = {};
await mkdir(path.join(OUT, 'share'), { recursive: true });

const slug = (src) =>
  path
    .basename(src)
    .toLowerCase()
    .replace(/\.([a-z]+)$/, '-$1')
    .replace(/[^a-z0-9-]+/g, '-');

// Derivatives are named after the file alone, so the same name in two folders would clash.
const named = new Map();
for (const src of refs) {
  const n = slug(src);
  if (named.has(n) && named.get(n) !== src) console.warn(`  name clash: ${src} and ${named.get(n)} both map to /media/${n}; rename one`);
  named.set(n, src);
}

const toHex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

let made = 0;
for (const src of [...refs].sort()) {
  const file = path.join(PUBLIC, src);
  if (!existsSync(file)) {
    console.warn(`  missing original: ${src}`);
    continue;
  }
  const name = slug(src);
  const base = `/media/${name}`;
  const mtime = (await stat(file)).mtimeMs;
  const prev = previous[src];
  const upToDate =
    !force &&
    prev &&
    prev.mtime === mtime &&
    prev.bytes !== undefined &&
    prev.widths.every((w) => existsSync(path.join(OUT, `${name}-${w}.webp`))) &&
    existsSync(path.join(OUT, 'share', `${name}.jpg`));
  if (upToDate) {
    manifest[src] = prev;
    continue;
  }

  // .rotate() applies EXIF orientation so derivatives display upright.
  const input = sharp(file, { failOn: 'none' }).rotate();
  const meta = await input.clone().metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;
  const isPhoto = /\.(jpe?g|webp)$/i.test(src);
  const quality = isPhoto ? 74 : 86;

  // Standard widths up to the original, plus the original width itself when
  // it is meaningfully larger than the last standard step.
  const widths = WIDTHS.filter((x) => x <= w);
  if (!widths.includes(w) && w < WIDTHS[WIDTHS.length - 1]) widths.push(w);

  for (const width of widths) {
    await input
      .clone()
      .resize({ width, withoutEnlargement: true })
      // Keep transparency (icons, logos); pages put figures on a white mat.
      .webp({ quality, alphaQuality: 90, effort: 5, smartSubsample: true })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
  }

  await input
    .clone()
    .flatten({ background: '#f3eee4' })
    .resize(1200, 630, { fit: isPhoto ? 'cover' : 'contain', position: 'attention', background: '#f3eee4' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(OUT, 'share', `${name}.jpg`));

  const { dominant } = await input.clone().resize(64).flatten({ background: '#ffffff' }).stats();
  const bytes = (await stat(file)).size;
  manifest[src] = { w, h, color: toHex(dominant), widths, base, share: `/media/share/${name}.jpg`, mtime, bytes };
  made++;
  console.log(`  ${src} → ${widths.join(', ')}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`media: ${refs.size} referenced, ${made} processed, manifest written.`);
