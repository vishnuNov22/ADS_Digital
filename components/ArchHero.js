"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Magnetic from "./Magnetic";
import { Arrow } from "./Icons";

export default function ArchHero({ title, text }) {
  const sec = useRef(null), box = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let api, dead = false, io, mv, sc;
    (async () => {
      try {
        const THREE = await import("three");
        const { createArchScene } = await import("@/lib/archScene");
        if (dead || !box.current) return;
        api = createArchScene(THREE, box.current, {
          mobile: window.matchMedia("(max-width: 820px)").matches,
          reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
      } catch (e) { if (!dead) setFailed(true); return; }
      mv = (e) => api.setPointer((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
      sc = () => api.setScroll(scrollY / (sec.current ? sec.current.offsetHeight : innerHeight));
      addEventListener("pointermove", mv, { passive: true });
      addEventListener("scroll", sc, { passive: true });
      io = new IntersectionObserver(([e]) => api.setActive(e.isIntersecting));
      io.observe(sec.current);
    })();
    return () => { dead = true; mv && removeEventListener("pointermove", mv); sc && removeEventListener("scroll", sc); io && io.disconnect(); api && api.destroy(); };
  }, []);

  return (
    <section ref={sec} className="re-hero" aria-label="ADS Real Estate">
      <div ref={box} className="hero-canvas" aria-hidden="true" style={failed ? { background: "radial-gradient(80% 60% at 50% 30%, #1a1a1a, #050505)" } : undefined} />
      <div className="hero-shade" />
      <div className="hero-ui">
        <div className="crumb fade-in" style={{ "--d": ".3s", display: "flex", gap: 10, fontSize: 13, color: "var(--mute)", marginBottom: 22 }}>
          <Link href="/" className="link-u">ADS</Link><span>/</span><span>Real Estate</span>
        </div>
        <div className="hero-row">
          <h1 className="hero-head" style={{ fontSize: "clamp(38px, 5.6vw, 88px)" }}>
            {title.map((l, i) => <span className="ln" key={i}><span style={{ "--i": i, animationDelay: `${0.4 + i * 0.12}s` }}>{l}</span></span>)}
          </h1>
          <div className="hero-side fade-in" style={{ "--d": "1s" }}>
            <p>{text}</p>
            <div className="hero-ctas">
              <Magnetic><Link className="btn" href="/contact?service=Real%20Estate">Enquire About Property <Arrow /></Link></Magnetic>
              <Magnetic><a className="btn ghost" href="#listings">View Listings</a></Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
