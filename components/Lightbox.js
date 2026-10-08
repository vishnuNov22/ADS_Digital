"use client";
import { useEffect, useRef, useCallback } from "react";
import { Close, Chev } from "./Icons";

// Fullscreen viewer: keyboard (← → Esc), swipe on touch, counter + captions.
export default function Lightbox({ items, index, onClose, onIndex }) {
  const start = useRef(null);
  const closeBtn = useRef(null);
  const n = items.length;
  const go = useCallback((d) => onIndex((index + d + n) % n), [index, n, onIndex]);

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeBtn.current && closeBtn.current.focus();
    document.documentElement.style.overflow = "hidden";
    const k = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.documentElement.style.overflow = ""; prevFocus && prevFocus.focus && prevFocus.focus(); };
  }, [go, onClose]);

  const it = items[index];
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Image viewer"
      onPointerDown={(e) => (start.current = e.clientX)}
      onPointerUp={(e) => { if (start.current == null) return; const dx = e.clientX - start.current; start.current = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}>
      <div className="lb-top">
        <span>{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button ref={closeBtn} className="lb-close" onClick={onClose} aria-label="Close viewer"><Close /></button>
      </div>
      <div className="lb-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={it.src} src={it.src} alt={it.alt} draggable={false} />
        <button className="lb-nav p" onClick={() => go(-1)} aria-label="Previous image"><Chev dir="l" /></button>
        <button className="lb-nav n" onClick={() => go(1)} aria-label="Next image"><Chev /></button>
      </div>
      <div className="lb-bot">
        <span style={{ color: "#fff" }}>{it.caption}</span>
        <span>{it.category}</span>
      </div>
    </div>
  );
}
