type ReadingTimeType = 'page' | 'card';

const SELECTORS = {
  pageSource: '[data-reading-time-source="page"]',
  pageTarget: '[data-reading-time-target="page"]',
  cardItem: '[data-reading-time-item="card"]',
  cardSource: '[data-reading-time-source="card"]',
  cardTarget: '[data-reading-time-target="card"]',
  ignoredContent:
    'script, style, noscript, svg, img, iframe, video, audio, canvas, [aria-hidden="true"], [data-reading-time-ignore="true"]',
};

const DEFAULT_WORDS_PER_MINUTE = 200;
const DEFAULT_MINIMUM_MINUTES = 1;

let hasInitializedReadingTime = false;

function getWordMatches(text: string): string[] {
  const cleanText = text.trim();

  if (!cleanText) return [];

  try {
    return cleanText.match(/[\p{L}\p{N}]+(?:['\u2019][\p{L}\p{N}]+)*/gu) || [];
  } catch {
    return (
      cleanText.match(/[A-Za-z\u00C0-\u017E0-9]+(?:['\u2019][A-Za-z\u00C0-\u017E0-9]+)*/g) || []
    );
  }
}

function getReadableText(element: Element | null): string {
  if (!element) return '';

  const clone = element.cloneNode(true) as Element;
  const ignoredElements = clone.querySelectorAll(SELECTORS.ignoredContent);

  ignoredElements.forEach((ignoredElement) => {
    ignoredElement.remove();
  });

  return clone.textContent?.replace(/\s+/g, ' ').trim() || '';
}

function getWordsPerMinute(element: Element | null): number {
  const customValue = element?.getAttribute('data-reading-time-wpm');
  const customWordsPerMinute = Number(customValue);

  if (Number.isFinite(customWordsPerMinute) && customWordsPerMinute > 0) {
    return customWordsPerMinute;
  }

  return DEFAULT_WORDS_PER_MINUTE;
}

function calculateReadingMinutes(source: Element | null): number | null {
  const text = getReadableText(source);
  const wordCount = getWordMatches(text).length;

  if (!wordCount) return null;

  const wordsPerMinute = getWordsPerMinute(source);
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(DEFAULT_MINIMUM_MINUTES, minutes);
}

function getLabelText(minutes: number): string {
  return minutes === 1 ? 'minut de lectur\u0103' : 'minute de lectur\u0103';
}

function findComponent(target: Element, type: ReadingTimeType): HTMLElement | null {
  return (
    target.closest(`[data-reading-time-component="${type}"]`) ||
    target.closest('[data-reading-time-component]') ||
    target.closest('.heading-cms_timer') ||
    target.closest('.resources_timer')
  );
}

function findLabel(target: Element, type: ReadingTimeType): HTMLElement | null {
  const component = findComponent(target, type);

  return (
    component?.querySelector(`[data-reading-time-label="${type}"]`) ||
    component?.querySelector('[data-reading-time-label]') ||
    target.parentElement?.querySelector('[data-reading-time-label]') ||
    null
  );
}

function showComponent(target: Element, type: ReadingTimeType): void {
  const component = findComponent(target, type);

  if (!component) return;

  if (component.hidden) {
    component.hidden = false;
  }

  if (component.getAttribute('aria-hidden') === 'true') {
    component.removeAttribute('aria-hidden');
  }
}

function hideComponent(target: Element, type: ReadingTimeType): void {
  const component = findComponent(target, type);

  if (!component) return;

  if (!component.hidden) {
    component.hidden = true;
  }

  if (component.getAttribute('aria-hidden') !== 'true') {
    component.setAttribute('aria-hidden', 'true');
  }
}

function setReadingTime(target: HTMLElement, minutes: number, type: ReadingTimeType): void {
  const numberText = String(minutes);
  const labelText = getLabelText(minutes);
  const label = findLabel(target, type);
  const ariaLabel = `${numberText} ${labelText}`;

  if (target.textContent?.trim() !== numberText) {
    target.textContent = numberText;
  }

  if (target.getAttribute('aria-label') !== ariaLabel) {
    target.setAttribute('aria-label', ariaLabel);
  }

  if (label && label.textContent?.trim() !== labelText) {
    label.textContent = labelText;
  }

  showComponent(target, type);
}

function updatePageReadingTime(): void {
  const source = document.querySelector(SELECTORS.pageSource);
  const target = document.querySelector<HTMLElement>(SELECTORS.pageTarget);

  if (!target) return;

  const minutes = calculateReadingMinutes(source);

  if (!minutes) {
    hideComponent(target, 'page');
    return;
  }

  setReadingTime(target, minutes, 'page');
}

function updateCardReadingTime(cardItem: Element): void {
  const source = cardItem.querySelector(SELECTORS.cardSource);
  const target = cardItem.querySelector<HTMLElement>(SELECTORS.cardTarget);

  if (!target) return;

  const minutes = calculateReadingMinutes(source);

  if (!minutes) {
    hideComponent(target, 'card');
    return;
  }

  setReadingTime(target, minutes, 'card');
}

function updateCardReadingTimes(): void {
  const cardItems = document.querySelectorAll(SELECTORS.cardItem);

  cardItems.forEach((cardItem) => {
    updateCardReadingTime(cardItem);
  });
}

export function initReadingTime(): void {
  if (hasInitializedReadingTime) return;

  hasInitializedReadingTime = true;

  updatePageReadingTime();
  updateCardReadingTimes();
}
