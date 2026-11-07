import { school, schoolYears } from '../../content/education';
import type { Course } from '../../content/types';
import { sectionHeader } from '../components';
import { esc } from '../html';
import { page } from '../layout';
import { mediaUrl } from '../media';

const SCALE: Record<number, string> = {
  5: 'Extremely Well Qualified',
  4: 'Well Qualified',
  3: 'Qualified',
  2: 'Possibly Qualified',
  1: 'No Recommendation',
};

export const renderEducation = (): string => {
  const withGpa = schoolYears.filter((y) => y.gpa);
  const avg = (k: 'unweighted' | 'weighted') => withGpa.reduce((s, y) => s + (y.gpa?.[k] ?? 0), 0) / (withGpa.length || 1);
  // One entry per AP exam taken: Physics C becomes two exams, and the AB class lists
  // the BC exam I took in it (noted on the card as "taken in AP Calculus AB").
  const allAp = schoolYears.flatMap((y) =>
    y.courses.flatMap((c) => {
      const base = { ...c, grade: y.grade, year: y.year, takenIn: undefined as string | undefined };
      if (c.apExams)
        return c.apExams.map((e) => ({
          ...base,
          name: e.name,
          emoji: e.emoji ?? c.emoji,
          apScore: e.apScore,
          takenIn: c.apExams?.length === 1 && e.name !== c.name ? c.name : undefined,
        }));
      return c.apScore === undefined ? [] : [base];
    }),
  );
  // Within a year, A–Z keeps related exams together (Calculus AB/BC, Physics 1/2/C).
  const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, 'en', { numeric: true });
  const done = allAp.filter((c) => typeof c.apScore === 'number');
  const inProgress = allAp.filter((c) => c.apScore === 'in-progress').sort(byName);
  // Completed exams grouped by year, newest first (schoolYears order).
  const doneByYear = schoolYears
    .map((y) => ({ y, items: done.filter((c) => c.year === y.year).sort(byName) }))
    .filter((g) => g.items.length);
  const listNames = (names: string[]) =>
    names.length < 3 ? names.join(' and ') : `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  const selfDone = listNames(done.filter((c) => c.selfStudy).map((c) => c.name));
  const selfNow = listNames(inProgress.filter((c) => c.selfStudy).map((c) => c.name));
  const selfStudyNote =
    selfDone || selfNow
      ? `<p class="ap-self-study-note">Exams marked <span class="course-self-study"><i class="fas fa-book-open" aria-hidden="true"></i> Self-study</span> weren’t classes on my school schedule. ${esc(
          [selfDone && `I studied for ${selfDone} on my own`, selfNow && `I’m currently self-studying ${selfNow}`].filter(Boolean).join(', and '),
        )}.</p>`
      : '';
  // Share of completed exams scored 4 or 5 (rounded down, so it only reads 100% when every one is).
  const pct4plus = Math.floor((done.filter((c) => (c.apScore as number) >= 4).length / (done.length || 1)) * 100);
  const gradeNums = withGpa.map((y) => Number(y.grade.replace(/\D/g, ''))).sort((x, y) => x - y);
  const gradesWithGpa = gradeNums.length > 1 ? `${gradeNums[0]}–${gradeNums[gradeNums.length - 1]}` : String(gradeNums[0] ?? '');

  const scoreBadges = (c: Course): string => {
    if (c.apExams)
      return c.apExams
        .map((e) =>
          e.apScore === 'in-progress'
            ? `<span class="ap-score-badge ap-score-progress">${esc(e.short)} In Progress</span>`
            : `<span class="ap-score-badge ap-score-${e.apScore}" aria-label="${esc(e.name)}: score ${e.apScore}"><span class="ap-exam-short">${esc(e.short)}</span>${e.apScore}</span>`,
        )
        .join('');
    if (c.apScore === undefined) return '';
    if (c.apScore === 'in-progress') return '<span class="ap-score-badge ap-score-progress">In Progress</span>';
    return `<span class="ap-score-badge ap-score-${c.apScore}" aria-label="AP exam score ${c.apScore}">${c.apScore}</span>`;
  };

  // Decorative subject emoji in a fixed-width column, so names line up down each grid.
  const emoji = (e?: string) => (e ? `<span class="course-emoji" aria-hidden="true">${esc(e)}</span>` : '');

  // Emoji on the left; one-line title over level and tags (score far right). Long names
  // switch to `short` on narrow cards (see additions.css), so every card is one height.
  const courseCard = (c: Course) => {
    const score = scoreBadges(c);
    return `<div class="course-card course-card--stacked">
  ${emoji(c.emoji)}<div class="course-body">
    <h4 class="course-name"${c.short ? ` title="${esc(c.name)}"` : ''}><span class="course-name-full">${esc(c.name)}</span>${
      c.short ? `<span class="course-name-short">${esc(c.short)}</span>` : ''
    }</h4>
    <div class="course-chips">
      <span class="course-level level-${c.level.toLowerCase()}"${
        c.level === 'AP-Weighted' ? ' title="Not an AP class; my school weights it like AP for its college-level rigor"' : ''
      }>${c.level}</span>${
        c.summer ? '<span class="course-summer"><i class="fas fa-sun" aria-hidden="true"></i> Summer</span>' : ''
      }${c.csAcademy ? '<span class="course-cs-academy"><i class="fas fa-laptop-code" aria-hidden="true"></i> CS Academy</span>' : ''}${
        score ? `<span class="course-scores">${score}</span>` : ''
      }
    </div>
  </div>
