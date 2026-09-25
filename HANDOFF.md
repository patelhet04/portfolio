# Handoff: portfolio redesign → motion fixes, then cleanup

Branch: `redesign/inference-trace` (nothing committed yet; `main` is untouched)
Dev server: `npm run dev` → http://localhost:3000

## What this is

The portfolio was rebuilt around one idea: **the site reads like a streamed AI response and a trace viewer**, because that is Het's actual work (agents, RAG, LLM infrastructure).

- **Hero:** the question "who is Het Patel?" and an answer that streams in token by token, with live stats (tokens, seconds, tok/s). The Memoji video sits in a "model card" panel.
- **Experience:** a trace waterfall with separate Work and Education lanes on one time axis. Hover to scrub through time; each span opens a detail page at `/experience/[slug]`.
- **Stack:** the skills are shown as tokenizer output. Hovering a token highlights the spans that used it.
- **About**, **Testimonials** ("Human feedback"), **Outputs** (work and writing, with a cursor-following preview), and **Contact** as a chat composer sent through EmailJS.
- **Palettes:** Default (lime) plus Spring, Summer, Fall and Winter, each with a light and dark version. The top bar has a palette menu. First-time visitors get Fall; the old Auto option was removed at the owner's request.
- **Motion:** page-to-page view transitions (the span bar and title morph into the detail page), a circular reveal when the palette or theme changes, spring easing on presses and popovers, and squircle corners where the browser supports `corner-shape`.

## Locked: the owner loves these, do not change

- **Format and layout** of every section and the detail pages, including section order.
- **Fonts:** Host Grotesk (sans) and Martian Mono (mono), loaded from Google Fonts in `layout.tsx`.
- **Colors:** all 10 palettes in `styles/tokens.css` (5 seasons × light/dark), and which role gets which color.
- **Highlights:** the highlighter marks (the lime sweep under "hold up in production", highlighted phrases in testimonials, the attention flash on each new token).
- **Corner language:** the `--r-*` radius tokens and the `corner-shape: squircle` enhancement.
- **Copy and content:** headings, the About text, span summaries and measurements. These came from the owner's resume and LinkedIn and were reviewed.
- **Motion character:** the ideas stay the same. Text streams in, spans draw in, bars shrink from before to after, presses spring back, and palettes spread out in a circle. How they're implemented and timed can change.

## Session 1: fix the animations and improve page transitions

This is the priority. Use Emil Kowalski's skills in `.claude/skills/` (`improve-animations`, `review-animations`, `animate`). They fix motion without touching the design.

### What the owner has noticed

The animations are "breaking a bit". Before starting, the owner should add specifics here: which animation, on which page, in which browser, and what it does wrong.

- _(add notes here)_

### Suspects, most fragile first

1. **Hero stream** (`components/Hero.tsx`): the caret is moved around React-owned DOM nodes, and every token animates `filter: blur()`. Candidate for a rewrite that keeps the same look with the DOM owned properly.
2. **Testimonial streaming** (`components/Testimonials.tsx`): toggles word classes outside React state and mixes a `data-streaming` attribute set by both React and the effect. Switching tabs quickly may leave words hidden.
3. **Trace draw-in on return** (`components/Trace.tsx`): coming back from a detail page relies on a layout effect restoring the drawn state before the view-transition snapshot. If it loses that race, the bar morphs into an invisible row.
4. **Title morph** (`globals.css`, the `title-morph` group): a 22px heading on the home page morphs into an 88px heading on the detail page as a stretched snapshot, which can look blurry or distorted.
5. **Stacked entrances on detail pages:** the whole page rises in (root transition) while its sections also stagger in (`.sd-in`). Together they may feel busy or late.
6. **Outputs list**: the list remounts on every filter change and replays its row entrance.
7. **Browser support:** `view-transition-class` needs Chrome 125+ or Safari 18.2+. Other browsers should fall back to a clean crossfade or an instant switch.

