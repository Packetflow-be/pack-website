// Partner / certification trust signals shown on the site ("Trots om te werken
// met …"). Logos live in public/images/partners/ — drop the files there with
// the filenames below and they appear; until then a clean text badge shows, so
// nothing looks broken. Add/adjust entries freely.
export type Partner = {
  name: string;
  /** Logo in public/images/partners/ (svg/png/webp). */
  logo: string;
  alt: string;
  url?: string;
};

export const partnersIntro =
  "Voor wifi en netwerken werk ik met de oplossingen van erkende partners: apparatuur gebouwd voor zaken waar veel mensen tegelijk online zijn.";

export const partners: Partner[] = [
  {
    name: "Ruckus Registered Partner",
    logo: "/images/partnership-badges/ruckus-registered.png",
    alt: "Ruckus Networks Registered Partner",
    url: "https://www.ruckusnetworks.com/",
  },
  {
    name: "Zyxel Ally",
    logo: "/images/partnership-badges/zyxel-ally.png",
    alt: "Zyxel Networks Ally partner",
    url: "https://www.zyxel.com/",
  },
];
