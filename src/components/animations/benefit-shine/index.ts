type BenefitShineGsapTarget = Element | Element[];

type BenefitShineTweenVars = {
  duration?: number;
  ease?: string;
  onComplete?: () => void;
  opacity?: number;
  overwrite?: boolean | 'auto';
  visibility?: string;
};

type BenefitShineTween = {
  kill: () => void;
};

type BenefitShineGsap = {
  killTweensOf: (target: BenefitShineGsapTarget) => void;
  set: (target: BenefitShineGsapTarget, vars: BenefitShineTweenVars) => void;
  to: (target: BenefitShineGsapTarget, vars: BenefitShineTweenVars) => BenefitShineTween;
};

type BenefitShineWindow = Window & {
  gsap?: BenefitShineGsap;
};

type BenefitShineComponent = HTMLElement & {
  __tsaBenefitShineCleanup?: () => void;
};

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: () => void) => void;
  removeListener?: (listener: () => void) => void;
};

type BenefitShineSettings = {
  activeOpacity: number;
  enterDuration: number;
  exitDuration: number;
  followSpeed: number;
  radiusX: string;
  radiusY: string;
  offsetXPercent: number;
  offsetYPercent: number;
  coordinateMinPercent: number;
  coordinateMaxPercent: number;
};

type BenefitShineOverlayController = {
  element: HTMLElement;
  overlayId: string;
  settings: BenefitShineSettings;

  currentXPercent: number;
  currentYPercent: number;
  targetXPercent: number;
  targetYPercent: number;

  activeOpacityAnimation: BenefitShineTween | null;
  hasPointerPosition: boolean;
  isActive: boolean;
  isPositionAnimating: boolean;
};

type BenefitShineComponentController = {
  component: BenefitShineComponent;
  trigger: HTMLElement;
  overlays: BenefitShineOverlayController[];
  cleanupCallbacks: Array<() => void>;

  gsap: BenefitShineGsap | null;
  reducedMotionQuery: MediaQueryList;

  animationFrame: number;
  isPointerActive: boolean;
  previousFrameTime: number;
};

const BENEFIT_SHINE_VERSION = '1.0.0';

const BENEFIT_SHINE_SELECTORS = {
  component: '[data-tsa-benefit-shine="component"]',
  trigger: '[data-tsa-benefit-shine="trigger"]',
  overlay: '[data-tsa-benefit-shine="overlay"]',
} as const;

const DEFAULT_BENEFIT_SHINE_SETTINGS: BenefitShineSettings = {
  activeOpacity: 0.82,
  enterDuration: 0.26,
  exitDuration: 0.3,
  followSpeed: 22,
  radiusX: 'clamp(3.25rem, 4.5vw, 4.75rem)',
  radiusY: 'clamp(4rem, 5.5vw, 6rem)',
  offsetXPercent: 0,
  offsetYPercent: 0,
  coordinateMinPercent: -100,
  coordinateMaxPercent: 200,
};

const BENEFIT_SHINE_SETTINGS: Record<string, Partial<BenefitShineSettings>> = {
  'definitive-logo': {},
  'definitive-text': {},
  'definitive-accent': {},
};

const POSITION_SETTLE_THRESHOLD = 0.015;
const MAX_FRAME_DELTA_SECONDS = 0.05;

let didWarnInvalidOverlayImage = false;

function getRuntimeGsap(): BenefitShineGsap | null {
  return (window as BenefitShineWindow).gsap ?? null;
}

function getBenefitShineSettings(overlayId: string): BenefitShineSettings {
  return {
    ...DEFAULT_BENEFIT_SHINE_SETTINGS,
    ...(BENEFIT_SHINE_SETTINGS[overlayId] ?? {}),
  };
}

function addMediaQueryChangeListener(query: MediaQueryList, listener: () => void): void {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return;
  }

  (query as LegacyMediaQueryList).addListener?.(listener);
}