### Page-transition ideas that keep the format

- **Back reverses the morph:** the detail page's bar shrinks back into its row on the trace, and the scroll position returns to the trace instead of the page top.
- **Prev/next spans travel along the time axis:** going to the next span slides the content sideways, and the timeline bar glides to its new position, since the pager moves through a timeline.
- **Titles crossfade with a slight blur** instead of stretching between sizes.
- **Nav links on the home page** scroll smoothly with no page transition. From a detail page, they do a quick transition and land on the right section.
- **One entrance per page:** pick either the page rise or the section stagger, not both.

### Paste this as the first message of session 1

> Read HANDOFF.md first. The design of this portfolio is approved and I love it: the layout, fonts, colors, highlights and corner shapes stay exactly as they are (see "Locked" in HANDOFF.md).
>
> This session is only about motion. Some animations are breaking, and I want better, more Apple-like page-to-page transitions.
>
> Use the improve-animations skill to audit every animation and transition in the codebase, starting with the suspects listed in HANDOFF.md. Show me the prioritized findings before changing anything. Then fix the broken animations and improve the page transitions using the ideas in HANDOFF.md, keeping the same motion character. Test each change in the browser, including going back from a detail page. If a change would visibly alter the look of anything, ask me first.

## Session 2: Impeccable — mobile, consistency and cleanup (after motion is settled)

Fix without redesigning. Anything that would visibly change the look goes to the owner as a suggestion instead.

The Impeccable launcher downloads a small binary the first time it runs; that's expected. Run the commands in this order:

1. **`/impeccable document`:** writes DESIGN.md from the current code, so Impeccable treats this design as the established system instead of starting over. Everything after this must follow it.
2. **`/impeccable audit`:** accessibility (contrast across all 10 palettes, focus states, keyboard paths through the trace, season menu, tabs and mobile sheet), responsive problems, reduced motion, and performance. Show the findings to the owner before fixing.
3. **`/impeccable adapt`: mobile.** Check 360, 390, 430, 768 and 1024 wide as well as desktop. Known weak spots:
   - the trace waterfall on phones: narrow name column, tiny spans, the axis crowding
   - the top bar with four buttons at 360 wide
   - the testimonial tabs scrolling sideways
   - the outputs filter pills overflowing
   - the detail pages' before/after bars and value grid
   - touch targets under 44px
4. **`/impeccable layout`: consistency, with a strict scope.** It may even out spacing and sizing only. It may not move, reorder, restructure or restyle components. The owner's complaint is that some sections and components feel too tall and others too short. Things to check:
   - one vertical rhythm for every section (the `.block` padding, the heading-to-content gap), applied the same way on the home page and the detail pages
   - components sharing the same inner padding, gaps and radius tokens (cards, the trace panel, the model card, the composer, the quote card)
   - tall elements that dominate: the About portrait (4:5 at nearly half the width), the testimonial panel's 420px minimum height, the hero's height on short laptop screens
   - short elements that feel cramped: the vocabulary block under the trace, the footer
   - both columns of the two-column layouts lining up at top and bottom where they sit side by side
5. **`/impeccable harden`:** empty and error states (the contact form without EmailJS env vars, missing images), and browsers without `corner-shape` (Safari, Firefox).
6. **Code cleanup:** dead code, unused CSS selectors, duplicated logic (the hero and testimonials both stream words), and lint. Delete `legacy/` once the owner confirms.
7. **Verify the build:** `npm run build` with `output: "export"` for GitHub Pages, including the static `/experience/*` pages.

### Paste this as the first message of session 2

