import { SITE, absoluteUrl } from '../../config/site';
import { featuredProjects } from '../../content/projects';
import { skills } from '../../content/skills';
import { button, featuredCard, sectionHeader, thumb } from '../components';
import { esc } from '../html';
import { page } from '../layout';
import { mediaUrl } from '../media';
import { routeSketch } from '../route-sketch';

const personJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  alternateName: 'Sammy Asefa',
  url: absoluteUrl('/'),
  image: absoluteUrl(mediaUrl('/images/samuel-asefa.jpg', 480)),
  email: `mailto:${SITE.email}`,
  jobTitle: 'Student',
  affiliation: { '@type': 'EducationalOrganization', name: SITE.school },
  description: SITE.description,
  sameAs: [
    'https://www.linkedin.com/in/samuelasefa/',
    'https://github.com/samuel-asefa',
    'https://www.youtube.com/@samuel-asefa',
    'https://www.instagram.com/sammy.asefa/',
    'https://orcid.org/0009-0009-2279-3148',
    'https://scholar.google.com/citations?user=IPMvevIAAAAJ',
    'https://medium.com/@samuel-asefa',
  ],
});

/** Phrases for the typed line under the title. Each is a verifiable role. */
const TYPED = [
  'Build lead for VEX Team 750W',
  'Co-founder of RoboZone',
  'Creator of RoboRoute',
  'Robotics and ML researcher',
  'NASA TechRise winning team',
];

const BENTO: { cls: string; href: string; src: string; pos: string; alt: string; title: string; text: string }[] = [
  {
    cls: 'bento-about',
    href: '/about.html',
    src: '/images/arc.jpg',
    pos: '--img-x: center; --img-y: 25%;',
    alt: 'The SBHS aerospace team at the American Rocketry Challenge national finals',
    title: 'About Me',
    text: 'Get to know me! Who I am, what I build, and the teams and groups I’m part of.',
  },
  {
    cls: 'bento-education',
    href: '/education.html',
    src: '/images/techrise.webp',
    pos: '--img-x: center; --img-y: center;',
    alt: 'The NASA TechRise team with the winner’s certificate',
    title: 'Education',
    text: 'My coursework by year, AP exam scores, and GPA.',
  },
  {
    cls: 'bento-skills',
    href: '/#skills',
    src: '/images/push-back-robot.jpeg',
    pos: '--img-x: center; --img-y: 55%;',
    alt: 'Team 750W’s Push Back robot',
    title: 'Skills & Technologies',
    text: 'The languages, frameworks, and tools I use to bring ideas to life.',
  },
  {
    cls: 'bento-projects',
    href: '/projects.html',
    src: '/images/surroundscanner.png',
    pos: '--img-x: center; --img-y: 25%;',
    alt: 'The SurroundScanner ultrasonic glasses',
    title: 'Projects',
    text: 'Software, hardware, and research projects, each with a detail page, figures, and source code.',
  },
  {
    cls: 'bento-awards',
    href: '/awards.html',
    src: '/images/pvsamedals.jpeg',
    pos: '--img-x: center; --img-y: center;',
    alt: 'Two Presidential Volunteer Service Award medals',
    title: 'Awards & Honors',
    text: 'Recognitions and honors, marked as individual or team.',
  },
  {
    cls: 'bento-contact',
    href: '/contact.html',
    src: '/images/nasapayload.jpeg',
    pos: '--img-x: center; --img-y: center;',
    alt: 'The NDVI mapping payload in its clear enclosure',
    title: 'Get in Touch',
    text: 'Want to collaborate or just say hi? Let’s connect.',
  },
];

const RECOGNITION: { icon: string; text: string }[] = [
  { icon: 'fas fa-rocket', text: 'NASA TechRise Winner (team)' },
  { icon: 'fas fa-code', text: 'USACO Gold Division' },
  { icon: 'fas fa-medal', text: 'National Merit Commended' },
  { icon: 'fas fa-microphone', text: 'MIT URTC Lightning Talk (accepted)' },
  { icon: 'fas fa-trophy', text: 'LaunchSB 1st Place (team)' },
  { icon: 'fas fa-flag-checkered', text: 'American Rocketry Challenge National Finalist (team)' },
  { icon: 'fas fa-robot', text: 'VEX Excellence & Amaze Awards (team)' },
];

