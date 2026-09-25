"use client";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { Regenerate } from "./Icons";
import { REGENERATE_EVENT, REPLAY_KEY } from "./Hero";

export default function Footer() {
  const pathname = usePathname();
  const router = useTransitionRouter();

  const regenerate = () => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pathname !== "/") {
      sessionStorage.setItem(REPLAY_KEY, "1");
      router.push("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    window.setTimeout(() => dispatchEvent(new Event(REGENERATE_EVENT)), reduce ? 0 : 500);
  };

  return (
    <footer className="end">
      <div className="wrap end__row">
        <span className="end__stop mono">end of response · © {new Date().getFullYear()} Het Patel</span>
        <button className="btn btn--sm regen" type="button" onClick={regenerate}>
          <Regenerate />
          Regenerate
        </button>
      </div>
    </footer>
  );
}
