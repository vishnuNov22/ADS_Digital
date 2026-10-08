import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";
import HScrollGallery from "@/components/HScrollGallery";
import CTABand from "@/components/CTABand";
import Magnetic from "@/components/Magnetic";
import Reveal, { Words } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import Link from "next/link";
import { DIVISIONS, PHOTOS, photo, stock } from "@/data/ads";
import Image from "next/image";
import Tilt from "@/components/Tilt";

export const metadata = {
  title: "Weddings & Events",
  description: "ADS Weddings & Events — wedding photography & videography, decoration, catering, stage & venue setup, LED walls and complete event management.",
};

const D = DIVISIONS[0];
const NOTES = {
  "Wedding Photography": "Portraits, candids and the details of your day.",
  "Wedding Videography": "Your wedding, told as a film.",
  "Event Photography & Videography": "Stage, guests and every key moment.",
  "Wedding & Event Decoration": "Venue styling and décor for your theme.",
  "Catering & Food Services": "Food service planned around your guests.",
  "Stage & Venue Setup": "Stage design and venue arrangement.",
  "LED Walls & Event Production": "Screens, visuals and production on the day.",
  "Private Parties & Corporate Events": "Celebrations and company events.",
  "Complete Event Management": "One team from planning to execution.",
};

const CAPS = [
  { t: "Decoration & venue transformation", p: "Wedding and event décor that turns a venue into your setting.", img: "stage-red-mandap" },
  { t: "Stage, LED walls & production", p: "Stage and venue setup, LED walls and event production.", img: "led-truss" },
  { t: "Catering & food presentation", p: "Catering and food services for weddings, parties and events.", img: "catering-spread" },
  { t: "Private parties & corporate events", p: "From intimate celebrations to corporate gatherings.", img: "concert-lights" },
];

export default function EventsPage() {
  const hero = photo("bridal-portrait");
  const showcase = PHOTOS.filter((p) => p.id !== "bridal-portrait");
  return (
    <>
      <PageHero crumb="Weddings & Events" img={{ ...hero, pos: "50% 30%" }} title={["Weddings", <span key="s" className="serif">&amp; Events</span>]}>
        <p>{D.positioning} Photography, film, décor, catering, stage and production — handled by one ADS team.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Magnetic><Link className="btn" href="/contact?service=Events">Plan Your Event <Arrow /></Link></Magnetic>
          <Magnetic><a className="btn ghost" href="#services">Services</a></Magnetic>
        </div>
      </PageHero>

      <section id="services" className="section light">
        <div className="wrap">
          <div className="row-between">
            <div><span className="eyebrow">What we do</span><Words as="h2" className="h2 mt-s" text="Every part of the celebration." /></div>
            <p className="lead" style={{ margin: 0, maxWidth: "38ch" }}>{D.positioning}</p>
          </div>
          <ServiceGrid services={D.services} notes={NOTES} />
        </div>
      </section>

      <HScrollGallery
        items={showcase}
        intro={<><span className="eyebrow">Photography &amp; videography</span><Words as="h2" className="h2 mt-s" text="Through the ADS lens." /><p className="lead">Weddings, couples and events. Tap any frame to view it fullscreen.</p></>}
      />

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Beyond the camera</span>
          <Words as="h2" className="h2 mt-s" text="Venue, stage, food and production." />
          <div className="caps">
            {CAPS.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <Tilt className="cap" max={8}>
                  <div className="cap-img"><Image src={stock(c.img).src} alt={stock(c.img).alt} width={stock(c.img).w} height={stock(c.img).h} sizes="(max-width: 1000px) 50vw, 25vw" /></div>
                  <div className="cap-body"><h3>{c.t}</h3><p>{c.p}</p></div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap split">
          <div>
            <span className="eyebrow">End-to-end</span>
            <Words as="h2" className="h2 mt-s" text="From planning to execution." />
            <p className="lead mt-s">Bring one team in early and we&apos;ll handle the event end-to-end — or pick just the services you need.</p>
            <div className="mt-m" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Magnetic><Link className="btn" href="/contact?service=Events">Plan Your Event <Arrow /></Link></Magnetic>
              <Link className="btn ghost" href="/gallery">Full gallery</Link>
            </div>
          </div>
          <ul className="list-lines">
            {["Photography & film", "Decoration & venue", "Catering & food", "Stage, LED & production", "Event management"].map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.06}>{s}<small>0{i + 1}</small></Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand eyebrow="Weddings & Events" title="Let's plan your celebration." cta="Plan Your Event" service="Events" message="Hello ADS, I'd like to plan an event." />
    </>
  );
}
