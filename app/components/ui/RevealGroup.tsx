"use client";

import type { CSSProperties, ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps a section's content with the reveal-on-scroll behavior so each
 * landing section doesn't repeat the hook-wiring boilerplate. Visible by
 * default (SSR/no-JS safe); hides once, on mount, only if genuinely below
 * the fold, then fades/slides in on scroll — see useRevealOnScroll.
 */
export function RevealGroup({ children, className, style }: RevealGroupProps) {
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>(reducedMotion);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(var(--motion-reveal-distance))",
        transition: revealed
          ? `opacity var(--motion-reveal-duration) ease, transform var(--motion-reveal-duration) ease`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
