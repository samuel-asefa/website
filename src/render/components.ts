import type { Category, Fact, LinkKind, Media, Project, Publication, Recognition, RecognitionScope, ResourceLink, Video } from '../content/types';
import { esc, isExternal, join, rich } from './html';
import { fig, img, mediaInfo, mediaUrl, originalUrl } from './media';

export const CATEGORY_LABEL: Record<Category, string> = {
  hardware: 'Hardware',
  software: 'Software',
  research: 'Research',
};

export const SCOPE_LABEL: Record<RecognitionScope, string> = {
  individual: 'Individual',
  team: 'Team',
};

const LINK_LABEL: Record<LinkKind, { text: string; icon: string; primary: boolean }> = {
  demo: { text: 'Live Demo', icon: 'fas fa-play', primary: true },
  site: { text: 'Website', icon: 'fas fa-globe', primary: true },
  paper: { text: 'Paper', icon: 'fas fa-file-alt', primary: true },
  slides: { text: 'Slides', icon: 'fas fa-person-chalkboard', primary: true },
  video: { text: 'Video', icon: 'fab fa-youtube', primary: false },
  data: { text: 'Data', icon: 'fas fa-database', primary: false },
  code: { text: 'GitHub', icon: 'fab fa-github', primary: false },
};

/** External links open in a new tab, as on the original site. */
export const extAttrs = (href: string): string => (isExternal(href) ? ' target="_blank" rel="noopener"' : '');

export const projectPageUrl = (p: Project): string => `/projects/${p.slug}.html`;

/** Where a project's title links: its page if it has one, else its first link. */
export const projectHref = (p: Project): string =>
  p.depth === 'entry' ? (p.links?.[0]?.href ?? '/projects.html') : projectPageUrl(p);

/** The centered heading block used on every page of the original site. */
export const sectionHeader = (o: { title: string; eyebrow?: string; level?: 1 | 2; id?: string; intro?: string }): string => {
  const h = o.level ?? 2;
  return `<div class="section-header">
  ${o.eyebrow ? `<span class="section-eyebrow">${esc(o.eyebrow)}</span>` : ''}
  <h${h}${o.id ? ` id="${esc(o.id)}"` : ''}>${esc(o.title)}</h${h}>
  <div class="section-line"></div>
  ${o.intro ? `<p class="section-intro">${rich(o.intro)}</p>` : ''}
</div>`;
};

export const button = (href: string, text: string, o: { primary?: boolean; icon?: string; className?: string } = {}): string =>
  `<a href="${esc(href)}" class="${join(['btn', o.primary ? 'primary-btn' : 'secondary-btn', o.className], ' ')}"${extAttrs(href)}>${
    o.icon ? `<i class="${o.icon}" aria-hidden="true"></i> ` : ''
  }${esc(text)}</a>`;

export const linkButtons = (links: ResourceLink[] | undefined, max = 4): string =>
  (links ?? [])
    .slice(0, max)
    .map((l) => {
      const k = LINK_LABEL[l.kind];
      return button(l.href, l.kind === 'code' || l.kind === 'demo' || l.kind === 'site' ? k.text : l.label, {
        primary: k.primary,
        icon: k.icon,
      });
    })
    .join('');

export const scopeBadge = (scope: RecognitionScope): string =>
  `<span class="scope-badge scope-${scope}">${SCOPE_LABEL[scope]}</span>`;

/** Short, conditioned metric shown as an accent pill. */
export const metricPill = (f: Fact | undefined, className = 'project-metric'): string =>
  f ? `<span class="${className}" title="${esc(f.condition ?? '')}"><i class="fas fa-chart-line" aria-hidden="true"></i> ${esc(f.value)} ${esc(f.label)}</span>` : '';

export const statusLabel = (p: Project): string => {
  if (p.category !== 'research' || !p.publications?.length) return '';
  const pub = p.publications[0];
  const text =
    pub.status === 'preprint'
      ? 'Preprint'
      : pub.status === 'conference-talk-accepted'
        ? 'Accepted talk · computational study'
        : pub.status === 'peer-reviewed'
          ? 'Peer reviewed'
          : 'Conference talk';
  return `<span class="project-research-label"><i class="fas fa-flask" aria-hidden="true"></i> ${esc(text)}</span>`;
};

export const techTags = (items: string[] | undefined, className = 'project-tech', spanClass?: string): string =>
  items?.length
    ? `<div class="${className}">${items.map((t) => `<span${spanClass ? ` class="${spanClass}"` : ''}>${esc(t)}</span>`).join('')}</div>`
    : '';

