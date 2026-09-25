# hetpatel.dev

Het Patel's portfolio, live at [hetpatel.dev](https://hetpatel.dev/).

The site reads like one streamed model response and the tools that inspect it: the hero answer streams in token by token, the career is a trace waterfall, the stack is tokenizer output, testimonials are "human feedback", and contact is a chat composer.

## Stack

- **Next.js 14** (App Router) with `output: "export"`, so the whole site is static HTML
- **React 18** and **TypeScript**
- **Plain CSS** in `src/app/styles/`, one file per area (tokens, base, header, hero, trace, about, testimonials, outputs, contact, footer, span page, transitions), each with its own breakpoints and motion. `src/app/globals.css` imports them in cascade order; Tailwind supplies only the reset
- **[next-view-transitions](https://github.com/shuding/next-view-transitions)** for page-to-page view transitions
- **EmailJS** for the contact form
- Fonts: Host Grotesk and Martian Mono from Google Fonts

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
npm run test:e2e # builds the static site and runs the end-to-end checks
```

Run only one dev server per checkout: two servers share `.next/` and corrupt each other's cache.

The contact form needs these environment variables (in `.env.local`, and as GitHub Actions secrets for deploys). Without them the form shows an "email me directly" message instead of sending:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_USER_ID=
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/app/layout.tsx` | Fonts, site-wide metadata, the pre-paint palette script |
| `src/app/page.tsx` | The home page sections and the schema.org Person data |
| `src/app/experience/[slug]/` | One static page per career span, with its own metadata |
| `src/app/robots.ts`, `src/app/sitemap.ts` | `robots.txt` and `sitemap.xml`, generated at build |
| `src/app/components/` | Header, Hero, Trace, About, Testimonials, Outputs, Contact, Footer |
| `src/app/styles/` | The CSS, one file per area; `globals.css` sets their order (it matters: later files refine earlier ones) |
| `src/app/lib/` | Palette and theme state (`appearance.ts`), scroll-driven motion (`scrub.ts`), word streaming (`stream.ts`), the shared time axis (`timeline.ts`) |
| `src/utils/` | All content: `site.ts` (name, links, social image), `experience.ts` (spans and measurements), `portfolio.ts` (outputs), `recommendations.ts` (testimonials; brackets mark highlighted phrases) |
| `public/og.png` | The 1200×630 social preview |
| `assets-src/` → `public/assets/opt/` | Source images and their web-sized copies (`node scripts/optimize-images.mjs`) |

Content changes (a new role, output or testimonial) only touch `src/utils/`. New spans get a page, a sitemap entry and a trace row automatically.

## Tests

`npm run test:e2e` builds the real static export into `.next-e2e/` (so it never disturbs a running dev server), serves it the way GitHub Pages does (`scripts/serve-out.mjs`), and runs the Playwright suites in `e2e/`:

- **hero:** the answer streams without moving anything around it (phone, tablet, iPad Pro, desktop), the colon never starts a line, reduced motion shows the finished answer, and the hero's layers separate on scroll
- **layout:** no sideways scrolling at eight screen sizes, and touch targets of at least 40px
- **transitions:** pages never dim mid-transition, the span bar stays solid, it doesn't travel with reduced motion, and the first click on "Open the full span" opens it
- **palette:** Fall is the default and saved choices are kept
- **seo:** per-page metadata, structured data, `robots.txt`, `sitemap.xml` and the share image

Run it before merging anything that touches layout or motion.

## Design and motion

- `DESIGN.md` is the design system: palettes, type, layout, breakpoints and components.
- `HANDOFF.md` records what's locked, what the owner approved, and the motion rules (crossfade page transitions, the two springs, reduced motion).

## Deploy

Pushing to `main` runs `.github/workflows/nextjs.yml`, which builds the static export and publishes `out/` to GitHub Pages on the `hetpatel.dev` domain.
