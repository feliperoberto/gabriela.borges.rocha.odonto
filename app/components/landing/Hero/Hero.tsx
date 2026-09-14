"use client";

import type { MouseEvent } from "react";

import { CtaLink } from "@/components/ui/CtaLink";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { buildWaUrl } from "@/lib/content/derive";
import type { Profile } from "@/lib/content/types";

import styles from "./Hero.module.css";

export interface HeroProps {
  profile: Profile;
}

/** Smooth-scrolls to an in-page anchor, matching the prototype's goTo(id) handler. */
function scrollToId(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: "smooth" });
  };
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.blob} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span>Dra. Gabriela Borges</span> <span>· Cirurgiã-Dentista</span>
        </p>
        <h1 className={styles.title}>
          <span className={styles.word}>Cuidar</span> <span className={styles.word}>do</span>{" "}
          <span className={styles.word}>seu</span> <span className={styles.word}>sorriso</span>{" "}
          <span className={styles.word}>é</span> <span className={styles.word}>a</span>{" "}
          <span className={[styles.word, styles.emphasis].join(" ")}>minha</span>{" "}
          <span className={[styles.word, styles.emphasis].join(" ")}>história.</span>
        </h1>
        <p className={styles.description}>
          Hoje, reúno toda essa experiência para oferecer um atendimento cuidadoso, responsável e, acima de tudo, humano, em São José dos Campos, Mogi das Cruzes e Biritiba-Mirim.
          Mais de uma década vivendo a odontologia por dentro — minha história começa bem antes da graduação, atravessando diversas áreas até chegar à profissão que escolhi para mim: ser cirurgiã-dentista.</p>
        <CtaLink
          id="hero-cta"
          variant="whatsapp"
          href={buildWaUrl(profile)}
          external
          icon={<WhatsAppIcon />}
          className={styles.cta}
        >
          Agendar pelo WhatsApp
        </CtaLink>
        <div className={styles.trustLinks}>
          <a href="#sobre" onClick={scrollToId("sobre")} className={styles.trustLink}>
            CRO-SP 176648
          </a>
          <a href="#convenios" onClick={scrollToId("convenios")} className={styles.trustLink}>
            Convênios aceitos
          </a>
          <a href="#unidades" onClick={scrollToId("unidades")} className={styles.trustLink}>
            Unidades
          </a>
        </div>
      </div>
    </section>
  );
}