function removeMediaQueryChangeListener(query: MediaQueryList, listener: () => void): void {
  if (typeof query.removeEventListener === 'function') {
    query.removeEventListener('change', listener);
    return;
  }

  (query as LegacyMediaQueryList).removeListener?.(listener);
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function supportsRadialMask(): boolean {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return false;
  }

  return (
    CSS.supports('-webkit-mask-image', 'radial-gradient(circle, #000, transparent)') ||
    CSS.supports('mask-image', 'radial-gradient(circle, #000, transparent)')
  );
}

function isDevelopmentHost(): boolean {
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
}

function warnInvalidOverlayImageIfNeeded(image: HTMLImageElement, overlayId: string): void {
  if (!isDevelopmentHost() || didWarnInvalidOverlayImage) {
    return;
  }

  if (!image.complete || image.naturalWidth > 0) {
    return;
  }

  didWarnInvalidOverlayImage = true;

  // eslint-disable-next-line no-console -- Development-only diagnostic for missing Webflow image source.
  console.warn('[TSA Benefit Shine] Overlay image has no valid source.', {
    image,
    overlayId,
  });
}

function killOpacityAnimation(
  overlay: BenefitShineOverlayController,
  gsap: BenefitShineGsap | null
): void {
  overlay.activeOpacityAnimation?.kill();
  overlay.activeOpacityAnimation = null;

  gsap?.killTweensOf(overlay.element);
}

function setOverlayHidden(overlay: BenefitShineOverlayController): void {
  overlay.element.style.opacity = '0';
  overlay.element.style.visibility = 'hidden';
}

function setOverlayVisible(overlay: BenefitShineOverlayController): void {
  overlay.element.style.visibility = 'visible';
  overlay.element.style.opacity = String(overlay.settings.activeOpacity);
}

function showOverlay(
  controller: BenefitShineComponentController,
  overlay: BenefitShineOverlayController
): void {
  if (overlay.isActive) {
    return;
  }

  overlay.isActive = true;

  killOpacityAnimation(overlay, controller.gsap);

  if (!controller.gsap || controller.reducedMotionQuery.matches) {
    setOverlayVisible(overlay);
    return;
  }

  controller.gsap.set(overlay.element, {
    visibility: 'visible',
  });

  overlay.activeOpacityAnimation = controller.gsap.to(overlay.element, {
    duration: overlay.settings.enterDuration,
    ease: 'power2.out',
    opacity: overlay.settings.activeOpacity,
    overwrite: 'auto',

    onComplete: () => {
      overlay.activeOpacityAnimation = null;
    },
  });
}

function hideOverlay(
  controller: BenefitShineComponentController,
  overlay: BenefitShineOverlayController
): void {
  if (!overlay.isActive) {
    setOverlayHidden(overlay);
    return;
  }

  overlay.isActive = false;
  overlay.isPositionAnimating = false;

  killOpacityAnimation(overlay, controller.gsap);

  if (!controller.gsap || controller.reducedMotionQuery.matches) {
    setOverlayHidden(overlay);
    return;
  }

  overlay.activeOpacityAnimation = controller.gsap.to(overlay.element, {
    duration: overlay.settings.exitDuration,
    ease: 'power2.out',
    opacity: 0,
    overwrite: 'auto',

    onComplete: () => {
      overlay.activeOpacityAnimation = null;

      if (overlay.isActive) {
        return;
      }

      controller.gsap?.set(overlay.element, {
        opacity: 0,
        visibility: 'hidden',
      });
    },
  });
}

function updateMaskPosition(overlay: BenefitShineOverlayController): void {
  overlay.element.style.setProperty(
    '--tsa-benefit-shine-x',
    `${overlay.currentXPercent.toFixed(3)}%`
  );

  overlay.element.style.setProperty(
    '--tsa-benefit-shine-y',
    `${overlay.currentYPercent.toFixed(3)}%`
  );
}

