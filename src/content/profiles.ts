import type { Profile, ProfileGroup } from './types';

/** The links shown on the contact page. */
export const primaryProfiles: Profile[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuelasefa/', handle: 'linkedin.com/in/samuelasefa' },
  { label: 'GitHub', href: 'https://github.com/samuel-asefa', handle: 'github.com/samuel-asefa' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=IPMvevIAAAAJ&hl=en', handle: 'Research profile' },
];

/** "Connect & Learn More" on the About page, grouped as on the original site. */
export const profileGroups: (ProfileGroup & { emoji: string })[] = [
  {
    title: 'General',
    emoji: '📁',
    profiles: [
      { label: 'Website', href: 'https://samuelasefa.vercel.app' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuelasefa' },
      { label: 'Linktree', href: 'https://linktr.ee/samuelasefa' },
      { label: 'Medium', href: 'https://medium.com/@samuel-asefa' },
    ],
  },
  {
    title: 'Programming',
    emoji: '💻',
    profiles: [
      { label: 'GitHub', href: 'https://github.com/samuel-asefa' },
      { label: 'Devpost', href: 'https://devpost.com/samuelasefa20' },
      { label: 'LeetCode', href: 'https://leetcode.com/SamuelAsefa' },
      { label: 'Codewars', href: 'https://www.codewars.com/users/samuel-asefa' },
    ],
  },
  {
    title: 'Research',
    emoji: '🔍',
    profiles: [
      { label: 'ORCID', href: 'https://orcid.org/0009-0009-2279-3148' },
      { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Samuel-Asefa' },
      { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=IPMvevIAAAAJ&hl=en' },
      { label: 'Cambridge Open Engage', href: 'https://www.cambridge.org/engage/coe/search-dashboard?authors=Samuel%20Asefa' },
    ],
  },
  {
    title: 'CAD & Making',
    emoji: '⚙️',
    profiles: [
      { label: 'GrabCAD', href: 'https://grabcad.com/sammy.asefa-1' },
      { label: 'Autodesk Community', href: 'https://forums.autodesk.com/t5/user/viewprofilepage/user-id/17644159' },
      { label: 'Tinkercad', href: 'https://www.tinkercad.com/users/ajEB2PtjeKI' },
      { label: 'Printables', href: 'https://www.printables.com/@SamuelAsefa_5640141' },
      { label: 'Thingiverse', href: 'https://www.thingiverse.com/samuelasefa' },
      { label: 'Instructables', href: 'https://www.instructables.com/member/samuelasefa' },
    ],
  },
  {
    title: 'Electronics & Simulation',
    emoji: '🔌',
    profiles: [
      { label: 'Hackster.io', href: 'https://www.hackster.io/samuelasefa20/' },
      { label: 'Wokwi', href: 'https://wokwi.com/makers/samuelasefa' },
      { label: 'CircuitLab', href: 'https://www.circuitlab.com/user/SamuelAsefa/' },
      { label: 'MATLAB Central', href: 'https://www.mathworks.com/matlabcentral/profile/authors/39785054' },
      { label: 'SimScale', href: 'https://www.simscale.com/projects/SamuelAsefa/' },
    ],
  },
  {
    title: 'Education',
    emoji: '📚',
    profiles: [
      { label: 'Schoolhouse', href: 'https://schoolhouse.world/u/sammy' },
      { label: 'Khan Academy', href: 'https://www.khanacademy.org/profile/samuelasefa' },
      { label: 'Art of Problem Solving', href: 'https://artofproblemsolving.com/community/user/samuelasefa' },
    ],
  },
  {
    title: 'Socials',
    emoji: '🎥',
    profiles: [
      { label: 'YouTube', href: 'https://www.youtube.com/@samuel-asefa' },
      { label: 'Instagram', href: 'https://www.instagram.com/sammy.asefa' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@sammy.asefa' },
    ],
  },
  {
    title: 'Fun',
    emoji: '🎮',
    profiles: [
      { label: 'GeoGuessr', href: 'https://www.geoguessr.com/user/681be3de1d2b3dd795b93347' },
      { label: 'JetPunk', href: 'https://www.jetpunk.com/users/sammystudios' },
      { label: 'Sporcle', href: 'https://www.sporcle.com/user/samuelasefa/' },
      { label: 'Monkeytype', href: 'https://monkeytype.com/profile/SammyStudios' },
      { label: 'Letterboxd', href: 'https://letterboxd.com/SamuelAsefa/' },
    ],
  },
];
