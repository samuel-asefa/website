/**
 * Image modal in the original style (dark overlay, close button, round
 * arrows, dots, counter), now an accessible dialog: it traps focus,
 * closes on Escape or a backdrop click, supports arrow keys, and returns
 * focus to whatever opened it. Also shows PDFs, as the Awards page did.
 *
 * Triggers:
 *  - [data-modal-open] inside .project-img[data-gallery] (project cards)
 *  - a[data-lightbox] (figures on project pages; grouped by data-group)
 *  - [data-modal-src] (award photos, grouped by data-group)
 *  - [data-modal-pdf] (PDF documents)
 */
import { NARROW_MEDIA } from '../config/breakpoints';

interface Item {
  src: string;
  alt: string;
  caption: string;
  original?: string;
  /** Phone version of the same screen, shown instead on narrow screens. */
  narrow?: { src: string; alt: string; original?: string };
}

const narrowScreen = window.matchMedia(NARROW_MEDIA);
const fit = (it: Item): Item => (it.narrow && narrowScreen.matches ? { ...it, ...it.narrow } : it);

const FOCUSABLE = 'button:not([hidden]), a[href]:not([hidden]), iframe';

export const initModal = (): void => {
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.id = 'image-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Image viewer');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <button type="button" class="modal-close" aria-label="Close">&times;</button>
    <button type="button" class="modal-nav modal-prev" aria-label="Previous image"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
    <div class="modal-media-wrap">
      <img class="modal-content" alt="" style="display:none">
      <iframe class="modal-content modal-iframe" title="Document viewer" style="display:none"></iframe>
    </div>
    <button type="button" class="modal-nav modal-next" aria-label="Next image"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
    <p class="modal-caption"><span data-caption></span><a data-original target="_blank" rel="noopener">Open original</a></p>
    <div class="modal-dots"></div>
    <div class="modal-counter" aria-live="polite"></div>`;
  document.body.append(modal);

  const img = modal.querySelector<HTMLImageElement>('img')!;
  const iframe = modal.querySelector<HTMLIFrameElement>('iframe')!;
  const prev = modal.querySelector<HTMLButtonElement>('.modal-prev')!;
  const next = modal.querySelector<HTMLButtonElement>('.modal-next')!;
  const close = modal.querySelector<HTMLButtonElement>('.modal-close')!;
  const dots = modal.querySelector<HTMLElement>('.modal-dots')!;
  const counter = modal.querySelector<HTMLElement>('.modal-counter')!;
  const caption = modal.querySelector<HTMLElement>('[data-caption]')!;
  const original = modal.querySelector<HTMLAnchorElement>('[data-original]')!;

  let items: Item[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const isOpen = () => modal.getAttribute('aria-hidden') === 'false';

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    iframe.style.display = 'none';
    iframe.removeAttribute('src');
    img.style.display = 'block';
    img.classList.add('is-loading');
    img.onload = () => img.classList.remove('is-loading');
    img.src = it.src;
    img.alt = it.alt;
    caption.textContent = it.caption;
    original.hidden = !it.original;
    if (it.original) original.href = it.original;
    const many = items.length > 1;
    prev.hidden = next.hidden = !many;
    dots.hidden = !many;
    counter.textContent = many ? `${index + 1} / ${items.length}` : '';
    dots.querySelectorAll('button').forEach((d, k) => {
      d.classList.toggle('active', k === index);
      d.setAttribute('aria-current', String(k === index));
    });
  };

  const buildDots = () => {
    dots.innerHTML = items
      .map((_, k) => `<button type="button" class="modal-dot" data-idx="${k}" aria-label="Show image ${k + 1}"></button>`)
      .join('');
  };

  const openWith = (list: Item[], start: number, from: HTMLElement) => {
    items = list.map(fit);
    opener = from;
    buildDots();
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    show(start);
    close.focus();
  };

  const openPdf = (src: string, label: string, from: HTMLElement) => {
    items = [];
    opener = from;
    dots.innerHTML = '';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    img.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = src;
    caption.textContent = label;
    original.hidden = false;
    original.href = src;
    prev.hidden = next.hidden = true;
    counter.textContent = '';
    close.focus();
  };

  const hide = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    iframe.removeAttribute('src');
    img.removeAttribute('src');
    opener?.focus();
  };

  close.addEventListener('click', hide);
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  dots.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('[data-idx]');
    if (b) show(Number(b.dataset.idx));
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal || (e.target as Element).classList.contains('modal-media-wrap')) hide();
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      hide();
    } else if (e.key === 'ArrowLeft' && items.length > 1) {
      show(index - 1);
    } else if (e.key === 'ArrowRight' && items.length > 1) {
      show(index + 1);
    } else if (e.key === 'Tab') {
      const f = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const t = e.target as Element;

    // Project card thumbnails
    const cardBtn = t.closest<HTMLElement>('[data-modal-open]');
    if (cardBtn) {
      const holder = cardBtn.closest<HTMLElement>('.project-img');
      const raw = holder?.dataset.gallery;
      let list: Item[];
      if (raw) {
        list = JSON.parse(raw) as Item[];
      } else {
        const im = cardBtn.querySelector('img');
        list = [{ src: im?.currentSrc || im?.src || '', alt: im?.alt ?? '', caption: '' }];
      }
      e.preventDefault();
      openWith(list, 0, cardBtn);
      return;
    }

    // Figures on project pages
    const fig = t.closest<HTMLAnchorElement>('a[data-lightbox]');
    if (fig) {
      const group = fig.dataset.group;
      const links = group
        ? Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[data-lightbox][data-group="${CSS.escape(group)}"]`))
        : [fig];
      e.preventDefault();
      openWith(
        links.map((l) => ({
          src: l.dataset.full || l.href,
          alt: l.dataset.alt ?? l.querySelector('img')?.alt ?? '',
          caption: l.dataset.caption ?? '',
          original: l.getAttribute('href') ?? undefined,
          narrow: l.dataset.narrowFull
            ? { src: l.dataset.narrowFull, alt: l.dataset.narrowAlt ?? '', original: l.dataset.narrowOriginal }
            : undefined,
        })),
        Math.max(0, links.indexOf(fig)),
        fig,
      );
      return;
    }

    // Award photos
    const award = t.closest<HTMLElement>('[data-modal-src]');
    if (award) {
      const group = award.dataset.group;
      const els = group
        ? Array.from(document.querySelectorAll<HTMLElement>(`[data-modal-src][data-group="${CSS.escape(group)}"]`))
        : [award];
      e.preventDefault();
      openWith(
        els.map((el) => ({
          src: el.dataset.modalSrc ?? '',
          alt: el.querySelector('img')?.alt || el.getAttribute('aria-label') || '',
          caption: el.dataset.caption ?? '',
          original: el.dataset.original,
        })),
        Math.max(0, els.indexOf(award)),
        award,
      );
      return;
    }

    // PDFs
    const pdf = t.closest<HTMLElement>('[data-modal-pdf]');
    if (pdf) {
      e.preventDefault();
      openPdf(pdf.dataset.modalPdf ?? '', pdf.dataset.caption ?? 'Document', pdf);
    }
  });
};
