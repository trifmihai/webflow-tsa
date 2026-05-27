import { onDomReady } from '../../utils/dom';

export const CALL_POPOVER_SETTINGS = {
  enabled: true,
  desktopMinWidth: 768,
  mobileMaxWidth: 767,
  viewportPadding: 16,
  triggerGap: 12,
  restoreDelay: 1800,
  readyClass: 'is-call-popover-ready',
  initializedAttribute: 'callPopoverReady',
  openClass: 'is-open',
  placementTopClass: 'is-placement-top',
  placementBottomClass: 'is-placement-bottom',
  successClass: 'is-copy-success',
  failureClass: 'is-copy-failure',
  defaultTargetSelector: '#contact-call',
  helperDefaultText: 'Apoi sună-ne de pe telefon.',
  helperSuccessText: 'Număr copiat.',
  helperFailureText: 'Nu s-a putut copia automat.',
} as const;

type ActivationSource = 'keyboard' | 'pointer';
type Placement = 'top' | 'bottom';

type CodeComponentCallTriggerDetail = {
  href?: string;
  trigger?: HTMLElement;
  source?: ActivationSource;
};

type CodeComponentCopyTriggerDetail = {
  text?: string;
  trigger?: HTMLElement;
};

const SELECTORS = {
  trigger: '[data-call-trigger]',
  area: '[data-call-area]',
  popover: '[data-call-popover]',
  arrow: '[data-call-popover-arrow]',
  title: '[data-call-popover-title]',
  helper: '[data-call-helper]',
  copy: '[data-call-copy]',
  status: '[data-call-status]',
  close: '[data-call-popover-close]',
} as const;

