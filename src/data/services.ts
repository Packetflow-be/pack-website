// Single source of truth for the solution hubs and their local SEO landing
// pages. Pages are generated from this data:
//   - /diensten                       -> overview of all hubs
//   - /diensten/[hub]                 -> a solution hub
//   - /[local]                        -> a local landing page (flat slug, best
//                                        for local search e.g. /it-support-oudenburg)
//
// Each hub is one of the named solutions from the vault (pf-solutions-map):
// an outcome for a named problem, sold as a project first and kept running by
// Packetflow Beheer after. The service names and what they cover come from the
// client-facing service description (vault: pf-service-description). Prices are
// never published here: they live in the quote.
//
// Voice: Dutch (Flemish), formal "u", first person (Louis). Warm, plain-spoken,
// no em dashes in the copy (vault: ref-tone-of-voice).
//
// NOTE ON DOORWAY PAGES: each local page must carry genuinely unique value
// (a `context` paragraph + distinct `highlights`), not just a swapped city
// name — otherwise Google can filter them as thin doorway pages. Keep the set
// small and substantive rather than scaling near-identical templates.

export type LocalPage = {
  slug: string; // flat, root-level slug -> /<slug>
  title: string; // <title> + H1
  city: string;
  region: string;
  icon: string; // Lucide icon name
  intro: string;
  /** Unique, location-specific paragraph — the anti-doorway content. */
  context: string;
  highlights: string[];
  description: string; // SEO meta description
  /**
   * Optional single cross-reference to a related page. Rendered as a card in
   * the aside — keep it to one genuinely relevant link, not a link farm.
   */
  related?: { href: string; title: string; body: string };
};

/** A managed service, described the way the quote annex describes it. */
export type ManagedService = {
  name: string;
  /** The unit it is billed on, as the client counts it. */
  unit: string;
  body: string;
  /** The one exclusion or prerequisite a buyer most needs to know. */
  note?: string;
};

export type ServiceHub = {
  slug: string; // -> /diensten/<slug>
  navTitle: string;
  title: string;
  /** SEO <title> when it should differ from the H1. */
  metaTitle?: string;
  /** The named solution this hub sells (vault: pf-solutions-map). */
  solution: string;
  audience: string;
  icon: string; // Lucide icon name
  tagline: string;
  description: string;
  /**
   * Concise SEO meta description (≤155 chars). Falls back to `description`
   * when absent — kept separate so the on-page intro can be richer than the
   * snippet Google shows.
   */
  metaDescription?: string;
  /** The problem the solution names, in the buyer's words. */
  problem: { title: string; body: string };
  features: { title: string; body: string; icon: string }[];
  /** How the work runs, from first visit to what keeps it running. */
  steps?: { title: string; body: string }[];
  /** The managed services a client picks from (Packetflow Beheer). */
  services?: ManagedService[];
  /** An honest-limits line: what this solution is not. */
  limits?: string;
  /** A prerequisite worth saying before the quote (e.g. a licence level). */
  requirement?: string;
  /** What keeps it running after delivery. Rendered with a link to Beheer. */
  ongoing?: string;
  /**
   * Optional "verder lezen" block: contextual links from a hub into related
   * kennisbank-artikels. Keep it to a few genuinely relevant articles.
   */
  reading?: { href: string; title: string; body: string }[];
  locals: LocalPage[];
};

// The four steps every solution follows. Individual hubs override the third
// step, where the actual work differs.
const firstSteps = [
  {
    title: "Kennismaking en bezoek",
    body: "Gratis. We bespreken wat u nodig heeft, en ik kom kijken hoe het er vandaag bij ligt.",
  },
  {
    title: "Plan en offerte",
    body: "Een vaste prijs voor het project en, als u dat wil, een maandprijs voor het beheer daarna. Per dienst staat wat erin zit en wat niet.",
  },
];
const lastStep = {
  title: "Oplevering en beheer",
  body: "Alles gedocumenteerd in uw handen. Daarna blijft het bewaakt en bijgewerkt, met elke maand één pagina rapport.",
};

const beheerLine =
  "Na de oplevering houdt Packetflow Beheer het draaiende: bewaakt, bijgewerkt en gebackupt, met één vast aanspreekpunt en elke maand één pagina rapport.";

