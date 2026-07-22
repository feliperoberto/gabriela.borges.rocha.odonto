import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useRevealOnScroll } from "./useRevealOnScroll";

/** Overrides getBoundingClientRect via a callback ref, which React invokes
 * during commit — before the hook's passive effect runs its initial check. */
function TestTarget({ reducedMotion, top }: { reducedMotion: boolean; top: number }) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>(reducedMotion);
  return (
    <div
      ref={(el) => {
        if (el) el.getBoundingClientRect = () => ({ top }) as DOMRect;
        ref.current = el;
      }}
      data-testid="target"
    >
      {revealed ? "revealed" : "hidden"}
    </div>
  );
}

describe("useRevealOnScroll", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("stays revealed when the element is already within the threshold at mount", () => {
    render(<TestTarget reducedMotion={false} top={500} />);
    expect(screen.getByTestId("target")).toHaveTextContent("revealed");
  });

  it("hides an element that is below the fold at mount, then reveals it once scrolled into view", () => {
    render(<TestTarget reducedMotion={false} top={5000} />);
    expect(screen.getByTestId("target")).toHaveTextContent("hidden");

    screen.getByTestId("target").getBoundingClientRect = () => ({ top: 500 }) as DOMRect;
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByTestId("target")).toHaveTextContent("revealed");
  });

  it("force-reveals after the 8s safety timeout even if never scrolled into view", () => {
    render(<TestTarget reducedMotion={false} top={5000} />);
    expect(screen.getByTestId("target")).toHaveTextContent("hidden");

    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByTestId("target")).toHaveTextContent("revealed");
  });

  it("never hides the element under reduced motion, even if below the fold", () => {
    render(<TestTarget reducedMotion={true} top={5000} />);
    expect(screen.getByTestId("target")).toHaveTextContent("revealed");
  });
});
