import type { Testimonial } from "@/lib/content/types";

import styles from "./TestimonialCard.module.css";

export function TestimonialCard({ texto, autor }: Testimonial) {
  return (
    <figure className={styles.card}>
      <div className={styles.quoteMark} aria-hidden="true">
        &ldquo;
      </div>
      <blockquote className={styles.quote}>{texto}</blockquote>
      <figcaption className={styles.author}>— {autor}</figcaption>
    </figure>
  );
}