export function initCallPopover(): void {
  onDomReady(() => {
    if (!CALL_POPOVER_SETTINGS.enabled) return;

    const root = document.documentElement;

    if (root.dataset[CALL_POPOVER_SETTINGS.initializedAttribute] === 'true') return;

    /*
      The trigger may be inside a Webflow Code Component Shadow DOM.
      Initialise from the normal Webflow popover element instead of requiring
      a queryable trigger in the page DOM.
    */
    const popoverElement = document.querySelector<HTMLElement>(SELECTORS.popover);

    if (!popoverElement) return;

    const popover: HTMLElement = popoverElement;
    const pageTriggers = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS.trigger));
    const knownTriggers = new Set<HTMLElement>();

    const mobileQuery = window.matchMedia(`(max-width: ${CALL_POPOVER_SETTINGS.mobileMaxWidth}px)`);
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const arrow = popover.querySelector<HTMLElement>(SELECTORS.arrow);
    const title = popover.querySelector<HTMLElement>(SELECTORS.title);
    const helper = popover.querySelector<HTMLElement>(SELECTORS.helper);
    const copyControl = popover.querySelector<HTMLElement>(SELECTORS.copy);
    const status = popover.querySelector<HTMLElement>(SELECTORS.status);

    let activeTrigger: HTMLElement | null = null;
    let originTrigger: HTMLElement | null = null;
    let restoreTimer: number | undefined;
    let openFrame: number | undefined;
    let lastKeyboardTrigger: HTMLElement | null = null;

    if (!popover.id) {
      popover.id = 'call-popover';
    }

    if (!title?.id && title) {
      title.id = 'call-popover-title';
    }

    popover.setAttribute('role', 'dialog');
    popover.setAttribute('tabindex', '-1');

    if (title) {
      popover.setAttribute('aria-labelledby', title.id);
    }

    if (status) {
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('aria-atomic', 'true');
    }

    /*
      A copy control can be either:
      - a native Webflow Button element, or
      - a normal Webflow wrapper around a line-style Code Component.
      The wrapper approach is required if the visual number itself is inside
      another Shadow DOM component.
    */
    if (copyControl && !(copyControl instanceof HTMLButtonElement)) {
      copyControl.setAttribute('role', 'button');

      if (!copyControl.hasAttribute('tabindex')) {
        copyControl.setAttribute('tabindex', '0');
      }
    }

    root.dataset[CALL_POPOVER_SETTINGS.initializedAttribute] = 'true';
    root.classList.add(CALL_POPOVER_SETTINGS.readyClass);

    function getTargetSelector(trigger: HTMLElement): string {
      const explicitTarget = trigger.getAttribute('data-call-target')?.trim();

      if (explicitTarget) return explicitTarget;

      const href = trigger instanceof HTMLAnchorElement ? trigger.getAttribute('href') : null;

      if (!href) return CALL_POPOVER_SETTINGS.defaultTargetSelector;
      if (href.startsWith('#')) return href;

      try {
        const url = new URL(href, window.location.href);
        const isCurrentPage =
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.search === window.location.search;

        if (isCurrentPage && url.hash) return url.hash;
      } catch {
        return CALL_POPOVER_SETTINGS.defaultTargetSelector;
      }

      return CALL_POPOVER_SETTINGS.defaultTargetSelector;
    }

    function getCallArea(trigger: HTMLElement): HTMLElement | null {
      const selector = getTargetSelector(trigger);

      if (selector) {
        const selectedArea = document.querySelector<HTMLElement>(selector);

        if (selectedArea) return selectedArea;
      }

      return document.querySelector<HTMLElement>(SELECTORS.area);
    }

    function isNativePhoneTrigger(trigger: HTMLElement): boolean {
      return (
        trigger instanceof HTMLAnchorElement &&
        (trigger.getAttribute('href')?.trim().toLowerCase().startsWith('tel:') ?? false)
      );
    }

    function isDesktopViewport(): boolean {
      return !mobileQuery.matches && window.innerWidth >= CALL_POPOVER_SETTINGS.desktopMinWidth;
    }

    function clearRestoreTimer(): void {
      if (restoreTimer === undefined) return;

      window.clearTimeout(restoreTimer);
      restoreTimer = undefined;
    }

    function restoreCopyMessage(): void {
      clearRestoreTimer();

      if (helper) {
        helper.textContent = CALL_POPOVER_SETTINGS.helperDefaultText;
      }

      if (status) {
        status.textContent = '';
      }

      popover.classList.remove(
        CALL_POPOVER_SETTINGS.successClass,
        CALL_POPOVER_SETTINGS.failureClass
      );
    }

    function syncHiddenState(hidden: boolean): void {
      popover.setAttribute('aria-hidden', String(hidden));
      popover.toggleAttribute('inert', hidden);

      if (hidden) {
        restoreCopyMessage();
      }
    }

    function registerTrigger(trigger: HTMLElement): void {
      if (knownTriggers.has(trigger)) return;

      knownTriggers.add(trigger);
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-expanded', 'false');

      /*
        aria-controls does not reliably describe across a Shadow DOM
        boundary, so it is set only on normal page-DOM triggers.
      */
      if (trigger.getRootNode() === document) {
        trigger.setAttribute('aria-controls', popover.id);
      }
    }

    function setExpanded(expandedTrigger: HTMLElement | null): void {
      knownTriggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', String(trigger === expandedTrigger));
      });
    }

    function cancelOpenFrame(): void {
      if (openFrame === undefined) return;

      window.cancelAnimationFrame(openFrame);
      openFrame = undefined;
    }

    function closePopover(restoreFocus = false): void {
      if (!activeTrigger) return;

      cancelOpenFrame();

      const triggerToRestore = originTrigger;

      activeTrigger = null;
      originTrigger = null;

      popover.classList.remove(CALL_POPOVER_SETTINGS.openClass);
      syncHiddenState(true);
      setExpanded(null);

      if (restoreFocus && triggerToRestore?.isConnected) {
        triggerToRestore.focus();
      }
    }

    function mountPopoverToBody(): void {
      if (popover.parentNode !== document.body) {
        document.body.appendChild(popover);
      }
    }

    function applyPlacement(trigger: HTMLElement): void {
      mountPopoverToBody();

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const { viewportPadding, triggerGap } = CALL_POPOVER_SETTINGS;

      const spaceBelow = viewportHeight - triggerRect.bottom - triggerGap - viewportPadding;
      const spaceAbove = triggerRect.top - triggerGap - viewportPadding;

      const placement: Placement =
        spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove ? 'bottom' : 'top';

      const top =
        placement === 'bottom'
          ? triggerRect.bottom + triggerGap
          : triggerRect.top - popoverRect.height - triggerGap;

      const unclampedLeft = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      const maxLeft = viewportWidth - popoverRect.width - viewportPadding;
      const left = Math.min(
        Math.max(unclampedLeft, viewportPadding),
        Math.max(maxLeft, viewportPadding)
      );

      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const arrowX = Math.min(
        Math.max(triggerCenterX - left, 18),
        Math.max(popoverRect.width - 18, 18)
      );

      popover.style.left = `${left}px`;
      popover.style.top = `${Math.max(top, viewportPadding)}px`;
      popover.style.setProperty('--call-popover-arrow-x', `${arrowX}px`);
      popover.style.setProperty('--call-popover-origin-x', `${arrowX}px`);
      popover.style.setProperty('--call-popover-origin-y', placement === 'bottom' ? '0%' : '100%');

      popover.classList.toggle(CALL_POPOVER_SETTINGS.placementBottomClass, placement === 'bottom');
      popover.classList.toggle(CALL_POPOVER_SETTINGS.placementTopClass, placement === 'top');

      arrow?.setAttribute('aria-hidden', 'true');
    }

    function openPopover(trigger: HTMLElement, source: ActivationSource): void {
      cancelOpenFrame();
      restoreCopyMessage();

      activeTrigger = trigger;
      originTrigger = trigger;

      mountPopoverToBody();
      syncHiddenState(false);
      setExpanded(trigger);
      applyPlacement(trigger);

      openFrame = window.requestAnimationFrame(() => {
        popover.classList.add(CALL_POPOVER_SETTINGS.openClass);
        openFrame = undefined;
      });

      if (source === 'keyboard') {
        (copyControl ?? popover).focus();
      }
    }

    function scheduleMobileScroll(trigger: HTMLElement, source: ActivationSource): void {
      const area = getCallArea(trigger);

      if (!area) return;

      const behavior: ScrollBehavior = reducedMotionQuery.matches ? 'auto' : 'smooth';

      window.setTimeout(() => {
        area.scrollIntoView({ block: 'start', behavior });

        if (source === 'keyboard') {
          area.focus({ preventScroll: true });
        }
      }, 80);
    }

    function handlePageTriggerActivation(
      event: Event,
      trigger: HTMLElement,
      source: ActivationSource
    ): void {
      if (!isDesktopViewport()) {
        closePopover(false);

        /*
          A normal page-DOM tel: trigger should also stay native on phones.
          Hash-based fallback triggers retain the scroll-to-area behavior.
        */
        if (isNativePhoneTrigger(trigger)) return;

        if (!getCallArea(trigger)) return;

        event.preventDefault();
        scheduleMobileScroll(trigger, source);
        return;
      }

      event.preventDefault();

      if (activeTrigger === trigger) {
        closePopover(false);
        return;
      }

      registerTrigger(trigger);
      openPopover(trigger, source);
    }

    async function copyText(text: string): Promise<void> {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement('textarea');

      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '-9999px';

      document.body.appendChild(textarea);
      textarea.select();

      const didCopy = document.execCommand('copy');

      document.body.removeChild(textarea);

      if (!didCopy) {
        throw new Error('Clipboard fallback failed');
      }
    }

    async function copyNumberAndReport(text: string): Promise<void> {
      const normalizedText = text.trim();

      if (!normalizedText) return;

      try {
        await copyText(normalizedText);

        if (helper) {
          helper.textContent = CALL_POPOVER_SETTINGS.helperSuccessText;
        }

        if (status) {
          status.textContent = 'Numărul de telefon a fost copiat.';
        }

        popover.classList.add(CALL_POPOVER_SETTINGS.successClass);
        popover.classList.remove(CALL_POPOVER_SETTINGS.failureClass);
      } catch {
        if (helper) {
          helper.textContent = CALL_POPOVER_SETTINGS.helperFailureText;
        }

        if (status) {
          status.textContent = CALL_POPOVER_SETTINGS.helperFailureText;
        }

        popover.classList.add(CALL_POPOVER_SETTINGS.failureClass);
        popover.classList.remove(CALL_POPOVER_SETTINGS.successClass);
      }

      clearRestoreTimer();
      restoreTimer = window.setTimeout(restoreCopyMessage, CALL_POPOVER_SETTINGS.restoreDelay);
    }

    async function handleCopy(event: Event): Promise<void> {
      if (!copyControl) return;

      event.preventDefault();
      event.stopPropagation();

      const text = copyControl.getAttribute('data-call-number')?.trim();

      if (!text) return;

      await copyNumberAndReport(text);
    }

    pageTriggers.forEach((trigger) => {
      registerTrigger(trigger);

      trigger.addEventListener('click', (event) => {
        const source: ActivationSource =
          lastKeyboardTrigger === trigger || event.detail === 0 ? 'keyboard' : 'pointer';

        lastKeyboardTrigger = null;
        handlePageTriggerActivation(event, trigger, source);
      });

      trigger.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        lastKeyboardTrigger = trigger;

        if (event.key === ' ') {
          event.preventDefault();
          handlePageTriggerActivation(event, trigger, 'keyboard');
        }
      });
    });

    /*
      Desktop events from Webflow Code Components are dispatched on window,
      because their inner anchors are isolated inside Shadow DOM.
      The Code Component already prevents native tel: navigation on desktop.
    */
    window.addEventListener('tsa:call-trigger', (event: Event) => {
      const customEvent = event as CustomEvent<CodeComponentCallTriggerDetail>;
      const trigger = customEvent.detail?.trigger;

      if (!(trigger instanceof HTMLElement)) return;
      if (!trigger.matches(SELECTORS.trigger)) return;
      if (!isDesktopViewport()) return;

      registerTrigger(trigger);

      const source: ActivationSource =
        customEvent.detail?.source === 'keyboard' ? 'keyboard' : 'pointer';

      if (activeTrigger === trigger) {
        closePopover(false);
        return;
      }

      openPopover(trigger, source);
    });

    /*
      Copy events from the line-style number Code Component. This is the
      preferred path when the visible copy button itself is a Code Component:
      the value crosses Shadow DOM explicitly and no native tel: action occurs.
    */
    window.addEventListener('tsa:copy-number', (event: Event) => {
      if (!isDesktopViewport()) return;

      const customEvent = event as CustomEvent<CodeComponentCopyTriggerDetail>;
      const text = customEvent.detail?.text?.trim();

      if (!text) return;

      void copyNumberAndReport(text);
    });

    copyControl?.addEventListener('click', (event) => {
      void handleCopy(event);
    });

    copyControl?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      void handleCopy(event);
    });

    popover.querySelector<HTMLElement>(SELECTORS.close)?.addEventListener('click', () => {
      closePopover(true);
    });

    document.addEventListener('pointerdown', (event) => {
      if (!activeTrigger) return;

      const { target } = event;

      if (!(target instanceof Node)) return;

      const eventPath = event.composedPath();

      if (popover.contains(target) || eventPath.includes(activeTrigger)) return;

      closePopover(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !activeTrigger) return;

      event.preventDefault();
      closePopover(true);
    });

    window.addEventListener(
      'scroll',
      () => {
        closePopover(false);
      },
      { passive: true }
    );

    window.addEventListener('resize', () => {
      if (!activeTrigger) return;

      if (!isDesktopViewport()) {
        closePopover(false);
        return;
      }

      applyPlacement(activeTrigger);
    });

    mobileQuery.addEventListener('change', () => {
      if (mobileQuery.matches) {
        closePopover(false);
      }
    });

    syncHiddenState(true);
  });
}
