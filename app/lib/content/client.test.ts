import { afterEach, describe, expect, it, vi } from "vitest";

import { getProcedures } from "./client";

describe("getContent (browser path)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches the mock JSON from /mocks/<name>.json", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([{ slug: "prevencao", nome: "Prevenção", desc: "..." }]),
    });
    vi.stubGlobal("fetch", fetchMock);

    const procedures = await getProcedures();

    expect(fetchMock).toHaveBeenCalledWith("/mocks/procedures.json");
    expect(procedures).toEqual([{ slug: "prevencao", nome: "Prevenção", desc: "..." }]);
  });
});