> Read HANDOFF.md first. This portfolio's design is approved and I love it. I want mobile fixes, layout consistency and a cleanup pass, nothing more.
>
> Do not change the fonts, the colors, the highlights, the corner radii, the animations and transitions, or any copy, and do not move, reorder or restructure any component. Treat everything under "Locked" in HANDOFF.md as fixed.
>
> Follow the order in Session 2 of HANDOFF.md. Start with `/impeccable document` so DESIGN.md captures the current design as it is, then run `/impeccable audit` and show me the findings before fixing anything.
>
> After I approve:
> - use `/impeccable adapt` to make every page work well on phones and tablets
> - use `/impeccable layout` only to make spacing and sizing consistent across sections and components, since some feel too tall and others too short
> - then harden and clean up
>
> Show me before and after screenshots at phone and desktop width. If a fix would visibly change how something looks beyond spacing and sizing, ask me first.

## File map

| Path | What it holds |
| --- | --- |
| `src/app/globals.css` | The stylesheet entry: imports `styles/*.css` in cascade order |
| `src/app/styles/` | One CSS file per area (tokens, base, header, hero, trace, about, testimonials, outputs, contact, footer, span-page, transitions), each ending with its own breakpoints and motion |
| `e2e/`, `playwright.config.ts` | End-to-end checks (`npm run test:e2e`) |
| `src/app/layout.tsx` | Fonts, metadata, pre-paint appearance script, `<ViewTransitions>` |
| `src/app/lib/appearance.ts` | Theme and season state, the default palette (Fall), the circular reveal |
| `src/app/lib/timeline.ts` | Shared time axis for the trace and the detail pages |
| `src/app/components/` | Header, SeasonPicker, ThemeToggle, Hero, Trace, About, Testimonials, Outputs, Contact, Footer, Icons |
| `src/app/experience/[slug]/` | Span detail pages (static params plus the client page) |
| `src/utils/experience.ts` | Career spans, measurements, the grouped skill vocabulary |
| `src/utils/portfolio.ts`, `recommendations.ts`, `site.ts` | Outputs, testimonials (brackets mark highlighted phrases), contact and links |
| `scripts/optimize-images.mjs` | Makes the web-sized images in `public/assets/opt/` |
| `legacy/` | The old site's files, moved here instead of deleted |

Page transitions use the `next-view-transitions` package: its `Link` and `useTransitionRouter` wrap navigation in `document.startViewTransition`, and it handles browser back and forward.

## Known open items for the owner

