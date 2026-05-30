import { initAccordions } from './components/accordions';
import { initBlogToc } from './components/blog-toc';
import { initHeroAvatarHover } from './components/hero-avatars';
import { initNavbar } from './components/navbar';
import { initPracticeTextReels } from './components/practice-text-reel';
import { initResourcesFilters } from './components/resources-filter';
import { onDomReady } from './utils/dom';

export function initSite(): void {
  initNavbar();
  onDomReady(initAccordions);
  onDomReady(initPracticeTextReels);
  onDomReady(initResourcesFilters);
  initBlogToc();
  onDomReady(initHeroAvatarHover);
}
