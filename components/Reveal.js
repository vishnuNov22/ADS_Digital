"use client";
import { createElement, useEffect, useRef, useState } from "react";

let io;
const cbs = new WeakMap();
function observe(el, cb) {
  if (typeof IntersectionObserver === "undefined") { cb(); return () => {}; }
  if (!io) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { const f = cbs.get(e.target); if (f) f(); io.unobserve(e.target); cbs.delete(e.target); }
      }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
  }
  cbs.set(el, cb); io.observe(el);
  return () => { io && io.unobserve(el); cbs.delete(el); };
}

export function useInView() {
  const ref = useRef(null);
  const [inView, set] = useState(false);
  useEffect(() => { if (ref.current) return observe(ref.current, () => set(true)); }, []);
  return [ref, inView];
}

// Fade/translate in on scroll. `base` lets other components (cards, images) reuse the observer.
export default function Reveal({ as = "div", className = "", base = "rv", delay = 0, style, children, ...rest }) {
  const [ref, inView] = useInView();
  return createElement(as, {
    ref, className: `${base} ${className} ${inView ? "in" : ""}`.trim(),
    style: delay ? { ...style, "--d": `${delay}s` } : style, ...rest,
  }, children);
}

// Masked word-by-word reveal for headings
export function Words({ as = "h2", text, className = "", delay = 0, children }) {
  const [ref, inView] = useInView();
  const parts = String(text).split(" ");
  return createElement(as, { ref, className: `words ${className} ${inView ? "in" : ""}`, style: { "--d": `${delay}s` }, "aria-label": text },
    parts.map((w, i) => (
      <span className="w" key={i} aria-hidden="true">
        <span style={{ "--i": i }}>{w}</span>{i < parts.length - 1 ? " " : ""}
      </span>
    )),
    children
  );
}
