import { expect, test } from "@playwright/test";

/** Fall is the default palette; a saved choice is kept; the retired "auto" falls back to Fall. */

const cases = [
  { saved: null, expected: "fall" },
  { saved: "auto", expected: "fall" },
  { saved: "winter", expected: "winter" },
  { saved: "default", expected: "default" },
];

for (const c of cases) {
  test(`palette with ${c.saved ?? "nothing"} saved is ${c.expected}`, async ({ page }) => {
    if (c.saved) await page.addInitScript((v) => localStorage.setItem("season", v), c.saved);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-season", c.expected);
    await page.locator(".season__btn").click();
    await expect(page.locator('.season__opt[aria-checked="true"]')).toContainText(new RegExp(c.expected, "i"));
    await expect(page.locator(".season__opt")).toHaveCount(5);
    await expect(page.locator(".season__pop")).not.toContainText("Auto");
  });
}
