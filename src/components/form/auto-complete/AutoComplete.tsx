import * as React from "react";
import { Input, type InputProps } from "@/components/form/input";

export type AutoCompleteOption = { label: string; value: string };
export type AutoCompleteProps = Omit<InputProps, "list"> & {
  options?: AutoCompleteOption[];
};

export function AutoComplete(props: AutoCompleteProps) {
  const { options = [], ...rest } = props;
  const listId = React.useId();
  return (
    <>
      <Input list={listId} {...rest} />
      <datalist id={listId}>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </datalist>
    </>
  );
}