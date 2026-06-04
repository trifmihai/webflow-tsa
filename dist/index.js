"use strict";
(() => {
  // bin/live-reload.js
  var currentScript = document.currentScript instanceof HTMLScriptElement ? document.currentScript : null;
  var liveReloadOrigin = currentScript?.src ? new URL(currentScript.src).origin : "http://localhost:3000";
  new EventSource(`${liveReloadOrigin}/esbuild`).addEventListener("change", () => location.reload());

  // src/components/accordions/index.ts
  function initAccordions() {
    const ICON_SELECTOR = "[data-accordion-icon]";
    const DIVIDER_SELECTOR = ".divider-horizontal-full";
    const MOBILE_QUERY2 = "(max-width: 767px)";
    const CONFIGS = [
      {
        name: "practices",
        rootSelector: "[data-practices-accordion]",
        groupSelector: "[data-practices-group]",
        itemSelector: "[data-practices-item]",
        triggerSelector: "[data-practices-trigger]",
        panelSelector: "[data-practices-panel]",
        innerSelector: "[data-practices-panel-inner]"
      },
      {
        name: "faq",
        rootSelector: "[data-faq-accordion]",
        groupSelector: "[data-faq-group]",
        itemSelector: "[data-faq-item]",
        triggerSelector: "[data-faq-trigger]",
        panelSelector: "[data-faq-panel]",
        innerSelector: "[data-faq-panel-inner]"
      }
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileLayout = window.matchMedia(MOBILE_QUERY2);
    function initAccordionSystem(config) {
      const windowGsap = window.gsap;
      const roots = document.querySelectorAll(config.rootSelector);
      if (!roots.length) return;
      if (!windowGsap) {
        console.warn(
          `${config.name} accordion: GSAP is missing. Enable the Webflow GSAP integration first.`
        );
        return;
      }
      const gsap = windowGsap;
      roots.forEach((root, rootIndex) => {
        if (root.dataset.accordionReady === "true") return;
        const activeTimelines = /* @__PURE__ */ new WeakMap();
        const groupRequestIds = /* @__PURE__ */ new WeakMap();
        const groups = Array.from(root.querySelectorAll(config.groupSelector));
        function getParts(item) {
          const inner = item.querySelector(config.innerSelector);
          return {
            trigger: item.querySelector(config.triggerSelector),
            panel: item.querySelector(config.panelSelector),
            inner,
            divider: inner?.querySelector(DIVIDER_SELECTOR) ?? null,
            icon: item.querySelector(ICON_SELECTOR)
          };
        }
        function isMobileMode() {
          return mobileLayout.matches;
        }
        function getNextRequestId(group) {
          const nextId = (groupRequestIds.get(group) || 0) + 1;
          groupRequestIds.set(group, nextId);
          return nextId;
        }
        function isLatestRequest(group, requestId) {
          return groupRequestIds.get(group) === requestId;
        }
        function clearLegacyInnerMotion(inner) {
          const children = Array.from(inner.children);
          if (!children.length) return;
          gsap.set(children, {
            clearProps: "transform,opacity"
          });
        }
        function stopItemMotion(item) {
          const timeline = activeTimelines.get(item);
          if (timeline) {
            timeline.kill();
            activeTimelines.delete(item);
          }
          const { panel, divider, icon } = getParts(item);
          if (panel) {
            gsap.killTweensOf(panel);
          }
          if (divider) {
            gsap.killTweensOf(divider);
          }
          if (icon) {
            gsap.killTweensOf(icon);
          }
        }
        function getTargetHeight(inner) {
          return Math.ceil(inner.getBoundingClientRect().height);
        }
        function openDurationFor(height) {
          return gsap.utils.clamp(0.22, 0.34, 0.2 + height / 3e3);
        }
        function closeDurationFor(height) {
          return gsap.utils.clamp(0.18, 0.24, 0.16 + height / 4200);
        }
        function setAriaState(item, group, open) {
          const { trigger } = getParts(item);
          if (!trigger) return;
          const collapsible = group.dataset.collapsible !== "false";
          trigger.setAttribute("aria-expanded", String(open));
          if (open && !collapsible && !isMobileMode()) {
            trigger.setAttribute("aria-disabled", "true");
          } else {
            trigger.removeAttribute("aria-disabled");
          }
        }
        function setImmediateState(item, group, open) {
          const { panel, inner, divider, icon } = getParts(item);
          if (!panel || !inner || !icon) return;
          stopItemMotion(item);
          clearLegacyInnerMotion(inner);
          setAriaState(item, group, open);
          delete item.dataset.motion;
          item.dataset.state = open ? "open" : "closed";
          panel.hidden = !open;
          gsap.set(panel, {
            clearProps: "opacity,transform",
            height: open ? "auto" : 0,
            visibility: open ? "visible" : "hidden",
            overflow: "hidden"
          });
          if (divider) {
            gsap.set(divider, {
              opacity: open ? 1 : 0
            });
          }
          gsap.set(icon, {
            rotation: open ? 0 : 180
          });
        }
        function openItem(item, group, animate = true) {
          const { trigger, panel, inner, divider, icon } = getParts(item);
          if (!trigger || !panel || !inner || !icon) return;
          stopItemMotion(item);
          setAriaState(item, group, true);
          delete item.dataset.motion;
          item.dataset.state = "open";
          const wasHidden = panel.hidden;
          panel.hidden = false;
          gsap.set(panel, {
            clearProps: "opacity,transform",
            visibility: "visible",
            overflow: "hidden"
          });
          const startHeight = panel.getBoundingClientRect().height;
          const targetHeight = getTargetHeight(inner);
          const startsFromClosed = wasHidden || startHeight <= 0.5;
          if (divider && startsFromClosed) {
            gsap.set(divider, {
              opacity: 0
            });
          }
          if (!animate || reducedMotion.matches) {
            gsap.set(panel, {
              height: "auto",
              visibility: "visible",
              overflow: "hidden"
            });
            if (divider) {
              gsap.set(divider, {
                opacity: 1
              });
            }
            gsap.set(icon, {
              rotation: 0
            });
            return;
          }
          gsap.set(panel, {
            height: startHeight
          });
          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              gsap.set(panel, {
                height: "auto",
                visibility: "visible",
                overflow: "hidden"
              });
              activeTimelines.delete(item);
            }
          });
          activeTimelines.set(item, timeline);
          timeline.to(
            panel,
            {
              height: targetHeight,
              duration: openDurationFor(targetHeight),
              ease: "power2.inOut"
            },
            0
          ).to(
            icon,
            {
              rotation: 0,
              duration: 0.22,
              ease: "power2.inOut"
            },
            0
          );
          if (divider) {
            timeline.to(
              divider,
              {
                opacity: 1,
                duration: startsFromClosed ? 0.16 : 0.1,
                ease: "power1.out"
              },
              startsFromClosed ? 0.055 : 0
            );
          }
        }
        function closeItem(item, group, animate = true, onComplete) {
          const { trigger, panel, inner, divider, icon } = getParts(item);
          if (!trigger || !panel || !inner || !icon) return;
          stopItemMotion(item);
          setAriaState(item, group, false);
          item.dataset.state = "closed";
          item.dataset.motion = "closing";
          panel.hidden = false;
          gsap.set(panel, {
            clearProps: "opacity,transform",
            visibility: "visible",
            overflow: "hidden"
          });
          const currentHeight = panel.getBoundingClientRect().height || getTargetHeight(inner);
          if (!animate || reducedMotion.matches || currentHeight <= 0.5) {
            panel.hidden = true;
            delete item.dataset.motion;
            gsap.set(panel, {
              height: 0,
              visibility: "hidden",
              overflow: "hidden"
            });
            if (divider) {
              gsap.set(divider, {
                opacity: 0
              });
            }
            gsap.set(icon, {
              rotation: 180
            });
            onComplete?.();
            return;
          }
          gsap.set(panel, {
            height: currentHeight
          });
          const duration = closeDurationFor(currentHeight);
          const dividerFadeDuration = Math.min(0.11, duration);
          const dividerFadeStart = Math.max(0, duration - dividerFadeDuration);
          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              panel.hidden = true;
              delete item.dataset.motion;
              gsap.set(panel, {
                height: 0,
                visibility: "hidden",
                overflow: "hidden"
              });
              if (divider) {
                gsap.set(divider, {
                  opacity: 0
                });
              }
              activeTimelines.delete(item);
              onComplete?.();
            }
          });
          activeTimelines.set(item, timeline);
          timeline.to(
            panel,
            {
              height: 0,
              duration,
              ease: "power2.inOut"
            },
            0
          ).to(
            icon,
            {
              rotation: 180,
              duration: 0.2,
              ease: "power2.inOut"
            },
            0
          );
          if (divider) {
            timeline.to(
              divider,
              {
                opacity: 0,
                duration: dividerFadeDuration,
                ease: "power1.out"
              },
              dividerFadeStart
            );
          }
        }
        function applyDesktopSingleOpenState(group, items) {
          const openItems = items.filter((item) => item.dataset.state === "open");
          if (openItems.length <= 1) return;
          openItems.slice(1).forEach((item) => {
            setImmediateState(item, group, false);
          });
        }
        groups.forEach((group, groupIndex) => {
          const items = Array.from(group.querySelectorAll(config.itemSelector));
          const triggers = [];
          const initialMode = group.dataset.initialOpen || "first";
          const explicitlyOpen = items.find((item) => item.dataset.state === "open");
          const initialOpen = explicitlyOpen || (initialMode === "first" ? items[0] : null);
          items.forEach((item, itemIndex) => {
            const { trigger, panel, inner, icon } = getParts(item);
            if (!trigger || !panel) return;
            if (!inner) {
              console.warn(`${config.name} accordion: missing inner wrapper inside panel.`, panel);
              return;
            }
            if (!icon) {
              console.warn(
                `${config.name} accordion: missing [data-accordion-icon] inside item.`,
                item
              );
              return;
            }
            const triggerId = trigger.id || `${config.name}-trigger-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;
            const panelId = panel.id || `${config.name}-panel-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;
            trigger.id = triggerId;
            panel.id = panelId;
            trigger.setAttribute("aria-controls", panelId);
            panel.setAttribute("aria-labelledby", triggerId);
            panel.setAttribute("role", "region");
            if (!trigger.matches("button")) {
              trigger.setAttribute("role", "button");
              trigger.setAttribute("tabindex", "0");
            } else if (!trigger.hasAttribute("type")) {
              trigger.setAttribute("type", "button");
            }
            triggers.push(trigger);
            const activate = () => {
              const isOpen = item.dataset.state === "open";
              const isClosing = item.dataset.motion === "closing";
              const collapsible = group.dataset.collapsible !== "false";
              if (isClosing) {
                openItem(item, group, true);
                return;
              }
              if (isOpen) {
                if (collapsible || isMobileMode()) {
                  closeItem(item, group, true);
                }
                return;
              }
              if (isMobileMode()) {
                openItem(item, group, true);
                return;
              }
              const requestId = getNextRequestId(group);
              const visibleSibling = items.find(
                (sibling) => sibling !== item && (sibling.dataset.state === "open" || sibling.dataset.motion === "closing")
              );
              if (visibleSibling) {
                closeItem(visibleSibling, group, true, () => {
                  if (!isLatestRequest(group, requestId)) return;
                  openItem(item, group, true);
                });
                return;
              }
              openItem(item, group, true);
            };
            trigger.addEventListener("click", activate);
            trigger.addEventListener("keydown", (event) => {
              if (!trigger.matches("button") && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                activate();
                return;
              }
              const currentIndex = triggers.indexOf(trigger);
              let nextIndex = null;
              if (event.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % triggers.length;
              }
              if (event.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
              }
              if (event.key === "Home") {
                nextIndex = 0;
              }
              if (event.key === "End") {
                nextIndex = triggers.length - 1;
              }
              if (nextIndex !== null) {
                event.preventDefault();
                triggers[nextIndex].focus();
              }
            });
          });
          items.forEach((item) => {
            setImmediateState(item, group, item === initialOpen);
          });
        });
        root.dataset.accordionReady = "true";
        const syncForMotionPreference = () => {
          groups.forEach((group) => {
            Array.from(group.querySelectorAll(config.itemSelector)).forEach((item) => {
              setImmediateState(item, group, item.dataset.state === "open");
            });
          });
        };
        const syncForLayoutMode = () => {
          groups.forEach((group) => {
            const items = Array.from(group.querySelectorAll(config.itemSelector));
            if (!isMobileMode()) {
              applyDesktopSingleOpenState(group, items);
            }
            items.forEach((item) => {
              setAriaState(item, group, item.dataset.state === "open");
            });
          });
        };
        reducedMotion.addEventListener("change", syncForMotionPreference);
        mobileLayout.addEventListener("change", syncForLayoutMode);
      });
    }
    function initAllAccordions() {
      CONFIGS.forEach((config) => {
        initAccordionSystem(config);
      });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initAllAccordions, {
        once: true
      });
    } else {
      initAllAccordions();
    }
  }

  // src/components/blog-toc/index.ts
  function initBlogToc() {
    document.addEventListener("DOMContentLoaded", () => {
      const wrappers = document.querySelectorAll(".cms-page_toc-list-wrapper");
      wrappers.forEach((wrapper) => {
        const list = wrapper.querySelector(".blog-post_toc-list");
        if (!list) return;
        const linkSelector = ".toc_h2, .toc_h3, .toc_h4, .toc_h5, .toc_h6";
        const activeSelectors = ["a.u-toc-current-link", "a.w--current", "a[aria-current='true']"];
        let frame = null;
        const updateTocState = () => {
          if (frame) cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const links = Array.from(wrapper.querySelectorAll(linkSelector));
            const activeLink = wrapper.querySelector(activeSelectors.join(", "));
            if (!activeLink) {
              wrapper.style.setProperty("--toc-current-opacity", "0");
              links.forEach((link) => {
                link.classList.remove("is-toc-active", "is-toc-muted");
              });
              return;
            }
            const wrapperRect = wrapper.getBoundingClientRect();
            const activeRect = activeLink.getBoundingClientRect();
            const y = activeRect.top - wrapperRect.top;
            const { height } = activeRect;
            wrapper.style.setProperty("--toc-current-y", `${y}px`);
            wrapper.style.setProperty("--toc-current-height", `${height}px`);
            wrapper.style.setProperty("--toc-current-opacity", "1");
            links.forEach((link) => {
              const isActive = link === activeLink;
              link.classList.toggle("is-toc-active", isActive);
              link.classList.toggle("is-toc-muted", !isActive);
            });
          });
        };
        updateTocState();
        const observer = new MutationObserver(updateTocState);
        observer.observe(list, {
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "aria-current"]
        });
        window.addEventListener("resize", updateTocState);
        window.addEventListener("scroll", updateTocState, { passive: true });
        list.addEventListener("scroll", updateTocState, { passive: true });
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(updateTocState);
        }
        setTimeout(updateTocState, 300);
        setTimeout(updateTocState, 1e3);
      });
    });
  }

  // src/utils/dom.ts
  function onDomReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
  }

  // src/components/call-popover/index.ts
  var CALL_POPOVER_SETTINGS = {
    enabled: true,
    desktopMinWidth: 768,
    mobileMaxWidth: 767,
    viewportPadding: 16,
    triggerGap: 12,
    restoreDelay: 1800,
    readyClass: "is-call-popover-ready",
    initializedAttribute: "callPopoverReady",
    openClass: "is-open",
    placementTopClass: "is-placement-top",
    placementBottomClass: "is-placement-bottom",
    successClass: "is-copy-success",
    failureClass: "is-copy-failure",
    defaultTargetSelector: "#contact-call",
    helperDefaultText: "Apoi sun\u0103-ne de pe telefon.",
    helperSuccessText: "Num\u0103r copiat.",
    helperFailureText: "Nu s-a putut copia automat."
  };
  var SELECTORS = {
    trigger: "[data-call-trigger]",
    area: "[data-call-area]",
    popover: "[data-call-popover]",
    arrow: "[data-call-popover-arrow]",
    title: "[data-call-popover-title]",
    helper: "[data-call-helper]",
    copy: "[data-call-copy]",
    status: "[data-call-status]",
    close: "[data-call-popover-close]"
  };
  function initCallPopover() {
    onDomReady(() => {
      if (!CALL_POPOVER_SETTINGS.enabled) return;
      const root = document.documentElement;
      if (root.dataset[CALL_POPOVER_SETTINGS.initializedAttribute] === "true") return;
      const popoverElement = document.querySelector(SELECTORS.popover);
      if (!popoverElement) return;
      const popover = popoverElement;
      const pageTriggers = Array.from(document.querySelectorAll(SELECTORS.trigger));
      const knownTriggers = /* @__PURE__ */ new Set();
      const mobileQuery = window.matchMedia(`(max-width: ${CALL_POPOVER_SETTINGS.mobileMaxWidth}px)`);
      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const arrow = popover.querySelector(SELECTORS.arrow);
      const title = popover.querySelector(SELECTORS.title);
      const helper = popover.querySelector(SELECTORS.helper);
      const copyControl = popover.querySelector(SELECTORS.copy);
      const status = popover.querySelector(SELECTORS.status);
      let activeTrigger = null;
      let originTrigger = null;
      let restoreTimer;
      let openFrame;
      let lastKeyboardTrigger = null;
      if (!popover.id) {
        popover.id = "call-popover";
      }
      if (!title?.id && title) {
        title.id = "call-popover-title";
      }
      popover.setAttribute("role", "dialog");
      popover.setAttribute("tabindex", "-1");
      if (title) {
        popover.setAttribute("aria-labelledby", title.id);
      }
      if (status) {
        status.setAttribute("aria-live", "polite");
        status.setAttribute("aria-atomic", "true");
      }
      if (copyControl && !(copyControl instanceof HTMLButtonElement)) {
        copyControl.setAttribute("role", "button");
        if (!copyControl.hasAttribute("tabindex")) {
          copyControl.setAttribute("tabindex", "0");
        }
      }
      root.dataset[CALL_POPOVER_SETTINGS.initializedAttribute] = "true";
      root.classList.add(CALL_POPOVER_SETTINGS.readyClass);
      function getTargetSelector(trigger) {
        const explicitTarget = trigger.getAttribute("data-call-target")?.trim();
        if (explicitTarget) return explicitTarget;
        const href = trigger instanceof HTMLAnchorElement ? trigger.getAttribute("href") : null;
        if (!href) return CALL_POPOVER_SETTINGS.defaultTargetSelector;
        if (href.startsWith("#")) return href;
        try {
          const url = new URL(href, window.location.href);
          const isCurrentPage = url.origin === window.location.origin && url.pathname === window.location.pathname && url.search === window.location.search;
          if (isCurrentPage && url.hash) return url.hash;
        } catch {
          return CALL_POPOVER_SETTINGS.defaultTargetSelector;
        }
        return CALL_POPOVER_SETTINGS.defaultTargetSelector;
      }
      function getCallArea(trigger) {
        const selector = getTargetSelector(trigger);
        if (selector) {
          const selectedArea = document.querySelector(selector);
          if (selectedArea) return selectedArea;
        }
        return document.querySelector(SELECTORS.area);
      }
      function isNativePhoneTrigger(trigger) {
        return trigger instanceof HTMLAnchorElement && (trigger.getAttribute("href")?.trim().toLowerCase().startsWith("tel:") ?? false);
      }
      function isDesktopViewport() {
        return !mobileQuery.matches && window.innerWidth >= CALL_POPOVER_SETTINGS.desktopMinWidth;
      }
      function clearRestoreTimer() {
        if (restoreTimer === void 0) return;
        window.clearTimeout(restoreTimer);
        restoreTimer = void 0;
      }
      function restoreCopyMessage() {
        clearRestoreTimer();
        if (helper) {
          helper.textContent = CALL_POPOVER_SETTINGS.helperDefaultText;
        }
        if (status) {
          status.textContent = "";
        }
        popover.classList.remove(
          CALL_POPOVER_SETTINGS.successClass,
          CALL_POPOVER_SETTINGS.failureClass
        );
      }
      function syncHiddenState(hidden) {
        popover.setAttribute("aria-hidden", String(hidden));
        popover.toggleAttribute("inert", hidden);
        if (hidden) {
          restoreCopyMessage();
        }
      }
      function registerTrigger(trigger) {
        if (knownTriggers.has(trigger)) return;
        knownTriggers.add(trigger);
        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.setAttribute("aria-expanded", "false");
        if (trigger.getRootNode() === document) {
          trigger.setAttribute("aria-controls", popover.id);
        }
      }
      function setExpanded(expandedTrigger) {
        knownTriggers.forEach((trigger) => {
          trigger.setAttribute("aria-expanded", String(trigger === expandedTrigger));
        });
      }
      function cancelOpenFrame() {
        if (openFrame === void 0) return;
        window.cancelAnimationFrame(openFrame);
        openFrame = void 0;
      }
      function closePopover(restoreFocus = false) {
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
      function mountPopoverToBody() {
        if (popover.parentNode !== document.body) {
          document.body.appendChild(popover);
        }
      }
      function applyPlacement(trigger) {
        mountPopoverToBody();
        const triggerRect = trigger.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const { viewportPadding, triggerGap } = CALL_POPOVER_SETTINGS;
        const spaceBelow = viewportHeight - triggerRect.bottom - triggerGap - viewportPadding;
        const spaceAbove = triggerRect.top - triggerGap - viewportPadding;
        const placement = spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove ? "bottom" : "top";
        const top = placement === "bottom" ? triggerRect.bottom + triggerGap : triggerRect.top - popoverRect.height - triggerGap;
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
        popover.style.setProperty("--call-popover-arrow-x", `${arrowX}px`);
        popover.style.setProperty("--call-popover-origin-x", `${arrowX}px`);
        popover.style.setProperty("--call-popover-origin-y", placement === "bottom" ? "0%" : "100%");
        popover.classList.toggle(CALL_POPOVER_SETTINGS.placementBottomClass, placement === "bottom");
        popover.classList.toggle(CALL_POPOVER_SETTINGS.placementTopClass, placement === "top");
        arrow?.setAttribute("aria-hidden", "true");
      }
      function openPopover(trigger, source) {
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
          openFrame = void 0;
        });
        if (source === "keyboard") {
          (copyControl ?? popover).focus();
        }
      }
      function scheduleMobileScroll(trigger, source) {
        const area = getCallArea(trigger);
        if (!area) return;
        const behavior = reducedMotionQuery.matches ? "auto" : "smooth";
        window.setTimeout(() => {
          area.scrollIntoView({ block: "start", behavior });
          if (source === "keyboard") {
            area.focus({ preventScroll: true });
          }
        }, 80);
      }
      function handlePageTriggerActivation(event, trigger, source) {
        if (!isDesktopViewport()) {
          closePopover(false);
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
      async function copyText(text) {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          return;
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const didCopy = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!didCopy) {
          throw new Error("Clipboard fallback failed");
        }
      }
      async function copyNumberAndReport(text) {
        const normalizedText = text.trim();
        if (!normalizedText) return;
        try {
          await copyText(normalizedText);
          if (helper) {
            helper.textContent = CALL_POPOVER_SETTINGS.helperSuccessText;
          }
          if (status) {
            status.textContent = "Num\u0103rul de telefon a fost copiat.";
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
      async function handleCopy(event) {
        if (!copyControl) return;
        event.preventDefault();
        event.stopPropagation();
        const text = copyControl.getAttribute("data-call-number")?.trim();
        if (!text) return;
        await copyNumberAndReport(text);
      }
      pageTriggers.forEach((trigger) => {
        registerTrigger(trigger);
        trigger.addEventListener("click", (event) => {
          const source = lastKeyboardTrigger === trigger || event.detail === 0 ? "keyboard" : "pointer";
          lastKeyboardTrigger = null;
          handlePageTriggerActivation(event, trigger, source);
        });
        trigger.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          lastKeyboardTrigger = trigger;
          if (event.key === " ") {
            event.preventDefault();
            handlePageTriggerActivation(event, trigger, "keyboard");
          }
        });
      });
      window.addEventListener("tsa:call-trigger", (event) => {
        const customEvent = event;
        const trigger = customEvent.detail?.trigger;
        if (!(trigger instanceof HTMLElement)) return;
        if (!trigger.matches(SELECTORS.trigger)) return;
        if (!isDesktopViewport()) return;
        registerTrigger(trigger);
        const source = customEvent.detail?.source === "keyboard" ? "keyboard" : "pointer";
        if (activeTrigger === trigger) {
          closePopover(false);
          return;
        }
        openPopover(trigger, source);
      });
      window.addEventListener("tsa:copy-number", (event) => {
        if (!isDesktopViewport()) return;
        const customEvent = event;
        const text = customEvent.detail?.text?.trim();
        if (!text) return;
        void copyNumberAndReport(text);
      });
      copyControl?.addEventListener("click", (event) => {
        void handleCopy(event);
      });
      copyControl?.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        void handleCopy(event);
      });
      popover.querySelector(SELECTORS.close)?.addEventListener("click", () => {
        closePopover(true);
      });
      document.addEventListener("pointerdown", (event) => {
        if (!activeTrigger) return;
        const { target } = event;
        if (!(target instanceof Node)) return;
        const eventPath = event.composedPath();
        if (popover.contains(target) || eventPath.includes(activeTrigger)) return;
        closePopover(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !activeTrigger) return;
        event.preventDefault();
        closePopover(true);
      });
      window.addEventListener(
        "scroll",
        () => {
          closePopover(false);
        },
        { passive: true }
      );
      window.addEventListener("resize", () => {
        if (!activeTrigger) return;
        if (!isDesktopViewport()) {
          closePopover(false);
          return;
        }
        applyPlacement(activeTrigger);
      });
      mobileQuery.addEventListener("change", () => {
        if (mobileQuery.matches) {
          closePopover(false);
        }
      });
      syncHiddenState(true);
    });
  }

  // src/components/hero-avatars/index.ts
  var HERO_AVATAR_SETTINGS = {
    listSelector: "[data-hero-avatars]",
    avatarSelector: "[data-hero-name]",
    tooltipSelector: "[data-hero-tooltip]",
    tooltipNameSelector: "[data-hero-tooltip-name]",
    activeClass: "is-active",
    visibleClass: "is-visible",
    positioningClass: "is-positioning",
    resizingClass: "is-resizing",
    clampedClass: "is-viewport-clamped",
    readyClass: "is-avatar-motion-ready",
    /*
      Spațiul minim dintre tooltip și marginile viewport-ului pe touch.
    */
    tooltipViewportPadding: 16,
    /*
      Trebuie să corespundă cu:
      --hero-tooltip-morph-duration: 260ms;
      din CSS.
    */
    tooltipMorphDuration: 260,
    /*
      Evită ca tooltip-ul să dispară în spațiul foarte mic
      dintre două avataruri atunci când miști cursorul rapid.
    */
    pointerLeaveDelay: 55
  };
  function initHeroAvatarHover() {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lists = document.querySelectorAll(HERO_AVATAR_SETTINGS.listSelector);
    lists.forEach((list, listIndex) => {
      if (list.dataset.heroAvatarReady === "true") return;
      const avatars = Array.from(
        list.querySelectorAll(HERO_AVATAR_SETTINGS.avatarSelector)
      );
      const tooltip = list.querySelector(
        HERO_AVATAR_SETTINGS.tooltipSelector
      );
      const tooltipName = tooltip.querySelector(
        HERO_AVATAR_SETTINGS.tooltipNameSelector
      );
      if (!avatars.length || !tooltip || !tooltipName) {
        console.warn("Hero avatars: lipsesc data-hero-name sau tooltip-ul configurat.", list);
        return;
      }
      list.dataset.heroAvatarReady = "true";
      list.classList.add(HERO_AVATAR_SETTINGS.readyClass);
      const tooltipId = tooltip.id || `hero-avatar-tooltip-${listIndex + 1}`;
      tooltip.id = tooltipId;
      tooltip.setAttribute("role", "tooltip");
      tooltip.setAttribute("aria-hidden", "true");
      let hoveredAvatar = null;
      let focusedAvatar = null;
      let tappedAvatar = null;
      let currentAvatar = null;
      let pointerLeaveTimer;
      let resizeTimer;
      let showFrame;
      let morphFrame;
      let morphCleanupTimer;
      avatars.forEach((avatar) => {
        const name = avatar.dataset.heroName?.trim();
        if (!name) return;
        avatar.setAttribute("role", "button");
        avatar.setAttribute("tabindex", "0");
        avatar.setAttribute("aria-label", name);
        avatar.setAttribute("aria-expanded", "false");
        avatar.setAttribute("aria-controls", tooltipId);
      });
      function cancelFrame(frame) {
        if (frame !== void 0) {
          window.cancelAnimationFrame(frame);
        }
      }
      function cancelPendingMotion() {
        cancelFrame(showFrame);
        cancelFrame(morphFrame);
        showFrame = void 0;
        morphFrame = void 0;
        if (morphCleanupTimer !== void 0) {
          window.clearTimeout(morphCleanupTimer);
          morphCleanupTimer = void 0;
        }
      }
      function stopPointerLeaveTimer() {
        if (pointerLeaveTimer === void 0) return;
        window.clearTimeout(pointerLeaveTimer);
        pointerLeaveTimer = void 0;
      }
      function getActiveAvatar() {
        return focusedAvatar || hoveredAvatar || tappedAvatar;
      }
      function getAvatarName(avatar) {
        const name = avatar.dataset.heroName?.trim();
        return name || null;
      }
      function getNaturalTooltipWidth(name) {
        tooltipName.textContent = name;
        tooltip.style.width = "max-content";
        return tooltip.getBoundingClientRect().width;
      }
      function calculateTooltipPosition(avatar, tooltipWidth, constrainToViewport) {
        const listRect = list.getBoundingClientRect();
        const avatarRect = avatar.getBoundingClientRect();
        const avatarCenterViewportX = avatarRect.left + avatarRect.width / 2;
        let tooltipCenterViewportX = avatarCenterViewportX;
        if (constrainToViewport) {
          const halfTooltipWidth = tooltipWidth / 2;
          const minCenterX = HERO_AVATAR_SETTINGS.tooltipViewportPadding + halfTooltipWidth;
          const maxCenterX = window.innerWidth - HERO_AVATAR_SETTINGS.tooltipViewportPadding - halfTooltipWidth;
          tooltipCenterViewportX = minCenterX <= maxCenterX ? Math.min(Math.max(avatarCenterViewportX, minCenterX), maxCenterX) : window.innerWidth / 2;
        }
        const tooltipLeftViewportX = tooltipCenterViewportX - tooltipWidth / 2;
        const arrowX = avatarCenterViewportX - tooltipLeftViewportX;
        const isClamped = Math.abs(tooltipCenterViewportX - avatarCenterViewportX) > 0.5;
        return {
          centerWithinList: tooltipCenterViewportX - listRect.left,
          arrowX,
          isClamped
        };
      }
      function applyTooltipPosition(position) {
        tooltip.style.setProperty("--hero-tooltip-x", `${position.centerWithinList}px`);
        tooltip.classList.toggle(HERO_AVATAR_SETTINGS.clampedClass, position.isClamped);
        if (position.isClamped) {
          tooltip.style.setProperty("--hero-tooltip-arrow-x", `${position.arrowX}px`);
        } else {
          tooltip.style.removeProperty("--hero-tooltip-arrow-x");
        }
      }
      function clearMorphStyles() {
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.resizingClass);
        tooltip.style.removeProperty("width");
      }
      function positionTooltipInstantly(avatar) {
        const name = getAvatarName(avatar);
        if (!name) return;
        cancelPendingMotion();
        clearMorphStyles();
        tooltip.classList.add(HERO_AVATAR_SETTINGS.positioningClass);
        const naturalWidth = getNaturalTooltipWidth(name);
        const position = calculateTooltipPosition(avatar, naturalWidth, !finePointerQuery.matches);
        applyTooltipPosition(position);
        tooltip.style.removeProperty("width");
        void tooltip.offsetWidth;
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.positioningClass);
      }
      function animateVisibleTooltipTo(avatar) {
        const name = getAvatarName(avatar);
        if (!name) return;
        if (!finePointerQuery.matches || reducedMotionQuery.matches) {
          positionTooltipInstantly(avatar);
          return;
        }
        cancelPendingMotion();
        const listRect = list.getBoundingClientRect();
        const currentRect = tooltip.getBoundingClientRect();
        const currentWidth = currentRect.width;
        const currentCenterWithinList = currentRect.left + currentRect.width / 2 - listRect.left;
        tooltip.classList.add(
          HERO_AVATAR_SETTINGS.positioningClass,
          HERO_AVATAR_SETTINGS.resizingClass
        );
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.clampedClass);
        tooltip.style.removeProperty("--hero-tooltip-arrow-x");
        tooltip.style.setProperty("--hero-tooltip-x", `${currentCenterWithinList}px`);
        tooltip.style.width = `${currentWidth}px`;
        const targetWidth = getNaturalTooltipWidth(name);
        const targetPosition = calculateTooltipPosition(avatar, targetWidth, false);
        tooltip.style.width = `${currentWidth}px`;
        void tooltip.offsetWidth;
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.positioningClass);
        morphFrame = window.requestAnimationFrame(() => {
          tooltip.style.width = `${targetWidth}px`;
          applyTooltipPosition(targetPosition);
          morphFrame = void 0;
        });
        morphCleanupTimer = window.setTimeout(() => {
          clearMorphStyles();
          morphCleanupTimer = void 0;
        }, HERO_AVATAR_SETTINGS.tooltipMorphDuration + 40);
      }
      function showTooltip(avatar) {
        const isAlreadyVisible = tooltip.classList.contains(HERO_AVATAR_SETTINGS.visibleClass);
        if (isAlreadyVisible && currentAvatar === avatar) {
          return;
        }
        if (isAlreadyVisible && currentAvatar) {
          animateVisibleTooltipTo(avatar);
          currentAvatar = avatar;
          tooltip.setAttribute("aria-hidden", "false");
          return;
        }
        positionTooltipInstantly(avatar);
        currentAvatar = avatar;
        tooltip.setAttribute("aria-hidden", "false");
        showFrame = window.requestAnimationFrame(() => {
          tooltip.classList.add(HERO_AVATAR_SETTINGS.visibleClass);
          showFrame = void 0;
        });
      }
      function hideTooltip() {
        cancelPendingMotion();
        clearMorphStyles();
        currentAvatar = null;
        tooltip.classList.remove(
          HERO_AVATAR_SETTINGS.visibleClass,
          HERO_AVATAR_SETTINGS.positioningClass,
          HERO_AVATAR_SETTINGS.clampedClass
        );
        tooltip.style.removeProperty("--hero-tooltip-arrow-x");
        tooltip.setAttribute("aria-hidden", "true");
      }
      function render() {
        const nextAvatar = getActiveAvatar();
        avatars.forEach((avatar) => {
          const isActive = avatar === nextAvatar;
          avatar.classList.toggle(HERO_AVATAR_SETTINGS.activeClass, isActive);
          avatar.setAttribute("aria-expanded", String(isActive));
          if (isActive) {
            avatar.setAttribute("aria-describedby", tooltipId);
          } else {
            avatar.removeAttribute("aria-describedby");
          }
        });
        if (!nextAvatar) {
          hideTooltip();
          return;
        }
        showTooltip(nextAvatar);
      }
      avatars.forEach((avatar) => {
        avatar.addEventListener("pointerdown", (event) => {
          if (finePointerQuery.matches && event.pointerType === "mouse") {
            event.preventDefault();
          }
        });
        avatar.addEventListener("pointerenter", () => {
          if (!finePointerQuery.matches) return;
          stopPointerLeaveTimer();
          hoveredAvatar = avatar;
          render();
        });
        avatar.addEventListener("pointerleave", () => {
          if (!finePointerQuery.matches) return;
          stopPointerLeaveTimer();
          pointerLeaveTimer = window.setTimeout(() => {
            if (hoveredAvatar === avatar) {
              hoveredAvatar = null;
              render();
            }
          }, HERO_AVATAR_SETTINGS.pointerLeaveDelay);
        });
        avatar.addEventListener("focusin", () => {
          focusedAvatar = avatar;
          render();
        });
        avatar.addEventListener("focusout", () => {
          if (focusedAvatar === avatar) {
            focusedAvatar = null;
            render();
          }
        });
        avatar.addEventListener("click", () => {
          if (finePointerQuery.matches) return;
          focusedAvatar = null;
          avatar.blur();
          tappedAvatar = tappedAvatar === avatar ? null : avatar;
          render();
        });
        avatar.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            hoveredAvatar = null;
            focusedAvatar = null;
            tappedAvatar = null;
            avatar.blur();
            render();
            return;
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            focusedAvatar = avatar;
            render();
          }
        });
      });
      document.addEventListener("pointerdown", (event) => {
        if (finePointerQuery.matches || !tappedAvatar) {
          return;
        }
        const { target } = event;
        if (!(target instanceof Node)) return;
        if (!list.contains(target)) {
          tappedAvatar = null;
          render();
        }
      });
      window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          const activeAvatar = getActiveAvatar();
          if (activeAvatar) {
            positionTooltipInstantly(activeAvatar);
          }
        }, 100);
      });
      finePointerQuery.addEventListener("change", () => {
        stopPointerLeaveTimer();
        hoveredAvatar = null;
        tappedAvatar = null;
        render();
      });
    });
  }

  // src/components/navbar/mobile-menu.ts
  var MOBILE_NAV_SETTINGS = {
    breakpoint: 767,
    readyClass: "is-mobile-nav-ready",
    openClass: "is-menu-open",
    overlayClass: "is-mobile-nav-overlay",
    overlayOpenClass: "is-open",
    scrollLockClass: "tsa-nav-is-locked",
    openLabel: "\xCEnchide meniul",
    closedLabel: "Deschide meniul"
  };
  function initMobileNavbarMenus() {
    const navbars = document.querySelectorAll(".navbar_component");
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_NAV_SETTINGS.breakpoint}px)`);
    navbars.forEach((navbar, navbarIndex) => {
      if (navbar.dataset.mobileNavReady === "true") return;
      const trigger = navbar.querySelector(".navbar_menu-icon");
      const panel = navbar.querySelector(".navbar_mobile-panel");
      if (!trigger || !panel) {
        console.warn("Mobile navbar: lipsesc .navbar_menu-icon sau .navbar_mobile-panel.", navbar);
        return;
      }
      navbar.dataset.mobileNavReady = "true";
      const originalPanelParent = panel.parentNode;
      const originalPanelNextSibling = panel.nextSibling;
      const isNativeButton = trigger instanceof HTMLButtonElement;
      let isOpen = false;
      let lockedScrollY = 0;
      let navHeightObserver = null;
      let bodyInlineStyles = null;
      if (!panel.id) {
        panel.id = `tsa-mobile-menu-${navbarIndex + 1}`;
      }
      if (!isNativeButton) {
        trigger.setAttribute("role", "button");
        trigger.setAttribute("tabindex", "0");
      }
      trigger.setAttribute("aria-controls", panel.id);
      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", MOBILE_NAV_SETTINGS.closedLabel);
      function isMobileViewport() {
        return mobileQuery.matches;
      }
      function syncNavbarHeightVariable() {
        const navbarHeight = Math.ceil(navbar.getBoundingClientRect().height);
        if (navbarHeight <= 0) return;
        panel.style.setProperty("--tsa-nav-real-header-height", `${navbarHeight}px`);
      }
      function startNavbarHeightObserver() {
        syncNavbarHeightVariable();
        if (!("ResizeObserver" in window) || navHeightObserver) return;
        navHeightObserver = new ResizeObserver(() => {
          syncNavbarHeightVariable();
        });
        navHeightObserver.observe(navbar);
      }
      function mountOverlayToBody() {
        if (panel.parentNode !== document.body) {
          document.body.appendChild(panel);
        }
        panel.classList.add(MOBILE_NAV_SETTINGS.overlayClass);
      }
      function restorePanelToNavbar() {
        panel.classList.remove(
          MOBILE_NAV_SETTINGS.overlayClass,
          MOBILE_NAV_SETTINGS.overlayOpenClass
        );
        if (!originalPanelParent) return;
        if (originalPanelNextSibling && originalPanelNextSibling.parentNode === originalPanelParent) {
          originalPanelParent.insertBefore(panel, originalPanelNextSibling);
        } else {
          originalPanelParent.appendChild(panel);
        }
      }
      function lockPageScroll() {
        if (bodyInlineStyles) return;
        lockedScrollY = window.scrollY;
        bodyInlineStyles = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
          width: document.body.style.width,
          overflow: document.body.style.overflow
        };
        document.documentElement.classList.add(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.classList.add(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
      }
      function unlockPageScroll() {
        if (!bodyInlineStyles) return;
        const savedStyles = bodyInlineStyles;
        bodyInlineStyles = null;
        document.documentElement.classList.remove(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.classList.remove(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.style.position = savedStyles.position;
        document.body.style.top = savedStyles.top;
        document.body.style.left = savedStyles.left;
        document.body.style.right = savedStyles.right;
        document.body.style.width = savedStyles.width;
        document.body.style.overflow = savedStyles.overflow;
        window.scrollTo(0, lockedScrollY);
      }
      function syncPanelAccessibility(open) {
        if (!isMobileViewport()) {
          panel.removeAttribute("aria-hidden");
          panel.removeAttribute("inert");
          return;
        }
        panel.setAttribute("aria-hidden", String(!open));
        panel.toggleAttribute("inert", !open);
      }
      function getFocusableElements() {
        const panelFocusables = Array.from(
          panel.querySelectorAll(
            [
              "a[href]",
              "button:not([disabled])",
              "input:not([disabled])",
              "select:not([disabled])",
              "textarea:not([disabled])",
              '[tabindex]:not([tabindex="-1"])'
            ].join(", ")
          )
        );
        return [trigger, ...panelFocusables];
      }
      function setMenuOpen(nextOpen, restoreFocus = false) {
        const open = isMobileViewport() && nextOpen;
        if (open) {
          mountOverlayToBody();
        }
        if (isMobileViewport()) {
          startNavbarHeightObserver();
          window.requestAnimationFrame(() => {
            syncNavbarHeightVariable();
          });
        }
        isOpen = open;
        navbar.classList.toggle(MOBILE_NAV_SETTINGS.openClass, open);
        panel.classList.toggle(MOBILE_NAV_SETTINGS.overlayOpenClass, open);
        trigger.setAttribute("aria-expanded", String(open));
        trigger.setAttribute(
          "aria-label",
          open ? MOBILE_NAV_SETTINGS.openLabel : MOBILE_NAV_SETTINGS.closedLabel
        );
        syncPanelAccessibility(open);
        if (open) {
          lockPageScroll();
        } else {
          unlockPageScroll();
        }
        if (restoreFocus && isMobileViewport()) {
          trigger.focus();
        }
      }
      function toggleMenu() {
        if (!isMobileViewport()) return;
        setMenuOpen(!isOpen);
      }
      function syncViewportMode() {
        setMenuOpen(false);
        if (isMobileViewport()) {
          mountOverlayToBody();
          startNavbarHeightObserver();
          syncPanelAccessibility(false);
        } else {
          restorePanelToNavbar();
          syncPanelAccessibility(false);
        }
      }
      trigger.addEventListener("click", (event) => {
        if (!isMobileViewport()) return;
        if (trigger instanceof HTMLAnchorElement) {
          event.preventDefault();
        }
        toggleMenu();
      });
      trigger.addEventListener("keydown", (event) => {
        if (!isMobileViewport() || isNativeButton) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleMenu();
        }
      });
      document.addEventListener("keydown", (event) => {
        if (!isOpen || !isMobileViewport()) return;
        if (event.key === "Escape") {
          event.preventDefault();
          setMenuOpen(false, true);
          return;
        }
        if (event.key !== "Tab") return;
        const focusables = getFocusableElements();
        if (!focusables.length) return;
        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];
        const { activeElement } = document;
        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      });
      document.addEventListener("pointerdown", (event) => {
        if (!isOpen || !isMobileViewport()) return;
        const { target } = event;
        if (!(target instanceof Node)) return;
        if (!navbar.contains(target) && !panel.contains(target)) {
          setMenuOpen(false);
        }
      });
      panel.addEventListener("click", (event) => {
        if (!isOpen || !isMobileViewport()) return;
        const { target } = event;
        if (!(target instanceof Element)) return;
        const activatedItem = target.closest(
          ["a[href]", "button", '[role="link"]', ".navbar_link", ".navbar_button-wrapper"].join(", ")
        );
        if (activatedItem) {
          setMenuOpen(false);
        }
      });
      window.addEventListener(
        "resize",
        () => {
          if (!isMobileViewport()) return;
          syncNavbarHeightVariable();
        },
        { passive: true }
      );
      if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", syncViewportMode);
      } else {
        mobileQuery.addListener(syncViewportMode);
      }
      navbar.classList.add(MOBILE_NAV_SETTINGS.readyClass);
      syncViewportMode();
    });
  }

  // src/components/navbar/smart-navbar.ts
  function initializeSmartNavbar() {
    const navbar = document.querySelector(".navbar_component");
    if (!navbar) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealDelta = 8;
    const hideAfterScroll = 80;
    const hiddenTransform = "translate3d(0, calc(-100% - 1rem), 0)";
    const visibleTransform = "translate3d(0, 0, 0)";
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let ticking = false;
    const applyBaseStyles = () => {
      navbar.style.backfaceVisibility = "hidden";
      navbar.style.transform = visibleTransform;
      navbar.style.willChange = "transform, opacity";
      navbar.style.transition = reducedMotion.matches ? "none" : [
        "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        "opacity 420ms ease",
        "box-shadow 420ms ease"
      ].join(", ");
    };
    const isMenuOpen = () => {
      const menuButton = navbar.querySelector(".w-nav-button");
      const navMenu = navbar.querySelector(".w-nav-menu");
      return Boolean(menuButton?.classList.contains("w--open") || navMenu?.style.display === "block");
    };
    const showNavbar = () => {
      if (!isHidden) return;
      navbar.style.transform = visibleTransform;
      navbar.style.opacity = "1";
      navbar.style.pointerEvents = "auto";
      navbar.style.boxShadow = "";
      navbar.dataset.scrollState = "visible";
      isHidden = false;
    };
    const hideNavbar = () => {
      if (isHidden || isMenuOpen()) return;
      navbar.style.transform = hiddenTransform;
      navbar.style.opacity = "0";
      navbar.style.pointerEvents = "none";
      navbar.style.boxShadow = "none";
      navbar.dataset.scrollState = "hidden";
      isHidden = true;
    };
    const updateNavbar = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollY;
      if (currentScrollY <= hideAfterScroll || scrollDelta < -revealDelta || isMenuOpen()) {
        showNavbar();
      } else if (scrollDelta > revealDelta) {
        hideNavbar();
      }
      lastScrollY = currentScrollY;
      ticking = false;
    };
    const requestNavbarUpdate = () => {
      if (ticking) return;
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    };
    applyBaseStyles();
    navbar.dataset.scrollState = "visible";
    window.addEventListener("scroll", requestNavbarUpdate, { passive: true });
    window.addEventListener("resize", showNavbar);
    navbar.addEventListener("focusin", showNavbar);
    navbar.querySelector(".w-nav-button")?.addEventListener("click", () => {
      window.setTimeout(showNavbar, 0);
    });
    reducedMotion.addEventListener("change", applyBaseStyles);
  }
  function initSmartNavbar() {
    window.Webflow ||= [];
    window.Webflow.push(() => {
      initializeSmartNavbar();
    });
  }

  // src/components/navbar/index.ts
  function initNavbar() {
    onDomReady(initMobileNavbarMenus);
    initSmartNavbar();
  }

  // src/components/practice-text-reel/index.ts
  var PRACTICE_TEXT_REEL_SETTINGS = {
    /*
      Activează sau dezactivează animația automată.
      Dacă devine false, lista completă va fi afișată static.
    */
    runAnimation: true,
    /*
      Pe desktop, animația se oprește discret cât timp utilizatorul
      ține cursorul peste componentă pentru a citi.
      Pe dispozitive touch această regulă nu se aplică.
    */
    pauseOnHover: false,
    /*
      Webflow mobile landscape și mobile portrait.
    */
    mobileBreakpoint: 767,
    /*
      Item-ul afișat prima dată când animația pornește.
      0 = afaceri din sectorul energetic
      1 = profesioniști din medical
      2 = dezvoltatori imobiliari
      3 = organizații sportive
      4 = societăți din domeniul agricol
      5 = investitori și fondatori
    */
    initialActiveIndex: 0,
    /*
      Animația pornește doar după ce o parte relevantă
      a componentei a intrat în viewport.
    */
    visibilityThreshold: 0.01,
    /*
      Permite utilizatorului să tragă lista manual.
      Folosește Pointer Events, deci funcționează pe mouse, touch și stylus.
    */
    dragEnabled: true,
    /*
      Numărul minim de pixeli înainte ca pointer-ul să fie tratat ca drag.
      Previne pornirea accidentală a interacțiunii la un simplu tap/click.
    */
    dragMinDistance: 6,
    /*
      Cât de mult trebuie să tragă utilizatorul ca starea vizuală
      să treacă pe item-ul următor/anterior în timpul drag-ului.
    */
    dragStateChangeThreshold: 0.38,
    /*
      Cât de mult trebuie să tragă utilizatorul ca item-ul următor/anterior
      să fie selectat la release, dacă gestul nu are viteză mare.
    */
    dragReleaseThreshold: 0.34,
    /*
      Dacă utilizatorul eliberează cu o mișcare rapidă,
      reel-ul avansează încă un item în direcția gestului.
      Valoarea este în px/ms.
    */
    dragVelocityThreshold: 0.65,
    /*
      Limitează cât de departe poate fi tras track-ul peste un singur item.
      Asta păstrează senzația editorială și previne spațiile goale mari.
    */
    dragMaxPullRatio: 1.08,
    /*
      Câtă rezistență primește drag-ul după ce trece de zona naturală.
      Valori mici = mai controlat. Valori mari = mai elastic.
    */
    dragResistance: 0.16
  };
  var PRACTICE_TEXT_REEL_STATE_CLASSES = [
    "is-active",
    "is-prev",
    "is-next",
    "is-prev-two",
    "is-next-two"
  ];
  function initPracticeTextReels() {
    const components = document.querySelectorAll(
      "[data-practice-text-reel], .practice-text-reel_component"
    );
    const mobileQuery = window.matchMedia(
      `(max-width: ${PRACTICE_TEXT_REEL_SETTINGS.mobileBreakpoint}px)`
    );
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    components.forEach((component) => {
      if (component.dataset.reelReady === "true") return;
      component.dataset.reelReady = "true";
      const prefix = component.querySelector(
        ".practice-text-reel_prefix"
      );
      const mask = component.querySelector(".practice-text-reel_mask");
      const track = component.querySelector(".practice-text-reel_track");
      if (!prefix || !mask || !track) return;
      let originalItemCount = 0;
      let currentTrackIndex = 0;
      let activeLogicalIndex = PRACTICE_TEXT_REEL_SETTINGS.initialActiveIndex;
      let isMobile = mobileQuery.matches;
      let shouldAnimate = false;
      let isInView = !("IntersectionObserver" in window);
      let isPausedByHover = false;
      let isLoopResetting = false;
      let holdTimer;
      let setupFrame;
      let resetFrame;
      let resizeTimer;
      let dragResumeTimer;
      let isDragging = false;
      let hasDragMoved = false;
      let dragPointerId;
      let dragStartClientY = 0;
      let dragStartTrackY = 0;
      let dragLastClientY = 0;
      let dragLastTime = 0;
      let dragVelocityY = 0;
      let dragBaseIndex = 0;
      let dragBaseY = 0;
      let dragCurrentDeltaY = 0;
      let dragVisualIndex = 0;
      let dragPendingTrackY = null;
      let dragFrame;
      let lastViewportWidth = window.innerWidth;
      function getOriginalItems() {
        return Array.from(
          track.querySelectorAll(".practice-text-reel_item:not([aria-hidden='true'])")
        );
      }
      function getAllItems() {
        return Array.from(track.querySelectorAll(".practice-text-reel_item"));
      }
      function normalizeIndex(value, itemCount) {
        if (!itemCount) return 0;
        return (value % itemCount + itemCount) % itemCount;
      }
      function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }
      function getCssNumberVariable(name, fallback) {
        const value = Number.parseFloat(getComputedStyle(component).getPropertyValue(name).trim());
        return Number.isFinite(value) ? value : fallback;
      }
      function getDragResumeDelay() {
        return getCssNumberVariable("--reel-drag-resume-delay", 760);
      }
      function getHoldDuration() {
        const value = Number.parseFloat(
          getComputedStyle(component).getPropertyValue("--reel-hold-duration").trim()
        );
        return Number.isFinite(value) ? value : 2250;
      }
      function stopHoldTimer() {
        if (holdTimer === void 0) return;
        window.clearTimeout(holdTimer);
        holdTimer = void 0;
      }
      function clearDragResumeTimer() {
        if (dragResumeTimer === void 0) return;
        window.clearTimeout(dragResumeTimer);
        dragResumeTimer = void 0;
      }
      function cancelDragFrame() {
        if (dragFrame === void 0) return;
        window.cancelAnimationFrame(dragFrame);
        dragFrame = void 0;
      }
      function flushDragFrame() {
        if (dragPendingTrackY === null) return;
        cancelDragFrame();
        setTrackY(dragPendingTrackY, false);
        dragPendingTrackY = null;
      }
      function cancelScheduledFrames() {
        if (setupFrame !== void 0) {
          window.cancelAnimationFrame(setupFrame);
          setupFrame = void 0;
        }
        if (resetFrame !== void 0) {
          window.cancelAnimationFrame(resetFrame);
          resetFrame = void 0;
        }
        cancelDragFrame();
      }
      function syncMotionMode() {
        isMobile = mobileQuery.matches;
        const prefersReducedMotion = reducedMotionQuery.matches;
        shouldAnimate = PRACTICE_TEXT_REEL_SETTINGS.runAnimation && !prefersReducedMotion;
        component.classList.toggle("is-mobile-mode", isMobile);
        component.classList.toggle("is-reduced-motion", prefersReducedMotion);
        component.classList.toggle("is-static-list", !shouldAnimate);
      }
      function removeClones() {
        track.querySelectorAll(".practice-text-reel_item[aria-hidden='true']").forEach((item) => item.remove());
      }
      function createLoopClones(originalItems) {
        const prependedClones = originalItems.map((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          return clone;
        });
        const appendedClones = originalItems.map((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          return clone;
        });
        prependedClones.reverse().forEach((clone) => {
          track.insertBefore(clone, track.firstChild);
        });
        appendedClones.forEach((clone) => {
          track.appendChild(clone);
        });
      }
      function clearItemStates() {
        getAllItems().forEach((item) => {
          item.classList.remove(...PRACTICE_TEXT_REEL_STATE_CLASSES);
          item.style.removeProperty("opacity");
          item.style.removeProperty("transform");
        });
      }
      function setMobileMaskHeight(originalItems) {
        component.style.removeProperty("--reel-mobile-mask-height");
        if (!isMobile || !originalItems.length) return;
        const trackStyles = window.getComputedStyle(track);
        const gapValue = Number.parseFloat(trackStyles.rowGap) || Number.parseFloat(trackStyles.gap) || 0;
        const itemHeights = originalItems.map((item) => {
          return Math.ceil(item.getBoundingClientRect().height);
        });
        const visibleItemCount = Math.min(3, itemHeights.length);
        let largestVisibleGroupHeight = 0;
        for (let startIndex = 0; startIndex < itemHeights.length; startIndex += 1) {
          let currentGroupHeight = gapValue * Math.max(visibleItemCount - 1, 0);
          for (let offset = 0; offset < visibleItemCount; offset += 1) {
            const loopingIndex = (startIndex + offset) % itemHeights.length;
            currentGroupHeight += itemHeights[loopingIndex];
          }
          largestVisibleGroupHeight = Math.max(largestVisibleGroupHeight, currentGroupHeight);
        }
        component.style.setProperty(
          "--reel-mobile-mask-height",
          `${Math.ceil(largestVisibleGroupHeight + 2)}px`
        );
      }
      function getTargetY(targetIndex) {
        const targetItem = getAllItems()[targetIndex];
        if (!targetItem) return 0;
        if (isMobile) {
          return -targetItem.offsetTop;
        }
        const maskRect = mask.getBoundingClientRect();
        const prefixRect = prefix.getBoundingClientRect();
        const prefixCenterRelativeToMask = prefixRect.top + prefixRect.height / 2 - maskRect.top;
        const itemCenterInTrack = targetItem.offsetTop + targetItem.offsetHeight / 2;
        return prefixCenterRelativeToMask - itemCenterInTrack;
      }
      function getCurrentTrackY() {
        const { transform } = window.getComputedStyle(track);
        if (!transform || transform === "none") return 0;
        const matrixValues = transform.match(/matrix.*\((.+)\)/)?.[1];
        if (!matrixValues) return 0;
        const values = matrixValues.split(",").map((value) => Number.parseFloat(value.trim()));
        if (transform.startsWith("matrix3d")) {
          return Number.isFinite(values[13]) ? values[13] : 0;
        }
        return Number.isFinite(values[5]) ? values[5] : 0;
      }
      function setTrackY(value, animate) {
        if (animate) {
          track.style.removeProperty("transition-duration");
        } else {
          track.style.transitionDuration = "0ms";
        }
        track.style.transform = `translate3d(0, ${value}px, 0)`;
      }
      function scheduleDragTrackY(value) {
        dragPendingTrackY = value;
        if (dragFrame !== void 0) return;
        dragFrame = window.requestAnimationFrame(() => {
          dragFrame = void 0;
          if (dragPendingTrackY === null) return;
          setTrackY(dragPendingTrackY, false);
          dragPendingTrackY = null;
        });
      }
      function setTrackPosition(targetIndex, animate) {
        setTrackY(getTargetY(targetIndex), animate);
      }
      function getLoopResetIndex() {
        if (!originalItemCount) return null;
        if (currentTrackIndex < originalItemCount) {
          return currentTrackIndex + originalItemCount;
        }
        if (currentTrackIndex >= originalItemCount * 2) {
          return currentTrackIndex - originalItemCount;
        }
        return null;
      }
      function updateActiveLogicalIndexFromTrackIndex(trackIndex) {
        activeLogicalIndex = normalizeIndex(trackIndex - originalItemCount, originalItemCount);
      }
      function applyVisualState(targetIndex) {
        const items = getAllItems();
        items.forEach((item) => {
          item.classList.remove(...PRACTICE_TEXT_REEL_STATE_CLASSES);
        });
        items[targetIndex]?.classList.add("is-active");
        if (isMobile) {
          items[targetIndex + 1]?.classList.add("is-next");
          items[targetIndex + 2]?.classList.add("is-next-two");
          return;
        }
        items[targetIndex - 1]?.classList.add("is-prev");
        items[targetIndex + 1]?.classList.add("is-next");
        items[targetIndex - 2]?.classList.add("is-prev-two");
        items[targetIndex + 2]?.classList.add("is-next-two");
      }
      function queueNextMove() {
        stopHoldTimer();
        if (!shouldAnimate || !isInView || isPausedByHover || isLoopResetting || isDragging || document.hidden || component.classList.contains("is-setting-up") || component.classList.contains("is-drag-settling")) {
          return;
        }
        holdTimer = window.setTimeout(() => {
          holdTimer = void 0;
          currentTrackIndex += 1;
          activeLogicalIndex = normalizeIndex(activeLogicalIndex + 1, originalItemCount);
          applyVisualState(currentTrackIndex);
          setTrackPosition(currentTrackIndex, true);
        }, getHoldDuration());
      }
      function silentlyResetLoop() {
        if (!shouldAnimate) return false;
        const resetIndex = getLoopResetIndex();
        if (resetIndex === null) return false;
        isLoopResetting = true;
        component.classList.add("is-loop-resetting");
        currentTrackIndex = resetIndex;
        updateActiveLogicalIndexFromTrackIndex(currentTrackIndex);
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, false);
        void track.offsetHeight;
        resetFrame = window.requestAnimationFrame(() => {
          component.classList.remove("is-loop-resetting");
          track.style.removeProperty("transition-duration");
          isLoopResetting = false;
          resetFrame = void 0;
          queueNextMove();
        });
        return true;
      }
      function finishInstantSetup() {
        void track.offsetHeight;
        setupFrame = window.requestAnimationFrame(() => {
          component.classList.remove("is-setting-up");
          track.style.removeProperty("transition-duration");
          setupFrame = void 0;
          queueNextMove();
        });
      }
      function resetDragState() {
        isDragging = false;
        hasDragMoved = false;
        dragPointerId = void 0;
        dragVelocityY = 0;
        dragBaseIndex = currentTrackIndex;
        dragBaseY = getCurrentTrackY();
        dragCurrentDeltaY = 0;
        dragVisualIndex = currentTrackIndex;
        dragPendingTrackY = null;
        cancelDragFrame();
        clearDragResumeTimer();
        component.classList.remove("is-dragging", "is-drag-settling");
      }
      function setup() {
        stopHoldTimer();
        cancelScheduledFrames();
        resetDragState();
        component.classList.add("is-initialized", "is-setting-up");
        component.classList.remove("is-loop-resetting");
        isLoopResetting = false;
        syncMotionMode();
        removeClones();
        clearItemStates();
        const originalItems = getOriginalItems();
        originalItemCount = originalItems.length;
        if (!originalItemCount) {
          component.classList.remove("is-setting-up");
          return;
        }
        activeLogicalIndex = normalizeIndex(activeLogicalIndex, originalItemCount);
        if (!shouldAnimate) {
          component.style.removeProperty("--reel-mobile-mask-height");
          track.style.transitionDuration = "0ms";
          track.style.transform = "none";
          finishInstantSetup();
          return;
        }
        component.classList.remove("is-static-list");
        if (isMobile) {
          setMobileMaskHeight(originalItems);
        } else {
          component.style.removeProperty("--reel-mobile-mask-height");
        }
        createLoopClones(originalItems);
        currentTrackIndex = originalItemCount + activeLogicalIndex;
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, false);
        finishInstantSetup();
      }
      function canDrag() {
        return PRACTICE_TEXT_REEL_SETTINGS.dragEnabled && shouldAnimate && originalItemCount > 1 && !isLoopResetting && !component.classList.contains("is-setting-up") && !component.classList.contains("is-drag-settling");
      }
      function getDragDirection(deltaY) {
        if (Math.abs(deltaY) < PRACTICE_TEXT_REEL_SETTINGS.dragMinDistance) return 0;
        return deltaY < 0 ? 1 : -1;
      }
      function getVelocityDirection(velocityY) {
        if (Math.abs(velocityY) < PRACTICE_TEXT_REEL_SETTINGS.dragVelocityThreshold) return 0;
        return velocityY < 0 ? 1 : -1;
      }
      function getNeighborIndex(baseIndex, direction) {
        const items = getAllItems();
        if (!items.length || direction === 0) return baseIndex;
        return clamp(baseIndex + direction, 0, items.length - 1);
      }
      function getDragStepDistance(baseIndex, direction) {
        const neighborIndex = getNeighborIndex(baseIndex, direction);
        if (neighborIndex === baseIndex) return 1;
        return Math.max(Math.abs(getTargetY(neighborIndex) - getTargetY(baseIndex)), 1);
      }
      function getResistedDelta(deltaY, stepDistance) {
        const sign = Math.sign(deltaY);
        const distance = Math.abs(deltaY);
        const maxNaturalDistance = stepDistance * PRACTICE_TEXT_REEL_SETTINGS.dragMaxPullRatio;
        if (distance <= maxNaturalDistance) return deltaY;
        const extraDistance = distance - maxNaturalDistance;
        return sign * (maxNaturalDistance + extraDistance * PRACTICE_TEXT_REEL_SETTINGS.dragResistance);
      }
      function getDragProgress(deltaY, stepDistance) {
        return clamp(Math.abs(deltaY) / stepDistance, 0, 1);
      }
      function beginDrag(event) {
        if (!canDrag()) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        isDragging = true;
        hasDragMoved = false;
        dragPointerId = event.pointerId;
        dragStartClientY = event.clientY;
        dragStartTrackY = getCurrentTrackY();
        dragLastClientY = event.clientY;
        dragLastTime = performance.now();
        dragVelocityY = 0;
        dragBaseIndex = currentTrackIndex;
        dragBaseY = getTargetY(currentTrackIndex);
        dragCurrentDeltaY = 0;
        dragVisualIndex = currentTrackIndex;
        dragPendingTrackY = null;
        stopHoldTimer();
        clearDragResumeTimer();
        component.classList.add("is-dragging");
        component.classList.remove("is-drag-settling");
        track.style.transitionDuration = "0ms";
        try {
          mask.setPointerCapture(event.pointerId);
        } catch {
        }
      }
      function updateDrag(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        const currentTime = performance.now();
        const rawDeltaY = event.clientY - dragStartClientY;
        const direction = getDragDirection(rawDeltaY);
        if (!hasDragMoved && direction === 0) return;
        hasDragMoved = true;
        if (event.cancelable) {
          event.preventDefault();
        }
        const timeDelta = Math.max(currentTime - dragLastTime, 1);
        dragVelocityY = (event.clientY - dragLastClientY) / timeDelta;
        dragLastClientY = event.clientY;
        dragLastTime = currentTime;
        dragCurrentDeltaY = rawDeltaY;
        if (direction === 0) {
          scheduleDragTrackY(dragStartTrackY + rawDeltaY);
          if (dragVisualIndex !== dragBaseIndex) {
            dragVisualIndex = dragBaseIndex;
            applyVisualState(dragVisualIndex);
          }
          return;
        }
        const stepDistance = getDragStepDistance(dragBaseIndex, direction);
        const resistedDeltaY = getResistedDelta(rawDeltaY, stepDistance);
        const progress = getDragProgress(rawDeltaY, stepDistance);
        const candidateIndex = getNeighborIndex(dragBaseIndex, direction);
        scheduleDragTrackY(dragBaseY + resistedDeltaY);
        const nextVisualIndex = progress >= PRACTICE_TEXT_REEL_SETTINGS.dragStateChangeThreshold ? candidateIndex : dragBaseIndex;
        if (nextVisualIndex === dragVisualIndex) return;
        dragVisualIndex = nextVisualIndex;
        applyVisualState(dragVisualIndex);
      }
      function getReleaseIndex() {
        const velocityDirection = getVelocityDirection(dragVelocityY);
        const dragDirection = getDragDirection(dragCurrentDeltaY);
        const direction = velocityDirection || dragDirection;
        if (direction === 0) return dragBaseIndex;
        const stepDistance = getDragStepDistance(dragBaseIndex, direction);
        const progress = getDragProgress(dragCurrentDeltaY, stepDistance);
        const candidateIndex = getNeighborIndex(dragBaseIndex, direction);
        if (velocityDirection !== 0 || progress >= PRACTICE_TEXT_REEL_SETTINGS.dragReleaseThreshold) {
          return candidateIndex;
        }
        return dragBaseIndex;
      }
      function finishDrag(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        try {
          if (mask.hasPointerCapture(event.pointerId)) {
            mask.releasePointerCapture(event.pointerId);
          }
        } catch {
        }
        flushDragFrame();
        component.classList.remove("is-dragging");
        const shouldSnap = hasDragMoved;
        isDragging = false;
        hasDragMoved = false;
        dragPointerId = void 0;
        if (!shouldSnap) {
          track.style.removeProperty("transition-duration");
          queueNextMove();
          return;
        }
        currentTrackIndex = getReleaseIndex();
        updateActiveLogicalIndexFromTrackIndex(currentTrackIndex);
        component.classList.add("is-drag-settling");
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, true);
        clearDragResumeTimer();
        dragResumeTimer = window.setTimeout(() => {
          dragResumeTimer = void 0;
          component.classList.remove("is-drag-settling");
          if (silentlyResetLoop()) return;
          queueNextMove();
        }, getDragResumeDelay());
      }
      function cancelDrag(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        finishDrag(event);
      }
      track.addEventListener("transitionend", (event) => {
        if (event.target !== track || event.propertyName !== "transform") {
          return;
        }
        if (component.classList.contains("is-drag-settling")) {
          component.classList.remove("is-drag-settling");
          clearDragResumeTimer();
        }
        if (silentlyResetLoop()) return;
        queueNextMove();
      });
      mask.addEventListener("pointerdown", beginDrag);
      window.addEventListener("pointermove", updateDrag, { passive: false });
      window.addEventListener("pointerup", finishDrag);
      window.addEventListener("pointercancel", cancelDrag);
      component.addEventListener("pointerenter", () => {
        if (!PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover || !finePointerQuery.matches || !shouldAnimate) {
          return;
        }
        isPausedByHover = true;
        stopHoldTimer();
      });
      component.addEventListener("pointerleave", () => {
        if (!PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover || !finePointerQuery.matches || !shouldAnimate) {
          return;
        }
        isPausedByHover = false;
        queueNextMove();
      });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopHoldTimer();
          resetDragState();
          return;
        }
        queueNextMove();
      });
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry) return;
            const nextInView = entry.isIntersecting && entry.intersectionRatio >= PRACTICE_TEXT_REEL_SETTINGS.visibilityThreshold;
            if (nextInView === isInView) return;
            isInView = nextInView;
            if (isInView) {
              queueNextMove();
            } else {
              stopHoldTimer();
            }
          },
          {
            threshold: [0, PRACTICE_TEXT_REEL_SETTINGS.visibilityThreshold]
          }
        );
        observer.observe(component);
      }
      reducedMotionQuery.addEventListener("change", setup);
      window.addEventListener("resize", () => {
        const nextViewportWidth = window.innerWidth;
        if (Math.abs(nextViewportWidth - lastViewportWidth) < 2) {
          return;
        }
        lastViewportWidth = nextViewportWidth;
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          setup();
        }, 150);
      });
      if (document.fonts) {
        document.fonts.ready.then(() => {
          setup();
        });
      }
      setup();
    });
  }

  // src/components/reading-time/reading-time.ts
  var SELECTORS2 = {
    pageSource: '[data-reading-time-source="page"]',
    pageTarget: '[data-reading-time-target="page"]',
    cardItem: '[data-reading-time-item="card"]',
    cardSource: '[data-reading-time-source="card"]',
    cardTarget: '[data-reading-time-target="card"]',
    ignoredContent: 'script, style, noscript, svg, img, iframe, video, audio, canvas, [aria-hidden="true"], [data-reading-time-ignore="true"]'
  };
  var DEFAULT_WORDS_PER_MINUTE = 200;
  var DEFAULT_MINIMUM_MINUTES = 1;
  var hasInitializedReadingTime = false;
  function getWordMatches(text) {
    const cleanText = text.trim();
    if (!cleanText) return [];
    try {
      return cleanText.match(/[\p{L}\p{N}]+(?:['\u2019][\p{L}\p{N}]+)*/gu) || [];
    } catch {
      return cleanText.match(/[A-Za-z\u00C0-\u017E0-9]+(?:['\u2019][A-Za-z\u00C0-\u017E0-9]+)*/g) || [];
    }
  }
  function getReadableText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    const ignoredElements = clone.querySelectorAll(SELECTORS2.ignoredContent);
    ignoredElements.forEach((ignoredElement) => {
      ignoredElement.remove();
    });
    return clone.textContent?.replace(/\s+/g, " ").trim() || "";
  }
  function getWordsPerMinute(element) {
    const customValue = element?.getAttribute("data-reading-time-wpm");
    const customWordsPerMinute = Number(customValue);
    if (Number.isFinite(customWordsPerMinute) && customWordsPerMinute > 0) {
      return customWordsPerMinute;
    }
    return DEFAULT_WORDS_PER_MINUTE;
  }
  function calculateReadingMinutes(source) {
    const text = getReadableText(source);
    const wordCount = getWordMatches(text).length;
    if (!wordCount) return null;
    const wordsPerMinute = getWordsPerMinute(source);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(DEFAULT_MINIMUM_MINUTES, minutes);
  }
  function getLabelText(minutes) {
    return minutes === 1 ? "minut de lectur\u0103" : "minute de lectur\u0103";
  }
  function findComponent(target, type) {
    return target.closest(`[data-reading-time-component="${type}"]`) || target.closest("[data-reading-time-component]") || target.closest(".heading-cms_timer") || target.closest(".resources_timer");
  }
  function findLabel(target, type) {
    const component = findComponent(target, type);
    return component?.querySelector(`[data-reading-time-label="${type}"]`) || component?.querySelector("[data-reading-time-label]") || target.parentElement?.querySelector("[data-reading-time-label]") || null;
  }
  function showComponent(target, type) {
    const component = findComponent(target, type);
    if (!component) return;
    if (component.hidden) {
      component.hidden = false;
    }
    if (component.getAttribute("aria-hidden") === "true") {
      component.removeAttribute("aria-hidden");
    }
  }
  function hideComponent(target, type) {
    const component = findComponent(target, type);
    if (!component) return;
    if (!component.hidden) {
      component.hidden = true;
    }
    if (component.getAttribute("aria-hidden") !== "true") {
      component.setAttribute("aria-hidden", "true");
    }
  }
  function setReadingTime(target, minutes, type) {
    const numberText = String(minutes);
    const labelText = getLabelText(minutes);
    const label = findLabel(target, type);
    const ariaLabel = `${numberText} ${labelText}`;
    if (target.textContent?.trim() !== numberText) {
      target.textContent = numberText;
    }
    if (target.getAttribute("aria-label") !== ariaLabel) {
      target.setAttribute("aria-label", ariaLabel);
    }
    if (label && label.textContent?.trim() !== labelText) {
      label.textContent = labelText;
    }
    showComponent(target, type);
  }
  function updatePageReadingTime() {
    const source = document.querySelector(SELECTORS2.pageSource);
    const target = document.querySelector(SELECTORS2.pageTarget);
    if (!target) return;
    const minutes = calculateReadingMinutes(source);
    if (!minutes) {
      hideComponent(target, "page");
      return;
    }
    setReadingTime(target, minutes, "page");
  }
  function updateCardReadingTime(cardItem) {
    const source = cardItem.querySelector(SELECTORS2.cardSource);
    const target = cardItem.querySelector(SELECTORS2.cardTarget);
    if (!target) return;
    const minutes = calculateReadingMinutes(source);
    if (!minutes) {
      hideComponent(target, "card");
      return;
    }
    setReadingTime(target, minutes, "card");
  }
  function updateCardReadingTimes() {
    const cardItems = document.querySelectorAll(SELECTORS2.cardItem);
    cardItems.forEach((cardItem) => {
      updateCardReadingTime(cardItem);
    });
  }
  function initReadingTime() {
    if (hasInitializedReadingTime) return;
    hasInitializedReadingTime = true;
    updatePageReadingTime();
    updateCardReadingTimes();
  }

  // src/components/related-articles/index.ts
  var RELATED_ARTICLES_SECTION_SELECTOR = '[data-related-articles-section="true"]';
  var RELATED_ARTICLES_EMPTY_SELECTOR = '[data-related-articles-empty="true"]';
  function initRelatedArticlesEmptyState() {
    const sections = document.querySelectorAll(RELATED_ARTICLES_SECTION_SELECTOR);
    sections.forEach((section) => {
      const emptyState = section.querySelector(RELATED_ARTICLES_EMPTY_SELECTOR);
      if (!emptyState) return;
      const styles = window.getComputedStyle(emptyState);
      const isEmptyStateVisible = !emptyState.hidden && styles.display !== "none" && styles.visibility !== "hidden";
      if (isEmptyStateVisible) {
        section.hidden = true;
        section.setAttribute("aria-hidden", "true");
        return;
      }
      section.hidden = false;
      section.removeAttribute("aria-hidden");
    });
  }

  // src/components/resources-filter/index.ts
  var ROOT_SELECTOR = '[data-tsa-filter="resources"]';
  var TRIGGER_SELECTOR = '[data-tsa-filter-trigger="true"]';
  var ITEM_SELECTOR = '[data-tsa-filter-item="true"]';
  var FILTER_ALIASES = {
    toate: "all",
    "toate-articolele": "all",
    all: "all",
    civil: "drept-civil",
    "drept-civil": "drept-civil",
    penal: "drept-penal",
    "drept-penal": "drept-penal"
  };
  var ALLOWED_FILTERS = /* @__PURE__ */ new Set(["all", "drept-civil", "drept-penal"]);
  function slugify(value = "") {
    return (value ?? "").toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function normalizeFilter(value = "") {
    const slug = slugify(value);
    return FILTER_ALIASES[slug] || slug;
  }
  function isAllowedFilter(value) {
    return ALLOWED_FILTERS.has(value);
  }
  function getUrlFilter() {
    const params = new URLSearchParams(window.location.search);
    const urlValue = normalizeFilter(params.get("arie") || "all");
    return isAllowedFilter(urlValue) ? urlValue : "all";
  }
  function updateUrl(filter) {
    const url = new URL(window.location.href);
    if (filter === "all") {
      url.searchParams.delete("arie");
    } else {
      url.searchParams.set("arie", filter);
    }
    window.history.replaceState({ tsaFilter: filter }, "", url.toString());
  }
  function initFilterGroup(root) {
    if (root.dataset.tsaFilterReady === "true") return;
    const triggers = Array.from(root.querySelectorAll(TRIGGER_SELECTOR));
    const items = Array.from(root.querySelectorAll(ITEM_SELECTOR));
    const tabsWrapper = root.querySelector('[data-tsa-filter-tabs="true"]');
    const emptyState = root.querySelector("[data-tsa-filter-empty]");
    if (!triggers.length || !items.length) return;
    root.dataset.tsaFilterReady = "true";
    if (tabsWrapper) {
      tabsWrapper.setAttribute("role", "tablist");
    }
    function getItemArea(item) {
      const attributeValue = item.getAttribute("data-tsa-filter-area");
      if (attributeValue) {
        return normalizeFilter(attributeValue);
      }
      const fallbackSource = item.querySelector("[data-tsa-filter-source]");
      return normalizeFilter(fallbackSource ? fallbackSource.textContent : "");
    }
    function setFilter(filter, shouldUpdateUrl = false) {
      const activeFilter = isAllowedFilter(filter) ? filter : "all";
      let visibleCount = 0;
      items.forEach((item) => {
        const itemArea = getItemArea(item);
        const shouldShow = activeFilter === "all" || itemArea === activeFilter;
        item.classList.toggle("is-filter-hidden", !shouldShow);
        item.toggleAttribute("hidden", !shouldShow);
        item.setAttribute("aria-hidden", shouldShow ? "false" : "true");
        if (shouldShow) visibleCount += 1;
      });
      triggers.forEach((trigger) => {
        const triggerValue = normalizeFilter(trigger.getAttribute("data-tsa-filter-value"));
        const isActive = triggerValue === activeFilter;
        trigger.classList.toggle("is-active", isActive);
        trigger.setAttribute("aria-selected", isActive ? "true" : "false");
        trigger.setAttribute("tabindex", isActive ? "0" : "-1");
      });
      if (emptyState) {
        emptyState.classList.toggle("is-visible", visibleCount === 0);
      }
      if (shouldUpdateUrl) {
        updateUrl(activeFilter);
      }
    }
    triggers.forEach((trigger, index) => {
      trigger.setAttribute("role", "tab");
      if (trigger instanceof HTMLButtonElement && !trigger.hasAttribute("type")) {
        trigger.setAttribute("type", "button");
      }
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const filterValue = normalizeFilter(trigger.getAttribute("data-tsa-filter-value"));
        setFilter(filterValue, true);
      });
      trigger.addEventListener("keydown", (event) => {
        const { key } = event;
        if (key === "Enter" || key === " ") {
          event.preventDefault();
          const filterValue = normalizeFilter(trigger.getAttribute("data-tsa-filter-value"));
          setFilter(filterValue, true);
        }
        if (key === "ArrowRight" || key === "ArrowDown") {
          event.preventDefault();
          const nextTrigger = triggers[(index + 1) % triggers.length];
          nextTrigger?.focus();
        }
        if (key === "ArrowLeft" || key === "ArrowUp") {
          event.preventDefault();
          const previousTrigger = triggers[(index - 1 + triggers.length) % triggers.length];
          previousTrigger?.focus();
        }
      });
    });
    setFilter(getUrlFilter(), false);
    window.addEventListener("popstate", () => {
      setFilter(getUrlFilter(), false);
    });
  }
  function initResourcesFilters() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initFilterGroup);
  }

  // src/components/team-card/index.ts
  var READY_CLASS = "team-scroll-motion-ready";
  var ACTIVE_CLASS = "is-inview";
  var CARD_SELECTOR = ".team_component .team_card";
  var IMAGE_SELECTOR = ".team_image";
  var AVATAR_SELECTOR = ".team_avatar";
  var MOBILE_QUERY = "(max-width: 767px)";
  var REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
  var ORIENTATION_RESET_DELAY = 250;
  var ENTER_ZONE_TOP = 0.35;
  var ENTER_ZONE_BOTTOM = 0.68;
  var RESET_OFFSET = 80;
  var DEBUG_TEAM_LAYOUT = false;
  var EXPECTED_IMAGE_WIDTH_REM = 14.5;
  var EXPECTED_IMAGE_HEIGHT_REM = 18.125;
  var LAYOUT_TOLERANCE_PX = 1;
  var isTeamCardMotionQueued = false;
  var isTeamLayoutDebugQueued = false;
  function isWithinTolerance(actual, expected) {
    return Math.abs(actual - expected) <= LAYOUT_TOLERANCE_PX;
  }
  function formatSize(size) {
    return `${size.width.toFixed(1)} x ${size.height.toFixed(1)}`;
  }
  function getElementLayoutSize(element, computedStyles) {
    const computedWidth = Number.parseFloat(computedStyles.width);
    const computedHeight = Number.parseFloat(computedStyles.height);
    return {
      width: Number.isFinite(computedWidth) ? computedWidth : element.offsetWidth,
      height: Number.isFinite(computedHeight) ? computedHeight : element.offsetHeight
    };
  }
  function getExpectedImageSize(imageSize) {
    const rootFontSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    const remSize = Number.isFinite(rootFontSize) ? rootFontSize : 16;
    const desktopWidth = EXPECTED_IMAGE_WIDTH_REM * remSize;
    const desktopHeight = EXPECTED_IMAGE_HEIGHT_REM * remSize;
    if (window.matchMedia("(min-width: 992px)").matches) {
      return {
        width: desktopWidth,
        height: desktopHeight
      };
    }
    const responsiveWidth = imageSize.width || desktopWidth;
    return {
      width: responsiveWidth,
      height: responsiveWidth * (desktopHeight / desktopWidth)
    };
  }
  function logTeamLayout() {
    if (!DEBUG_TEAM_LAYOUT) return;
    const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
    if (!cards.length) return;
    cards.forEach((card, index) => {
      const image = card.querySelector(IMAGE_SELECTOR);
      const avatar = card.querySelector(AVATAR_SELECTOR);
      if (!image || !avatar) {
        console.warn(`[TSA Team Layout] Card ${index + 1}: Missing team image or avatar`, {
          hasImage: Boolean(image),
          hasAvatar: Boolean(avatar)
        });
        return;
      }
      const imageComputed = window.getComputedStyle(image);
      const avatarComputed = window.getComputedStyle(avatar);
      const imageSize = getElementLayoutSize(image, imageComputed);
      const avatarSize = getElementLayoutSize(avatar, avatarComputed);
      const imageVisualRect = image.getBoundingClientRect();
      const avatarVisualRect = avatar.getBoundingClientRect();
      const expectedSize = getExpectedImageSize(imageSize);
      const avatarFillsImage = isWithinTolerance(avatarSize.width, imageSize.width) && isWithinTolerance(avatarSize.height, imageSize.height);
      const isCorrect = isWithinTolerance(imageSize.width, expectedSize.width) && isWithinTolerance(imageSize.height, expectedSize.height) && avatarFillsImage;
      console.log(`[TSA Team Layout] Card ${index + 1}: ${isCorrect ? "OK" : "Check"}`, {
        imageSize: formatSize(imageSize),
        avatarSize: formatSize(avatarSize),
        imageVisualSize: formatSize(imageVisualRect),
        avatarVisualSize: formatSize(avatarVisualRect),
        expectedSize: `${expectedSize.width.toFixed(1)} x ${expectedSize.height.toFixed(1)}`,
        computedWidth: imageComputed.width,
        computedHeight: imageComputed.height,
        computedPosition: imageComputed.position,
        avatarComputedWidth: avatarComputed.width,
        avatarComputedHeight: avatarComputed.height,
        avatarComputedPosition: avatarComputed.position,
        objectFit: avatarComputed.objectFit,
        avatarFillsImage,
        isCorrect
      });
    });
  }
  function setupTeamLayoutDebug() {
    if (!DEBUG_TEAM_LAYOUT || isTeamLayoutDebugQueued) return;
    isTeamLayoutDebugQueued = true;
    const requestLog = () => {
      window.requestAnimationFrame(logTeamLayout);
    };
    let resizeTimer;
    requestLog();
    if (document.readyState !== "complete") {
      window.addEventListener("load", requestLog, { once: true });
    }
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(requestLog, 160);
      },
      { passive: true }
    );
  }
  function initializeTeamCardScrollMotion() {
    setupTeamLayoutDebug();
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let cards = [];
    let orientationTimer;
    let rafId = null;
    let isListening = false;
    function updateCards() {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const enterZoneTop = viewportHeight * ENTER_ZONE_TOP;
      const enterZoneBottom = viewportHeight * ENTER_ZONE_BOTTOM;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const isActive = card.classList.contains(ACTIVE_CLASS);
        const isInsideEnterZone = cardCenter >= enterZoneTop && cardCenter <= enterZoneBottom;
        const isFullyOutOfView = rect.bottom < -RESET_OFFSET || rect.top > viewportHeight + RESET_OFFSET;
        if (isFullyOutOfView) {
          card.classList.remove(ACTIVE_CLASS);
          return;
        }
        if (!isActive && isInsideEnterZone) {
          card.classList.add(ACTIVE_CLASS);
        }
      });
    }
    function requestUpdate() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateCards();
      });
    }
    function addRuntimeListeners() {
      if (isListening) return;
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate, { passive: true });
      isListening = true;
    }
    function removeRuntimeListeners() {
      if (!isListening) return;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      isListening = false;
    }
    function reset() {
      removeRuntimeListeners();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.documentElement.classList.remove(READY_CLASS);
      cards.forEach((card) => {
        card.classList.remove(ACTIVE_CLASS);
      });
      cards = [];
    }
    function init() {
      reset();
      if (!mobileQuery.matches || reduceMotionQuery.matches) {
        return;
      }
      cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
      if (!cards.length) return;
      document.documentElement.classList.add(READY_CLASS);
      updateCards();
      addRuntimeListeners();
    }
    init();
    mobileQuery.addEventListener("change", init);
    reduceMotionQuery.addEventListener("change", init);
    window.addEventListener(
      "orientationchange",
      () => {
        window.clearTimeout(orientationTimer);
        orientationTimer = window.setTimeout(init, ORIENTATION_RESET_DELAY);
      },
      { passive: true }
    );
  }
  function initTeamCards() {
    if (isTeamCardMotionQueued) return;
    isTeamCardMotionQueued = true;
    window.Webflow ||= [];
    window.Webflow.push(() => {
      initializeTeamCardScrollMotion();
    });
  }

  // src/init-site.ts
  function initSite() {
    initNavbar();
    initTeamCards();
    initCallPopover();
    onDomReady(initAccordions);
    onDomReady(initPracticeTextReels);
    onDomReady(initReadingTime);
    onDomReady(initResourcesFilters);
    initBlogToc();
    onDomReady(initHeroAvatarHover);
    onDomReady(initRelatedArticlesEmptyState);
  }

  // src/index.ts
  initSite();
})();
//# sourceMappingURL=index.js.map
