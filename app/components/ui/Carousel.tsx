import type { ReactNode } from "react";

import { useDragScroll } from "@/hooks/useDragScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import styles from "./Carousel.module.css";

export interface CarouselProps {
  children: ReactNode;
  hint?: string;
}

/**
 * Horizontal drag/snap carousel used by TestimonialsSection and
 * LocationsSection — a right-edge fade, a drag/wheel-enabled scroll track,
 * and the prototype's "Arraste para o lado" hint below it.
 */
export function Carousel({ children, hint = "Arraste para o lado para ver mais →" }: CarouselProps) {
  const reducedMotion = useReducedMotion();
  const trackRef = useDragScroll<HTMLDivElement>(reducedMotion);

  return (
    <div className={styles.wrapper}>
      <div className={styles.edgeFade} aria-hidden="true" />
      <div ref={trackRef} className={styles.track} data-drag="">
        {children}
      </div>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  );
}
