import './style.css';

/* 
============================================
  TEXT ROLL
============================================
*/

const PRACTICE_TEXT_REEL_SETTINGS = {
  runAnimation: false,
  pauseOnHover: false,

  /**
   *
   * 0 = afaceri din sectorul energetic
   * 1 = profesioniști din medical
   * 2 = dezvoltatori imobiliari
   * 3 = organizații sportive
   * 4 = societăți din domeniul agricol
   * 5 = investitori și fondatori
   */
  staticActiveIndex: 2,
};

function initPracticeTextReels() {
  const components = document.querySelectorAll<HTMLElement>('.practice-text-reel_component');

  components.forEach((component) => {
    const prefix = component.querySelector<HTMLElement>('.practice-text-reel_prefix');
    const mask = component.querySelector<HTMLElement>('.practice-text-reel_mask');
    const track = component.querySelector<HTMLElement>('.practice-text-reel_track');

    if (!prefix || !mask || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const shouldRunAnimation = PRACTICE_TEXT_REEL_SETTINGS.runAnimation && !prefersReducedMotion;

    const shouldPauseOnHover = PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover && shouldRunAnimation;

    let originalItemCount = 0;
    let baseStartIndex = 0;
    let itemHeight = 0;
    let index = 0;
    let holdTimer: number | undefined;
    let visualFrame: number | undefined;
    let resizeTimer: number | undefined;
    let isPaused = false;
    let isResetting = false;

    function getOriginalItems() {
      return Array.from(
        track.querySelectorAll<HTMLElement>(".practice-text-reel_item:not([aria-hidden='true'])")
      );
    }

    function getAllItems() {
      return Array.from(track.querySelectorAll<HTMLElement>('.practice-text-reel_item'));
    }

    function getTransitionDuration() {
      return (
        getComputedStyle(component).getPropertyValue('--reel-transition-duration').trim() ||
        '1250ms'
      );
    }

    function getHoldDuration() {
      const value = Number.parseFloat(
        getComputedStyle(component).getPropertyValue('--reel-hold-duration')
      );

      return Number.isFinite(value) ? value : 950;
    }

    function getSafeStaticIndex(itemCount: number) {
      const wantedIndex = PRACTICE_TEXT_REEL_SETTINGS.staticActiveIndex;

      if (!Number.isFinite(wantedIndex)) return 0;

      return Math.min(Math.max(wantedIndex, 0), itemCount - 1);
    }

    function removeClones() {
      track
        .querySelectorAll<HTMLElement>(".practice-text-reel_item[aria-hidden='true']")
        .forEach((item) => item.remove());
    }

    function createClones(originalItems: HTMLElement[]) {
      const prependedClones = originalItems.map((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        return clone;
      });

      const appendedClones = originalItems.map((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        return clone;
      });

      prependedClones.reverse().forEach((clone) => {
        track.insertBefore(clone, track.firstChild);
      });

      appendedClones.forEach((clone) => {
        track.appendChild(clone);
      });
    }

    function getCenteredY(targetIndex: number) {
      const maskRect = mask.getBoundingClientRect();
      const prefixRect = prefix.getBoundingClientRect();

      const prefixCenterRelativeToMask = prefixRect.top + prefixRect.height / 2 - maskRect.top;

      const centerOffset = prefixCenterRelativeToMask - itemHeight / 2;

      return centerOffset - targetIndex * itemHeight;
    }

    function setTrackPosition(targetIndex: number, animate = true) {
      if (!itemHeight) return;

      track.style.transitionProperty = 'transform';
      track.style.transitionTimingFunction = 'cubic-bezier(0.72, 0, 0.18, 1)';
      track.style.transitionDuration = animate ? getTransitionDuration() : '0ms';
      track.style.transform = `translate3d(0, ${getCenteredY(targetIndex)}px, 0)`;
    }

    function updateVisualFocus() {
      const items = getAllItems();
      const prefixRect = prefix.getBoundingClientRect();
      const centerY = prefixRect.top + prefixRect.height / 2;
      const fadeDistance = itemHeight * 2.2 || 1;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const closeness = Math.max(0, 1 - distance / fadeDistance);

        const opacity = 0.06 + closeness * 0.94;
        const scale = 1 + closeness * 0.018;

        item.style.opacity = opacity.toFixed(3);
        item.style.transform = `scale(${scale.toFixed(4)})`;
      });

      if (shouldRunAnimation) {
        visualFrame = window.requestAnimationFrame(updateVisualFocus);
      }
    }

    function queueNextMove() {
      window.clearTimeout(holdTimer);

      if (!shouldRunAnimation || isPaused || isResetting) return;

      holdTimer = window.setTimeout(() => {
        index += 1;
        setTrackPosition(index, true);
      }, getHoldDuration());
    }

    function silentlyResetLoop() {
      if (!shouldRunAnimation) return false;
      if (index < baseStartIndex + originalItemCount) return false;

      isResetting = true;
      index = baseStartIndex;

      track.style.transitionDuration = '0ms';
      track.style.transform = `translate3d(0, ${getCenteredY(index)}px, 0)`;

      track.getBoundingClientRect();

      window.requestAnimationFrame(() => {
        track.style.transitionDuration = getTransitionDuration();
        isResetting = false;
        queueNextMove();
      });

      return true;
    }

    function setup() {
      window.clearTimeout(holdTimer);

      if (visualFrame) {
        window.cancelAnimationFrame(visualFrame);
      }

      removeClones();

      const originalItems = getOriginalItems();
      originalItemCount = originalItems.length;

      if (!originalItemCount) return;

      const firstOriginalItem = originalItems[0];

      itemHeight = firstOriginalItem ? firstOriginalItem.getBoundingClientRect().height : 0;

      if (!shouldRunAnimation) {
        index = getSafeStaticIndex(originalItemCount);

        setTrackPosition(index, false);

        getAllItems().forEach((item) => {
          item.style.opacity = '';
          item.style.transform = '';
        });

        updateVisualFocus();
        return;
      }

      createClones(originalItems);

      const firstItem = track.querySelector<HTMLElement>('.practice-text-reel_item');

      itemHeight = firstItem ? firstItem.getBoundingClientRect().height : 0;

      baseStartIndex = originalItemCount;
      index = baseStartIndex;

      setTrackPosition(index, false);

      visualFrame = window.requestAnimationFrame(updateVisualFocus);
      queueNextMove();
    }

    track.addEventListener('transitionend', (event) => {
      if (event.propertyName !== 'transform') return;
      if (silentlyResetLoop()) return;
      queueNextMove();
    });

    component.addEventListener('mouseenter', () => {
      if (!shouldPauseOnHover) return;

      isPaused = true;
      window.clearTimeout(holdTimer);
    });

    component.addEventListener('mouseleave', () => {
      if (!shouldPauseOnHover) return;

      isPaused = false;
      queueNextMove();
    });

    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        setup();
      }, 150);
    });

    setup();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPracticeTextReels);
} else {
  initPracticeTextReels();
}
/* 
============================================
  NAVBAR SMART HIDE/SHOW ON SCROLL
============================================
*/

