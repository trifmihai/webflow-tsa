---
name: web-animation-design
version: 3.0.0
last_verified: 2026-05-22
last_updated: 2026-06-15
source_basis: Original synthesis from publicly accessible animations.dev pages and Emil Kowalski articles, the supplied Design Engineering reference, plus official Motion, GSAP, MDN, and Webflow documentation for implementation accuracy.
source_boundary: This is not the paid animations.dev SKILL.md and does not reproduce private course lessons or proprietary easing resources.
description: Design, critique, debug, and implement web animations and polished interactive components that feel responsive, purposeful, natural, accessible, cohesive, and performant. Use for animation strategy, easing, timing, springs, gestures, drag behavior, transitions, keyframes, clip-path, SVG, WAAPI, Motion for React, GSAP, Webflow Interactions with GSAP, custom code, hover states, overlays, page transitions, component review, and motion QA.
triggers:
  - animation
  - web animation
  - motion
  - interaction
  - micro-interaction
  - transition
  - easing
  - cubic-bezier
  - spring
  - duration
  - transform
  - opacity
  - keyframes
  - clip-path
  - SVG animation
  - motion.dev
  - Motion for React
  - Framer Motion
  - GSAP
  - ScrollTrigger
  - Webflow interaction
  - Webflow GSAP
  - hover
  - focus
  - button press
  - tooltip
  - dropdown
  - popover
  - modal
  - drawer
  - toast
  - tabs
  - accordion
  - shared layout
  - scroll reveal
  - page transition
  - prefers-reduced-motion
  - janky
  - flicker
  - smooth
  - premium feel
  - feels off
  - design engineering
  - UI polish
  - component polish
  - gesture
  - drag
  - swipe
  - momentum
  - damping
  - pointer capture
  - multi-touch
  - WAAPI
  - Web Animations API
  - "@starting-style"
  - stagger
  - 3D transform
  - perceived performance
---

# Web Animation Design Skill v3

## 1. Scope and operating boundary

This skill helps an agent make sound motion and component-polish decisions, then ship practical code. It should be used to:

- Diagnose why an animation or interactive component looks wrong, feels cheap, or responds poorly.
- Decide whether an animation should exist at all.
- Choose timing, easing, distance, origin, spring behavior, gesture rules, and animation primitive.
- Choose CSS, `@starting-style`, WAAPI, Webflow Interactions with GSAP, GSAP custom code, Motion for React, or progressive platform features.
- Design drag, swipe, dismissal, and boundary behavior without brittle pointer logic.
- Review UI code using a precise Before, After, and Why comparison when critique is requested.
- Implement motion without damaging layout, responsiveness, accessibility, developer experience, or maintainability.
- Audit an existing animation and return a safer, more coherent version.

If this skill is invoked without a concrete task, do not dump general theory. Ask for the element, trigger, current stack, and any reference animation or code needed to begin.

This skill is an original operational guide. It incorporates public principles and examples published by animations.dev and Emil Kowalski, then extends them into production workflows for Webflow, React, and custom front-end implementation.

### What this skill must not do

- Do not claim to reproduce a paid course lesson, private SKILL.md, or proprietary easing collection.
- Do not invent precise values from an unseen reference animation.
- Do not rewrite layout or dimensions merely to make an animation easier.
- Do not add libraries when CSS or the project's existing stack already solves the interaction.
- Do not treat animation as automatically beneficial.
- Do not copy source-specific branding, response rituals, or one component library's implementation when the general principle is what matters.
- Do not convert a nuanced performance guideline into an absolute claim without profiling the actual browser and device.

## 2. Non-negotiable motion principles

1. **Purpose before polish.** Every animation must support feedback, orientation, continuity, attention, communication, or intentionally rare delight.
2. **Frequency changes the answer.** Motion that feels delightful once can become friction when repeated dozens of times.
3. **Responsiveness beats spectacle.** User-triggered UI should react immediately and settle quickly.
4. **Easing is a primary design variable.** A good duration with a bad curve still feels bad.
5. **Spatial logic matters.** Elements should emerge from plausible origins and leave consistently.
6. **Interruptibility is part of quality.** Rapid open-close, hover-unhover, tab switching, and new state changes should remain smooth.
7. **Meaning survives reduced motion.** Remove movement where needed, not information or essential feedback.
8. **Performance is a design constraint.** Prefer compositor-friendly motion, profile exceptions, and reduce simultaneous complexity.
9. **Layout is not collateral damage.** Preserve component sizing and document flow unless the requested design specifically changes them.
10. **Consistency creates brand feel.** A small family of motion tokens is more premium than unrelated effects.
11. **Invisible correctness compounds.** Pointer capture, timer pausing, hit-area continuity, focus behavior, and clean reversal often matter more than a dramatic flourish.
12. **Good defaults beat option overload.** A reusable component should feel polished without requiring consumers to tune every value.
13. **Cohesion outranks isolated cleverness.** Timing, easing, naming, visuals, and interaction tone should feel like one system.
14. **Taste is trained through comparison.** Study strong references, inspect them slowly, identify why they work, and convert observations into explicit rules.

### Craft philosophy

Treat polish as an accumulation of small correct decisions, not as a final decorative layer. Users may never identify the transform origin, pointer handling, exit timing, or hover bridge that makes a component feel right, but they experience the combined result.

Beauty is useful only when it strengthens comprehension, trust, perceived quality, or product identity. Never use it to excuse friction. In reusable components, prioritize excellent defaults, minimal setup, predictable APIs, and invisible edge-case handling before adding more configuration.

## 3. Agent operating protocol

Follow this process before producing code or recommendations.

### Phase A: Gather the minimum necessary context

Identify:

- What element is animating?
- What user action or page event causes the state change?
- Is the animation essential feedback, orientation, state continuity, marketing communication, or decoration?
- How often will users encounter it?
- What platform and stack already exist: CSS, Webflow, Interactions with GSAP, GSAP custom code, React, Motion?
- Are layout size, class names, breakpoints, or current Webflow settings required to remain untouched?
- Is this a one-off animation, a reusable component, or a public component API that needs strong defaults and low setup friction?
- Does the interaction include drag velocity, pointer capture, boundary damping, multiple pointers, or dismissal thresholds?
- Is the user requesting critique, final implementation, or both?
- Is there an image, video, Figma frame, or existing code to inspect?

If code, screenshots, or a provided file exists, inspect it before proposing a rewrite. When exact reference motion cannot be observed, state the assumption and give tunable variables.

### Phase B: Classify the interaction

Use one primary category:

| Category | Primary job | Typical examples | Default feel |
| --- | --- | --- | --- |
| Feedback | Confirm the input was received | press, toggle, copy success | near-instant |
| Orientation | Show where UI came from or goes | tooltip, menu, drawer | origin-aware |
| Continuity | Connect two visible states | tabs, reorder, morph, shared layout | smooth, interruptible |
| Communication | Explain a concept or sequence | hero demo, product illustration | paced, readable |
| Attention | Direct focus without disruption | new item, CTA reveal, alert | subtle |
| Time/progress | Represent elapsed duration | hold-to-confirm, loader progress | linear where time is literal |
| Delight | Add character after usability is solved | rare easter egg, memorable CTA | deliberate, infrequent |

### Phase C: Decide whether motion belongs

Ask in order:

1. Does the animation clarify state, location, response, sequence, or meaning?
   - If yes, continue.
