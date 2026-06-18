import {
  Alignment,
  type EventCallback,
  EventType,
  Fit,
  Layout,
  type LoopEvent,
  Rive,
  type RiveParameters,
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
const PRELOAD_ROOT_MARGIN = '400px 0px';
const RENDER_VISIBILITY_THRESHOLD = 0.01;
const DEFAULT_VIEWPORT_THRESHOLD = 0.35;
const DEFAULT_BOUNDARY_PROPERTY = 'pulseBoundary';
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

type StateMachineConfig = {
  artboardName: string;
  mode: 'state-machine';
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
  'bottom-center': { alignment: Alignment.BottomCenter, objectPosition: 'center bottom' },
  'bottom-left': { alignment: Alignment.BottomLeft, objectPosition: 'left bottom' },
  'bottom-right': { alignment: Alignment.BottomRight, objectPosition: 'right bottom' },
  'center-left': { alignment: Alignment.CenterLeft, objectPosition: 'left center' },
  'center-right': { alignment: Alignment.CenterRight, objectPosition: 'right center' },
  'top-center': { alignment: Alignment.TopCenter, objectPosition: 'center top' },
  'top-left': { alignment: Alignment.TopLeft, objectPosition: 'left top' },
  'top-right': { alignment: Alignment.TopRight, objectPosition: 'right top' },
};

let didWarnBoundaryFallback = false;

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
  const mount = getMountElement(root, key);

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

  const finePointerQuery = window.matchMedia(FINE_POINTER_QUERY);
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const devicePolicy = getDevicePolicy(root);
  const activationMode = getActivationMode(root, config);
  const trigger = getTriggerElement(root, key);

  let rive: Rive | null = null;
  let boundaryProperty: ViewModelInstanceNumber | null = null;
  let boundaryCallback: EventCallback | null = null;
  let loopCallback: EventCallback | null = null;
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
    return document.visibilityState === 'visible' && isRenderVisible;
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

    rive.resizeDrawingSurfaceToCanvas();

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
        !isPlaying
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
    if (!isDevelopmentHost() || didWarnPrematureFallbackFade || !fallback) return;

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

  const startRenderingIfAllowed = (): void => {
    if (!rive || document.visibilityState !== 'visible' || !isRenderVisible) return;
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
    rive.resizeDrawingSurfaceToCanvas();

    await waitForAnimationFrames(
      IDLE_RESET_FRAME_COUNT,
      idleResetFrameIds,
      idleResetCancelResolvers
    );

    if (token === idleResetToken && (!activationRequested || config.mode !== 'animation')) {
      stopRendering();
    }
  };

  const startVisualWarmup = (instance: Rive): void => {
    if (
      isWarmingUp ||
      isVisualReady ||
      !isRiveLoaded ||
      rive !== instance ||
      !canRenderNow() ||
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
        !canRenderNow()
      ) {
        return;
      }

      syncMountToFallbackGeometry();

      if (config.mode === 'animation') {
        instance.stop(config.animationName);
        isPlaying = false;
        isPausedForHidden = false;
      }

      instance.resizeDrawingSurfaceToCanvas();
      startRenderingIfAllowed();

      await Promise.all([
        waitForAnimationFrames(VISUAL_READY_FRAME_COUNT, warmupFrameIds, warmupCancelResolvers),
        waitForWarmupStabilization(),
      ]);

      if (
        token !== visualReadyToken ||
        rive !== instance ||
        !isRiveLoaded ||
        isCleanedUp ||
        !canRenderNow()
      ) {
        return;
      }

      syncMountToFallbackGeometry();
      instance.resizeDrawingSurfaceToCanvas();
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
    if (!rive || !isRiveLoaded || isVisualReady || isWarmingUp || !canRenderNow()) return;

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

    if (document.visibilityState === 'hidden' || !isRenderVisible) {
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
    root.classList.remove('is-rive-loading', 'is-rive-ready', 'is-rive-visual-ready');

    if (clearError) {
      root.classList.remove('is-rive-error');
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
    instance.cleanup();
    rive = null;
    isRiveLoaded = false;
    isVisualReady = false;
    isWarmingUp = false;
    isRendering = false;
    isPlaying = false;
    isPausedForHidden = false;
    root.classList.remove('is-rive-loading', 'is-rive-ready', 'is-rive-visual-ready');
    root.classList.add('is-rive-error');
  };

  const applyLoadSuccess = (instance: Rive): void => {
    if (rive !== instance) return;

    isRiveLoaded = true;
    isVisualReady = false;
    isWarmingUp = false;
    syncMountToFallbackGeometry();

    if (config.mode === 'animation') {
      resolveBoundaryProperty();
      instance.stop(config.animationName);
      isPlaying = false;
    }

    root.classList.remove('is-rive-loading', 'is-rive-error');
    root.classList.add('is-rive-ready');
    root.classList.remove('is-rive-visual-ready');
    schedulePrematureFallbackFadeCheck();
    startVisualWarmup(instance);
  };

  const mountRive = (): void => {
    if (rive || !isNearViewport) return;

    const src = root.dataset.riveSrc?.trim();

    if (!src || !isValidUrl(src)) {
      applyErrorState(root);
      return;
    }

    root.classList.add('is-rive-loading');
    root.classList.remove('is-rive-error', 'is-rive-visual-ready');
    isCleanedUp = false;
    isRiveLoaded = false;
    isVisualReady = false;
    isWarmingUp = false;
    setupFallbackImageListeners();
    syncMountToFallbackGeometry();

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
      onLoad: (): void => applyLoadSuccess(instance),
      onLoadError: (): void => applyLoadError(instance),
    };

    if (config.mode === 'animation') {
      params.animations = config.animationName;
      params.shouldDisableRiveListeners = true;
      params.isTouchScrollEnabled = true;
      params.dispatchPointerExit = false;
    } else {
      params.stateMachines = config.stateMachineName;
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
      return;
    }

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
    syncPlayback();
  };

  const preloadObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;

      isNearViewport = true;
      preloadObserver.disconnect();
      syncEligibility();
    },
    { rootMargin: PRELOAD_ROOT_MARGIN }
  );

  const renderVisibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isRenderVisible = Boolean(entry?.isIntersecting);

      if (!isRenderVisible) {
        cancelWarmup();

        if (config.mode !== 'animation') {
          syncPlayback();
          return;
        }

        stopAndResetToIdle(false);
        return;
      }

      syncPlayback();
    },
    { threshold: RENDER_VISIBILITY_THRESHOLD }
  );

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
    preloadObserver.disconnect();
    renderVisibilityObserver.disconnect();
    mobileActivationObserver.disconnect();
    resizeObserver.disconnect();
    finePointerQuery.removeEventListener('change', syncEligibility);
    reducedMotionQuery.removeEventListener('change', syncEligibility);
    document.removeEventListener('visibilitychange', handleDocumentVisibility);
    trigger?.removeEventListener('pointerenter', handlePointerEnter);
    trigger?.removeEventListener('pointerleave', handlePointerLeave);
    window.removeEventListener('resize', scheduleGeometrySyncAndResize);
    window.removeEventListener('orientationchange', scheduleGeometrySyncAndResize);
    cleanupRiveInstance();
  };

  setupFallbackImageListeners();
  syncMountToFallbackGeometry();
  preloadObserver.observe(root);
  renderVisibilityObserver.observe(root);
  mobileActivationObserver.observe(root);
  resizeObserver.observe(root);

  if (fallback) {
    resizeObserver.observe(fallback);
  }

  finePointerQuery.addEventListener('change', syncEligibility);
  reducedMotionQuery.addEventListener('change', syncEligibility);
  document.addEventListener('visibilitychange', handleDocumentVisibility);
  trigger?.addEventListener('pointerenter', handlePointerEnter);
  trigger?.addEventListener('pointerleave', handlePointerLeave);
  window.addEventListener('resize', scheduleGeometrySyncAndResize);
  window.addEventListener('orientationchange', scheduleGeometrySyncAndResize);
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

