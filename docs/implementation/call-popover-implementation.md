# TSA call popover implementation log

## Baseline

- Date/time: 2026-05-26T20:25:35.2950105+03:00
- Starting commit: 1a5077a2f787992a0f97628d7588ecefb684f777
- Starting branch: main
- Feature branch: feat/tsa-call-popover
- Webflow site: TSA, `6a0af12bdb5d98af02240f14`
- Webflow publish status: not published by this task

## Repository audit

- `AGENTS.md` present and read.
- `client-first-webflow` skill is required by project instructions but unavailable in this session.
- Build entrypoint remains `src/index.ts`.
- CSS aggregation entrypoint remains `src/style.css`.
- Production bundle contract remains `dist/index.js` and `dist/index.css`.
- Existing source pattern uses `src/components/*` feature folders.
- No existing `call-popover` or `data-call-*` implementation found in `src`.
- Potential interaction collision points found:
  - mobile navbar overlay moves `.navbar_mobile-panel` to `document.body`;
  - hero avatar tooltip uses origin-aware tooltip state and document listeners;
  - practice text reel owns its own animation state;
  - `temp.html` contains an older footer clipboard script.

## Baseline checks

- `pnpm.cmd build`: passed before implementation.
- Baseline generated files present:
  - `dist/index.js`
  - `dist/index.css`
  - `dist/index.js.map`
  - `dist/index.css.map`
- `pnpm.cmd check`: failed before implementation with existing TypeScript diagnostics in blog TOC, hero avatars, mobile navbar, and practice text reel.

## Webflow audit

- Site: TSA, `6a0af12bdb5d98af02240f14`.
- Current Designer page: Home, `6a0af12bdb5d98af02240f16`.
- Current Designer mode during audit: design.
- Current page branch: none.
- Page/component structure inspected:
  - Home page content through Webflow Localization Data API.
  - `nav` component, `79aa8b5e-faaa-3d44-66ff-512ec28b7ad8`.
  - `footer` component, `2e852f4e-b069-f0a2-6fb1-1993706e44e7`.
  - `button_primary`, `66a79696-786c-e455-5d22-fd6f0b0f36d3`.
  - `button_is-small`, `db92653b-cc3b-b89a-f758-312efefdb3ce`.
  - `button_is-alternate`, `53d00e3c-316a-da74-7dc4-565bf5d9f1c0`.
- Confirmed fixed phone number source:
  - Footer contact text: `0364 141 673`, element `8bbc048b-bea9-90b4-44c8-fa1f5ae9c884`.
  - Canonical copy value to use: `0364141673`.
  - Canonical tel value to use: `+40364141673`.
- Confirmed WhatsApp source:
  - Footer contact text: `+40 740 074 224`, element `2591f2d8-bdc3-db30-92e1-d8fadf78bac9`.
- CTA trigger inventory:
  - Navbar CTA: `nav` component instance `bc9158fa-8cae-b13c-b507-93f3302392ae`, component `button_is-small`, text `Sună acum`, link prop was `#`, root already had `data-call-trigger="true"`.
  - Hero CTA: Home instance `c768c663-bfab-f003-4c54-b355d0a17455`, component `button_primary`, text `Sună pentru o discuție`, link prop was `#`, root already had `data-call-trigger="true"`.
  - Practice/uncertain-fit CTA: Home instance `86ffde3f-1715-f4ab-d34e-77efa0514d9e`, component `button_is-alternate`, text `Sună pentru o discuție`, link prop was `#`, root did not have `data-call-trigger`.
  - Approach CTA: Home instance `c8a91770-e277-339d-de95-5332ed261402`, component `button_primary`, text `Sună pentru o discuție`, link prop was `#`, root already had `data-call-trigger="true"`.
  - Footer CTA: `footer` component instance `24c67dcf-55e5-bf38-afdd-907ee60798ac`, component `button_is-alternate`, text `Sună pentru o discuție`, link prop was `#`, root did not have `data-call-trigger`.
