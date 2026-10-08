// ============================================================
// ADS DIGITALS & EVENTS — single source of truth for all content.
// Only information supplied by the business is used here.
// Do NOT add testimonials, awards, client names, counts, prices or metrics
// that the business has not supplied.
// ============================================================

export const BRAND = {
  name: "ADS Digitals & Events",
  legal: "ADS Digitals & Advertisements",
  headline: ["Creative Solutions.", "Memorable Events.", "Digital Growth."],
  ideas: ["Creating Experiences.", "Building Brands.", "Connecting Opportunities."],
  positioning: "One Team. Multiple Solutions.",
  summary:
    "ADS combines creativity, technology and professional execution to help customers create memorable experiences, grow their brands digitally, and discover or promote property opportunities.",
};

export const CONTACT = {
  location: "Punniyam, Arumanai",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Punniyam%2C%20Arumanai",
  phones: [
    { display: "+91 94896 72128", tel: "+919489672128" },
    { display: "+91 63806 94528", tel: "+916380694528" },
  ],
  // WhatsApp uses the first phone number. Change here if a different WhatsApp number is preferred.
  whatsapp: "919489672128",
  email: "adsdigitalsadvertisements@gmail.com",
};

// Official social profiles. Set url to null until the exact handle is supplied.
export const SOCIALS = [
  { key: "digitals", label: "ADS Digitals & Advertisements", handle: null, url: null },
  { key: "weddings", label: "ADS Weddings", handle: null, url: null },
  { key: "realestate", label: "ADS Real Estate", handle: "@info.adsrealestate", url: "https://www.instagram.com/info.adsrealestate/" },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Weddings & Events" },
  { href: "/digital-marketing", label: "Digital Marketing" },
  { href: "/web-development", label: "Websites" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// The three business areas (Digital Marketing & Websites form one area with two services pages)
export const DIVISIONS = [
  {
    key: "events",
    short: "Events",
    name: "ADS Weddings & Events",
    href: "/events",
    index: "01",
    idea: "Creating Experiences.",
    positioning: "From planning to execution, we handle your event end-to-end.",
    cta: { label: "Plan Your Event", service: "Events" },
    services: [
      "Wedding Photography",
      "Wedding Videography",
      "Event Photography & Videography",
      "Wedding & Event Decoration",
      "Catering & Food Services",
      "Stage & Venue Setup",
      "LED Walls & Event Production",
      "Private Parties & Corporate Events",
      "Complete Event Management",
    ],
  },
  {
    key: "digitals",
    short: "Digitals",
    name: "ADS Digitals & Advertisements",
    href: "/digital-marketing",
    index: "02",
    idea: "Building Brands.",
    positioning: "Social, content, advertising and websites — built to grow your brand.",
    cta: { label: "Grow Your Brand", service: "Digital Marketing" },
    services: [
      "Social Media Management",
      "Content Creation",
      "Graphic Design",
      "Reels & Video Production",
      "Meta Advertising",
      "Google Advertising",
      "SEO",
      "Influencer Marketing",
      "Brand Promotion",
    ],
    web: {
      name: "Website Design & Development",
      href: "/web-development",
      positioning: "We build websites that look professional and work for your business.",
      cta: { label: "Build My Website", service: "Website" },
      services: [
        "Website Design",
        "Custom Website Development",
        "Business Websites",
        "E-commerce Websites",
        "Responsive Web Design",
        "UI/UX Design",
        "Website Maintenance",
      ],
    },
  },
  {
    key: "realestate",
    short: "Real Estate",
    name: "ADS Real Estate",
    href: "/real-estate",
    index: "03",
    idea: "Connecting Opportunities.",
    positioning: "Property solutions made simple.",
    cta: { label: "Enquire About Property", service: "Real Estate" },
    services: [
      "Residential Properties",
      "Commercial Properties",
      "Land & Plots",
      "Houses & Villas",
      "Property Promotion",
      "Property Marketing",
      "Buyer & Seller Assistance",
    ],
  },
];

export const WHY = ["One Team. Multiple Solutions.", "Creative", "Professional", "Reliable", "End-to-End Solutions"];

export const FORM_SERVICES = ["Events", "Digital Marketing", "Website", "Real Estate", "Other"];

// ------------------------------------------------------------
// Photography — supplied images (each used once, enhanced to 2400px).
// category must match the service the photo actually shows.
// ------------------------------------------------------------
export const PHOTOS = [
  { id: "bridal-portrait", src: "/photos/bridal-portrait.jpg", w: 1600, h: 2400, category: "Wedding Photography", caption: "Bridal portrait in red and gold", alt: "Close bridal portrait of a bride in gold jewellery and nose ring against a deep red backdrop" },
  { id: "heritage-door-couple", src: "/photos/heritage-door-couple.jpg", w: 1600, h: 2400, category: "Wedding Photography", caption: "At the heritage door", alt: "Couple embracing in front of an ornate brass door decorated with a flower garland" },
  { id: "tea-stall-couple", src: "/photos/tea-stall-couple.jpg", w: 1600, h: 2400, category: "Couple Photography", caption: "A tea-stall story", alt: "Couple sharing a laugh on a bench outside a village tea stall" },
  { id: "jasmine-portrait", src: "/photos/jasmine-portrait.jpg", w: 2400, h: 1600, category: "Couple Photography", caption: "Jasmine & light", alt: "Top-down portrait of a woman in an orange and purple saree with a jasmine string across her eyes" },
  { id: "lotus-portrait", src: "/photos/lotus-portrait.jpg", w: 1600, h: 2400, category: "Wedding Photography", caption: "The lotus portrait", alt: "Woman in a red saree seated against red velvet drapes holding a pink lotus" },
  { id: "gramophone-couple", src: "/photos/gramophone-couple.jpg", w: 1600, h: 2400, category: "Couple Photography", caption: "Gramophone afternoon", alt: "Couple seated beside a vintage gramophone in front of carved wooden screens" },
  { id: "lakeside-couple", src: "/photos/lakeside-couple.jpg", w: 1600, h: 2400, category: "Couple Photography", caption: "Open fields", alt: "Couple embracing on an open green field beside a lake" },
  { id: "event-guest-stage", src: "/photos/event-guest-stage.jpg", w: 1600, h: 2400, category: "Event Photography", caption: "In the moment", alt: "Guest watching a stage performance under blue event lighting" },
  { id: "event-guest-smile", src: "/photos/event-guest-smile.jpg", w: 1600, h: 2400, category: "Event Photography", caption: "Front-row smiles", alt: "Smiling guest in an orange outfit in the audience at a stage event" },
];

export const photo = (id) => PHOTOS.find((p) => p.id === id) || STOCK.find((p) => p.id === id);

// ------------------------------------------------------------
// Illustrative stock photography (Unsplash licence — free to use).
// Used ONLY as atmosphere for each service area — never as ADS projects,
// never as property listings. Replace with ADS's own photos when available.
// ------------------------------------------------------------
const U = (pid) => `https://images.unsplash.com/photo-${pid}?auto=format&fit=crop&q=85&w=2400`;
const st = (id, pid, w, h, division, alt) => ({ id, src: U(pid), w, h, division, alt, stock: true });
export const STOCK = [
  // Weddings & Events
  st("stage-decor-gold", "1745573673583-a51f665ae48e", 1600, 900, "events", "Wedding stage decorated with flowers and white drapery"),
  st("venue-floral-arch", "1745573673043-43a4f3b91466", 1600, 900, "events", "Event venue with a floral arch and decorated aisle"),
  st("stage-white-sofa", "1762709118823-7fe9c9afa8ff", 1500, 1000, "events", "Decorated wedding stage with a white sofa and floral arrangements"),
  st("stage-red-mandap", "1745573674206-1d4805fcc427", 1600, 900, "events", "Wedding stage with red and gold decoration"),
  st("concert-lights", "1577648884063-1d3d1477b8a7", 1000, 1500, "events", "Stage lights shining over a crowd at a live event"),
  st("led-truss", "1573339887617-d674bc961c31", 1000, 1500, "events", "Stage lighting rig and truss for event production"),
  st("buffet-service", "1555244162-803834f70033", 1500, 1000, "events", "Buffet table with silver chafing dishes"),
  st("catering-spread", "1576842546422-60562b9242ae", 1500, 1012, "events", "Catering spread of food on a table"),
  // Digital marketing
  st("creator-camera", "1611784728558-6c7d9b409cdf", 1500, 1000, "digitals", "Videographer filming with a professional camera"),
  st("studio-shoot", "1594394489098-74ac04c0fc2e", 1500, 1000, "digitals", "Professional video camera recording in a studio"),
  st("production-crew", "1632187981988-40f3cbaeef5e", 1500, 1000, "digitals", "Production crew around a camera set-up"),
  st("social-feed", "1724862936518-ae7fcfc052c1", 1000, 1500, "digitals", "Hand holding a smartphone showing a social media feed"),
  st("social-scroll", "1759215524472-1b0686fdbd87", 1000, 1500, "digitals", "Hands holding a phone displaying a social media feed"),
  st("phone-apps", "1511707171634-5f897ff02aa9", 1200, 1200, "digitals", "Smartphone with app icons on a white desk"),
  // Websites
  st("laptop-desk", "1637502875124-eb4a9843a2fa", 1000, 1500, "web", "Laptop on a wooden table"),
  st("workspace-laptop", "1691050769347-a461536b155f", 1500, 1000, "web", "Desk with a laptop and a coffee mug"),
  st("desktop-site", "1711540846697-56b9f66d17f1", 1200, 1500, "web", "Desktop computer showing a website on a wooden desk"),
  st("designer-laptop", "1651684195895-38708dc94cfa", 1500, 1000, "web", "Person working on a laptop"),
  // Real estate
  st("villa-pool", "1613977257363-707ba9348227", 1500, 1000, "realestate", "Modern white villa with a swimming pool"),
  st("house-pool", "1580587771525-78b9dba3b914", 1600, 1200, "realestate", "Contemporary house with a pool and lawn"),
  st("residence-facade", "1722421492323-eaf9c401befe", 1300, 1500, "realestate", "Three-storey residential house with balconies"),
  st("villa-modern", "1600596542815-ffad4c1539a9", 1500, 993, "realestate", "Modern white house under a blue sky"),
  st("glass-office", "1621831337128-35676ca30868", 1500, 1000, "realestate", "Curved glass commercial building"),
  st("tower-mono", "1583009640887-eafd1a994d30", 1200, 1500, "realestate", "Commercial tower against a grey sky"),
  st("plots-aerial", "1773299567657-a4bf83503ce5", 1600, 900, "realestate", "Aerial view of land plots and development roads"),
  st("fields-aerial", "1506695041619-5dd4f46960b7", 1600, 900, "realestate", "Aerial view of land and fields"),
];
STOCK.push(
  st("wedding-photographer", "1611550287705-7ff8b459c8eb", 1500, 1000, "events", "Photographer with a DSLR camera at a wedding"),
  st("cinema-camera", "1548913462-c25eb1f0609c", 1500, 1000, "events", "Professional cinema camera for wedding videography"),
  st("conference-stage", "1587825140708-dfaf72ae4b04", 1500, 1000, "events", "Speaker on a lit stage in front of a large audience"),
  st("aisle-flowers", "1469371670807-013ccf25f16a", 1500, 1000, "events", "Wedding aisle lined with white and pink flower arrangements"),
  st("led-concert-blue", "1764257241003-e3464685770f", 1500, 1000, "events", "Crowd watching a blue-lit stage show"),
  st("party-toast", "1527529482837-4698179dc6ce", 1500, 1000, "events", "Guests raising glasses at a celebration"),
  st("table-setting", "1511795409834-ef04bbd61622", 1500, 1000, "events", "Elegant event table setting with a floral centrepiece"),
  st("ring-light", "1786372546514-1d524effae64", 1600, 900, "digitals", "Camera in front of a ring light for content creation"),
  st("design-software", "1626785774625-ddcddc3445e9", 1500, 1000, "digitals", "Monitor and tablet showing creative design software"),
  st("brand-swatches", "1561070791-2526d30994b5", 1200, 1500, "digitals", "Colour swatches and brand design samples"),
  st("analytics-screen", "1551288049-bebda4e38f71", 1500, 1000, "digitals", "Performance analytics charts on a laptop screen"),
  st("laptop-analytics", "1460925895917-afdab827c52f", 1500, 1070, "digitals", "Laptop showing marketing graphs on a glass table"),
  st("code-screen", "1607799279861-4dd421887fb3", 1500, 1000, "web", "Laptop screen displaying website code"),
  st("ecommerce-card", "1563013544-824ae1b704d3", 1500, 1000, "web", "Person shopping online with a card and laptop"),
  st("devices-dashboard", "1558655146-364adaf1fcc9", 1200, 1500, "web", "Website shown on a phone and a desktop screen"),
  st("ux-wireframe", "1581291518633-83b4ebd1d83e", 1500, 1000, "web", "Hand sketching website wireframes on paper"),
  st("living-room", "1638885930125-85350348d266", 1500, 1000, "realestate", "Bright modern living room interior"),
  st("house-keys", "1741156386380-0236c72eb6f9", 1500, 1000, "realestate", "House keys handed over at the front door"),
);
export const stock = (id) => STOCK.find((p) => p.id === id);

// One illustrative photo per service card (ids from PHOTOS or STOCK)
export const SERVICE_IMG = {
  "Wedding Photography": "wedding-photographer",
  "Wedding Videography": "cinema-camera",
  "Event Photography & Videography": "conference-stage",
  "Wedding & Event Decoration": "aisle-flowers",
  "Catering & Food Services": "buffet-service",
  "Stage & Venue Setup": "stage-white-sofa",
  "LED Walls & Event Production": "led-concert-blue",
  "Private Parties & Corporate Events": "party-toast",
  "Complete Event Management": "table-setting",
  "Social Media Management": "phone-apps",
  "Content Creation": "production-crew",
  "Graphic Design": "design-software",
  "Reels & Video Production": "studio-shoot",
  "Meta Advertising": "social-scroll",
  "Google Advertising": "laptop-analytics",
  SEO: "analytics-screen",
  "Influencer Marketing": "ring-light",
  "Brand Promotion": "brand-swatches",
  "Website Design": "designer-laptop",
  "Custom Website Development": "code-screen",
  "Business Websites": "workspace-laptop",
  "E-commerce Websites": "ecommerce-card",
  "Responsive Web Design": "devices-dashboard",
  "UI/UX Design": "ux-wireframe",
  "Website Maintenance": "laptop-desk",
  "Residential Properties": "residence-facade",
  "Commercial Properties": "glass-office",
  "Land & Plots": "plots-aerial",
  "Houses & Villas": "villa-pool",
  "Property Promotion": "house-pool",
  "Property Marketing": "living-room",
  "Buyer & Seller Assistance": "house-keys",
};

// ------------------------------------------------------------
// Real estate listings. Empty until real properties are supplied.
// Copy this template for each property. Leave optional fields as null
// — they are hidden automatically (never invent price, area or specs).
// {
//   id: "plot-arumanai-01",
//   title: "",
//   category: "Residential" | "Commercial" | "Land & Plots" | "Houses & Villas",
//   cover: "/properties/plot-arumanai-01/cover.jpg",
//   gallery: ["/properties/plot-arumanai-01/01.jpg"],
//   description: "",
//   location: "",
//   price: null, area: null, features: [], status: null,
// }
// ------------------------------------------------------------
export const PROPERTY_CATEGORIES = ["Residential", "Commercial", "Land & Plots", "Houses & Villas"];
export const PROPERTIES = [];

// ------------------------------------------------------------
// Projects / case studies. Empty until real projects are supplied.
// {
//   slug: "", title: "", category: "Events" | "Digital Marketing" | "Website" | "Real Estate",
//   cover: "", overview: "", gallery: [], services: [], location: null, date: null,
// }
// ------------------------------------------------------------
export const PROJECTS = [];

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text || "Hello ADS, I'd like to request a consultation.")}`;
