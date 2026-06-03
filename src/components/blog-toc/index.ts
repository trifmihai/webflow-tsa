/*
?============================================
  TOC
?============================================
*/

export function initBlogToc(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll<HTMLElement>('.cms-page_toc-list-wrapper');

    wrappers.forEach((wrapper) => {
      const list = wrapper.querySelector('.blog-post_toc-list');

      if (!list) return;

      const linkSelector = '.toc_h2, .toc_h3, .toc_h4, .toc_h5, .toc_h6';

      const activeSelectors = ['a.u-toc-current-link', 'a.w--current', "a[aria-current='true']"];

      let frame: number | null = null;

      const updateTocState = () => {
        if (frame) cancelAnimationFrame(frame);

        frame = requestAnimationFrame(() => {
          const links = Array.from(wrapper.querySelectorAll<HTMLElement>(linkSelector));
          const activeLink = wrapper.querySelector<HTMLElement>(activeSelectors.join(', '));

          if (!activeLink) {
            wrapper.style.setProperty('--toc-current-opacity', '0');

            links.forEach((link) => {
              link.classList.remove('is-toc-active', 'is-toc-muted');
            });

            return;
          }

          const wrapperRect = wrapper.getBoundingClientRect();
          const activeRect = activeLink.getBoundingClientRect();

          const y = activeRect.top - wrapperRect.top;
          const { height } = activeRect;

          wrapper.style.setProperty('--toc-current-y', `${y}px`);
          wrapper.style.setProperty('--toc-current-height', `${height}px`);
          wrapper.style.setProperty('--toc-current-opacity', '1');

          links.forEach((link) => {
            const isActive = link === activeLink;

            link.classList.toggle('is-toc-active', isActive);
            link.classList.toggle('is-toc-muted', !isActive);
          });
        });
      };

      updateTocState();

      const observer = new MutationObserver(updateTocState);

      observer.observe(list, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'aria-current'],
      });

      window.addEventListener('resize', updateTocState);
      window.addEventListener('scroll', updateTocState, { passive: true });
      list.addEventListener('scroll', updateTocState, { passive: true });

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateTocState);
      }

      setTimeout(updateTocState, 300);
      setTimeout(updateTocState, 1000);
    });
  });
}
