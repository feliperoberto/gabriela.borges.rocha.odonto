import { expect, test } from "./fixtures";

test.describe("services explorer", () => {
  test("selecting a procedure chip shows its description, re-click hides it", async ({
    page,
  }) => {
    await page.goto("/");
    const chip = page.getByRole("button", { name: "Clareamento" });

    await expect(page.getByText("Dentes visivelmente mais claros")).toHaveCount(0);

    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("Dentes visivelmente mais claros")).toBeVisible();

    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByText("Dentes visivelmente mais claros")).toHaveCount(0);
  });

  test("selecting a different chip swaps the description", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Prevenção" }).click();
    await expect(page.getByText("o cuidado mais importante de todos")).toBeVisible();

    await page.getByRole("button", { name: "Urgência" }).click();
    await expect(page.getByText("o cuidado mais importante de todos")).toHaveCount(0);
    await expect(page.getByText("Alívio rápido para dor de dente")).toBeVisible();
  });
});

test.describe("locations city filter", () => {
  test("Todas shows all 3 clinics", async ({ page }) => {
    await page.goto("/");
    await page.locator("#unidades").scrollIntoViewIfNeeded();

    await expect(page.getByRole("heading", { name: "Parque Industrial" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Parque Monte Líbano" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Centro" })).toBeVisible();
  });

  test("São José dos Campos shows only its 1 clinic", async ({ page }) => {
    await page.goto("/");
    await page.locator("#unidades").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "São José dos Campos" }).click();

    await expect(page.getByRole("heading", { name: "Parque Industrial" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Parque Monte Líbano" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Centro" })).toHaveCount(0);
  });

  test("Mogi das Cruzes shows both of its clinics", async ({ page }) => {
    await page.goto("/");
    await page.locator("#unidades").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Mogi das Cruzes", exact: true }).click();

    await expect(page.getByRole("heading", { name: "Parque Industrial" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Parque Monte Líbano" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Centro" })).toBeVisible();
  });
});

test.describe("WhatsApp FAB visibility", () => {
  test("hidden at the top, visible once scrolled past the hero", async ({ page }) => {
    await page.goto("/");
    const fab = page.getByRole("link", { name: "Conversar no WhatsApp" });

    // The FAB is `position: fixed` so it's always geometrically within the
    // viewport bounds — toBeInViewport() can't tell hidden from visible
    // here. Assert the actual rendered opacity instead.
    await expect(fab).toHaveCSS("opacity", "0");

    await page.locator("#sobre").scrollIntoViewIfNeeded();
    await expect(fab).toHaveCSS("opacity", "1");
  });
});

test.describe("carousels", () => {
  // At the desktop viewport, TestimonialsSection's carousel (unconstrained
  // width) fits all 3 cards with no overflow — there's nothing to drag.
  // LocationsSection's carousel is narrower (parent max-width: 1000px) so
  // it does overflow there, but pinning both tests to a mobile viewport
  // guarantees overflow for either carousel regardless of section layout.
  test.use({ viewport: { width: 390, height: 844 } });

  test("dragging the testimonials carousel scrolls it horizontally", async ({ page }) => {
    await page.goto("/");
    const track = page
      .locator("section", { hasText: "Quem passou por aqui" })
      .locator("[data-drag]");
    await track.scrollIntoViewIfNeeded();

    const before = await track.evaluate((el) => el.scrollLeft);
    const box = await track.boundingBox();
    if (!box) throw new Error("carousel track has no bounding box");

    await page.mouse.move(box.x + box.width - 40, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 40, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();

    const after = await track.evaluate((el) => el.scrollLeft);
    expect(after).toBeGreaterThan(before);
  });

  test("dragging the locations carousel scrolls it horizontally", async ({ page }) => {
    await page.goto("/");
    const track = page.locator("#unidades").locator("[data-drag]");
    await track.scrollIntoViewIfNeeded();

    const before = await track.evaluate((el) => el.scrollLeft);
    const box = await track.boundingBox();
    if (!box) throw new Error("carousel track has no bounding box");

    await page.mouse.move(box.x + box.width - 40, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 40, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();

    const after = await track.evaluate((el) => el.scrollLeft);
    expect(after).toBeGreaterThan(before);
  });
});
