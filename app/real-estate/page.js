import ArchHero from "@/components/ArchHero";
import PropertyCard from "@/components/PropertyCard";
import CTABand from "@/components/CTABand";
import Magnetic from "@/components/Magnetic";
import Tilt from "@/components/Tilt";
import Reveal, { Words } from "@/components/Reveal";
import { Arrow, WhatsApp } from "@/components/Icons";
import Link from "next/link";
import { DIVISIONS, PROPERTIES, PROPERTY_CATEGORIES, SOCIALS, waLink, stock } from "@/data/ads";
import Image from "next/image";
const CAT_IMG = { Residential: "residence-facade", Commercial: "glass-office", "Land & Plots": "plots-aerial", "Houses & Villas": "villa-pool" };

export const metadata = {
  title: "Real Estate",
  description: "ADS Real Estate — residential and commercial properties, land & plots, houses & villas, property promotion, marketing and buyer & seller assistance.",
};

const D = DIVISIONS[2];
const ig = SOCIALS.find((s) => s.key === "realestate");

const ILL = {
  Residential: <><path className="draw" d="M20 140V70l60-45 60 45v70M50 140V95h30v45M100 95h22v20h-22z" /><path className="draw" d="M5 140h190" /></>,
  Commercial: <><path className="draw" d="M30 140V20h60v120M90 140V55h50v85M45 35h10M65 35h10M45 55h10M65 55h10M45 75h10M65 75h10M45 95h10M65 95h10M105 70h8M120 70h8M105 90h8M120 90h8" /><path className="draw" d="M5 140h190" /></>,
  "Land & Plots": <><path className="draw" d="M10 120l50-25 60 15 70-30M10 120l40 20 70-15 70 15M60 95l-10 45M120 110l0 15" /><path className="draw" d="M150 45v30M150 45l18 7-18 7" /></>,
  "Houses & Villas": <><path className="draw" d="M15 140V85l45-35 45 35v55M105 100h70v40M105 100l35-28 35 28M45 140v-30h28v30M130 115h20v12h-20z" /><path className="draw" d="M5 140h190" /></>,
};

export default function RealEstatePage() {
  return (
    <>
      <ArchHero title={["Property", <span key="s" className="serif">made simple.</span>]} text={`ADS Real Estate — residential, commercial, land & plots and houses & villas. ${D.positioning}`} />

      <section className="section light">
        <div className="wrap">
          <div className="row-between">
            <div><span className="eyebrow">Categories</span><Words as="h2" className="h2 mt-s" text="Find the right property." /></div>
            <p className="lead" style={{ margin: 0, maxWidth: "36ch" }}>Tell us what you&apos;re looking for — or what you want to sell — and we&apos;ll take it from there.</p>
          </div>
          <div className="cat-grid">
            {PROPERTY_CATEGORIES.map((c, i) => (
              <Reveal key={c} delay={i * 0.08} style={{ height: "100%" }}>
                <Tilt className="cat" style={{ height: "100%" }}>
                  <div className="cat-img"><Image src={stock(CAT_IMG[c]).src} alt={stock(CAT_IMG[c]).alt} width={stock(CAT_IMG[c]).w} height={stock(CAT_IMG[c]).h} sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div>
                  <div>
                    <h3>{c}</h3>
                    <p>Enquire about {c.toLowerCase()} with ADS.</p>
                    <a className="link-u" href={waLink(`Hello ADS Real Estate, I'm interested in ${c}.`)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6, alignItems: "center", marginTop: 14, fontWeight: 600, fontSize: 14 }}>Enquire <Arrow /></a>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <div id="listings" style={{ scrollMarginTop: 100 }}>
            {PROPERTIES.length > 0 ? (
              <>
                <h2 className="h3" style={{ marginTop: 100 }}>Current listings</h2>
                <div className="prop-grid">{PROPERTIES.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
              </>
            ) : (
              <Reveal className="empty">
                <div>
                  <span className="eyebrow">Listings</span>
                  <h2 className="h3 mt-s">New listings are added here as they&apos;re published.</h2>
                  <p className="lead" style={{ marginBottom: 0 }}>For available properties right now, message ADS Real Estate{ig?.handle ? <> or follow <a className="link-u" href={ig.url} target="_blank" rel="noopener noreferrer">{ig.handle}</a> on Instagram</> : null}.</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <Magnetic><a className="btn" href={waLink("Hello ADS Real Estate, what properties are currently available?")} target="_blank" rel="noopener noreferrer"><WhatsApp width="18" height="18" /> Ask on WhatsApp</a></Magnetic>
                  {ig?.url && <a className="btn ghost" href={ig.url} target="_blank" rel="noopener noreferrer">Instagram</a>}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">For owners &amp; sellers</span>
            <Words as="h2" className="h2 mt-s" text="Promote and market your property." />
            <p className="lead mt-s">ADS Real Estate brings the creative and digital strength of ADS to property — presenting your property well and getting it in front of the right buyers.</p>
          </div>
          <div>
            <Reveal base="img-rv" className="frame" style={{ aspectRatio: "16/10" }}><Image src={stock("house-pool").src} alt={stock("house-pool").alt} width={1600} height={1200} sizes="(max-width: 900px) 100vw, 50vw" /></Reveal>
            <ul className="list-lines">
              {["Property Promotion", "Property Marketing", "Buyer & Seller Assistance"].map((s, i) => (
                <Reveal as="li" key={s} delay={i * 0.06}>{s}<small>0{i + 1}</small></Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="focus-cards" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 0 }}>
            <Reveal base="fcard" className="inv">
              <div className="vis"><Image src={stock("house-keys").src} alt={stock("house-keys").alt} width={1500} height={1000} sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <span className="eyebrow">Buying</span>
              <div><h3>Looking for a property?</h3><p>Residential, commercial, land &amp; plots or houses &amp; villas — tell us what you need.</p>
                <div className="mt-m"><Link className="btn" href="/contact?service=Real%20Estate" style={{ "--bg": "#060606", "--fg": "#f4f3f0" }}>Enquire as Buyer <Arrow /></Link></div></div>
            </Reveal>
            <Reveal base="fcard" delay={0.1}>
              <div className="vis"><Image src={stock("living-room").src} alt={stock("living-room").alt} width={1500} height={1000} sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <span className="eyebrow">Selling</span>
              <div><h3>Want to sell or promote?</h3><p>We help sellers with property promotion, marketing and enquiries.</p>
                <div className="mt-m"><a className="btn" href={waLink("Hello ADS Real Estate, I'd like to sell / promote a property.")} target="_blank" rel="noopener noreferrer">Enquire as Seller <Arrow /></a></div></div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand eyebrow="ADS Real Estate" title="Let's talk property." cta="Enquire About Property" service="Real Estate" message="Hello ADS Real Estate, I'd like to enquire about a property." light />
    </>
  );
}
