import { SITE, absoluteUrl } from '../../config/site';
import { profileGroups } from '../../content/profiles';
import { esc } from '../html';
import { sectionHeader, thumb } from '../components';
import { page } from '../layout';
import { mediaUrl } from '../media';

const SLIDES: { src: string; alt: string }[] = [
  { src: '/images/arc.jpg', alt: 'The SBHS aerospace team at the American Rocketry Challenge national finals in 2025' },
  { src: '/images/techrise.webp', alt: 'The NASA TechRise team with the winner’s certificate' },
  { src: '/images/push-back-robot.jpeg', alt: 'Team 750W’s Push Back competition robot' },
  { src: '/images/nasapayload.jpeg', alt: 'The NDVI mapping payload in its clear enclosure' },
  { src: '/images/pvsamedals.jpeg', alt: 'Two Presidential Volunteer Service Award gold medals' },
];

const IMPACT: { num: string; unit: string; title: string; href: string; text: string }[] = [
  {
    num: '90+',
    unit: 'students',
    title: 'RoboZone',
    href: 'https://robozone.world/',
    text: 'Co-founder and co-president. I developed our 8-week Arduino, CAD, and C++ curriculum and lead 15+ mentors who have taught it over 160 workshop hours.',
  },
  {
    num: '26',
    unit: 'builders',
    title: '750W Workshops',
    href: 'https://sbrobotics.vercel.app/',
    text: 'As workshop lead I mentor builders across six robotics teams, teaching from 130+ slides and 10 hands-on CAD projects, plus a 7-part CAD series on YouTube.',
  },
  {
    num: '65',
    unit: 'students',
    title: 'C++ Circuits Series',
    href: 'https://github.com/samuel-asefa/Circuits-and-Electronics',
    text: 'A ten-session circuits and electronics workshop series I developed and led for the Computer Science Club.',
  },
  {
    num: '500+',
    unit: 'sessions',
    title: 'Tutoring',
    href: 'https://turbotutors.org',
    text: 'Co-founder of TurboTutors (500+ sessions for 100+ students in CS, math, and physics) and a Schoolhouse.world tutor for 70+ students from 15+ countries.',
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
        <p>At school, I'm the build lead for team <a href="https://750w.github.io/" target="_blank" rel="noopener">750W</a> in the <a href="https://sbrobotics.vercel.app/" target="_blank" rel="noopener">SBHS Robotics Club</a>, co-vice president of the <a href="https://sbaerospace.vercel.app/" target="_blank" rel="noopener">Aerospace Club</a>, captain of build events for <a href="https://sbscioly.github.io/" target="_blank" rel="noopener">Science Olympiad</a>, co-president of <a href="https://x-stem.github.io/" target="_blank" rel="noopener">XSTEM</a>, and president of the <a href="https://sbcsclub.vercel.app/" target="_blank" rel="noopener">Computer Science Club</a>.</p>
        <p>Outside of school, I'm a Co-Founder and Co-President of <a href="https://robozone.world/" target="_blank" rel="noopener">RoboZone</a>, an initiative dedicated to teaching students computer science, electronics, and robotics through hands-on workshops. I also co-founded <a href="https://turbotutors.org" target="_blank" rel="noopener">TurboTutors</a> and lead engineering at <a href="https://www.vividsenselabs.com/" target="_blank" rel="noopener">VividSense</a>, where we build low-cost assistive devices like <a href="/projects/dexarm.html">Dexarm</a> and <a href="/projects/surroundscanner.html">SurroundScanner</a>.</p>
        <p>I also do research. I'm first author of a preprint on <a href="/projects/adaptive-sensor-fusion.html">adaptive sensor fusion for low-cost robots</a>, co-author of one on <a href="/projects/hybrid-flow-reconstruction.html">flow-field prediction</a>, and my study on <a href="/projects/cookstove-thermoelectric-regeneration.html">thermoelectric filter regeneration</a> was accepted as a lightning talk at MIT URTC. All three are computational studies and none is peer reviewed yet.</p>
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
    </div>
  </div>

  ${sectionHeader({ title: 'Teaching & Community', id: 'teaching-title' })}
  <div class="impact-grid">
    ${IMPACT.map(
      (c) => `<a class="impact-card" href="${c.href}" target="_blank" rel="noopener">
      <span class="impact-num">${esc(c.num)} <span>${esc(c.unit)}</span></span>
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
        'About Samuel Asefa - a senior at South Brunswick High School in robotics, aerospace, Science Olympiad, and computer science, and co-founder of RoboZone and TurboTutors.',
      path: '/about.html',
      image: '/images/arc.jpg',
      type: 'profile',
      nav: 'about',
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
            image: absoluteUrl(mediaUrl('/images/samuel-asefa.jpg', 480)),
            affiliation: { '@type': 'EducationalOrganization', name: SITE.school },
          },
        },
      ],
    },
    main,
  );
};
