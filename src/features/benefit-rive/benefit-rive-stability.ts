import { Rive } from '@rive-app/webgl2';

const ROOT_SELECTOR = '[data-benefit-rive], [data-benefit-experience-rive]';
const PRELOAD_VIEWPORTS = '3';
const RENDER_STOP_RETENTION_MS = 280;
const PATCH_FLAG = '__tsaBenefitRiveStabilityInstalled';

type RiveRuntimePrototype = {
  startRendering: (...args: unknown[]) => unknown;
  stopRendering: (...args: unknown[]) => unknown;
  cleanup: (...args: unknown[]) => unknown;
};

type StabilityWindow = Window & {
  [PATCH_FLAG]?: boolean;
};

const pendingStops = new WeakMap<object, number>();

export function initBenefitRiveStability(): void {
  normalizeBenefitRiveMarkup();
  installRenderRetention();
  scheduleRiveAssetPrefetch();
}

function normalizeBenefitRiveMarkup(): void {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach((root) => {
    const misspelledAlignment = root.getAttribute('data-rive-alignement')?.trim();

    if (!root.hasAttribute('data-rive-alignment') && misspelledAlignment) {
      root.setAttribute('data-rive-alignment', misspelledAlignment);
    }

    if (!root.hasAttribute('data-rive-preload')) {
      root.setAttribute('data-rive-preload', 'nearby');
    }

    if (!root.hasAttribute('data-rive-preload-viewports')) {
      root.setAttribute('data-rive-preload-viewports', PRELOAD_VIEWPORTS);
    }

    /*
     * The minimum-scroll gate can postpone mounting until a fast scroll is
     * already in progress. Nearby preloading is bounded by viewport distance,
     * so the extra gate is not needed.
     */
    root.removeAttribute('data-rive-preload-min-scroll-viewports');

    const fallback = root.querySelector<HTMLImageElement>(
      '[data-benefit-rive-fallback], [data-benefit-experience-rive-fallback]'
    );
    const fallbackSource = fallback?.getAttribute('src-fallback')?.trim();

    if (fallback && !fallback.currentSrc && !fallback.getAttribute('src')?.trim() && fallbackSource) {
      fallback.src = fallbackSource;
    }
  });
}

function installRenderRetention(): void {
  const runtimeWindow = window as StabilityWindow;

  if (runtimeWindow[PATCH_FLAG]) {
    return;
  }

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
    clearPendingStop(this);

    if (document.visibilityState !== 'visible') {
      return originalStopRendering.apply(this, args);
    }

    const instance = this;
    const timeoutId = window.setTimeout(() => {
      pendingStops.delete(instance);
      originalStopRendering.apply(instance, args);
    }, RENDER_STOP_RETENTION_MS);

    pendingStops.set(instance, timeoutId);

    return undefined;
  };

  prototype.cleanup = function (...args: unknown[]): unknown {
    clearPendingStop(this);

    return originalCleanup.apply(this, args);
  };
}

function clearPendingStop(instance: object): void {
  const timeoutId = pendingStops.get(instance);

  if (timeoutId === undefined) {
    return;
  }

  window.clearTimeout(timeoutId);
  pendingStops.delete(instance);
}

function scheduleRiveAssetPrefetch(): void {
  const prefetch = (): void => {
    const sources = new Set<string>();

    document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach((root) => {
      const source = root.getAttribute('data-rive-src')?.trim();

      if (source) {
        sources.add(source);
      }
    });

    sources.forEach((source) => {
      const existing = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="prefetch"]')).some(
        (link) => link.href === new URL(source, document.baseURI).href
      );

      if (existing) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'fetch';
      link.href = source;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(prefetch, { timeout: 1200 });
    return;
  }

  window.setTimeout(prefetch, 250);
}
