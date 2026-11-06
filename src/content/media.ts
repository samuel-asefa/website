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

/** Screenshot of software. */
export const screenshot = (src: string, alt: string, extra: Extra = {}): Media => ({
  src,
  alt,
  kind: 'screenshot',
  ...extra,
});
