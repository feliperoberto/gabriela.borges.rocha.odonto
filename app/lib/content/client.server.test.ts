// @vitest-environment node
//
// Overrides the project's default jsdom environment: `typeof window` must be
// `undefined` here to exercise getContent's server-side fs-read branch,
// which jsdom (where `window` is always defined) can never reach.
import { describe, expect, it } from "vitest";

import { getInsurances, getLocations, getProcedures, getProfile, getTestimonials } from "./client";

describe("getContent (server path)", () => {
  it("reads procedures.json from public/mocks and returns all 8 entries", async () => {
    const procedures = await getProcedures();
    expect(procedures).toHaveLength(8);
    expect(procedures[0]).toMatchObject({ slug: "prevencao", nome: "Prevenção" });
  });

  it("reads locations.json with all 3 clinic entries", async () => {
    const locations = await getLocations();
    expect(locations).toHaveLength(3);
    expect(locations.map((l) => l.cidade)).toEqual([
      "São José dos Campos",
      "Mogi das Cruzes",
      "Mogi das Cruzes",
    ]);
  });

  it("reads testimonials.json with all 3 entries", async () => {
    const testimonials = await getTestimonials();
    expect(testimonials).toHaveLength(3);
  });

  it("reads insurances.json with all 3 entries", async () => {
    const insurances = await getInsurances();
    expect(insurances).toHaveLength(3);
  });

  it("reads profile.json with the whatsapp config", async () => {
    const profile = await getProfile();
    expect(profile.whatsapp.phone).toBe("5512983185513");
    expect(profile.cities).toEqual(["São José dos Campos", "Mogi das Cruzes"]);
  });
});
