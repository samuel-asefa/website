import { SITE, absoluteUrl } from '../../config/site';
import { profileGroups } from '../../content/profiles';
import { esc } from '../html';
import { sectionHeader, thumb } from '../components';
import { page } from '../layout';
import { mediaUrl } from '../media';

/** Fixed-size emoji cards; labels float above them without changing the layout. */
const FACTS: { emoji: string; label: string }[] = [
  { emoji: '🇪🇹', label: 'Ethiopian-American' },
  { emoji: '📍', label: 'From New Jersey' },
  { emoji: '🤖', label: 'Robotics' },
  { emoji: '🔬', label: 'Research' },
  { emoji: '💻', label: 'Programming' },
  { emoji: '🚀', label: 'Aerospace' },
  { emoji: '🌍', label: 'Geography' },
  { emoji: '✏️', label: 'Writing' },
];

const SLIDES: { src: string; alt: string }[] = [
  { src: '/images/projects/rocketry-airbrakes/arc.jpg', alt: 'The SBHS aerospace team at the American Rocketry Challenge national finals in 2025' },
  { src: '/images/projects/ndvi-payload/techrise.webp', alt: 'The NASA TechRise team with the winner’s certificate' },
  { src: '/images/projects/push-back-robot/push-back-robot.jpeg', alt: 'Team 750W’s Push Back competition robot' },
  { src: '/images/projects/ndvi-payload/nasapayload.jpeg', alt: 'The NDVI mapping payload in its clear enclosure' },
  { src: '/images/projects/rocketry-airbrakes/ThisYearTeamAndRocket.jpeg', alt: 'This year’s SBHS Aerospace Club members with the club’s new red rocket and two model rockets in a park' },
  { src: '/images/projects/push-back-robot/V2PushBack.png', alt: 'Version 2 of Team 750W’s Push Back robot, with red and blue blocks on the floor around it' },
  { src: '/images/projects/rocketry-airbrakes/LastYearRocketUpClose.png', alt: 'The 2025–26 competition rocket leaving the launch rail over a snowy field' },
  { src: '/images/awards/pvsamedals.jpeg', alt: 'Two Presidential Volunteer Service Award gold medals' },
];

/** Teaching & Community cards. Eight fill two full rows of four (or four rows of two). */
const IMPACT: { emoji: string; num: string; unit: string; title: string; href: string; text: string }[] = [
  {
    emoji: '🤖',
    num: '90+',
    unit: 'students',
    title: 'RoboZone',
    href: 'https://robozone.world/',
    text: 'Co-Founder and Co-President. I developed our 8-week Arduino, CAD, and C++ curriculum and lead 15+ mentors who have taught it over 160 workshop hours.',
  },
  {
    emoji: '🛠️',
    num: '26',
    unit: 'builders',
    title: '750W Workshops',
    href: 'https://sbrobotics.vercel.app/',
    text: 'As Workshop Lead, I mentor builders across six robotics teams, teaching from 130+ slides and 10 hands-on CAD projects, plus a 7-part CAD series on YouTube.',
  },
  {
    emoji: '⚡',
    num: '65',
    unit: 'students',
    title: 'C++ Circuits Series',
    href: 'https://github.com/samuel-asefa/Circuits-and-Electronics',
    text: 'A ten-session circuits and electronics workshop series I developed and led for the Computer Science Club.',
  },
  {
    emoji: '💡',
    num: '200+',
    unit: 'students',
    title: 'XSTEM',
    href: 'https://x-stem.github.io/',
    text: 'Co-President. I lead entrepreneurship programming, have hosted 6 industry speakers, and mentored 3 Blue Ocean Competition teams that placed in the top 350.',
  },
  {
    emoji: '📚',
    num: '500+',
    unit: 'sessions',
    title: 'TurboTutors',
    href: 'https://turbotutors.org',
    text: 'Co-Founder and Vice President. I created 1,200+ curriculum slides and 2,500+ practice problems for 100+ students in CS, math, and physics.',
  },
  {
    emoji: '🌍',
    num: '70+',
    unit: 'students',
    title: 'Schoolhouse.world',
    href: 'https://schoolhouse.world/portfolio/5778efb9-9143-470d-81be-37338da57a25',
    text: 'Silver-Level Tutor for students from 15+ countries in computer science, math, science, and history, with 80+ “Super Helpful” ratings.',
  },
  {
    emoji: '🚀',
    num: '20+',
    unit: 'students',
    title: 'Aerospace Workshops',
    href: 'https://sbaerospace.vercel.app/',
    text: 'Workshops the Aerospace Club runs at the South Brunswick Public Library, where we’ve taught 20+ students.',
  },
  {
    emoji: '✍️',
    num: '10K+',
    unit: 'views',
    title: 'Robotics Writing',
    href: 'https://medium.com/@samuel-asefa',
    text: '20+ articles on Medium about robotics, control systems, and AI (16,000+ words), with 2,200+ reads.',
  },
];

