import type { Page } from '@playwright/test';
import type { Plugin } from 'esbuild';
import { expect, test } from '@playwright/test';
import * as esbuild from 'esbuild';

const RESPONSIVE_QUERY = '(min-width: 992px) and (hover: hover) and (pointer: fine)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DEFAULT_STATE_MACHINE_QUERY = '(min-width: 992px)';
const DESKTOP_STATE_MACHINE_PLACEHOLDER = 'data-rive-state-machine-desktop';
const MOBILE_STATE_MACHINE_PLACEHOLDER = 'data-rive-state-machine-mobile';
const QUERY_PLACEHOLDER = 'data-rive-state-machine-query';

type MockRiveCall = {
  method: string;
  name?: string;
  params?: Record<string, unknown>;
};

type MockRiveInstance = {
  calls: MockRiveCall[];
  cleanedUp: boolean;
  params: Record<string, unknown>;
};

type BrowserTestWindow = Window &
  typeof globalThis & {
    BenefitRiveFeature: {
      initBenefitRive: () => void;
    };
    __benefitRiveTest: {
      mediaListenerCount: (query: string) => number;
      setMedia: (query: string, matches: boolean) => void;
      setVisibility: (visibilityState: DocumentVisibilityState) => void;
      triggerPreload: (isIntersecting?: boolean) => void;
      triggerRenderVisibility: (isIntersecting: boolean) => void;
    };
    __riveInstances?: MockRiveInstance[];
  };

type BenefitMarkupOptions = {
  desktopStateMachine?: string | null;
  device?: 'all' | 'fine-pointer';
  fallbackMode?: 'error-only' | 'fallback-first';
  mobileStateMachine?: string | null;
  query?: string;
  src?: string;
};

type BrowserMockOptions = {
  defaultStateMachineMatches?: boolean;
  finePointerMatches?: boolean;
  reducedMotionMatches?: boolean;
  responsiveMatches?: boolean;
};

let benefitRiveBundle = '';

const riveMockPlugin: Plugin = {
  name: 'mock-rive-webgl2',
  setup(build) {
    build.onResolve({ filter: /^@rive-app\/webgl2$/ }, () => ({
      namespace: 'rive-mock',
      path: '@rive-app/webgl2',
    }));

    build.onLoad({ filter: /.*/, namespace: 'rive-mock' }, () => ({
      contents: `
        export const Alignment = {
          BottomCenter: 'BottomCenter',
          BottomLeft: 'BottomLeft',
          BottomRight: 'BottomRight',
          Center: 'Center',
          CenterLeft: 'CenterLeft',
          CenterRight: 'CenterRight',
          TopCenter: 'TopCenter',
          TopLeft: 'TopLeft',
          TopRight: 'TopRight',
        };

        export const EventType = {
          Loop: 'Loop',
        };

        export const Fit = {
          Contain: 'Contain',
          Cover: 'Cover',
          Fill: 'Fill',
          FitHeight: 'FitHeight',
          FitWidth: 'FitWidth',
          Layout: 'Layout',
          None: 'None',
          ScaleDown: 'ScaleDown',
        };

        export class Layout {
          constructor(config) {
            this.config = config;
          }
        }

        export class Rive {
          constructor(params) {
            this.calls = [];
            this.cleanedUp = false;
            this.params = params;
            this.viewModelInstance = null;

            window.__riveInstances = window.__riveInstances || [];
            window.__riveInstances.push(this);

            queueMicrotask(() => {
              if (String(params.src).includes('load-error')) {
                params.onLoadError?.();
                return;
              }

              params.onLoad?.();
            });
          }

          cleanup() {
            this.cleanedUp = true;
            this.calls.push({ method: 'cleanup' });
          }

          off(event) {
            this.calls.push({ event, method: 'off' });
          }

          on(event) {
            this.calls.push({ event, method: 'on' });
          }

          pause(name) {
            this.calls.push({ method: 'pause', name });
          }

          play(name) {
            this.calls.push({ method: 'play', name });
          }

          reset(params) {
            this.params = { ...this.params, ...params };
            this.calls.push({ method: 'reset', params });
          }

          resizeDrawingSurfaceToCanvas() {
            this.calls.push({ method: 'resizeDrawingSurfaceToCanvas' });
          }

          setupRiveListeners(params) {
            this.calls.push({ method: 'setupRiveListeners', params });
          }

          startRendering() {
            this.calls.push({ method: 'startRendering' });
          }

          stop(name) {
            this.calls.push({ method: 'stop', name });
          }

          stopRendering() {
            this.calls.push({ method: 'stopRendering' });
          }
        }
      `,
      loader: 'js',
    }));
  },
};

