"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DIVISIONS, photo } from "@/data/ads";
import useScrollProgress from "@/lib/useScrollProgress";
import Magnetic from "./Magnetic";
import { Arrow } from "./Icons";

function Stack({ ids }) {
  return (
    <div className="stack3d">
      {ids.map((id) => { const p = photo(id); return (
        <div className="card" key={id}><Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 900px) 45vw, 22vw" /></div>
      ); })}
    </div>
  );
}
const VIS = [
  ["heritage-door-couple", "bridal-portrait", "event-guest-smile"],
  ["social-feed", "creator-camera", "desktop-site"],
  ["residence-facade", "villa-pool", "tower-mono"],
];

export default function Divisions() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  const [desk, setDesk] = useState(false);
  useEffect(() => { const m = matchMedia("(min-width: 901px)"); const f = () => setDesk(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  useScrollProgress(ref, (v) => setP(v));
  const idx = Math.min(2, Math.floor(p * 3));

  return (
    <section ref={ref} className="dv" aria-label="Our three divisions">
      <div className={`dv-stick ${desk && idx === 1 ? "light" : ""}`}>
        <div className="dv-head">
          <span className="eyebrow">Explore the divisions</span>
          <div className="dv-prog" aria-hidden="true">
            {[0, 1, 2].map((i) => <i key={i}><b style={{ "--p": Math.min(1, Math.max(0, p * 3 - i)) }} /></i>)}
          </div>
        </div>
        {DIVISIONS.map((d, i) => (
          <article key={d.key} className={`dv-panel ${idx === i ? "on" : ""}`} aria-hidden={false}>
            <div className="txt">
              <span className="num" aria-hidden="true">{d.index}</span>
              <h3 className="h2">{d.name.replace("ADS ", "")}</h3>
              <p className="lead" style={{ margin: 0 }}><span className="serif" style={{ color: "#fff" }}>{d.idea}</span> {d.positioning}</p>
              <div>
                <ul className="chips">
                  {(d.web ? [...d.services.slice(0, 5), "Website Design & Development"] : d.services.slice(0, 6)).map((s) => <li key={s}>{s}</li>)}
                </ul>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Magnetic><Link className="btn" href={d.href}>Explore {d.short} <Arrow /></Link></Magnetic>
                  {d.web && <Link className="btn ghost" href={d.web.href}>Websites</Link>}
                </div>
              </div>
            </div>
            <div className="dv-vis"><Stack ids={VIS[i]} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
