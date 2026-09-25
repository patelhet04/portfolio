"use client";
import { Fragment, useRef, type CSSProperties } from "react";
import { front, useScrub } from "../lib/scrub";

/** A run of text; `strong` runs keep their emphasis. */
export type Run = string | { strong: string };

/**
 * Text that fills in word by word as it scrolls through the reading zone, from faint to full ink,
 * and fades back if the visitor scrolls up. The text is always in the DOM and readable by
 * assistive tech; only the ink level moves.
 */
export default function RevealText({
  as: Tag = "h2",
  runs,
  className,
  style,
  range,
}: {
  as?: "h2" | "p";
  runs: Run[];
  className?: string;
  style?: CSSProperties;
  range?: { from?: number; to?: number; withHeight?: number };
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  useScrub(
    ref,
    (p, el) => {
      const words = el.querySelectorAll<HTMLElement>(".rw");
      words.forEach((w, i) => w.style.setProperty("--r", String(front(p, i, words.length))));
    },
    range,
  );
  // Keeps the source spacing, so punctuation after an emphasised run ("Het,") stays attached
  const tokens = (text: string) => text.split(/(\s+)/).filter(Boolean);
  return (
    <Tag ref={ref} className={className} style={style} data-reveal="">
      {runs.map((run, r) => {
        const strong = typeof run !== "string";
        const spans = tokens(strong ? run.strong : run).map((t, i) => (/^\s+$/.test(t) ? " " : <span key={i} className="rw">{t}</span>));
        return strong ? <strong key={r}>{spans}</strong> : <Fragment key={r}>{spans}</Fragment>;
      })}
    </Tag>
  );
}
