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
type GavelPresetName = 'C' | 'F' | 'G' | 'H' | 'I';
type GavelMobilePlaybackMode = 'timed' | 'scrub';
type GavelReplayMode = 'once' | 'once-per-entry' | 'on-enter-and-enter-back' | 'manual';
type GavelMobileInitialState = 'rest' | 'impact';
type GavelMobileFinalState = 'hold-impact' | 'auto-return' | 'return-on-leave';
type GavelMobileResetPosition = 'above' | 'below' | 'either';
type GavelMobileEntryDirection = 'above' | 'below';
type GavelMobileEntryState =
  | 'uninitialized'
  | 'ready'
  | 'waiting'
  | 'playing'
  | 'scrubbing'
  | 'holding'
  | 'returning'
  | 'completed'
  | 'outside'
  | 'destroyed';
type GavelAnimationPhase =
  | 'rest'
  | 'anticipation'
  | 'strike'
  | 'contact'
  | 'follow-through'
  | 'rebound'
  | 'rebound-settle'
  | 'rebound-hold'
  | 'settle'
  | 'impact-hold'
  | 'lift'
  | 'killed';

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

  visualScale: number;

  impactRotationDeg: number;

  impactFineTuneXpx: number;
  impactFineTuneYpx: number;

  restFineTuneXpx: number;
  restFineTuneYpx: number;
};

type GavelMobileViewportConfig = {
  enabled: boolean;

  playback: GavelMobilePlaybackMode;

  start: string;
  end: string;

  scrubSmoothingSeconds: number;
  scrubImpactThreshold: number;
  scrubResetThreshold: number;

  entryDelaySeconds: number;

  replayMode: GavelReplayMode;

  initialState: GavelMobileInitialState;
  finalState: GavelMobileFinalState;

  holdAtImpactSeconds: number;
  autoReturnDelaySeconds: number;

  resetWhenFullyOutside: boolean;
  resetPosition: GavelMobileResetPosition;

  resetDelaySeconds: number;
  resetDurationSeconds: number;
  resetEase: string;

  playOnInitialLoadIfVisible: boolean;
  playOnEnter: boolean;
  playOnEnterBack: boolean;

  finishCurrentAnimationOnLeave: boolean;
  reverseOnLeave: boolean;

  minimumReplayIntervalSeconds: number;

  refreshSilently: boolean;
  preventRefreshPlayback: boolean;

  markers: boolean;
};

type GavelMotionConfig = {
  anticipationEnabled?: boolean;
  anticipationDurationSeconds: number;
  anticipationRotationDeltaDeg: number;
  anticipationXpx: number;
  anticipationYpx: number;
  anticipationEase: string;
  anticipationMaxProgress: number;

  strikeDurationSeconds?: number;
  strikeMinDurationSeconds: number;
  strikeMaxDurationSeconds: number;
  strikeEase: string;

  followThroughEnabled?: boolean;
  followThroughDurationSeconds?: number;
  overshootRotationDeltaDeg: number;
  overshootXpx: number;
  overshootYpx: number;

  /*
   * Optional post-contact rebound.
   *
   * The peak pose is relative to the exact impact pose. The settle pose
   * is also relative to impact, which makes both desktop and mobile easy
   * to tune without changing the contact geometry.
   */
  reboundEnabled?: boolean;
  reboundDurationSeconds?: number;
  reboundRotationDeltaDeg?: number;
  reboundXpx?: number;
  reboundYpx?: number;
  reboundEase?: string;

  reboundSettleEnabled?: boolean;
  reboundSettleDurationSeconds?: number;
  reboundSettleRotationDeltaDeg?: number;
  reboundSettleXpx?: number;
  reboundSettleYpx?: number;
  reboundSettleEase?: string;

  settleEnabled?: boolean;
  settleDurationSeconds: number;
  settleEase: string;

  liftDurationSeconds?: number;
  liftMinDurationSeconds: number;
  liftMaxDurationSeconds: number;
  liftEase: string;
};

type GavelReactionConfig = {
  enabled?: boolean;
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

  /*
   * Visual scale applied to both the gavel and its cast shadow.
   * 1 = original size
   * 1.08 = 8% larger
   */
  visualScale?: number;

  restRotationDeg: number;
  impactRotationDeg: number;

  impactFineTuneXpx: number;
  impactFineTuneYpx: number;

  restFineTuneXpx: number;
  restFineTuneYpx: number;

  motion: GavelMotionConfig;
};

