export type Theme = "light" | "dark";

/** The View Transitions API, until the bundled DOM types include it. */
type TransitionDocument = Document & { startViewTransition?: (update: () => void) => { finished: Promise<void> } };
export type Season = "default" | "spring" | "summer" | "fall" | "winter";
export type SeasonPref = Season | "auto";

export const seasonOptions: { value: SeasonPref; label: string; swatch: [string, string, string] }[] = [
  { value: "default", label: "Default", swatch: ["#F3F4F0", "#10120D", "#C6F53A"] },
  { value: "spring", label: "Spring", swatch: ["#F7F1EF", "#4F8A35", "#F4AFC3"] },
  { value: "summer", label: "Summer", swatch: ["#FFF6E6", "#1A6FA8", "#FFC62E"] },
  { value: "fall", label: "Fall", swatch: ["#F2E5CC", "#A4493D", "#F0A043"] },
  { value: "winter", label: "Winter", swatch: ["#EDF2F6", "#1E4B42", "#B7DAF2"] },
];

/** Meteorological seasons, northern hemisphere. */
export function seasonForDate(d = new Date()): Season {
  const m = d.getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

export const resolveSeason = (pref: SeasonPref): Season => (pref === "auto" ? seasonForDate() : pref);

export function readPrefs(): { theme: Theme; season: SeasonPref } {
  const root = document.documentElement;
  return {
    theme: root.dataset.theme === "dark" ? "dark" : "light",
    season: (localStorage.getItem("season") as SeasonPref) || "default",
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
export function applyAppearance(next: { theme: Theme; season: SeasonPref }, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const commit = () => {
    root.dataset.theme = next.theme;
    root.dataset.season = resolveSeason(next.season);
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

/** Runs before first paint so the page never flashes the wrong palette. */
export const appearanceScript = `(function(){try{
var r=document.documentElement,t=localStorage.getItem("theme"),s=localStorage.getItem("season")||"default";
r.dataset.theme=t?t:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
if(s==="auto"){var m=new Date().getMonth();s=m>=2&&m<=4?"spring":m>=5&&m<=7?"summer":m>=8&&m<=10?"fall":"winter";}
r.dataset.season=s;
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){r.dataset.streamPending="";setTimeout(function(){delete r.dataset.streamPending},4000);}
}catch(e){}})();`;
