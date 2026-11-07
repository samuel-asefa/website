import { projects } from '../../content/projects';
import type { Category, Project } from '../../content/types';
import { CATEGORY_LABEL, projectCard, sectionHeader } from '../components';
import { page } from '../layout';

/** Display order within each category (matches the original site, newest additions last). */
const ORDER = [
  'roboroute',
  'sciolytics',
  'mathify',
  'circuitspace',
  'studently',
  'amharicquest',
  'dexarm',
  'surroundscanner',
  'push-back-robot',
  'high-stakes-robot',
  'robot-tour',
  'ndvi-payload',
  'rocketry-airbrakes',
  'adaptive-sensor-fusion',
  'hybrid-flow-reconstruction',
  'cookstove-thermoelectric-regeneration',
  'life-expectancy-model',
  'global-trade-model',
];

const rank = (p: Project) => {
  const i = ORDER.indexOf(p.slug);
  return i === -1 ? ORDER.length : i;
};

const CATS: Category[] = ['software', 'hardware', 'research'];
const CAT_ICON: Record<Category, string> = { software: 'fa-code', hardware: 'fa-microchip', research: 'fa-flask' };

export const renderProjects = (): string => {
  const sorted = [...projects].sort((a, b) => rank(a) - rank(b));
  const count = (c: Category) => projects.filter((p) => p.category === c).length;

  const main = `
<section id="projects" class="projects page-section">
  ${sectionHeader({
    title: 'My Projects',
    level: 1,
    intro: 'Software, hardware, and research projects I’ve worked on. Click <strong>Details</strong> on any of them for the full write-up.',
  })}

  <div class="project-filters" role="group" aria-label="Filter projects">
    <button type="button" class="filter-btn active" data-filter="all" aria-pressed="true">All Projects <span class="filter-count">${projects.length}</span></button>
    ${CATS.map(
      (c) =>
        `<button type="button" class="filter-btn" data-filter="${c}" aria-pressed="false">${CATEGORY_LABEL[c]} <span class="filter-count">${count(c)}</span></button>`,
    ).join('\n    ')}
  </div>
  <p class="visually-hidden" role="status" aria-live="polite" data-filter-status></p>

  <div class="projects-content">
    ${CATS.map(
      (c) => `<div class="project-category" data-category="${c}">
      <h2 class="category-title"><i class="fas ${CAT_ICON[c]}" aria-hidden="true"></i> ${CATEGORY_LABEL[c]} Projects</h2>
      <div class="projects-grid">
        ${sorted
          .filter((p) => p.category === c)
          .map((p) => projectCard(p))
          .join('\n        ')}
      </div>
    </div>`,
    ).join('\n    ')}
  </div>
</section>`;

  return page(
    {
      title: 'Projects',
      description:
        'Software, hardware, and research projects by Samuel Asefa, including RoboRoute, the NDVI mapping payload, and preprints on sensor fusion and flow prediction.',
      path: '/projects.html',
      image: '/images/projects/roboroute/roboroute.png',
      nav: 'projects',
    },
    main,
  );
};
