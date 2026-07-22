import { useEffect, useRef, type RefObject } from "react";

const DRAG_THRESHOLD_PX = 4;
const SNAP_EASE_MS = 260;
const WHEEL_RESNAP_DELAY_MS = 180;

/**
 * Drag-to-scroll + wheel-to-horizontal conversion for a snap carousel,
 * matching the prototype's document-level drag/wheel handlers. Disabled
 * entirely under reduced motion — native scroll/snap still works, just
 * without the eased snap-back or wheel conversion.
 */
export function useDragScroll<T extends HTMLElement>(reducedMotion: boolean): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScrollLeft = el.scrollLeft;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      if (!moved && Math.abs(dx) > DRAG_THRESHOLD_PX) {
        moved = true;
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
        el.style.userSelect = "none";
      }
      if (moved) {
        event.preventDefault();
        el.scrollLeft = startScrollLeft - dx;
      }
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      if (!moved) return;
      el.style.cursor = "grab";
      el.style.userSelect = "";
      // Ease back to the nearest snap point without a visual jump: measure
      // the snap target with snapping re-enabled, then animate to it.
      const from = el.scrollLeft;
      el.style.scrollSnapType = "x mandatory";
      const to = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.scrollLeft = from;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / SNAP_EASE_MS, 1);
        el.scrollLeft = from + (to - from) * (1 - (1 - progress) ** 3);
        if (progress < 1) requestAnimationFrame(tick);
        else el.style.scrollSnapType = "x mandatory";
      };
      requestAnimationFrame(tick);
    };

    let resnapTimeout: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // native horizontal gesture
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = el.scrollLeft + event.deltaY;
      // Let the page scroll normally once the carousel hits an edge.
      if ((next <= 0 && el.scrollLeft <= 0) || (next >= max && el.scrollLeft >= max)) return;
      event.preventDefault();
      el.style.scrollSnapType = "none";
      el.scrollLeft = next;
      clearTimeout(resnapTimeout);
      resnapTimeout = setTimeout(() => {
        el.style.scrollSnapType = "x mandatory";
      }, WHEEL_RESNAP_DELAY_MS);
    };

    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("wheel", onWheel);
      clearTimeout(resnapTimeout);
    };
  }, [reducedMotion]);

  return ref;
}
