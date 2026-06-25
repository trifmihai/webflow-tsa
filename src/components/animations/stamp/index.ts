type PlanStampGsapTarget = Element | Element[];

type PlanStampTweenVars = {
  autoAlpha?: number;
  clearProps?: string;
  duration?: number;
  ease?: string;
  force3D?: boolean;
  onComplete?: () => void;
  overwrite?: boolean | 'auto';
  rotation?: number;
  scale?: number;
  transformOrigin?: string;
  willChange?: string;
  x?: number;
  y?: number;
};

type PlanStampTimeline = {
  kill: () => void;

  to: (
    target: PlanStampGsapTarget,
    vars: PlanStampTweenVars,
    position?: number | string
  ) => PlanStampTimeline;
};

type PlanStampTimelineConfig = {
  defaults?: {
    overwrite?: boolean | 'auto';
  };

  onComplete?: () => void;
  paused?: boolean;
};

type PlanStampMatchMediaContext = {
  conditions?: {
    desktop?: boolean;
    mobile?: boolean;
    reduceMotion?: boolean;
  };
};

type PlanStampMedia = {
  add: (
    conditions: Readonly<Record<string, string>>,
    callback: (context: PlanStampMatchMediaContext) => void | (() => void)
  ) => void;

  revert: () => void;
};

type PlanStampGsap = {
  getProperty: (target: Element, property: string) => number | string;

  matchMedia: () => PlanStampMedia;

  registerPlugin: (plugin: unknown) => void;

  set: (target: PlanStampGsapTarget, vars: PlanStampTweenVars) => void;

  timeline: (config?: PlanStampTimelineConfig) => PlanStampTimeline;
};

type PlanStampScrollTriggerSelf = {
  isActive: boolean;
  progress: number;
};

type PlanStampScrollTriggerInstance = {
  kill: () => void;
};

type PlanStampScrollTrigger = {
  create: (config: {
    end: string;
    invalidateOnRefresh: boolean;
    markers?: boolean;

    onEnter: () => void;
    onEnterBack: () => void;
    onLeave: () => void;
    onLeaveBack: () => void;

    onRefresh?: (self: PlanStampScrollTriggerSelf) => void;

    start: string;
    trigger: Element;
  }) => PlanStampScrollTriggerInstance;

  refresh: () => void;
};

type PlanStampRuntimeWindow = {
  __tsaPlanStampAnimation?: PlanStampMedia;
  gsap?: PlanStampGsap;
  ScrollTrigger?: PlanStampScrollTrigger;
  Webflow?: Array<() => void>;
};

type PlanStampMotionState = {
  opacity: number;
  rotation: number;
  scale: number;
  x: number;
  y: number;
};

type PlanStampMotionPhase = PlanStampMotionState & {
  duration: number;
  ease: string;
  start: number;
};

type PlanStampPreset = {
  approach: PlanStampMotionPhase;
  impact: PlanStampMotionPhase;

  ink: {
    duration: number;
    ease: string;
    opacity: number;
    start: number;
  };

  settle: PlanStampMotionPhase;

  restore: {
    duration: number;
    ease: string;
  };

  exit: PlanStampMotionPhase;
};

type PlanStampDeviceMode = 'desktop' | 'mobile';

/*
 * ============================================================
 * ANIMATION PRESETS
 * ============================================================
 */

