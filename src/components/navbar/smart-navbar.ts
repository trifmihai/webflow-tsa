/*
============================================
  NAVBAR SMART HIDE/SHOW ON SCROLL
============================================
*/

function initializeSmartNavbar(): void {
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
}

export function initSmartNavbar(): void {
  window.Webflow ||= [];
  window.Webflow.push(() => {
    initializeSmartNavbar();
  });
}
