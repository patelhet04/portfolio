---
name: Het Patel — The Inference Trace
description: A portfolio that reads like a streamed model response and a trace viewer.
colors:
  paper: "#f3f4f0"
  paper-2: "#e8eae3"
  paper-3: "#dfe2d8"
  card: "#fbfbf8"
  ink: "#10120d"
  ink-2: "#3d4138"
  muted: "#62675c"
  rule: "rgba(16, 18, 13, 0.12)"
  rule-2: "rgba(16, 18, 13, 0.22)"
  signal: "#c6f53a"
  signal-2: "#b4e21f"
  signal-soft: "rgba(198, 245, 58, 0.55)"
  primary: "#10120d"
  primary-hover: "#2b2f26"
  on-primary: "#f3f4f0"
  accent: "#10120d"
  plate: "#ffffff"
  error: "#b3261e"
  paper-dark: "#0d0e0b"
  paper-2-dark: "#171913"
  card-dark: "#121410"
  ink-dark: "#eef0e8"
  ink-2-dark: "#c3c7b9"
  muted-dark: "#8f9486"
  signal-soft-dark: "rgba(198, 245, 58, 0.3)"
  error-dark: "#ff8a80"
typography:
  display:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.1rem + 4.7vw, 5.6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.038em"
  display-detail:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 4.4vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 1.2rem + 3vw, 4rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1rem + 1.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.022em"
  quote:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 0.95rem + 1vw, 1.9rem)"
    fontWeight: 400
    lineHeight: 1.32
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Martian Mono, ui-monospace, SF Mono, monospace"
    fontSize: "11.5px"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  label-sm:
    fontFamily: "Martian Mono, ui-monospace, SF Mono, monospace"
    fontSize: "10.5px"
    fontWeight: 400
rounded:
  xs: "6px"
  sm: "9px"
  md: "13px"
  lg: "18px"
  xl: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  container: "1320px"
  section: "clamp(72px, 4vw + 56px, 120px)"
  head-gap: "clamp(36px, 2vw + 28px, 56px)"
  group: "40px"
  panel-inset: "16px"
  content-pad: "20px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "38px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "38px"
  send-button:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "42px"
  chip:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: "4px 7px"
  status-pill:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: "4px 8px 4px 7px"
  panel:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
  composer:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "20px"
  field:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "42px"
    padding: "0 12px"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
---

# Design System: Het Patel — The Inference Trace

## Overview

**Creative North Star: "The Inference Trace"**

The site is one model response, read top to bottom. A visitor asks "who is Het Patel?" and the answer streams in token by token, with live stats. The rest of the page reads like the tools used to inspect that response: a trace waterfall for the career, tokenizer output for the stack, a feedback panel for testimonials, and a chat composer for contact. The metaphor comes from the owner's real work (agents, RAG, LLM infrastructure), so it is the substance of the site, not decoration.

The surface is calm paper with hairline rules. Large Host Grotesk type carries the voice. Martian Mono carries every piece of machine metadata (trace ids, durations, labels, counts). A single highlighter color, the **signal**, marks the moments that matter: the streaming caret, the sweep under "hold up in production", the phrases picked out in testimonials, and the selected span. Everything else stays tonal.

The layout is spacious at section level and dense inside instruments. Sections breathe with tall vertical padding. The trace panel, the model card and the composer pack information tightly the way dev tools do. Motion is part of the metaphor: text streams, spans draw in, bars shrink from before to after, presses spring back, and a new palette spreads out in a circle from the control that picked it.

**Key Characteristics:**
- One highlighter color per palette, used sparingly and always meaning "this is the live or important thing".
- Two type voices: a humanist grotesk for what a person says, a mono for what the machine reports.
- Paper-and-hairline surfaces, with one soft ambient shadow on instrument panels.
- Squircle corners where the browser supports `corner-shape`, with circular fallbacks.
- Five seasonal palettes (Default, Spring, Summer, Fall, Winter), each in light and dark, all mapping to the same small set of roles.

## Colors

Every palette resolves to the same roles: paper (grounds), ink (text), signal (highlighter), primary (the main button), and accent (work spans). The frontmatter lists the Default palette. `src/app/styles/tokens.css` is the source of truth for all ten palettes, and they are locked.

### Primary
- **Ink Button** (`primary`): the solid pill for the single most important action in a view ("Read the trace", "Resume", the active filter). In Default, Spring, Summer and Winter it matches ink. Fall is the exception: brick red (`#a4493d` light, `#e07a62` dark).

