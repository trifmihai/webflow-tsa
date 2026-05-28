import { initAccordions } from './components/accordions';
import { initBlogToc } from './components/blog-toc';
import { initCallPopover } from './components/call-popover';
import { initHeroAvatarHover } from './components/hero-avatars';
import { initNavbar } from './components/navbar';
import { initPracticeTextReels } from './components/practice-text-reel';
import { initRelatedArticlesEmptyState } from './components/related-articles';
import { initSmoothScroll } from './components/smooth-scroll';
import { onDomReady } from './utils/dom';

export function initSite(): void {
  initSmoothScroll({
    kind: 'balanced',
    respectReducedMotion: true,
  });
  initNavbar();
  initCallPopover();
  onDomReady(initAccordions);
  onDomReady(initPracticeTextReels);
  initBlogToc();
  onDomReady(initHeroAvatarHover);
  onDomReady(initRelatedArticlesEmptyState);
}
