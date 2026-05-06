import * as React from "react";
import { mergeSxStyle } from "@/styling";
import {
  Grid,
  type GridDirection,
  type GridProps,
  type GridSpacing,
  type GridWrap,
} from "../grid";

export type RowGutter = GridSpacing | [GridSpacing, GridSpacing];

export type RowProps = Omit<
  GridProps,
  "container" | "spacing" | "rowSpacing" | "columnSpacing"
> & {
  gutter?: RowGutter;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: GridWrap;
  direction?: GridDirection;
};

function resolveGutter(gutter?: RowGutter): {
  spacing?: GridSpacing;
  rowSpacing?: GridSpacing;
  columnSpacing?: GridSpacing;
} {
  if (gutter === undefined) return {};
  if (Array.isArray(gutter)) {
    return {
      rowSpacing: gutter[0],
      columnSpacing: gutter[1],
    };
  }
  return {
    spacing: gutter,
  };
}

export function Row(props: RowProps) {
  const {
    gutter = 0,
    align,
    justify,
    wrap = "wrap",
    direction = "row",
    style,
    ...restProps
  } = props;
  const spacingProps = resolveGutter(gutter);

  return (
    <Grid
      container
      wrap={wrap}
      direction={direction}
      style={mergeSxStyle(style, {
        alignItems: align,
        justifyContent: justify,
      })}
      {...spacingProps}
      {...restProps}
    />
  );
}

Row.displayName = "Row";