### Secondary
- **Signal Highlighter** (`signal`, `signal-2`, `signal-soft`): lime in Default, cherry-blossom pink in Spring, sun yellow in Summer, pumpkin in Fall, frost blue in Winter. Used for the caret, the hero sweep, testimonial marks, the new-token flash, the selected work span, the send button, the "copied" state, text selection, and the composer's focus halo. `signal-soft` is the translucent version for fills behind text. Dark themes lower its opacity so the highlight glows instead of shouting.

### Tertiary
- **Span Accent** (`accent`): the fill of work spans in the trace, the group key, and the before/after bars before they settle. It is ink in Default, leaf green in Spring, open-water blue in Summer, brick in Fall and evergreen in Winter.

### Neutral
- **Paper** (`paper`, `paper-2`, `paper-3`): the page ground, then two recessed tones for hover fills, the active nav pill, chips, fields, the trace group headers and the filter track.
- **Card** (`card`): a slightly lifted tone for instrument panels (model card, trace, composer, quote card, season menu).
- **Ink** (`ink`, `ink-2`, `muted`): primary text, secondary text (ledes, summaries), and metadata and labels.
- **Rules** (`rule`, `rule-2`): hairlines at 12% and 22% ink. `rule` separates, `rule-2` outlines interactive controls.
- **Plate** (`plate`): the white ground behind the Memoji video in dark themes, so the video keeps its own background.
- **Error** (`error`, `error-dark`): the only color outside the palette system, used only for form validation text.

### Named Rules
**The One Highlighter Rule.** Each palette has exactly one signal color, and it only marks live or important things. It never becomes a background for a whole section or a decorative accent.

**The Same Roles Rule.** A new component uses role tokens (`--paper-2`, `--signal-soft`, `--accent`), never a hex value, so it works in all ten palettes automatically.

## Typography

**Display Font:** Host Grotesk (with ui-sans-serif, system-ui)
**Body Font:** Host Grotesk
**Label/Mono Font:** Martian Mono (with ui-monospace, SF Mono)

**Character:** Host Grotesk is warm, slightly condensed at display sizes with tight negative tracking, and it carries the human voice. Martian Mono is small, wide and tabular, and it is the machine talking: ids, dates, durations, token counts and field labels.

### Hierarchy
- **Display** (500, clamp 2.6rem → 5.6rem, line-height 0.98, tracking -0.038em): the streamed hero answer, 15ch max beside the model card; on portrait tablets (641–1100px) it spans the column at 9vw so it fills it in four lines.
- **Display Detail** (500, clamp 2.6rem → 5.5rem, 0.98, -0.04em): the span name on each detail page, 16ch max.
- **Headline** (500, clamp 2.2rem → 4rem, 1.0, -0.035em): section headings ("Career, read as a trace.", "Outputs.").
- **Lead** (400, clamp 1.5rem → 2.25rem, 1.22): the About opener. The detail-page summary (clamp 1.35rem → 2rem) and the testimonial quote (clamp 1.3rem → 1.9rem) sit in the same size band.
- **Title** (500, 22px, 1.15, -0.02em): span name in the trace's detail pane. The pager (20px) and output titles (clamp 1.1rem → 1.45rem) sit alongside it.
- **Body** (400, 17px on desktop, 16px under 640px, 1.55): ledes are 46ch max; the About paragraph is 58ch max.
- **Label** (Martian Mono 400, 11.5px, tabular numerals): every `.mono` label. A 10.5px step is used inside chips, pills and span bars.

### Named Rules
**The Two Voices Rule.** If a machine would print it (a timestamp, id, count, key name or status), it is set in Martian Mono. If a person would say it, it is set in Host Grotesk. Never mix the two voices in one string.

**The Balanced Headline Rule.** Display and headline text use `text-wrap: balance`, and long-form text uses `text-wrap: pretty`.

## Layout

