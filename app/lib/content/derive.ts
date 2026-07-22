import type { Profile } from "./types";

/**
 * Pure derivation helpers with NO fs/fetch imports — safe to import from
 * Client Components. Kept out of client.ts because that module also
 * imports node:fs/promises for its server-side data-fetch branch; bundling
 * that for the browser fails outright (Turbopack can't chunk a Node builtin
 * into a client bundle), even when the client only wants a pure function.
 */

/** Matches the prototype's `waUrl` derivation: never stored, always built from profile + message. */
export function buildWaUrl(profile: Profile, message?: string): string {
  const text = message ?? profile.whatsapp.defaultMessage;
  return `https://wa.me/${profile.whatsapp.phone}?text=${encodeURIComponent(text)}`;
}

/** Matches the prototype's city-filter chip list: "Todas" plus every clinic city. */
export function buildCityFilters(profile: Profile): string[] {
  return ["Todas", ...profile.cities];
}
