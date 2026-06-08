import * as React from "react";
import { Input, type InputProps } from "@/components/form/input";

export type InputNumberValueChangeReason = "input" | "commit" | "set";

export type InputNumberValueChangeMeta = {
  reason: InputNumberValueChangeReason;
  valueAsString: string;
  event?:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>;
};

export type InputNumberProps = Omit<InputProps, "type" | "inputMode"> & {
  min?: number;
  max?: number;
  step?: number;
  /** 失焦时是否将输入值修正到 `min/max/step` 描述的合法区间。 */
  clampOnBlur?: boolean;
  /** 失焦归一化后的固定小数位数。 */
  precision?: number;
  /** 返回解析后的数值；空值或非法临时值返回 `null`。 */
  onValueChange?: (value: number | null, meta: InputNumberValueChangeMeta) => void;
  /** 输入值提交时触发，默认在失焦或按下 Enter 时提交。 */
  onValueCommit?: (value: number | null, meta: InputNumberValueChangeMeta) => void;
};

export type NumberInputValue = string | number | null;

export type UseNumberInputOptions = NormalizeOptions & {
  value?: NumberInputValue;
  defaultValue?: string | number | null;
  onValueChange?: (value: number | null, meta: InputNumberValueChangeMeta) => void;
  onValueCommit?: (value: number | null, meta: InputNumberValueChangeMeta) => void;
};

export type UseNumberInputGetInputProps = Omit<
  InputProps,
  | "defaultValue"
  | "inputMode"
  | "max"
  | "min"
  | "onBlur"
  | "onChange"
  | "onKeyDown"
  | "step"
  | "type"
  | "value"
> & {
  disabled?: boolean;
  readOnly?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export type UseNumberInputResult = {
  value: string;
  numberValue: number | null;
  setValue: (value: NumberInputValue) => void;
  commitValue: (value?: NumberInputValue) => {
    value: number | null;
    valueAsString: string;
  };
  getInputProps: (props?: UseNumberInputGetInputProps) => InputProps;
};

export type UseInputNumberStateOptions = NormalizeOptions & {
  defaultValue?: string | number | null;
  onValueChange?: (value: number | null, meta: InputNumberValueChangeMeta) => void;
};

export type UseInputNumberStateResult = {
  value: string;
  numberValue: number | null;
  setValue: (value: string | number | null) => void;
  inputProps: Pick<
    InputNumberProps,
    | "clampOnBlur"
    | "max"
    | "min"
    | "onChange"
    | "onValueChange"
    | "precision"
    | "step"
    | "value"
  >;
};

type NormalizeOptions = Pick<
  InputNumberProps,
  "clampOnBlur" | "max" | "min" | "precision" | "step"
>;

function parseNumber(value: string) {
  if (value.trim() === "") {
    return null;
  }

  const nextValue = Number(value);

  return Number.isFinite(nextValue) ? nextValue : null;
}

function getDecimalPlaces(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const [, decimal = ""] = String(value).split(".");

  return decimal.length;
}

function alignToStep(value: number, min: number | undefined, step: number | undefined) {
  if (!Number.isFinite(step) || !step || step <= 0) {
    return value;
  }

  const base = Number.isFinite(min) ? min ?? 0 : 0;
  const decimalPlaces = Math.max(getDecimalPlaces(base), getDecimalPlaces(step));
  const aligned = base + Math.round((value - base) / step) * step;

  return Number(aligned.toFixed(Math.min(decimalPlaces + 2, 12)));
}

function formatNumber(value: number, precision: number | undefined) {
  if (Number.isFinite(precision)) {
    return value.toFixed(Math.max(0, Math.floor(precision ?? 0)));
  }

  return String(value);
}

function normalizeNumber(value: string, options: NormalizeOptions) {
  const parsedValue = parseNumber(value);

  if (parsedValue === null) {
    return { value: null, valueAsString: "" };
  }

  if (!options.clampOnBlur) {
    return { value: parsedValue, valueAsString: value };
  }

  let nextValue = parsedValue;

  if (Number.isFinite(options.min)) {
    nextValue = Math.max(options.min ?? nextValue, nextValue);
  }

  if (Number.isFinite(options.max)) {
    nextValue = Math.min(options.max ?? nextValue, nextValue);
  }

  nextValue = alignToStep(nextValue, options.min, options.step);

  if (Number.isFinite(options.min)) {
    nextValue = Math.max(options.min ?? nextValue, nextValue);
  }

  if (Number.isFinite(options.max)) {
    nextValue = Math.min(options.max ?? nextValue, nextValue);
  }

  const valueAsString = formatNumber(nextValue, options.precision);

  return { value: nextValue, valueAsString };
}

function toInputNumberString(value: string | number | null | undefined) {
  return value === null || value === undefined ? "" : String(value);
}

function isInputNumberWritable(options: { disabled?: boolean; readOnly?: boolean }) {
  return !options.disabled && !options.readOnly;
}

/**
 * 提供数字输入的 headless 行为层，统一管理字符串展示值、解析值和提交归一化。
 */
export function useNumberInput(options: UseNumberInputOptions = {}): UseNumberInputResult {
  const {
    clampOnBlur = false,
    defaultValue = "",
    max,
    min,
    onValueChange,
    onValueCommit,
    precision,
    step,
    value: controlledValue,
  } = options;
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    toInputNumberString(defaultValue),
  );
  const value = isControlled ? toInputNumberString(controlledValue) : uncontrolledValue;
  const numberValue = React.useMemo(() => parseNumber(value), [value]);

  const updateValue = React.useCallback(
    (nextValueAsString: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextValueAsString);
      }
    },
    [isControlled],
  );

  const setValue = React.useCallback(
    (nextValue: NumberInputValue) => {
      const nextValueAsString = toInputNumberString(nextValue);

      updateValue(nextValueAsString);
      onValueChange?.(parseNumber(nextValueAsString), {
        reason: "set",
        valueAsString: nextValueAsString,
      });
    },
    [onValueChange, updateValue],
  );

  const commitValue = React.useCallback(
    (nextValue: NumberInputValue = value) => {
      const currentValueAsString = toInputNumberString(nextValue);
      const normalized = normalizeNumber(currentValueAsString, {
        clampOnBlur,
        max,
        min,
        precision,
        step,
      });
      const valueAsString = clampOnBlur ? normalized.valueAsString : currentValueAsString;
      const parsedValue = clampOnBlur ? normalized.value : parseNumber(currentValueAsString);

      updateValue(valueAsString);

      return {
        value: parsedValue,
        valueAsString,
      };
    },
    [clampOnBlur, max, min, precision, step, updateValue, value],
  );

  const getInputProps = React.useCallback(
    (inputProps: UseNumberInputGetInputProps = {}) => {
      const {
        disabled,
        onBlur,
        onChange,
        onKeyDown,
        readOnly,
        ...restInputProps
      } = inputProps;

      return {
        ...restInputProps,
        disabled,
        inputMode: "decimal" as const,
        max,
        min,
        readOnly,
        step,
        type: "number" as const,
        value,
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          if (isInputNumberWritable({ disabled, readOnly })) {
            const committed = commitValue(event.currentTarget.value);

            if (clampOnBlur) {
              event.currentTarget.value = committed.valueAsString;

              onValueChange?.(committed.value, {
                event,
                reason: "commit",
                valueAsString: committed.valueAsString,
              });
            }

            onValueCommit?.(committed.value, {
              event,
              reason: "commit",
              valueAsString: committed.valueAsString,
            });
          }

          onBlur?.(event);
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(event);

          updateValue(event.currentTarget.value);

          onValueChange?.(parseNumber(event.currentTarget.value), {
            event,
            reason: "input",
            valueAsString: event.currentTarget.value,
          });
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
          onKeyDown?.(event);

          if (
            event.key === "Enter" &&
            !event.defaultPrevented &&
            isInputNumberWritable({ disabled, readOnly })
          ) {
            const committed = commitValue(event.currentTarget.value);

            if (clampOnBlur) {
              event.currentTarget.value = committed.valueAsString;

              onValueChange?.(committed.value, {
                event,
                reason: "commit",
                valueAsString: committed.valueAsString,
              });
            }

            onValueCommit?.(committed.value, {
              event,
              reason: "commit",
              valueAsString: committed.valueAsString,
            });
          }
        },
      };
    },
    [
      clampOnBlur,
      commitValue,
      max,
      min,
      onValueChange,
      onValueCommit,
      precision,
      step,
      updateValue,
      value,
    ],
  );

  return {
    commitValue,
    getInputProps,
    numberValue,
    setValue,
    value,
  };
}

