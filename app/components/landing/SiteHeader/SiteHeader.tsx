import Image from "next/image";

import { CtaLink } from "@/components/ui/CtaLink";
import { buildWaUrl } from "@/lib/content/client";
import type { Profile } from "@/lib/content/types";

import styles from "./SiteHeader.module.css";

export interface SiteHeaderProps {
  profile: Profile;
}

export function SiteHeader({ profile }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Image
        src="/images/logo-gabriela.webp"
        alt={`Monograma GB — ${profile.nome}`}
        width={54}
        height={54}
        className={styles.logo}
      />
      <CtaLink variant="outline" href={buildWaUrl(profile)} external>
        Agendar consulta
      </CtaLink>
    </header>
  );
}
