import { act, renderHook } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { useHeroFabVisibility } from "./useHeroFabVisibility";

function mockRect(bottom: number) {
  return { bottom } as DOMRect;
}

describe("useHeroFabVisibility", () => {
  it("is hidden while the hero CTA is still in view (bottom >= 0)", () => {
    const ref = createRef<HTMLElement>();
    const el = document.createElement("a");
    el.getBoundingClientRect = () => mockRect(120);
    (ref as { current: HTMLElement }).current = el;

    const { result } = renderHook(() => useHeroFabVisibility(ref));
    expect(result.current).toBe(false);
  });

  it("becomes visible once the hero CTA scrolls above the viewport (bottom < 0)", () => {
    const ref = createRef<HTMLElement>();
    const el = document.createElement("a");
    let bottom = 120;
    el.getBoundingClientRect = () => mockRect(bottom);
    (ref as { current: HTMLElement }).current = el;

    const { result } = renderHook(() => useHeroFabVisibility(ref));
    expect(result.current).toBe(false);

    bottom = -8;
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(result.current).toBe(true);
  });
});
