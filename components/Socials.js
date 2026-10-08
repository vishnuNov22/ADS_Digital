import Image from "next/image";
import { SOCIALS, waLink, photo } from "@/data/ads";
const SOC_IMG = { digitals: "design-software", weddings: "heritage-door-couple", realestate: "villa-modern" };
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

// Separate entry points for each ADS brand. Links only where an official handle is supplied.
export default function Socials() {
  return (
    <div className="socials">
      {SOCIALS.map((s, i) => {
        const href = s.url || waLink(`Hello ${s.label}, I'd like to know more.`);
        return (
          <Reveal key={s.key} delay={i * 0.08}>
            <a className="soc" href={href} target="_blank" rel="noopener noreferrer" style={{ height: "100%" }}>
              <span className="soc-img"><Image src={photo(SOC_IMG[s.key]).src} alt="" width={photo(SOC_IMG[s.key]).w} height={photo(SOC_IMG[s.key]).h} sizes="(max-width: 860px) 100vw, 33vw" /></span>
              <small>{s.url ? "Instagram" : "Connect on WhatsApp"}</small>
              <div>
                <div className="big">{s.label}</div>
                <small style={{ display: "inline-flex", gap: 8, alignItems: "center", marginTop: 10 }}>{s.handle || "Message ADS"} <Arrow /></small>
              </div>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
