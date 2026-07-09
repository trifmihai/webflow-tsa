import { Rive } from '@rive-app/webgl2';

const ROOT_SELECTOR = '[data-benefit-rive], [data-benefit-experience-rive]';
const FALLBACK_SELECTOR =
  '[data-benefit-rive-fallback], [data-benefit-experience-rive-fallback]';
const PRELOAD_VIEWPORTS = '3';
const RENDER_STOP_DELAY_MS = 320;
const RENDER_STOP_POLL_MS = 160;
const RENDER_STOP_MAX_RETENTION_MS = 1800;
const RENDER_RETENTION_VIEWPORTS = 0.75;
const PATCH_FLAG = '__tsaBenefitRiveStabilityInstalled';

type RiveRuntimeInstance = object & {
  canvas?: HTMLCanvasElement;
};

type RiveRuntimePrototype = {
  cleanup: (...args: unknown[]) => unknown;
  startRendering: (...args: unknown[]) => unknown;
  stopRendering: (...args: unknown[]) => unknown;
};

type StabilityWindow = Window & {
  [PATCH_FLAG]?: boolean;
};

type PendingStop = {
  args: unknown[];
  startedAt: number;
  timeoutId: number;
};

const pendingStops = new WeakMap<object, PendingStop>();

export function initBenefitRiveStability(): void {
  normalizeBenefitRiveMarkup();
  installScopedRenderRetention();
  prefetchRiveAssets();
}

function normalizeBenefitRiveMarkup(): void {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach((root) => {
    const misspelledAlignment = root.getAttribute('data-rive-alignement')?.trim();

    if (!root.hasAttribute('data-rive-alignment') && misspelledAlignment) {
      root.setAttribute('data-rive-alignment', misspelledAlignment);
    }

    root.setAttribute('data-rive-preload', 'nearby');
    root.setAttribute('data-rive-preload-viewports', PRELOAD_VIEWPORTS);
    root.removeAttribute('data-rive-preload-min-scroll-viewports');

    const fallback = root.querySelector<HTMLImageElement>(FALLBACK_SELECTOR);
    const fallbackSource = fallback?.getAttribute('src-fallback')?.trim();

    if (!fallback) return;

    fallback.loading = 'eager';
    fallback.decoding = 'async';
    fallback.setAttribute('fetchpriority', 'high');

    if (!fallback.currentSrc && !fallback.getAttribute('src')?.trim() && fallbackSource) {
      fallback.src = fallbackSource;
    }
  });
}

function installScopedRenderRetention(): void {
  const runtimeWindow = window as StabilityWindow;

  if (runtimeWindow[PATCH_FLAG]) return;

  runtimeWindow[PATCH_FLAG] = true;

  const prototype = Rive.prototype as unknown as RiveRuntimePrototype;
  const originalStartRendering = prototype.startRendering;
  const originalStopRendering = prototype.stopRendering;
  const originalCleanup = prototype.cleanup;

  prototype.startRendering = function (...args: unknown[]): unknown {
    clearPendingStop(this);
    return originalStartRendering.apply(this, args);
  };

  prototype.stopRendering = function (...args: unknown[]): unknown {
    const canvas = getBenefitCanvas(this);

    clearPendingStop(this);

    if (!canvas || document.visibilityState !== 'visible') {
      return originalStopRendering.apply(this, args);
    }

    scheduleStopCheck(this, canvas, args, originalStopRendering);
    return undefined;
  };

  prototype.cleanup = function (...args: unknown[]): unknown {
    clearPendingStop(this);
    return originalCleanup.apply(this, args);
  };
}

function scheduleStopCheck(
  instance: object,
  canvas: HTMLCanvasElement,
  args: unknown[],
  originalStopRendering: RiveRuntimePrototype['stopRendering'],
  startedAt = window.performance.now()
): void {
  const timeoutId = window.setTimeout(() => {
    const pending = pendingStops.get(instance);

    if (!pending || pending.timeoutId !== timeoutId) return;

    const elapsed = window.performance.now() - pending.startedAt;
    const shouldRetain =
      document.visibilityState === 'visible' &&
      canvas.isConnected &&
      isWithinRenderRetentionArea(canvas) &&
      elapsed < RENDER_STOP_MAX_RETENTION_MS;

    if (shouldRetain) {
      scheduleStopCheck(
        instance,
        canvas,
        pending.args,
        originalStopRendering,
        pending.startedAt
      );
      return;
    }

    pendingStops.delete(instance);
    originalStopRendering.apply(instance, pending.args);
  }, pendingStops.has(instance) ? RENDER_STOP_POLL_MS : RENDER_STOP_DELAY_MS);

  pendingStops.set(instance, { args, startedAt, timeoutId });
}

function getBenefitCanvas(instance: object): HTMLCanvasElement | null {
  const canvas = (instance as RiveRuntimeInstance).canvas;

  if (!(canvas instanceof HTMLCanvasElement)) return null;
  if (!canvas.closest(ROOT_SELECTOR)) return null;

  return canvas;
}

function isWithinRenderRetentionArea(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, 0);
  const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth, 0);
  const verticalMargin = viewportHeight * RENDER_RETENTION_VIEWPORTS;

  return (
    rect.bottom >= -verticalMargin &&
    rect.top <= viewportHeight + verticalMargin &&
    rect.right >= 0 &&
    rect.left <= viewportWidth
  );
}

function clearPendingStop(instance: object): void {
  const pending = pendingStops.get(instance);

  if (!pending) return;

  window.clearTimeout(pending.timeoutId);
  pendingStops.delete(instance);
}

function prefetchRiveAssets(): void {
  const sources = new Set<string>();

  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach((root) => {
    const source = root.getAttribute('data-rive-src')?.trim();

    if (source) sources.add(source);
  });

  sources.forEach((source) => {
    const absoluteSource = new URL(source, document.baseURI).href;
    const alreadyPrefetched = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="prefetch"]')
    ).some((link) => link.href === absoluteSource);

    if (alreadyPrefetched) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'fetch';
    link.href = absoluteSource;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}
