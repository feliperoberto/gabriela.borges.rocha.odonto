import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Plain Node/CommonJS infra script, not application source.
    "scripts/**",
    // Playwright's own generated artifacts, bind-mounted by the
    // docker-compose `playwright` service — already .gitignore'd.
    "tests/playwright/report/**",
    "tests/playwright/test-results/**",
    "test-results/**",
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
