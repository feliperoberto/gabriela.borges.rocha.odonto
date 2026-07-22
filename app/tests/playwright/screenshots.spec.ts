import type { Page } from "@playwright/test";
import { test } from "./fixtures";

/**
 * Full page/interaction screenshot matrix, generated (never committed —
 * see .gitignore) for fast human review of every visual state against the
 * prototype. Two viewports mirror the prototype's own responsive range.
 *
 * Every test calls revealEverything() right after navigation instead of
 * relying on the `reducedMotion: "reduce"` context option. It turns out
 * headless Chromium's prefers-reduced-motion emulation does not reliably
 * apply in this Docker environment (node:20-slim + apt-installed chromium
 * via `playwright install --with-deps`) — window.matchMedia() reported
 * `false` even with the option set, leaving below-the-fold sections stuck
 * at opacity:0. Scrolling through the whole page once triggers the app's
 * real reveal-on-scroll logic instead, which is a one-way state machine
 * (once shown, always shown), so it works regardless of whether motion
 * emulation is supported in a given environment.
 */
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
] as const;

const PROCEDURES: { slug: string; nome: string }[] = [
  { slug: "prevencao", nome: "Prevenção" },
  { slug: "dentistica-restauradora", nome: "Dentística restauradora" },
  { slug: "profilaxia-dental", nome: "Profilaxia dental" },
  { slug: "clareamento", nome: "Clareamento" },
  { slug: "odontopediatria", nome: "Odontopediatria" },
  { slug: "cirurgia", nome: "Cirurgia" },
  { slug: "urgencia", nome: "Urgência" },
  { slug: "botox", nome: "Botox" },
];

function sectionByHeading(page: Page, name: string) {
  return page.getByRole("heading", { name }).locator("xpath=ancestor::section[1]");
}

async function revealEverything(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("scroll"));
  });
}

for (const viewport of VIEWPORTS) {
  test.describe(`screenshots (${viewport.name})`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });

    const dir = `tests/playwright/screenshots/${viewport.name}`;

    test("landing--top", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      await page.screenshot({ path: `${dir}/landing--top.png` });
    });

    test("landing--full", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      await page.screenshot({ path: `${dir}/landing--full.png`, fullPage: true });
    });

    const sections: { name: string; locate: (page: Page) => ReturnType<Page["locator"]> }[] = [
      { name: "hero", locate: (page) => sectionByHeading(page, /Cuidar/) },
      { name: "chapter-1", locate: (page) => sectionByHeading(page, "Do outro lado da cadeira") },
      { name: "chapter-2", locate: (page) => sectionByHeading(page, "Hoje, cirurgiã-dentista") },
      { name: "sobre", locate: (page) => page.locator("#sobre") },
      { name: "depoimentos", locate: (page) => sectionByHeading(page, "Quem passou por aqui") },
      { name: "servicos", locate: (page) => sectionByHeading(page, "O que eu faço") },
      { name: "unidades", locate: (page) => page.locator("#unidades") },
      { name: "convenios", locate: (page) => page.locator("#convenios") },
      { name: "footer", locate: (page) => page.locator("footer") },
    ];

    for (const section of sections) {
      test(`section--${section.name}`, async ({ page }) => {
        await page.goto("/");
        await revealEverything(page);
        await section.locate(page).screenshot({ path: `${dir}/section--${section.name}.png` });
      });
    }

    test("servicos--none", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      const section = sectionByHeading(page, "O que eu faço");
      await section.screenshot({ path: `${dir}/servicos--none.png` });
    });

    for (const procedure of PROCEDURES) {
      test(`servicos--${procedure.slug}-selected`, async ({ page }) => {
        await page.goto("/");
        await revealEverything(page);
        await page.getByRole("button", { name: procedure.nome }).click();
        const section = sectionByHeading(page, "O que eu faço");
        await section.screenshot({ path: `${dir}/servicos--${procedure.slug}-selected.png` });
      });
    }

    test("servicos--deselected", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      const chip = page.getByRole("button", { name: "Prevenção" });
      await chip.click();
      await chip.click();
      const section = sectionByHeading(page, "O que eu faço");
      await section.screenshot({ path: `${dir}/servicos--deselected.png` });
    });

    test("unidades--todas", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      await page.locator("#unidades").screenshot({ path: `${dir}/unidades--todas.png` });
    });

    test("unidades--sjc", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      await page.getByRole("button", { name: "São José dos Campos" }).click();
      await page.locator("#unidades").screenshot({ path: `${dir}/unidades--sjc.png` });
    });

    test("unidades--mogi", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      await page.getByRole("button", { name: "Mogi das Cruzes", exact: true }).click();
      await page.locator("#unidades").screenshot({ path: `${dir}/unidades--mogi.png` });
    });

    test("fab--hidden", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page); // ends scrolled back to top, so hero-cta is in view again
      await page.screenshot({ path: `${dir}/fab--hidden.png` });
    });

    test("fab--visible", async ({ page }) => {
      await page.goto("/");
      await revealEverything(page);
      await page.locator("#sobre").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${dir}/fab--visible.png` });
    });
  });
}
