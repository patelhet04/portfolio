import { expect, test } from "@playwright/test";

/** Every page fits every screen: no sideways scrolling, and comfortable touch targets on touch screens. */

const screens = [
  { name: "360 phone", width: 360, height: 780, touch: true },
  { name: "iPhone", width: 390, height: 844, touch: true },
  { name: "iPad mini", width: 744, height: 1133, touch: true },
  { name: "iPad Air", width: 820, height: 1180, touch: true },
  { name: "iPad Pro", width: 1024, height: 1366, touch: true },
  { name: "iPad landscape", width: 1180, height: 820, touch: true },
  { name: "laptop", width: 1280, height: 800, touch: false },
  { name: "wide", width: 1920, height: 1080, touch: false },
];
const pages = ["/", "/experience/dash"];

for (const s of screens) {
  for (const path of pages) {
    test(`${path} fits the ${s.name} screen`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: s.width, height: s.height }, isMobile: s.touch, hasTouch: s.touch });
      const page = await context.newPage();
      await page.goto(path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      const result = await page.evaluate((touch) => {
        const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const small: string[] = [];
        if (touch) {
          for (const el of Array.from(document.querySelectorAll<HTMLElement>("a, button, input, textarea"))) {
            const cs = getComputedStyle(el);
            // Skip hidden controls, the decorative duplicate filter row, inline text links and the tokenizer output
            if (!el.offsetParent || cs.visibility === "hidden" || el.closest("[aria-hidden=true], [inert], .tokens")) continue;
            if (el.tagName === "A" && cs.display === "inline") continue;
            const r = el.getBoundingClientRect();
            // Small controls get an invisible, larger hit area from an absolutely positioned ::before
            const hit = getComputedStyle(el, "::before");
            const expands = hit.content !== "none" && hit.position === "absolute";
            const px = (v: string) => (expands ? -(parseFloat(v) || 0) : 0);
            const w = r.width + px(hit.left) + px(hit.right);
            const h = r.height + px(hit.top) + px(hit.bottom);
            const label = (el.textContent ?? "").trim().slice(0, 24) || el.getAttribute("aria-label") || el.className;
            if (Math.min(w, h) < 40) small.push(`${el.tagName.toLowerCase()} "${label}" ${Math.round(w)}×${Math.round(h)}`);
          }
        }
        return { overflow, small };
      }, s.touch);
      expect(result.overflow, "the page scrolls sideways").toBeLessThanOrEqual(0);
      expect(result.small, "touch targets under 40px").toEqual([]);
      await context.close();
    });
  }
}
