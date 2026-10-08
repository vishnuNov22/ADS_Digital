"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BRAND, DIVISIONS } from "@/data/ads";
import Magnetic from "./Magnetic";
import { Arrow } from "./Icons";

const MOTIFS = ["Celebration light", "Digital layers", "Architectural form"];

export default function Hero3D() {
  const sec = useRef(null);
  const box = useRef(null);
  const api = useRef(null);
  const [mode, setMode] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let dead = false, io, onMove, onScroll;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    (async () => {
      try {
        const [THREE, env] = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        const { createHeroScene } = await import("@/lib/heroScene");
        if (dead || !box.current) return;
        api.current = createHeroScene({ THREE, RoomEnvironment: env.RoomEnvironment }, box.current, {
          mobile, reduced, onMode: (m) => setMode(m),
        });
      } catch (e) {
        if (!dead) setFailed(true);
        return;
      }
      let raf = 0, px = 0, py = 0;
      onMove = (e) => {
        px = (e.clientX / window.innerWidth) * 2 - 1; py = (e.clientY / window.innerHeight) * 2 - 1;
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; api.current && api.current.setPointer(px, py); });
      };
      onScroll = () => {
        const h = sec.current ? sec.current.offsetHeight : window.innerHeight;
        api.current && api.current.setScroll(window.scrollY / h);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      io = new IntersectionObserver(([e]) => api.current && api.current.setActive(e.isIntersecting));
      io.observe(sec.current);
    })();
    return () => {
      dead = true;
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (onScroll) window.removeEventListener("scroll", onScroll);
      io && io.disconnect();
      api.current && api.current.destroy();
      api.current = null;
    };
  }, []);

  const pick = (i) => { setMode(i); api.current && api.current.setMode(i); };
  const title = BRAND.name;

  return (
    <section ref={sec} className="hero" aria-label="Introduction">
      {failed && <div className="hero-fallback" style={{ backgroundImage: "url(/ads-chrome.jpg)" }} />}
      <div ref={box} className="hero-canvas" aria-hidden="true" />
      <div className="hero-shade" />

      <div className="hero-divs fade-in" style={{ "--d": "2.6s" }} role="group" aria-label="Preview a division">
        {DIVISIONS.map((d, i) => (
          <button key={d.key} type="button" aria-pressed={mode === i} onClick={() => pick(i)} onMouseEnter={() => pick(i)} onFocus={() => pick(i)}>
            {d.short}
          </button>
        ))}
      </div>

      <h1 className="hero-title" aria-label={title}>
        {title.split("").map((c, i) => <span key={i} style={{ "--i": i }} aria-hidden="true">{c === " " ? " " : c}</span>)}
      </h1>

      <div className="scroll-cue fade-in" style={{ "--d": "3s" }}><i /> Scroll</div>
      <div className="hero-motif fade-in" style={{ "--d": "3s" }} aria-live="polite">{String(mode + 1).padStart(2, "0")} — {MOTIFS[mode]}</div>

      <div className="hero-ui">
        <div className="hero-row">
          <p className="hero-head" aria-label={BRAND.headline.join(" ")}>
            {BRAND.headline.map((l, i) => (
              <span className="ln" key={l} aria-hidden="true"><span style={{ "--i": i }}>{i === 1 ? <><span className="serif" style={{ fontWeight: 400 }}>Memorable</span> Events.</> : l}</span></span>
            ))}
          </p>
          <div className="hero-side fade-in" style={{ "--d": "2.5s" }}>
            <p>{BRAND.positioning} Weddings &amp; events, digital marketing &amp; websites, and real estate — one ADS team.</p>
            <div className="hero-ctas">
              <Magnetic><Link className="btn" href="/services">Explore Our Services <Arrow /></Link></Magnetic>
              <Magnetic><Link className="btn ghost" href="/contact">Contact ADS</Link></Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
