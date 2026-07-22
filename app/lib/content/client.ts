import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Insurance, Location, Procedure, Profile, Testimonial } from "./types";

/**
 * Isomorphic content loader: in the browser it fetches the same static
 * JSON the app is served from; on the server (build time / server
 * components) it reads that same file directly, since no HTTP server is
 * listening yet during static generation. Vitest unit tests read the file
 * through the same fs path, so app, build, and tests share one fixture set.
 */
async function getContent<T>(name: string): Promise<T> {
  if (typeof window === "undefined") {
    const filePath = path.join(process.cwd(), "public", "mocks", `${name}.json`);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  }
  const response = await fetch(`/mocks/${name}.json`);
  return response.json() as Promise<T>;
}

export const getProcedures = (): Promise<Procedure[]> => getContent<Procedure[]>("procedures");
export const getLocations = (): Promise<Location[]> => getContent<Location[]>("locations");
export const getTestimonials = (): Promise<Testimonial[]> =>
  getContent<Testimonial[]>("testimonials");
export const getInsurances = (): Promise<Insurance[]> => getContent<Insurance[]>("insurances");
export const getProfile = (): Promise<Profile> => getContent<Profile>("profile");

/** Matches the prototype's `waUrl` derivation: never stored, always built from profile + message. */
export function buildWaUrl(profile: Profile, message?: string): string {
  const text = message ?? profile.whatsapp.defaultMessage;
  return `https://wa.me/${profile.whatsapp.phone}?text=${encodeURIComponent(text)}`;
}

/** Matches the prototype's city-filter chip list: "Todas" plus every clinic city. */
export function buildCityFilters(profile: Profile): string[] {
  return ["Todas", ...profile.cities];
}
