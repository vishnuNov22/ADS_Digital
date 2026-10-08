export const Arrow = (p) => (
  <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.43 1.32-1.97 1.37-.5.05-1.13.07-1.83-.11a16.7 16.7 0 0 1-1.66-.61c-2.92-1.26-4.82-4.19-4.97-4.39-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.14.49.22.56.34.07.12.07.7-.17 1.38Z" />
  </svg>
);
export const Close = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /></svg>
);
export const Chev = ({ dir = "r" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ transform: dir === "l" ? "scaleX(-1)" : undefined }}><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Line icons for services (monochrome)
const P = {
  camera: "M4 8h3l2-3h6l2 3h3v11H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  film: "M4 5h16v14H4z M8 5v14 M16 5v14 M4 9h4 M4 15h4 M16 9h4 M16 15h4",
  spark: "M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5 18 18 M6 18l2.5-2.5 M15.5 8.5 18 6",
  flower: "M12 12m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0 M12 4a3 3 0 0 1 0 5.5 3 3 0 0 1 0-5.5z M12 14.5a3 3 0 0 1 0 5.5 3 3 0 0 1 0-5.5z M4 12a3 3 0 0 1 5.5 0A3 3 0 0 1 4 12z M14.5 12a3 3 0 0 1 5.5 0 3 3 0 0 1-5.5 0z",
  dish: "M3 16h18 M5 16a7 7 0 0 1 14 0 M12 6v3 M4 19h16",
  stage: "M3 20h18 M5 20v-6h14v6 M7 14V6 M17 14V6 M7 6l5 4 5-4",
  screen: "M3 5h18v11H3z M8 20h8 M12 16v4 M6 8h3 M6 11h6",
  glass: "M8 3h8l-1 7a3 3 0 0 1-6 0z M12 13v7 M8 20h8",
  check: "M4 12l5 5L20 6",
  social: "M7 12a3 3 0 1 0 0 .01 M17 6a3 3 0 1 0 0 .01 M17 18a3 3 0 1 0 0 .01 M9.6 10.6l4.8-3 M9.6 13.4l4.8 3",
  pen: "M4 20l4-1 11-11-3-3L5 16z M14 6l3 3",
  layers: "M12 3l9 5-9 5-9-5z M3 13l9 5 9-5",
  reel: "M4 4h16v16H4z M10 9l5 3-5 3z",
  meta: "M3 15c2-8 5-8 9 0s7 8 9 0",
  search: "M11 11m-6 0a6 6 0 1 0 12 0 6 6 0 1 0-12 0 M20 20l-4.5-4.5",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  mega: "M3 10v4h4l7 5V5L7 10z M18 9a4 4 0 0 1 0 6",
  code: "M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16",
  bag: "M5 8h14l-1 12H6z M9 8V6a3 3 0 0 1 6 0v2",
  phone: "M8 2h8v20H8z M11 18h2",
  ui: "M3 4h18v16H3z M3 9h18 M9 9v11",
  wrench: "M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z",
  home: "M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6",
  tower: "M6 21V4h8v17 M14 9h4v12 M3 21h18 M9 8h2 M9 12h2 M9 16h2",
  plot: "M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3z M9 4v13 M15 7v13",
  villa: "M3 21h18 M4 21V11l6-5 6 5v10 M16 13h4v8 M8 21v-5h4v5",
  key: "M8 15a4 4 0 1 1 3-6.7L21 8v4h-3v3h-3l-1.6-1.4A4 4 0 0 1 8 15z",
  web: "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0 M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18",
};
export function SIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name] || P.spark} />
    </svg>
  );
}
export const SERVICE_ICON = {
  "Wedding Photography": "camera", "Wedding Videography": "film", "Event Photography & Videography": "camera",
  "Wedding & Event Decoration": "flower", "Catering & Food Services": "dish", "Stage & Venue Setup": "stage",
  "LED Walls & Event Production": "screen", "Private Parties & Corporate Events": "glass", "Complete Event Management": "check",
  "Social Media Management": "social", "Content Creation": "pen", "Graphic Design": "layers", "Reels & Video Production": "reel",
  "Meta Advertising": "meta", "Google Advertising": "search", SEO: "search", "Influencer Marketing": "star", "Brand Promotion": "mega",
  "Website Design": "ui", "Custom Website Development": "code", "Business Websites": "web", "E-commerce Websites": "bag",
  "Responsive Web Design": "phone", "UI/UX Design": "ui", "Website Maintenance": "wrench",
  "Residential Properties": "home", "Commercial Properties": "tower", "Land & Plots": "plot", "Houses & Villas": "villa",
  "Property Promotion": "mega", "Property Marketing": "social", "Buyer & Seller Assistance": "key",
};
