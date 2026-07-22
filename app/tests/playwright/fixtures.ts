import { test as base, expect } from "@playwright/test";

/**
 * Shared e2e fixture. Fonts are self-hosted via next/font and there's no
 * backend, so no test should ever need a real external request — this
 * aborts any non-localhost origin so a future regression (an accidentally
 * reintroduced Google Fonts <link>, a stray analytics script) fails fast
 * and loud in a test instead of silently reaching out to the network.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (route) => route.abort());
    await use(page);
  },
});

export { expect };
