import * as React from "react";
import { cn } from "@/lib/utils";

export type SpinTone = "primary" | "muted" | "success" | "warning" | "danger";

export type SpinProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Spinner size. Numbers are treated as px. */
  size?: number | string;
  /** Ring stroke width. Numbers are treated as px. */
  strokeWidth?: number | string;
  /** Color tone for the active ring segment. */
  tone?: SpinTone;
  /** Accessible label announced by screen readers. */
  label?: string;
  /** Set to false to suppress the spinner without branching in user code. */
  spinning?: boolean;
  class?: string;
};

const toneMap: Record<SpinTone, string> = {
  primary:
    "border-[color:var(--ldkj-color-border)] border-t-[color:var(--ldkj-color-primary)]",
  muted:
    "border-[color:var(--ldkj-color-border)] border-t-[color:var(--ldkj-color-muted-foreground)]",
  success:
    "border-[color:var(--ldkj-color-border)] border-t-[color:var(--ldkj-color-success)]",
  warning:
    "border-[color:var(--ldkj-color-border)] border-t-[color:var(--ldkj-color-warning)]",
  danger:
    "border-[color:var(--ldkj-color-border)] border-t-[color:var(--ldkj-color-danger)]",
};

export function Spin(props: SpinProps) {
  const {
    size = 18,
    strokeWidth = 2,
    tone = "primary",
    label = "loading",
    spinning = true,
    className,
    class: legacyClass,
    style,
    ...rest
  } = props;

  if (!spinning) return null;

  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block shrink-0 animate-spin rounded-full border-solid",
        toneMap[tone],
        className,
        legacyClass,
      )}
      style={{ width: size, height: size, borderWidth: strokeWidth, ...style }}
      {...rest}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
