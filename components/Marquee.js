export default function Marquee({ items, light }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee ${light ? "light" : ""}`} aria-hidden="true">
      <div className="track">
        {list.map((t, i) => <span key={i} className={i % 2 ? "serif" : ""}>{t}</span>)}
      </div>
    </div>
  );
}
