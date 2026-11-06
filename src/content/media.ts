import type { Media } from './types';

type Extra = Omit<Media, 'src' | 'alt' | 'kind'>;

/** Documentary photograph. May be cropped (use `focus` to keep the subject). */
export const photo = (src: string, alt: string, extra: Extra = {}): Media => ({
  src,
  alt,
  kind: 'photo',
  ...extra,
});

/** Scientific or technical figure. Always shown whole, never cropped. */
export const figure = (src: string, alt: string, extra: Extra = {}): Media => ({
  src,
  alt,
  kind: 'figure',
  ...extra,
});

/** CAD view or 3D render on its own background. Shown like a photo, so it can be cropped to fill a frame. */
export const render = (src: string, alt: string, extra: Extra = {}): Media => ({
  src,
  alt,
  kind: 'render',
  ...extra,
});

/** Screenshot of software. */
export const screenshot = (src: string, alt: string, extra: Extra = {}): Media => ({
  src,
  alt,
  kind: 'screenshot',
  ...extra,
});
