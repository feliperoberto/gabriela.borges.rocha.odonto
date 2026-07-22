// @vitest-environment node
//
// HomePage's data fetching takes getContent's server (fs-read) branch only
// when `window` is undefined — jsdom always defines `window`, which would
// send this test down the browser fetch() branch with a relative URL that
// Node's fetch can't resolve. Overriding to node environment exercises the
// real fs path; rendering uses renderToStaticMarkup (no DOM needed) with
// substring assertions instead of testing-library's DOM queries.
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage, { generateMetadata } from "./page";

describe("HomePage", () => {
  it("assembles every section with real content, in order", async () => {
    const jsx = await HomePage();
    const html = renderToStaticMarkup(jsx);

    const sectionsInOrder = [
      "Agendar consulta",
      "Cuidar",
      "Do outro lado da cadeira",
      "Hoje, cirurgiã-dentista",
      "Prazer, Gabriela.",
      "Quem passou por aqui",
      "O que eu faço",
      "Onde você me encontra",
      "Convênios atendidos",
      "Vamos conversar sobre o seu sorriso?",
      "Conversar no WhatsApp",
    ];
    let cursor = 0;
    for (const marker of sectionsInOrder) {
      const index = html.indexOf(marker, cursor);
      expect(index, `expected "${marker}" to appear after position ${cursor}`).toBeGreaterThan(-1);
      cursor = index;
    }
  });

  it("renders the JSON-LD Dentist schema with all 3 clinic locations", async () => {
    const jsx = await HomePage();
    const html = renderToStaticMarkup(jsx);

    const match = html.match(
      /<script type="application\/ld\+json">(.*?)<\/script>/
    );
    expect(match).not.toBeNull();
    const data = JSON.parse(match?.[1] ?? "{}");
    expect(data["@type"]).toBe("Dentist");
    expect(data.identifier).toBe("CRO-SP 176648");
    expect(data.location).toHaveLength(3);
  });
});

describe("generateMetadata", () => {
  it("includes both clinic cities in the title", async () => {
    const metadata = await generateMetadata();
    expect(metadata.title).toContain("São José dos Campos");
    expect(metadata.title).toContain("Mogi das Cruzes");
  });
});
