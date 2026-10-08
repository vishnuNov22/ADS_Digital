"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function Gallery({ items, filters = true }) {
  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((p) => p.category)))], [items]);
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(-1);
  const list = cat === "All" ? items : items.filter((p) => p.category === cat);
  return (
    <>
      {filters && (
        <div className="filters" role="group" aria-label="Filter photos">
          {cats.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      )}
      <div className="masonry">
        {list.map((p, i) => (
          <Reveal as="figure" key={p.id} base="img-rv" delay={(i % 3) * 0.08}>
            <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            <figcaption><span>{p.caption}</span></figcaption>
            <button className="open" type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`} />
          </Reveal>
        ))}
      </div>
      {open > -1 && <Lightbox items={list} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </>
  );
}
