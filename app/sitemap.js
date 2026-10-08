import { PROPERTIES, PROJECTS } from "@/data/ads";
const BASE = "https://ads-digitals.vercel.app";
export default function sitemap() {
  const routes = ["", "/services", "/events", "/digital-marketing", "/web-development", "/real-estate", "/projects", "/gallery", "/about", "/contact"];
  return [
    ...routes.map((r) => ({ url: `${BASE}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.8 })),
    ...PROPERTIES.map((p) => ({ url: `${BASE}/real-estate/${p.id}` })),
    ...PROJECTS.map((p) => ({ url: `${BASE}/projects/${p.slug}` })),
  ];
}
