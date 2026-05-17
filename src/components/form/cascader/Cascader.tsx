import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";

export type CascaderOption = {
  label: string;
  value: string;
  children?: CascaderOption[];
};

export type CascaderProps = {
  options?: CascaderOption[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
};

export function Cascader(props: CascaderProps) {
  const { options = [], value, placeholder = "请选择", onValueChange } = props;
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}