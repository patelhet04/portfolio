import { test as base, expect, type BrowserContext } from "@playwright/test";

/** Starts every page past the preloader (the pre-paint script checks this flag) */
export const skipLoader = (context: BrowserContext) => context.addInitScript(() => sessionStorage.setItem("skip-loader", "1"));

/** Every test starts past the preloader; e2e/loader.spec.ts tests the preloader itself */
export const test = base.extend({
  context: async ({ context }, use) => {
    await skipLoader(context);
    await use(context);
  },
});

export { expect };
export type { Page } from "@playwright/test";
