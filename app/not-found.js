import Link from "next/link";
export default function NotFound() {
  return (
    <section className="phero short">
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1 className="display mt-s">This page<br /><span className="serif">isn't here.</span></h1>
        <div className="mt-m"><Link className="btn" href="/">Back to ADS</Link></div>
      </div>
    </section>
  );
}
