import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  resolveRounded,
  roundedPresetClasses,
  type Rounded,
} from "@/components/shared/rounded";
import {
  resolveShadow,
  shadowPresetClasses,
  type Shadow,
} from "@/components/shared/shadow";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type RadixPopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;
type RadixPopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;
type RadixPopoverCloseProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
>;

type PopoverWrapperProps<TProps> = Omit<TProps, "className" | "style"> & {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  asChildWrapper?: React.ElementType;
};

export type PopoverTriggerProps =
  PopoverWrapperProps<RadixPopoverTriggerProps>;
export type PopoverCloseProps = PopoverWrapperProps<RadixPopoverCloseProps>;

function resolveWidth(width: number | string | undefined): React.CSSProperties | undefined {
  if (width === undefined) return undefined;

  return {
    width: typeof width === "number" ? `${width}px` : width,
  };
}

function useResolvedSx(sx: SxProps | undefined) {
  const theme = useSxTheme();
  return resolveSx(sx, theme);
}

/**
 * Popover 根组件，管理弹层的打开状态。
 *
 * 该组件保留 Radix Popover Root 的完整能力，支持非受控与受控两种用法。
 */
const Popover = PopoverPrimitive.Root;

/**
 * Popover 触发器。
 *
 * 使用 `asChild` 时会由本组件生成一层触发容器，业务子组件无需转发 ref。
 */
const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  (props, ref) => {
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
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const mergedClassName = cn(sxClassName, className, legacyClass);
    const mergedStyle = mergeSxStyle(style, sxInlineStyle);

    if (asChild) {
      return (
        <PopoverPrimitive.Trigger asChild {...restProps}>
          <AsChildWrapper
            ref={ref}
            className={cn("inline-flex w-fit", mergedClassName)}
            style={mergedStyle}
          >
            {children}
          </AsChildWrapper>
        </PopoverPrimitive.Trigger>
      );
    }

    return (
      <PopoverPrimitive.Trigger
        ref={ref as React.Ref<HTMLButtonElement>}
        className={mergedClassName}
        style={mergedStyle}
        {...restProps}
      >
        {children}
      </PopoverPrimitive.Trigger>
    );
  },
);

PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

/**
 * Popover 锚点。
 *
 * 当弹层定位目标与触发器不是同一个元素时，可以使用 Anchor 明确定位参考元素。
 */
const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * Popover 关闭按钮。
 *
 * 使用 `asChild` 时会由本组件生成一层关闭容器，业务子组件无需转发 ref。
 */
const PopoverClose = React.forwardRef<HTMLElement, PopoverCloseProps>(
  (props, ref) => {
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
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const mergedClassName = cn(sxClassName, className, legacyClass);
    const mergedStyle = mergeSxStyle(style, sxInlineStyle);

    if (asChild) {
      return (
        <PopoverPrimitive.Close asChild {...restProps}>
          <AsChildWrapper
            ref={ref}
            className={cn("inline-flex w-fit", mergedClassName)}
            style={mergedStyle}
          >
            {children}
          </AsChildWrapper>
        </PopoverPrimitive.Close>
      );
    }

    return (
      <PopoverPrimitive.Close
        ref={ref as React.Ref<HTMLButtonElement>}
        className={mergedClassName}
        style={mergedStyle}
        {...restProps}
      >
        {children}
      </PopoverPrimitive.Close>
    );
  },
);

PopoverClose.displayName = PopoverPrimitive.Close.displayName;

/**
 * PopoverContent 的属性。
 */
export type PopoverContentProps = Omit<
  RadixPopoverContentProps,
  "className" | "style"
> & {
  /**
   * 弹层宽度。传入数字时自动转换为 px。
   *
   * @default 288
   */
  width?: number | string;
  /**
   * 弹层圆角，支持本库圆角预设或任意 CSS border-radius 值。
   *
   * @default "lg"
   */
  rounded?: Rounded;
  /**
   * 弹层阴影，支持本库阴影预设或任意 CSS box-shadow 值。
   *
   * @default "md"
   */
  shadow?: Shadow;
  /**
   * 本库 sx 样式入口，支持对象、数组、函数与嵌套选择器。
   */
  sx?: SxProps;
  /**
   * 兼容历史 class 写法。
   */
  class?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Popover 内容面板。
 *
 * 默认通过 Portal 渲染到 body，并保留 Radix Content 的定位、碰撞检测与焦点管理能力。
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>((props, ref) => {
  const {
    align = "center",
    sideOffset = 6,
    width = 288,
    rounded = "lg",
    shadow = "md",
    sx,
    style,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const { shadowPreset, shadowStyle } = resolveShadow(shadow);
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 border border-gray-200 bg-white p-4 text-sm text-gray-900 outline-none",
          "origin-[--radix-popover-content-transform-origin]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          roundedPreset && roundedPresetClasses[roundedPreset],
          shadowPreset && shadowPresetClasses[shadowPreset],
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(
          style,
          resolveWidth(width),
          roundedStyle,
          shadowStyle,
          sxInlineStyle,
        )}
        {...restProps}
      />
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = "PopoverContent";

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
};
