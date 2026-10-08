import { LOGO_PATH, LOGO_VIEWBOX, MARK_PATH, MARK_HEIGHT } from "@/lib/logoPath";

// Full ADS logo (mark + "DIGITALS & ADVERTISEMENTS"), traced from the supplied artwork.
export function Logo({ className, title = "ADS Digitals & Advertisements" }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={title}>
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

// Mark only (the three ADS letterforms)
export function Mark({ className, title = "ADS" }) {
  const w = LOGO_VIEWBOX.split(" ")[2];
  return (
    <svg className={className} viewBox={`0 0 ${w} ${MARK_HEIGHT}`} role="img" aria-label={title}>
      <path d={MARK_PATH} fill="currentColor" />
    </svg>
  );
}