/** Gallery list for the image modal: cover, viewer-only images, then every image on the project page. */
export const projectGallery = (p: Project): Media[] => {
  const out: Media[] = [...(p.cover ? [p.cover] : []), ...(p.gallery ?? [])];
  for (const s of Object.values(p.sections ?? {})) {
    for (const b of s?.blocks ?? []) {
      if (b.type === 'figure') out.push(b.media);
      if (b.type === 'figures') out.push(...b.media);
    }
  }
  return out.filter((m, i, a) => a.findIndex((x) => x.src === m.src) === i);
};

const galleryAttr = (items: Media[]): string =>
  items.length > 1
    ? ` data-gallery="${esc(
        JSON.stringify(items.map((m) => ({ src: mediaUrl(m.src, 2400), alt: m.alt, caption: (m.caption ?? '').replace(/<[^>]+>/g, ''), original: originalUrl(m.src) }))),
      )}"`
    : '';

const schoolSeal = (p: Project): string =>
  p.mentor ? `<img class="school-seal" src="${esc(mediaUrl(p.mentor.logo, 160))}" alt="" width="40" height="40" loading="lazy" decoding="async">` : '';

const mentorName = (p: Project): string =>
  !p.mentor ? '' : p.mentor.href ? `<a href="${esc(p.mentor.href)}" target="_blank" rel="noopener">${esc(p.mentor.name)}</a>` : esc(p.mentor.name);

/** Mentor credit with the school's seal; the name links to their profile when known. */
export const mentorCredit = (p: Project): string =>
  p.mentor ? `${schoolSeal(p)}<span>${mentorName(p)}, ${esc(p.mentor.school)}</span>` : '';

/** "Mentored by …" line for project cards: the seal leads, the text wraps beside it. */
export const mentorLine = (p: Project, className = 'project-mentor'): string =>
  p.mentor
    ? `<p class="${className}">${schoolSeal(p)}<span><span class="mentor-label">Mentored by</span> ${mentorName(p)}, ${esc(p.mentor.school)}</span></p>`
    : '';

/** The original project card, with clearer status and a details link. */
export const projectCard = (p: Project, o: { headingLevel?: 2 | 3; sizes?: string } = {}): string => {
  const h = o.headingLevel ?? 3;
  const gallery = projectGallery(p);
  const href = projectHref(p);
  const cover = p.cover;
  return `<article class="project-card" data-category="${p.category}">
  ${
    cover
      ? `<div class="project-img"${galleryAttr(gallery)}>
    <button type="button" class="project-img-btn" data-modal-open aria-label="View ${gallery.length > 1 ? `${gallery.length} images` : 'image'} for ${esc(p.title)}">
      ${img(cover, { sizes: o.sizes ?? '(min-width: 1100px) 380px, (min-width: 700px) 45vw, 92vw', className: 'project-thumb', crop: false })}
    </button>
    ${gallery.length > 1 ? `<div class="img-count-badge"><i class="fas fa-images" aria-hidden="true"></i> ${gallery.length}</div>` : ''}
  </div>`
      : ''
  }
  <div class="project-content">
    ${statusLabel(p)}
    <h${h}><a class="project-title-link" href="${esc(href)}"${extAttrs(href)}>${esc(p.title)}</a></h${h}>
    <p>${esc(p.line)}</p>
    ${p.facts?.[0] ? metricPill(p.facts[0]) : ''}
    <p class="project-meta">${join([esc(p.dates), p.role ? esc(p.role) : p.team === 'Solo' ? 'Solo project' : ''], ' · ')}</p>
    ${mentorLine(p)}
    ${techTags(p.technologies)}
    <div class="project-links">
      ${p.depth !== 'entry' ? button(projectPageUrl(p), 'Details', { primary: true, icon: 'fas fa-arrow-right' }) : ''}
      ${linkButtons(p.links, p.depth === 'entry' ? 3 : 2)}
    </div>
  </div>
</article>`;
};

