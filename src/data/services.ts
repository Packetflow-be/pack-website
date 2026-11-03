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
  limits?: string | string[];
  /** Sources for the facts on the page, linked in a small line before the FAQ. */
  sources?: { label: string; href: string }[];
  /** A prerequisite worth saying before the quote (e.g. a licence level). */
  requirement?: string;
  /** What keeps it running after delivery. Rendered with a link to Beheer. */
  ongoing?: string;
  /**
   * Optional "verder lezen" block: contextual links from a hub into related
   * kennisbank-artikels. Keep it to a few genuinely relevant articles.
   */
  reading?: { href: string; title: string; body: string }[];
  /** Small label above the H1 when it should differ from `audience`. */
  kicker?: string;
  /**
   * "Herkenbaar?": sentences a customer says, in their own words. Rendered in
   * the problem block instead of (or above) `problem.body`.
   */
  symptoms?: string[];
  /** "Voor wie": who this is for, one short paragraph. */
  forWho?: string;
  /** Visible FAQ + FAQPage JSON-LD (vault: ref-website-copy). */
  faqs?: { question: string; answer: string }[];
  /** Page-specific line above the standard CTA pair. */
  cta?: { title: string; body: string };
  /**
   * Built on staging, left out of production until its publish condition in
   * the vault (ref-website-copy) holds. Remove the flag to go live.
   */
  held?: boolean;
  /** A named offer rendered as its own section after the features. */
  offer?: OfferSection;
  /**
   * Related hubs (slugs), shown as cards near the end of the page. Only hubs
   * that exist in this build appear, so held hubs are never linked in
   * production.
   */
  related?: string[];
  /** One short line for this hub's card on other pages (else the tagline). */
  relatedLine?: string;
  /** The story behind the work: an editorial block after the features. */
  story?: { kicker: string; title: string; paragraphs: string[] };
  locals: LocalPage[];
};

// Held hubs are dropped from production builds (src/lib/build.ts), so no
// route, nav item, footer link or sitemap entry exists for them on the live
// site.
import { isProductionBuild } from "@/lib/build";
import { praktijkZonderStilstand, type OfferSection } from "@/data/offers";
export { isProductionBuild };

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

