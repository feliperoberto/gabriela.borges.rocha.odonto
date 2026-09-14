import Image from "next/image";

import { RevealGroup } from "@/components/ui/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";

import styles from "./ChapterToday.module.css";

export function ChapterToday() {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <RevealGroup className={styles.imageCard}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/fotopolimerizador.jpg"
              alt="Dra. Gabriela realizando procedimento de dentística restauradora"
              fill
              sizes="400px"
              className={styles.image}
            />
          </div>
        </RevealGroup>
        <RevealGroup className={styles.text}>
          <SectionHeading eyebrow="Capítulo dois" title="A escolha pela Odontologia" align="left" />
          <p className={styles.description}>
            …com a segurança de quem escolheu a profissão conhecendo-a profundamente.
            Foi essa vivência, sob diferentes perspectivas, que me levou a escolher a Odontologia. E hoje, como cirurgiã-dentista, continuo construindo essa história.
            “Eu conheço o cuidado por diferentes perspectivas — porque fiz parte de cada uma delas.”
          </p>
          <p className={styles.quote}>
            &ldquo;Eu entendo cada detalhe do seu cuidado — porque já vivi todos eles.&rdquo;
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
