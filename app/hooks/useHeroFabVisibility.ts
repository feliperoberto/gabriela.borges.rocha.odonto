import { useEffect, useState, type RefObject } from "react";

/**
 * The fixed WhatsApp FAB only appears once the hero CTA has scrolled above
 * the viewport (`bottom < 0`) — matches the prototype's `fabPass()` check.
 */
export function useHeroFabVisibility(heroCtaRef: RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = heroCtaRef.current;
      if (!el) return;
      setVisible(el.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [heroCtaRef]);

  return visible;
}
