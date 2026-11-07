import { absoluteUrl } from '../../config/site';
import { projectBySlug, projectsWithPages } from '../../content/projects';
import type { Block, Project, SectionKey } from '../../content/types';
import {
  CATEGORY_LABEL,
  extAttrs,
  factCards,
  figure,
  linkButtons,
  mentorCredit,
  projectCard,
  projectPageUrl,
  publicationCards,
  recognitionList,
  statusLabel,
  techTags,
  videoFigure,
} from '../components';
import { diagrams } from '../diagrams';
import { esc, rich, summarize } from '../html';
import { page } from '../layout';
import { lightboxOnly } from '../media';
import { routeSketch } from '../route-sketch';

const ORDER: { key: SectionKey; label: string; icon: string }[] = [
  { key: 'context', label: 'Context', icon: 'fas fa-compass' },
  { key: 'design', label: 'Design', icon: 'fas fa-drafting-compass' },
  { key: 'process', label: 'Process', icon: 'fas fa-code-branch' },
  { key: 'evidence', label: 'Results', icon: 'fas fa-chart-bar' },
  { key: 'reflection', label: 'Reflection', icon: 'fas fa-lightbulb' },
];

const block = (b: Block, group: string): string => {
  switch (b.type) {
    case 'text':
      return `<p>${rich(b.html)}</p>`;
    case 'list': {
      const tag = b.ordered ? 'ol' : 'ul';
      return `<${tag} class="pd-list">${b.items.map((i) => `<li>${rich(i)}</li>`).join('')}</${tag}>`;
    }
    case 'figure':
      return `<div class="pd-figure-wrap">${figure(b.media, { sizes: '(min-width: 1100px) 1000px, 92vw', group })}</div>`;
    case 'figures':
      return `<div class="pd-figures">${b.media
        .map((m) =>
          figure(m, {
            sizes: '(min-width: 1100px) 500px, 92vw',
            group,
            crop: m.kind === 'photo',
            ratio: m.kind === 'photo' ? '4 / 3' : undefined,
          }),
        )
        .join('')}</div>`;
    case 'facts':
      return factCards(b.facts);
    case 'steps':
      return `<ol class="pd-steps">${b.steps
        .map(
          (s) => `<li class="pd-step">
  <p class="pd-step-head"><span class="pd-step-label">${esc(s.label)}</span>${s.date ? ` <span class="pd-step-date">${esc(s.date)}</span>` : ''}</p>
  <p>${rich(s.html)}</p>
</li>`,
        )
        .join('')}</ol>`;
    case 'note':
      return `<aside class="pd-note">${b.title ? `<p class="pd-note-title"><i class="fas fa-circle-info" aria-hidden="true"></i> ${esc(b.title)}</p>` : ''}<p>${rich(b.html)}</p></aside>`;
    case 'video':
      return b.beside
        ? `<div class="pd-media-row">${videoFigure(b.video)}${figure(b.beside, { sizes: '(min-width: 900px) 460px, 92vw', group })}</div>`
        : `<div class="pd-video-wrap">${videoFigure(b.video)}</div>`;
    case 'videos':
      return `<div class="pd-video-row">${b.videos.map(videoFigure).join('')}</div>`;
    case 'diagram':
      return `<figure class="fig fig--diagram">${diagrams[b.id] ?? ''}<figcaption><span class="fig-label">Diagram</span> ${rich(b.caption)}</figcaption></figure>`;
    case 'demo':
      return `<div class="demo-card">
  <p class="demo-note">A simplified sketch of RoboRoute’s core idea: straight-line distances, headings, and turns between waypoints on a 144-inch field, written in RoboRoute’s export format. It doesn’t simulate a robot, and headings here follow each segment. <a href="https://samuel-asefa.github.io/RoboRoute/src/" target="_blank" rel="noopener">Open the full tool</a>.</p>
  ${routeSketch()}
</div>`;
  }
};

const jsonLd = (p: Project) => {
  const out: object[] = [];
  for (const pub of p.publications ?? []) {
    if (pub.status !== 'preprint' && pub.status !== 'peer-reviewed') continue;
    out.push({
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: pub.title,
      author: pub.authors.map((name) => ({ '@type': 'Person', name })),
      datePublished: pub.date,
      url: pub.href,
      ...(pub.doi ? { identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi } } : {}),
      creativeWorkStatus: pub.status === 'preprint' ? 'Preprint' : 'Published',
      publisher: { '@type': 'Organization', name: pub.venue },
    });
  }
  out.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Projects', item: absoluteUrl('/projects.html') },
      { '@type': 'ListItem', position: 2, name: p.title, item: absoluteUrl(projectPageUrl(p)) },
    ],
  });
  return out;
};

