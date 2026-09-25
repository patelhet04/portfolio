"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { outputTags, portfolio, type OutputTag } from "@/utils/portfolio";
import { ArrowDown, ArrowOut } from "./Icons";

type Filter = OutputTag | "all";

/** On phones the list shows this many rows at a time (CSS applies the limit only below 640px). */
const PAGE = 6;

export default function Outputs() {
  const [filter, setFilter] = useState<Filter>("all");
  const [swap, setSwap] = useState(0);
  const [limit, setLimit] = useState(PAGE);
  const filtersRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const peekImgRef = useRef<HTMLImageElement>(null);
  const items = portfolio.filter((p) => filter === "all" || p.tag === filter);
  const count = (t: Filter) => (t === "all" ? portfolio.length : portfolio.filter((p) => p.tag === t).length);

  // Clip the duplicated "active" row down to the selected pill; clip-path springs between pills
  const placeIndicator = (instant: boolean) => {
    const base = filtersRef.current?.querySelector<HTMLButtonElement>(`:scope > .filters__row [data-k="${filter}"]`);
    const active = activeRef.current;
    if (!base || !active) return;
    const w = active.offsetWidth;
    const left = base.offsetLeft - 4;
    const right = w - (left + base.offsetWidth);
    if (instant) active.style.transition = "none";
    active.style.clipPath = `inset(0 ${right}px 0 ${left}px round 999px)`;
    if (instant) {
      void active.offsetWidth;
      active.style.transition = "";
    }
  };
  useLayoutEffect(() => placeIndicator(swap === 0));
  useEffect(() => {
    document.fonts?.ready.then(() => placeIndicator(true));
    const onResize = () => placeIndicator(true);
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preview that trails the cursor on a spring-like lerp (fine pointers only)
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = document.getElementById("outputs-list")!;
    const peek = peekRef.current!;
    const img = peekImgRef.current!;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      raf = 0,
      on = false;
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      const tilt = Math.max(-6, Math.min(6, (tx - x) * 0.05));
      peek.style.transform = `translate(${x + 24}px, ${y - 90}px) rotate(${tilt}deg)`;
      raf = on || Math.abs(tx - x) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-img]");
      if (a) {
        if (!on) {
          x = tx;
          y = ty;
        }
        if (img.getAttribute("src") !== a.dataset.img) img.src = a.dataset.img!;
        on = true;
        peek.dataset.on = "true";
      } else {
        on = false;
        peek.dataset.on = "false";
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      on = false;
      peek.dataset.on = "false";
    };
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const choose = (t: Filter) => {
    if (t === filter) return;
    setFilter(t);
    setSwap((s) => s + 1);
    setLimit(PAGE);
  };

  const pills = (interactive: boolean) => (
    <div className="filters__row">
      {outputTags.map(({ tag, label }) => (
        <button
          key={tag}
          type="button"
          data-k={tag}
          tabIndex={interactive ? 0 : -1}
          aria-pressed={interactive ? filter === tag : undefined}
          onClick={interactive ? () => choose(tag) : undefined}
        >
          {label}
          <span className="n">{count(tag)}</span>
        </button>
      ))}
    </div>
  );

  return (
    <section className="block" id="work">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Outputs.</h2>
          <p className="lede">Articles, projects, posts and write-ups, from benchmarking LLM runtimes to shipping full-stack products.</p>
        </div>
        <div className="filters" ref={filtersRef} role="group" aria-label="Filter by type">
          {pills(true)}
          <div className="filters__active" ref={activeRef} aria-hidden>
            {pills(false)}
          </div>
        </div>
        <ul className="list" id="outputs-list" key={swap} data-swap={swap ? "" : undefined}>
          {items.map((p, i) => (
            <li
              key={p.id}
              className="item"
              data-extra={i >= limit ? "" : undefined}
              data-new={i >= limit - PAGE && limit > PAGE ? "" : undefined}
              style={{ "--i": i, "--j": i - (limit - PAGE) } as React.CSSProperties}
            >
              <a href={p.link} target="_blank" rel="noopener noreferrer" data-img={p.image}>
                <span className="type mono">{p.tag}</span>
                <span className="t">{p.title}</span>
                <span className="d">{p.description}</span>
                <ArrowOut className="" />
              </a>
            </li>
          ))}
        </ul>
        {items.length > limit && (
          <div className="more">
            <span className="mono muted" aria-live="polite">
              showing {limit} of {items.length}
            </span>
            <button className="btn btn--sm" type="button" onClick={() => setLimit((l) => l + PAGE)}>
              Show more
              <ArrowDown />
            </button>
          </div>
        )}
      </div>
      <div className="peek" ref={peekRef} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={peekImgRef} alt="" />
      </div>
    </section>
  );
}