test.beforeAll(async () => {
  const result = await esbuild.build({
    bundle: true,
    entryPoints: ['src/features/benefit-rive/benefit-rive.ts'],
    format: 'iife',
    globalName: 'BenefitRiveFeature',
    plugins: [riveMockPlugin],
    platform: 'browser',
    target: 'es2020',
    write: false,
  });
  const [output] = result.outputFiles ?? [];

  if (!output) {
    throw new Error('Benefit Rive test bundle was not generated.');
  }

  benefitRiveBundle = output.text;
});

test('desktop responsive query mounts files-hover-sm with Rive listeners intact', async ({
  page,
}) => {
  await mountBenefitRive(page, {
    finePointerMatches: true,
    responsiveMatches: true,
  });

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-sm');
  expect(instance.params.artboard).toBe('benefit-1');
  expect(instance.params.autoplay).toBe(true);
  expect(instance.params.autoBind).toBe(true);
  expect(instance.params.shouldDisableRiveListeners).toBe(false);
  expect(instance.params.isTouchScrollEnabled).toBe(true);
  expect(JSON.stringify(instance)).not.toContain('files-hover-loop');
});

test('mobile and large coarse-pointer devices mount files-hover-mobile-sm', async ({ page }) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await mountBenefitRive(page, {
    finePointerMatches: false,
    responsiveMatches: false,
  });

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-mobile-sm');
  expect(instance.params.autoplay).toBe(true);
  expect(instance.params.autoBind).toBe(true);
  expect(instance.params.isTouchScrollEnabled).toBe(true);
});

test('pointer-aware responsive query selects desktop on fine hover devices', async ({ page }) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await mountBenefitRive(page, {
    finePointerMatches: true,
    responsiveMatches: true,
  });

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-sm');
});

test('data-rive-device all allows mobile mounting while reduced motion prevents it', async ({
  page,
}) => {
  await mountBenefitRive(page, {
    finePointerMatches: false,
    responsiveMatches: false,
  });

  await expect(page.locator('[data-benefit-rive]')).toHaveClass(/is-rive-ready/);
  expect(await getMountedRiveInstances(page)).toHaveLength(1);

  await page.setContent(getBenefitMarkup());
  await installBrowserMocks(page, {
    finePointerMatches: false,
    reducedMotionMatches: true,
    responsiveMatches: false,
  });
  await page.addScriptTag({ content: benefitRiveBundle });
  await initAndEnterViewport(page);

  await expect(page.locator('[data-benefit-rive]')).toHaveClass(/is-rive-unavailable/);
  expect(await getMountedRiveInstances(page)).toHaveLength(0);
});

test('responsive query changes reset the active State Machine safely', async ({ page }) => {
  await mountBenefitRive(page, {
    finePointerMatches: true,
    responsiveMatches: true,
  });

  await setMedia(page, RESPONSIVE_QUERY, false);
  await page.waitForFunction(() => {
    const testWindow = window as BrowserTestWindow;
    const [instance] = testWindow.__riveInstances ?? [];

    return instance?.calls.some(
      (call) =>
        call.method === 'reset' && call.params?.stateMachines === 'files-hover-mobile-sm'
    );
  });

  const [instance] = await getMountedRiveInstances(page);
  expect(await getMountedRiveInstances(page)).toHaveLength(1);

  const resetCall = instance.calls.find(
    (call) => call.method === 'reset' && call.params?.stateMachines === 'files-hover-mobile-sm'
  );
  const listenerCall = instance.calls.find((call) => call.method === 'setupRiveListeners');

  expect(resetCall?.params).toMatchObject({
    artboard: 'benefit-1',
    autoBind: true,
    autoplay: true,
    stateMachines: 'files-hover-mobile-sm',
  });
  expect(listenerCall?.params).toMatchObject({ isTouchScrollEnabled: true });
});

test('base data-rive-state-machine remains the fallback State Machine', async ({ page }) => {
  await mountBenefitRive(
    page,
    {
      finePointerMatches: false,
      responsiveMatches: false,
    },
    {
      mobileStateMachine: null,
    }
  );

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-sm');
});

test('malformed desktop placeholder falls back to the base State Machine', async ({ page }) => {
  await mountBenefitRive(
    page,
    {
      finePointerMatches: true,
      responsiveMatches: true,
    },
    {
      desktopStateMachine: DESKTOP_STATE_MACHINE_PLACEHOLDER,
    }
  );

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-sm');
  expect(instance.params.stateMachines).not.toBe(DESKTOP_STATE_MACHINE_PLACEHOLDER);
});

