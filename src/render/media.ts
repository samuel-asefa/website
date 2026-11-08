import { NARROW_MEDIA } from '../config/breakpoints';
import type { Media } from '../content/types';
import manifestJson from '../content/media-manifest.json';
import { attrs, esc, join, rich } from './html';

export interface ManifestEntry {
  w: number;
  h: number;
  color: string;
  widths: number[];
  base: string;
  share?: string;
  bytes?: number;
}

const manifest = manifestJson as Record<string, ManifestEntry>;
const warned = new Set<string>();

export const mediaInfo = (src: string): ManifestEntry | undefined => {
  const entry = manifest[src];
  if (!entry && !warned.has(src)) {
    warned.add(src);
    console.warn(`[media] No derivatives for ${src}. Run "npm run media". Falling back to the original file.`);
  }
  return entry;
};

/** Largest derivative at or below `max` px wide (or the original). */
export const mediaUrl = (src: string, max = 1600): string => {
  const info = mediaInfo(src);
  if (!info) return src;
  const fit = info.widths.filter((w) => w <= max);
  const w = fit.length ? fit[fit.length - 1] : info.widths[0];
  return `${info.base}-${w}.webp`;
};

/**
 * Link target for "open original". Very large originals (e.g. a 87 MB PNG)
 * are replaced by the largest web version so nobody downloads them by accident.
 */
export const originalUrl = (src: string): string => {
  const info = mediaInfo(src);
  if (info?.bytes && info.bytes > 8_000_000) return `${info.base}-${info.widths[info.widths.length - 1]}.webp`;
  return src;
};

/** Absolute-path JPEG suitable for social previews. */
export const shareImageFor = (src: string): string => mediaInfo(src)?.share ?? src;

const srcset = (info: ManifestEntry): string => info.widths.map((w) => `${info.base}-${w}.webp ${w}w`).join(', ');

interface ImgOptions {
  sizes: string;
  eager?: boolean;
  /** Crop to the media's ratio (photos only; figures are never cropped). */
  crop?: boolean;
  ratio?: string;
  className?: string;
}

export const img = (m: Media, o: ImgOptions): string => {
  const info = mediaInfo(m.src);
  const cropped = Boolean(o.crop && m.kind !== 'figure' && (o.ratio || m.ratio));
  const ratio = o.ratio ?? m.ratio;
  const style = join(
    [
      info ? `--ph:${info.color}` : '',
      cropped && ratio ? `aspect-ratio:${ratio}` : '',
      cropped && m.focus ? `object-position:${m.focus}` : '',
      m.narrow?.focus ? `--narrow-focus:${m.narrow.focus}` : '',
    ],
    ';',
  );
  const tag = `<img${attrs({
    src: info ? mediaUrl(m.src, 1200) : m.src,
    srcset: info ? srcset(info) : undefined,
    sizes: info ? o.sizes : undefined,
    width: info?.w,
    height: info?.h,
    alt: m.alt,
    'data-narrow-alt': m.narrow?.alt,
    loading: o.eager ? 'eager' : 'lazy',
    decoding: o.eager ? undefined : 'async',
    fetchpriority: o.eager ? 'high' : undefined,
    class: join(['media', `media--${m.kind}`, cropped ? 'media--cropped' : '', m.narrow ? 'media--has-narrow' : '', o.className], ' '),
    style: style || undefined,
  })}>`;
  if (!m.narrow) return tag;
  // Phones get the phone version; the browser only downloads the one it shows.
  const n = mediaInfo(m.narrow.src);
  return `<picture class="media-picture"><source${attrs({
    media: NARROW_MEDIA,
    srcset: n ? srcset(n) : m.narrow.src,
    sizes: n ? o.sizes : undefined,
    width: n?.w,
    height: n?.h,
  })}>${tag}</picture>`;
};

/** Phone version for the image viewer, which picks one when it opens. */
const narrowData = (m: Media) =>
  m.narrow
    ? {
        'data-narrow-full': mediaUrl(m.narrow.src, 2400),
        'data-narrow-alt': m.narrow.alt,
        'data-narrow-original': originalUrl(m.narrow.src),
      }
    : {};

/** An image that exists only in the lightbox: a hidden entry in `group`, placed after the figure it follows. */
export const lightboxOnly = (m: Media, group: string): string =>
  `<a hidden href="${esc(originalUrl(m.src))}" data-lightbox${attrs({
    'data-group': group,
    'data-full': mediaUrl(m.src, 2400),
    'data-alt': m.alt,
    'data-caption': m.caption ? m.caption.replace(/<[^>]+>/g, '') : undefined,
    ...narrowData(m),
  })}></a>`;

let figureCounter = 0;
/** Figure numbers restart on every page render. */
export const resetFigureNumbers = (): void => {
  figureCounter = 0;
};

interface FigureOptions extends ImgOptions {
  /** Group name for the lightbox's previous/next navigation. */
  group?: string;
  numbered?: boolean;
  /** Wrap the image in a link to `href` instead of the enlargement. */
  href?: string;
  /** Extra HTML appended inside the figcaption. */
  after?: string;
}

/**
 * A figure with caption. The image links to the full-size original, so it can
 * always be enlarged; site.ts upgrades the link into an accessible lightbox.
 */
export const fig = (m: Media, o: FigureOptions): string => {
  const n = o.numbered === false ? undefined : ++figureCounter;
  const label = n ? `<span class="fig-label">Fig.&nbsp;${n}</span>` : '';
  const caption = join([m.caption ? rich(m.caption) : '', m.source ? `<span class="fig-source">${rich(m.source)}</span>` : '', o.after]);
  const image = img(m, o);
  const target = o.href
    ? `<a class="media-link" href="${esc(o.href)}">${image}</a>`
    : `<a class="media-link" href="${esc(originalUrl(m.src))}" data-lightbox${attrs({
        'data-group': o.group,
        'data-full': mediaUrl(m.src, 2400),
        'data-caption': m.caption ? m.caption.replace(/<[^>]+>/g, '') : undefined,
        ...narrowData(m),
      })}><span class="visually-hidden">Enlarge${m.kind === 'figure' ? ' figure' : ' image'}: </span>${image}</a>`;
  return `<figure class="${join(['fig', `fig--${m.kind}`, m.narrow ? 'fig--has-narrow' : '', o.className ? `${o.className}-fig` : ''], ' ')}">${target}${
    caption || label ? `<figcaption>${label}${caption ? ` ${caption}` : ''}</figcaption>` : ''
  }</figure>`;
};
