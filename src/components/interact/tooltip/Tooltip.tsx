import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type TooltipTone = "dark" | "light" | "primary";

type WithStyleProps = {
  className?: string;
  class?: string;
  sx?: SxProps;
};

export type TooltipTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>,
  "className" | "style"
> &
  WithStyleProps & {
    style?: React.CSSProperties;
    /**
     * 当 `asChild` 为 true 时，指定用于包裹 children 的元素或组件。
     *
     * @default "span"
     */
    asChildWrapper?: React.ElementType;
  };

export type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> &
  WithStyleProps & {
    /**
     * 控制 Tooltip 内容的视觉语气。
     *
     * @default "dark"
     */
    tone?: TooltipTone;
    /**
     * 是否显示指向触发元素的箭头。
     *
     * @default false
     */
    arrow?: boolean;
  };

export type TooltipArrowProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Arrow
> &
  WithStyleProps & {
    /**
     * 箭头颜色语气；通常与 TooltipContent 的 tone 保持一致。
     *
     * @default "dark"
     */
    tone?: TooltipTone;
  };

const toneClassNames: Record<TooltipTone, string> = {
  dark: "border-gray-900 bg-gray-950 text-white",
  light: "border-gray-200 bg-white text-gray-900",
  primary: "border-blue-600 bg-blue-600 text-white",
};

const arrowClassNames: Record<TooltipTone, string> = {
  dark: "fill-gray-950",
  light: "fill-white",
  primary: "fill-blue-600",
};

/**
 * TooltipProvider 用于配置当前 React 子树内 Tooltip 的延迟和跳过延迟行为。
 */
const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
};

/**
 * Tooltip 是 Radix Tooltip Root 的组件库导出，用于包裹单个提示实例。
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * TooltipPortal 用于将 TooltipContent 渲染到独立 Portal 容器。
 */
const TooltipPortal = TooltipPrimitive.Portal;

/**
 * TooltipTrigger 用于声明 Tooltip 的触发元素，支持 `asChild` 组合业务组件。
 */
const TooltipTrigger = React.forwardRef<
  HTMLElement,
  TooltipTriggerProps
>((props, ref) => {
  const {
    asChild,
    asChildWrapper: AsChildWrapper = "span",
    children,
    className,
    class: legacyClass,
    sx,
    style,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const mergedClassName = cn(sxClassName, className, legacyClass);
  const mergedStyle = mergeSxStyle(style, sxInlineStyle);

  if (asChild) {
    return (
      <TooltipPrimitive.Trigger asChild {...restProps}>
        <AsChildWrapper
          ref={ref}
          className={cn("inline-flex w-fit", mergedClassName)}
          style={mergedStyle}
        >
          {children}
        </AsChildWrapper>
      </TooltipPrimitive.Trigger>
    );
  }

  return (
    <TooltipPrimitive.Trigger
      ref={ref as React.Ref<HTMLButtonElement>}
      className={mergedClassName}
      style={mergedStyle}
      {...restProps}
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
});
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

/**
 * TooltipArrow 渲染 Tooltip 的箭头，可单独用于自定义 Content 结构。
 */
const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  TooltipArrowProps
>((props, ref) => {
  const {
    tone = "dark",
    className,
    class: legacyClass,
    sx,
    style,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <TooltipPrimitive.Arrow
      ref={ref}
      className={cn(arrowClassNames[tone], sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );
});
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

/**
 * TooltipContent 渲染提示内容，内置基础动画、tone 语气和可选 arrow。
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>((props, ref) => {
  const {
    tone = "dark",
    arrow = false,
    sideOffset = 6,
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
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs rounded-md border px-3 py-1.5 text-sm leading-5 shadow-md outline-none",
        "origin-[--radix-tooltip-content-transform-origin]",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        toneClassNames[tone],
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      {children}
      {arrow ? <TooltipArrow tone={tone} /> : null}
    </TooltipPrimitive.Content>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipArrow,
};
