"use client";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import {
  careerSpans,
  formatDuration,
  formatMonth,
  orderedSpans,
  spanGroups,
  toDate,
  vocabulary,
  type CareerSpan,
} from "@/utils/experience";
import { ArrowOut } from "./Icons";
import { axisRange, labelFits, pct, tickEdge } from "../lib/timeline";
import { front, useScrub } from "../lib/scrub";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;


/** Rendered before the visitor's clock is known, so static HTML matches hydration. */
const FALLBACK_NOW = toDate([2026, 9]);

export default function Trace() {
  const [now, setNow] = useState(FALLBACK_NOW);
  const [selected, setSelected] = useState("fuzionx");
  // Remounts the detail pane on each change; only pointer changes animate, keyboard changes swap instantly
  const [swap, setSwap] = useState({ key: 0, animate: false });
  // "false" hides the bars, "true" draws them in, "instant" shows them with no animation
  const [drawn, setDrawn] = useState<"false" | "true" | "instant">("false");
  const [litToken, setLitToken] = useState<string | null>(null);
  // The scrub line moves via its ref on every pointer move; state only changes when the month or hits do
  // `future` dims spans the scroll playhead hasn't reached yet
  const [scrub, setScrub] = useState<{ label: string; flip: boolean; hits: string[]; future: string[] } | null>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const scrubKey = useRef("");
  const pointerScrub = useRef(false);
  const tokensRef = useRef<HTMLDivElement>(null);
  // Track width in px, so duration labels only render in bars wide enough to hold them
  const [trackPx, setTrackPx] = useState<number | null>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const wfRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => setNow(new Date()), []);

  useEffect(() => {
    const track = wfRef.current!.querySelector(".wf__track")!;
    const ro = new ResizeObserver(([e]) => setTrackPx(e.contentRect.width));
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // Draw the spans in the first time the trace scrolls into view. Once drawn in
  // a visit, they come back already drawn so a returning page morph lands on them.
  useIsoLayoutEffect(() => {
    if (sessionStorage.getItem("trace-drawn")) setDrawn("instant");
    // Coming back from a span page, keep that span selected so its bar morphs back into its row
    const last = sessionStorage.getItem("trace-selected");
    if (last && careerSpans.some((s) => s.slug === last)) setSelected(last);
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("trace-drawn")) return;
    const el = traceRef.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn("true");
          sessionStorage.setItem("trace-drawn", "1");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [t0, t1] = axisRange(now);
  const years: number[] = [];
  for (let y = t0.getFullYear(); y <= t1.getFullYear(); y++) years.push(y);

  const span = careerSpans.find((s) => s.slug === selected)!;
  const select = (slug: string, animate = true) => {
    if (slug === selected) return;
    setSelected(slug);
    setSwap((w) => ({ key: w.key + 1, animate }));
  };

  // When the trace is stacked, the detail pane sits below all the rows. After a tap,
  // scroll it into view if it's mostly off-screen so the selection visibly does something.
  const revealDetail = () => {
    const detail = detailRef.current!;
    if (detail.getBoundingClientRect().top < wfRef.current!.getBoundingClientRect().bottom - 1) return;
    requestAnimationFrame(() => {
      if (detail.getBoundingClientRect().top < innerHeight * 0.6) return;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      detail.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
    });
  };

  const onRowKey = (e: React.KeyboardEvent, i: number) => {
    const to = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const next = orderedSpans[(to + orderedSpans.length) % orderedSpans.length];
    rowRefs.current[next.slug]?.focus();
    select(next.slug, false);
  };

  // Moves the scrub line to x (px into the track) and updates its label and the spans it touches
  const placeScrub = (x: number, playhead: boolean) => {
    const track = wfRef.current!.querySelector(".wf__track")!.getBoundingClientRect();
    const box = wfRef.current!.getBoundingClientRect();
    const d = new Date(t0.getTime() + (x / track.width) * (t1.getTime() - t0.getTime()));
    scrubRef.current!.style.transform = `translateX(${track.left - box.left + x}px)`;
    const next = {
      label: playhead && d >= now ? "now" : d > now ? "not yet" : formatMonth(d),
      flip: x > track.width - 90,
      hits: careerSpans.filter((s) => d >= toDate(s.start) && d <= (s.end ? toDate(s.end) : now)).map((s) => s.slug),
      future: playhead ? careerSpans.filter((s) => toDate(s.start) > d).map((s) => s.slug) : [],
    };
    const key = `${next.label}|${next.flip}|${next.hits.join()}|${next.future.join()}`;
    if (key !== scrubKey.current) {
      scrubKey.current = key;
      setScrub(next);
    }
  };
  const clearScrub = () => {
    scrubKey.current = "";
    setScrub(null);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const track = wfRef.current!.querySelector(".wf__track")!.getBoundingClientRect();
    const x = e.clientX - track.left;
    pointerScrub.current = x >= 0 && x <= track.width;
    if (!pointerScrub.current) return scrollScrub.current();
    placeScrub(x, false);
  };
  const onPointerLeave = () => {
    pointerScrub.current = false;
    scrollScrub.current();
  };

  // Scroll is the playhead: while the trace crosses the screen, the scrub line sweeps from the
  // start of the axis to today, dimming spans it hasn't reached. A mouse hovering the waterfall
  // takes over; this is also the only scrub on touch screens.
  const scrollScrub = useRef<() => void>(() => {});
  scrollScrub.current = () => {
    if (pointerScrub.current) return;
    const r = traceRef.current!.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.9 - r.top) / (innerHeight * 0.35 + r.height)));
    if (p <= 0) return clearScrub();
    const width = wfRef.current!.querySelector(".wf__track")!.getBoundingClientRect().width;
    placeScrub(p * (pct(now, t0, t1) / 100) * width, true);
  };
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          scrollScrub.current();
        });
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        addEventListener("scroll", onScroll, { passive: true });
        addEventListener("resize", onScroll);
        onScroll();
      } else {
        removeEventListener("scroll", onScroll);
        removeEventListener("resize", onScroll);
      }
    });
    io.observe(traceRef.current!);
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The tokenizer pass: as the stack scrolls through the reading zone, the token colours fill in
  // one after another, like watching a tokenizer run, and drain again on the way back up
  useScrub(
    tokensRef,
    (p, el) => {
      const buttons = el.querySelectorAll<HTMLElement>("button");
      buttons.forEach((b, i) => b.style.setProperty("--r", String(front(p, i, buttons.length, 8))));
    },
    { from: 0.95, to: 0.6, withHeight: 0.4 },
  );

  const tokenUse = (token: string) => careerSpans.filter((s) => s.stack.includes(token)).map((s) => s.slug);
  const lit = litToken ? tokenUse(litToken) : null;

  let rowIndex = -1;
  return (
    <>
      <div className="trace" ref={traceRef} data-drawn={drawn}>
        <div className="trace__bar mono">
          <span>
            trace_id <b>het-2016-now</b>
          </span>
          <span>
            <b>{careerSpans.length}</b> spans
          </span>
          <span>
            duration <b>{formatDuration(toDate(careerSpans.at(-1)!.start), now)}</b>
          </span>
          <span>
            status <b>running</b>
          </span>
        </div>
        <div className="trace__body">
          <div className="wf" ref={wfRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
            <div className="wf__axis" aria-hidden>
              <div className="lbl mono">span</div>
              <div className="ticks mono">
                {years.map((y) => (
                  <span key={y} data-edge={tickEdge(pct(toDate([y, 1]), t0, t1))} style={{ left: `${pct(toDate([y, 1]), t0, t1)}%` }}>
                    &apos;{String(y).slice(2)}
                  </span>
                ))}
              </div>
            </div>
            <div className="wf__rows" role="listbox" aria-label="Career spans">
              {spanGroups.map((g) => (
                <Fragment key={g.kind}>
                  <div className="wf__group mono" role="presentation">
                    <span>
                      <i className={g.kind === "education" ? "edu" : ""} />
                      {g.label}
                    </span>
                  </div>
                  {careerSpans
                    .filter((s) => s.kind === g.kind)
                    .map((s) => {
                      rowIndex++;
                      const i = rowIndex;
                      const start = toDate(s.start);
                      const end = s.end ? toDate(s.end) : now;
                      const left = pct(start, t0, t1);
                      const width = Math.max(pct(end, t0, t1) - left, 0.9);
                      const duration = formatDuration(start, end);
                      const showLabel = trackPx === null ? width > 5 : labelFits(duration, (width / 100) * trackPx);
                      const cls = [
                        "wf__row",
                        lit && !lit.includes(s.slug) ? "dim" : "",
                        scrub?.hits.includes(s.slug) ? "hit" : "",
                        scrub?.future.includes(s.slug) ? "future" : "",
                      ].join(" ");
                      return (
                        <button
                          key={s.slug}
                          ref={(el) => {
                            rowRefs.current[s.slug] = el;
                          }}
                          type="button"
                          role="option"
                          aria-selected={selected === s.slug}
                          tabIndex={selected === s.slug ? 0 : -1}
                          className={cls}
                          onClick={() => {
                            select(s.slug);
                            revealDetail();
                          }}
                          onKeyDown={(e) => onRowKey(e, i)}
                        >
                          <span className="wf__name">
                            <strong>{s.short}</strong>
                            <small>{s.sub}</small>
                          </span>
                          <span className="wf__track">
                            <span
                              className={`span ${s.kind === "education" ? "edu" : ""} ${s.end ? "" : "live"}`}
                              style={
                                {
                                  left: `${left}%`,
                                  width: `${width}%`,
                                  "--i": i,
                                  viewTransitionName: `span-${s.slug}`,
                                } as React.CSSProperties
                              }
                            >
                              {showLabel && <span className="mono">{duration}</span>}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                </Fragment>
              ))}
            </div>
            <div className="scrub mono" ref={scrubRef} data-on={!!scrub} data-flip={scrub?.flip} aria-hidden>
              <span>{scrub?.label}</span>
            </div>
          </div>

          <div className="detail" ref={detailRef} aria-live="polite">
            <SpanSummary key={swap.key} span={span} now={now} animate={swap.animate} />
          </div>
        </div>
      </div>

      <div className="vocab">
        <h3>
          The stack, tokenized<small>Hover a token to see where it was used.</small>
        </h3>
        <div className="tokens" ref={tokensRef}>
          {vocabulary.map((g) => (
            <p key={g.group} style={{ margin: 0 }}>
              <span className="muted">{g.group.toLowerCase().replace(/ /g, "_")}: </span>
              {g.tokens.map((t) => {
                const used = tokenUse(t);
                const on = () => used.length > 0 && setLitToken(t);
                const off = () => setLitToken(null);
                return (
                  <Fragment key={t}>
                    <button
                      type="button"
                      // Tokens no span used have nothing to show, so they stay out of the tab order
                      tabIndex={used.length ? undefined : -1}
                      aria-disabled={used.length ? undefined : true}
                      data-used={used.length ? "" : undefined}
                      data-active={litToken === t && used.length > 0 ? "true" : undefined}
                      title={used.length ? `Used at ${used.map((u) => careerSpans.find((s) => s.slug === u)!.short).join(", ")}` : undefined}
                      onMouseEnter={on}
                      onMouseLeave={off}
                      onFocus={on}
                      onBlur={off}
                      onClick={() => used.length && select(used[0])}
                    >
                      {t}
                    </button>{" "}
                  </Fragment>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

function SpanSummary({ span, now, animate }: { span: CareerSpan; now: Date; animate: boolean }) {
  const start = toDate(span.start);
  const end = span.end ? toDate(span.end) : now;
  return (
    <div className="detail__inner" data-swap={animate ? "" : undefined}>
      <h3>{span.name}</h3>
      <p className="role">{span.role}</p>
      <dl className="attrs mono">
        <dt>start</dt>
        <dd>{formatMonth(start)}</dd>
        <dt>end</dt>
        <dd>{span.end ? formatMonth(end) : "present"}</dd>
        <dt>duration</dt>
        <dd>{formatDuration(start, end)}</dd>
      </dl>
      <p className="sum">{span.summary}</p>
      {span.measurements?.some((m) => m.from) ? (
        <ul className="events">
          {span.measurements
            .filter((m) => m.from)
            .slice(0, 3)
            .map((m) => (
              <li key={m.label}>
                <span className="mono muted">{m.from} → </span>
                <b style={{ fontWeight: 500 }}>{m.to}</b> <span className="muted">{m.label.toLowerCase()}</span>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="events">
          {span.events.slice(0, 3).map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      {span.stack.length > 0 && (
        <div className="chips">
          {span.stack.slice(0, 10).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      )}
      <div className="detail__open">
        <Link className="btn btn--sm" href={`/experience/${span.slug}`}>
          Open the full span
          <ArrowOut />
        </Link>
      </div>
    </div>
  );
}
