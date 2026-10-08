"use client";
import { useRef } from "react";
import { WHY } from "@/data/ads";
import useScrollProgress from "@/lib/useScrollProgress";

// Pinned sequence: each statement flies through 3D space as you scroll.
export default function Why() {
  const sec = useRef(null);
  const words = useRef([]);
  const count = useRef(null);
  const n = WHY.length;
  useScrollProgress(sec, (p) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = p * n;
    words.current.forEach((el, i) => {
      if (!el) return;
      const d = f - i - 0.5; // -0.5..0.5 while "current"
      // crisp: words slide and fade — no blur, no depth softening
      const a = Math.max(0, Math.min(1, 1.6 - Math.abs(d) * 3.2));
      el.style.opacity = a.toFixed(3);
      el.style.transform = `translate3d(0, ${(-d * 140).toFixed(1)}px, 0)`;
    });
    if (count.current) count.current.textContent = `${String(Math.min(n, Math.floor(f) + 1)).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  });
  return (
    <section ref={sec} className="why light" aria-label="Why choose ADS">
      <div className="why-stick">
        <div className="why-ring" /><div className="why-ring r2" />
        <span className="eyebrow" style={{ position: "absolute", top: "calc(var(--nav-h) + 30px)" }}>Why choose ADS</span>
        {WHY.map((w, i) => (
          <p key={w} ref={(el) => (words.current[i] = el)} className="why-word" style={{ opacity: i === 0 ? 1 : 0, margin: 0 }}>
            {i === 0 ? <>One Team.<br /><span className="serif" style={{ fontWeight: 400 }}>Multiple Solutions.</span></> : w}
          </p>
        ))}
        <span ref={count} className="why-count">01 / {String(n).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
