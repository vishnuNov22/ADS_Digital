import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";
import { PROJECTS } from "@/data/ads";

export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  return p ? { title: p.title, description: p.overview } : { title: "Project" };
}

export default function ProjectPage({ params }) {
  const i = PROJECTS.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const p = PROJECTS[i];
  const related = PROJECTS.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const gallery = (p.gallery || []).map((src, k) => ({ id: `${p.slug}-${k}`, src, w: 1600, h: 1200, alt: `${p.title} — ${k + 1}`, caption: p.title, category: p.category }));
  return (
    <>
      <section className="phero short">
        <div className="bg"><Image src={p.cover} alt={p.title} fill priority sizes="100vw" style={{ objectFit: "cover" }} /></div>
        <div className="wrap">
          <div className="crumb"><Link href="/projects" className="link-u">Projects</Link><span>/</span><span>{p.category}</span></div>
          <h1 className="display">{p.title}</h1>
          {(p.location || p.date) && <p className="lead">{[p.location, p.date].filter(Boolean).join(" · ")}</p>}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {p.overview && <p className="statement">{p.overview}</p>}
          {p.services?.length > 0 && <ul className="chips">{p.services.map((s) => <li key={s}>{s}</li>)}</ul>}
          {gallery.length > 0 && <Gallery items={gallery} filters={false} />}
          {related.length > 0 && (
            <div className="mt-l"><span className="eyebrow">Related</span>
              <ul className="list-lines">{related.map((r) => <li key={r.slug}><Link href={`/projects/${r.slug}`}>{r.title}</Link><small>{r.category}</small></li>)}</ul>
            </div>
          )}
        </div>
      </section>
      <CTABand light title="Want something like this?" />
    </>
  );
}
