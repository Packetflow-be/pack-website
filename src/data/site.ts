// Central business / NAP (Name-Address-Phone) configuration for Packetflow.
export const site = {
  name: "Packetflow",
  legalName: "Packetflow",
  owner: "Louis Declerck",
  tagline: "Uw partner in IT",
  // Keyword-bearing homepage <title> (geo + audience). Inner pages use the
  // "{title} | Packetflow" pattern instead — see BaseLayout.
  homeTitle: "IT-partner voor praktijken & kantoren in West-Vlaanderen | Packetflow",
  pillars: "Gedocumenteerd · Beveiligd · Herstelbaar",
  description:
    "Packetflow is uw lokale IT-partner in West-Vlaanderen. Ik help medische praktijken en professionele kantoren — apotheken, tandartsen, advocaten, architecten en makelaars — met Microsoft 365, veilige backup, Peppol en cybersecurity. De degelijkheid van een groot IT-team, met één vast aanspreekpunt: gedocumenteerd, beveiligd en herstelbaar.",
  email: "louis@packetflow.be",
  phone: "0468 22 72 12",
  phoneIntl: "+32 468 22 72 12",
  phoneHref: "tel:+32468227212",
  // Ondernemingsnummer (KBO/BCE). Display format per official notation.
  vatId: "BE 1024.713.047",
  address: {
    street: "Hageweg 39",
    postalCode: "8490",
    city: "Jabbeke",
    region: "West-Vlaanderen",
    country: "België",
  },
  serviceArea: "West-Vlaanderen",
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
  // TODO before launch: confirm this points at wherever Odoo lives after the
  // migration, and configure CORS + the website_form allowlist on Odoo (see
  // the contact-form PR for the exact Odoo-side steps).
  odooBaseUrl: import.meta.env.PUBLIC_ODOO_URL ?? "https://louisdeclerck.odoo.com",
} as const;

// Top navigation. Lean by design: the service hubs live under /diensten, the
// audience hubs under /sectoren, and the local pages sit underneath the
// service hubs (linked from content + footer).
//
// `dropdown` (optional) marks an item whose children are served from a data
// source (sectors / services). The Header renders those as a hover/focus
// dropdown while the top-level item keeps linking to its own overview page.
export const mainNav = [
  { label: "Voor wie?", href: "/sectoren", dropdown: "sectors" },
  { label: "Diensten", href: "/diensten", dropdown: "services" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "Blog", href: "/blog" },
  { label: "Over mij", href: "/over-mij" },
] as const;

// Geo coordinates of the business location — used in LocalBusiness structured
// data. Google requires at least 5 decimal places of precision.
export const geo = { latitude: 51.1624016, longitude: 3.1285972 } as const;
