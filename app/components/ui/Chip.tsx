import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Chip.module.css";

export type ChipVariant = "value" | "procedure" | "city";

interface BaseProps {
  variant?: ChipVariant;
  children: ReactNode;
}

interface ValueChipProps extends BaseProps {
  variant?: "value";
}

interface ToggleChipProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant: "procedure" | "city";
  selected: boolean;
}

export type ChipProps = ValueChipProps | ToggleChipProps;

/**
 * "value" renders a static, non-interactive label (Chapter 1's value chips).
 * "procedure"/"city" render a toggle button, matching the prototype's
 * selected/unselected bg+fg swap for the services explorer and city filter.
 */
export function Chip(props: ChipProps) {
  if (props.variant === "procedure" || props.variant === "city") {
    const { variant, selected, children, className, ...rest } = props;
    return (
      <button
        type="button"
        aria-pressed={selected}
        className={[styles.chip, styles[variant], selected ? styles.selected : "", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const { children } = props;
  return <span className={[styles.chip, styles.value].join(" ")}>{children}</span>;
}
