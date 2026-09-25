import { expect, test } from "@playwright/test";

/**
 * Page transitions are true crossfades: the old and new pages always add up to full opacity,
 * so the page never dims, and the travelling span bar stays solid the whole way.
 */

async function sampleTransition(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __vt: { root: number; bar: number | null }[] };
    w.__vt = [];
    const opacity = (pseudo: string) => Number(getComputedStyle(document.documentElement, pseudo).opacity);
    const t0 = performance.now();
    const tick = () => {
      const live = document.getAnimations().map((a) => (a.effect as KeyframeEffect | null)?.pseudoElement).filter(Boolean) as string[];
      if (live.length) {
        const bar = live.find((p) => p.includes("span-"))?.match(/\((.*)\)/)?.[1];
        w.__vt.push({
          root: opacity("::view-transition-old(root)") + opacity("::view-transition-new(root)"),
          bar: bar ? opacity(`::view-transition-old(${bar})`) + opacity(`::view-transition-new(${bar})`) : null,
        });
      }
      if (performance.now() - t0 < 1500) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

test("opening a span crossfades without dimming and the bar stays solid", async ({ page }) => {
  await page.goto("/");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await sampleTransition(page);
  await page.locator(".detail__open a").click();
  await expect(page).toHaveURL(/\/experience\/[\w-]+$/);
  await page.waitForTimeout(1600);
  const samples = await page.evaluate(() => (window as unknown as { __vt: { root: number; bar: number | null }[] }).__vt);
  expect(samples.length).toBeGreaterThan(5);
  expect(Math.min(...samples.map((s) => s.root))).toBeGreaterThanOrEqual(0.99);
  const bar = samples.map((s) => s.bar).filter((v): v is number => v !== null);
  expect(bar.length).toBeGreaterThan(5);
  expect(Math.min(...bar)).toBeGreaterThanOrEqual(0.99);
});

test("the first click on Open the full span opens it, and Back returns to the trace", async ({ page }) => {
  await page.goto("/");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  const link = page.locator(".detail__open a");
  const href = await link.getAttribute("href");
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.locator("h1")).toBeVisible();
  await page.locator(".sd__back a").click();
  await expect(page).toHaveURL(/\/#experience$/);
  await expect(page.locator("#experience")).toBeInViewport();
});

test("with reduced motion the span bar doesn't travel between pages", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await sampleTransition(page);
  await page.locator(".detail__open a").click();
  await expect(page).toHaveURL(/\/experience\//);
  await page.waitForTimeout(800);
  const samples = await page.evaluate(() => (window as unknown as { __vt: { bar: number | null }[] }).__vt);
  expect(samples.filter((s) => s.bar !== null)).toEqual([]);
  await context.close();
});
