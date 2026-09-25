"use client";
import { useEffect, useRef } from "react";

/**
 * The preloader. It's in the static HTML and the pre-paint script turns it on
 * (`html[data-loader]`) on every full page load, so it covers the page from the first paint. Token bars
 * stream in like a tokenized sentence while the page loads, then close into one bar that becomes
 * the header's caret beside the wordmark, and the page appears. It lasts as long as the real
 * loading (three font faces and the Memoji video), at least MIN and at most MAX.
 */
export const BOOT_DONE = "boot:done";
const MIN = 1400;
const MAX = 3000;
const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";
/** Bar widths in units of --u, like a sentence's tokens */
const BARS = [3.2, 5.4, 2.2, 6.6, 4.1, 1.8, 5, 3.6];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Boot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.loader === undefined) return;
    const el = ref.current!;
    let alive = true;
    const t0 = performance.now();

    // Ready when the three font faces and the Memoji video (home page only) have loaded
    let loaded = 0;
    const video = document.querySelector<HTMLVideoElement>(".mcard video");
    const faces = ['600 1em "Host Grotesk"', '400 1em "Host Grotesk"', '400 1em "Martian Mono"'];
    const fonts = faces.map((f) => (document.fonts?.load(f) ?? Promise.resolve()).catch(() => {}));
    const media = new Promise<void>((done) => {
      if (!video || video.readyState >= 3) return done();
      video.addEventListener("canplaythrough", () => done(), { once: true });
      video.addEventListener("error", () => done(), { once: true });
    });
    const ready = Promise.race([Promise.all([...fonts, media]), wait(MAX)]);
    ready.then(() => (loaded = 1));

    const run = async () => {
      const row = el.querySelector<HTMLElement>(".boot__row")!;
      const bars = Array.from(row.children) as HTMLElement[];
      // Tokens stream in one at a time, each flashing as it arrives
      for (let i = 0; i < bars.length; i++) {
        await wait(i === 0 ? 140 : 90 + (i % 3) * 25);
        if (!alive) return;
        bars[i].classList.add("on", "fresh");
        setTimeout(() => bars[i].classList.remove("fresh"), 170);
      }
      el.dataset.caret = "";
      await ready;
      await wait(Math.max(0, MIN - (performance.now() - t0)));
      if (!alive) return;
      // The gaps close and the tokens become one bar…
      el.dataset.merge = "";
      await wait(380);
      // …which becomes the header's caret as the page appears
      const cursor = document.querySelector<HTMLElement>(".top .brand__cursor");
      const merged = el.querySelector<HTMLElement>(".boot__merged")!;
      const a = row.getBoundingClientRect();
      const bg = el.querySelector<HTMLElement>(".boot__bg")!;
      bg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 460, delay: 160, easing: "ease", fill: "forwards" });
      if (cursor) {
        const b = cursor.getBoundingClientRect();
        Object.assign(merged.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`, opacity: "1" });
        el.dataset.handoff = "";
        await merged.animate(
          [
            { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`, borderRadius: getComputedStyle(merged).borderRadius },
            { left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px`, borderRadius: getComputedStyle(cursor).borderRadius },
          ],
          { duration: 680, easing: EASE_DRAWER, fill: "forwards" },
        ).finished;
      } else {
        await wait(620);
      }
    };

    run().then(() => {
      if (!alive) return;
      delete root.dataset.loader;
      dispatchEvent(new Event(BOOT_DONE));
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div id="boot" ref={ref} aria-hidden>
      <div className="boot__bg" />
      <div className="boot__bars">
        <span className="boot__row">
          {BARS.map((w, i) => (
            <i key={i} className="boot__tbar" style={{ "--bw": w } as React.CSSProperties} />
          ))}
        </span>
        <span className="boot__caret" />
      </div>
      {/* Outside the centred (transformed) row, so it's positioned against the viewport */}
      <i className="boot__merged" />
    </div>
  );
}
