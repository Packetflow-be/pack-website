// Sector ("Voor wie?") hubs. The audience-led half of the site: each sector
// leads with the named solution that fits it (vault: pf-solutions-map) and
// links to the solution hubs that serve it, so the audience- and service-led
// structures cross-link instead of competing.
//
// Order is deliberate: the production lane leads the public wording since
// 2026-09-03 (vault: pf-boilerplate, prj-nis2-readiness), then the practices
// and offices that make up most of the book, then horeca/B&B. Verenigingen &
// VZW's is not a target segment; it stays as a gesture of goodwill.
//
// Same generator shape as services.ts:
//   - /sectoren                 -> overview of all sectors
//   - /sectoren/[sector]        -> a sector hub

export type Sector = {
  slug: string; // -> /sectoren/<slug>
  navTitle: string;
  title: string;
  icon: string; // Lucide icon name
  tagline: string;
  description: string;
  /**
   * Concise SEO meta description (≤155 chars). Falls back to `description`
   * when absent. Kept separate so the on-page lead can be richer than the
   * snippet Google shows.
   */
  metaDescription?: string;
  /** Optional hero photo (in public/images); hidden gracefully if absent. */
  image?: string;
  /** The pains this audience recognises — written in their words. */
  pains: { title: string; body: string; icon: string }[];
  /** How Packetflow answers each pain. */
  approach: string[];
  /** Service hub slugs most relevant to this sector. */
  serviceSlugs: string[];
  /** Local page slugs to surface for this sector (optional). */
  localSlugs: string[];
  /**
   * Client references for a small proof strip. Leave empty unless the client
   * has explicitly agreed to be shown, even anonymised. Never invent one.
   */
  references?: { label: string }[];
  /**
   * Optional sector FAQ. Rendered visibly (Faq.astro) and emitted as FAQPage
   * schema, so keep the answers truthful and on-page.
   */
  faqs?: { question: string; answer: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "productie-toeleveranciers",
    navTitle: "Productie & toeleveranciers",
    title: "IT voor productie en toeleveranciers",
    icon: "factory",
    tagline: "Uw productie blijft draaien, ook als uw IT wordt aangevallen.",
    description:
      "Een drukkerij, een koffiebranderij, een voedingsbedrijf of een metaalbewerker: waar stilstand geld kost, horen kantoor en productie onder één plan. Ik scheid het kantoornetwerk van de productie, zorg voor geteste back-ups en geregelde toegang, en help u de vragenlijst van uw klant over cyberveiligheid te beantwoorden.",
    metaDescription:
      "IT voor productie en toeleveranciers: kantoor en productie gescheiden, geteste back-ups, geregelde toegang en hulp bij de NIS2-vragenlijst van uw klant.",
    pains: [
      {
        icon: "split",
        title: "Kantoor en productie op één netwerk",
        body: "Klikt iemand op kantoor op een verkeerde link, dan staat die besmette laptop op hetzelfde netwerk als de pc aan de machine. Zo legt een aanval op het kantoor de productie stil.",
      },
      {
        icon: "clipboard-list",
        title: "Een vragenlijst van uw klant",
        body: "Een grotere klant valt onder NIS2 en wil weten hoe u beveiligd bent: tweestapsverificatie, back-ups, wie op afstand bij uw machines kan. Zonder duidelijk antwoord staat het contract onder druk.",
      },
      {
        icon: "key-round",
        title: "Leveranciers die op afstand inloggen",
        body: "De machinebouwer logt in voor onderhoud, via een verbinding die al jaren openstaat en die niemand nog controleert.",
      },
    ],
    approach: [
      "De grens tussen kantoor en productie in kaart, en daarna echt gescheiden.",
      "Geteste back-ups, ook van de pc's en servers naast de productie.",
      "Geregelde toegang: wie kan waarbij, ook voor leveranciers op afstand.",
      "Een readiness-check afgestemd op CyberFundamentals en NIS2, zodat u de vragenlijst van uw klant kan beantwoorden.",
      "Eerlijk over de grens: de machines en hun software blijven bij uw machinebouwer of integrator. Ik zorg voor het netwerk, de back-ups en de toegang errond.",
    ],
    serviceSlugs: ["cloud-backup-beveiliging", "zakelijke-wifi-netwerken", "it-beheer-support"],
    localSlugs: ["managed-it-west-vlaanderen"],
    faqs: [
      {
        question: "Vallen wij onder NIS2?",
        answer:
          "Rechtstreeks enkel als u minstens middelgroot bent en actief in een sector die NIS2 opsomt, zoals voeding of bepaalde productie. Valt u er zelf niet onder, dan kan een klant die er wel onder valt nog altijd eisen stellen aan zijn leveranciers. Dat is meestal hoe de vraag bij een kleinere producent binnenkomt.",
      },
      {
        question: "Moet de productie stilgelegd worden voor dit werk?",
        answer:
          "Niet zomaar. Ingrepen in het netwerk plan ik samen met u, buiten de productie-uren waar dat nodig is, en altijd met een terugvaloptie per stap.",
      },
      {
        question: "Werkt u ook aan onze machines?",
        answer:
          "Nee. De machines en hun software blijven bij uw machinebouwer of integrator. Ik zorg dat het netwerk errond gescheiden, bewaakt en herstelbaar is, en dat toegang op afstand geregeld is.",
      },
      {
        question: "Wat is CyberFundamentals?",
        answer:
          "CyberFundamentals is het raamwerk van het Centrum voor Cybersecurity België (CCB). Het vertaalt goede beveiliging naar concrete maatregelen per niveau, en klanten en verzekeraars herkennen het. Een readiness-check op basis daarvan toont waar u vandaag staat en wat er nog ontbreekt.",
      },
    ],
  },
  {
    slug: "medische-praktijken",
    navTitle: "Medische & zorgpraktijken",
    title: "IT voor apotheken, tandartsen en praktijken",
    icon: "stethoscope",
    tagline:
      "Patiëntgegevens beschermd, toegang geregeld en aantoonbaar terug te zetten.",
    description:
      "Een apotheek, tandarts- of huisartsenpraktijk draait op patiëntgegevens die privé moeten blijven en op systemen die de hele dag moeten meegaan. Ik zorg dat uw toestellen en accounts dag en nacht bewaakt worden, dat alleen de juiste mensen binnenraken en dat uw back-ups getest zijn.",
    metaDescription:
      "IT voor apotheken, tandartsen en praktijken: 24/7 bewaakte toestellen en accounts, geregelde toegang en back-ups met hersteltest. West-Vlaanderen.",
    pains: [
      {
        icon: "shield",
        title: "Patiëntgegevens en de GDPR",
        body: "Medische gegevens zijn de meest gevoelige die er zijn. U moet kunnen tonen wie erbij kan, en dat ze beschermd zijn.",
      },
      {
        icon: "activity",
        title: "De balie mag niet stilvallen",
        body: "Een systeem dat plat ligt met een volle wachtzaal is geen optie. Problemen moeten opvallen voor ze de balie bereiken.",
      },
      {
        icon: "plug",
        title: "Praktijksoftware die moet blijven werken",
        body: "Uw medisch dossier, voorschriften of apotheeksysteem hangt af van een netwerk en toestellen die in orde zijn.",
      },
    ],
    approach: [
      "Elk toestel dag en nacht bewaakt met Packetflow Secure.",
      "Microsoft 365 met tweestapsverificatie en toegangsregels, afgestemd op zorgdata.",
      "Back-ups van toestellen en Microsoft 365, met twee keer per jaar een hersteltest.",
      "Een netwerk waarin de balie, de spreekkamers en de gastenwifi van elkaar gescheiden zijn.",
      "Elke maand één pagina rapport, en één vast aanspreekpunt dat uw praktijk kent.",
    ],
    serviceSlugs: ["cloud-backup-beveiliging", "it-beheer-support", "zakelijke-wifi-netwerken"],
    localSlugs: ["it-partner-jabbeke", "it-support-oudenburg", "managed-it-west-vlaanderen"],
    faqs: [
      {
        question: "Hoe houdt u patiëntgegevens in regel met de GDPR?",
        answer:
          "Ik leg vast wie bij welke gegevens kan, beveilig de toegang met tweestapsverificatie en zorg voor back-ups die twee keer per jaar getest worden. Zo blijven medische gegevens privé, en kunt u tonen hoe ze beschermd zijn.",
      },
      {
        question: "Werkt u samen met mijn praktijk- of apotheeksoftware?",
        answer:
          "De software zelf blijft bij uw softwareleverancier. Ik zorg dat het netwerk, de toestellen en de koppelingen errond kloppen, en ik overleg met die leverancier als er iets hapert.",
      },
      {
        question: "Wat gebeurt er als er iets uitvalt tijdens het spreekuur?",
        answer:
          "Uw toestellen en accounts worden dag en nacht bewaakt door een beveiligingscentrum dat zelf ingrijpt. Voor andere problemen mailt u naar support@packetflow.be: elke melding wordt uiterlijk de volgende werkdag bevestigd, en ik volg ze op weekdagen 's avonds en op zaterdagvoormiddag op. Heeft uw praktijk overdag iemand nodig die binnen het uur ter plaatse is, dan zeg ik u eerlijk dat ik dat niet ben.",
      },
    ],
  },
  {
    slug: "kantoren-vrije-beroepen",
    navTitle: "Kantoren & vrije beroepen",
    title: "IT voor advocaten, architecten en makelaars",
    icon: "scale",
    tagline:
      "Discrete, degelijke IT voor kantoren waar vertrouwen en dossiers centraal staan.",
    description:
      "Een advocatenkantoor, architectenbureau of makelaarskantoor draait op vertrouwen en op dossiers die nooit verloren mogen gaan. Ik richt uw Microsoft 365, uw toestellen en uw back-up één keer goed in, en houd ze zo. Discreet, persoonlijk en zonder contract voor lange tijd.",
    metaDescription:
      "IT voor advocaten, architecten en makelaars: Microsoft 365 goed ingericht, beheerde toestellen, geteste back-ups en Peppol-e-facturatie.",
    pains: [
      {
        icon: "lock",
        title: "Vertrouwelijke dossiers",
        body: "Cliëntgegevens en dossiers moeten privé blijven. Dat begint bij weten wie en wat erbij kan.",
      },
      {
        icon: "database",
        title: "Niets mag verloren gaan",
        body: "Een verloren dossier is een verloren zaak. De bewaartermijn van Microsoft is geen back-up.",
      },
      {
        icon: "user-check",
        title: "Geen IT-afdeling",
        body: "U heeft geen tijd om 'de IT-er' te bellen die nooit opneemt. U wilt één aanspreekpunt dat uw kantoor kent.",
      },
    ],
    approach: [
      "Microsoft 365 correct ingericht: mail, agenda, dossiers en licenties.",
      "Toestellen die zichzelf inrichten en maandelijks bijgewerkt worden.",
      "Een back-up van mail en bestanden, met twee keer per jaar een hersteltest.",
      "Peppol-e-facturatie klaar en gekoppeld aan uw boekhouding.",
      "Verhuist of verbouwt uw kantoor? Dan leggen we het netwerk meteen goed.",
    ],
    serviceSlugs: ["moderne-werkplek", "cloud-backup-beveiliging", "kantoorverhuizing"],
    localSlugs: ["it-partner-jabbeke", "it-support-oudenburg", "managed-it-west-vlaanderen"],
    faqs: [
      {
        question: "Hoe houdt u vertrouwelijke dossiers privé?",
        answer:
          "Ik leg vast wie en wat bij uw dossiers kan, beveilig de toegang met tweestapsverificatie en laat uw accounts dag en nacht bewaken tegen overname. Gebruikt u AI zoals Copilot, dan richt ik het in met duidelijke grenzen over welke gegevens het mag zien.",
      },
      {
        question: "Wat als er een dossier verloren dreigt te gaan?",
        answer:
          "Mail, OneDrive, SharePoint en Teams worden apart gebackupt, en twee keer per jaar zet ik een steekproef terug om te controleren of dat werkt. Gaat er iets mis, dan zet ik een vorige versie terug uit een bestaand herstelpunt.",
      },
      {
        question: "Moet ik een contract voor lange tijd tekenen?",
        answer:
          "Nee. Een beheercontract loopt per maand, zonder minimale looptijd, met één maand opzeg. De overname van uw omgeving is een apart project met een vaste prijs, zodat er geen opstartkost verstopt zit in een looptijd.",
      },
    ],
  },
  {
    slug: "horeca-bnb",
    navTitle: "Horeca & B&B's",
    title: "IT en wifi voor horeca en B&B's",
    icon: "utensils",
    tagline:
      "Een kassa die niet uitvalt en gastenwifi die werkt, ook op het drukste moment.",
    description:
      "In de horeca en in een B&B telt elke minuut. Een netwerk dat uitvalt tijdens de service of een gast die klaagt over trage wifi kost u meteen geld en reviews. Ik zorg voor een gastennetwerk dat klopt: volledige dekking voor uw gasten, en uw eigen systemen daar veilig van gescheiden.",
    metaDescription:
      "Wifi en netwerken voor horeca en B&B's: een gastennetwerk met volledige dekking, gescheiden van uw kassa en eigen systemen. West-Vlaanderen.",
    pains: [
      {
        icon: "activity",
        title: "Uitval op het drukste moment",
        body: "Een kassa of bestelsysteem dat plat ligt tijdens de service is onbetaalbaar. Uw netwerk moet overeind blijven als het druk is.",
      },
      {
        icon: "wifi",
        title: "Klagende gasten",
        body: "'De wifi doet het niet' is een klassieke review-killer. Gasten verwachten dekking tot in de verste kamer en op het terras.",
      },
      {
        icon: "split",
        title: "Alles op één netwerk",
        body: "Gasten, kassa en camera's door elkaar is een risico. Een gast hoort nooit bij uw kassa of uw beelden te kunnen.",
      },
    ],
    approach: [
      "Een gastennetwerk met volledige dekking, ook buiten en in elke kamer.",
      "Gasten gescheiden van uw kassa, boekingssysteem en van elkaar.",
      "Uw bestaande camera's, printers en kassa elk in een eigen netwerk.",
      "Een netwerk dat seizoenspieken en volle zalen aankan.",
      "Na de installatie bewaakt met Packetflow Network.",
    ],
    serviceSlugs: ["zakelijke-wifi-netwerken", "it-beheer-support"],
    localSlugs: ["wifi-installatie-horeca-jabbeke", "gastennetwerk-bnb-brugse-ommeland"],
    faqs: [
      {
        question: "Blijft de wifi werken als het druk is?",
        answer:
          "Ja, als het netwerk ervoor ontworpen is. Ik plaats access points die samenwerken onder één netwerknaam, verdeel de bandbreedte eerlijk over de gasten en geef uw eigen systemen voorrang, zodat een volle zaal uw kassa niet vertraagt.",
      },
      {
        question: "Kan ik gasten en kassa op aparte netwerken zetten?",
        answer:
          "Zeker. Gastenwifi, kassa en camera's komen elk in een eigen netwerk, zodat een gast nooit bij uw kassasysteem of camerabeelden kan. Veiliger én stabieler.",
      },
      {
        question: "Wat als er iets uitvalt tijdens de service?",
        answer:
          "Uw netwerk wordt bewaakt: valt er iets uit, dan krijg ik een melding en zoek ik het waar mogelijk van op afstand op, op weekdagen 's avonds en op zaterdagvoormiddag. Een goed ontwerp zorgt er bovendien voor dat de kassa niet afhangt van de gastenwifi.",
      },
    ],
  },
  {
    slug: "verenigingen-vzw",
    navTitle: "Verenigingen & VZW's",
    title: "IT voor verenigingen en VZW's",
    icon: "users",
    tagline:
      "Eenvoudige, overdraagbare IT voor wie het met vrijwilligers moet doen.",
    description:
      "Een vereniging of VZW draait op vrijwilligers en een bestuur dat af en toe wisselt. Toch heeft u e-mail, gedeelde bestanden en een ledenadministratie nodig die blijven werken als de penningmeester of secretaris het stokje doorgeeft. Ik steun graag verenigingen en goede doelen, en help u met een opzet die eenvoudig blijft.",
    metaDescription:
      "IT voor verenigingen en VZW's: e-mail, gedeelde bestanden en toegang die een bestuurswissel overleven, eenvoudig opgezet en goed uitgelegd.",
    pains: [
      {
        icon: "refresh-cw",
        title: "Wisselend bestuur",
        body: "Als de penningmeester of secretaris wisselt, mag de toegang niet mee verdwijnen. Alles moet netjes overdraagbaar zijn.",
      },
      {
        icon: "folder",
        title: "Gedeelde bestanden",
        body: "Verslagen, ledenlijsten en foto's horen centraal en veilig te staan, bereikbaar voor wie ze nodig heeft en niet voor de rest.",
      },
      {
        icon: "user-check",
        title: "Alles hangt aan één vrijwilliger",
        body: "Vaak weet één persoon hoe de IT in elkaar zit. Valt die weg, dan weet niemand het nog.",
      },
    ],
    approach: [
      "Microsoft 365 correct opgezet, waar mogelijk met het non-profitaanbod van Microsoft.",
      "Gedeelde mailboxen en bestanden die een bestuurswissel overleven.",
      "Een eenvoudige back-up, zodat niets verloren gaat.",
      "Alles gedocumenteerd, zodat het volgende bestuur verder kan.",
      "Uitleg in mensentaal, ook voor niet-technische vrijwilligers.",
    ],
    serviceSlugs: ["moderne-werkplek", "cloud-backup-beveiliging"],
    localSlugs: [],
    faqs: [
      {
        question: "Werkt u ook voor kleine verenigingen?",
        answer:
          "Ja. Ik steun graag verenigingen en goede doelen. We bekijken samen wat u echt nodig heeft, en vaak kan er veel met het non-profitaanbod van Microsoft. Vooraf krijgt u een duidelijke offerte.",
      },
      {
        question: "Wat gebeurt er als ons bestuur wisselt?",
        answer:
          "Ik richt mailboxen, bestanden en toegang zo in dat ze aan de vereniging gekoppeld zijn, niet aan één persoon. Als de penningmeester of secretaris wisselt, verdwijnt de toegang niet mee, en de documentatie gaat naar het nieuwe bestuur.",
      },
      {
        question: "Kunnen we onze bestanden veilig delen?",
        answer:
          "Ja. Verslagen, ledenlijsten en foto's staan centraal en veilig, bereikbaar voor wie ze nodig heeft en niet voor de rest. Met een eenvoudige back-up zodat niets verloren gaat.",
      },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
