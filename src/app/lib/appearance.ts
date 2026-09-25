export type Theme = "light" | "dark";

/** The View Transitions API, until the bundled DOM types include it. */
type TransitionDocument = Document & { startViewTransition?: (update: () => void) => { finished: Promise<void> } };
export type Season = "default" | "spring" | "summer" | "fall" | "winter";
/** The palette a first-time visitor sees */
export const DEFAULT_SEASON: Season = "fall";

export const seasonOptions: { value: Season; label: string; swatch: [string, string, string] }[] = [
  { value: "default", label: "Default", swatch: ["#F3F4F0", "#10120D", "#C6F53A"] },
  { value: "spring", label: "Spring", swatch: ["#F7F1EF", "#4F8A35", "#F4AFC3"] },
  { value: "summer", label: "Summer", swatch: ["#FFF6E6", "#1A6FA8", "#FFC62E"] },
  { value: "fall", label: "Fall", swatch: ["#F2E5CC", "#A4493D", "#F0A043"] },
  { value: "winter", label: "Winter", swatch: ["#EDF2F6", "#1E4B42", "#B7DAF2"] },
];

export function readPrefs(): { theme: Theme; season: Season } {
  const root = document.documentElement;
  // Anything unknown (nothing saved yet, or the retired "auto") falls back to the default palette
  const saved = localStorage.getItem("season");
  return {
    theme: root.dataset.theme === "dark" ? "dark" : "light",
    season: seasonOptions.find((o) => o.value === saved)?.value ?? DEFAULT_SEASON,
  };
}

/** Points the browser's toolbar color (theme-color) at the current palette's paper. */
export function syncThemeColor() {
  const paper = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
  if (paper) document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", paper));
}

/**
 * Applies a theme and season. When the browser supports view transitions the
 * new palette spreads out in a circle from `origin` (usually the control
 * that was clicked).
 */
export function applyAppearance(next: { theme: Theme; season: Season }, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const commit = () => {
    root.dataset.theme = next.theme;
    root.dataset.season = next.season;
    localStorage.setItem("theme", next.theme);
    localStorage.setItem("season", next.season);
    syncThemeColor();
    window.dispatchEvent(new CustomEvent("appearancechange", { detail: next }));
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as TransitionDocument;
  if (!doc.startViewTransition || reduce || !origin) {
    commit();
    return;
  }

  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  root.style.setProperty("--vt-x", `${origin.x}px`);
  root.style.setProperty("--vt-y", `${origin.y}px`);
  root.style.setProperty("--vt-r", `${radius}px`);
  root.classList.add("vt-appearance");
  const transition = doc.startViewTransition(commit);
  transition.finished.finally(() => root.classList.remove("vt-appearance"));
}

/**
 * Runs before first paint so the page never flashes the wrong palette. It also turns on the
 * preloader for the first page of a visit (html[data-loader]) and holds the hero's answer hidden
 * until it streams (html[data-stream-pending]), each with a timeout in case the app never starts.
 */
export const appearanceScript = `(function(){try{
var r=document.documentElement,t=localStorage.getItem("theme"),s=localStorage.getItem("season");
r.dataset.theme=t?t:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
r.dataset.season=/^(default|spring|summer|fall|winter)$/.test(s)?s:"fall";
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var b=!sessionStorage.getItem("booted");if(b){sessionStorage.setItem("booted","1");r.dataset.loader="";}r.dataset.streamPending="";setTimeout(function(){delete r.dataset.streamPending},b?6000:4000);}
}catch(e){}})();`;