/** Featured card (styles already in the original stylesheet). */
export const featuredCard = (p: Project): string => {
  const href = projectPageUrl(p);
  return `<article class="featured-card">
  <a class="featured-card-img" href="${href}" tabindex="-1" aria-hidden="true">
    <span class="featured-badge">${CATEGORY_LABEL[p.category]}</span>
    ${p.cover ? img(p.cover, { sizes: '(min-width: 900px) 380px, 92vw', crop: true, ratio: '16 / 10' }) : ''}
  </a>
  <div class="featured-card-body">
    <h3><a href="${href}">${esc(p.title)}</a></h3>
    <p>${esc(p.line)}</p>
    ${mentorLine(p, 'project-mentor featured-mentor')}
    ${p.facts?.[0] ? `<span class="featured-metric" title="${esc(p.facts[0].condition ?? '')}"><i class="fas fa-chart-line" aria-hidden="true"></i> ${esc(p.facts[0].value)} ${esc(p.facts[0].label)}</span>` : ''}
    ${techTags(p.technologies?.slice(0, 4), 'featured-tech', 'tech-tag')}
    <div class="featured-links">
      ${button(href, 'Read more', { primary: true, icon: 'fas fa-arrow-right' })}
      ${linkButtons(p.links, 1)}
    </div>
  </div>
</article>`;
};

/** Facts as cards with their conditions. */
export const factCards = (list: Fact[] | undefined): string =>
  list?.length
    ? `<dl class="pd-facts">${list
        .map(
          (f) => `<div class="pd-fact">
  <dd class="pd-fact-value">${esc(f.value)}</dd>
  <dt class="pd-fact-label">${esc(f.label)}</dt>
  ${f.condition ? `<dd class="pd-fact-cond">${esc(f.condition)}</dd>` : ''}
</div>`,
        )
        .join('')}</dl>`
    : '';

export const recognitionList = (items: Recognition[] | undefined): string =>
  items?.length
    ? `<ul class="pd-recognition">${items
        .map(
          (r) => `<li>${scopeBadge(r.scope)} <span class="pd-rec-title">${esc(r.title)}</span>${
            r.detail ? `<span class="pd-rec-detail">${esc(r.detail)}${r.date ? ` · ${esc(r.date)}` : ''}</span>` : r.date ? `<span class="pd-rec-detail">${esc(r.date)}</span>` : ''
          }</li>`,
        )
        .join('')}</ul>`
    : '';

const PUB_STATUS: Record<Publication['status'], string> = {
  preprint: 'Preprint',
  'peer-reviewed': 'Peer reviewed',
  'conference-talk-accepted': 'Accepted talk',
  'conference-talk': 'Conference talk',
  slides: 'Slides',
};

export const publicationCards = (pubs: Publication[] | undefined): string =>
  pubs?.length
    ? `<div class="pub-list">${pubs
        .map(
          (p) => `<div class="pub-card">
  <p class="pub-status"><span class="project-research-label">${PUB_STATUS[p.status]}</span> ${esc(p.statusNote)}</p>
  <p class="pub-title"><a href="${esc(p.href)}"${extAttrs(p.href)}>${esc(p.title)}</a></p>
  <p class="pub-authors">${p.authors.map((a) => (a === 'Samuel Asefa' ? `<strong>${esc(a)}</strong>` : esc(a))).join(', ')}</p>
  <p class="pub-venue">${esc(p.venue)} · ${esc(p.date)}${p.doi ? ` · DOI ${esc(p.doi)}` : ''}</p>
</div>`,
        )
        .join('')}</div>`
    : '';

/** Dark-theme figure (caption explains what's shown). */
export const figure = (m: Media, o: { sizes: string; group?: string; crop?: boolean; ratio?: string; eager?: boolean }): string =>
  fig(m, { sizes: o.sizes, group: o.group, crop: o.crop, ratio: o.ratio, eager: o.eager, numbered: true });

/** Responsive <img> for small fixed-size spots (bento, award thumbnails). */
export const thumb = (src: string, alt: string, max = 800, style?: string): string => {
  const info = mediaInfo(src);
  return `<img src="${esc(info ? mediaUrl(src, max) : src)}"${
    info ? ` srcset="${info.widths.filter((w) => w <= max * 2).map((w) => `${info.base}-${w}.webp ${w}w`).join(', ')}" sizes="(min-width: 900px) 33vw, 92vw" width="${info.w}" height="${info.h}"` : ''
  } alt="${esc(alt)}" loading="lazy" decoding="async"${style ? ` style="${style}"` : ''}>`;
};

/** A short clip with controls; never autoplays. Loads nothing until played. */
export const videoFigure = (v: Video): string =>
  `<figure class="fig fig--video">
  <video class="media media--video" controls playsinline preload="none" poster="${esc(v.poster)}" width="${v.width}" height="${v.height}" aria-label="${esc(v.label)}">
    <source src="${esc(v.src)}" type="video/mp4">
    <a href="${esc(v.src)}">Download the video</a>
  </video>
  ${v.caption ? `<figcaption><span class="fig-label">Video</span> ${rich(v.caption)}</figcaption>` : ''}
</figure>`;
