import { expect, test } from "@playwright/test";

/** Every page carries its own title, description, canonical URL and share tags; crawlers get robots and a sitemap. */

const site = "https://hetpatel.dev";

for (const path of ["/", "/experience/dash", "/experience/fuzionx"]) {
  test(`${path} has complete metadata`, async ({ page }) => {
    await page.goto(path);
    const meta = (sel: string) => page.locator(sel).first().getAttribute("content");
    await expect(page).toHaveTitle(/Het Patel/);
    expect(await meta('meta[name="description"]')).toBeTruthy();
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(`${site}${path}`);
    expect(await meta('meta[property="og:title"]')).toBeTruthy();
    expect(await meta('meta[property="og:image"]')).toBe(`${site}/og.png`);
    expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("the home page describes Het as a Person for search engines", async ({ page }) => {
  await page.goto("/");
  const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(data["@type"]).toBe("Person");
  expect(data.name).toBe("Het Patel");
  expect(data.sameAs.length).toBeGreaterThan(0);
});

test("robots.txt, sitemap.xml and the share image are served", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain(`Sitemap: ${site}/sitemap.xml`);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`<loc>${site}/</loc>`);
  expect(sitemap).toContain(`<loc>${site}/experience/dash</loc>`);
  const og = await request.get("/og.png");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toBe("image/png");
});
