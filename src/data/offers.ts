// Offer sections: a named offer that lives inside an existing page rather
// than on its own hub (vault: ref-website-copy). Rendered by
// components/OfferSection.astro. Held sections are built on staging only,
// until their publish condition in the vault holds.
//
// Voice: Dutch (Flemish), formal "u", first person (Louis), no em dashes.
// Legal facts exactly as sourced in the vault (prj-track2-avenues), phrased
// as information, never as advice. Re-read the sources on publishing day.

export type OfferSection = {
  /** Anchor id on the page (also used for links from other pages). */
  id: string;
  held?: boolean;
  kicker: string;
  title: string;
  intro: string;
  symptoms: string[];
  features: { icon: string; title: string; body: string }[];
  steps: { title: string; body: string }[];
  /** What stays with someone else (one short paragraph). */
  scope?: string;
  faqs: { question: string; answer: string }[];
  sources?: { label: string; href: string }[];
  cta: { line: string; label: string };
};

// "Praktijk zonder stilstand" (vault: ref-website-copy page 3, avenue 3 in
// prj-track2-avenues). Held: publish after the first practice check and
// Louis's approval of the offer.
export const praktijkZonderStilstand: OfferSection = {
  id: "praktijk-zonder-stilstand",
  held: true,
  kicker: "Voor artsen, tandartsen en kinesitherapeuten",
  title: "Praktijk zonder stilstand",
  intro:
    "Sinds 1 september 2025 factureren artsen en tandartsen verplicht elektronisch aan de ziekenfondsen, via MyCareNet. Daarvoor moeten uw netwerk, uw internet en uw eHealth-certificaat in orde zijn. Daar zorg ik voor, na de praktijkuren.",
  symptoms: [
    "Ons eHealth-certificaat was vervallen, en niemand wist het.",
    "Valt het internet weg, dan staat de balie stil.",
    "Het RX-toestel hangt op hetzelfde netwerk als de wifi in de wachtzaal.",
    "We hebben back-ups, maar niemand heeft ooit geprobeerd er iets mee terug te zetten.",
  ],
  features: [
    {
      icon: "clipboard-check",
      title: "Een praktijkcheck op één avond",
      body: "Netwerk, back-ups, eHealth-certificaat en internet nagekeken, met een schriftelijk verslag.",
    },
    {
      icon: "split",
      title: "Medische toestellen apart",
      body: "Het RX-toestel en andere medische toestellen op een eigen netwerk, los van de balie, de spreekkamers en de wifi voor patiënten.",
    },
    {
      icon: "database-backup",
      title: "Een back-up die echt werkt",
      body: "Van dossiers en beelden, en ook echt teruggezet om te zien of ze bruikbaar is.",
    },
    {
      icon: "calendar-clock",
      title: "Uw eHealth-certificaat in mijn agenda",
      body: "Ik hou de vervaldatum bij en laat u op tijd weten wanneer u moet vernieuwen.",
    },
    {
      icon: "arrow-left-right",
      title: "Een tweede internetlijn",
      body: "Valt uw vaste lijn uit, dan neemt 4G of 5G vanzelf over, zodat u kunt blijven factureren.",
    },
    {
      icon: "radar",
      title: "Bewaakt, met een maandrapport",
      body: "Alles in de gaten gehouden, en elke maand één pagina rapport.",
    },
  ],
  steps: [
    {
      title: "Praktijkcheck",
      body: "Eén avond in uw praktijk, met een schriftelijk verslag van wat goed zit en wat beter kan.",
    },
    {
      title: "Plan en offerte",
      body: "Een vaste prijs voor de werken en een maandprijs voor de opvolging.",
    },
    {
      title: "Werken na de praktijkuren",
      body: "Op een moment dat de praktijk dicht is: 's avonds of op zaterdag.",
    },
    {
      title: "Opvolging",
      body: "Bewaakt, het certificaat in de agenda, hersteltests en elke maand één pagina rapport.",
    },
  ],
  scope:
    "Vragen over uw praktijksoftware blijven overdag bij de helpdesk van uw softwareleverancier. Ik zorg voor alles eronder: het netwerk, de toestellen, de back-ups en de verbinding.",
  faqs: [
    {
      question: "Wat verandert MyCareNet voor mijn praktijk?",
      answer:
        "Sinds 1 september 2025 moeten artsen (huisartsen en specialisten) en tandartsen (algemeen en specialisten) elektronisch factureren aan de ziekenfondsen, via MyCareNet en met erkende software. Er zijn uitzonderingen, onder meer voor zorgverleners boven een bepaalde leeftijd en bij overmacht. Die vindt u op de website van het RIZIV. Ik zorg dat het netwerk en de verbinding eronder in orde zijn. De software en de facturatie zelf blijven bij u en uw softwareleverancier.",
    },
    {
      question: "Geldt dat ook voor kinesitherapeuten?",
      answer:
        "Volgens het RIZIV worden eAgreement, eFact, eAttest en Member Data verplicht voor kinesitherapeuten vanaf 1 januari 2027. Een goed moment om uw netwerk en back-up nu al te laten nakijken.",
    },
    {
      question: "Hoe lang is een eHealth-certificaat geldig?",
      answer:
        "Drie jaar. Vernieuwen kan alleen in de drie maanden voor het vervalt, en verlengen kan niet. Is het vervallen, dan moet u een nieuw certificaat aanvragen en installeren. Ik hou de vervaldatum bij en verwittig u op tijd.",
    },
    {
      question: "Werkt u tijdens de raadplegingen?",
      answer:
        "Nee, en dat is net de bedoeling. Ik werk 's avonds of op zaterdagvoormiddag, als de praktijk dicht is. Vragen over uw praktijksoftware overdag gaan naar de helpdesk van uw softwareleverancier.",
    },
    {
      question: "Wat houdt de praktijkcheck in?",
      answer:
        "Eén avond in uw praktijk. Ik bekijk het netwerk, de back-ups, het eHealth-certificaat en wat er gebeurt als het internet wegvalt. U krijgt een schriftelijk verslag van wat goed zit en wat beter kan, zonder verplichting om iets te laten doen.",
    },
  ],
  sources: [
    {
      label: "RIZIV: verplichte elektronische facturatie voor artsen en tandartsen",
      href: "https://www.inami.fgov.be/nl/nieuws/verplichte-elektronische-facturatie-voor-artsen-en-tandartsen-vanaf-1-september-2025",
    },
    {
      label: "RIZIV: MyCareNet voor de kinesitherapeut",
      href: "https://www.riziv.fgov.be/nl/professionals/individuele-zorgverleners/kinesitherapeuten/mycarenet-voor-de-kinesitherapeut",
    },
    {
      label: "eHealth: beheer van de eHealth-certificaten",
      href: "https://www.ehealth.fgov.be/nl/beroepsbeoefenaars-in-de-gezondheidszorg/diensten/beheer-van-de-ehealth-certificaten",
    },
  ],
  cta: {
    line: "Plan een praktijkcheck: één avond, een schriftelijk verslag, en u beslist zelf wat er gebeurt.",
    label: "Plan een praktijkcheck",
  },
};

