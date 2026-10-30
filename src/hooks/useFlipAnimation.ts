import { useLayoutEffect, useRef } from "react";

const DURATION_MS = 500;

type Positions = Map<string, { element: HTMLElement; rect: DOMRect }>;

function measureChildren(container: HTMLElement | null): Positions {
  const positions: Positions = new Map();
  Array.from(container?.children ?? []).forEach((element) => {
    if (element instanceof HTMLElement && element.dataset.flipId) {
      positions.set(element.dataset.flipId, {
        element,
        rect: element.getBoundingClientRect(),
      });
    }
  });
  return positions;
}

/**
 * Slides a container's children from their old place to their new one when they are
 * reordered (FLIP: measure First, render Last, Invert, Play). Children need a
 * `data-flip-id`, and `captureOrder` must be called right before changing the order.
 * Positions are only read around a reorder, never on the initial render, so page load
 * forces no layout.
 */
function useFlipAnimation<T extends HTMLElement>(order: unknown) {
  const containerRef = useRef<T>(null);
  const firstPositions = useRef<Positions | null>(null);
  const runningAnimations = useRef<Animation[]>([]);

  const captureOrder = () => {
    firstPositions.current = measureChildren(containerRef.current);
    // Restart from where the cards are drawn now if a previous reorder is mid-animation
    runningAnimations.current.forEach((animation) => animation.cancel());
  };

  useLayoutEffect(() => {
    const first = firstPositions.current;
    firstPositions.current = null;
    if (
      !first ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Every position is read before any animation starts, so layout runs only once
    const animations: Animation[] = [];
    measureChildren(containerRef.current).forEach(({ element, rect }, id) => {
      const previous = first.get(id)?.rect;
      const dx = previous ? previous.left - rect.left : 0;
      const dy = previous ? previous.top - rect.top : 0;
      if (dx !== 0 || dy !== 0) {
        animations.push(
          element.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: "none" },
            ],
            { duration: DURATION_MS, easing: "ease-in-out" },
          ),
        );
      }
    });
    runningAnimations.current = animations;
  }, [order]);

  return { containerRef, captureOrder };
}

export default useFlipAnimation;
