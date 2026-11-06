/** Floating facts: hover, keyboard focus, or tap, with one label open at a time. */
export const initFacts = (root: HTMLElement): void => {
  const chips = Array.from(root.querySelectorAll<HTMLElement>('.fact-chip'));
  let pinned: HTMLElement | null = null;
  let hovered: HTMLElement | null = null;
  let focused: HTMLElement | null = null;

  const show = (active: HTMLElement | null): void => {
    for (const chip of chips) {
      const open = chip === active;
      chip.toggleAttribute('data-open', open);
      chip.querySelector('button')?.setAttribute('aria-expanded', String(open));
    }
  };

  for (const chip of chips) {
    chip.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = chip;
      show(chip);
    });
    chip.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = null;
      show(pinned ?? focused);
    });
    chip.addEventListener('focusin', () => {
      focused = chip;
      show(chip);
    });
    chip.addEventListener('focusout', (event) => {
      if (chip.contains(event.relatedTarget as Node | null)) return;
      pinned = null;
      focused = null;
      show(hovered);
    });
    chip.querySelector('button')?.addEventListener('click', () => {
      pinned = pinned === chip ? null : chip;
      focused = pinned;
      show(pinned);
    });
  }

  document.addEventListener('pointerdown', (event) => {
    if (root.contains(event.target as Node)) return;
    pinned = null;
    hovered = null;
    focused = null;
    show(null);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    pinned = null;
    hovered = null;
    focused = null;
    show(null);
  });
  root.setAttribute('data-enhanced', '');
};
