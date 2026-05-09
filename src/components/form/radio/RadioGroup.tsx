import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import { Radio, type RadioProps } from "./Radio";

type RadioGroupGapPreset = "xs" | "sm" | "md" | "lg";
type RadioGroupGap = RadioGroupGapPreset | number | string;

const gapPresetClass: Record<RadioGroupGapPreset, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
};

export type RadioGroupOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  description?: React.ReactNode;
  className?: string;
  radioProps?: Omit<
    RadioProps,
    "checked" | "defaultChecked" | "disabled" | "name" | "value"
  >;
};

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "children" | "className" | "style"
> & {
  children?: React.ReactNode;
  className?: string;
  class?: string;
  direction?: "horizontal" | "vertical";
  gap?: RadioGroupGap;
  options?: RadioGroupOption[];
  sx?: SxProps;
  style?: React.CSSProperties;
};

function normalizeGap(gap: RadioGroupGap | undefined) {
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

/**
 * RadioGroup 管理一组互斥选项，支持受控/非受控、原生表单提交和本库 `sx` 样式系统。
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    children,
    direction = "vertical",
    disabled = false,
    gap = "md",
    options,
    sx,
    style,
    ...rootProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const resolvedGap = normalizeGap(gap);

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      disabled={disabled}
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
      {options?.map((option) => {
        const optionDisabled = disabled || option.disabled;

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
            <Radio
              {...option.radioProps}
              value={option.value}
              disabled={optionDisabled}
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
      {children}
    </RadioGroupPrimitive.Root>
  );
});

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
