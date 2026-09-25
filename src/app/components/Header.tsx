"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { sections, site } from "@/utils/site";
import { ArrowOut, Close, Menu } from "./Icons";
import SeasonPicker from "./SeasonPicker";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Reading progress. Browsers with scroll-driven animations fill the line from CSS instead.
  useEffect(() => {
    if (CSS.supports("animation-timeline: scroll()")) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Which section is under the reading line
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Keep the closed sheet out of the tab order and the accessibility tree
  useEffect(() => {
    sheetRef.current?.toggleAttribute("inert", !menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const sectionLink = (id: string, label: string, extra?: { style?: React.CSSProperties; onClick?: () => void }) =>
    onHome ? (
      <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} {...extra}>
        {label}
      </a>
    ) : (
      <Link key={id} href={`/#${id}`} {...extra}>
        {label}
      </Link>
    );

  return (
    <header className="top">
      <div className="wrap top__bar">
        {onHome ? (
          <a className="brand" href="#hero" aria-label="Het Patel, back to top">
            Het Patel <span className="brand__cursor" aria-hidden />
          </a>
        ) : (
          <Link className="brand" href="/" aria-label="Het Patel, home">
            Het Patel <span className="brand__cursor" aria-hidden />
          </Link>
        )}

        <nav className="nav" aria-label="Sections">
          {sections.map((s) => sectionLink(s.id, s.label))}
        </nav>

        <div className="top__actions">
          <SeasonPicker />
          <ThemeToggle />
          <a className="btn btn--primary btn--sm" href={site.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume (opens in a new tab)">
            <span className="resume-label">Resume</span>
            <ArrowOut />
          </a>
          <button
            ref={menuBtnRef}
            className="icon-btn menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="sheet"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="top__rule">
        <div className="top__progress" ref={progressRef} />
      </div>
      <div className="sheet" id="sheet" data-open={menuOpen} ref={sheetRef}>
        <nav aria-label="Sections">
          {sections.map((s, i) =>
            sectionLink(s.id, s.label, { style: { "--i": i } as React.CSSProperties, onClick: () => setMenuOpen(false) }),
          )}
        </nav>
      </div>
    </header>
  );
}
