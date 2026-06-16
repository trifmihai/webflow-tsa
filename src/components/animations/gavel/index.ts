type GavelPoint = {
  x: number;
  y: number;
};

type GavelPose = {
  x: number;
  y: number;
  rotation: number;
};

type GavelMode = 'desktop' | 'mobile';
type GavelDesiredState = 'rest' | 'impact';
type GavelPresetName = 'A' | 'B' | 'C' | 'D' | 'E';

type GavelBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type GavelGeometryConfig = {
  authoredOriginXPercent: number;
  authoredOriginYPercent: number;

  pivotXPercent: number;
  pivotYPercent: number;

  contactXPercent: number;
  contactYPercent: number;

  targetContactXPercent: number;
  targetContactYPercent: number;

  impactRotationDeg: number;

  impactFineTuneXpx: number;
  impactFineTuneYpx: number;

  restFineTuneXpx: number;
  restFineTuneYpx: number;
};

type GavelMotionConfig = {
  anticipationDurationSeconds: number;
  anticipationRotationDeltaDeg: number;
  anticipationXpx: number;
  anticipationYpx: number;
  anticipationEase: string;
  anticipationMaxProgress: number;

  strikeMinDurationSeconds: number;
  strikeMaxDurationSeconds: number;
  strikeEase: string;

  overshootRotationDeltaDeg: number;
  overshootXpx: number;
  overshootYpx: number;

  settleDurationSeconds: number;
  settleEase: string;

  liftMinDurationSeconds: number;
  liftMaxDurationSeconds: number;
  liftEase: string;
};

type GavelReactionConfig = {
  translateXpx: number;
  translateYpx: number;

  scaleX: number;
  scaleY: number;

  opacity?: number;

  compressionDurationSeconds: number;
  compressionEase: string;

  recoveryDurationSeconds: number;
  recoveryEase: string;

  transformOrigin: string;
};

type GavelDeviceProfile = {
  pivotXPercent: number;
  pivotYPercent: number;

  restRotationDeg: number;
  impactRotationDeg: number;

  impactFineTuneXpx: number;
  impactFineTuneYpx: number;

  restFineTuneXpx: number;
  restFineTuneYpx: number;

  motion: GavelMotionConfig;
};

type GavelTargetImpactEffectConfig = {
  compressionXpx: number;
  compressionYpx: number;
  compressionRotationDeg: number;
  compressionScaleX: number;
  compressionScaleY: number;
  compressionDurationSeconds: number;
  compressionEase: string;

  recoilXpx: number;
  recoilYpx: number;
  recoilRotationDeg: number;
  recoilScaleX: number;
  recoilScaleY: number;
  recoilDurationSeconds: number;
  recoilEase: string;

  settleDurationSeconds: number;
  settleEase: string;
  transformOrigin: string;
};

type GavelCastShadowPhaseConfig = {
  scaleX: number;
  scaleY: number;
  opacity: number;
};

type GavelCastShadowEffectConfig = {
  xPercent: number;
  yPercent: number;
  rotationOffsetDeg: number;

  rest: GavelCastShadowPhaseConfig;
  anticipation: GavelCastShadowPhaseConfig;
  impact: GavelCastShadowPhaseConfig;
  settle: GavelCastShadowPhaseConfig;
};

type GavelDustEffectConfig = {
  anchorOffsetXpx: number;
  anchorOffsetYpx: number;

  xPercent: number;

  startOpacity: number;
  peakOpacity: number;

  startScale: number;
  peakScale: number;
  endScale: number;

  startYPercent: number;
  peakYPercent: number;
  endYPercent: number;

  revealDurationSeconds: number;
  fadeDurationSeconds: number;

  revealEase: string;
  fadeEase: string;

  transformOrigin: string;
};

type GavelImpactEffectsConfig = {
  target: GavelTargetImpactEffectConfig;
  castShadow: GavelCastShadowEffectConfig;
  dust: GavelDustEffectConfig;
};

type GavelPreset = {
  label: string;

  desktop: GavelDeviceProfile;
  mobile: GavelDeviceProfile;

  targetReaction: GavelReactionConfig;
  shadowReaction: GavelReactionConfig;

  /*
   * Optional per-preset physical impact calibration.
   * When omitted, the global impactEffects values are used.
   */
  impactEffects?: GavelImpactEffectsConfig;
};

type GavelGeometry = {
  transformOrigin: string;

  rest: GavelPose;
  impact: GavelPose;

  pivotWorld: GavelPoint;
  restContact: GavelPoint;
  impactContact: GavelPoint;
  targetContact: GavelPoint;

  gavelBox: GavelBox;
  targetBox: GavelBox;
};

type GavelController = {
  moveToImpact: () => void;
  moveToRest: () => void;

  setRest: () => void;
  setImpact: () => void;

  refresh: () => void;

  geometry: () => GavelGeometry | null;
  progress: () => number;
  desiredState: () => GavelDesiredState;

  kill: () => void;
};

type GavelInstance = {
  scope: HTMLElement;
  mode: GavelMode;
  controller: GavelController;
};

type GavelScopeElement = HTMLElement & {
  __tsaGavelCleanup?: () => void;
};

type GavelRuntimeWindow = Window & {
  Webflow?: Array<() => void>;

  gsap?: any;
  ScrollTrigger?: any;

  TSA_GAVEL_CONFIG?: unknown;

  TSAGavel?: {
    play: (index?: number) => void;
    lift: (index?: number) => void;
    rest: (index?: number) => void;
    impact: (index?: number) => void;

    refresh: (index?: number) => void;
    refreshAll: () => void;

    geometry: (index?: number) => GavelGeometry | null;
    progress: (index?: number) => number;

    usePreset: (preset: GavelPresetName) => boolean;
    currentPreset: () => GavelPresetName;
    listPresets: () => GavelPresetName[];

    destroyAll: () => void;
  };

  __tsaGavelInputState?: {
    keyboard: boolean;
    initialized: boolean;
  };
};

/* ==========================================================================
   QUICK TUNING AREA

   1. Schimbă activePreset între A, B, C, D și E.
   2. Toate valorile vizuale importante sunt în această zonă.
   3. Poți testa profilurile live și din consolă:
      TSAGavel.usePreset('A')
      TSAGavel.usePreset('B')
      TSAGavel.usePreset('C')
      TSAGavel.usePreset('D')
      TSAGavel.usePreset('E')
   ========================================================================== */