const PLAN_STAMP_PRESETS = {
  classicImpact: {
    approach: {
      x: 6,
      y: -14,
      scale: 1.07,
      rotation: 1.8,
      opacity: 0.32,

      start: 0,
      duration: 0.08,
      ease: 'power1.out',
    },

    impact: {
      x: 0,
      y: 1,
      scale: 0.975,
      rotation: -0.45,
      opacity: 0.7,

      start: 0,
      duration: 0.24,
      ease: 'power2.in',
    },

    ink: {
      opacity: 0.7,
      start: 0.1,
      duration: 0.14,
      ease: 'power1.out',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 0.7,

      start: 0.24,
      duration: 0.36,
      ease: 'power2.out',
    },

    restore: {
      duration: 0.16,
      ease: 'power1.out',
    },

    exit: {
      x: 0,
      y: -3,
      scale: 1.01,
      rotation: 0.25,
      opacity: 0,

      start: 0,
      duration: 0.14,
      ease: 'power1.out',
    },
  },

  precisionSeal: {
    approach: {
      x: 9,
      y: -10,
      scale: 1.035,
      rotation: 2.4,
      opacity: 0.2,

      start: 0,
      duration: 0.1,
      ease: 'power1.out',
    },

    impact: {
      x: 0,
      y: 0.75,
      scale: 0.985,
      rotation: -0.15,
      opacity: 0.7,

      start: 0,
      duration: 0.28,
      ease: 'power3.in',
    },

    ink: {
      opacity: 0.7,
      start: 0.15,
      duration: 0.13,
      ease: 'power1.out',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 0.7,

      start: 0.28,
      duration: 0.32,
      ease: 'power3.out',
    },

    restore: {
      duration: 0.14,
      ease: 'power1.out',
    },

    exit: {
      x: 1,
      y: -2,
      scale: 1.005,
      rotation: 0.15,
      opacity: 0,

      start: 0,
      duration: 0.12,
      ease: 'power1.out',
    },
  },

  archivalImprint: {
    approach: {
      x: 2,
      y: -6,
      scale: 1.018,
      rotation: 0.65,
      opacity: 0.12,

      start: 0,
      duration: 0.14,
      ease: 'sine.out',
    },

    impact: {
      x: 0,
      y: 0.5,
      scale: 0.982,
      rotation: -0.1,
      opacity: 0.7,

      start: 0,
      duration: 0.34,
      ease: 'power2.inOut',
    },

    ink: {
      opacity: 0.7,
      start: 0.16,
      duration: 0.24,
      ease: 'sine.inOut',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 0.7,

      start: 0.34,
      duration: 0.44,
      ease: 'sine.out',
    },

    restore: {
      duration: 0.2,
      ease: 'sine.out',
    },

    exit: {
      x: 0,
      y: -1,
      scale: 1.005,
      rotation: 0,
      opacity: 0,

      start: 0,
      duration: 0.18,
      ease: 'sine.out',
    },
  },

  verdictStrike: {
    approach: {
      x: 7,
      y: -19,
      scale: 1.065,
      rotation: 2.1,
      opacity: 0.24,

      start: 0,
      duration: 0.08,
      ease: 'power1.out',
    },

    impact: {
      x: 0,
      y: 2,
      scale: 0.965,
      rotation: -0.65,
      opacity: 0.7,

      start: 0,
      duration: 0.3,
      ease: 'power4.in',
    },

    ink: {
      opacity: 0.7,
      start: 0.17,
      duration: 0.13,
      ease: 'power1.out',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 0.7,

      start: 0.3,
      duration: 0.4,
      ease: 'expo.out',
    },

    restore: {
      duration: 0.14,
      ease: 'power1.out',
    },

    exit: {
      x: 0,
      y: -3,
      scale: 1.012,
      rotation: 0.3,
      opacity: 0,

      start: 0,
      duration: 0.13,
      ease: 'power1.out',
    },
  },
} satisfies Record<string, PlanStampPreset>;

type PlanStampPresetName = keyof typeof PLAN_STAMP_PRESETS;

/*
 * ============================================================
 * EASY-TO-EDIT SETTINGS
 * ============================================================
 */

const ACTIVE_PLAN_STAMP_PRESET: PlanStampPresetName = 'precisionSeal';

