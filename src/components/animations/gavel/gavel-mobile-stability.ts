const SAFE_COMPLETION_WINDOW_SECONDS = 1.8;

type MobileViewportConfig = {
  resetDelaySeconds: number;
  minimumReplayIntervalSeconds: number;
};

type GavelConfig = {
  interaction: {
    mobileViewport: MobileViewportConfig;
  };
};

type GavelApi = {
  config: () => GavelConfig;
  currentPreset: () => string;
  usePreset: (preset: string) => boolean;
};

type StabilityWindow = Window & {
  Webflow?: Array<() => void>;
  TSAGavel?: GavelApi;
};

export function initGavelMobileStability(): void {
  const runtimeWindow = window as StabilityWindow;

  runtimeWindow.Webflow ||= [];
  runtimeWindow.Webflow.push(() => {
    const api = runtimeWindow.TSAGavel;

    if (!api) {
      return;
    }

    const config = api.config();
    const mobileViewport = config.interaction.mobileViewport;
    const nextResetDelay = Math.max(
      mobileViewport.resetDelaySeconds,
      SAFE_COMPLETION_WINDOW_SECONDS
    );
    const nextReplayInterval = Math.max(
      mobileViewport.minimumReplayIntervalSeconds,
      SAFE_COMPLETION_WINDOW_SECONDS
    );

    if (
      nextResetDelay === mobileViewport.resetDelaySeconds &&
      nextReplayInterval === mobileViewport.minimumReplayIntervalSeconds
    ) {
      return;
    }

    mobileViewport.resetDelaySeconds = nextResetDelay;
    mobileViewport.minimumReplayIntervalSeconds = nextReplayInterval;

    api.usePreset(api.currentPreset());
  });
}
