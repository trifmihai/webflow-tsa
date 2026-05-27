import { initBlogToc } from './components/blog-toc';
import { initCallPopover } from './components/call-popover';
import { initHeroAvatarHover } from './components/hero-avatars';
import { initNavbar } from './components/navbar';
import { initPracticeTextReels } from './components/practice-text-reel';
import { onDomReady } from './utils/dom';

export function initSite(): void {
  initNavbar();
  initCallPopover();
  onDomReady(initPracticeTextReels);
  initBlogToc();
  onDomReady(initHeroAvatarHover);
}