function setInitialPosition(
  overlay: BenefitShineOverlayController,
  xPercent: number,
  yPercent: number
): void {
  overlay.currentXPercent = xPercent;
  overlay.currentYPercent = yPercent;
  overlay.targetXPercent = xPercent;
  overlay.targetYPercent = yPercent;
  overlay.hasPointerPosition = true;
  overlay.isPositionAnimating = false;

  updateMaskPosition(overlay);
}

function calculateOverlayPointerPosition(
  overlay: BenefitShineOverlayController,
  event: PointerEvent
): { xPercent: number; yPercent: number } | null {
  const rect = overlay.element.getBoundingClientRect();

  if (rect.width <= 1 || rect.height <= 1) {
    return null;
  }

  const rawXPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const rawYPercent = ((event.clientY - rect.top) / rect.height) * 100;

  return {
    xPercent: clamp(
      rawXPercent + overlay.settings.offsetXPercent,
      overlay.settings.coordinateMinPercent,
      overlay.settings.coordinateMaxPercent
    ),
    yPercent: clamp(
      rawYPercent + overlay.settings.offsetYPercent,
      overlay.settings.coordinateMinPercent,
      overlay.settings.coordinateMaxPercent
    ),
  };
}

function stopPositionAnimation(controller: BenefitShineComponentController): void {
  if (controller.animationFrame === 0) {
    return;
  }

  window.cancelAnimationFrame(controller.animationFrame);
  controller.animationFrame = 0;
  controller.previousFrameTime = 0;

  controller.overlays.forEach((overlay) => {
    overlay.isPositionAnimating = false;
  });
}

function renderPositionFrame(
  controller: BenefitShineComponentController,
  currentTime: number
): void {
  controller.animationFrame = 0;

  if (!controller.isPointerActive) {
    controller.previousFrameTime = 0;
    return;
  }

  const previousTime = controller.previousFrameTime || currentTime;
  const deltaSeconds = Math.min(
    Math.max((currentTime - previousTime) / 1000, 0),
    MAX_FRAME_DELTA_SECONDS
  );

  controller.previousFrameTime = currentTime;

  let stillMoving = false;

  controller.overlays.forEach((overlay) => {
    if (!overlay.isPositionAnimating) {
      return;
    }

    if (controller.reducedMotionQuery.matches) {
      overlay.currentXPercent = overlay.targetXPercent;
      overlay.currentYPercent = overlay.targetYPercent;
      overlay.isPositionAnimating = false;

      updateMaskPosition(overlay);
      return;
    }

    const interpolation = 1 - Math.exp(-overlay.settings.followSpeed * deltaSeconds);

    overlay.currentXPercent += (overlay.targetXPercent - overlay.currentXPercent) * interpolation;
    overlay.currentYPercent += (overlay.targetYPercent - overlay.currentYPercent) * interpolation;

    updateMaskPosition(overlay);

    const xDistance = Math.abs(overlay.targetXPercent - overlay.currentXPercent);
    const yDistance = Math.abs(overlay.targetYPercent - overlay.currentYPercent);

    if (xDistance > POSITION_SETTLE_THRESHOLD || yDistance > POSITION_SETTLE_THRESHOLD) {
      stillMoving = true;
      return;
    }

    overlay.currentXPercent = overlay.targetXPercent;
    overlay.currentYPercent = overlay.targetYPercent;
    overlay.isPositionAnimating = false;

    updateMaskPosition(overlay);
  });

  if (!stillMoving) {
    controller.previousFrameTime = 0;
    return;
  }

  controller.animationFrame = window.requestAnimationFrame((time) => {
    renderPositionFrame(controller, time);
  });
}

function schedulePositionAnimation(controller: BenefitShineComponentController): void {
  if (controller.animationFrame !== 0) {
    return;
  }

  controller.animationFrame = window.requestAnimationFrame((time) => {
    renderPositionFrame(controller, time);
  });
}

