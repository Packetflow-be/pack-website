# Packetflow website

Marketing site for **Packetflow** — Louis Declerck's one-person IT practice in
West-Vlaanderen: IT for businesses where downtime costs money, the office and
the production floor under one plan. Rebuilt on
[Astro](https://astro.build) to replace the previous Odoo site, styled with the
**Packetflow Design System** (warm orange-on-cream editorial brand, Lora +
Poppins, blue accent, Lucide icons).

## Stack

- **Astro 7** — static site generation, near-zero client JS (the contact/lead
  forms, the cookie banner and the mobile menu only); Lucide icons are inlined
  at build time
- **Design tokens** — the Packetflow DS tokens live in `src/styles/global.css`
  (colors, type, spacing, radii, shadows, motion). Re-skin there.
- **@astrojs/sitemap** — automatic sitemap
- Fonts self-hosted via `@fontsource` (no third-party font request)

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist
npm run preview
```

## Deployment & branch flow

| Environment          | Trigger                              | Workflow           | Target                               |
| -------------------- | ------------------------------------ | ------------------ | ------------------------------------ |
| Staging / review     | a pull request marked ready for review | `github-pages.yml` | GitHub Pages (project sub-path, `noindex`) |
| Production           | push to `main` (a merged PR)         | `deploy.yml`       | Cloudflare Pages (www.packetflow.be) |

**Flow:** open a feature-branch PR into `main` → review it on the GitHub Pages
staging URL → merge → it goes live on Cloudflare. GitHub Pages is one shared
staging site, so the most recently built PR wins. Cloudflare's deploy step
skips until the `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repo secrets
are set (see the comments in `deploy.yml`).

## Where the words come from

The site copies from the Packetflow vault rather than inventing its own
positioning. Change the vault note first, then the site:

| On the site                                   | Source in the vault           |
| --------------------------------------------- | ----------------------------- |
| Company description (`site.boilerplate`, hero) | `pf-boilerplate`              |
| The solution hubs under `/diensten`           | `pf-solutions-map` (named solutions) |
| Managed services and what they cover          | `pf-service-description`      |
| Hours, response, contract terms (`/werkwijze`) | `pf-service-terms`            |
| Voice, register, no em dashes in Dutch copy   | `ref-tone-of-voice`           |

Two standing rules: **no prices on the site** (they live in the quote), and
**no client references** unless that client has agreed to be shown.

## Information architecture

Two cross-linked layers, both generated from data files:

- **Diensten** (solution-led) — `src/data/services.ts`
  - 6 hubs, one per named solution: kantoorverhuizing, beveiliging & back-up,
    moderne werkplek, wifi & netwerken, bedrijfssoftware in eigen beheer, and
    IT-beheer (Packetflow Beheer, the layer under all of them)
  - Local SEO pages at flat slugs (e.g. `/it-support-oudenburg`)
- **Voor wie?** (audience-led) — `src/data/sectors.ts`
  - 5 sectors: productie & toeleveranciers, medische & zorgpraktijken,
    kantoren & vrije beroepen, horeca & B&B's, verenigingen & VZW's
- Plus: Home, **Werkwijze** (process, price model, hours; no amounts),
  **Over mij**, the local-vs-large comparison, Blog, Contact, Privacy, 404

```
src/
  data/
    site.ts        # business info (NAP), hours, nav, geo
    services.ts    # solution hubs, managed services + their local pages
    sectors.ts     # audience hubs ("Voor wie?")
  lib/
    schema.ts      # JSON-LD: shared LocalBusiness @id, Service, BreadcrumbList
  layouts/BaseLayout.astro
  components/       # Logo, Button, Card, Badge, Kicker, Icon, Header, Footer, CtaSection, …
  pages/            # index, werkwijze, over-mij, contact, privacy, 404,
                    # diensten/[index,[hub]], sectoren/[index,[sector]], [local], blog/
  content/blog/     # articles (Markdown + frontmatter, see content.config.ts)
  styles/global.css # design tokens + shared classes
public/
  _headers          # security headers incl. CSP (allows GA only after consent)
  _redirects        # 301 map (Odoo → Astro, retired pages → their replacement)
  robots.txt, llms.txt, favicon.svg
```

**Anti-doorway note:** each local page carries a unique `context` paragraph and
distinct `highlights` — keep them genuinely different (or remove) rather than
scaling near-identical city templates.

## Open items

- [ ] Paste the Google Business Profile reviews URL in `src/data/reviews.ts`.
- [ ] Update the Google Business Profile opening hours to the service window
      (ma–vr 18:00–21:00, za 09:00–12:00) so it matches the site's JSON-LD.
- [ ] Confirm `soc@packetflow.be` (in `public/.well-known/security.txt`) is a
      monitored mailbox, or point it at one that is.
- [ ] After any change on the Odoo side, send one real test through the
      contact form: the form posts `no-cors` and always shows success.
