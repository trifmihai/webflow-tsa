export const COOKIE_CONSENT_SETTINGS = {
  measurementId: 'G-T92PMV2QH8',
  storageKey: 'tsa_cookie_consent_v1',
  storageVersion: 1,
  consentLifetimeDays: 180,
  initializedAttribute: 'tsaCookieConsentReady',
  rootSelector: '[data-tsa-cookie-consent]',
  externalSettingsSelector: '[data-cookie-settings]',
  analyticsScriptAttribute: 'data-tsa-google-analytics',
  policyUrl: '/politica-de-cookies',
} as const;

type ConsentChoice = 'accepted' | 'rejected';
type ConsentSource = 'banner' | 'settings' | 'api' | 'stored';

type StoredConsent = {
  choice: ConsentChoice;
  expiresAt: number;
  updatedAt: number;
  version: number;
};

type ConsentChangeDetail = {
  choice: ConsentChoice;
  source: ConsentSource;
};

type CookieConsentApi = {
  accept: () => void;
  getState: () => ConsentChoice | null;
  open: () => void;
  reject: () => void;
  reset: () => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    tsaCookieConsent?: CookieConsentApi;
  }
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const GA_COOKIE_NAME = /^_(?:ga|gid|gat)(?:_|$)/;

let consentDefaultsQueued = false;
let analyticsConfigured = false;
let analyticsScriptPromise: Promise<void> | null = null;

function getGtag(): (...args: unknown[]) => void {
  window.dataLayer ??= [];

  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  return window.gtag;
}

function setAnalyticsDisabled(disabled: boolean): void {
  Reflect.set(window, `ga-disable-${COOKIE_CONSENT_SETTINGS.measurementId}`, disabled);
}

export function prepareGoogleConsentDefaults(): void {
  if (consentDefaultsQueued) return;

  const gtag = getGtag();

  gtag('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  });
  gtag('set', 'ads_data_redaction', true);

  setAnalyticsDisabled(true);
  consentDefaultsQueued = true;
}

function updateGoogleConsent(choice: ConsentChoice): void {
  const gtag = getGtag();
  const analyticsStorage = choice === 'accepted' ? 'granted' : 'denied';

  gtag('consent', 'update', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: analyticsStorage,
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  });
}

function hasAnalyticsScript(): boolean {
  const { measurementId, analyticsScriptAttribute } = COOKIE_CONSENT_SETTINGS;

  return Boolean(
    document.querySelector(
      `script[${analyticsScriptAttribute}], script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
    )
  );
}

function appendAnalyticsScript(): Promise<void> {
  if (analyticsScriptPromise) return analyticsScriptPromise;

  if (hasAnalyticsScript()) {
    analyticsScriptPromise = Promise.resolve();
    return analyticsScriptPromise;
  }

  analyticsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      COOKIE_CONSENT_SETTINGS.measurementId
    )}`;
    script.referrerPolicy = 'strict-origin-when-cross-origin';
    script.setAttribute(COOKIE_CONSENT_SETTINGS.analyticsScriptAttribute, 'true');
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => {
        analyticsScriptPromise = null;
        reject(new Error('Google Analytics could not be loaded.'));
      },
      { once: true }
    );

    document.head.appendChild(script);
  });

  return analyticsScriptPromise;
}

function enableAnalytics(sendPageView = true): void {
  prepareGoogleConsentDefaults();
  setAnalyticsDisabled(false);
  updateGoogleConsent('accepted');

  const gtag = getGtag();
  const analyticsWasConfigured = analyticsConfigured;
  const analyticsScriptAlreadyPresent = hasAnalyticsScript();

  if (!analyticsWasConfigured && !analyticsScriptAlreadyPresent) {
    gtag('js', new Date());
    gtag('config', COOKIE_CONSENT_SETTINGS.measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      cookie_expires: COOKIE_CONSENT_SETTINGS.consentLifetimeDays * 24 * 60 * 60,
      cookie_update: true,
      send_page_view: sendPageView,
    });
    analyticsConfigured = true;
  } else if (sendPageView) {
    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title,
    });
    analyticsConfigured = true;
  }

  void appendAnalyticsScript().catch((error: unknown) => {
    document.dispatchEvent(new CustomEvent('tsa:analytics-load-error', { detail: { error } }));
  });
}

function getCookieDomains(): string[] {
  const hostname = window.location.hostname.toLowerCase();
  const baseHostname = hostname.replace(/^www\./, '');

  return Array.from(
    new Set(['', hostname, `.${hostname}`, baseHostname, `.${baseHostname}`].filter(Boolean))
  );
}