function updateOverlayTargets(
  controller: BenefitShineComponentController,
  event: PointerEvent,
  initializeCurrentPosition: boolean
): void {
  let shouldAnimate = false;

  controller.overlays.forEach((overlay) => {
    const position = calculateOverlayPointerPosition(overlay, event);

    if (!position) {
      return;
    }

    overlay.targetXPercent = position.xPercent;
    overlay.targetYPercent = position.yPercent;

    const hadPointerPosition = overlay.hasPointerPosition;

    if (initializeCurrentPosition || !overlay.hasPointerPosition) {
      setInitialPosition(overlay, position.xPercent, position.yPercent);

      if (!hadPointerPosition && controller.isPointerActive) {
        showOverlay(controller, overlay);
      }

      return;
    }

    if (controller.reducedMotionQuery.matches) {
      setInitialPosition(overlay, position.xPercent, position.yPercent);
      return;
    }

    overlay.isPositionAnimating = true;
    shouldAnimate = true;
  });

  if (shouldAnimate) {
    schedulePositionAnimation(controller);
  }
}

function showAllOverlays(controller: BenefitShineComponentController): void {
  controller.overlays.forEach((overlay) => {
    if (!overlay.hasPointerPosition) {
      return;
    }

    showOverlay(controller, overlay);
  });
}

function hideAllOverlays(controller: BenefitShineComponentController): void {
  stopPositionAnimation(controller);

  controller.overlays.forEach((overlay) => {
    hideOverlay(controller, overlay);
  });
}

function prepareOverlay(element: HTMLElement): BenefitShineOverlayController {
  const overlayId = element.getAttribute('data-tsa-benefit-shine-id')?.trim() || 'default';
  const settings = getBenefitShineSettings(overlayId);

  element.setAttribute('aria-hidden', 'true');
  element.style.setProperty('--tsa-benefit-shine-radius-x', settings.radiusX);
  element.style.setProperty('--tsa-benefit-shine-radius-y', settings.radiusY);

  if (element instanceof HTMLImageElement) {
    element.alt = '';
    element.draggable = false;
    element.setAttribute('draggable', 'false');
    warnInvalidOverlayImageIfNeeded(element, overlayId);
  }

  const overlay: BenefitShineOverlayController = {
    element,
    overlayId,
    settings,

    currentXPercent: 50,
    currentYPercent: 50,
    targetXPercent: 50,
    targetYPercent: 50,

    activeOpacityAnimation: null,
    hasPointerPosition: false,
    isActive: false,
    isPositionAnimating: false,
  };

  updateMaskPosition(overlay);
  setOverlayHidden(overlay);

  return overlay;
}

function clearOverlayInlineProperties(overlay: BenefitShineOverlayController): void {
  overlay.element.style.removeProperty('--tsa-benefit-shine-x');
  overlay.element.style.removeProperty('--tsa-benefit-shine-y');
  overlay.element.style.removeProperty('--tsa-benefit-shine-radius-x');
  overlay.element.style.removeProperty('--tsa-benefit-shine-radius-y');
}