- Trigger decision:
  - Mark `button_is-alternate` root because all confirmed instances are phone-related CTAs.
  - Do not mark WhatsApp-only text/link elements as call popover triggers.
  - Do not mark every `.button_ornate`; only the three phone CTA button components listed above.
- Mobile call/contact area decision:
  - Reuse the footer section root, `footer` component root `2e852f4e-b069-f0a2-6fb1-1993706e44e7`, as `#contact-call`.
  - It contains visible phone and WhatsApp contact content and the final CTA area.
  - It needs `id="contact-call"`, `data-call-area="true"`, and `tabindex="-1"`.
  - It needs a real visible `tel:` action; the existing fixed-phone text is visible but is not a link.
- Existing popover check:
  - Webflow styles already exist for `call_popover`, `call_popover-surface`, `call_popover-content`, and `call_popover-arrow`.
  - Existing Home element `2f6787a6-8859-7cb3-b088-6842a9c06164` has class `call_popover` but no `data-call-popover` hook.
  - Existing content still says `Raluca Stoinea`; it is partial/conflicting and safe to complete in place.
  - `call_popover` Webflow style currently had `display: flex`, so base no-JS hidden state is missing.
- Existing script/conflict check:
  - Webflow Scripts API has registered dynamic reading time scripts only.
  - Site/page script reads returned 404 custom code block not found.
  - Local `temp.html` contains an older footer clipboard script, but no repo call-popover module exists.
  - Repo collision points remain mobile navbar body overlay, hero avatar tooltip, practice text reel, and blog TOC scroll listeners.
- Proposed implementation map:
  - Webflow: complete the existing Home `call_popover` element, add missing hooks, set base hidden style, mark footer as call area, add a real tel action, update CTA component link defaults to `#contact-call`, and add `data-call-target="#contact-call"`.
  - Repo: add `src/components/call-popover/index.ts` and `src/components/call-popover/call-popover.css`, import through `src/init-site.ts` and `src/style.css`.
  - Runtime: one shared body-mounted popover, origin-aware fixed positioning, desktop-only open/copy behavior, mobile scroll-to-call-area behavior, keyboard/reduced-motion handling, duplicate-init guard, and kill switch.

## Webflow changes

- Completed before MCP usage-limit block:
  - Updated Webflow style `call_popover` base `display` from `flex` to `none` for safe no-JS fallback.
  - Updated `call_popover-content` with flex column layout and centered text.
  - Created styles `call_popover-title`, `call_popover-helper`, and `call_popover-status`.
  - Reused existing Home popover root `2f6787a6-8859-7cb3-b088-6842a9c06164`.
  - Added `data-call-popover="true"`, `role="dialog"`, `aria-hidden="true"`, and `aria-labelledby="call-popover-title"` to the popover root.
  - Added `data-call-popover-arrow="true"` to arrow element `2f6787a6-8859-7cb3-b088-6842a9c0616d`.
  - Changed the existing title block `2f6787a6-8859-7cb3-b088-6842a9c06167` to style `call_popover-title`, `id="call-popover-title"`, and `data-call-popover-title="true"`.
  - Changed title string `2f6787a6-8859-7cb3-b088-6842a9c06168` from `Raluca Stoinea` to `Copiază numărul`.
  - Inserted `call_popover-actions` wrapper `2332ecc5-3c5a-4cc9-5261-2b60ad7e4509`.
  - Inserted helper `2332ecc5-3c5a-4cc9-5261-2b60ad7e44f4` with `data-call-helper="true"` and text `Apoi sună-ne de pe telefon.`.
  - Inserted copy control `2332ecc5-3c5a-4cc9-5261-2b60ad7e4507` with classes `button_ornate is-copy-number`, `data-call-copy="true"`, `data-call-number="0364141673"`, and `data-call-number-display="0364 141 673"`.
  - Inserted live status `2332ecc5-3c5a-4cc9-5261-2b60ad7e4508` with `data-call-status="true"` and `aria-live="polite"`.
