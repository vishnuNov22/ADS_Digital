import Hero3D from "@/components/Hero3D";
import Marquee from "@/components/Marquee";
import Divisions from "@/components/Divisions";
import DimensionTunnel from "@/components/DimensionTunnel";
import Tilt from "@/components/Tilt";
import Image from "next/image";
import HScrollGallery from "@/components/HScrollGallery";
import Why from "@/components/Why";
import Socials from "@/components/Socials";
import CTABand from "@/components/CTABand";
import Reveal, { Words } from "@/components/Reveal";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { BRAND, PHOTOS, stock } from "@/data/ads";

const IDEAS = [
  { img: "stage-decor-gold", tag: "Weddings & Events", href: "/events" },
  { img: "studio-shoot", tag: "Digital Marketing & Websites", href: "/digital-marketing" },
  { img: "villa-pool", tag: "Real Estate", href: "/real-estate" },
];

const HOME_GALLERY = ["tea-stall-couple", "lotus-portrait", "jasmine-portrait", "gramophone-couple", "lakeside-couple", "event-guest-stage"];

export default function Home() {
  const gallery = HOME_GALLERY.map((id) => PHOTOS.find((p) => p.id === id));
  return (
    <>
      <Hero3D />
      <Marquee items={["Weddings & Events", "Digital Marketing", "Websites", "Real Estate", "One Team", "Multiple Solutions"]} />

      <section className="section light" aria-labelledby="intro">
        <div className="wrap">
          <span className="eyebrow">Discover ADS</span>
          <Words as="h2" className="statement mt-m" text={BRAND.summary} />
          <div className="ideas3d">
            {BRAND.ideas.map((t, i) => {
              const im = stock(IDEAS[i].img);
              return (
                <Reveal key={t} delay={i * 0.1}>
                  <Link href={IDEAS[i].href} className="idea-link" aria-label={`${t} — ${IDEAS[i].tag}`}><Tilt className="idea" max={10}>
                    <div className="idea-img"><Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes="(max-width: 800px) 100vw, 33vw" /></div>
                    <div className="idea-body">
                      <b>0{i + 1} — {IDEAS[i].tag}</b>
                      <p>{t}</p>
                      <span className="idea-go"><Arrow /></span>
                    </div>
                  </Tilt></Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Divisions />

      <DimensionTunnel />

      <HScrollGallery
        items={gallery}
        intro={
          <>
            <span className="eyebrow">Weddings &amp; Events</span>
            <Words as="h2" className="h2 mt-s" text="Moments, captured with care." />
            <p className="lead">Wedding, couple and event photography by the ADS team.</p>
            <div className="mt-s"><Link className="btn ghost sm" href="/gallery">Full gallery <Arrow /></Link></div>
          </>
        }
      />

      <Why />

      <section className="section" aria-labelledby="social">
        <div className="wrap">
          <div className="row-between">
            <div>
              <span className="eyebrow">Follow the work</span>
              <Words as="h2" className="h2 mt-s" text="Three brands. One ADS." />
            </div>
            <p className="lead" style={{ margin: 0, maxWidth: "36ch" }}>ADS Digitals &amp; Advertisements, ADS Weddings and ADS Real Estate.</p>
          </div>
          <Socials />
        </div>
      </section>

      <CTABand light title="Let's create something memorable." />
    </>
  );
}
