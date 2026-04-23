import * as React from "react";
import { cn } from "@/lib/utils";

export type GridSize = number | "grow";
export type GridOffset = number | "auto";
export type GridSpacing = number | string;
export type GridDirection = "row" | "row-reverse";
export type GridWrap = boolean | React.CSSProperties["flexWrap"];

type GridStyleVars = React.CSSProperties & {
  "--ldkj-grid-columns"?: string;
};

export type GridProps = React.ComponentPropsWithoutRef<"div"> & {
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
 * Grid is a flexbox-based 12-column layout container.
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
    className,
    style,
    ...restProps
  } = props;

  const resolvedColumns = normalizeColumns(columns);
  const resolvedRowSpacing = resolveSpacing(rowSpacing ?? spacing);
  const resolvedColumnSpacing = resolveSpacing(columnSpacing ?? spacing);
  const nextStyle: GridStyleVars = {
    ...style,
  };

  if (container) {
    nextStyle.display = "flex";
    nextStyle.flexWrap = resolveWrap(wrap);
    nextStyle.flexDirection = direction;
    nextStyle.rowGap = resolvedRowSpacing;
    nextStyle.columnGap = resolvedColumnSpacing;
    nextStyle["--ldkj-grid-columns"] = String(resolvedColumns);
  } else if (columns !== undefined) {
    nextStyle["--ldkj-grid-columns"] = String(resolvedColumns);
  }

  if (size !== undefined) {
    Object.assign(nextStyle, resolveGridItemSize(size));
  }

  if (offset !== undefined) {
    Object.assign(nextStyle, resolveGridItemOffset(offset));
  }

  return (
    <div
      className={cn("min-w-0", className)}
      style={nextStyle}
      {...restProps}
    />
  );
}

Grid.displayName = "Grid";
