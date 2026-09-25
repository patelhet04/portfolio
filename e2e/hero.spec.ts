import { expect, test, type Page } from "@playwright/test";

/**
 * The hero answer streams in, then "in production" drops into place. Nothing around it may move
 * while it animates, the colon must never start a line, and reduced motion shows the finished
 * sentence at once.
 */

// Records the layout box of everything around the answer on every frame until the stream completes
async function watchLayout(page: Page) {
  await page.addInitScript(() => {
    const parts = [".ask", ".answer", ".meta", ".ctas", ".mcard"];
    const box = (q: string) => {
      const el = document.querySelector<HTMLElement>(q)!;
      let top = 0;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
      return `${top}/${el.offsetHeight}`;
    };
    const w = window as unknown as { __moves: string[]; __frames: number };
    w.__moves = [];
    w.__frames = 0;
    document.fonts.ready.then(() => {
      const first = parts.map(box).join();
      const tick = () => {
        w.__frames++;
        const now = parts.map(box).join();
        if (now !== first) w.__moves.push(now);
        if (document.querySelector(".meta [data-state]")?.textContent !== "complete") requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });
}

const sizes = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "iPad Pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const size of sizes) {
  test(`hero streams without moving anything around it (${size.name})`, async ({ page }) => {
    await page.setViewportSize(size);
    await watchLayout(page);
    await page.goto("/");
    await expect(page.locator(".meta [data-state]")).toHaveText("complete", { timeout: 15_000 });
    const { moves, frames } = await page.evaluate(() => {
      const w = window as unknown as { __moves: string[]; __frames: number };
      return { moves: w.__moves, frames: w.__frames };
    });
    expect(frames).toBeGreaterThan(60);
    expect(moves).toEqual([]);
    await expect(page.locator(".answer .tok.on:not(.draft)")).toHaveCount(16);
    await expect(page.locator(".hl")).toHaveClass(/swept/);
  });
}

test("the colon never starts a line, in the first pass or the finished sentence", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".meta [data-state]")).toHaveText("complete", { timeout: 15_000 });
  const broken: string[] = [];
  for (let width = 320; width <= 1920; width += 20) {
    await page.setViewportSize({ width, height: 900 });
    const r = await page.evaluate(() => {
      const a = document.querySelector<HTMLElement>(".answer")!;
      const words = Array.from(a.querySelectorAll<HTMLElement>(".tok:not(.draft)"));
      const draft = a.querySelector<HTMLElement>(".tok.draft")!;
      const lh = parseFloat(getComputedStyle(a).fontSize) * 0.98;
      const mid = (el: HTMLElement) => {
        const b = el.getBoundingClientRect();
        return (b.top + b.bottom) / 2;
      };
      const sameLine = (x: HTMLElement, y: HTMLElement) => Math.abs(mid(x) - mid(y)) < lh * 0.4;
      const final = sameLine(words[8], words[9]);
      a.dataset.edit = "";
      const first = sameLine(words[6], draft);
      delete a.dataset.edit;
      return { final, first };
    });
    if (!r.final || !r.first) broken.push(`${width}px ${r.final ? "" : "final"}${r.first ? "" : "first pass"}`);
  }
  expect(broken).toEqual([]);
});

test("reduced motion shows the finished answer at once", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".meta [data-state]")).toHaveText("cached");
  await expect(page.locator(".answer")).not.toHaveAttribute("data-streaming", /.*/);
  await expect(page.locator(".answer .tok").first()).toHaveCSS("opacity", "1");
  await context.close();
});

test("on desktop the hero's layers separate as the page scrolls, the answer included", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".meta [data-state]")).toHaveText("complete", { timeout: 15_000 });
  await page.evaluate(() => scrollTo({ top: 400, behavior: "instant" }));
  await page.waitForTimeout(300);
  for (const layer of [".ask", ".answer", ".meta", ".mcard"]) {
    const moved = await page.locator(layer).evaluate((el) => getComputedStyle(el).translate);
    expect(moved, `${layer} should drift with the scroll`).not.toMatch(/^(none|0px)$/);
  }
});