</div>`;
  };

  const apCard = (c: (typeof allAp)[number]) => `<div class="ap-score-card">
  ${emoji(c.emoji)}<div class="ap-score-card-content">
    <div class="ap-score-card-name">${esc(c.name)}</div>
    <div class="ap-score-card-meta">${esc(c.grade)} &middot; ${esc(c.year)}${
      c.takenIn ? ` &middot; taken in ${esc(c.takenIn)}` : ''
    }${
      c.selfStudy ? ' <span class="course-self-study"><i class="fas fa-book-open" aria-hidden="true"></i> Self-study</span>' : ''
    }</div>
  </div>
  ${
    c.apScore === 'in-progress'
      ? '<span class="ap-score-badge ap-score-progress">In Progress</span>'
      : `<span class="ap-score-badge ap-score-${c.apScore}" aria-label="Score ${c.apScore}">${c.apScore}</span>`
  }
</div>`;

  const main = `
<section id="education" class="education page-section">
  ${sectionHeader({ title: 'Education', level: 1 })}
  <div class="education-content">
    <div class="school-card${school.logo ? ' school-card--logo' : ''}"${
      school.logo ? ` style="--school-logo: url('${esc(mediaUrl(school.logo, 480))}')"` : ''
    }>
      ${
        school.logo
          ? `<div class="school-logo"><img src="${esc(mediaUrl(school.logo, 160))}" alt="" width="66" height="72" decoding="async"></div>`
          : '<div class="school-icon" aria-hidden="true"><i class="fas fa-school"></i></div>'
      }
      <div class="school-info">
        <h2 class="school-name">${esc(school.name)}</h2>
        <p class="school-meta"><span class="school-meta-item"><i class="fas fa-location-dot" aria-hidden="true"></i> ${esc(school.place)}</span><span class="school-meta-sep" aria-hidden="true"> &middot; </span><span class="school-meta-item"><i class="fas fa-graduation-cap" aria-hidden="true"></i> ${esc(school.graduation)}</span></p>
      </div>
      ${
        school.classRank
          ? `<div class="school-rank">
        <span class="school-rank-label">Class Rank</span>
        <span class="school-rank-value">${esc(school.classRank.rank)} / ${school.classRank.classSize}</span>
        <span class="school-rank-note">${esc(school.classRank.top)}</span>
      </div>`
          : ''
      }
    </div>

    <div class="edu-tabs" role="tablist" aria-label="Education details">
      <button class="edu-tab-btn active" type="button" role="tab" id="tab-courses" aria-controls="edu-panel-courses" aria-selected="true" data-tab="courses">Courses</button>
      <button class="edu-tab-btn" type="button" role="tab" id="tab-ap-scores" aria-controls="edu-panel-ap-scores" aria-selected="false" tabindex="-1" data-tab="ap-scores">AP Scores</button>
    </div>

    <div class="edu-panel" id="edu-panel-courses" role="tabpanel" aria-labelledby="tab-courses" tabindex="0">
      ${
        withGpa.length
          ? `<div class="edu-stats edu-stats--2">
        <div class="edu-stat">
          <span class="edu-stat-value">${avg('unweighted').toFixed(2)}</span>
          <span class="edu-stat-label">Unweighted GPA</span>
          <span class="edu-stat-note">Average of grades ${gradesWithGpa}</span>
        </div>
        <div class="edu-stat">
          <span class="edu-stat-value">${avg('weighted').toFixed(2)}</span>
          <span class="edu-stat-label">Weighted GPA</span>
          <span class="edu-stat-note">Average of grades ${gradesWithGpa}</span>
        </div>
      </div>`
          : ''
      }
      ${
        schoolYears.some((y) => y.courses.some((c) => c.level === 'AP-Weighted'))
          ? '<p class="edu-note">Courses marked <span class="course-level level-ap-weighted">AP-Weighted</span> aren’t AP classes, but my school weights them the same as AP because they’re taught at a college level.</p>'
          : ''
      }
      <div class="courses-container">
        ${schoolYears
          .map(
            (y) => `<div class="course-year-group">
          <div class="course-year-header">
            <h3 class="course-year-title">${esc(y.grade)} <span class="course-year-subtitle">${esc(y.year)}</span></h3>
            ${
              y.gpa
                ? `<div class="year-gpa">
              <div class="gpa-item" title="Unweighted GPA"><span class="gpa-label">UW</span><span class="gpa-value">${y.gpa.unweighted.toFixed(2)}</span></div>
              <div class="gpa-item" title="Weighted GPA"><span class="gpa-label">W</span><span class="gpa-value">${y.gpa.weighted.toFixed(2)}</span></div>
            </div>`
                : '<div class="year-gpa"><span class="year-status"><span class="year-status-dot" aria-hidden="true"></span>In progress</span></div>'
            }
          </div>
          <div class="courses-grid">
            ${y.courses
              .filter((c) => !c.selfStudy)
              .map(courseCard)
              .join('\n            ')}
          </div>
        </div>`,
          )
          .join('\n        ')}
      </div>
    </div>

    <div class="edu-panel hidden" id="edu-panel-ap-scores" role="tabpanel" aria-labelledby="tab-ap-scores" tabindex="0">
      <div class="edu-stats edu-stats--4">
        <div class="edu-stat"><span class="edu-stat-value">${allAp.length}</span><span class="edu-stat-label">Total AP Exams</span></div>
        <div class="edu-stat"><span class="edu-stat-value">${done.length}</span><span class="edu-stat-label">Exams Completed</span></div>
        <div class="edu-stat"><span class="edu-stat-value">${pct4plus}%</span><span class="edu-stat-label">Scored 4 or 5</span></div>
        <div class="edu-stat"><span class="edu-stat-value">${done.filter((c) => c.apScore === 5).length}</span><span class="edu-stat-label">Scores of 5</span></div>
      </div>
      <div class="ap-score-scale">
        ${[5, 4, 3, 2, 1]
          .map((s) => `<div class="ap-scale-item"><span class="ap-score-badge ap-score-${s}">${s}</span><span class="ap-scale-label">${SCALE[s]}</span></div>`)
          .join('\n        ')}
      </div>
      ${selfStudyNote}
      <h3 class="ap-scores-section-title"><i class="fas fa-check-circle" aria-hidden="true"></i> Completed <span class="ap-count">${done.length}</span></h3>
      ${doneByYear
        .map(
          (g) => `<h4 class="ap-year-title">${esc(g.y.grade)} <span>(${esc(g.y.year)})</span></h4>
      <div class="ap-scores-grid">${g.items.map(apCard).join('')}</div>`,
        )
        .join('\n      ')}
      ${
        inProgress.length
          ? `<h3 class="ap-scores-section-title ap-scores-section-title--gap"><i class="fas fa-clock" aria-hidden="true"></i> In Progress <span class="ap-count">${inProgress.length}</span></h3>
      <div class="ap-scores-grid">${inProgress.map(apCard).join('')}</div>`
          : ''
      }
    </div>
  </div>
</section>`;

  return page(
    {
      title: 'Education',
      description: 'Samuel Asefa’s coursework at South Brunswick High School by year, AP exam scores, and GPA.',
      path: '/education.html',
      image: '/images/projects/ndvi-payload/techrise.webp',
      nav: 'education',
    },
    main,
  );
};
