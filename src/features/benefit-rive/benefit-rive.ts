import {
  Alignment,
  type EventCallback,
  EventType,
  Fit,
  Layout,
  type LoopEvent,
  Rive,
  type RiveParameters,
  type ViewModelInstanceBoolean,
  type ViewModelInstanceNumber,
} from '@rive-app/webgl2';

const ROOT_SELECTOR = '[data-benefit-rive]';
const MOUNT_SELECTOR = '[data-benefit-rive-mount]';
const FALLBACK_SELECTOR = '[data-benefit-rive-fallback]';
const TRIGGER_SELECTOR = '[data-benefit-rive-trigger]';

const LEGACY_ROOT_SELECTOR = '[data-benefit-experience-rive]';
const LEGACY_MOUNT_SELECTOR = '.rive_canvas.is-benefit-1';
const LEGACY_FALLBACK_SELECTOR = '[data-benefit-experience-rive-fallback]';

const ROOT_QUERY = `${ROOT_SELECTOR}, ${LEGACY_ROOT_SELECTOR}`;
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DEFAULT_STATE_MACHINE_QUERY = '(min-width: 992px)';
const MOBILE_PRELOAD_QUERY = '(max-width: 991px)';
const DEFAULT_DESKTOP_PRELOAD_ROOT_MARGIN_PX = 400;
const RENDER_VISIBILITY_THRESHOLD = 0.01;
const RENDER_RETAINED_VIEWPORTS = 0.75;
const RENDER_STOP_DELAY_MS = 300;
const DEFAULT_VIEWPORT_THRESHOLD = 0.35;
const DEFAULT_DESKTOP_NEARBY_PRELOAD_VIEWPORTS = 1.5;
const DEFAULT_MOBILE_PRELOAD_VIEWPORTS = 3;
const MIN_NEARBY_PRELOAD_VIEWPORTS = 0.5;
const MIN_MOBILE_PRELOAD_VIEWPORTS = 2.5;
const MAX_NEARBY_PRELOAD_VIEWPORTS = 3;
const DEFAULT_BOUNDARY_PROPERTY = 'pulseBoundary';
const CURSOR_PROPERTIES_ATTRIBUTE = 'data-rive-cursor-properties';
const LAYOUT_PARITY_TOLERANCE = 0.5;
const VISUAL_READY_FRAME_COUNT = 4;
const VISUAL_READY_MIN_STABILIZATION_MS = 120;
const IDLE_RESET_FRAME_COUNT = 3;
const IDLE_RESIZE_FRAME_COUNT = 2;
const INITIALIZED_ATTRIBUTE = 'benefitRiveInitialized';
const LEGACY_INITIALIZED_ATTRIBUTE = 'benefitExperienceRiveInitialized';

type PlaybackMode = 'state-machine' | 'animation';
type DevicePolicy = 'fine-pointer' | 'all';
type ActivationMode = 'internal' | 'hover-or-viewport';
type FallbackMode = 'fallback-first' | 'error-only';
type PreloadMode = 'default' | 'nearby';
type IdleRenderPolicy = 'stop' | 'continuous';

type ResponsiveStateMachineConfig = {
  desktopName: string | null;
  mobileName: string | null;
  query: string;
};

type StateMachineConfig = {
  artboardName: string;
  mode: 'state-machine';
  responsiveStateMachine?: ResponsiveStateMachineConfig;
  stateMachineName: string;
};

type AnimationConfig = {
  animationName: string;
  artboardName: string;
  boundaryPropertyName: string;
  mode: 'animation';
  viewportThreshold: number;
};

type PlaybackConfig = AnimationConfig | StateMachineConfig;

type ObjectFitValue = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

type ResolvedLayoutConfig = {
  alignment: Alignment;
  fit: Fit;
  objectFit: ObjectFitValue;
  objectPosition: string;
};

type RectSnapshot = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type DrawingSurfaceSnapshot = {
  devicePixelRatio: number;
  height: number;
  width: number;
};

type PointerCursorSubscription = {
  callback: EventCallback;
  property: ViewModelInstanceBoolean;
};

const DEFAULT_LAYOUT_CONFIG: ResolvedLayoutConfig = {
  alignment: Alignment.BottomCenter,
  fit: Fit.Contain,
  objectFit: 'contain',
  objectPosition: 'center bottom',
};

const FIT_MAP: Record<string, Pick<ResolvedLayoutConfig, 'fit' | 'objectFit'>> = {
  contain: { fit: Fit.Contain, objectFit: 'contain' },
  cover: { fit: Fit.Cover, objectFit: 'cover' },
  fill: { fit: Fit.Fill, objectFit: 'fill' },
  'fit-height': { fit: Fit.FitHeight, objectFit: 'contain' },
  'fit-width': { fit: Fit.FitWidth, objectFit: 'contain' },
  layout: { fit: Fit.Layout, objectFit: 'contain' },
  none: { fit: Fit.None, objectFit: 'none' },
  'scale-down': { fit: Fit.ScaleDown, objectFit: 'scale-down' },
};

const ALIGNMENT_MAP: Record<string, Pick<ResolvedLayoutConfig, 'alignment' | 'objectPosition'>> = {
  center: { alignment: Alignment.Center, objectPosition: 'center center' },
  'bottom-center': {
    alignment: Alignment.BottomCenter,
    objectPosition: 'center bottom',
  },
  'bottom-left': {
    alignment: Alignment.BottomLeft,
    objectPosition: 'left bottom',
  },
  'bottom-right': {
    alignment: Alignment.BottomRight,
    objectPosition: 'right bottom',
  },
  'center-left': {
    alignment: Alignment.CenterLeft,
    objectPosition: 'left center',
  },
  'center-right': {
    alignment: Alignment.CenterRight,
    objectPosition: 'right center',
  },
  'top-center': {
    alignment: Alignment.TopCenter,
    objectPosition: 'center top',
  },
  'top-left': { alignment: Alignment.TopLeft, objectPosition: 'left top' },
  'top-right': { alignment: Alignment.TopRight, objectPosition: 'right top' },
};

let didWarnBoundaryFallback = false;
const malformedAttributeWarnings = new WeakMap<HTMLElement, Set<string>>();
const prefetchedRiveSources = new Set<string>();

export function initBenefitRive(): void {
  document.querySelectorAll<HTMLElement>(ROOT_QUERY).forEach(initBenefitRiveRoot);
}

