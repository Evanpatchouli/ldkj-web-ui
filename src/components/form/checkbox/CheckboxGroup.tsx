import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import { Checkbox, type CheckboxProps } from "./Checkbox";

type CheckboxGroupGapPreset = "xs" | "sm" | "md" | "lg";
type CheckboxGroupGap = CheckboxGroupGapPreset | number | string;

const gapPresetClass: Record<CheckboxGroupGapPreset, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
};

export type CheckboxGroupOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  description?: React.ReactNode;
  className?: string;
  checkboxProps?: Omit<
    CheckboxProps,
    "checked" | "defaultChecked" | "disabled" | "name" | "onCheckedChange" | "value"
  >;
};

type CheckboxGroupBaseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  class?: string;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: CheckboxGroupGap;
  name?: string;
  options: CheckboxGroupOption[];
  sx?: SxProps;
};

export type CheckboxGroupMultipleProps = CheckboxGroupBaseProps & {
  type?: "multiple";
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type CheckboxGroupSingleProps = CheckboxGroupBaseProps & {
  type: "single";
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
};

export type CheckboxGroupProps =
  | CheckboxGroupMultipleProps
  | CheckboxGroupSingleProps;

function normalizeGap(gap: CheckboxGroupGap | undefined) {
  if (gap === undefined) return { className: gapPresetClass.md };
  if (gap === "xs" || gap === "sm" || gap === "md" || gap === "lg") {
    return { className: gapPresetClass[gap] };
  }
  return {
    style: {
      gap: typeof gap === "number" ? `${gap}px` : gap,
    },
  };
}

function toArrayValue(props: CheckboxGroupProps, innerValue: string[]) {
  if (props.type === "single") {
    const value = props.value ?? innerValue[0];
    return value === undefined ? [] : [value];
  }
  return props.value ?? innerValue;
}

function getDefaultValue(props: CheckboxGroupProps) {
  if (props.type === "single") {
    return props.defaultValue === undefined ? [] : [props.defaultValue];
  }
  return props.defaultValue ?? [];
}

/**
 * CheckboxGroup 管理一组选项的选择状态，支持多选、单选和原生表单提交。
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    className,
    class: legacyClass,
    direction = "vertical",
    disabled = false,
    gap = "md",
    name,
    options,
    sx,
    style,
    type: _type,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    ...rootProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const resolvedGap = normalizeGap(gap);
  const [innerValue, setInnerValue] = React.useState<string[]>(() =>
    getDefaultValue(props),
  );
  const currentValue = toArrayValue(props, innerValue);
  const selectedSet = new Set(currentValue);

  function emitChange(nextValue: string[]) {
    if (props.value === undefined) {
      setInnerValue(nextValue);
    }
    if (props.type === "single") {
      props.onChange?.(nextValue[0]);
      return;
    }
    props.onChange?.(nextValue);
  }

  function toggleValue(optionValue: string, checked: boolean) {
    if (props.type === "single") {
      emitChange(checked ? [optionValue] : []);
      return;
    }

    const nextSet = new Set(currentValue);
    if (checked) {
      nextSet.add(optionValue);
    } else {
      nextSet.delete(optionValue);
    }
    emitChange(Array.from(nextSet));
  }

  return (
    <div
      role="group"
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row flex-wrap" : "flex-col",
        resolvedGap.className,
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, resolvedGap.style, sxInlineStyle)}
      {...rootProps}
    >
      {options.map((option) => {
        const optionDisabled = disabled || option.disabled;
        const checked = selectedSet.has(option.value);

        return (
          <label
            key={option.value}
            className={cn(
              "inline-flex items-start gap-2 text-sm leading-5 text-slate-700",
              optionDisabled && "cursor-not-allowed text-slate-400",
              !optionDisabled && "cursor-pointer",
              option.className,
            )}
          >
            <Checkbox
              {...option.checkboxProps}
              name={name}
              value={option.value}
              checked={checked}
              disabled={optionDisabled}
              onCheckedChange={(nextChecked) =>
                toggleValue(option.value, nextChecked === true)
              }
            />
            <span className="grid gap-0.5">
              <span>{option.label}</span>
              {option.description ? (
                <span className="text-xs text-slate-500">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

CheckboxGroup.displayName = "CheckboxGroup";
