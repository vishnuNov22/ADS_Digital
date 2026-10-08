"use client";
import { createElement, useEffect, useRef } from "react";

// 3D card tilt + spotlight position (--mx/--my), rAF-throttled, disabled on touch / reduced motion.
export default function Tilt({ as = "div", className = "", max = 8, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, px = 0.5, py = 0.5, on = false;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      if (fine) el.style.transform = on ? `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) translateZ(0)` : "";
    };
    const move = (e) => { const r = el.getBoundingClientRect(); px = (e.clientX - r.left) / r.width; py = (e.clientY - r.top) / r.height; on = true; if (!raf) raf = requestAnimationFrame(apply); };
    const leave = () => { on = false; if (!raf) raf = requestAnimationFrame(apply); };
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [max]);
  return createElement(as, { ref, className: `tilt ${className}`, ...rest }, children);
}