export const renderAbout = (): string => {
  const main = `
<section class="about-section page-section" aria-labelledby="about-title">
  ${sectionHeader({ title: 'About Me', level: 1, id: 'about-title' })}

  <div class="about-hero-layout">
    <div class="about-text-wrapper">
      <div class="about-text-container">
        <p>Hey, I'm Sammy! I'm a senior at South Brunswick High School passionate about computer science, robotics, and electrical engineering.</p>
        <p>At school, I'm the Build Lead for Team <a href="https://750w.github.io/" target="_blank" rel="noopener">750W</a> in the <a href="https://sbrobotics.vercel.app/" target="_blank" rel="noopener">SBHS Robotics Club</a>, Co-Vice President of the <a href="https://sbaerospace.vercel.app/" target="_blank" rel="noopener">Aerospace Club</a>, Captain of Build Events for <a href="https://sbscioly.github.io/" target="_blank" rel="noopener">Science Olympiad</a>, Co-President of <a href="https://x-stem.github.io/" target="_blank" rel="noopener">XSTEM</a>, and President of the <a href="https://sbcsclub.vercel.app/" target="_blank" rel="noopener">Computer Science Club</a>.</p>
        <p>Outside of school, I'm a Co-Founder and Co-President of <a href="https://robozone.world/" target="_blank" rel="noopener">RoboZone</a>, an initiative dedicated to teaching students computer science, electronics, and robotics through hands-on workshops. I also co-founded <a href="https://turbotutors.org" target="_blank" rel="noopener">TurboTutors</a> and lead engineering at <a href="https://www.vividsenselabs.com/" target="_blank" rel="noopener">VividSense</a>, where we build low-cost assistive devices like <a href="/projects/dexarm.html">Dexarm</a> and <a href="/projects/surroundscanner.html">SurroundScanner</a>.</p>
        <p>I also do research. I'm first author of a preprint on <a href="/projects/adaptive-sensor-fusion.html">adaptive sensor fusion for low-cost robots</a>, co-author of one on <a href="/projects/hybrid-flow-reconstruction.html">flow-field prediction</a>, and my study on <a href="/projects/cookstove-thermoelectric-regeneration.html">thermoelectric filter regeneration</a> was accepted as a lightning talk at MIT URTC. All three are computational studies.</p>
        <p>Away from engineering, I like geography and history: I won 1st place in Geographeud at the 2022 International Geography Bee, play on JetPunk and Sporcle, and built <a href="/projects/amharicquest.html">AmharicQuest</a> for learning Amharic and its Fidel script.</p>
      </div>
    </div>

    <div class="about-carousel-wrapper">
      <div class="swiper mySwiper" aria-roledescription="carousel" aria-label="Photos">
        <div class="swiper-wrapper">
          ${SLIDES.map((s, i) => `<div class="swiper-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SLIDES.length}">${thumb(s.src, s.alt, 800)}</div>`).join('\n          ')}
        </div>
      </div>
      <p class="carousel-hint">Swipe or drag the cards. Use the arrow keys when the photos are focused.</p>
      <ul class="fact-chips" aria-label="A little about me">
        ${FACTS.map((f, i) => `<li class="fact-chip">
          <button class="fact-trigger" type="button" aria-label="${esc(f.label)}" aria-expanded="false" aria-controls="about-fact-${i}"><span class="fact-emoji" aria-hidden="true">${f.emoji}</span></button>
          <span class="fact-label" id="about-fact-${i}">${esc(f.label)}</span>
        </li>`).join('\n        ')}
      </ul>
    </div>
  </div>

  ${sectionHeader({ title: 'Teaching & Community', id: 'teaching-title' })}
  <div class="impact-grid">
    ${IMPACT.map(
      (c) => `<a class="impact-card" href="${c.href}" target="_blank" rel="noopener">
      <span class="impact-top"><span class="impact-num">${esc(c.num)} <span>${esc(c.unit)}</span></span><span class="impact-emoji" aria-hidden="true">${c.emoji}</span></span>
      <h3>${esc(c.title)} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></h3>
      <p>${esc(c.text)}</p>
    </a>`,
    ).join('\n    ')}
  </div>

  ${sectionHeader({ title: 'Connect & Learn More', id: 'profiles' })}
  <div class="socials-grid">
    ${profileGroups
      .map(
        (g) => `<div class="social-category">
      <h3><span aria-hidden="true">${g.emoji}</span> ${esc(g.title)}</h3>
      <ul class="social-links-list">
        ${g.profiles.map((p) => `<li><a href="${esc(p.href)}" target="_blank" rel="noopener">${esc(p.label)}</a></li>`).join('\n        ')}
      </ul>
    </div>`,
      )
      .join('\n    ')}
  </div>
</section>`;

  return page(
    {
      title: 'About',
      description:
        'About Samuel Asefa - a senior at South Brunswick High School in robotics, aerospace, Science Olympiad, and computer science, and Co-Founder of RoboZone and TurboTutors.',
      path: '/about.html',
      image: '/images/projects/rocketry-airbrakes/arc.jpg',
      type: 'profile',
      nav: 'about',
      head: '<link rel="stylesheet" href="/src/styles/carousel.css">',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: absoluteUrl('/about.html'),
          mainEntity: {
            '@type': 'Person',
            name: SITE.name,
            alternateName: 'Sammy Asefa',
            url: absoluteUrl('/'),
            image: absoluteUrl(mediaUrl('/images/site/samuel-asefa.jpg', 480)),
            affiliation: { '@type': 'EducationalOrganization', name: SITE.school },
          },
        },
      ],
    },
    main,
  );
};
