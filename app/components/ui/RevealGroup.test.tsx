import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RevealGroup } from "./RevealGroup";

describe("RevealGroup", () => {
  it("renders its children visibly by default (SSR/no-JS safe)", () => {
    render(
      <RevealGroup>
        <p>Conteúdo</p>
      </RevealGroup>
    );
    const content = screen.getByText("Conteúdo");
    expect(content).toBeInTheDocument();
    // jsdom's default getBoundingClientRect().top is 0, i.e. already in
    // view, so this mounts already revealed with no opacity/transform set.
    expect(content.parentElement).toHaveStyle({ opacity: "1" });
  });
});
