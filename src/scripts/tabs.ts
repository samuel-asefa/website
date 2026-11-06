/**
 * Courses / AP Scores tabs on the Education page, following the ARIA tabs
 * pattern: arrow keys, Home and End move between tabs. The choice is kept
 * in the URL hash (#ap-scores) so it can be linked.
 */
export const initTabs = (list: HTMLElement): void => {
  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls') ?? ''));

  const select = (i: number, focus: boolean) => {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[k]?.classList.toggle('hidden', !on);
    });
    if (focus) tabs[i].focus();
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      select(i, false);
      history.replaceState(null, '', i === 0 ? location.pathname : `#${t.dataset.tab}`);
    });
    t.addEventListener('keydown', (e) => {
      let n = -1;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n < 0) return;
      e.preventDefault();
      select(n, true);
    });
  });

  const fromHash = tabs.findIndex((t) => `#${t.dataset.tab}` === location.hash);
  if (fromHash > 0) select(fromHash, false);
};
