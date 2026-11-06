/**
 * Site-wide configuration. The production origin is defined once here and
 * used for canonical URLs, Open Graph tags, the sitemap, and structured data.
 *
 * Set SITE_ORIGIN at build time to override it (for example after a custom
 * domain is connected). See README → "Deployment assumptions".
 */
const envOrigin = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
  ?.SITE_ORIGIN;

export const SITE = {
  origin: (envOrigin || 'https://samuelasefa.vercel.app').replace(/\/$/, ''),
  name: 'Samuel Asefa',
  shortName: 'Samuel',
  locale: 'en_US',
  email: 'samuelasefa20@gmail.com',
  /** Kept from the previous site so Search Console ownership stays verified. */
  googleSiteVerification: 'Hcv02jSnLKouc1RmcKUG4F0kw7jlpHJmeDtcN9NOB0E',
  description:
    'Samuel Asefa builds VEX robots, writes software like RoboRoute, publishes simulation-based research, and teaches robotics through RoboZone.',
  /** Default share image (a real project photograph). */
  defaultShareImage: '/images/projects/push-back-robot/push-back-robot.jpeg',
  school: 'South Brunswick High School',
} as const;

export const absoluteUrl = (path: string): string =>
  path.startsWith('http') ? path : `${SITE.origin}${path.startsWith('/') ? '' : '/'}${path}`;