const PLAN_STAMP_SETTINGS = {
  breakpoint: 768,

  trigger: {
    /*
     * APPEARANCE
     *
     * Higher percentage = appears earlier.
     * Lower percentage = appears later.
     */
    desktop: {
      itemAnchor: 'center',
      viewportPercent: 60,
    },

    mobile: {
      itemAnchor: 'center',
      viewportPercent: 100,
    },

    /*
     * DISAPPEARANCE WHEN SCROLLING BACK UP
     *
     * Lower percentage = disappears earlier.
     *
     * Desktop examples:
     * 70 = slightly earlier
     * 65 = recommended
     * 55 = much earlier
     *
     * Mobile examples:
     * 95 = slightly earlier
     * 88 = recommended
     * 80 = noticeably earlier
     */
    exitViewportPercent: {
      desktop: 60,
      mobile: 80,
    },

    end: 'bottom top',
  },

  /*
   * Set to true temporarily to see the trigger lines.
   */
  debugMarkers: false,

  transformOrigin: '50% 50%',
} as const;

/*
 * ============================================================
 * SELECTORS
 * ============================================================
 */

const LIST_SELECTOR = '[data-plan-stamp-list="true"]';

const ITEM_SELECTOR = '[data-plan-stamp-item="true"]';

const MARK_SELECTOR = '[data-plan-stamp-mark="true"]';

/*
 * ============================================================
 * GENERATED VALUES
 * ============================================================
 */

const ACTIVE_PRESET = PLAN_STAMP_PRESETS[ACTIVE_PLAN_STAMP_PRESET];

