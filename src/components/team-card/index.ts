const READY_CLASS = 'team-scroll-motion-ready';
const ACTIVE_CLASS = 'is-inview';
const CARD_SELECTOR = '.team_component .team_card';
const IMAGE_SELECTOR = '.team_image';
const AVATAR_SELECTOR = '.team_avatar';

const MOBILE_QUERY = '(max-width: 767px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const ORIENTATION_RESET_DELAY = 250;

const ENTER_ZONE_TOP = 0.35;
const ENTER_ZONE_BOTTOM = 0.68;
const RESET_OFFSET = 80;

const DEBUG_TEAM_LAYOUT = false;
const EXPECTED_IMAGE_WIDTH_REM = 14.5;
const EXPECTED_IMAGE_HEIGHT_REM = 18.125;
const LAYOUT_TOLERANCE_PX = 1;

let isTeamCardMotionQueued = false;
let isTeamLayoutDebugQueued = false;

type LayoutSize = {
  width: number;
  height: number;
};

function isWithinTolerance(actual: number, expected: number): boolean {
  return Math.abs(actual - expected) <= LAYOUT_TOLERANCE_PX;
}

function formatSize(size: LayoutSize): string {
  return `${size.width.toFixed(1)} x ${size.height.toFixed(1)}`;
}

function getElementLayoutSize(
  element: HTMLElement,
  computedStyles: CSSStyleDeclaration
): LayoutSize {
  const computedWidth = Number.parseFloat(computedStyles.width);
  const computedHeight = Number.parseFloat(computedStyles.height);

  return {
    width: Number.isFinite(computedWidth) ? computedWidth : element.offsetWidth,
    height: Number.isFinite(computedHeight) ? computedHeight : element.offsetHeight,
  };
}

function getExpectedImageSize(imageSize: LayoutSize): LayoutSize {
  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );
  const remSize = Number.isFinite(rootFontSize) ? rootFontSize : 16;

  const desktopWidth = EXPECTED_IMAGE_WIDTH_REM * remSize;
  const desktopHeight = EXPECTED_IMAGE_HEIGHT_REM * remSize;

  if (window.matchMedia('(min-width: 992px)').matches) {
    return {
      width: desktopWidth,
      height: desktopHeight,
    };
  }

  const responsiveWidth = imageSize.width || desktopWidth;

  return {
    width: responsiveWidth,
    height: responsiveWidth * (desktopHeight / desktopWidth),
  };
}

function logTeamLayout(): void {
  if (!DEBUG_TEAM_LAYOUT) return;

  const cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const image = card.querySelector<HTMLElement>(IMAGE_SELECTOR);
    const avatar = card.querySelector<HTMLElement>(AVATAR_SELECTOR);

    if (!image || !avatar) {
      // eslint-disable-next-line no-console
      console.warn(`[TSA Team Layout] Card ${index + 1}: Missing team image or avatar`, {
        hasImage: Boolean(image),
        hasAvatar: Boolean(avatar),
      });
      return;
    }

    const imageComputed = window.getComputedStyle(image);
    const avatarComputed = window.getComputedStyle(avatar);

    const imageSize = getElementLayoutSize(image, imageComputed);
    const avatarSize = getElementLayoutSize(avatar, avatarComputed);
    const imageVisualRect = image.getBoundingClientRect();
    const avatarVisualRect = avatar.getBoundingClientRect();
    const expectedSize = getExpectedImageSize(imageSize);

    const avatarFillsImage =
      isWithinTolerance(avatarSize.width, imageSize.width) &&
      isWithinTolerance(avatarSize.height, imageSize.height);

    const isCorrect =
      isWithinTolerance(imageSize.width, expectedSize.width) &&
      isWithinTolerance(imageSize.height, expectedSize.height) &&
      avatarFillsImage;

    // eslint-disable-next-line no-console
    console.log(`[TSA Team Layout] Card ${index + 1}: ${isCorrect ? 'OK' : 'Check'}`, {
      imageSize: formatSize(imageSize),
      avatarSize: formatSize(avatarSize),
      imageVisualSize: formatSize(imageVisualRect),
      avatarVisualSize: formatSize(avatarVisualRect),
      expectedSize: `${expectedSize.width.toFixed(1)} x ${expectedSize.height.toFixed(1)}`,
      computedWidth: imageComputed.width,
      computedHeight: imageComputed.height,
      computedPosition: imageComputed.position,
      avatarComputedWidth: avatarComputed.width,
      avatarComputedHeight: avatarComputed.height,
      avatarComputedPosition: avatarComputed.position,
      objectFit: avatarComputed.objectFit,
      avatarFillsImage,
      isCorrect,
    });
  });
}

function setupTeamLayoutDebug(): void {
  if (!DEBUG_TEAM_LAYOUT || isTeamLayoutDebugQueued) return;

  isTeamLayoutDebugQueued = true;

  const requestLog = (): void => {
    window.requestAnimationFrame(logTeamLayout);
  };

  let resizeTimer: number | undefined;

  requestLog();

  if (document.readyState !== 'complete') {
    window.addEventListener('load', requestLog, { once: true });
  }

  window.addEventListener(
    'resize',
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(requestLog, 160);
    },
    { passive: true }
  );
}

function initializeTeamCardScrollMotion(): void {
  setupTeamLayoutDebug();

  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  let cards: HTMLElement[] = [];
  let orientationTimer: number | undefined;
  let rafId: number | null = null;
  let isListening = false;

  function updateCards(): void {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const enterZoneTop = viewportHeight * ENTER_ZONE_TOP;
    const enterZoneBottom = viewportHeight * ENTER_ZONE_BOTTOM;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;

      const isActive = card.classList.contains(ACTIVE_CLASS);
      const isInsideEnterZone = cardCenter >= enterZoneTop && cardCenter <= enterZoneBottom;

      const isFullyOutOfView =
        rect.bottom < -RESET_OFFSET || rect.top > viewportHeight + RESET_OFFSET;

      if (isFullyOutOfView) {
        card.classList.remove(ACTIVE_CLASS);
        return;
      }

      if (!isActive && isInsideEnterZone) {
        card.classList.add(ACTIVE_CLASS);
      }
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