function initBenefitRiveRoot(root: HTMLElement): void {
  if (
    root.dataset[INITIALIZED_ATTRIBUTE] === 'true' ||
    root.dataset[LEGACY_INITIALIZED_ATTRIBUTE] === 'true'
  ) {
    return;
  }

  root.dataset[INITIALIZED_ATTRIBUTE] = 'true';
  root.dataset[LEGACY_INITIALIZED_ATTRIBUTE] = 'true';

  const key = getBenefitKey(root);
  const layoutConfig = getResolvedLayoutConfig(root);
  const fallback = getFallbackElement(root, key);
  const fallbackMode = getFallbackMode(root);
  const mount = getMountElement(root, key);
  const preloadMode = getPreloadMode(root);
  const idleRenderPolicy = getIdleRenderPolicy(root);
  const minScrollPreloadViewports = getPreloadMinScrollViewports(root);

  applyLayoutCssVariables(root, layoutConfig);
  prepareFallbackImage(fallback);

  if (!mount) {
    applyErrorState(root);
    return;
  }

  const canvas = prepareCanvas(mount);
  const config = getPlaybackConfig(root);

  if (!config) {
    applyErrorState(root);
    return;
  }

  root.classList.toggle('is-rive-playback-state-machine', config.mode === 'state-machine');
  root.classList.toggle('is-rive-playback-animation', config.mode === 'animation');

  const pointerCursorPropertyNames = getCursorPropertyNames(root);
  const finePointerQuery = window.matchMedia(FINE_POINTER_QUERY);
  const mobilePreloadQuery = window.matchMedia(MOBILE_PRELOAD_QUERY);
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const devicePolicy = getDevicePolicy(root);
  const activationMode = getActivationMode(root, config);
  const trigger = getTriggerElement(root, key);
  const responsiveStateMachineQuery =
    config.mode === 'state-machine' && config.responsiveStateMachine
      ? window.matchMedia(config.responsiveStateMachine.query)
      : null;

  let rive: Rive | null = null;
  let boundaryProperty: ViewModelInstanceNumber | null = null;
  let boundaryCallback: EventCallback | null = null;
  let loopCallback: EventCallback | null = null;
  const pointerCursorSubscriptions: PointerCursorSubscription[] = [];
  const missingCursorPropertyNames = new Set<string>();
  let resizeFrame = 0;
  let layoutParityFrame = 0;
  let prematureFadeFrame = 0;
  let visualReadyToken = 0;
  let warmupTimeout = 0;
  let idleResetToken = 0;
  let idleResizeToken = 0;
  let hasFallbackImageListeners = false;
  let fallbackImageSettledPromise: Promise<void> | null = null;
  let resolveFallbackImageSettled: (() => void) | null = null;
  let fallbackLoadCallback: (() => void) | null = null;
  let fallbackErrorCallback: (() => void) | null = null;
  const warmupFrameIds: number[] = [];
  const warmupCancelResolvers: Array<() => void> = [];
  const idleResetFrameIds: number[] = [];
  const idleResetCancelResolvers: Array<() => void> = [];
  const idleResizeFrameIds: number[] = [];
  const idleResizeCancelResolvers: Array<() => void> = [];
  let preloadObserver: IntersectionObserver | null = null;
  let preloadResizeFrame = 0;
  let preloadScrollFrame = 0;
  let preloadScrollCallback: (() => void) | null = null;
  let renderVisibilityObserver: IntersectionObserver | null = null;
  let renderVisibilityFrame = 0;
  let renderVisibilityRefreshFrame = 0;
  let renderStopTimeout = 0;
  let lastDrawingSurfaceSnapshot: DrawingSurfaceSnapshot | null = null;
  let isWithinPreloadArea = false;
  let isNearViewport = false;
  let isRiveLoaded = false;
  let isVisualReady = false;
  let isWarmingUp = false;
  let isRenderVisible = false;
  let isRendering = false;
  let isPlaying = false;
  let isPausedForHidden = false;
  let activationRequested = false;
  let mobileViewportActive = false;
  let pendingGracefulStop = false;
  let stopRequestedFromBoundaryValue: number | null = null;
  let lastBoundaryValue: number | null = null;
  let didWarnLayoutParityMismatch = false;
  let didWarnPrematureFallbackFade = false;
  let isCleanedUp = false;
  let activeStateMachineName =
    config.mode === 'state-machine'
      ? resolveStateMachineName(config, responsiveStateMachineQuery)
      : null;
  let hasMetPreloadMinScroll =
    preloadMode !== 'nearby' ||
    mobilePreloadQuery.matches ||
    minScrollPreloadViewports === null ||
    getCurrentScrollY() > 1 ||
    isElementActuallyVisible(root);

  const syncMountToFallbackGeometry = (): boolean => {
    return syncMountToFallbackGeometryBox(root, mount, fallback);
  };

  const cancelQueuedFrames = (frameIds: number[]): void => {
    frameIds.forEach((frameId) => {
      window.cancelAnimationFrame(frameId);
    });

    frameIds.length = 0;
  };

  const resolvePendingWaits = (resolvers: Array<() => void>): void => {
    resolvers.splice(0).forEach((resolve) => {
      resolve();
    });
  };

  const cancelWarmup = (): void => {
    visualReadyToken += 1;
    isWarmingUp = false;
    window.clearTimeout(warmupTimeout);
    warmupTimeout = 0;
    cancelQueuedFrames(warmupFrameIds);
    resolvePendingWaits(warmupCancelResolvers);
  };

  const cancelIdleFrames = (): void => {
    idleResetToken += 1;
    idleResizeToken += 1;
    cancelQueuedFrames(idleResetFrameIds);
    cancelQueuedFrames(idleResizeFrameIds);
    resolvePendingWaits(idleResetCancelResolvers);
    resolvePendingWaits(idleResizeCancelResolvers);
  };

  const waitForAnimationFrames = (
    count: number,
    frameIds: number[],
    cancelResolvers: Array<() => void>
  ): Promise<void> => {
    return new Promise((resolve) => {
      let isSettled = false;

      const removeCancelResolver = (cancelResolver: () => void): void => {
        const index = cancelResolvers.indexOf(cancelResolver);

        if (index >= 0) {
          cancelResolvers.splice(index, 1);
        }
      };

      const finish = (cancelResolver: () => void): void => {
        if (isSettled) return;

        isSettled = true;
        removeCancelResolver(cancelResolver);
        resolve();
      };

      const cancelResolver = (): void => {
        finish(cancelResolver);
      };

      const step = (remainingFrames: number): void => {
        const frameId = window.requestAnimationFrame(() => {
          const index = frameIds.indexOf(frameId);

          if (index >= 0) {
            frameIds.splice(index, 1);
          }

          if (isSettled) return;

          if (remainingFrames <= 1) {
            finish(cancelResolver);
            return;
          }

          step(remainingFrames - 1);
        });

        frameIds.push(frameId);
      };

      cancelResolvers.push(cancelResolver);
      step(Math.max(1, count));
    });
  };

  const waitForWarmupStabilization = (): Promise<void> => {
    return new Promise((resolve) => {
      let isSettled = false;

      const removeCancelResolver = (cancelResolver: () => void): void => {
        const index = warmupCancelResolvers.indexOf(cancelResolver);

        if (index >= 0) {
          warmupCancelResolvers.splice(index, 1);
        }
      };

      const finish = (cancelResolver: () => void): void => {
        if (isSettled) return;

        isSettled = true;
        window.clearTimeout(warmupTimeout);
        warmupTimeout = 0;
        removeCancelResolver(cancelResolver);
        resolve();
      };

      const cancelResolver = (): void => {
        finish(cancelResolver);
      };

      warmupCancelResolvers.push(cancelResolver);
      warmupTimeout = window.setTimeout(() => {
        finish(cancelResolver);
      }, VISUAL_READY_MIN_STABILIZATION_MS);
    });
  };

  const canRenderNow = (): boolean => {
    return document.visibilityState === 'visible' && canvas.isConnected && isRenderVisible;
  };

  const shouldKeepIdleRendererAlive = (): boolean => {
    return config.mode === 'animation' && idleRenderPolicy === 'continuous' && canRenderNow();
  };

  const canWarmupOffscreen = (): boolean => {
    return preloadMode === 'nearby' || mobilePreloadQuery.matches;
  };

  const canWarmupNow = (): boolean => {
    return document.visibilityState === 'visible' && (isRenderVisible || canWarmupOffscreen());
  };

  const getDrawingSurfaceSnapshot = (): DrawingSurfaceSnapshot | null => {
    const rect = canvas.getBoundingClientRect();
    const width = canvas.clientWidth || rect.width;
    const height = canvas.clientHeight || rect.height;

    if (width <= 0 || height <= 0 || !Number.isFinite(width) || !Number.isFinite(height)) {
      return null;
    }

    return {
      devicePixelRatio: window.devicePixelRatio || 1,
      height,
      width,
    };
  };

  const hasDrawingSurfaceChanged = (nextSnapshot: DrawingSurfaceSnapshot): boolean => {
    if (!lastDrawingSurfaceSnapshot) return true;

    return (
      Math.abs(nextSnapshot.width - lastDrawingSurfaceSnapshot.width) > 0.5 ||
      Math.abs(nextSnapshot.height - lastDrawingSurfaceSnapshot.height) > 0.5 ||
      Math.abs(nextSnapshot.devicePixelRatio - lastDrawingSurfaceSnapshot.devicePixelRatio) > 0.001
    );
  };

  const resizeDrawingSurfaceIfNeeded = (instance = rive): boolean => {
    if (!instance || !canvas.isConnected) return false;

    const nextSnapshot = getDrawingSurfaceSnapshot();

    if (!nextSnapshot || !hasDrawingSurfaceChanged(nextSnapshot)) return false;

    instance.resizeDrawingSurfaceToCanvas();
    lastDrawingSurfaceSnapshot = nextSnapshot;

    return true;
  };

  const performGeometrySyncAndResize = async (): Promise<void> => {
    syncMountToFallbackGeometry();

    if (!rive) {
      scheduleLayoutParityCheck();
      return;
    }

    const shouldPaintIdleResize =
      config.mode === 'animation' &&
      isRiveLoaded &&
      isVisualReady &&
      !activationRequested &&
      !isPlaying &&
      canRenderNow();

    if (shouldPaintIdleResize) {
      startRenderingIfAllowed();
    }

    resizeDrawingSurfaceIfNeeded(rive);

    if (shouldPaintIdleResize) {
      idleResizeToken += 1;
      const token = idleResizeToken;

      await waitForAnimationFrames(
        IDLE_RESIZE_FRAME_COUNT,
        idleResizeFrameIds,
        idleResizeCancelResolvers
      );

      if (
        token === idleResizeToken &&
        config.mode === 'animation' &&
        isVisualReady &&
        !activationRequested &&
        !isPlaying &&
        !shouldKeepIdleRendererAlive()
      ) {
        stopRendering();
      }
    }

    scheduleLayoutParityCheck();
  };

  const scheduleGeometrySyncAndResize = (): void => {
    window.cancelAnimationFrame(resizeFrame);

    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = 0;
      void performGeometrySyncAndResize();
    });
  };

  const resolveFallbackImageSettledIfPending = (): void => {
    resolveFallbackImageSettled?.();
    resolveFallbackImageSettled = null;
    fallbackImageSettledPromise = null;
  };

  const removeFallbackImageListeners = (resolvePending = false): void => {
    if (!(fallback instanceof HTMLImageElement) || !hasFallbackImageListeners) return;

    if (fallbackLoadCallback) {
      fallback.removeEventListener('load', fallbackLoadCallback);
    }

    if (fallbackErrorCallback) {
      fallback.removeEventListener('error', fallbackErrorCallback);
    }

    hasFallbackImageListeners = false;
    fallbackLoadCallback = null;
    fallbackErrorCallback = null;

    if (resolvePending) {
      resolveFallbackImageSettledIfPending();
    }
  };

  const handleFallbackImageSettled = (): void => {
    removeFallbackImageListeners();
    resolveFallbackImageSettledIfPending();
    scheduleGeometrySyncAndResize();
  };

  const setupFallbackImageListeners = (): void => {
    if (!(fallback instanceof HTMLImageElement) || fallback.complete || hasFallbackImageListeners) {
      return;
    }

    fallbackImageSettledPromise ??= new Promise((resolve) => {
      resolveFallbackImageSettled = resolve;
    });
    fallbackLoadCallback = handleFallbackImageSettled;
    fallbackErrorCallback = handleFallbackImageSettled;
    fallback.addEventListener('load', fallbackLoadCallback, { once: true });
    fallback.addEventListener('error', fallbackErrorCallback, { once: true });
    hasFallbackImageListeners = true;
  };

  const scheduleLayoutParityCheck = (): void => {
    if (!isDevelopmentHost() || didWarnLayoutParityMismatch) return;

    window.cancelAnimationFrame(layoutParityFrame);

    layoutParityFrame = window.requestAnimationFrame(() => {
      layoutParityFrame = 0;

      if (!isVisualReady || !fallback || !mount || !canvas.isConnected) return;

      const mismatch = getLayoutParityMismatch(fallback, mount, canvas);

      if (!mismatch) return;

      didWarnLayoutParityMismatch = true;
      // eslint-disable-next-line no-console -- Development-only layout parity diagnostic.
      console.warn('Benefit Rive: fallback, mount, and canvas layout boxes differ.', mismatch);
    });
  };

  const schedulePrematureFallbackFadeCheck = (): void => {
    if (
      fallbackMode === 'error-only' ||
      !isDevelopmentHost() ||
      didWarnPrematureFallbackFade ||
      !fallback
    ) {
      return;
    }

    window.cancelAnimationFrame(prematureFadeFrame);

    prematureFadeFrame = window.requestAnimationFrame(() => {
      prematureFadeFrame = 0;

      if (isVisualReady || !fallback.isConnected) return;

      const opacity = Number(window.getComputedStyle(fallback).opacity);

      if (!Number.isFinite(opacity) || opacity > 0.05) return;

      didWarnPrematureFallbackFade = true;
      // eslint-disable-next-line no-console -- Development-only visual readiness diagnostic.
      console.warn('Benefit Rive: fallback faded before the Rive visual frame was ready.', {
        opacity,
      });
    });
  };

  const startRenderingIfAllowed = (allowOffscreen = false): void => {
    if (!rive || document.visibilityState !== 'visible') return;
    if (!allowOffscreen && !isRenderVisible) return;
    if (isRendering) return;

    rive.startRendering();
    isRendering = true;
  };

  const stopRendering = (force = false): void => {
    if (!rive || !isRendering) return;
    if (!force && isRiveLoaded && !isVisualReady) return;

    rive.stopRendering();
    isRendering = false;
  };

  const waitForFallbackImageReadiness = async (): Promise<void> => {
    if (fallbackMode === 'error-only') return;
    if (!(fallback instanceof HTMLImageElement)) return;

    if (!fallback.complete) {
      setupFallbackImageListeners();
      await fallbackImageSettledPromise;
    }

    if (isCleanedUp) return;

    if (typeof fallback.decode === 'function') {
      await fallback.decode().catch(() => undefined);
    }
  };

  const paintIdleFrameThenStop = async (): Promise<void> => {
    cancelIdleFrames();

    if (!rive || !canRenderNow()) {
      stopRendering(true);
      return;
    }

    idleResetToken += 1;
    const token = idleResetToken;

    startRenderingIfAllowed();
    rive.stop(config.mode === 'animation' ? config.animationName : undefined);

    if (config.mode === 'animation') {
      isPlaying = false;
      isPausedForHidden = false;
    }

    syncMountToFallbackGeometry();
    resizeDrawingSurfaceIfNeeded(rive);

    await waitForAnimationFrames(
      IDLE_RESET_FRAME_COUNT,
      idleResetFrameIds,
      idleResetCancelResolvers
    );

    if (
      token === idleResetToken &&
      (!activationRequested || config.mode !== 'animation') &&
      !shouldKeepIdleRendererAlive()
    ) {
      stopRendering();
    }
  };

  const startVisualWarmup = (instance: Rive): void => {
    if (
      isWarmingUp ||
      isVisualReady ||
      !isRiveLoaded ||
      rive !== instance ||
      !canWarmupNow() ||
      isCleanedUp
    ) {
      return;
    }

    visualReadyToken += 1;
    const token = visualReadyToken;

    isWarmingUp = true;

    void (async () => {
      await waitForFallbackImageReadiness();

      if (
        token !== visualReadyToken ||
        rive !== instance ||
        !isRiveLoaded ||
        isCleanedUp ||
        !canWarmupNow()
      ) {
        return;
      }

      syncMountToFallbackGeometry();

      if (config.mode === 'animation') {
        instance.stop(config.animationName);
        isPlaying = false;
        isPausedForHidden = false;
      }

      resizeDrawingSurfaceIfNeeded(instance);
      startRenderingIfAllowed(canWarmupOffscreen());

      await Promise.all([
        waitForAnimationFrames(VISUAL_READY_FRAME_COUNT, warmupFrameIds, warmupCancelResolvers),
        waitForWarmupStabilization(),
      ]);

      if (
        token !== visualReadyToken ||
        rive !== instance ||
        !isRiveLoaded ||
        isCleanedUp ||
        !canWarmupNow()
      ) {
        return;
      }

      syncMountToFallbackGeometry();
      resizeDrawingSurfaceIfNeeded(instance);
      isVisualReady = true;
      isWarmingUp = false;
      root.classList.add('is-rive-visual-ready');
      syncPlayback();
      scheduleLayoutParityCheck();
    })().finally(() => {
      if (token === visualReadyToken && !isVisualReady) {
        isWarmingUp = false;
      }
    });
  };

  const restartVisualWarmupIfNeeded = (): void => {
    if (!rive || !isRiveLoaded || isVisualReady || isWarmingUp || !canWarmupNow()) return;

    startVisualWarmup(rive);
  };

  const unsubscribeBoundaryObserver = (): void => {
    if (boundaryProperty && boundaryCallback) {
      boundaryProperty.off(boundaryCallback);
    }

    boundaryProperty = null;
    boundaryCallback = null;
  };

  const unsubscribeLoopObserver = (): void => {
    if (rive && loopCallback) {
      rive.off(EventType.Loop, loopCallback);
    }

    loopCallback = null;
  };

  const clearBoundaryState = (): void => {
    unsubscribeBoundaryObserver();
    unsubscribeLoopObserver();
    lastBoundaryValue = null;
    pendingGracefulStop = false;
    stopRequestedFromBoundaryValue = null;
  };

  const warnMissingCursorProperty = (propertyName: string): void => {
    if (!isDevelopmentHost() || missingCursorPropertyNames.has(propertyName)) return;

    missingCursorPropertyNames.add(propertyName);
    // eslint-disable-next-line no-console -- Development-only cursor configuration diagnostic.
    console.warn(`Benefit Rive: View Model Boolean "${propertyName}" was not found.`);
  };

  const syncPointerCursor = (): void => {
    const shouldUsePointerCursor =
      config.mode === 'state-machine' &&
      finePointerQuery.matches &&
      pointerCursorSubscriptions.some(({ property }) => property.value);

    canvas.style.cursor = shouldUsePointerCursor ? 'pointer' : '';
  };

  const clearPointerCursorObservers = (): void => {
    pointerCursorSubscriptions.forEach(({ property, callback }) => {
      try {
        property.off(callback);
      } catch {
        // Rive can dispose bound view model values during instance cleanup.
      }
    });
    pointerCursorSubscriptions.length = 0;
    canvas.style.cursor = '';
  };

  const setupPointerCursorObservers = (instance: Rive): void => {
    clearPointerCursorObservers();

    if (config.mode !== 'state-machine' || pointerCursorPropertyNames.length === 0) return;

    const { viewModelInstance } = instance;

    if (!viewModelInstance) return;

    pointerCursorPropertyNames.forEach((propertyName) => {
      let property: ViewModelInstanceBoolean | null = null;

      try {
        property = viewModelInstance.boolean(propertyName);
      } catch {
        property = null;
      }

      if (!property) {
        warnMissingCursorProperty(propertyName);
        return;
      }

      const callback: EventCallback = (): void => {
        syncPointerCursor();
      };

      try {
        property.on(callback);
        pointerCursorSubscriptions.push({ property, callback });
      } catch {
        // Ignore invalid or already disposed values; the cursor simply stays default.
      }
    });

    syncPointerCursor();
  };

  const stopAndResetToIdle = (paintFrame = true): void => {
    if (!rive || config.mode !== 'animation') return;

    cancelIdleFrames();
    isPlaying = false;
    isPausedForHidden = false;
    pendingGracefulStop = false;
    stopRequestedFromBoundaryValue = null;

    if (paintFrame) {
      void paintIdleFrameThenStop();
      return;
    }

    if (!isVisualReady) {
      cancelWarmup();
    }

    rive.stop(config.animationName);
    stopRendering(true);
  };

  const readBoundaryValue = (event: unknown): number | null => {
    if (typeof event === 'number') return event;

    if (event && typeof event === 'object' && 'data' in event) {
      const value = (event as { data?: unknown }).data;

      if (typeof value === 'number') return value;
    }

    return boundaryProperty?.value ?? null;
  };

  const handleBoundaryNotification = (event: unknown): void => {
    if (config.mode !== 'animation') return;

    const nextBoundaryValue = readBoundaryValue(event);

    if (nextBoundaryValue === null || nextBoundaryValue === lastBoundaryValue) return;

    lastBoundaryValue = nextBoundaryValue;

    if (!pendingGracefulStop) return;

    if (activationRequested) {
      pendingGracefulStop = false;
      stopRequestedFromBoundaryValue = null;
      return;
    }

    if (nextBoundaryValue !== stopRequestedFromBoundaryValue) {
      stopAndResetToIdle();
    }
  };

  const isLoopEventForAnimation = (event: unknown): boolean => {
    if (config.mode !== 'animation') return false;

    if (!event || typeof event !== 'object' || !('data' in event)) return true;

    const { data } = event as { data?: unknown };

    if (typeof data === 'string') return data === config.animationName;

    if (Array.isArray(data)) return data.includes(config.animationName);

    if (data && typeof data === 'object' && 'animation' in data) {
      return (data as LoopEvent).animation === config.animationName;
    }

    return true;
  };

  const warnBoundaryFallbackOnce = (): void => {
    if (!isDevelopmentHost() || didWarnBoundaryFallback) return;

    didWarnBoundaryFallback = true;
    console.error(
      `Benefit Rive: View Model Number "${config.mode === 'animation' ? config.boundaryPropertyName : DEFAULT_BOUNDARY_PROPERTY}" was not found. Falling back to loop-boundary stopping.`
    );
  };

  const setupLoopFallback = (): void => {
    if (config.mode !== 'animation' || !rive || loopCallback) return;

    loopCallback = (event): void => {
      if (!pendingGracefulStop || !isLoopEventForAnimation(event)) return;
      if (activationRequested) {
        pendingGracefulStop = false;
        stopRequestedFromBoundaryValue = null;
        return;
      }

      stopAndResetToIdle();
    };

    rive.on(EventType.Loop, loopCallback);
  };

  const resolveBoundaryProperty = (): void => {
    if (config.mode !== 'animation' || !rive) return;

    unsubscribeBoundaryObserver();
    unsubscribeLoopObserver();

    boundaryProperty = rive.viewModelInstance?.number(config.boundaryPropertyName) ?? null;
    lastBoundaryValue = boundaryProperty?.value ?? null;

    if (!boundaryProperty) {
      warnBoundaryFallbackOnce();
      setupLoopFallback();
      return;
    }

    boundaryCallback = (event): void => {
      handleBoundaryNotification(event);
    };

    boundaryProperty.on(boundaryCallback);
  };

  const requestGracefulStop = (): void => {
    if (config.mode !== 'animation' || !rive || !isPlaying) return;

    pendingGracefulStop = true;
    stopRequestedFromBoundaryValue = lastBoundaryValue;
    startRenderingIfAllowed();
  };

  const startTimeline = (): void => {
    if (config.mode !== 'animation' || !rive || isPlaying) return;

    cancelIdleFrames();
    rive.play(config.animationName);
    isPlaying = true;
    isPausedForHidden = false;
    startRenderingIfAllowed();
  };

  const syncAnimationActivation = (): void => {
    if (config.mode !== 'animation' || !rive || !isRiveLoaded) return;

    if (document.visibilityState === 'hidden') {
      cancelWarmup();

      if (isPlaying && !isPausedForHidden) {
        rive.pause(config.animationName);
        isPausedForHidden = true;
      }

      stopRendering(true);
      return;
    }

    if (!isRenderVisible) {
      if (!isVisualReady && canWarmupOffscreen()) {
        restartVisualWarmupIfNeeded();
        return;
      }

      cancelWarmup();
      stopAndResetToIdle(false);
      return;
    }

    if (!isVisualReady) {
      restartVisualWarmupIfNeeded();
      return;
    }

    if (activationRequested) {
      pendingGracefulStop = false;
      stopRequestedFromBoundaryValue = null;

      if (isPausedForHidden) {
        rive.play(config.animationName);
        isPlaying = true;
        isPausedForHidden = false;
        startRenderingIfAllowed();
        return;
      }

      startTimeline();
      return;
    }

    if (pendingGracefulStop) {
      if (isPausedForHidden) {
        rive.play(config.animationName);
        isPlaying = true;
        isPausedForHidden = false;
      }

      startRenderingIfAllowed();
      return;
    }

    if (isPlaying) {
      requestGracefulStop();
      return;
    }

    void paintIdleFrameThenStop();
  };

  const setActivationRequested = (active: boolean): void => {
    if (config.mode !== 'animation') return;

    activationRequested = active;
    syncAnimationActivation();
  };

  const syncStateMachineRendering = (): void => {
    if (config.mode !== 'state-machine' || !rive || !isRiveLoaded) return;

    if (document.visibilityState === 'hidden') {
      cancelWarmup();

      if (!isPausedForHidden) {
        rive.pause();
        isPausedForHidden = true;
      }

      stopRendering(true);
      return;
    }

    if (!isRenderVisible) {
      if (!isVisualReady && canWarmupOffscreen()) {
        restartVisualWarmupIfNeeded();
        return;
      }

      cancelWarmup();

      if (!isPausedForHidden) {
        rive.pause();
        isPausedForHidden = true;
      }

      stopRendering(true);
      return;
    }

    if (!isVisualReady) {
      restartVisualWarmupIfNeeded();
      return;
    }

    if (isPausedForHidden) {
      rive.play();
      isPausedForHidden = false;
    }

    startRenderingIfAllowed();
  };

  const syncPlayback = (): void => {
    if (config.mode === 'animation') {
      syncAnimationActivation();
      return;
    }

    syncStateMachineRendering();
  };

  const cleanupRiveInstance = (clearError = true): void => {
    isCleanedUp = true;
    cancelWarmup();
    cancelIdleFrames();
    window.cancelAnimationFrame(resizeFrame);
    window.cancelAnimationFrame(layoutParityFrame);
    window.cancelAnimationFrame(prematureFadeFrame);
    resizeFrame = 0;
    layoutParityFrame = 0;
    prematureFadeFrame = 0;
    removeFallbackImageListeners(true);
    clearBoundaryState();
    clearPointerCursorObservers();

    if (rive) {
      rive.cleanup();
      rive = null;
    }

    isRiveLoaded = false;
    isVisualReady = false;
    isWarmingUp = false;
    isRendering = false;
    isPlaying = false;
    isPausedForHidden = false;
    pendingGracefulStop = false;
    stopRequestedFromBoundaryValue = null;
    lastDrawingSurfaceSnapshot = null;
    root.classList.remove('is-rive-loading', 'is-rive-ready', 'is-rive-visual-ready');

    if (clearError) {
      root.classList.remove('is-rive-error', 'is-rive-unavailable');
    }

    canvas.removeAttribute('width');
    canvas.removeAttribute('height');
  };

  const applyLoadError = (instance: Rive): void => {
    if (rive !== instance) return;

    cancelWarmup();
    cancelIdleFrames();
    removeFallbackImageListeners(true);
    clearBoundaryState();
    clearPointerCursorObservers();
    instance.cleanup();
    rive = null;
    isRiveLoaded = false;
    isVisualReady = false;
    isWarmingUp = false;
    isRendering = false;
    isPlaying = false;
    isPausedForHidden = false;
    lastDrawingSurfaceSnapshot = null;
    root.classList.remove(
      'is-rive-loading',
      'is-rive-ready',
      'is-rive-unavailable',
      'is-rive-visual-ready'
    );
    root.classList.add('is-rive-error');
  };

  const applyLoadSuccess = (instance: Rive, mountedStateMachineName: string | null): void => {
    if (rive !== instance) return;

    const shouldResetMountedStateMachine =
      config.mode === 'state-machine' && mountedStateMachineName !== activeStateMachineName;

    isRiveLoaded = true;
    isVisualReady = false;
    isWarmingUp = false;
    syncMountToFallbackGeometry();

    if (config.mode === 'animation') {
      resolveBoundaryProperty();
      instance.stop(config.animationName);
      isPlaying = false;
    } else if (!shouldResetMountedStateMachine) {
      setupPointerCursorObservers(instance);
    }

    root.classList.remove('is-rive-loading', 'is-rive-error', 'is-rive-unavailable');
    root.classList.add('is-rive-ready');
    root.classList.remove('is-rive-visual-ready');
    schedulePrematureFallbackFadeCheck();

    if (shouldResetMountedStateMachine) {
      resetActiveStateMachine();
      return;
    }

    startVisualWarmup(instance);
  };

  const resetActiveStateMachine = (): void => {
    if (config.mode !== 'state-machine' || !rive || !isRiveLoaded || !activeStateMachineName) {
      return;
    }

    const instance = rive;

    cancelWarmup();
    cancelIdleFrames();
    stopRendering(true);
    clearPointerCursorObservers();
    isPausedForHidden = false;

    try {
      instance.reset({
        artboard: config.artboardName,
        stateMachines: activeStateMachineName,
        autoplay: true,
        autoBind: true,
      });
      instance.setupRiveListeners({ isTouchScrollEnabled: true });
      setupPointerCursorObservers(instance);
    } catch {
      applyLoadError(instance);
      return;
    }

    syncMountToFallbackGeometry();
    resizeDrawingSurfaceIfNeeded(instance);
    syncPlayback();
    scheduleLayoutParityCheck();
  };

  const mountRive = (): void => {
    if (rive || !isNearViewport) return;

    const src = root.dataset.riveSrc?.trim();

    if (!src || !isValidUrl(src)) {
      applyErrorState(root);
      return;
    }

    root.classList.add('is-rive-loading');
    root.classList.remove('is-rive-error', 'is-rive-unavailable', 'is-rive-visual-ready');
    isCleanedUp = false;
    isRiveLoaded = false;
    isVisualReady = false;
    isWarmingUp = false;
    lastDrawingSurfaceSnapshot = null;
    setupFallbackImageListeners();
    syncMountToFallbackGeometry();

    const mountedStateMachineName = config.mode === 'state-machine' ? activeStateMachineName : null;

    const layout = new Layout({
      fit: layoutConfig.fit,
      alignment: layoutConfig.alignment,
    });

    const params: RiveParameters = {
      src,
      canvas,
      artboard: config.artboardName,
      layout,
      autoplay: config.mode === 'state-machine',
      autoBind: true,
      useOffscreenRenderer: true,
      onLoad: (): void => applyLoadSuccess(instance, mountedStateMachineName),
      onLoadError: (): void => applyLoadError(instance),
    };

    if (config.mode === 'animation') {
      params.animations = config.animationName;
      params.shouldDisableRiveListeners = true;
      params.isTouchScrollEnabled = true;
      params.dispatchPointerExit = false;
    } else {
      if (!mountedStateMachineName) {
        applyErrorState(root);
        return;
      }

      params.stateMachines = mountedStateMachineName;
      params.shouldDisableRiveListeners = false;
      params.isTouchScrollEnabled = true;
      params.dispatchPointerExit = true;
    }

    const instance = new Rive(params);

    rive = instance;
  };

  const isEligible = (): boolean => {
    if (reducedMotionQuery.matches) return false;
    if (devicePolicy === 'all') return true;

    return finePointerQuery.matches;
  };

  const usesDesktopHoverActivation = (): boolean => {
    return (
      config.mode === 'animation' &&
      activationMode === 'hover-or-viewport' &&
      finePointerQuery.matches
    );
  };

  const syncEligibility = (): void => {
    const eligible = isEligible();

    root.classList.toggle('is-rive-eligible', eligible);

    if (!eligible) {
      cleanupRiveInstance();
      applyUnavailableState(root);
      return;
    }

    root.classList.remove('is-rive-unavailable');

    if (isNearViewport) {
      mountRive();
    }

    if (usesDesktopHoverActivation()) {
      setActivationRequested(false);
      return;
    }

    if (config.mode === 'animation' && activationMode === 'hover-or-viewport') {
      setActivationRequested(mobileViewportActive);
      return;
    }

    syncPlayback();
    syncPointerCursor();
  };

  const handleResponsiveStateMachineChange = (): void => {
    if (config.mode !== 'state-machine' || !responsiveStateMachineQuery) return;

    const nextStateMachineName = resolveStateMachineName(config, responsiveStateMachineQuery);

    if (nextStateMachineName === activeStateMachineName) return;

    activeStateMachineName = nextStateMachineName;

    if (!rive) return;

    if (!isEligible()) {
      cleanupRiveInstance();
      return;
    }

    if (!isRiveLoaded) return;

    resetActiveStateMachine();
  };

  const handlePointerEnter = (): void => {
    if (!usesDesktopHoverActivation()) return;

    setActivationRequested(true);
  };

  const handlePointerLeave = (): void => {
    if (!usesDesktopHoverActivation()) return;

    setActivationRequested(false);
  };

  const handleDocumentVisibility = (): void => {
    if (document.visibilityState === 'hidden') {
      cancelPendingRenderStop();
      scheduleRenderVisibilityCheck(true);
    } else {
      scheduleRenderVisibilityCheck();
    }

    syncPlayback();
  };

  const getPreloadVerticalMarginPx = (): number => {
    if (preloadMode !== 'nearby') {
      if (!mobilePreloadQuery.matches) return DEFAULT_DESKTOP_PRELOAD_ROOT_MARGIN_PX;

      return Math.max(
        DEFAULT_DESKTOP_PRELOAD_ROOT_MARGIN_PX,
        Math.round(getViewportHeight() * DEFAULT_MOBILE_PRELOAD_VIEWPORTS)
      );
    }

    return Math.round(
      getViewportHeight() * getNearbyPreloadViewports(root, mobilePreloadQuery.matches)
    );
  };

  const getPreloadRootMargin = (): string => {
    return `${getPreloadVerticalMarginPx()}px 0px`;
  };

  const disconnectPreloadObserver = (): void => {
    preloadObserver?.disconnect();
    preloadObserver = null;
  };

  const removePreloadScrollGuard = (): void => {
    if (preloadScrollCallback) {
      window.removeEventListener('scroll', preloadScrollCallback);
    }

    window.cancelAnimationFrame(preloadScrollFrame);
    preloadScrollFrame = 0;
    preloadScrollCallback = null;
  };

  const hasSatisfiedPreloadMinScroll = (): boolean => {
    if (hasMetPreloadMinScroll) return true;

    if (mobilePreloadQuery.matches) {
      hasMetPreloadMinScroll = true;
      return true;
    }

    if (isElementActuallyVisible(root)) {
      hasMetPreloadMinScroll = true;
      return true;
    }

    if (
      minScrollPreloadViewports !== null &&
      getCurrentScrollY() >= getViewportHeight() * minScrollPreloadViewports
    ) {
      hasMetPreloadMinScroll = true;
      return true;
    }

    return false;
  };

  const beginPreload = (): void => {
    if (isNearViewport) return;

    prefetchRiveSource(root.dataset.riveSrc);
    isNearViewport = true;
    disconnectPreloadObserver();
    removePreloadScrollGuard();
    syncEligibility();
  };

  const checkPreloadScrollGuard = (): void => {
    if (!hasSatisfiedPreloadMinScroll()) return;

    removePreloadScrollGuard();

    if (
      isWithinPreloadArea ||
      isElementWithinVerticalViewportMargin(root, getPreloadVerticalMarginPx())
    ) {
      prefetchRiveSource(root.dataset.riveSrc);
      beginPreload();
    }
  };

  const schedulePreloadScrollGuardCheck = (): void => {
    if (preloadScrollFrame) return;

    preloadScrollFrame = window.requestAnimationFrame(() => {
      preloadScrollFrame = 0;
      checkPreloadScrollGuard();
    });
  };

  const ensurePreloadScrollGuard = (): void => {
    if (preloadScrollCallback || hasMetPreloadMinScroll) return;

    preloadScrollCallback = schedulePreloadScrollGuardCheck;
    window.addEventListener('scroll', preloadScrollCallback, { passive: true });
  };

  const handlePreloadIntersection = ([entry]: IntersectionObserverEntry[]): void => {
    isWithinPreloadArea = Boolean(entry?.isIntersecting);

    if (!isWithinPreloadArea) return;

    prefetchRiveSource(root.dataset.riveSrc);

    if (!hasSatisfiedPreloadMinScroll()) {
      ensurePreloadScrollGuard();
      return;
    }

    beginPreload();
  };

  const createPreloadObserver = (): void => {
    if (isNearViewport) return;

    disconnectPreloadObserver();
    preloadObserver = new IntersectionObserver(handlePreloadIntersection, {
      rootMargin: getPreloadRootMargin(),
    });
    preloadObserver.observe(root);
  };

  const schedulePreloadObserverRefresh = (): void => {
    if (isNearViewport) return;

    window.cancelAnimationFrame(preloadResizeFrame);
    preloadResizeFrame = window.requestAnimationFrame(() => {
      preloadResizeFrame = 0;
      createPreloadObserver();

      if (preloadScrollCallback) {
        schedulePreloadScrollGuardCheck();
      }
    });
  };

  const handleViewportResize = (): void => {
    scheduleGeometrySyncAndResize();
    schedulePreloadObserverRefresh();
    scheduleRenderVisibilityObserverRefresh();
  };

  const handleVisualViewportScroll = (): void => {
    scheduleRenderVisibilityCheck();
  };

  const handlePreloadMediaChange = (): void => {
    schedulePreloadObserverRefresh();
  };

  const getRenderRetainedMarginPx = (): number => {
    return Math.round(getViewportHeight() * RENDER_RETAINED_VIEWPORTS);
  };

  const getRenderRootMargin = (): string => {
    return `${getRenderRetainedMarginPx()}px 0px`;
  };

  const isWithinRetainedRenderArea = (): boolean => {
    return (
      canvas.isConnected &&
      isElementWithinVerticalViewportMargin(canvas, getRenderRetainedMarginPx())
    );
  };

  const cancelPendingRenderStop = (): void => {
    window.clearTimeout(renderStopTimeout);
    renderStopTimeout = 0;
  };

  const applyRenderVisibilityOutside = (force = false): void => {
    if (force) {
      cancelPendingRenderStop();
      isRenderVisible = false;
      cancelWarmup();

      if (isCleanedUp || document.visibilityState === 'hidden' || !canvas.isConnected) {
        stopRendering(true);
        return;
      }

      syncPlayback();
      stopRendering(true);
      return;
    }

    if (renderStopTimeout) return;

    renderStopTimeout = window.setTimeout(() => {
      renderStopTimeout = 0;

      if (
        isCleanedUp ||
        document.visibilityState === 'hidden' ||
        !canvas.isConnected ||
        !isWithinRetainedRenderArea()
      ) {
        isRenderVisible = false;
        cancelWarmup();
        syncPlayback();
        return;
      }

      isRenderVisible = true;
      syncPlayback();
    }, RENDER_STOP_DELAY_MS);
  };

  const updateRenderVisibility = (forceOutside = false): void => {
    if (
      forceOutside ||
      isCleanedUp ||
      document.visibilityState === 'hidden' ||
      !canvas.isConnected
    ) {
      applyRenderVisibilityOutside(true);
      return;
    }

    if (!isWithinRetainedRenderArea()) {
      applyRenderVisibilityOutside();
      return;
    }

    cancelPendingRenderStop();

    if (!isRenderVisible) {
      isRenderVisible = true;
    }

    syncPlayback();
  };

  const scheduleRenderVisibilityCheck = (forceOutside = false): void => {
    window.cancelAnimationFrame(renderVisibilityFrame);

    renderVisibilityFrame = window.requestAnimationFrame(() => {
      renderVisibilityFrame = 0;
      updateRenderVisibility(forceOutside);
    });
  };

  const disconnectRenderVisibilityObserver = (): void => {
    renderVisibilityObserver?.disconnect();
    renderVisibilityObserver = null;
  };

  const createRenderVisibilityObserver = (): void => {
    disconnectRenderVisibilityObserver();

    renderVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          updateRenderVisibility();
          return;
        }

        scheduleRenderVisibilityCheck();
      },
      {
        rootMargin: getRenderRootMargin(),
        threshold: RENDER_VISIBILITY_THRESHOLD,
      }
    );

    renderVisibilityObserver.observe(canvas);
    scheduleRenderVisibilityCheck();
  };

  const scheduleRenderVisibilityObserverRefresh = (): void => {
    window.cancelAnimationFrame(renderVisibilityRefreshFrame);

    renderVisibilityRefreshFrame = window.requestAnimationFrame(() => {
      renderVisibilityRefreshFrame = 0;
      createRenderVisibilityObserver();
    });
  };

  const mobileActivationObserver = new IntersectionObserver(
    ([entry]) => {
      if (config.mode !== 'animation' || activationMode !== 'hover-or-viewport') return;

      const ratio = entry?.intersectionRatio ?? 0;
      const isCompletelyOffscreen = !entry?.isIntersecting || ratio <= 0;

      mobileViewportActive = ratio >= config.viewportThreshold;

      if (usesDesktopHoverActivation()) return;

      if (isCompletelyOffscreen) {
        setActivationRequested(false);
        stopAndResetToIdle(false);
        return;
      }

      setActivationRequested(mobileViewportActive);
    },
    {
      threshold: [
        0,
        config.mode === 'animation' ? config.viewportThreshold : DEFAULT_VIEWPORT_THRESHOLD,
      ],
    }
  );

  const resizeObserver = new ResizeObserver(() => {
    scheduleGeometrySyncAndResize();
  });

  const cleanup = (): void => {
    disconnectPreloadObserver();
    removePreloadScrollGuard();
    window.cancelAnimationFrame(preloadResizeFrame);
    preloadResizeFrame = 0;
    disconnectRenderVisibilityObserver();
    window.cancelAnimationFrame(renderVisibilityFrame);
    window.cancelAnimationFrame(renderVisibilityRefreshFrame);
    renderVisibilityFrame = 0;
    renderVisibilityRefreshFrame = 0;
    cancelPendingRenderStop();
    mobileActivationObserver.disconnect();
    resizeObserver.disconnect();
    finePointerQuery.removeEventListener('change', syncEligibility);
    mobilePreloadQuery.removeEventListener('change', handlePreloadMediaChange);
    reducedMotionQuery.removeEventListener('change', syncEligibility);
    responsiveStateMachineQuery?.removeEventListener('change', handleResponsiveStateMachineChange);
    document.removeEventListener('visibilitychange', handleDocumentVisibility);
    trigger?.removeEventListener('pointerenter', handlePointerEnter);
    trigger?.removeEventListener('pointerleave', handlePointerLeave);
    window.removeEventListener('resize', handleViewportResize);
    window.removeEventListener('orientationchange', handleViewportResize);
    window.visualViewport?.removeEventListener('resize', handleViewportResize);
    window.visualViewport?.removeEventListener('scroll', handleVisualViewportScroll);
    cleanupRiveInstance();
  };

  setupFallbackImageListeners();
  syncMountToFallbackGeometry();
  createPreloadObserver();
  createRenderVisibilityObserver();
  mobileActivationObserver.observe(root);
  resizeObserver.observe(root);

  if (fallback) {
    resizeObserver.observe(fallback);
  }

  finePointerQuery.addEventListener('change', syncEligibility);
  mobilePreloadQuery.addEventListener('change', handlePreloadMediaChange);
  reducedMotionQuery.addEventListener('change', syncEligibility);
  responsiveStateMachineQuery?.addEventListener('change', handleResponsiveStateMachineChange);
  document.addEventListener('visibilitychange', handleDocumentVisibility);
  trigger?.addEventListener('pointerenter', handlePointerEnter);
  trigger?.addEventListener('pointerleave', handlePointerLeave);
  window.addEventListener('resize', handleViewportResize);
  window.addEventListener('orientationchange', handleViewportResize);
  window.visualViewport?.addEventListener('resize', handleViewportResize);
  window.visualViewport?.addEventListener('scroll', handleVisualViewportScroll, {
    passive: true,
  });
  window.addEventListener('pagehide', cleanup, { once: true });

  syncEligibility();
}