test('malformed mobile placeholder falls back to the base State Machine', async ({ page }) => {
  await mountBenefitRive(
    page,
    {
      finePointerMatches: false,
      responsiveMatches: false,
    },
    {
      mobileStateMachine: MOBILE_STATE_MACHINE_PLACEHOLDER,
    }
  );

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-sm');
  expect(instance.params.stateMachines).not.toBe(MOBILE_STATE_MACHINE_PLACEHOLDER);
});

test('malformed responsive query placeholder falls back to the default query', async ({ page }) => {
  await mountBenefitRive(
    page,
    {
      defaultStateMachineMatches: false,
      finePointerMatches: true,
      responsiveMatches: true,
    },
    {
      query: QUERY_PLACEHOLDER,
    }
  );

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.params.stateMachines).toBe('files-hover-mobile-sm');
  expect(
    await page.evaluate((query) => {
      return (window as BrowserTestWindow).__benefitRiveTest.mediaListenerCount(query);
    }, DEFAULT_STATE_MACHINE_QUERY)
  ).toBe(1);
  expect(
    await page.evaluate((query) => {
      return (window as BrowserTestWindow).__benefitRiveTest.mediaListenerCount(query);
    }, QUERY_PLACEHOLDER)
  ).toBe(0);
});

test('offscreen, hidden-tab, and cleanup paths pause and dispose the active instance', async ({
  page,
}) => {
  await mountBenefitRive(
    page,
    {
      finePointerMatches: false,
      responsiveMatches: false,
    },
    {
      fallbackMode: 'error-only',
    }
  );
  await expect(page.locator('[data-benefit-rive]')).toHaveClass(/is-rive-visual-ready/);

  await page.evaluate(() => {
    (window as BrowserTestWindow).__benefitRiveTest.triggerRenderVisibility(false);
  });
  await page.evaluate(() => {
    (window as BrowserTestWindow).__benefitRiveTest.setVisibility('hidden');
  });

  let [instance] = await getMountedRiveInstances(page);

  expect(instance.calls.some((call) => call.method === 'pause')).toBe(true);

  await page.evaluate(() => {
    (window as BrowserTestWindow).__benefitRiveTest.triggerRenderVisibility(true);
  });
  await page.evaluate(() => {
    (window as BrowserTestWindow).__benefitRiveTest.setVisibility('visible');
  });
  await page.waitForFunction(() => {
    const [riveInstance] = (window as BrowserTestWindow).__riveInstances ?? [];

    return riveInstance?.calls.some((call) => call.method === 'play');
  });

  [instance] = await getMountedRiveInstances(page);

  expect(instance.calls.some((call) => call.method === 'play')).toBe(true);
  expect(
    await page.evaluate((query) => {
      return (window as BrowserTestWindow).__benefitRiveTest.mediaListenerCount(query);
    }, RESPONSIVE_QUERY)
  ).toBe(1);

  await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
  });

  [instance] = await getMountedRiveInstances(page);

  expect(instance.cleanedUp).toBe(true);
  expect(
    await page.evaluate((query) => {
      return (window as BrowserTestWindow).__benefitRiveTest.mediaListenerCount(query);
    }, RESPONSIVE_QUERY)
  ).toBe(0);
});

test('fallback remains available when Rive loading fails', async ({ page }) => {
  await initializeBenefitRive(
    page,
    {
      finePointerMatches: true,
      responsiveMatches: true,
    },
    {
      src: 'https://assets.example.test/load-error.riv',
    }
  );

  await expect(page.locator('[data-benefit-rive]')).toHaveClass(/is-rive-error/);
  await expect(page.locator('[data-benefit-rive]')).not.toHaveClass(/is-rive-visual-ready/);
  await expect(page.locator('[data-benefit-rive-fallback]')).toHaveCount(1);

  const [instance] = await getMountedRiveInstances(page);

  expect(instance.cleanedUp).toBe(true);
});

async function mountBenefitRive(
  page: Page,
  mockOptions: BrowserMockOptions = {},
  markupOptions: BenefitMarkupOptions = {}
): Promise<void> {
  await initializeBenefitRive(page, mockOptions, markupOptions);
  await page.waitForFunction(() => {
    return document.querySelector('[data-benefit-rive]')?.classList.contains('is-rive-ready');
  });
}

