import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import { useCheckboxGroupContext } from "./context";

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  class?: string;
  sx?: SxProps;
};

const CheckboxChecked = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="checkbox-check h-3 w-3"
    fill="none"
  >
    <path
      d="M3.5 8.5L6.5 11.5L12.5 4.5"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxMinus = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="checkbox-minus h-3 w-3"
    fill="none"
  >
    <path
      d="M4 8H12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 基于 Radix Checkbox 的复选框组件，支持本库 `sx` 样式系统。
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    checked,
    disabled,
    name,
    onCheckedChange,
    value,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const groupContext = useCheckboxGroupContext();
  const groupValue = typeof value === "string" ? value : undefined;
  const isGroupItem = Boolean(groupContext && groupValue !== undefined);
  const mergedChecked =
    checked ??
    (isGroupItem ? groupContext?.selectedValues.has(groupValue as string) : undefined);
  const mergedDisabled = disabled || (isGroupItem ? groupContext?.disabled : false);
  const mergedName = name ?? (isGroupItem ? groupContext?.name : undefined);

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={mergedChecked}
      disabled={mergedDisabled}
      name={mergedName}
      onCheckedChange={(nextChecked) => {
        onCheckedChange?.(nextChecked);
        if (isGroupItem && checked === undefined) {
          groupContext?.toggleValue(groupValue as string, nextChecked === true);
        }
      }}
      value={value}
      className={cn(
        "peer inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-solid border-slate-300 bg-white text-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600",
        "data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      {children ?? (
        <CheckboxPrimitive.Indicator
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center text-current",
            "[&[data-state=checked]_.checkbox-minus]:hidden",
            "[&[data-state=indeterminate]_.checkbox-check]:hidden",
          )}
        >
          <CheckboxChecked />
          <CheckboxMinus />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