2. Is it used repeatedly in a high-frequency workflow or keyboard-driven command?
   - If yes, remove movement or reduce it to immediate state feedback.
3. Is it only decoration in a task-critical context?
   - If yes, remove it.
4. Is it an infrequent marketing or brand moment where personality matters?
   - If yes, a more expressive animation is acceptable if it does not delay action.
5. Does the user prefer reduced motion or use a constrained device context?
   - Supply a simplified equivalent.

### Phase D: Choose the animation primitive

| Need | Preferred primitive | Reason |
| --- | --- | --- |
| Hover, focus, press, color, subtle transform | CSS transition | Lightweight and naturally interruptible |
| Entry of newly rendered content where support is acceptable | CSS transition plus `@starting-style` | Avoids a JavaScript mount flag for simple enter states |
| Automatic loop or fixed multi-step effect | CSS keyframes | Clear autonomous timeline |
| Programmatic animation with native playback control | Web Animations API | Gives JavaScript control without requiring a full animation library |
| Simple in-view reveal without library dependency | CSS plus IntersectionObserver | Small and maintainable |
| Native Webflow visual timeline, reusable component motion | Webflow Interactions with GSAP | Editable inside Webflow and GSAP-backed |
| Complex Webflow sequencing or custom interaction logic | GSAP custom code | Precise timeline, reusable logic, cleanup control |
| React state, presence, gestures, layout morphing | Motion for React | State-native, layout, gesture, and presence tools |
| Pointer-driven drag with custom physics outside React | Pointer Events plus CSS/WAAPI/GSAP | Full control over capture, active pointer, velocity, and damping |
| Same-document or cross-page visual continuity where supported | View Transition API as enhancement | Browser-managed snapshots and shared continuity |
| SVG path drawing or vector part motion | CSS, Motion, or GSAP based on complexity | Vector-specific control |

### Phase E: Specify motion ingredients before code

Every recommendation should explicitly state:

- Purpose.
- Trigger and start/end states.
- Duration.
- Easing or spring choice.
- Distance, scale, rotation, blur, or clip range.
- Transform origin.
- Interaction and interruption behavior.
- Enter and exit asymmetry when the system should respond faster than the user deliberates.
- Mobile/touch and keyboard behavior.
- Drag threshold, velocity rule, boundary damping, pointer capture, and active pointer ownership when gestures are involved.
- Reduced-motion behavior.
- Implementation layer.
- Reusable-component defaults, API surface, and invisible edge cases when the work is meant for reuse.
- Layout constraints that remain unchanged.

### Phase F: Implement and verify

Do not call an animation final until it passes:

- Rapid activation and reversal.
- Mouse, keyboard, and touch behavior where applicable.
- Reduced-motion behavior.
- Responsive layouts and overflow.
- No unintended size or grid change.
- No duplicate initialization or lingering timelines.
- No expensive jank during scroll or repeated interaction.

## 4. The animation decision system

### 4.1 Input frequency rule

Frequency is one of the strongest filters for animation.

| Encounter frequency | Guidance |
| --- | --- |
| Hundreds of times per day, especially keyboard commands | Avoid motion. Use instant state change or tiny feedback only. |
| Repeated utility action | Keep under roughly `150ms` to `220ms`, or remove movement. |
| Normal UI action | Usually `150ms` to `300ms`. |
| Occasional overlay or state transition | Usually `180ms` to `360ms`. |
| Marketing explanation or infrequent brand moment | Can be longer if it remains skippable and does not block CTA access. |

**Strong rule:** do not add entrance choreography to keyboard-first command interfaces or repeated productivity actions. Their value is speed, not surprise.

### 4.2 Cause and effect rule

A user-triggered animation must acknowledge the action immediately. Examples:

- A pressed button scales slightly as soon as it is pressed, not after loading finishes.
- A popover begins from the trigger location.
- A toast appears from and dismisses toward a consistent location.
- A drawer travels from its attached edge.
- A selected tab indicator moves from the previous tab rather than flashing into existence.

### 4.3 Distance and scale rule

Use the smallest movement that communicates the idea.

| Interaction | Typical translation | Typical starting scale |
| --- | ---: | ---: |
| Button press | none | `0.97` |
| Tooltip | `2px` to `6px` | `0.98` to `1` |
| Dropdown or popover | `4px` to `12px` | `0.96` to `0.99` |
| Modal panel | `8px` to `16px` | `0.97` to `0.99` |
| Card hover | `2px` to `8px` | image may scale to `1.02` to `1.06` |
| Section reveal | `12px` to `32px` | usually none |
| Drawer | own full width or height | none |

Do not animate entering interface elements from `scale(0)` unless the object metaphor specifically demands it. A small existing form, often `0.93` to `0.98`, feels more plausible and refined.

### 4.4 Larger surface rule

Large elements usually need:

- Less aggressive distance or scale.
- Slightly longer duration than tiny controls.
- Restrained easing or spring bounce.
- Careful reduced-motion behavior.

A full-screen panel moving aggressively is much more physically noticeable than a small icon moving by the same perceived ratio.

## 5. Easing blueprint

Easing changes perceived responsiveness and physical character. Choose it based on the motion's logic, not personal habit.

### 5.1 Decision flow

```text
Is the animation representing constant time or endless constant motion?
├─ Yes: use linear.
└─ No:
   Is a user action introducing, hiding, opening, or dismissing an element?
   ├─ Yes: prefer a responsive ease-out curve.
   └─ No:
      Is an element already visible and changing position, size, or shape?
      ├─ Yes: prefer ease-in-out or a restrained spring.
      └─ No:
         Is it a gentle hover, color, background, opacity, or border state?
         ├─ Yes: use ease.
         └─ Default: begin with ease-out and tune.
```

### 5.2 Easing table

| Scenario | Use first | Avoid first | Why |
| --- | --- | --- | --- |
| Dropdown, popover, modal entrance | Custom `ease-out` | `ease-in` | Starts promptly and settles softly |
| Exit or dismissal | Short custom `ease-out`, sometimes very short `ease-in` | Slow exit | Dismissal should never feel held back |
| Visible element moves or morphs | `ease-in-out` or spring | abrupt entrance curve | Acceleration and deceleration are visible |
| Hover color or opacity | `ease` | dramatic curve | Gentle state transition |
| Press feedback | Fast `ease-out` | delay | Immediate tactile response |
| Marquee, spinner rotation, explicit progress | `linear` | easing with acceleration | The represented behavior is constant |
| Hold-to-confirm fill | `linear` while holding, quick `ease-out` on cancel | slow cancellation | Duration must be legible, cancellation responsive |

### 5.3 Perceived performance

Animation changes how fast a product feels even when the underlying work takes the same amount of time.

- Immediate first-frame movement makes a control feel more responsive.
- A short `ease-out` often feels faster than an equally long `ease-in` because visible progress begins immediately.
- Once one tooltip in a related group is open, subsequent tooltips should usually skip the original delay and may skip most or all entrance motion.
- Loading indicators should communicate activity clearly, but do not use faster motion to disguise a real performance problem.

Treat perceived performance as a complement to actual performance, never as a substitute for it.

### 5.4 Avoid common easing errors

