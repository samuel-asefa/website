/**
 * Filters on the Projects page (by category, as on the original site) and
 * the Awards page (by individual/team/project). Buttons expose aria-pressed,
 * results are announced, and the choice is kept in the URL
 * (?category=research, ?type=team) so filtered views can be linked.
 */
const setParam = (key: string, value: string) => {
  const url = new URL(location.href);
  if (value === 'all') url.searchParams.delete(key);
  else url.searchParams.set(key, value);
  history.replaceState(null, '', url);
};

export const initFilters = (): void => {
  /* Projects: show/hide whole category blocks (original behaviour). */
  const projectBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  if (projectBtns.length) {
    const cats = Array.from(document.querySelectorAll<HTMLElement>('.project-category'));
    const status = document.querySelector<HTMLElement>('[data-filter-status]');
    const apply = (f: string, announce: boolean) => {
      projectBtns.forEach((b) => {
        const on = b.dataset.filter === f;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      let shown = 0;
      cats.forEach((c) => {
        const match = f === 'all' || c.dataset.category === f;
        c.classList.toggle('hidden', !match);
        c.toggleAttribute('inert', !match);
        if (match) shown += c.querySelectorAll('.project-card').length;
      });
      if (announce && status) status.textContent = `Showing ${shown} ${f === 'all' ? '' : `${f} `}projects.`;
    };
    projectBtns.forEach((b) =>
      b.addEventListener('click', () => {
        const f = b.dataset.filter ?? 'all';
        setParam('category', f);
        apply(f, true);
      }),
    );
    const initial = new URLSearchParams(location.search).get('category');
    if (initial && projectBtns.some((b) => b.dataset.filter === initial)) apply(initial, false);
  }

  /* Awards: show/hide individual cards. */
  const awardBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-award-filter]'));
  if (awardBtns.length) {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.award-card'));
    const status = document.querySelector<HTMLElement>('[data-award-status]');
    const apply = (f: string, announce: boolean) => {
      awardBtns.forEach((b) => {
        const on = b.dataset.awardFilter === f;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      let shown = 0;
      cards.forEach((c) => {
        const match = f === 'all' || c.dataset.scope === f;
        c.hidden = !match;
        if (match) shown++;
      });
      if (announce && status) status.textContent = `Showing ${shown} ${f === 'all' ? '' : `${f} `}award${shown === 1 ? '' : 's'}.`;
    };
    awardBtns.forEach((b) =>
      b.addEventListener('click', () => {
        const f = b.dataset.awardFilter ?? 'all';
        setParam('type', f);
        apply(f, true);
      }),
    );
    const initial = new URLSearchParams(location.search).get('type');
    if (initial && awardBtns.some((b) => b.dataset.awardFilter === initial)) apply(initial, false);
  }
};
