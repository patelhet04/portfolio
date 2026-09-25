"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { applyAppearance, DEFAULT_SEASON, readPrefs, seasonOptions, syncThemeColor, type Season } from "../lib/appearance";
import { Check } from "./Icons";

const optionFor = (v: Season) => seasonOptions.find((o) => o.value === v)!;
const options = seasonOptions.map((o) => o.value);

function Swatch({ colors }: { colors: [string, string, string] }) {
  return (
    <span className="swatch" aria-hidden>
      {colors.map((c) => (
        <i key={c} style={{ background: c }} />
      ))}
    </span>
  );
}

export default function SeasonPicker() {
  const [open, setOpen] = useState(false);
  const [pref, setPref] = useState<Season>(DEFAULT_SEASON);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setPref(readPrefs().season);
    syncThemeColor();
    const sync = () => setPref(readPrefs().season);
    addEventListener("appearancechange", sync);
    return () => removeEventListener("appearancechange", sync);
  }, []);

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) btnRef.current?.focus();
  }, []);

  useEffect(() => {
    popRef.current?.toggleAttribute("inert", !open);
    if (!open) return;
    const idx = Math.max(0, options.indexOf(pref));
    requestAnimationFrame(() => items.current[idx]?.focus());
    const onDown = (e: PointerEvent) => {
      if (!popRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) close(false);
    };
    addEventListener("pointerdown", onDown);
    return () => removeEventListener("pointerdown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const choose = (value: Season) => {
    const r = btnRef.current!.getBoundingClientRect();
    close();
    if (value === pref) return;
    setPref(value);
    applyAppearance({ theme: readPrefs().theme, season: value }, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = items.current.findIndex((el) => el === document.activeElement);
    const move = (to: number) => {
      e.preventDefault();
      items.current[(to + options.length) % options.length]?.focus();
    };
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(options.length - 1);
    else if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      close();
    }
  };

  return (
    <div className="season">
      <button
        ref={btnRef}
        type="button"
        className="season__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="season-menu"
        aria-label={`Color palette: ${optionFor(pref).label}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Swatch colors={optionFor(pref).swatch} />
        <span className="season__name">{optionFor(pref).label}</span>
      </button>
      <div ref={popRef} className="season__pop" id="season-menu" role="menu" aria-label="Color palette" data-open={open} onKeyDown={onKeyDown}>
        <div className="season__label mono">palette</div>
        {options.map((value, i) => {
          const opt = optionFor(value);
          return (
            <div key={value} role="none">
              {value === "spring" && <div className="season__rule" role="separator" />}
              <button
                ref={(el) => {
                  items.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={pref === value}
                tabIndex={-1}
                className="season__opt"
                onClick={() => choose(value)}
              >
                <Swatch colors={opt.swatch} />
                <span>{opt.label}</span>
                <Check className="check" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
