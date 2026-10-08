"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, DIVISIONS, CONTACT } from "@/data/ads";
import { Logo } from "./Logo";
import { Arrow } from "./Icons";
import Magnetic from "./Magnetic";

export default function Nav() {
  const path = usePathname() || "/";
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setCompact(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const active = (href) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className={`nav ${compact && !open ? "compact" : ""}`}>
        <Link href="/" aria-label="ADS Digitals & Events — home"><Logo className="logo" /></Link>
        <nav className="links" aria-label="Main">
          {NAV.slice(1).map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="right">
          <span className="cta-desk">
            <Magnetic><Link className="btn sm" href="/contact">Request a Consultation <Arrow /></Link></Magnetic>
          </span>
          <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mmenu" onClick={() => setOpen((o) => !o)}>
            <span /><span />
          </button>
        </div>
      </header>

      <div id="mmenu" className={`mmenu ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} style={{ "--i": i }} tabIndex={open ? 0 : -1} aria-current={active(n.href) ? "page" : undefined}>
              <span>{n.label}</span><small>0{i + 1}</small>
            </Link>
          ))}
        </nav>
        <div className="mfoot">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {DIVISIONS.map((d) => (
              <Link key={d.key} className="btn ghost sm" href={d.href} tabIndex={open ? 0 : -1}>{d.short}</Link>
            ))}
          </div>
          <a href={`tel:${CONTACT.phones[0].tel}`} tabIndex={open ? 0 : -1}>{CONTACT.phones[0].display}</a>
          <a href={`mailto:${CONTACT.email}`} tabIndex={open ? 0 : -1}>{CONTACT.email}</a>
          <span>{CONTACT.location}</span>
        </div>
      </div>
    </>
  );
}