const PLAN_STAMP_MEDIA_QUERIES = {
  desktop: `(min-width: ` + `${PLAN_STAMP_SETTINGS.breakpoint}px)`,

  mobile: `(max-width: ` + `${PLAN_STAMP_SETTINGS.breakpoint - 1}px)`,

  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const;

function getPlanStampTriggerStart(mode: PlanStampDeviceMode): string {
  const trigger = PLAN_STAMP_SETTINGS.trigger[mode];

  return `${trigger.itemAnchor} ` + `${trigger.viewportPercent}%`;
}

function getPlanStampExitStart(mode: PlanStampDeviceMode): string {
  const viewportPercent = PLAN_STAMP_SETTINGS.trigger.exitViewportPercent[mode];

  return `center ${viewportPercent}%`;
}

/*
 * ============================================================
 * INITIALIZATION
 * ============================================================
 */

export function initPlanStamp(): void {
  const runtimeWindow = window as Window & PlanStampRuntimeWindow;

  runtimeWindow.Webflow ||= [];

  runtimeWindow.Webflow.push(() => {
    const { gsap } = runtimeWindow;
    const { ScrollTrigger } = runtimeWindow;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    runtimeWindow.__tsaPlanStampAnimation?.revert();

    const media = gsap.matchMedia();

    runtimeWindow.__tsaPlanStampAnimation = media;

    media.add(PLAN_STAMP_MEDIA_QUERIES, (context) => {
      const { desktop = false, mobile = false, reduceMotion = false } = context.conditions ?? {};

      if (!desktop && !mobile) return;

      const mode: PlanStampDeviceMode = mobile ? 'mobile' : 'desktop';

      const appearanceTriggerStart = getPlanStampTriggerStart(mode);

      const exitTriggerStart = getPlanStampExitStart(mode);

      const cleanupFunctions: Array<() => void> = [];

      const lists = Array.from(document.querySelectorAll<HTMLElement>(LIST_SELECTOR));

      lists.forEach((list) => {
        const items = Array.from(list.querySelectorAll<HTMLElement>(ITEM_SELECTOR));

        items.forEach((item) => {
          const stamp = item.querySelector<HTMLElement>(MARK_SELECTOR);

          if (!stamp) return;

          let activeAnimation: PlanStampTimeline | null = null;

          let isStamped = false;

          const killActiveAnimation = (): void => {
            if (!activeAnimation) return;

            activeAnimation.kill();
            activeAnimation = null;
          };

          const setHiddenState = (): void => {
            gsap.set(stamp, {
              autoAlpha: 0,

              x: ACTIVE_PRESET.approach.x,
              y: ACTIVE_PRESET.approach.y,

              scale: ACTIVE_PRESET.approach.scale,

              rotation: ACTIVE_PRESET.approach.rotation,

              transformOrigin: PLAN_STAMP_SETTINGS.transformOrigin,

              force3D: true,
              clearProps: 'willChange',
            });
          };

          const setCompletedState = (): void => {
            gsap.set(stamp, {
              autoAlpha: ACTIVE_PRESET.settle.opacity,

              x: ACTIVE_PRESET.settle.x,
              y: ACTIVE_PRESET.settle.y,

              scale: ACTIVE_PRESET.settle.scale,

              rotation: ACTIVE_PRESET.settle.rotation,

              transformOrigin: PLAN_STAMP_SETTINGS.transformOrigin,

              force3D: true,
              clearProps: 'willChange',
            });
          };

          if (reduceMotion) {
            setCompletedState();

            cleanupFunctions.push(() => {
              killActiveAnimation();

              gsap.set(stamp, {
                clearProps: 'opacity,visibility,transform,transformOrigin,willChange',
              });
            });

            return;
          }

          const playStrike = (): void => {
            if (isStamped) return;

            isStamped = true;

            killActiveAnimation();
            setHiddenState();

            gsap.set(stamp, {
              willChange: 'transform,opacity',
            });

            const timeline = gsap.timeline({
              defaults: {
                overwrite: 'auto',
              },

              onComplete: () => {
                setCompletedState();
                activeAnimation = null;
              },
            });

            activeAnimation = timeline;

            timeline.to(
              stamp,
              {
                autoAlpha: ACTIVE_PRESET.approach.opacity,

                duration: ACTIVE_PRESET.approach.duration,

                ease: ACTIVE_PRESET.approach.ease,
              },
              ACTIVE_PRESET.approach.start
            );

            timeline.to(
              stamp,
              {
                x: ACTIVE_PRESET.impact.x,
                y: ACTIVE_PRESET.impact.y,

                scale: ACTIVE_PRESET.impact.scale,

                rotation: ACTIVE_PRESET.impact.rotation,

                duration: ACTIVE_PRESET.impact.duration,

                ease: ACTIVE_PRESET.impact.ease,
              },
              ACTIVE_PRESET.impact.start
            );

            timeline.to(
              stamp,
              {
                autoAlpha: ACTIVE_PRESET.ink.opacity,

                duration: ACTIVE_PRESET.ink.duration,

                ease: ACTIVE_PRESET.ink.ease,
              },
              ACTIVE_PRESET.ink.start
            );

            timeline.to(
              stamp,
              {
                autoAlpha: ACTIVE_PRESET.settle.opacity,

                x: ACTIVE_PRESET.settle.x,
                y: ACTIVE_PRESET.settle.y,

                scale: ACTIVE_PRESET.settle.scale,

                rotation: ACTIVE_PRESET.settle.rotation,

                duration: ACTIVE_PRESET.settle.duration,

                ease: ACTIVE_PRESET.settle.ease,
              },
              ACTIVE_PRESET.settle.start
            );
          };

          const restoreVisibleStamp = (): void => {
            isStamped = true;

            killActiveAnimation();

            const currentOpacity = Number(gsap.getProperty(stamp, 'opacity'));

            if (currentOpacity >= 0.99) {
              setCompletedState();
              return;
            }

            gsap.set(stamp, {
              willChange: 'transform,opacity',
            });

            const timeline = gsap.timeline({
              defaults: {
                overwrite: 'auto',
              },

              onComplete: () => {
                setCompletedState();
                activeAnimation = null;
              },
            });

            activeAnimation = timeline;

            timeline.to(stamp, {
              autoAlpha: ACTIVE_PRESET.settle.opacity,

              x: ACTIVE_PRESET.settle.x,
              y: ACTIVE_PRESET.settle.y,

              scale: ACTIVE_PRESET.settle.scale,

              rotation: ACTIVE_PRESET.settle.rotation,

              duration: ACTIVE_PRESET.restore.duration,

              ease: ACTIVE_PRESET.restore.ease,
            });
          };

          const hideAndResetStamp = (): void => {
            if (!isStamped) {
              setHiddenState();
              return;
            }

            isStamped = false;

            killActiveAnimation();

            gsap.set(stamp, {
              willChange: 'transform,opacity',
            });

            const timeline = gsap.timeline({
              defaults: {
                overwrite: 'auto',
              },

              onComplete: () => {
                setHiddenState();
                activeAnimation = null;
              },
            });

            activeAnimation = timeline;

            timeline.to(
              stamp,
              {
                autoAlpha: ACTIVE_PRESET.exit.opacity,

                x: ACTIVE_PRESET.exit.x,
                y: ACTIVE_PRESET.exit.y,

                scale: ACTIVE_PRESET.exit.scale,

                rotation: ACTIVE_PRESET.exit.rotation,

                duration: ACTIVE_PRESET.exit.duration,

                ease: ACTIVE_PRESET.exit.ease,
              },
              ACTIVE_PRESET.exit.start
            );
          };

          setHiddenState();

          /*
           * ==================================================
           * APPEARANCE TRIGGER
           * ==================================================
           */

          const appearanceScrollTrigger = ScrollTrigger.create({
            trigger: item,

            start: appearanceTriggerStart,

            end: PLAN_STAMP_SETTINGS.trigger.end,

            markers: PLAN_STAMP_SETTINGS.debugMarkers,

            invalidateOnRefresh: true,

            onEnter: playStrike,

            onLeave: () => {
              /*
               * Keep the stamp visible after passing
               * the item while scrolling down.
               */
            },

            onEnterBack: restoreVisibleStamp,

            onLeaveBack: () => {
              /*
               * Exit is controlled by the separate
               * disappearance trigger below.
               */
            },

            onRefresh: (self) => {
              if (self.progress >= 1) {
                isStamped = true;

                killActiveAnimation();
                setCompletedState();

                return;
              }

              if (self.isActive && !isStamped) {
                playStrike();
                return;
              }

              if (self.progress <= 0 && isStamped) {
                isStamped = false;

                killActiveAnimation();
                setHiddenState();
              }
            },
          });

          /*
           * ==================================================
           * DISAPPEARANCE TRIGGER
           * ==================================================
           *
           * This trigger only handles the upward-scroll exit.
           */

          const exitScrollTrigger = ScrollTrigger.create({
            trigger: item,

            start: exitTriggerStart,

            end: PLAN_STAMP_SETTINGS.trigger.end,

            markers: PLAN_STAMP_SETTINGS.debugMarkers,

            invalidateOnRefresh: true,

            onEnter: () => {
              /*
               * No action while scrolling down.
               */
            },

            onLeave: () => {
              /*
               * Keep the stamp visible.
               */
            },

            onEnterBack: () => {
              /*
               * The appearance trigger restores the stamp
               * when the item re-enters from above.
               */
            },

            onLeaveBack: hideAndResetStamp,
          });

          cleanupFunctions.push(() => {
            killActiveAnimation();

            appearanceScrollTrigger.kill();
            exitScrollTrigger.kill();

            gsap.set(stamp, {
              clearProps: 'opacity,visibility,transform,transformOrigin,willChange',
            });
          });
        });
      });

      const refreshScrollTriggers = (): void => {
        ScrollTrigger.refresh();
      };

      if (document.readyState === 'complete') {
        requestAnimationFrame(refreshScrollTriggers);
      } else {
        window.addEventListener('load', refreshScrollTriggers, {
          once: true,
        });
      }

      return () => {
        window.removeEventListener('load', refreshScrollTriggers);

        cleanupFunctions.forEach((cleanup) => {
          cleanup();
        });
      };
    });
  });
}