const allServices: ServiceHub[] = [
  {
    // N1 Altijd online (vault: pf-solutions-map, ref-website-copy page 1).
    // Held: publish when Louis approves the one-page offer.
    slug: "altijd-online",
    related: ["zakelijke-wifi-netwerken", "tijdelijk-netwerk", "it-beheer-support"],
    relatedLine:
      "Valt uw internet weg, dan neemt 4G of 5G vanzelf over. Uw kassa en betaalterminal werken door.",
    navTitle: "Altijd online",
    title: "Uw internet valt weg. Uw kassa werkt door.",
    metaTitle: "Back-up internet via 4G of 5G voor uw zaak",
    solution: "Altijd online",
    kicker: "Altijd online",
    audience: "Winkels, horeca en praktijken",
    icon: "radio-tower",
    held: true,
    tagline:
      "Met één internetlijn ligt alles stil zodra die lijn het laat afweten. Ik plaats een tweede verbinding via 4G of 5G die vanzelf overneemt. Uw kassa, uw betaalterminal en uw telefoon werken gewoon door.",
    description:
      "Een tweede internetlijn via 4G of 5G die vanzelf overneemt als uw vaste lijn uitvalt. Kassa en betaalterminal gaan voor, u krijgt een melding bij elke omschakeling, en de simkaart zit in de maandprijs.",
    metaDescription:
      "Valt uw internet weg, dan schakelt uw zaak vanzelf over op 4G of 5G. Kassa, betaalterminal en telefoon werken door, bij welke provider u ook zit.",
    problem: { title: "Herkenbaar?", body: "" },
    symptoms: [
      "We rekenen weer af via de hotspot van mijn gsm.",
      "Bancontact ligt er weer uit.",
      "Midden in een gesprek valt de telefoon weg.",
      "Binnen heb ik amper bereik, een 4G-back-up gaat hier toch niet.",
    ],
    features: [
      {
        icon: "arrow-left-right",
        title: "Een tweede lijn die vanzelf overneemt",
        body: "Valt uw vaste lijn uit, dan schakelt de router zelf over op 4G of 5G. Is uw lijn terug, dan schakelt hij ook zelf terug.",
      },
      {
        icon: "credit-card",
        title: "Kassa en betaalterminal gaan voor",
        body: "Op de tweede lijn krijgen de toestellen waarmee u verkoopt voorrang op de rest.",
      },
      {
        icon: "radio-tower",
        title: "Een antenne buiten als het binnen niet lukt",
        body: "Aan de gevel, gericht op de mast. Of dat bij u werkt, meet ik vooraf.",
      },
      {
        icon: "bell-ring",
        title: "U weet het als uw lijn uitvalt",
        body: "U krijgt een melding zodra de tweede lijn overneemt, ook als niemand in de zaak iets merkt.",
      },
      {
        icon: "card-sim",
        title: "De simkaart zit erbij",
        body: "Het data-abonnement voor de tweede lijn zit in de maandprijs. U sluit niets extra af.",
      },
      {
        icon: "globe",
        title: "Bij welke provider u ook zit",
        body: "Uw vaste lijn blijft waar ze is. Is die echt slecht, dan kan Starlink uw hoofdlijn worden, met 4G of 5G als reserve.",
      },
    ],
    steps: [
      {
        title: "Kennismaking en meting",
        body: "Gratis. Ik kom langs en meet het bereik van 4G en 5G, binnen en buiten, op de verschillende netwerken.",
      },
      {
        title: "Plan en offerte",
        body: "Een vaste prijs voor de installatie en een maandprijs voor de opvolging, met de simkaart erin.",
      },
      {
        title: "Installatie en test",
        body: "Router, simkaart en waar nodig de antenne. Daarna trekken we samen de stekker van uw vaste lijn uit en kijken we of alles blijft werken.",
      },
      {
        title: "Opvolging",
        body: "Ik hou beide lijnen in de gaten. U krijgt een melding bij elke omschakeling en elke maand één pagina rapport.",
      },
    ],
    forWho:
      "Winkels, horeca, praktijken en kleine bedrijven met één vestiging en één internetlijn. Overal waar een kassa, een betaalterminal, telefonie via internet of de scanners in het magazijn niet stil mogen vallen.",
    faqs: [
      {
        question: "Mijn provider biedt zelf een 4G-back-up aan. Waarom zou ik dit nemen?",
        answer:
          "Soms volstaat dat, en dan zeg ik u dat ook. Het verschil zit in de rest: dit werkt bij elke provider, uw kassa gaat voor, u krijgt een melding als de lijn omschakelt, en waar binnen te weinig bereik is, komt er een antenne buiten.",
      },
      {
        question: "Ik heb binnen bijna geen bereik. Kan dit dan wel?",
        answer:
          "Vaak wel. Een antenne aan de gevel, gericht op de mast, vangt vaak een bruikbaar signaal op waar uw gsm binnen niets vindt. Of dat bij u lukt, meet ik vooraf. Lukt het niet, dan hoort u dat voor u iets koopt.",
      },
      {
        question: "Heb ik een extra abonnement nodig?",
        answer:
          "Nee. De simkaart voor de tweede lijn zit in de maandprijs. Zolang uw vaste lijn werkt, gaat er bijna geen verkeer over.",
      },
      {
        question: "Kan het ook met Starlink?",
        answer:
          "Ja. Is uw vaste lijn echt slecht, dan kan Starlink uw hoofdlijn worden, met 4G of 5G als reserve. Het Starlink-abonnement sluit u zelf af, op uw naam. Ik zorg voor de router, de omschakeling en de opvolging.",
      },
      {
        // Checked 2026-11-03 (Febelfin FAQ, UGent WP 2022-13; vault
        // prj-track2-avenues). Re-read on the day of publishing.
        question: "Moet ik als handelaar elektronisch betalen aanbieden?",
        answer:
          "Ja, als u aan consumenten verkoopt. Sinds 1 juli 2022 moet elke onderneming, ook een vrij beroep, consumenten minstens één elektronische betaalmogelijkheid bieden (artikel VI.7/4 van het Wetboek van economisch recht). Welke, kiest u zelf: een kaartterminal, Payconiq of een overschrijving. Een tweede lijn is dus geen wettelijke plicht. Ze zorgt er wel voor dat de betaalmogelijkheid die u koos, blijft werken als uw internet uitvalt.",
      },
    ],
    cta: {
      title: "Hoe stevig is uw lijn?",
      body: "Ik kom het bereik bij u meten en zeg u eerlijk of een tweede lijn de moeite loont.",
    },
    reading: [
      {
        href: "/blog/kassanetwerk-scheiden-horeca",
        title: "Gasten- en kassanetwerk scheiden in de horeca",
        body: "Waarom de kassa en de betaalterminal niet op de gastenwifi horen.",
      },
    ],
    locals: [],
  },
  {
    // N3 Tijdelijk netwerk (vault: pf-solutions-map, ref-website-copy page 2).
    // Held: publish when the rental terms are decided and a first customer
    // said yes. No cameras (licence). Event line kept (Louis, 2026-11-03).
    slug: "tijdelijk-netwerk",
    related: ["zakelijke-wifi-netwerken", "kantoorverhuizing", "altijd-online"],
    relatedLine:
      "Internet en wifi voor een werf, een event of de weken tussen twee kantoren. Per maand, zonder te wachten op een vaste lijn.",
    navTitle: "Tijdelijk netwerk",
    title: "Internet op de werf, zonder te wachten op een lijn",
    metaTitle: "Tijdelijk internet voor werf en werfcontainer",
    solution: "Tijdelijk netwerk",
    kicker: "Tijdelijk netwerk",
    audience: "Werven, events en verhuizingen",
    icon: "hard-hat",
    held: true,
    tagline:
      "Een vaste lijn naar een werf laat weken op zich wachten. Ik plaats een 5G-kit in de werfcontainer, met wifi en een veilige verbinding met uw kantoor. Is de werf klaar, dan verhuist de kit mee naar de volgende.",
    description:
      "Een 5G-kit in de werfcontainer, met wifi en een veilige verbinding met uw kantoor. Per maand gehuurd, bewaakt, en mee naar de volgende werf. Ook voor een event of de weken tussen twee kantoren.",
    metaDescription:
      "Internet in de werfcontainer zonder weken te wachten op een lijn. Een 5G-kit met wifi en een verbinding met kantoor, per maand, mee naar de volgende werf.",
    problem: { title: "Herkenbaar?", body: "" },
    symptoms: [
      "Zes weken wachten op een lijn, voor een werfcontainer die er vier maanden staat.",
      "De werfleider deelt de hotspot van zijn gsm met heel de werf.",
      "Het nieuwe kantoor is klaar, maar de lijn is er nog niet.",
      "Een event van drie dagen, en ter plaatse geen internet.",
    ],
    features: [
      {
        icon: "router",
        title: "Een 5G-kit die tegen een stootje kan",
        body: "Een router met een antenne buiten, in de werfcontainer geplaatst en ter plaatse getest.",
      },
      {
        icon: "wifi",
        title: "Wifi in de werfcontainer",
        body: "Voor de laptops, de tablets en de printer van de werfleider.",
      },
      {
        icon: "lock",
        title: "Een veilige verbinding met kantoor",
        body: "Plannen, bestanden en programma's werken zoals op kantoor, via een VPN.",
      },
      {
        icon: "bell-ring",
        title: "U hoort het als de verbinding wegvalt",
        body: "U krijgt een melding, en hoeft niet te wachten tot de werfleider belt.",
      },
      {
        icon: "truck",
        title: "Per maand, en mee naar de volgende werf",
        body: "Is de werf klaar, dan verhuist de kit of haal ik ze op.",
      },
    ],
    steps: [
      {
        title: "Kennismaking",
        body: "Gratis. Hoeveel werven heeft u tegelijk, hoe lang lopen ze, en wat moet er werken?",
      },
      {
        title: "Plan en offerte",
        body: "Per werf een maandprijs, met wat erin zit en wat er gebeurt bij verlies of schade.",
      },
      {
        title: "Plaatsing",
        body: "De kit in de werfcontainer, het bereik nagemeten en de verbinding met kantoor getest.",
      },
      {
        title: "Verhuizen of ophalen",
        body: "Naar de volgende werf, of terug naar mij als het project klaar is.",
      },
    ],
    forWho:
      "Aannemers, projectontwikkelaars en bouwbedrijven met werven die maanden lopen. Ook voor een pop-up, een event of de weken tussen twee kantoren.",
    limits:
      "Geen camera's. Bewakingscamera's plaatsen of onderhouden mag in België alleen een onderneming met een vergunning voor camerasystemen (FOD Binnenlandse Zaken). Die vergunning heb ik niet. Voor werfcamera's gaat u best naar een erkende installateur.",
    faqs: [
      {
        question: "Hoe snel is de werf online?",
        answer:
          "Zodra de kit staat. Er komt geen vaste lijn aan te pas, dus u wacht niet op een aansluiting. Het bereik op de werf meet ik vooraf.",
      },
      {
        question: "Kunnen we vanuit de werfcontainer aan onze bestanden op kantoor?",
        answer:
          "Ja. De kit legt een beveiligde verbinding met uw kantoornetwerk, zodat plannen en programma's werken zoals op kantoor. Of uw kantoornetwerk dat toelaat, bekijk ik vooraf.",
      },
      {
        question: "Wat als de werf langer duurt dan gepland?",
        answer:
          "Dan loopt de huur gewoon een maand langer. Is de werf klaar, dan verhuist de kit naar de volgende of haal ik ze op.",
      },
      {
        question: "Plaatst u ook werfcamera's?",
        answer:
          "Nee. Daarvoor is in België een vergunning nodig als onderneming voor camerasystemen, en die heb ik niet. Voor camera's gaat u best naar een erkende installateur.",
      },
      {
        question: "Werkt het ook voor een event of een verhuizing?",
        answer:
          "Ja. Dezelfde kit brengt internet naar een event van een paar dagen, of overbrugt de weken tussen twee kantoren.",
      },
    ],
    cta: {
      title: "Hoeveel werven heeft u lopen?",
      body: "Vertel me hoeveel werven u tegelijk heeft, dan reken ik het voor u uit.",
    },
    locals: [],
  },
  {
    // Temperatuurbewaking (vault: ref-website-copy page 4,
    // prj-temperature-monitoring-offering). Held: publish after the pilot is
    // written up, the liability lines are in pf-service-terms and the prices
    // are decided. Facts as sourced (FAVV G-023, G-044, Departement Zorg);
    // nothing about what the law asks of pharmacies (not verified); no Dutch
    // (NL) sources.
    slug: "temperatuurbewaking",
    related: ["altijd-online", "it-beheer-support"],
    relatedLine:
      "Sensoren in uw koelkasten en een alarm naar uw eigen mensen, zonder papieren logboek.",
    navTitle: "Temperatuurbewaking",
    title: "Temperatuurbewaking met alarm, zonder papieren logboek",
    metaTitle: "Temperatuurbewaking met alarm voor koelkasten",
    solution: "Temperatuurbewaking",
    kicker: "Temperatuurbewaking",
    audience: "Horeca, beenhouwers en apotheken",
    icon: "thermometer-snowflake",
    held: true,
    tagline:
      "Sensoren meten dag en nacht de temperatuur in uw koelkasten en koelcellen. Wijkt ze af, dan krijgen uw eigen mensen een sms en een e-mail. En elke maand krijgt u een rapport voor uw registratie.",
    description:
      "Draadloze sensoren in uw koelkasten en koelcellen, een alarm per sms en e-mail naar uw eigen mensen, en elke maand een rapport met de temperatuurcurves voor uw registratie.",
    metaDescription:
      "Sensoren in uw koelkasten en koelcellen, een alarm per sms en e-mail bij een afwijking, en elke maand een rapport. Voor horeca, beenhouwers en apotheken.",
    problem: { title: "Herkenbaar?", body: "" },
    symptoms: [
      "Elke morgen de temperatuur van elke frigo op een blad noteren.",
      "Na het weekend bleek de koelcel warm te staan.",
      "'s Nachts viel de stroom uit, en niemand weet hoe lang de vaccins te warm stonden.",
      "Het FAVV komt langs, en op de lijst ontbreken dagen.",
    ],
    features: [
      {
        icon: "thermometer",
        title: "Een sensor per koelkast of koelcel",
        body: "De sonde zit binnen, de zender buiten op de deur of de muur. Aan uw koelinstallatie wordt niets aangesloten.",
      },
      {
        icon: "bell-ring",
        title: "Een alarm naar uw eigen mensen",
        body: "Per sms en e-mail bij te warm of te koud. Ook als een sensor zwijgt, het systeem offline is of een batterij bijna leeg is: een stil systeem ziet er nooit uit als een koude koelkast.",
      },
      {
        icon: "signal",
        title: "Werkt ook als uw internet wegvalt",
        body: "Het systeem heeft een eigen mobiele verbinding en een kleine noodvoeding, zodat het alarm toch vertrekt. Het mobiele bereik test ik ter plaatse.",
      },
      {
        icon: "file-text",
        title: "Elke maand een rapport",
        body: "De temperatuurcurve per toestel, als pdf, voor uw registratie en voor een controle.",
      },
      {
        icon: "calendar-check",
        title: "Elk jaar een controle",
        body: "De sensoren nagekeken met een referentiethermometer, en geregistreerd. De batterijen vervang ik.",
      },
      {
        icon: "map-pin-check",
        title: "Uw gegevens blijven in de EU",
        body: "De metingen worden in de Europese Unie bewaard en verwerkt.",
      },
    ],
    steps: [
      {
        title: "Kennismaking",
        body: "Gratis. Welke koelkasten en koelcellen, en wie krijgt het alarm?",
      },
      {
        title: "Plan en offerte",
        body: "Een vaste prijs voor de plaatsing en een maandprijs volgens het aantal sensoren.",
      },
      {
        title: "Plaatsing",
        body: "Sensoren en ontvanger geplaatst, elk alarm getest en uw contactpersonen ingesteld.",
      },
      {
        title: "Opvolging",
        body: "Elke maand het rapport, elk jaar de controle, en nieuwe batterijen als dat nodig is.",
      },
    ],
    forWho:
      "Restaurants en cafés, beenhouwers, bakkers en traiteurs, apotheken en huisartsenpraktijken met een vaccinkoelkast, bloemisten en kleine labo's.",
    limits: [
      "Geen diepvriesopslag groter dan 10 m³ en geen diepvriestransport: daar zijn gecertificeerde registratietoestellen nodig (EN 12830).",
      "Geen koppeling met uw koelinstallatie: de sensoren meten alleen, ze sturen niets aan.",
      "Geen nachtdienst van mijn kant: het alarm gaat naar u en uw mensen, en u beslist wie reageert. Ik volg de werking van het systeem op.",
      "U blijft verantwoordelijk voor uw autocontrole en uw koudeketen. Dit is een hulpmiddel: ik doe er alles aan dat een alarm aankomt, maar een garantie is het niet.",
    ],
    faqs: [
      {
        question: "Aanvaardt het FAVV een automatische registratie?",
        answer:
          "Voor de horeca noemt de FAVV-gids autocontrole horeca (G-023) een geautomatiseerde continue registratie uitdrukkelijk als een van de manieren om de dagelijkse controle van koelkasten en diepvriezers te doen. De gids raadt wel aan om zo'n installatie geregeld na te kijken met een draagbare thermometer. Voor uw eigen zaak blijft de gids van uw sector de referentie.",
      },
      {
        question: "Wat vraagt het FAVV in een winkel of beenhouwerij?",
        answer:
          "Het praktijkhandboek voor de handel (G-044) vraagt in elk koel- en diepvriestoestel een goed afleesbare thermometer, tot op 1 °C nauwkeurig, en een controle van de meettoestellen minstens één keer per jaar, die geregistreerd wordt. De temperatuurbewaking komt bovenop die thermometer, niet in de plaats ervan. De jaarlijkse controle van de sensoren doe ik voor u, en ze staat in het rapport.",
      },
      {
        question: "Wie reageert als het alarm 's nachts afgaat?",
        answer:
          "U, of wie u aanduidt. Het alarm gaat rechtstreeks per sms en e-mail naar uw eigen contactpersonen. Ik volg de werking van het systeem op, niet uw koelkasten.",
      },
      {
        question: "Wat als de stroom of het internet uitvalt?",
        answer:
          "De sensoren werken op batterij. De ontvanger heeft een kleine noodvoeding en een eigen mobiele verbinding, zodat het alarm ook dan kan vertrekken. Valt een sensor of de ontvanger toch stil, dan krijgt u daar ook een melding van.",
      },
      {
        question: "Is dit geschikt voor een vaccinkoelkast?",
        answer:
          "Ja, als hulpmiddel. Een vaccin dat niet op de juiste temperatuur bewaard werd, is een temperatuurincident dat u meldt bij het Departement Zorg. Het alarm waarschuwt u op tijd, en de curve toont hoe lang en hoe warm. Wat uw inspecteur precies vraagt, bekijken we samen.",
      },
    ],
    sources: [
      {
        label: "FAVV: gids autocontrole horeca (G-023)",
        href: "https://favv-afsca.be/sites/default/files/G-023_v2_nl_11-01-2024.pdf",
      },
      {
        label: "FAVV: praktijkhandboek voor de handel (G-044)",
        href: "https://favv-afsca.be/sites/default/files/autocontrole/g-044/praktijkhandboek/2024-10-25_G-044_Praktijkhandboek_PDF-met-zoekfunctie.pdf",
      },
      {
        label: "Departement Zorg: probleem met vaccin melden",
        href: "https://www.departementzorg.be/nl/alles-over-vaccineren/probleem-met-vaccin-melden",
      },
    ],
    cta: {
      title: "Hoeveel koelkasten heeft u?",
      body: "Vertel me hoeveel koelkasten en koelcellen u heeft, dan kom ik kijken.",
    },
    locals: [],
  },
  {
    slug: "kantoorverhuizing",
    related: ["tijdelijk-netwerk", "zakelijke-wifi-netwerken"],
    relatedLine:
      "Netwerk, wifi en firewall goed gelegd, terwijl de muren nog open liggen.",
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
    // Praktijk zonder stilstand (held section, vault: ref-website-copy 3a).
    offer: praktijkZonderStilstand,
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
    related: ["tijdelijk-netwerk", "altijd-online", "kantoorverhuizing"],
    relatedLine:
      "Een gastennetwerk dat nooit aan uw kassa of eigen systemen kan, en wifi die overeind blijft.",
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
    relatedLine:
      "Bewaakt, bijgewerkt en gebackupt, met één vast aanspreekpunt en elke maand één pagina rapport.",
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

/** The hubs this build publishes: held hubs only outside production. */
export const services: ServiceHub[] = allServices.filter((hub) => !hub.held || !isProductionBuild);

// Search Console (Aug-Oct 2026): "internet installatie restaurant" and similar
// horeca internet queries land on the horeca wifi page at top positions. Once
// Altijd online is live in this build, that page's one cross-reference points
// there instead of the kassanetwerk blog post.
if (services.some((h) => h.slug === "altijd-online")) {
  const horeca = allServices.flatMap((h) => h.locals).find((l) => l.slug === "wifi-installatie-horeca-jabbeke");
  if (horeca) {
    horeca.related = {
      href: "/diensten/altijd-online",
      title: "Altijd online",
      body: "Valt uw internet weg, dan neemt 4G of 5G vanzelf over. Uw kassa en betaalterminal werken door.",
    };
  }
}

/** How lists name a hub: the solution name for named offer pages (whose H1
 * is a sentence), the title for the older hubs. */
export function hubName(hub: ServiceHub): string {
  return hub.kicker ? hub.solution : hub.title;
}

export function getHub(slug: string): ServiceHub | undefined {
  return services.find((s) => s.slug === slug);
}

export function allLocals(): (LocalPage & { hub: ServiceHub })[] {
  return services.flatMap((hub) => hub.locals.map((local) => ({ ...local, hub })));
}
