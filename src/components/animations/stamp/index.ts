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

  set: (
    target: PlanStampGsapTarget,
    vars: PlanStampTweenVars,
    position?: number | string
  ) => PlanStampTimeline;

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
  __tsaPlanStampDesktop?: PlanStampMedia;
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

/*
 * ============================================================
 * SELECT THE ACTIVE PRESET HERE
 * ============================================================
 *
 * Available:
 *
 * classicImpact
 * precisionSeal
 * archivalImprint
 * verdictStrike
 */

const ACTIVE_PLAN_STAMP_PRESET: PlanStampPresetName = 'archivalImprint';

/*
 * ============================================================
 * GLOBAL SETTINGS
 * ============================================================
 *
 * These apply to every preset.
 */

const PLAN_STAMP_SETTINGS = {
  desktopMinWidth: 768,

  trigger: {
    /*
     * The element point used by ScrollTrigger.
     */
    itemAnchor: 'center',

    /*
     * Where the item anchor reaches inside the viewport.
     *
     * Higher value = earlier
     * Lower value = later
     *
     * 85 = early
     * 75 = balanced
     * 65 = later
     * 55 = much later
     */
    viewportPercent: 75,

    end: 'bottom top',
  },

  /*
   * Set to true to display ScrollTrigger markers.
   * Change back to false before publishing.
   */
  debugMarkers: false,
} as const;

/*
 * ============================================================
 * PRESETS
 * ============================================================
 */

const PLAN_STAMP_PRESETS = {
  /*
   * PRESET 1
   *
   * The current balanced physical stamp.
   *
   * Perception:
   * Clear, familiar, controlled physical contact.
   */
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
      opacity: 1,

      start: 0,
      duration: 0.24,
      ease: 'power2.in',
    },

    ink: {
      opacity: 1,
      start: 0.1,
      duration: 0.14,
      ease: 'power1.out',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,

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

  /*
   * PRESET 2
   *
   * Recommended for TSA.
   *
   * The stamp makes a small alignment correction before
   * applying a precise impression.
   *
   * Perception:
   * Meticulous, composed, confident, premium.
   */
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
      opacity: 1,

      start: 0,
      duration: 0.28,
      ease: 'power3.in',
    },

    ink: {
      opacity: 1,
      start: 0.15,
      duration: 0.13,
      ease: 'power1.out',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,

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

  /*
   * PRESET 3
   *
   * The stamp moves less, but the ink impression develops
   * gradually under sustained pressure.
   *
   * Perception:
   * Archival, editorial, sophisticated, calm.
   */
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
      opacity: 1,
      start: 0.16,
      duration: 0.24,
      ease: 'sine.inOut',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,

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

  /*
   * PRESET 4
   *
   * A heavier downward motion with stronger compression.
   *
   * Perception:
   * Authority, resolution, finality, judicial decision.
   */
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
      opacity: 1,

      start: 0,
      duration: 0.3,
      ease: 'power4.in',
    },

    ink: {
      opacity: 1,
      start: 0.17,
      duration: 0.13,
      ease: 'power1.out',
    },

    settle: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,

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
 * SELECTORS
 * ============================================================
 */

const LIST_SELECTOR = '[data-plan-stamp-list="true"]';

const ITEM_SELECTOR = '[data-plan-stamp-item="true"]';

const MARK_SELECTOR = '[data-plan-stamp-mark="true"]';

/*
 * ============================================================
 * GENERATED SETTINGS
 * ============================================================
 */

const ACTIVE_PRESET = PLAN_STAMP_PRESETS[ACTIVE_PLAN_STAMP_PRESET];

