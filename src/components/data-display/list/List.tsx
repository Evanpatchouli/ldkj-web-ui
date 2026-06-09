import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type ListProps = React.HTMLAttributes<HTMLUListElement> & {
  class?: string;
  sx?: SxProps;
  bordered?: boolean;
};

export function List(props: ListProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    bordered = false,
    ...rest
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <ul
      className={cn(
        "m-0 list-none p-0",
        bordered && "divide-y divide-[color:var(--ldkj-color-border)] rounded-md border border-[color:var(--ldkj-color-border)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...rest}
    />
  );
}
