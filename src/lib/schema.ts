// Structured-data (JSON-LD) helpers. Centralised so every page references the
// same LocalBusiness via a shared @id, and breadcrumbs are consistent.
import { site, geo } from "@/data/site";

const SITE_URL = "https://www.packetflow.be";
export const ORG_ID = `${SITE_URL}/#business`;

// Note on reviews: Google's LocalBusiness/Organization guidelines state that
// aggregateRating/review markup is "only recommended for sites that capture
// reviews about *other* local businesses". Marking up our own reviews on our
// own entity is self-serving — it won't earn star rich results and risks a
// manual action — so the reviews are rendered visibly on the page but are
// deliberately NOT emitted as structured data here.

/**
 * The canonical LocalBusiness node. ProfessionalService is a subtype of both
 * LocalBusiness and Organization, so this one node satisfies Google's
 * Organization *and* LocalBusiness guidance. Reference it by @id elsewhere
 * (publisher / provider / worksFor) — but only on pages that also emit this
 * node, otherwise the reference dangles. BaseLayout emits it on every page so
 * those references always resolve.
 */
export function localBusiness() {
  // Off-site profiles, if known — keeps schema valid when they aren't yet set.
  const sameAs = [site.profiles.googleBusiness, site.profiles.linkedin].filter(
    Boolean,
  );
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.legalName,
    description: site.boilerplate,
    url: SITE_URL,
    logo: `${SITE_URL}/images/og-image.png`,
    image: `${SITE_URL}/images/louis.webp`,
    telephone: site.phoneIntl,
    email: site.email,
    vatID: site.vatId,
    founder: { "@type": "Person", name: site.owner },
    priceRange: "€€",
    areaServed: { "@type": "AdministrativeArea", name: site.serviceArea },
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    // The service window from site.hours (vault: pf-service-terms). Sundays
    // and public holidays are not working days, so they are simply absent.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: site.hours.weekdays.opens,
        closes: site.hours.weekdays.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: site.hours.saturday.opens,
        closes: site.hours.saturday.closes,
      },
    ],
  };
}

/** A standalone FAQPage node from question/answer pairs. */
export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };
}

/** A BlogPosting node, authored by a Person and published by the business. */
export function blogPosting(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  /** Profile/bio URL for the author — Google "strongly recommends" it. */
  authorUrl?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: opts.url,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.author,
      ...(opts.authorUrl ? { url: opts.authorUrl } : {}),
    },
    publisher: { "@id": ORG_ID },
    ...(opts.image ? { image: opts.image } : {}),
  };
}

/** A Service node tied to the shared LocalBusiness provider. */
export function service(opts: {
  name: string;
  description: string;
  serviceType?: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: opts.areaName ?? site.serviceArea },
  };
}

/** BreadcrumbList from [label, path] pairs (path relative, leading slash). */
export function breadcrumbs(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
