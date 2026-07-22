import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Profile } from "@/lib/content/types";

import { Hero } from "./Hero";

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

describe("Hero", () => {
  it("renders the WhatsApp CTA with the encoded default message", () => {
    render(<Hero profile={profile} />);
    const cta = screen.getByRole("link", { name: /Agendar pelo WhatsApp/ });
    expect(cta).toHaveAttribute(
      "href",
      "https://wa.me/5512983185513?text=Ol%C3%A1%2C%20Dra.%20Gabriela!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
    );
    expect(cta).toHaveAttribute("id", "hero-cta");
  });

  it("renders the 3 trust links pointing to their in-page anchors", () => {
    render(<Hero profile={profile} />);
    expect(screen.getByRole("link", { name: "CRO-SP 176648" })).toHaveAttribute("href", "#sobre");
    expect(screen.getByRole("link", { name: "Convênios aceitos" })).toHaveAttribute(
      "href",
      "#convenios"
    );
    expect(screen.getByRole("link", { name: "Unidades" })).toHaveAttribute("href", "#unidades");
  });
});
