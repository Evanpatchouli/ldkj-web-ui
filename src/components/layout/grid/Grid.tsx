import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";
import { Box, type BoxProps } from "../box";

export type GridSize = number | "grow";
export type GridOffset = number | "auto";
export type GridSpacing = number | string;
export type GridDirection = "row" | "row-reverse";
export type GridWrap = boolean | React.CSSProperties["flexWrap"];

type GridStyleVars = React.CSSProperties & {
  "--ldkj-grid-columns"?: string;
};

export type GridProps = BoxProps<React.ElementType> & {
  container?: boolean;
  size?: GridSize;
  offset?: GridOffset;
  columns?: number;
  spacing?: GridSpacing;
  rowSpacing?: GridSpacing;
  columnSpacing?: GridSpacing;
  wrap?: GridWrap;
  direction?: GridDirection;
};

function resolveSpacing(value?: GridSpacing): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value * 8}px`;
  return value;
}

function normalizeColumns(columns?: number): number {
  if (!columns || Number.isNaN(columns) || columns <= 0) return 12;
  return columns;
}

function resolveWrap(wrap: GridWrap): React.CSSProperties["flexWrap"] {
  if (typeof wrap === "boolean") return wrap ? "wrap" : "nowrap";
  return wrap;
}

function resolveGridItemSize(size: GridSize): React.CSSProperties {
  if (size === "grow") {
    return {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: "100%",
    };
  }

  return {
    flexBasis: `calc(100% * ${size} / var(--ldkj-grid-columns, 12))`,
    maxWidth: `calc(100% * ${size} / var(--ldkj-grid-columns, 12))`,
    flexGrow: 0,
  };
}

function resolveGridItemOffset(offset: GridOffset): React.CSSProperties {
  if (offset === "auto") {
    return {
      marginLeft: "auto",
    };
  }

  return {
    marginLeft: `calc(100% * ${offset} / var(--ldkj-grid-columns, 12))`,
  };
}

/**
 * Grid 是基于 Flexbox 的 12 列布局容器。
 */
export function Grid(props: GridProps) {
  const {
    container = false,
    size,
    offset,
    columns,
    spacing,
    rowSpacing,
    columnSpacing,
    wrap = "wrap",
    direction = "row",
    sx,
    className,
    style,
    ...restProps
  } = props;

  const resolvedColumns = normalizeColumns(columns);
  const resolvedRowSpacing = resolveSpacing(rowSpacing ?? spacing);
  const resolvedColumnSpacing = resolveSpacing(columnSpacing ?? spacing);
  const computedStyle: GridStyleVars = {};

  if (container) {
    computedStyle.display = "flex";
    computedStyle.flexWrap = resolveWrap(wrap);
    computedStyle.flexDirection = direction;
    computedStyle.rowGap = resolvedRowSpacing;
    computedStyle.columnGap = resolvedColumnSpacing;
    computedStyle["--ldkj-grid-columns"] = String(resolvedColumns);
  } else if (columns !== undefined) {
    computedStyle["--ldkj-grid-columns"] = String(resolvedColumns);
  }

  if (size !== undefined) {
    Object.assign(computedStyle, resolveGridItemSize(size));
  }

  if (offset !== undefined) {
    Object.assign(computedStyle, resolveGridItemOffset(offset));
  }

  return (
    <Box
      className={cn("min-w-0", className)}
      style={mergeSxStyle(style as GridStyleVars, computedStyle)}
      sx={sx}
      {...restProps}
    />
  );
}

Grid.displayName = "Grid";
