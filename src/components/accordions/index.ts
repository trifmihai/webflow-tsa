type AccordionConfig = {
  name: string;
  rootSelector: string;
  groupSelector: string;
  itemSelector: string;
  triggerSelector: string;
  panelSelector: string;
  innerSelector: string;
};

export function initAccordions(): void {
  const ICON_SELECTOR = '[data-accordion-icon]';
  const DIVIDER_SELECTOR = '.divider-horizontal-full';

  const CONFIGS: AccordionConfig[] = [
    {
      name: 'practices',
      rootSelector: '[data-practices-accordion]',
      groupSelector: '[data-practices-group]',
      itemSelector: '[data-practices-item]',
      triggerSelector: '[data-practices-trigger]',
      panelSelector: '[data-practices-panel]',
      innerSelector: '[data-practices-panel-inner]',
    },
    {
      name: 'faq',
      rootSelector: '[data-faq-accordion]',
      groupSelector: '[data-faq-group]',
      itemSelector: '[data-faq-item]',
      triggerSelector: '[data-faq-trigger]',
      panelSelector: '[data-faq-panel]',
      innerSelector: '[data-faq-panel-inner]',
    },
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initAccordionSystem(config: AccordionConfig): void {
    const { gsap } = window;
    const roots = document.querySelectorAll<HTMLElement>(config.rootSelector);

    if (!roots.length) return;

    if (!gsap) {
      console.warn(
        `${config.name} accordion: GSAP is missing. Enable the Webflow GSAP integration first.`
      );
      return;
    }

    roots.forEach((root, rootIndex) => {
      if (root.dataset.accordionReady === 'true') return;

      const activeTimelines = new WeakMap<HTMLElement, any>();
      const groupRequestIds = new WeakMap<HTMLElement, number>();

      const groups = Array.from(root.querySelectorAll<HTMLElement>(config.groupSelector));

      function getParts(item: HTMLElement) {
        const inner = item.querySelector<HTMLElement>(config.innerSelector);

        return {
          trigger: item.querySelector<HTMLElement>(config.triggerSelector),
          panel: item.querySelector<HTMLElement>(config.panelSelector),
          inner,
          divider: inner?.querySelector<HTMLElement>(DIVIDER_SELECTOR) ?? null,
          icon: item.querySelector<HTMLElement>(ICON_SELECTOR),
        };
      }

      function getNextRequestId(group: HTMLElement): number {
        const nextId = (groupRequestIds.get(group) || 0) + 1;
        groupRequestIds.set(group, nextId);

        return nextId;
      }

      function isLatestRequest(group: HTMLElement, requestId: number): boolean {
        return groupRequestIds.get(group) === requestId;
      }

      function clearLegacyInnerMotion(inner: HTMLElement): void {
        const children = Array.from(inner.children);

        if (!children.length) return;

        gsap.set(children, {
          clearProps: 'transform,opacity',
        });
      }

      function stopItemMotion(item: HTMLElement): void {
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

      function getTargetHeight(inner: HTMLElement): number {
        return Math.ceil(inner.getBoundingClientRect().height);
      }

      function openDurationFor(height: number): number {
        return gsap.utils.clamp(0.22, 0.34, 0.2 + height / 3000);
      }

      function closeDurationFor(height: number): number {
        return gsap.utils.clamp(0.18, 0.24, 0.16 + height / 4200);
      }

      function setAriaState(item: HTMLElement, group: HTMLElement, open: boolean): void {
        const { trigger } = getParts(item);

        if (!trigger) return;

        const collapsible = group.dataset.collapsible !== 'false';

        trigger.setAttribute('aria-expanded', String(open));

        if (open && !collapsible) {
          trigger.setAttribute('aria-disabled', 'true');
        } else {
          trigger.removeAttribute('aria-disabled');
        }
      }

      function setImmediateState(item: HTMLElement, group: HTMLElement, open: boolean): void {
        const { panel, inner, divider, icon } = getParts(item);

        if (!panel || !inner || !icon) return;

        stopItemMotion(item);
        clearLegacyInnerMotion(inner);
        setAriaState(item, group, open);

        delete item.dataset.motion;
        item.dataset.state = open ? 'open' : 'closed';

        panel.hidden = !open;

        gsap.set(panel, {
          clearProps: 'opacity,transform',
          height: open ? 'auto' : 0,
          visibility: open ? 'visible' : 'hidden',
          overflow: 'hidden',
        });

        if (divider) {
          gsap.set(divider, {
            opacity: open ? 1 : 0,
          });
        }

        gsap.set(icon, {
          rotation: open ? 0 : 180,
        });
      }

      function openItem(item: HTMLElement, group: HTMLElement, animate = true): void {
        const { trigger, panel, inner, divider, icon } = getParts(item);

        if (!trigger || !panel || !inner || !icon) return;

        stopItemMotion(item);
        setAriaState(item, group, true);

        delete item.dataset.motion;
        item.dataset.state = 'open';

        const wasHidden = panel.hidden;

        panel.hidden = false;

        gsap.set(panel, {
          clearProps: 'opacity,transform',
          visibility: 'visible',
          overflow: 'hidden',
        });

        const startHeight = panel.getBoundingClientRect().height;
        const targetHeight = getTargetHeight(inner);
        const startsFromClosed = wasHidden || startHeight <= 0.5;

        if (divider && startsFromClosed) {
          gsap.set(divider, {
            opacity: 0,
          });
        }

        if (!animate || reducedMotion.matches) {
          gsap.set(panel, {
            height: 'auto',
            visibility: 'visible',
            overflow: 'hidden',
          });

          if (divider) {
            gsap.set(divider, {
              opacity: 1,
            });
          }

          gsap.set(icon, {
            rotation: 0,
          });

          return;
        }

        gsap.set(panel, {
          height: startHeight,
        });

        const timeline = gsap.timeline({
          defaults: {
            overwrite: 'auto',
          },
          onComplete: () => {
            gsap.set(panel, {
              height: 'auto',
              visibility: 'visible',
              overflow: 'hidden',
            });

            activeTimelines.delete(item);
          },
        });

        activeTimelines.set(item, timeline);

        timeline
          .to(
            panel,
            {
              height: targetHeight,
              duration: openDurationFor(targetHeight),
              ease: 'power2.inOut',
            },
            0
          )
          .to(
            icon,
            {
              rotation: 0,
              duration: 0.22,
              ease: 'power2.inOut',
            },
            0
          );

        if (divider) {
          timeline.to(
            divider,
            {
              opacity: 1,
              duration: startsFromClosed ? 0.16 : 0.1,
              ease: 'power1.out',
            },
            startsFromClosed ? 0.055 : 0
          );
        }
      }

      function closeItem(
        item: HTMLElement,
        group: HTMLElement,
        animate = true,
        onComplete?: () => void
      ): void {
        const { trigger, panel, inner, divider, icon } = getParts(item);

        if (!trigger || !panel || !inner || !icon) return;

        stopItemMotion(item);
        setAriaState(item, group, false);

        item.dataset.state = 'closed';
        item.dataset.motion = 'closing';

        panel.hidden = false;

        gsap.set(panel, {
          clearProps: 'opacity,transform',
          visibility: 'visible',
          overflow: 'hidden',
        });

        const currentHeight = panel.getBoundingClientRect().height || getTargetHeight(inner);

        if (!animate || reducedMotion.matches || currentHeight <= 0.5) {
          panel.hidden = true;
          delete item.dataset.motion;

          gsap.set(panel, {
            height: 0,
            visibility: 'hidden',
            overflow: 'hidden',
          });

          if (divider) {
            gsap.set(divider, {
              opacity: 0,
            });
          }

          gsap.set(icon, {
            rotation: 180,
          });

          onComplete?.();
          return;
        }

        gsap.set(panel, {
          height: currentHeight,
        });

        const duration = closeDurationFor(currentHeight);
        const dividerFadeDuration = Math.min(0.11, duration);
        const dividerFadeStart = Math.max(0, duration - dividerFadeDuration);

        const timeline = gsap.timeline({
          defaults: {
            overwrite: 'auto',
          },
          onComplete: () => {
            panel.hidden = true;
            delete item.dataset.motion;

            gsap.set(panel, {
              height: 0,
              visibility: 'hidden',
              overflow: 'hidden',
            });

            if (divider) {
              gsap.set(divider, {
                opacity: 0,
              });
            }

            activeTimelines.delete(item);
            onComplete?.();
          },
        });

        activeTimelines.set(item, timeline);

        timeline
          .to(
            panel,
            {
              height: 0,
              duration,
              ease: 'power2.inOut',
            },
            0
          )
          .to(
            icon,
            {
              rotation: 180,
              duration: 0.2,
              ease: 'power2.inOut',
            },
            0
          );

        if (divider) {
          timeline.to(
            divider,
            {
              opacity: 0,
              duration: dividerFadeDuration,
              ease: 'power1.out',
            },
            dividerFadeStart
          );
        }
      }

      groups.forEach((group, groupIndex) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>(config.itemSelector));

        const triggers: HTMLElement[] = [];

        const initialMode = group.dataset.initialOpen || 'first';

        const explicitlyOpen = items.find((item) => item.dataset.state === 'open');

        const initialOpen = explicitlyOpen || (initialMode === 'first' ? items[0] : null);

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

          const triggerId =
            trigger.id ||
            `${config.name}-trigger-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;

          const panelId =
            panel.id || `${config.name}-panel-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;

          trigger.id = triggerId;
          panel.id = panelId;

          trigger.setAttribute('aria-controls', panelId);

          panel.setAttribute('aria-labelledby', triggerId);
          panel.setAttribute('role', 'region');

          if (!trigger.matches('button')) {
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('tabindex', '0');
          } else if (!trigger.hasAttribute('type')) {
            trigger.setAttribute('type', 'button');
          }

          triggers.push(trigger);

          const activate = (): void => {
            const requestId = getNextRequestId(group);
            const isOpen = item.dataset.state === 'open';
            const isClosing = item.dataset.motion === 'closing';
            const collapsible = group.dataset.collapsible !== 'false';

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
              (sibling) =>
                sibling !== item &&
                (sibling.dataset.state === 'open' || sibling.dataset.motion === 'closing')
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

          trigger.addEventListener('click', activate);

          trigger.addEventListener('keydown', (event: KeyboardEvent) => {
            if (!trigger.matches('button') && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              activate();
              return;
            }

            const currentIndex = triggers.indexOf(trigger);
            let nextIndex: number | null = null;

            if (event.key === 'ArrowDown') {
              nextIndex = (currentIndex + 1) % triggers.length;
            }

            if (event.key === 'ArrowUp') {
              nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            }

            if (event.key === 'Home') {
              nextIndex = 0;
            }

            if (event.key === 'End') {
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

      root.dataset.accordionReady = 'true';

      const syncForMotionPreference = (): void => {
        groups.forEach((group) => {
          Array.from(group.querySelectorAll<HTMLElement>(config.itemSelector)).forEach((item) => {
            setImmediateState(item, group, item.dataset.state === 'open');
          });
        });
      };

      reducedMotion.addEventListener('change', syncForMotionPreference);
    });
  }

  function initAllAccordions(): void {
    CONFIGS.forEach((config) => {
      initAccordionSystem(config);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAccordions, {
      once: true,
    });
  } else {
    initAllAccordions();
  }
}