- Attempted but not completed:
  - Updating CTA component link defaults to `#contact-call` timed out and verification still showed Home CTA link props as `#`.
  - Adding missing `data-call-trigger` / `data-call-target` to `button_is-alternate` was not completed.
  - Adding `id="contact-call"`, `data-call-area="true"`, and `tabindex="-1"` to the footer root was not completed.
  - Adding/replacing the visible footer fixed-phone text with a real `tel:+40364141673` action was not completed.
- Blocker:
  - Subsequent Webflow MCP calls were blocked by usage limit until 2026-05-27 01:12.

## Repository changes

- Added `src/components/call-popover/index.ts`.
  - Exposes `CALL_POPOVER_SETTINGS.enabled` kill switch.
  - Adds duplicate initialization protection through `document.documentElement.dataset.callPopoverReady`.
  - Supports desktop popover open/close, body mounting, fixed positioning, top/bottom collision handling, arrow CSS variable, copy success/failure messages, Clipboard API fallback, Escape/outside/scroll/resize close behavior, keyboard focus handling, and mobile scroll behavior.
- Added `src/components/call-popover/call-popover.css`.
  - Adds ready-state display control, fixed body-mounted popover positioning, scoped open/close transitions, top/bottom placement classes, arrow positioning, copy focus reset, visually hidden live status, mobile popover suppression, call-area scroll margin, and reduced-motion behavior.
- Updated `src/init-site.ts`.
  - Imported and initialized `initCallPopover()`.
- Updated `src/style.css`.
  - Imported `./components/call-popover/call-popover.css` after mobile navbar CSS.
- `dist/index.js` and `dist/index.css` currently contain generated call-popover output, but the explicit post-feature `pnpm.cmd build` command could not be rerun because the usage-limit approval block stopped escalated commands.

## Rollback steps

- Emergency disable:
  - Set `CALL_POPOVER_SETTINGS.enabled = false` in `src/components/call-popover/index.ts`.
  - Rebuild with `pnpm.cmd build`.
  - CTA links continue to fall back to `#contact-call`.
- Full repo rollback:
  - Revert the feature commit.
  - Rebuild with `pnpm.cmd build`.
  - Restore prior CDN/bundle references only if a later release step changes them.
- Webflow reverse operations:
  - Remove `data-call-target="#contact-call"` from `button_primary`, `button_is-small`, and `button_is-alternate` roots.
  - Remove `data-call-trigger="true"` from `button_is-alternate` root if only added by this task.
  - Restore link prop defaults on `button_primary`, `button_is-small`, and `button_is-alternate` from `#contact-call` to `#`.
  - Remove `id="contact-call"`, `data-call-area="true"`, and `tabindex="-1"` from footer root only if not useful independently.
  - Remove the newly added visible `tel:` action, or restore the previous visible phone text if it is replaced.
  - Remove `data-call-popover*`, `data-call-helper`, `data-call-copy`, `data-call-number`, `data-call-number-display`, and `data-call-status` hooks from the completed popover.
  - Restore `call_popover` base `display` to its previous `flex` value only if intentionally rolling back the hidden no-JS state.

## QA results

- Baseline `pnpm.cmd build`: passed before implementation.
- Baseline `pnpm.cmd check`: failed before implementation with existing diagnostics unrelated to this feature.
- Post-feature `pnpm.cmd build`: not run; blocked by usage-limit approval error.
- Post-feature `pnpm.cmd check`: not run; blocked by usage-limit approval error.
- Webflow post-mutation verification:
  - Verified popover root/hooks/content after the WHTML insert timeout; the insert did complete.
  - Verified Home CTA link props after timed-out component update; they still showed `#`.
  - Could not complete final Webflow verification because subsequent MCP calls were blocked by usage limit.
- Desktop/mobile/browser QA:
  - Not performed because Webflow changes are incomplete and post-feature build/preview commands were blocked.
