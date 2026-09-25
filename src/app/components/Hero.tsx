"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowDown } from "./Icons";

const ANSWER = "I build AI systems that hold up in production: agents, retrieval, and the GPUs underneath.";

/**
 * The answer, word by word. `hl` words sit under the highlighter sweep. The first pass streams
 * "…hold up: agents…"; then the words part and "in production" drops into the space.
 */
const WORDS: { t: string; hl?: boolean }[] = [
  { t: "I" },
  { t: "build" },
  { t: "AI" },
  { t: "systems" },
  { t: "that" },
  { t: "hold", hl: true },
  { t: "up", hl: true },
  { t: "in", hl: true },
  { t: "production", hl: true },
  { t: ":" },
  { t: "agents," },
  { t: "retrieval," },
  { t: "and" },
  { t: "the" },
  { t: "GPUs" },
  { t: "underneath." },
];
const idx = (t: string) => WORDS.findIndex((w) => w.t === t);
const HOLD = idx("hold");
const IN = idx("in");
const PRODUCTION = idx("production");
const COLON = idx(":");
const LAST = WORDS.length - 1;
const FIRST_PASS = WORDS.map((_, i) => i).filter((i) => i !== IN && i !== PRODUCTION);
/** Pause after each word of the first pass (ms): steady, slightly uneven */
const CADENCE = [78, 92, 70, 96, 74, 82, 64, 0, 0, 84, 70, 90, 72, 88, 76, 0];

/** The words part to open the space for the drop */
const PART = { duration: 560, easing: "cubic-bezier(0.65, 0, 0.35, 1)" };
/**
 * A ball dropped from 0.7em that keeps 35% of its height at each bounce: three bounces
 * (about 0.25em, 0.09em, 0.03em), each airtime 0.6 of the one before. Falls ease in, rises ease out.
 * It fades in on the way down, so it barely touches the line above.
 */
const DROP_MS = 1000;
const FALL = "cubic-bezier(0.55, 0.085, 0.68, 0.53)";
const RISE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const DROP: Keyframe[] = [
  { offset: 0, transform: "translateY(-0.7em)", opacity: 0, filter: "none", easing: FALL },
  { offset: 0.22, opacity: 1 },
  { offset: 0.304, transform: "none", easing: RISE },
  { offset: 0.483, transform: "translateY(-0.245em)", easing: FALL },
  { offset: 0.663, transform: "none", easing: RISE },
  { offset: 0.769, transform: "translateY(-0.086em)", easing: FALL },
  { offset: 0.876, transform: "none", easing: RISE },
  { offset: 0.939, transform: "translateY(-0.03em)", easing: FALL },
  { offset: 1, transform: "none", opacity: 1, filter: "none" },
];
/** When the first bounce lands, as a share of the drop */
const IMPACT = 0.304;
/** The drop starts once the space is mostly open; "production" follows "in" */
const DROP_AT = [300, 400];

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Streams once per page load: a reload or a new tab streams again, while coming back to
 * the home page from a span page (a client-side navigation) shows the finished answer.
 */
let streamedThisLoad = false;
/** Set by the footer's Regenerate button before it navigates home from another page. */
export const REPLAY_KEY = "hero-replay";

/** Replays the hero stream; the footer's Regenerate button dispatches this. */
export const REGENERATE_EVENT = "hero:regenerate";

