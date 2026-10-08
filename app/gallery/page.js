import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";
import { PHOTOS } from "@/data/ads";

export const metadata = { title: "Gallery", description: "Wedding, couple and event photography by ADS Weddings & Events." };

export default function GalleryPage() {
  return (
    <>
      <PageHero crumb="Gallery" short title={["The", <span key="s" className="serif">gallery.</span>]}
        bg={<div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 60% 10%, #1b1b1b, #060606 70%)" }} />}>
        <p>Wedding, couple and event photography. Select any photo to view it fullscreen — use the arrow keys or swipe.</p>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><Gallery items={PHOTOS} /></div>
      </section>
      <CTABand light eyebrow="Weddings & Events" title="Let's capture your day." cta="Plan Your Event" service="Events" message="Hello ADS, I'd like to book photography." />
    </>
  );
}
