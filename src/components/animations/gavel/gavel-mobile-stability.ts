const GAVEL_COMPONENT_SELECTOR = '[data-gavel-component]';
const GAVEL_SCOPE_SELECTOR = '[data-gavel-scope]';
const PATCH_FLAG = '__tsaGavelMobileStabilityInstalled';
const POLL_INTERVAL_MS = 40;
const MAX_WAIT_MS = 3200;

const ACTIVE_MOBILE_STATES = new Set(['waiting', 'playing', 'holding', 'returning']);

type GavelStateSnapshot = {
  mobileStatus: string | null;
  progress: number;
};

type GavelPublicApi = {
  refresh: (index?: number) => void;
  state: (index?: number) => GavelStateSnapshot | null;
};

type ScrollTriggerCallback = (...args: unknown[]) => void;

type ScrollTriggerVars = {
  onEnter?: ScrollTriggerCallback;
  onEnterBack?: ScrollTriggerCallback;
  onLeave?: ScrollTriggerCallback;
  onLeaveBack?: ScrollTriggerCallback;
  onRefresh?: ScrollTriggerCallback;
  onRefreshInit?: ScrollTriggerCallback;
  scrub?: unknown;
  trigger?: Element | string;
  [key: string]: unknown;
};

type ScrollTriggerInstance = {
  kill: (...args: unknown[]) => unknown;
};

type ScrollTriggerRuntime = {
  create: (vars: ScrollTriggerVars) => ScrollTriggerInstance;
};

type StabilityWindow = Window & {
  ScrollTrigger?: ScrollTriggerRuntime;
  TSAGavel?: GavelPublicApi;
  Webflow?: { push: (callback: () => void) => unknown };
  [PATCH_FLAG]?: boolean;
};

type PendingOperation = {
  cancel: () => void;
};

const pendingLeaveOperations = new WeakMap<Element, PendingOperation>();
const pendingRefreshOperations = new WeakMap<Element, PendingOperation>();

export function initGavelMobileStability(): void {
  const runtimeWindow = window as StabilityWindow;

  const install = (): void => {
    if (runtimeWindow[PATCH_FLAG] || !runtimeWindow.ScrollTrigger) return;

    runtimeWindow[PATCH_FLAG] = true;
    patchScrollTrigger(runtimeWindow, runtimeWindow.ScrollTrigger);
  };

  if (runtimeWindow.ScrollTrigger) {
    install();
    return;
  }

  const webflow = runtimeWindow.Webflow ?? ([] as Array<() => void>);
  runtimeWindow.Webflow = webflow;
  webflow.push(install);
}

function patchScrollTrigger(
  runtimeWindow: StabilityWindow,
  scrollTrigger: ScrollTriggerRuntime
): void {
  const originalCreate = scrollTrigger.create.bind(scrollTrigger);

  scrollTrigger.create = (vars: ScrollTriggerVars): ScrollTriggerInstance => {
    const trigger = vars.trigger;

    if (!(trigger instanceof Element) || !trigger.matches(GAVEL_COMPONENT_SELECTOR) || vars.scrub) {
      return originalCreate(vars);
    }

    const gavelIndex = getGavelIndex(trigger);
    const originalOnEnter = vars.onEnter;
    const originalOnEnterBack = vars.onEnterBack;
    const originalOnLeave = vars.onLeave;
    const originalOnLeaveBack = vars.onLeaveBack;
    const originalOnRefreshInit = vars.onRefreshInit;
    const originalOnRefresh = vars.onRefresh;
    let refreshWasDeferred = false;

    const cancelPendingWork = (): void => {
      cancelPendingOperation(pendingLeaveOperations, trigger);
      cancelPendingOperation(pendingRefreshOperations, trigger);
    };

    const wrapEnter =
      (callback: ScrollTriggerCallback | undefined): ScrollTriggerCallback =>
      (...args: unknown[]): void => {
        cancelPendingWork();
        callback?.(...args);
      };

    const wrapLeave =
      (callback: ScrollTriggerCallback | undefined): ScrollTriggerCallback =>
      (...args: unknown[]): void => {
        cancelPendingOperation(pendingLeaveOperations, trigger);

        if (!isGavelSequenceActive(runtimeWindow, gavelIndex)) {
          callback?.(...args);
          return;
        }

        const operation = waitForStableRest(runtimeWindow, gavelIndex, () => {
          pendingLeaveOperations.delete(trigger);
          callback?.(...args);
        });

        pendingLeaveOperations.set(trigger, operation);
      };

    vars.onEnter = wrapEnter(originalOnEnter);
    vars.onEnterBack = wrapEnter(originalOnEnterBack);
    vars.onLeave = wrapLeave(originalOnLeave);
    vars.onLeaveBack = wrapLeave(originalOnLeaveBack);

    vars.onRefreshInit = (...args: unknown[]): void => {
      refreshWasDeferred = isGavelSequenceActive(runtimeWindow, gavelIndex);

      if (!refreshWasDeferred) {
        originalOnRefreshInit?.(...args);
      }
    };

    vars.onRefresh = (...args: unknown[]): void => {
      if (!refreshWasDeferred) {
        originalOnRefresh?.(...args);
        return;
      }

      refreshWasDeferred = false;
      cancelPendingOperation(pendingRefreshOperations, trigger);

      const operation = waitForStableRest(runtimeWindow, gavelIndex, () => {
        pendingRefreshOperations.delete(trigger);
        originalOnRefreshInit?.(...args);
        originalOnRefresh?.(...args);
        runtimeWindow.TSAGavel?.refresh(gavelIndex);
      });

      pendingRefreshOperations.set(trigger, operation);
    };

    const instance = originalCreate(vars);
    const originalKill = instance.kill.bind(instance);

    instance.kill = (...args: unknown[]): unknown => {
      cancelPendingWork();
      return originalKill(...args);
    };

    return instance;
  };
}

function getGavelIndex(component: Element): number {
  const scope = component.closest(GAVEL_SCOPE_SELECTOR);
  const scopes = Array.from(document.querySelectorAll(GAVEL_SCOPE_SELECTOR));
  const index = scope ? scopes.indexOf(scope) : -1;

  return Math.max(index, 0);
}

function isGavelSequenceActive(runtimeWindow: StabilityWindow, index: number): boolean {
  const state = runtimeWindow.TSAGavel?.state(index);

  if (!state) return false;
  if (state.mobileStatus && ACTIVE_MOBILE_STATES.has(state.mobileStatus)) return true;

  return state.progress > 0.005;
}

function waitForStableRest(
  runtimeWindow: StabilityWindow,
  index: number,
  onComplete: () => void
): PendingOperation {
  let cancelled = false;
  let timeoutId = 0;
  const startedAt = window.performance.now();

  const cancel = (): void => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };

  const check = (): void => {
    if (cancelled) return;

    const state = runtimeWindow.TSAGavel?.state(index);
    const hasTimedOut = window.performance.now() - startedAt >= MAX_WAIT_MS;
    const isStableRest =
      Boolean(state) &&
      !ACTIVE_MOBILE_STATES.has(state?.mobileStatus ?? '') &&
      (state?.progress ?? 1) <= 0.005;

    if (isStableRest || hasTimedOut) {
      onComplete();
      return;
    }

    timeoutId = window.setTimeout(check, POLL_INTERVAL_MS);
  };

  timeoutId = window.setTimeout(check, POLL_INTERVAL_MS);

  return { cancel };
}

function cancelPendingOperation(
  operations: WeakMap<Element, PendingOperation>,
  trigger: Element
): void {
  operations.get(trigger)?.cancel();
  operations.delete(trigger);
}