- Avoid `ease-in` for opening common UI. It delays perceived reaction.
- Avoid `linear` for physical movement or overlays. It usually reads as robotic.
- Avoid inconsistent custom curves across similar components.
- Avoid over-springing serious or premium interfaces. Excess bounce changes brand tone.
- Prefer established project tokens or tested curve references over inventing a new curve for every component.
- Do not reject built-in `ease` categorically. A restrained component may benefit from it when the total motion language is cohesive.

### 5.5 Starter motion tokens

Use these as a project starting point, not as a claim that they are the exact course easing library.

```css
:root {
  --motion-duration-press: 120ms;
  --motion-duration-hover: 180ms;
  --motion-duration-ui: 220ms;
  --motion-duration-overlay: 280ms;
  --motion-duration-large: 380ms;
  --motion-duration-reveal: 600ms;

  --motion-ease-gentle: ease;
  --motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-ease-move: cubic-bezier(0.65, 0, 0.35, 1);
  --motion-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --motion-ease-reveal: cubic-bezier(0.77, 0, 0.175, 1);
  --motion-ease-linear: linear;
}
```

When the project has an established token system, extend it rather than introducing parallel variables.

## 6. Duration and sequencing

### 6.1 Duration guidance

| Animation type | Starting range |
| --- | ---: |
| Press acknowledgement | `80ms` to `150ms` |
| Hover color or icon shift | `120ms` to `220ms` |
| Tooltip entrance | `100ms` to `180ms`, after its intentional first delay |
| Dropdown or popover | `160ms` to `260ms` |
| Toast | `180ms` to `300ms` |
| Modal | `200ms` to `340ms` |
| Drawer | `240ms` to `420ms` |
| Tab indicator or small shared state | `180ms` to `300ms` |
| Card or list reorder | `220ms` to `400ms` |
| Scroll reveal | `350ms` to `650ms` |
| Editorial image reveal | `500ms` to `900ms` |
| Illustrative hero sequence | case-specific, keep interaction available |
| Hold-to-confirm | `1200ms` to `2500ms`, because it represents deliberate time |

For normal UI, start below `300ms` and justify anything slower. This is a default, not a universal prohibition. Large surfaces, deliberate actions, and explanatory sequences can take longer when they remain responsive and do not block the user.

### 6.2 Sequencing rules

- Immediate feedback should start at the same moment as the user's action.
- Dependent content may follow the container by a very small offset when it improves legibility.
- Staggers should communicate reading order rather than decorate a list.
- For common UI, use roughly `30ms` to `80ms` stagger spacing, with `40ms` to `70ms` as the default tuning range.
- Stagger should reveal reading order or hierarchy, not merely make every child move.
- Never block interaction until a decorative stagger finishes.
- Do not stagger long collections item by item. Animate the container or first visible set.
- Exit sequences should usually be shorter than entrance sequences.
- If an action is reversible, design the timeline so reversing never exposes a half-hidden interactive state.

## 7. Spring animation guidance

Springs are valuable when an element feels attached, draggable, spatially continuous, or alive. They are not automatically superior to easing curves.

### 7.1 Prefer a spring for

- Shared layout transitions.
- Drag-to-dismiss or drag constraints.
- A component changing size while staying on screen.
- Dynamic Island-like containers.
- Gestures where velocity should influence the settle.
- Reordering elements that preserve identity.

### 7.2 Prefer duration and easing for

- Simple opacity transitions.
- Hover color changes.
- Straightforward menu appearance.
- Deliberate editorial reveals.
- Exact sequences that need predictable timing.
- Time/progress representation.

### 7.3 Tuning mental model

| Spring variable | Increasing it generally causes |
| --- | --- |
| `stiffness` | Faster pull toward the target |
| `damping` | Less oscillation and less visible bounce |
| `mass` | Heavier, slower response |

Tune in this order:

1. Decide if any visible bounce fits the product.
2. Set stiffness until the interaction feels responsive.
3. Raise damping until overshoot fits the tone.
4. Adjust mass only when the object should feel intentionally heavy or light.
5. Test rapid reversals and changing content dimensions.

For premium or serious interfaces, prefer little or no perceptible bounce. For playful experiences, small controlled overshoot may support personality.

### 7.4 Spring-driven pointer motion

Directly mapping pointer position to rotation, translation, or glow can feel mechanically attached to the cursor. For decorative pointer-following motion, interpolate the raw value through a restrained spring. Do not spring functional data visualizations or values where lag could misrepresent meaning.

```tsx
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function PointerTilt() {
  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 260,
    damping: 28,
    mass: 0.8,
  });
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  return (
    <motion.div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const normalized = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointerX.set(normalized);
      }}
      onPointerLeave={() => pointerX.set(0)}
      style={{ rotateY }}
    />
  );
}
```

### 7.5 Duration and bounce spring configuration

When the animation library supports a duration-and-bounce spring interface, it can be easier to reason about than raw physics:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```

Use small bounce values, typically `0.1` to `0.3`, only when the product tone supports visible overshoot. For serious or premium interfaces, prefer near-zero perceptible bounce.

### 7.6 Motion for React spring example

```tsx
import { motion } from "motion/react";

export function ExpandingPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 36,
        mass: 0.9,
      }}
    >
      {children}
    </motion.div>
  );
}
```

## 8. High-value practical rules

These rules catch many small issues that make an interface feel unfinished.

### 8.1 Pressed buttons should acknowledge input

```css
.button {
  transition: transform var(--motion-duration-press) var(--motion-ease-out);
}

.button:active {
  transform: scale(0.97);
}
```

Only add this when it does not conflict with a highly repeated productivity action or existing component behavior.

### 8.2 Do not begin normal UI at `scale(0)`

Bad:

```css
.popover {
  transform: scale(0);
}
```

Better:

```css
.popover {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
```

The second state suggests continuity rather than an object appearing from nowhere.

### 8.3 Make overlays origin-aware

A floating element should animate from the trigger or anchor that caused it to appear.

```css
.popover {
  transform-origin: var(--popover-transform-origin, top right);
}
```

For libraries that expose transform-origin variables, use them rather than hard-coding a value:

```css
.radix-popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}

.baseui-popover {
  transform-origin: var(--transform-origin);
}
```

### 8.4 Do not replay tooltip delay in a tooltip group

The first tooltip can have a delay to prevent accidental activation. Once a tooltip in a group is already shown, moving to another related trigger should be immediate or nearly immediate.

```css
.tooltip {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 125ms var(--motion-ease-out),
    transform 125ms var(--motion-ease-out);
  transform-origin: var(--transform-origin, center bottom);
}

.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

Only use `data-instant` if the component library or your state logic actually supplies it.

### 8.5 Animate the child when hover motion can move the hit target

Animating a hovered parent upward can move the pointer out of the target and cause flicker. Prefer moving an internal visual while keeping the interactive hit area stationary.

```css
.card {
  display: block;
}

.card__surface {
  transition: transform var(--motion-duration-hover) var(--motion-ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .card:is(:hover, :focus-visible) .card__surface {
    transform: translateY(-4px);
  }
}
```

### 8.6 Use percentage translations for variable-size components

A toast, drawer, or reveal panel may change height. Percentage translations relate to its own size.

```css
.drawer {
  transform: translateY(100%);
}

.drawer[data-state="open"] {
  transform: translateY(0);
}
```

### 8.7 Blur is a last-mile bridge, not a default style

A very small temporary blur can soften a crossfade between visually dissimilar states. Use only after timing, easing, origin, and state design have been corrected.

