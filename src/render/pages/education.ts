import { school, schoolYears } from '../../content/education';
import { sectionHeader } from '../components';
import { esc } from '../html';
import { page } from '../layout';

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
  const allAp = schoolYears.flatMap((y) => y.courses.filter((c) => c.apScore !== undefined).map((c) => ({ ...c, grade: y.grade, year: y.year })));
  const done = allAp.filter((c) => typeof c.apScore === 'number');
  const inProgress = allAp.filter((c) => c.apScore === 'in-progress');
  const avgScore = done.reduce((s, c) => s + (c.apScore as number), 0) / (done.length || 1);
  const gradeNums = withGpa.map((y) => Number(y.grade.replace(/\D/g, ''))).sort((x, y) => x - y);
  const gradesWithGpa = gradeNums.length > 1 ? `${gradeNums[0]}–${gradeNums[gradeNums.length - 1]}` : String(gradeNums[0] ?? '');

  const courseCard = (c: (typeof schoolYears)[number]['courses'][number]) => `<div class="course-card">
  <div class="course-info">
    <div class="course-header-row">
      <h4>${esc(c.name)}${c.summer ? ' <span class="course-summer"><i class="fas fa-sun" aria-hidden="true"></i> Summer</span>' : ''}${
        c.csAcademy ? ' <span class="course-cs-academy"><i class="fas fa-laptop-code" aria-hidden="true"></i> CS Academy</span>' : ''
      }</h4>
      <div class="course-badges">
        <span class="course-level level-${c.level.toLowerCase()}">${c.level}</span>
        ${
          c.apScore === undefined
            ? ''
            : c.apScore === 'in-progress'
              ? '<span class="ap-score-badge ap-score-progress">In Progress</span>'
              : `<span class="ap-score-badge ap-score-${c.apScore}" aria-label="AP exam score ${c.apScore}">${c.apScore}</span>`
        }
      </div>
    </div>
  </div>
</div>`;

  const apCard = (c: (typeof allAp)[number]) => `<div class="ap-score-card">
  <div class="ap-score-card-content">
    <div class="ap-score-card-name">${esc(c.name)}</div>
    <div class="ap-score-card-meta">${esc(c.grade)} &middot; ${esc(c.year)}</div>
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
    <div class="school-card">
      <div class="school-icon" aria-hidden="true"><i class="fas fa-school"></i></div>
      <div>
        <h2 class="school-name">${esc(school.name)}</h2>
        <p class="school-meta"><i class="fas fa-location-dot" aria-hidden="true"></i> ${esc(school.place)} &middot; <i class="fas fa-graduation-cap" aria-hidden="true"></i> ${esc(school.graduation)}</p>
      </div>
    </div>

    <div class="edu-tabs" role="tablist" aria-label="Education details">
      <button class="edu-tab-btn active" type="button" role="tab" id="tab-courses" aria-controls="edu-panel-courses" aria-selected="true" data-tab="courses">Courses</button>
      <button class="edu-tab-btn" type="button" role="tab" id="tab-ap-scores" aria-controls="edu-panel-ap-scores" aria-selected="false" tabindex="-1" data-tab="ap-scores">AP Scores</button>
    </div>

    <div class="edu-panel" id="edu-panel-courses" role="tabpanel" aria-labelledby="tab-courses" tabindex="0">
      ${
        withGpa.length
          ? `<div class="cumulative-gpa">
        <div class="gpa-card">
          <span class="gpa-value">${avg('unweighted').toFixed(2)}</span>
          <span class="gpa-label">Unweighted GPA (avg. of grades ${gradesWithGpa})</span>
        </div>
        <div class="gpa-card">
          <span class="gpa-value">${avg('weighted').toFixed(2)}</span>
          <span class="gpa-label">Weighted GPA (avg. of grades ${gradesWithGpa})</span>
        </div>
      </div>`
          : ''
      }
      <div class="courses-container">
        ${schoolYears
          .map(
            (y) => `<div class="course-year-group">
          <div class="course-year-header">
            <h3 class="course-year-title">${esc(y.grade)} <span class="course-year-subtitle">(${esc(y.year)})</span></h3>
            ${
              y.gpa
                ? `<div class="year-gpa">
              <div class="gpa-item"><span class="gpa-label">UW</span><span class="gpa-value">${y.gpa.unweighted.toFixed(2)}</span></div>
              <div class="gpa-item"><span class="gpa-label">W</span><span class="gpa-value">${y.gpa.weighted.toFixed(2)}</span></div>
            </div>`
                : '<div class="year-gpa"><div class="gpa-item"><span class="gpa-label">In progress</span></div></div>'
            }
          </div>
          <div class="courses-grid">
            ${y.courses.map(courseCard).join('\n            ')}
          </div>
        </div>`,
          )
          .join('\n        ')}
      </div>
    </div>

    <div class="edu-panel hidden" id="edu-panel-ap-scores" role="tabpanel" aria-labelledby="tab-ap-scores" tabindex="0">
      <div class="ap-scores-summary">
        <div class="gpa-card"><span class="gpa-value">${allAp.length}</span><span class="gpa-label">Total AP Courses</span></div>
        <div class="gpa-card"><span class="gpa-value">${done.length}</span><span class="gpa-label">Exams Completed</span></div>
        <div class="gpa-card"><span class="gpa-value">${avgScore.toFixed(2)}</span><span class="gpa-label">Average Score</span></div>
        <div class="gpa-card"><span class="gpa-value">${done.filter((c) => c.apScore === 5).length}</span><span class="gpa-label">Scores of 5</span></div>
      </div>
      <div class="ap-score-scale">
        ${[5, 4, 3, 2, 1]
          .map((s) => `<div class="ap-scale-item"><span class="ap-score-badge ap-score-${s}">${s}</span><span class="ap-scale-label">${SCALE[s]}</span></div>`)
          .join('\n        ')}
      </div>
      <h3 class="ap-scores-section-title"><i class="fas fa-check-circle" aria-hidden="true"></i> Completed (${done.length})</h3>
      <div class="ap-scores-grid">${done.map(apCard).join('')}</div>
      ${
        inProgress.length
          ? `<h3 class="ap-scores-section-title" style="margin-top:2rem"><i class="fas fa-clock" aria-hidden="true"></i> In Progress (${inProgress.length})</h3>
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
      image: '/images/techrise.webp',
      nav: 'education',
    },
    main,
  );
};
