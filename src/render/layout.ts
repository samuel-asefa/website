import { SITE, absoluteUrl } from '../config/site';
import { esc, join } from './html';
import { resetFigureNumbers, shareImageFor } from './media';

export type NavKey = 'home' | 'explore' | 'about' | 'experience' | 'education' | 'awards' | 'projects' | 'contact';

export interface PageMeta {
  /** Page title without the site name (omit on the homepage). */
  title?: string;
  description: string;
  /** Canonical path, e.g. "/about.html". */
  path: string;
  /** Original image path under /public/images; its share crop is used. */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  jsonLd?: object[];
  noindex?: boolean;
  nav?: NavKey;
  /** Extra tags for <head>. */
  head?: string;
}

const NAV: { key: NavKey; label: string; href: string }[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'explore', label: 'Explore', href: '/#explore' },
  { key: 'about', label: 'About', href: '/about.html' },
  { key: 'experience', label: 'Experience', href: '/experience.html' },
  { key: 'education', label: 'Education', href: '/education.html' },
  { key: 'awards', label: 'Awards', href: '/awards.html' },
  { key: 'projects', label: 'Projects', href: '/projects.html' },
  { key: 'contact', label: 'Contact', href: '/contact.html' },
];

const KEYWORDS =
  'Samuel Asefa, Samuel, Asefa, Sam, Sammy, Sammy Asefa, Sam Asefa, South Brunswick High School, SBHS, 750W, RoboRoute, RoboZone, Developer, Engineer, Robotics, Research';

const header = (current?: NavKey): string => `
<a class="skip-link" href="#main">Skip to content</a>
<header id="header">
  <div class="header-container">
    <a href="/" class="logo">Samuel Asefa</a>
    <nav aria-label="Main navigation">
      <ul class="nav-links" id="nav-links">
        ${NAV.map(
          (n) =>
            `<li><a href="${n.href}" class="nav-link${n.key === current ? ' active' : ''}"${
              n.key === current && n.key !== 'explore' ? ' aria-current="page"' : ''
            }>${n.label}</a></li>`,
        ).join('\n        ')}
      </ul>
      <button class="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </div>
</header>`;

const year = new Date().getFullYear();
const updated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const footer = (): string => `
<footer>
  <div class="footer-content">
    <div class="footer-left">
      <div class="footer-logo">Samuel Asefa</div>
      <div class="footer-sub">Robotics, software, and research · South Brunswick, NJ</div>
    </div>
    <div class="social-icons">
      <a href="https://www.linkedin.com/in/samuelasefa/" rel="noopener" target="_blank" aria-label="LinkedIn profile" class="social-icon"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
      <a href="https://github.com/samuel-asefa" rel="noopener" target="_blank" aria-label="GitHub profile" class="social-icon"><i class="fab fa-github" aria-hidden="true"></i></a>
      <a href="https://www.youtube.com/@samuel-asefa" rel="noopener" target="_blank" aria-label="YouTube channel" class="social-icon"><i class="fab fa-youtube" aria-hidden="true"></i></a>
      <a href="https://medium.com/@samuel-asefa" rel="noopener" target="_blank" aria-label="Medium articles" class="social-icon"><img src="/images/medium.png" alt="" width="20" height="20" style="width: 20px; height: 20px; object-fit: contain;"></a>
      <a href="https://orcid.org/0009-0009-2279-3148" rel="noopener" target="_blank" aria-label="ORCID research profile" class="social-icon"><i class="fab fa-orcid" aria-hidden="true"></i></a>
      <a href="mailto:${SITE.email}" aria-label="Email ${SITE.email}" class="social-icon"><i class="fas fa-envelope" aria-hidden="true"></i></a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${year} Samuel Asefa. All Rights Reserved.</p>
    <p class="footer-built">Built with Vite · Updated ${updated}</p>
  </div>
</footer>

<button class="back-to-top" type="button" aria-label="Back to top">
  <i class="fas fa-arrow-up" aria-hidden="true"></i>
</button>`;

/** Wrap page content in the full HTML document. */
export const page = (meta: PageMeta, main: string): string => {
  const fullTitle = meta.title ? `Samuel Asefa - ${meta.title}` : 'Samuel Asefa';
  const canonical = absoluteUrl(meta.path);
  const share = absoluteUrl(shareImageFor(meta.image ?? '/images/samuel-asefa.jpg'));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<title>${esc(fullTitle)}</title>
<meta name="google-site-verification" content="${SITE.googleSiteVerification}" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(meta.description)}">
<meta name="keywords" content="${KEYWORDS}">
<meta name="author" content="${SITE.name}">
${meta.noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:image" content="${esc(share)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
${meta.imageAlt ? `<meta property="og:image:alt" content="${esc(meta.imageAlt)}">` : ''}
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="${meta.type ?? 'website'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#03080f">
<link rel="canonical" href="${esc(canonical)}">
<link rel="icon" type="image/png" href="/favicon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="/src/styles/main.css">
${join((meta.jsonLd ?? []).map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`), '\n')}
${meta.head ?? ''}
<script type="module" src="/src/scripts/site.ts"></script>
</head>

<body>
<div id="cursor" class="cursor" aria-hidden="true"></div>

<div id="loading-screen" class="loading-screen" aria-hidden="true">
  <div class="loader"></div>
</div>

<!-- Site-wide animated background -->
<div id="circuit-background" aria-hidden="true"></div>
<div class="hero-orb hero-orb-1" aria-hidden="true"></div>
<div class="hero-orb hero-orb-2" aria-hidden="true"></div>
<div class="hero-orb hero-orb-3" aria-hidden="true"></div>
${header(meta.nav)}

<main id="main" tabindex="-1">
${main}
</main>
${footer()}
</body>
</html>
`;
  resetFigureNumbers();
  return html.replace(/\n{3,}/g, '\n\n');
};
