"use client";
import { useEffect, useState } from "react";
import { CONTACT, FORM_SERVICES } from "@/data/ads";
import { Arrow, WhatsApp } from "./Icons";

// Lead form — composes the enquiry and opens WhatsApp or the email app (no server needed).
export default function ContactForm() {
  const [service, setService] = useState("Events");
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && FORM_SERVICES.includes(s)) setService(s);
  }, []);

  const body = () =>
    `Hello ADS,\n\nService: ${service}\nName: ${f.name.trim()}\nPhone: ${f.phone.trim()}\n\n${f.message.trim()}`;
  const valid = () => {
    if (!f.name.trim()) return "Please enter your name.";
    if (f.phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
    return "";
  };
  const send = (via) => (e) => {
    e.preventDefault();
    const v = valid(); setErr(v); if (v) return;
    if (via === "wa") window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body())}`, "_blank", "noopener");
    else window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${service} enquiry — ${f.name.trim()}`)}&body=${encodeURIComponent(body())}`;
  };
  const upd = (k) => (e) => setF((o) => ({ ...o, [k]: e.target.value }));

  return (
    <form className="form" onSubmit={send("wa")} noValidate>
      <span className="eyebrow">I'm interested in</span>
      <div className="pick" role="radiogroup" aria-label="Service">
        {FORM_SERVICES.map((s) => (
          <label key={s}><input type="radio" name="service" value={s} checked={service === s} onChange={() => setService(s)} /><span>{s}</span></label>
        ))}
      </div>
      <div className="field"><input id="cf-name" placeholder=" " value={f.name} onChange={upd("name")} autoComplete="name" required /><label htmlFor="cf-name">Your name</label></div>
      <div className="field"><input id="cf-phone" placeholder=" " value={f.phone} onChange={upd("phone")} autoComplete="tel" inputMode="tel" required /><label htmlFor="cf-phone">Phone number</label></div>
      <div className="field"><textarea id="cf-msg" placeholder=" " value={f.message} onChange={upd("message")} rows={4} /><label htmlFor="cf-msg">Tell us about your event, brand, website or property</label></div>
      <p className="err" role="alert">{err}</p>
      <div className="sendrow">
        <button className="btn" type="submit"><WhatsApp width="18" height="18" /> Send on WhatsApp</button>
        <button className="btn ghost" type="button" onClick={send("mail")}>Send by Email <Arrow /></button>
      </div>
      <p className="note">Your enquiry opens in WhatsApp or your email app, ready to send to ADS.</p>
    </form>
  );
}
