// Central business / NAP (Name-Address-Phone) configuration for Packetflow.
//
// Wording comes from the vault, not from here: the company description is the
// canonical boilerplate (vault: pf-boilerplate) and the hours are the service
// window clients are promised (vault: pf-service-terms). Change them there
// first, then here.
export const site = {
  name: "Packetflow",
  legalName: "Packetflow",
  owner: "Louis Declerck",
  // Wordmark lockup tagline from the design system.
  tagline: "Uw partner in IT",
  // Keyword-bearing homepage <title> (message + geo). Inner pages use the
  // "{title} | Packetflow" pattern instead — see BaseLayout.
  homeTitle: "IT waar stilstand geld kost · West-Vlaanderen | Packetflow",
  pillars: "Gedocumenteerd · Beveiligd · Herstelbaar",
  // The canonical company description, verbatim (vault: pf-boilerplate,
  // master). Used where the full text fits: structured data, llms.txt, the
  // facts on /over-mij.
  boilerplate:
    "Packetflow bouwt IT voor bedrijven waar stilstand geld kost — kantoor én productie onder één plan. Netwerk, segmentatie, geteste back-ups, geregelde toegang. Gedocumenteerd opgeleverd, en u blijft eigenaar van alles. Enterprise-engineering op KMO-schaal.",
  // The short form (vault: pf-boilerplate, LinkedIn tagline variant).
  short: "IT voor bedrijven waar stilstand geld kost. Kantoor én productie, onder één plan.",
  // Default meta description (≤155 chars), derived from the boilerplate.
  description:
    "Packetflow bouwt IT voor bedrijven waar stilstand geld kost: kantoor én productie onder één plan, gedocumenteerd opgeleverd. West-Vlaanderen.",
  email: "louis@packetflow.be",
  // Existing clients report here: a mail to this address is what starts the
  // response clock (vault: pf-service-terms).
  supportEmail: "support@packetflow.be",
  phone: "0468 22 72 12",
  phoneIntl: "+32 468 22 72 12",
  phoneHref: "tel:+32468227212",
  // Ondernemingsnummer (KBO/BCE) and, since the switch to the normal VAT
  // regime, the BTW number built on it.
  companyNumber: "1024.713.047",
  vatId: "BE 1024.713.047",
  address: {
    street: "Hageweg 39",
    postalCode: "8490",
    city: "Jabbeke",
    region: "West-Vlaanderen",
    country: "België",
  },
  serviceArea: "West-Vlaanderen",
  // The service window. One source for the copy and the JSON-LD opening hours
  // (src/lib/schema.ts), so the two can't drift. Sundays and public holidays
  // are not working days.
  hours: {
    weekdays: { opens: "18:00", closes: "21:00" },
    saturday: { opens: "09:00", closes: "12:00" },
    // Human-readable forms of the same window.
    label: "ma–vr 18:00–21:00 · za 09:00–12:00",
    phrase: "op weekdagen 's avonds en op zaterdagvoormiddag",
  },
  // Off-site profiles for LocalBusiness `sameAs`. Feeds both the reviews button
  // (src/components/Reviews.astro) and the schema sameAs. Empty entries are
  // filtered out, so schema stays valid.
  profiles: {
    googleBusiness: "https://share.google/0mYTn2sSQFX99Kdqs",
    linkedin: "https://www.linkedin.com/company/packetflow-be",
  },
  // Odoo CRM instance that receives website-form submissions. The contact form
  // POSTs to `${odooBaseUrl}/website/form/crm.lead`, which creates a crm.lead
  // (opportunity) natively. Override at build time with PUBLIC_ODOO_URL.
  // If this host changes, update connect-src/form-action in public/_headers.
  odooBaseUrl: import.meta.env.PUBLIC_ODOO_URL ?? "https://louisdeclerck.odoo.com",
  // Google Analytics 4 measurement ID (gtag.js). Carried over from the Odoo
  // site so the property keeps one continuous history across the migration.
  // Only used on production builds — see src/components/Analytics.astro.
  // Override at build time with PUBLIC_GA_ID; set it empty to disable.
  gaMeasurementId: import.meta.env.PUBLIC_GA_ID ?? "G-1LEBRDRV2M",
} as const;

// Top navigation. Lean by design: the solutions live under /diensten, the
// audience hubs under /sectoren, and the local pages sit underneath the
// service hubs (linked from content + footer).
//
// `dropdown` (optional) marks an item whose children are served from a data
// source (sectors / services). The Header renders those as a hover/focus
// dropdown while the top-level item keeps linking to its own overview page.
export const mainNav = [
  { label: "Voor wie?", href: "/sectoren", dropdown: "sectors" },
  { label: "Diensten", href: "/diensten", dropdown: "services" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Blog", href: "/blog" },
  { label: "Over mij", href: "/over-mij" },
] as const;

// Geo coordinates of the business location — used in LocalBusiness structured
// data. Google requires at least 5 decimal places of precision.
export const geo = { latitude: 51.1624016, longitude: 3.1285972 } as const;
