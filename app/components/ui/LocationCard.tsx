import Image from "next/image";

import type { Location } from "@/lib/content/types";

import styles from "./LocationCard.module.css";

export function LocationCard({ bairro, cidade, foto, alt }: Location) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={foto} alt={alt} fill sizes="300px" className={styles.image} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.bairro}>{bairro}</h3>
        <p className={styles.cidade}>{cidade}</p>
      </div>
    </article>
  );
}
