import * as React from "react";

export type InputValueChangeReason = "input" | "commit" | "set";

export type InputValueChangeMeta = {
  reason: InputValueChangeReason;
  valueAsString: string;
  event?: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>;
};

export type UseInputValueOptions = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, meta: InputValueChangeMeta) => void;
  formatOnBlur?: (value: string) => string;
};

export type UseInputValueResult = {
  value: string;
  setValue: (value: string) => void;
  inputProps: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
};

/**
 * 管理文本输入的字符串状态，并可在失焦时统一格式化。
 * 适合需要 trim、大小写转换、简单掩码前置处理等场景。
 */
export function useInputValue(options: UseInputValueOptions = {}): UseInputValueResult {
  const {
    defaultValue = "",
    formatOnBlur,
    onValueChange,
    value: controlledValue,
  } = options;
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = isControlled ? controlledValue : uncontrolledValue;

  const commitValue = React.useCallback(
    (nextValue: string, meta: InputValueChangeMeta) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue, {
        ...meta,
        valueAsString: nextValue,
      });
    },
    [isControlled, onValueChange],
  );

  const setValue = React.useCallback(
    (nextValue: string) => {
      commitValue(nextValue, {
        reason: "set",
        valueAsString: nextValue,
      });
    },
    [commitValue],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      commitValue(event.currentTarget.value, {
        event,
        reason: "input",
        valueAsString: event.currentTarget.value,
      });
    },
    [commitValue],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!formatOnBlur) {
        return;
      }

      const nextValue = formatOnBlur(event.currentTarget.value);

      event.currentTarget.value = nextValue;
      commitValue(nextValue, {
        event,
        reason: "commit",
        valueAsString: nextValue,
      });
    },
    [commitValue, formatOnBlur],
  );

  return {
    inputProps: {
      onBlur: handleBlur,
      onChange: handleChange,
      value,
    },
    setValue,
    value,
  };
}
