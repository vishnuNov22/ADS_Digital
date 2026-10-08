import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";
import { PROPERTIES } from "@/data/ads";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
}
export function generateMetadata({ params }) {
  const p = PROPERTIES.find((x) => x.id === params.id);
  return p ? { title: p.title, description: p.description, openGraph: { images: [p.cover] } } : { title: "Property" };
}

export default function PropertyDetail({ params }) {
  const p = PROPERTIES.find((x) => x.id === params.id);
  if (!p) notFound();
  // Only facts that were supplied are shown
  const facts = [["Category", p.category], ["Location", p.location], ["Price", p.price], ["Area", p.area], ["Status", p.status]].filter(([, v]) => v);
  const gallery = (p.gallery || []).map((src, i) => ({ id: `${p.id}-${i}`, src, w: 1600, h: 1200, alt: `${p.title} — photo ${i + 1}`, caption: `${p.title} — ${i + 1}`, category: p.category }));
  return (
    <>
      <section className="phero short">
        <div className="bg"><Image src={p.cover} alt={p.title} fill priority sizes="100vw" style={{ objectFit: "cover" }} /></div>
        <div className="wrap">
          <div className="crumb"><Link href="/real-estate" className="link-u">Real Estate</Link><span>/</span><span>{p.category}</span></div>
          <h1 className="display">{p.title}</h1>
        </div>
      </section>
      <section className="section light">
        <div className="wrap">
          {facts.length > 0 && <div className="facts">{facts.map(([k, v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}</div>}
          {p.description && <p className="lead">{p.description}</p>}
          {p.features?.length > 0 && <ul className="chips">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>}
          {gallery.length > 0 && <Gallery items={gallery} filters={false} />}
        </div>
      </section>
      <CTABand eyebrow="Interested?" title={`Enquire about ${p.title}.`} cta="Enquire About Property" service="Real Estate" message={`Hello ADS Real Estate, I'm interested in: ${p.title}`} />
    </>
  );
}
