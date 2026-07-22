import { expect, test } from "./fixtures";

test.describe("landing page", () => {
  test("loads with every section present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Cuidar");
    await expect(page.getByRole("heading", { name: "Do outro lado da cadeira" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hoje, cirurgiã-dentista" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Prazer, Gabriela." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Quem passou por aqui" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "O que eu faço" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Onde você me encontra" })).toBeVisible();
    await expect(page.getByText("Convênios atendidos")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Vamos conversar sobre o seu sorriso?" })
    ).toBeVisible();
  });

  test("WhatsApp CTAs carry the URL-encoded default message", async ({ page }) => {
    await page.goto("/");
    const expectedHref =
      "https://wa.me/5512983185513?text=Ol%C3%A1%2C%20Dra.%20Gabriela!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o.";

    await expect(page.getByRole("link", { name: "Agendar consulta" })).toHaveAttribute(
      "href",
      expectedHref
    );
    await expect(page.getByRole("link", { name: "Agendar pelo WhatsApp" })).toHaveAttribute(
      "href",
      expectedHref
    );
  });

  test("trust links smooth-scroll to their in-page anchors", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "CRO-SP 176648" }).click();
    await expect(page.locator("#sobre")).toBeInViewport();

    await page.getByRole("link", { name: "Convênios aceitos" }).click();
    await expect(page.locator("#convenios")).toBeInViewport();

    await page.getByRole("link", { name: "Unidades" }).click();
    await expect(page.locator("#unidades")).toBeInViewport();
  });

  test("the JSON-LD Dentist schema is present with all 3 clinic locations", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(jsonLd ?? "{}");

    expect(data["@type"]).toBe("Dentist");
    expect(data.identifier).toBe("CRO-SP 176648");
    expect(data.location).toHaveLength(3);
  });
});
