const ROOT_SELECTOR = '[data-tsa-filter="resources"]';
const TRIGGER_SELECTOR = '[data-tsa-filter-trigger="true"]';
const ITEM_SELECTOR = '[data-tsa-filter-item="true"]';

const FILTER_ALIASES = {
  toate: 'all',
  'toate-articolele': 'all',
  all: 'all',
  civil: 'drept-civil',
  'drept-civil': 'drept-civil',
  penal: 'drept-penal',
  'drept-penal': 'drept-penal',
} as const;

const ALLOWED_FILTERS = new Set(['all', 'drept-civil', 'drept-penal']);

function slugify(value: string | null | undefined = ''): string {
  return (value ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeFilter(value: string | null | undefined = ''): string {
  const slug = slugify(value);

  return FILTER_ALIASES[slug as keyof typeof FILTER_ALIASES] || slug;
}

function isAllowedFilter(value: string): boolean {
  return ALLOWED_FILTERS.has(value);
}

function getUrlFilter(): string {
  const params = new URLSearchParams(window.location.search);
  const urlValue = normalizeFilter(params.get('arie') || 'all');

  return isAllowedFilter(urlValue) ? urlValue : 'all';
}

function updateUrl(filter: string): void {
  const url = new URL(window.location.href);

  if (filter === 'all') {
    url.searchParams.delete('arie');
  } else {
    url.searchParams.set('arie', filter);
  }

  window.history.replaceState({ tsaFilter: filter }, '', url.toString());
}

function initFilterGroup(root: HTMLElement): void {
  if (root.dataset.tsaFilterReady === 'true') return;

  const triggers = Array.from(root.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR));
  const items = Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
  const tabsWrapper = root.querySelector<HTMLElement>('[data-tsa-filter-tabs="true"]');
  const emptyState = root.querySelector<HTMLElement>('[data-tsa-filter-empty]');

  if (!triggers.length || !items.length) return;

  root.dataset.tsaFilterReady = 'true';

  if (tabsWrapper) {
    tabsWrapper.setAttribute('role', 'tablist');
  }

  function getItemArea(item: HTMLElement): string {
    const attributeValue = item.getAttribute('data-tsa-filter-area');

    if (attributeValue) {
      return normalizeFilter(attributeValue);
    }

    const fallbackSource = item.querySelector<HTMLElement>('[data-tsa-filter-source]');

    return normalizeFilter(fallbackSource ? fallbackSource.textContent : '');
  }

  function setFilter(filter: string, shouldUpdateUrl = false): void {
    const activeFilter = isAllowedFilter(filter) ? filter : 'all';
    let visibleCount = 0;

    items.forEach((item) => {
      const itemArea = getItemArea(item);
      const shouldShow = activeFilter === 'all' || itemArea === activeFilter;

      item.classList.toggle('is-filter-hidden', !shouldShow);
      item.toggleAttribute('hidden', !shouldShow);
      item.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');

      if (shouldShow) visibleCount += 1;
    });

    triggers.forEach((trigger) => {
      const triggerValue = normalizeFilter(trigger.getAttribute('data-tsa-filter-value'));
      const isActive = triggerValue === activeFilter;

      trigger.classList.toggle('is-active', isActive);
      trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
      trigger.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    if (emptyState) {
      emptyState.classList.toggle('is-visible', visibleCount === 0);
    }

    if (shouldUpdateUrl) {
      updateUrl(activeFilter);
    }
  }

  triggers.forEach((trigger, index) => {
    trigger.setAttribute('role', 'tab');

    if (trigger instanceof HTMLButtonElement && !trigger.hasAttribute('type')) {
      trigger.setAttribute('type', 'button');
    }

    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      const filterValue = normalizeFilter(trigger.getAttribute('data-tsa-filter-value'));

      setFilter(filterValue, true);
    });

    trigger.addEventListener('keydown', (event) => {
      const { key } = event;

      if (key === 'Enter' || key === ' ') {
        event.preventDefault();

        const filterValue = normalizeFilter(trigger.getAttribute('data-tsa-filter-value'));

        setFilter(filterValue, true);
      }

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        event.preventDefault();

        const nextTrigger = triggers[(index + 1) % triggers.length];

        nextTrigger?.focus();
      }

      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        event.preventDefault();

        const previousTrigger = triggers[(index - 1 + triggers.length) % triggers.length];

        previousTrigger?.focus();
      }
    });
  });

  setFilter(getUrlFilter(), false);

  window.addEventListener('popstate', () => {
    setFilter(getUrlFilter(), false);
  });
}

export function initResourcesFilters(): void {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach(initFilterGroup);
}
