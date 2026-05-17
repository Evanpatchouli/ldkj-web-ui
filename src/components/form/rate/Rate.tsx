import * as React from "react";
import { cn } from "@/lib/utils";

export type RateProps = {
  value?: number;
  count?: number;
  disabled?: boolean;
  className?: string;
  class?: string;
  onChange?: (value: number) => void;
};

export function Rate(props: RateProps) {
  const { value = 0, count = 5, disabled = false, className, class: legacyClass, onChange } = props;
  return (
    <div className={cn("inline-flex items-center gap-1", className, legacyClass)}>
      {Array.from({ length: count }).map((_, idx) => {
        const current = idx + 1;
        return (
          <button
            key={current}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(current)}
            className={cn("text-xl leading-none", current <= value ? "text-amber-400" : "text-slate-300")}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}