"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DIVISIONS, waLink } from "@/data/ads";
import { WhatsApp } from "./Icons";

const DIV_ROUTES = ["/events", "/digital-marketing", "/web-development", "/real-estate"];

// Floating division switcher (on division pages) + WhatsApp button (everywhere)
export default function Chrome() {
  const path = usePathname() || "/";
  const onDivision = DIV_ROUTES.some((r) => path.startsWith(r));
  useEffect(() => {
    document.body.classList.toggle("has-dswitch", onDivision);
  }, [onDivision]);
  const current = (d) => path.startsWith(d.href) || (d.key === "digitals" && path.startsWith("/web-development"));
  return (
    <>
      {onDivision && (
        <nav className="dswitch" aria-label="Switch division">
          <span className="lbl">ADS</span>
          {DIVISIONS.map((d) => (
            <Link key={d.key} href={d.href} aria-current={current(d) ? "page" : undefined}>{d.short}</Link>
          ))}
        </nav>
      )}
      <a className="fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with ADS on WhatsApp">
        <WhatsApp />
      </a>
    </>
  );
}
