import { initAccordions } from './components/accordions';
import { initBenefitShine } from './components/animations/benefit-shine';
import { initGavel } from './components/animations/gavel';
import { initTsaStatueShine } from './components/animations/overlay';
import { initPlanStamp } from './components/animations/stamp';
import { initBlogToc } from './components/blog-toc';
import { initCallPopover } from './components/call-popover';
import { initHeroAvatarHover } from './components/hero-avatars';
import { initNavbar } from './components/navbar';
import { initPracticeTextReels } from './components/practice-text-reel';
import { initReadingTime } from './components/reading-time';
import { initRelatedArticlesEmptyState } from './components/related-articles';
import { initResourcesFilters } from './components/resources-filter';
import { initTeamCards } from './components/team-card';
import { initBenefitRive } from './features/benefit-rive/benefit-rive';
// import { initTextReveal } from './components/text-reveal';
import { onDomReady } from './utils/dom';

export function initSite(): void {
  initNavbar();
  initTeamCards();
  initPlanStamp();
  initCallPopover();
  onDomReady(initGavel);
  onDomReady(initTsaStatueShine);
  onDomReady(initBenefitShine);
  onDomReady(initAccordions);
  onDomReady(initPracticeTextReels);
  onDomReady(initReadingTime);
  onDomReady(initResourcesFilters);
  initBlogToc();
  onDomReady(initHeroAvatarHover);
  onDomReady(initRelatedArticlesEmptyState);
  onDomReady(initBenefitRive);
  // onDomReady(initTextReveal);
}
