type StatueShineGsapTarget = Element | Element[];

type StatueShineTweenVars = Record<string, unknown>;

type StatueShineTimeline = {
  kill: () => void;

  to: (
    target: StatueShineGsapTarget,
    vars: StatueShineTweenVars,
    position?: number | string
  ) => StatueShineTimeline;
};

type StatueShineGsap = {
  killTweensOf: (target: StatueShineGsapTarget) => void;

  set: (target: StatueShineGsapTarget, vars: StatueShineTweenVars) => void;

  timeline: (config?: StatueShineTweenVars) => StatueShineTimeline;
};

type StatueShineWindow = Window & {
  gsap?: StatueShineGsap;
};

type StatueShineComponent = HTMLElement & {
  __tsaStatueShineCleanup?: () => void;
};

type StatueShineController = {
  component: StatueShineComponent;
  trigger: HTMLElement;
  overlay: HTMLElement;

  gsap: StatueShineGsap;
  timeline: StatueShineTimeline | null;

  reducedMotionQuery: MediaQueryList;

  pointerX: number | null;
  pointerY: number | null;

  currentXPercent: number;
  currentYPercent: number;

  targetXPercent: number;
  targetYPercent: number;

  animationFrame: number;
  previousFrameTime: number;

  isActive: boolean;
};

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: () => void) => void;
  removeListener?: (listener: () => void) => void;
};

const STATUE_SHINE_VERSION = '3.0.0';

const STATUE_SHINE_SELECTORS = {
  component: '[data-tsa-statue-shine="component"]',
  trigger: '[data-tsa-statue-shine="trigger"]',
  overlay: '[data-tsa-statue-shine="overlay"]',
} as const;

const OVERLAY_ACTIVE_OPACITY_PROPERTY = '--tsa-overlay-active-opacity';

/*
  Main tuning controls.
*/
const STATUE_SHINE_CONFIG = {
  /*
    Final opacity of the overlay inside the masked area.
  */
  activeOpacity: 1,

  /*
    Opacity transition speeds.
  */
  enterDuration: 0.26,
  exitDuration: 0.3,

  /*
    Higher values follow the cursor more tightly.

    14 = soft and cinematic
    18 = balanced
    22 = responsive but still smooth
    30 = almost directly attached to the pointer
  */
  followSpeed: 14,

  /*
    Optional percentage offset from the real pointer position.

    Keep both at 0 for exact cursor alignment.
  */
  cursorOffsetXPercent: 0,
  cursorOffsetYPercent: 0,

  /*
    Adds a small amount of extra hit area around the statue.
    Keep at 0 for the exact rendered image rectangle.
  */
  hitAreaPaddingPx: 0,
} as const;

