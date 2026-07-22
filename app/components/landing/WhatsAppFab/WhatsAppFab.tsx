"use client";

import { useEffect, useRef } from "react";

import { CtaLink } from "@/components/ui/CtaLink";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { useHeroFabVisibility } from "@/hooks/useHeroFabVisibility";
import { buildWaUrl } from "@/lib/content/derive";
import type { Profile } from "@/lib/content/types";

import styles from "./WhatsAppFab.module.css";

export interface WhatsAppFabProps {
  profile: Profile;
}

/**
 * Fixed WhatsApp button. Queries #hero-cta by id (matching the prototype's
 * own `document.getElementById('hero-cta')` approach) rather than requiring
 * Hero to forward a ref — the two sections stay decoupled.
 */
export function WhatsAppFab({ profile }: WhatsAppFabProps) {
  const heroCtaRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    heroCtaRef.current = document.getElementById("hero-cta");
  }, []);
  const visible = useHeroFabVisibility(heroCtaRef);

  return (
    <CtaLink
      variant="whatsapp"
      href={buildWaUrl(profile)}
      external
      icon={<WhatsAppIcon size={18} />}
      aria-label="Conversar no WhatsApp"
      className={[styles.fab, visible ? styles.visible : ""].filter(Boolean).join(" ")}
    >
      WhatsApp
    </CtaLink>
  );
}
