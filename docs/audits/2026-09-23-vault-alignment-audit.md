# Site audit 2026-09-23: does packetflow.be match the vault?

> This is a findings-only checklist; nothing on the site is changed here. The fixes come in a later PR, which can delete this file once every item is closed.
>
> **Scope:** this repo at `main` @ `7af9ec5`, checked against the last 30 days of `vault-main` (2026-08-24 → 2026-09-23). Owner's rules for this audit:
> - Flemish Dutch only.
> - **No prices on the site.**
> - No client has agreed to be named.
> - **Where the site and the vault disagree, the vault is right.**
>
> Vault note names below (`pf-…`, `ref-…`) live under `vault-main/20-packetflow/`.

## Verdict

**No.** The site still sells the Packetflow of July, not the one the vault describes today.

What the site says:
- "Uw lokale IT-partner", backed by a public price list.
- AI as a headline.
- Camera installs.
- Availability seven days a week.

What the vault says:
- **Enterprise-engineering op KMO-schaal**, for *bedrijven waar stilstand geld kost*, with **kantoor én productie onder één plan**.
- **Named solutions to named problems**, not price tiers.
- **No prices outside the quote.**
- **Narrow, honest hours.**

A lot can stay as it is:
- The design and the pillar line *Gedocumenteerd · Beveiligd · Herstelbaar*.
- "Eén vast aanspreekpunt" and "getest, niet gehoopt".
- Formal *u* in the copy.
- The blog engine and the technical foundation.

What has to change:
- The message (P1).
- How the offer is structured (P1/P2).
- Six claims that are now untrue or risky (P0).
- One real bug: analytics never loads, even after consent (P3-1).

**Priorities**
- **P0:** untrue or risky today. Fix first.
- **P1:** positioning. The site is aimed at the wrong thing.
- **P2:** structure and content.
- **P3:** technical, SEO, accessibility and copy hygiene.

---

## P0: untrue or risky claims

### P0-1: Remove camerabewaking as a service
- **Where:**
  - `src/data/services.ts:234-235` (feature on the Zakelijke WiFi hub).
  - `src/data/sectors.ts:205` (horeca approach).
  - `src/pages/guesty-pms-ondersteuning-bnb.astro`, link card "van netwerk tot camera's".
- **Vault:** `pf-catalog-triage` lists CCTV/video management under **Refused**. It is a licensed trade in Belgium (training plus a licence) and is not sold.
- **Fix:** delete the feature and the approach line.
  - Keep: putting a client's *existing* cameras on their own network segment. That is networking, and the blog posts that mention it can stay.

### P0-2: Publish the real hours, not "'s avonds en in het weekend"
- **Where:**
  - Hero badge: `src/pages/index.astro:60`.
  - `src/pages/contact.astro:53`.
  - `src/pages/[local].astro:87`.
  - `src/data/services.ts:102,155`.
  - `src/pages/over-mij.astro:85,113,140`.
  - `src/pages/lokale-it-partner-vs-groot-it-bedrijf.astro:29,59,81,103`.
  - `public/llms.txt:9`.
  - JSON-LD `openingHoursSpecification` in `src/lib/schema.ts:57-70`, which currently says Mon–Fri 17–22 and Sat–Sun 09–20.
- **Vault (`pf-service-terms`):**
  - **Ma–vr 18:00–21:00, za 09:00–12:00.**
  - Sundays and public holidays are not working days.
  - Every report is acknowledged by the next working day at the latest.
  - No guaranteed time for an on-site visit; remote first.
- **Fix:**
  - Copy: "'s avonds en op zaterdagvoormiddag".
  - Schema: Mo–Fr 18:00–21:00, Sa 09:00–12:00.
  - Also update the Google Business Profile hours (outside this repo).

### P0-3: Drop the promises nobody can keep
- `src/data/services.ts:153` "Vaak binnen het halfuur ter plaatse": `pf-service-terms` rules out any guaranteed on-site time.
- `src/data/services.ts:192` "Microsoft 365, backup en Peppol inbegrepen": nothing is included by default.
  - Services are chosen per client and billed per unit.
  - Peppol is a one-off project (`pf-solutions-map`, solution 3).

