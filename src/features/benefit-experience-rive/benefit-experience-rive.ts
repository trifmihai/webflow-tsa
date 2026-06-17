import { Alignment, Fit, Layout, Rive } from '@rive-app/webgl2';

const ROOT_SELECTOR = '[data-benefit-experience-rive]';
const MOUNT_SELECTOR = '.rive_canvas.is-benefit-1';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function initBenefitExperienceRive(): void {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach(initRoot);
}

function initRoot(root: HTMLElement): void {
  if (root.dataset.riveReady === 'true') return;

  const mount = root.querySelector<HTMLElement>(MOUNT_SELECTOR);
  if (!mount) return;

  root.dataset.riveReady = 'true';

  const canvas = document.createElement('canvas');
  canvas.dataset.benefitExperienceRiveCanvas = '';
  canvas.setAttribute('aria-hidden', 'true');
  mount.replaceChildren(canvas);

  const finePointer = window.matchMedia(FINE_POINTER);
  const reducedMotion = window.matchMedia(REDUCED_MOTION);
  let rive: Rive | null = null;
  let isNearViewport = false;
  let isVisible = false;
  let resizeFrame = 0;

  const resize = (): void => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      rive?.resizeDrawingSurfaceToCanvas();
    });
  };

  const syncRendering = (): void => {
    if (!rive) return;

    if (isVisible && document.visibilityState === 'visible') {
      rive.startRendering();
    } else {
      rive.stopRendering();
    }
  };

  const unmount = (): void => {
    rive?.cleanup();
    rive = null;
    root.classList.remove('is-rive-loading', 'is-rive-ready');
    canvas.width = 1;
    canvas.height = 1;
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
      artboard: root.dataset.riveArtboard || 'benefit-1',
      stateMachines: root.dataset.riveStateMachine || 'files-hover-sm',
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
    const isEligible = finePointer.matches && !reducedMotion.matches;
    root.classList.toggle('is-rive-eligible', isEligible);

    if (!isEligible) {
      unmount();
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
    { rootMargin: '400px 0px' }
  );

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      syncRendering();
    },
    { threshold: 0.01 }
  );

  const resizeObserver = new ResizeObserver(resize);

  preloadObserver.observe(root);
  visibilityObserver.observe(root);
  resizeObserver.observe(root);

  finePointer.addEventListener('change', syncMode);
  reducedMotion.addEventListener('change', syncMode);
  document.addEventListener('visibilitychange', syncRendering);

  window.addEventListener(
    'pagehide',
    () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      finePointer.removeEventListener('change', syncMode);
      reducedMotion.removeEventListener('change', syncMode);
      document.removeEventListener('visibilitychange', syncRendering);
      window.cancelAnimationFrame(resizeFrame);
      unmount();
    },
    { once: true }
  );

  syncMode();
}
