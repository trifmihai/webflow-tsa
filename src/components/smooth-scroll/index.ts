import Lenis, { type LenisOptions, type ScrollToOptions } from 'lenis';

export type SmoothScrollKind = 'subtle' | 'balanced' | 'heavy' | 'custom';

export type SmoothScrollProps = LenisOptions & {
  enabled?: boolean;
  kind?: SmoothScrollKind;
  reinitialize?: boolean;
  respectReducedMotion?: boolean;
};

export type SmoothScrollController = {
  destroy: () => void;
  lenis: Lenis;
  resize: () => void;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    tsaSmoothScroll?: SmoothScrollController;
  }
}

const SMOOTH_SCROLL_PRESETS = {
  subtle: {
    lerp: 0.12,
    wheelMultiplier: 0.9,
  },
  balanced: {
    lerp: 0.08,
    wheelMultiplier: 1,
  },
  heavy: {
    lerp: 0.055,
    wheelMultiplier: 0.85,
  },
} satisfies Record<Exclude<SmoothScrollKind, 'custom'>, LenisOptions>;

const DEFAULT_LENIS_OPTIONS = {
  anchors: true,
  autoResize: true,
  overscroll: true,
  smoothWheel: true,
  stopInertiaOnNavigate: true,
  syncTouch: false,
} satisfies LenisOptions;

const DEFAULT_EASING = (time: number): number => Math.min(1, 1.001 - 2 ** (-10 * time));

export function initSmoothScroll(props: SmoothScrollProps = {}): SmoothScrollController | null {
  const {
    enabled = true,
    kind = 'balanced',
    reinitialize = false,
    respectReducedMotion = true,
    ...lenisProps
  } = props;

  if (!enabled) {
    window.tsaSmoothScroll?.destroy();

    return null;
  }

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (respectReducedMotion && reducedMotionQuery.matches) {
    window.tsaSmoothScroll?.destroy();

    return null;
  }

  if (window.tsaSmoothScroll) {
    if (!reinitialize) return window.tsaSmoothScroll;

    window.tsaSmoothScroll.destroy();
  }

  const presetOptions = kind === 'custom' ? {} : SMOOTH_SCROLL_PRESETS[kind];

  const lenisOptions: LenisOptions = {
    ...DEFAULT_LENIS_OPTIONS,
    ...presetOptions,
    ...lenisProps,
    autoRaf: lenisProps.autoRaf ?? false,
    easing: lenisProps.easing ?? DEFAULT_EASING,
  };

  if (lenisProps.duration !== undefined && lenisProps.lerp === undefined) {
    delete lenisOptions.lerp;
  }

  const lenis = new Lenis(lenisOptions);
  let frameId: number | undefined;

  const updateFrame = (time: number): void => {
    lenis.raf(time);
    frameId = window.requestAnimationFrame(updateFrame);
  };

  if (!lenisOptions.autoRaf) {
    frameId = window.requestAnimationFrame(updateFrame);
  }

  const destroy = (): void => {
    if (frameId !== undefined) {
      window.cancelAnimationFrame(frameId);
      frameId = undefined;
    }

    reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    lenis.destroy();

    if (window.tsaSmoothScroll === controller) {
      delete window.tsaSmoothScroll;
    }
  };

  const handleReducedMotionChange = (event: MediaQueryListEvent): void => {
    if (!respectReducedMotion || !event.matches) return;

    destroy();
  };

  const controller: SmoothScrollController = {
    destroy,
    lenis,
    resize: () => lenis.resize(),
    scrollTo: (target, options) => lenis.scrollTo(target, options),
    start: () => lenis.start(),
    stop: () => lenis.stop(),
  };

  reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
  window.tsaSmoothScroll = controller;

  return controller;
}