### P0-4: Remove "geen ticketnummer"
- **Where:**
  - `src/pages/index.astro:31`.
  - `src/data/services.ts:97`.
  - The implied contrast in `src/pages/lokale-it-partner-vs-groot-it-bedrijf.astro:25`.
- **Vault:** `ref-tone-of-voice` rule 14 says never claim there is no ticket system. There is one: a helpdesk fed by support@. Lean on "één vast aanspreekpunt" instead.
- **Fix:** "Altijd dezelfde persoon, die uw zaak kent."

### P0-5: Replace "AI-detectie · 24/7" with the real 24/7 story
- **Where:**
  - `src/pages/index.astro:39,47`.
  - `src/data/services.ts:317,321,336`.
  - The Cloud hub tagline *"met AI die mee bewaakt"* also renders in the header dropdown, so it appears on **every page**.
- **Vault (`pf-service-terms`, "Wat wel dag en nacht draait"):** two things are watched 24/7 by a **staffed** security centre that detects and contains threats without waiting for Louis:
  - Devices: Huntress, part of *Packetflow Secure*.
  - Microsoft 365 accounts: Petra Security, part of *Packetflow Identity*.

  That is **not** a human answer from Packetflow. Follow-up, explanation and recovery happen within the hours in P0-2.
- **Fix:** say exactly that. It is a stronger claim than "AI", and it is true. No sentence may suggest that Packetflow itself answers at night.

### P0-6: Remove client references nobody approved
- **Where:** `src/data/sectors.ts:94-100`, the "Vertrouwd door" strip ("Apotheek, regio Brugge", "Orthodontiepraktijk, West-Vlaanderen").
  - The code comment calls these "real, permitted clients". The owner confirms that no client has agreed.
- **Fix:** empty the `references` array. The strip renders nothing when it is empty.
- The Google reviews are a separate question; see **D5**.

---

## P1: positioning

### P1-1: Lead with the boilerplate, not "lokale IT-partner"
- **Where:**
  - `src/data/site.ts:9-12`: `homeTitle` and `description`. The description feeds the JSON-LD and every default meta description.
  - `src/pages/index.astro:55,63-70`: H1 "uw lokale IT-partner in West-Vlaanderen".
  - `src/components/Footer.astro:17`.
  - `public/llms.txt:3-9`.
  - `src/pages/blog/index.astro:71`.
  - In total "lokale IT-partner" appears 36 times in the built pages.
- **Vault:**
  - `packetflow-strategy`: the edge is explicitly *not* "friendly local IT".
  - `pf-boilerplate` (approved 2026-09-03) is the canonical description, and the website must copy it from there:

    > Packetflow bouwt IT voor bedrijven waar stilstand geld kost — kantoor én productie onder één plan. Netwerk, segmentatie, geteste back-ups, geregelde toegang. Gedocumenteerd opgeleverd, en u blijft eigenaar van alles. Enterprise-engineering op KMO-schaal.
- **Fix:**
  - `site.description`: the master text above, **verbatim**.
  - Hero: keep the *"Hallo,"* greeting and use the tagline variant: *"IT voor bedrijven waar stilstand geld kost. Kantoor én productie, onder één plan."*
  - Keep "West-Vlaanderen" in the `<title>` for local search, but as a supporting fact, not as the message.

### P1-2: Add the production lane, which is missing entirely
- **Built site:** "stilstand" appears 0 times. "productie" appears once, in the NIS2 post.
- **Vault (`pf-boilerplate`, `prj-nis2-readiness`):** since 2026-09-03 this lane leads the public wording.
  - **Who:** small manufacturers, logistics and food suppliers.
  - **What:** the IT/OT boundary, segmentation, backups, access, and a readiness check mapped to CyFun/NIS2.
  - **Outcome line:** *"Uw productie blijft draaien, ook als uw IT wordt aangevallen."*
  - **Typical way in:** a large customer's security or NIS2 questionnaire, or a cyber-insurance renewal.
