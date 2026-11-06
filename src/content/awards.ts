import type { Award } from './types';

/**
 * Awards, newest first. `scope` says whose award it is:
 * individual (mine) or team (shared with teammates or co-authors).
 */
export const awards: Award[] = [
  {
    title: 'MIT URTC lightning talk (accepted)',
    issuer: 'MIT Undergraduate Research Technology Conference',
    date: 'Sep 2026',
    scope: 'team',
    description: [
      'Accepted for a lightning talk on thermoelectric-assisted regeneration of aminosilica sorbents for cookstove aldehyde capture.',
    ],
    project: 'cookstove-thermoelectric-regeneration',
  },
  {
    title: 'National Merit Commended Student',
    issuer: 'National Merit Scholarship Corporation',
    date: 'Sep 2026',
    scope: 'individual',
    description: [
      'Recognizes roughly 50,000 students in each graduating class with the highest PSAT scores, out of about 1.3 million (top 3.8%).',
    ],
  },
  {
    title: 'Global Quantum Mechanics Challenge, final round qualifier',
    issuer: 'Global Quantum Mechanics Challenge',
    date: 'Aug 2026',
    scope: 'individual',
    description: ['Qualified for the final round.'],
    media: [
      { title: 'Qualification results', src: '/images/awards/gqmc-final-round.png' },
      { title: 'Certificate of participation', src: '/images/awards/gqmc-certificate-of-participation2.png' },
    ],
  },
  {
    title: 'International Computer Science Competition, pre-final qualifier',
    issuer: 'International Computer Science Competition',
    date: 'Jul 2026',
    scope: 'individual',
    description: ['Qualified for the second round.'],
    media: [
      { title: 'Qualification results', src: '/images/awards/icsc-performance-report.png' },
      { title: 'Certificate of participation', src: '/images/awards/icsc-participation-certificate.png' },
    ],
  },
  {
    title: 'Global Quantum Mechanics Challenge, semifinal qualifier',
    issuer: 'Global Quantum Mechanics Challenge',
    date: 'Jun 2026',
    scope: 'individual',
    description: ['Qualified for the second round.'],
    media: [
      { title: 'Qualification results', src: '/images/awards/gqmc-performance-report.png' },
      { title: 'Certificate of participation', src: '/images/awards/gqmc-certificate-of-participation.png' },
    ],
  },
  {
    title: 'National Recognition Program, School Recognition Award',
    issuer: 'College Board',
    date: 'Jun 2026',
    scope: 'individual',
    description: ['Recognized by the College Board National Recognition Program for academic achievement.'],
    media: [{ title: 'Award letter', src: '/images/awards/national-recognition-program-award.png' }],
  },
  {
    title: 'NJ Science League, AP Physics C team plaque',
    issuer: 'New Jersey Science League',
    date: 'May 2026',
    scope: 'team',
    description: [
      'Team placed 3rd of 33 (top 9%) in the AP Physics C competition. Individually, I tied for 13th of 92 competitors statewide.',
    ],
  },
  {
    title: 'LaunchSB, 1st place',
    issuer: 'SBHS XSTEM',
    date: 'Apr 2026',
    scope: 'team',
    description: ['First of 40+ teams for VividSense’s DexArm, a low-cost prosthetic arm.'],
    project: 'dexarm',
  },
  {
    title: 'Garden State Cyber CTF, top 7%',
    issuer: 'NJCCIC',
    date: 'Mar 2026',
    scope: 'team',
    description: ['Placed 29th of 420 teams in the Garden State Capture the Flag cybersecurity competition.'],
  },
  {
    title: 'USA Computing Olympiad, Gold division',
    issuer: 'USA Computing Olympiad',
    date: 'Feb 2026',
    scope: 'individual',
    description: ['Promoted to the Gold division with a perfect score in the Silver division.'],
  },
  {
    title: 'NASA TechRise Student Challenge winner',
    issuer: 'NASA',
    date: 'Jan 2026',
    scope: 'team',
    description: [
      'Selected in the high-altitude balloon category for a proposed NDVI mapping payload using machine learning; $1,500 in funding.',
    ],
    media: [
      { title: 'TechRise team', src: '/images/projects/ndvi-payload/techrise.webp' },
      { title: 'The payload', src: '/images/projects/ndvi-payload/nasapayload.jpeg' },
      { title: 'Payload in its case', src: '/images/projects/ndvi-payload/TechRise1.jpg' },
      { title: 'Balloon liftoff', src: '/images/projects/ndvi-payload/TechRise2.jpg' },
    ],
    project: 'ndvi-payload',
  },
  {
    title: 'AP Scholar with Distinction',
    issuer: 'College Board',
    date: 'Jul 2025',
    scope: 'individual',
    description: ['An average score of at least 3.5 on all AP exams taken, and 3 or higher on five or more exams.'],
    media: [{ title: 'Certificate', src: '/images/awards/apscholar.png', href: '/images/awards/apscholar.pdf' }],
  },
  {
    title: 'Presidential Volunteer Service Award, Gold (twice)',
    issuer: 'Corporation for National and Community Service',
    date: 'Apr 2025',
    scope: 'individual',
    description: ['200+ volunteer hours with RoboZone and TurboTutors over two years.'],
    media: [
      { title: '2024–25 certificate', src: '/images/awards/pvsa2024.jpeg' },
      { title: '2023–24 certificate', src: '/images/awards/pvsa2023.jpeg' },
      { title: 'Both medals', src: '/images/awards/pvsamedals.jpeg' },
    ],
  },
  {
    title: 'American Rocketry Challenge 2025, national finalist',
    issuer: 'National Association of Rocketry',
    date: 'Apr 2025',
    scope: 'team',
    description: [
      'Qualified for the national finals (top 100 of 1,001 entries) and placed 50th at the finals in Virginia.',
    ],
    media: [{ title: 'At the national finals', src: '/images/projects/rocketry-airbrakes/arc.jpg' }],
    project: 'rocketry-airbrakes',
  },
  {
    title: 'LaunchSB, 2nd place',
    issuer: 'SBHS XSTEM',
    date: 'Apr 2025',
    scope: 'team',
    description: ['Second of 40+ teams for VividSense’s SurroundScanner, a navigation aid for people with visual impairments.'],
    project: 'surroundscanner',
  },
  {
    title: 'VEX Workforce Readiness Online Challenge, finalist',
    issuer: 'REC Foundation (VEX online challenges)',
    date: 'Mar 2025',
    scope: 'individual',
    description: [
      'Top 6 of about 50 teams for my proposal on automating aircraft riveting, a case study in robotics-driven aerospace manufacturing; awarded $100.',
    ],
    media: [
      { title: '2025 winners announcement', src: '/images/awards/onlinechallenges.jpg', href: 'https://recf.org/2025-online-challenges-winners-announced/' },
      { title: 'My proposal (PDF, 12.6 MB)', src: '/images/awards/proposalpicture.png', href: '/images/awards/Proposal.pdf' },
    ],
  },
  {
    title: 'LaunchSB, 3rd place',
    issuer: 'SBHS XSTEM',
    date: 'Apr 2024',
    scope: 'team',
    description: [
      'Third of 30+ teams for BeniFlow, a device to redirect incomplete-combustion cooking pollutants away from households.',
    ],
    project: 'cookstove-thermoelectric-regeneration',
  },
  {
    title: 'International Geography Bee',
    issuer: 'International Academic Competitions',
    date: 'Jul 2022',
    scope: 'individual',
    description: ['1st place, Geographeud', '2nd place, Climate Change Task Force', '3rd place, Geography Bowl'],
  },
  {
    title: 'VEX Robotics awards',
    issuer: 'VEX Robotics',
    scope: 'team',
    description: [
      'Excellence Award, CCHS High Stakes Tournament',
      'Amaze Award, SBHS Over Under Tournament',
      'Amaze Award, SBHS Push Back Tournament',
      'Amaze Award, Pirate Popoff Push Back Tournament',
      'State championship qualification, three times',
    ],
    project: 'push-back-robot',
  },
  {
    title: 'Honor societies',
    issuer: 'South Brunswick High School',
    scope: 'individual',
    description: ['National Honor Society', 'Computer Science Honor Society', 'Science Honor Society'],
  },
];
