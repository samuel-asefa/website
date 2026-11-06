import { awards } from '../../content/awards';
import { projectBySlug } from '../../content/projects';
import type { Award, RecognitionScope } from '../../content/types';
import { SCOPE_LABEL, projectPageUrl, scopeBadge, sectionHeader } from '../components';
import { esc, rich } from '../html';
import { page } from '../layout';
import { mediaInfo, mediaUrl, originalUrl } from '../media';

const mediaCard = (a: Award, m: NonNullable<Award['media']>[number]): string => {
  if (!m.src) return '';
  const info = mediaInfo(m.src);
  const imgTag = `<img src="${esc(info ? mediaUrl(m.src, 480) : m.src)}" alt="" loading="lazy" decoding="async" class="award-media-img"${
    info ? ` width="${info.w}" height="${info.h}"` : ''
  }>`;
  const label = `<span class="award-media-title">${esc(m.title)}</span>`;
  if (m.href && /^https?:/.test(m.href)) {
    return `<a class="award-media-card" href="${esc(m.href)}" target="_blank" rel="noopener" aria-label="${esc(m.title)} (opens in a new tab)">${imgTag}${label}</a>`;
  }
  if (m.href?.endsWith('.pdf')) {
    return `<button type="button" class="award-media-card" data-modal-pdf="${esc(m.href)}" data-caption="${esc(`${a.title}: ${m.title}`)}" aria-label="Open ${esc(m.title)}">${imgTag}${label}</button>`;
  }
  return `<button type="button" class="award-media-card" data-modal-src="${esc(info ? mediaUrl(m.src, 2400) : m.src)}" data-original="${esc(originalUrl(m.src))}" data-group="${esc(a.title)}" data-caption="${esc(`${a.title}: ${m.title}`)}" aria-label="View ${esc(m.title)}">${imgTag}${label}</button>`;
};

const awardCard = (a: Award): string => {
  const proj = a.project ? projectBySlug(a.project) : undefined;
  return `<article class="award-card" data-scope="${a.scope}">
  <div class="award-header">
    <div class="award-title-group">
      <div class="award-badges">${scopeBadge(a.scope)}${a.date ? `<span class="award-date"><i class="far fa-calendar" aria-hidden="true"></i> ${esc(a.date)}</span>` : ''}</div>
      <h3>${esc(a.title)}</h3>
      <p class="award-issuer">Issued by ${esc(a.issuer)}</p>
    </div>
  </div>
  <ul class="award-desc-list">
    ${a.description.map((d) => `<li>${rich(d)}</li>`).join('\n    ')}
  </ul>
  ${proj && proj.depth !== 'entry' ? `<a class="award-project-link" href="${projectPageUrl(proj)}"><i class="fas fa-diagram-project" aria-hidden="true"></i> Related project: ${esc(proj.title)}</a>` : ''}
  ${a.media?.length ? `<div class="award-media-grid">${a.media.map((m) => mediaCard(a, m)).join('')}</div>` : ''}
</article>`;
};

export const renderAwards = (): string => {
  const scopes: RecognitionScope[] = ['individual', 'team'];
  const count = (s: RecognitionScope) => awards.filter((a) => a.scope === s).length;
  const main = `
<section id="awards" class="awards page-section">
  ${sectionHeader({
    title: 'Honors & Awards',
    level: 1,
  })}
  <div class="awards-content">
    <div class="project-filters award-filters" role="group" aria-label="Filter awards">
      <button type="button" class="filter-btn active" data-award-filter="all" aria-pressed="true">All <span class="filter-count">${awards.length}</span></button>
      ${scopes
        .map(
          (s) =>
            `<button type="button" class="filter-btn" data-award-filter="${s}" aria-pressed="false">${SCOPE_LABEL[s]} <span class="filter-count">${count(s)}</span></button>`,
        )
        .join('\n      ')}
    </div>
    <p class="visually-hidden" role="status" aria-live="polite" data-award-status></p>
    <div class="awards-grid">
      ${awards.map(awardCard).join('\n      ')}
    </div>
  </div>
</section>`;

  return page(
    {
      title: 'Awards & Honors',
      description:
        'Awards and honors earned by Samuel Asefa in robotics, research, programming, science, and service, each marked as an individual or team award.',
      path: '/awards.html',
      image: '/images/awards/pvsamedals.jpeg',
      nav: 'awards',
    },
    main,
  );
};
