import type { AnchorHTMLAttributes, ReactNode } from "react";

import styles from "./CtaLink.module.css";

export type CtaLinkVariant = "outline" | "whatsapp" | "solid";

export interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: CtaLinkVariant;
  icon?: ReactNode;
  /** Sets target="_blank" rel="noopener" — used for WhatsApp/Instagram links. */
  external?: boolean;
  children: ReactNode;
}

/**
 * Pill CTA link covering every button-styled anchor in the prototype:
 * the header "Agendar consulta" pill (outline), the hero/FAB WhatsApp CTAs
 * (whatsapp), and the footer tel CTA (solid).
 */
export function CtaLink({
  variant,
  icon,
  external = false,
  children,
  className,
  ...rest
}: CtaLinkProps) {
  return (
    <a
      className={[styles.cta, styles[variant], className].filter(Boolean).join(" ")}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
