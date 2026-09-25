/**
 * Reveals words the way a streamed response comes off the wire: in small bursts of one to four
 * words, at an uneven pace that averages `step` ms per word. Adds `.on` to each word and calls
 * `onBurst` after each burst. Returns the timer ids (so the caller can clear them) and when the
 * last burst lands.
 */
export function revealWords(words: HTMLElement[], { delay = 0, step, onBurst }: { delay?: number; step: number; onBurst?: () => void }) {
  const timers: number[] = [];
  let t = delay;
  for (let i = 0; i < words.length; ) {
    const burst = words.slice(i, i + 1 + Math.floor(Math.random() * 4));
    const at = t;
    timers.push(
      window.setTimeout(() => {
        burst.forEach((w) => w.classList.add("on"));
        onBurst?.();
      }, at),
    );
    i += burst.length;
    if (i < words.length) t += burst.length * step * (0.6 + Math.random() * 0.8);
  }
  return { timers, end: t };
}
