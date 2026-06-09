import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledPrimitiveProps<TProps> = Omit<TProps, "className" | "style"> & {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export type SelectOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  textValue?: string;
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export type SelectOptionGroup = {
  label?: React.ReactNode;
  options: SelectOption[];
  separator?: boolean;
};

export type SelectItemsProps = {
  options: Array<SelectOption | SelectOptionGroup>;
  itemProps?: Omit<SelectItemProps, "children" | "value" | "disabled" | "textValue">;
  labelProps?: Omit<SelectLabelProps, "children">;
  separatorProps?: SelectSeparatorProps;
};

type SelectRootPrimitiveProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

export type SelectProps = SelectRootPrimitiveProps & {
  /**
   * 是否在弹层打开时锁定页面滚动。
   *
   * 默认允许页面继续滚动；如需恢复 Radix Select 的模态行为，可设置为 `true`。
   */
  lockScroll?: boolean;
};

export type SelectTriggerProps = StyledPrimitiveProps<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>;

export type SelectScrollButtonProps = StyledPrimitiveProps<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>;

export type SelectContentProps = StyledPrimitiveProps<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>;

export type SelectLabelProps = StyledPrimitiveProps<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>;

export type SelectItemProps = StyledPrimitiveProps<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>;

export type SelectSeparatorProps = StyledPrimitiveProps<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>;

const SELECT_SCROLL_LOCK_ATTRIBUTE = "data-scroll-locked";
const SelectContext = React.createContext({
  lockScroll: false,
});

function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
) {
  const useLayoutEffect =
    typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

  useLayoutEffect(effect, deps);
}

function hasOpenSelectContent() {
  return (
    document.querySelector(
      '[role="listbox"][data-state="open"][data-ldkj-select-lock-scroll="false"]',
    ) !== null
  );
}

function useAllowPageScroll(enabled: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!enabled || typeof document === "undefined") {
      return;
    }

    const body = document.body;
    const removeSelectScrollLock = () => {
      if (hasOpenSelectContent()) {
        body.removeAttribute(SELECT_SCROLL_LOCK_ATTRIBUTE);
      }
    };
    const stopRemoveScrollDocumentHandler = (event: Event) => {
      if (hasOpenSelectContent()) {
        event.stopImmediatePropagation();
      }
    };
    const observer =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(removeSelectScrollLock);
    const listenerOptions: AddEventListenerOptions = { passive: false };
    const timeoutId = window.setTimeout(removeSelectScrollLock, 0);

    observer?.observe(body, {
      attributes: true,
      attributeFilter: [SELECT_SCROLL_LOCK_ATTRIBUTE],
    });
    document.addEventListener("wheel", stopRemoveScrollDocumentHandler, listenerOptions);
    document.addEventListener(
      "touchmove",
      stopRemoveScrollDocumentHandler,
      listenerOptions,
    );
    removeSelectScrollLock();

    return () => {
      window.clearTimeout(timeoutId);
      observer?.disconnect();
      document.removeEventListener("wheel", stopRemoveScrollDocumentHandler);
      document.removeEventListener("touchmove", stopRemoveScrollDocumentHandler);
    };
  }, [enabled]);
}

/**
 * Select 根组件，默认不锁定页面滚动。
 */
function Select(props: SelectProps) {
  const { lockScroll = false, ...restProps } = props;

  useAllowPageScroll(!lockScroll);

  return (
    <SelectContext.Provider value={{ lockScroll }}>
      <SelectPrimitive.Root {...restProps} />
    </SelectContext.Provider>
  );
}

Select.displayName = "Select";
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 10L8 6L12 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useResolvedSx(sx: SxProps) {
  const theme = useSxTheme();
  return resolveSx(sx, theme);
}

