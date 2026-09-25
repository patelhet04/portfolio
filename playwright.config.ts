import { defineConfig, devices } from "@playwright/test";

const port = 4173;

/**
 * End-to-end checks against the real static export (the files GitHub Pages serves).
 * `npm run test:e2e` builds into .next-e2e (so a running dev server's .next and the deploy's out/
 * are never touched; with a custom distDir the export lands there), serves it like GitHub Pages,
 * and runs the suites in e2e/.
 */
export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://127.0.0.1:${port}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `NEXT_DIST_DIR=.next-e2e npx next build && node scripts/serve-out.mjs .next-e2e ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
