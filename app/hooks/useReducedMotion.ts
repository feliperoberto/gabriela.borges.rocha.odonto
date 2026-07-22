import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion: reduce`. Every animated hook
 * (useRevealOnScroll, useParallax, useDragScroll) consumes this and
 * short-circuits its animation entirely when true — content stays visible,
 * just without motion, matching the prototype's `componentDidMount` guard.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return reduced;
}
