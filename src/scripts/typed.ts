/**
 * Typing effect for the hero line (the original page had the container
 * but nothing filled it). No dependency; skipped under reduced motion,
 * where the first phrase simply stays. Pauses when the tab is hidden.
 */
export const initTyped = (el: HTMLElement): void => {
  let phrases: string[] = [];
  try {
    phrases = JSON.parse(el.dataset.typed ?? '[]');
  } catch {
    return;
  }
  if (phrases.length < 2) return;

  // Screen readers get the full list once instead of a stream of letters.
  el.setAttribute('aria-hidden', 'true');
  const sr = document.createElement('span');
  sr.className = 'visually-hidden';
  sr.textContent = phrases.join('. ') + '.';
  el.after(sr);

  let i = 0;
  let chars = phrases[0].length;
  let deleting = true;
  let timer = 0;

  const tick = () => {
    const word = phrases[i];
    if (deleting) {
      chars--;
      if (chars <= 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
      }
    } else {
      chars++;
    }
    el.textContent = phrases[i].slice(0, Math.max(0, chars));
    let delay = deleting ? 35 : 70;
    if (!deleting && chars >= phrases[i].length) {
      deleting = true;
      delay = 2200;
    }
    if (word !== phrases[i] && !deleting && chars === 0) delay = 300;
    timer = window.setTimeout(tick, delay);
  };

  timer = window.setTimeout(tick, 2600);
  document.addEventListener('visibilitychange', () => {
    window.clearTimeout(timer);
    if (!document.hidden) timer = window.setTimeout(tick, 600);
  });
};
