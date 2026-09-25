"use client";
import { useEffect, useRef } from "react";
import { ArrowDown } from "./Icons";

const ANSWER_BEFORE = "I build AI systems that ";
const ANSWER_HIGHLIGHT = "hold up in production";
const ANSWER_AFTER = ": agents, retrieval, and the GPUs underneath.";
const ANSWER = ANSWER_BEFORE + ANSWER_HIGHLIGHT + ANSWER_AFTER;

const tokens = (text: string) => text.match(/\S+\s*/g) ?? [];

/** Replays the hero stream; the footer's Regenerate button dispatches this. */
export const REGENERATE_EVENT = "hero:regenerate";

export default function Hero() {
  const answerRef = useRef<HTMLHeadingElement>(null);
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

  useEffect(() => {
    const answer = answerRef.current!;
    const meta = metaRef.current!;
    const toks = Array.from(answer.querySelectorAll<HTMLSpanElement>(".tok"));
    const hl = answer.querySelector<HTMLSpanElement>(".hl")!;
    const caret = answer.querySelector<HTMLSpanElement>(".caret")!;
    const state = meta.querySelector<HTMLSpanElement>("[data-state]")!;
    const [nTok, nTime, nRate] = ["tok", "time", "rate"].map((k) => meta.querySelector<HTMLElement>(`[data-m="${k}"]`)!);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let raf = 0;

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
        [nTok, toks.length, 0],
        [nTime, secs, 2],
        [nRate, secs ? toks.length / secs : 0, 1],
      ];
      values.forEach(([el, v, d]) => (animate ? countUp(el, v, d) : (el.textContent = v.toFixed(d))));
    };

    const showInstantly = () => {
      delete document.documentElement.dataset.streamPending;
      delete answer.dataset.streaming;
      hl.classList.add("swept");
      caret.classList.add("gone");
      finish(0, false);
      state.textContent = "cached";
    };

    const stream = () => {
      timers.forEach(clearTimeout);
      delete document.documentElement.dataset.streamPending;
      answer.dataset.streaming = "";
      delete meta.dataset.done;
      state.textContent = "streaming";
      toks.forEach((t) => t.classList.remove("on", "fresh"));
      hl.classList.remove("swept");
      caret.className = "caret";
      toks[0].before(caret);
      let i = 0;
      const t0 = performance.now();
      const next = () => {
        const t = toks[i];
        t.classList.add("on", "fresh");
        t.after(caret);
        timers.push(window.setTimeout(() => t.classList.remove("fresh"), 160));
        i++;
        if (i < toks.length) {
          const pause = /[,:.]\s*$/.test(t.textContent ?? "") ? 140 : 0;
          timers.push(window.setTimeout(next, 55 + Math.random() * 70 + pause));
        } else {
          finish((performance.now() - t0) / 1000, true);
          sessionStorage.setItem("hero-streamed", "1");
          timers.push(window.setTimeout(() => hl.classList.add("swept"), 150));
          caret.classList.add("idle");
          timers.push(window.setTimeout(() => caret.classList.add("gone"), 2600));
        }
      };
      timers.push(window.setTimeout(next, 450));
    };

    // Stream once per visit. Coming back from a detail page shows the cached answer.
    if (reduce || sessionStorage.getItem("hero-streamed")) showInstantly();
    else stream();

    const regenerate = () => (reduce ? showInstantly() : stream());
    addEventListener(REGENERATE_EVENT, regenerate);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      removeEventListener(REGENERATE_EVENT, regenerate);
    };
  }, []);

  const renderTokens = (text: string, offset: number) =>
    tokens(text).map((t, i) => (
      <span key={offset + i} className="tok" aria-hidden>
        {t}
      </span>
    ));

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
            <span className="caret" aria-hidden />
            {renderTokens(ANSWER_BEFORE, 0)}
            <span className="hl">{renderTokens(ANSWER_HIGHLIGHT, 100)}</span>
            {renderTokens(ANSWER_AFTER, 200)}
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
