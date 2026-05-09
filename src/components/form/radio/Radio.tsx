import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type RadioProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> & {
  class?: string;
  sx?: SxProps;
};

/**
 * Radio 是基于 Radix RadioGroup Item 的单选按钮，需放在 RadioGroup 中使用。
 */
const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-solid border-slate-300 bg-white text-blue-600 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-blue-600",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      {children ?? (
        <RadioGroupPrimitive.Indicator className="inline-flex h-4 w-4 items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-current" />
        </RadioGroupPrimitive.Indicator>
      )}
    </RadioGroupPrimitive.Item>
  );
});

Radio.displayName = "Radio";

export { Radio };
