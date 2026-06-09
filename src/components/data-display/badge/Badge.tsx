import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  class?: string;
  sx?: SxProps;
  badgeContent?: React.ReactNode;
  dot?: boolean;
  light?: boolean;
  showZero?: boolean;
  max?: number;
  variant?: BadgeVariant;
};

const variantClass: Record<BadgeVariant, string> = {
  neutral:
    "bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-muted-foreground)]",
  primary:
    "bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)]",
  success:
    "bg-[color:var(--ldkj-color-success)] text-[color:var(--ldkj-color-success-foreground)]",
  warning:
    "bg-[color:var(--ldkj-color-warning)] text-[color:var(--ldkj-color-warning-foreground)]",
  danger:
    "bg-[color:var(--ldkj-color-danger)] text-[color:var(--ldkj-color-danger-foreground)]",
};

const lightVariantClass: Record<BadgeVariant, string> = {
  neutral:
    "bg-[color:var(--ldkj-color-surface-muted)] text-[color:var(--ldkj-color-muted-foreground)]",
  primary:
    "bg-[color:var(--ldkj-color-accent)] text-[color:var(--ldkj-color-primary)]",
  success:
    "bg-[color:var(--ldkj-color-accent)] text-[color:var(--ldkj-color-success)]",
  warning:
    "bg-[color:var(--ldkj-color-accent)] text-[color:var(--ldkj-color-warning)]",
  danger:
    "bg-[color:var(--ldkj-color-accent)] text-[color:var(--ldkj-color-danger)]",
};

export function Badge(props: BadgeProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    badgeContent,
    children,
    dot = false,
    light = false,
    showZero = false,
    max = 99,
    variant = "neutral",
    ...rest
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const count = typeof badgeContent === "number" ? badgeContent : null;
  const hidden = count === 0 && !showZero;
  const rendered = count !== null ? (count > max ? `${max}+` : String(count)) : badgeContent;

  const resolvedVariantClass = dot
    ? variantClass[variant]
    : light
      ? lightVariantClass[variant]
      : variantClass[variant];

  return (
    <span
      className={cn("relative inline-flex", className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...rest}
    >
      {children}
      {!hidden && (dot || rendered !== undefined) ? (
        <span
          className={cn(
            "absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full px-1 text-[10px] font-medium leading-4",
            resolvedVariantClass,
            dot ? "h-2 min-w-2 p-0" : "min-w-4 h-4",
            sxClassName,
          )}
        >
          {dot ? null : rendered}
        </span>
      ) : null}
    </span>
  );
}
