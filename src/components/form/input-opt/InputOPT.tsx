import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/form/input";

export type InputOPTProps = {
  value?: string;
  length?: number;
  disabled?: boolean;
  className?: string;
  class?: string;
  onChange?: (value: string) => void;
};

export function InputOPT(props: InputOPTProps) {
  const { value = "", length = 6, disabled, className, class: legacyClass, onChange } = props;
  const chars = value.padEnd(length, " ").slice(0, length).split("");
  return (
    <div className={cn("space-y-2", className, legacyClass)}>
      <Input
        disabled={disabled}
        value={value}
        inputMode="numeric"
        maxLength={length}
        onChange={(event) => {
          onChange?.(event.target.value.replace(/\D/g, "").slice(0, length));
        }}
      />
      <div className="flex gap-2">
        {chars.map((char, idx) => (
          <span
            key={idx}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-sm"
          >
            {char.trim() || "-"}
          </span>
        ))}
      </div>
    </div>
  );
}