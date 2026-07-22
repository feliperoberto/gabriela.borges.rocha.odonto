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
