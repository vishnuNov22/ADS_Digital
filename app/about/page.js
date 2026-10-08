import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import Reveal, { Words } from "@/components/Reveal";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Mark } from "@/components/Logo";
import { BRAND, DIVISIONS, stock, photo } from "@/data/ads";
import Image from "next/image";

export const metadata = { title: "About", description: "ADS Digitals & Events — one company delivering events, digital marketing, websites and real estate. One Team. Multiple Solutions." };

const PILLARS = [
  { t: "Creativity", p: "Ideas that make events memorable and brands stand out." },
  { t: "Technology", p: "Digital marketing and websites that help businesses grow." },
  { t: "Professional execution", p: "Planning through to delivery, handled by one team." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" short title={["One Team.", <span key="s" className="serif">Multiple Solutions.</span>]}
        bg={<div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "#060606" }}><Mark className="about-mark" title="ADS" /></div>}>
        <p>{BRAND.headline.join(" ")}</p>
      </PageHero>

      <section className="section light">
        <div className="wrap">
          <span className="eyebrow">ADS Digitals &amp; Events</span>
          <Words as="p" className="big-quote mt-m" text={BRAND.summary} />
          <div className="pillars">
            {PILLARS.map((x, i) => (
              <Reveal key={x.t} delay={i * 0.1}><div className="ln" /><h3>{x.t}</h3><p>{x.p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="photo-row" style={{ marginBottom: 80 }}>
            {[photo("gramophone-couple"), stock("studio-shoot"), stock("residence-facade")].map((im, i) => (
              <Reveal key={im.id} base="img-rv" className="frame" delay={i * 0.1}><Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes="(max-width: 900px) 100vw, 33vw" /></Reveal>
            ))}
          </div>
          <span className="eyebrow">What ADS does</span>
          <ul className="list-lines">
            {[...DIVISIONS.map((d) => ({ href: d.href, name: d.name, idea: d.idea })), { href: "/web-development", name: "Website Design & Development", idea: "Building Brands." }].map((d, i) => (
              <Reveal as="li" key={d.href} delay={i * 0.06}>
                <Link href={d.href} style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 20, alignItems: "center" }}>
                  <span>{d.name}</span><small style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>{d.idea} <Arrow /></small>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand light title="Let's work together." />
    </>
  );
}
