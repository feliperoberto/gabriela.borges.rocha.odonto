import { Chip } from "@/components/ui/Chip";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";

import styles from "./ChapterStory.module.css";

export function ChapterStory() {
  return (
    <section className={styles.section}>
      <RevealGroup className={styles.content}>
        <SectionHeading eyebrow="Capítulo um" title="Uma história que começou antes de ser dentista" />
        <p className={styles.description}>
          Muito antes do diploma, a odontologia já fazia parte da minha rotina. Comecei na recepção de um consultório e, aos poucos, fui me aproximando da área: fiz o curso de Técnica em Saúde Bucal e trabalhei com auditoria odontológica.
        </p>
        <p className={styles.description}>
          Mais tarde, entrei na faculdade de Odontologia — e continuei vivendo a rotina dos consultórios como técnica durante a graduação. Foi assim que fui conhecendo a profissão por diferentes perspectivas, descobrindo que em cada uma delas existe uma forma diferente de cuidar.
        </p>
        <p className={styles.description}>
          Hoje, faço isso da cadeira de cirurgiã-dentista.
        </p>
        <div className={styles.chips}>
          <Chip variant="value">acolhimento</Chip>
          <Chip variant="value">cuidado</Chip>
          <Chip variant="value">responsabilidade</Chip>
        </div>
      </RevealGroup>
    </section>
  );
}