async function initializeBenefitRive(
  page: Page,
  mockOptions: BrowserMockOptions = {},
  markupOptions: BenefitMarkupOptions = {}
): Promise<void> {
  await page.setContent(getBenefitMarkup(markupOptions));
  await installBrowserMocks(page, mockOptions);
  await page.addScriptTag({ content: benefitRiveBundle });
  await initAndEnterViewport(page);
}

async function initAndEnterViewport(page: Page): Promise<void> {
  await page.evaluate(() => {
    const testWindow = window as BrowserTestWindow;

    testWindow.BenefitRiveFeature.initBenefitRive();
    testWindow.__benefitRiveTest.triggerRenderVisibility(true);
    testWindow.__benefitRiveTest.triggerPreload(true);
  });
}

async function installBrowserMocks(
  page: Page,
  {
    defaultStateMachineMatches = false,
    finePointerMatches = false,
    reducedMotionMatches = false,
    responsiveMatches = false,
  }: BrowserMockOptions
): Promise<void> {
  await page.addScriptTag({
    content: `(${installBrowserTestEnvironment.toString()})(${JSON.stringify({
      finePointerMatches,
      finePointerQuery: FINE_POINTER_QUERY,
      defaultStateMachineMatches,
      defaultStateMachineQuery: DEFAULT_STATE_MACHINE_QUERY,
      reducedMotionMatches,
      reducedMotionQuery: REDUCED_MOTION_QUERY,
      responsiveMatches,
      responsiveQuery: RESPONSIVE_QUERY,
    })});`,
  });
}

async function setMedia(page: Page, query: string, matches: boolean): Promise<void> {
  await page.evaluate(
    ({ matches: nextMatches, query: mediaQuery }) => {
      (window as BrowserTestWindow).__benefitRiveTest.setMedia(mediaQuery, nextMatches);
    },
    { matches, query }
  );
}

async function getMountedRiveInstances(page: Page): Promise<MockRiveInstance[]> {
  return page.evaluate(() => {
    return (window as BrowserTestWindow).__riveInstances ?? [];
  });
}

function getBenefitMarkup({
  desktopStateMachine = 'files-hover-sm',
  device = 'all',
  fallbackMode = 'fallback-first',
  mobileStateMachine = 'files-hover-mobile-sm',
  query = RESPONSIVE_QUERY,
  src = 'https://assets.example.test/benefit-1.riv',
}: BenefitMarkupOptions = {}): string {
  const desktopAttribute =
    desktopStateMachine === null
      ? ''
      : `data-rive-state-machine-desktop="${desktopStateMachine}"`;
  const mobileAttribute =
    mobileStateMachine === null
      ? ''
      : `data-rive-state-machine-mobile="${mobileStateMachine}"`;

  return `
    <div
      data-benefit-rive="experience"
      data-rive-activation="internal"
      data-rive-artboard="benefit-1"
      data-rive-device="${device}"
      data-rive-fallback-mode="${fallbackMode}"
      data-rive-playback="state-machine"
      data-rive-src="${src}"
      data-rive-state-machine="files-hover-sm"
      ${desktopAttribute}
      ${mobileAttribute}
      data-rive-state-machine-query="${query}"
      style="height: 300px; width: 400px;"
    >
      <img
        alt=""
        data-benefit-rive-fallback="experience"
        height="300"
        src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
        width="400"
      />
      <div data-benefit-rive-mount="experience"></div>
    </div>
  `;
}

