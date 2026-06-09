import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type LabelAlign = "left" | "center" | "right";
type LabelPosition = "left" | "top";

export type LabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  "className" | "style"
> & {
  className?: string;
  class?: string;
  colon?: boolean | React.ReactNode;
  containerClass?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  containerSx?: SxProps;
  label?: React.ReactNode;
  labelAlign?: LabelAlign;
  labelWidth?: number | string;
  position?: LabelPosition;
  required?: boolean;
  sx?: SxProps;
  style?: React.CSSProperties;
};

function toCssSize(value: number | string | undefined) {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function getJustifyContent(align: LabelAlign | undefined) {
  if (align === "center") return "center";
  if (align === "right") return "flex-end";
  return "flex-start";
}

/**
 * Label 用于表单字段标注，支持原生 label 语义、必填标记、冒号、宽度对齐和本库 `sx` 样式系统。
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>((props, ref) => {
  const {
    children,
    className,
    class: legacyClass,
    colon,
    containerClass,
    containerClassName,
    containerStyle,
    containerSx,
    label,
    labelAlign = "left",
    labelWidth,
    position = "left",
    required = false,
    sx,
    style,
    ...rootProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const {
    sxClassName: containerSxClassName,
    sxInlineStyle: containerSxInlineStyle,
  } = resolveSx(containerSx, theme);
  const labelStyle = mergeSxStyle(
    {
      width: toCssSize(labelWidth),
      justifyContent: getJustifyContent(labelAlign),
    },
    style,
    sxInlineStyle,
  );
  const labelClassName = cn(
    "inline-flex gap-1 text-sm font-medium leading-5 text-[color:var(--ldkj-color-foreground)]",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    sxClassName,
    className,
    legacyClass,
  );

  if (label === undefined) {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={labelClassName}
        style={labelStyle}
        {...rootProps}
      >
        {children}
      </LabelPrimitive.Root>
    );
  }

  return (
    <div
      className={cn(
        "flex w-fit",
        position === "top"
          ? "flex-col items-start gap-1.5"
          : "flex-row items-center gap-2",
        containerSxClassName,
        containerClassName,
        containerClass,
      )}
      style={mergeSxStyle(containerStyle, containerSxInlineStyle)}
    >
      <LabelPrimitive.Root
        ref={ref}
        className={labelClassName}
        style={labelStyle}
        {...rootProps}
      >
        {required ? <span className="font-serif text-[color:var(--ldkj-color-danger)]">*</span> : null}
        <span>{label}</span>
        {colon === true ? ":" : (colon ?? null)}
      </LabelPrimitive.Root>
      {children}
    </div>
  );
});

Label.displayName = "Label";

export { Label };
