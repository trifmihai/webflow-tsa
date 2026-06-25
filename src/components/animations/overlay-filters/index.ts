type OverlayFilterPreset =
  | 'gold'
  | 'white-glow'
  | 'soft-neon'
  | 'premium-white'
  | 'solid-white'
  | 'solid-glow'
  | 'base-neon'
  | 'strong-neon';

type OverlayFilterAssignment = {
  selector: string;
  preset: OverlayFilterPreset;
};

const OVERLAY_FILTER_ATTRIBUTE = 'data-tsa-overlay-filter';

/*
  Edit this list to apply overlay filter presets from custom code.

  The selectors target existing Webflow markup. Later assignments win,
  so place broad defaults first and specific overrides after them.
*/
const OVERLAY_FILTER_ASSIGNMENTS: OverlayFilterAssignment[] = [
  {
    selector: '[data-tsa-statue-shine="overlay"]',
    preset: 'base-neon',
  },
  {
    selector: '[data-tsa-benefit-shine="overlay"]',
    preset: 'strong-neon',
  },
  {
    selector: '[data-tsa-benefit-shine-id="definitive-logo"]',
    preset: 'strong-neon',
  },
  {
    selector: '[data-tsa-benefit-shine-id="definitive-bg"]',
    preset: 'strong-neon',
  },
  {
    selector: '[data-tsa-benefit-shine-id="definitive-text"]',
    preset: 'strong-neon',
  },
  {
    selector: '[data-tsa-benefit-shine-id="definitive-accent"]',
    preset: 'strong-neon',
  },
  {
    selector: '[data-tsa-benefit-shine-id="stamp-overlay"]',
    preset: 'soft-neon',
  },
  {
    selector: '[data-tsa-benefit-shine="footer-logo"]',
    preset: 'strong-neon',
  },
  {
    selector: '[data-tsa-footer-logo="overlay"]',
    preset: 'solid-glow',
  },
];

export function initOverlayFilterPresets(): void {
  OVERLAY_FILTER_ASSIGNMENTS.forEach(({ selector, preset }) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.setAttribute(OVERLAY_FILTER_ATTRIBUTE, preset);
    });
  });
}