const initSmartNavbar = () => {
  const navbar = document.querySelector<HTMLElement>('.navbar_component');
  if (!navbar) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealDelta = 8;
  const hideAfterScroll = 80;
  const hiddenTransform = 'translate3d(0, calc(-100% - 1rem), 0)';
  const visibleTransform = 'translate3d(0, 0, 0)';

  let lastScrollY = window.scrollY;
  let isHidden = false;
  let ticking = false;

  const applyBaseStyles = () => {
    navbar.style.backfaceVisibility = 'hidden';
    navbar.style.transform = visibleTransform;
    navbar.style.willChange = 'transform, opacity';
    navbar.style.transition = reducedMotion.matches
      ? 'none'
      : [
          'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          'opacity 420ms ease',
          'box-shadow 420ms ease',
        ].join(', ');
  };

  const isMenuOpen = () => {
    const menuButton = navbar.querySelector('.w-nav-button');
    const navMenu = navbar.querySelector<HTMLElement>('.w-nav-menu');

    return Boolean(menuButton?.classList.contains('w--open') || navMenu?.style.display === 'block');
  };

  const showNavbar = () => {
    if (!isHidden) return;

    navbar.style.transform = visibleTransform;
    navbar.style.opacity = '1';
    navbar.style.pointerEvents = 'auto';
    navbar.style.boxShadow = '';
    navbar.dataset.scrollState = 'visible';
    isHidden = false;
  };

  const hideNavbar = () => {
    if (isHidden || isMenuOpen()) return;

    navbar.style.transform = hiddenTransform;
    navbar.style.opacity = '0';
    navbar.style.pointerEvents = 'none';
    navbar.style.boxShadow = 'none';
    navbar.dataset.scrollState = 'hidden';
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
  navbar.dataset.scrollState = 'visible';

  window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
  window.addEventListener('resize', showNavbar);
  navbar.addEventListener('focusin', showNavbar);
  navbar.querySelector('.w-nav-button')?.addEventListener('click', () => {
    window.setTimeout(showNavbar, 0);
  });

  reducedMotion.addEventListener('change', applyBaseStyles);
};

window.Webflow ||= [];
window.Webflow.push(() => {
  initSmartNavbar();
});

/*
?============================================
  TOC
?============================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.cms-page_toc-list-wrapper');

  wrappers.forEach((wrapper) => {
    const list = wrapper.querySelector('.blog-post_toc-list');

    if (!list) return;

    const linkSelector = '.toc_h2, .toc_h3, .toc_h4, .toc_h5, .toc_h6';

    const activeSelectors = ['a.u-toc-current-link', 'a.w--current', "a[aria-current='true']"];

    let frame = null;

    const updateTocState = () => {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const links = Array.from(wrapper.querySelectorAll(linkSelector));
        const activeLink = wrapper.querySelector(activeSelectors.join(', '));

        if (!activeLink) {
          wrapper.style.setProperty('--toc-current-opacity', '0');

          links.forEach((link) => {
            link.classList.remove('is-toc-active', 'is-toc-muted');
          });

          return;
        }

        const wrapperRect = wrapper.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();

        const y = activeRect.top - wrapperRect.top;
        const { height } = activeRect;

        wrapper.style.setProperty('--toc-current-y', `${y}px`);
        wrapper.style.setProperty('--toc-current-height', `${height}px`);
        wrapper.style.setProperty('--toc-current-opacity', '1');

        links.forEach((link) => {
          const isActive = link === activeLink;

          link.classList.toggle('is-toc-active', isActive);
          link.classList.toggle('is-toc-muted', !isActive);
        });
      });
    };

    updateTocState();

    const observer = new MutationObserver(updateTocState);

    observer.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'aria-current'],
    });

    window.addEventListener('resize', updateTocState);
    window.addEventListener('scroll', updateTocState, { passive: true });
    list.addEventListener('scroll', updateTocState, { passive: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateTocState);
    }

    setTimeout(updateTocState, 300);
    setTimeout(updateTocState, 1000);
  });
});
