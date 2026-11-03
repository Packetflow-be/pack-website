// /voor-it-bedrijven: track 1, the evening and weekend engineer for IT firms
// (vault: ref-website-copy page 5, prj-it-firm-subcontract-channel). Same
// shape as a service hub so it renders with HubPage, but it lives at the top
// level, not under /diensten, and is not in the main menu.
//
// Published 2026-11-03 (mail H to e-BO sent and acknowledged; Louis). No client or partner
// names, nothing about e-BO. Louis 2026-11-03: no promise lines (no
// "klanten niet overnemen", no "aan u gefactureerd"). The story is from vault
// ref-origin-story: a previous job, as an employee, employer and factory
// never named, no blame.
import type { ServiceHub } from "@/data/services";

export const itFirmsPage: ServiceHub = {
  slug: "voor-it-bedrijven",
  navTitle: "Voor IT-bedrijven",
  title: "De avond- en weekendingenieur onder uw naam",
  metaTitle: "Avond- en weekendingenieur voor IT-bedrijven",
  solution: "Voor IT-bedrijven",
  kicker: "Voor IT-bedrijven",
  audience: "IT-bedrijven en MSP's",
  icon: "server-cog",
  tagline:
    "Uw team heeft overdag de handen vol, en die migratie of firewallwissel kan alleen 's avonds of in het weekend. Die werken doe ik, onder uw naam.",
  description:
    "Een extra engineer voor IT-bedrijven, MSP's en integratoren: migraties, cutovers, firewall- en netwerkwissels 's avonds en in het weekend, onder uw naam, gedocumenteerd opgeleverd.",
  metaDescription:
    "Migraties, firewalls en servers 's avonds en in het weekend, onder uw naam. Een extra engineer voor IT-bedrijven in West-Vlaanderen, per opdracht.",
  problem: { title: "Herkenbaar?", body: "" },
  symptoms: [
    "We zoeken al maanden een system engineer.",
    "De migratie moet in het weekend, en niemand van het team kan.",
    "Dat project laten we liggen, we hebben er de mensen niet voor.",
    "De enige die die firewall kent, is met verlof.",
  ],
  features: [
    {
      icon: "moon",
      title: "Werk 's avonds en in het weekend",
      body: "Migraties, cutovers, firewall- en netwerkwissels: het onderhoud dat overdag niet kan.",
    },
    {
      icon: "badge-check",
      title: "Onder uw naam",
      body: "In uw tickets en uw documentatie.",
    },
    {
      icon: "server",
      title: "Van netwerk tot server",
      body: "Proxmox, VMware vSphere en Hyper-V; MikroTik en Fortinet; Veeam en Proxmox Backup Server; Zabbix; Ansible; Microsoft 365 en Entra ID.",
    },
    {
      icon: "file-text",
      title: "Gedocumenteerd opgeleverd",
      body: "Elke opdracht eindigt met een verslag en de documentatie in uw systemen.",
    },
    {
      icon: "undo-2",
      title: "Altijd een weg terug",
      body: "Per stap ligt vast wat er gebeurt, en wat we doen als iets niet loopt zoals gepland.",
    },
  ],
  story: {
    kicker: "Waarom ik zo werk",
    title: "Nooit zonder weg terug",
    paragraphs: [
      "Vier uur 's nachts, in een fabriek in Frankrijk. Twee uur later moest de productie opnieuw starten. Ik was er in een vorige job, als werknemer, al drie dagen en drie nachten om alle servers over te zetten naar een nieuw platform. Het oude systeem was al gewist: er was geen weg terug.",
      "Het is gelukt, op één server na. Die heeft nog een tijd op een gewone pc gedraaid.",
      "Met een plan B was het een gewone nacht geweest. Daarom plan ik elke migratie met capaciteit om terug te vallen.",
    ],
  },
  steps: [
    {
      title: "Kennismaking",
      body: "Een gesprek over waar uw team tekort heeft en wat er blijft liggen.",
    },
    {
      title: "Een eerste, afgebakende opdracht",
      body: "Met een vaste scope, zodat u snel ziet of het klikt.",
    },
    {
      title: "Uitvoering 's avonds of in het weekend",
      body: "Volgens een plan met een weg terug, onder uw naam.",
    },
    {
      title: "Overdracht",
      body: "Verslag en documentatie in uw systemen.",
    },
  ],
  forWho:
    "IT-bedrijven, MSP's en integratoren van 1 tot 15 mensen in West-Vlaanderen, met meer werk dan engineers.",
  limits: [
    "Geen werk overdag: mijn uren zijn 's avonds en in het weekend.",
    "Geen industriële procesnetwerken: ik blijf aan de IT-kant, zonder PLC's, besturingen of procesnetwerken.",
  ],
  faqs: [
    {
      question: "Waarom 's avonds en in het weekend?",
      answer:
        "Omdat migraties, cutovers en firewallwissels dan het minst storen voor uw klant, en net dan uw eigen team er niet is.",
    },
    {
      question: "Met welke technologie werkt u?",
      answer:
        "Proxmox, VMware vSphere en Hyper-V; MikroTik en Fortinet; Veeam en Proxmox Backup Server; Zabbix; Ansible; Microsoft 365 en Entra ID. Staat uw platform er niet tussen, vraag het gerust: ik zeg u eerlijk of ik de juiste ben.",
    },
    {
      question: "Kunnen we klein beginnen?",
      answer: "Graag zelfs. Een eerste opdracht met een vaste scope toont het snelst of het klikt.",
    },
  ],
  cta: {
    title: "Wat blijft er bij uw team liggen?",
    body: "Vertel het me, dan bekijken we samen of ik u kan helpen.",
  },
  locals: [],
};
