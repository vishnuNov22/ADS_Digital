import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";
import Devices from "@/components/Devices";
import CTABand from "@/components/CTABand";
import Magnetic from "@/components/Magnetic";
import Reveal, { Words } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import Link from "next/link";
import { DIVISIONS, stock } from "@/data/ads";
import Image from "next/image";

export const metadata = {
  title: "Website Design & Development",
  description: "ADS website design & development — business websites, e-commerce, responsive design, UI/UX and website maintenance.",
};

const W = DIVISIONS[1].web;
const NOTES = {
  "Website Design": "Clean, modern design that reflects your brand.",
  "Custom Website Development": "Built around your specific needs.",
  "Business Websites": "Show your services and help customers reach you.",
  "E-commerce Websites": "Sell your products online.",
  "Responsive Web Design": "Works on phones, tablets and desktops.",
  "UI/UX Design": "Layouts that are easy and clear to use.",
  "Website Maintenance": "Updates and care after launch.",
};
const STEPS = [
  { t: "Understand", p: "Your business, customers and goals for the site." },
  { t: "Design", p: "UI/UX and visual design, reviewed with you." },
  { t: "Develop", p: "A responsive build — business site or e-commerce." },
  { t: "Launch & maintain", p: "Go live, then keep it updated." },
];

export default function WebPage() {
  return (
    <>
      <PageHero crumb="Websites" title={["Websites that", <span key="s" className="serif">work for you.</span>]}
        img={stock("desktop-site")}>
        <p>{W.positioning}</p>
        <Magnetic><Link className="btn" href="/contact?service=Website">Build My Website <Arrow /></Link></Magnetic>
      </PageHero>

      <section className="section light">
        <div className="wrap">
          <span className="eyebrow">Every screen</span>
          <Words as="h2" className="h2 mt-s" text="Designed for laptop, tablet and phone." />
          <Devices />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Design &amp; development</span>
            <Words as="h2" className="h2 mt-s" text="Professional on the outside. Solid underneath." />
            <p className="lead mt-s">Business websites, e-commerce stores, responsive layouts and UI/UX — designed and developed by ADS, and maintained after launch.</p>
          </div>
          <Reveal className="code" aria-hidden="true">
            <div><span className="c">{"// your-business.com"}</span></div>
            <div><span className="k">const</span> site = {"{"}</div>
            <div>&nbsp;&nbsp;design: <span className="s">&quot;on-brand&quot;</span>,</div>
            <div>&nbsp;&nbsp;layout: <span className="s">&quot;responsive&quot;</span>,</div>
            <div>&nbsp;&nbsp;store: <span className="k">true</span>,</div>
            <div>&nbsp;&nbsp;care: <span className="s">&quot;maintained&quot;</span>,</div>
            <div>{"};"}</div>
            <div><span className="k">launch</span>(site)<span className="cur" /></div>
          </Reveal>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <Words as="h2" className="h2 mt-s" text="What we build." />
          <ServiceGrid services={W.services} notes={NOTES} />
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}><h3>{s.t}</h3><p>{s.p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand eyebrow="Website Design & Development" title="Let's build your website." cta="Build My Website" service="Website" message="Hello ADS, I'd like a website." />
    </>
  );
}
