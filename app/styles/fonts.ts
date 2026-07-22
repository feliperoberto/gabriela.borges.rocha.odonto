/**
 * Brand fonts, per the prototype (`prototype/Landing Page.dc.html`):
 * Cormorant Garamond for display/headings, DM Sans for body — loaded via
 * `next/font/google` (self-hosted at build time) instead of the prototype's
 * Google Fonts `<link>` tags, so the app has no runtime dependency on
 * fonts.googleapis.com and e2e tests stay hermetic.
 */
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-family-display",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-body",
  display: "swap",
});

export const fontVariables = `${cormorantGaramond.variable} ${dmSans.variable}`;
