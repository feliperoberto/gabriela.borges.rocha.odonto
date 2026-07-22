import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useParallax } from "./useParallax";

function TestTarget({
  reducedMotion,
  rect,
}: {
  reducedMotion: boolean;
  rect: Partial<DOMRect>;
}) {
  const ref = useParallax<HTMLDivElement>(reducedMotion);
  return (
    <div
      ref={(el) => {
        if (el) el.getBoundingClientRect = () => rect as DOMRect;
        ref.current = el;
      }}
      data-testid="target"
    />
  );
}

describe("useParallax", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
    // Run rAF callbacks synchronously so assertions don't need to wait a frame.
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("applies no transform under reduced motion", () => {
    render(<TestTarget reducedMotion rect={{ top: 100, bottom: 300, height: 200 }} />);
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByTestId("target").style.transform).toBe("");
  });

  it("sets a translateY offset while the element is within the viewport", () => {
    render(
      <TestTarget
        reducedMotion={false}
        rect={{ top: 100, bottom: 300, height: 200 }}
      />
    );
    act(() => window.dispatchEvent(new Event("scroll")));
    // middle = 100 + 100 = 200; viewport middle = 400; (200-400) * -0.07 = 14.0
    expect(screen.getByTestId("target").style.transform).toBe("translateY(14.0px)");
  });

  it("skips the update while the element is off-screen (bottom < 0)", () => {
    render(<TestTarget reducedMotion={false} rect={{ top: -900, bottom: -700, height: 200 }} />);
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByTestId("target").style.transform).toBe("");
  });
});
