"use client";
import { useEffect, useState } from "react";
import { MARK_PATH, MARK_HEIGHT, LOGO_VIEWBOX } from "@/lib/logoPath";

// Shown once per browser session.
export default function Preloader() {
  const [state, setState] = useState("on");
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ads-intro") === "1"; sessionStorage.setItem("ads-intro", "1"); } catch (e) {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) { setState("gone"); return; }
    document.documentElement.classList.add("is-loading");
    const a = setTimeout(() => setState("out"), 1900);
    const b = setTimeout(() => { setState("gone"); document.documentElement.classList.remove("is-loading"); }, 3000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (state === "gone") return null;
  const w = LOGO_VIEWBOX.split(" ")[2];
  return (
    <div className={`preloader ${state === "out" ? "out" : ""}`} aria-hidden="true">
      <svg className="mark" viewBox={`-2 -2 ${+w + 4} ${MARK_HEIGHT + 4}`}><path d={MARK_PATH} /></svg>
      <div className="bar" />
    </div>
  );
}
