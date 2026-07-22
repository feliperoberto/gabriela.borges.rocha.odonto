import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useDragScroll } from "./useDragScroll";

function TestTarget({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useDragScroll<HTMLDivElement>(reducedMotion);
  return <div ref={ref} data-testid="carousel" />;
}

function mousedown(el: Element, clientX: number) {
  el.dispatchEvent(new MouseEvent("mousedown", { button: 0, clientX, bubbles: true }));
}
function mousemove(clientX: number) {
  document.dispatchEvent(new MouseEvent("mousemove", { clientX, bubbles: true, cancelable: true }));
}
function mouseup() {
  document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
}

describe("useDragScroll", () => {
  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(1000);
      return 0;
    });
    vi.spyOn(performance, "now").mockReturnValue(0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("does not move the carousel for a tiny mousedown/mouseup without movement", () => {
    render(<TestTarget reducedMotion={false} />);
    const el = screen.getByTestId("carousel");
    el.scrollLeft = 0;

    mousedown(el, 100);
    mouseup();

    expect(el.scrollLeft).toBe(0);
  });

  it("scrolls horizontally once the drag exceeds the 4px threshold", () => {
    render(<TestTarget reducedMotion={false} />);
    const el = screen.getByTestId("carousel");
    el.scrollLeft = 50;

    mousedown(el, 200);
    mousemove(150); // dx = -50, beyond threshold
    expect(el.style.cursor).toBe("grabbing");
    expect(el.scrollLeft).toBe(100); // startScrollLeft(50) - dx(-50)
  });

  it("eases back to x-mandatory snap on mouseup after a drag", () => {
    render(<TestTarget reducedMotion={false} />);
    const el = screen.getByTestId("carousel");
    el.scrollLeft = 0;

    mousedown(el, 200);
    mousemove(140); // engage drag
    mouseup();

    expect(el.style.cursor).toBe("grab");
    expect(el.style.scrollSnapType).toBe("x mandatory");
  });

  it("converts vertical wheel input into horizontal scroll when not at an edge", () => {
    render(<TestTarget reducedMotion={false} />);
    const el = screen.getByTestId("carousel");
    Object.defineProperty(el, "scrollWidth", { value: 2000, configurable: true });
    Object.defineProperty(el, "clientWidth", { value: 500, configurable: true });
    el.scrollLeft = 200;

    const wheelEvent = new WheelEvent("wheel", { deltaY: 40, deltaX: 0, cancelable: true });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");
    el.dispatchEvent(wheelEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(el.scrollLeft).toBe(240);
  });

  it("re-snaps 180ms after the wheel gesture settles", () => {
    vi.useFakeTimers();
    render(<TestTarget reducedMotion={false} />);
    const el = screen.getByTestId("carousel");
    Object.defineProperty(el, "scrollWidth", { value: 2000, configurable: true });
    Object.defineProperty(el, "clientWidth", { value: 500, configurable: true });
    el.scrollLeft = 200;

    el.dispatchEvent(new WheelEvent("wheel", { deltaY: 40, deltaX: 0, cancelable: true }));
    expect(el.style.scrollSnapType).toBe("none");

    act(() => vi.advanceTimersByTime(180));
    expect(el.style.scrollSnapType).toBe("x mandatory");
    vi.useRealTimers();
  });

  it("does not attach handlers under reduced motion", () => {
    render(<TestTarget reducedMotion={true} />);
    const el = screen.getByTestId("carousel");
    el.scrollLeft = 50;

    mousedown(el, 200);
    mousemove(100);
    mouseup();

    expect(el.scrollLeft).toBe(50);
    expect(el.style.cursor).toBe("");
  });
});