/**
 * SelectTrigger 是 Select 的触发按钮，支持原生 Radix Trigger 属性与本库 `sx` 样式系统。
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    children,
    sx,
    style,
    ...restProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-solid border-[color:var(--ldkj-color-input)] bg-[color:var(--ldkj-color-surface)] px-3 py-2 text-sm text-[color:var(--ldkj-color-foreground)] shadow-sm transition-colors",
        "placeholder:text-[color:var(--ldkj-color-muted-foreground)] data-[placeholder]:text-[color:var(--ldkj-color-muted-foreground)]",
        "focus-visible:border-[color:var(--ldkj-color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
        "disabled:cursor-not-allowed disabled:bg-[color:var(--ldkj-color-surface-muted)] disabled:text-[color:var(--ldkj-color-muted-foreground)] disabled:opacity-70",
        "[&>span]:min-w-0 [&>span]:truncate",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-[color:var(--ldkj-color-muted-foreground)]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "SelectTrigger";

/**
 * SelectScrollUpButton 用于长列表弹层的向上滚动控制。
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollButtonProps
>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-[color:var(--ldkj-color-muted-foreground)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
});
SelectScrollUpButton.displayName = "SelectScrollUpButton";

/**
 * SelectScrollDownButton 用于长列表弹层的向下滚动控制。
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollButtonProps
>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-[color:var(--ldkj-color-muted-foreground)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
});
SelectScrollDownButton.displayName = "SelectScrollDownButton";

/**
 * SelectContent 渲染下拉弹层，默认使用 Radix Portal 与 popper 定位。
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    children,
    position = "popper",
    sx,
    style,
    ...restProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
  const { lockScroll } = React.useContext(SelectContext);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-[var(--ldkj-z-dropdown)] max-h-[var(--radix-select-content-available-height)] min-w-32 overflow-hidden rounded-md border border-solid border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-surface)] text-[color:var(--ldkj-color-surface-foreground)] shadow-[var(--ldkj-shadow-popover)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "origin-[var(--radix-select-content-transform-origin)]",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        position={position}
        data-ldkj-select-lock-scroll={lockScroll ? "true" : "false"}
        {...restProps}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = "SelectContent";

/**
 * SelectLabel 用于在分组选项中显示不可选择的分组标题。
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-[color:var(--ldkj-color-muted-foreground)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );
});
SelectLabel.displayName = "SelectLabel";

/**
 * SelectItem 是 Select 的可选项，需放在 SelectContent 内使用。
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>((props, ref) => {
  const {
    className,
    class: legacyClass,
    children,
    sx,
    style,
    ...restProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm leading-5 text-[color:var(--ldkj-color-foreground)] outline-none transition-colors",
        "focus:bg-[color:var(--ldkj-color-accent)] focus:text-[color:var(--ldkj-color-primary)]",
        "data-[disabled]:pointer-events-none data-[disabled]:text-[color:var(--ldkj-color-muted-foreground)] data-[disabled]:opacity-70",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-[color:var(--ldkj-color-primary)]">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

/**
 * SelectSeparator 用于在 SelectContent 内分隔选项区域。
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>((props, ref) => {
  const { className, class: legacyClass, sx, style, ...restProps } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn(
        "-mx-1 my-1 h-px bg-[color:var(--ldkj-color-border)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );
});
SelectSeparator.displayName = "SelectSeparator";

function isOptionGroup(
  option: SelectOption | SelectOptionGroup,
): option is SelectOptionGroup {
  return "options" in option;
}

/**
 * SelectItems 按配置快速渲染 SelectItem，同时保留 Select 的原始组合式能力。
 */
function SelectItems(props: SelectItemsProps) {
  const { options, itemProps, labelProps, separatorProps } = props;

  return (
    <>
      {options.map((option, index) => {
        if (!isOptionGroup(option)) {
          return (
            <SelectItem
              key={option.value}
              {...itemProps}
              value={option.value}
              disabled={option.disabled}
              textValue={option.textValue}
              className={cn(itemProps?.className, option.className)}
              class={cn(itemProps?.class, option.class)}
              style={mergeSxStyle(itemProps?.style, option.style)}
              sx={[itemProps?.sx, option.sx]}
            >
              {option.label}
            </SelectItem>
          );
        }

        return (
          <SelectGroup key={`group-${index}`}>
            {option.label ? (
              <SelectLabel {...labelProps}>{option.label}</SelectLabel>
            ) : null}
            {option.options.map((item) => (
              <SelectItem
                key={item.value}
                {...itemProps}
                value={item.value}
                disabled={item.disabled}
                textValue={item.textValue}
                className={cn(itemProps?.className, item.className)}
                class={cn(itemProps?.class, item.class)}
                style={mergeSxStyle(itemProps?.style, item.style)}
                sx={[itemProps?.sx, item.sx]}
              >
                {item.label}
              </SelectItem>
            ))}
            {option.separator ? <SelectSeparator {...separatorProps} /> : null}
          </SelectGroup>
        );
      })}
    </>
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectItems,
};
