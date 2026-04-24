import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";
export type FlexWrap = boolean | React.CSSProperties["flexWrap"];
export type FlexGapPreset = "xs" | "sm" | "md" | "lg" | "xl";
export type FlexGap = FlexGapPreset | number | string;
export type FlexSize = number | string;

/**
 * Flex 容器属性。
 */
export type FlexProps = React.ComponentPropsWithoutRef<"div"> & {
  direction?: FlexDirection;
  justify?: React.CSSProperties["justifyContent"];
  items?: React.CSSProperties["alignItems"];
  flex?: React.CSSProperties["flex"];
  wrap?: FlexWrap;
  gap?: FlexGap;
  width?: FlexSize;
  height?: FlexSize;
  sx?: SxProps;
};

const gapPresetClass: Record<FlexGapPreset, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

function resolveDirection(direction: FlexDirection): React.CSSProperties["flexDirection"] {
  if (direction === "col") return "column";
  if (direction === "col-reverse") return "column-reverse";
  return direction;
}

function resolveWrap(wrap: FlexWrap): React.CSSProperties["flexWrap"] {
  if (typeof wrap === "boolean") return wrap ? "wrap" : "nowrap";
  return wrap;
}

function resolveSize(size?: FlexSize): string | undefined {
  if (size === undefined) return undefined;
  return typeof size === "number" ? `${size}px` : size;
}

function resolveGap(gap: FlexGap): {
  gapClass?: string;
  gapStyle?: React.CSSProperties["gap"];
} {
  if (typeof gap === "number") {
    return { gapStyle: `${gap}px` };
  }
  if (typeof gap === "string" && gap in gapPresetClass) {
    return { gapClass: gapPresetClass[gap as FlexGapPreset] };
  }
  return { gapStyle: gap as React.CSSProperties["gap"] };
}

/**
 * Flex 是基于 CSS Flexbox 的对齐布局容器。
 */
export function Flex(props: FlexProps) {
  const {
    direction = "row",
    justify,
    items,
    flex,
    wrap = "nowrap",
    gap = "md",
    width,
    height,
    sx,
    className,
    style,
    ...restProps
  } = props;
  const { gapClass, gapStyle } = resolveGap(gap);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const computedStyle: React.CSSProperties = {
    flexDirection: resolveDirection(direction),
    justifyContent: justify,
    alignItems: items,
    flexWrap: resolveWrap(wrap),
    flex,
    gap: gapStyle,
    width: resolveSize(width),
    height: resolveSize(height),
  };

  return (
    <div
      className={cn("flex", gapClass, sxClassName, className)}
      style={mergeSxStyle(style, computedStyle, sxInlineStyle)}
      {...restProps}
    />
  );
}

Flex.displayName = "Flex";
