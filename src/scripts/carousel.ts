/**
 * The About page's stacked photo cards (Swiper "cards" effect, as on the
 * original site). Swiper is now installed from npm at a pinned version and
 * loaded only on this page. Autoplay pauses on hover/focus and is off when
 * reduced motion is requested; arrow keys work when the carousel is focused.
 */
import Swiper from 'swiper';
import { A11y, Autoplay, EffectCards, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export const initCarousel = (el: HTMLElement, reduceMotion: boolean): void => {
  el.tabIndex = 0;
  new Swiper(el, {
    modules: [EffectCards, Autoplay, Keyboard, A11y],
    effect: 'cards',
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true, prevSlideMessage: 'Previous photo', nextSlideMessage: 'Next photo' },
    autoplay: reduceMotion ? false : { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
  });
};
