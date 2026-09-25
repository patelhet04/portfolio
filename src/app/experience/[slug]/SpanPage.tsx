"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { careerSpans, formatDuration, formatMonth, getSpan, toDate } from "@/utils/experience";
import { getRecommendation } from "@/utils/recommendations";
import { portfolio } from "@/utils/portfolio";
import { axisRange, labelFits, pct, tickEdge } from "../../lib/timeline";
import { parseHighlights } from "../../components/Testimonials";
import { ArrowBack, ArrowOut } from "../../components/Icons";

const FALLBACK_NOW = toDate([2026, 9]);

export default function SpanPage({ slug, prevSlug, nextSlug }: { slug: string; prevSlug: string; nextSlug: string }) {
  const span = getSpan(slug)!;
  const prev = getSpan(prevSlug)!;
  const next = getSpan(nextSlug)!;
  const [now, setNow] = useState(FALLBACK_NOW);
  const [measured, setMeasured] = useState(false);
  const measRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  // Arriving from the prev/next pager, the page slide is the entrance and the section stagger is skipped
  const [arrive] = useState(() => (typeof document !== "undefined" && document.documentElement.dataset.vtDir ? "pager" : "direct"));
  const [trackPx, setTrackPx] = useState<number | null>(null);
  useEffect(() => setNow(new Date()), []);

  // The trace re-selects this span when the visitor goes back to it
  useEffect(() => sessionStorage.setItem("trace-selected", slug), [slug]);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setTrackPx(e.contentRect.width));
    ro.observe(trackRef.current!);
    return () => ro.disconnect();
  }, []);

  // Before/after bars collapse to their new value once they're on screen
  useEffect(() => {
    if (!measRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMeasured(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(measRef.current);
    return () => io.disconnect();
  }, []);

  const [t0, t1] = axisRange(now);
  const start = toDate(span.start);
  const end = span.end ? toDate(span.end) : now;
  const left = pct(start, t0, t1);
  const width = Math.max(pct(end, t0, t1) - left, 0.9);
  const duration = formatDuration(start, end);
  const showLabel = trackPx === null ? width > 6 : labelFits(duration, (width / 100) * trackPx, { fontPx: 12, padding: 28 });
  const rec = getRecommendation(span.recommendationId);
  const related = portfolio.filter((p) => span.relatedOutputIds?.includes(p.id));
  const comparisons = span.measurements?.filter((m) => m.from && m.ratio) ?? [];
  const values = span.measurements?.filter((m) => !m.from) ?? [];
  const years: number[] = [];
  for (let y = t0.getFullYear(); y <= t1.getFullYear(); y += 2) years.push(y);

  // Prev/next move along the time axis: the page slides in that direction. If this bar is on screen,
  // it takes the neighbour's transition name so it glides to the neighbour's position; scrolled out of
  // view it would fly in from off-screen, so then the slide alone carries the move.
  const travel = (dir: "prev" | "next", to: string) => {
    const root = document.documentElement;
    root.dataset.vtDir = dir;
    const bar = barRef.current?.getBoundingClientRect();
    if (bar && bar.top >= 0 && bar.bottom <= innerHeight) barRef.current!.style.setProperty("view-transition-name", `span-${to}`);
    else barRef.current?.style.setProperty("view-transition-name", "none");
    window.setTimeout(() => delete root.dataset.vtDir, 900);
  };

  let d = 0;
  const stagger = () => ({ "--d": d++ }) as React.CSSProperties;

  return (
    <article className="sd" data-arrive={arrive}>
      <div className="wrap">
        <div className="sd__back sd-in" style={stagger()}>
          <Link className="btn btn--sm" href="/#experience">
            <ArrowBack />
            Back to the trace
          </Link>
        </div>
        <p className="sd__kind mono sd-in" style={stagger()}>
          {span.kind === "work" ? "work" : "education"} · {span.where}
        </p>
        <h1 className="sd__title">
          {span.name}
        </h1>
        <p className="sd__role sd-in" style={stagger()}>
          {span.role}
        </p>

        <div className="sd__track" ref={trackRef} aria-hidden>
          {careerSpans
            .filter((s) => s.slug !== span.slug)
            .map((s) => {
              const a = pct(toDate(s.start), t0, t1);
              const b = pct(s.end ? toDate(s.end) : now, t0, t1);
              return <span key={s.slug} className="ghost" style={{ left: `${a}%`, width: `${Math.max(b - a, 0.6)}%` }} />;
            })}
          <span
            ref={barRef}
            className={`span ${span.kind === "education" ? "edu" : ""} ${span.end ? "" : "live"}`}
            style={{ left: `${left}%`, width: `${width}%`, viewTransitionName: `span-${span.slug}` } as React.CSSProperties}
          >
            {showLabel && <span className="mono">{duration}</span>}
          </span>
        </div>
        <div className="sd__ticks mono" aria-hidden>
          {years.map((y) => (
            <span key={y} data-edge={tickEdge(pct(toDate([y, 1]), t0, t1))} style={{ left: `${pct(toDate([y, 1]), t0, t1)}%` }}>
              {y}
            </span>
          ))}
        </div>

        <div className="sd__grid">
          <div>
            <p className="sd__summary sd-in" style={stagger()}>
              {span.summary}
            </p>

            {comparisons.length > 0 && (
              <section className="sd-in" style={stagger()}>
                <h2>Measured</h2>
                <ul className="meas" ref={measRef} data-on={measured}>
                  {comparisons.map((m, i) => (
                    <li key={m.label} style={{ "--i": i, "--ratio": Math.max(m.ratio!, 0.012) } as React.CSSProperties}>
                      <div className="meas__row">
                        <span>{m.label}</span>
                        <span className="mono">
                          <s className="muted">{m.from}</s> → <b>{m.to}</b>
                        </span>
                      </div>
                      <div className="meas__bar">
                        <i />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {values.length > 0 && (
              <dl className="vals sd-in" style={stagger()}>
                {values.map((m) => (
                  <div key={m.label}>
                    <dt>{m.to}</dt>
                    <dd>{m.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            <section className="sd-in" style={stagger()}>
              <h2>Inside this span</h2>
              <ul className="sd__events">
                {span.events.map((e, i) => (
                  <li key={e}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    {e}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside>
            <dl className="sd__attrs mono sd-in" style={stagger()}>
              <div>
                <dt>start</dt>
                <dd>{formatMonth(start)}</dd>
              </div>
              <div>
                <dt>end</dt>
                <dd>{span.end ? formatMonth(end) : "present"}</dd>
              </div>
              <div>
                <dt>duration</dt>
                <dd>{formatDuration(start, end)}</dd>
              </div>
              <div>
                <dt>where</dt>
                <dd>{span.where}</dd>
              </div>
            </dl>

            {span.stack.length > 0 && (
              <section className="sd__group sd-in" style={stagger()}>
                <h2>Stack</h2>
                <div className="chips">
                  {span.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {rec && (
              <section className="sd__group sd-in" style={stagger()}>
                <h2>Human feedback</h2>
                <blockquote className="sd__quote">
                  &ldquo;
                  {parseHighlights(rec.content).map((run, i) => (run.marked ? <mark key={i}>{run.words.join("")}</mark> : <span key={i}>{run.words.join("")}</span>))}
                  &rdquo;
                  <footer>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rec.avatar} alt="" width={36} height={36} />
                    <span>
                      <strong>{rec.name}</strong>
                      <span className="muted">{rec.title}</span>
                    </span>
                  </footer>
                </blockquote>
              </section>
            )}

            {related.length > 0 && (
              <section className="sd__related sd-in" style={stagger()}>
                <h2>Related writing</h2>
                {related.map((p) => (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.image && <img src={p.image} alt="" width={72} height={52} />}
                    <span style={{ flex: 1 }}>{p.title}</span>
                    <ArrowOut className="" />
                  </a>
                ))}
              </section>
            )}
          </aside>
        </div>

        <nav className="sd__pager" aria-label="Other spans">
          <Link href={`/experience/${prev.slug}`} onClick={() => travel("prev", prev.slug)}>
            <span className="mono">← previous span</span>
            <strong>{prev.short}</strong>
          </Link>
          <Link href={`/experience/${next.slug}`} onClick={() => travel("next", next.slug)}>
            <span className="mono">next span →</span>
            <strong>{next.short}</strong>
          </Link>
        </nav>
      </div>
    </article>
  );
}
