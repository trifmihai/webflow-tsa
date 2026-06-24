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
  dragResistance: 0.16,
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
    let dragResumeTimer: number | undefined;

    let isDragging = false;
    let hasDragMoved = false;
    let dragPointerId: number | undefined;
    let dragStartClientY = 0;
    let dragStartTrackY = 0;
    let dragLastClientY = 0;
    let dragLastTime = 0;
    let dragVelocityY = 0;
    let dragBaseIndex = 0;
    let dragBaseY = 0;
    let dragCurrentDeltaY = 0;
    let dragVisualIndex = 0;
    let dragPendingTrackY: number | null = null;
    let dragFrame: number | undefined;

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

    function clamp(value: number, min: number, max: number): number {
      return Math.min(Math.max(value, min), max);
    }

    function getCssNumberVariable(name: string, fallback: number): number {
      const value = Number.parseFloat(getComputedStyle(component).getPropertyValue(name).trim());

      return Number.isFinite(value) ? value : fallback;
    }

    function getDragResumeDelay(): number {
      return getCssNumberVariable('--reel-drag-resume-delay', 760);
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

    function clearDragResumeTimer(): void {
      if (dragResumeTimer === undefined) return;

      window.clearTimeout(dragResumeTimer);
      dragResumeTimer = undefined;
    }

    function cancelDragFrame(): void {
      if (dragFrame === undefined) return;

      window.cancelAnimationFrame(dragFrame);
      dragFrame = undefined;
    }

    function flushDragFrame(): void {
      if (dragPendingTrackY === null) return;

      cancelDragFrame();

      setTrackY(dragPendingTrackY, false);

      dragPendingTrackY = null;
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

      cancelDragFrame();
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

    function getCurrentTrackY(): number {
      const { transform } = window.getComputedStyle(track);

      if (!transform || transform === 'none') return 0;

      const matrixValues = transform.match(/matrix.*\((.+)\)/)?.[1];

      if (!matrixValues) return 0;

      const values = matrixValues.split(',').map((value) => Number.parseFloat(value.trim()));

      if (transform.startsWith('matrix3d')) {
        return Number.isFinite(values[13]) ? values[13] : 0;
      }

      return Number.isFinite(values[5]) ? values[5] : 0;
    }

    function setTrackY(value: number, animate: boolean): void {
      if (animate) {
        track.style.removeProperty('transition-duration');
      } else {
        track.style.transitionDuration = '0ms';
      }

      track.style.transform = `translate3d(0, ${value}px, 0)`;
    }

    function scheduleDragTrackY(value: number): void {
      dragPendingTrackY = value;

      if (dragFrame !== undefined) return;

      dragFrame = window.requestAnimationFrame(() => {
        dragFrame = undefined;

        if (dragPendingTrackY === null) return;

        setTrackY(dragPendingTrackY, false);

        dragPendingTrackY = null;
      });
    }

    function setTrackPosition(targetIndex: number, animate: boolean): void {
      setTrackY(getTargetY(targetIndex), animate);
    }

    function getLoopResetIndex(): number | null {
      if (!originalItemCount) return null;

      if (currentTrackIndex < originalItemCount) {
        return currentTrackIndex + originalItemCount;
      }

      if (currentTrackIndex >= originalItemCount * 2) {
        return currentTrackIndex - originalItemCount;
      }

      return null;
    }

    function updateActiveLogicalIndexFromTrackIndex(trackIndex: number): void {
      activeLogicalIndex = normalizeIndex(trackIndex - originalItemCount, originalItemCount);
    }

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
        isDragging ||
        document.hidden ||
        component.classList.contains('is-setting-up') ||
        component.classList.contains('is-drag-settling')
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

    function silentlyResetLoop(): boolean {
      if (!shouldAnimate) return false;

      const resetIndex = getLoopResetIndex();

      if (resetIndex === null) return false;

      isLoopResetting = true;

      component.classList.add('is-loop-resetting');

      currentTrackIndex = resetIndex;
      updateActiveLogicalIndexFromTrackIndex(currentTrackIndex);

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

    function finishInstantSetup(): void {
      void track.offsetHeight;

      setupFrame = window.requestAnimationFrame(() => {
        component.classList.remove('is-setting-up');

        track.style.removeProperty('transition-duration');

        setupFrame = undefined;

        queueNextMove();
      });
    }

    function resetDragState(): void {
      isDragging = false;
      hasDragMoved = false;
      dragPointerId = undefined;
      dragVelocityY = 0;
      dragBaseIndex = currentTrackIndex;
      dragBaseY = getCurrentTrackY();
      dragCurrentDeltaY = 0;
      dragVisualIndex = currentTrackIndex;
      dragPendingTrackY = null;

      cancelDragFrame();
      clearDragResumeTimer();

      component.classList.remove('is-dragging', 'is-drag-settling');
    }

    function setup(): void {
      stopHoldTimer();
      cancelScheduledFrames();
      resetDragState();

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
      currentTrackIndex = originalItemCount + activeLogicalIndex;

      applyVisualState(currentTrackIndex);
      setTrackPosition(currentTrackIndex, false);

      finishInstantSetup();
    }

    function canDrag(): boolean {
      return (
        PRACTICE_TEXT_REEL_SETTINGS.dragEnabled &&
        !isMobile &&
        shouldAnimate &&
        originalItemCount > 1 &&
        !isLoopResetting &&
        !component.classList.contains('is-setting-up') &&
        !component.classList.contains('is-drag-settling')
      );
    }

    function getDragDirection(deltaY: number): -1 | 0 | 1 {
      if (Math.abs(deltaY) < PRACTICE_TEXT_REEL_SETTINGS.dragMinDistance) return 0;

      /*
        Delta negativ = utilizatorul trage în sus = următorul item.
        Delta pozitiv = utilizatorul trage în jos = item-ul anterior.
      */
      return deltaY < 0 ? 1 : -1;
    }

    function getVelocityDirection(velocityY: number): -1 | 0 | 1 {
      if (Math.abs(velocityY) < PRACTICE_TEXT_REEL_SETTINGS.dragVelocityThreshold) return 0;

      return velocityY < 0 ? 1 : -1;
    }

    function getNeighborIndex(baseIndex: number, direction: -1 | 0 | 1): number {
      const items = getAllItems();

      if (!items.length || direction === 0) return baseIndex;

      return clamp(baseIndex + direction, 0, items.length - 1);
    }

    function getDragStepDistance(baseIndex: number, direction: -1 | 0 | 1): number {
      const neighborIndex = getNeighborIndex(baseIndex, direction);

      if (neighborIndex === baseIndex) return 1;

      return Math.max(Math.abs(getTargetY(neighborIndex) - getTargetY(baseIndex)), 1);
    }

    function getResistedDelta(deltaY: number, stepDistance: number): number {
      const sign = Math.sign(deltaY);
      const distance = Math.abs(deltaY);
      const maxNaturalDistance = stepDistance * PRACTICE_TEXT_REEL_SETTINGS.dragMaxPullRatio;

      if (distance <= maxNaturalDistance) return deltaY;

      const extraDistance = distance - maxNaturalDistance;

      return (
        sign * (maxNaturalDistance + extraDistance * PRACTICE_TEXT_REEL_SETTINGS.dragResistance)
      );
    }

    function getDragProgress(deltaY: number, stepDistance: number): number {
      return clamp(Math.abs(deltaY) / stepDistance, 0, 1);
    }

    function beginDrag(event: PointerEvent): void {
      if (!canDrag()) return;

      if (event.pointerType === 'mouse' && event.button !== 0) return;

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

      component.classList.add('is-dragging');
      component.classList.remove('is-drag-settling');

      track.style.transitionDuration = '0ms';

      try {
        mask.setPointerCapture(event.pointerId);
      } catch {
        /*
          Unele browsere pot refuza pointer capture dacă pointer-ul
          nu mai este activ. Interacțiunea rămâne funcțională.
        */
      }
    }

    function updateDrag(event: PointerEvent): void {
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

      const nextVisualIndex =
        progress >= PRACTICE_TEXT_REEL_SETTINGS.dragStateChangeThreshold
          ? candidateIndex
          : dragBaseIndex;

      if (nextVisualIndex === dragVisualIndex) return;

      dragVisualIndex = nextVisualIndex;

      applyVisualState(dragVisualIndex);
    }

    function getReleaseIndex(): number {
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

    function finishDrag(event: PointerEvent): void {
      if (!isDragging || event.pointerId !== dragPointerId) return;

      try {
        if (mask.hasPointerCapture(event.pointerId)) {
          mask.releasePointerCapture(event.pointerId);
        }
      } catch {
        /*
          Pointer capture poate fi deja eliberat de browser.
        */
      }

      flushDragFrame();

      component.classList.remove('is-dragging');

      const shouldSnap = hasDragMoved;

      isDragging = false;
      hasDragMoved = false;
      dragPointerId = undefined;

      if (!shouldSnap) {
        track.style.removeProperty('transition-duration');
        queueNextMove();

        return;
      }

      currentTrackIndex = getReleaseIndex();
      updateActiveLogicalIndexFromTrackIndex(currentTrackIndex);

      component.classList.add('is-drag-settling');

      applyVisualState(currentTrackIndex);
      setTrackPosition(currentTrackIndex, true);

      clearDragResumeTimer();

      /*
        Fallback pentru cazurile în care nu apare transitionend,
        de exemplu dacă snap-ul ajunge exact în poziția curentă.
      */
      dragResumeTimer = window.setTimeout(() => {
        dragResumeTimer = undefined;

        component.classList.remove('is-drag-settling');

        if (silentlyResetLoop()) return;

        queueNextMove();
      }, getDragResumeDelay());
    }

    function cancelDrag(event: PointerEvent): void {
      if (!isDragging || event.pointerId !== dragPointerId) return;

      finishDrag(event);
    }

    track.addEventListener('transitionend', (event: TransitionEvent): void => {
      /*
          Tranzițiile de opacity ale item-urilor ajung și ele aici
          prin bubbling. Continuăm doar după mișcarea track-ului.
        */
      if (event.target !== track || event.propertyName !== 'transform') {
        return;
      }

      if (component.classList.contains('is-drag-settling')) {
        component.classList.remove('is-drag-settling');
        clearDragResumeTimer();
      }

      if (silentlyResetLoop()) return;

      queueNextMove();
    });

    mask.addEventListener('pointerdown', beginDrag);
    window.addEventListener('pointermove', updateDrag, { passive: false });
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', cancelDrag);

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
        resetDragState();

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
