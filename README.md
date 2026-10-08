# ADS Digitals & Events — Website (Next.js + three.js)

Premium black & white website for ADS Digitals & Events, built around the ADS logo.

**Creative Solutions. Memorable Events. Digital Growth.** One Team. Multiple Solutions.

## What's inside

- **3D hero.** The ADS logo is traced from the supplied artwork and extruded into chrome 3D (`lib/heroScene.js`).
  - The logo pieces assemble on load and follow the pointer.
  - Behind the logo, a particle field morphs between three motifs: Events (light and fabric), Digitals (interface layers) and Real Estate (architectural towers).
- **Real Estate 3D.** A white architectural model rises from a survey-grid ground with soft shadows (`lib/archScene.js`).
- **Motion system.** It includes:
  - a preloader with the drawn logo and page curtain transitions;
  - a pinned three-division showcase, a pinned horizontal photo gallery and a pinned "Why ADS" 3D statement sequence;
  - masked word reveals, magnetic buttons, 3D tilt cards with a spotlight, and a fullscreen lightbox (keyboard + swipe);
  - an animated social content wall and interactive laptop/tablet/phone mockups.
- **Navigation.** There is a floating compact nav, a full-screen mobile menu, a division switcher and a WhatsApp button.
- **Accessibility and SEO.** It respects `prefers-reduced-motion`, includes alt text, and generates a sitemap and robots file.

## Run

1. Install Node.js LTS from https://nodejs.org.
2. In this folder run `npm install` first. You only need to do this once.
3. Run `npm run dev`, then open http://localhost:3000.

To build for production, run `npm run build`, then `npm start`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services |
| `/events` | Weddings & Events |
| `/digital-marketing` | Digital Marketing |
| `/web-development` | Websites |
| `/real-estate` | Real Estate |
| `/real-estate/[id]` | Property detail |
| `/projects` | Projects |
| `/projects/[slug]` | Project detail |
| `/gallery` | Gallery |
| `/about` | About |
| `/contact` | Contact |

## Editing content: `data/ads.js`

All content lives in this one file.

- **Contact.** Location: Punniyam, Arumanai. Phones: +91 94896 72128 and +91 63806 94528. Email: adsdigitalsadvertisements@gmail.com.
  - WhatsApp uses the first number. Change `CONTACT.whatsapp` if a different number should be used.
- **Socials.** Only `@info.adsrealestate` was supplied. Add the ADS Digitals and ADS Weddings handles in `SOCIALS` when you have them.
- **Photos.** These are in `public/photos/`, enhanced to 2400px. Add more photos to `PHOTOS` with the correct `category`.
- **Properties.** Add entries to `PROPERTIES` (there is a template in the file). Each property gets its own page.
  - Price, area, features and status only appear when you fill them in.
- **Projects.** Add entries to `PROJECTS` to create case-study pages.

Rule: never add testimonials, awards, client names, counts, prices or metrics that ADS hasn't supplied.

## Deploy

Push the project to GitHub, open Vercel and choose **Add New Project**. Keep the **Next.js** preset and click **Deploy**.

After deploying, update the domain in `app/layout.js` (`metadataBase`), `app/sitemap.js` and `app/robots.js`.

## Images (update 2)
- `PHOTOS` in `data/ads.js` = ADS's own photography (in `public/photos/`, plus 900px copies in `public/photos/thumb/` used as 3D textures).
- `STOCK` = illustrative Unsplash photos (free licence) for décor, stage/LED, catering, digital marketing, websites and real estate.
  They load from images.unsplash.com (allowed in `next.config.mjs`). They are never shown as ADS projects or property listings —
  swap each one for ADS's own photo when available (change `src` to a file in `public/`).

## 3D (update 2)
- Hero: chrome ADS logo + orbiting carousel of ADS photos + morphing particles + subtle bloom (desktop).
- "Fly through ADS": scroll-driven 3D flight through a white gallery, one chapter per division (`lib/tunnelScene.js`).
- Real Estate: 3D architectural model. No blur effects anywhere — all text animations are crisp.
