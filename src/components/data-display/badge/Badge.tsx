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
  neutral: "bg-slate-200 text-slate-700",
  primary: "bg-blue-600 text-white",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-200 text-amber-700",
  danger: "bg-red-600 text-white",
};

const lightVariantClass: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700",
  primary: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
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
