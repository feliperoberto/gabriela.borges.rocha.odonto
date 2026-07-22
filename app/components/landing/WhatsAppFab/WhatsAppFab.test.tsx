import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { Profile } from "@/lib/content/types";

import { WhatsAppFab } from "./WhatsAppFab";

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

describe("WhatsAppFab", () => {
  let heroCta: HTMLElement;

  beforeEach(() => {
    heroCta = document.createElement("a");
    heroCta.id = "hero-cta";
    document.body.appendChild(heroCta);
  });

  afterEach(() => {
    heroCta.remove();
  });

  it("is hidden while the hero CTA is still in view", () => {
    heroCta.getBoundingClientRect = () => ({ bottom: 400 }) as DOMRect;
    render(<WhatsAppFab profile={profile} />);
    expect(screen.getByRole("link", { name: "Conversar no WhatsApp" }).className).not.toMatch(
      /visible/
    );
  });

  it("becomes visible once the hero CTA has scrolled above the viewport", () => {
    let bottom = 400;
    heroCta.getBoundingClientRect = () => ({ bottom }) as DOMRect;
    render(<WhatsAppFab profile={profile} />);

    bottom = -10;
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByRole("link", { name: "Conversar no WhatsApp" }).className).toMatch(
      /visible/
    );
  });
});
