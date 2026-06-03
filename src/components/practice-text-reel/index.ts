/*
============================================
  TEXT ROLL
============================================
*/

//? v2
const PRACTICE_TEXT_REEL_SETTINGS = {
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
  visibilityThreshold: 0.15,
} as const;

const PRACTICE_TEXT_REEL_STATE_CLASSES = [
  'is-active',
  'is-prev',
  'is-next',
  'is-prev-two',
  'is-next-two',
] as const;

export function initPracticeTextReels(): void {
  const components = document.querySelectorAll<HTMLElement>(
    '[data-practice-text-reel], .practice-text-reel_component'
  );

  const mobileQuery = window.matchMedia(
    `(max-width: ${PRACTICE_TEXT_REEL_SETTINGS.mobileBreakpoint}px)`
  );

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  components.forEach((component) => {
    /*
      Protecție împotriva inițializării multiple în Webflow preview,
      hot reload sau în cazul încărcării duplicate a bundle-ului.
    */
    if (component.dataset.reelReady === 'true') return;

    component.dataset.reelReady = 'true';

    const prefix = component.querySelector<HTMLElement>(
      '.practice-text-reel_prefix'
    ) as HTMLElement;

    const mask = component.querySelector<HTMLElement>('.practice-text-reel_mask') as HTMLElement;

    const track = component.querySelector<HTMLElement>('.practice-text-reel_track') as HTMLElement;

    if (!prefix || !mask || !track) return;

    let originalItemCount = 0;
    let cycleStartIndex = 0;
    let currentTrackIndex = 0;
    let activeLogicalIndex: number = PRACTICE_TEXT_REEL_SETTINGS.initialActiveIndex;

    let isMobile = mobileQuery.matches;
    let shouldAnimate = false;
    let isInView = !('IntersectionObserver' in window);
    let isPausedByHover = false;
    let isLoopResetting = false;

    let holdTimer: number | undefined;
    let setupFrame: number | undefined;
    let resetFrame: number | undefined;
    let resizeTimer: number | undefined;

    let lastViewportWidth = window.innerWidth;

    function getOriginalItems(): HTMLElement[] {
      return Array.from(
        track.querySelectorAll<HTMLElement>(".practice-text-reel_item:not([aria-hidden='true'])")
      );
    }

    function getAllItems(): HTMLElement[] {
      return Array.from(track.querySelectorAll<HTMLElement>('.practice-text-reel_item'));
    }

    function normalizeIndex(value: number, itemCount: number): number {
      if (!itemCount) return 0;

      return ((value % itemCount) + itemCount) % itemCount;
    }

    function getHoldDuration(): number {
      const value = Number.parseFloat(
        getComputedStyle(component).getPropertyValue('--reel-hold-duration').trim()
      );

      return Number.isFinite(value) ? value : 2250;
    }

    function stopHoldTimer(): void {
      if (holdTimer === undefined) return;

      window.clearTimeout(holdTimer);
      holdTimer = undefined;
    }

    function cancelScheduledFrames(): void {
      if (setupFrame !== undefined) {
        window.cancelAnimationFrame(setupFrame);
        setupFrame = undefined;
      }

      if (resetFrame !== undefined) {
        window.cancelAnimationFrame(resetFrame);
        resetFrame = undefined;
      }
    }

    function syncMotionMode(): void {
      isMobile = mobileQuery.matches;

      const prefersReducedMotion = reducedMotionQuery.matches;

      shouldAnimate = PRACTICE_TEXT_REEL_SETTINGS.runAnimation && !prefersReducedMotion;

      component.classList.toggle('is-mobile-mode', isMobile);
      component.classList.toggle('is-reduced-motion', prefersReducedMotion);
      component.classList.toggle('is-static-list', !shouldAnimate);
    }

    function removeClones(): void {
      track
        .querySelectorAll<HTMLElement>(".practice-text-reel_item[aria-hidden='true']")
        .forEach((item) => item.remove());
    }

    function createLoopClones(originalItems: HTMLElement[]): void {
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

    function clearItemStates(): void {
      getAllItems().forEach((item) => {
        item.classList.remove(...PRACTICE_TEXT_REEL_STATE_CLASSES);

        /*
          Curăță stilurile inline provenite din versiunile precedente
          ale animației, în cazul unui preview Webflow reîncărcat.
        */
        item.style.removeProperty('opacity');
        item.style.removeProperty('transform');
      });
    }

    /**
     * Pe mobil, item-urile au înălțimea lor naturală.
     * Masca primește înălțimea necesară pentru cea mai mare
     * combinație posibilă de trei item-uri consecutive.
     *
     * Astfel:
     * 1. textul pe două rânduri nu este tăiat;
     * 2. nu introducem spațiu artificial mare între item-uri;
     * 3. înălțimea vizibilă nu sare în timpul loop-ului.
     */
    function setMobileMaskHeight(originalItems: HTMLElement[]): void {
      component.style.removeProperty('--reel-mobile-mask-height');

      if (!isMobile || !originalItems.length) return;

      const trackStyles = window.getComputedStyle(track);

      const gapValue =
        Number.parseFloat(trackStyles.rowGap) || Number.parseFloat(trackStyles.gap) || 0;

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

      /*
        Siguranță minimă pentru anti-aliasing și diferențe
        subtile de randare ale fontului serif.
      */
      component.style.setProperty(
        '--reel-mobile-mask-height',
        `${Math.ceil(largestVisibleGroupHeight + 2)}px`
      );
    }

    /**
     * Desktop:
     * Item-ul activ este aliniat cu centrul prefixului "Lucrăm cu".
     *
     * Mobil:
     * Item-ul activ începe în partea de sus a măștii.
     * Următoarele două item-uri apar dedesubt ca preview.
     */
    function getTargetY(targetIndex: number): number {
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

    function setTrackPosition(targetIndex: number, animate: boolean): void {
      if (animate) {
        track.style.removeProperty('transition-duration');
      } else {
        track.style.transitionDuration = '0ms';
      }

      track.style.transform = `translate3d(0, ${getTargetY(targetIndex)}px, 0)`;
    }

    /**
     * În loc să calculăm opacity în fiecare frame,
     * schimbăm doar stările semantice la începutul tranziției.
     *
     * Beneficii:
     * 1. mai puține recalculări de layout;
     * 2. ierarhie predictibilă;
     * 3. tranziție coerentă între text și poziție;
     * 4. comportament mai ușor de ajustat din CSS.
     */
    function applyVisualState(targetIndex: number): void {
      const items = getAllItems();

      items.forEach((item) => {
        item.classList.remove(...PRACTICE_TEXT_REEL_STATE_CLASSES);
      });

      items[targetIndex]?.classList.add('is-active');

      if (isMobile) {
        items[targetIndex + 1]?.classList.add('is-next');
        items[targetIndex + 2]?.classList.add('is-next-two');

        return;
      }

      items[targetIndex - 1]?.classList.add('is-prev');
      items[targetIndex + 1]?.classList.add('is-next');
      items[targetIndex - 2]?.classList.add('is-prev-two');
      items[targetIndex + 2]?.classList.add('is-next-two');
    }

    function queueNextMove(): void {
      stopHoldTimer();

      if (
        !shouldAnimate ||
        !isInView ||
        isPausedByHover ||
        isLoopResetting ||
        document.hidden ||
        component.classList.contains('is-setting-up')
      ) {
        return;
      }

      holdTimer = window.setTimeout(() => {
        holdTimer = undefined;

        currentTrackIndex += 1;

        activeLogicalIndex = normalizeIndex(activeLogicalIndex + 1, originalItemCount);

        /*
          Starea vizuală se schimbă în același moment
          în care începe deplasarea. Noul activ se luminează
          în timp ce ajunge în poziția centrală.
        */
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, true);
      }, getHoldDuration());
    }

    /**
     * Când ajungem la item-ul clonat echivalent cu începutul ciclului,
     * track-ul este repoziționat instant pe originalul identic.
     *
     * Deoarece textul, poziția și opacitățile coincid perfect,
     * resetarea nu trebuie să fie perceptibilă.
     */
    function silentlyResetLoop(): boolean {
      if (!shouldAnimate) return false;

      if (currentTrackIndex < cycleStartIndex + originalItemCount) {
        return false;
      }

      isLoopResetting = true;

      component.classList.add('is-loop-resetting');

      currentTrackIndex = cycleStartIndex;

      applyVisualState(currentTrackIndex);
      setTrackPosition(currentTrackIndex, false);

      /*
        Forțează aplicarea stării instant înainte
        de reactivarea tranzițiilor.
      */
      void track.offsetHeight;

      resetFrame = window.requestAnimationFrame(() => {
        component.classList.remove('is-loop-resetting');

        track.style.removeProperty('transition-duration');

        isLoopResetting = false;
        resetFrame = undefined;

        queueNextMove();
      });

      return true;
    }

    /**
     * Finalizează inițializarea sau recalcularea fără ca utilizatorul
     * să vadă repoziționări ori modificări intermediare de opacity.
     */
    function finishInstantSetup(): void {
      void track.offsetHeight;

      setupFrame = window.requestAnimationFrame(() => {
        component.classList.remove('is-setting-up');

        track.style.removeProperty('transition-duration');

        setupFrame = undefined;

        queueNextMove();
      });
    }

    function setup(): void {
      stopHoldTimer();
      cancelScheduledFrames();

      component.classList.add('is-initialized', 'is-setting-up');
      component.classList.remove('is-loop-resetting');

      isLoopResetting = false;

      syncMotionMode();
      removeClones();
      clearItemStates();

      const originalItems = getOriginalItems();

      originalItemCount = originalItems.length;

      if (!originalItemCount) {
        component.classList.remove('is-setting-up');

        return;
      }

      activeLogicalIndex = normalizeIndex(activeLogicalIndex, originalItemCount);

      /*
        Reduced motion sau animație oprită:
        păstrăm toate categoriile vizibile, fără mișcare.
      */
      if (!shouldAnimate) {
        component.style.removeProperty('--reel-mobile-mask-height');

        track.style.transitionDuration = '0ms';
        track.style.transform = 'none';

        finishInstantSetup();

        return;
      }

      component.classList.remove('is-static-list');

      if (isMobile) {
        setMobileMaskHeight(originalItems);
      } else {
        component.style.removeProperty('--reel-mobile-mask-height');
      }

      createLoopClones(originalItems);

      /*
        Pornim din blocul original al item-urilor, nu din clone.
        Dacă setup rulează după resize, păstrăm categoria activă curentă.
      */
      cycleStartIndex = originalItemCount + activeLogicalIndex;
      currentTrackIndex = cycleStartIndex;

      applyVisualState(currentTrackIndex);
      setTrackPosition(currentTrackIndex, false);

      finishInstantSetup();
    }

    track.addEventListener('transitionend', (event: TransitionEvent): void => {
      /*
          Tranzițiile de opacity ale item-urilor ajung și ele aici
          prin bubbling. Continuăm doar după mișcarea track-ului.
        */
      if (event.target !== track || event.propertyName !== 'transform') {
        return;
      }

      if (silentlyResetLoop()) return;

      queueNextMove();
    });

    component.addEventListener('pointerenter', (): void => {
      if (
        !PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover ||
        !finePointerQuery.matches ||
        !shouldAnimate
      ) {
        return;
      }

      isPausedByHover = true;

      stopHoldTimer();
    });

    component.addEventListener('pointerleave', (): void => {
      if (
        !PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover ||
        !finePointerQuery.matches ||
        !shouldAnimate
      ) {
        return;
      }

      isPausedByHover = false;

      queueNextMove();
    });

    document.addEventListener('visibilitychange', (): void => {
      if (document.hidden) {
        stopHoldTimer();

        return;
      }

      queueNextMove();
    });

    /*
      Oprim animația atunci când componenta nu este vizibilă.
      Astfel utilizatorul întâlnește o stare stabilă, iar pagina
      nu animă inutil conținut aflat în afara viewport-ului.
    */
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (!entry) return;

          const nextInView =
            entry.isIntersecting &&
            entry.intersectionRatio >= PRACTICE_TEXT_REEL_SETTINGS.visibilityThreshold;

          if (nextInView === isInView) return;

          isInView = nextInView;

          if (isInView) {
            queueNextMove();
          } else {
            stopHoldTimer();
          }
        },
        {
          threshold: [0, PRACTICE_TEXT_REEL_SETTINGS.visibilityThreshold],
        }
      );

      observer.observe(component);
    }

    reducedMotionQuery.addEventListener('change', setup);

    /*
      Recalculăm doar dacă lățimea viewport-ului se schimbă.
      Schimbările de înălțime provocate de bara browserului mobil
      nu trebuie să reseteze inutil animația.
    */
    window.addEventListener('resize', (): void => {
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

    /*
      Fontul serif poate modifica wrapping-ul mobil după încărcare.
      Recalculăm masca după ce fonturile sunt disponibile.
    */
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setup();
      });
    }

    setup();
  });
}
