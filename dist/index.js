"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

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

  // src/utils/dom.ts
  function onDomReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
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

  // src/init-site.ts
  function initSite() {
    initNavbar();
    onDomReady(initPracticeTextReels);
    initBlogToc();
    onDomReady(initHeroAvatarHover);
  }

  // src/index.ts
  initSite();
})();
//# sourceMappingURL=index.js.map
