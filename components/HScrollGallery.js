"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useScrollProgress from "@/lib/useScrollProgress";
import Lightbox from "./Lightbox";

// Pinned horizontal-scroll gallery (desktop); swipeable snap row on mobile.
export default function HScrollGallery({ items, intro }) {
  const sec = useRef(null);
  const track = useRef(null);
  const [h, setH] = useState(null);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const calc = () => {
      if (!track.current) return;
      const desktop = window.innerWidth > 900 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dist = track.current.scrollWidth - window.innerWidth;
      setH(desktop && dist > 0 ? dist + window.innerHeight : null);
    };
    calc();
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 600);
    return () => { window.removeEventListener("resize", calc); clearTimeout(t); };
  }, []);

  useScrollProgress(sec, (p) => {
    if (!track.current || !h) return;
    const dist = track.current.scrollWidth - window.innerWidth;
    track.current.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
  }, [h]);

  return (
    <section ref={sec} className="hs" style={h ? { height: h } : undefined} aria-label="Photography showcase">
      <div className="hs-stick">
        <div ref={track} className="hs-track">
          {intro && <div className="hs-intro">{intro}</div>}
          {items.map((p, i) => (
            <figure key={p.id} className="hs-item" style={{ margin: 0, aspectRatio: `${p.w}/${p.h}` }}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`} style={{ position: "absolute", inset: 0, zIndex: 2 }} />
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 900px) 80vw, 45vw" />
              <figcaption><span>{p.caption}</span><small>{p.category}</small></figcaption>
            </figure>
          ))}
        </div>
      </div>
      {open > -1 && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </section>
  );
}