export default function Hero() {
  const answerRef = useRef<HTMLHeadingElement>(null);
  const hlRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // React doesn't render `muted` into static HTML, so the loop is started here instead of
  // with `autoPlay`: only while it's on screen, and not at all with reduced motion, where
  // the poster stays up.
  useEffect(() => {
    const video = videoRef.current!;
    video.muted = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    const sync = () => (onScreen && !reduce.matches ? video.play().catch(() => {}) : video.pause());
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  // The answer box is held at the finished sentence's height from the first frame, so the edit
  // reflows words inside it and nothing around it moves. The caret floats over the text, moved
  // with transforms. React renders the markup once; the stream only toggles classes and styles.
  // A layout effect, so a client-side visit hides the answer before the first paint.
  useIsoLayoutEffect(() => {
    const answer = answerRef.current!;
    const hl = hlRef.current!;
    const caret = caretRef.current!;
    const meta = metaRef.current!;
    const words = Array.from(answer.querySelectorAll<HTMLElement>(".tok"));
    const state = meta.querySelector<HTMLSpanElement>("[data-state]")!;
    const [nTok, nTime, nRate] = ["tok", "time", "rate"].map((k) => meta.querySelector<HTMLElement>(`[data-m="${k}"]`)!);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: number[] = [];
    let raf = 0;
    let generation = 0;
    // The answer width the stream's positions were measured at (0 while nothing is measured)
    let measured = 0;
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
      generation++;
      measured = 0;
      answer.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    };

    const countUp = (el: HTMLElement, to: number, digits: number) => {
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 500);
        el.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(digits);
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const finish = (secs: number, animate: boolean) => {
      meta.dataset.done = "";
      state.textContent = "complete";
      const values: [HTMLElement, number, number][] = [
        [nTok, WORDS.length, 0],
        [nTime, secs, 2],
        [nRate, secs ? WORDS.length / secs : 0, 1],
      ];
      values.forEach(([el, v, d]) => (animate ? countUp(el, v, d) : (el.textContent = v.toFixed(d))));
    };

    const showInstantly = () => {
      clear();
      delete document.documentElement.dataset.streamPending;
      delete answer.dataset.streaming;
      delete answer.dataset.edit;
      answer.style.removeProperty("min-height");
      words.forEach((w) => w.classList.remove("on", "fresh"));
      caret.className = "caret gone";
      hl.classList.add("swept");
      finish(0, false);
      state.textContent = "cached";
    };

    const stream = () => {
      clear();
      const id = generation;
      delete document.documentElement.dataset.streamPending;
      answer.dataset.streaming = "";
      delete answer.dataset.edit;
      answer.style.removeProperty("min-height");
      delete meta.dataset.done;
      state.textContent = "streaming";
      words.forEach((w) => w.classList.remove("on", "fresh"));
      hl.classList.remove("swept");
      caret.className = "caret idle";
      caret.style.transition = "none";

      // Positions depend on the real font, so nothing is measured until it has loaded
      (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (id !== generation) return;
        measured = answer.offsetWidth;
        // Hold the finished height, then take "in production" out for the first pass
        answer.style.minHeight = `${answer.getBoundingClientRect().height}px`;
        answer.dataset.edit = "";

        // Where the old in-flow caret sat beside a word, so the floating one lines up the same way
        const probe = document.createElement("span");
        probe.className = "caret";
        words[0].after(probe);
        const p = probe.getBoundingClientRect();
        const w0 = words[0].getBoundingClientRect();
        const dy = p.top - w0.top;
        const gap = p.left - w0.right;
        probe.remove();

        const layout = () => {
          const box = answer.getBoundingClientRect();
          return words.map((w) => {
            const r = w.getBoundingClientRect();
            return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top };
          });
        };
        let at = layout();

        const place = (x: number, y: number, ms = 0, ease = "cubic-bezier(0.25, 1, 0.5, 1)") => {
          caret.style.transition = ms ? `opacity 420ms ease, transform ${ms}ms ${ease}` : "opacity 420ms ease";
          caret.style.transform = `translate(${x}px, ${y}px)`;
        };
        let line = at[0].t;
        // The caret writes each word: it glides from the word's left edge to its right, and on a
        // new line it jumps to the line start first instead of sliding back across the text
        const write = (i: number) => {
          caret.classList.remove("idle");
          if (Math.abs(at[i].t - line) > 1) {
            place(at[i].l, at[i].t + dy);
            caret.getBoundingClientRect();
            line = at[i].t;
          }
          place(at[i].r + gap, at[i].t + dy, 110);
          flash(i);
        };
        const flash = (i: number) => {
          words[i].classList.add("on", "fresh");
          later(170, () => words[i].classList.remove("fresh"));
        };
        place(at[0].l, at[0].t + dy);

        const t0 = performance.now();
        let t = 450;
        FIRST_PASS.forEach((i) => {
          later(t, () => write(i));
          // A short beat after punctuation
          t += CADENCE[i] + (/[,:.]$/.test(WORDS[i].t) ? 170 : 0);
        });
        later(t, () => caret.classList.add("idle"));

        // The edit: the words part to make room (FLIP), the caret rides along with the last word,
        // and "in production" drops into the space
        t += 520;
        later(t, () => {
          const before = at;
          delete answer.dataset.edit;
          at = layout();
          words.forEach((w, i) => {
            if (i === IN || i === PRODUCTION) return;
            const dx = before[i].l - at[i].l;
            const dyy = before[i].t - at[i].t;
            if (Math.abs(dx) + Math.abs(dyy) > 0.5) w.animate([{ transform: `translate(${dx}px, ${dyy}px)` }, { transform: "none" }], PART);
          });
          place(at[LAST].r + gap, at[LAST].t + dy, PART.duration, PART.easing);
        });
        [IN, PRODUCTION].forEach((i, k) => {
          const start = t + DROP_AT[k];
          later(start, () => {
            words[i].classList.add("on");
            words[i].animate(DROP, { duration: DROP_MS, fill: "backwards" });
          });
          later(start + DROP_MS * IMPACT, () => flash(i));
        });
        // The sweep draws once "production" has settled
        const settled = t + DROP_AT[1] + DROP_MS;
        later(settled - 120, () => hl.classList.add("swept"));
        later(settled + 600, () => {
          // Only a finished stream counts; an interrupted one (or React's dev double-run) streams again
          streamedThisLoad = true;
          measured = 0;
          answer.style.removeProperty("min-height");
          finish((performance.now() - t0) / 1000, true);
        });
        later(settled + 2600, () => caret.classList.add("gone"));
      });
    };

    const replay = sessionStorage.getItem(REPLAY_KEY);
    sessionStorage.removeItem(REPLAY_KEY);
    if (reduce || (streamedThisLoad && !replay)) showInstantly();
    else stream();

    // Measured positions only hold for one layout, so a resize mid-stream lands the finished answer
    const ro = new ResizeObserver(() => {
      if (measured && answer.offsetWidth !== measured) showInstantly();
    });
    ro.observe(answer);

    const regenerate = () => (reduce ? showInstantly() : stream());
    addEventListener(REGENERATE_EVENT, regenerate);
    return () => {
      clear();
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener(REGENERATE_EVENT, regenerate);
    };
  }, []);

  const word = (i: number) => (
    <span key={i} className="tok" aria-hidden>
      {WORDS[i].t}
    </span>
  );
  const phrase = (from: number, to: number) => WORDS.slice(from, to).flatMap((_, n) => (n > 0 ? [" ", word(from + n)] : [word(from + n)]));

  return (
    <section className="hero" id="hero">
      <div className="wrap hero__grid">
        <div>
          <div className="ask">
            <span className="ask__bubble">
              <span className="ask__who">you</span>who is Het Patel?
            </span>
          </div>
          <h1 className="answer" ref={answerRef} aria-label={ANSWER}>
            {phrase(0, HOLD)}{" "}
            {/* The colon sits right after the sweep with no space, so it never starts a line */}
            <span className="hl" ref={hlRef}>
              {phrase(HOLD, IN)}
              <span className="ins">
                {" "}
                {phrase(IN, COLON)}
              </span>
            </span>
            {word(COLON)} {phrase(COLON + 1, WORDS.length)}
            <span className="caret" ref={caretRef} aria-hidden />
          </h1>
          <div className="meta mono" ref={metaRef} aria-hidden>
            <span>
              <i className="meta__dot" />
              <span data-state>complete</span>
            </span>
            <span className="stat">
              <b data-m="tok">0</b> tokens
            </span>
            <span className="stat">
              <b data-m="time">0.00</b> s
            </span>
            <span className="stat">
              <b data-m="rate">0.0</b> tok/s
            </span>
            <span className="stat">
              stop_reason <b>end_turn</b>
            </span>
          </div>
          <div className="ctas">
            <a className="btn btn--primary" href="#experience">
              Read the trace
              <ArrowDown />
            </a>
            <a className="btn" href="#contact">
              Start a conversation
            </a>
          </div>
        </div>

        <aside className="mcard" aria-label="Profile summary">
          <div className="mcard__head">
            <span className="mcard__name">het-patel · model card</span>
            <span className="pill">
              <i />
              serving · Boston
            </span>
          </div>
          <div className="mcard__plate">
            <video ref={videoRef} muted loop playsInline preload="auto" poster="/assets/poster.png" aria-label="Het's animated Memoji">
              <source src="/assets/EmojiMovie725310219.mov" type='video/quicktime; codecs="hvc1"' />
              <source src="/assets/Animoji-vp9-chrome.webm" type='video/webm; codecs="vp9"' />
            </video>
          </div>
          <dl className="kv">
            <div>
              <dt>role</dt>
              <dd>Team Lead, Innovation at FuzionX</dd>
            </div>
            <div>
              <dt>building</dt>
              <dd>Founders&apos; products, from idea to first pilot</dd>
            </div>
            <div>
              <dt>previously</dt>
              <dd>AI Software Engineer, DASH at Northeastern</dd>
            </div>
            <div>
              <dt>trained on</dt>
              <dd>
                M.S. Information Systems, Northeastern
                <br />
                B.E. Computer Engineering, GTU
              </dd>
            </div>
            <div>
              <dt>stack</dt>
              <dd>LangGraph · vLLM · RAG · Next.js · AWS</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
