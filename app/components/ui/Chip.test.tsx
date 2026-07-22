import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders a value chip as a non-interactive span", () => {
    render(<Chip variant="value">acolhimento</Chip>);
    expect(screen.getByText("acolhimento").tagName).toBe("SPAN");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a procedure chip as a toggle button reflecting selected state", () => {
    render(
      <Chip variant="procedure" selected>
        Prevenção
      </Chip>
    );
    expect(screen.getByRole("button", { name: "Prevenção" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("calls onClick when a city chip is clicked", async () => {
    const onClick = vi.fn();
    render(
      <Chip variant="city" selected={false} onClick={onClick}>
        Todas
      </Chip>
    );
    await userEvent.click(screen.getByRole("button", { name: "Todas" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
