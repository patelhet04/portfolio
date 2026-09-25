/** Reveals words one after another by adding `.on`. Returns the timer ids so the caller can clear them. */
export function revealWords(words: HTMLElement[], { delay = 0, step }: { delay?: number; step: number }) {
  return words.map((w, k) => window.setTimeout(() => w.classList.add("on"), delay + k * step));
}
