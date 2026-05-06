import * as React from "react";
import { mergeSxStyle } from "@/styling";
import { Grid, type GridOffset, type GridProps, type GridSize } from "../grid";

export type ColProps = Omit<GridProps, "container" | "size"> & {
  span?: GridSize;
  offset?: GridOffset;
  flex?: React.CSSProperties["flex"];
};

export function Col(props: ColProps) {
  const { span, offset, flex, style, ...restProps } = props;

  return (
    <Grid
      size={span}
      offset={offset}
      style={mergeSxStyle(style, {
        flex,
      })}
      {...restProps}
    />
  );
}

Col.displayName = "Col";
