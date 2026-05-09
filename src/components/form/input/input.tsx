import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  class?: string;
  sx?: SxProps;
};

/**
 * Input 是基础文本输入框组件，支持原生 input 属性、`class` 别名与本库 `sx` 样式系统。
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    type = "text",
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-solid border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700",
        "placeholder:text-slate-400",
        "focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:opacity-70",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );
});

Input.displayName = "Input";

export { Input };
