import * as React from "react";
import { Input, type InputProps } from "@/components/form/input";

export type InputNumberProps = Omit<InputProps, "type" | "inputMode"> & {
  min?: number;
  max?: number;
  step?: number;
};

export function InputNumber(props: InputNumberProps) {
  return <Input type="number" inputMode="decimal" {...props} />;
}