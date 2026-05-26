/*
============================================
  NAVABAR SMART HIDE/SHOW ON SCROLL
============================================
*/
const MOBILE_NAV_SETTINGS = {
  breakpoint: 767,
  readyClass: 'is-mobile-nav-ready',
  openClass: 'is-menu-open',
  overlayClass: 'is-mobile-nav-overlay',
  overlayOpenClass: 'is-open',
  scrollLockClass: 'tsa-nav-is-locked',
  openLabel: 'Închide meniul',
  closedLabel: 'Deschide meniul',
} as const;

export function initMobileNavbarMenus(): void {
  const navbars = document.querySelectorAll<HTMLElement>('.navbar_component');

  const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_NAV_SETTINGS.breakpoint}px)`);

  navbars.forEach((navbar, navbarIndex) => {
    if (navbar.dataset.mobileNavReady === 'true') return;

    const trigger = navbar.querySelector<HTMLElement>('.navbar_menu-icon');
    const panel = navbar.querySelector<HTMLElement>('.navbar_mobile-panel');

    if (!trigger || !panel) {
      console.warn('Mobile navbar: lipsesc .navbar_menu-icon sau .navbar_mobile-panel.', navbar);

      return;
    }

    navbar.dataset.mobileNavReady = 'true';

    /*
      Păstrăm poziția originală a panel-ului pentru a-l putea readuce
      în navbar când viewport-ul trece din mobil în desktop.
    */
    const originalPanelParent = panel.parentNode;
    const originalPanelNextSibling = panel.nextSibling;

    const isNativeButton = trigger instanceof HTMLButtonElement;

    let isOpen = false;
    let lockedScrollY = 0;

    let bodyInlineStyles: {
      position: string;
      top: string;
      left: string;
      right: string;
      width: string;
      overflow: string;
    } | null = null;

    if (!panel.id) {
      panel.id = `tsa-mobile-menu-${navbarIndex + 1}`;
    }

    /*
      Trigger-ul tău actual este <a class="navbar_menu-icon">.
      Îl tratăm accesibil ca buton fără să fie nevoie să îl refaci
      imediat în Webflow.
    */
    if (!isNativeButton) {
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
    }

    trigger.setAttribute('aria-controls', panel.id);
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', MOBILE_NAV_SETTINGS.closedLabel);

    function isMobileViewport(): boolean {
      return mobileQuery.matches;
    }

    /*
      Fix-ul principal:
      Pe mobil, panel-ul este mutat direct în body.
      Astfel nu mai poate fi decupat, repoziționat sau ascuns
      de navbar-ul sticky, grid-ul Webflow sau smart-nav behavior.
    */
    function mountOverlayToBody(): void {
      if (panel.parentNode !== document.body) {
        document.body.appendChild(panel);
      }

      panel.classList.add(MOBILE_NAV_SETTINGS.overlayClass);
    }

    function restorePanelToNavbar(): void {
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

    /*
      Blochează scroll-ul fără să schimbe poziția vizuală a paginii.
      Acest lucru elimină saltul observat în video la deschiderea meniului.
    */
    function lockPageScroll(): void {
      if (bodyInlineStyles) return;

      lockedScrollY = window.scrollY;

      bodyInlineStyles = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
        overflow: document.body.style.overflow,
      };

      document.documentElement.classList.add(MOBILE_NAV_SETTINGS.scrollLockClass);

      document.body.classList.add(MOBILE_NAV_SETTINGS.scrollLockClass);

      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    function unlockPageScroll(): void {
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

    function syncPanelAccessibility(open: boolean): void {
      if (!isMobileViewport()) {
        panel.removeAttribute('aria-hidden');
        panel.removeAttribute('inert');

        return;
      }

      panel.setAttribute('aria-hidden', String(!open));
      panel.toggleAttribute('inert', !open);
    }

    function getFocusableElements(): HTMLElement[] {
      const panelFocusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(', ')
        )
      );

      return [trigger, ...panelFocusables];
    }

    function setMenuOpen(nextOpen: boolean, restoreFocus = false): void {
      const open = isMobileViewport() && nextOpen;

      if (open) {
        mountOverlayToBody();
      }

      isOpen = open;

      navbar.classList.toggle(MOBILE_NAV_SETTINGS.openClass, open);
      panel.classList.toggle(MOBILE_NAV_SETTINGS.overlayOpenClass, open);

      trigger.setAttribute('aria-expanded', String(open));
      trigger.setAttribute(
        'aria-label',
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

    function toggleMenu(): void {
      if (!isMobileViewport()) return;

      setMenuOpen(!isOpen);
    }

    function syncViewportMode(): void {
      setMenuOpen(false);

      if (isMobileViewport()) {
        mountOverlayToBody();
        syncPanelAccessibility(false);
      } else {
        restorePanelToNavbar();
        syncPanelAccessibility(false);
      }
    }

    trigger.addEventListener('click', (event: MouseEvent): void => {
      if (!isMobileViewport()) return;

      /*
        Elementul actual este un <a>.
        Prevenim navigarea accidentală dacă primește ulterior href.
      */
      if (trigger instanceof HTMLAnchorElement) {
        event.preventDefault();
      }

      toggleMenu();
    });

    trigger.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (!isMobileViewport() || isNativeButton) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();

        toggleMenu();
      }
    });

    document.addEventListener('keydown', (event: KeyboardEvent): void => {
      if (!isOpen || !isMobileViewport()) return;

      if (event.key === 'Escape') {
        event.preventDefault();

        setMenuOpen(false, true);

        return;
      }

      /*
        Focus trap simplu pentru overlay-ul full-screen.
        Devine relevant după ce link-urile și CTA-ul sunt elemente
        interactive reale în Webflow.
      */
      if (event.key !== 'Tab') return;

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

    /*
      Panel-ul este mutat în body, deci nu mai este copil al navbar-ului.
      Verificăm separat atât navbar-ul, cât și overlay-ul.
    */
    document.addEventListener('pointerdown', (event: PointerEvent): void => {
      if (!isOpen || !isMobileViewport()) return;

      const { target } = event;

      if (!(target instanceof Node)) return;

      if (!navbar.contains(target) && !panel.contains(target)) {
        setMenuOpen(false);
      }
    });

    panel.addEventListener('click', (event: MouseEvent): void => {
      if (!isOpen || !isMobileViewport()) return;

      const { target } = event;

      if (!(target instanceof Element)) return;

      const activatedItem = target.closest(
        ['a[href]', 'button', '[role="link"]', '.navbar_link', '.navbar_button-wrapper'].join(', ')
      );

      if (activatedItem) {
        setMenuOpen(false);
      }
    });

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', syncViewportMode);
    } else {
      mobileQuery.addListener(syncViewportMode);
    }

    navbar.classList.add(MOBILE_NAV_SETTINGS.readyClass);

    syncViewportMode();
  });
}
