const READY_CLASS = 'team-scroll-motion-ready';
const ACTIVE_CLASS = 'is-inview';
const CARD_SELECTOR = '.team_component .team_card';

const MOBILE_QUERY = '(max-width: 767px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const ORIENTATION_RESET_DELAY = 250;

const ACTIVE_ZONE_TOP = 0.38;
const ACTIVE_ZONE_BOTTOM = 0.62;

let isTeamCardMotionQueued = false;

function initializeTeamCardScrollMotion(): void {
  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  let cards: HTMLElement[] = [];
  let orientationTimer: number | undefined;
  let rafId: number | null = null;
  let isListening = false;

  function updateCards(): void {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const activeZoneTop = viewportHeight * ACTIVE_ZONE_TOP;
    const activeZoneBottom = viewportHeight * ACTIVE_ZONE_BOTTOM;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;

      const isInsideActiveZone = cardCenter >= activeZoneTop && cardCenter <= activeZoneBottom;

      card.classList.toggle(ACTIVE_CLASS, isInsideActiveZone);
    });
  }

  function requestUpdate(): void {
    if (rafId !== null) return;

    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      updateCards();
    });
  }

  function addRuntimeListeners(): void {
    if (isListening) return;

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    isListening = true;
  }

  function removeRuntimeListeners(): void {
    if (!isListening) return;

    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);

    isListening = false;
  }

  function reset(): void {
    removeRuntimeListeners();

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    document.documentElement.classList.remove(READY_CLASS);

    cards.forEach((card) => {
      card.classList.remove(ACTIVE_CLASS);
    });

    cards = [];
  }

  function init(): void {
    reset();

    if (!mobileQuery.matches || reduceMotionQuery.matches) {
      return;
    }

    cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    if (!cards.length) return;

    document.documentElement.classList.add(READY_CLASS);

    updateCards();
    addRuntimeListeners();
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