function initializeBenefitShineComponent(component: BenefitShineComponent): void {
  if (component.dataset.tsaBenefitShineReady === BENEFIT_SHINE_VERSION) {
    return;
  }

  component.__tsaBenefitShineCleanup?.();

  const trigger = component.querySelector<HTMLElement>(BENEFIT_SHINE_SELECTORS.trigger);
  const overlayElements = Array.from(
    component.querySelectorAll<HTMLElement>(BENEFIT_SHINE_SELECTORS.overlay)
  );

  if (!trigger || overlayElements.length === 0) {
    // eslint-disable-next-line no-console -- Required structure warning for misconfigured Webflow markup.
    console.warn('[TSA Benefit Shine] Required elements are missing.', {
      component,
      overlays: overlayElements,
      trigger,
    });

    return;
  }

  const overlays = overlayElements.map(prepareOverlay);
  const controller: BenefitShineComponentController = {
    component,
    trigger,
    overlays,
    cleanupCallbacks: [],

    gsap: getRuntimeGsap(),
    reducedMotionQuery: window.matchMedia('(prefers-reduced-motion: reduce)'),

    animationFrame: 0,
    isPointerActive: false,
    previousFrameTime: 0,
  };

  if (!supportsRadialMask()) {
    component.dataset.tsaBenefitShineReady = BENEFIT_SHINE_VERSION;

    component.__tsaBenefitShineCleanup = () => {
      overlays.forEach((overlay) => {
        killOpacityAnimation(overlay, controller.gsap);
        setOverlayHidden(overlay);
        clearOverlayInlineProperties(overlay);
      });

      delete component.dataset.tsaBenefitShineReady;
      delete component.__tsaBenefitShineCleanup;
    };

    return;
  }

  const handlePointerEnter = (event: PointerEvent): void => {
    if (event.pointerType === 'touch') {
      return;
    }

    controller.isPointerActive = true;
    controller.previousFrameTime = 0;

    updateOverlayTargets(controller, event, true);
    showAllOverlays(controller);
  };

  const handlePointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch') {
      return;
    }

    if (!controller.isPointerActive) {
      controller.isPointerActive = true;
      updateOverlayTargets(controller, event, true);
      showAllOverlays(controller);
      return;
    }

    updateOverlayTargets(controller, event, false);
  };

  const handlePointerExit = (): void => {
    controller.isPointerActive = false;
    controller.previousFrameTime = 0;

    hideAllOverlays(controller);
  };

  const handleVisibilityChange = (): void => {
    if (document.hidden) {
      handlePointerExit();
    }
  };

  const handleReducedMotionChange = (): void => {
    stopPositionAnimation(controller);

    controller.overlays.forEach((overlay) => {
      if (!overlay.isActive) {
        killOpacityAnimation(overlay, controller.gsap);
        setOverlayHidden(overlay);
        return;
      }

      killOpacityAnimation(overlay, controller.gsap);
      setInitialPosition(overlay, overlay.targetXPercent, overlay.targetYPercent);
      setOverlayVisible(overlay);
    });
  };

  trigger.addEventListener('pointerenter', handlePointerEnter, {
    passive: true,
  });

  trigger.addEventListener('pointermove', handlePointerMove, {
    passive: true,
  });

  trigger.addEventListener('pointerleave', handlePointerExit);
  trigger.addEventListener('pointercancel', handlePointerExit);

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handlePointerExit);
  addMediaQueryChangeListener(controller.reducedMotionQuery, handleReducedMotionChange);

  controller.cleanupCallbacks.push(
    () => {
      trigger.removeEventListener('pointerenter', handlePointerEnter);
      trigger.removeEventListener('pointermove', handlePointerMove);
      trigger.removeEventListener('pointerleave', handlePointerExit);
      trigger.removeEventListener('pointercancel', handlePointerExit);
    },
    () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handlePointerExit);
      removeMediaQueryChangeListener(controller.reducedMotionQuery, handleReducedMotionChange);
    }
  );

  component.dataset.tsaBenefitShineReady = BENEFIT_SHINE_VERSION;

  const cleanup = (): void => {
    stopPositionAnimation(controller);

    controller.cleanupCallbacks.splice(0).forEach((callback) => {
      callback();
    });

    overlays.forEach((overlay) => {
      killOpacityAnimation(overlay, controller.gsap);
      setOverlayHidden(overlay);
      clearOverlayInlineProperties(overlay);
    });

    delete component.dataset.tsaBenefitShineReady;
    delete component.__tsaBenefitShineCleanup;
  };

  component.__tsaBenefitShineCleanup = cleanup;
}

export function initBenefitShine(): void {
  document
    .querySelectorAll<BenefitShineComponent>(BENEFIT_SHINE_SELECTORS.component)
    .forEach((component) => {
      initializeBenefitShineComponent(component);
    });
}