/**
 * @deprecated 优先使用 `useNumberInput`，通过 `getInputProps()` 组合输入控件。
 */
export function useInputNumberState(
  options: UseInputNumberStateOptions = {},
): UseInputNumberStateResult {
  const { defaultValue = "", onValueChange, ...numberProps } = options;
  const [value, setValueState] = React.useState(() => toInputNumberString(defaultValue));
  const [numberValue, setNumberValue] = React.useState<number | null>(() =>
    parseNumber(toInputNumberString(defaultValue)),
  );

  const setValue = React.useCallback((nextValue: string | number | null) => {
    const nextValueAsString = toInputNumberString(nextValue);

    setValueState(nextValueAsString);
    setNumberValue(parseNumber(nextValueAsString));
  }, []);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(event.currentTarget.value);
  }, []);

  const handleValueChange = React.useCallback(
    (nextValue: number | null, meta: InputNumberValueChangeMeta) => {
      setNumberValue(nextValue);

      if (meta.reason === "commit") {
        setValueState(meta.valueAsString);
      }

      onValueChange?.(nextValue, meta);
    },
    [onValueChange],
  );

  return {
    inputProps: {
      ...numberProps,
      onChange: handleChange,
      onValueChange: handleValueChange,
      value,
    },
    numberValue,
    setValue,
    value,
  };
}

/**
 * InputNumber 是数字输入框组件。默认保留原生 number 输入行为；
 * 需要强业务约束时可开启 `clampOnBlur`，在失焦时归一化到合法数值。
 */
export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (props, ref) => {
    const {
      clampOnBlur = false,
      defaultValue,
      disabled,
      max,
      min,
      onBlur,
      onChange,
      onKeyDown,
      onValueChange,
      onValueCommit,
      precision,
      readOnly,
      step,
      value,
      ...restProps
    } = props;
    const numberInput = useNumberInput({
      clampOnBlur,
      defaultValue: defaultValue as NumberInputValue,
      max,
      min,
      onValueChange,
      onValueCommit,
      precision,
      step,
      value: value as NumberInputValue | undefined,
    });

    return (
      <Input
        {...restProps}
        {...numberInput.getInputProps({
          disabled,
          onBlur,
          onChange,
          onKeyDown,
          readOnly,
        })}
        ref={ref}
      />
    );
  },
);

InputNumber.displayName = "InputNumber";
