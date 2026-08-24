// Single source of truth for the three Service Hubs and their local SEO
// landing pages. Pages are generated from this data:
//   - /diensten                       -> overview of all hubs
//   - /diensten/[hub]                 -> a service hub
//   - /[local]                        -> a local landing page (flat slug, best
//                                        for local search e.g. /it-support-oudenburg)
//
// Voice: Dutch (Flemish), formal "u", first person (Louis). Warm, plain-spoken.
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
   * Optional single cross-reference to a related standalone page (e.g. the
   * Guesty/PMS landing page). Rendered as a card in the aside — keep it to one
   * genuinely relevant link, not a link farm.
   */
  related?: { href: string; title: string; body: string };
};

export type ServiceHub = {
  slug: string; // -> /diensten/<slug>
  navTitle: string;
  title: string;
  audience: string;
  icon: string; // Lucide icon name
  tagline: string;
  description: string;
  /**
   * Concise SEO meta description (≤155 chars). Falls back to `description`
   * when absent — kept separate so the on-page intro can be richer than the
   * snippet Google shows. See the diensten hub template.
   */
  metaDescription?: string;
  features: { title: string; body: string; icon: string }[];
  /**
   * Optional post-oplevering line shown low on the page. Frames the €49/maand
   * monitoring as a project-attach ("na de oplevering"), so it reads as an
   * add-on to this dienst — not a cheaper managed-IT tier that undercuts beheer.
   */
  aftercare?: string;
  /**
   * Optional pricing ladder. Used on it-beheer-support to make the two levels
   * explicit — €49 = monitoring of wat ik installeerde, beheer per module =
   * volledige ontzorging — so a kantoor-klant niet op het laagste cijfer ankert.
   */
  ladder?: {
    title: string;
    intro?: string;
    tiers: { price: string; name: string; body: string; href?: string }[];
  };
  /**
   * Optional "verder lezen" block: contextual links from a service hub into
   * related kennisbank-artikels. This is the cheapest internal-linking lever —
   * it points link equity at blog posts that otherwise sit isolated. Keep it to
   * a few genuinely relevant articles, not a link farm.
   */
  reading?: { href: string; title: string; body: string }[];
  locals: LocalPage[];
};

