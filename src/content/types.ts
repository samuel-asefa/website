/**
 * Content model. Everything the site says lives in typed data under
 * src/content; templates in src/render turn it into HTML at build time.
 *
 * Rule of thumb: leave a field out rather than guessing. Every renderer
 * treats optional fields as optional and omits the matching UI.
 */

/** Trusted, author-written HTML (inline tags such as <a>, <em>, <strong>). */
export type Html = string;

export type MediaKind = 'photo' | 'figure' | 'screenshot' | 'diagram' | 'render';

export interface Media {
  /** Path of the original under /public, e.g. "/images/arc.jpg". */
  src: string;
  alt: string;
  kind: MediaKind;
  /** Explains what the visitor is seeing and, where known, my role in it. */
  caption?: Html;
  /** Short credit or source line, e.g. "Figure 3 in the preprint". */
  source?: Html;
  /** CSS object-position used when the image is cropped. */
  focus?: string;
  /** Preferred display ratio when cropped (e.g. "4 / 5"). Figures are never cropped. */
  ratio?: string;
}

export type Category = 'hardware' | 'software' | 'research';

export type LinkKind = 'code' | 'demo' | 'paper' | 'slides' | 'site' | 'video' | 'data';

export interface ResourceLink {
  label: string;
  href: string;
  kind: LinkKind;
  /** Optional qualifier shown after the label, e.g. "preprint, not peer reviewed". */
  note?: string;
}

/** A number is only shown with the condition that makes it true. */
export interface Fact {
  value: string;
  label: string;
  condition?: string;
}

export type RecognitionScope = 'individual' | 'team' | 'project';

export interface Recognition {
  title: string;
  scope: RecognitionScope;
  detail?: string;
  date?: string;
}

export type PublicationStatus =
  | 'preprint'
  | 'peer-reviewed'
  | 'conference-talk-accepted'
  | 'conference-talk'
  | 'slides';

export interface Publication {
  title: string;
  status: PublicationStatus;
  /** Plain-language status line, e.g. "Working paper, version 2. Not peer reviewed." */
  statusNote: string;
  venue: string;
  date: string;
  authors: string[];
  href: string;
  doi?: string;
}

export type Block =
  | { type: 'text'; html: Html }
  | { type: 'list'; items: Html[]; ordered?: boolean }
  | { type: 'figure'; media: Media; size?: 'wide' | 'full' | 'inline' }
  | { type: 'figures'; media: Media[]; caption?: Html }
  | { type: 'facts'; facts: Fact[] }
  | { type: 'steps'; steps: { label: string; date?: string; html: Html }[] }
  | { type: 'note'; title?: string; html: Html }
  | { type: 'diagram'; id: string; caption: Html }
  | { type: 'demo'; id: 'route-sketch' };

export interface Section {
  /** Heading shown on the page. */
  title: string;
  blocks: Block[];
}

export type SectionKey = 'context' | 'design' | 'process' | 'evidence' | 'reflection';

/**
 * depth controls how much the site publishes:
 *  - 'case-study': full page with the supported sections.
 *  - 'overview':   short page (summary, a figure or two, resources).
 *  - 'entry':      index entry only; links go straight to the project itself.
 */
export type Depth = 'case-study' | 'overview' | 'entry';

export interface Project {
  slug: string;
  title: string;
  /** One line for index entries. */
  line: string;
  category: Category;
  /** Finer labels shown next to the category, e.g. ["Robotics", "CAD"]. */
  tags?: string[];
  depth: Depth;
  /** Display string for dates, e.g. "Dec 2024 – May 2026". */
  dates: string;
  /** Sortable start, "YYYY-MM". */
  start: string;
  status?: string;
  /** What it is and why it matters. Required for projects with their own page. */
  summary?: Html;
  role?: string;
  team?: string;
  collaborators?: string[];
  /** Homepage selection order. Absent → not on the homepage. */
  featured?: number;
  cover?: Media;
  facts?: Fact[];
  recognition?: Recognition[];
  publications?: Publication[];
  sections?: Partial<Record<SectionKey, Section>>;
  technologies?: string[];
  links?: ResourceLink[];
  related?: string[];
}

export interface Role {
  title: string;
  years?: string;
}

export interface ExperienceItem {
  org: string;
  role: string;
  dates: string;
  kind: 'leadership' | 'community';
  commitment?: string;
  roles?: Role[];
  points: Html[];
  href?: string;
  /** Slugs of related projects on this site. */
  projects?: string[];
}

export interface Award {
  title: string;
  issuer: string;
  date?: string;
  scope: RecognitionScope;
  description: Html[];
  media?: { title: string; src?: string; href?: string }[];
  project?: string;
}

export interface Course {
  name: string;
  /** Level exactly as recorded by the school schedule. */
  level: 'AP' | 'Honors' | 'Regular';
  /** Advanced CS Academy course (school designation). */
  csAcademy?: boolean;
  summer?: boolean;
  apScore?: 1 | 2 | 3 | 4 | 5 | 'in-progress';
}

export interface SchoolYear {
  year: string;
  grade: string;
  courses: Course[];
  gpa?: { unweighted: number; weighted: number };
}

export interface Profile {
  label: string;
  href: string;
  handle?: string;
}

export interface ProfileGroup {
  title: string;
  profiles: Profile[];
}