const QUICK_TUNING = {
  version: '8.4.0',

  /*
   * Varianta încărcată implicit după publicare.
   *
   * A = Premium restraint
   * B = Judicial balance
   * C = Strong judicial impact
   * D = Smooth editorial
   * E = Reference judge strike
   */
  activePreset: 'C' as GavelPresetName,

  interaction: {
    desktopMinWidthPx: 992,

    /*
     * Scroll în jos peste această linie: impact.
     * Scroll în sus peste această linie: revenire.
     */
    mobileStart: 'top 80%',
  },

  /*
   * Punctele assetului care sunt comune tuturor variantelor.
   *
   * Aceste valori corectează faptul că imaginea ciocanului
   * conține spațiu transparent.
   */
  assetGeometry: {
    contactXPercent: 88.2,
    contactYPercent: 56.7,

    desktopAuthoredOriginXPercent: 50,
    desktopAuthoredOriginYPercent: 50,

    mobileAuthoredOriginXPercent: 75,
    mobileAuthoredOriginYPercent: 80,

    desktopTargetContactXPercent: 52,
    mobileTargetContactXPercent: 54,

    targetContactYPercent: 0,
  },

  debug: {
    enabled: false,

    /*
     * 1 = normal
     * 2 = de două ori mai lent
     * 3 = de trei ori mai lent
     */
    slowMotionMultiplier: 1,

    showBounds: true,
    showPivot: true,
    showRestContact: true,
    showImpactContact: true,
    showTargetContact: true,
    showContactLine: true,
    logGeometry: true,
  },

  performance: {
    force3D: true,
    temporaryWillChange: true,
  },

  /*
   * Efectele suplimentare disponibile cu structura actuală:
   * target întreg, cast shadow separat și dust separat.
   *
   * Toate valorile care merită calibrate sunt aici.
   */
  impactEffects: {
    target: {
      compressionXpx: 0.35,
      compressionYpx: 1.25,
      compressionRotationDeg: 0.08,
      compressionScaleX: 1.002,
      compressionScaleY: 0.997,
      compressionDurationSeconds: 0.045,
      compressionEase: 'power3.out',

      recoilXpx: -0.14,
      recoilYpx: -0.2,
      recoilRotationDeg: -0.035,
      recoilScaleX: 1,
      recoilScaleY: 1.0005,
      recoilDurationSeconds: 0.038,
      recoilEase: 'power2.out',

      settleDurationSeconds: 0.085,
      settleEase: 'power3.out',
      transformOrigin: 'bottom center',
    },

    castShadow: {
      /*
       * Gavel-ul și shadow-ul au aceeași cutie și aceeași dimensiune.
       * Shadow-ul primește exact aceeași traiectorie x/y ca gavel-ul.
       *
       * Aceste trei valori reprezintă numai repoziționarea locală
       * văzută în Webflow. Offsetul este intenționat mic, astfel încât
       * shadow-ul să rămână lipit vizual de gavel în toate fazele.
       */
      xPercent: 3,
      yPercent: 6,
      rotationOffsetDeg: 8,

      /*
       * Nu scalăm shadow-ul între faze. Schimbarea scalei făcea
       * conturul să alunece și să pară că plutește departe la impact.
       * Doar opacitatea se modifică foarte discret.
       */
      rest: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.52,
      },

      anticipation: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.48,
      },

      impact: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.64,
      },

      settle: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.58,
      },
    },

    dust: {
      /*
       * Poziția este calculată dinamic din punctul real de contact.
       * Valorile pozitive pe Y mută praful mai jos.
       * Valorile negative pe X îl mută spre stânga.
       */
      anchorOffsetXpx: -8,
      anchorOffsetYpx: 10,

      xPercent: -50,

      startOpacity: 0,
      peakOpacity: 0.16,

      startScale: 0.7,
      peakScale: 0.92,
      endScale: 1.06,

      startYPercent: -28,
      peakYPercent: -36,
      endYPercent: -56,

      revealDurationSeconds: 0.04,
      fadeDurationSeconds: 0.16,

      revealEase: 'power2.out',
      fadeEase: 'power2.out',

      transformOrigin: 'center bottom',
    },
  } satisfies GavelImpactEffectsConfig,

  presets: {
    A: {
      label: 'Premium restraint',

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -22,
        impactRotationDeg: 2,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 14,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.055,
          anticipationRotationDeltaDeg: -2.5,
          anticipationXpx: -0.6,
          anticipationYpx: -0.4,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.18,

          strikeMinDurationSeconds: 0.11,
          strikeMaxDurationSeconds: 0.15,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 0.35,
          overshootXpx: 0.4,
          overshootYpx: 0.7,

          settleDurationSeconds: 0.085,
          settleEase: 'power3.out',

          liftMinDurationSeconds: 0.14,
          liftMaxDurationSeconds: 0.28,
          liftEase: 'power3.out',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -26,
        impactRotationDeg: 1.5,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 10,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.065,
          anticipationRotationDeltaDeg: -2.5,
          anticipationXpx: -0.5,
          anticipationYpx: -0.4,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.18,

          strikeMinDurationSeconds: 0.12,
          strikeMaxDurationSeconds: 0.16,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 0.35,
          overshootXpx: 0.4,
          overshootYpx: 0.7,

          settleDurationSeconds: 0.095,
          settleEase: 'power3.out',

          liftMinDurationSeconds: 0.16,
          liftMaxDurationSeconds: 0.3,
          liftEase: 'power3.out',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.45,
        scaleX: 1.001,
        scaleY: 0.998,

        compressionDurationSeconds: 0.04,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.13,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 1.5,

        scaleX: 1.12,
        scaleY: 0.86,

        opacity: 0.84,

        compressionDurationSeconds: 0.05,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.16,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },
    },

    B: {
      label: 'Judicial balance',

      desktop: {
        pivotXPercent: 16,
        pivotYPercent: 66,

        restRotationDeg: -20,
        impactRotationDeg: 1.5,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 0,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.07,
          anticipationRotationDeltaDeg: -3.5,
          anticipationXpx: -1,
          anticipationYpx: -0.6,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.2,

          strikeMinDurationSeconds: 0.13,
          strikeMaxDurationSeconds: 0.17,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 0.7,
          overshootXpx: 0.8,
          overshootYpx: 1.1,

          settleDurationSeconds: 0.1,
          settleEase: 'power3.out',

          liftMinDurationSeconds: 0.16,
          liftMaxDurationSeconds: 0.34,
          liftEase: 'power3.out',
        },
      },

      mobile: {
        pivotXPercent: 16,
        pivotYPercent: 66,

        restRotationDeg: -24,
        impactRotationDeg: 1,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 0,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.08,
          anticipationRotationDeltaDeg: -3.5,
          anticipationXpx: -0.9,
          anticipationYpx: -0.6,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.2,

          strikeMinDurationSeconds: 0.14,
          strikeMaxDurationSeconds: 0.18,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 0.7,
          overshootXpx: 0.8,
          overshootYpx: 1.1,

          settleDurationSeconds: 0.11,
          settleEase: 'power3.out',

          liftMinDurationSeconds: 0.18,
          liftMaxDurationSeconds: 0.36,
          liftEase: 'power3.out',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 1,

        scaleX: 1.005,
        scaleY: 0.989,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.17,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 1.5,

        scaleX: 1.12,
        scaleY: 0.85,

        opacity: 0.82,

        compressionDurationSeconds: 0.065,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.19,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },
    },

    C: {
      label: 'Strong judicial impact',

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -22,
        impactRotationDeg: 2,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 14,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.08,
          anticipationRotationDeltaDeg: -5,
          anticipationXpx: -1.5,
          anticipationYpx: -1,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.22,

          strikeMinDurationSeconds: 0.1,
          strikeMaxDurationSeconds: 0.145,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 1.1,
          overshootXpx: 1.2,
          overshootYpx: 1.7,

          settleDurationSeconds: 0.12,
          settleEase: 'power3.out',

          liftMinDurationSeconds: 0.18,
          liftMaxDurationSeconds: 0.38,
          liftEase: 'power3.out',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -22,
        impactRotationDeg: 2,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 10,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.08,
          anticipationRotationDeltaDeg: -5,
          anticipationXpx: -1.5,
          anticipationYpx: -1,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.22,

          strikeMinDurationSeconds: 0.1,
          strikeMaxDurationSeconds: 0.145,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 1.1,
          overshootXpx: 1.2,
          overshootYpx: 1.7,

          settleDurationSeconds: 0.12,
          settleEase: 'power3.out',

          liftMinDurationSeconds: 0.18,
          liftMaxDurationSeconds: 0.38,
          liftEase: 'power3.out',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 1,
        scaleX: 1.003,
        scaleY: 0.996,

        compressionDurationSeconds: 0.04,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.13,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 1.5,

        scaleX: 1.12,
        scaleY: 0.86,

        opacity: 0.84,

        compressionDurationSeconds: 0.05,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.16,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },
    },

    D: {
      label: 'Smooth editorial',

      desktop: {
        pivotXPercent: 15,
        pivotYPercent: 67,

        restRotationDeg: -18,
        impactRotationDeg: 1,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 0,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.05,
          anticipationRotationDeltaDeg: -1.75,
          anticipationXpx: -0.4,
          anticipationYpx: -0.3,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.15,

          strikeMinDurationSeconds: 0.17,
          strikeMaxDurationSeconds: 0.22,
          strikeEase: 'power2.in',

          overshootRotationDeltaDeg: 0.3,
          overshootXpx: 0.4,
          overshootYpx: 0.6,

          settleDurationSeconds: 0.09,
          settleEase: 'power2.out',

          liftMinDurationSeconds: 0.17,
          liftMaxDurationSeconds: 0.32,
          liftEase: 'power2.out',
        },
      },

      mobile: {
        pivotXPercent: 15,
        pivotYPercent: 67,

        restRotationDeg: -22,
        impactRotationDeg: 0.5,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 0,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.06,
          anticipationRotationDeltaDeg: -1.75,
          anticipationXpx: -0.4,
          anticipationYpx: -0.3,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.15,

          strikeMinDurationSeconds: 0.18,
          strikeMaxDurationSeconds: 0.23,
          strikeEase: 'power2.in',

          overshootRotationDeltaDeg: 0.3,
          overshootXpx: 0.4,
          overshootYpx: 0.6,

          settleDurationSeconds: 0.1,
          settleEase: 'power2.out',

          liftMinDurationSeconds: 0.18,
          liftMaxDurationSeconds: 0.34,
          liftEase: 'power2.out',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.8,

        scaleX: 1.003,
        scaleY: 0.991,

        compressionDurationSeconds: 0.06,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.17,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 1.25,

        scaleX: 1.09,
        scaleY: 0.88,

        opacity: 0.85,

        compressionDurationSeconds: 0.07,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.19,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },
    },

    E: {
      label: 'Reference judge strike',

      /*
       * Reproduces the single-hit mechanics visible in the uploaded
       * 24 FPS judge-gavel reference:
       *
       * - almost no visible anticipation;
       * - short accelerating strike;
       * - exact contact with practically no penetration;
       * - no cartoon bounce;
       * - firm hold at impact until the interaction reverses;
       * - fast initial lift followed by a controlled settle.
       */

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -22,
        impactRotationDeg: 0.8,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 14,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.028,
          anticipationRotationDeltaDeg: -1.2,
          anticipationXpx: -0.25,
          anticipationYpx: -0.45,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.12,

          strikeMinDurationSeconds: 0.105,
          strikeMaxDurationSeconds: 0.135,
          strikeEase: 'power3.in',

          /*
           * The reference shows no visible bounce after contact.
           * These values create only a sub-pixel collision settle.
           */
          overshootRotationDeltaDeg: 0.08,
          overshootXpx: 0.08,
          overshootYpx: 0.18,

          settleDurationSeconds: 0.055,
          settleEase: 'power2.out',

          liftMinDurationSeconds: 0.14,
          liftMaxDurationSeconds: 0.21,
          liftEase: 'power3.out',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -26,
        impactRotationDeg: 0.8,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 10,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.035,
          anticipationRotationDeltaDeg: -1.1,
          anticipationXpx: -0.2,
          anticipationYpx: -0.4,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.12,

          strikeMinDurationSeconds: 0.115,
          strikeMaxDurationSeconds: 0.145,
          strikeEase: 'power3.in',

          overshootRotationDeltaDeg: 0.08,
          overshootXpx: 0.08,
          overshootYpx: 0.18,

          settleDurationSeconds: 0.06,
          settleEase: 'power2.out',

          liftMinDurationSeconds: 0.16,
          liftMaxDurationSeconds: 0.24,
          liftEase: 'power3.out',
        },
      },

      /*
       * Preserved for compatibility with the existing wide shadow logic.
       * The physical target animation is controlled by impactEffects below.
       */
      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.4,

        scaleX: 1.0005,
        scaleY: 0.9995,

        compressionDurationSeconds: 0.04,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.11,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 0.8,

        scaleX: 1.06,
        scaleY: 0.92,

        opacity: 0.92,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power2.out',

        recoveryDurationSeconds: 0.14,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },

      impactEffects: {
        target: {
          /*
           * The block in the reference remains rigid.
           * The movement is intentionally below one pixel.
           */
          compressionXpx: 0.08,
          compressionYpx: 0.55,
          compressionRotationDeg: 0.015,
          compressionScaleX: 1.0005,
          compressionScaleY: 0.9995,
          compressionDurationSeconds: 0.04,
          compressionEase: 'power3.out',

          recoilXpx: -0.04,
          recoilYpx: -0.05,
          recoilRotationDeg: -0.005,
          recoilScaleX: 1,
          recoilScaleY: 1,
          recoilDurationSeconds: 0.03,
          recoilEase: 'power2.out',

          settleDurationSeconds: 0.07,
          settleEase: 'power3.out',
          transformOrigin: 'bottom center',
        },

        castShadow: {
          /*
           * Same canvas and trajectory as the hammer.
           * Only density changes between phases.
           */
          xPercent: 3,
          yPercent: 6,
          rotationOffsetDeg: 8,

          rest: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.2,
          },

          anticipation: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.16,
          },

          impact: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.32,
          },

          settle: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.28,
          },
        },

        dust: {
          /*
           * The reference dust appears at the contact line and expands
           * laterally before fading. The asset remains restrained for TSA.
           */
          anchorOffsetXpx: -8,
          anchorOffsetYpx: 8,

          xPercent: -50,

          startOpacity: 0,
          peakOpacity: 0.18,

          startScale: 0.72,
          peakScale: 0.94,
          endScale: 1.08,

          startYPercent: -20,
          peakYPercent: -29,
          endYPercent: -48,

          revealDurationSeconds: 0.04,
          fadeDurationSeconds: 0.17,

          revealEase: 'power2.out',
          fadeEase: 'power2.out',

          transformOrigin: 'center bottom',
        },
      },
    },
  } satisfies Record<GavelPresetName, GavelPreset>,
};

