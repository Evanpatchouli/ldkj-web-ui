import * as React from "react";
import { cn } from "@/lib/utils";

export type SliderV2Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  value?: number;
  class?: string;
  onValueChange?: (value: number) => void;
};

export function SliderV2(props: SliderV2Props) {
  const { className, class: legacyClass, value, onValueChange, ...rest } = props;
  return (
    <input
      type="range"
      value={value}
      onChange={(event) => onValueChange?.(Number(event.target.value))}
      className={cn("h-2 w-full cursor-pointer accent-blue-600", className, legacyClass)}
      {...rest}
    />
  );
}