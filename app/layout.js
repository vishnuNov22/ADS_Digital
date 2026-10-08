import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Chrome from "@/components/Chrome";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--f-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://ads-digitals.vercel.app"),
  title: { default: "ADS Digitals & Events — Creative Solutions. Memorable Events. Digital Growth.", template: "%s — ADS Digitals & Events" },
  description: "ADS Digitals & Events — weddings & events, digital marketing, website design & development, and real estate. One Team. Multiple Solutions.",
  openGraph: { title: "ADS Digitals & Events", description: "Creative Solutions. Memorable Events. Digital Growth.", images: ["/og.jpg"], type: "website" },
  icons: { icon: "/icon.svg" },
};
export const viewport = { themeColor: "#060606" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Preloader />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Chrome />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
