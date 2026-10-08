import Image from "next/image";
import Link from "next/link";
import Tilt from "./Tilt";

export default function PropertyCard({ p }) {
  return (
    <Tilt as="article" className="prop" max={5}>
      <Link href={`/real-estate/${p.id}`}>
        <div className="ph"><Image src={p.cover} alt={p.title} width={1200} height={900} sizes="(max-width: 900px) 100vw, 33vw" /></div>
        <div className="bd">
          <small>{p.category}{p.location ? ` · ${p.location}` : ""}</small>
          <h3>{p.title}</h3>
          {p.status && <p style={{ margin: "8px 0 0", color: "#555", fontSize: 14 }}>{p.status}</p>}
        </div>
      </Link>
    </Tilt>
  );
}
