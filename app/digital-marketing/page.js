import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";
import SocialWall from "@/components/SocialWall";
import CTABand from "@/components/CTABand";
import Magnetic from "@/components/Magnetic";
import Reveal, { Words } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import Link from "next/link";
import { DIVISIONS, stock } from "@/data/ads";
import Image from "next/image";

export const metadata = {
  title: "Digital Marketing",
  description: "ADS Digitals & Advertisements — social media management, content creation, graphic design, reels, Meta & Google advertising, SEO, influencer marketing and brand promotion.",
};

const D = DIVISIONS[1];
const NOTES = {
  "Social Media Management": "Planning, posting and managing your channels.",
  "Content Creation": "Posts, stories and campaigns for your brand.",
  "Graphic Design": "Creatives, branding and campaign graphics.",
  "Reels & Video Production": "Short-form video made for social.",
  "Meta Advertising": "Facebook & Instagram ad campaigns.",
  "Google Advertising": "Search and display campaigns on Google.",
  SEO: "Helping customers find you in search.",
  "Influencer Marketing": "Partnering your brand with creators.",
  "Brand Promotion": "Getting your brand seen, online and offline.",
};
const FOCUS = [
  { t: "Social & content", p: "Social media management, content creation, graphic design, reels and video.", img: "production-crew" },
  { t: "Advertising & search", p: "Meta advertising, Google advertising and SEO.", img: "social-scroll", inv: true },
  { t: "Brand growth", p: "Influencer marketing and brand promotion.", img: "creator-camera" },
];

export default function DigitalPage() {
  return (
    <>
      <PageHero crumb="Digital Marketing" img={{ src: "/ads-chrome.jpg", w: 1080, h: 1080, alt: "ADS logo in chrome", pos: "50% 45%" }} title={["Building", <span key="s" className="serif">Brands.</span>]}>
        <p>Social media, content, advertising and SEO from ADS Digitals &amp; Advertisements — creative work that helps your brand grow.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Magnetic><Link className="btn" href="/contact?service=Digital%20Marketing">Grow Your Brand <Arrow /></Link></Magnetic>
          <Magnetic><Link className="btn ghost" href="/web-development">Websites</Link></Magnetic>
        </div>
      </PageHero>

      <section className="section light">
        <div className="wrap">
          <div className="row-between">
            <div><span className="eyebrow">Content, always on</span><Words as="h2" className="h2 mt-s" text="Content made for the feed." /></div>
            <p className="lead" style={{ margin: 0, maxWidth: "38ch" }}>Posts, reels, graphics and campaigns — planned, designed and published for your brand.</p>
          </div>
          <SocialWall />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">How we help brands grow</span>
          <Words as="h2" className="h2 mt-s" text="Create. Promote. Grow." />
          <div className="focus-cards">
            {FOCUS.map((f, i) => (
              <Reveal key={f.t} base="fcard" className={f.inv ? "inv" : ""} delay={i * 0.12}>
                <div className="vis"><Image src={stock(f.img).src} alt={stock(f.img).alt} width={stock(f.img).w} height={stock(f.img).h} sizes="(max-width: 900px) 100vw, 33vw" /></div>
                <div><h3>{f.t}</h3><p>{f.p}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="row-between">
            <div><span className="eyebrow">Services</span><Words as="h2" className="h2 mt-s" text="Digital marketing services." /></div>
            <Link className="btn ghost sm" href="/web-development">Website Design &amp; Development <Arrow /></Link>
          </div>
          <ServiceGrid services={D.services} notes={NOTES} />
        </div>
      </section>

      <CTABand eyebrow="ADS Digitals & Advertisements" title="Ready to grow your brand?" cta="Grow Your Brand" service="Digital Marketing" message="Hello ADS, I'd like help with digital marketing." />
    </>
  );
}
