import { projectsWithPages } from '../content/projects';
import { renderAbout } from './pages/about';
import { renderAwards } from './pages/awards';
import { renderContact } from './pages/contact';
import { renderEducation } from './pages/education';
import { renderExperience } from './pages/experience';
import { renderHome } from './pages/home';
import { renderNotFound } from './pages/misc';
import { renderProject } from './pages/project';
import { renderProjects } from './pages/projects';

export interface Route {
  /** Public URL path, e.g. "/about.html". */
  url: string;
  /** Output file relative to the project root, e.g. "about.html". */
  file: string;
  render: () => string;
  /** Include in sitemap.xml (default true). */
  sitemap?: boolean;
}

/**
 * Every page on the site. The original page addresses are kept as-is.
 * Project detail pages are generated from src/content/projects.ts, so
 * nothing here needs editing to add a project.
 */
export const routes = (): Route[] => [
  { url: '/', file: 'index.html', render: renderHome },
  { url: '/about.html', file: 'about.html', render: renderAbout },
  { url: '/experience.html', file: 'experience.html', render: renderExperience },
  { url: '/education.html', file: 'education.html', render: renderEducation },
  { url: '/awards.html', file: 'awards.html', render: renderAwards },
  { url: '/projects.html', file: 'projects.html', render: renderProjects },
  { url: '/contact.html', file: 'contact.html', render: renderContact },
  ...projectsWithPages().map((p) => ({
    url: `/projects/${p.slug}.html`,
    file: `projects/${p.slug}.html`,
    render: () => renderProject(p),
  })),
  { url: '/404.html', file: '404.html', render: renderNotFound, sitemap: false },
];