export const services: ServiceHub[] = [
  {
    slug: "it-beheer-support",
    navTitle: "IT-Beheer & Support",
    title: "IT-beheer & support",
    audience: "Praktijken & kantoren",
    icon: "life-buoy",
    tagline:
      "Eén aanspreekpunt dat uw kantoor kent — geen wachtrij, geen wisselende technici.",
    description:
      "Ik neem het volledige beheer en de support van uw IT in handen. Altijd dezelfde persoon die uw kantoor en uw dossiers kent, proactief bewaakt en bereikbaar buiten de kantooruren.",
    metaDescription:
      "Volledig beheer en support van uw IT door één vast aanspreekpunt. Proactief bewaakt en bereikbaar buiten de kantooruren. Lokaal in West-Vlaanderen.",
    features: [
      {
        icon: "radar",
        title: "Proactieve monitoring",
        body: "Ik bewaak uw systemen op de achtergrond en grijp in vóór er iets stilvalt — vaak vóór u het merkt.",
      },
      {
        icon: "handshake",
        title: "Eén vast aanspreekpunt",
        body: "Altijd dezelfde persoon. Geen ticketnummer, geen wachtrij, geen wisselende technici bij uw dossiers.",
      },
      {
        icon: "clock",
        title: "Onderhoud buiten de uren",
        body: "Updates en onderhoud gebeuren 's avonds en in het weekend — zonder uw werk te onderbreken.",
      },
      {
        icon: "clipboard-check",
        title: "Doordacht opgebouwd",
        body: "Uw IT als een doordacht geheel: gedocumenteerd, beveiligd en herstelbaar — en transparant op de factuur, u betaalt voor het werk.",
      },
    ],
    ladder: {
      title: "Monitoring of volledige ontzorging?",
      intro:
        "Twee duidelijk verschillende niveaus. Het ene bewaakt wat ik voor u installeerde, het andere neemt uw hele IT uit handen — kies wat bij uw kantoor past.",
      tiers: [
        {
          price: "vanaf €49 / maand",
          name: "Monitoring & onderhoud",
          body: "Ik hou de IT die ik voor u installeerde in de gaten: monitoring, updates en een maandelijkse check. Ideaal als u het meeste zelf regelt en gewoon zeker wilt zijn dat alles blijft draaien.",
        },
        {
          price: "vanaf €15 / toestel / maand",
          name: "Beheer — volledige ontzorging per module",
          body: "Niet alleen bewaking, maar uw hele IT uit handen: beveiliging, Microsoft 365-bescherming, back-up en netwerk. U kiest per module wat u nodig heeft en betaalt per toestel of per gebruiker, maandelijks opzegbaar.",
          href: "/prijzen",
        },
      ],
    },
    reading: [
      {
        href: "/blog/nis2-kleine-ondernemingen-belgie",
        title: "NIS2-compliance voor KMO's",
        body: "Geldt NIS2 voor uw KMO, en wat verwacht een NIS2-plichtige klant van u als leverancier? Wat goed IT-beheer daar standaard voor regelt.",
      },
      {
        href: "/blog/wat-kost-it-beheer-kleine-onderneming",
        title: "Wat kost IT-beheer voor een kleine onderneming?",
        body: "Een eerlijk prijsoverzicht: het uurtarief, de urenkaart, beheer per module en waar bij andere aanbieders de verborgen kosten zich verstoppen.",
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
          "Uw IT-partner letterlijk om de hoek. Ik werk vanuit Jabbeke en sta snel bij u — persoonlijk en met een vast aanspreekpunt voor uw kantoor.",
        context:
          "Packetflow is gevestigd in Jabbeke — dit is mijn thuisbasis. Voor kantoren in Jabbeke, Varsenare, Snellegem en Zerkegem betekent dat: ik ben vaak binnen het halfuur ter plaatse als het echt nodig is, en ik ken de lokale context. Veel van mijn klanten kwamen via mond-tot-mond uit de buurt.",
        highlights: [
          "Thuisbasis: ik woon en werk in Jabbeke",
          "Vaak binnen het halfuur ter plaatse",
          "Eén vast aanspreekpunt dat uw zaak kent",
          "Beschikbaar 's avonds en in het weekend",
        ],
        description:
          "IT-partner in Jabbeke voor kleine kantoren. Lokale IT-support, Microsoft 365, backup en beveiliging met één vast aanspreekpunt om de hoek.",
      },
      {
        slug: "it-support-oudenburg",
        title: "IT-support Oudenburg",
        city: "Oudenburg",
        region: "West-Vlaanderen",
        icon: "life-buoy",
        intro:
          "Betrouwbare IT-support voor praktijken en kantoren in Oudenburg — van apotheek en tandarts tot advocaat, architect en makelaar. Eén lokaal aanspreekpunt voor beheer, support en beveiliging.",
        context:
          "Oudenburg ligt op een steenworp van Jabbeke, langs de as richting Oostende. Voor de zelfstandigen en kleine praktijken hier ben ik dichtbij genoeg om snel langs te komen, zonder de verplaatsingskosten van een IT-bedrijf uit de stad. Ideaal als uw huidige 'IT-er' een neef is die nooit tijd heeft.",
        highlights: [
          "Snel ter plaatse vanuit het nabijgelegen Jabbeke",
          "Geen verplaatsingskosten van een stadskantoor",
          "Proactief beheer en snelle interventie",
          "Persoonlijk: dezelfde persoon, elke keer",
        ],
        description:
          "IT-support in Oudenburg voor medische praktijken en professionele kantoren. Lokale IT-partner voor proactief beheer, Microsoft 365 en cybersecurity.",
      },
      {
        slug: "managed-it-west-vlaanderen",
        title: "Managed IT West-Vlaanderen",
        city: "West-Vlaanderen",
        region: "West-Vlaanderen",
        icon: "map",
        intro:
          "Beheerde IT voor kleine kantoren in heel West-Vlaanderen. Ik neem het volledige beheer van uw IT-omgeving uit handen, proactief bewaakt.",
        context:
          "Niet elk kantoor zit om de hoek — en dat hoeft ook niet. Het meeste beheer en de monitoring gebeuren op afstand: ik zie problemen en los ze op zonder dat ik fysiek moet langskomen. Voor de momenten dat het wél ter plaatse moet, plan ik gericht in. Zo bedien ik kantoren van Brugge tot de kust met dezelfde persoonlijke aanpak.",
        highlights: [
          "Beheer en monitoring grotendeels op afstand",
          "Gericht ter plaatse wanneer het echt nodig is",
          "Microsoft 365, backup en Peppol inbegrepen",
          "Eén partner voor uw hele IT, regiobreed",
        ],
        description:
          "Managed IT in West-Vlaanderen voor kleine kantoren. Volledig beheerde IT-omgeving met proactieve monitoring, support, backup en beveiliging.",
      },
    ],
  },
  {
    slug: "zakelijke-wifi-netwerken",
    navTitle: "Zakelijke WiFi & Netwerken",
    title: "Zakelijke WiFi & netwerken",
    audience: "Horeca, B&B's & kantoren",
    icon: "wifi",
    tagline: "Een stabiel, veilig netwerk dat altijd werkt — ook tijdens de piek.",
    description:
      "Professionele WiFi en netwerken voor horeca, B&B's en kantoren. Van een betrouwbaar gastennetwerk tot een gescheiden kassanetwerk dat online blijft, ook op de drukste momenten.",
    metaDescription:
      "Professionele WiFi en netwerken voor horeca, B&B's en kantoren: betrouwbaar gastennetwerk en gescheiden kassanetwerk dat online blijft tijdens de piek.",
    features: [
      {
        icon: "wifi",
        title: "Naadloze WiFi-dekking",
        body: "Volledige dekking zonder dode zones — van het terras tot in de verste kamer.",
      },
      {
        icon: "split",
        title: "Gescheiden gasten- & bedrijfsnetwerk",
        body: "Gasten online zonder risico voor uw kassa, boekhouding of camera's. Veilig opgesplitst per gebruik.",
      },
      {
        icon: "activity",
        title: "Betrouwbaar tijdens piekmomenten",
        body: "Netwerken die overeind blijven wanneer het druk is — cruciaal voor horeca en seizoenspieken.",
      },
      {
        icon: "radar",
        title: "Beheer op afstand",
        body: "Ik monitor uw netwerk op afstand en grijp in vóór u merkt dat er iets mis is.",
      },
      {
        icon: "cctv",
        title: "Camerabewaking",
        body: "Professionele camera's met HD-beeld, nachtzicht en beelden op uw smartphone — op een gescheiden netwerk geplaatst en GDPR-correct ingericht.",
      },
    ],
    aftercare:
      "Na de oplevering hou ik uw netwerk en systemen in de gaten: monitoring, updates en een maandelijkse check. Vanaf €49/maand.",
    locals: [
      {
        slug: "wifi-installatie-horeca-jabbeke",
        title: "WiFi-installatie horeca Jabbeke",
        city: "Jabbeke",
        region: "West-Vlaanderen",
        icon: "wifi",
        intro:
          "Professionele WiFi-installatie voor horeca in Jabbeke. Een stabiel gastennetwerk en een gescheiden kassanetwerk dat altijd werkt.",
        context:
          "Een zaak langs de baan of aan de afrit in Jabbeke trekt passanten én vaste klanten — en die verwachten werkende WiFi en een kassa die niet uitvalt op het drukste moment. Ik scheid uw gastennetwerk van uw kassa- en boekhoudsysteem, zodat een volle zaak nooit uw betaalterminal plat legt.",
        highlights: [
          "WiFi op maat van horeca in Jabbeke",
          "Gescheiden gasten- en kassanetwerk",
          "Volledige dekking, ook op het terras",
          "Lokale installatie en snelle opvolging",
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
          "In het Brugse Ommeland — Damme, Beernem, Zedelgem, Torhout — draait gastvrijheid steeds vaker op een goede review, en 'trage WiFi' is een klassieke klacht. Ik zorg voor dekking in élke kamer en de tuin, met een eenvoudig gastenportaal en uw eigen netwerk veilig apart. Geen gedeeld wachtwoord dat al jaren op een briefje staat.",
        highlights: [
          "Volledige dekking in alle kamers én buiten",
          "Eenvoudig gastenportaal, geen briefje met wachtwoord",
          "Uw eigen netwerk veilig gescheiden",
          "Minder 'de WiFi doet het niet'-reviews",
        ],
        description:
          "Gastennetwerk voor B&B's en boutique hotels in het Brugse Ommeland. Betrouwbare WiFi in alle kamers, veilig gescheiden van uw eigen systemen.",
        related: {
          href: "/guesty-pms-ondersteuning-bnb",
          title: "Ook hulp nodig met uw boekingssysteem?",
          body: "We helpen B&B's met Guesty, channel managers en het koppelen van Booking.com en Airbnb — techniek én boekingsplatform uit één hand.",
        },
      },
      {
        slug: "stabiel-netwerk-kmo-oostende",
        title: "Stabiel netwerk KMO Oostende",
        city: "Oostende",
        region: "West-Vlaanderen",
        icon: "network",
        intro:
          "Een stabiel en veilig bedrijfsnetwerk voor kantoren in Oostende. Betrouwbare bekabeling, WiFi en beheer onder één dak.",
        context:
          "Oostende combineert kantoren, praktijken en zaken die het hele jaar door moeten draaien. Voor een groeiend kantoor is het netwerk vaak de zwakke schakel: een mix van oude switches en goedkope routers. Ik leg een propere basis — bekabeling, een degelijk netwerk en WiFi die meegroeit — zodat u er niet meer aan hoeft te denken.",
        highlights: [
          "Propere bekabeling en degelijke netwerkbasis",
          "Zakelijke WiFi die meegroeit met uw kantoor",
          "Veilig en gescheiden per toepassing",
          "Beheer en opvolging op afstand",
        ],
        description:
          "Stabiel bedrijfsnetwerk voor kantoren in Oostende. Betrouwbare bekabeling, zakelijke WiFi en netwerkbeheer onder één dak.",
      },
    ],
  },
  {
    slug: "cloud-backup-beveiliging",
    navTitle: "Cloud, Backup & Beveiliging",
    title: "Cloud, backup & beveiliging",
    audience: "Elk klein kantoor",
    icon: "shield-check",
    tagline:
      "Uw dossiers veilig, beschermd en altijd terug te halen — met AI die mee bewaakt.",
    description:
      "Microsoft 365, veilige backup en cybersecurity voor uw kantoor. Ik zorg dat uw dossiers veilig in de cloud staan, automatisch gebackupt worden en beschermd zijn tegen verlies, ransomware en menselijke fouten — met AI die verdacht gedrag vroeg opmerkt.",
    metaDescription:
      "Microsoft 365, veilige backup en cybersecurity voor uw kantoor. Beschermd tegen verlies, ransomware en menselijke fouten — met AI die mee bewaakt.",
    features: [
      {
        icon: "mail",
        title: "Microsoft 365",
        body: "E-mail, Teams, SharePoint en licenties — correct opgezet, beveiligd en onderhouden zonder kopzorgen.",
      },
      {
        icon: "database",
        title: "Veilige back-up",
        body: "Uw dossiers automatisch en versleuteld bewaard. Getest, niet gehoopt — ook van uw Microsoft 365-omgeving.",
      },
      {
        icon: "shield-check",
        title: "Cybersecurity & MFA",
        body: "Bescherming tegen phishing en ransomware, tweestapsverificatie en updates, met AI-detectie van verdacht gedrag.",
      },
      {
        icon: "sparkles",
        title: "Microsoft 365 Copilot & AI",
        body: "AI die u tijd bespaart bij documenten en e-mail — veilig ingericht, zodat uw cliëntgegevens privé blijven.",
      },
      {
        icon: "file-check",
        title: "Peppol e-facturatie",
        body: "Klaar voor de verplichte e-facturatie via Peppol, correct gekoppeld aan uw boekhouding.",
      },
    ],
    aftercare:
      "Na de oplevering hou ik uw netwerk en systemen in de gaten: monitoring, updates en een maandelijkse check. Vanaf €49/maand.",
    locals: [],
  },
];

export function getHub(slug: string): ServiceHub | undefined {
  return services.find((s) => s.slug === slug);
}

export function allLocals(): (LocalPage & { hub: ServiceHub })[] {
  return services.flatMap((hub) => hub.locals.map((local) => ({ ...local, hub })));
}
