"use client";
import { useEffect, useRef } from "react";
import { MARK_PATH, MARK_HEIGHT, LOGO_VIEWBOX } from "@/lib/logoPath";
import { stock } from "@/data/ads";
const small = (id) => stock(id).src.replace("w=2400", "w=900");

const W = LOGO_VIEWBOX.split(" ")[2];
const MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${MARK_HEIGHT}'><path d='${MARK_PATH}'/></svg>`)}")`;

// A miniature ADS-style page used inside each device
function MiniSite({ light, img, vh }) {
  return (
    <div className={`mini ${light ? "lightm" : ""}`} style={{ "--logo-mask": MASK, "--vh": vh }}>
      <div className="scroller">
        <div className="mnav"><b /><span><i /><i /><i /></span></div>
        <div className="mhero"><h4>Creative<br />Solutions.</h4><span className="pill">Explore</span></div>
        <div className="mimg">{img && /* eslint-disable-next-line @next/next/no-img-element */ <img src={img} alt="" loading="lazy" />}</div>
        <div className="mgrid"><i /><i /><i /><i /><i /><i /></div>
        <div className="mlines"><i /><i /><i /></div>
        <div className="mgrid"><i /><i /><i /></div>
        <div className="mlines"><i /><i /><i /></div>
      </div>
    </div>
  );
}

export default function Devices() {
  const stage = useRef(null);
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, y = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width - 0.5) * 2; y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.transform = `rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 5).toFixed(2)}deg)`; });
    };
    const leave = () => { el.style.transform = ""; };
    const host = el.parentElement;
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave);
    return () => { host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="devices" aria-label="Website previews on laptop, tablet and phone" role="img">
      <div className="dev-stage" ref={stage}>
        <div className="laptop"><div className="scr"><MiniSite img={small("villa-modern")} vh="380px" /></div><div className="base" /></div>
        <div className="tablet"><MiniSite light img={small("studio-shoot")} vh="360px" /></div>
        <div className="phone"><MiniSite img={small("stage-white-sofa")} vh="380px" /></div>
      </div>
    </div>
  );
}
