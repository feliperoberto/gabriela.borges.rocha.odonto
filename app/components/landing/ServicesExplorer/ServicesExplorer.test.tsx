import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ServicesExplorer } from "./ServicesExplorer";

const procedures = [
  { slug: "prevencao", nome: "Prevenção", desc: "Acompanhamento contínuo para evitar cáries." },
  { slug: "clareamento", nome: "Clareamento", desc: "Dentes visivelmente mais claros." },
];

describe("ServicesExplorer", () => {
  it("shows no description panel initially", () => {
    render(<ServicesExplorer procedures={procedures} />);
    expect(screen.queryByText(procedures[0].desc)).not.toBeInTheDocument();
    expect(screen.queryByText(procedures[1].desc)).not.toBeInTheDocument();
  });

  it("shows the description panel when a procedure chip is clicked", async () => {
    render(<ServicesExplorer procedures={procedures} />);
    await userEvent.click(screen.getByRole("button", { name: "Prevenção" }));
    expect(screen.getByText(procedures[0].desc)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Prevenção" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("hides the panel when the same chip is clicked again", async () => {
    render(<ServicesExplorer procedures={procedures} />);
    const chip = screen.getByRole("button", { name: "Prevenção" });
    await userEvent.click(chip);
    await userEvent.click(chip);
    expect(screen.queryByText(procedures[0].desc)).not.toBeInTheDocument();
    expect(chip).toHaveAttribute("aria-pressed", "false");
  });

  it("swaps the panel when a different chip is clicked", async () => {
    render(<ServicesExplorer procedures={procedures} />);
    await userEvent.click(screen.getByRole("button", { name: "Prevenção" }));
    await userEvent.click(screen.getByRole("button", { name: "Clareamento" }));

    expect(screen.queryByText(procedures[0].desc)).not.toBeInTheDocument();
    expect(screen.getByText(procedures[1].desc)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Prevenção" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "Clareamento" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
