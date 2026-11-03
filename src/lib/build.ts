// Which build is this? Production is the build whose site is
// www.packetflow.be (the deploy workflow pins SITE_URL; staging builds on
// GitHub Pages use their own origin). Held content (pages, sections, sector
// additions whose publish condition in the vault does not hold yet) is left
// out of production. Fails closed: a build that does not know its site counts
// as production.
export const isProductionBuild = (import.meta.env.SITE ?? "https://www.packetflow.be").includes("www.packetflow.be");

/** True when held content may be shown in this build. */
export function showHeld(held: boolean | undefined): boolean {
  return !held || !isProductionBuild;
}
