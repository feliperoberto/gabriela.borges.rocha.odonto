"use client";

import Image from "next/image";

import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useParallax } from "@/hooks/useParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import styles from "./AboutSection.module.css";

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const parallaxRef = useParallax<HTMLDivElement>(reducedMotion);

  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.layout}>
        <RevealGroup className={styles.imageWrapper}>
          <div ref={parallaxRef} className={styles.parallax}>
            <Image
              src="/images/apresentacao-gabriela.jpg"
              alt="Retrato da Dra. Gabriela Borges"
              fill
              sizes="280px"
              className={styles.image}
            />
          </div>
        </RevealGroup>
        <RevealGroup className={styles.text}>
          <SectionHeading eyebrow="Capítulo três" title="Prazer, Gabriela." align="left" />
          <p className={styles.description}>
            Sou cirurgiã-dentista e atuo como clínica geral, atendendo famílias inteiras — das
            crianças aos avós. Trago para cada consulta a experiência de quem conhece a
            odontologia pelos dois lados da cadeira: com olhar técnico apurado e o compromisso
            de tornar cada visita mais leve e humana.
          </p>
          <p className={styles.credentials}>
            CRO-SP 176648 · Atendimento em São José dos Campos e Mogi das Cruzes
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
