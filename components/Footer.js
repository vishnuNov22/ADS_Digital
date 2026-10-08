import Link from "next/link";
import { CONTACT, DIVISIONS, NAV, SOCIALS, BRAND } from "@/data/ads";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <h4>ADS Digitals &amp; Events</h4>
            <p style={{ margin: 0, color: "#bdbdbd", maxWidth: "32ch", fontSize: 18, letterSpacing: "-0.01em" }}>
              {BRAND.headline.join(" ")} <span className="serif">{BRAND.positioning}</span>
            </p>
          </div>
          <div>
            <h4>Divisions</h4>
            <ul>
              {DIVISIONS.map((d) => <li key={d.key}><Link className="link-u" href={d.href}>{d.name}</Link></li>)}
              <li><Link className="link-u" href="/web-development">Website Design &amp; Development</Link></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {NAV.filter((n) => ["/services", "/gallery", "/projects", "/about", "/contact"].includes(n.href) || n.href === "/").map((n) => (
                <li key={n.href}><Link className="link-u" href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link className="link-u" href="/gallery">Gallery</Link></li>
              <li><Link className="link-u" href="/projects">Projects</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              {CONTACT.phones.map((p) => <li key={p.tel}><a className="link-u" href={`tel:${p.tel}`}>{p.display}</a></li>)}
              <li><a className="link-u" href={`mailto:${CONTACT.email}`} style={{ wordBreak: "break-all" }}>{CONTACT.email}</a></li>
              <li><a className="link-u" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">{CONTACT.location}</a></li>
              {SOCIALS.filter((s) => s.url).map((s) => (
                <li key={s.key}><a className="link-u" href={s.url} target="_blank" rel="noopener noreferrer">{s.handle}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <Logo className="huge" />
        <div className="base">
          <span>© {new Date().getFullYear()} ADS Digitals &amp; Events. All rights reserved.</span>
          <span>Weddings &amp; Events · Digital Marketing · Websites · Real Estate</span>
        </div>
      </div>
    </footer>
  );
}
