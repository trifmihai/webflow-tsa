const HERO_AVATAR_SETTINGS = {
  listSelector: '[data-hero-avatars]',
  avatarSelector: '[data-hero-name]',
  tooltipSelector: '[data-hero-tooltip]',
  tooltipNameSelector: '[data-hero-tooltip-name]',

  activeClass: 'is-active',
  visibleClass: 'is-visible',
  positioningClass: 'is-positioning',
  resizingClass: 'is-resizing',
  clampedClass: 'is-viewport-clamped',
  readyClass: 'is-avatar-motion-ready',

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
  pointerLeaveDelay: 55,
} as const;

type TooltipPosition = {
  centerWithinList: number;
  arrowX: number;
  isClamped: boolean;
};

export function initHeroAvatarHover(): void {
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const lists = document.querySelectorAll<HTMLElement>(HERO_AVATAR_SETTINGS.listSelector);

  lists.forEach((list, listIndex) => {
    if (list.dataset.heroAvatarReady === 'true') return;

    const avatars = Array.from(
      list.querySelectorAll<HTMLElement>(HERO_AVATAR_SETTINGS.avatarSelector)
    );

    const tooltip = list.querySelector<HTMLElement>(
      HERO_AVATAR_SETTINGS.tooltipSelector
    ) as HTMLElement;

    const tooltipName = tooltip.querySelector<HTMLElement>(
      HERO_AVATAR_SETTINGS.tooltipNameSelector
    ) as HTMLElement;

    if (!avatars.length || !tooltip || !tooltipName) {
      console.warn('Hero avatars: lipsesc data-hero-name sau tooltip-ul configurat.', list);

      return;
    }

    list.dataset.heroAvatarReady = 'true';
    list.classList.add(HERO_AVATAR_SETTINGS.readyClass);

    const tooltipId = tooltip.id || `hero-avatar-tooltip-${listIndex + 1}`;

    tooltip.id = tooltipId;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');

    let hoveredAvatar: HTMLElement | null = null;
    let focusedAvatar: HTMLElement | null = null;
    let tappedAvatar: HTMLElement | null = null;
    let currentAvatar: HTMLElement | null = null;

    let pointerLeaveTimer: number | undefined;
    let resizeTimer: number | undefined;
    let showFrame: number | undefined;
    let morphFrame: number | undefined;
    let morphCleanupTimer: number | undefined;

    /*
      Fiecare avatar devine accesibil prin tastatură.
      Numele sunt citite direct din data-hero-name setat în Webflow.
    */

    avatars.forEach((avatar) => {
      const name = avatar.dataset.heroName?.trim();

      if (!name) return;

      avatar.setAttribute('role', 'button');
      avatar.setAttribute('tabindex', '0');
      avatar.setAttribute('aria-label', name);
      avatar.setAttribute('aria-expanded', 'false');
      avatar.setAttribute('aria-controls', tooltipId);
    });

    function cancelFrame(frame: number | undefined): void {
      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }
    }

    function cancelPendingMotion(): void {
      cancelFrame(showFrame);
      cancelFrame(morphFrame);

      showFrame = undefined;
      morphFrame = undefined;

      if (morphCleanupTimer !== undefined) {
        window.clearTimeout(morphCleanupTimer);
        morphCleanupTimer = undefined;
      }
    }

    function stopPointerLeaveTimer(): void {
      if (pointerLeaveTimer === undefined) return;

      window.clearTimeout(pointerLeaveTimer);
      pointerLeaveTimer = undefined;
    }

    function getActiveAvatar(): HTMLElement | null {
      return focusedAvatar || hoveredAvatar || tappedAvatar;
    }

    function getAvatarName(avatar: HTMLElement): string | null {
      const name = avatar.dataset.heroName?.trim();

      return name || null;
    }

    /*
      Măsoară width-ul natural după schimbarea numelui.
      Width-ul inline este folosit doar temporar în timpul morph-ului.
    */

    function getNaturalTooltipWidth(name: string): number {
      tooltipName.textContent = name;
      tooltip.style.width = 'max-content';

      return tooltip.getBoundingClientRect().width;
    }

    /*
      Desktop:
      Tooltip-ul rămâne perfect centrat pe avatar.
      Săgeata Webflow rămâne centrată natural în tooltip.

      Touch:
      Dacă tooltip-ul ar ieși din viewport, este împins în interior,
      iar săgeata este repoziționată instant către avatar.
    */

    function calculateTooltipPosition(
      avatar: HTMLElement,
      tooltipWidth: number,
      constrainToViewport: boolean
    ): TooltipPosition {
      const listRect = list.getBoundingClientRect();
      const avatarRect = avatar.getBoundingClientRect();

      const avatarCenterViewportX = avatarRect.left + avatarRect.width / 2;

      let tooltipCenterViewportX = avatarCenterViewportX;

      if (constrainToViewport) {
        const halfTooltipWidth = tooltipWidth / 2;

        const minCenterX = HERO_AVATAR_SETTINGS.tooltipViewportPadding + halfTooltipWidth;

        const maxCenterX =
          window.innerWidth - HERO_AVATAR_SETTINGS.tooltipViewportPadding - halfTooltipWidth;

        tooltipCenterViewportX =
          minCenterX <= maxCenterX
            ? Math.min(Math.max(avatarCenterViewportX, minCenterX), maxCenterX)
            : window.innerWidth / 2;
      }

      const tooltipLeftViewportX = tooltipCenterViewportX - tooltipWidth / 2;

      const arrowX = avatarCenterViewportX - tooltipLeftViewportX;

      const isClamped = Math.abs(tooltipCenterViewportX - avatarCenterViewportX) > 0.5;

      return {
        centerWithinList: tooltipCenterViewportX - listRect.left,
        arrowX,
        isClamped,
      };
    }

    function applyTooltipPosition(position: TooltipPosition): void {
      tooltip.style.setProperty('--hero-tooltip-x', `${position.centerWithinList}px`);

      tooltip.classList.toggle(HERO_AVATAR_SETTINGS.clampedClass, position.isClamped);

      if (position.isClamped) {
        tooltip.style.setProperty('--hero-tooltip-arrow-x', `${position.arrowX}px`);
      } else {
        /*
          Fără override: săgeata revine la left: 50%
          setat în Webflow.
        */
        tooltip.style.removeProperty('--hero-tooltip-arrow-x');
      }
    }

    function clearMorphStyles(): void {
      tooltip.classList.remove(HERO_AVATAR_SETTINGS.resizingClass);

      tooltip.style.removeProperty('width');
    }

    /*
      Folosit la prima afișare, la touch și la resize.
      Poziția și width-ul se recalculează fără o animație
      accidentală pornită dintr-o stare veche.
    */

    function positionTooltipInstantly(avatar: HTMLElement): void {
      const name = getAvatarName(avatar);

      if (!name) return;

      cancelPendingMotion();
      clearMorphStyles();

      tooltip.classList.add(HERO_AVATAR_SETTINGS.positioningClass);

      const naturalWidth = getNaturalTooltipWidth(name);

      const position = calculateTooltipPosition(avatar, naturalWidth, !finePointerQuery.matches);

      applyTooltipPosition(position);

      tooltip.style.removeProperty('width');

      void tooltip.offsetWidth;

      tooltip.classList.remove(HERO_AVATAR_SETTINGS.positioningClass);
    }

    /*
      Desktop hover morph:
      1. îngheață geometria vizuală curentă;
      2. schimbă textul și măsoară width-ul natural nou;
      3. animă tooltip-ul ca un singur obiect spre noul avatar;
      4. săgeata rămâne centrată, fără mișcare independentă.
    */

    function animateVisibleTooltipTo(avatar: HTMLElement): void {
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

      /*
        Pe desktop eliminăm orice stare de clamp.
        Săgeata rămâne controlată de Webflow la left: 50%.
      */

      tooltip.classList.remove(HERO_AVATAR_SETTINGS.clampedClass);

      tooltip.style.removeProperty('--hero-tooltip-arrow-x');

      /*
        Înghețăm exact starea vizuală curentă.
        Astfel interacțiunea rămâne reversibilă și la mișcări rapide.
      */

      tooltip.style.setProperty('--hero-tooltip-x', `${currentCenterWithinList}px`);

      tooltip.style.width = `${currentWidth}px`;

      /*
        Schimbăm numele și măsurăm noua lățime naturală
        fără ca utilizatorul să vadă faza intermediară.
      */

      const targetWidth = getNaturalTooltipWidth(name);

      const targetPosition = calculateTooltipPosition(avatar, targetWidth, false);

      tooltip.style.width = `${currentWidth}px`;

      void tooltip.offsetWidth;

      tooltip.classList.remove(HERO_AVATAR_SETTINGS.positioningClass);

      morphFrame = window.requestAnimationFrame(() => {
        tooltip.style.width = `${targetWidth}px`;

        applyTooltipPosition(targetPosition);

        morphFrame = undefined;
      });

      morphCleanupTimer = window.setTimeout(() => {
        clearMorphStyles();

        morphCleanupTimer = undefined;
      }, HERO_AVATAR_SETTINGS.tooltipMorphDuration + 40);
    }

    function showTooltip(avatar: HTMLElement): void {
      const isAlreadyVisible = tooltip.classList.contains(HERO_AVATAR_SETTINGS.visibleClass);

      /*
        Nu relansăm aceeași animație dacă starea activă
        nu s-a schimbat.
      */

      if (isAlreadyVisible && currentAvatar === avatar) {
        return;
      }

      if (isAlreadyVisible && currentAvatar) {
        animateVisibleTooltipTo(avatar);

        currentAvatar = avatar;
        tooltip.setAttribute('aria-hidden', 'false');

        return;
      }

      positionTooltipInstantly(avatar);

      currentAvatar = avatar;

      tooltip.setAttribute('aria-hidden', 'false');

      showFrame = window.requestAnimationFrame(() => {
        tooltip.classList.add(HERO_AVATAR_SETTINGS.visibleClass);

        showFrame = undefined;
      });
    }

    function hideTooltip(): void {
      cancelPendingMotion();
      clearMorphStyles();

      currentAvatar = null;

      tooltip.classList.remove(
        HERO_AVATAR_SETTINGS.visibleClass,
        HERO_AVATAR_SETTINGS.positioningClass,
        HERO_AVATAR_SETTINGS.clampedClass
      );

      tooltip.style.removeProperty('--hero-tooltip-arrow-x');

      tooltip.setAttribute('aria-hidden', 'true');
    }

    function render(): void {
      const nextAvatar = getActiveAvatar();

      avatars.forEach((avatar) => {
        const isActive = avatar === nextAvatar;

        avatar.classList.toggle(HERO_AVATAR_SETTINGS.activeClass, isActive);

        avatar.setAttribute('aria-expanded', String(isActive));

        if (isActive) {
          avatar.setAttribute('aria-describedby', tooltipId);
        } else {
          avatar.removeAttribute('aria-describedby');
        }
      });

      if (!nextAvatar) {
        hideTooltip();

        return;
      }

      showTooltip(nextAvatar);
    }

    avatars.forEach((avatar) => {
      /*
        Desktop hover:
        prevenim focusul accidental produs de click-ul cu mouse-ul.
      */

      avatar.addEventListener('pointerdown', (event: PointerEvent): void => {
        if (finePointerQuery.matches && event.pointerType === 'mouse') {
          event.preventDefault();
        }
      });

      avatar.addEventListener('pointerenter', (): void => {
        if (!finePointerQuery.matches) return;

        stopPointerLeaveTimer();

        hoveredAvatar = avatar;

        render();
      });

      avatar.addEventListener('pointerleave', (): void => {
        if (!finePointerQuery.matches) return;

        stopPointerLeaveTimer();

        pointerLeaveTimer = window.setTimeout(() => {
          if (hoveredAvatar === avatar) {
            hoveredAvatar = null;

            render();
          }
        }, HERO_AVATAR_SETTINGS.pointerLeaveDelay);
      });

      /*
        Tastatură:
        focusul reproduce aceeași stare ca hover-ul.
      */

      avatar.addEventListener('focusin', (): void => {
        focusedAvatar = avatar;

        render();
      });

      avatar.addEventListener('focusout', (): void => {
        if (focusedAvatar === avatar) {
          focusedAvatar = null;

          render();
        }
      });

      /*
        Touch:
        un tap selectează avatarul, iar un al doilea tap
        pe același avatar închide tooltip-ul.
      */

      avatar.addEventListener('click', (): void => {
        if (finePointerQuery.matches) return;

        focusedAvatar = null;

        avatar.blur();

        tappedAvatar = tappedAvatar === avatar ? null : avatar;

        render();
      });

      avatar.addEventListener('keydown', (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          hoveredAvatar = null;
          focusedAvatar = null;
          tappedAvatar = null;

          avatar.blur();

          render();

          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();

          focusedAvatar = avatar;

          render();
        }
      });
    });

    /*
      Pe touch, tap în afara listei închide tooltip-ul.
    */

    document.addEventListener('pointerdown', (event: PointerEvent): void => {
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

    /*
      La resize recalculăm poziția tooltip-ului instant,
      fără alunecare pornită din vechea geometrie.
    */

    window.addEventListener('resize', (): void => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        const activeAvatar = getActiveAvatar();

        if (activeAvatar) {
          positionTooltipInstantly(activeAvatar);
        }
      }, 100);
    });

    finePointerQuery.addEventListener('change', (): void => {
      stopPointerLeaveTimer();

      hoveredAvatar = null;
      tappedAvatar = null;

      render();
    });
  });
}
