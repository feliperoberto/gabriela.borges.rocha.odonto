import { useEffect, useRef, useState, type RefObject } from "react";

const REVEAL_THRESHOLD = 0.9;
const SAFETY_TIMEOUT_MS = 8000;

/**
 * Fade/slide an element in once it scrolls within `innerHeight * 0.9` of the
 * top of the viewport — matches the prototype's `rvPass()` reveal-on-scroll
 * state machine (undefined → hid → shown). Defaults to `revealed: true` so
 * server-rendered/pre-hydration content is never invisible; only once
 * mounted does the effect hide an element that is genuinely below the fold,
 * then reveal it as the user scrolls to it. Fail-open: an 8s safety timer
 * force-reveals anything still hidden. Disabled entirely under reduced
 * motion — the element is simply visible, with no hide-then-reveal pass.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  reducedMotion: boolean
): { ref: RefObject<T | null>; revealed: boolean } {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let determined = false;
    let done = false;

    const check = () => {
      if (done) return;
      const inView = el.getBoundingClientRect().top < window.innerHeight * REVEAL_THRESHOLD;
      if (!determined) {
        determined = true;
        if (inView) {
          done = true; // already in view at mount: no hide-then-reveal pass
          return;
        }
        setRevealed(false); // below the fold: hide now, reveal on scroll
        return;
      }
      if (inView) {
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
