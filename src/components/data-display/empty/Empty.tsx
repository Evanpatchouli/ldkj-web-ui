import * as React from "react";
import { Box, type BoxProps } from "@/components/layout/box";
import { cn } from "@/lib/utils";

export type EmptyProps = BoxProps<"div"> & {
  description?: React.ReactNode;
  image?: React.ReactNode;
};

export function Empty(props: EmptyProps) {
  const {
    description = "暂无数据",
    image,
    children,
    className,
    class: legacyClass,
    ...rest
  } = props;
  return (
    <Box
      {...rest}
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-10 text-slate-500",
        className,
        legacyClass,
      )}
    >
      {image ?? <div className="text-4xl">◻</div>}
      <div className="text-sm">{description}</div>
      {children}
    </Box>
  );
}