const PLAN_STAMP_MEDIA_QUERIES = {
  desktop: `(min-width: ` + `${PLAN_STAMP_SETTINGS.desktopMinWidth}px)`,

  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const;

const PLAN_STAMP_TRIGGER_START =
  `${PLAN_STAMP_SETTINGS.trigger.itemAnchor} ` + `${PLAN_STAMP_SETTINGS.trigger.viewportPercent}%`;

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

    runtimeWindow.__tsaPlanStampDesktop?.revert();

    const media = gsap.matchMedia();

    runtimeWindow.__tsaPlanStampDesktop = media;

    media.add(PLAN_STAMP_MEDIA_QUERIES, (context) => {
      const { desktop = false, reduceMotion = false } = context.conditions ?? {};

      if (!desktop) return;

      const cleanupFunctions: Array<() => void> = [];

      const lists = Array.from(document.querySelectorAll<HTMLElement>(LIST_SELECTOR));

      lists.forEach((list) => {
        const items = Array.from(list.querySelectorAll<HTMLElement>(ITEM_SELECTOR));

        items.forEach((item) => {
          const stamp = item.querySelector<HTMLElement>(MARK_SELECTOR);

          if (!stamp) return;

          if (reduceMotion) {
            gsap.set(stamp, {
              autoAlpha: 1,

              clearProps: 'transform,transformOrigin,willChange',
            });

            cleanupFunctions.push(() => {
              gsap.set(stamp, {
                clearProps: 'opacity,visibility,transform,transformOrigin,willChange',
              });
            });

            return;
          }

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

              transformOrigin: '50% 50%',
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

              transformOrigin: '50% 50%',
              force3D: true,

              clearProps: 'willChange',
            });
          };

          const playStrike = (): void => {
            if (isStamped) return;

            isStamped = true;

            killActiveAnimation();
            setHiddenState();

            gsap.set(stamp, {
              willChange: 'transform,opacity',
            });

            activeAnimation = gsap.timeline({
              defaults: {
                overwrite: 'auto',
              },

              onComplete: () => {
                setCompletedState();
                activeAnimation = null;
              },
            });

            /*
             * Reveal a faint preview during approach.
             */
            activeAnimation.to(
              stamp,
              {
                autoAlpha: ACTIVE_PRESET.approach.opacity,

                duration: ACTIVE_PRESET.approach.duration,

                ease: ACTIVE_PRESET.approach.ease,
              },
              ACTIVE_PRESET.approach.start
            );

            /*
             * Main contact motion.
             */
            activeAnimation.to(
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

            /*
             * Ink reaches full opacity around contact.
             */
            activeAnimation.to(
              stamp,
              {
                autoAlpha: ACTIVE_PRESET.ink.opacity,

                duration: ACTIVE_PRESET.ink.duration,

                ease: ACTIVE_PRESET.ink.ease,
              },
              ACTIVE_PRESET.ink.start
            );

            /*
             * Pressure release.
             */
            activeAnimation.to(
              stamp,
              {
                x: ACTIVE_PRESET.settle.x,
                y: ACTIVE_PRESET.settle.y,

                scale: ACTIVE_PRESET.settle.scale,

                rotation: ACTIVE_PRESET.settle.rotation,

                autoAlpha: ACTIVE_PRESET.settle.opacity,

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

            activeAnimation = gsap.timeline({
              defaults: {
                overwrite: 'auto',
              },

              onComplete: () => {
                setCompletedState();
                activeAnimation = null;
              },
            });

            activeAnimation.to(stamp, {
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

            activeAnimation = gsap.timeline({
              defaults: {
                overwrite: 'auto',
              },

              onComplete: () => {
                setHiddenState();
                activeAnimation = null;
              },
            });

            activeAnimation.to(
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

          const scrollTrigger = ScrollTrigger.create({
            trigger: item,

            start: PLAN_STAMP_TRIGGER_START,

            end: PLAN_STAMP_SETTINGS.trigger.end,

            markers: PLAN_STAMP_SETTINGS.debugMarkers,

            invalidateOnRefresh: true,

            onEnter: playStrike,

            onLeave: () => {
              /*
               * Keep the stamp visible after
               * the user passes the item.
               */
            },

            onEnterBack: restoreVisibleStamp,

            onLeaveBack: hideAndResetStamp,

            onRefresh: (self) => {
              if (self.isActive && !isStamped) {
                playStrike();
                return;
              }

              if (self.progress >= 1) {
                isStamped = true;

                killActiveAnimation();
                setCompletedState();

                return;
              }

              if (self.progress <= 0 && isStamped) {
                isStamped = false;

                killActiveAnimation();
                setHiddenState();
              }
            },
          });

          cleanupFunctions.push(() => {
            killActiveAnimation();
            scrollTrigger.kill();

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
