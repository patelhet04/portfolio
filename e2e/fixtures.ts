import { test as base, expect, type BrowserContext } from "@playwright/test";

/** Marks the visit as already started, so the first-visit preloader stays out of the way */
export const skipLoader = (context: BrowserContext) => context.addInitScript(() => sessionStorage.setItem("booted", "1"));

/** Every test starts past the preloader; e2e/loader.spec.ts tests the preloader itself */
export const test = base.extend({
  context: async ({ context }, use) => {
    await skipLoader(context);
    await use(context);
  },
});

export { expect };
export type { Page } from "@playwright/test";