function getRuntimeGsap(): StatueShineGsap | null {
  return (window as StatueShineWindow).gsap ?? null;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function getOverlayActiveOpacity(element: HTMLElement): number {
  const rawOpacity = window
    .getComputedStyle(element)
    .getPropertyValue(OVERLAY_ACTIVE_OPACITY_PROPERTY)
    .trim();

  if (!rawOpacity) {
    return STATUE_SHINE_CONFIG.activeOpacity;
  }

  const activeOpacity = Number(rawOpacity);

  if (!Number.isFinite(activeOpacity)) {
    return STATUE_SHINE_CONFIG.activeOpacity;
  }

  return clamp(activeOpacity, 0, 1);
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

function moveOverlayAboveTrigger(trigger: HTMLElement, overlay: HTMLElement): void {
  if (
    trigger.parentElement &&
    trigger.parentElement === overlay.parentElement &&
    trigger.nextElementSibling !== overlay
  ) {
    trigger.insertAdjacentElement('afterend', overlay);
  }
}

function killCurrentAnimation(controller: StatueShineController): void {
  controller.timeline?.kill();
  controller.timeline = null;

  controller.gsap.killTweensOf(controller.overlay);
}

function updateMaskPosition(controller: StatueShineController): void {
  controller.overlay.style.setProperty(
    '--tsa-statue-shine-x',
    `${controller.currentXPercent.toFixed(3)}%`
  );

  controller.overlay.style.setProperty(
    '--tsa-statue-shine-y',
    `${controller.currentYPercent.toFixed(3)}%`
  );
}

function stopPositionAnimation(controller: StatueShineController): void {
  if (controller.animationFrame === 0) {
    return;
  }

  window.cancelAnimationFrame(controller.animationFrame);
  controller.animationFrame = 0;
  controller.previousFrameTime = 0;
}

function renderSmoothPosition(controller: StatueShineController, currentTime: number): void {
  controller.animationFrame = 0;

  /*
    Reduced motion keeps the local shine behavior but removes
    cursor lag.
  */
  if (controller.reducedMotionQuery.matches) {
    controller.currentXPercent = controller.targetXPercent;

    controller.currentYPercent = controller.targetYPercent;

    updateMaskPosition(controller);
    controller.previousFrameTime = currentTime;

    return;
  }

  const previousTime = controller.previousFrameTime || currentTime;

  const deltaSeconds = Math.min(Math.max((currentTime - previousTime) / 1000, 0), 0.05);

  controller.previousFrameTime = currentTime;

  /*
    Frame-rate-independent exponential interpolation.
  */
  const interpolation = 1 - Math.exp(-STATUE_SHINE_CONFIG.followSpeed * deltaSeconds);

  controller.currentXPercent +=
    (controller.targetXPercent - controller.currentXPercent) * interpolation;

  controller.currentYPercent +=
    (controller.targetYPercent - controller.currentYPercent) * interpolation;

  updateMaskPosition(controller);

  const xDistance = Math.abs(controller.targetXPercent - controller.currentXPercent);

  const yDistance = Math.abs(controller.targetYPercent - controller.currentYPercent);

  const stillMoving = xDistance > 0.015 || yDistance > 0.015;

  if (stillMoving) {
    controller.animationFrame = window.requestAnimationFrame((time) => {
      renderSmoothPosition(controller, time);
    });
  } else {
    controller.currentXPercent = controller.targetXPercent;

    controller.currentYPercent = controller.targetYPercent;

    updateMaskPosition(controller);
  }
}

function schedulePositionAnimation(controller: StatueShineController): void {
  if (controller.animationFrame !== 0) {
    return;
  }

  controller.animationFrame = window.requestAnimationFrame((time) => {
    renderSmoothPosition(controller, time);
  });
}

function setInitialPosition(
  controller: StatueShineController,
  xPercent: number,
  yPercent: number
): void {
  stopPositionAnimation(controller);

  controller.currentXPercent = xPercent;
  controller.currentYPercent = yPercent;

  controller.targetXPercent = xPercent;
  controller.targetYPercent = yPercent;

  updateMaskPosition(controller);
}

function showStatueShine(controller: StatueShineController): void {
  killCurrentAnimation(controller);

  const activeOpacity = getOverlayActiveOpacity(controller.overlay);

  controller.gsap.set(controller.overlay, {
    visibility: 'visible',
  });

  if (controller.reducedMotionQuery.matches) {
    controller.gsap.set(controller.overlay, {
      opacity: activeOpacity,
    });

    return;
  }

  const timeline = controller.gsap.timeline({
    defaults: {
      overwrite: 'auto',
    },
  });

  controller.timeline = timeline;

  timeline.to(
    controller.overlay,
    {
      opacity: activeOpacity,
      duration: STATUE_SHINE_CONFIG.enterDuration,
      ease: 'power2.out',
    },
    0
  );
}

function hideStatueShine(controller: StatueShineController): void {
  killCurrentAnimation(controller);

  if (controller.reducedMotionQuery.matches) {
    controller.gsap.set(controller.overlay, {
      opacity: 0,
      visibility: 'hidden',
    });

    return;
  }

  const timeline = controller.gsap.timeline({
    defaults: {
      overwrite: 'auto',
    },
  });

  controller.timeline = timeline;

  timeline.to(
    controller.overlay,
    {
      opacity: 0,
      duration: STATUE_SHINE_CONFIG.exitDuration,
      ease: 'power2.out',

      onComplete: () => {
        if (controller.isActive) {
          return;
        }

        controller.gsap.set(controller.overlay, {
          opacity: 0,
          visibility: 'hidden',
        });
      },
    },
    0
  );
}

function setActiveState(controller: StatueShineController, active: boolean): void {
  if (active === controller.isActive) {
    return;
  }

  controller.isActive = active;

  if (active) {
    showStatueShine(controller);
  } else {
    hideStatueShine(controller);
  }
}

function calculatePointerPosition(controller: StatueShineController): {
  inside: boolean;
  xPercent: number;
  yPercent: number;
} {
  const { pointerX, pointerY, trigger } = controller;

  if (pointerX === null || pointerY === null) {
    return {
      inside: false,
      xPercent: controller.targetXPercent,
      yPercent: controller.targetYPercent,
    };
  }

  const rect = trigger.getBoundingClientRect();

  if (rect.width <= 1 || rect.height <= 1) {
    return {
      inside: false,
      xPercent: controller.targetXPercent,
      yPercent: controller.targetYPercent,
    };
  }

  const padding = STATUE_SHINE_CONFIG.hitAreaPaddingPx;

  const inside =
    pointerX >= rect.left - padding &&
    pointerX <= rect.right + padding &&
    pointerY >= rect.top - padding &&
    pointerY <= rect.bottom + padding;

  const rawXPercent = ((pointerX - rect.left) / rect.width) * 100;

  const rawYPercent = ((pointerY - rect.top) / rect.height) * 100;

  const xPercent = clamp(rawXPercent + STATUE_SHINE_CONFIG.cursorOffsetXPercent, 0, 100);

  const yPercent = clamp(rawYPercent + STATUE_SHINE_CONFIG.cursorOffsetYPercent, 0, 100);

  return {
    inside,
    xPercent,
    yPercent,
  };
}

function processPointerPosition(controller: StatueShineController): void {
  const position = calculatePointerPosition(controller);

  if (!position.inside) {
    setActiveState(controller, false);
    return;
  }

  controller.targetXPercent = position.xPercent;
  controller.targetYPercent = position.yPercent;

  /*
    On first entry, place the mask directly under the pointer.

    This prevents it from flying in from the center or from the
    location used during the previous hover.
  */
  if (!controller.isActive) {
    setInitialPosition(controller, position.xPercent, position.yPercent);

    setActiveState(controller, true);
    return;
  }

  schedulePositionAnimation(controller);
}

function initializeStatueShineComponent(
  component: StatueShineComponent,
  gsap: StatueShineGsap
): void {
  if (component.dataset.tsaStatueShineReady === STATUE_SHINE_VERSION) {
    return;
  }

  component.__tsaStatueShineCleanup?.();

  const trigger = component.querySelector<HTMLElement>(STATUE_SHINE_SELECTORS.trigger);

  const overlay = component.querySelector<HTMLElement>(STATUE_SHINE_SELECTORS.overlay);

  if (!trigger || !overlay) {
    console.warn('[TSA Statue Shine] Required elements are missing.', {
      component,
      trigger,
      overlay,
    });

    return;
  }

  moveOverlayAboveTrigger(trigger, overlay);

  overlay.setAttribute('aria-hidden', 'true');

  if (overlay instanceof HTMLImageElement) {
    overlay.alt = '';
    overlay.draggable = false;
  }

  const controller: StatueShineController = {
    component,
    trigger,
    overlay,

    gsap,
    timeline: null,

    reducedMotionQuery: window.matchMedia('(prefers-reduced-motion: reduce)'),

    pointerX: null,
    pointerY: null,

    currentXPercent: 50,
    currentYPercent: 50,

    targetXPercent: 50,
    targetYPercent: 50,

    animationFrame: 0,
    previousFrameTime: 0,

    isActive: false,
  };

  gsap.set(overlay, {
    opacity: 0,
    visibility: 'hidden',
  });

  updateMaskPosition(controller);

  const handlePointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch') {
      controller.pointerX = null;
      controller.pointerY = null;

      setActiveState(controller, false);
      return;
    }

    controller.pointerX = event.clientX;
    controller.pointerY = event.clientY;

    processPointerPosition(controller);
  };

  const handlePointerExit = (): void => {
    controller.pointerX = null;
    controller.pointerY = null;

    setActiveState(controller, false);
  };

  const handleViewportChange = (): void => {
    /*
      Recalculate the statue rectangle while scrolling or after
      responsive layout changes.
    */
    processPointerPosition(controller);
  };

  const handleVisibilityChange = (): void => {
    if (document.hidden) {
      handlePointerExit();
    }
  };

  const handleReducedMotionChange = (): void => {
    if (controller.isActive) {
      controller.currentXPercent = controller.targetXPercent;

      controller.currentYPercent = controller.targetYPercent;

      updateMaskPosition(controller);
      showStatueShine(controller);
    } else {
      gsap.set(controller.overlay, {
        opacity: 0,
        visibility: 'hidden',
      });
    }
  };

  document.addEventListener('pointermove', handlePointerMove, {
    passive: true,
  });

  document.addEventListener('mouseleave', handlePointerExit);

  document.addEventListener('visibilitychange', handleVisibilityChange);

  window.addEventListener('blur', handlePointerExit);

  window.addEventListener('scroll', handleViewportChange, {
    passive: true,
  });

  window.addEventListener('resize', handleViewportChange, {
    passive: true,
  });

  addMediaQueryChangeListener(controller.reducedMotionQuery, handleReducedMotionChange);

  component.dataset.tsaStatueShineReady = STATUE_SHINE_VERSION;

  const cleanup = (): void => {
    stopPositionAnimation(controller);
    killCurrentAnimation(controller);

    document.removeEventListener('pointermove', handlePointerMove);

    document.removeEventListener('mouseleave', handlePointerExit);

    document.removeEventListener('visibilitychange', handleVisibilityChange);

    window.removeEventListener('blur', handlePointerExit);

    window.removeEventListener('scroll', handleViewportChange);

    window.removeEventListener('resize', handleViewportChange);

    removeMediaQueryChangeListener(controller.reducedMotionQuery, handleReducedMotionChange);

    delete component.dataset.tsaStatueShineReady;
    delete component.__tsaStatueShineCleanup;
  };

  component.__tsaStatueShineCleanup = cleanup;
}

export function initTsaStatueShine(): void {
  const gsap = getRuntimeGsap();

  if (!gsap) {
    console.error('[TSA Statue Shine] GSAP is missing. Enable the Webflow GSAP integration first.');

    return;
  }

  document
    .querySelectorAll<StatueShineComponent>(STATUE_SHINE_SELECTORS.component)
    .forEach((component) => {
      initializeStatueShineComponent(component, gsap);
    });
}
