import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type SwitchSize = "sm" | "md" | "lg";
export type SwitchLabelPosition = "left" | "right";

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  "className" | "style"
> & {
  className?: string;
  class?: string;
  containerClass?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  containerSx?: SxProps;
  description?: React.ReactNode;
  label?: React.ReactNode;
  labelPosition?: SwitchLabelPosition;
  size?: SwitchSize;
  sx?: SxProps;
  style?: React.CSSProperties;
};

const switchSizeClassNames: Record<SwitchSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-[52px]",
};

const thumbSizeClassNames: Record<SwitchSize, string> = {
  sm: "h-4 w-4 data-[state=checked]:translate-x-4",
  md: "h-5 w-5 data-[state=checked]:translate-x-5",
  lg: "h-6 w-6 data-[state=checked]:translate-x-6",
};

/**
 * 基于 Radix Switch 的开关组件，支持受控/非受控状态、标签说明与本库 `sx` 样式系统。
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    containerClass,
    containerClassName,
    containerStyle,
    containerSx,
    description,
    disabled,
    id,
    label,
    labelPosition = "right",
    size = "md",
    style,
    sx,
    "aria-describedby": ariaDescribedBy,
    ...rootProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const {
    sxClassName: containerSxClassName,
    sxInlineStyle: containerSxInlineStyle,
  } = resolveSx(containerSx, theme);
  const reactId = React.useId();
  const switchId = id ?? `ldkj-switch-${reactId}`;
  const descriptionId =
    description === undefined ? undefined : `${switchId}-description`;
  const mergedAriaDescribedBy =
    [ariaDescribedBy, descriptionId].filter(Boolean).join(" ") || undefined;

  const switchNode = (
    <SwitchPrimitive.Root
      ref={ref}
      id={switchId}
      disabled={disabled}
      aria-describedby={mergedAriaDescribedBy}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[color:var(--ldkj-color-muted)] p-0.5 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-[color:var(--ldkj-color-primary)] data-[state=unchecked]:bg-[color:var(--ldkj-color-muted)]",
        switchSizeClassNames[size],
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...rootProps}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-[color:var(--ldkj-color-switch-thumb)] shadow-sm ring-0 transition-transform",
          "data-[state=unchecked]:translate-x-0",
          thumbSizeClassNames[size],
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (label === undefined && description === undefined) {
    return switchNode;
  }

  const textNode = (
    <span className="flex min-w-0 flex-col gap-0.5">
      {label !== undefined ? (
        <LabelPrimitive.Root
          htmlFor={switchId}
          className={cn(
            "text-sm font-medium leading-5 text-[color:var(--ldkj-color-foreground)]",
            disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          )}
        >
          {label}
        </LabelPrimitive.Root>
      ) : null}
      {description !== undefined ? (
        <span
          id={descriptionId}
          className="text-xs leading-5 text-[color:var(--ldkj-color-muted-foreground)]"
        >
          {description}
        </span>
      ) : null}
    </span>
  );

  return (
    <div
      className={cn(
        "inline-flex w-fit items-center gap-3",
        disabled ? "cursor-not-allowed" : undefined,
        containerSxClassName,
        containerClassName,
        containerClass,
      )}
      style={mergeSxStyle(containerStyle, containerSxInlineStyle)}
    >
      {labelPosition === "left" ? textNode : null}
      {switchNode}
      {labelPosition === "right" ? textNode : null}
    </div>
  );
});

Switch.displayName = "Switch";

export { Switch };