type GavelTargetImpactEffectConfig = {
  enabled?: boolean;

  compressionXpx: number;
  compressionYpx: number;
  compressionRotationDeg: number;
  compressionScaleX: number;
  compressionScaleY: number;
  compressionDurationSeconds: number;
  compressionEase: string;

  recoilEnabled?: boolean;

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

type GavelDeviceTargetImpactEffectConfig = Record<GavelMode, GavelTargetImpactEffectConfig>;

type GavelTargetImpactEffectPresetConfig =
  | GavelTargetImpactEffectConfig
  | GavelDeviceTargetImpactEffectConfig;

type GavelCastShadowPhaseConfig = {
  scaleX: number;
  scaleY: number;
  opacity: number;
};

type GavelCastShadowEffectConfig = {
  enabled?: boolean;

  xPercent: number;
  yPercent: number;
  rotationOffsetDeg: number;

  filterEnabled?: boolean;
  cssFilter?: string;
  mixBlendMode?: string;

  rest: GavelCastShadowPhaseConfig;
  anticipation: GavelCastShadowPhaseConfig;
  impact: GavelCastShadowPhaseConfig;
  rebound?: GavelCastShadowPhaseConfig;
  settle: GavelCastShadowPhaseConfig;
};

type GavelDustEffectConfig = {
  enabled?: boolean;

  anchorOffsetXpx: number;
  anchorOffsetYpx: number;

  xPercent: number;

  startOpacity: number;
  peakOpacity: number;
  endOpacity?: number;

  startScale: number;
  peakScale: number;
  endScale: number;

  startScaleX?: number;
  startScaleY?: number;
  peakScaleX?: number;
  peakScaleY?: number;
  endScaleX?: number;
  endScaleY?: number;

  startYPercent: number;
  peakYPercent: number;
  endYPercent: number;

  startRotationDeg?: number;
  peakRotationDeg?: number;
  endRotationDeg?: number;

  revealDurationSeconds: number;
  fadeDurationSeconds: number;

  revealEase: string;
  fadeEase: string;

  cssFilter?: string;
  mixBlendMode?: string;

  transformOrigin: string;
};

type GavelContactShadowEffectConfig = {
  enabled?: boolean;

  anchorOffsetXpx: number;
  anchorOffsetYpx: number;

  widthRem?: number;
  heightRem?: number;

  cssFilter?: string;
  mixBlendMode?: string;

  initialOpacity?: number;
  initialScaleX?: number;
  initialScaleY?: number;

  preContactLeadSeconds: number;
  preContactOpacity: number;
  preContactScaleX: number;
  preContactScaleY: number;

  impactOpacity?: number;
  impactScaleX?: number;
  impactScaleY?: number;

  contactOpacity: number;
  contactScaleX: number;
  contactScaleY: number;
  contactDurationSeconds: number;
  contactEase: string;

  recoilOpacity: number;
  recoilScaleX: number;
  recoilScaleY: number;
  recoilDurationSeconds: number;
  recoilEase: string;

  fadeOpacity: number;
  fadeScaleX: number;
  fadeScaleY: number;
  fadeDurationSeconds: number;
  fadeEase: string;

  endOpacity?: number;
  endScaleX?: number;
  endScaleY?: number;

  transformOrigin?: string;
};

type GavelResonanceEffectConfig = {
  enabled: boolean;

  anchorOffsetXpx: number;
  anchorOffsetYpx: number;

  widthRem?: number;
  heightRem?: number;

  startOpacity: number;
  peakOpacity?: number;
  endOpacity: number;

  startScaleX: number;
  startScaleY: number;

  peakScaleX?: number;
  peakScaleY?: number;

  endScaleX: number;
  endScaleY: number;

  durationSeconds: number;
  revealDurationSeconds?: number;
  fadeDurationSeconds?: number;
  revealEase?: string;
  fadeEase?: string;
  ease: string;

  borderColor?: string;
  borderWidthPx?: number;
  boxShadow?: string;
  transformOrigin?: string;
};

type GavelImpactEffectsConfig = {
  target: GavelTargetImpactEffectPresetConfig;
  broadShadow: GavelReactionConfig;
  castShadow: GavelCastShadowEffectConfig;
  dust: GavelDustEffectConfig;
  contactShadow: GavelContactShadowEffectConfig;
  resonance: GavelResonanceEffectConfig;
};

type GavelPreset = {
  label: string;
  description?: string;

  desktop?: DeepPartial<GavelDeviceProfile>;
  mobile?: DeepPartial<GavelDeviceProfile>;

  mobileViewport?: DeepPartial<GavelMobileViewportConfig>;

  targetReaction?: GavelReactionConfig;
  shadowReaction?: GavelReactionConfig;
  impactEffects?: DeepPartial<GavelImpactEffectsConfig>;
};

type GavelResolvedPreset = {
  label: string;
  description: string;
  desktop: GavelDeviceProfile;
  mobile: GavelDeviceProfile;
  mobileViewport: GavelMobileViewportConfig;
  impactEffects: GavelImpactEffectsConfig;
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

type GavelDebugEffectAnchors = {
  contactShadow?: GavelPoint | null;
  dust?: GavelPoint | null;
  resonance?: GavelPoint | null;
  mobileImpactState?: string;
};

type GavelPlayOptions = {
  force?: boolean;
  skipAnticipation?: boolean;
  manual?: boolean;
};

type GavelRestOptions = {
  silent?: boolean;
};

type GavelResetOptions = {
  initialState?: GavelMobileInitialState;
  resetMobileReplay?: boolean;
};

type GavelStateSnapshot = {
  mode: GavelMode;
  desiredState: GavelDesiredState;
  progress: number;
  mobileStatus: GavelMobileEntryState | null;
  hasPlayed: boolean | null;
  isInside: boolean | null;
  activePreset: GavelPresetName;
};

type GavelController = {
  moveToImpact: (options?: GavelPlayOptions) => void;
  moveToRest: (options?: GavelRestOptions) => void;

  playImpactSequence: (options?: GavelPlayOptions) => void;
  playImpactReaction: () => void;
  resetImpactReaction: () => void;
  scrubToProgress: (progress: number) => void;
  replay: (options?: GavelPlayOptions) => void;
  reset: (options?: GavelResetOptions) => void;

  setRest: () => void;
  setImpact: () => void;

  refresh: () => void;
  refreshNow: () => void;
  scheduleRefresh: () => void;

  geometry: () => GavelGeometry | null;
  progress: () => number;
  desiredState: () => GavelDesiredState;
  isAnimating: () => boolean;
  activePhase: () => GavelAnimationPhase;
  state: () => GavelStateSnapshot;
  setMobileStateReader: (
    reader: (() => Pick<GavelStateSnapshot, 'mobileStatus' | 'hasPlayed' | 'isInside'>) | null
  ) => void;

  kill: () => void;
};

type GavelInstance = {
  scope: HTMLElement;
  mode: GavelMode;
  controller: GavelController;
};

type GavelGeneratedEffect = {
  element: HTMLElement;
  createdByScript: boolean;
};

type GavelMobileRuntimeState = {
  status: GavelMobileEntryState;

  hasPlayed: boolean;
  isInside: boolean;
  enteredFrom: GavelMobileEntryDirection | null;

  lastPlayTimestamp: number;

  entryDelayTimer: number | null;
  returnTimer: number | null;
  resetTimer: number | null;

  isRefreshing: boolean;
  isDestroyed: boolean;
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<unknown>
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

type GavelPresetDefinition = {
  label: string;
  description: string;
  overrides: DeepPartial<GavelResolvedPreset>;
};

type GavelScopeElement = HTMLElement & {
  __tsaGavelCleanup?: () => void;
};

type TsaGavelGsapVars = Record<string, unknown>;

type TsaGavelGsapTimeline = {
  to: (target: unknown, vars: TsaGavelGsapVars, position?: number | string) => TsaGavelGsapTimeline;
  set: (
    target: unknown,
    vars: TsaGavelGsapVars,
    position?: number | string
  ) => TsaGavelGsapTimeline;
  call: (
    callback: () => void,
    params?: unknown[] | null,
    position?: number | string
  ) => TsaGavelGsapTimeline;
  play: (from?: number) => TsaGavelGsapTimeline;
  kill: () => void;
  duration: () => number;
};

type TsaGavelGsapTween = {
  kill: () => void;
};

type TsaGavelGsapMatchMedia = {
  add: (query: string, callback: () => void | (() => void)) => void;
  revert: () => void;
};

type TsaGavelGsapRuntime = {
  registerPlugin: (plugin: unknown) => void;
  matchMedia: () => TsaGavelGsapMatchMedia;
  timeline: (vars?: TsaGavelGsapVars) => TsaGavelGsapTimeline;
  to: (target: unknown, vars: TsaGavelGsapVars) => TsaGavelGsapTween;
  set: (target: unknown, vars: TsaGavelGsapVars) => void;
  getProperty: (target: HTMLElement, property: string) => number | string;
  parseEase?: (easeName: string) => ((progress: number) => number) | undefined;
};

type GavelScrollTriggerSelf = {
  progress: number;
  isActive?: boolean;
};

type GavelScrollTriggerInstance = {
  kill: () => void;
};

type GavelScrollTrigger = {
  create: (vars: TsaGavelGsapVars) => GavelScrollTriggerInstance;
  refresh: () => void;
};

type GavelRuntimeWindow = Omit<Window, 'gsap' | 'ScrollTrigger'> & {
  Webflow?: Array<() => void>;

  gsap?: TsaGavelGsapRuntime;
  ScrollTrigger?: GavelScrollTrigger;

  TSA_GAVEL_CONFIG?: unknown;

  TSAGavel?: {
    play: (index?: number) => void;
    lift: (index?: number) => void;
    rest: (index?: number) => void;
    impact: (index?: number) => void;
    replay: (index?: number) => void;
    reset: (index?: number) => void;

    refresh: (index?: number) => void;
    refreshAll: () => void;

    geometry: (index?: number) => GavelGeometry | null;
    progress: (index?: number) => number;
    desiredState: (index?: number) => GavelDesiredState | null;
    state: (index?: number) => GavelStateSnapshot | null;

    usePreset: (preset: GavelPresetName) => boolean;
    previewPreset: (preset: GavelPresetName, index?: number) => boolean;
    currentPreset: () => GavelPresetName;
    listPresets: () => GavelPresetName[];
    describePreset: (preset: GavelPresetName) => GavelPresetDefinition | null;
    config: () => typeof QUICK_TUNING;

    destroyAll: () => void;
  };

  __tsaGavelInputState?: {
    keyboard: boolean;
    initialized: boolean;
  };
};

/* ==========================================================================
   QUICK TUNING AREA

   1. Schimbă activePreset între C, F, G, H și I.
   2. Toate valorile vizuale importante sunt în această zonă.
   3. Poți testa profilurile live și din consolă:
      TSAGavel.usePreset('C')
      TSAGavel.usePreset('F')
      TSAGavel.usePreset('G')
      TSAGavel.usePreset('H')
      TSAGavel.usePreset('I')
   ========================================================================== */

const QUICK_TUNING = {
  version: '14.1.0',

  /*
   * Varianta încărcată implicit după publicare.
   *
   * C = Ceremonial slam
   * F = Balanced controlled rebound
   * G = Restrained controlled rebound
   * H = Decisive controlled rebound
   * I = Weighted controlled rebound
   */
  activePreset: 'G' as GavelPresetName,

  interaction: {
    desktopMinWidthPx: 992,

    mobileViewport: {
      enabled: true,

      playback: 'timed' as GavelMobilePlaybackMode,

      start: 'top 82%',
      end: 'bottom 18%',

      scrubSmoothingSeconds: 0.24,
      scrubImpactThreshold: 0.92,
      scrubResetThreshold: 0.62,

      entryDelaySeconds: 0.08,

      replayMode: 'once-per-entry' as GavelReplayMode,

      initialState: 'rest' as GavelMobileInitialState,

      /*
       * The gavel returns automatically, making the next playback
       * visually reliable even before the section is entered again.
       */
      finalState: 'auto-return' as GavelMobileFinalState,

      /*
       * Hold after impact before beginning the return.
       */
      holdAtImpactSeconds: 0.4,
      autoReturnDelaySeconds: 0,

      /*
       * Reset and rearm whenever the component fully leaves
       * through either side of the active ScrollTrigger range.
       */
      resetWhenFullyOutside: true,
      resetPosition: 'either' as GavelMobileResetPosition,

      resetDelaySeconds: 0,
      resetDurationSeconds: 0.2,
      resetEase: 'power3.out',

      playOnInitialLoadIfVisible: true,

      /*
       * Play when scrolling down into the section.
       */
      playOnEnter: true,

      /*
       * Also play when scrolling upward into the section.
       */
      playOnEnterBack: true,

      finishCurrentAnimationOnLeave: true,
      reverseOnLeave: false,

      /*
       * Prevent rapid viewport oscillations from replaying it immediately.
       */
      minimumReplayIntervalSeconds: 0.8,

      refreshSilently: true,
      preventRefreshPlayback: true,

      markers: false,
    } satisfies GavelMobileViewportConfig,
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
    mobileTargetContactXPercent: 50,

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
    showDustAnchor: true,
    showContactShadowAnchor: true,
    showResonanceAnchor: true,
    showViewportTrigger: false,
    showMobileState: true,
    logGeometry: true,
    logStateChanges: false,
    logTimelineEvents: false,
    logPresetChanges: false,
    markers: false,
  },

  performance: {
    force3D: false,
    temporaryWillChange: true,
    clearPropsAfterRest: false,
    clearPropsAfterImpact: false,
    overwriteMode: 'auto' as 'auto' | boolean,

    refreshOnResize: true,
    refreshOnImageLoad: true,
    refreshOnFontReady: true,

    useResizeObserver: true,
    useVisibilityPause: true,

    skipEffectsWhenDocumentHidden: true,
  },

  reducedMotion: {
    mode: 'rest' as 'rest' | 'impact' | 'instant-impact' | 'disabled',

    hideDust: true,
    hideResonance: true,
    hideContactShadow: true,

    disableTargetReaction: true,
    disableShadowReaction: true,

    preserveFocusFeedback: true,
  },

  /*
   * Efectele suplimentare disponibile cu structura actuală:
   * target întreg, cast shadow separat și dust separat.
   *
   * Toate valorile care merită calibrate sunt aici.
   */
  impactEffects: {
    target: {
      desktop: {
        enabled: true,

        compressionXpx: 0.08,
        compressionYpx: 0.85,
        compressionRotationDeg: 0.018,
        compressionScaleX: 1.0008,
        compressionScaleY: 0.9975,
        compressionDurationSeconds: 0.042,
        compressionEase: 'power3.out',

        recoilEnabled: true,

        recoilXpx: -0.04,
        recoilYpx: -0.1,
        recoilRotationDeg: -0.008,
        recoilScaleX: 1,
        recoilScaleY: 1.0002,
        recoilDurationSeconds: 0.034,
        recoilEase: 'power2.out',

        settleDurationSeconds: 0.095,
        settleEase: 'power3.out',
        transformOrigin: 'bottom center',
      },

      mobile: {
        enabled: true,

        compressionXpx: 0.1,
        compressionYpx: 1.05,
        compressionRotationDeg: 0.025,
        compressionScaleX: 1.0012,
        compressionScaleY: 0.9965,
        compressionDurationSeconds: 0.045,
        compressionEase: 'power3.out',

        recoilEnabled: true,

        recoilXpx: -0.05,
        recoilYpx: -0.12,
        recoilRotationDeg: -0.01,
        recoilScaleX: 1,
        recoilScaleY: 1.0003,
        recoilDurationSeconds: 0.038,
        recoilEase: 'power2.out',

        settleDurationSeconds: 0.1,
        settleEase: 'power3.out',
        transformOrigin: 'bottom center',
      },
    },

    broadShadow: {
      enabled: true,

      translateXpx: 0,
      translateYpx: 0.9,

      scaleX: 1.06,
      scaleY: 0.92,

      opacity: 0.9,

      compressionDurationSeconds: 0.055,
      compressionEase: 'power3.out',

      recoveryDurationSeconds: 0.15,
      recoveryEase: 'power3.out',

      transformOrigin: 'center center',
    },

    castShadow: {
      enabled: true,

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

      filterEnabled: true,
      cssFilter: 'brightness(0) saturate(0) blur(3px)',
      mixBlendMode: 'multiply',

      /*
       * Nu scalăm shadow-ul între faze. Schimbarea scalei făcea
       * conturul să alunece și să pară că plutește departe la impact.
       * Doar opacitatea se modifică foarte discret.
       */
      rest: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.07,
      },

      anticipation: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.045,
      },

      impact: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.12,
      },

      rebound: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.055,
      },

      settle: {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.085,
      },
    },

    dust: {
      enabled: true,

      /*
       * Poziția este calculată dinamic din punctul real de contact.
       * Valorile pozitive pe Y mută praful mai jos.
       * Valorile negative pe X îl mută spre stânga.
       */
      anchorOffsetXpx: 0,
      anchorOffsetYpx: 0,

      xPercent: -50,

      startOpacity: 0,
      peakOpacity: 0.09,
      endOpacity: 0,

      startScale: 0.76,
      peakScale: 0.92,
      endScale: 1.06,

      startScaleX: 0.76,
      startScaleY: 0.76,
      peakScaleX: 0.92,
      peakScaleY: 0.92,
      endScaleX: 1.06,
      endScaleY: 1.06,

      startYPercent: -42,
      peakYPercent: -52,
      endYPercent: -66,

      startRotationDeg: 0,
      peakRotationDeg: 0,
      endRotationDeg: 0,

      revealDurationSeconds: 0.04,
      fadeDurationSeconds: 0.15,

      revealEase: 'power2.out',
      fadeEase: 'power2.out',

      cssFilter: 'brightness(0) saturate(0)',
      mixBlendMode: 'multiply',

      transformOrigin: 'center bottom',
    },

    contactShadow: {
      enabled: true,

      anchorOffsetXpx: 0,
      anchorOffsetYpx: 0,

      widthRem: 4.25,
      heightRem: 0.65,

      cssFilter: 'blur(2px)',
      mixBlendMode: 'multiply',

      initialOpacity: 0,
      initialScaleX: 0.78,
      initialScaleY: 0.7,

      preContactLeadSeconds: 0.05,
      preContactOpacity: 0.05,
      preContactScaleX: 0.82,
      preContactScaleY: 0.72,

      impactOpacity: 0.16,
      impactScaleX: 1,
      impactScaleY: 0.55,

      contactOpacity: 0.16,
      contactScaleX: 1,
      contactScaleY: 0.55,
      contactDurationSeconds: 0.035,
      contactEase: 'power2.out',

      recoilOpacity: 0.1,
      recoilScaleX: 1.06,
      recoilScaleY: 0.65,
      recoilDurationSeconds: 0.045,
      recoilEase: 'power2.out',

      fadeOpacity: 0,
      fadeScaleX: 0.94,
      fadeScaleY: 0.72,
      fadeDurationSeconds: 0.12,
      fadeEase: 'power3.out',

      endOpacity: 0,
      endScaleX: 0.94,
      endScaleY: 0.72,

      transformOrigin: 'center center',
    },

    resonance: {
      enabled: true,

      anchorOffsetXpx: 0,
      anchorOffsetYpx: 0,

      widthRem: 5.75,
      heightRem: 1.35,

      startOpacity: 0.065,
      peakOpacity: 0.065,
      endOpacity: 0,

      startScaleX: 0.72,
      startScaleY: 0.82,

      peakScaleX: 0.9,
      peakScaleY: 0.9,

      endScaleX: 1.18,
      endScaleY: 1,

      durationSeconds: 0.12,
      revealDurationSeconds: 0.04,
      fadeDurationSeconds: 0.08,
      revealEase: 'power2.out',
      fadeEase: 'power2.out',
      ease: 'power2.out',

      borderColor: 'rgb(70 70 70 / 14%)',
      borderWidthPx: 1,
      boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 22%)',
      transformOrigin: 'center center',
    },
  } satisfies GavelImpactEffectsConfig,

  presets: {
    C: {
      label: 'Ceremonial slam',
      description:
        'Largest time-based gesture: a deliberate wind-up, a heavier landing, and the most visible dust and resonance.',

      mobileViewport: {
        playback: 'timed',

        start: 'top 82%',
        end: 'bottom 18%',

        /*
         * Play once each time the component genuinely leaves
         * and later enters the trigger area again.
         */
        replayMode: 'once-per-entry',

        initialState: 'rest',
        finalState: 'auto-return',

        entryDelaySeconds: 0.04,

        /*
         * Stay briefly on the target, then lift automatically.
         *
         * The controller adds these two values together before returning.
         */
        holdAtImpactSeconds: 0.1,
        autoReturnDelaySeconds: 0,

        /*
         * Rearm only after the component leaves the active area.
         */
        resetWhenFullyOutside: true,
        resetPosition: 'either',

        resetDelaySeconds: 0,
        resetDurationSeconds: 0.2,
        resetEase: 'power3.out',

        playOnInitialLoadIfVisible: true,

        /*
         * Downward entry.
         */
        playOnEnter: true,

        /*
         * Upward re-entry.
         */
        playOnEnterBack: true,

        finishCurrentAnimationOnLeave: true,
        reverseOnLeave: false,

        minimumReplayIntervalSeconds: 0.8,

        refreshSilently: true,
        preventRefreshPlayback: true,

        markers: false,
      },

      /*
       * Production TSA preset:
       * restrained anticipation, accelerating approach, exact contact,
       * micro follow-through, controlled stabilization and a firm hold.
       */

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -31,
        impactRotationDeg: 1.2,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 20,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.12,
          anticipationRotationDeltaDeg: -5.2,
          anticipationXpx: -1.1,
          anticipationYpx: -0.72,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.32,

          strikeDurationSeconds: 0.23,
          strikeMinDurationSeconds: 0.2,
          strikeMaxDurationSeconds: 0.26,
          strikeEase: 'power4.in',

          followThroughDurationSeconds: 0.045,
          overshootRotationDeltaDeg: 0.24,
          overshootXpx: 0.18,
          overshootYpx: 0.46,

          settleDurationSeconds: 0.18,
          settleEase: 'expo.out',

          liftDurationSeconds: 0.36,
          liftMinDurationSeconds: 0.3,
          liftMaxDurationSeconds: 0.42,
          liftEase: 'power3.out',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        visualScale: 1.14,

        restRotationDeg: -34,
        impactRotationDeg: -3,

        impactFineTuneXpx: 20,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 20,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.13,
          anticipationRotationDeltaDeg: -5,
          anticipationXpx: -1,
          anticipationYpx: -0.66,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.32,

          strikeDurationSeconds: 0.25,
          strikeMinDurationSeconds: 0.22,
          strikeMaxDurationSeconds: 0.28,
          strikeEase: 'power4.in',

          followThroughDurationSeconds: 0.048,
          overshootRotationDeltaDeg: 0.22,
          overshootXpx: 0.18,
          overshootYpx: 0.5,

          settleDurationSeconds: 0,
          settleEase: 'expo.out',

          liftDurationSeconds: 0.38,
          liftMinDurationSeconds: 0.32,
          liftMaxDurationSeconds: 0.44,
          liftEase: 'power3.out',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.45,

        scaleX: 1.0008,
        scaleY: 0.9975,

        compressionDurationSeconds: 0.045,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.12,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 0.9,

        scaleX: 1.06,
        scaleY: 0.92,

        opacity: 0.9,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.15,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },

      impactEffects: {
        target: {
          desktop: {
            compressionXpx: 0.08,
            compressionYpx: 1.28,
            compressionRotationDeg: 0.018,
            compressionScaleX: 1.001,
            compressionScaleY: 0.9958,
            compressionDurationSeconds: 0.05,
            compressionEase: 'power3.out',

            recoilXpx: -0.04,
            recoilYpx: -0.14,
            recoilRotationDeg: -0.008,
            recoilScaleX: 1,
            recoilScaleY: 1.0002,
            recoilDurationSeconds: 0.034,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.16,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },

          mobile: {
            compressionXpx: 0.1,
            compressionYpx: 1.42,
            compressionRotationDeg: 0.025,
            compressionScaleX: 1.0012,
            compressionScaleY: 0.9952,
            compressionDurationSeconds: 0.052,
            compressionEase: 'power3.out',

            recoilXpx: -0.05,
            recoilYpx: -0.16,
            recoilRotationDeg: -0.01,
            recoilScaleX: 1,
            recoilScaleY: 1.0003,
            recoilDurationSeconds: 0.038,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.17,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },
        },

        broadShadow: {
          translateYpx: 1.45,
          scaleX: 1.12,
          scaleY: 0.84,
          opacity: 0.94,
          compressionDurationSeconds: 0.07,
          recoveryDurationSeconds: 0.22,
        },

        castShadow: {
          xPercent: 3,
          yPercent: 6,
          rotationOffsetDeg: 8,

          rest: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.07,
          },

          anticipation: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.045,
          },

          impact: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.18,
          },

          settle: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.12,
          },
        },

        dust: {
          anchorOffsetXpx: -20,
          anchorOffsetYpx: 0,

          xPercent: -50,

          startOpacity: 0,
          peakOpacity: 0.1,

          startScale: 0.76,
          peakScale: 1.08,
          endScale: 1.34,

          startYPercent: -42,
          peakYPercent: -54,
          endYPercent: -76,

          revealDurationSeconds: 0.04,
          fadeDurationSeconds: 0.22,

          revealEase: 'power2.out',
          fadeEase: 'power2.out',

          transformOrigin: 'center bottom',
        },

        contactShadow: {
          anchorOffsetXpx: 0,
          anchorOffsetYpx: 0,

          preContactLeadSeconds: 0.05,
          preContactOpacity: 0.07,
          preContactScaleX: 0.82,
          preContactScaleY: 0.72,

          contactOpacity: 0.22,
          contactScaleX: 1.16,
          contactScaleY: 0.46,
          contactDurationSeconds: 0.035,
          contactEase: 'power2.out',

          recoilOpacity: 0.12,
          recoilScaleX: 1.16,
          recoilScaleY: 0.58,
          recoilDurationSeconds: 0.045,
          recoilEase: 'power2.out',

          fadeOpacity: 0,
          fadeScaleX: 0.94,
          fadeScaleY: 0.72,
          fadeDurationSeconds: 0.18,
          fadeEase: 'power3.out',
        },

        resonance: {
          enabled: true,

          anchorOffsetXpx: 0,
          anchorOffsetYpx: 0,

          startOpacity: 0.08,
          peakOpacity: 0.1,
          endOpacity: 0,

          startScaleX: 0.72,
          startScaleY: 0.82,

          endScaleX: 1.45,
          endScaleY: 1.08,

          durationSeconds: 0.18,
          revealDurationSeconds: 0.05,
          fadeDurationSeconds: 0.13,
          ease: 'power2.out',
        },
      },
    },

    F: {
      label: 'Balanced controlled rebound',
      description:
        'The TSA reference: a short physical recoil, strong damping and a composed return without elastic bounce.',

      mobileViewport: {
        playback: 'timed',
        start: 'top 82%',
        end: 'bottom 18%',
        replayMode: 'once-per-entry',
        initialState: 'rest',
        finalState: 'auto-return',
        entryDelaySeconds: 0.04,

        /*
         * The timer starts after rebound and rebound-settle finish.
         * The final lift therefore never interrupts the contact motion.
         */
        holdAtImpactSeconds: 0.14,
        autoReturnDelaySeconds: 0.06,

        resetWhenFullyOutside: true,
        resetPosition: 'either',
        resetDelaySeconds: 0,
        resetDurationSeconds: 0.24,
        resetEase: 'power3.out',

        playOnInitialLoadIfVisible: true,
        playOnEnter: true,
        playOnEnterBack: true,
        finishCurrentAnimationOnLeave: true,
        reverseOnLeave: false,
        minimumReplayIntervalSeconds: 0.9,
        refreshSilently: true,
        preventRefreshPlayback: true,
        markers: false,
      },

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,
        restRotationDeg: -31,
        impactRotationDeg: 1.2,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 20,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.055,
          anticipationRotationDeltaDeg: -1.6,
          anticipationXpx: -0.24,
          anticipationYpx: -0.18,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.18,

          strikeDurationSeconds: 0.13,
          strikeMinDurationSeconds: 0.115,
          strikeMaxDurationSeconds: 0.145,
          strikeEase: 'expo.in',

          followThroughDurationSeconds: 0.012,
          overshootRotationDeltaDeg: 0.05,
          overshootXpx: 0.035,
          overshootYpx: 0.11,

          reboundEnabled: true,
          reboundDurationSeconds: 0.14,
          reboundRotationDeltaDeg: -10.5,
          reboundXpx: -1,
          reboundYpx: -1.25,
          reboundEase: 'power2.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.19,
          reboundSettleRotationDeltaDeg: -3.4,
          reboundSettleXpx: -0.28,
          reboundSettleYpx: -0.36,
          reboundSettleEase: 'power2.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.4,
          liftMinDurationSeconds: 0.35,
          liftMaxDurationSeconds: 0.44,
          liftEase: 'power3.inOut',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        visualScale: 1,

        /*
         * Mobile mirrors the desktop rhythm, but starts closer to the
         * target. Auto-return always resolves back to this exact pose.
         */
        restRotationDeg: -23,
        impactRotationDeg: -3,

        impactFineTuneXpx: 20,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 17,
        restFineTuneYpx: 1,

        motion: {
          anticipationDurationSeconds: 0.043,
          anticipationRotationDeltaDeg: -0.95,
          anticipationXpx: -0.14,
          anticipationYpx: -0.09,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.13,

          strikeDurationSeconds: 0.11,
          strikeMinDurationSeconds: 0.098,
          strikeMaxDurationSeconds: 0.122,
          strikeEase: 'expo.in',

          followThroughDurationSeconds: 0.011,
          overshootRotationDeltaDeg: 0.04,
          overshootXpx: 0.03,
          overshootYpx: 0.1,

          reboundEnabled: true,
          reboundDurationSeconds: 0.13,
          reboundRotationDeltaDeg: -7.8,
          reboundXpx: -0.62,
          reboundYpx: -0.85,
          reboundEase: 'power2.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.18,
          reboundSettleRotationDeltaDeg: -2.5,
          reboundSettleXpx: -0.18,
          reboundSettleYpx: -0.26,
          reboundSettleEase: 'power2.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.36,
          liftMinDurationSeconds: 0.32,
          liftMaxDurationSeconds: 0.4,
          liftEase: 'power3.inOut',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.45,

        scaleX: 1.0008,
        scaleY: 0.9975,

        compressionDurationSeconds: 0.045,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.12,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 0.9,

        scaleX: 1.06,
        scaleY: 0.92,

        opacity: 0.9,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.15,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },

      impactEffects: {
        target: {
          desktop: {
            compressionXpx: 0.08,
            compressionYpx: 1.12,
            compressionRotationDeg: 0.016,
            compressionScaleX: 1.0009,
            compressionScaleY: 0.9961,
            compressionDurationSeconds: 0.047,
            compressionEase: 'power3.out',

            recoilXpx: -0.04,
            recoilYpx: -0.13,
            recoilRotationDeg: -0.007,
            recoilScaleX: 1,
            recoilScaleY: 1.0002,
            recoilDurationSeconds: 0.035,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.145,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },

          mobile: {
            compressionXpx: 0.1,
            compressionYpx: 1.28,
            compressionRotationDeg: 0.022,
            compressionScaleX: 1.0011,
            compressionScaleY: 0.9956,
            compressionDurationSeconds: 0.05,
            compressionEase: 'power3.out',

            recoilXpx: -0.05,
            recoilYpx: -0.15,
            recoilRotationDeg: -0.009,
            recoilScaleX: 1,
            recoilScaleY: 1.0003,
            recoilDurationSeconds: 0.038,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.155,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },
        },

        broadShadow: {
          translateYpx: 1.25,
          scaleX: 1.1,
          scaleY: 0.86,
          opacity: 0.92,
          compressionDurationSeconds: 0.062,
          recoveryDurationSeconds: 0.2,
        },

        castShadow: {
          xPercent: 3,
          yPercent: 6,
          rotationOffsetDeg: 8,

          rest: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.07,
          },

          anticipation: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.045,
          },

          impact: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.17,
          },

          rebound: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.05,
          },

          settle: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.085,
          },
        },

        dust: {
          anchorOffsetXpx: -16,
          anchorOffsetYpx: 0,

          peakOpacity: 0.075,

          startScale: 0.76,
          peakScale: 0.98,
          endScale: 1.18,

          startYPercent: -42,
          peakYPercent: -53,
          endYPercent: -70,

          revealDurationSeconds: 0.038,
          fadeDurationSeconds: 0.18,
        },

        contactShadow: {
          preContactOpacity: 0.06,

          contactOpacity: 0.19,
          contactScaleX: 1.1,
          contactScaleY: 0.5,
          contactDurationSeconds: 0.034,

          recoilOpacity: 0.095,
          recoilScaleX: 1.12,
          recoilScaleY: 0.62,
          recoilDurationSeconds: 0.05,

          fadeDurationSeconds: 0.15,
        },

        resonance: {
          enabled: true,

          startOpacity: 0.065,
          peakOpacity: 0.08,
          endOpacity: 0,

          startScaleX: 0.72,
          startScaleY: 0.82,

          endScaleX: 1.34,
          endScaleY: 1.04,

          durationSeconds: 0.15,
          revealDurationSeconds: 0.04,
          fadeDurationSeconds: 0.11,
          ease: 'power2.out',
        },
      },
    },

    G: {
      label: 'Restrained controlled rebound',
      description:
        'A quieter F variation with the smallest recoil, softer damping and the least visual interruption.',

      mobileViewport: {
        playback: 'timed',
        start: 'top 82%',
        end: 'bottom 18%',
        replayMode: 'once-per-entry',
        initialState: 'rest',
        finalState: 'auto-return',
        entryDelaySeconds: 0.045,

        /*
         * The timer starts after rebound and rebound-settle finish.
         * The final lift therefore never interrupts the contact motion.
         */
        holdAtImpactSeconds: 0.16,
        autoReturnDelaySeconds: 0.07,

        resetWhenFullyOutside: true,
        resetPosition: 'either',
        resetDelaySeconds: 0,
        resetDurationSeconds: 0.25,
        resetEase: 'power3.out',

        playOnInitialLoadIfVisible: true,
        playOnEnter: true,
        playOnEnterBack: true,
        finishCurrentAnimationOnLeave: true,
        reverseOnLeave: false,
        minimumReplayIntervalSeconds: 0.92,
        refreshSilently: true,
        preventRefreshPlayback: true,
        markers: false,
      },

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,
        restRotationDeg: -30,
        impactRotationDeg: 1.1,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 19,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.065,
          anticipationRotationDeltaDeg: -1.4,
          anticipationXpx: -0.2,
          anticipationYpx: -0.14,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.18,

          strikeDurationSeconds: 0.14,
          strikeMinDurationSeconds: 0.124,
          strikeMaxDurationSeconds: 0.152,
          strikeEase: 'power4.in',

          followThroughDurationSeconds: 0.012,
          overshootRotationDeltaDeg: 0.04,
          overshootXpx: 0.03,
          overshootYpx: 0.09,

          reboundEnabled: true,
          reboundDurationSeconds: 0.155,
          reboundRotationDeltaDeg: -7.4,
          reboundXpx: -0.35,
          reboundYpx: -0.65,
          reboundEase: 'power2.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.22,
          reboundSettleRotationDeltaDeg: -1,
          reboundSettleXpx: -0.22,
          reboundSettleYpx: -0.29,
          reboundSettleEase: 'sine.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.5,
          liftMinDurationSeconds: 0.38,
          liftMaxDurationSeconds: 0.47,
          liftEase: 'power3.inOut',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        visualScale: 1.08,

        /*
         * Mobile mirrors the desktop rhythm, but starts closer to the
         * target. Auto-return always resolves back to this exact pose.
         */
        restRotationDeg: -35,
        impactRotationDeg: -3,

        impactFineTuneXpx: 10,
        impactFineTuneYpx: 0,

        /*
         * Native iPhone viewport safety adjustment.
         * This changes only the authored rest/return pose. Exact impact
         * remains locked to the target by calculateGeometry().
         */
        restFineTuneXpx: 40,
        restFineTuneYpx: -10,

        motion: {
          anticipationDurationSeconds: 0.05,
          anticipationRotationDeltaDeg: -0.82,
          anticipationXpx: -0.12,
          anticipationYpx: -0.075,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.12,

          strikeDurationSeconds: 0.12,
          strikeMinDurationSeconds: 0.108,
          strikeMaxDurationSeconds: 0.134,
          strikeEase: 'power4.in',

          followThroughDurationSeconds: 0.011,
          overshootRotationDeltaDeg: 0.035,
          overshootXpx: 0.025,
          overshootYpx: 0.08,

          reboundEnabled: true,
          reboundDurationSeconds: 0.145,
          reboundRotationDeltaDeg: -6.2,
          reboundXpx: -0.48,
          reboundYpx: -0.67,
          reboundEase: 'power2.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.205,
          reboundSettleRotationDeltaDeg: 1,
          reboundSettleXpx: -0.14,
          reboundSettleYpx: -0.2,
          reboundSettleEase: 'sine.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.55,
          liftMinDurationSeconds: 0.35,
          liftMaxDurationSeconds: 0.43,
          liftEase: 'power3.inOut',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.45,

        scaleX: 1.0008,
        scaleY: 0.9975,

        compressionDurationSeconds: 0.045,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.12,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 0.9,

        scaleX: 1.06,
        scaleY: 0.92,

        opacity: 0.9,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.15,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },

      impactEffects: {
        target: {
          desktop: {
            compressionXpx: 0.08,
            compressionYpx: 1.12,
            compressionRotationDeg: 0.016,
            compressionScaleX: 1.0009,
            compressionScaleY: 0.9961,
            compressionDurationSeconds: 0.047,
            compressionEase: 'power3.out',

            recoilXpx: -0.04,
            recoilYpx: -0.13,
            recoilRotationDeg: -0.007,
            recoilScaleX: 1,
            recoilScaleY: 1.0002,
            recoilDurationSeconds: 0.035,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.145,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },

          mobile: {
            compressionXpx: 0.1,
            compressionYpx: 1.28,
            compressionRotationDeg: 0.022,
            compressionScaleX: 1.0011,
            compressionScaleY: 0.9956,
            compressionDurationSeconds: 0.05,
            compressionEase: 'power3.out',

            recoilXpx: -0.05,
            recoilYpx: -0.15,
            recoilRotationDeg: -0.009,
            recoilScaleX: 1,
            recoilScaleY: 1.0003,
            recoilDurationSeconds: 0.038,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.155,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },
        },

        broadShadow: {
          translateYpx: 1.25,
          scaleX: 1.1,
          scaleY: 0.86,
          opacity: 0.92,
          compressionDurationSeconds: 0.062,
          recoveryDurationSeconds: 0.2,
        },

        castShadow: {
          xPercent: 3,
          yPercent: 6,
          rotationOffsetDeg: 8,

          rest: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.46,
          },

          anticipation: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.36,
          },

          impact: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.3,
          },

          rebound: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.31,
          },

          settle: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.34,
          },
        },

        dust: {
          anchorOffsetXpx: -16,
          anchorOffsetYpx: 0,

          peakOpacity: 0.075,

          startScale: 0.76,
          peakScale: 0.98,
          endScale: 1.18,

          startYPercent: -42,
          peakYPercent: -53,
          endYPercent: -70,

          revealDurationSeconds: 0.038,
          fadeDurationSeconds: 0.18,
        },

        contactShadow: {
          preContactOpacity: 0.06,

          contactOpacity: 0.19,
          contactScaleX: 1.1,
          contactScaleY: 0.5,
          contactDurationSeconds: 0.034,

          recoilOpacity: 0.095,
          recoilScaleX: 1.12,
          recoilScaleY: 0.62,
          recoilDurationSeconds: 0.05,

          fadeDurationSeconds: 0.15,
        },

        resonance: {
          enabled: true,

          startOpacity: 0.065,
          peakOpacity: 0.08,
          endOpacity: 0,

          startScaleX: 0.72,
          startScaleY: 0.82,

          endScaleX: 1.34,
          endScaleY: 1.04,

          durationSeconds: 0.15,
          revealDurationSeconds: 0.04,
          fadeDurationSeconds: 0.11,
          ease: 'power2.out',
        },
      },
    },

    H: {
      label: 'Decisive controlled rebound',
      description:
        'A firmer F variation with a quicker contact reversal and a slightly stronger, tightly damped recoil.',

      mobileViewport: {
        playback: 'timed',
        start: 'top 82%',
        end: 'bottom 18%',
        replayMode: 'once-per-entry',
        initialState: 'rest',
        finalState: 'auto-return',
        entryDelaySeconds: 0.035,

        /*
         * The timer starts after rebound and rebound-settle finish.
         * The final lift therefore never interrupts the contact motion.
         */
        holdAtImpactSeconds: 0.11,
        autoReturnDelaySeconds: 0.05,

        resetWhenFullyOutside: true,
        resetPosition: 'either',
        resetDelaySeconds: 0,
        resetDurationSeconds: 0.22,
        resetEase: 'power3.out',

        playOnInitialLoadIfVisible: true,
        playOnEnter: true,
        playOnEnterBack: true,
        finishCurrentAnimationOnLeave: true,
        reverseOnLeave: false,
        minimumReplayIntervalSeconds: 0.82,
        refreshSilently: true,
        preventRefreshPlayback: true,
        markers: false,
      },

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,
        restRotationDeg: -31.5,
        impactRotationDeg: 1.3,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 20,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.045,
          anticipationRotationDeltaDeg: -1.4,
          anticipationXpx: -0.2,
          anticipationYpx: -0.15,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.16,

          strikeDurationSeconds: 0.115,
          strikeMinDurationSeconds: 0.103,
          strikeMaxDurationSeconds: 0.13,
          strikeEase: 'expo.in',

          followThroughDurationSeconds: 0.011,
          overshootRotationDeltaDeg: 0.055,
          overshootXpx: 0.038,
          overshootYpx: 0.12,

          reboundEnabled: true,
          reboundDurationSeconds: 0.12,
          reboundRotationDeltaDeg: -11.8,
          reboundXpx: -1.08,
          reboundYpx: -1.34,
          reboundEase: 'power3.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.155,
          reboundSettleRotationDeltaDeg: -3.8,
          reboundSettleXpx: -0.3,
          reboundSettleYpx: -0.39,
          reboundSettleEase: 'power2.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.37,
          liftMinDurationSeconds: 0.32,
          liftMaxDurationSeconds: 0.41,
          liftEase: 'power3.inOut',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        visualScale: 1.14,

        /*
         * Mobile mirrors the desktop rhythm, but starts closer to the
         * target. Auto-return always resolves back to this exact pose.
         */
        restRotationDeg: -23.5,
        impactRotationDeg: -2.9,

        impactFineTuneXpx: 20,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 17,
        restFineTuneYpx: 1,

        motion: {
          anticipationDurationSeconds: 0.036,
          anticipationRotationDeltaDeg: -0.84,
          anticipationXpx: -0.12,
          anticipationYpx: -0.08,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.11,

          strikeDurationSeconds: 0.102,
          strikeMinDurationSeconds: 0.091,
          strikeMaxDurationSeconds: 0.114,
          strikeEase: 'expo.in',

          followThroughDurationSeconds: 0.01,
          overshootRotationDeltaDeg: 0.045,
          overshootXpx: 0.032,
          overshootYpx: 0.105,

          reboundEnabled: true,
          reboundDurationSeconds: 0.112,
          reboundRotationDeltaDeg: -8.7,
          reboundXpx: -0.68,
          reboundYpx: -0.91,
          reboundEase: 'power3.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.145,
          reboundSettleRotationDeltaDeg: -2.8,
          reboundSettleXpx: -0.19,
          reboundSettleYpx: -0.28,
          reboundSettleEase: 'power2.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.34,
          liftMinDurationSeconds: 0.3,
          liftMaxDurationSeconds: 0.38,
          liftEase: 'power3.inOut',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.45,

        scaleX: 1.0008,
        scaleY: 0.9975,

        compressionDurationSeconds: 0.045,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.12,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 0.9,

        scaleX: 1.06,
        scaleY: 0.92,

        opacity: 0.9,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.15,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },

      impactEffects: {
        target: {
          desktop: {
            compressionXpx: 0.08,
            compressionYpx: 1.12,
            compressionRotationDeg: 0.016,
            compressionScaleX: 1.0009,
            compressionScaleY: 0.9961,
            compressionDurationSeconds: 0.047,
            compressionEase: 'power3.out',

            recoilXpx: -0.04,
            recoilYpx: -0.13,
            recoilRotationDeg: -0.007,
            recoilScaleX: 1,
            recoilScaleY: 1.0002,
            recoilDurationSeconds: 0.035,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.145,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },

          mobile: {
            compressionXpx: 0.1,
            compressionYpx: 1.28,
            compressionRotationDeg: 0.022,
            compressionScaleX: 1.0011,
            compressionScaleY: 0.9956,
            compressionDurationSeconds: 0.05,
            compressionEase: 'power3.out',

            recoilXpx: -0.05,
            recoilYpx: -0.15,
            recoilRotationDeg: -0.009,
            recoilScaleX: 1,
            recoilScaleY: 1.0003,
            recoilDurationSeconds: 0.038,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.155,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },
        },

        broadShadow: {
          translateYpx: 1.25,
          scaleX: 1.1,
          scaleY: 0.86,
          opacity: 0.92,
          compressionDurationSeconds: 0.062,
          recoveryDurationSeconds: 0.2,
        },

        castShadow: {
          xPercent: 3,
          yPercent: 6,
          rotationOffsetDeg: 8,

          rest: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.07,
          },

          anticipation: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.045,
          },

          impact: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.17,
          },

          rebound: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.05,
          },

          settle: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.085,
          },
        },

        dust: {
          anchorOffsetXpx: -16,
          anchorOffsetYpx: 0,

          peakOpacity: 0.075,

          startScale: 0.76,
          peakScale: 0.98,
          endScale: 1.18,

          startYPercent: -42,
          peakYPercent: -53,
          endYPercent: -70,

          revealDurationSeconds: 0.038,
          fadeDurationSeconds: 0.18,
        },

        contactShadow: {
          preContactOpacity: 0.06,

          contactOpacity: 0.19,
          contactScaleX: 1.1,
          contactScaleY: 0.5,
          contactDurationSeconds: 0.034,

          recoilOpacity: 0.095,
          recoilScaleX: 1.12,
          recoilScaleY: 0.62,
          recoilDurationSeconds: 0.05,

          fadeDurationSeconds: 0.15,
        },

        resonance: {
          enabled: true,

          startOpacity: 0.065,
          peakOpacity: 0.08,
          endOpacity: 0,

          startScaleX: 0.72,
          startScaleY: 0.82,

          endScaleX: 1.34,
          endScaleY: 1.04,

          durationSeconds: 0.15,
          revealDurationSeconds: 0.04,
          fadeDurationSeconds: 0.11,
          ease: 'power2.out',
        },
      },
    },

    I: {
      label: 'Weighted controlled rebound',
      description:
        'A heavier F variation with restrained vertical lift, a subtle lateral recoil and the slowest damping.',

      mobileViewport: {
        playback: 'timed',
        start: 'top 82%',
        end: 'bottom 18%',
        replayMode: 'once-per-entry',
        initialState: 'rest',
        finalState: 'auto-return',
        entryDelaySeconds: 0.04,

        /*
         * The timer starts after rebound and rebound-settle finish.
         * The final lift therefore never interrupts the contact motion.
         */
        holdAtImpactSeconds: 0.15,
        autoReturnDelaySeconds: 0.08,

        resetWhenFullyOutside: true,
        resetPosition: 'either',
        resetDelaySeconds: 0,
        resetDurationSeconds: 0.26,
        resetEase: 'power3.out',

        playOnInitialLoadIfVisible: true,
        playOnEnter: true,
        playOnEnterBack: true,
        finishCurrentAnimationOnLeave: true,
        reverseOnLeave: false,
        minimumReplayIntervalSeconds: 0.96,
        refreshSilently: true,
        preventRefreshPlayback: true,
        markers: false,
      },

      desktop: {
        pivotXPercent: 18,
        pivotYPercent: 65,
        restRotationDeg: -32,
        impactRotationDeg: 1.1,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 20.5,
        restFineTuneYpx: 0,

        motion: {
          anticipationDurationSeconds: 0.06,
          anticipationRotationDeltaDeg: -1.8,
          anticipationXpx: -0.28,
          anticipationYpx: -0.2,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.19,

          strikeDurationSeconds: 0.136,
          strikeMinDurationSeconds: 0.122,
          strikeMaxDurationSeconds: 0.152,
          strikeEase: 'power4.in',

          followThroughDurationSeconds: 0.013,
          overshootRotationDeltaDeg: 0.05,
          overshootXpx: 0.04,
          overshootYpx: 0.1,

          reboundEnabled: true,
          reboundDurationSeconds: 0.165,
          reboundRotationDeltaDeg: -9.4,
          reboundXpx: -1.2,
          reboundYpx: -0.94,
          reboundEase: 'power2.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.235,
          reboundSettleRotationDeltaDeg: -3,
          reboundSettleXpx: -0.4,
          reboundSettleYpx: -0.28,
          reboundSettleEase: 'power2.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.45,
          liftMinDurationSeconds: 0.4,
          liftMaxDurationSeconds: 0.49,
          liftEase: 'power3.inOut',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        visualScale: 1.14,

        /*
         * Mobile mirrors the desktop rhythm, but starts closer to the
         * target. Auto-return always resolves back to this exact pose.
         */
        restRotationDeg: -24,
        impactRotationDeg: -3.1,

        impactFineTuneXpx: 20,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 17.5,
        restFineTuneYpx: 1.2,

        motion: {
          anticipationDurationSeconds: 0.047,
          anticipationRotationDeltaDeg: -1.08,
          anticipationXpx: -0.16,
          anticipationYpx: -0.1,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.14,

          strikeDurationSeconds: 0.118,
          strikeMinDurationSeconds: 0.106,
          strikeMaxDurationSeconds: 0.132,
          strikeEase: 'power4.in',

          followThroughDurationSeconds: 0.012,
          overshootRotationDeltaDeg: 0.04,
          overshootXpx: 0.032,
          overshootYpx: 0.085,

          reboundEnabled: true,
          reboundDurationSeconds: 0.155,
          reboundRotationDeltaDeg: -7,
          reboundXpx: -0.74,
          reboundYpx: -0.64,
          reboundEase: 'power2.out',

          reboundSettleEnabled: true,
          reboundSettleDurationSeconds: 0.22,
          reboundSettleRotationDeltaDeg: -2.2,
          reboundSettleXpx: -0.24,
          reboundSettleYpx: -0.19,
          reboundSettleEase: 'power2.inOut',

          settleEnabled: false,
          settleDurationSeconds: 0,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.41,
          liftMinDurationSeconds: 0.37,
          liftMaxDurationSeconds: 0.45,
          liftEase: 'power3.inOut',
        },
      },

      targetReaction: {
        translateXpx: 0,
        translateYpx: 0.45,

        scaleX: 1.0008,
        scaleY: 0.9975,

        compressionDurationSeconds: 0.045,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.12,
        recoveryEase: 'power3.out',

        transformOrigin: 'bottom center',
      },

      shadowReaction: {
        translateXpx: 0,
        translateYpx: 0.9,

        scaleX: 1.06,
        scaleY: 0.92,

        opacity: 0.9,

        compressionDurationSeconds: 0.055,
        compressionEase: 'power3.out',

        recoveryDurationSeconds: 0.15,
        recoveryEase: 'power3.out',

        transformOrigin: 'center center',
      },

      impactEffects: {
        target: {
          desktop: {
            compressionXpx: 0.08,
            compressionYpx: 1.12,
            compressionRotationDeg: 0.016,
            compressionScaleX: 1.0009,
            compressionScaleY: 0.9961,
            compressionDurationSeconds: 0.047,
            compressionEase: 'power3.out',

            recoilXpx: -0.04,
            recoilYpx: -0.13,
            recoilRotationDeg: -0.007,
            recoilScaleX: 1,
            recoilScaleY: 1.0002,
            recoilDurationSeconds: 0.035,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.145,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },

          mobile: {
            compressionXpx: 0.1,
            compressionYpx: 1.28,
            compressionRotationDeg: 0.022,
            compressionScaleX: 1.0011,
            compressionScaleY: 0.9956,
            compressionDurationSeconds: 0.05,
            compressionEase: 'power3.out',

            recoilXpx: -0.05,
            recoilYpx: -0.15,
            recoilRotationDeg: -0.009,
            recoilScaleX: 1,
            recoilScaleY: 1.0003,
            recoilDurationSeconds: 0.038,
            recoilEase: 'power2.out',

            settleDurationSeconds: 0.155,
            settleEase: 'power3.out',
            transformOrigin: 'bottom center',
          },
        },

        broadShadow: {
          translateYpx: 1.25,
          scaleX: 1.1,
          scaleY: 0.86,
          opacity: 0.92,
          compressionDurationSeconds: 0.062,
          recoveryDurationSeconds: 0.2,
        },

        castShadow: {
          xPercent: 3,
          yPercent: 6,
          rotationOffsetDeg: 8,

          rest: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.07,
          },

          anticipation: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.045,
          },

          impact: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.17,
          },

          rebound: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.05,
          },

          settle: {
            scaleX: 1,
            scaleY: 1,
            opacity: 0.085,
          },
        },

        dust: {
          anchorOffsetXpx: -16,
          anchorOffsetYpx: 0,

          peakOpacity: 0.075,

          startScale: 0.76,
          peakScale: 0.98,
          endScale: 1.18,

          startYPercent: -42,
          peakYPercent: -53,
          endYPercent: -70,

          revealDurationSeconds: 0.038,
          fadeDurationSeconds: 0.18,
        },

        contactShadow: {
          preContactOpacity: 0.06,

          contactOpacity: 0.19,
          contactScaleX: 1.1,
          contactScaleY: 0.5,
          contactDurationSeconds: 0.034,

          recoilOpacity: 0.095,
          recoilScaleX: 1.12,
          recoilScaleY: 0.62,
          recoilDurationSeconds: 0.05,

          fadeDurationSeconds: 0.15,
        },

        resonance: {
          enabled: true,

          startOpacity: 0.065,
          peakOpacity: 0.08,
          endOpacity: 0,

          startScaleX: 0.72,
          startScaleY: 0.82,

          endScaleX: 1.34,
          endScaleY: 1.04,

          durationSeconds: 0.15,
          revealDurationSeconds: 0.04,
          fadeDurationSeconds: 0.11,
          ease: 'power2.out',
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
      contactShadow: '[data-gavel-contact-shadow]',
      resonance: '[data-gavel-resonance]',
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

    const presetDefinitions = QUICK_TUNING.presets as Record<GavelPresetName, GavelPreset>;

    const instances: GavelInstance[] = [];
    const globalCleanup: Array<() => void> = [];

    const clamp = (value: number, min: number, max: number): number => {
      return Math.min(Math.max(value, min), max);
    };

    const lerp = (start: number, end: number, progress: number): number => {
      return start + (end - start) * progress;
    };

    const easeInCubic = (progress: number): number => {
      return progress * progress * progress;
    };

    const easeOutCubic = (progress: number): number => {
      return 1 - Math.pow(1 - progress, 3);
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

    const deepMerge = <T extends Record<string, unknown>>(
      base: T,
      override?: DeepPartial<T>
    ): T => {
      if (!override) {
        return { ...base };
      }

      const output: Record<string, unknown> = { ...base };

      Object.entries(override).forEach(([key, value]) => {
        if (value === undefined) {
          return;
        }

        const baseValue = output[key];

        if (
          value &&
          baseValue &&
          typeof value === 'object' &&
          typeof baseValue === 'object' &&
          !Array.isArray(value) &&
          !Array.isArray(baseValue)
        ) {
          output[key] = deepMerge(
            baseValue as Record<string, unknown>,
            value as DeepPartial<Record<string, unknown>>
          );

          return;
        }

        output[key] = value;
      });

      return output as T;
    };

    const BASE_GAVEL_PRESET: GavelResolvedPreset = {
      label: 'Balanced controlled rebound',
      description: 'Controlled TSA rebound with restrained lift, strong damping and a calm return.',

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
          anticipationEnabled: true,
          anticipationDurationSeconds: 0.07,
          anticipationRotationDeltaDeg: -2.8,
          anticipationXpx: -0.65,
          anticipationYpx: -0.45,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.18,

          strikeDurationSeconds: 0.16,
          strikeMinDurationSeconds: 0.145,
          strikeMaxDurationSeconds: 0.175,
          strikeEase: 'power3.in',

          followThroughEnabled: true,
          followThroughDurationSeconds: 0.028,
          overshootRotationDeltaDeg: 0.12,
          overshootXpx: 0.12,
          overshootYpx: 0.28,

          settleEnabled: true,
          settleDurationSeconds: 0.095,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.22,
          liftMinDurationSeconds: 0.16,
          liftMaxDurationSeconds: 0.25,
          liftEase: 'power3.out',
        },
      },

      mobile: {
        pivotXPercent: 18,
        pivotYPercent: 65,

        restRotationDeg: -20,
        impactRotationDeg: 0.8,

        impactFineTuneXpx: 0,
        impactFineTuneYpx: 0,

        restFineTuneXpx: 10,
        restFineTuneYpx: 0,

        motion: {
          anticipationEnabled: true,
          anticipationDurationSeconds: 0.07,
          anticipationRotationDeltaDeg: -2.8,
          anticipationXpx: -0.65,
          anticipationYpx: -0.45,
          anticipationEase: 'power2.out',
          anticipationMaxProgress: 0.18,

          strikeDurationSeconds: 0.16,
          strikeMinDurationSeconds: 0.145,
          strikeMaxDurationSeconds: 0.175,
          strikeEase: 'power3.in',

          followThroughEnabled: true,
          followThroughDurationSeconds: 0.028,
          overshootRotationDeltaDeg: 0.12,
          overshootXpx: 0.12,
          overshootYpx: 0.28,

          settleEnabled: true,
          settleDurationSeconds: 0.095,
          settleEase: 'power3.out',

          liftDurationSeconds: 0.22,
          liftMinDurationSeconds: 0.16,
          liftMaxDurationSeconds: 0.25,
          liftEase: 'power3.out',
        },
      },

      mobileViewport: QUICK_TUNING.interaction.mobileViewport,
      impactEffects: QUICK_TUNING.impactEffects,
    };

    const resolvePreset = (presetName: GavelPresetName): GavelResolvedPreset => {
      const definition = presetDefinitions[presetName];
      const legacyImpactEffects: DeepPartial<GavelImpactEffectsConfig> = definition.shadowReaction
        ? {
            broadShadow: definition.shadowReaction,
          }
        : {};

      return deepMerge(
        {
          ...BASE_GAVEL_PRESET,
          label: definition.label,
          description: definition.description ?? BASE_GAVEL_PRESET.description,
        },
        {
          desktop: definition.desktop,
          mobile: definition.mobile,
          mobileViewport: definition.mobileViewport,
          impactEffects: {
            ...legacyImpactEffects,
            ...(definition.impactEffects ?? {}),
          },
        }
      );
    };

    const getActivePreset = (): GavelResolvedPreset => {
      return resolvePreset(activePresetName);
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

        visualScale: deviceProfile.visualScale ?? 1,

        impactRotationDeg: deviceProfile.impactRotationDeg,

        impactFineTuneXpx: deviceProfile.impactFineTuneXpx,
        impactFineTuneYpx: deviceProfile.impactFineTuneYpx,

        restFineTuneXpx: deviceProfile.restFineTuneXpx,
        restFineTuneYpx: deviceProfile.restFineTuneYpx,
      };
    };

    const isDeviceTargetImpactEffectConfig = (
      targetConfig: GavelTargetImpactEffectPresetConfig
    ): targetConfig is GavelDeviceTargetImpactEffectConfig => {
      return 'desktop' in targetConfig && 'mobile' in targetConfig;
    };

    const getTargetImpactEffect = (
      targetConfig: GavelTargetImpactEffectPresetConfig,
      mode: GavelMode
    ): GavelTargetImpactEffectConfig => {
      return isDeviceTargetImpactEffectConfig(targetConfig) ? targetConfig[mode] : targetConfig;
    };

    const ensureGeneratedEffect = ({
      component,
      selector,
      attributeName,
      className,
    }: {
      component: HTMLElement;
      selector: string;
      attributeName: string;
      className?: string;
    }): GavelGeneratedEffect => {
      const existing = component.querySelector<HTMLElement>(selector);

      if (existing) {
        return {
          element: existing,
          createdByScript: false,
        };
      }

      const element = document.createElement('div');

      element.setAttribute(attributeName, '');

      if (className) {
        element.classList.add(className);
      }

      component.appendChild(element);

      return {
        element,
        createdByScript: true,
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
      geometry: GavelGeometry,
      effectAnchors?: GavelDebugEffectAnchors
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

      if (effectAnchors) {
        if (QUICK_TUNING.debug.showContactShadowAnchor && effectAnchors.contactShadow) {
          addMarker(effectAnchors.contactShadow, 'CONTACT SHADOW', 'is-contact-shadow-anchor');
        }

        if (QUICK_TUNING.debug.showDustAnchor && effectAnchors.dust) {
          addMarker(effectAnchors.dust, 'DUST', 'is-dust-anchor');
        }

        if (QUICK_TUNING.debug.showResonanceAnchor && effectAnchors.resonance) {
          addMarker(effectAnchors.resonance, 'RESONANCE', 'is-resonance-anchor');
        }
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

          contactShadowAnchor:
            effectAnchors?.contactShadow &&
            `${effectAnchors.contactShadow.x}, ${effectAnchors.contactShadow.y}`,

          dustAnchor: effectAnchors?.dust && `${effectAnchors.dust.x}, ${effectAnchors.dust.y}`,

          resonanceAnchor:
            effectAnchors?.resonance &&
            `${effectAnchors.resonance.x}, ${effectAnchors.resonance.y}`,

          mobileImpactState: effectAnchors?.mobileImpactState,
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

      /*
       * The rendered gavel can be scaled independently per device.
       * Contact geometry must use the same scale or the larger hammer
       * will visually miss the target even though the pose math is correct.
       */
      const visualScale = Math.max(0.01, geometryConfig.visualScale);

      const contactVector = {
        x: (contactLocal.x - pivotLocal.x) * visualScale,

        y: (contactLocal.y - pivotLocal.y) * visualScale,
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
      mode,
      component,
      gavel,
      castShadow,
      dust,
      contactShadow,
      resonance,
      target,
      shadow,
      geometryConfig,
      deviceProfile,
      impactEffects,
    }: {
      mode: GavelMode;
      component: HTMLElement;
      gavel: HTMLElement;
      castShadow: HTMLElement | null;
      dust: HTMLElement | null;
      contactShadow: HTMLElement;
      resonance: HTMLElement;
      target: HTMLElement;
      shadow: HTMLElement;

      geometryConfig: GavelGeometryConfig;
      deviceProfile: GavelDeviceProfile;

      impactEffects: GavelImpactEffectsConfig;
    }): GavelController => {
      let geometry: GavelGeometry | null = null;

      let activeTimeline: TsaGavelGsapTimeline | null = null;
      let impactReactionTimeline: TsaGavelGsapTimeline | null = null;
      let replayTimer: number | null = null;
      let resizeFrame = 0;

      let desiredState: GavelDesiredState = 'rest';
      let activePhase: GavelAnimationPhase = 'rest';
      let mobileStateReader:
        | (() => Pick<GavelStateSnapshot, 'mobileStatus' | 'hasPlayed' | 'isInside'>)
        | null = null;

      const motionConfig = deviceProfile.motion;
      const broadShadowEffect = impactEffects.broadShadow;
      const visualScale = Math.max(0.01, geometryConfig.visualScale);

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

        gavel.style.willChange = active ? 'transform' : '';
        target.style.willChange = active ? 'transform' : '';
        shadow.style.willChange = active ? 'transform, opacity' : '';

        if (castShadow) {
          castShadow.style.willChange = active ? 'transform, opacity' : '';
        }

        if (dust) {
          dust.style.willChange = active ? 'transform, opacity' : '';
        }

        contactShadow.style.willChange = active ? 'transform, opacity' : '';
        resonance.style.willChange = active ? 'transform, opacity' : '';
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

        if (mode === 'mobile' && progress > 0.005 && progress < 0.995) {
          const approachEndProgress = 0.74;

          const preImpactPose: GavelPose = {
            x: geometry.impact.x + motionConfig.anticipationXpx,
            y: geometry.impact.y + motionConfig.anticipationYpx,
            rotation: geometry.impact.rotation + motionConfig.anticipationRotationDeltaDeg,
          };

          if (progress < approachEndProgress) {
            const approachProgress = easeOutCubic(clamp(progress / approachEndProgress, 0, 1));

            return {
              x: lerp(geometry.rest.x, preImpactPose.x, approachProgress),
              y: lerp(geometry.rest.y, preImpactPose.y, approachProgress),
              rotation: lerp(geometry.rest.rotation, preImpactPose.rotation, approachProgress),
            };
          }

          const strikeProgress = easeInCubic(
            clamp((progress - approachEndProgress) / (1 - approachEndProgress), 0, 1)
          );

          return {
            x: lerp(preImpactPose.x, geometry.impact.x, strikeProgress),
            y: lerp(preImpactPose.y, geometry.impact.y, strikeProgress),
            rotation: lerp(preImpactPose.rotation, geometry.impact.rotation, strikeProgress),
          };
        }

        return {
          x: lerp(geometry.rest.x, geometry.impact.x, progress),

          y: lerp(geometry.rest.y, geometry.impact.y, progress),

          rotation: lerp(geometry.rest.rotation, geometry.impact.rotation, progress),
        };
      };

      const getPostImpactHoldPose = (): GavelPose | null => {
        if (!geometry) {
          return null;
        }

        if (motionConfig.reboundEnabled !== true) {
          return geometry.impact;
        }

        if (motionConfig.reboundSettleEnabled === false) {
          return {
            x: geometry.impact.x + (motionConfig.reboundXpx ?? 0),
            y: geometry.impact.y + (motionConfig.reboundYpx ?? 0),
            rotation: geometry.impact.rotation + (motionConfig.reboundRotationDeltaDeg ?? -18),
          };
        }

        return {
          x: geometry.impact.x + (motionConfig.reboundSettleXpx ?? 0),
          y: geometry.impact.y + (motionConfig.reboundSettleYpx ?? 0),
          rotation: geometry.impact.rotation + (motionConfig.reboundSettleRotationDeltaDeg ?? -12),
        };
      };

      type CastShadowPhase = 'rest' | 'anticipation' | 'impact' | 'rebound' | 'settle';

      const getCastShadowVars = (
        pose: GavelPose,
        phase: CastShadowPhase
      ): Record<string, string | number | boolean> => {
        const castShadowEffect = impactEffects.castShadow;
        const phaseEffect =
          phase === 'rebound'
            ? (castShadowEffect.rebound ?? castShadowEffect.anticipation)
            : castShadowEffect[phase];

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

          scaleX: visualScale * phaseEffect.scaleX,
          scaleY: visualScale * phaseEffect.scaleY,
          opacity: phaseEffect.opacity,

          filter:
            castShadowEffect.filterEnabled === false ? '' : (castShadowEffect.cssFilter ?? ''),
          mixBlendMode: castShadowEffect.mixBlendMode ?? '',
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

      const getComponentEffectAnchor = (
        offsetXpx: number,
        offsetYpx: number
      ): GavelPoint | null => {
        if (!geometry) {
          return null;
        }

        return {
          x: geometry.targetContact.x + offsetXpx,
          y: geometry.targetContact.y + offsetYpx,
        };
      };

      const getLocalEffectAnchor = (
        element: HTMLElement,
        offsetXpx: number,
        offsetYpx: number
      ): GavelPoint | null => {
        if (!geometry) {
          return null;
        }

        const offsetParent =
          element.offsetParent instanceof HTMLElement ? element.offsetParent : component;

        const componentRect = component.getBoundingClientRect();
        const parentRect = offsetParent.getBoundingClientRect();

        return {
          x: componentRect.left - parentRect.left + geometry.targetContact.x + offsetXpx,
          y: componentRect.top - parentRect.top + geometry.targetContact.y + offsetYpx,
        };
      };

      const positionEffectAtContact = (
        element: HTMLElement,
        offsetXpx: number,
        offsetYpx: number
      ): void => {
        const anchor = getLocalEffectAnchor(element, offsetXpx, offsetYpx);

        if (!anchor) {
          return;
        }

        gsap.set(element, {
          left: anchor.x,
          top: anchor.y,
          right: 'auto',
          bottom: 'auto',
        });
      };

      const positionImpactEffectsAtContact = (): void => {
        const contactShadowEffect = impactEffects.contactShadow;
        const resonanceEffect = impactEffects.resonance;

        positionDustAtContact();

        positionEffectAtContact(
          contactShadow,
          contactShadowEffect.anchorOffsetXpx,
          contactShadowEffect.anchorOffsetYpx
        );

        positionEffectAtContact(
          resonance,
          resonanceEffect.anchorOffsetXpx,
          resonanceEffect.anchorOffsetYpx
        );
      };

      const getDebugEffectAnchors = (): GavelDebugEffectAnchors => {
        const dustEffect = impactEffects.dust;
        const contactShadowEffect = impactEffects.contactShadow;
        const resonanceEffect = impactEffects.resonance;

        return {
          contactShadow: getComponentEffectAnchor(
            contactShadowEffect.anchorOffsetXpx,
            contactShadowEffect.anchorOffsetYpx
          ),
          dust: dust
            ? getComponentEffectAnchor(dustEffect.anchorOffsetXpx, dustEffect.anchorOffsetYpx)
            : null,
          resonance: getComponentEffectAnchor(
            resonanceEffect.anchorOffsetXpx,
            resonanceEffect.anchorOffsetYpx
          ),
          mobileImpactState:
            mode === 'mobile' ? (mobileStateReader?.().mobileStatus ?? 'uninitialized') : undefined,
        };
      };

      const renderControllerDebug = (): void => {
        if (!geometry) {
          return;
        }

        renderDebug(component, gavel, target, geometry, getDebugEffectAnchors());
      };

      const setImpactReactionDefaults = (): void => {
        const targetEffect = getTargetImpactEffect(impactEffects.target, mode);
        const dustEffect = impactEffects.dust;
        const contactShadowEffect = impactEffects.contactShadow;
        const resonanceEffect = impactEffects.resonance;

        positionImpactEffectsAtContact();

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

          transformOrigin: broadShadowEffect.transformOrigin,
        });

        if (dust) {
          gsap.set(dust, {
            xPercent: dustEffect.xPercent,
            yPercent: dustEffect.startYPercent,
            scaleX: dustEffect.startScaleX ?? dustEffect.startScale,
            scaleY: dustEffect.startScaleY ?? dustEffect.startScale,
            rotation: dustEffect.startRotationDeg ?? 0,
            opacity: dustEffect.startOpacity,
            visibility: 'hidden',
            filter: dustEffect.cssFilter ?? '',
            mixBlendMode: dustEffect.mixBlendMode ?? '',

            transformOrigin: dustEffect.transformOrigin,
          });
        }

        gsap.set(contactShadow, {
          xPercent: -50,
          yPercent: -50,
          width: contactShadowEffect.widthRem ? `${contactShadowEffect.widthRem}rem` : '',
          height: contactShadowEffect.heightRem ? `${contactShadowEffect.heightRem}rem` : '',
          scaleX: contactShadowEffect.initialScaleX ?? 0.78,
          scaleY: contactShadowEffect.initialScaleY ?? 0.7,
          opacity: contactShadowEffect.initialOpacity ?? 0,
          visibility: 'hidden',
          filter: contactShadowEffect.cssFilter ?? '',
          mixBlendMode: contactShadowEffect.mixBlendMode ?? '',

          transformOrigin: contactShadowEffect.transformOrigin ?? 'center center',
        });

        gsap.set(resonance, {
          xPercent: -50,
          yPercent: -50,
          width: resonanceEffect.widthRem ? `${resonanceEffect.widthRem}rem` : '',
          height: resonanceEffect.heightRem ? `${resonanceEffect.heightRem}rem` : '',
          scaleX: resonanceEffect.startScaleX,
          scaleY: resonanceEffect.startScaleY,
          opacity: 0,
          visibility: 'hidden',
          borderColor: resonanceEffect.borderColor ?? '',
          borderWidth:
            typeof resonanceEffect.borderWidthPx === 'number'
              ? `${resonanceEffect.borderWidthPx}px`
              : '',
          boxShadow: resonanceEffect.boxShadow ?? '',

          transformOrigin: resonanceEffect.transformOrigin ?? 'center center',
        });
      };

      const setReactionDefaults = (): void => {
        setImpactReactionDefaults();

        if (castShadow && geometry) {
          gsap.set(castShadow, getCastShadowVars(geometry.rest, 'rest'));
        }
      };

      const killActiveTimeline = (): void => {
        activeTimeline?.kill();
        activeTimeline = null;
      };

      const killImpactReactionTimeline = (): void => {
        impactReactionTimeline?.kill();
        impactReactionTimeline = null;
      };

      const clearReplayTimer = (): void => {
        if (replayTimer === null) {
          return;
        }

        window.clearTimeout(replayTimer);
        replayTimer = null;
      };

      const addContactShadowPreContact = (
        timeline: TsaGavelGsapTimeline,
        contactTime: number
      ): void => {
        const contactShadowEffect = impactEffects.contactShadow;

        if (contactShadowEffect.enabled === false) {
          return;
        }

        const leadDuration = duration(contactShadowEffect.preContactLeadSeconds);
        const startTime = Math.max(0, contactTime - leadDuration);
        const availableDuration = Math.max(0.001, contactTime - startTime);

        timeline.set(
          contactShadow,
          {
            visibility: 'visible',
            xPercent: -50,
            yPercent: -50,
          },
          startTime
        );

        timeline.to(
          contactShadow,
          {
            opacity: contactShadowEffect.preContactOpacity,
            scaleX: contactShadowEffect.preContactScaleX,
            scaleY: contactShadowEffect.preContactScaleY,

            duration: availableDuration,
            ease: 'power2.out',
          },
          startTime
        );
      };

      const addImpactReactionToTimeline = (
        timeline: TsaGavelGsapTimeline,
        contactTime: number
      ): void => {
        const targetEffect = getTargetImpactEffect(impactEffects.target, mode);
        const dustEffect = impactEffects.dust;
        const contactShadowEffect = impactEffects.contactShadow;
        const resonanceEffect = impactEffects.resonance;
        const effectsAllowed =
          !QUICK_TUNING.performance.skipEffectsWhenDocumentHidden ||
          document.visibilityState !== 'hidden';

        if (targetEffect.enabled !== false) {
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

          if (targetEffect.recoilEnabled !== false) {
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
          }

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
              duration(
                targetEffect.compressionDurationSeconds +
                  (targetEffect.recoilEnabled === false ? 0 : targetEffect.recoilDurationSeconds)
              )
          );
        }

        if (broadShadowEffect.enabled !== false) {
          timeline.to(
            shadow,
            {
              x: broadShadowEffect.translateXpx,
              y: broadShadowEffect.translateYpx,
              scaleX: broadShadowEffect.scaleX,
              scaleY: broadShadowEffect.scaleY,
              opacity: broadShadowEffect.opacity ?? 1,

              transformOrigin: broadShadowEffect.transformOrigin,

              duration: duration(broadShadowEffect.compressionDurationSeconds),
              ease: broadShadowEffect.compressionEase,
            },
            contactTime
          );

          timeline.to(
            shadow,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,

              duration: duration(broadShadowEffect.recoveryDurationSeconds),
              ease: broadShadowEffect.recoveryEase,
            },
            contactTime + duration(broadShadowEffect.compressionDurationSeconds)
          );
        }

        if (contactShadowEffect.enabled !== false && effectsAllowed) {
          timeline.set(
            contactShadow,
            {
              visibility: 'visible',
              xPercent: -50,
              yPercent: -50,
            },
            contactTime
          );

          timeline.to(
            contactShadow,
            {
              opacity: contactShadowEffect.contactOpacity,
              scaleX: contactShadowEffect.contactScaleX,
              scaleY: contactShadowEffect.contactScaleY,

              duration: duration(contactShadowEffect.contactDurationSeconds),
              ease: contactShadowEffect.contactEase,
            },
            contactTime
          );

          timeline.to(
            contactShadow,
            {
              opacity: contactShadowEffect.recoilOpacity,
              scaleX: contactShadowEffect.recoilScaleX,
              scaleY: contactShadowEffect.recoilScaleY,

              duration: duration(contactShadowEffect.recoilDurationSeconds),
              ease: contactShadowEffect.recoilEase,
            },
            contactTime + duration(contactShadowEffect.contactDurationSeconds)
          );

          timeline.to(
            contactShadow,
            {
              opacity: contactShadowEffect.fadeOpacity,
              scaleX: contactShadowEffect.fadeScaleX,
              scaleY: contactShadowEffect.fadeScaleY,

              duration: duration(contactShadowEffect.fadeDurationSeconds),
              ease: contactShadowEffect.fadeEase,
            },
            contactTime +
              duration(
                contactShadowEffect.contactDurationSeconds +
                  contactShadowEffect.recoilDurationSeconds
              )
          );

          timeline.set(
            contactShadow,
            {
              visibility: 'hidden',
            },
            contactTime +
              duration(
                contactShadowEffect.contactDurationSeconds +
                  contactShadowEffect.recoilDurationSeconds +
                  contactShadowEffect.fadeDurationSeconds
              )
          );
        }

        if (dust && dustEffect.enabled !== false && effectsAllowed) {
          timeline.set(
            dust,
            {
              xPercent: dustEffect.xPercent,
              yPercent: dustEffect.startYPercent,
              scaleX: dustEffect.startScaleX ?? dustEffect.startScale,
              scaleY: dustEffect.startScaleY ?? dustEffect.startScale,
              rotation: dustEffect.startRotationDeg ?? 0,
              opacity: dustEffect.startOpacity,
              visibility: 'visible',
            },
            contactTime
          );

          timeline.to(
            dust,
            {
              yPercent: dustEffect.peakYPercent,
              scaleX: dustEffect.peakScaleX ?? dustEffect.peakScale,
              scaleY: dustEffect.peakScaleY ?? dustEffect.peakScale,
              rotation: dustEffect.peakRotationDeg ?? 0,
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
              scaleX: dustEffect.endScaleX ?? dustEffect.endScale,
              scaleY: dustEffect.endScaleY ?? dustEffect.endScale,
              rotation: dustEffect.endRotationDeg ?? 0,
              opacity: dustEffect.endOpacity ?? 0,

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

        if (resonanceEffect.enabled && effectsAllowed) {
          const resonanceRevealDuration = duration(
            resonanceEffect.revealDurationSeconds ?? resonanceEffect.durationSeconds * 0.35
          );
          const resonanceFadeDuration = duration(
            resonanceEffect.fadeDurationSeconds ?? resonanceEffect.durationSeconds * 0.65
          );

          timeline.set(
            resonance,
            {
              visibility: 'visible',
              xPercent: -50,
              yPercent: -50,
              scaleX: resonanceEffect.startScaleX,
              scaleY: resonanceEffect.startScaleY,
              opacity: resonanceEffect.startOpacity,
            },
            contactTime
          );

          timeline.to(
            resonance,
            {
              opacity: resonanceEffect.peakOpacity ?? resonanceEffect.startOpacity,
              scaleX: resonanceEffect.peakScaleX ?? resonanceEffect.startScaleX,
              scaleY: resonanceEffect.peakScaleY ?? resonanceEffect.startScaleY,

              duration: resonanceRevealDuration,
              ease: resonanceEffect.revealEase ?? resonanceEffect.ease,
            },
            contactTime
          );

          timeline.to(
            resonance,
            {
              opacity: resonanceEffect.endOpacity,
              scaleX: resonanceEffect.endScaleX,
              scaleY: resonanceEffect.endScaleY,

              duration: resonanceFadeDuration,
              ease: resonanceEffect.fadeEase ?? resonanceEffect.ease,
            },
            contactTime + resonanceRevealDuration
          );

          timeline.set(
            resonance,
            {
              visibility: 'hidden',
            },
            contactTime + resonanceRevealDuration + resonanceFadeDuration
          );
        }
      };

      const resetImpactReaction = (): void => {
        killImpactReactionTimeline();
        setReactionDefaults();
      };

      const playImpactReaction = (): void => {
        if (!ensureGeometry() || !geometry) {
          return;
        }

        killImpactReactionTimeline();
        positionImpactEffectsAtContact();
        setImpactReactionDefaults();

        const timeline = gsap.timeline({
          paused: true,

          defaults: {
            overwrite: 'auto',
          },

          onComplete: () => {
            if (impactReactionTimeline === timeline) {
              impactReactionTimeline = null;
            }
          },

          onInterrupt: () => {
            if (impactReactionTimeline === timeline) {
              impactReactionTimeline = null;
            }
          },
        });

        impactReactionTimeline = timeline;
        activePhase = 'contact';

        addImpactReactionToTimeline(timeline, 0);
        timeline.play(0);
      };

      const scrubToProgress = (progress: number): void => {
        if (!ensureGeometry() || !geometry) {
          return;
        }

        const clampedProgress = clamp(progress, 0, 1);
        const pose = interpolatePose(clampedProgress);
        const castShadowPhase: CastShadowPhase =
          clampedProgress >= 0.98
            ? 'settle'
            : clampedProgress >= 0.72
              ? 'impact'
              : clampedProgress >= 0.12
                ? 'anticipation'
                : 'rest';

        clearReplayTimer();
        killActiveTimeline();

        desiredState = clampedProgress >= 0.5 ? 'impact' : 'rest';
        activePhase =
          clampedProgress <= 0.005
            ? 'rest'
            : clampedProgress >= 0.995
              ? 'impact-hold'
              : clampedProgress >= 0.9
                ? 'contact'
                : clampedProgress >= 0.12
                  ? 'strike'
                  : 'anticipation';

        if (clampedProgress <= 0.005) {
          resetImpactReaction();
        }

        setWillChange(clampedProgress > 0.005 && clampedProgress < 0.995);

        gsap.set(gavel, {
          x: pose.x,
          y: pose.y,
          rotation: pose.rotation,

          scaleX: visualScale,
          scaleY: visualScale,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        if (castShadow) {
          gsap.set(castShadow, getCastShadowVars(pose, castShadowPhase));
        }
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

        renderControllerDebug();
        positionImpactEffectsAtContact();

        return true;
      };

      const completeTimeline = (
        timeline: TsaGavelGsapTimeline,
        completedPhase: GavelAnimationPhase
      ): void => {
        if (activeTimeline !== timeline) {
          return;
        }

        activeTimeline = null;
        activePhase = completedPhase;
        setWillChange(false);
      };

      const animateToImpact = (options: GavelPlayOptions = {}): void => {
        const wasMovingToImpact = desiredState === 'impact';

        if (activeTimeline && wasMovingToImpact && !options.force) {
          return;
        }

        clearReplayTimer();
        killImpactReactionTimeline();

        desiredState = 'impact';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        const currentProgress = getProgress();

        if (currentProgress >= 0.995 && !activeTimeline && !options.force) {
          activePhase = 'impact-hold';
          return;
        }

        killActiveTimeline();
        setImpactReactionDefaults();
        setWillChange(true);
        activePhase = 'strike';

        const timeline = gsap.timeline({
          paused: true,

          defaults: {
            overwrite: 'auto',
          },

          onComplete: () => {
            completeTimeline(
              timeline,
              motionConfig.reboundEnabled === true ? 'rebound-hold' : 'impact-hold'
            );
          },

          onInterrupt: () => {
            if (activeTimeline === timeline) {
              activeTimeline = null;
            }
          },
        });

        activeTimeline = timeline;

        const canAnticipate =
          motionConfig.anticipationEnabled !== false &&
          !options.skipAnticipation &&
          currentProgress <= motionConfig.anticipationMaxProgress;

        if (canAnticipate) {
          activePhase = 'anticipation';

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

            scaleX: visualScale,
            scaleY: visualScale,

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

          timeline.call(
            () => {
              activePhase = 'strike';
            },
            null,
            '>'
          );
        }

        const remainingDistance = clamp(1 - currentProgress, 0, 1);

        const strikeDuration =
          motionConfig.strikeDurationSeconds ??
          lerp(
            motionConfig.strikeMinDurationSeconds,

            motionConfig.strikeMaxDurationSeconds,

            remainingDistance
          );

        const overshootPose: GavelPose = {
          x: geometry.impact.x + motionConfig.overshootXpx,

          y: geometry.impact.y + motionConfig.overshootYpx,

          rotation: geometry.impact.rotation + motionConfig.overshootRotationDeltaDeg,
        };

        /*
         * Strike to exact contact first.
         * The target reaction starts on this exact frame.
         */
        timeline.to(gavel, {
          x: geometry.impact.x,
          y: geometry.impact.y,
          rotation: geometry.impact.rotation,

          scaleX: visualScale,
          scaleY: visualScale,

          transformOrigin: geometry.transformOrigin,

          duration: duration(strikeDuration),
          ease: motionConfig.strikeEase,

          force3D: QUICK_TUNING.performance.force3D,
        });

        if (castShadow) {
          timeline.to(
            castShadow,
            {
              ...getCastShadowVars(geometry.impact, 'impact'),

              duration: duration(strikeDuration),
              ease: motionConfig.strikeEase,
            },
            '<'
          );
        }

        const contactTime = timeline.duration();

        addContactShadowPreContact(timeline, contactTime);
        timeline.call(
          () => {
            activePhase = 'contact';
          },
          null,
          contactTime
        );

        /*
         * Contact response.
         *
         * Legacy presets use a micro follow-through followed by a settle
         * back onto the impact pose. Rebound presets instead rise away
         * from the hit area, descend into a smaller damped pose, hold,
         * and can then return to rest through the mobile viewport logic.
         */
        const followThroughDuration =
          motionConfig.followThroughEnabled === false
            ? 0
            : (motionConfig.followThroughDurationSeconds ?? 0.028);

        const reboundEnabled = motionConfig.reboundEnabled === true;
        const reboundDuration = reboundEnabled ? (motionConfig.reboundDurationSeconds ?? 0.19) : 0;
        const reboundSettleEnabled = reboundEnabled && motionConfig.reboundSettleEnabled !== false;
        const reboundSettleDuration = reboundSettleEnabled
          ? (motionConfig.reboundSettleDurationSeconds ?? 0.24)
          : 0;

        const finalSettleDuration =
          reboundEnabled || motionConfig.settleEnabled === false
            ? 0
            : motionConfig.settleDurationSeconds;

        const postContactStartTime = contactTime + duration(followThroughDuration);

        const reboundPose: GavelPose = {
          x: geometry.impact.x + (motionConfig.reboundXpx ?? 0),
          y: geometry.impact.y + (motionConfig.reboundYpx ?? 0),
          rotation: geometry.impact.rotation + (motionConfig.reboundRotationDeltaDeg ?? -18),
        };

        const reboundSettlePose: GavelPose = {
          x: geometry.impact.x + (motionConfig.reboundSettleXpx ?? 0),
          y: geometry.impact.y + (motionConfig.reboundSettleYpx ?? 0),
          rotation: geometry.impact.rotation + (motionConfig.reboundSettleRotationDeltaDeg ?? -12),
        };

        if (followThroughDuration > 0) {
          timeline.to(
            gavel,
            {
              ...overshootPose,

              scaleX: visualScale,
              scaleY: visualScale,

              transformOrigin: geometry.transformOrigin,

              duration: duration(followThroughDuration),
              ease: 'power1.out',

              force3D: QUICK_TUNING.performance.force3D,
            },
            contactTime
          );

          timeline.call(
            () => {
              activePhase = 'follow-through';
            },
            null,
            contactTime
          );
        }

        if (reboundDuration > 0) {
          timeline.to(
            gavel,
            {
              ...reboundPose,

              scaleX: visualScale,
              scaleY: visualScale,

              transformOrigin: geometry.transformOrigin,

              duration: duration(reboundDuration),
              ease: motionConfig.reboundEase ?? 'power3.out',

              force3D: QUICK_TUNING.performance.force3D,
            },
            postContactStartTime
          );

          timeline.call(
            () => {
              activePhase = 'rebound';
            },
            null,
            postContactStartTime
          );

          if (reboundSettleDuration > 0) {
            const reboundSettleStartTime = postContactStartTime + duration(reboundDuration);

            timeline.to(
              gavel,
              {
                ...reboundSettlePose,

                scaleX: visualScale,
                scaleY: visualScale,

                transformOrigin: geometry.transformOrigin,

                duration: duration(reboundSettleDuration),
                ease: motionConfig.reboundSettleEase ?? 'power2.inOut',

                force3D: QUICK_TUNING.performance.force3D,
              },
              reboundSettleStartTime
            );

            timeline.call(
              () => {
                activePhase = 'rebound-settle';
              },
              null,
              reboundSettleStartTime
            );
          }
        } else if (finalSettleDuration > 0) {
          timeline.to(
            gavel,
            {
              x: geometry.impact.x,
              y: geometry.impact.y,
              rotation: geometry.impact.rotation,

              scaleX: visualScale,
              scaleY: visualScale,

              transformOrigin: geometry.transformOrigin,

              duration: duration(finalSettleDuration),
              ease: motionConfig.settleEase,

              force3D: QUICK_TUNING.performance.force3D,
            },
            postContactStartTime
          );

          timeline.call(
            () => {
              activePhase = 'settle';
            },
            null,
            postContactStartTime
          );
        }

        addImpactReactionToTimeline(timeline, contactTime);

        /*
         * The cast shadow follows the exact same post-contact path.
         */
        if (castShadow) {
          if (followThroughDuration > 0) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(overshootPose, 'impact'),

                duration: duration(followThroughDuration),
                ease: 'power1.out',
              },
              contactTime
            );
          }

          if (reboundDuration > 0) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(reboundPose, 'rebound'),

                duration: duration(reboundDuration),
                ease: motionConfig.reboundEase ?? 'power3.out',
              },
              postContactStartTime
            );

            if (reboundSettleDuration > 0) {
              timeline.to(
                castShadow,
                {
                  ...getCastShadowVars(reboundSettlePose, 'settle'),

                  duration: duration(reboundSettleDuration),
                  ease: motionConfig.reboundSettleEase ?? 'power2.inOut',
                },
                postContactStartTime + duration(reboundDuration)
              );
            }
          } else if (finalSettleDuration > 0) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(geometry.impact, 'settle'),

                duration: duration(finalSettleDuration),
                ease: motionConfig.settleEase,
              },
              postContactStartTime
            );
          }
        }

        timeline.play(0);
      };

      const animateToRest = (): void => {
        clearReplayTimer();
        killImpactReactionTimeline();

        desiredState = 'rest';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        const currentProgress = getProgress();

        if (currentProgress <= 0.005 && !activeTimeline) {
          setReactionDefaults();
          activePhase = 'rest';
          return;
        }

        killActiveTimeline();
        setWillChange(true);
        activePhase = 'lift';

        const liftDuration =
          motionConfig.liftDurationSeconds ??
          lerp(
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
            completeTimeline(timeline, 'rest');
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

            scaleX: visualScale,
            scaleY: visualScale,

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

        timeline.set(
          [contactShadow, resonance],
          {
            opacity: 0,
            visibility: 'hidden',
          },
          0
        );

        timeline.play(0);
      };

      const setRest = (): void => {
        clearReplayTimer();
        killImpactReactionTimeline();

        desiredState = 'rest';
        activePhase = 'rest';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        killActiveTimeline();
        setReactionDefaults();

        gsap.set(gavel, {
          x: geometry.rest.x,
          y: geometry.rest.y,

          rotation: geometry.rest.rotation,

          scaleX: visualScale,
          scaleY: visualScale,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        setWillChange(false);
      };

      const setImpact = (): void => {
        clearReplayTimer();
        killImpactReactionTimeline();

        desiredState = 'impact';
        activePhase = 'impact-hold';

        if (!ensureGeometry() || !geometry) {
          return;
        }

        killActiveTimeline();
        setReactionDefaults();

        gsap.set(gavel, {
          x: geometry.impact.x,
          y: geometry.impact.y,

          rotation: geometry.impact.rotation,

          scaleX: visualScale,
          scaleY: visualScale,

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

      const refreshNow = (): void => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = 0;

        const preservedProgress = getProgress();
        const preservedState = desiredState;
        const preservedPhase = activePhase;

        killActiveTimeline();
        killImpactReactionTimeline();

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

        setReactionDefaults();
        renderControllerDebug();

        const shouldPreserveReboundHold =
          preservedState === 'impact' &&
          motionConfig.reboundEnabled === true &&
          (preservedPhase === 'rebound-hold' || preservedPhase === 'rebound-settle');

        const preservedPose = shouldPreserveReboundHold
          ? (getPostImpactHoldPose() ?? interpolatePose(preservedProgress))
          : interpolatePose(preservedProgress);

        gsap.set(gavel, {
          x: preservedPose.x,
          y: preservedPose.y,

          rotation: preservedPose.rotation,

          scaleX: visualScale,
          scaleY: visualScale,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        if (castShadow) {
          gsap.set(
            castShadow,
            getCastShadowVars(preservedPose, preservedState === 'impact' ? 'settle' : 'rest')
          );
        }

        if (shouldPreserveReboundHold) {
          activePhase = 'rebound-hold';
          setWillChange(false);
        } else if (preservedState === 'impact' && preservedProgress >= 0.995) {
          setImpact();
        } else if (preservedState === 'rest' && preservedProgress <= 0.005) {
          setRest();
        } else {
          activePhase = preservedState === 'impact' ? 'impact-hold' : 'rest';
          setWillChange(false);
        }
      };

      const scheduleRefresh = (): void => {
        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(() => {
          refreshNow();
        });
      };

      const kill = (): void => {
        cancelAnimationFrame(resizeFrame);
        clearReplayTimer();

        killActiveTimeline();
        killImpactReactionTimeline();
        activePhase = 'killed';

        removeDebug(component, gavel, target);

        setWillChange(false);

        gsap.set(
          [gavel, castShadow, dust, contactShadow, resonance, target, shadow].filter(Boolean),
          {
            clearProps: 'transform,transformOrigin,willChange,opacity,visibility',
          }
        );
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

          scaleX: visualScale,
          scaleY: visualScale,

          transformOrigin: geometry.transformOrigin,

          force3D: QUICK_TUNING.performance.force3D,
        });

        renderControllerDebug();
      }

      activePhase = 'rest';

      const replay = (options: GavelPlayOptions = {}): void => {
        clearReplayTimer();

        if (!ensureGeometry()) {
          return;
        }

        if (getProgress() > 0.005 || activeTimeline) {
          animateToRest();

          const liftDuration = duration(
            motionConfig.liftDurationSeconds ?? motionConfig.liftMaxDurationSeconds
          );

          replayTimer = window.setTimeout(
            () => {
              replayTimer = null;
              animateToImpact({ ...options, force: true });
            },
            liftDuration * 1000 + 32
          );

          return;
        }

        animateToImpact({ ...options, force: true });
      };

      const reset = (options: GavelResetOptions = {}): void => {
        clearReplayTimer();
        killActiveTimeline();
        killImpactReactionTimeline();

        if (options.initialState === 'impact') {
          setImpact();
          return;
        }

        setRest();
      };

      return {
        moveToImpact: (options = {}) => {
          animateToImpact(options);
        },

        moveToRest: () => {
          animateToRest();
        },

        playImpactSequence: (options = {}) => {
          animateToImpact(options);
        },

        playImpactReaction,
        resetImpactReaction,
        scrubToProgress,

        replay,
        reset,

        setRest,
        setImpact,

        refresh: scheduleRefresh,
        refreshNow,
        scheduleRefresh,

        geometry: () => geometry,

        progress: getProgress,

        desiredState: () => desiredState,
        isAnimating: () => Boolean(activeTimeline || impactReactionTimeline),
        activePhase: () => activePhase,
        state: () => {
          const mobileState = mobileStateReader?.() ?? {
            mobileStatus: null,
            hasPlayed: null,
            isInside: null,
          };

          return {
            mode,
            desiredState,
            progress: getProgress(),
            mobileStatus: mobileState.mobileStatus,
            hasPlayed: mobileState.hasPlayed,
            isInside: mobileState.isInside,
            activePreset: activePresetName,
          };
        },
        setMobileStateReader: (reader) => {
          mobileStateReader = reader;
        },

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

    /*
     * Webflow can add overflow/clip rules to any wrapper above the gavel.
     * Hard-coding a short class list proved fragile because the actual mobile
     * ancestor chain also includes padding-global, container-large,
     * content-wrapper and practices_group. Mark the real ancestor chain at
     * runtime so CSS can unlock only the wrappers that can clip this visual.
     *
     * Reference counts keep this safe if more than one gavel instance shares
     * an ancestor or if Webflow reinitializes the component.
     */
    const overflowSafeClass = 'tsa-gavel-overflow-safe';
    const overflowSafeRefCounts = new Map<HTMLElement, number>();

    const markOverflowSafeAncestors = (component: HTMLElement): (() => void) => {
      const marked: HTMLElement[] = [];
      let element: HTMLElement | null = component;

      while (element && element !== document.body && element !== document.documentElement) {
        const currentCount = overflowSafeRefCounts.get(element) ?? 0;

        overflowSafeRefCounts.set(element, currentCount + 1);
        element.classList.add(overflowSafeClass);
        marked.push(element);

        element = element.parentElement;
      }

      return () => {
        marked.forEach((markedElement) => {
          const nextCount = (overflowSafeRefCounts.get(markedElement) ?? 1) - 1;

          if (nextCount <= 0) {
            overflowSafeRefCounts.delete(markedElement);
            markedElement.classList.remove(overflowSafeClass);
            return;
          }

          overflowSafeRefCounts.set(markedElement, nextCount);
        });
      };
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

      const localCleanup: Array<() => void> = [];

      /* Apply before geometry is measured so native Safari and desktop use
       * the same unclipped coordinate space from the first rendered frame. */
      localCleanup.push(markOverflowSafeAncestors(component));

      const contactShadowLayer = ensureGeneratedEffect({
        component,
        selector: SELECTORS.contactShadow,
        attributeName: 'data-gavel-contact-shadow',
      });

      const resonanceLayer = ensureGeneratedEffect({
        component,
        selector: SELECTORS.resonance,
        attributeName: 'data-gavel-resonance',
        className: 'tsa-gavel-resonance',
      });

      if (contactShadowLayer.createdByScript) {
        localCleanup.push(() => {
          contactShadowLayer.element.remove();
        });
      }

      if (resonanceLayer.createdByScript) {
        localCleanup.push(() => {
          resonanceLayer.element.remove();
        });
      }

      const preset = getActivePreset();
      const impactEffects = preset.impactEffects ?? QUICK_TUNING.impactEffects;

      const media = gsap.matchMedia();

      media.add(DESKTOP_QUERY, () => {
        const deviceProfile = preset.desktop;

        const controller = createController({
          mode: 'desktop',
          component,
          gavel,
          castShadow,
          dust,
          contactShadow: contactShadowLayer.element,
          resonance: resonanceLayer.element,
          target,
          shadow,

          geometryConfig: getGeometryConfig('desktop', deviceProfile),

          deviceProfile,

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
                controller.scheduleRefresh();
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
        const { mobile: deviceProfile, mobileViewport } = preset;

        const controller = createController({
          mode: 'mobile',
          component,
          gavel,
          castShadow,
          dust,
          contactShadow: contactShadowLayer.element,
          resonance: resonanceLayer.element,
          target,
          shadow,

          geometryConfig: getGeometryConfig('mobile', deviceProfile),

          deviceProfile,

          impactEffects,
        });

        const instance: GavelInstance = {
          scope,
          mode: 'mobile',
          controller,
        };

        registerInstance(instance);

        const mobileState: GavelMobileRuntimeState = {
          status: 'uninitialized',
          hasPlayed: false,
          isInside: false,
          enteredFrom: null,
          lastPlayTimestamp: 0,
          entryDelayTimer: null,
          returnTimer: null,
          resetTimer: null,
          isRefreshing: false,
          isDestroyed: false,
        };

        controller.setMobileStateReader(() => ({
          mobileStatus: mobileState.status,
          hasPlayed: mobileState.hasPlayed,
          isInside: mobileState.isInside,
        }));

        let scrollRefreshFrame = 0;
        let initialVisibilityFrame = 0;

        const durationMultiplier = QUICK_TUNING.debug.enabled
          ? QUICK_TUNING.debug.slowMotionMultiplier
          : 1;

        const setMobileStatus = (status: GavelMobileEntryState): void => {
          if (mobileState.status === status) {
            return;
          }

          mobileState.status = status;

          if (QUICK_TUNING.debug.enabled && QUICK_TUNING.debug.logStateChanges) {
            console.info('[TSA Gavel] Mobile state:', status);
          }
        };

        const clearTimer = (key: 'entryDelayTimer' | 'returnTimer' | 'resetTimer'): void => {
          const timer = mobileState[key];

          if (timer === null) {
            return;
          }

          window.clearTimeout(timer);
          mobileState[key] = null;
        };

        const cancelMobileTimers = (): void => {
          clearTimer('entryDelayTimer');
          clearTimer('returnTimer');
          clearTimer('resetTimer');
        };

        const scheduleScrollTriggerRefresh = (): void => {
          cancelAnimationFrame(scrollRefreshFrame);

          scrollRefreshFrame = requestAnimationFrame(() => {
            scrollRefreshFrame = 0;
            ScrollTrigger.refresh();
          });
        };

        const getImpactSequenceDurationMs = (): number => {
          const { motion } = deviceProfile;
          const targetEffect = getTargetImpactEffect(impactEffects.target, 'mobile');
          const contactShadowEffect = impactEffects.contactShadow;
          const dustEffect = impactEffects.dust;
          const resonanceEffect = impactEffects.resonance;

          const postContactMotionDuration =
            motion.reboundEnabled === true
              ? (motion.reboundDurationSeconds ?? 0.19) +
                (motion.reboundSettleEnabled === false
                  ? 0
                  : (motion.reboundSettleDurationSeconds ?? 0.24))
              : motion.settleEnabled === false
                ? 0
                : motion.settleDurationSeconds;

          const motionDuration =
            (motion.anticipationEnabled === false ? 0 : motion.anticipationDurationSeconds) +
            (motion.strikeDurationSeconds ?? motion.strikeMaxDurationSeconds) +
            (motion.followThroughEnabled === false
              ? 0
              : (motion.followThroughDurationSeconds ?? 0.028)) +
            postContactMotionDuration;

          const targetDuration =
            targetEffect.enabled === false
              ? 0
              : targetEffect.compressionDurationSeconds +
                (targetEffect.recoilEnabled === false ? 0 : targetEffect.recoilDurationSeconds) +
                targetEffect.settleDurationSeconds;

          const contactShadowDuration =
            contactShadowEffect.enabled === false
              ? 0
              : contactShadowEffect.contactDurationSeconds +
                contactShadowEffect.recoilDurationSeconds +
                contactShadowEffect.fadeDurationSeconds;

          const dustDuration =
            !dust || dustEffect.enabled === false
              ? 0
              : dustEffect.revealDurationSeconds + dustEffect.fadeDurationSeconds;

          const resonanceDuration = resonanceEffect.enabled
            ? (resonanceEffect.revealDurationSeconds ?? 0) +
              (resonanceEffect.fadeDurationSeconds ?? resonanceEffect.durationSeconds)
            : 0;

          const broadShadowDuration =
            impactEffects.broadShadow.enabled === false
              ? 0
              : impactEffects.broadShadow.compressionDurationSeconds +
                impactEffects.broadShadow.recoveryDurationSeconds;

          return (
            Math.max(
              motionDuration,
              targetDuration,
              contactShadowDuration,
              dustDuration,
              resonanceDuration,
              broadShadowDuration
            ) *
              durationMultiplier *
              1000 +
            48
          );
        };

        const getLiftDurationMs = (): number => {
          const { motion } = deviceProfile;
          return (
            (motion.liftDurationSeconds ?? motion.liftMaxDurationSeconds) *
              durationMultiplier *
              1000 +
            48
          );
        };

        const isComponentVisible = (): boolean => {
          const rect = component.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

          return rect.top < viewportHeight && rect.bottom > 0;
        };

        const canReplayMobileEntry = (allowWaiting = false): boolean => {
          if (mobileViewport.replayMode === 'manual') {
            return false;
          }

          if (mobileState.status === 'waiting') {
            return allowWaiting;
          }

          if (mobileState.status === 'playing' || mobileState.status === 'returning') {
            return false;
          }

          const elapsed = window.performance.now() - mobileState.lastPlayTimestamp;
          const cooldownElapsed = elapsed >= mobileViewport.minimumReplayIntervalSeconds * 1000;

          if (!cooldownElapsed && mobileState.lastPlayTimestamp > 0) {
            return false;
          }

          if (mobileViewport.replayMode === 'once') {
            return !mobileState.hasPlayed;
          }

          return !mobileState.hasPlayed || mobileState.status === 'outside';
        };

        const startReturnToRest = (): void => {
          if (mobileState.isDestroyed) {
            return;
          }

          clearTimer('returnTimer');
          setMobileStatus('returning');
          controller.moveToRest();

          mobileState.returnTimer = window.setTimeout(() => {
            mobileState.returnTimer = null;

            if (mobileState.isDestroyed) {
              return;
            }

            setMobileStatus(mobileState.isInside ? 'completed' : 'outside');
          }, getLiftDurationMs());
        };

        const completeMobileImpact = (): void => {
          if (mobileState.isDestroyed) {
            return;
          }

          if (!mobileState.isInside && !mobileViewport.finishCurrentAnimationOnLeave) {
            setMobileStatus('outside');
            return;
          }

          setMobileStatus('holding');

          if (mobileViewport.finalState !== 'auto-return') {
            return;
          }

          clearTimer('returnTimer');

          mobileState.returnTimer = window.setTimeout(
            () => {
              mobileState.returnTimer = null;
              startReturnToRest();
            },
            (mobileViewport.holdAtImpactSeconds + mobileViewport.autoReturnDelaySeconds) * 1000
          );
        };

        const scheduleMobileEntry = (
          direction: GavelMobileEntryDirection,
          isInitialLoad = false
        ): void => {
          mobileState.isInside = true;
          mobileState.enteredFrom = direction;

          if (!mobileViewport.enabled || mobileState.isDestroyed) {
            return;
          }

          if (mobileState.isRefreshing && mobileViewport.preventRefreshPlayback) {
            return;
          }

          if (!isInitialLoad) {
            if (direction === 'below' && !mobileViewport.playOnEnter) {
              return;
            }

            if (direction === 'above' && !mobileViewport.playOnEnterBack) {
              return;
            }
          }

          if (!canReplayMobileEntry()) {
            return;
          }

          cancelMobileTimers();
          setMobileStatus('waiting');

          mobileState.entryDelayTimer = window.setTimeout(() => {
            mobileState.entryDelayTimer = null;

            if (
              mobileState.isDestroyed ||
              (mobileState.isRefreshing && mobileViewport.preventRefreshPlayback)
            ) {
              return;
            }

            if (!mobileState.isInside && !mobileViewport.finishCurrentAnimationOnLeave) {
              setMobileStatus('outside');
              return;
            }

            if (!canReplayMobileEntry(true)) {
              return;
            }

            setMobileStatus('playing');
            mobileState.hasPlayed = true;
            mobileState.lastPlayTimestamp = window.performance.now();

            controller.playImpactSequence({ force: true });

            mobileState.returnTimer = window.setTimeout(() => {
              mobileState.returnTimer = null;
              completeMobileImpact();
            }, getImpactSequenceDurationMs());
          }, mobileViewport.entryDelaySeconds * 1000);
        };

        const shouldResetForLeave = (position: GavelMobileEntryDirection): boolean => {
          return (
            mobileViewport.resetWhenFullyOutside &&
            (mobileViewport.resetPosition === 'either' || mobileViewport.resetPosition === position)
          );
        };

        const rearmReplayIfAllowed = (): void => {
          if (
            mobileViewport.replayMode === 'once-per-entry' ||
            mobileViewport.replayMode === 'on-enter-and-enter-back'
          ) {
            mobileState.hasPlayed = false;
          }
        };

        const handleMobileLeave = (position: GavelMobileEntryDirection): void => {
          mobileState.isInside = false;

          if (mobileState.status === 'waiting' && !mobileViewport.finishCurrentAnimationOnLeave) {
            clearTimer('entryDelayTimer');
            setMobileStatus('outside');
          }

          if (mobileViewport.finalState === 'return-on-leave') {
            if (mobileState.status === 'playing' && mobileViewport.reverseOnLeave) {
              cancelMobileTimers();
              startReturnToRest();
            } else if (
              mobileState.status === 'playing' &&
              mobileViewport.finishCurrentAnimationOnLeave
            ) {
              clearTimer('returnTimer');
              mobileState.returnTimer = window.setTimeout(() => {
                mobileState.returnTimer = null;
                startReturnToRest();
              }, getImpactSequenceDurationMs());
            } else if (mobileState.status === 'holding' || mobileState.status === 'completed') {
              startReturnToRest();
            }
          }

          if (shouldResetForLeave(position)) {
            clearTimer('resetTimer');
            mobileState.resetTimer = window.setTimeout(() => {
              mobileState.resetTimer = null;

              if (mobileState.isDestroyed || mobileState.isInside) {
                return;
              }

              controller.reset({
                initialState: mobileViewport.initialState,
                resetMobileReplay: true,
              });
              rearmReplayIfAllowed();
              setMobileStatus('outside');
            }, mobileViewport.resetDelaySeconds * 1000);
          } else {
            rearmReplayIfAllowed();
            setMobileStatus('outside');
          }
        };

        const beginSilentRefresh = (): void => {
          mobileState.isRefreshing = true;

          if (mobileViewport.refreshSilently) {
            controller.refreshNow();
          }
        };

        const finishSilentRefresh = (isActive?: boolean): void => {
          mobileState.isRefreshing = false;
          mobileState.isInside = Boolean(isActive);

          if (mobileState.status === 'uninitialized') {
            setMobileStatus('ready');
            return;
          }

          if (!mobileState.isInside && mobileState.status !== 'returning') {
            setMobileStatus('outside');
          }
        };

        controller.reset({
          initialState: mobileViewport.initialState,
          resetMobileReplay: false,
        });
        setMobileStatus('ready');

        const baseReset = controller.reset;
        controller.reset = (options = {}) => {
          baseReset(options);

          if (options.resetMobileReplay !== false) {
            mobileState.hasPlayed = false;
            mobileState.lastPlayTimestamp = 0;
          }
        };

        if (mobileViewport.playback === 'scrub') {
          let scrubImpactPlayed = false;

          const canPlayScrubImpact = (): boolean => {
            if (mobileViewport.replayMode === 'manual') {
              return false;
            }

            if (mobileViewport.replayMode === 'once' && mobileState.hasPlayed) {
              return false;
            }

            const elapsed = window.performance.now() - mobileState.lastPlayTimestamp;
            return (
              mobileState.lastPlayTimestamp === 0 ||
              elapsed >= mobileViewport.minimumReplayIntervalSeconds * 1000
            );
          };

          const resetScrubImpact = (): void => {
            if (!scrubImpactPlayed) {
              return;
            }

            scrubImpactPlayed = false;

            if (mobileViewport.replayMode !== 'once') {
              mobileState.hasPlayed = false;
            }

            controller.resetImpactReaction();
          };

          const handleScrubUpdate = (self: GavelScrollTriggerSelf): void => {
            if (!mobileViewport.enabled || mobileState.isDestroyed) {
              return;
            }

            const progress = clamp(self.progress ?? 0, 0, 1);
            const isInside = Boolean(self.isActive) || (progress > 0 && progress < 1);

            mobileState.isInside = isInside;

            if (mobileState.isRefreshing && mobileViewport.preventRefreshPlayback) {
              controller.scrubToProgress(progress);
              return;
            }

            controller.scrubToProgress(progress);

            if (progress < mobileViewport.scrubResetThreshold) {
              resetScrubImpact();

              if (isInside) {
                setMobileStatus('scrubbing');
              }
            }

            if (
              progress >= mobileViewport.scrubImpactThreshold &&
              !scrubImpactPlayed &&
              canPlayScrubImpact()
            ) {
              scrubImpactPlayed = true;
              mobileState.hasPlayed = true;
              mobileState.lastPlayTimestamp = window.performance.now();
              setMobileStatus('holding');
              controller.playImpactReaction();
              return;
            }

            if (isInside && mobileState.status !== 'holding') {
              setMobileStatus('scrubbing');
            } else if (!isInside && mobileState.status !== 'holding') {
              setMobileStatus('outside');
            }
          };

          const scrollTrigger = ScrollTrigger.create({
            trigger: component,

            start: mobileViewport.start,
            end: mobileViewport.end,

            scrub:
              mobileViewport.scrubSmoothingSeconds > 0
                ? mobileViewport.scrubSmoothingSeconds
                : true,

            markers: mobileViewport.markers || QUICK_TUNING.debug.markers,
            invalidateOnRefresh: true,

            onUpdate: handleScrubUpdate,

            onEnter: () => {
              mobileState.isInside = true;
              setMobileStatus('scrubbing');
            },

            onEnterBack: () => {
              mobileState.isInside = true;
              setMobileStatus('scrubbing');
            },

            onLeave: () => {
              mobileState.isInside = false;
              setMobileStatus('outside');
            },

            onLeaveBack: () => {
              mobileState.isInside = false;
              resetScrubImpact();
              setMobileStatus('outside');
            },

            onRefreshInit: () => {
              beginSilentRefresh();
            },

            onRefresh: (self: GavelScrollTriggerSelf) => {
              finishSilentRefresh(self.isActive);
              handleScrubUpdate(self);
            },
          });

          const resizeObserver =
            QUICK_TUNING.performance.useResizeObserver && typeof ResizeObserver !== 'undefined'
              ? new ResizeObserver(() => {
                  controller.scheduleRefresh();
                  scheduleScrollTriggerRefresh();
                })
              : null;

          resizeObserver?.observe(component);

          scheduleScrollTriggerRefresh();

          return () => {
            cancelAnimationFrame(scrollRefreshFrame);
            cancelAnimationFrame(initialVisibilityFrame);
            mobileState.isDestroyed = true;
            setMobileStatus('destroyed');
            cancelMobileTimers();

            scrollTrigger.kill();
            resizeObserver?.disconnect();
            controller.setMobileStateReader(null);

            controller.kill();
            removeInstance(instance);
          };
        }

        const scrollTrigger = ScrollTrigger.create({
          trigger: component,

          start: mobileViewport.start,
          end: mobileViewport.end,

          markers: mobileViewport.markers || QUICK_TUNING.debug.markers,
          invalidateOnRefresh: true,

          onEnter: () => {
            scheduleMobileEntry('below');
          },

          onEnterBack: () => {
            scheduleMobileEntry('above');
          },

          onLeave: () => {
            handleMobileLeave('above');
          },

          onLeaveBack: () => {
            handleMobileLeave('below');
          },

          onRefreshInit: () => {
            beginSilentRefresh();
          },

          onRefresh: (self: GavelScrollTriggerSelf) => {
            finishSilentRefresh(self.isActive);
          },
        });

        const resizeObserver =
          QUICK_TUNING.performance.useResizeObserver && typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => {
                controller.scheduleRefresh();
                scheduleScrollTriggerRefresh();
              })
            : null;

        resizeObserver?.observe(component);

        scheduleScrollTriggerRefresh();

        if (mobileViewport.playOnInitialLoadIfVisible && mobileViewport.replayMode !== 'manual') {
          initialVisibilityFrame = requestAnimationFrame(() => {
            initialVisibilityFrame = requestAnimationFrame(() => {
              initialVisibilityFrame = 0;

              if (mobileState.isDestroyed || mobileState.isRefreshing || !isComponentVisible()) {
                return;
              }

              scheduleMobileEntry('below', true);
            });
          });
        }

        return () => {
          cancelAnimationFrame(scrollRefreshFrame);
          cancelAnimationFrame(initialVisibilityFrame);
          mobileState.isDestroyed = true;
          setMobileStatus('destroyed');
          cancelMobileTimers();

          scrollTrigger.kill();
          resizeObserver?.disconnect();
          controller.setMobileStateReader(null);

          controller.kill();
          removeInstance(instance);
        };
      });

      media.add(REDUCED_MOTION_QUERY, () => {
        removeDebug(component, gavel, target);

        gsap.set(
          [
            gavel,
            castShadow,
            dust,
            contactShadowLayer.element,
            resonanceLayer.element,
            target,
            shadow,
          ].filter(Boolean),
          {
            clearProps: 'transform,transformOrigin,willChange,opacity',
          }
        );

        gsap.set([dust, contactShadowLayer.element, resonanceLayer.element].filter(Boolean), {
          opacity: 0,
          visibility: 'hidden',
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
                instance.controller.scheduleRefresh();
              });

            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
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
        instances[index]?.controller.playImpactSequence({ manual: true });
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

      replay: (index = 0) => {
        instances[index]?.controller.replay({ manual: true, force: true });
      },

      reset: (index = 0) => {
        instances[index]?.controller.reset({ resetMobileReplay: true });
      },

      refresh: (index = 0) => {
        instances[index]?.controller.refresh();
      },

      refreshAll: () => {
        instances.forEach((instance) => {
          instance.controller.scheduleRefresh();
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      },

      geometry: (index = 0) => {
        const geometry = instances[index]?.controller.geometry() || null;

        console.log(`[TSA Gavel] Geometry, preset ${activePresetName}`, geometry);

        return geometry;
      },

      progress: (index = 0) => {
        return instances[index]?.controller.progress() || 0;
      },

      desiredState: (index = 0) => {
        return instances[index]?.controller.desiredState() || null;
      },

      state: (index = 0) => {
        return instances[index]?.controller.state() || null;
      },

      usePreset: (presetName: GavelPresetName): boolean => {
        if (!Object.prototype.hasOwnProperty.call(presetDefinitions, presetName)) {
          console.warn('[TSA Gavel] Preset invalid.', presetName);

          console.info('[TSA Gavel] Preseturi disponibile:', Object.keys(presetDefinitions));

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
          `[TSA Gavel] Preset activ: ${presetName}, ` + presetDefinitions[presetName].label
        );

        return true;
      },

      previewPreset: (presetName: GavelPresetName, index = 0): boolean => {
        if (!runtimeWindow.TSAGavel?.usePreset(presetName)) {
          return false;
        }

        const instance = instances[index];

        if (!instance) {
          return false;
        }

        instance.controller.reset({ initialState: 'rest', resetMobileReplay: true });

        requestAnimationFrame(() => {
          instance.controller.playImpactSequence({ manual: true, force: true });
        });

        return true;
      },

      currentPreset: () => {
        console.info(`[TSA Gavel] Preset activ: ${activePresetName}, ` + getActivePreset().label);

        return activePresetName;
      },

      listPresets: () => {
        const names = Object.keys(presetDefinitions) as GavelPresetName[];

        console.table(
          names.map((name) => ({
            preset: name,
            label: presetDefinitions[name].label,
            description: presetDefinitions[name].description ?? resolvePreset(name).description,
          }))
        );

        return names;
      },

      describePreset: (presetName: GavelPresetName) => {
        if (!Object.prototype.hasOwnProperty.call(presetDefinitions, presetName)) {
          console.warn('[TSA Gavel] Preset invalid.', presetName);

          return null;
        }

        const definition = presetDefinitions[presetName];

        return {
          label: definition.label,
          description: definition.description ?? resolvePreset(presetName).description,
          overrides: {
            desktop: definition.desktop,
            mobile: definition.mobile,
            mobileViewport: definition.mobileViewport,
            impactEffects: definition.impactEffects,
          },
        };
      },

      config: () => QUICK_TUNING,

      destroyAll,
    };

    initializeAll();
  });
}
