import { Alignment, Fit, Layout, Rive } from '@rive-app/webgl2';

const ROOT_SELECTOR = '[data-benefit-experience-rive]';
const FALLBACK_SELECTOR = '[data-benefit-experience-rive-fallback]';
const MOUNT_SELECTOR = '.rive_canvas.is-benefit-1';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DEFAULT_ARTBOARD = 'benefit-1';
const DEFAULT_STATE_MACHINE = 'files-hover-sm';
const PRELOAD_ROOT_MARGIN = '400px 0px';

export function initBenefitExperienceRive(): void {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach(initBenefitExperienceRiveRoot);
}

function initBenefitExperienceRiveRoot(root: HTMLElement): void {
  if (root.dataset.benefitExperienceRiveInitialized === 'true') return;

  const mount = root.querySelector<HTMLElement>(MOUNT_SELECTOR);

  if (!mount) return;

  const fallback = root.querySelector<HTMLElement>(FALLBACK_SELECTOR);
  const canvas = document.createElement('canvas');
  const finePointerQuery = window.matchMedia(FINE_POINTER_QUERY);
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  let rive: Rive | null = null;
  let isNearViewport = false;
  let isInViewport = false;
  let resizeFrame = 0;

  root.dataset.benefitExperienceRiveInitialized = 'true';
  canvas.dataset.benefitExperienceRiveCanvas = '';
  canvas.setAttribute('aria-hidden', 'true');

  fallback?.setAttribute('aria-hidden', 'true');
  mount.replaceChildren(canvas);

  const resizeDrawingSurface = (): void => {
    window.cancelAnimationFrame(resizeFrame);

    resizeFrame = window.requestAnimationFrame(() => {
      rive?.resizeDrawingSurfaceToCanvas();
    });
  };

  const syncRendering = (): void => {
    if (!rive) return;

    if (isInViewport && document.visibilityState === 'visible') {
      rive.startRendering();
      return;
    }

    rive.stopRendering();
  };

  const cleanupRive = (): void => {
    rive?.cleanup();
    rive = null;
    root.classList.remove('is-rive-loading', 'is-rive-ready');
    canvas.removeAttribute('width');
    canvas.removeAttribute('height');
  };

  const mountRive = (): void => {
    if (rive || !isNearViewport) return;

    const src = root.dataset.riveSrc?.trim();

    if (!src) {
      root.classList.add('is-rive-error');
      return;
    }

    root.classList.add('is-rive-loading');
    root.classList.remove('is-rive-error');

    const instance = new Rive({
      src,
      canvas,
      artboard: root.dataset.riveArtboard?.trim() || DEFAULT_ARTBOARD,
      stateMachines: root.dataset.riveStateMachine?.trim() || DEFAULT_STATE_MACHINE,
      autoplay: true,
      autoBind: true,
      useOffscreenRenderer: true,
      shouldDisableRiveListeners: false,
      isTouchScrollEnabled: true,
      dispatchPointerExit: true,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.BottomCenter,
      }),
      onLoad: () => {
        if (rive !== instance) return;

        instance.resizeDrawingSurfaceToCanvas();
        root.classList.remove('is-rive-loading');
        root.classList.add('is-rive-ready');
        syncRendering();
      },
      onLoadError: () => {
        if (rive !== instance) return;

        instance.cleanup();
        rive = null;
        root.classList.remove('is-rive-loading', 'is-rive-ready');
        root.classList.add('is-rive-error');
      },
    });

    rive = instance;
  };

  const syncMode = (): void => {
    const isEligible = finePointerQuery.matches && !reducedMotionQuery.matches;

    root.classList.toggle('is-rive-eligible', isEligible);

    if (!isEligible) {
      cleanupRive();
      return;
    }

    mountRive();
  };

  const preloadObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;

      isNearViewport = true;
      preloadObserver.disconnect();
      syncMode();
    },
    { rootMargin: PRELOAD_ROOT_MARGIN }
  );

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isInViewport = Boolean(entry?.isIntersecting);
      syncRendering();
    },
    { threshold: 0.01 }
  );

  const resizeObserver = new ResizeObserver(resizeDrawingSurface);

  const cleanup = (): void => {
    preloadObserver.disconnect();
    visibilityObserver.disconnect();
    resizeObserver.disconnect();
    finePointerQuery.removeEventListener('change', syncMode);
    reducedMotionQuery.removeEventListener('change', syncMode);
    document.removeEventListener('visibilitychange', syncRendering);
    window.cancelAnimationFrame(resizeFrame);
    cleanupRive();
  };

  preloadObserver.observe(root);
  visibilityObserver.observe(root);
  resizeObserver.observe(root);
  finePointerQuery.addEventListener('change', syncMode);
  reducedMotionQuery.addEventListener('change', syncMode);
  document.addEventListener('visibilitychange', syncRendering);
  window.addEventListener('pagehide', cleanup, { once: true });

  syncMode();
}
