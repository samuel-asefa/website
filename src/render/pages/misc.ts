import { sectionHeader } from '../components';
import { page } from '../layout';

export const renderNotFound = (): string =>
  page(
    {
      title: 'Page Not Found',
      description: 'This page doesn’t exist.',
      path: '/404.html',
      noindex: true,
    },
    `<section class="page-section notfound">
  ${sectionHeader({ title: 'Page Not Found', level: 1, eyebrow: '404' })}
  <p class="notfound-text">This page doesn’t exist or may have moved.</p>
  <div class="hero-btns notfound-btns">
    <a href="/" class="btn primary-btn"><i class="fas fa-house" aria-hidden="true"></i> Home</a>
    <a href="/projects.html" class="btn secondary-btn">Projects</a>
    <a href="/contact.html" class="btn secondary-btn">Contact</a>
  </div>
</section>`,
  );