- **Vault guardrails:**
  - Say "kantoor én productie". Never say "besturing" or "SCADA".
  - NIS2 is the trigger, not the headline. Don't lead with "NIS2-compliance".
- **Fix:**
  - Add a sector page, e.g. `/sectoren/productie-toeleveranciers`, first in the sector order.
  - Link the NIS2 post to it.

### P1-3: Build the offer around the named solutions
- **Vault:**
  - `pf-solutions-map` calls the named solutions "the canonical, sellable list, the backbone the design system and website are built from".
  - `pf-design-system` says to feed these names into the site.
- **Today:** the site has three capability hubs plus sector pages, and none of the names appear.

| # | Named solution | On the site today |
|---|---|---|
| 1 | **De verhuizing zonder IT-zorgen**: office move or fit-out | ❌ missing ("verhuiz" 0×). Estate agents (makelaars) belong here, not inside "kantoren". |
| 2 | **Beveilig de praktijk**: care practices | ≈ `/sectoren/medische-praktijken` |
| 3 | **Moderne werkplek**: Microsoft 365 done properly, Peppol-ready | ≈ `/sectoren/kantoren-vrije-beroepen` plus the cloud hub |
| 4 | **Gastnetwerk dat klopt**: B&B and horeca | ≈ `/sectoren/horeca-bnb` plus the wifi hub |
| 5 | **Packetflow Beheer**: the ongoing layer under 1–4 | ≈ `/diensten/it-beheer-support` |
| 7 | **Uw bedrijfssoftware, in eigen beheer**: self-hosted business software, done properly | ❌ missing |
| – | Telefonie, AI | Correctly **not** on the site (telefonie is named in the vault but can't be quoted yet; AI is parked) |

- **Fix:**
  - Each sector or hub page leads with its named solution: the problem, then what you get, then the shape (**first a project, then ongoing beheer**).
  - Add pages for 1 and 7.
  - Keep existing slugs where the content maps; they carry Search Console history (`/diensten/it-beheer-support` is the redirect target of the old `/diensten/it-beheer`).
  - 301 anything that is removed.

### P1-4: Take AI out of the pitch
- **Where:**
  - The homepage AI section, `src/pages/index.astro:161-220`, including the CTA "Vraag een gratis AI- & veiligheidscheck".
  - "Microsoft 365 Copilot & AI" cards: `index.astro:40,48` and `services.ts:340`.
  - `src/data/sectors.ts:151,159`.
  - The site-wide dropdown tagline (P0-5).
- **Vault (`packetflow-strategy`, `prj-ai-offering`):** AI is parked. It is inbound and upsell only, never the pitch, because it dilutes the positioning.
- **Fix:**
  - Remove the homepage AI section and the AI cards.
  - At most one line under *Moderne werkplek*, e.g. "Copilot veilig inrichten kan, op vraag."
  - Replace the CTA as described in P2-4.

### P1-5: Show the trust signals the vault ranks highest
- **Vault:**
  - `packetflow-strategy` ranks the trust signals in this order:
    1. A plan before touching anything.
    2. As-built documentation handed over.
    3. A one-page monthly report that a person explains.
    4. **No lock-in:** *u blijft eigenaar van alles*.
  - `pf-service-description`, "Altijd inbegrepen":
    - One monthly report per client.
    - One fixed contact.
    - No lock-in: your Microsoft 365 environment and your data stay yours.
    - Backups are restore-tested twice a year.
- **Built site:** "maandrapport" 0×, the ownership promise 0×. "Gedocumenteerd" appears only as a pillar word.
- **Fix:** add a **"Zo werk ik"** block on the homepage and the Beheer page:
  - Eerst een plan.
  - Gedocumenteerd opgeleverd, u krijgt alles in handen.
  - Elke maand één pagina rapport.
  - U blijft eigenaar van alles, ook van uw Microsoft 365.

  Show the fictional sample report and as-built as images once they are ready.

### P1-6: Stop selling on price
- **Where:**
  - `src/pages/lokale-it-partner-vs-groot-it-bedrijf.astro:86`, the FAQ "Is een lokale IT-partner goedkoper…", and the price row in its table.
  - The VZW sector's "klein budget / betaalbare oplossingen" framing (see D3).
  - `src/data/services.ts:172` "Geen verplaatsingskosten van een stadskantoor".
  - `src/content/blog/wat-kost-it-beheer-kleine-onderneming.md:59-61` ("merkbaar onder" market rates, "in bijberoep").
- **Vault (`packetflow-strategy`, `pf-design-system`):** sell up, not down. No "cheaper" claims; price is never the pitch.
- **Fix:**
  - Remove the price arguments.
  - Reframe the comparison page as *enterprise-aanpak op KMO-schaal* versus a large IT company.
  - Its 24/7 row uses the two-clock wording from P0-5: detection runs day and night; Louis answers within the hours in P0-2.

---

## P2: structure and content

### P2-1: Remove every price from the site
The owner decided this. The vault agrees:
- `pf-service-description` says the prices are in the quote.
- The module notes are confidential.

Several of the published numbers are also out of date:
- The prepaid 10-hour card is retired.
- *Packetflow Secure* no longer includes updates.

Everything that carries a price or links to one:
- **Pages:** `src/pages/prijzen.astro` and `src/pages/tarieven.astro`, including the travel zones.
- **`src/data/services.ts`:**
  - `:110-127`: the €49 / €15 price ladder.
  - `:238` and `:349`: the aftercare line "Vanaf €49/maand". This line is also a standalone monitoring product, which `pf-catalog-triage` rule 1 forbids: monitoring is never sold as its own line.
- **Blog:** `src/content/blog/wat-kost-it-beheer-kleine-onderneming.md`, 42 amounts. See D1.
- **Other copy:** `public/llms.txt:24,27`, the JSON-LD `service()` descriptions in `prijzen.astro`, and every meta description that quotes a price.
- **Links:**
  - Nav: `src/data/site.ts:58` "Prijzen".
  - Footer: `src/components/Footer.astro:59-60`.
  - `src/pages/contact.astro:57`.
  - `src/pages/lokale-it-partner-vs-groot-it-bedrijf.astro:214`.
  - The "Meer over de prijzen" link on the `[hub].astro` ladder.
  - `src/data/services.ts:124`.
- **Redirects:** `/prijzen`, `/tarieven`, `/pakket` and `/kmo-pakket` must 301 to whatever replaces them (D1). `/kmo-pakket` still gets search impressions.
- **Can stay:** `src/lib/schema.ts:41` `priceRange: "€€"`. It is a band, not a price.

### P2-2: Explain how it works, without numbers (`/werkwijze`)
The content already exists in the vault, written for clients: `pf-service-terms` and `pf-service-description`. Suggested points, in *u* form:
- The first conversation and the visit on site are free. In the vault the discovery visit is presales.
- Taking over your environment is a separate project, with a fixed price in the quote.
- After that you pay per month, per unit you can count yourself: a device, a user, a Microsoft 365 environment, a location.
- Extra work is billed per hour on the monthly invoice. Projects always have a fixed price.
- No minimum term, one month's notice.
- When you can reach Louis (P0-2). Existing clients mail support@.
- What each service covers, in plain words, including what it does **not** cover.

⚠️ Both vault notes are still `draft`; the legal read is pending. Publish the hours and the working model now. Hold contract details (indexation, when notice starts) until the notes are approved.

### P2-3: Describe services with the current catalogue
Use the names and scope from `pf-service-description`:

| Service | Scope | Note |
|---|---|---|
| *Packetflow Secure* | Huntress EDR, 24/7 security centre | **Does not include updates** |
| *Packetflow Toestelbeheer* | Intune/Autopilot, monthly updates, remote help | Not on the site yet |
| *Packetflow Identity* | Petra 24/7, MFA and conditional access, mail security | Needs Microsoft 365 Business Premium |
| *Packetflow Tenantbeheer* | Management of the Microsoft 365 environment | Not on the site yet |
| *Packetflow Backup – Lokaal* | Device backup | |
| *Packetflow Backup – M365* | Microsoft 365 backup | Name is "– M365", not "– Microsoft 365" |
| *Packetflow Network* | Per location, firmware updates included | Cabling is a project |

Other fixes:
- Say that some services need Microsoft 365 Business Premium, and that this is checked before the quote.
- `src/content/blog/nis2-kleine-ondernemingen-belgie.md:18` says MFA, backups, patching and access "zitten standaard in beheer". Not true under the per-service scope. Use: "zitten in de beheerdiensten die u kiest".
- Unpublished draft `huntress-partner-mdr-bescherming.md`: before it goes live, check that it never implies updates are part of Secure, and that "24/7" always means the security centre, not Packetflow.

### P2-4: Replace the "gratis AI- & veiligheidscheck" CTA
- **Vault (`pf-bundles-and-rules`):**
  - The discovery visit on site is free.
  - The authorised internal assessment is a paid project, credited against the take-on when the client signs.
  - A "free security check" invites exactly the free audit the vault stopped giving away.
- **Fix:** use the existing "Plan een gratis kennismaking ter plaatse" CTA.
- **Optional:** "Vraag een externe blootstellingscheck". This is the free, outside-only snapshot from `ht-teardown-assessment`. Only offer it if it will actually be run on request.

### P2-5: Brand spelling: "PacketFlow" → "Packetflow" (26×)
- **Where:**
  - `src/pages/prijzen.astro`: the module names; goes away with P2-1.
  - `src/pages/guesty-pms-ondersteuning-bnb.astro:67,72,110,154,199,245`.
  - `src/content/blog/wat-kost-it-beheer-kleine-onderneming.md`.
- **Vault:** "Brand spelling" in `conventions`.

### P2-6: The "bijberoep" framing
- **Where:**
  - `src/pages/over-mij.astro:58,131-145`.
  - `public/llms.txt:14`.
  - `src/content/blog/wat-kost-it-beheer-kleine-onderneming.md:60`.
- **Vault:** `pf-design-system` (2026-08-24) dropped "bijberoep" from the brand voice. The honest hours (P0-2) now carry that honesty.
- **Fix:**
  - Keep the section truthful but reframe it, e.g. *"Wanneer ik bereikbaar ben, en waarom"*.
  - Drop "in bijberoep" from the facts block and from `llms.txt`.
  - See D6 if you disagree.

### P2-7: Legal accuracy (privacy, cookies, credentials)
- **Cookie count:** `src/components/CookieBanner.astro:35` and `src/pages/privacy.astro` say GA sets **one** cookie (`_ga`). GA4 sets `_ga` **and** `_ga_<ID>`. Say two.
- **Privacy page, missing items:**
  - Odoo (the CRM) receives the contact and lead forms. Name it as a processor alongside Microsoft 365.
  - The legal basis for each processing: pre-contractual steps for the forms, consent for analytics.
  - A concrete retention period for leads that never become clients.
  - The legal basis for the transfer of data to Google.

  GDPR art. 13 requires all of these.
- **Microsoft partner claim:** `src/pages/over-mij.astro:35,81` and `public/llms.txt:18` present "Erkenning: Microsoft Cloud Partner" as if it were a designation. The vault records partner-program membership and CSP licensing, not a Solutions Partner designation. Word it as membership.

### P2-8: Smaller copy fixes
- `src/pages/over-mij.astro:229`: "recente klanten zaten in Oost-Vlaanderen en Wallonië" invites leads from outside the area, which the vault only takes on opportunistically. Drop it or soften it.
- Register: "In jouw regio" (`src/pages/diensten/index.astro:58`, `src/pages/diensten/[hub].astro:72`) → "In uw regio". Copy aimed at prospects uses *u* (`ref-tone-of-voice` §3a).
- The practice case on `/over-mij` (the building takeover in Wallonië): keep it only if it cannot identify the client. No client has agreed to website use.
- `src/pages/index.astro:23`: the status card shows "Peppol e-facturatie · Actief" as if it were a monitored service. Peppol is a one-off project. Minor.

---

## P3: technical, SEO, accessibility, hygiene

### P3-1: Bug: the CSP blocks analytics even after consent
- **Where:** `public/_headers`. The CSP has `script-src 'self' 'unsafe-inline'` and `connect-src 'self' https://louisdeclerck.odoo.com`.
- **What happens after the visitor clicks Accept:**
  1. `Analytics.astro` injects `https://www.googletagmanager.com/gtag/js`. `script-src` blocks it.
  2. The GA4 hits to `*.google-analytics.com` are blocked by `connect-src`.

  So on production, analytics records nothing, even with consent.
- **Fix:**
  - `script-src`: add `https://www.googletagmanager.com`.
  - `connect-src`: add `https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`.
  - `img-src`: add `https://*.google-analytics.com https://www.googletagmanager.com`.
  - Verify on a preview deploy: DevTools shows no CSP violations after Accept.

### P3-2: Colour contrast (WCAG 2.2 AA, from axe-core on the built site)

| Element | Colours | Ratio | Needed |
|---|---|---|---|
| **Primary button**: every primary CTA, including the header "Plan een gesprek" | white on `--orange-600` #E2620F | **3.5:1** | 4.5:1 |
| Secondary button text | #E2620F on cream | 3.1:1 | 4.5:1 |
| Secondary button text on the CTA band | #E2620F on #EDE7DB | 2.8:1 | 4.5:1 |
| "(optioneel)" form hint | #A8A097 on white | 2.6:1 | 4.5:1 |
| Success badge | | 4.46:1 | 4.5:1 |
| Warning badge | | 4.28:1 | 4.5:1 |

- **Fix:**
  - Primary fill: `--orange-700` #C2410C. White on it is 5.2:1.
  - Secondary text: `--orange-700` on cream (4.6:1). On the #EDE7DB band use `--ink`; `--orange-700` there is still only 4.2:1.
  - Form hints: `--text-muted` #6B6359 (5.9:1).
  - Make the same token change upstream in `pack-design-system`.

### P3-3: Other accessibility findings (axe)
- `aria-label` on a plain `div` (the review stars in `src/components/Reviews.astro`) is prohibited. Add `role="img"`.
- Heading order: cards on the hub and sector overview pages jump from h1 to h3.
- `.cmp-wrap` on the comparison page scrolls on mobile but can't be reached by keyboard. Add `tabindex="0"` and an accessible name.
- Already fine: no horizontal overflow at 390 px, and one H1 per page.

### P3-4: SEO meta lengths
- **Titles over 60 characters:**
  - Home: 69.
  - `/diensten`: 70.
  - `/sectoren`: 67.
  - wat-kost post: 70.
  - wifi-bnb post: 66.
- **Descriptions over 160 characters:**
  - Home: 181.
  - wifi-bnb post: 207.
  - nis2 post: 165.
- **Too thin:** `/privacy` description, 29 characters.
- `pf-boilerplate` has no web meta variant of 155 characters or fewer yet. Until it does, derive one from the tagline variant.

### P3-5: Em dashes in Dutch copy
- There are 372 em dashes in the visible text.
- `ref-tone-of-voice`: no em dashes in Dutch.
- `pf-design-system`: an em dash only in the "— Louis" signature.
- Remove them as each page is rewritten; there is no need for a separate mechanical pass.
- The boilerplate is quoted verbatim, so it keeps its own dash.

### P3-6: `security.txt` contact address
`public/.well-known/security.txt` says `Contact: mailto:soc@packetflow.be`. The vault knows support@ and security@ (the vendor-alert inbox), but no soc@. Confirm soc@ exists and is read, or point the file at a mailbox that is.

### P3-7: Company-number label
- The footer, privacy page, `/over-mij` and `llms.txt` show "KBO BE 1024.713.047".
- The "BE" prefix is the VAT format, and Packetflow is VAT-registered now.
- Use "Ondernemingsnummer 1024.713.047", "BTW BE 1024.713.047", or both.

### P3-8: The forms can lose leads silently
- `contact.astro` and `LeadForm.astro` POST with `no-cors` and always show success.
- If Odoo's website-form allowlist rejects a field, the lead is lost while the visitor thinks it arrived.
- Fix: send one real test submission after every Odoo change, or post via a small proxy that can read the response. This can't be verified from the repo.

### P3-9: README is stale
The README says:
- Astro 5 (7.3 is installed).
- Feature PRs go into an `acc` branch guarded by `promote-guard.yml`. Neither exists; PRs go straight to `main`.
- `pakket.astro` and KMO-Pakket TODOs, both gone.

Rewrite the deploy section to match `github-pages.yml` and `deploy.yml`.

### Checked and fine
- **Build and dependencies:**
  - `npm run build` is green (29 pages) with 0 broken internal links.
  - `npm audit` reports 0 vulnerabilities.
  - Minor updates are available (astro 7.3.4, lucide-static 1.47).
- **Security and privacy:**
  - Security headers are present: HSTS, CSP, nosniff, frame-ancestors.
  - Fonts are self-hosted, and no third-party script loads before consent.
  - The consent banner and withdrawal flow are built correctly.
- **Indexing:**
  - The sitemap excludes the draft Huntress post.
  - Staging builds carry `noindex`.
  - Canonicals and trailing slashes are consistent.
- **Already in line with the vault:**
  - The pillar line and "één vast aanspreekpunt".
  - "Getest, niet gehoopt".
  - Formal *u* in the copy.
  - "1 tot ~20 werkplekken" on the comparison page.
  - Telefonie is absent, as it should be.
  - Projects at a fixed price after a free visit.

---

## Decisions the owner needs to make

**D1: What replaces `/prijzen` and `/tarieven`, and what happens to "Wat kost IT-beheer…"?**
- Recommendation:
  - A new `/werkwijze` page (P2-2); 301 the four price URLs to it.
  - Rewrite the blog post **without numbers**, at the same URL: "waar hangt de kost van IT-beheer van af". That keeps its search traffic, which deleting it would lose.

**D2: The Guesty/PMS page.**
- Problems:
  - It appears nowhere in the vault: not as a named solution, not in the catalogue, not in triage.
  - It depends on an unnamed subcontractor.
  - It writes in "we/onze" while the rest of the site is "ik".
- Recommendation: remove it, 301 it to `/sectoren/horeca-bnb`, and drop the spotlight and related cards that link to it. The alternative is to add it to the vault first, if it really is sold.

**D3: The Verenigingen & VZW's sector.**
- It is not one of the vault's target segments, and it is framed on price.
- Recommendation: remove it and 301 to `/sectoren`.

**D4: The Ruckus and Zyxel partner badges.**
- The vault's network service is built on MikroTik, and neither brand appears anywhere in the vault.
- Recommendation: keep them only if both partnerships are real **and** still deployed; then add them to `ref-vendors-partners`. Otherwise swap them for what is actually run, e.g. Huntress once that partnership post goes live.

**D5: The three Google reviews.**
- They are the reviewers' own public words, with first name and initial, so the risk is low. But the owner says no client has agreed to be named.
- Recommendation: keep them, and send each reviewer a one-line "mag ik uw review op mijn site tonen?". Remove any where the answer is no.
- One review says "Goedkoper dan de grote spelers". It is off-message, but it is the reviewer's words, not Packetflow's.

**D6: Keep or drop "bijberoep".**
- The vault dropped it from the brand voice.
- Recommendation: follow the vault, and let the stated hours carry the honesty.

## Suggested order for the fix session
1. P0 items and P3-1 (CSP), in one small PR.
2. P2-1 (pricing removal) and D1, with the redirects in the same PR.
3. P1-1, P1-2 and P1-4: new hero and description from the boilerplate, the production page, AI out of the pitch.
4. P1-3, P1-5 and P2-2: named-solution pages, the "Zo werk ik" block, the Werkwijze page.
5. The remaining P2 and P3 items.
