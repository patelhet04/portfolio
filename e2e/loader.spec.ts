import { expect, test } from "@playwright/test";

/**
 * The preloader: token bars that become the header's caret. It shows on every full page load
 * (but not when moving between pages inside the site), never with reduced motion, hands off to
 * the page within a few seconds, and can never leave the page covered if the script doesn't run.
 */

test("a page load shows the preloader, which hands off to the page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#boot")).toBeVisible();
  await expect(page.locator(".boot__tbar.on").first()).toBeVisible();
  // It hands off within its limit (3s of loading plus the ~1s handoff)
  await expect(page.locator("html")).not.toHaveAttribute("data-loader", /.*/, { timeout: 5_000 });
  await expect(page.locator("#boot")).toBeHidden();
  await expect(page.locator(".top .brand__cursor")).toHaveCSS("opacity", "1");
  // …and the answer streams after it
  await expect(page.locator(".meta [data-state]")).toHaveText("complete", { timeout: 15_000 });
});

test("the bar lands on the header's caret", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => document.querySelector("#boot")?.hasAttribute("data-handoff"), null, { timeout: 5_000 });
  // At the end of the flight the bar sits exactly where the header's caret is
  const [bar, cursor] = await page.evaluate(
    () =>
      new Promise<[DOMRect, DOMRect]>((resolve) => {
        const merged = document.querySelector<HTMLElement>(".boot__merged")!;
        const anim = merged.getAnimations()[0];
        anim.finished.then(() => resolve([merged.getBoundingClientRect(), document.querySelector<HTMLElement>(".top .brand__cursor")!.getBoundingClientRect()]));
      }),
  );
  for (const k of ["left", "top", "width", "height"] as const) expect(Math.abs(bar[k] - cursor[k])).toBeLessThan(1.5);
});

test("it shows on every reload, but not when moving between pages inside the site", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute("data-loader", /.*/, { timeout: 5_000 });
  await page.reload();
  await expect(page.locator("#boot")).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-loader", /.*/, { timeout: 5_000 });
  // An in-site link swaps the page without reloading, so the preloader stays away
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await page.locator(".detail__open a").click();
  await expect(page).toHaveURL(/\/experience\//);
  expect(await page.evaluate(() => document.documentElement.hasAttribute("data-loader"))).toBe(false);
  await expect(page.locator("#boot")).toBeHidden();
});

test("a span page gets it too", async ({ page }) => {
  await page.goto("/experience/dash");
  await expect(page.locator("#boot")).toBeVisible();
  await expect(page.locator("#boot")).toBeHidden({ timeout: 5_000 });
});

test("with reduced motion there is no preloader", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.hasAttribute("data-loader"))).toBe(false);
  await expect(page.locator("#boot")).toBeHidden();
  await context.close();
});

test("if the app's script never runs, the page still appears", async ({ page }) => {
  await page.route(/\/_next\/static\/chunks\//, (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("#boot")).toBeVisible();
  // The CSS fallback hides it at 4.5s without any script
  await expect(page.locator("#boot")).toBeHidden({ timeout: 6_000 });
  await expect(page.locator(".ask__bubble")).toBeVisible();
});
