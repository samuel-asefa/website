import { experience } from '../../content/experience';
import { projectBySlug } from '../../content/projects';
import type { ExperienceItem } from '../../content/types';
import { projectPageUrl, sectionHeader } from '../components';
import { esc, rich } from '../html';
import { page } from '../layout';

const card = (item: ExperienceItem): string => {
  const related = (item.projects ?? []).map(projectBySlug).filter((p) => p && p.depth !== 'entry');
  return `<article class="experience-card">
  <div class="experience-card-header">
    <div class="experience-card-title-row">
      <h3 class="experience-card-name">
        ${esc(item.org)}
        ${item.href ? `<a href="${esc(item.href)}" target="_blank" rel="noopener" class="experience-ext-link" aria-label="Visit ${esc(item.org)} website (opens in a new tab)"><i class="fas fa-external-link-alt" aria-hidden="true"></i></a>` : ''}
      </h3>
    </div>
    <div class="experience-role">${esc(item.role)}</div>
    <div class="experience-meta"><i class="far fa-calendar" aria-hidden="true"></i> ${esc(item.dates)}${item.commitment ? ` &middot; <i class="far fa-clock" aria-hidden="true"></i> ${esc(item.commitment)}` : ''}</div>
  </div>
  <ul class="experience-desc-list">
    ${item.points.map((pt) => `<li>${rich(pt)}</li>`).join('\n    ')}
  </ul>
  ${
    item.roles?.length
      ? `<div class="experience-card-track">
    <span class="track-label">Roles:</span> ${item.roles
      .map((r) => `${esc(r.title)}${r.years ? ` <span class="track-years">(${esc(r.years)})</span>` : ''}`)
      .join('<span class="track-sep" aria-hidden="true"> → </span><span class="visually-hidden">, then </span>')}
  </div>`
      : ''
  }
  ${
    related.length
      ? `<div class="experience-card-work">
    <span class="track-label">Related work:</span> ${related.map((p) => `<a href="${projectPageUrl(p!)}">${esc(p!.title)}</a>`).join(', ')}
  </div>`
      : ''
  }
</article>`;
};

export const renderExperience = (): string => {
  const leadership = experience.filter((e) => e.kind === 'leadership');
  const community = experience.filter((e) => e.kind === 'community');

  const main = `
<section id="experience" class="experience page-section">
  ${sectionHeader({ title: 'Experience', level: 1 })}
  <div class="experience-content">
    <div class="experience-section">
      <h2 class="experience-section-title"><i class="fas fa-briefcase" aria-hidden="true"></i> Experience</h2>
      <div class="experience-grid">
        ${leadership.map(card).join('\n        ')}
      </div>
    </div>
    <div class="experience-section" style="margin-top: 3.5rem;">
      <h2 class="experience-section-title"><i class="fas fa-hands-helping" aria-hidden="true"></i> Community Engagement</h2>
      <div class="experience-grid">
        ${community.map(card).join('\n        ')}
      </div>
    </div>
  </div>
</section>`;

  return page(
    {
      title: 'Experience',
      description:
        'Samuel Asefa’s experience: VEX Team 750W Build Lead, Aerospace Club, Science Olympiad, Computer Science Club, XSTEM, VividSense, RoboZone, TurboTutors, and tutoring.',
      path: '/experience.html',
      image: '/images/push-back-robot.jpeg',
      nav: 'experience',
    },
    main,
  );
};
