import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Socials from "@/components/Socials";
import { Words } from "@/components/Reveal";
import { CONTACT, waLink, stock } from "@/data/ads";

export const metadata = { title: "Contact", description: "Contact ADS Digitals & Events — Punniyam, Arumanai. Call, WhatsApp or email to request a consultation." };

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact" short title={["Request a", <span key="s" className="serif">consultation.</span>]} img={stock("stage-white-sofa")}>
        <p>Plan My Event · Grow My Business · Build My Website · Enquire About Property</p>
      </PageHero>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow">Reach ADS</span>
            <Words as="h2" className="h3 mt-s" text="Call, WhatsApp or email — we'll take it from there." />
            <div className="cinfo">
              {CONTACT.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`}><span>{p.display}</span><small>Call</small></a>)}
              <a href={waLink()} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><small>Chat</small></a>
              <a href={`mailto:${CONTACT.email}`}><span style={{ wordBreak: "break-all" }}>{CONTACT.email}</span><small>Email</small></a>
              <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer"><span>{CONTACT.location}</span><small>Location</small></a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><span className="eyebrow">ADS on social</span><Socials /></div>
      </section>
    </>
  );
}
