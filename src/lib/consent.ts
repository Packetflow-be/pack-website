// Analytics-consent contract, shared by the two pieces that touch it:
// `src/components/CookieBanner.astro` records the visitor's choice, and
// `src/components/Analytics.astro` acts on it. One key, one place.
//
// Stored in localStorage rather than a cookie on purpose: the consent record
// itself then never travels to the server, and storing a *preference* the
// visitor asked for needs no consent of its own.
export const CONSENT_KEY = "pf-consent-analytics";
export const CONSENT_GRANTED = "granted";
export const CONSENT_DENIED = "denied";
