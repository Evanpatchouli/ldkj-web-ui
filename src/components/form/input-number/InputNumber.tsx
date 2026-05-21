import * as React from "react";
import { Input, type InputProps } from "@/components/form/input";

export type InputNumberValueChangeReason = "input" | "commit";

export type InputNumberValueChangeMeta = {
  reason: InputNumberValueChangeReason;
  valueAsString: string;
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>;
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

/**
 * 管理 InputNumber 的字符串输入态与解析后的数字值。
 * 它会自动同步 `clampOnBlur` 产生的提交值，避免业务侧手写 commit 分支。
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
      max,
      min,
      onBlur,
      onChange,
      onValueChange,
      precision,
      step,
      ...restProps
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);

      onValueChange?.(parseNumber(event.currentTarget.value), {
        event,
        reason: "input",
        valueAsString: event.currentTarget.value,
      });
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (clampOnBlur && !props.disabled && !props.readOnly) {
        const normalized = normalizeNumber(event.currentTarget.value, {
          clampOnBlur,
          max,
          min,
          precision,
          step,
        });

        event.currentTarget.value = normalized.valueAsString;

        onValueChange?.(normalized.value, {
          event,
          reason: "commit",
          valueAsString: normalized.valueAsString,
        });
      }

      onBlur?.(event);
    };

    return (
      <Input
        {...restProps}
        ref={ref}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    );
  },
);

InputNumber.displayName = "InputNumber";
