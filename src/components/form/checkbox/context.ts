import * as React from "react";

export type CheckboxGroupContextValue = {
  disabled: boolean;
  name?: string;
  selectedValues: ReadonlySet<string>;
  toggleValue: (value: string, checked: boolean) => void;
};

const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextValue | null>(null);

export function CheckboxGroupProvider(props: {
  children: React.ReactNode;
  value: CheckboxGroupContextValue;
}) {
  return React.createElement(
    CheckboxGroupContext.Provider,
    { value: props.value },
    props.children,
  );
}

export function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}
