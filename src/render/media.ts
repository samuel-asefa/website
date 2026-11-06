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

/** Absolute-path JPEG suitable for social previews. */
export const shareImageFor = (src: string): string => mediaInfo(src)?.share ?? src;

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
    ],
    ';',
  );
  return `<img${attrs({
    src: info ? mediaUrl(m.src, 1200) : m.src,
    srcset: info ? info.widths.map((w) => `${info.base}-${w}.webp ${w}w`).join(', ') : undefined,
    sizes: info ? o.sizes : undefined,
    width: info?.w,
    height: info?.h,
    alt: m.alt,
    loading: o.eager ? 'eager' : 'lazy',
    decoding: o.eager ? undefined : 'async',
    fetchpriority: o.eager ? 'high' : undefined,
    class: join(['media', `media--${m.kind}`, cropped ? 'media--cropped' : '', o.className], ' '),
    style: style || undefined,
  })}>`;
};

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
    : `<a class="media-link" href="${esc(m.src)}" data-lightbox${attrs({
        'data-group': o.group,
        'data-full': mediaUrl(m.src, 2400),
        'data-caption': m.caption ? m.caption.replace(/<[^>]+>/g, '') : undefined,
      })}><span class="visually-hidden">Enlarge${m.kind === 'figure' ? ' figure' : ' image'}: </span>${image}</a>`;
  return `<figure class="${join(['fig', `fig--${m.kind}`, o.className ? `${o.className}-fig` : ''], ' ')}">${target}${
    caption || label ? `<figcaption>${label}${caption ? ` ${caption}` : ''}</figcaption>` : ''
  }</figure>`;
};
