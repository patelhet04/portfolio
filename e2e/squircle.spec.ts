import { expect, test } from "./fixtures";

/**
 * Squircles: Chromium draws them natively (corner-shape); Safari and Firefox get a clip on
 * plain-fill elements (styles/squircle-fallback.css) until they ship corner-shape.
 */

test("Chromium draws squircles natively, with no fallback clip", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium");
  await page.goto("/");
  const btn = page.locator(".ctas .btn--primary");
  await expect(btn).toHaveCSS("corner-shape", "squircle");
  await expect(btn).toHaveCSS("clip-path", "none");
});

test("Safari clips plain-fill elements to a squircle, and a focused control keeps its ring", async ({ page, browserName }) => {
  test.skip(browserName !== "webkit");
  await page.goto("/");
  for (const sel of [".ctas .btn--primary", ".ask__bubble", ".mcard .pill", ".filters", ".fb__tab img", ".portrait"]) {
    expect(await page.locator(sel).first().evaluate((el) => getComputedStyle(el).clipPath), sel).toMatch(/^shape\(/);
  }
  // Bordered elements keep their rounded corners (a clip would cut the border line)
  expect(await page.locator(".ctas .btn:not(.btn--primary)").evaluate((el) => getComputedStyle(el).clipPath)).toBe("none");
  // Keyboard focus drops the clip so the focus ring isn't cut off
  // (Safari's Tab skips links by default, so focus it right after a keypress, which counts as keyboard focus)
  const btn = page.locator(".ctas .btn--primary");
  await page.keyboard.press("Shift");
  await btn.focus();
  expect(await btn.evaluate((el) => el.matches(":focus-visible"))).toBe(true);
  expect(await btn.evaluate((el) => getComputedStyle(el).clipPath)).toBe("none");
});
