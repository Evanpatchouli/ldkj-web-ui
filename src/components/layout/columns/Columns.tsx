import * as React from "react";
import { Box, type BoxProps } from "../box";
import { mergeSxStyle } from "@/styling";
import { cn } from "@/lib/utils";

/** Columns 列间与列内项目间的间距。数字按 px 处理。 */
export type ColumnsGap = number | string;

export type ColumnsProps = BoxProps<React.ElementType> & {
  /** 固定分栏数。无效值会回退为 4。 */
  columns?: number;
  /** 列间与列内项目之间的间距。默认 `8px`。 */
  gap?: ColumnsGap;
};

const DEFAULT_COLUMNS = 4;

function normalizeColumns(columns: number | undefined): number {
  if (!Number.isFinite(columns) || columns === undefined || columns < 1) {
    return DEFAULT_COLUMNS;
  }

  return Math.floor(columns);
}

function normalizeGap(gap: ColumnsGap | undefined): string {
  if (gap === undefined) return "8px";
  return typeof gap === "number" ? `${gap}px` : gap;
}

/**
 * Columns 是固定列数的内容分栏容器。
 *
 * 子节点按传入顺序轮询分配到各列。它不会读取或比较项目高度，
 * 因此不保证每列等高，也不应作为 Masonry / Waterfalls 使用。
 */
export function Columns(props: ColumnsProps) {
  const { columns, gap, className, style, sx, children, ...restProps } = props;
  const resolvedColumns = normalizeColumns(columns);
  const resolvedGap = normalizeGap(gap);
  const columnNodes: React.ReactNode[][] = Array.from(
    { length: resolvedColumns },
    () => [],
  );

  React.Children.toArray(children).forEach((child, index) => {
    columnNodes[index % resolvedColumns].push(child);
  });

  return (
    <Box
      className={cn("ldkj-columns", className)}
      style={mergeSxStyle(
        {
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          gap: resolvedGap,
        },
        style,
      )}
      sx={sx}
      {...restProps}
    >
      {columnNodes.map((nodes, index) => (
        <div
          key={`columns-column-${index}`}
          className="ldkj-columns__column"
          data-columns-column={index}
          style={{
            display: "flex",
            minWidth: 0,
            flex: "1 1 0",
            flexDirection: "column",
            gap: resolvedGap,
          }}
        >
          {nodes}
        </div>
      ))}
    </Box>
  );
}

Columns.displayName = "Columns";
