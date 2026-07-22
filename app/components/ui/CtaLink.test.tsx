import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CtaLink } from "./CtaLink";

describe("CtaLink", () => {
  it("renders as a link with the given href", () => {
    render(
      <CtaLink variant="outline" href="https://wa.me/5512983185513">
        Agendar consulta
      </CtaLink>
    );
    expect(screen.getByRole("link", { name: "Agendar consulta" })).toHaveAttribute(
      "href",
      "https://wa.me/5512983185513"
    );
  });

  it("sets target=_blank and rel=noopener when external", () => {
    render(
      <CtaLink variant="whatsapp" href="https://wa.me/5512983185513" external>
        Agendar pelo WhatsApp
      </CtaLink>
    );
    const link = screen.getByRole("link", { name: "Agendar pelo WhatsApp" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("does not set target/rel when not external", () => {
    render(
      <CtaLink variant="solid" href="tel:+5512983185513">
        (12) 9 8318-5513
      </CtaLink>
    );
    const link = screen.getByRole("link", { name: "(12) 9 8318-5513" });
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });
});
