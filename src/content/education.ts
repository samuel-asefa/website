import type { SchoolYear } from './types';

export const school = {
  name: 'South Brunswick High School',
  place: 'Monmouth Junction, New Jersey',
  graduation: 'Class of 2027',
};

/**
 * Coursework by year, newest first. AP scores appear only once reported.
 * GPAs are as recorded on my transcript for each completed year.
 */
export const schoolYears: SchoolYear[] = [
  {
    year: '2026–27',
    grade: 'Grade 12',
    courses: [
      { name: 'AP English Literature and Composition', level: 'AP', apScore: 'in-progress' },
      { name: 'AP European History', level: 'AP', apScore: 'in-progress' },
      { name: 'AP Statistics', level: 'AP', apScore: 'in-progress' },
      { name: 'CS Capstone', level: 'AP', csAcademy: true },
      { name: 'Data Structures', level: 'AP', csAcademy: true },
      { name: 'Modern Physics', level: 'AP' },
      { name: 'Multivariable Calculus', level: 'AP' },
      { name: 'Linear Algebra', level: 'AP' },
    ],
  },
  {
    year: '2025–26',
    grade: 'Grade 11',
    gpa: { unweighted: 3.96, weighted: 4.83 },
    courses: [
      { name: 'AP English Language and Composition', level: 'AP', apScore: 5 },
      { name: 'AP World History: Modern', level: 'AP', apScore: 5 },
      { name: 'AP Calculus BC', level: 'AP', apScore: 5 },
      { name: 'AP Physics C', level: 'AP', apScore: 5 },
      { name: 'AP Physics 2', level: 'AP', apScore: 4 },
      { name: 'Virtual Reality and Game Design', level: 'AP', csAcademy: true },
      { name: 'Mobile App Development', level: 'AP', csAcademy: true },
      { name: 'Advanced Biology', level: 'Regular', summer: true },
      { name: 'Personal Financial Management', level: 'Regular', summer: true },
    ],
  },
  {
    year: '2024–25',
    grade: 'Grade 10',
    gpa: { unweighted: 3.96, weighted: 4.65 },
    courses: [
      { name: 'AP US History', level: 'AP', apScore: 5 },
      { name: 'AP Calculus AB', level: 'AP', apScore: 5 },
      { name: 'AP Computer Science A', level: 'AP', apScore: 4 },
      { name: 'AP Chemistry', level: 'AP', apScore: 5 },
      { name: 'Honors Spanish III', level: 'Honors' },
      { name: 'Honors Precalculus with Calculus Enrichment', level: 'Honors', summer: true },
      { name: 'Academic English II', level: 'Regular' },
    ],
  },
  {
    year: '2023–24',
    grade: 'Grade 9',
    gpa: { unweighted: 3.88, weighted: 4.13 },
    courses: [
      { name: 'AP Physics 1', level: 'AP', apScore: 5 },
      { name: 'Honors American Government', level: 'Honors' },
      { name: 'Honors Algebra II', level: 'Honors' },
      { name: 'Honors Chemistry', level: 'Honors', summer: true },
      { name: 'Academic English I', level: 'Regular' },
      { name: 'Computer Science in the 21st Century', level: 'Regular' },
      { name: 'Spanish II', level: 'Regular' },
      { name: 'Freshman Band', level: 'Regular' },
    ],
  },
];