function getBenefitKey(root: HTMLElement): string {
  return root.getAttribute('data-benefit-rive')?.trim() || 'experience';
}

function getMatchingChild(
  root: HTMLElement,
  selector: string,
  attributeName: string,
  value: string
): HTMLElement | null {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));

  return (
    elements.find((element) => element.getAttribute(attributeName) === value) ?? elements[0] ?? null
  );
}

function getMountElement(root: HTMLElement, key: string): HTMLElement | null {
  return (
    getMatchingChild(root, MOUNT_SELECTOR, 'data-benefit-rive-mount', key) ??
    root.querySelector<HTMLElement>(LEGACY_MOUNT_SELECTOR)
  );
}

function getFallbackElement(root: HTMLElement, key: string): HTMLElement | null {
  return (
    getMatchingChild(root, FALLBACK_SELECTOR, 'data-benefit-rive-fallback', key) ??
    root.querySelector<HTMLElement>(LEGACY_FALLBACK_SELECTOR)
  );
}

function getTriggerElement(root: HTMLElement, key: string): HTMLElement | null {
  const closestTrigger = root.closest<HTMLElement>(TRIGGER_SELECTOR);

  if (closestTrigger?.getAttribute('data-benefit-rive-trigger') === key) {
    return closestTrigger;
  }

  return (
    Array.from(document.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR)).find(
      (trigger) => trigger.getAttribute('data-benefit-rive-trigger') === key
    ) ?? null
  );
}