function installBrowserTestEnvironment({
  defaultStateMachineMatches,
  defaultStateMachineQuery,
  finePointerMatches,
  finePointerQuery,
  reducedMotionMatches,
  reducedMotionQuery,
  responsiveMatches,
  responsiveQuery,
}: {
  defaultStateMachineMatches: boolean;
  defaultStateMachineQuery: string;
  finePointerMatches: boolean;
  finePointerQuery: string;
  reducedMotionMatches: boolean;
  reducedMotionQuery: string;
  responsiveMatches: boolean;
  responsiveQuery: string;
}): void {
  const mediaRecords = new Map<
    string,
    {
      listeners: Set<EventListenerOrEventListenerObject>;
      matches: boolean;
    }
  >();
  const observerRecords: Array<{
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;
    targets: Set<Element>;
  }> = [];

  const initialMatches: Record<string, boolean> = {
    [defaultStateMachineQuery]: defaultStateMachineMatches,
    [finePointerQuery]: finePointerMatches,
    [reducedMotionQuery]: reducedMotionMatches,
    [responsiveQuery]: responsiveMatches,
  };

  const getMediaRecord = (query: string) => {
    if (!mediaRecords.has(query)) {
      mediaRecords.set(query, {
        listeners: new Set(),
        matches: initialMatches[query] ?? false,
      });
    }

    const record = mediaRecords.get(query);

    if (!record) {
      throw new Error(`Missing media record for ${query}.`);
    }

    return record;
  };

  const testWindow = window as BrowserTestWindow;

  testWindow.__riveInstances = [];

  window.matchMedia = (query: string): MediaQueryList => {
    const record = getMediaRecord(query);

    return {
      addEventListener: (_type: string, listener: EventListenerOrEventListenerObject | null) => {
        if (listener) {
          record.listeners.add(listener);
        }
      },
      addListener: (listener: EventListenerOrEventListenerObject | null) => {
        if (listener) {
          record.listeners.add(listener);
        }
      },
      dispatchEvent: (event: Event) => {
        record.listeners.forEach((listener) => {
          notifyMediaListener(listener, event);
        });

        return true;
      },
      get matches() {
        return record.matches;
      },
      media: query,
      onchange: null,
      removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject | null) => {
        if (listener) {
          record.listeners.delete(listener);
        }
      },
      removeListener: (listener: EventListenerOrEventListenerObject | null) => {
        if (listener) {
          record.listeners.delete(listener);
        }
      },
    } as unknown as MediaQueryList;
  };

  class MockIntersectionObserver {
    private readonly callback: IntersectionObserverCallback;
    private readonly options?: IntersectionObserverInit;
    private readonly targets = new Set<Element>();
    readonly root = null;
    readonly rootMargin: string;
    readonly thresholds: ReadonlyArray<number>;

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.callback = callback;
      this.options = options;
      this.rootMargin = options?.rootMargin ?? '0px';
      this.thresholds = Array.isArray(options?.threshold)
        ? options.threshold
        : [options?.threshold ?? 0];
      observerRecords.push({
        callback: this.callback,
        options: this.options,
        targets: this.targets,
      });
    }

    disconnect(): void {
      this.targets.clear();
    }

    observe(target: Element): void {
      this.targets.add(target);
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    unobserve(target: Element): void {
      this.targets.delete(target);
    }
  }

  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;

  window.ResizeObserver = class {
    disconnect(): void {
      return undefined;
    }

    observe(): void {
      return undefined;
    }

    unobserve(): void {
      return undefined;
    }
  };

  testWindow.__benefitRiveTest = {
    mediaListenerCount(query: string) {
      return getMediaRecord(query).listeners.size;
    },
    setMedia(query: string, matches: boolean) {
      const record = getMediaRecord(query);
      record.matches = matches;

      const event = new Event('change') as MediaQueryListEvent;
      Object.defineProperties(event, {
        matches: { value: matches },
        media: { value: query },
      });

      record.listeners.forEach((listener) => {
        notifyMediaListener(listener, event);
      });
    },
    setVisibility(visibilityState: DocumentVisibilityState) {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        value: visibilityState,
      });
      document.dispatchEvent(new Event('visibilitychange'));
    },
    triggerPreload(isIntersecting = true) {
      triggerObserver(
        (options) => typeof options?.rootMargin === 'string',
        isIntersecting,
        isIntersecting ? 1 : 0
      );
    },
    triggerRenderVisibility(isIntersecting: boolean) {
      triggerObserver(
        (options) => options?.threshold === 0.01,
        isIntersecting,
        isIntersecting ? 1 : 0
      );
    },
  };

  function triggerObserver(
    predicate: (options?: IntersectionObserverInit) => boolean,
    isIntersecting: boolean,
    intersectionRatio: number
  ): void {
    const observer = observerRecords.find(({ options }) => predicate(options));

    if (!observer) {
      throw new Error('Expected IntersectionObserver was not created.');
    }

    const entries = Array.from(observer.targets).map((target) => {
      const rect = target.getBoundingClientRect();

      return {
        boundingClientRect: rect,
        intersectionRatio,
        intersectionRect: rect,
        isIntersecting,
        rootBounds: null,
        target,
        time: performance.now(),
      } as IntersectionObserverEntry;
    });

    observer.callback(entries, {} as IntersectionObserver);
  }

  function notifyMediaListener(listener: EventListenerOrEventListenerObject, event: Event): void {
    if (typeof listener === 'function') {
      listener(event);
      return;
    }

    listener.handleEvent(event);
  }
}