// Additions to the sector page /sectoren/medische-praktijken that belong to
// the same held offer (vault: ref-website-copy 3b). Merged in sectors.ts only
// when the offer may be shown in this build.
export const praktijkSectorAdditions = {
  metaTitle: "IT voor praktijken: MyCareNet en eHealth",
  metaDescription:
    "Uw praktijk factureert via MyCareNet en werkt met een eHealth-certificaat. Ik zorg voor netwerk, back-up en certificaat, na de praktijkuren.",
  pain: {
    icon: "file-check",
    title: "De facturatie hangt aan het internet",
    body: "Sinds 1 september 2025 factureren artsen en tandartsen elektronisch via MyCareNet. Valt de verbinding weg of vervalt het certificaat, dan merkt u dat meteen aan de balie.",
  },
  approach: [
    "Een praktijkcheck op één avond, met een schriftelijk verslag.",
    "Medische toestellen en het RX-toestel op een eigen, afgeschermd netwerk.",
    "Uw eHealth-certificaat in mijn agenda, met een seintje voor het vervalt.",
    "Een tweede internetlijn die vanzelf overneemt.",
  ],
  serviceSlug: "altijd-online",
  // The sector page keeps its three existing FAQs; these four are added.
  // "Werkt u tijdens de raadplegingen?" is left out there: the existing
  // spreekuur FAQ already answers it.
  faqs: praktijkZonderStilstand.faqs.filter((f) => f.question !== "Werkt u tijdens de raadplegingen?"),
};
