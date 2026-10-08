"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PHOTOS, STOCK } from "@/data/ads";
import useScrollProgress from "@/lib/useScrollProgress";
import { Arrow } from "./Icons";

const tex = (p) => (p.stock ? p.src.replace("w=2400", "w=1100").replace("q=85", "q=80") : p.src.replace("/photos/", "/photos/thumb/"));
const pick = (ids) => ids.map((id) => PHOTOS.find((p) => p.id === id) || STOCK.find((p) => p.id === id));

export const CHAPTERS = [
  { key: "events", title: "Weddings & Events", line: "Photography, film, décor, catering, stage & LED production.", href: "/events",
    items: pick(["heritage-door-couple", "stage-decor-gold", "lotus-portrait", "concert-lights", "tea-stall-couple", "buffet-service", "event-guest-smile"]) },
  { key: "digitals", title: "Digital Marketing", line: "Social media, content, reels, Meta & Google ads, SEO.", href: "/digital-marketing",
    items: pick(["creator-camera", "social-feed", "studio-shoot", "social-scroll"]) },
  { key: "web", title: "Websites", line: "Business sites, e-commerce, UI/UX and maintenance.", href: "/web-development",
    items: pick(["desktop-site", "workspace-laptop", "laptop-desk"]) },
  { key: "realestate", title: "Real Estate", line: "Residential, commercial, land & plots, houses & villas.", href: "/real-estate",
    items: pick(["villa-pool", "glass-office", "residence-facade", "plots-aerial", "house-pool"]) },
];

export default function DimensionTunnel() {
  const sec = useRef(null), box = useRef(null), api = useRef(null);
  const [ch, setCh] = useState(0);
  const [failed, setFailed] = useState(false);
  const [p, setP] = useState(0);

  const flat = [];
  const starts = [];
  CHAPTERS.forEach((c, k) => { starts.push(flat.length); c.items.forEach((it) => flat.push({ ...it, chapter: k })); });

  useEffect(() => {
    let dead = false, io, mv;
    (async () => {
      try {
        const THREE = await import("three");
        const { createTunnelScene } = await import("@/lib/tunnelScene");
        if (dead || !box.current) return;
        api.current = createTunnelScene(THREE, box.current, {
          items: flat.map((it) => ({ tex: tex(it), aspect: it.w / it.h, chapter: it.chapter })),
          chapters: starts.map((s) => ({ start: s })),
          mobile: matchMedia("(max-width: 820px)").matches,
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
      } catch (e) { if (!dead) setFailed(true); return; }
      mv = (e) => api.current && api.current.setPointer((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
      addEventListener("pointermove", mv, { passive: true });
      io = new IntersectionObserver(([e]) => api.current && api.current.setActive(e.isIntersecting));
      io.observe(sec.current);
    })();
    return () => { dead = true; mv && removeEventListener("pointermove", mv); io && io.disconnect(); api.current && api.current.destroy(); api.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScrollProgress(sec, (v) => {
    api.current && api.current.setProgress(v);
    setP(v);
    const idx = Math.round(v * (flat.length - 1));
    let k = 0; starts.forEach((s, i) => { if (idx >= s - 1) k = i; });
    setCh(k);
  });

  if (failed) {
    return (
      <section className="section light" aria-label="ADS divisions in pictures">
        <div className="wrap">
          <span className="eyebrow">ADS dimensions</span>
          {CHAPTERS.map((c) => (
            <div key={c.key} className="mt-l">
              <h3 className="h3">{c.title}</h3>
              <div className="masonry" style={{ marginTop: 20 }}>
                {c.items.map((it) => <figure key={it.id}><Image src={it.src} alt={it.alt} width={it.w} height={it.h} sizes="33vw" /></figure>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const c = CHAPTERS[ch];
  return (
    <section ref={sec} className="tunnel" style={{ height: `${flat.length * 42 + 100}vh` }} aria-label="Fly through the ADS divisions">
      <div className="tunnel-stick">
        <div ref={box} className="tunnel-canvas" aria-hidden="true" />
        <div className="tunnel-ui">
          <div className="tunnel-top">
            <span className="eyebrow">Fly through ADS</span>
            <span className="tunnel-count">{String(ch + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}</span>
          </div>
          <div className="tunnel-title" key={c.key}>
            <h2 className="h2">{c.title}</h2>
            <p>{c.line}</p>
            <Link className="btn sm" href={c.href}>Explore {c.title} <Arrow /></Link>
          </div>
          <div className="tunnel-bar"><i style={{ transform: `scaleX(${p})` }} /></div>
          <ul className="tunnel-steps">
            {CHAPTERS.map((x, i) => <li key={x.key} className={i === ch ? "on" : ""}>{x.title}</li>)}
          </ul>
        </div>
        <p className="sr">{CHAPTERS.map((x) => `${x.title}: ${x.line}`).join(" ")}</p>
      </div>
    </section>
  );
}
