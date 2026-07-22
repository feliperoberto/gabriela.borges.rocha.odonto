import { useEffect, useRef, type RefObject } from "react";

const PARALLAX_FACTOR = -0.07;

/**
 * Translates the element by `(rectMiddle - viewportMiddle) * -0.07`, matching
 * the prototype's parallax on the About section's portrait. Throttled to one
 * computation per animation frame and skipped entirely while the element is
 * off-screen. Disabled under reduced motion (no transform is ever applied).
 */
export function useParallax<T extends HTMLElement>(reducedMotion: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          ticking = false;
          return;
        }
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * PARALLAX_FACTOR;
        el.style.transform = `translateY(${offset.toFixed(1)}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return ref;
}
