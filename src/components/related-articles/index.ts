const RELATED_ARTICLES_SECTION_SELECTOR = '[data-related-articles-section="true"]';
const RELATED_ARTICLES_EMPTY_SELECTOR = '[data-related-articles-empty="true"]';

export function initRelatedArticlesEmptyState(): void {
  const sections = document.querySelectorAll<HTMLElement>(RELATED_ARTICLES_SECTION_SELECTOR);

  sections.forEach((section) => {
    const emptyState = section.querySelector<HTMLElement>(RELATED_ARTICLES_EMPTY_SELECTOR);

    if (!emptyState) return;

    const styles = window.getComputedStyle(emptyState);

    const isEmptyStateVisible =
      !emptyState.hidden && styles.display !== 'none' && styles.visibility !== 'hidden';

    if (isEmptyStateVisible) {
      section.hidden = true;
      section.setAttribute('aria-hidden', 'true');

      return;
    }

    section.hidden = false;
    section.removeAttribute('aria-hidden');
  });
}