- **OG image:** fixed. `public/og.png` (1200×630, the hero answer in Fall) is the social preview for every page; `robots.txt`, `sitemap.xml` and schema.org Person data are generated too.
- **Email changed** to `patelhet04@gmail.com` (from the resume). The old site used `hetpatel0499@gmail.com`. Needs confirming.
- **Brevity** links to `github.com/patelhet04/Brevity-UI` (there's also `Brevity-Server`). It has no preview image.
- **CGPA values** (3.61, 8.11) come from the old site. They aren't on the current resume.
- **GTU degree:** the resume says "Computer Science" and LinkedIn says "Computer Engineering". The site uses Computer Engineering.
- **Not yet verified:**
  - mobile layouts
  - every season in dark mode
  - Safari and Firefox fallbacks
  - reduced motion

## Session 3: motion work done so far, and the open hero problem

Session 2 (mobile, spacing, cleanup) is committed as `0383e22`. Everything below is **uncommitted** on `redesign/inference-trace`.

### Done and liked (keep)
- **Page transitions:** a short crossfade between pages. Only the span bar travels (no title stretch). Detail pages get one quick entrance. Prev/next slides in the direction of travel. Going back re-selects the span you came from so its bar shrinks back into its row. (`styles/transitions.css`, `SpanPage.tsx`, `Trace.tsx`.)
- **Trace:** keyboard selection swaps instantly; the hover scrub no longer re-renders the whole trace.
- **Outputs:** a filter change animates only rows that weren't already showing.
- **Home anchors:** smooth scrolling.
- **Scroll motion, driven by scroll position:** it moves with the scroll and reverses when you scroll back. Built with `lib/scrub.ts` (`useScrub`, `front`).
  - `RevealText.tsx`: headings and the About intro fill from faint to full ink.
  - Trace scroll playhead: sweeps '16 to now, dims spans it hasn't reached.
  - Tokenizer pass on the stack tokens.
  - Testimonial highlights swept by scroll.
  - Layered hero depth on desktop (CSS scroll timelines).
  - About photo drift.
  - Header progress line driven by CSS.
- **Polish:** snappier presses, faster mobile menu, faster photo reveal.
- **Hero:** streams on every full page load (`streamedThisLoad` module flag), with the smoother token timing.

### Hero "in production" moment: solved, owner approved
`Hero.tsx` streams "…that hold up: agents, retrieval, and the GPUs underneath.", then the words part (a FLIP glide) and "in production" drops in from above with three decaying bounces (a ball keeping 35% of its height per bounce), each word flashing on its first landing. The lime sweep draws once "production" settles.
- **Nothing around the answer moves:** the `.answer` box is held at the finished sentence's height (fractional px) from the first frame, so the reflow happens inside it. Verified 0px movement at 1440, 430, 390 and 360 wide, light and dark.
- **The caret is out of the flow:** absolutely positioned, moved with transforms, and lined up with a probe styled like the old inline caret.
- React renders the finished markup once; the stream only toggles classes and styles. "in production" sits in `.ins`, hidden with `[data-edit]` during the first pass. The colon sits outside `.hl`, so the sweep needs no `--tail`.
- Reduced motion, Regenerate, return from a detail page, and a resize mid-stream (it lands the finished answer) are all handled.
- The token flash fade was shortened to 520ms so the glow stays with the newest words.

### Preloader (owner approved)
`components/Boot.tsx` and `styles/boot.css`. On every full page load, reloads included (moving between pages inside the site doesn't reload, so it doesn't play then; never with reduced motion), token bars stream in like a tokenized sentence while the fonts and Memoji video load, close into one lime bar, and that bar flies into the header's caret beside the wordmark as the page appears; then the hero streams. It lasts as long as the real loading (at least 1.4s, at most 3s, plus the ~1s handoff). All colors are palette roles, so it follows all ten palettes. A CSS-only fallback hides it at 4.5s if the app's script never runs. The pre-paint script in `lib/appearance.ts` turns it on (`html[data-loader]`). Rejected before this: a "prefill" hero intro, a "cold start" model card, a trace-recording loader, and the owner's name as tokens.

### Motion system (session 3, after the hero)
- **Page transitions are true crossfades:** old and new fade on the same curve with the browser's additive blend, so the page never dims. The span bar is the only thing that travels, and it stays solid. Spans without a partner fade with the page. With reduced motion the bar doesn't travel.
- **Two springs:** `--spring` (bouncy) is only for presses springing back, at `--spring-ms`. `--spring-smooth` (critically damped, any duration) is for things that land on a real position: the palette menu, the filter pill, and the before/after bars (clipped, so the end caps stay round and never dip past the value).
- **No blur on streamed words** outside the hero: testimonials and the contact reply stream in small bursts with an opacity fade. The quote marks stream too, and a highlight never runs ahead of its words.
- **Palette circle:** leaves the control at full speed (`--ease-drawer`) with a feathered edge. The menu closes with the click.
- **One entrance per page:** the detail-page section stagger is gone; the crossfade and the travelling bar are the entrance. The model card is up before the answer streams.

**Rejected hero ideas (don't bring back):** a typewriter, a letter wave, a "demos → production" rewrite, hatched `[MASK]` tokens, an attention-map dim, a sampling or odometer reel, a calm edit into a dashed gap. A continuous "pen" stroke drawing the sweep was built and replaced by the drop.

**Dev notes:**
- Another session's dev server holds port 3000 and shares `.next`, which corrupts the cache. If the dev server serves stale code, restart it (`autoPort` is on in `.claude/launch.json`).
- Playwright lives in the old session's scratchpad, so reinstall it in the new scratchpad for screenshots and recordings.