- **Container:** max width 1320px with a fluid side gutter of `clamp(20px, 4vw, 48px)`.
- **Section rhythm:** three spacing tokens, sized by viewport width (never height), shared by the home page and the detail pages. `--space-section` (72 → 120px) pads every section above and below its hairline, including the hero's bottom and the detail page's end. `--space-head` (36 → 56px) separates a section head from its content, and also the trace from the tokenized stack, and the detail page's back link, track and grid. `--space-group` (40px) separates groups inside a detail page. Section heads are a two-column grid (headline and a lede capped at 420px, bottom-aligned).
- **Two-column bodies:** Hero (answer and a 380px model card, bottom-aligned), About (even columns: portrait with the facts grid under it, beside the copy; the portrait fills whatever height the copy leaves, so both columns start and end together), Testimonials (a 300px sticky tab list and the quote panel), Contact (composer and a 340px direct-contact list), and the detail page (7fr story and 5fr facts). All of them collapse to one column at 960px, except the hero, which goes to one column at 1100px so iPads in portrait get the full-width answer.
- **The trace:** a two-column instrument (waterfall and a 380px detail pane) that stacks at 1180px. Inside the waterfall, a name column (220px, or 124px under 640px) sits beside a shared time axis.
- **Breakpoints:** 1180px (trace stacks), 1100px (hero goes to one column), 960px (nav becomes a sheet and grids go to one column), 640px (compact top bar, 16px body, narrower trace name column, facts in one column).
- **Tablets (641–1100px):** nothing keeps its phone width with empty space beside it. The model card goes landscape (Memoji beside its details) and, up to 960px, the About portrait becomes a 3:2 crop at full width.
- **Density:** generous between sections, dense inside instruments. Panel header bars use a 12×16px inset; panel content areas use 20px; chips and rows sit 4–10px apart.
- **Outputs on phones:** the list pages in batches of 6 behind a "Show more" button with a mono "showing 6 of 15" count; tablet and desktop show every row.
- **Side-by-side columns** line up at the top. Contact also lines up at the bottom: the composer grows to match the direct-contact list.
- **Touch:** on coarse pointers, small controls get invisible hit areas of about 44px, and inputs are 16px so iOS doesn't zoom on focus.

## Elevation & Depth

Paper and hairlines. Surfaces are mostly flat and separate by tone (paper → paper-2 → card) and by 1px rules. One soft, ambient shadow marks the instrument panels so they sit just above the paper. A stronger shadow appears only on things that float above the page: the season menu, the mobile sheet, and the cursor-following output preview. Dark themes switch the shadow color to pure black and rely more on tone.

### Shadow Vocabulary
- **Ambient panel** (`box-shadow: 0 1px 1px rgba(ink, 0.04), 0 8px 24px -12px rgba(ink, 0.2)`): the model card, the trace, the composer, the selected testimonial tab, and the detail-page quote card.
- **Pop** (`box-shadow: 0 1px 2px rgba(ink, 0.06), 0 18px 40px -16px rgba(ink, 0.35)`): the season menu, the mobile sheet and the output preview.

### Named Rules
**The Float Only When Floating Rule.** Only elements that actually overlap page content (menus, sheets, previews) get the pop shadow. Inline panels never go higher than the ambient shadow.

## Shapes

- **Corner language:** five radius tokens, `--r-xs` to `--r-xl` (6 / 9 / 13 / 18 / 22px). Where `corner-shape: squircle` is supported, every element becomes a squircle and the radii grow to the `--sq-*` tokens (9 / 14 / 20 / 28 / 34px) so the superellipse keeps the same visual weight. This pairing is locked.
- **Safari and Firefox:** until they ship `corner-shape` (Safari has it in Technology Preview), `styles/squircle-fallback.css` clips plain-fill elements to a squircle (primary buttons, the send button, status pills, the question bubble, the filter track, palette options, notes, chips, fields, avatars, the portrait, the dark-mode Memoji plate). Bordered and shadowed elements keep rounded corners there, because a clip would cut the border line and the shadow.
- **Pills:** buttons, icon buttons, the season button, nav links, filters, status pills and the send button are full pills (999px).
- **Assignment:** `xs` for span bars, chips and the scrub label. `sm` for avatars, season options and figcaptions. `md` for testimonial tabs, fields, the preview card, notes and the detail track. `lg` for panels (model card, trace, portrait, quote card, value grid, pager, season menu). `xl` for the composer only.
- **Borders:** 1px `rule` for separators and panel outlines, 1px `rule-2` for interactive outlines, a 1px dashed `rule` between model-card rows, and a 1.5px inset ink outline for education spans.
- **Textures:** education spans carry a fine 135° hatch; the future "next" span is a dashed centerline.

## Components

### Buttons
Quiet and tactile. Pills that press down and spring back.
- **Shape:** full pill (999px), 46px tall (38px for the small version), 20px side padding (16px small), 15px medium weight.
- **Primary:** solid `primary` with `on-primary` text; hover moves to `primary-hover`.
- **Ghost:** transparent with a 1px `rule-2` outline; hover darkens the outline to ink.
- **Press:** scales to 0.96 over 120ms ease-out and releases on the Apple-style spring (`--spring`, 650ms). Arrow icons nudge in their direction on hover.
- **Icon button:** a 38px circle with a 1px `rule-2` outline; presses to 0.92.
- **Send:** a 42px signal-colored circle; the arrow launches upward and loops back while sending.

