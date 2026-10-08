import Link from "next/link";
import Magnetic from "./Magnetic";
import { Arrow, WhatsApp } from "./Icons";
import { Words } from "./Reveal";
import { Mark } from "./Logo";
import { waLink } from "@/data/ads";

export default function CTABand({ eyebrow = "Let's talk", title = "Tell us what you're planning.", cta = "Request a Consultation", service, message, light }) {
  const href = service ? `/contact?service=${encodeURIComponent(service)}` : "/contact";
  return (
    <section className={`cta-band ${light ? "light" : ""}`}>
      <Mark className="ghost-logo" />
      <div className="wrap" style={{ position: "relative" }}>
        <span className="eyebrow">{eyebrow}</span>
        <Words as="h2" className="h2" text={title} />
        <div className="row">
          <Magnetic><Link className="btn" href={href}>{cta} <Arrow /></Link></Magnetic>
          <Magnetic><a className="btn ghost" href={waLink(message)} target="_blank" rel="noopener noreferrer"><WhatsApp width="18" height="18" /> WhatsApp</a></Magnetic>
        </div>
      </div>
    </section>
  );
}