function isGoogleAnalyticsCookieName(name: string): boolean {
  try {
    return GA_COOKIE_NAME.test(decodeURIComponent(name));
  } catch {
    return GA_COOKIE_NAME.test(name);
  }
}

function deleteGoogleAnalyticsCookies(): void {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name): name is string => Boolean(name && isGoogleAnalyticsCookieName(name)));

  const domains = getCookieDomains();

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;

    domains.forEach((domain) => {
      if (!domain) return;
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}; SameSite=Lax`;
    });
  });
}

function disableAnalytics(): void {
  prepareGoogleConsentDefaults();
  updateGoogleConsent('rejected');
  setAnalyticsDisabled(true);
  deleteGoogleAnalyticsCookies();
}

function isStoredConsent(value: unknown): value is StoredConsent {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<StoredConsent>;

  return (
    (candidate.choice === 'accepted' || candidate.choice === 'rejected') &&
    typeof candidate.expiresAt === 'number' &&
    typeof candidate.updatedAt === 'number' &&
    candidate.version === COOKIE_CONSENT_SETTINGS.storageVersion
  );
}

function readStoredConsent(): StoredConsent | null {
  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_SETTINGS.storageKey);
    if (!rawValue) return null;

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!isStoredConsent(parsedValue) || parsedValue.expiresAt <= Date.now()) {
      window.localStorage.removeItem(COOKIE_CONSENT_SETTINGS.storageKey);
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

function storeConsent(choice: ConsentChoice): void {
  const updatedAt = Date.now();
  const storedConsent: StoredConsent = {
    choice,
    expiresAt: updatedAt + COOKIE_CONSENT_SETTINGS.consentLifetimeDays * DAY_IN_MS,
    updatedAt,
    version: COOKIE_CONSENT_SETTINGS.storageVersion,
  };

  try {
    window.localStorage.setItem(COOKIE_CONSENT_SETTINGS.storageKey, JSON.stringify(storedConsent));
  } catch {
    // The current page still respects the choice when storage is unavailable.
  }
}

function clearStoredConsent(): void {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_SETTINGS.storageKey);
  } catch {
    // Nothing else is required when storage is unavailable.
  }
}

function dispatchConsentChange(choice: ConsentChoice, source: ConsentSource): void {
  const detail: ConsentChangeDetail = { choice, source };

  document.dispatchEvent(
    new CustomEvent<ConsentChangeDetail>('tsa:cookie-consent-change', {
      detail,
    })
  );
}

function createBanner(): HTMLElement {
  const root = document.createElement('div');

  root.className = 'tsa-cookie-consent';
  root.dataset.tsaCookieConsent = 'true';
  root.dataset.state = 'closed';
  root.hidden = true;
  root.innerHTML = `
    <section
      id="tsa-cookie-consent-dialog"
      class="tsa-cookie-consent__panel"
      role="dialog"
      aria-labelledby="tsa-cookie-consent-title"
      aria-describedby="tsa-cookie-consent-description"
      aria-modal="false"
      tabindex="-1"
    >
      <div class="tsa-cookie-consent__copy">
        <p class="tsa-cookie-consent__eyebrow">CONFIDENȚIALITATE</p>
        <h2 class="tsa-cookie-consent__title" id="tsa-cookie-consent-title">
          Analytics, doar cu acordul tău.
        </h2>
        <p class="tsa-cookie-consent__description" id="tsa-cookie-consent-description">
          Folosim Google Analytics doar cu acordul tău, pentru a înțelege cum este utilizat site-ul și pentru a-l îmbunătăți. Cookie-urile strict necesare rămân active.
          <a href="${COOKIE_CONSENT_SETTINGS.policyUrl}">Politica de cookies</a>
        </p>
      </div>
      <div class="tsa-cookie-consent__actions" aria-label="Opțiuni cookie">
        <button class="tsa-cookie-consent__button" type="button" data-cookie-reject>
          Refuză Analytics
        </button>
        <button class="tsa-cookie-consent__button" type="button" data-cookie-accept>
          Acceptă Analytics
        </button>
      </div>
    </section>
  `;

  document.body.appendChild(root);
  return root;
}

function createSettingsTrigger(): HTMLButtonElement {
  const trigger = document.createElement('button');

  trigger.className = 'tsa-cookie-settings-trigger';
  trigger.type = 'button';
  trigger.textContent = 'Setări cookie';
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', 'tsa-cookie-consent-dialog');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.hidden = true;

  document.body.appendChild(trigger);
  return trigger;
}

export function initCookieConsent(): void {
  prepareGoogleConsentDefaults();

  const rootElement = document.documentElement;
  if (rootElement.dataset[COOKIE_CONSENT_SETTINGS.initializedAttribute] === 'true') return;

  rootElement.dataset[COOKIE_CONSENT_SETTINGS.initializedAttribute] = 'true';

  const root =
    document.querySelector<HTMLElement>(COOKIE_CONSENT_SETTINGS.rootSelector) ?? createBanner();
  const panel = root.querySelector<HTMLElement>('.tsa-cookie-consent__panel');
  const acceptButton = root.querySelector<HTMLButtonElement>('[data-cookie-accept]');
  const rejectButton = root.querySelector<HTMLButtonElement>('[data-cookie-reject]');
  const externalSettingsTriggers = Array.from(
    document.querySelectorAll<HTMLElement>(COOKIE_CONSENT_SETTINGS.externalSettingsSelector)
  );
  const settingsTrigger = externalSettingsTriggers.length === 0 ? createSettingsTrigger() : null;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let currentChoice: ConsentChoice | null = null;
  let closeTimer: number | undefined;
  let openedFromSettings = false;
  let settingsOrigin: HTMLElement | null = null;

  function clearCloseTimer(): void {
    if (closeTimer === undefined) return;
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
  }

  function syncSettingsTrigger(): void {
    if (settingsTrigger) {
      settingsTrigger.hidden = currentChoice === null;
    }

    const isOpen = !root.hidden && root.dataset.state !== 'closed';

    [...externalSettingsTriggers, ...(settingsTrigger ? [settingsTrigger] : [])].forEach(
      (trigger) => {
        trigger.setAttribute('aria-expanded', String(isOpen));
      }
    );
  }

  function openBanner(focusPanel = false): void {
    clearCloseTimer();
    root.hidden = false;
    root.dataset.state = 'opening';

    window.requestAnimationFrame(() => {
      root.dataset.state = 'open';
      syncSettingsTrigger();

      if (focusPanel) {
        panel?.focus({ preventScroll: true });
      }
    });
  }

  function closeBanner(): void {
    clearCloseTimer();
    root.dataset.state = 'closed';
    syncSettingsTrigger();

    if (reducedMotionQuery.matches) {
      root.hidden = true;
      return;
    }

    closeTimer = window.setTimeout(() => {
      root.hidden = true;
      closeTimer = undefined;
    }, 260);
  }

  function applyChoice(choice: ConsentChoice, source: ConsentSource): void {
    currentChoice = choice;
    storeConsent(choice);

    if (choice === 'accepted') {
      enableAnalytics(true);
    } else {
      disableAnalytics();
    }

    closeBanner();
    syncSettingsTrigger();
    dispatchConsentChange(choice, source);
    openedFromSettings = false;
    settingsOrigin = null;
  }

  function openFromSettings(event?: Event): void {
    event?.preventDefault();
    openedFromSettings = true;
    settingsOrigin = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    openBanner(true);
  }

  acceptButton?.addEventListener('click', () =>
    applyChoice('accepted', openedFromSettings ? 'settings' : 'banner')
  );
  rejectButton?.addEventListener('click', () =>
    applyChoice('rejected', openedFromSettings ? 'settings' : 'banner')
  );
  settingsTrigger?.addEventListener('click', openFromSettings);
  externalSettingsTriggers.forEach((trigger) => {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'tsa-cookie-consent-dialog');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', openFromSettings);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || root.hidden || currentChoice === null) return;
    closeBanner();
    const focusTarget = settingsOrigin ?? settingsTrigger;
    openedFromSettings = false;
    settingsOrigin = null;
    focusTarget?.focus({ preventScroll: true });
  });

  window.tsaCookieConsent = {
    accept: () => applyChoice('accepted', 'api'),
    getState: () => currentChoice,
    open: () => {
      openedFromSettings = true;
      settingsOrigin = null;
      openBanner(true);
    },
    reject: () => applyChoice('rejected', 'api'),
    reset: () => {
      openedFromSettings = false;
      settingsOrigin = null;
      clearStoredConsent();
      currentChoice = null;
      disableAnalytics();
      syncSettingsTrigger();
      openBanner(true);
    },
  };

  const storedConsent = readStoredConsent();

  if (!storedConsent) {
    disableAnalytics();
    syncSettingsTrigger();
    openBanner(false);
    return;
  }

  currentChoice = storedConsent.choice;
  syncSettingsTrigger();

  if (storedConsent.choice === 'accepted') {
    enableAnalytics(true);
  } else {
    disableAnalytics();
  }

  dispatchConsentChange(storedConsent.choice, 'stored');
}