function getPlaybackConfig(root: HTMLElement): PlaybackConfig | null {
  const explicitPlayback = root.getAttribute('data-rive-playback')?.trim();
  const animationName = root.getAttribute('data-rive-animation')?.trim();
  const stateMachineName = root.getAttribute('data-rive-state-machine')?.trim();
  const artboardName = root.getAttribute('data-rive-artboard')?.trim();
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

  return {
    artboardName,
    mode,
    stateMachineName,
  };
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

function getResolvedLayoutConfig(root: HTMLElement): ResolvedLayoutConfig {
  const fitValue = root.getAttribute('data-rive-fit')?.trim().toLowerCase();
  const alignmentValue = root.getAttribute('data-rive-alignment')?.trim().toLowerCase();
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

function isPendingImage(element: HTMLElement): boolean {
  return element instanceof HTMLImageElement && !element.complete;
}

function getLayoutParityMismatch(
  fallback: HTMLElement,
  mount: HTMLElement,
  canvas: HTMLCanvasElement
): { canvas: RectSnapshot; fallback: RectSnapshot; mount: RectSnapshot; tolerance: number } | null {
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

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value, document.baseURI);

    return url.protocol === 'https:' || url.protocol === 'http:' || url.protocol === 'data:';
  } catch {
    return false;
  }
}

function applyErrorState(root: HTMLElement): void {
  root.classList.remove('is-rive-loading', 'is-rive-ready', 'is-rive-visual-ready');
  root.classList.add('is-rive-error');
}
