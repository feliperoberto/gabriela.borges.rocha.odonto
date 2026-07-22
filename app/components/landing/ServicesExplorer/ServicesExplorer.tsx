"use client";

import { useState } from "react";

import { Chip } from "@/components/ui/Chip";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Procedure } from "@/lib/content/types";

import styles from "./ServicesExplorer.module.css";

export interface ServicesExplorerProps {
  procedures: Procedure[];
}

export function ServicesExplorer({ procedures }: ServicesExplorerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProcedure = procedures.find((procedure) => procedure.slug === selected) ?? null;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <RevealGroup className={styles.heading}>
          <SectionHeading
            eyebrow="Capítulo cinco"
            title="O que eu faço"
            description="Toque em um procedimento para entender, em linguagem simples, do que se trata."
          />
        </RevealGroup>
        <RevealGroup className={styles.chips}>
          {procedures.map((procedure) => (
            <Chip
              key={procedure.slug}
              variant="procedure"
              selected={selected === procedure.slug}
              onClick={() =>
                setSelected((current) => (current === procedure.slug ? null : procedure.slug))
              }
            >
              {procedure.nome}
            </Chip>
          ))}
        </RevealGroup>
        {selectedProcedure ? (
          <div className={styles.detail}>
            <p className={styles.detailName}>{selectedProcedure.nome}</p>
            <p className={styles.detailDesc}>{selectedProcedure.desc}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
