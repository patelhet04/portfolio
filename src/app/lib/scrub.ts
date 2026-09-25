import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Drives `onProgress` from scroll position, Apple style: progress goes from 0 when the element's
 * top reaches `from` (a fraction of the viewport height) to 1 when it has travelled up to `to`,
 * plus `withHeight` of its own height. It follows the scroll both ways and stops when scrolling
 * stops. Listens only while the element is near the viewport. With reduced motion, progress is 1.
 */
export function useScrub<T extends HTMLElement>(
  ref: RefObject<T>,
  onProgress: (p: number, el: T) => void,
  { from = 0.85, to = 0.45, withHeight = 0 }: { from?: number; to?: number; withHeight?: number } = {},
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(1, el);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      cb.current(Math.min(1, Math.max(0, (vh * from - r.top) / (vh * (from - to) + r.height * withHeight))), el);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const listen = (on: boolean) => {
      (on ? addEventListener : removeEventListener)("scroll", onScroll, { passive: true } as AddEventListenerOptions);
      (on ? addEventListener : removeEventListener)("resize", onScroll);
    };
    const io = new IntersectionObserver(([e]) => {
      listen(e.isIntersecting);
      update();
    }, { rootMargin: "20% 0px" });
    io.observe(el);
    update();
    return () => {
      io.disconnect();
      listen(false);
      cancelAnimationFrame(frame);
    };
  }, [from, to, withHeight]);
}

/**
 * Spreads one progress value across a run of items so a soft front moves through them in order:
 * item i reads 0 before the front, 1 after it, and blends across `soft` items at the front.
 */
export const front = (p: number, i: number, n: number, soft = 3) => Math.min(1, Math.max(0, (p * (n + soft) - i) / soft));
