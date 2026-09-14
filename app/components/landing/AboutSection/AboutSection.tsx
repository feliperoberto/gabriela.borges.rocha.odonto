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
            Hoje, como cirurgiã-dentista, encontrei na Odontologia a forma que escolhi para cuidar de pessoas.
            Acredito em uma odontologia que começa antes do procedimento: em ouvir, entender o que cada paciente precisa e explicar cada etapa com clareza. Cuidar da saúde bucal também é construir uma relação de confiança ao longo de cada atendimento.
            Atuo como clínica geral e recebo pacientes de diferentes idades e necessidades, buscando fazer da consulta um momento de cuidado, escuta e segurança.
          </p>
          <p className={styles.credentials}>
            CRO-SP 176648 · Atendimento em São José dos Campos, Mogi das Cruzes e Biritiba-Mirim.
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
