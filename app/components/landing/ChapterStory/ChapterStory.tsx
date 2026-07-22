import { Chip } from "@/components/ui/Chip";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";

import styles from "./ChapterStory.module.css";

export function ChapterStory() {
  return (
    <section className={styles.section}>
      <RevealGroup className={styles.content}>
        <SectionHeading eyebrow="Capítulo um" title="Do outro lado da cadeira" />
        <p className={styles.description}>
          Muito antes do diploma, a odontologia já fazia parte da minha rotina: da recepção à
          auditoria odontológica, passando pelo trabalho como técnica em saúde bucal. Mais de
          uma década acompanhando de perto cada detalhe do cuidado com pacientes — e aprendendo
          que técnica só tem valor quando vem acompanhada de escuta e acolhimento.
        </p>
        <div className={styles.chips}>
          <Chip variant="value">acolhimento</Chip>
          <Chip variant="value">esmero técnico</Chip>
          <Chip variant="value">ética</Chip>
        </div>
      </RevealGroup>
    </section>
  );
}
