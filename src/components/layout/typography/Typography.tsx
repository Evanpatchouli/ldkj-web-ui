import * as React from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type TypographyVariant = "h1" | "h2" | "h3" | "body" | "caption";

const variantClass: Record<TypographyVariant, string> = {
  h1: "text-3xl font-semibold leading-tight",
  h2: "text-2xl font-semibold leading-tight",
  h3: "text-xl font-semibold leading-snug",
  body: "text-sm leading-6 text-[color:var(--ldkj-color-foreground)]",
  caption: "text-xs leading-5 text-[color:var(--ldkj-color-muted-foreground)]",
};

export type TypographyProps<T extends ElementType = "p"> = {
  component?: T;
  className?: string;
  class?: string;
  sx?: SxProps;
  variant?: TypographyVariant;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export function Typography<T extends ElementType = "p">(
  props: TypographyProps<T>,
) {
  const {
    component,
    className,
    class: legacyClass,
    sx,
    style,
    variant = "body",
    ...rest
  } = props;
  const Comp = (component ?? "p") as ElementType;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <Comp
      className={cn(variantClass[variant], sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...rest}
    />
  );
}