export const services: ServiceHub[] = [
  {
    slug: "kantoorverhuizing",
    navTitle: "Kantoorverhuizing",
    title: "De verhuizing zonder IT-zorgen",
    metaTitle: "Kantoorverhuizing: netwerk, wifi en IT goed geregeld",
    solution: "De verhuizing zonder IT-zorgen",
    audience: "Wie verhuist of verbouwt",
    icon: "truck",
    tagline:
      "Een verhuizing of verbouwing is hét moment om uw netwerk goed te leggen, terwijl de muren nog open liggen.",
    description:
      "Verhuist of verbouwt u? Dan kunnen het netwerk, de wifi en de firewall één keer goed gelegd worden, in plaats van jaren te leven met wat er toevallig lag. Ik maak een plan voor de werken starten, stem af met uw aannemer en elektricien, en lever alles gedocumenteerd op.",
    metaDescription:
      "Verhuizen of verbouwen? Ik plan uw netwerk, wifi en firewall voor de werken starten en lever alles gedocumenteerd op. Voor kantoren in West-Vlaanderen.",
    problem: {
      title: "Het moment dat u niet terugkrijgt",
      body: "Zodra de muren dicht zijn en de plafonds hangen, wordt elke extra kabel duur en lelijk. Wie de IT pas regelt als de verhuiswagen er staat, leeft jaren met een netwerk dat nooit goed gelegd werd: wifi die de vergaderzaal niet haalt, een patchkast vol ongelabelde kabels en één netwerk voor alles.",
    },
    features: [
      {
        icon: "clipboard-list",
        title: "Een plan voor de werken",
        body: "Ik bekijk de plannen van het pand en bepaal waar netwerkpunten, access points en de patchkast komen. Uw aannemer of elektricien krijgt een duidelijk plan mee.",
      },
      {
        icon: "network",
        title: "Firewall, switches en segmentatie",
        body: "Een degelijke netwerkbasis met aparte netwerken voor medewerkers, gasten en toestellen zoals printers. Een probleem op het ene netwerk slaat niet over naar het andere.",
      },
      {
        icon: "wifi",
        title: "Wifi in elke ruimte",
        body: "Access points op de juiste plek, bepaald op het plan en nagemeten ter plaatse. Van de onthaalbalie tot de vergaderzaal.",
      },
      {
        icon: "calendar-check",
        title: "Een overstapplan met terugvaloptie",
        body: "Per stap staat vast wat er gebeurt, wanneer, en wat we doen als iets niet loopt zoals gepland. Mail, bestanden en toestellen verhuizen mee, en waar nodig ook uw Microsoft 365.",
      },
      {
        icon: "file-text",
        title: "Gedocumenteerd opgeleverd",
        body: "Bij de oplevering krijgt u het netwerkschema, de configuratie en de labels in handen. Wie na mij aan uw netwerk werkt, begint niet bij nul.",
      },
    ],
    steps: [
      firstSteps[0],
      {
        title: "Plan en offerte",
        body: "Een netwerkplan en een vaste prijs voor het project, voor de werken starten. Zo kan uw aannemer er rekening mee houden.",
      },
      {
        title: "Installatie en overstap",
        body: "Afgestemd op de planning van de werken, met een terugvaloptie per stap. Voor stroomwerken werk ik samen met elektriciens.",
      },
      lastStep,
    ],
    ongoing:
      "Na de oplevering houdt Packetflow Network het netwerk van uw vestiging in de gaten: bewaking van de apparatuur en de internetverbinding, firmware-updates en een bewaarde configuratie.",
    locals: [],
  },
  {
    slug: "cloud-backup-beveiliging",
    navTitle: "Beveiliging & back-up",
    title: "Beveilig de praktijk",
    metaTitle: "Beveiliging en back-up voor praktijken en kantoren",
    solution: "Beveilig de praktijk",
    audience: "Praktijken & kantoren",
    icon: "shield-check",
    tagline:
      "Gevoelige gegevens beschermd, toegang geregeld en aantoonbaar terug te zetten. Zonder dat u zelf IT-expert moet worden.",
    description:
      "Een praktijk of kantoor bewaart gegevens die privé moeten blijven: patiëntendossiers, cliëntdossiers, contracten. Ik zorg dat uw toestellen en Microsoft 365-accounts dag en nacht bewaakt worden, dat alleen de juiste mensen binnenraken en dat uw back-ups niet alleen bestaan, maar ook getest zijn.",
    metaDescription:
      "Beveiliging en back-up voor praktijken en kantoren: 24/7 bewaakte toestellen en accounts, tweestapsverificatie en back-ups met hersteltest.",
    problem: {
      title: "Een back-up die nooit werd teruggezet, is een hoop",
      body: "Bijna iedereen zegt dat er back-ups zijn. Bijna niemand heeft ooit gezien dat er één werd teruggezet. Met toegang is het net zo: alles lijkt in orde, tot een mailbox wordt overgenomen en er uit uw naam een valse factuur vertrekt.",
    },
    features: [
      {
        icon: "shield-check",
        title: "Toestellen dag en nacht bewaakt",
        body: "Elk beheerd toestel krijgt Packetflow Secure: bewaking en respons met Huntress, opgevolgd door een bemand beveiligingscentrum dat een aangetast toestel zelf van het netwerk kan afsluiten.",
      },
      {
        icon: "user-check",
        title: "Microsoft 365-accounts beschermd",
        body: "Met Packetflow Identity bewaakt Petra Security uw aanmeldingen, mail en gedeelde bestanden dag en nacht tegen accountovername en factuurfraude, en grijpt zelf in bij een incident.",
      },
      {
        icon: "lock",
        title: "Tweestapsverificatie en toegangsregels",
        body: "Ik ontwerp en beheer wie waar kan aanmelden, en van op welk toestel. Wie vertrekt, verliest meteen de toegang.",
      },
      {
        icon: "database",
        title: "Back-ups met een hersteltest",
        body: "Toestellen en Microsoft 365 (mail, OneDrive, SharePoint en Teams) worden gebackupt met Acronis. Twee keer per jaar zet ik een steekproef terug en controleer ik of die bruikbaar is. Getest, niet gehoopt.",
      },
      {
        icon: "file-check",
        title: "Elke maand één pagina rapport",
        body: "Over al uw diensten samen: wat er liep, wat er gebeurde en wat aandacht vraagt. Het resultaat van de hersteltests staat erin.",
      },
    ],
    steps: [
      ...firstSteps,
      {
        title: "Overname",
        body: "Oude beveiliging eraf, nieuwe erop, tweestapsverificatie voor iedereen en een back-upplan dat alles omvat. Volgens een plan met datum.",
      },
      lastStep,
    ],
    requirement:
      "Voor tweestapsverificatie en toegangsregels is Microsoft 365 Business Premium nodig (of een licentie met Entra ID P1). Dat controleer ik voor de offerte, zodat u achteraf niet ontdekt dat een regel stilletjes niet werkt.",
    ongoing: beheerLine,
    reading: [
      {
        href: "/blog/nis2-kleine-ondernemingen-belgie",
        title: "NIS2 voor kleine ondernemingen",
        body: "Geldt NIS2 voor uw zaak, en wat vraagt een klant die er wel onder valt van u als leverancier?",
      },
    ],
    locals: [],
  },
  {
    slug: "moderne-werkplek",
    navTitle: "Moderne werkplek",
    title: "Moderne werkplek",
    metaTitle: "Microsoft 365 goed ingericht voor kantoren",
    solution: "Moderne werkplek",
    audience: "Kantoren & vrije beroepen",
    icon: "laptop",
    tagline:
      "Microsoft 365 dat gewoon werkt: veilig, mobiel en klaar voor e-facturatie. Eén keer goed ingericht, in plaats van toevallig gegroeid.",
    description:
      "Advocaten, architecten, accountants en andere kantoren werken de hele dag in Microsoft 365. Ik richt uw omgeving één keer goed in: mail op uw eigen domein, gedeelde mappen met duidelijke rechten, toestellen die zichzelf inrichten en bijwerken, en Peppol-e-facturatie die aansluit op uw boekhouding.",
    metaDescription:
      "Microsoft 365 goed ingericht voor kantoren en vrije beroepen: veilige mail en bestanden, beheerde toestellen en Peppol-e-facturatie.",
    problem: {
      title: "Gegroeid, niet ontworpen",
      body: "De meeste Microsoft 365-omgevingen zijn niet ontworpen maar gegroeid: een beheerdersaccount dat niemand nog kent, gedeelde mappen waar iedereen overal bij kan, licenties die niet passen bij het gebruik. Het werkt, tot iemand vertrekt of een nieuwe collega start.",
    },
    features: [
      {
        icon: "mail",
        title: "Microsoft 365 correct ingericht",
        body: "Mail op uw eigen domein, Teams en SharePoint met een logische structuur, en licenties die passen bij wat elke medewerker echt gebruikt. Met Packetflow Tenantbeheer blijft dat ook zo.",
      },
      {
        icon: "laptop",
        title: "Toestellen die zichzelf inrichten",
        body: "Met Packetflow Toestelbeheer schrijven nieuwe laptops zich in via Microsoft Intune en Autopilot en krijgen ze vanzelf de juiste instellingen en programma's. Updates gebeuren maandelijks, kritieke lekken uiterlijk binnen de week.",
      },
      {
        icon: "shield-check",
        title: "Veilig van bij de start",
        body: "Tweestapsverificatie, toegangsregels en 24/7 bewaking van uw accounts met Packetflow Identity. Uw dossiers blijven vertrouwelijk.",
      },
      {
        icon: "database",
        title: "Een echte back-up van mail en bestanden",
        body: "De bewaartermijn van Microsoft is geen back-up. Met Packetflow Backup – M365 staan mail, OneDrive, SharePoint en Teams apart veilig, met een hersteltest twee keer per jaar.",
      },
      {
        icon: "file-check",
        title: "Peppol-e-facturatie",
        body: "De overstap naar Peppol als eenmalig project, afgestemd met uw boekhouder en gekoppeld aan uw facturatiesoftware.",
      },
      {
        icon: "sparkles",
        title: "Copilot, als u dat wil",
        body: "Wilt u Microsoft 365 Copilot gebruiken, dan richt ik het in met duidelijke afspraken over welke gegevens het wel en niet mag zien.",
      },
    ],
    steps: [
      ...firstSteps,
      {
        title: "Inrichting of opkuis",
        body: "Een nieuwe omgeving opzetten, of een bestaande opruimen: beheerders, rechten, licenties en toestellen. Volgens een plan, zonder dat uw werk stilvalt.",
      },
      lastStep,
    ],
    requirement:
      "Voor toestelbeheer en toegangsregels is Microsoft 365 Business Premium nodig. Dat controleer ik voor de offerte, zodat u achteraf niet merkt dat een instelling niet werkt.",
    ongoing: beheerLine,
    locals: [],
  },
  {
    slug: "zakelijke-wifi-netwerken",
    navTitle: "Wifi & netwerken",
    title: "Zakelijke wifi & netwerken",
    solution: "Gastnetwerk dat klopt",
    audience: "Horeca, B&B's & kantoren",
    icon: "wifi",
    tagline:
      "Gasten online zonder dat ze ooit aan uw kassa, boekhouding of camera's kunnen. En wifi die overeind blijft tijdens de piek.",
    description:
      "Professionele wifi en netwerken voor horeca, B&B's en kantoren. Een betrouwbaar gastennetwerk met volledige dekking, en daarnaast een gescheiden netwerk voor uw eigen systemen, zodat een volle zaak nooit uw betaalterminal plat legt.",
    metaDescription:
      "Professionele wifi en netwerken voor horeca, B&B's en kantoren: een betrouwbaar gastennetwerk, gescheiden van uw kassa en eigen systemen.",
    problem: {
      title: "Eén netwerk voor alles",
      body: "De router van de provider zet gasten, kassa, reservatiesoftware en camera's op hetzelfde netwerk. Een gast met een besmette laptop staat dan technisch naast uw betaalterminal, en één zware download vertraagt de hele zaak.",
    },
    features: [
      {
        icon: "wifi",
        title: "Dekking tot in de verste kamer",
        body: "Meerdere access points onder één netwerknaam, op de juiste plek. Van het terras tot de zolderkamer, zonder dat gasten opnieuw moeten inloggen.",
      },
      {
        icon: "split",
        title: "Gasten gescheiden van uw systemen",
        body: "Gasten zien alleen internet: niet uw kassa, niet uw boekhouding en ook niet elkaars toestellen. Uw eigen systemen zitten in een apart, afgeschermd netwerk.",
      },
      {
        icon: "activity",
        title: "Overeind tijdens de piek",
        body: "De bandbreedte wordt eerlijk verdeeld, en uw eigen systemen krijgen voorrang. Eén downloadende gast legt de zaak niet stil.",
      },
      {
        icon: "network",
        title: "Elk toestel op zijn plek",
        body: "Kassa, betaalterminal, printers en uw bestaande camera's elk in een eigen netwerk, met duidelijke regels over wat met wat mag praten.",
      },
      {
        icon: "radar",
        title: "Bewaakt na de installatie",
        body: "Packetflow Network houdt de apparatuur en de internetverbinding in de gaten. Bij een storing zoek ik eerst van op afstand, en terugkerende storingen worden tot op de oorzaak uitgezocht.",
      },
    ],
    steps: [
      firstSteps[0],
      {
        title: "Meting en offerte",
        body: "Ik meet de dekking ter plaatse, bekijk uw plattegrond en stel voor wat echt nodig is. Daarna krijgt u een vaste prijs.",
      },
      {
        title: "Installatie",
        body: "Access points, switches en firewall geplaatst en ingesteld, op een moment dat uw zaak niet stilvalt.",
      },
      lastStep,
    ],
    ongoing:
      "Na de installatie houdt Packetflow Network uw netwerk draaiende: bewaking, firmware-updates gekozen op stabiliteit en een bewaarde configuratie.",
    reading: [
      {
        href: "/blog/kassanetwerk-scheiden-horeca",
        title: "Gasten- en kassanetwerk scheiden",
        body: "Waarom uw kassa niet op hetzelfde netwerk hoort als de gastenwifi, en hoe segmentatie dat oplost.",
      },
      {
        href: "/blog/wifi-bnb-volledige-dekking",
        title: "Wifi voor een B&B",
        body: "Waarom boosters tekortschieten en hoe u elke kamer van een sterk signaal voorziet.",
      },
    ],
    locals: [
      {
        slug: "wifi-installatie-horeca-jabbeke",
        title: "WiFi-installatie horeca Jabbeke",
        city: "Jabbeke",
        region: "West-Vlaanderen",
        icon: "wifi",
        intro:
          "Professionele wifi voor horeca in Jabbeke. Een stabiel gastennetwerk en een gescheiden kassanetwerk dat blijft werken.",
        context:
          "Een zaak langs de baan of aan de afrit in Jabbeke trekt passanten én vaste klanten, en die verwachten werkende wifi en een kassa die niet uitvalt op het drukste moment. Ik scheid uw gastennetwerk van uw kassa- en boekhoudsysteem, zodat een volle zaak nooit uw betaalterminal plat legt.",
        highlights: [
          "Wifi op maat van horeca in Jabbeke",
          "Gescheiden gasten- en kassanetwerk",
          "Volledige dekking, ook op het terras",
          "Lokale installatie, daarna bewaakt op afstand",
        ],
        description:
          "WiFi-installatie voor horeca in Jabbeke. Stabiel gastennetwerk, gescheiden kassanetwerk en volledige dekking, lokaal geïnstalleerd en beheerd.",
        related: {
          href: "/blog/kassanetwerk-scheiden-horeca",
          title: "Waarom uw kassa en gastenwifi gescheiden horen",
          body: "Gasten op hetzelfde netwerk als uw kassa is een veiligheidsrisico. Lees hoe netwerksegmentatie dat in de horeca oplost.",
        },
      },
      {
        slug: "gastennetwerk-bnb-brugse-ommeland",
        title: "Gastennetwerk B&B Brugse Ommeland",
        city: "Brugse Ommeland",
        region: "West-Vlaanderen",
        icon: "bed-double",
        intro:
          "Een betrouwbaar gastennetwerk voor B&B's en boutique hotels in het Brugse Ommeland. Tevreden gasten, veilig gescheiden van uw eigen systemen.",
        context:
          "In het Brugse Ommeland, van Damme en Beernem tot Zedelgem en Torhout, draait gastvrijheid steeds vaker op een goede review, en 'trage wifi' is een klassieke klacht. Ik zorg voor dekking in elke kamer en de tuin, met een eenvoudige aanmelding voor gasten en uw eigen netwerk veilig apart. Geen gedeeld wachtwoord dat al jaren op een briefje staat.",
        highlights: [
          "Volledige dekking in alle kamers én buiten",
          "Eenvoudige aanmelding, geen briefje met wachtwoord",
          "Uw eigen netwerk veilig gescheiden",
          "Minder 'de wifi doet het niet'-reviews",
        ],
        description:
          "Gastennetwerk voor B&B's en boutique hotels in het Brugse Ommeland. Betrouwbare wifi in alle kamers, veilig gescheiden van uw eigen systemen.",
        related: {
          href: "/blog/wifi-bnb-volledige-dekking",
          title: "Wifi voor een B&B: volledige dekking",
          body: "Waarom boosters en powerline tekortschieten, en hoe access points, kanaalkeuze en antennes samen elke kamer bereiken.",
        },
      },
      {
        slug: "stabiel-netwerk-kmo-oostende",
        title: "Stabiel netwerk KMO Oostende",
        city: "Oostende",
        region: "West-Vlaanderen",
        icon: "network",
        intro:
          "Een stabiel en veilig bedrijfsnetwerk voor kantoren in Oostende. Een degelijke netwerkbasis, wifi en beheer onder één dak.",
        context:
          "Oostende combineert kantoren, praktijken en zaken die het hele jaar door moeten draaien. Voor een groeiend kantoor is het netwerk vaak de zwakke schakel: een mix van oude switches en goedkope routers die niemand nog durft aan te raken. Ik leg een propere basis, met een degelijk netwerk en wifi die meegroeit, zodat u er niet meer aan hoeft te denken.",
        highlights: [
          "Een degelijke netwerkbasis, gedocumenteerd",
          "Zakelijke wifi die meegroeit met uw kantoor",
          "Veilig gescheiden per toepassing",
          "Beheer en opvolging op afstand",
        ],
        description:
          "Stabiel bedrijfsnetwerk voor kantoren in Oostende. Een degelijke netwerkbasis, zakelijke wifi en netwerkbeheer onder één dak.",
        related: {
          href: "/diensten/kantoorverhuizing",
          title: "Verhuist of verbouwt uw kantoor?",
          body: "Dan is dit hét moment om het netwerk goed te leggen, terwijl de muren nog open liggen.",
        },
      },
    ],
  },
  {
    slug: "bedrijfssoftware-eigen-beheer",
    navTitle: "Bedrijfssoftware",
    title: "Uw bedrijfssoftware, in eigen beheer",
    metaTitle: "Bedrijfssoftware zelf hosten, goed gedaan",
    solution: "Uw bedrijfssoftware, in eigen beheer",
    audience: "Kantoren & KMO's",
    icon: "server",
    tagline:
      "Draait uw bedrijf op één systeem en wilt u het zelf hosten? Dan hoort het goed te staan: bijgewerkt, gebackupt en gedocumenteerd.",
    description:
      "Planning, facturatie, ERP: veel bedrijven draaien op één systeem. Soms is er een goede reden om dat zelf te hosten, op een eigen server of in een Europese cloudomgeving: de kost, controle over uw gegevens, of een contract dat afloopt. Ik zorg dat het dan degelijk gebeurt, en ik zeg u ook eerlijk als de cloud van de leverancier voor u de betere keuze is.",
    metaDescription:
      "Bedrijfssoftware zelf hosten op een eigen server of een Europese cloud: geïnstalleerd, gebackupt met geteste terugzet, gedocumenteerd en beheerd.",
    problem: {
      title: "Uw facturatie op een server die niemand bijwerkt",
      body: "Zelf hosten, slecht gedaan, betekent: het systeem waar u van factureert staat op een server die niemand bijwerkt, zonder geteste back-up, en alleen wie het installeerde weet hoe het in elkaar zit.",
    },
    features: [
      {
        icon: "scale",
        title: "Eerst de eerlijke vraag",
        body: "Is zelf hosten wel de beste keuze? De cloudversie van de leverancier is vaak goedkoper en minder risico voor een bedrijf van uw grootte. Blijft zelf hosten de beste keuze, dan weet u ook waarom.",
      },
      {
        icon: "server",
        title: "Eigen server of Europese cloud",
        body: "Een server bij u ter plaatse, of een virtuele machine bij een Europese cloudaanbieder op uw eigen account. De gegevens en de rekening blijven van u.",
      },
      {
        icon: "package",
        title: "Installatie en migratie",
        body: "Besturingssysteem en applicatie geïnstalleerd, uw gegevens overgezet, en getest voor u overstapt.",
      },
      {
        icon: "database",
        title: "Een back-up die terug te zetten is",
        body: "Een consistente back-up van de database, niet zomaar een kopie van de bestanden, en een terugzet die ik effectief heb uitgevoerd voor het systeem live gaat.",
      },
      {
        icon: "file-text",
        title: "Gedocumenteerd en beheerd",
        body: "U krijgt de volledige documentatie in handen. Daarna houd ik server en applicatie bijgewerkt en in de gaten.",
      },
    ],
    steps: [
      firstSteps[0],
      {
        title: "Advies en offerte",
        body: "Zelf hosten of de cloud van de leverancier, met de redenering erbij. Kiest u voor zelf hosten, dan krijgt u een vaste prijs voor de opbouw.",
      },
      {
        title: "Opbouw en migratie",
        body: "Server of cloudomgeving, installatie, migratie en een geteste terugzet, voor u erop overstapt.",
      },
      lastStep,
    ],
    limits:
      "Wat ik niet doe: de software zelf programmeren of op maat aanpassen. Ik zorg dat ze draait, veilig en herstelbaar. Voor aanpassingen blijft uw softwareleverancier het aanspreekpunt.",
    ongoing: beheerLine,
    locals: [],
  },
  {
    slug: "it-beheer-support",
    navTitle: "IT-beheer",
    title: "IT-beheer & support",
    metaTitle: "IT-beheer voor praktijken, kantoren en KMO's",
    solution: "Packetflow Beheer",
    audience: "Praktijken, kantoren & KMO's",
    icon: "life-buoy",
    tagline:
      "Eens alles goed staat, moet iemand het zo houden: bewaakt, bijgewerkt en gebackupt. Met één vast aanspreekpunt dat uw omgeving kent.",
    description:
      "Packetflow Beheer houdt uw IT draaiende na de oplevering. U kiest de diensten die u nodig heeft en betaalt per maand, per eenheid die u zelf kan tellen: een toestel, een gebruiker, uw Microsoft 365-omgeving of een vestiging. Elke maand krijgt u één pagina rapport, en u blijft eigenaar van alles.",
    metaDescription:
      "IT-beheer per dienst voor praktijken, kantoren en KMO's: 24/7 bewaakte toestellen, updates, geteste back-ups en elke maand een rapport.",
    problem: {
      title: "De computerman die nooit opneemt",
      body: "Veel kleine bedrijven hebben geen IT-beheer, maar iemand die af en toe komt als er iets stuk is. Tussen twee bezoeken ziet niemand of de updates liepen, of de back-up nog werkt en wie er nog toegang heeft.",
    },
    features: [
      {
        icon: "handshake",
        title: "Eén vast aanspreekpunt",
        body: "Altijd dezelfde persoon, die uw omgeving en uw mensen kent. U mailt naar support@packetflow.be en weet wie het leest.",
      },
      {
        icon: "file-check",
        title: "Elke maand één pagina rapport",
        body: "Over al uw diensten samen: wat er liep, wat er gebeurde en wat aandacht vraagt. In mensentaal.",
      },
      {
        icon: "key-round",
        title: "U blijft eigenaar van alles",
        body: "Uw Microsoft 365-omgeving, uw gegevens en de beheerderstoegang staan op uw naam. U zit nooit vast, ook niet aan mij.",
      },
      {
        icon: "clipboard-check",
        title: "Gedocumenteerd",
        body: "Wat ik beheer, is beschreven. Wie na mij komt, kan morgen verder zonder bij nul te beginnen.",
      },
    ],
    services: [
      {
        name: "Packetflow Secure",
        unit: "per toestel",
        body: "Bewaking en respons (EDR) met Huntress, 24/7 opgevolgd door een bemand beveiligingscentrum dat een aangetast toestel zelf kan isoleren. Een detectie wordt onderzocht en hersteld, van op afstand. Dit is de basis: elk beheerd toestel heeft Packetflow Secure.",
        note: "Updates en patches zitten in Packetflow Toestelbeheer.",
      },
      {
        name: "Packetflow Toestelbeheer",
        unit: "per toestel",
        body: "Inrichting via Microsoft Intune en Autopilot, updates van Windows en andere software (maandelijks, kritieke lekken uiterlijk binnen de week), opvolging van kwetsbaarheden en hulp van op afstand.",
        note: "Vraagt Microsoft 365 Business Premium en Packetflow Secure op hetzelfde toestel.",
      },
      {
        name: "Packetflow Identity",
        unit: "per gebruiker",
        body: "Petra Security bewaakt uw Microsoft 365 dag en nacht tegen accountovername en factuurfraude, en grijpt zelf in. Tweestapsverificatie, toegangsregels en mailbeveiliging, ontworpen en beheerd door mij.",
        note: "Vraagt Microsoft 365 Business Premium (of Entra ID P1).",
      },
      {
        name: "Packetflow Tenantbeheer",
        unit: "per Microsoft 365-omgeving",
        body: "Bewaking van de diensten, de mailstroom en de licenties. Instellingen, mailregels en deelinstellingen beheerd en bijgehouden, en onderzoek en herstel als mail niet toekomt.",
        note: "Verhuizingen tussen omgevingen en domeinwijzigingen zijn een project.",
      },
      {
        name: "Packetflow Backup – Lokaal",
        unit: "per toestel",
        body: "Back-up van de gegevens op een toestel of server naar de cloud van Acronis, met 300 GB opslag inbegrepen, bewaking van elke taak en twee keer per jaar een hersteltest.",
        note: "Voor grote hoeveelheden servergegevens bestaat een aparte oplossing.",
      },
      {
        name: "Packetflow Backup – M365",
        unit: "per gebruiker",
        body: "Back-up van Exchange, OneDrive, SharePoint en Teams met Acronis. Elke maand controleer ik of elke gebruiker in het plan zit, en twee keer per jaar volgt een hersteltest.",
        note: "Wettelijke bewaring en eDiscovery vallen erbuiten.",
      },
      {
        name: "Packetflow Network",
        unit: "per vestiging",
        body: "Bewaking van firewall, switches, wifi en internetverbinding. De configuratie wordt bewaard, firmware-updates worden gekozen op stabiliteit, en storingen worden eerst van op afstand onderzocht.",
        note: "De internetverbinding zelf en bekabeling vallen erbuiten.",
      },
    ],
    limits:
      "Altijd apart: hardware, Microsoft-licenties, projecten (een overname, migratie, herinrichting of nieuwe installatie) en forensisch onderzoek na een bevestigde inbraak. Aanvragen die niet op de vaste lijst van een dienst staan, worden eerst geoffreerd en pas uitgevoerd na uw akkoord.",
    reading: [
      {
        href: "/blog/wat-kost-it-beheer-kleine-onderneming",
        title: "Wat kost IT-beheer voor een kleine onderneming?",
        body: "Waar de prijs van afhangt, wat er in een maandprijs hoort te zitten en hoe u offertes eerlijk vergelijkt.",
      },
      {
        href: "/blog/nis2-kleine-ondernemingen-belgie",
        title: "NIS2 voor kleine ondernemingen",
        body: "Geldt NIS2 voor uw zaak, en wat vraagt een klant die er wel onder valt van u als leverancier?",
      },
    ],
    locals: [
      {
        slug: "it-partner-jabbeke",
        title: "IT-partner Jabbeke",
        city: "Jabbeke",
        region: "West-Vlaanderen",
        icon: "map-pin",
        intro:
          "Uw IT-partner letterlijk om de hoek. Ik werk vanuit Jabbeke, persoonlijk en met één vast aanspreekpunt voor uw kantoor.",
        context:
          "Packetflow is gevestigd in Jabbeke, dit is mijn thuisbasis. Voor kantoren in Jabbeke, Varsenare, Snellegem en Zerkegem betekent dat een korte verplaatsing als het ter plaatse moet, en iemand die de buurt kent. Veel van mijn klanten kwamen via mond-tot-mond uit de buurt.",
        highlights: [
          "Thuisbasis: ik woon en werk in Jabbeke",
          "Korte verplaatsing voor een bezoek ter plaatse",
          "Eén vast aanspreekpunt dat uw zaak kent",
          "Bereikbaar op weekdagen 's avonds en op zaterdagvoormiddag",
        ],
        description:
          "IT-partner in Jabbeke voor kantoren en praktijken. IT-beheer, Microsoft 365, back-up en beveiliging, met één vast aanspreekpunt om de hoek.",
      },
      {
        slug: "it-support-oudenburg",
        title: "IT-support Oudenburg",
        city: "Oudenburg",
        region: "West-Vlaanderen",
        icon: "life-buoy",
        intro:
          "Betrouwbare IT voor praktijken en kantoren in Oudenburg, van apotheek en tandarts tot advocaat, architect en makelaar. Eén aanspreekpunt voor beheer, support en beveiliging.",
        context:
          "Oudenburg ligt op een steenworp van Jabbeke, langs de as richting Oostende. Voor de zelfstandigen en kleine praktijken hier ben ik dichtbij genoeg om langs te komen wanneer het ter plaatse moet. Ideaal als uw huidige 'IT-er' een neef is die nooit tijd heeft.",
        highlights: [
          "Dichtbij, vanuit het nabijgelegen Jabbeke",
          "Toestellen bewaakt en bijgewerkt, met een maandrapport",
          "Alles gedocumenteerd en in uw handen",
          "Persoonlijk: dezelfde persoon, elke keer",
        ],
        description:
          "IT-support in Oudenburg voor praktijken en kantoren. IT-beheer, Microsoft 365 en beveiliging met één vast aanspreekpunt uit het nabije Jabbeke.",
      },
      {
        slug: "managed-it-west-vlaanderen",
        title: "Managed IT West-Vlaanderen",
        city: "West-Vlaanderen",
        region: "West-Vlaanderen",
        icon: "map",
        intro:
          "Beheerde IT voor kleine kantoren en bedrijven in heel West-Vlaanderen. Ik neem het beheer van uw IT-omgeving uit handen, bewaakt en gedocumenteerd.",
        context:
          "Niet elk kantoor zit om de hoek, en dat hoeft ook niet. Het meeste beheer en de bewaking gebeuren op afstand: ik zie problemen en los ze op zonder dat ik fysiek moet langskomen. Voor de momenten dat het wél ter plaatse moet, plan ik gericht in. Zo werk ik voor kantoren van Brugge tot de kust met dezelfde persoonlijke aanpak.",
        highlights: [
          "Beheer en bewaking grotendeels op afstand",
          "Gericht ter plaatse wanneer het echt nodig is",
          "U kiest per dienst: beveiliging, back-up, Microsoft 365, netwerk",
          "Eén partner voor uw hele IT, regiobreed",
        ],
        description:
          "Managed IT in West-Vlaanderen voor kleine kantoren en bedrijven. Beheer per dienst: beveiliging, back-up, Microsoft 365 en netwerk.",
      },
    ],
  },
];

export function getHub(slug: string): ServiceHub | undefined {
  return services.find((s) => s.slug === slug);
}

export function allLocals(): (LocalPage & { hub: ServiceHub })[] {
  return services.flatMap((hub) => hub.locals.map((local) => ({ ...local, hub })));
}