function prepareFallbackImage(fallback: HTMLElement | null): void {
  if (!fallback) return;

  fallback.setAttribute('aria-hidden', 'true');

  if (!(fallback instanceof HTMLImageElement)) return;

  if (!fallback.hasAttribute('alt')) {
    fallback.alt = '';
  }

  fallback.loading = 'eager';
  fallback.decoding = 'async';
  fallback.setAttribute('fetchpriority', 'high');

  const hasUsableSource = Boolean(
    fallback.currentSrc.trim() || fallback.getAttribute('src')?.trim()
  );

  if (hasUsableSource) return;

  const fallbackSource = fallback.getAttribute('src-fallback')?.trim();

  if (fallbackSource && isValidUrl(fallbackSource)) {
    fallback.src = fallbackSource;
  }
}

function prepareCanvas(mount: HTMLElement): HTMLCanvasElement {
  const ownedCanvases = Array.from(
    mount.querySelectorAll<HTMLCanvasElement>('canvas[data-benefit-rive-canvas]')
  );
  const canvas =
    ownedCanvases[0] ??
    mount.querySelector<HTMLCanvasElement>('canvas') ??
    document.createElement('canvas');

  canvas.dataset.benefitRiveCanvas = '';
  canvas.setAttribute('aria-hidden', 'true');

  if (!canvas.parentElement) {
    mount.appendChild(canvas);
  }

  ownedCanvases.slice(1).forEach((duplicateCanvas) => {
    duplicateCanvas.remove();
  });

  return canvas;
}