/* ==========================================================================
   END QUICK TUNING AREA
   ========================================================================== */

export function initGavel(): void {
  const runtimeWindow = window as GavelRuntimeWindow;

  runtimeWindow.Webflow ||= [];

  runtimeWindow.Webflow.push(() => {
    const { gsap } = runtimeWindow;
    const { ScrollTrigger } = runtimeWindow;

    if (!gsap || !ScrollTrigger) {
      console.warn('[TSA Gavel] GSAP sau ScrollTrigger nu este disponibil.');

      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    runtimeWindow.TSA_GAVEL_CONFIG = QUICK_TUNING;

    const SELECTORS = {
      scope: '[data-gavel-scope]',
      trigger: '[data-gavel-trigger]',
      component: '[data-gavel-component]',
      gavel: '[data-gavel]',
      castShadow: '[data-gavel-cast-shadow]',
      dust: '[data-gavel-impact-dust]',
      target: '[data-gavel-target]',
      shadow: '[data-gavel-shadow]',
    };

    const DESKTOP_QUERY =
      `(min-width: ${QUICK_TUNING.interaction.desktopMinWidthPx}px) ` +
      'and (hover: hover) ' +
      'and (pointer: fine) ' +
      'and (prefers-reduced-motion: no-preference)';

    const MOBILE_QUERY = `(max-width: ${
      QUICK_TUNING.interaction.desktopMinWidthPx - 1
    }px) and (prefers-reduced-motion: no-preference)`;

    const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

    let activePresetName = QUICK_TUNING.activePreset;

    const instances: GavelInstance[] = [];
    const globalCleanup: Array<() => void> = [];

    const clamp = (value: number, min: number, max: number): number => {
      return Math.min(Math.max(value, min), max);
    };

    const lerp = (start: number, end: number, progress: number): number => {
      return start + (end - start) * progress;
    };

    const degreesToRadians = (degrees: number): number => {
      return (degrees * Math.PI) / 180;
    };

    const radiansToDegrees = (radians: number): number => {
      return (radians * 180) / Math.PI;
    };

    const rotateVector = (point: GavelPoint, degrees: number): GavelPoint => {
      const radians = degreesToRadians(degrees);

      const cosine = Math.cos(radians);
      const sine = Math.sin(radians);

      return {
        x: point.x * cosine - point.y * sine,

        y: point.x * sine + point.y * cosine,
      };
    };

    const getPercentPoint = (
      width: number,
      height: number,
      xPercent: number,
      yPercent: number
    ): GavelPoint => {
      return {
        x: (width * xPercent) / 100,
        y: (height * yPercent) / 100,
      };
    };

    const getActivePreset = (): GavelPreset => {
      return QUICK_TUNING.presets[activePresetName];
    };

    const getGeometryConfig = (
      mode: GavelMode,
      deviceProfile: GavelDeviceProfile
    ): GavelGeometryConfig => {
      const shared = QUICK_TUNING.assetGeometry;

      const isDesktop = mode === 'desktop';

      return {
        authoredOriginXPercent: isDesktop
          ? shared.desktopAuthoredOriginXPercent
          : shared.mobileAuthoredOriginXPercent,

        authoredOriginYPercent: isDesktop
          ? shared.desktopAuthoredOriginYPercent
          : shared.mobileAuthoredOriginYPercent,

        pivotXPercent: deviceProfile.pivotXPercent,

        pivotYPercent: deviceProfile.pivotYPercent,

        contactXPercent: shared.contactXPercent,

        contactYPercent: shared.contactYPercent,

        targetContactXPercent: isDesktop
          ? shared.desktopTargetContactXPercent
          : shared.mobileTargetContactXPercent,

        targetContactYPercent: shared.targetContactYPercent,

        impactRotationDeg: deviceProfile.impactRotationDeg,

        impactFineTuneXpx: deviceProfile.impactFineTuneXpx,

        impactFineTuneYpx: deviceProfile.impactFineTuneYpx,

        restFineTuneXpx: deviceProfile.restFineTuneXpx,

        restFineTuneYpx: deviceProfile.restFineTuneYpx,
      };
    };

    const calculateOriginCompensation = ({
      width,
      height,
      authoredOriginXPercent,
      authoredOriginYPercent,
      pivotXPercent,
      pivotYPercent,
      rotationDeg,
    }: {
      width: number;
      height: number;

      authoredOriginXPercent: number;
      authoredOriginYPercent: number;

      pivotXPercent: number;
      pivotYPercent: number;

      rotationDeg: number;
    }): GavelPoint => {
      const authoredOrigin = getPercentPoint(
        width,
        height,
        authoredOriginXPercent,
        authoredOriginYPercent
      );

      const pivotOrigin = getPercentPoint(width, height, pivotXPercent, pivotYPercent);

      const difference = {
        x: authoredOrigin.x - pivotOrigin.x,

        y: authoredOrigin.y - pivotOrigin.y,
      };

      const rotatedDifference = rotateVector(difference, rotationDeg);

      return {
        x: difference.x - rotatedDifference.x,

        y: difference.y - rotatedDifference.y,
      };
    };

    const measureWithoutOwnTransform = (element: HTMLElement, component: HTMLElement): GavelBox => {
      const previousTransform = element.style.transform;

      const previousTransformOrigin = element.style.transformOrigin;

      element.style.transform = 'none';
      element.style.transformOrigin = '50% 50%';

      const componentRect = component.getBoundingClientRect();

      const elementRect = element.getBoundingClientRect();

      element.style.transform = previousTransform;

      element.style.transformOrigin = previousTransformOrigin;

      return {
        left: elementRect.left - componentRect.left,

        top: elementRect.top - componentRect.top,

        width: elementRect.width,
        height: elementRect.height,
      };
    };

    const removeDebug = (component: HTMLElement, gavel: HTMLElement, target: HTMLElement): void => {
      component.querySelector('.tsa-gavel-debug-layer')?.remove();

      gavel.classList.remove('is-tsa-gavel-debug');

      target.classList.remove('is-tsa-gavel-debug');
    };

    const renderDebug = (
      component: HTMLElement,
      gavel: HTMLElement,
      target: HTMLElement,
      geometry: GavelGeometry
    ): void => {
      removeDebug(component, gavel, target);

      if (!QUICK_TUNING.debug.enabled) {
        return;
      }

      const layer = document.createElement('div');

      layer.className = 'tsa-gavel-debug-layer';

      component.appendChild(layer);

      if (QUICK_TUNING.debug.showBounds) {
        gavel.classList.add('is-tsa-gavel-debug');

        target.classList.add('is-tsa-gavel-debug');
      }

      const addMarker = (point: GavelPoint, label: string, modifier: string): void => {
        const marker = document.createElement('div');

        marker.className = `tsa-gavel-debug-marker ${modifier}`;

        marker.dataset.label = label;
        marker.style.left = `${point.x}px`;
        marker.style.top = `${point.y}px`;

        layer.appendChild(marker);
      };

      if (QUICK_TUNING.debug.showPivot) {
        addMarker(geometry.pivotWorld, 'PIVOT', 'is-pivot');
      }

      if (QUICK_TUNING.debug.showRestContact) {
        addMarker(geometry.restContact, 'REST CONTACT', 'is-rest-contact');
      }

      if (QUICK_TUNING.debug.showImpactContact) {
        addMarker(geometry.impactContact, 'IMPACT', 'is-impact-contact');
      }

      if (QUICK_TUNING.debug.showTargetContact) {
        addMarker(geometry.targetContact, 'TARGET', 'is-target-contact');
      }

      if (QUICK_TUNING.debug.showContactLine) {
        const deltaX = geometry.targetContact.x - geometry.restContact.x;

        const deltaY = geometry.targetContact.y - geometry.restContact.y;

        const line = document.createElement('div');

        line.className = 'tsa-gavel-debug-line';

        line.style.left = `${geometry.restContact.x}px`;

        line.style.top = `${geometry.restContact.y}px`;

        line.style.width = `${Math.hypot(deltaX, deltaY)}px`;

        line.style.transform = `rotate(${radiansToDegrees(Math.atan2(deltaY, deltaX))}deg)`;

        layer.appendChild(line);
      }

      if (QUICK_TUNING.debug.logGeometry) {
        console.group(`[TSA Gavel] Preset ${activePresetName}: ` + getActivePreset().label);

        console.table({
          restX: geometry.rest.x,
          restY: geometry.rest.y,
          restRotation: geometry.rest.rotation,

          impactX: geometry.impact.x,
          impactY: geometry.impact.y,
          impactRotation: geometry.impact.rotation,

          pivotX: geometry.pivotWorld.x,

          pivotY: geometry.pivotWorld.y,

          targetX: geometry.targetContact.x,

          targetY: geometry.targetContact.y,

          impactContactX: geometry.impactContact.x,

          impactContactY: geometry.impactContact.y,
        });

        console.groupEnd();
      }
    };

    const calculateGeometry = ({
      component,
      gavel,
      target,
      geometryConfig,
      restRotationDeg,
    }: {
      component: HTMLElement;
      gavel: HTMLElement;
      target: HTMLElement;

      geometryConfig: GavelGeometryConfig;
      restRotationDeg: number;
    }): GavelGeometry | null => {
      const gavelBox = measureWithoutOwnTransform(gavel, component);

      const targetBox = measureWithoutOwnTransform(target, component);

      if (
        gavelBox.width <= 0 ||
        gavelBox.height <= 0 ||
        targetBox.width <= 0 ||
        targetBox.height <= 0
      ) {
        return null;
      }

      const pivotLocal = getPercentPoint(
        gavelBox.width,
        gavelBox.height,
        geometryConfig.pivotXPercent,
        geometryConfig.pivotYPercent
      );

      const contactLocal = getPercentPoint(
        gavelBox.width,
        gavelBox.height,
        geometryConfig.contactXPercent,
        geometryConfig.contactYPercent
      );

      const contactVector = {
        x: contactLocal.x - pivotLocal.x,

        y: contactLocal.y - pivotLocal.y,
      };

      const originCompensation = calculateOriginCompensation({
        width: gavelBox.width,
        height: gavelBox.height,

        authoredOriginXPercent: geometryConfig.authoredOriginXPercent,

        authoredOriginYPercent: geometryConfig.authoredOriginYPercent,

        pivotXPercent: geometryConfig.pivotXPercent,

        pivotYPercent: geometryConfig.pivotYPercent,

        rotationDeg: restRotationDeg,
      });

      const rest: GavelPose = {
        x: originCompensation.x + geometryConfig.restFineTuneXpx,

        y: originCompensation.y + geometryConfig.restFineTuneYpx,

        rotation: restRotationDeg,
      };

      const pivotWorld = {
        x: gavelBox.left + pivotLocal.x + rest.x,

        y: gavelBox.top + pivotLocal.y + rest.y,
      };

      const targetContact = {
        x:
          targetBox.left +
          targetBox.width * (geometryConfig.targetContactXPercent / 100) +
          geometryConfig.impactFineTuneXpx,

        y:
          targetBox.top +
          targetBox.height * (geometryConfig.targetContactYPercent / 100) +
          geometryConfig.impactFineTuneYpx,
      };

      const rotatedImpactVector = rotateVector(contactVector, geometryConfig.impactRotationDeg);

      const contactBeforeTranslation = {
        x: pivotWorld.x + rotatedImpactVector.x,

        y: pivotWorld.y + rotatedImpactVector.y,
      };

      const impactCorrection = {
        x: targetContact.x - contactBeforeTranslation.x,

        y: targetContact.y - contactBeforeTranslation.y,
      };

      const impact: GavelPose = {
        x: rest.x + impactCorrection.x,

        y: rest.y + impactCorrection.y,

        rotation: geometryConfig.impactRotationDeg,
      };

      const restContactVector = rotateVector(contactVector, rest.rotation);

      const impactContactVector = rotateVector(contactVector, impact.rotation);

      const restContact = {
        x: pivotWorld.x + restContactVector.x,

        y: pivotWorld.y + restContactVector.y,
      };

      const impactPivot = {
        x: gavelBox.left + pivotLocal.x + impact.x,

        y: gavelBox.top + pivotLocal.y + impact.y,
      };

      const impactContact = {
        x: impactPivot.x + impactContactVector.x,

        y: impactPivot.y + impactContactVector.y,
      };

      return {
        transformOrigin: `${geometryConfig.pivotXPercent}% ` + `${geometryConfig.pivotYPercent}%`,

        rest,
        impact,

        pivotWorld,
        restContact,
        impactContact,
        targetContact,

        gavelBox,
        targetBox,
      };
    };

    const createController = ({
      component,
      gavel,
      castShadow,
      dust,
      target,
      shadow,
      geometryConfig,
      deviceProfile,
      targetReaction,
      shadowReaction,
      impactEffects,
    }: {
      component: HTMLElement;
      gavel: HTMLElement;
      castShadow: HTMLElement | null;
      dust: HTMLElement | null;
      target: HTMLElement;
      shadow: HTMLElement;

      geometryConfig: GavelGeometryConfig;
      deviceProfile: GavelDeviceProfile;

      targetReaction: GavelReactionConfig;
      shadowReaction: GavelReactionConfig;
      impactEffects: GavelImpactEffectsConfig;
    }): GavelController => {
      let geometry: GavelGeometry | null = null;

      let activeTimeline: any = null;
      let resizeFrame = 0;

      let desiredState: GavelDesiredState = 'rest';

      const motionConfig = deviceProfile.motion;

      const { restRotationDeg } = deviceProfile;

      const durationMultiplier = QUICK_TUNING.debug.enabled
        ? QUICK_TUNING.debug.slowMotionMultiplier
        : 1;

      const duration = (seconds: number): number => {
        return seconds * durationMultiplier;
      };

      const setWillChange = (active: boolean): void => {
        if (!QUICK_TUNING.performance.temporaryWillChange) {
          return;
        }

        [gavel, castShadow, dust, target, shadow]
          .filter((element): element is HTMLElement => Boolean(element))
          .forEach((element) => {
            element.style.willChange = active ? 'transform' : '';
          });
      };

      const getNumericProperty = (element: HTMLElement, property: string): number => {
        const value = gsap.getProperty(element, property);

        if (typeof value === 'number') {
          return value;
        }

        return Number.parseFloat(String(value)) || 0;
      };

      const readCurrentPose = (): GavelPose => {
        return {
          x: getNumericProperty(gavel, 'x'),

          y: getNumericProperty(gavel, 'y'),

          rotation: getNumericProperty(gavel, 'rotation'),
        };
      };

      const getProgress = (): number => {
        if (!geometry) {
          return 0;
        }

        const rotationWeight = 2.5;

        const { rest } = geometry;
        const { impact } = geometry;

        const current = readCurrentPose();

        const axis = {
          x: impact.x - rest.x,

          y: impact.y - rest.y,

          rotation: (impact.rotation - rest.rotation) * rotationWeight,
        };

        const currentVector = {
          x: current.x - rest.x,

          y: current.y - rest.y,

          rotation: (current.rotation - rest.rotation) * rotationWeight,
        };

        const axisLengthSquared = axis.x * axis.x + axis.y * axis.y + axis.rotation * axis.rotation;

        if (axisLengthSquared <= 0.001) {
          return desiredState === 'impact' ? 1 : 0;
        }

        const projection =
          (currentVector.x * axis.x +
            currentVector.y * axis.y +
            currentVector.rotation * axis.rotation) /
          axisLengthSquared;

        return clamp(projection, 0, 1);
      };

      const interpolatePose = (progress: number): GavelPose => {
        if (!geometry) {
          return {
            x: 0,
            y: 0,
            rotation: restRotationDeg,
          };
        }

        return {
          x: lerp(geometry.rest.x, geometry.impact.x, progress),

          y: lerp(geometry.rest.y, geometry.impact.y, progress),

          rotation: lerp(geometry.rest.rotation, geometry.impact.rotation, progress),
        };
      };

      type CastShadowPhase = 'rest' | 'anticipation' | 'impact' | 'settle';

      const getCastShadowVars = (
        pose: GavelPose,
        phase: CastShadowPhase
      ): Record<string, string | number | boolean> => {
        const castShadowEffect = impactEffects.castShadow;
        const phaseEffect = castShadowEffect[phase];

        return {
          /*
           * x, y și rotația sunt preluate din aceeași poziție a gavel-ului.
           * Nu mai există o traiectorie separată care poate diverge.
           */
          x: pose.x,
          y: pose.y,
          rotation: pose.rotation + castShadowEffect.rotationOffsetDeg,

          /*
           * Offsetul vizual dintre assetul gavel și assetul umbrei
           * rămâne constant pe toată durata animației.
           */
          xPercent: castShadowEffect.xPercent,
          yPercent: castShadowEffect.yPercent,

          scaleX: phaseEffect.scaleX,
          scaleY: phaseEffect.scaleY,
          opacity: phaseEffect.opacity,

          transformOrigin: geometry?.transformOrigin ?? '18% 65%',
          force3D: QUICK_TUNING.performance.force3D,
        };
      };

      const positionDustAtContact = (): void => {
        if (!dust || !geometry) {
          return;
        }

        const dustEffect = impactEffects.dust;

        const offsetParent =
          dust.offsetParent instanceof HTMLElement ? dust.offsetParent : component;

        const componentRect = component.getBoundingClientRect();
        const parentRect = offsetParent.getBoundingClientRect();

        /*
         * geometry.targetContact este relativ la component.
         * Îl convertim în coordonate relative la offsetParent-ul prafului.
         */
        const left =
          componentRect.left -
          parentRect.left +
          geometry.targetContact.x +
          dustEffect.anchorOffsetXpx;

        const top =
          componentRect.top -
          parentRect.top +
          geometry.targetContact.y +
          dustEffect.anchorOffsetYpx;

        gsap.set(dust, {
          left,
          top,
          right: 'auto',
          bottom: 'auto',
        });
      };

      const setReactionDefaults = (): void => {
        const targetEffect = impactEffects.target;
        const dustEffect = impactEffects.dust;

        gsap.set(target, {
          x: 0,
          y: 0,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,

          transformOrigin: targetEffect.transformOrigin,
        });

        gsap.set(shadow, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,

          transformOrigin: shadowReaction.transformOrigin,
        });

        if (castShadow && geometry) {
          gsap.set(castShadow, getCastShadowVars(geometry.rest, 'rest'));
        }

        if (dust) {
          positionDustAtContact();

          gsap.set(dust, {
            xPercent: dustEffect.xPercent,
            yPercent: dustEffect.startYPercent,
            scale: dustEffect.startScale,
            opacity: dustEffect.startOpacity,
            visibility: 'hidden',

            transformOrigin: dustEffect.transformOrigin,
          });
        }
      };

      const killActiveTimeline = (): void => {
        activeTimeline?.kill();
        activeTimeline = null;
      };

      const ensureGeometry = (): boolean => {
        if (geometry) {
          return true;
        }

        geometry = calculateGeometry({
          component,
          gavel,
          target,
          geometryConfig,
          restRotationDeg,
        });

        if (!geometry) {
          return false;
        }

        renderDebug(component, gavel, target, geometry);
        positionDustAtContact();

        return true;
      };

      const completeTimeline = (timeline: any): void => {
        if (activeTimeline !== timeline) {
          return;
        }

        activeTimeline = null;
        setWillChange(false);
      };

      const animateToImpact = (skipAnticipation = false): void => {
        desiredState = 'impact';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        const currentProgress = getProgress();

        if (currentProgress >= 0.995 && !activeTimeline) {
          return;
        }

        killActiveTimeline();
        setWillChange(true);

        const timeline = gsap.timeline({
          paused: true,

          defaults: {
            overwrite: 'auto',
          },

          onComplete: () => {
            completeTimeline(timeline);
          },

          onInterrupt: () => {
            if (activeTimeline === timeline) {
              activeTimeline = null;
            }
          },
        });

        activeTimeline = timeline;

        const canAnticipate =
          !skipAnticipation && currentProgress <= motionConfig.anticipationMaxProgress;

        if (canAnticipate) {
          const availableProgress = 1 - currentProgress / motionConfig.anticipationMaxProgress;

          const anticipationDuration = Math.max(
            0.035,
            motionConfig.anticipationDurationSeconds * availableProgress
          );

          const anticipationPose: GavelPose = {
            x: geometry.rest.x + motionConfig.anticipationXpx,
            y: geometry.rest.y + motionConfig.anticipationYpx,
            rotation: geometry.rest.rotation + motionConfig.anticipationRotationDeltaDeg,
          };

          timeline.to(gavel, {
            ...anticipationPose,

            transformOrigin: geometry.transformOrigin,

            duration: duration(anticipationDuration),

            ease: motionConfig.anticipationEase,

            force3D: QUICK_TUNING.performance.force3D,
          });

          if (castShadow) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(anticipationPose, 'anticipation'),

                duration: duration(anticipationDuration),

                ease: motionConfig.anticipationEase,
              },
              '<'
            );
          }
        }

        const remainingDistance = clamp(1 - currentProgress, 0, 1);

        const strikeDuration = lerp(
          motionConfig.strikeMinDurationSeconds,

          motionConfig.strikeMaxDurationSeconds,

          remainingDistance
        );

        const overshootPose: GavelPose = {
          x: geometry.impact.x + motionConfig.overshootXpx,

          y: geometry.impact.y + motionConfig.overshootYpx,

          rotation: geometry.impact.rotation + motionConfig.overshootRotationDeltaDeg,
        };

        timeline.to(gavel, {
          ...overshootPose,

          transformOrigin: geometry.transformOrigin,

          duration: duration(strikeDuration),

          ease: motionConfig.strikeEase,

          force3D: QUICK_TUNING.performance.force3D,
        });

        if (castShadow) {
          timeline.to(
            castShadow,
            {
              ...getCastShadowVars(overshootPose, 'impact'),

              duration: duration(strikeDuration),

              ease: motionConfig.strikeEase,
            },
            '<'
          );
        }

        const contactTime = timeline.duration();

        timeline.to(
          gavel,
          {
            x: geometry.impact.x,
            y: geometry.impact.y,

            rotation: geometry.impact.rotation,

            transformOrigin: geometry.transformOrigin,

            duration: duration(motionConfig.settleDurationSeconds),

            ease: motionConfig.settleEase,

            force3D: QUICK_TUNING.performance.force3D,
          },
          contactTime
        );

        const targetEffect = impactEffects.target;
        const dustEffect = impactEffects.dust;

        /*
         * Target rigid impact:
         * down, micro-recoil, settle.
         */
        timeline.to(
          target,
          {
            x: targetEffect.compressionXpx,
            y: targetEffect.compressionYpx,
            rotation: targetEffect.compressionRotationDeg,
            scaleX: targetEffect.compressionScaleX,
            scaleY: targetEffect.compressionScaleY,

            transformOrigin: targetEffect.transformOrigin,

            duration: duration(targetEffect.compressionDurationSeconds),

            ease: targetEffect.compressionEase,
          },
          contactTime
        );

        timeline.to(
          target,
          {
            x: targetEffect.recoilXpx,
            y: targetEffect.recoilYpx,
            rotation: targetEffect.recoilRotationDeg,
            scaleX: targetEffect.recoilScaleX,
            scaleY: targetEffect.recoilScaleY,

            duration: duration(targetEffect.recoilDurationSeconds),

            ease: targetEffect.recoilEase,
          },
          contactTime + duration(targetEffect.compressionDurationSeconds)
        );

        timeline.to(
          target,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,

            duration: duration(targetEffect.settleDurationSeconds),

            ease: targetEffect.settleEase,
          },
          contactTime +
            duration(targetEffect.compressionDurationSeconds + targetEffect.recoilDurationSeconds)
        );

        /*
         * Existing wide shadow under the component.
         */
        timeline.to(
          shadow,
          {
            x: shadowReaction.translateXpx,
            y: shadowReaction.translateYpx,
            scaleX: shadowReaction.scaleX,
            scaleY: shadowReaction.scaleY,
            opacity: shadowReaction.opacity ?? 1,

            transformOrigin: shadowReaction.transformOrigin,

            duration: duration(shadowReaction.compressionDurationSeconds),

            ease: shadowReaction.compressionEase,
          },
          contactTime
        );

        timeline.to(
          shadow,
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,

            duration: duration(shadowReaction.recoveryDurationSeconds),

            ease: shadowReaction.recoveryEase,
          },
          contactTime + duration(shadowReaction.compressionDurationSeconds)
        );

        /*
         * Gavel cast shadow:
         * denser and tighter at contact, then settles while the gavel remains down.
         */
        if (castShadow) {
          timeline.to(
            castShadow,
            {
              ...getCastShadowVars(geometry.impact, 'settle'),

              duration: duration(motionConfig.settleDurationSeconds),

              ease: motionConfig.settleEase,
            },
            contactTime
          );
        }

        /*
         * Dust puff:
         * very short, low-opacity, no looping.
         */
        if (dust) {
          timeline.set(
            dust,
            {
              xPercent: dustEffect.xPercent,
              yPercent: dustEffect.startYPercent,
              scale: dustEffect.startScale,
              opacity: dustEffect.startOpacity,
              visibility: 'visible',
            },
            contactTime
          );

          timeline.to(
            dust,
            {
              yPercent: dustEffect.peakYPercent,
              scale: dustEffect.peakScale,
              opacity: dustEffect.peakOpacity,

              duration: duration(dustEffect.revealDurationSeconds),

              ease: dustEffect.revealEase,
            },
            contactTime
          );

          timeline.to(
            dust,
            {
              yPercent: dustEffect.endYPercent,
              scale: dustEffect.endScale,
              opacity: 0,

              duration: duration(dustEffect.fadeDurationSeconds),

              ease: dustEffect.fadeEase,
            },
            contactTime + duration(dustEffect.revealDurationSeconds)
          );

          timeline.set(
            dust,
            {
              visibility: 'hidden',
            },
            contactTime +
              duration(dustEffect.revealDurationSeconds + dustEffect.fadeDurationSeconds)
          );
        }

        timeline.play(0);
      };

      const animateToRest = (): void => {
        desiredState = 'rest';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        const currentProgress = getProgress();

        if (currentProgress <= 0.005 && !activeTimeline) {
          setReactionDefaults();
          return;
        }

        killActiveTimeline();
        setWillChange(true);

        const liftDuration = lerp(
          motionConfig.liftMinDurationSeconds,

          motionConfig.liftMaxDurationSeconds,

          currentProgress
        );

        const timeline = gsap.timeline({
          paused: true,

          defaults: {
            overwrite: 'auto',
          },

          onComplete: () => {
            completeTimeline(timeline);
          },

          onInterrupt: () => {
            if (activeTimeline === timeline) {
              activeTimeline = null;
            }
          },
        });

        activeTimeline = timeline;

        timeline.to(
          gavel,
          {
            x: geometry.rest.x,
            y: geometry.rest.y,

            rotation: geometry.rest.rotation,

            transformOrigin: geometry.transformOrigin,

            duration: duration(liftDuration),

            ease: motionConfig.liftEase,

            force3D: QUICK_TUNING.performance.force3D,
          },
          0
        );

        timeline.to(
          target,
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,

            duration: duration(0.13),

            ease: 'power2.out',
          },
          0
        );

        timeline.to(
          shadow,
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,

            duration: duration(0.16),

            ease: 'power2.out',
          },
          0
        );

        if (castShadow) {
          timeline.to(
            castShadow,
            {
              ...getCastShadowVars(geometry.rest, 'rest'),

              duration: duration(liftDuration),

              ease: motionConfig.liftEase,
            },
            0
          );
        }

        if (dust) {
          timeline.set(
            dust,
            {
              opacity: 0,
              visibility: 'hidden',
            },
            0
          );
        }

        timeline.play(0);
      };

      const setRest = (): void => {
        desiredState = 'rest';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        killActiveTimeline();
        setReactionDefaults();

        gsap.set(gavel, {
          x: geometry.rest.x,
          y: geometry.rest.y,

          rotation: geometry.rest.rotation,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        setWillChange(false);
      };

      const setImpact = (): void => {
        desiredState = 'impact';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        killActiveTimeline();
        setReactionDefaults();

        gsap.set(gavel, {
          x: geometry.impact.x,
          y: geometry.impact.y,

          rotation: geometry.impact.rotation,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        if (castShadow) {
          gsap.set(castShadow, getCastShadowVars(geometry.impact, 'settle'));
        }

        if (dust) {
          gsap.set(dust, {
            opacity: 0,
            visibility: 'hidden',
          });
        }

        setWillChange(false);
      };

      const refresh = (): void => {
        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(() => {
          const preservedProgress = getProgress();

          const preservedState = desiredState;

          killActiveTimeline();

          geometry = calculateGeometry({
            component,
            gavel,
            target,
            geometryConfig,
            restRotationDeg,
          });

          if (!geometry) {
            return;
          }

          const preservedPose = interpolatePose(preservedProgress);

          gsap.set(gavel, {
            x: preservedPose.x,
            y: preservedPose.y,

            rotation: preservedPose.rotation,

            transformOrigin: geometry.transformOrigin,

            force3D: QUICK_TUNING.performance.force3D,
          });

          setReactionDefaults();

          renderDebug(component, gavel, target, geometry);

          if (preservedState === 'impact' && preservedProgress < 0.995) {
            animateToImpact(true);
          } else if (preservedState === 'rest' && preservedProgress > 0.005) {
            animateToRest();
          } else {
            setWillChange(false);
          }
        });
      };

      const kill = (): void => {
        cancelAnimationFrame(resizeFrame);

        killActiveTimeline();

        removeDebug(component, gavel, target);

        setWillChange(false);

        gsap.set([gavel, castShadow, dust, target, shadow].filter(Boolean), {
          clearProps: 'transform,transformOrigin,willChange,opacity,visibility',
        });
      };

      geometry = calculateGeometry({
        component,
        gavel,
        target,
        geometryConfig,
        restRotationDeg,
      });

      if (geometry) {
        setReactionDefaults();

        gsap.set(gavel, {
          x: geometry.rest.x,
          y: geometry.rest.y,

          rotation: geometry.rest.rotation,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        renderDebug(component, gavel, target, geometry);
      }

      return {
        moveToImpact: () => {
          animateToImpact(false);
        },

        moveToRest: animateToRest,

        setRest,
        setImpact,

        refresh,

        geometry: () => geometry,

        progress: getProgress,

        desiredState: () => desiredState,

        kill,
      };
    };

    const inputState = runtimeWindow.__tsaGavelInputState || {
      keyboard: false,
      initialized: false,
    };

    runtimeWindow.__tsaGavelInputState = inputState;

    if (!inputState.initialized) {
      inputState.initialized = true;

      document.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Tab') {
            inputState.keyboard = true;
          }
        },
        true
      );

      document.addEventListener(
        'pointerdown',
        () => {
          inputState.keyboard = false;
        },
        true
      );
    }

    const registerInstance = (instance: GavelInstance): void => {
      instances.push(instance);
    };

    const removeInstance = (instance: GavelInstance): void => {
      const index = instances.indexOf(instance);

      if (index >= 0) {
        instances.splice(index, 1);
      }
    };

    const initializeScope = (scope: GavelScopeElement): void => {
      scope.__tsaGavelCleanup?.();

      const trigger = scope.querySelector<HTMLElement>(SELECTORS.trigger);

      const component = scope.querySelector<HTMLElement>(SELECTORS.component);

      const gavel = component?.querySelector<HTMLElement>(SELECTORS.gavel);

      const castShadow = component?.querySelector<HTMLElement>(SELECTORS.castShadow) ?? null;

      const dust = component?.querySelector<HTMLElement>(SELECTORS.dust) ?? null;

      const target = component?.querySelector<HTMLElement>(SELECTORS.target);

      const shadow = component?.querySelector<HTMLElement>(SELECTORS.shadow);

      if (!trigger || !component || !gavel || !target || !shadow) {
        console.warn('[TSA Gavel] Lipsesc elemente necesare.', {
          scope,
          trigger,
          component,
          gavel,
          target,
          shadow,
        });

        return;
      }

      const preset = getActivePreset();
      const impactEffects = preset.impactEffects ?? QUICK_TUNING.impactEffects;

      const media = gsap.matchMedia();

      const localCleanup: Array<() => void> = [];

      media.add(DESKTOP_QUERY, () => {
        const deviceProfile = preset.desktop;

        const controller = createController({
          component,
          gavel,
          castShadow,
          dust,
          target,
          shadow,

          geometryConfig: getGeometryConfig('desktop', deviceProfile),

          deviceProfile,

          targetReaction: preset.targetReaction,

          shadowReaction: preset.shadowReaction,
          impactEffects,
        });

        const instance: GavelInstance = {
          scope,
          mode: 'desktop',
          controller,
        };

        registerInstance(instance);

        let pointerInside = false;
        let keyboardFocus = false;

        const syncDesiredState = (): void => {
          if (pointerInside || keyboardFocus) {
            controller.moveToImpact();
          } else {
            controller.moveToRest();
          }
        };

        const handlePointerEnter = (): void => {
          pointerInside = true;
          syncDesiredState();
        };

        const handlePointerLeave = (): void => {
          pointerInside = false;
          syncDesiredState();
        };

        const handleFocusIn = (): void => {
          keyboardFocus = inputState.keyboard;

          syncDesiredState();
        };

        const handleFocusOut = (): void => {
          queueMicrotask(() => {
            const { activeElement } = document;

            keyboardFocus = Boolean(activeElement && trigger.contains(activeElement));

            syncDesiredState();
          });
        };

        trigger.addEventListener('pointerenter', handlePointerEnter);

        trigger.addEventListener('pointerleave', handlePointerLeave);

        trigger.addEventListener('focusin', handleFocusIn);

        trigger.addEventListener('focusout', handleFocusOut);

        const resizeObserver =
          typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => {
                controller.refresh();
              })
            : null;

        resizeObserver?.observe(component);

        return () => {
          trigger.removeEventListener('pointerenter', handlePointerEnter);

          trigger.removeEventListener('pointerleave', handlePointerLeave);

          trigger.removeEventListener('focusin', handleFocusIn);

          trigger.removeEventListener('focusout', handleFocusOut);

          resizeObserver?.disconnect();

          controller.kill();
          removeInstance(instance);
        };
      });

      media.add(MOBILE_QUERY, () => {
        const deviceProfile = preset.mobile;

        const controller = createController({
          component,
          gavel,
          castShadow,
          dust,
          target,
          shadow,

          geometryConfig: getGeometryConfig('mobile', deviceProfile),

          deviceProfile,

          targetReaction: preset.targetReaction,

          shadowReaction: preset.shadowReaction,
          impactEffects,
        });

        const instance: GavelInstance = {
          scope,
          mode: 'mobile',
          controller,
        };

        registerInstance(instance);

        let initialStateApplied = false;

        const scrollTrigger = ScrollTrigger.create({
          trigger: component,

          start: QUICK_TUNING.interaction.mobileStart,

          end: 'bottom top',

          invalidateOnRefresh: true,

          onEnter: () => {
            controller.moveToImpact();
          },

          onLeaveBack: () => {
            controller.moveToRest();
          },

          onRefresh: (self: any) => {
            if (initialStateApplied) {
              return;
            }

            initialStateApplied = true;

            if (self.scroll() >= self.start) {
              controller.setImpact();
            } else {
              controller.setRest();
            }
          },
        });

        const resizeObserver =
          typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => {
                controller.refresh();
              })
            : null;

        resizeObserver?.observe(component);

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        return () => {
          scrollTrigger.kill();
          resizeObserver?.disconnect();

          controller.kill();
          removeInstance(instance);
        };
      });

      media.add(REDUCED_MOTION_QUERY, () => {
        removeDebug(component, gavel, target);

        gsap.set([gavel, target, shadow], {
          clearProps: 'transform,transformOrigin,willChange,opacity',
        });
      });

      [gavel, castShadow, dust, target, shadow]
        .filter((element): element is HTMLElement => Boolean(element))
        .forEach((element) => {
          if (!(element instanceof HTMLImageElement)) {
            return;
          }

          if (element.complete && element.naturalWidth > 0) {
            return;
          }

          const refresh = (): void => {
            instances
              .filter((instance) => instance.scope === scope)
              .forEach((instance) => {
                instance.controller.refresh();
              });

            ScrollTrigger.refresh();
          };

          element.addEventListener('load', refresh, { once: true });

          element.addEventListener('error', refresh, { once: true });

          localCleanup.push(() => {
            element.removeEventListener('load', refresh);

            element.removeEventListener('error', refresh);
          });
        });

      scope.dataset.gavelReady = `${QUICK_TUNING.version}:${activePresetName}`;

      const cleanup = (): void => {
        media.revert();

        localCleanup.forEach((callback) => {
          callback();
        });

        delete scope.dataset.gavelReady;
        delete scope.__tsaGavelCleanup;
      };

      scope.__tsaGavelCleanup = cleanup;

      globalCleanup.push(cleanup);
    };

    const destroyAll = (): void => {
      globalCleanup.splice(0).forEach((cleanup) => {
        cleanup();
      });

      instances.splice(0).forEach((instance) => {
        instance.controller.kill();
      });
    };

    const initializeAll = (): void => {
      document.querySelectorAll<GavelScopeElement>(SELECTORS.scope).forEach(initializeScope);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    /*
     * Curăță o versiune anterioară a scriptului
     * înainte să inițializeze noua versiune.
     */
    runtimeWindow.TSAGavel?.destroyAll?.();

    runtimeWindow.TSAGavel = {
      play: (index = 0) => {
        instances[index]?.controller.moveToImpact();
      },

      lift: (index = 0) => {
        instances[index]?.controller.moveToRest();
      },

      rest: (index = 0) => {
        instances[index]?.controller.setRest();
      },

      impact: (index = 0) => {
        instances[index]?.controller.setImpact();
      },

      refresh: (index = 0) => {
        instances[index]?.controller.refresh();
      },

      refreshAll: () => {
        instances.forEach((instance) => {
          instance.controller.refresh();
        });

        ScrollTrigger.refresh();
      },

      geometry: (index = 0) => {
        const geometry = instances[index]?.controller.geometry() || null;

        console.log(`[TSA Gavel] Geometry, preset ${activePresetName}`, geometry);

        return geometry;
      },

      progress: (index = 0) => {
        return instances[index]?.controller.progress() || 0;
      },

      usePreset: (presetName: GavelPresetName): boolean => {
        if (!Object.prototype.hasOwnProperty.call(QUICK_TUNING.presets, presetName)) {
          console.warn('[TSA Gavel] Preset invalid.', presetName);

          console.info('[TSA Gavel] Preseturi disponibile:', Object.keys(QUICK_TUNING.presets));

          return false;
        }

        if (activePresetName === presetName) {
          console.info(`[TSA Gavel] Presetul ${presetName} este deja activ.`);

          return true;
        }

        destroyAll();

        activePresetName = presetName;

        initializeAll();

        console.info(
          `[TSA Gavel] Preset activ: ${presetName}, ` + QUICK_TUNING.presets[presetName].label
        );

        return true;
      },

      currentPreset: () => {
        console.info(`[TSA Gavel] Preset activ: ${activePresetName}, ` + getActivePreset().label);

        return activePresetName;
      },

      listPresets: () => {
        const names = Object.keys(QUICK_TUNING.presets) as GavelPresetName[];

        console.table(
          names.map((name) => ({
            preset: name,
            label: QUICK_TUNING.presets[name].label,
          }))
        );

        return names;
      },

      destroyAll,
    };

    initializeAll();
  });
}
