import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";
import CTABand from "@/components/CTABand";
import Magnetic from "@/components/Magnetic";
import { Words } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import Link from "next/link";
import { DIVISIONS, stock } from "@/data/ads";
import Image from "next/image";
import Reveal from "@/components/Reveal";
const BANNER = { events: "venue-floral-arch", digitals: "creator-camera", web: "desktop-site", realestate: "villa-modern" };

export const metadata = { title: "Services", description: "All ADS services — weddings & events, digital marketing, website design & development, and real estate." };

export default function ServicesPage() {
  const blocks = [
    ...DIVISIONS.slice(0, 2).map((d) => ({ key: d.key, name: d.name, idea: d.idea, positioning: d.positioning, services: d.services, href: d.href, cta: d.cta })),
    { key: "web", name: DIVISIONS[1].web.name, idea: "Building Brands.", positioning: DIVISIONS[1].web.positioning, services: DIVISIONS[1].web.services, href: DIVISIONS[1].web.href, cta: DIVISIONS[1].web.cta },
    ...DIVISIONS.slice(2).map((d) => ({ key: d.key, name: d.name, idea: d.idea, positioning: d.positioning, services: d.services, href: d.href, cta: d.cta })),
  ];
  return (
    <>
      <PageHero crumb="Services" short title={["Everything", <span key="s" className="serif">ADS does.</span>]}
        bg={<div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 0%, #1c1c1c, #060606 70%)" }} />}>
        <p>{"Weddings & events, digital marketing, websites and real estate — choose a division or browse every service."}</p>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }} aria-label="Jump to division">
          {blocks.map((b) => <a key={b.key} className="btn ghost sm" href={`#${b.key}`}>{b.name.replace("ADS ", "")}</a>)}
        </nav>
      </PageHero>
      {blocks.map((b, i) => (
        <section key={b.key} id={b.key} className={`section ${i % 2 ? "light" : ""}`} style={{ scrollMarginTop: 40 }}>
          <div className="wrap">
            <div className="row-between">
              <div>
                <span className="eyebrow">0{i + 1} — {b.idea}</span>
                <Words as="h2" className="h2 mt-s" text={b.name} />
                <p className="lead mt-s" style={{ marginBottom: 0 }}>{b.positioning}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Magnetic><Link className="btn" href={`/contact?service=${encodeURIComponent(b.cta.service)}`}>{b.cta.label} <Arrow /></Link></Magnetic>
                <Link className="btn ghost" href={b.href}>Explore</Link>
              </div>
            </div>
            <Reveal base="img-rv" className="banner"><Image src={stock(BANNER[b.key]).src} alt={stock(BANNER[b.key]).alt} width={stock(BANNER[b.key]).w} height={stock(BANNER[b.key]).h} sizes="100vw" /></Reveal>
            <ServiceGrid services={b.services} />
          </div>
        </section>
      ))}
      <CTABand title="Not sure where to start?" />
    </>
  );
}