```css
.state-swap__item {
  transition:
    opacity 180ms var(--motion-ease-out),
    filter 180ms var(--motion-ease-out);
}

.state-swap__item[data-entering="true"],
.state-swap__item[data-exiting="true"] {
  opacity: 0;
  filter: blur(2px);
}
```

Avoid large blur on large areas or scroll-driven loops because it can be expensive and visually muddy.

### 8.8 Keep tap targets usable

A tiny visual control can still offer a comfortably sized interactive hit area. Do not make a visual animation shrink the user's usable target.

```css
.icon-button {
  position: relative;
}

.icon-button::before {
  content: "";
  position: absolute;
  inset: -10px;
}
```

Confirm the final interactive area is appropriate for the project's accessibility standard.

### 8.9 Record and review what “feels off”

When tuning stalls:

1. Record the interaction.
2. Replay it at slower speed or frame by frame.
3. Look for an incorrect origin, abrupt first frame, delayed feedback, conflicting properties, overshoot, or visible layout shift.
4. Change one variable at a time: purpose, distance, easing, duration, origin, or property.
5. Retest reversal and reduced-motion behavior.

### 8.10 Use `@starting-style` for simple entry transitions

When browser support matches the project, `@starting-style` can animate a newly rendered element from an initial style without a JavaScript mount flag.

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 180ms var(--motion-ease-out),
    transform 180ms var(--motion-ease-out);

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

Use it for simple enter states. Do not use it when component presence, sequencing, cancellation, or exit logic requires a stateful animation system. Provide a class or data-attribute fallback when the browser matrix requires one.

## 9. CSS foundations

### 9.1 Transform principles

Transforms are usually the first tool for movement because they do not reposition surrounding layout.

- `translateX()` and `translateY()` communicate direction clearly.
- Percent values in `translate` are relative to the animated element itself.
- `scale()` affects the element and its children, which suits press feedback.
- Rotation should reinforce an object metaphor, not appear randomly decorative.
- Multiple transforms compose in one property. Do not let one rule accidentally overwrite another.

Use a composed variable pattern when several behaviors affect one element:

```css
.card__surface {
  --hover-y: 0px;
  --press-scale: 1;
  transform: translateY(var(--hover-y)) scale(var(--press-scale));
  transition: transform var(--motion-duration-hover) var(--motion-ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__surface {
    --hover-y: -4px;
  }
}

.card:active .card__surface {
  --press-scale: 0.99;
}
```

### 9.2 CSS transitions

Use transitions for reversible state changes. They smoothly adapt when the target value changes mid-motion.

Rules:

- Name properties explicitly. Never default to `transition: all`.
- Keep delay on its own line when delay has meaning.
- Include `:focus-visible` or `:focus-within` where hover reveals important content.
- Do not transition hidden interactive content without preserving keyboard access.

```css
.menu {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  transform-origin: top center;
  pointer-events: none;

  transition:
    opacity var(--motion-duration-ui) var(--motion-ease-out),
    transform var(--motion-duration-ui) var(--motion-ease-out);
}

.menu[data-state="open"] {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
```

### 9.3 CSS keyframes

Use keyframes for automatic, looping, or multi-stage effects whose end target is not continuously changing because of user input.

Good uses:

- Spinner rotation.
- Marquee track.
- Decorative reveal sequence.
- A single scripted intro when interruption is not necessary.

Avoid as a first choice for:

- Hover states.
- Rapidly toggled overlays.
- Toast stack reflow.
- Tabs whose selection can change rapidly.

```css
.spinner {
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 9.4 Clip-path

Use `clip-path: inset()` for masks or overlays where the layout box should remain stable while visible content changes.

```css
.editorial-image {
  clip-path: inset(0 0 100% 0);
}

.editorial-image.is-visible {
  animation: editorial-reveal var(--motion-duration-reveal)
    var(--motion-ease-reveal) both;
}

@keyframes editorial-reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

High-value patterns:

- Image reveals without layout expansion.
- Before/after overlays.
- Highlight masks for tab selection.
- Hold-to-confirm visual progress.
- Text or icon state wipes.

Performance caution: `clip-path` is often suitable for these effects, but profile large images, complex shapes, and many simultaneous masks on the real target device.

### 9.5 SVG motion

Use SVG when the object is fundamentally vector-based: a line, icon, mark, stamp, pointer, path, or illustration.

Path-drawing setup:

```css
[data-draw-path] {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  transition: stroke-dashoffset 700ms var(--motion-ease-out);
}

[data-draw-path].is-visible {
  stroke-dashoffset: 0;
}
```

```js
document.querySelectorAll("[data-draw-path]").forEach((path) => {
  const length = path.getTotalLength();
  path.style.setProperty("--path-length", String(length));
});
```

For transformed SVG children:

```css
.svg-part {
  transform-box: fill-box;
  transform-origin: center;
}
```

Verify the chosen origin visually because a mathematically centered origin may still feel visually unbalanced.

### 9.6 3D transforms

Use `rotateX()`, `rotateY()`, `translateZ()`, `perspective`, and `transform-style: preserve-3d` only when depth supports the object metaphor. A 3D transform should not be the default way to make a flat control feel interesting.

```css
.scene {
  perspective: 800px;
}

.scene__object {
  transform-style: preserve-3d;
  transform: rotateY(12deg) translateZ(24px);
}
```

Check text legibility, backface visibility, overflow, and Safari behavior. Keep interactive hit testing predictable, and provide a flat reduced-motion state.

## 10. Progressive platform features

### 10.1 View Transition API

Use the View Transition API as a progressive enhancement when the user needs continuity between DOM states or pages and browser support is acceptable for the project.

Suitable cases:

- Navigating from a resource card to its article hero.
- Selected image expanding into a detail view.
- Filtered or reordered content where identity should remain clear.
- A tabs or page transition where snapshot-based continuity simplifies implementation.

Rules:

- Supply a normal non-animated update as the fallback.
- Disable or simplify it for reduced motion.
- Do not force page transitions into frequently repeated workflows.
- Do not assign shared names indiscriminately across unrelated elements.

```js
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateView(updateDOM) {
  if (!document.startViewTransition || reduceMotion.matches) {
    updateDOM();
    return;
  }

  document.startViewTransition(() => updateDOM());
}
```

This is an optional extension, not a replacement for clear component state.

### 10.2 Web Animations API

Use WAAPI when CSS can describe the keyframes but JavaScript needs playback control, cancellation, reversal, or dynamically computed values without introducing another library.

```js
const animation = element.animate(
  [
    { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    { clipPath: "inset(0 0 0 0)", opacity: 1 },
  ],
  {
    duration: 600,
    easing: "cubic-bezier(0.77, 0, 0.175, 1)",
    fill: "both",
  }
);

// Later, when state changes:
animation.cancel();
```

Rules:

- Store the returned `Animation` object when later cancellation or reversal is possible.
- Cancel or replace stale animations before starting a new one.
- Keep semantic state in application logic. Do not treat the animation's visual state as the source of truth.
- Respect reduced motion before creating the animation.
- Profile `clip-path`, filters, and large painted areas on target devices.

## 11. Accessibility and interaction safety

### 11.1 Reduced motion strategy

`prefers-reduced-motion` does not mean removing all feedback. It means removing, reducing, or replacing motion that could distract or cause discomfort while preserving meaning.

Classify motion:

