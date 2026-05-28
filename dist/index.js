"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/components/accordions/index.ts
  function initAccordions() {
    const ROOT_SELECTOR = "[data-practices-accordion]";
    const GROUP_SELECTOR = "[data-practices-group]";
    const ITEM_SELECTOR = "[data-practices-item]";
    const TRIGGER_SELECTOR = "[data-practices-trigger]";
    const PANEL_SELECTOR = "[data-practices-panel]";
    const INNER_SELECTOR = "[data-practices-panel-inner]";
    const ICON_SELECTOR = "[data-practices-icon]";
    const DIVIDER_SELECTOR = ".divider-horizontal-full";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function initPracticesAccordions() {
      const { gsap } = window;
      const roots = document.querySelectorAll(ROOT_SELECTOR);
      if (!roots.length) return;
      if (!gsap) {
        console.warn(
          "Practices accordion: GSAP is missing. Enable the Webflow GSAP integration first."
        );
        return;
      }
      roots.forEach((root, rootIndex) => {
        if (root.dataset.accordionReady === "true") return;
        const activeTimelines = /* @__PURE__ */ new WeakMap();
        const groupRequestIds = /* @__PURE__ */ new WeakMap();
        const groups = Array.from(root.querySelectorAll(GROUP_SELECTOR));
        function getParts(item) {
          const inner = item.querySelector(INNER_SELECTOR);
          return {
            trigger: item.querySelector(TRIGGER_SELECTOR),
            panel: item.querySelector(PANEL_SELECTOR),
            inner,
            divider: inner?.querySelector(DIVIDER_SELECTOR) ?? null,
            icon: item.querySelector(ICON_SELECTOR)
          };
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
          if (open && !collapsible) {
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
        groups.forEach((group, groupIndex) => {
          const items = Array.from(group.querySelectorAll(ITEM_SELECTOR));
          const triggers = [];
          const initialMode = group.dataset.initialOpen || "first";
          const explicitlyOpen = items.find((item) => item.dataset.state === "open");
          const initialOpen = explicitlyOpen || (initialMode === "first" ? items[0] : null);
          items.forEach((item, itemIndex) => {
            const { trigger, panel, inner } = getParts(item);
            if (!trigger || !panel) return;
            if (!inner) {
              console.warn(
                "Practices accordion: missing [data-practices-panel-inner] inside panel.",
                panel
              );
              return;
            }
            const triggerId = trigger.id || `practices-trigger-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;
            const panelId = panel.id || `practices-panel-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;
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
              const requestId = getNextRequestId(group);
              const isOpen = item.dataset.state === "open";
              const isClosing = item.dataset.motion === "closing";
              const collapsible = group.dataset.collapsible !== "false";
              if (isClosing) {
                openItem(item, group, true);
                return;
              }
              if (isOpen) {
                if (collapsible) {
                  closeItem(item, group, true);
                }
                return;
              }
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
            Array.from(group.querySelectorAll(ITEM_SELECTOR)).forEach((item) => {
              setImmediateState(item, group, item.dataset.state === "open");
            });
          });
        };
        reducedMotion.addEventListener("change", syncForMotionPreference);
      });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPracticesAccordions, { once: true });
    } else {
      initPracticesAccordions();
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
      const tooltip = list.querySelector(HERO_AVATAR_SETTINGS.tooltipSelector);
      const tooltipName = tooltip?.querySelector(
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
    visibilityThreshold: 0.15
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
      const prefix = component.querySelector(".practice-text-reel_prefix");
      const mask = component.querySelector(".practice-text-reel_mask");
      const track = component.querySelector(".practice-text-reel_track");
      if (!prefix || !mask || !track) return;
      let originalItemCount = 0;
      let cycleStartIndex = 0;
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
      function cancelScheduledFrames() {
        if (setupFrame !== void 0) {
          window.cancelAnimationFrame(setupFrame);
          setupFrame = void 0;
        }
        if (resetFrame !== void 0) {
          window.cancelAnimationFrame(resetFrame);
          resetFrame = void 0;
        }
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
      function setTrackPosition(targetIndex, animate) {
        if (animate) {
          track.style.removeProperty("transition-duration");
        } else {
          track.style.transitionDuration = "0ms";
        }
        track.style.transform = `translate3d(0, ${getTargetY(targetIndex)}px, 0)`;
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
        if (!shouldAnimate || !isInView || isPausedByHover || isLoopResetting || document.hidden || component.classList.contains("is-setting-up")) {
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
        if (currentTrackIndex < cycleStartIndex + originalItemCount) {
          return false;
        }
        isLoopResetting = true;
        component.classList.add("is-loop-resetting");
        currentTrackIndex = cycleStartIndex;
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
      function setup() {
        stopHoldTimer();
        cancelScheduledFrames();
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
        cycleStartIndex = originalItemCount + activeLogicalIndex;
        currentTrackIndex = cycleStartIndex;
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, false);
        finishInstantSetup();
      }
      track.addEventListener("transitionend", (event) => {
        if (event.target !== track || event.propertyName !== "transform") {
          return;
        }
        if (silentlyResetLoop()) return;
        queueNextMove();
      });
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

  // node_modules/.pnpm/lenis@1.3.23/node_modules/lenis/dist/lenis.mjs
  var version = "1.3.23";
  function clamp(min, input, max) {
    return Math.max(min, Math.min(input, max));
  }
  function lerp(x, y, t) {
    return (1 - t) * x + t * y;
  }
  function damp(x, y, lambda, deltaTime) {
    return lerp(x, y, 1 - Math.exp(-lambda * deltaTime));
  }
  function modulo(n, d) {
    return (n % d + d) % d;
  }
  var Animate = class {
    isRunning = false;
    value = 0;
    from = 0;
    to = 0;
    currentTime = 0;
    lerp;
    duration;
    easing;
    onUpdate;
    /**
    * Advance the animation by the given delta time
    *
    * @param deltaTime - The time in seconds to advance the animation
    */
    advance(deltaTime) {
      if (!this.isRunning) return;
      let completed = false;
      if (this.duration && this.easing) {
        this.currentTime += deltaTime;
        const linearProgress = clamp(0, this.currentTime / this.duration, 1);
        completed = linearProgress >= 1;
        const easedProgress = completed ? 1 : this.easing(linearProgress);
        this.value = this.from + (this.to - this.from) * easedProgress;
      } else if (this.lerp) {
        this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
        if (Math.round(this.value) === Math.round(this.to)) {
          this.value = this.to;
          completed = true;
        }
      } else {
        this.value = this.to;
        completed = true;
      }
      if (completed) this.stop();
      this.onUpdate?.(this.value, completed);
    }
    /** Stop the animation */
    stop() {
      this.isRunning = false;
    }
    /**
    * Set up the animation from a starting value to an ending value
    * with optional parameters for lerping, duration, easing, and onUpdate callback
    *
    * @param from - The starting value
    * @param to - The ending value
    * @param options - Options for the animation
    */
    fromTo(from, to, { lerp: lerp2, duration, easing, onStart, onUpdate }) {
      this.from = this.value = from;
      this.to = to;
      this.lerp = lerp2;
      this.duration = duration;
      this.easing = easing;
      this.currentTime = 0;
      this.isRunning = true;
      onStart?.();
      this.onUpdate = onUpdate;
    }
  };
  function debounce(callback, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = void 0;
        callback.apply(this, args);
      }, delay);
    };
  }
  var Dimensions = class {
    width = 0;
    height = 0;
    scrollHeight = 0;
    scrollWidth = 0;
    debouncedResize;
    wrapperResizeObserver;
    contentResizeObserver;
    constructor(wrapper, content, { autoResize = true, debounce: debounceValue = 250 } = {}) {
      this.wrapper = wrapper;
      this.content = content;
      if (autoResize) {
        this.debouncedResize = debounce(this.resize, debounceValue);
        if (this.wrapper instanceof Window) window.addEventListener("resize", this.debouncedResize);
        else {
          this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize);
          this.wrapperResizeObserver.observe(this.wrapper);
        }
        this.contentResizeObserver = new ResizeObserver(this.debouncedResize);
        this.contentResizeObserver.observe(this.content);
      }
      this.resize();
    }
    destroy() {
      this.wrapperResizeObserver?.disconnect();
      this.contentResizeObserver?.disconnect();
      if (this.wrapper === window && this.debouncedResize) window.removeEventListener("resize", this.debouncedResize);
    }
    resize = () => {
      this.onWrapperResize();
      this.onContentResize();
    };
    onWrapperResize = () => {
      if (this.wrapper instanceof Window) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      } else {
        this.width = this.wrapper.clientWidth;
        this.height = this.wrapper.clientHeight;
      }
    };
    onContentResize = () => {
      if (this.wrapper instanceof Window) {
        this.scrollHeight = this.content.scrollHeight;
        this.scrollWidth = this.content.scrollWidth;
      } else {
        this.scrollHeight = this.wrapper.scrollHeight;
        this.scrollWidth = this.wrapper.scrollWidth;
      }
    };
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height
      };
    }
  };
  var Emitter = class {
    events = {};
    /**
    * Emit an event with the given data
    * @param event Event name
    * @param args Data to pass to the event handlers
    */
    emit(event, ...args) {
      const callbacks = this.events[event] || [];
      for (let i = 0, length = callbacks.length; i < length; i++) callbacks[i]?.(...args);
    }
    /**
    * Add a callback to the event
    * @param event Event name
    * @param cb Callback function
    * @returns Unsubscribe function
    */
    on(event, cb) {
      if (this.events[event]) this.events[event].push(cb);
      else this.events[event] = [cb];
      return () => {
        this.events[event] = this.events[event]?.filter((i) => cb !== i);
      };
    }
    /**
    * Remove a callback from the event
    * @param event Event name
    * @param callback Callback function
    */
    off(event, callback) {
      this.events[event] = this.events[event]?.filter((i) => callback !== i);
    }
    /**
    * Remove all event listeners and clean up
    */
    destroy() {
      this.events = {};
    }
  };
  var LINE_HEIGHT = 100 / 6;
  var listenerOptions = { passive: false };
  function getDeltaMultiplier(deltaMode, size) {
    if (deltaMode === 1) return LINE_HEIGHT;
    if (deltaMode === 2) return size;
    return 1;
  }
  var VirtualScroll = class {
    touchStart = {
      x: 0,
      y: 0
    };
    lastDelta = {
      x: 0,
      y: 0
    };
    window = {
      width: 0,
      height: 0
    };
    emitter = new Emitter();
    constructor(element, options = {
      wheelMultiplier: 1,
      touchMultiplier: 1
    }) {
      this.element = element;
      this.options = options;
      window.addEventListener("resize", this.onWindowResize);
      this.onWindowResize();
      this.element.addEventListener("wheel", this.onWheel, listenerOptions);
      this.element.addEventListener("touchstart", this.onTouchStart, listenerOptions);
      this.element.addEventListener("touchmove", this.onTouchMove, listenerOptions);
      this.element.addEventListener("touchend", this.onTouchEnd, listenerOptions);
    }
    /**
    * Add an event listener for the given event and callback
    *
    * @param event Event name
    * @param callback Callback function
    */
    on(event, callback) {
      return this.emitter.on(event, callback);
    }
    /** Remove all event listeners and clean up */
    destroy() {
      this.emitter.destroy();
      window.removeEventListener("resize", this.onWindowResize);
      this.element.removeEventListener("wheel", this.onWheel, listenerOptions);
      this.element.removeEventListener("touchstart", this.onTouchStart, listenerOptions);
      this.element.removeEventListener("touchmove", this.onTouchMove, listenerOptions);
      this.element.removeEventListener("touchend", this.onTouchEnd, listenerOptions);
    }
    /**
    * Event handler for 'touchstart' event
    *
    * @param event Touch event
    */
    onTouchStart = (event) => {
      const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
      this.touchStart.x = clientX;
      this.touchStart.y = clientY;
      this.lastDelta = {
        x: 0,
        y: 0
      };
      this.emitter.emit("scroll", {
        deltaX: 0,
        deltaY: 0,
        event
      });
    };
    /** Event handler for 'touchmove' event */
    onTouchMove = (event) => {
      const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
      const deltaX = -(clientX - this.touchStart.x) * this.options.touchMultiplier;
      const deltaY = -(clientY - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = clientX;
      this.touchStart.y = clientY;
      this.lastDelta = {
        x: deltaX,
        y: deltaY
      };
      this.emitter.emit("scroll", {
        deltaX,
        deltaY,
        event
      });
    };
    onTouchEnd = (event) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event
      });
    };
    /** Event handler for 'wheel' event */
    onWheel = (event) => {
      let { deltaX, deltaY, deltaMode } = event;
      const multiplierX = getDeltaMultiplier(deltaMode, this.window.width);
      const multiplierY = getDeltaMultiplier(deltaMode, this.window.height);
      deltaX *= multiplierX;
      deltaY *= multiplierY;
      deltaX *= this.options.wheelMultiplier;
      deltaY *= this.options.wheelMultiplier;
      this.emitter.emit("scroll", {
        deltaX,
        deltaY,
        event
      });
    };
    onWindowResize = () => {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };
  };
  var defaultEasing = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
  var Lenis = class {
    _isScrolling = false;
    _isStopped = false;
    _isLocked = false;
    _preventNextNativeScrollEvent = false;
    _resetVelocityTimeout = null;
    _rafId = null;
    /**
    * Whether or not the user is touching the screen
    */
    isTouching;
    /**
    * The time in ms since the lenis instance was created
    */
    time = 0;
    /**
    * User data that will be forwarded through the scroll event
    *
    * @example
    * lenis.scrollTo(100, {
    *   userData: {
    *     foo: 'bar'
    *   }
    * })
    */
    userData = {};
    /**
    * The last velocity of the scroll
    */
    lastVelocity = 0;
    /**
    * The current velocity of the scroll
    */
    velocity = 0;
    /**
    * The direction of the scroll
    */
    direction = 0;
    /**
    * The options passed to the lenis instance
    */
    options;
    /**
    * The target scroll value
    */
    targetScroll;
    /**
    * The animated scroll value
    */
    animatedScroll;
    animate = new Animate();
    emitter = new Emitter();
    dimensions;
    virtualScroll;
    constructor({ wrapper = window, content = document.documentElement, eventsTarget = wrapper, smoothWheel = true, syncTouch = false, syncTouchLerp = 0.075, touchInertiaExponent = 1.7, duration, easing, lerp: lerp2 = 0.1, infinite = false, orientation = "vertical", gestureOrientation = orientation === "horizontal" ? "both" : "vertical", touchMultiplier = 1, wheelMultiplier = 1, autoResize = true, prevent, virtualScroll, overscroll = true, autoRaf = false, anchors = false, autoToggle = false, allowNestedScroll = false, __experimental__naiveDimensions = false, naiveDimensions = __experimental__naiveDimensions, stopInertiaOnNavigate = false } = {}) {
      window.lenisVersion = version;
      if (!window.lenis) window.lenis = {};
      window.lenis.version = version;
      if (orientation === "horizontal") window.lenis.horizontal = true;
      if (syncTouch === true) window.lenis.touch = true;
      if (!wrapper || wrapper === document.documentElement) wrapper = window;
      if (typeof duration === "number" && typeof easing !== "function") easing = defaultEasing;
      else if (typeof easing === "function" && typeof duration !== "number") duration = 1;
      this.options = {
        wrapper,
        content,
        eventsTarget,
        smoothWheel,
        syncTouch,
        syncTouchLerp,
        touchInertiaExponent,
        duration,
        easing,
        lerp: lerp2,
        infinite,
        gestureOrientation,
        orientation,
        touchMultiplier,
        wheelMultiplier,
        autoResize,
        prevent,
        virtualScroll,
        overscroll,
        autoRaf,
        anchors,
        autoToggle,
        allowNestedScroll,
        naiveDimensions,
        stopInertiaOnNavigate
      };
      this.dimensions = new Dimensions(wrapper, content, { autoResize });
      this.updateClassName();
      this.targetScroll = this.animatedScroll = this.actualScroll;
      this.options.wrapper.addEventListener("scroll", this.onNativeScroll);
      this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: true });
      if (this.options.anchors || this.options.stopInertiaOnNavigate) this.options.wrapper.addEventListener("click", this.onClick);
      this.options.wrapper.addEventListener("pointerdown", this.onPointerDown);
      this.virtualScroll = new VirtualScroll(eventsTarget, {
        touchMultiplier,
        wheelMultiplier
      });
      this.virtualScroll.on("scroll", this.onVirtualScroll);
      if (this.options.autoToggle) {
        this.checkOverflow();
        this.rootElement.addEventListener("transitionend", this.onTransitionEnd);
      }
      if (this.options.autoRaf) this._rafId = requestAnimationFrame(this.raf);
    }
    /**
    * Destroy the lenis instance, remove all event listeners and clean up the class name
    */
    destroy() {
      this.emitter.destroy();
      this.options.wrapper.removeEventListener("scroll", this.onNativeScroll);
      this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: true });
      this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown);
      if (this.options.anchors || this.options.stopInertiaOnNavigate) this.options.wrapper.removeEventListener("click", this.onClick);
      this.virtualScroll.destroy();
      this.dimensions.destroy();
      this.cleanUpClassName();
      if (this._rafId) cancelAnimationFrame(this._rafId);
    }
    on(event, callback) {
      return this.emitter.on(event, callback);
    }
    off(event, callback) {
      return this.emitter.off(event, callback);
    }
    onScrollEnd = (e) => {
      if (!(e instanceof CustomEvent)) {
        if (this.isScrolling === "smooth" || this.isScrolling === false) e.stopPropagation();
      }
    };
    dispatchScrollendEvent = () => {
      this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
        bubbles: this.options.wrapper === window,
        detail: { lenisScrollEnd: true }
      }));
    };
    get overflow() {
      const property = this.isHorizontal ? "overflow-x" : "overflow-y";
      return getComputedStyle(this.rootElement)[property];
    }
    checkOverflow() {
      if (["hidden", "clip"].includes(this.overflow)) this.internalStop();
      else this.internalStart();
    }
    onTransitionEnd = (event) => {
      if (event.propertyName?.includes("overflow") && event.target === this.rootElement) this.checkOverflow();
    };
    setScroll(scroll) {
      if (this.isHorizontal) this.options.wrapper.scrollTo({
        left: scroll,
        behavior: "instant"
      });
      else this.options.wrapper.scrollTo({
        top: scroll,
        behavior: "instant"
      });
    }
    onClick = (event) => {
      const linkElementsUrls = event.composedPath().filter((node) => node instanceof HTMLAnchorElement && node.href).map((element) => new URL(element.href));
      const currentUrl = new URL(window.location.href);
      if (this.options.anchors) {
        const anchorElementUrl = linkElementsUrls.find((targetUrl) => currentUrl.host === targetUrl.host && currentUrl.pathname === targetUrl.pathname && targetUrl.hash);
        if (anchorElementUrl) {
          const options = typeof this.options.anchors === "object" && this.options.anchors ? this.options.anchors : void 0;
          const target = `#${anchorElementUrl.hash.split("#")[1]}`;
          this.scrollTo(target, options);
          return;
        }
      }
      if (this.options.stopInertiaOnNavigate) {
        if (linkElementsUrls.some((targetUrl) => currentUrl.host === targetUrl.host && currentUrl.pathname !== targetUrl.pathname)) {
          this.reset();
          return;
        }
      }
    };
    onPointerDown = (event) => {
      if (event.button === 1) this.reset();
    };
    onVirtualScroll = (data) => {
      if (typeof this.options.virtualScroll === "function" && this.options.virtualScroll(data) === false) return;
      const { deltaX, deltaY, event } = data;
      this.emitter.emit("virtual-scroll", {
        deltaX,
        deltaY,
        event
      });
      if (event.ctrlKey) return;
      if (event.lenisStopPropagation) return;
      const isTouch = event.type.includes("touch");
      const isWheel = event.type.includes("wheel");
      this.isTouching = event.type === "touchstart" || event.type === "touchmove";
      const isClickOrTap = deltaX === 0 && deltaY === 0;
      if (this.options.syncTouch && isTouch && event.type === "touchstart" && isClickOrTap && !this.isStopped && !this.isLocked) {
        this.reset();
        return;
      }
      const isUnknownGesture = this.options.gestureOrientation === "vertical" && deltaY === 0 || this.options.gestureOrientation === "horizontal" && deltaX === 0;
      if (isClickOrTap || isUnknownGesture) return;
      let composedPath = event.composedPath();
      composedPath = composedPath.slice(0, composedPath.indexOf(this.rootElement));
      const prevent = this.options.prevent;
      const gestureOrientation = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : "vertical";
      if (composedPath.find((node) => node instanceof HTMLElement && (typeof prevent === "function" && prevent?.(node) || node.hasAttribute?.("data-lenis-prevent") || gestureOrientation === "vertical" && node.hasAttribute?.("data-lenis-prevent-vertical") || gestureOrientation === "horizontal" && node.hasAttribute?.("data-lenis-prevent-horizontal") || isTouch && node.hasAttribute?.("data-lenis-prevent-touch") || isWheel && node.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(node, {
        deltaX,
        deltaY
      })))) return;
      if (this.isStopped || this.isLocked) {
        if (event.cancelable) event.preventDefault();
        return;
      }
      if (!(this.options.syncTouch && isTouch || this.options.smoothWheel && isWheel)) {
        this.isScrolling = "native";
        this.animate.stop();
        event.lenisStopPropagation = true;
        return;
      }
      let delta = deltaY;
      if (this.options.gestureOrientation === "both") delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      else if (this.options.gestureOrientation === "horizontal") delta = deltaX;
      if (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && deltaY > 0 || this.animatedScroll === this.limit && deltaY < 0)) event.lenisStopPropagation = true;
      if (event.cancelable) event.preventDefault();
      const isSyncTouch = isTouch && this.options.syncTouch;
      const hasTouchInertia = isTouch && event.type === "touchend";
      if (hasTouchInertia) delta = Math.sign(delta) * Math.abs(this.velocity) ** this.options.touchInertiaExponent;
      this.scrollTo(this.targetScroll + delta, {
        programmatic: false,
        ...isSyncTouch ? { lerp: hasTouchInertia ? this.options.syncTouchLerp : 1 } : {
          lerp: this.options.lerp,
          duration: this.options.duration,
          easing: this.options.easing
        }
      });
    };
    /**
    * Force lenis to recalculate the dimensions
    */
    resize() {
      this.dimensions.resize();
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.emit();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    onNativeScroll = () => {
      if (this._resetVelocityTimeout !== null) {
        clearTimeout(this._resetVelocityTimeout);
        this._resetVelocityTimeout = null;
      }
      if (this._preventNextNativeScrollEvent) {
        this._preventNextNativeScrollEvent = false;
        return;
      }
      if (this.isScrolling === false || this.isScrolling === "native") {
        const lastScroll = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll;
        this.lastVelocity = this.velocity;
        this.velocity = this.animatedScroll - lastScroll;
        this.direction = Math.sign(this.animatedScroll - lastScroll);
        if (!this.isStopped) this.isScrolling = "native";
        this.emit();
        if (this.velocity !== 0) this._resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity;
          this.velocity = 0;
          this.isScrolling = false;
          this.emit();
        }, 400);
      }
    };
    reset() {
      this.isLocked = false;
      this.isScrolling = false;
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.lastVelocity = this.velocity = 0;
      this.animate.stop();
    }
    /**
    * Start lenis scroll after it has been stopped
    */
    start() {
      if (!this.isStopped) return;
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
    internalStart() {
      if (!this.isStopped) return;
      this.reset();
      this.isStopped = false;
      this.emit();
    }
    /**
    * Stop lenis scroll
    */
    stop() {
      if (this.isStopped) return;
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
    internalStop() {
      if (this.isStopped) return;
      this.reset();
      this.isStopped = true;
      this.emit();
    }
    /**
    * RequestAnimationFrame for lenis
    *
    * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
    */
    raf = (time) => {
      const deltaTime = time - (this.time || time);
      this.time = time;
      this.animate.advance(deltaTime * 1e-3);
      if (this.options.autoRaf) this._rafId = requestAnimationFrame(this.raf);
    };
    /**
    * Scroll to a target value
    *
    * @param target The target value to scroll to
    * @param options The options for the scroll
    *
    * @example
    * lenis.scrollTo(100, {
    *   offset: 100,
    *   duration: 1,
    *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
    *   lerp: 0.1,
    *   onStart: () => {
    *     console.log('onStart')
    *   },
    *   onComplete: () => {
    *     console.log('onComplete')
    *   },
    * })
    */
    scrollTo(_target, { offset = 0, immediate = false, lock = false, programmatic = true, lerp: lerp2 = programmatic ? this.options.lerp : void 0, duration = programmatic ? this.options.duration : void 0, easing = programmatic ? this.options.easing : void 0, onStart, onComplete, force = false, userData } = {}) {
      if ((this.isStopped || this.isLocked) && !force) return;
      let target = _target;
      let adjustedOffset = offset;
      if (typeof target === "string" && [
        "top",
        "left",
        "start",
        "#"
      ].includes(target)) target = 0;
      else if (typeof target === "string" && [
        "bottom",
        "right",
        "end"
      ].includes(target)) target = this.limit;
      else {
        let node = null;
        if (typeof target === "string") {
          node = document.querySelector(target);
          if (!node) if (target === "#top") target = 0;
          else console.warn("Lenis: Target not found", target);
        } else if (target instanceof HTMLElement && target?.nodeType) node = target;
        if (node) {
          if (this.options.wrapper !== window) {
            const wrapperRect = this.rootElement.getBoundingClientRect();
            adjustedOffset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
          }
          const rect = node.getBoundingClientRect();
          const targetStyle = getComputedStyle(node);
          const scrollMargin = this.isHorizontal ? Number.parseFloat(targetStyle.scrollMarginLeft) : Number.parseFloat(targetStyle.scrollMarginTop);
          const containerStyle = getComputedStyle(this.rootElement);
          const scrollPadding = this.isHorizontal ? Number.parseFloat(containerStyle.scrollPaddingLeft) : Number.parseFloat(containerStyle.scrollPaddingTop);
          target = (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll - (Number.isNaN(scrollMargin) ? 0 : scrollMargin) - (Number.isNaN(scrollPadding) ? 0 : scrollPadding);
        }
      }
      if (typeof target !== "number") return;
      target += adjustedOffset;
      if (this.options.infinite) {
        if (programmatic) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const distance = target - this.animatedScroll;
          if (distance > this.limit / 2) target -= this.limit;
          else if (distance < -this.limit / 2) target += this.limit;
        }
      } else target = clamp(0, target, this.limit);
      if (target === this.targetScroll) {
        onStart?.(this);
        onComplete?.(this);
        return;
      }
      this.userData = userData ?? {};
      if (immediate) {
        this.animatedScroll = this.targetScroll = target;
        this.setScroll(this.scroll);
        this.reset();
        this.preventNextNativeScrollEvent();
        this.emit();
        onComplete?.(this);
        this.userData = {};
        requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      if (!programmatic) this.targetScroll = target;
      if (typeof duration === "number" && typeof easing !== "function") easing = defaultEasing;
      else if (typeof easing === "function" && typeof duration !== "number") duration = 1;
      this.animate.fromTo(this.animatedScroll, target, {
        duration,
        easing,
        lerp: lerp2,
        onStart: () => {
          if (lock) this.isLocked = true;
          this.isScrolling = "smooth";
          onStart?.(this);
        },
        onUpdate: (value, completed) => {
          this.isScrolling = "smooth";
          this.lastVelocity = this.velocity;
          this.velocity = value - this.animatedScroll;
          this.direction = Math.sign(this.velocity);
          this.animatedScroll = value;
          this.setScroll(this.scroll);
          if (programmatic) this.targetScroll = value;
          if (!completed) this.emit();
          if (completed) {
            this.reset();
            this.emit();
            onComplete?.(this);
            this.userData = {};
            requestAnimationFrame(() => {
              this.dispatchScrollendEvent();
            });
            this.preventNextNativeScrollEvent();
          }
        }
      });
    }
    preventNextNativeScrollEvent() {
      this._preventNextNativeScrollEvent = true;
      requestAnimationFrame(() => {
        this._preventNextNativeScrollEvent = false;
      });
    }
    hasNestedScroll(node, { deltaX, deltaY }) {
      const time = Date.now();
      if (!node._lenis) node._lenis = {};
      const cache = node._lenis;
      let hasOverflowX;
      let hasOverflowY;
      let isScrollableX;
      let isScrollableY;
      let hasOverscrollBehaviorX;
      let hasOverscrollBehaviorY;
      let scrollWidth;
      let scrollHeight;
      let clientWidth;
      let clientHeight;
      if (time - (cache.time ?? 0) > 2e3) {
        cache.time = Date.now();
        const computedStyle = window.getComputedStyle(node);
        cache.computedStyle = computedStyle;
        hasOverflowX = [
          "auto",
          "overlay",
          "scroll"
        ].includes(computedStyle.overflowX);
        hasOverflowY = [
          "auto",
          "overlay",
          "scroll"
        ].includes(computedStyle.overflowY);
        hasOverscrollBehaviorX = ["auto"].includes(computedStyle.overscrollBehaviorX);
        hasOverscrollBehaviorY = ["auto"].includes(computedStyle.overscrollBehaviorY);
        cache.hasOverflowX = hasOverflowX;
        cache.hasOverflowY = hasOverflowY;
        if (!(hasOverflowX || hasOverflowY)) return false;
        scrollWidth = node.scrollWidth;
        scrollHeight = node.scrollHeight;
        clientWidth = node.clientWidth;
        clientHeight = node.clientHeight;
        isScrollableX = scrollWidth > clientWidth;
        isScrollableY = scrollHeight > clientHeight;
        cache.isScrollableX = isScrollableX;
        cache.isScrollableY = isScrollableY;
        cache.scrollWidth = scrollWidth;
        cache.scrollHeight = scrollHeight;
        cache.clientWidth = clientWidth;
        cache.clientHeight = clientHeight;
        cache.hasOverscrollBehaviorX = hasOverscrollBehaviorX;
        cache.hasOverscrollBehaviorY = hasOverscrollBehaviorY;
      } else {
        isScrollableX = cache.isScrollableX;
        isScrollableY = cache.isScrollableY;
        hasOverflowX = cache.hasOverflowX;
        hasOverflowY = cache.hasOverflowY;
        scrollWidth = cache.scrollWidth;
        scrollHeight = cache.scrollHeight;
        clientWidth = cache.clientWidth;
        clientHeight = cache.clientHeight;
        hasOverscrollBehaviorX = cache.hasOverscrollBehaviorX;
        hasOverscrollBehaviorY = cache.hasOverscrollBehaviorY;
      }
      if (!(hasOverflowX && isScrollableX || hasOverflowY && isScrollableY)) return false;
      const orientation = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : "vertical";
      let scroll;
      let maxScroll;
      let delta;
      let hasOverflow;
      let isScrollable;
      let hasOverscrollBehavior;
      if (orientation === "horizontal") {
        scroll = Math.round(node.scrollLeft);
        maxScroll = scrollWidth - clientWidth;
        delta = deltaX;
        hasOverflow = hasOverflowX;
        isScrollable = isScrollableX;
        hasOverscrollBehavior = hasOverscrollBehaviorX;
      } else if (orientation === "vertical") {
        scroll = Math.round(node.scrollTop);
        maxScroll = scrollHeight - clientHeight;
        delta = deltaY;
        hasOverflow = hasOverflowY;
        isScrollable = isScrollableY;
        hasOverscrollBehavior = hasOverscrollBehaviorY;
      } else return false;
      if (!hasOverscrollBehavior && (scroll >= maxScroll || scroll <= 0)) return true;
      return (delta > 0 ? scroll < maxScroll : scroll > 0) && hasOverflow && isScrollable;
    }
    /**
    * The root element on which lenis is instanced
    */
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    /**
    * The limit which is the maximum scroll value
    */
    get limit() {
      if (this.options.naiveDimensions) {
        if (this.isHorizontal) return this.rootElement.scrollWidth - this.rootElement.clientWidth;
        return this.rootElement.scrollHeight - this.rootElement.clientHeight;
      }
      return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    /**
    * Whether or not the scroll is horizontal
    */
    get isHorizontal() {
      return this.options.orientation === "horizontal";
    }
    /**
    * The actual scroll value
    */
    get actualScroll() {
      const wrapper = this.options.wrapper;
      return this.isHorizontal ? wrapper.scrollX ?? wrapper.scrollLeft : wrapper.scrollY ?? wrapper.scrollTop;
    }
    /**
    * The current scroll value
    */
    get scroll() {
      return this.options.infinite ? modulo(this.animatedScroll, this.limit) : this.animatedScroll;
    }
    /**
    * The progress of the scroll relative to the limit
    */
    get progress() {
      return this.limit === 0 ? 1 : this.scroll / this.limit;
    }
    /**
    * Current scroll state
    */
    get isScrolling() {
      return this._isScrolling;
    }
    set isScrolling(value) {
      if (this._isScrolling !== value) {
        this._isScrolling = value;
        this.updateClassName();
      }
    }
    /**
    * Check if lenis is stopped
    */
    get isStopped() {
      return this._isStopped;
    }
    set isStopped(value) {
      if (this._isStopped !== value) {
        this._isStopped = value;
        this.updateClassName();
      }
    }
    /**
    * Check if lenis is locked
    */
    get isLocked() {
      return this._isLocked;
    }
    set isLocked(value) {
      if (this._isLocked !== value) {
        this._isLocked = value;
        this.updateClassName();
      }
    }
    /**
    * Check if lenis is smooth scrolling
    */
    get isSmooth() {
      return this.isScrolling === "smooth";
    }
    /**
    * The class name applied to the wrapper element
    */
    get className() {
      let className = "lenis";
      if (this.options.autoToggle) className += " lenis-autoToggle";
      if (this.isStopped) className += " lenis-stopped";
      if (this.isLocked) className += " lenis-locked";
      if (this.isScrolling) className += " lenis-scrolling";
      if (this.isScrolling === "smooth") className += " lenis-smooth";
      return className;
    }
    updateClassName() {
      this.cleanUpClassName();
      this.className.split(" ").forEach((className) => {
        this.rootElement.classList.add(className);
      });
    }
    cleanUpClassName() {
      for (const className of Array.from(this.rootElement.classList)) if (className === "lenis" || className.startsWith("lenis-")) this.rootElement.classList.remove(className);
    }
  };

  // src/components/smooth-scroll/index.ts
  var SMOOTH_SCROLL_PRESETS = {
    subtle: {
      lerp: 0.12,
      wheelMultiplier: 0.9
    },
    balanced: {
      lerp: 0.08,
      wheelMultiplier: 1
    },
    heavy: {
      lerp: 0.055,
      wheelMultiplier: 0.85
    }
  };
  var DEFAULT_LENIS_OPTIONS = {
    anchors: true,
    autoResize: true,
    overscroll: true,
    smoothWheel: true,
    stopInertiaOnNavigate: true,
    syncTouch: false
  };
  var DEFAULT_EASING = (time) => Math.min(1, 1.001 - 2 ** (-10 * time));
  function initSmoothScroll(props = {}) {
    const {
      enabled = true,
      kind = "balanced",
      reinitialize = false,
      respectReducedMotion = true,
      ...lenisProps
    } = props;
    if (!enabled) {
      window.tsaSmoothScroll?.destroy();
      return null;
    }
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (respectReducedMotion && reducedMotionQuery.matches) {
      window.tsaSmoothScroll?.destroy();
      return null;
    }
    if (window.tsaSmoothScroll) {
      if (!reinitialize) return window.tsaSmoothScroll;
      window.tsaSmoothScroll.destroy();
    }
    const presetOptions = kind === "custom" ? {} : SMOOTH_SCROLL_PRESETS[kind];
    const lenisOptions = {
      ...DEFAULT_LENIS_OPTIONS,
      ...presetOptions,
      ...lenisProps,
      autoRaf: lenisProps.autoRaf ?? false,
      easing: lenisProps.easing ?? DEFAULT_EASING
    };
    if (lenisProps.duration !== void 0 && lenisProps.lerp === void 0) {
      delete lenisOptions.lerp;
    }
    const lenis = new Lenis(lenisOptions);
    let frameId;
    const updateFrame = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(updateFrame);
    };
    if (!lenisOptions.autoRaf) {
      frameId = window.requestAnimationFrame(updateFrame);
    }
    const destroy = () => {
      if (frameId !== void 0) {
        window.cancelAnimationFrame(frameId);
        frameId = void 0;
      }
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      lenis.destroy();
      if (window.tsaSmoothScroll === controller) {
        delete window.tsaSmoothScroll;
      }
    };
    const handleReducedMotionChange = (event) => {
      if (!respectReducedMotion || !event.matches) return;
      destroy();
    };
    const controller = {
      destroy,
      lenis,
      resize: () => lenis.resize(),
      scrollTo: (target, options) => lenis.scrollTo(target, options),
      start: () => lenis.start(),
      stop: () => lenis.stop()
    };
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    window.tsaSmoothScroll = controller;
    return controller;
  }

  // src/init-site.ts
  function initSite() {
    initSmoothScroll({
      kind: "balanced",
      respectReducedMotion: true
    });
    initNavbar();
    initCallPopover();
    onDomReady(initAccordions);
    onDomReady(initPracticeTextReels);
    initBlogToc();
    onDomReady(initHeroAvatarHover);
    onDomReady(initRelatedArticlesEmptyState);
  }

  // src/index.ts
  initSite();
})();
//# sourceMappingURL=index.js.map
