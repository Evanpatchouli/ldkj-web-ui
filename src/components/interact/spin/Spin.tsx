import * as React from "react";
import { cn } from "@/lib/utils";

export type SpinProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: number;
  class?: string;
};

export function Spin(props: SpinProps) {
  const { size = 18, className, class: legacyClass, style, ...rest } = props;
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-slate-200 border-t-blue-600",
        className,
        legacyClass,
      )}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
}