| Motion type | Reduced-motion treatment |
| --- | --- |
| Large spatial entrance, parallax, zoom, looping background | Remove or replace with instant state or short opacity |
| Functional state confirmation | Keep meaning using color, icon, text, or light opacity |
| Literal progress required for action | Keep clear progress, avoid unnecessary travel |
| Decorative flourish | Remove |
| Scroll-linked motion | Disable or greatly simplify |

Scoped CSS approach:

```css
[data-motion="reveal"] {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 420ms var(--motion-ease-out),
    transform 420ms var(--motion-ease-out);
}

[data-motion="reveal"].is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-motion="reveal"] {
    opacity: 1;
    transform: none;
    transition: none;
  }

  [data-motion="ambient"],
  [data-motion="parallax"] {
    animation: none !important;
    transform: none !important;
  }
}
```

### 11.2 Input parity

- Content revealed by hover must also be available by focus, click, or normal reading flow.
- Never remove focus rings for motion aesthetics.
- Hover transforms should run only where true hover and fine pointer input exist.
- Press states should not prevent keyboard activation.
- Do not hide control labels behind motion alone.
- Modals and popovers require correct focus management outside the animation itself.

```css
@media (hover: hover) and (pointer: fine) {
  .card:is(:hover, :focus-within) .card__surface {
    transform: translateY(-4px);
  }
}
```

For keyboard-only users, keep the focus-visible state legible even when movement is disabled.

### 11.3 Destructive hold actions

A visual hold-to-confirm fill alone must not trigger destructive behavior prematurely. Production implementation should:

- Trigger the destructive action only after the required hold duration completes.
- Cancel on pointer release, pointer cancellation, or leaving the intended hold interaction.
- Provide a keyboard-accessible equivalent, such as hold on Space/Enter with clear feedback or a confirmation dialog.
- Announce state where necessary.

The visual fill can use `clip-path`, but the action logic requires event and timer handling.

## 12. Performance and rendering discipline

### 12.1 Preferred properties

Begin with:

- `transform`
- `opacity`
- `clip-path: inset()` for appropriate masks after profiling
- SVG stroke properties for vector-specific effects
- CSS custom properties that feed a single composed `transform`

Be cautious with:

- `height`, `width`, `top`, `left`, `margin`, `padding`
- large animated `box-shadow`
- large or repeated `filter: blur()`
- large animated gradients
- scroll-linked effects on many large images
- animations whose JS work competes with page load or rendering

### 12.2 No layout regression rule

When the animation task is polish or interaction:

- Keep existing element width, height, grid behavior, aspect ratio, image fitting, and layout breakpoints unless explicitly requested otherwise.
- Add animation to a child wrapper, pseudo-element, overlay, or transform layer when moving the original layout box would break sizing.
- Report any required structural wrapper before giving code.

This is particularly important for Webflow layouts where visual classes already control the final size.

### 12.3 CSS custom properties in hot interaction loops

CSS custom properties are useful for composition, but inherited variables changed on a parent can trigger style recalculation across many descendants. For high-frequency drag or pointer tracking, profile whether directly updating the animated element's `transform` is cheaper.

```js
// Convenient for low-frequency state changes.
element.style.setProperty("--drag-y", `${distance}px`);

// Often preferable in a high-frequency pointer loop after profiling.
element.style.transform = `translate3d(0, ${distance}px, 0)`;
```

Do not ban custom properties globally. Use them for maintainable state composition, then optimize only verified hot paths.

### 12.4 CSS, WAAPI, and JavaScript under load

Predetermined CSS transitions and keyframes can remain smoother when the main thread is busy because the browser may run compositor-eligible work independently. JavaScript-driven animation is still appropriate for gestures, measurements, dynamic targets, and stateful interruption.

Do not assume that a library shorthand or a `transform` string automatically guarantees compositor-only execution. Inspect the generated styles, the properties being animated, and the browser performance trace. Prefer the simplest primitive that stays smooth during real page load and interaction.

### 12.5 `will-change` discipline

`will-change` may improve a problematic transform animation, but it is not a blanket performance switch.

Use it only:

- For a verified flicker, jitter, or expensive transition.
- On a small number of animated surfaces.
- Around the interaction window, where feasible.

Example event-scoped pattern:

```js
const surface = document.querySelector(".card__surface");

surface?.addEventListener("pointerenter", () => {
  surface.style.willChange = "transform";
});

surface?.addEventListener("transitionend", () => {
  surface.style.willChange = "auto";
});
```

For persistent, frequently animated UI, test whether a narrowly applied CSS `will-change: transform` is justified.

### 12.6 Performance audit procedure

1. Confirm the animation is purposeful before optimizing it.
2. Check whether movement can be expressed through transform or opacity.
3. Check for layout shifts, overflow, and excessive repaint areas.
4. Test during real page load and during rapid interaction.
5. Test mobile hardware or throttled conditions where feasible.
6. Slow the animation to `2x` to `5x` duration or use the DevTools Animations panel to inspect the first frame, transform origin, property synchronization, and final settle.
7. Step through coordinated motion frame by frame when two states appear to overlap or drift out of sync.
8. Test pointer and touch gestures on physical hardware when possible. Simulators are useful, but they do not reproduce every latency, scrolling, and multi-touch behavior.
9. Use browser performance tooling if visual jank remains.
10. Reduce simultaneous effects before adding heavier optimization tricks.

## 13. Motion for React

Use Motion for React when animation is strongly connected to React state, component presence, gestures, or layout continuity.

### 13.1 Best-fit uses

- Enter and exit of mounted components.
- Layout changes and shared element transitions.
- Drag, tap, hover, or velocity-aware gestures.
- Spring-driven morphs.
- Stateful illustrations that respond to input.
- Values derived from user interaction using motion values.

Do not assume every Motion animation will remain smooth during heavy page work merely because it animates `x`, `y`, or `scale`. Inspect the generated transform, profile the real interaction, and prefer CSS or WAAPI for predetermined motion when that produces a more resilient result under load.

### 13.2 Basic entrance

```tsx
import { motion } from "motion/react";

export function Card() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
```

### 13.3 Presence and exit

Exit animations require elements to leave the React tree through `AnimatePresence`.

```tsx
import { AnimatePresence, motion } from "motion/react";

export function Popover({ open }: { open: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="popover"
          initial={{ opacity: 0, y: -4, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -2, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top right" }}
        />
      ) : null}
    </AnimatePresence>
  );
}
```

### 13.4 Layout continuity

```tsx
import { motion } from "motion/react";

export function ActiveIndicator() {
  return (
    <motion.span
      layoutId="active-tab-indicator"
      transition={{ type: "spring", stiffness: 500, damping: 42 }}
    />
  );
}
```

Use `layout` for size or position change of one component and `layoutId` when the same perceived object moves between component states.

### 13.5 Interaction-derived values

`useSpring` and `useTransform` are useful for illustrations or gestural interactions, not for functional charts where motion could misrepresent data.

```tsx
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function PointerGlow() {
  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 360, damping: 34 });
  const opacity = useTransform(x, [-100, 0, 100], [0.2, 1, 0.2]);

  return <motion.div style={{ x, opacity }} />;
}
```

### 13.6 Reduced motion in Motion

```tsx
import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.12 : 0.24 }}
    >
      {children}
    </motion.div>
  );
}
```

## 14. GSAP and Webflow implementation strategy

### 14.1 Platform choice for modern Webflow

Webflow now provides Interactions powered by GSAP as a visual timeline workflow and supports GSAP in Webflow projects. Choose the simplest maintainable route:

