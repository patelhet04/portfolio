"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { recommendationsData } from "@/utils/recommendations";
import { revealWords } from "../lib/stream";
import RevealText from "./RevealText";
import { front, useScrub } from "../lib/scrub";

/** Splits "[highlighted] text" into marked and plain runs of words. */
export function parseHighlights(content: string) {
  return content.split(/(\[[^\]]+\])/).filter(Boolean).map((chunk) => ({
    marked: chunk.startsWith("["),
    words: (chunk.startsWith("[") ? chunk.slice(1, -1) : chunk).split(/(\s+)/),
  }));
}

export default function Testimonials() {
  const [index, setIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);
  // The first quote's highlights follow the scroll until they're complete or another tab is chosen
  const scrubbing = useRef(true);
  const shown = index ?? 0;

  // Stream the first quote when the section scrolls into view
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIndex((i) => i ?? 0);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(panelRef.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (index === null) return;
    const quote = quoteRef.current!;
    const words = Array.from(quote.querySelectorAll<HTMLElement>(".w"));
    const marks = Array.from(quote.querySelectorAll<HTMLElement>("mark"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      marks.forEach((m) => m.classList.add("swept"));
      return;
    }
    const step = first.current ? 16 : 9;
    const scrubbed = first.current && scrubbing.current;
    first.current = false;
    if (!scrubbed) scrubbing.current = false;
    quote.dataset.streaming = "";
    if (scrubbed) quote.dataset.scrub = "";
    // While scrubbing, each burst lets the highlights catch up to the words that have arrived
    const { timers, end } = revealWords(words, { step, onBurst: scrubbed ? () => dispatchEvent(new Event("scroll")) : undefined });
    if (!scrubbed) timers.push(window.setTimeout(() => marks.forEach((m, k) => timers.push(window.setTimeout(() => m.classList.add("swept"), k * 180))), end + 120));
    timers.push(window.setTimeout(() => delete quote.dataset.streaming, end + 600));
    return () => timers.forEach(clearTimeout);
  }, [index]);

  // Scrolling through the panel sweeps the highlighter over each marked phrase in turn
  useScrub(
    panelRef,
    (p, panel) => {
      const quote = panel.querySelector<HTMLElement>(".quote[data-scrub]");
      if (!scrubbing.current || !quote) return;
      const marks = quote.querySelectorAll<HTMLElement>("mark");
      // A highlight never runs ahead of its words: it covers at most the share that has streamed in
      const arrived = (m: HTMLElement) => (quote.hasAttribute("data-streaming") ? m.querySelectorAll(".w.on").length / m.querySelectorAll(".w").length : 1);
      marks.forEach((m, i) => m.style.setProperty("--m", String(Math.min(front(p, i, marks.length, 1), arrived(m)))));
      if (p >= 1) {
        scrubbing.current = false;
        marks.forEach((m) => m.classList.add("swept"));
        delete quote.dataset.scrub;
      }
    },
    { from: 0.8, to: 0.35, withHeight: 0.3 },
  );

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = recommendationsData.length;
    const to = ["ArrowDown", "ArrowRight"].includes(e.key) ? i + 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? i - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const next = (to + n) % n;
    tabs.current[next]?.focus();
    setIndex(next);
  };

  const rec = recommendationsData[shown];
  return (
    <section className="block" id="feedback">
      <div className="wrap">
        <div className="head">
          <RevealText className="h2" runs={["Human feedback."]} />
          <p className="lede">From the people who managed me and built alongside me.</p>
        </div>
        <div className="fb">
          <div className="fb__list" role="tablist" aria-label="Testimonials">
            {recommendationsData.map((r, i) => (
              <button
                key={r.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`fb-${r.id}`}
                className="fb__tab"
                type="button"
                role="tab"
                aria-selected={shown === i}
                aria-controls="fb-panel"
                tabIndex={shown === i ? 0 : -1}
                onClick={(e) => {
                  setIndex(i);
                  // On phones the tabs scroll sideways; bring a partly hidden tab fully into view
                  e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.avatar} alt="" width={44} height={44} loading="lazy" />
                <span>
                  <strong>{r.name}</strong>
                  <small>{r.title}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="fb__panel" id="fb-panel" role="tabpanel" aria-labelledby={`fb-${rec.id}`} ref={panelRef}>
            <blockquote className="quote" ref={quoteRef} key={shown} data-streaming={index === null ? "" : undefined}>
              {/* The quote marks stream too: the closing one arrives with the last word */}
              <span className="w">&ldquo;</span>
              {parseHighlights(rec.content).map((run, i) => {
                const words = run.words.map((w, j) => (/^\s+$/.test(w) || !w ? <Fragment key={j}>{w}</Fragment> : <span key={j} className="w">{w}</span>));
                return run.marked ? <mark key={i}>{words}</mark> : <Fragment key={i}>{words}</Fragment>;
              })}
              <span className="w">&rdquo;</span>
            </blockquote>
            <div className="by">
              <strong>{rec.name}</strong>
              <span className="muted">
                {rec.title} · {rec.company}
              </span>
              <span className="mono muted">
                {rec.date} · {rec.relationship}
              </span>
            </div>
            {rec.nickname && (
              <div className="note">
                <span className="mono muted">note</span>
                {rec.nickname}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