export const renderProject = (p: Project): string => {
  const all = projectsWithPages();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const present = ORDER.filter((o) => p.sections?.[o.key]);
  const related = (p.related ?? []).map(projectBySlug).filter((r): r is Project => Boolean(r));

  // [icon, label, value HTML]
  const meta: [string, string, string][] = [];
  if (p.role) meta.push(['fas fa-user', 'Role', esc(p.role)]);
  if (p.team) meta.push(['fas fa-users', 'Team', esc(p.team === 'Solo' ? 'Solo project' : p.team)]);
  if (p.mentor) meta.push(['fas fa-chalkboard-user', 'Mentor', `<span class="pd-mentor">${mentorCredit(p)}</span>`]);
  meta.push(['far fa-calendar', 'When', esc(p.dates)]);
  if (p.commitment) meta.push(['far fa-clock', 'Time', esc(p.commitment)]);
  if (p.status) meta.push(['fas fa-circle-check', 'Status', esc(p.status)]);

  const main = `
<section class="project-detail page-section" data-category="${p.category}">
  <div class="section-container">
    <nav class="pd-breadcrumb" aria-label="Breadcrumb"><a href="/projects.html"><i class="fas fa-arrow-left" aria-hidden="true"></i> All Projects</a> <span aria-hidden="true">/</span> <span>${CATEGORY_LABEL[p.category]}</span></nav>

    <div class="pd-header">
      <div class="pd-labels">
        <span class="pd-cat pd-cat-${p.category}">${CATEGORY_LABEL[p.category]}</span>
        ${statusLabel(p)}
      </div>
      <h1>${esc(p.title)}</h1>
      <p class="pd-line">${esc(p.line)}</p>
      <ul class="pd-meta">
        ${meta.map(([icon, k, v]) => `<li><i class="${icon}" aria-hidden="true"></i> <span class="pd-meta-k">${k}:</span> <span class="pd-meta-v">${v}</span></li>`).join('\n        ')}
      </ul>
      ${techTags(p.technologies)}
      ${p.links?.length ? `<div class="project-links pd-links">${linkButtons(p.links, 6)}</div>` : ''}
    </div>

    ${p.cover ? `<div class="pd-cover pd-cover-${p.cover.kind}">${figure(p.cover, { sizes: '(min-width: 1200px) 1100px, 94vw', group: p.slug, eager: true })}${(p.gallery ?? []).map((m) => lightboxOnly(m, p.slug)).join('')}</div>` : ''}

    <div class="pd-summary${p.facts?.length || p.recognition?.length ? '' : ' pd-summary-single'}">
      <div class="pd-card pd-summary-text">
        <h2 class="pd-eyebrow"><i class="fas fa-file-lines" aria-hidden="true"></i> Overview</h2>
        <p>${rich(p.summary ?? p.line)}</p>
        ${p.publications?.length ? `<h2 class="pd-eyebrow pd-eyebrow-gap"><i class="fas fa-book" aria-hidden="true"></i> Publications</h2>${publicationCards(p.publications)}` : ''}
      </div>
      ${
        p.facts?.length || p.recognition?.length
          ? `<aside class="pd-summary-aside" aria-label="Key numbers and recognition">
        ${factCards(p.facts)}
        ${p.recognition?.length ? `<div class="pd-card"><h2 class="pd-eyebrow"><i class="fas fa-trophy" aria-hidden="true"></i> Recognition</h2>${recognitionList(p.recognition)}</div>` : ''}
      </aside>`
          : ''
      }
    </div>

    ${
      present.length >= 3
        ? `<nav class="pd-toc" aria-label="On this page">${present
            .map(({ key, label }) => `<a href="#${key}">${label}</a>`)
            .join('')}${p.links?.length ? '<a href="#resources">Resources</a>' : ''}</nav>`
        : ''
    }

    ${present
      .map(({ key, label, icon }) => {
        const s = p.sections![key]!;
        return `<section class="pd-card pd-section" id="${key}" aria-labelledby="h-${key}">
      <span class="section-eyebrow"><i class="${icon}" aria-hidden="true"></i> ${label}</span>
      <h2 id="h-${key}">${esc(s.title)}</h2>
      <div class="pd-prose">${s.blocks.map((b) => block(b, p.slug)).join('\n')}</div>
    </section>`;
      })
      .join('\n    ')}

    ${
      p.links?.length
        ? `<section class="pd-card pd-section" id="resources" aria-labelledby="h-resources">
      <span class="section-eyebrow"><i class="fas fa-link" aria-hidden="true"></i> Resources</span>
      <h2 id="h-resources">Links &amp; Source</h2>
      <ul class="pd-resources">${p.links
        .map(
          (l) => `<li><a href="${esc(l.href)}"${extAttrs(l.href)}>${esc(l.label)}${
            /^https?:/.test(l.href) ? ' <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>' : ''
          }</a>${l.note ? ` <span class="pd-res-note">${esc(l.note)}</span>` : ''}</li>`,
        )
        .join('')}</ul>
    </section>`
        : ''
    }

    ${
      related.length
        ? `<section class="pd-related" aria-labelledby="related-title">
      <h2 class="category-title" id="related-title">Related Projects</h2>
      <div class="projects-grid">${related.map((r) => projectCard(r)).join('')}</div>
    </section>`
        : ''
    }

    <nav class="pd-pager" aria-label="More projects">
      <a class="pd-pager-link" href="${projectPageUrl(prev)}"><span class="pd-pager-dir"><i class="fas fa-arrow-left" aria-hidden="true"></i> Previous</span><span class="pd-pager-title">${esc(prev.title)}</span></a>
      <a class="btn secondary-btn" href="/projects.html"><i class="fas fa-th-large" aria-hidden="true"></i> All Projects</a>
      <a class="pd-pager-link pd-pager-next" href="${projectPageUrl(next)}"><span class="pd-pager-dir">Next <i class="fas fa-arrow-right" aria-hidden="true"></i></span><span class="pd-pager-title">${esc(next.title)}</span></a>
    </nav>
  </div>
</section>`;

  return page(
    {
      title: p.title,
      description: summarize(p.summary ?? p.line),
      path: projectPageUrl(p),
      image: p.cover?.src,
      imageAlt: p.cover?.alt,
      type: 'article',
      nav: 'projects',
      jsonLd: jsonLd(p),
    },
    main,
  );
};