| Scenario | Preferred approach |
| --- | --- |
| Basic hover, press, focus state | CSS in Webflow custom code or style layer |
| Simple page-load or scroll animation that the designer must adjust visually | Webflow Interactions with GSAP |
| Reusable component-scoped visual animation | Webflow Interactions with GSAP scoped to the component |
| Complex conditional behavior, DOM measurement, hover synchronization, CMS loops, advanced cleanup | GSAP custom code |
| React component outside Webflow or state-driven application UI | Motion for React |

Do not automatically replace a working native/visual Webflow interaction with custom code. Use custom code only when it makes logic, reuse, or fidelity materially better.

### 14.2 Webflow custom-code rules

- Use data attributes for JS targeting. Keep visual class names available for styling.
- Never change authored sizing classes merely to add movement.
- Initialize once, especially when scripts can execute more than once in previews or dynamic contexts.
- Scope query selectors to the component or section.
- Respect touch and reduced motion.
- Kill or revert timelines and ScrollTriggers where lifecycle changes exist.
- Do not load a second GSAP copy if the project already enables it through Webflow.

Example markup:

```html
<article class="team_card" data-team-card>
  <div class="team_image" data-team-image></div>
  <div class="team_card-gradient" data-team-gradient></div>
  <div class="team_content" data-team-content></div>
</article>
```

This structure leaves layout classes in charge of sizing while data attributes locate motion layers.

### 14.3 Component-scoped GSAP hover pattern

```html
<script>
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reduceMotion || !canHover || typeof gsap === "undefined") return;

    document.querySelectorAll("[data-team-card]").forEach((card) => {
      if (card.dataset.motionReady === "true") return;
      card.dataset.motionReady = "true";

      const image = card.querySelector("[data-team-image]");
      const content = card.querySelector("[data-team-content]");
      if (!image || !content) return;

      const enter = () => {
        gsap.to(image, {
          scale: 1.04,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto"
        });
        gsap.to(content, {
          y: -4,
          duration: 0.28,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      const leave = () => {
        gsap.to([image, content], {
          clearProps: "transform",
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("focusin", enter);
      card.addEventListener("focusout", leave);
    });
  });
</script>
```

Important: apply scale to the image or inner surface, not the component box whose Webflow dimensions and grid position must remain fixed.

### 14.4 GSAP responsive and reduced-motion setup

```js
const mm = gsap.matchMedia();

mm.add(
  {
    animate: "(prefers-reduced-motion: no-preference) and (min-width: 992px)",
    reduce: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    const { animate, reduce } = context.conditions;

    if (reduce) {
      gsap.set("[data-reveal]", { clearProps: "all" });
      return;
    }

    if (animate) {
      const timeline = gsap.timeline({
        defaults: { duration: 0.36, ease: "power3.out" }
      });

      timeline.from("[data-reveal='title']", { y: 18, opacity: 0 })
        .from("[data-reveal='body']", { y: 12, opacity: 0 }, "<0.08")
        .from("[data-reveal='cta']", { y: 8, opacity: 0 }, "<0.08");
    }
  }
);
```

Use `gsap.matchMedia()` for responsive and motion-preference conditions so animations created in a condition can be reverted when the condition no longer matches.

### 14.5 Scroll animation restraint

For scroll-driven motion:

- Use it to clarify progression or support storytelling.
- Avoid scrolljacking.
- Prefer subtle reveals over constant movement for text-heavy pages.
- Disable parallax or large transforms for reduced motion.
- Test after images and fonts load because section measurements may change.

## 15. Gesture and drag interactions

Use gesture physics only when the user is directly manipulating an object or when momentum communicates a meaningful dismissal. Do not add drag behavior to controls that work better as simple clicks, scroll, or native platform interactions.

### 15.1 Dismiss by distance or velocity

A quick flick should not always require the same travel distance as a slow drag. Evaluate both displacement and velocity.

```js
const elapsedMs = Math.max(performance.now() - dragStartedAt, 1);
const velocity = Math.abs(dragDistancePx) / elapsedMs;

const shouldDismiss =
  Math.abs(dragDistancePx) >= distanceThresholdPx ||
  velocity >= velocityThresholdPxPerMs;
```

A value around `0.11px/ms` can be a starting heuristic for some interfaces, not a universal constant. Tune it against device size, interaction axis, component mass, and real hardware.

### 15.2 Apply damping beyond natural boundaries

When the user drags past a permitted boundary, reduce additional travel progressively instead of stopping abruptly.

```js
function damp(distance, factor = 0.35) {
  const direction = Math.sign(distance);
  return direction * Math.pow(Math.abs(distance), 0.85) * factor;
}
```

Use the damped value only beyond the boundary. Keep normal travel one-to-one so the control still feels attached to the pointer.

### 15.3 Capture the active pointer

On drag start:

- Store `event.pointerId`.
- Call `setPointerCapture(event.pointerId)` on the drag surface.
- Ignore move and release events from other pointers.
- Release capture on completion or cancellation.
- Handle `pointercancel` as a real cancellation path.

```js
let activePointerId = null;

function onPointerDown(event) {
  if (activePointerId !== null) return;
  activePointerId = event.pointerId;
  event.currentTarget.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (event.pointerId !== activePointerId) return;
  // Update drag position.
}

function finishDrag(event) {
  if (event.pointerId !== activePointerId) return;
  event.currentTarget.releasePointerCapture?.(event.pointerId);
  activePointerId = null;
}
```

### 15.4 Prevent multi-touch jumps

Never allow a second finger or pen to replace the active drag pointer mid-gesture. Track one active pointer until the gesture ends. When the component supports pinch or multi-touch intentionally, use a separate multi-pointer model rather than reusing single-drag logic.

### 15.5 Prefer friction to invisible walls

Allow a small amount of resisted travel beyond a boundary when it reinforces physical continuity. Snap back with a restrained spring or ease-out. Do not let overscroll expose broken layout, inaccessible content, or an unintended dismissal path.

### 15.6 Gesture accessibility and reduced motion

- Provide a non-drag control for every essential drag action.
- Keep keyboard dismissal, close buttons, or explicit navigation available.
- Avoid relying on velocity as the only way to complete an action.
- Under reduced motion, preserve direct manipulation but remove decorative overshoot and large snap-back travel where possible.
- Test inside scroll containers to prevent gesture logic from blocking expected page scrolling.

## 16. Component recipes

### 16.1 Reusable component craft

When the work is a reusable component rather than a one-off animation:

1. **Minimize setup friction.** The consumer should not need extra hooks, context, or boilerplate unless the behavior genuinely requires it.
2. **Ship strong defaults.** Timing, easing, spacing, focus behavior, touch behavior, and reduced motion should work before customization.
3. **Keep options purposeful.** Expose variables that represent real design decisions. Do not expose every internal number.
4. **Handle edge cases invisibly.** Pause timers when the document is hidden, preserve pointer ownership during drag, avoid hover gaps, and clean up observers and timelines.
5. **Use transitions for rapidly changing targets.** Dynamic toasts, stacks, and toggled states should retarget smoothly instead of restarting keyframes.
6. **Match motion to component identity.** A playful component may allow modest overshoot. A professional dashboard should usually be crisp, restrained, and fast.
7. **Document through interaction.** For public components, provide a live example and paste-ready usage that demonstrate the default experience.

