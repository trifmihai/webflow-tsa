// type RevealPart = 'media' | 'eyebrow' | 'heading' | 'body' | 'action';

// type RevealItem = {
//   element: HTMLElement;
//   part: RevealPart;
// };

// const READY_CLASS = 'tsa-text-reveal-ready';
// const VISIBLE_CLASS = 'is-reveal-visible';

// const PREPARED_ATTR = 'data-tsa-reveal-prepared';
// const ITEM_ATTR = 'data-tsa-reveal-item';
// const PART_ATTR = 'data-tsa-reveal-part';

// const REVEAL_ONCE = true;
// const ROOT_MARGIN = '0px 0px -16% 0px';
// const THRESHOLD = 0.12;

// const DEFAULT_ROOT_SELECTOR = '[data-tsa-reveal-group="true"], [data-tsa-reveal="group"]';

// const PART_ORDER: Record<RevealPart, number> = {
//   media: 0,
//   eyebrow: 1,
//   heading: 2,
//   body: 3,
//   action: 4,
// };

// const PART_DELAYS: Record<RevealPart, number> = {
//   media: 0,
//   eyebrow: 40,
//   heading: 90,
//   body: 150,
//   action: 210,
// };

// const HERO_PART_DELAYS: Record<RevealPart, number> = {
//   media: 0,
//   eyebrow: 0,
//   heading: 80,
//   body: 160,
//   action: 230,
// };

// const VALID_PARTS: RevealPart[] = ['media', 'eyebrow', 'heading', 'body', 'action'];

// export function initTextReveal(): void {
//   const root = document.documentElement;

//   if (root.dataset.tsaTextRevealInitialized === 'true') return;
//   root.dataset.tsaTextRevealInitialized = 'true';

//   const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

//   if (reduceMotionQuery.matches) {
//     root.classList.add(READY_CLASS);
//     revealAllWithoutMotion(DEFAULT_ROOT_SELECTOR);
//     return;
//   }

//   runWhenReady(() => {
//     const groups = prepareRevealGroups(DEFAULT_ROOT_SELECTOR);

//     if (!groups.length) return;

//     groups.forEach((group) => {
//       if (isElementInRevealRange(group)) {
//         group.classList.add(VISIBLE_CLASS);
//       }
//     });

//     root.classList.add(READY_CLASS);
//     observeRevealGroups(groups, REVEAL_ONCE, ROOT_MARGIN, THRESHOLD);
//   });
// }

// function runWhenReady(callback: () => void): void {
//   const start = () => {
//     const fontFaceSet = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
//     const fontsReady = fontFaceSet?.ready || Promise.resolve();

//     Promise.race([fontsReady, new Promise((resolve) => window.setTimeout(resolve, 450))])
//       .catch(() => undefined)
//       .finally(() => {
//         window.requestAnimationFrame(callback);
//       });
//   };

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', start, { once: true });
//     return;
//   }

//   start();
// }

// function prepareRevealGroups(rootSelector: string): HTMLElement[] {
//   const groups = uniqueElements(document.querySelectorAll<HTMLElement>(rootSelector));

//   return groups.filter((group) => {
//     if (group.getAttribute(PREPARED_ATTR) === 'true') return true;
//     if (shouldSkipElement(group)) return false;

//     const items = collectRevealItems(group);

//     if (!items.length) return false;

//     group.setAttribute(PREPARED_ATTR, 'true');

//     const isHero = isHeroRevealGroup(group);
//     const partCounts = new Map<RevealPart, number>();

//     items.forEach(({ element, part }) => {
//       const currentPartCount = partCounts.get(part) || 0;
//       partCounts.set(part, currentPartCount + 1);

//       const baseDelay = isHero ? HERO_PART_DELAYS[part] : PART_DELAYS[part];
//       const repeatDelay = currentPartCount * 32;
//       const delay = baseDelay + repeatDelay;

//       element.setAttribute(ITEM_ATTR, 'true');
//       element.setAttribute(PART_ATTR, part);
//       element.style.setProperty('--tsa-reveal-delay', `${delay}ms`);
//     });

//     return true;
//   });
// }

// function collectRevealItems(group: HTMLElement): RevealItem[] {
//   const explicitItems = collectExplicitRevealItems(group);

//   if (explicitItems.length > 0) {
//     return explicitItems;
//   }

//   return collectFallbackRevealItems(group);
// }

// function collectExplicitRevealItems(group: HTMLElement): RevealItem[] {
//   const items: RevealItem[] = [];
//   const seen = new Set<HTMLElement>();

//   group.querySelectorAll<HTMLElement>('[data-tsa-reveal-part]').forEach((element) => {
//     if (seen.has(element)) return;
//     if (shouldSkipElement(element)) return;
//     if (!hasUsableTextOrMedia(element)) return;

//     const part = normalizePart(element.getAttribute('data-tsa-reveal-part'));

//     seen.add(element);
//     items.push({ element, part });
//   });

//   return sortRevealItems(items);
// }

