"use client";
import { applyAppearance, readPrefs } from "../lib/appearance";
import { Moon, Sun } from "./Icons";

export default function ThemeToggle() {
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefs = readPrefs();
    const r = e.currentTarget.getBoundingClientRect();
    applyAppearance({ ...prefs, theme: prefs.theme === "dark" ? "light" : "dark" }, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <button className="icon-btn" type="button" onClick={toggle} aria-label="Toggle dark mode">
      <span className="theme-icon">
        <Moon />
        <Sun />
      </span>
    </button>
  );
}