function getOptionalAttribute(root: HTMLElement, attributeName: string): string | null {
  return root.getAttribute(attributeName)?.trim() || null;
}

function getCursorPropertyNames(root: HTMLElement): string[] {
  const value = root.getAttribute(CURSOR_PROPERTIES_ATTRIBUTE);

  if (!value) return [];

  return Array.from(
    new Set(
      value
        .split(',')
        .map((propertyName) => propertyName.trim())
        .filter(Boolean)
    )
  );
}

function getPlaybackConfig(root: HTMLElement): PlaybackConfig | null {
  const explicitPlayback = getOptionalAttribute(root, 'data-rive-playback');
  const animationName = getOptionalAttribute(root, 'data-rive-animation');
  const stateMachineName = getValidatedRiveAttribute(root, 'data-rive-state-machine');
  const desktopStateMachineName = getValidatedRiveAttribute(
    root,
    'data-rive-state-machine-desktop'
  );
  const mobileStateMachineName = getValidatedRiveAttribute(root, 'data-rive-state-machine-mobile');
  const artboardName = getOptionalAttribute(root, 'data-rive-artboard');
  let mode: PlaybackMode | null = null;

  if (explicitPlayback === 'animation' || explicitPlayback === 'state-machine') {
    mode = explicitPlayback;
  } else if (animationName) {
    mode = 'animation';
  } else if (stateMachineName) {
    mode = 'state-machine';
  }

  if (!mode || !artboardName) return null;

  if (mode === 'animation') {
    if (!animationName) return null;

    return {
      animationName,
      artboardName,
      boundaryPropertyName:
        root.getAttribute('data-rive-boundary-property')?.trim() || DEFAULT_BOUNDARY_PROPERTY,
      mode,
      viewportThreshold: getViewportThreshold(root),
    };
  }

  if (!stateMachineName) return null;

  const hasResponsiveStateMachine = Boolean(desktopStateMachineName || mobileStateMachineName);

  return {
    artboardName,
    mode,
    ...(hasResponsiveStateMachine
      ? {
          responsiveStateMachine: {
            desktopName: desktopStateMachineName,
            mobileName: mobileStateMachineName,
            query:
              getValidatedRiveAttribute(root, 'data-rive-state-machine-query') ??
              DEFAULT_STATE_MACHINE_QUERY,
          },
        }
      : {}),
    stateMachineName,
  };
}

