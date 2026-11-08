/**
 * Site entry. Restores the original site's behaviour (loader, cursor,
 * mobile menu, header, smooth in-page scrolling, back-to-top, fade-ins,
 * animated background) with accessibility and performance fixes, and
 * loads each feature module only on pages that use it.
 */
import { NARROW_MEDIA } from '../config/breakpoints';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ── Loading screen ─────────────────────────────────────── */
const loader = document.getElementById('loading-screen');
if (loader) {
  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    window.setTimeout(() => (loader.style.display = 'none'), 400);
  };
  if (document.readyState === 'complete') window.setTimeout(hide, 150);
  else window.addEventListener('load', () => window.setTimeout(hide, 150));
  window.setTimeout(hide, 700);
}

/* ── Custom cursor (mouse/trackpad only; the native cursor stays) ── */
const cursor = document.getElementById('cursor');
if (cursor && finePointer && !reduceMotion) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  // Keep the small fact emojis sharp beneath the cursor's hover blur.
  const interactive = 'a, button:not(.fact-trigger), input, textarea, .project-card, .skill-item, .bento-card';
  document.addEventListener('mouseover', (e) => {
    const on = (e.target as Element | null)?.closest(interactive);
    cursor.classList.toggle('cursor-hover', Boolean(on));
  });
} else {
  cursor?.remove();
}

/* ── Mobile menu ────────────────────────────────────────── */
const hamburger = document.querySelector<HTMLButtonElement>('.hamburger');
const navLinks = document.querySelector<HTMLElement>('.nav-links');
if (hamburger && navLinks) {
  const setOpen = (open: boolean) => {
    hamburger.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  hamburger.addEventListener('click', () => setOpen(!navLinks.classList.contains('active')));
  navLinks.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      setOpen(false);
      hamburger.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !(e.target as Element).closest('nav')) setOpen(false);
  });
}

/* ── Header shadow, back-to-top, and Home/Explore highlight ── */
const header = document.getElementById('header');
const backToTop = document.querySelector<HTMLButtonElement>('.back-to-top');
const homeLink = document.querySelector<HTMLAnchorElement>('.nav-link[href="/"]');
const exploreLink = document.querySelector<HTMLAnchorElement>('.nav-link[href="/#explore"]');
const explore = document.getElementById('explore');
let ticking = false;
const onScroll = () => {
  ticking = false;
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 50);
  backToTop?.classList.toggle('show', y > 300);
  if (explore && homeLink && exploreLink) {
    const inExplore = y + 120 >= explore.offsetTop && y + 120 < explore.offsetTop + explore.offsetHeight;
    exploreLink.classList.toggle('active', inExplore);
    homeLink.classList.toggle('active', !inExplore);
  }
};
window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  document.querySelector<HTMLElement>('.logo')?.focus({ preventScroll: true });
});

/* ── Smooth scrolling for same-page links ───────────────── */
document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const url = new URL(a.href, location.href);
  const samePage = url.pathname.replace(/index\.html$/, '') === location.pathname.replace(/index\.html$/, '');
  if (!samePage || !url.hash || url.hash === '#') return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  e.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight ?? 80);
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  history.pushState(null, '', url.hash);
  if (target.tabIndex < 0 && !/^(A|BUTTON|INPUT)$/.test(target.tagName)) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

/* ── Fade-in on scroll (added by JS, so content shows without it) ── */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 },
  );
  const selector =
    '.section-header, .bento-card, .featured-card, .project-card, .experience-card, .award-card, .course-year-group, .skills-category, .social-category, .impact-card, .pd-card, .github-graph, .demo-card, .school-card';
  document.querySelectorAll(selector).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already on screen: leave as is
    el.classList.add('fade-in');
    io.observe(el);
  });
}

/* ── Feature modules ─────────────────────────────────────── */
const whenNear = (el: Element, load: () => void): void => {
  if (!('IntersectionObserver' in window)) return load();
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        load();
      }
    },
    { rootMargin: '600px 0px' },
  );
  io.observe(el);
};

const bg = document.getElementById('circuit-background');
if (bg) {
  const start = () => void import('./background').then((m) => m.initBackground(bg, reduceMotion));
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 });
  else globalThis.setTimeout(start, 300);
}

const typed = document.querySelector<HTMLElement>('[data-typed]');
if (typed && !reduceMotion) void import('./typed').then((m) => m.initTyped(typed));

/* ── Phone versions of screenshots ──────────────────────
   <picture> swaps the image on phones; keep the alt text matching the one on screen. */
const narrowImgs = document.querySelectorAll<HTMLImageElement>('img[data-narrow-alt]');
if (narrowImgs.length) {
  const narrowScreen = window.matchMedia(NARROW_MEDIA);
  const syncAlts = () =>
    narrowImgs.forEach((im) => {
      im.dataset.wideAlt ??= im.alt;
      im.alt = (narrowScreen.matches ? im.dataset.narrowAlt : im.dataset.wideAlt) ?? im.alt;
    });
  syncAlts();
  narrowScreen.addEventListener('change', syncAlts);
}

if (document.querySelector('[data-modal-open], [data-lightbox], [data-modal-src], [data-modal-pdf]')) {
  void import('./modal').then((m) => m.initModal());
}

if (document.querySelector('[data-filter], [data-award-filter]')) {
  void import('./filters').then((m) => m.initFilters());
}

const tabs = document.querySelector<HTMLElement>('[role="tablist"]');
if (tabs) void import('./tabs').then((m) => m.initTabs(tabs));

const carousel = document.querySelector<HTMLElement>('.mySwiper');
if (carousel) void import('./carousel').then((m) => m.initCarousel(carousel, reduceMotion));

const facts = document.querySelector<HTMLElement>('.fact-chips');
if (facts) void import('./facts').then((m) => m.initFacts(facts));

document.querySelectorAll<HTMLElement>('[data-route-sketch]').forEach((el) => {
  whenNear(el, () => void import('./route-sketch').then((m) => m.initRouteSketch(el)));
});

const gh = document.querySelector<HTMLElement>('[data-github]');
if (gh) whenNear(gh, () => void import('./github').then((m) => m.initGitHub(gh)));

if (document.querySelector('[data-copy], [data-draft]')) {
  void import('./contact').then((m) => m.initContact());
}

/* Highlight the current section in a project page's contents bar. */
const toc = document.querySelector<HTMLElement>('.pd-toc');
if (toc && 'IntersectionObserver' in window) {
  const links = new Map(Array.from(toc.querySelectorAll<HTMLAnchorElement>('a')).map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove('active'));
          links.get(e.target.id)?.classList.add('active');
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  links.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) spy.observe(s);
  });
}