When opacity and layout size change together, tune them as one perceptual event. There is no universal ratio. Ensure the item does not look fully gone while it still occupies a conspicuous amount of space, and do not collapse height so early that content appears clipped.

Use asymmetric timing deliberately. A user-controlled hold may progress slowly and linearly because it represents deliberate time, while cancellation and release should usually resolve quickly.

### 16.2 Premium card hover

Purpose: add depth and focus without moving the layout cell.

```css
.premium-card {
  position: relative;
  overflow: hidden;
}

.premium-card__visual {
  transform: scale(1);
  transition: transform 520ms var(--motion-ease-out);
}

.premium-card__content {
  transform: translateY(0);
  transition: transform 260ms var(--motion-ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .premium-card:is(:hover, :focus-within) .premium-card__visual {
    transform: scale(1.04);
  }

  .premium-card:is(:hover, :focus-within) .premium-card__content {
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .premium-card__visual,
  .premium-card__content {
    transition: none;
    transform: none;
  }
}
```

### 16.3 Popover

Purpose: orient the user to a control that created new content.

```css
.popover {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
  transform-origin: var(--popover-transform-origin, top right);
  pointer-events: none;
  transition:
    opacity 180ms var(--motion-ease-out),
    transform 180ms var(--motion-ease-out);
}

.popover[data-state="open"] {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

@media (prefers-reduced-motion: reduce) {
  .popover {
    transform: none;
    transition-property: opacity;
  }
}
```

### 16.4 Tabs continuity with clipped active layer

Purpose: make background and text state shift together rather than visibly lagging.

Concept:

1. Render the normal labels.
2. Overlay a selected-state layer.
3. Move or clip the selected layer to the active tab.
4. Animate only the coherent mask/indicator rather than separately timing unrelated color changes.

Simple indicator base:

```css
.tabs__indicator {
  transform: translateX(var(--active-x));
  width: var(--active-width);
  transition:
    transform 240ms var(--motion-ease-move),
    width 240ms var(--motion-ease-move);
}
```

For a high-fidelity highlighted text layer, use a clipped duplicate layer or a shared layout implementation, then ensure accessible labels are not duplicated for assistive technologies.

### 16.5 Toast stack

Purpose: notify while maintaining continuity as new toasts alter the stack.

- Use transitions or Motion layout because target positions can change during the motion.
- Keep direction consistent with dismissal gesture.
- Avoid long entrance effects for repeated notifications.

CSS base:

```css
.toast {
  transition:
    transform 240ms var(--motion-ease-gentle),
    opacity 200ms var(--motion-ease-gentle);
}
```

Motion layout base:

```tsx
<motion.li
  layout
  transition={{ type: "spring", stiffness: 500, damping: 42 }}
/>
```

### 16.6 Drawer

Purpose: show that content is attached to an edge.

```css
.drawer {
  transform: translateX(100%);
  transition: transform 320ms var(--motion-ease-out);
}

.drawer[data-state="open"] {
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .drawer {
    transition-duration: 1ms;
  }
}
```

A gesture-driven drawer is better handled with Motion or a tested component library than with ad hoc pointer code.

### 16.7 Visual hold-to-confirm

Purpose: indicate an intentional waiting threshold. This CSS controls only appearance, not deletion logic.

```css
.hold-button {
  position: relative;
  overflow: hidden;
  transition: transform 150ms var(--motion-ease-out);
}

.hold-button:active {
  transform: scale(0.97);
}

.hold-button__fill {
  position: absolute;
  inset: 0;
  pointer-events: none;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 180ms var(--motion-ease-out);
}

.hold-button[data-holding="true"] .hold-button__fill {
  clip-path: inset(0 0 0 0);
  transition: clip-path var(--hold-duration, 1800ms) linear;
}
```

The implementation must separately complete or cancel the action based on hold duration and accessible input behavior.

### 16.8 Editorial reveal for a serious brand

Purpose: provide calm emphasis for an image or sculptural visual, not call attention to animation itself.

```css
.editorial-visual {
  clip-path: inset(0 0 100% 0);
  opacity: 0.92;
}

.editorial-visual.is-visible {
  animation: editorial-visual-reveal 720ms var(--motion-ease-reveal) both;
}

@keyframes editorial-visual-reveal {
  to {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .editorial-visual {
    clip-path: none;
    opacity: 1;
    animation: none;
  }
}
```

For a premium legal, architecture, finance, or editorial brand, use restrained movement, very limited bounce, and consistent reveals rather than many unrelated effects.

## 17. Diagnostic table: when an animation feels wrong

| Symptom | Likely cause | First correction | Escalation |
| --- | --- | --- | --- |
| Overlay feels slow | `ease-in`, long duration, delayed start | Change to responsive `ease-out`; shorten duration | Record and compare curves |
| Popover feels detached | Wrong transform origin | Set origin from trigger position | Use library-provided origin variable |
| Element feels like it appears from nowhere | Starts at `scale(0)` or abrupt visibility | Begin at `scale(0.95)` with opacity | Rework spatial metaphor |
| Hover flickers | Moving the hit target | Move child surface instead of parent | Use JS hover state only if needed |
| Tab text and highlight feel out of sync | Independent color and indicator transitions | Use shared mask or clipped active layer | Shared layout / View Transition enhancement |
| New toast jumps mid-motion | Non-interruptible animation for changing target | Use transition or layout animation | Use Motion layout |
| Scroll reveal causes shift | Layout dimension is animated or asset size missing | Reserve layout size; use transform/clip/opacity | Inspect layout and media loading |
| Motion feels cheap or loud | Too much distance, bounce, or unrelated effects | Reduce amplitude; unify tokens | Remove nonessential effects |
| State swap feels visually harsh | Two distinct states only crossfade | Fix timing first, then try tiny blur | Redesign transition |
| Mobile feels stuck after tap | Hover state applies on touch | Wrap hover motion in pointer media query | Supply click/tap state |
| Jank during page load | Main-thread or paint-heavy motion | Prefer compositor-friendly properties | Profile; move logic or reduce effects |
| Reduced-motion mode loses meaning | Animation was carrying state alone | Replace motion with visible state feedback | Redesign component semantics |
| Drag jumps to another finger | Active pointer is not tracked | Store one `pointerId` and ignore others | Rebuild gesture state model |
| Drag stops outside the element | Pointer capture is missing | Call `setPointerCapture()` on press | Audit cancel and release paths |
| Boundary feels like an invisible wall | Position is clamped abruptly | Add progressive damping beyond the boundary | Tune spring return on real hardware |
| Reusable component needs excessive setup | Defaults or API are over-configurable | Reduce setup and improve defaults | Redesign component contract |
| Motion drops frames during page load | Main-thread work competes with JS-driven animation | Test CSS or WAAPI for predetermined motion | Profile generated styles and rendering |

## 18. Review and critique workflow

When the user asks for a review of UI or animation code, begin with one Markdown table using exactly these columns:

| Before | After | Why |
| --- | --- | --- |
| Describe the current code or behavior | Show the corrected code or behavior | Explain the practical reason |

Rules:

- Use one row per issue.
- Do not output repeated prose blocks labeled `Before:` and `After:`.
- Preserve what is already working instead of manufacturing changes for every row.
- When there is no literal source line, describe the observed behavior in the Before column.
- When the user asks only for final implementation rather than critique, follow the code output contract instead of forcing a review table.

After the table, respond in this order:

