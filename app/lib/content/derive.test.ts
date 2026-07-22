import { describe, expect, it } from "vitest";

import { buildCityFilters, buildWaUrl } from "./derive";
import type { Profile } from "./types";

const profile: Profile = {
  nome: "Dra. Gabriela Borges Rocha",
  cro: "CRO-SP 176648",
  tel: "+5512983185513",
  telDisplay: "(12) 9 8318-5513",
  email: "dra.gabrielaborgesrocha@gmail.com",
  instagram: "dra.gabiborges.odonto",
  cities: ["São José dos Campos", "Mogi das Cruzes"],
  whatsapp: {
    phone: "5512983185513",
    defaultMessage: "Olá, Dra. Gabriela! Gostaria de agendar uma avaliação.",
  },
};

describe("buildWaUrl", () => {
  it("builds a wa.me link with the default message URL-encoded", () => {
    const url = buildWaUrl(profile);
    expect(url).toBe(
      "https://wa.me/5512983185513?text=Ol%C3%A1%2C%20Dra.%20Gabriela!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
    );
  });

  it("uses a custom message when provided", () => {
    const url = buildWaUrl(profile, "Quero agendar uma limpeza");
    expect(url).toBe("https://wa.me/5512983185513?text=Quero%20agendar%20uma%20limpeza");
  });
});

describe("buildCityFilters", () => {
  it('prefixes the clinic cities with "Todas"', () => {
    expect(buildCityFilters(profile)).toEqual([
      "Todas",
      "São José dos Campos",
      "Mogi das Cruzes",
    ]);
  });
});
