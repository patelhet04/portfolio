"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/utils/site";
import RevealText from "./RevealText";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section className="block" id="about">
      <div className="wrap">
        <div className="about" ref={ref} data-seen={seen}>
          <div className="portrait-mask">
            <figure className="portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/opt/profile.webp" alt="Portrait of Het Patel" width={1100} height={1650} loading="lazy" decoding="async" />
              <figcaption className="mono">{site.location}</figcaption>
            </figure>
          </div>
          <div className="about__copy">
            <RevealText className="h2" style={{ marginBottom: 32 }} runs={["Some context."]} />
            <RevealText
              as="p"
              className="big"
              range={{ from: 0.85, to: 0.5, withHeight: 0.6 }}
              runs={[
                "I'm ",
                { strong: "Het" },
                ", an engineer in Boston who takes AI from demo to dependable. Right now I lead innovation at FuzionX, helping early-stage founders take their products from ideation to production and their first pilots.",
              ]}
            />
            <p className="lede" style={{ maxWidth: "58ch" }}>
              Before that I spent a year at Northeastern&apos;s AI Strategic Hub shipping things people actually used: a grading platform 67% of faculty
              adopted, a voice coach with 500+ daily users, and the GPU infrastructure underneath both. And before <em>that</em>, three years at Silver
              WebBuzz turning four-hour deploys into fifteen-minute ones. Off the clock I&apos;m lifting, hiking, cooking, or out doing{" "}
              <a href={site.photography} target="_blank" rel="noopener noreferrer">
                landscape photography
              </a>
              .
            </p>
          </div>
          <dl className="facts">
            <div>
              <dt className="mono">currently</dt>
              <dd>Team Lead, Innovation at FuzionX</dd>
            </div>
            <div>
              <dt className="mono">focus</dt>
              <dd>AI agents, RAG, LLMOps</dd>
            </div>
            <div>
              <dt className="mono">in production</dt>
              <dd>3+ years of shipping</dd>
            </div>
            <div>
              <dt className="mono">education</dt>
              <dd>M.S. Northeastern · B.E. GTU</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