1. **Observed purpose:** what the animation is trying to communicate and how frequently it appears.
2. **What is already working:** preserve good choices.
3. **Primary problem:** identify the highest-impact issue first, even if several rows appear in the comparison table.
4. **Motion specification:** duration, easing, movement, origin, properties, and reduced-motion state.
5. **Implementation path:** CSS, Webflow Interactions with GSAP, GSAP code, or Motion.
6. **Code/setup:** provide a paste-ready implementation when requested.
7. **Verification checklist:** list interaction tests relevant to this component.

When the user provides an image of start and end states but no video, do not pretend to know exact timing. Infer the likely transition and mark adjustable variables clearly.

## 19. Code output rules

When writing implementation code:

- Provide complete replacement code when the user requests final code.
- Preserve existing structure and dimensions unless a wrapper or state change is necessary, and explain that change.
- Expose adjustable variables at the top: duration, easing, distance, scale, gradient, or selector.
- Keep selectors scoped.
- Prefer data attributes for JS hooks.
- Include reduced-motion handling for meaningful movement.
- Include hover media queries for hover-only motion.
- Avoid `transition: all`.
- Avoid duplicated libraries or repeated initializers.
- Avoid visual-only destructive controls without real completion logic.
- For gesture code, include active pointer ownership, cancellation, and cleanup rather than only the happy path.
- For reusable components, favor strong defaults and a small API over many exposed tuning props.
- For Webflow, say where code belongs only when the user asks for implementation instructions.

## 20. Motion audit checklist

Before shipping, verify:

### Purpose and feel

- [ ] The animation has a clear job.
- [ ] Its frequency justifies its existence.
- [ ] The animation supports the product tone.
- [ ] Distance and scale are restrained enough for the interface.

### Timing and motion language

- [ ] Easing matches the interaction category.
- [ ] Normal UI is fast enough to feel responsive.
- [ ] Enter, steady-state movement, and exit are not treated identically without reason.
- [ ] Similar components use the same motion tokens.

### Spatial and interaction logic

- [ ] Transform origin matches the trigger or physical attachment.
- [ ] Enter and exit direction are coherent.
- [ ] Rapid toggles and interrupted states remain smooth.
- [ ] Hover does not shift its own hit target into flicker.
- [ ] Keyboard and touch behavior work.
- [ ] Drag interactions track one active pointer and handle `pointercancel`.
- [ ] Velocity thresholds and damping were tested on real hardware where possible.
- [ ] Decorative staggers do not block interaction.

### Accessibility

- [ ] Meaning is not available only through motion.
- [ ] Reduced-motion behavior is present and useful.
- [ ] Focus indicators remain visible.
- [ ] No critical interaction depends only on hover.
- [ ] Destructive or time-based controls are accessible and safe.

### Performance and implementation

- [ ] Layout size is preserved unless a deliberate layout transition is required.
- [ ] Transforms and opacity are preferred where appropriate.
- [ ] Paint-heavy effects are tested and limited.
- [ ] Initialization and cleanup are safe.
- [ ] High-frequency CSS variable updates were profiled if many descendants inherit them.
- [ ] Predetermined motion was compared against CSS or WAAPI when main-thread load is a concern.
- [ ] The animation was inspected in slow motion or frame by frame when coordination felt wrong.
- [ ] Reusable components have strong defaults and do not require unnecessary setup.
- [ ] Webflow, React, or custom-code choice matches the project's actual stack.

## 21. Source-informed rules and implementation extensions

### Public source-informed principles

The following parts align with publicly available animations.dev or Emil Kowalski material:

- Easing selection by motion type.
- Fast UI and perceived responsiveness.
- Purpose and frequency of use.
- Button press scale feedback.
- Avoiding `scale(0)` for normal enter motion.
- Origin-aware popovers.
- No repeat delay for subsequent tooltips.
- Transforms, transitions, interruptibility, and clip-path use cases.
- Holding progress with linear timing and rapid cancellation.
- Recording animations and examining fine detail.
- Performance and reduced-motion responsibility.
- Taste as analysis, iteration, and exposure to strong examples.
- Invisible details, strong defaults, cohesive component identity, and low-friction developer experience.
- Perceived performance and immediate first-frame response.
- Asymmetric timing for deliberate progress versus rapid cancellation.
- Slow-motion, frame-by-frame, and real-device review.

### Production extensions in this skill

The following are practical additions made for implementation reliability:

- Webflow Interactions with GSAP versus custom-code selection.
- Data-attribute scoping and duplicate-initialization guardrails.
- No-layout-regression rule for existing Webflow designs.
- Destructive hold-action safety requirements.
- Progressive View Transition API and Web Animations API guidance.
- `@starting-style` as a progressive CSS entry primitive.
- Gesture rules for velocity, damping, pointer capture, active pointer ownership, and multi-touch protection.
- Motion for React and GSAP cleanup-oriented patterns.
- Performance nuance for CSS custom properties, library-generated transforms, and animation under main-thread load.
- Explicit diagnostic, comparison-table, and QA workflows.

## 22. Reference sources

Use these sources for verification and deeper study:

- animations.dev course and public lesson index: `https://animations.dev/`
- Public easing lesson: `https://animations.dev/learn/animation-theory/the-easing-blueprint`
- Public CSS transitions lesson: `https://animations.dev/learn/css-animations/transitions`
- Emil Kowalski, Great Animations: `https://emilkowal.ski/ui/great-animations`
- Emil Kowalski, Good vs Great Animations: `https://emilkowal.ski/ui/good-vs-great-animations`
- Emil Kowalski, 7 Practical Animation Tips: `https://emilkowal.ski/ui/7-practical-animation-tips`
- Emil Kowalski, You Don't Need Animations: `https://emilkowal.ski/ui/you-dont-need-animations`
- Emil Kowalski, CSS Transforms: `https://emilkowal.ski/ui/css-transforms`
- Emil Kowalski, The Magic of Clip Path: `https://emilkowal.ski/ui/the-magic-of-clip-path`
- Emil Kowalski, Building a Hold to Delete Component: `https://emilkowal.ski/ui/building-a-hold-to-delete-component`
- Emil Kowalski, Developing Taste: `https://emilkowal.ski/ui/developing-taste`
- Emil Kowalski, Agents with Taste: `https://emilkowal.ski/ui/agents-with-taste`
- Motion for React documentation: `https://motion.dev/docs/react`
- GSAP `matchMedia()` documentation: `https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/`
- GSAP accessibility guidance: `https://gsap.com/resources/a11y/`
- Webflow Interactions with GSAP documentation: `https://help.webflow.com/hc/en-us/articles/42832301823635-Intro-to-Interactions-with-GSAP`
- MDN `prefers-reduced-motion`: `https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`
- MDN `@starting-style`: `https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style`
- MDN Web Animations API: `https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API`
- MDN Pointer Events: `https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events`
- MDN View Transition API: `https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API`
- Easing reference explorer: `https://easing.dev/`
- Easing reference collection: `https://easings.co/`

## Final instruction to the agent

Do not make an animation more complicated merely to make it impressive. Diagnose purpose, frequency, easing, timing, distance, origin, interruption, gesture ownership, accessibility, perceived performance, and actual rendering cost first. Then choose the smallest implementation that creates the intended feeling without changing the layout or slowing the user's work. For reusable components, make invisible correctness and strong defaults part of the implementation, not optional polish.
