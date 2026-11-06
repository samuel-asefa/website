/** Minimal HTML helpers for build-time rendering. */

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for use in HTML text or attribute values. */
export const esc = (value: unknown): string => String(value ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Strip tags for places that need plain text (meta descriptions, alt fallbacks). */
export const plain = (html: string): string =>
  html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** Join truthy fragments. Lets templates write `${cond && '...'}` safely. */
export const join = (parts: (string | false | null | undefined)[], sep = ''): string =>
  parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(sep);

export const attrs = (record: Record<string, string | number | boolean | undefined | null>): string =>
  Object.entries(record)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');

const EXTERNAL = /^https?:\/\//;
export const isExternal = (href: string): boolean => EXTERNAL.test(href);

/** Adds rel/target for external links; `html` is trusted inline HTML. */
export const link = (href: string, html: string, className?: string): string =>
  `<a href="${esc(href)}"${className ? ` class="${esc(className)}"` : ''}${
    isExternal(href) ? ' target="_blank" rel="noopener"' : ''
  }>${html}</a>`;

/**
 * Normalize author-written HTML: external links get rel="noopener".
 * (Content is trusted; this only keeps link attributes consistent.)
 */
export const rich = (html: string): string =>
  html.replace(/<a href="(https?:\/\/[^"]+)"(?![^>]*rel=)/g, '<a href="$1" target="_blank" rel="noopener"');

/** Plain-text description of at most ~`max` characters, cut at a sentence or word. */
export const summarize = (html: string, max = 200): string => {
  const text = plain(html);
  if (text.length <= max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = '';
  for (const s of sentences) {
    if ((out + s).length > max) break;
    out += s;
  }
  if (out.trim()) return out.trim();
  return text.slice(0, text.lastIndexOf(' ', max - 1)) + '…';
};
