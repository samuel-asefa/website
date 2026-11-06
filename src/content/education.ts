import type { SchoolYear } from './types';

export const school = {
  name: 'South Brunswick High School',
  place: 'Monmouth Junction, New Jersey',
  graduation: 'Class of 2027',
  classRank: { rank: '5–10', classSize: 670, top: 'Top 1%' },
  /** Official school logo, from the header of sbhs.sbschools.org. */
  logo: '/images/sbhs-logo.png',
};

/**
 * Coursework by year, newest first. AP scores appear only once reported.
 * Self-studied exams (selfStudy: true) go under the year I took the exam; they appear on
 * the AP Scores tab with a Self-study tag, not in the course list.
 * GPAs are as recorded on my transcript for each completed year.
 * Each course has a subject emoji shown beside its name; an exam can override it.
 * AP-Weighted courses aren't AP classes but carry AP weight in the GPA (the four CS Academy
 * courses, Modern Physics, and Multivariable Calculus & Linear Algebra).
 */
export const schoolYears: SchoolYear[] = [
  {
    year: '2026–27',
    grade: 'Grade 12',
    courses: [
      { emoji: '📖', name: 'AP English Literature and Composition', short: 'AP English Literature', level: 'AP', apScore: 'in-progress' },
      { emoji: '🏰', name: 'AP European History', level: 'AP', apScore: 'in-progress' },
      { emoji: '📊', name: 'AP Statistics', level: 'AP', apScore: 'in-progress' },
      { emoji: '🧩', name: 'CS Capstone', level: 'AP-Weighted', csAcademy: true },
      { emoji: '🗂️', name: 'Data Structures', level: 'AP-Weighted', csAcademy: true },
      { emoji: '⚛️', name: 'Modern Physics', level: 'AP-Weighted' },
      { emoji: '🧊', name: 'Multivariable Calculus & Linear Algebra', short: 'Multivariable Calc & Lin. Algebra', level: 'AP-Weighted' },
      { emoji: '🧬', name: 'AP Biology', level: 'AP', apScore: 'in-progress', selfStudy: true },
      { emoji: '🏦', name: 'AP Macroeconomics', level: 'AP', apScore: 'in-progress', selfStudy: true },
    ],
  },
  {
    year: '2025–26',
    grade: 'Grade 11',
    gpa: { unweighted: 3.96, weighted: 4.83 },
    courses: [
      { emoji: '✍️', name: 'AP English Language and Composition', short: 'AP English Language', level: 'AP', apScore: 5 },
      { emoji: '🌍', name: 'AP World History: Modern', level: 'AP', apScore: 5 },
      { emoji: '📈', name: 'AP Calculus BC', level: 'AP', apScore: 5 },
      {
        emoji: '🚀',
        name: 'AP Physics C',
        level: 'AP',
        apExams: [
          { name: 'AP Physics C: Mechanics', short: 'Mech', apScore: 5 },
          { name: 'AP Physics C: Electricity and Magnetism', short: 'E&M', emoji: '🧲', apScore: 5 },
        ],
      },
      { emoji: '🎮', name: 'Virtual Reality and Game Design', level: 'AP-Weighted', csAcademy: true },
      { emoji: '📱', name: 'Mobile App Development', level: 'AP-Weighted', csAcademy: true },
      { emoji: '🔬', name: 'Advanced Biology', level: 'Regular', summer: true },
      { emoji: '💰', name: 'Personal Financial Management', level: 'Regular', summer: true },
    ],
  },
  {
    year: '2024–25',
    grade: 'Grade 10',
    gpa: { unweighted: 3.96, weighted: 4.65 },
    courses: [
      { emoji: '🗽', name: 'AP US History', level: 'AP', apScore: 5 },
      // I took the BC exam (not AB) at the end of the AB class.
      { emoji: '📈', name: 'AP Calculus AB', level: 'AP', apExams: [{ name: 'AP Calculus BC', short: 'BC exam', apScore: 4 }] },
      { emoji: '☕', name: 'AP Computer Science A', level: 'AP', apScore: 4 },
      { emoji: '⚗️', name: 'AP Chemistry', level: 'AP', apScore: 5 },
      { emoji: '💬', name: 'Honors Spanish III', level: 'Honors' },
      { emoji: '📐', name: 'Honors Precalculus with Calculus Enrichment', short: 'Precalc w/ Calc Enrichment', level: 'Honors', summer: true },
      { emoji: '📚', name: 'Academic English II', level: 'Regular' },
    ],
  },
  {
    year: '2023–24',
    grade: 'Grade 9',
    gpa: { unweighted: 3.88, weighted: 4.13 },
    courses: [
      { emoji: '🍎', name: 'AP Physics 1', level: 'AP', apScore: 5 },
      { emoji: '💡', name: 'AP Physics 2', level: 'AP', apScore: 4, selfStudy: true },
      { emoji: '🏛️', name: 'Honors American Government', level: 'Honors' },
      { emoji: '🧮', name: 'Honors Algebra II', level: 'Honors' },
      { emoji: '🧪', name: 'Honors Chemistry', level: 'Honors', summer: true },
      { emoji: '📝', name: 'Academic English I', level: 'Regular' },
      { emoji: '💻', name: 'Computer Science in the 21st Century', short: 'CS in the 21st Century', level: 'Regular' },
      { emoji: '💬', name: 'Spanish II', level: 'Regular' },
      { emoji: '🎺', name: 'Freshman Band', level: 'Regular' },
    ],
  },
];