### Chips
- **Stack chips:** Martian Mono 10.5px on `paper-2`, `ink-2` text, `xs` radius, 4×7px padding, 5px gap.
- **Status pill:** mono 10.5px on `paper-2` with a pulsing signal dot ("serving · Boston").
- **Filter pills:** a `paper-2` track holding transparent pills; the active pill is a clipped duplicate row in `primary` that springs between positions.

### Cards / Containers
- **Corner Style:** `lg` for panels, `xl` for the composer.
- **Background:** `card`.
- **Shadow Strategy:** the ambient panel shadow (see Elevation).
- **Border:** 1px `rule` (the composer uses `rule-2`, and ink with a signal halo on focus).
- **Internal Padding:** 12×16px for panel headers and bars, 20px for content areas.

### Inputs / Fields
- **Composer textarea:** borderless on `card`, 19px text, 168px minimum height, 20px padding. It grows to fill the composer.
- **Inline fields:** 42px `paper-2` capsules with an `md` radius, a mono label before the input, and a 1px inset ink ring on focus.
- **Error:** a plain-language line in `error` color between the textarea and the footer, announced with `role="alert"`.

### Navigation
- **Top bar:** sticky on `paper`, 72px tall (64px under 640px), with a 1px rule that doubles as a reading-progress bar filling in ink. Brand wordmark with a blinking signal cursor.
- **Links:** 14.5px `muted`, pill-shaped, turning ink on hover. The current section gets a `paper-2` pill.
- **Actions:** season picker (swatch and name), theme toggle (sun and moon cross-rotate), and the Resume primary pill. Under 640px the picker and Resume collapse to 38px icon circles.
- **Mobile:** under 960px the links move to a sheet that drops from the header with a clip-path reveal. Links are 22px and stagger in.

### The Trace (signature)
A dev-tools waterfall. A mono header bar (trace_id, spans, duration, status), a year axis with faint gridlines, Work and Education group rows on `paper-2`, and one button row per span holding a positioned bar. Work spans fill with `accent`; education spans are hatched outlines; the current role has a pulsing signal tail. A 1px ink scrub line follows the mouse with a month label and outlines every span active at that date. The selected row turns `paper-2` and its span turns signal. The detail pane swaps content with a soft spring and links to the full span page, where the bar and title morph across with a view transition.

### Preloader (signature)
Every full page load opens on plain paper: token bars in the tokenizer's alternating fills stream in with a lime flash each, a lime caret blinks after them while the page loads, then the bars close into one lime bar that flies into the header wordmark's caret as the page fades in. Palette roles only; on every full page load, not on in-site navigation; none with reduced motion.

### Model Card (signature)
The hero's profile panel: a mono header with the status pill, the Memoji video on a plate, and a dashed key/value list (role, building, previously, trained on, stack) with mono keys.

### Tokenized Stack (signature)
The skill vocabulary as tokenizer output: mono 13.5px words with alternating soft fills (signal-soft, paper-3, half signal-soft, paper-2). Hovering a token dims every span that did not use it.

## Do's and Don'ts

### Do:
- **Do** use role tokens (`--paper-2`, `--signal`, `--accent`, `--rule`) so every change works across all ten palettes.
- **Do** set machine metadata in Martian Mono at 11.5px or 10.5px with tabular numerals.
- **Do** use the `--r-*` tokens for every corner so the squircle enhancement applies.
- **Do** keep press feedback on the spring: a quick scale-down on `:active`, a `--spring` release.
- **Do** put hover styles inside `@media (hover: hover) and (pointer: fine)`.
- **Do** space sections and groups with `--space-section`, `--space-head` and `--space-group`, never with a `vh` value.

### Don't:
- **Don't** add a second highlight color or use the signal as a large background fill.
- **Don't** change the fonts, the ten palettes, the radius tokens, the highlighter marks, the copy or the section order. They are locked (see HANDOFF.md).
- **Don't** give inline panels the pop shadow; it is reserved for floating layers.
- **Don't** hard-code hex colors in components; the only exception is the form error color.
- **Don't** replace a streamed, drawn or springing motion with a generic fade. The motion character is part of the metaphor.
