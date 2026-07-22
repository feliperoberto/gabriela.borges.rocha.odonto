import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LocationsSection } from "./LocationsSection";

const locations = [
  {
    slug: "parque-industrial",
    bairro: "Parque Industrial",
    cidade: "São José dos Campos",
    foto: "/images/consultorio-parque-industrial.jpg",
    alt: "Consultório no Parque Industrial, São José dos Campos",
  },
  {
    slug: "parque-monte-libano",
    bairro: "Parque Monte Líbano",
    cidade: "Mogi das Cruzes",
    foto: "/images/consultorio-parque-monte-libano.png",
    alt: "Consultório no Parque Monte Líbano, Mogi das Cruzes",
  },
  {
    slug: "centro-mogi",
    bairro: "Centro",
    cidade: "Mogi das Cruzes",
    foto: "/images/centro-mogi.jpeg",
    alt: "Consultório no Centro de Mogi das Cruzes",
  },
];
const cityFilters = ["Todas", "São José dos Campos", "Mogi das Cruzes"];

describe("LocationsSection", () => {
  it('shows all 3 clinics when "Todas" is selected', () => {
    render(<LocationsSection locations={locations} cityFilters={cityFilters} />);
    expect(screen.getByText("Parque Industrial")).toBeInTheDocument();
    expect(screen.getByText("Parque Monte Líbano")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  it("shows only the 1 São José dos Campos clinic when that city is selected", async () => {
    render(<LocationsSection locations={locations} cityFilters={cityFilters} />);
    await userEvent.click(screen.getByRole("button", { name: "São José dos Campos" }));

    expect(screen.getByText("Parque Industrial")).toBeInTheDocument();
    expect(screen.queryByText("Parque Monte Líbano")).not.toBeInTheDocument();
    expect(screen.queryByText("Centro")).not.toBeInTheDocument();
  });

  it("shows both Mogi das Cruzes clinics when that city is selected", async () => {
    render(<LocationsSection locations={locations} cityFilters={cityFilters} />);
    await userEvent.click(screen.getByRole("button", { name: "Mogi das Cruzes" }));

    expect(screen.queryByText("Parque Industrial")).not.toBeInTheDocument();
    expect(screen.getByText("Parque Monte Líbano")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  it("marks the selected city chip as pressed", async () => {
    render(<LocationsSection locations={locations} cityFilters={cityFilters} />);
    const chip = screen.getByRole("button", { name: "Mogi das Cruzes" });
    await userEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute("aria-pressed", "false");
  });
});
