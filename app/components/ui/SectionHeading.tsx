import styles from "./SectionHeading.module.css";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

/** Eyebrow label + Cormorant Garamond title + optional intro paragraph, used at the top of every landing section. */
export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={[styles.heading, align === "left" ? styles.left : styles.center].join(" ")}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
