import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// This project's vitest.config.ts does not set `test.globals: true`, so
// Testing Library's automatic post-test cleanup() never self-registers.
// Registering it here once, globally, avoids "found multiple elements"
// failures from a previous test's render staying mounted.
afterEach(() => {
  cleanup();
});

// jsdom does not implement matchMedia. useReducedMotion (and anything that
// renders it, e.g. RevealGroup) calls it unconditionally on mount, so every
// jsdom test needs a working default — not just the tests that target the
// hook directly. Guarded on `typeof window` since some test files (e.g.
// lib/content/client.server.test.ts) override the project's environment to
// "node" via a `@vitest-environment node` pragma, where `window` doesn't
// exist at all. Defaults to "no preference"; tests asserting reduced-motion
// behavior stub this themselves with a matches:true implementation.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}
