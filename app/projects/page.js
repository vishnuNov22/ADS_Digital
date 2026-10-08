import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Tilt from "@/components/Tilt";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { Arrow } from "@/components/Icons";
import { PROJECTS } from "@/data/ads";

export const metadata = { title: "Projects", description: "Projects and case studies from ADS Digitals & Events." };

export default function ProjectsPage() {
  return (
    <>
      <PageHero crumb="Projects" short title={["Selected", <span key="s" className="serif">projects.</span>]}
        bg={<div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 30% 20%, #1b1b1b, #060606 70%)" }} />}>
        <p>Events, campaigns, websites and properties delivered by ADS.</p>
      </PageHero>
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="wrap">
          {PROJECTS.length ? (
            <div className="prop-grid">
              {PROJECTS.map((p) => (
                <Tilt as="article" key={p.slug} className="prop" max={5}>
                  <Link href={`/projects/${p.slug}`}>
                    <div className="ph"><Image src={p.cover} alt={p.title} width={1200} height={900} sizes="(max-width: 900px) 100vw, 33vw" /></div>
                    <div className="bd"><small>{p.category}</small><h3>{p.title}</h3></div>
                  </Link>
                </Tilt>
              ))}
            </div>
          ) : (
            <Reveal className="empty dark">
              <div>
                <span className="eyebrow">Case studies</span>
                <h2 className="h3 mt-s">Project stories are being prepared.</h2>
                <p className="lead" style={{ marginBottom: 0 }}>Meanwhile, browse our photography — or tell us about the project you have in mind.</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <Link className="btn" href="/gallery">View Gallery <Arrow /></Link>
                <Link className="btn ghost" href="/contact">Start a Project</Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <CTABand light title="Have a project in mind?" />
    </>
  );
}
