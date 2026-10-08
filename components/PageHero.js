"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Cinematic page hero with parallax photo (or children as the background)
export default function PageHero({ crumb, title, children, img, foot, short, bg }) {
  const bgRef = useRef(null);
  useEffect(() => {
    if (!bgRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; const y = window.scrollY; if (y < window.innerHeight * 1.2 && bgRef.current) { const el = bgRef.current.firstElementChild; if (el) el.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0) scale(${1 + y * 0.0002})`; } }); };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className={`phero ${short ? "short" : ""}`}>
      <div className="bg" ref={bgRef} aria-hidden={!img}>
        {img ? <Image src={img.src} alt={img.alt} width={img.w} height={img.h} priority sizes="100vw" style={{ objectPosition: img.pos || "center" }} /> : bg}
      </div>
      <div className="wrap">
        {crumb && <div className="crumb fade-in" style={{ "--d": "0.3s" }}><Link href="/" className="link-u">ADS</Link><span>/</span><span>{crumb}</span></div>}
        <h1 className="display hero-head" style={{ fontSize: "clamp(38px, 5.6vw, 88px)" }}>
          {title.map((l, i) => <span className="ln" key={i}><span style={{ "--i": i, animationDelay: `${0.35 + i * 0.12}s` }}>{l}</span></span>)}
        </h1>
        {(children || foot) && <div className="phero-foot fade-in" style={{ "--d": "0.9s" }}>{children}{foot}</div>}
      </div>
    </section>
  );
}