// function collectFallbackRevealItems(group: HTMLElement): RevealItem[] {
//   const items: RevealItem[] = [];
//   const seen = new Set<HTMLElement>();

//   const addElement = (element: Element | null, part: RevealPart): void => {
//     if (!(element instanceof HTMLElement)) return;
//     if (seen.has(element)) return;
//     if (shouldSkipElement(element)) return;
//     if (!hasUsableTextOrMedia(element)) return;

//     seen.add(element);
//     items.push({ element, part });
//   };

//   addElement(group.querySelector('[data-hero-reveal="avatars"]'), 'media');
//   addElement(group.querySelector('[data-hero-reveal="title"]'), 'heading');
//   addElement(group.querySelector('[data-hero-reveal="cta"]'), 'body');
//   addElement(group.querySelector('.hero_bottom'), 'action');

//   addElement(group.querySelector('.eyebrow'), 'eyebrow');

//   const headingWrapper =
//     group.querySelector<HTMLElement>('.header_content-top > .max-width-large') ||
//     group.querySelector<HTMLElement>('.header_content-top > .max-width-medium') ||
//     group.querySelector<HTMLElement>('.max-width-xlarge.is-hero') ||
//     group.querySelector<HTMLElement>('h1, h2, h3, h4, h5, h6');

//   addElement(headingWrapper, 'heading');

//   const bodyWrapper =
//     group.querySelector<HTMLElement>(':scope > .max-width-small') ||
//     group.querySelector<HTMLElement>(':scope > .max-width-medium') ||
//     group.querySelector<HTMLElement>('.hero_description') ||
//     group.querySelector<HTMLElement>('.text-size-medium.is-cta-practice');

//   if (bodyWrapper !== headingWrapper) {
//     addElement(bodyWrapper, 'body');
//   }

//   const actionWrapper =
//     group.querySelector<HTMLElement>(':scope > .button-group') ||
//     group.querySelector<HTMLElement>('[data-tsa-reveal-action]');

//   addElement(actionWrapper, 'action');

//   return sortRevealItems(items);
// }

// function sortRevealItems(items: RevealItem[]): RevealItem[] {
//   return [...items].sort((a, b) => PART_ORDER[a.part] - PART_ORDER[b.part]);
// }

// function observeRevealGroups(
//   groups: HTMLElement[],
//   once: boolean,
//   rootMargin: string,
//   threshold: number
// ): void {
//   if (!('IntersectionObserver' in window)) {
//     groups.forEach((group) => group.classList.add(VISIBLE_CLASS));
//     return;
//   }

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const group = entry.target;

//         if (!(group instanceof HTMLElement)) return;

//         if (entry.isIntersecting) {
//           group.classList.add(VISIBLE_CLASS);

//           if (once) {
//             observer.unobserve(group);
//           }
//         } else if (!once) {
//           group.classList.remove(VISIBLE_CLASS);
//         }
//       });
//     },
//     {
//       root: null,
//       rootMargin,
//       threshold,
//     }
//   );

//   groups.forEach((group) => observer.observe(group));
// }

// function revealAllWithoutMotion(rootSelector: string): void {
//   document.querySelectorAll<HTMLElement>(rootSelector).forEach((group) => {
//     group.setAttribute(PREPARED_ATTR, 'true');
//     group.classList.add(VISIBLE_CLASS);

//     collectRevealItems(group).forEach(({ element, part }) => {
//       element.setAttribute(ITEM_ATTR, 'true');
//       element.setAttribute(PART_ATTR, part);
//       element.style.setProperty('--tsa-reveal-delay', '0ms');
//     });
//   });
// }

// function isElementInRevealRange(element: HTMLElement): boolean {
//   const rect = element.getBoundingClientRect();
//   const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

//   return rect.top < viewportHeight * 0.84 && rect.bottom > 0;
// }

// function normalizePart(value: string | null): RevealPart {
//   if (value && VALID_PARTS.includes(value as RevealPart)) {
//     return value as RevealPart;
//   }

//   return 'body';
// }

// function normalizeText(value: string): string {
//   return value.replace(/\s+/g, ' ').trim();
// }

// function isHeroRevealGroup(group: HTMLElement): boolean {
//   return (
//     group.matches('[data-hero-reveal-group="true"]') ||
//     group.matches('[data-tsa-reveal-group="true"].hero_header') ||
//     group.matches('.section_hero .hero_header')
//   );
// }

// function hasUsableTextOrMedia(element: HTMLElement): boolean {
//   if (element.matches('img, picture, video, canvas, svg')) return true;
//   if (element.querySelector('img, picture, video, canvas, svg')) return true;

//   return normalizeText(element.textContent || '').length > 0;
// }

// function shouldSkipElement(element: HTMLElement): boolean {
//   return Boolean(
//     element.matches('[data-tsa-reveal="off"], .w-condition-invisible') ||
//       element.closest('[data-tsa-reveal="off"], .w-condition-invisible')
//   );
// }

// function uniqueElements(elements: NodeListOf<HTMLElement>): HTMLElement[] {
//   return Array.from(new Set(Array.from(elements)));
// }