function resolveStateMachineName(
  config: StateMachineConfig,
  mediaQuery: MediaQueryList | null
): string {
  if (!config.responsiveStateMachine || !mediaQuery) return config.stateMachineName;

  const responsiveStateMachineName = mediaQuery.matches
    ? config.responsiveStateMachine.desktopName
    : config.responsiveStateMachine.mobileName;

  return responsiveStateMachineName ?? config.stateMachineName;
}

function getValidatedRiveAttribute(root: HTMLElement, attributeName: string): string | null {
  const value = getOptionalAttribute(root, attributeName);

  if (!value) return null;
  if (value !== attributeName) return value;

  warnMalformedRiveAttribute(root, attributeName);

  return null;
}

function warnMalformedRiveAttribute(root: HTMLElement, attributeName: string): void {
  if (!isDevelopmentHost()) return;

  let warnedAttributes = malformedAttributeWarnings.get(root);

  if (!warnedAttributes) {
    warnedAttributes = new Set<string>();
    malformedAttributeWarnings.set(root, warnedAttributes);
  }

  if (warnedAttributes.has(attributeName)) return;

  warnedAttributes.add(attributeName);
  // eslint-disable-next-line no-console -- Development-only Webflow attribute diagnostic.
  console.warn(
    `Benefit Rive: ignoring malformed placeholder ${attributeName}="${attributeName}". Replace it with a real Rive value.`,
    { attributeName, root }
  );
}

