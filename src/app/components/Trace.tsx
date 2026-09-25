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

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Rendered before the visitor's clock is known, so static HTML matches hydration. */
const FALLBACK_NOW = toDate([2026, 9]);

export default function Trace() {
  const [now, setNow] = useState(FALLBACK_NOW);
  const [selected, setSelected] = useState("fuzionx");
  const [swapKey, setSwapKey] = useState(0);
  // "false" hides the bars, "true" draws them in, "instant" shows them with no animation
  const [drawn, setDrawn] = useState<"false" | "true" | "instant">("false");
  const [litToken, setLitToken] = useState<string | null>(null);
  const [scrub, setScrub] = useState<{ x: number; label: string; flip: boolean; hits: string[] } | null>(null);
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
  const select = (slug: string) => {
    if (slug === selected) return;
    setSelected(slug);
    setSwapKey((k) => k + 1);
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
    select(next.slug);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const track = wfRef.current!.querySelector(".wf__track")!.getBoundingClientRect();
    const box = wfRef.current!.getBoundingClientRect();
    const x = e.clientX - track.left;
    if (x < 0 || x > track.width) return setScrub(null);
    const d = new Date(t0.getTime() + (x / track.width) * (t1.getTime() - t0.getTime()));
    setScrub({
      x: e.clientX - box.left,
      label: d > now ? "not yet" : formatMonth(d),
      flip: x > track.width - 90,
      hits: careerSpans.filter((s) => d >= toDate(s.start) && d <= (s.end ? toDate(s.end) : now)).map((s) => s.slug),
    });
  };

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
          <div className="wf" ref={wfRef} onPointerMove={onPointerMove} onPointerLeave={() => setScrub(null)}>
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
                      const cls = ["wf__row", lit && !lit.includes(s.slug) ? "dim" : "", scrub?.hits.includes(s.slug) ? "hit" : ""].join(" ");
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
            <div className="scrub mono" data-on={!!scrub} data-flip={scrub?.flip} style={{ transform: `translateX(${scrub?.x ?? 0}px)` }} aria-hidden>
              <span>{scrub?.label}</span>
            </div>
          </div>

          <div className="detail" ref={detailRef} aria-live="polite">
            <SpanSummary key={swapKey} span={span} now={now} animate={swapKey > 0} />
          </div>
        </div>
      </div>

      <div className="vocab">
        <h3>
          The stack, tokenized<small>Hover a token to see where it was used.</small>
        </h3>
        <div className="tokens">
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
      <h3 style={{ viewTransitionName: `title-${span.slug}`, viewTransitionClass: "title-morph" } as React.CSSProperties}>{span.name}</h3>
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