export const renderHome = (): string => {
  const featured = featuredProjects();
  const main = `
<section id="home" class="hero">
  <div class="hero-content">
    <div class="hero-text">
      <span class="hero-eyebrow">South Brunswick High School · Class of 2027</span>
      <h1>Samuel Asefa</h1>
      <h2 class="hero-subtitle"><span class="highlight">Developer</span> &amp; <span class="highlight">Engineer</span></h2>
      <div class="typed-text-container">
        <span class="typed-text" data-typed="${esc(JSON.stringify(TYPED))}">${esc(TYPED[0])}</span>
      </div>
      <p class="hero-desc">I’m a senior at South Brunswick High School interested in robotics, electrical engineering, and computer science. I lead the build for VEX Team 750W, write tools like RoboRoute, do simulation-based research, and co-founded RoboZone to teach students robotics.</p>
      <ul class="hero-credibility" aria-label="Highlights">
        <li class="hero-cred-item"><i class="fas fa-robot" aria-hidden="true"></i> Build Lead, Team 750W</li>
        <li class="hero-cred-item"><i class="fas fa-rocket" aria-hidden="true"></i> NASA TechRise Winner (team)</li>
        <li class="hero-cred-item"><i class="fas fa-code" aria-hidden="true"></i> USACO Gold</li>
        <li class="hero-cred-item"><i class="fas fa-flask" aria-hidden="true"></i> 3 Research Preprints</li>
      </ul>
      <div class="hero-btns">
        <a href="/projects.html" class="btn primary-btn">View Projects</a>
        <a href="/contact.html" class="btn secondary-btn">Contact Me</a>
      </div>
    </div>
    <div class="hero-image">
      ${thumb('/images/samuel-asefa.jpg', 'Samuel Asefa', 480).replace('loading="lazy" decoding="async"', 'fetchpriority="high"').replace('<img ', '<img class="profile-image" ')}
      <div class="image-outline"></div>
    </div>
  </div>
  <a href="#explore" class="scroll-indicator" aria-label="Scroll to the Explore section">
    <div class="mouse-scroll"></div>
  </a>
</section>

<section id="explore" class="explore" aria-labelledby="explore-title">
  ${sectionHeader({ title: 'Explore', id: 'explore-title' })}
  <div class="bento-grid">
    ${BENTO.map(
      (b) => `<a href="${b.href}" class="bento-card ${b.cls}">
      <div class="bento-image" style="--img-scale: 1; ${b.pos}">${thumb(b.src, b.alt, 800)}</div>
      <h3>${esc(b.title)}</h3>
      <p>${esc(b.text)}</p>
      <div class="bento-arrow" aria-hidden="true"><i class="fas fa-arrow-right"></i></div>
    </a>`,
    ).join('\n    ')}
  </div>
</section>

<section id="featured" class="featured-work" aria-labelledby="featured-title">
  ${sectionHeader({ eyebrow: 'Selected Work', title: 'Featured Projects', id: 'featured-title' })}
  <div class="featured-grid">
    ${featured.map(featuredCard).join('\n    ')}
  </div>
  <div class="section-cta">${button('/projects.html', 'View All Projects', { icon: 'fas fa-th-large' })}</div>
</section>

<section id="roboroute-demo" class="demo-section" aria-labelledby="demo-title">
  ${sectionHeader({
    eyebrow: 'Interactive',
    title: 'Try RoboRoute',
    id: 'demo-title',
    intro:
      'A simplified version of the route planner I built for VEX autonomous routines. Drag the waypoints (or use arrow keys, or type coordinates) and the distances, headings, turns, and LemLib code update. It doesn’t simulate a robot; <a href="https://samuel-asefa.github.io/RoboRoute/src/">the full tool</a> has field layouts, per-point headings, and more.',
  })}
  <div class="demo-card">
    ${routeSketch()}
  </div>
</section>

<section class="recognition-strip" aria-labelledby="recognition-title">
  <div class="recognition-inner">
    ${sectionHeader({ eyebrow: 'Recognition', title: 'Highlights', id: 'recognition-title' })}
    <ul class="recognition-list">
      ${RECOGNITION.map((r) => `<li><a class="recognition-pill" href="/awards.html"><i class="${r.icon}" aria-hidden="true"></i> ${esc(r.text)}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section id="skills" class="skills" aria-labelledby="skills-title">
  <div class="skills-content">
    ${sectionHeader({ title: 'Skills & Technologies', id: 'skills-title' })}
    <div class="skills-categories">
      ${skills
        .map(
          (c) => `<div class="skills-category">
        <h3>${esc(c.title)}</h3>
        <ul class="skills-grid">
          ${c.items
            .map((s) => `<li class="skill-item"><img src="${esc(mediaUrl(s.icon, 160))}" alt="" width="38" height="38" loading="lazy" decoding="async"><span>${esc(s.name)}</span></li>`)
            .join('\n          ')}
        </ul>
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section id="github" class="github" aria-labelledby="github-title">
  ${sectionHeader({ title: 'GitHub Activity', id: 'github-title' })}
  <div class="github-content" data-github="samuel-asefa">
    <div class="github-stats-grid" id="github-stats-grid">
      <div class="gh-stat-card gh-skeleton"></div>
      <div class="gh-stat-card gh-skeleton"></div>
      <div class="gh-stat-card gh-skeleton"></div>
    </div>
    <div class="github-graph" id="github-graph">
      <div class="gh-skeleton" style="height: 180px; border-radius: var(--radius-sm); background: var(--surface-2);"></div>
    </div>
    <noscript><p class="gh-noscript"><a href="https://github.com/samuel-asefa" target="_blank" rel="noopener">See my repositories on GitHub</a></p></noscript>
  </div>
</section>`;

  return page(
    {
      description:
        'Samuel Asefa - a senior at South Brunswick High School building VEX robots, software like RoboRoute, and simulation-based research, and teaching robotics through RoboZone.',
      path: '/',
      image: '/images/samuel-asefa.jpg',
      imageAlt: 'Samuel Asefa',
      type: 'profile',
      jsonLd: [personJsonLd()],
      nav: 'home',
    },
    main,
  );
};