function getDevicePolicy(root: HTMLElement): DevicePolicy {
  return root.getAttribute('data-rive-device')?.trim() === 'all' ? 'all' : 'fine-pointer';
}

function getActivationMode(root: HTMLElement, config: PlaybackConfig): ActivationMode {
  const activation = root.getAttribute('data-rive-activation')?.trim();

  if (activation === 'hover-or-viewport') return activation;
  if (activation === 'internal') return activation;

  return config.mode === 'animation' ? 'hover-or-viewport' : 'internal';
}

function getViewportThreshold(root: HTMLElement): number {
  const value = Number(root.getAttribute('data-rive-viewport-threshold'));

  if (!Number.isFinite(value) || value <= 0 || value > 1) {
    return DEFAULT_VIEWPORT_THRESHOLD;
  }

  return value;
}

function getFallbackMode(root: HTMLElement): FallbackMode {
  return root.getAttribute('data-rive-fallback-mode')?.trim() === 'error-only'
    ? 'error-only'
    : 'fallback-first';
}

function getPreloadMode(root: HTMLElement): PreloadMode {
  return root.getAttribute('data-rive-preload')?.trim() === 'nearby' ? 'nearby' : 'default';
}

function getIdleRenderPolicy(root: HTMLElement): IdleRenderPolicy {
  return root.getAttribute('data-rive-idle-render')?.trim() === 'continuous'
    ? 'continuous'
    : 'stop';
}

