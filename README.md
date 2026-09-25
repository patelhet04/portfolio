# hetpatel.dev

Het Patel's portfolio, live at [hetpatel.dev](https://hetpatel.dev/).

The site reads like one streamed model response and the tools that inspect it: the hero answer streams in token by token, the career is a trace waterfall, the stack is tokenizer output, testimonials are "human feedback", and contact is a chat composer.

## Stack

- **Next.js 14** (App Router) with `output: "export"`, so the whole site is static HTML
- **React 18** and **TypeScript**
- **Plain CSS** in `src/app/globals.css`: design tokens, the ten palettes, components and motion. Tailwind supplies only the reset (`@tailwind base`)
- **[next-view-transitions](https://github.com/shuding/next-view-transitions)** for page-to-page view transitions
- **EmailJS** for the contact form
- Fonts: Host Grotesk and Martian Mono from Google Fonts

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
```

Run only one dev server per checkout: two servers share `.next/` and corrupt each other's cache.

The contact form needs these environment variables (in `.env.local`, and as GitHub Actions secrets for deploys). Without them the form shows a "email me directly" message instead of sending:

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
| `src/app/lib/` | Palette and theme state (`appearance.ts`), scroll-driven motion (`scrub.ts`), word streaming (`stream.ts`), the shared time axis (`timeline.ts`) |
| `src/utils/` | All content: `site.ts` (name, links, social image), `experience.ts` (spans and measurements), `portfolio.ts` (outputs), `recommendations.ts` (testimonials; brackets mark highlighted phrases) |
| `public/og.png` | The 1200×630 social preview |
| `assets-src/` → `public/assets/opt/` | Source images and their web-sized copies (`node scripts/optimize-images.mjs`) |

Content changes (a new role, output or testimonial) only touch `src/utils/`. New spans get a page, a sitemap entry and a trace row automatically.

## Design and motion

- `DESIGN.md` is the design system: palettes, type, layout, breakpoints and components.
- `HANDOFF.md` records what's locked, what the owner approved, and the motion rules (crossfade page transitions, the two springs, reduced motion).

## Deploy

Pushing to `main` runs `.github/workflows/nextjs.yml`, which builds the static export and publishes `out/` to GitHub Pages on the `hetpatel.dev` domain.
