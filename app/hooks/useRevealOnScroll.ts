import { useEffect, useRef, useState, type RefObject } from "react";

const REVEAL_THRESHOLD = 0.9;
const SAFETY_TIMEOUT_MS = 8000;

/**
 * Fade/slide an element in once it scrolls within `innerHeight * 0.9` of the
 * top of the viewport — matches the prototype's `rvPass()` reveal-on-scroll.
 * Fail-open: an 8s safety timer force-reveals anything still hidden, so a
 * revealed element is never permanently invisible (e.g. a resize edge case).
 * Disabled entirely under reduced motion — the element is simply visible.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  reducedMotion: boolean
): { ref: RefObject<T | null>; revealed: boolean } {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    // Re-sync if reducedMotion flips true after mount (an OS-level
    // preference change) — the effect that receives this in a callback
    // rather than the initial render is a legitimate external-system sync.
    const syncReducedMotion = () => setRevealed(true);
    if (reducedMotion) {
      syncReducedMotion();
      return;
    }
    const el = ref.current;
    if (!el) return;

    let done = false;
    const check = () => {
      if (done) return;
      if (el.getBoundingClientRect().top < window.innerHeight * REVEAL_THRESHOLD) {
        done = true;
        setRevealed(true);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();

    const safety = setTimeout(() => {
      if (!done) {
        done = true;
        setRevealed(true);
      }
    }, SAFETY_TIMEOUT_MS);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(safety);
    };
  }, [reducedMotion]);

  return { ref, revealed };
}
