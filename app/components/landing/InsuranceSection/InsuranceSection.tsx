import Image from "next/image";

import { RevealGroup } from "@/components/ui/RevealGroup";
import type { Insurance } from "@/lib/content/types";

import styles from "./InsuranceSection.module.css";

export interface InsuranceSectionProps {
  insurances: Insurance[];
}

export function InsuranceSection({ insurances }: InsuranceSectionProps) {
  return (
    <section id="convenios" className={styles.section}>
      <RevealGroup className={styles.content}>
        <p className={styles.eyebrow}>Convênios atendidos</p>
        <div className={styles.logos}>
          {insurances.map((insurance) => (
            <div key={insurance.nome} className={styles.logoCard}>
              <Image
                src={insurance.logo}
                alt={insurance.alt}
                width={120}
                height={40}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
        <p className={styles.note}>
          Também atendo particular. Consulte disponibilidade do seu plano pelo WhatsApp.
        </p>
      </RevealGroup>
    </section>
  );
}
