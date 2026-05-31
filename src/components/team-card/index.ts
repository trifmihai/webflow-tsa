const READY_CLASS = 'team-scroll-motion-ready';
const ACTIVE_CLASS = 'is-inview';
const CARD_SELECTOR = '.team_component .team_card';

const ACTIVE_RATIO = 0.35;
const INACTIVE_RATIO = 0.14;
const MOBILE_QUERY = '(max-width: 767px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const ORIENTATION_RESET_DELAY = 250;

let isTeamCardMotionQueued = false;

function initializeTeamCardScrollMotion(): void {
  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  let observer: IntersectionObserver | null = null;
  let cards: HTMLElement[] = [];
  let orientationTimer: number | undefined;

  function getVisibleRatio(element: HTMLElement): number {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (!rect.height) return 0;

    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    return Math.min(1, visibleHeight / rect.height);
  }

  function setInitialState(): void {
    cards.forEach((card) => {
      const ratio = getVisibleRatio(card);

      card.classList.toggle(ACTIVE_CLASS, ratio >= ACTIVE_RATIO);
    });
  }

  function disconnectObserver(): void {
    if (!observer) return;

    observer.disconnect();
    observer = null;
  }

  function reset(): void {
    disconnectObserver();

    document.documentElement.classList.remove(READY_CLASS);

    cards.forEach((card) => {
      card.classList.remove(ACTIVE_CLASS);
    });

    cards = [];
  }

  function init(): void {
    reset();

    if (!mobileQuery.matches || reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
      return;
    }

    cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    if (!cards.length) return;

    setInitialState();
    document.documentElement.classList.add(READY_CLASS);

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;

          if (ratio >= ACTIVE_RATIO) {
            card.classList.add(ACTIVE_CLASS);

            return;
          }

          if (ratio <= INACTIVE_RATIO) {
            card.classList.remove(ACTIVE_CLASS);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.14, 0.25, 0.35, 0.5, 0.65, 0.8, 1],
      }
    );

    cards.forEach((card) => {
      observer?.observe(card);
    });
  }

  init();

  mobileQuery.addEventListener('change', init);
  reduceMotionQuery.addEventListener('change', init);

  window.addEventListener(
    'orientationchange',
    () => {
      window.clearTimeout(orientationTimer);

      orientationTimer = window.setTimeout(init, ORIENTATION_RESET_DELAY);
    },
    { passive: true }
  );
}

export function initTeamCards(): void {
  if (isTeamCardMotionQueued) return;

  isTeamCardMotionQueued = true;

  window.Webflow ||= [];
  window.Webflow.push(() => {
    initializeTeamCardScrollMotion();
  });
}
