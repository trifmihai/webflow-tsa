import { initBlogToc } from './components/blog-toc';
import { initHeroAvatarHover } from './components/hero-avatars';
import { initNavbar } from './components/navbar';
import { initPracticeTextReels } from './components/practice-text-reel';
import { onDomReady } from './utils/dom';

export function initSite(): void {
  initNavbar();
  onDomReady(initPracticeTextReels);
  initBlogToc();
  onDomReady(initHeroAvatarHover);
}
