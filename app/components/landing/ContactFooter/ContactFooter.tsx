import Image from "next/image";

import { CtaLink } from "@/components/ui/CtaLink";
import { EmailIcon, InstagramIcon, PhoneIcon } from "@/components/ui/Icon";
import { RevealGroup } from "@/components/ui/RevealGroup";
import type { Profile } from "@/lib/content/types";

import styles from "./ContactFooter.module.css";

export interface ContactFooterProps {
  profile: Profile;
}

export function ContactFooter({ profile }: ContactFooterProps) {
  return (
    <footer className={styles.footer}>
      <RevealGroup className={styles.content}>
        <Image src="/images/logo-gabriela.webp" alt="" width={60} height={60} className={styles.logo} />
        <h2 className={styles.title}>Vamos conversar sobre o seu sorriso?</h2>
        <CtaLink variant="solid" href={`tel:${profile.tel}`} icon={<PhoneIcon />}>
          {profile.telDisplay}
        </CtaLink>
        <div className={styles.links}>
          <a
            href={`https://instagram.com/${profile.instagram}`}
            target="_blank"
            rel="noopener"
            className={styles.link}
          >
            <InstagramIcon />@{profile.instagram}
          </a>
          <a href={`mailto:${profile.email}`} className={styles.link}>
            <EmailIcon />
            {profile.email}
          </a>
        </div>
        <p className={styles.credentials}>
          {profile.nome} · Cirurgiã-Dentista · {profile.cro}
          <br />
          {profile.cities.join(" e ")} — SP
        </p>
      </RevealGroup>
    </footer>
  );
}