function getNearbyPreloadViewports(root: HTMLElement, useMobileDefault: boolean): number {
  const attributeValue = getOptionalAttribute(root, 'data-rive-preload-viewports');
  const defaultValue = useMobileDefault
    ? DEFAULT_MOBILE_PRELOAD_VIEWPORTS
    : DEFAULT_DESKTOP_NEARBY_PRELOAD_VIEWPORTS;

  if (!attributeValue) {
    return defaultValue;
  }

  const value = Number(attributeValue);

  if (!Number.isFinite(value)) {
    return defaultValue;
  }

  return clamp(
    value,
    useMobileDefault ? MIN_MOBILE_PRELOAD_VIEWPORTS : MIN_NEARBY_PRELOAD_VIEWPORTS,
    MAX_NEARBY_PRELOAD_VIEWPORTS
  );
}

function getPreloadMinScrollViewports(root: HTMLElement): number | null {
  const attributeValue = getOptionalAttribute(root, 'data-rive-preload-min-scroll-viewports');

  if (!attributeValue) return null;

  const value = Number(attributeValue);

  if (!Number.isFinite(value) || value <= 0) return null;

  return clamp(value, MIN_NEARBY_PRELOAD_VIEWPORTS, MAX_NEARBY_PRELOAD_VIEWPORTS);
}

function getResolvedLayoutConfig(root: HTMLElement): ResolvedLayoutConfig {
  const fitValue = root.getAttribute('data-rive-fit')?.trim().toLowerCase();
  const alignmentValue = (
    root.getAttribute('data-rive-alignment') ??
    root.getAttribute('data-rive-alignement') ??
    ''
  )
    .trim()
    .toLowerCase();
  const resolvedFit = fitValue
    ? (FIT_MAP[fitValue] ?? DEFAULT_LAYOUT_CONFIG)
    : DEFAULT_LAYOUT_CONFIG;
  const resolvedAlignment = alignmentValue
    ? (ALIGNMENT_MAP[alignmentValue] ?? DEFAULT_LAYOUT_CONFIG)
    : DEFAULT_LAYOUT_CONFIG;

  return {
    alignment: resolvedAlignment.alignment,
    fit: resolvedFit.fit,
    objectFit: resolvedFit.objectFit,
    objectPosition: resolvedAlignment.objectPosition,
  };
}

function applyLayoutCssVariables(root: HTMLElement, layoutConfig: ResolvedLayoutConfig): void {
  root.style.setProperty('--benefit-rive-object-fit', layoutConfig.objectFit);
  root.style.setProperty('--benefit-rive-object-position', layoutConfig.objectPosition);
}

function syncMountToFallbackGeometryBox(
  root: HTMLElement,
  mount: HTMLElement,
  fallback: HTMLElement | null
): boolean {
  if (
    !fallback ||
    !root.isConnected ||
    !mount.isConnected ||
    !fallback.isConnected ||
    isPendingImage(fallback)
  ) {
    applyFullRootMountGeometry(mount);
    return false;
  }

  const rootRect = root.getBoundingClientRect();
  const fallbackRect = fallback.getBoundingClientRect();
  const rootLayoutWidth = root.offsetWidth || rootRect.width;
  const rootLayoutHeight = root.offsetHeight || rootRect.height;
  const scaleX = rootLayoutWidth > 0 ? rootRect.width / rootLayoutWidth : 1;
  const scaleY = rootLayoutHeight > 0 ? rootRect.height / rootLayoutHeight : 1;

  if (
    rootRect.width <= 0 ||
    rootRect.height <= 0 ||
    fallbackRect.width <= 0 ||
    fallbackRect.height <= 0 ||
    !Number.isFinite(scaleX) ||
    !Number.isFinite(scaleY) ||
    scaleX <= 0 ||
    scaleY <= 0
  ) {
    applyFullRootMountGeometry(mount);
    return false;
  }

  const left = (fallbackRect.left - rootRect.left) / scaleX;
  const top = (fallbackRect.top - rootRect.top) / scaleY;
  const width = fallbackRect.width / scaleX;
  const height = fallbackRect.height / scaleY;

  if (![left, top, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
    applyFullRootMountGeometry(mount);
    return false;
  }

  mount.style.left = `${left}px`;
  mount.style.top = `${top}px`;
  mount.style.width = `${width}px`;
  mount.style.height = `${height}px`;
  mount.style.right = 'auto';
  mount.style.bottom = 'auto';

  return true;
}

function applyFullRootMountGeometry(mount: HTMLElement): void {
  mount.style.left = '0px';
  mount.style.top = '0px';
  mount.style.width = '100%';
  mount.style.height = '100%';
  mount.style.right = 'auto';
  mount.style.bottom = 'auto';
}

function getViewportHeight(): number {
  return Math.max(window.innerHeight || document.documentElement.clientHeight || 0, 0);
}

function getViewportWidth(): number {
  return Math.max(window.innerWidth || document.documentElement.clientWidth || 0, 0);
}

function getCurrentScrollY(): number {
  return Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop, 0);
}

function isElementActuallyVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.top < getViewportHeight() &&
    rect.right > 0 &&
    rect.left < getViewportWidth()
  );
}

function isElementWithinVerticalViewportMargin(element: Element, marginPx: number): boolean {
  const rect = element.getBoundingClientRect();

  return (
    rect.bottom >= -marginPx &&
    rect.top <= getViewportHeight() + marginPx &&
    rect.right >= 0 &&
    rect.left <= getViewportWidth()
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isPendingImage(element: HTMLElement): boolean {
  return element instanceof HTMLImageElement && !element.complete;
}

function getLayoutParityMismatch(
  fallback: HTMLElement,
  mount: HTMLElement,
  canvas: HTMLCanvasElement
): {
  canvas: RectSnapshot;
  fallback: RectSnapshot;
  mount: RectSnapshot;
  tolerance: number;
} | null {
  const fallbackRect = getRectSnapshot(fallback);
  const mountRect = getRectSnapshot(mount);
  const canvasRect = getRectSnapshot(canvas);

  if (
    isRectWithinTolerance(fallbackRect, mountRect) &&
    isRectWithinTolerance(mountRect, canvasRect) &&
    canvasRect.width > 0 &&
    canvasRect.height > 0
  ) {
    return null;
  }

  return {
    canvas: canvasRect,
    fallback: fallbackRect,
    mount: mountRect,
    tolerance: LAYOUT_PARITY_TOLERANCE,
  };
}

function getRectSnapshot(element: Element): RectSnapshot {
  const { height, left, top, width } = element.getBoundingClientRect();

  return { height, left, top, width };
}

function isRectWithinTolerance(rect: RectSnapshot, targetRect: RectSnapshot): boolean {
  return (
    Math.abs(rect.width - targetRect.width) <= LAYOUT_PARITY_TOLERANCE &&
    Math.abs(rect.height - targetRect.height) <= LAYOUT_PARITY_TOLERANCE &&
    Math.abs(rect.top - targetRect.top) <= LAYOUT_PARITY_TOLERANCE &&
    Math.abs(rect.left - targetRect.left) <= LAYOUT_PARITY_TOLERANCE
  );
}

function isDevelopmentHost(): boolean {
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
}

function prefetchRiveSource(source: string | null | undefined): void {
  const value = source?.trim();

  if (!value || !isValidUrl(value)) return;

  const { href } = new URL(value, document.baseURI);

  if (prefetchedRiveSources.has(href)) return;

  prefetchedRiveSources.add(href);

  const link = document.createElement('link');

  link.rel = 'prefetch';
  link.href = href;
  link.as = 'fetch';

  document.head.append(link);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value, document.baseURI);

    return url.protocol === 'https:' || url.protocol === 'http:' || url.protocol === 'data:';
  } catch {
    return false;
  }
}

function applyErrorState(root: HTMLElement): void {
  root.classList.remove(
    'is-rive-loading',
    'is-rive-ready',
    'is-rive-unavailable',
    'is-rive-visual-ready'
  );
  root.classList.add('is-rive-error');
}

function applyUnavailableState(root: HTMLElement): void {
  root.classList.remove(
    'is-rive-loading',
    'is-rive-ready',
    'is-rive-error',
    'is-rive-visual-ready'
  );
  root.classList.add('is-rive-unavailable');
}
