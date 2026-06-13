import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { Icon, type IconProps } from "@/components/data-display/icon";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

type NavigatorKey = string;

type NavigatorContextValue = {
  activeKey?: NavigatorKey;
  setActiveKey: (key: NavigatorKey) => void;
};

const NavigatorContext = React.createContext<NavigatorContextValue | null>(null);

export const navigatorTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-[color:var(--ldkj-color-background)] px-4 py-2 text-sm font-medium text-[color:var(--ldkj-color-foreground)] transition-colors hover:bg-[color:var(--ldkj-color-accent)] hover:text-[color:var(--ldkj-color-accent-foreground)] focus:bg-[color:var(--ldkj-color-accent)] focus:text-[color:var(--ldkj-color-accent-foreground)] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-[color:var(--ldkj-color-primary)] data-[active=true]:text-[color:var(--ldkj-color-primary-foreground)] data-[state=open]:bg-[color:var(--ldkj-color-accent)] data-[state=open]:text-[color:var(--ldkj-color-accent-foreground)]",
);

function useStyledProps(props: StyledProps) {
  const { sx, style, className, class: legacyClass } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return {
    className: cn(sxClassName, className, legacyClass),
    style: mergeSxStyle(style, sxInlineStyle),
  };
}

function useControllableValue<T>(options: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}) {
  const { value, defaultValue, onChange } = options;
  const [innerValue, setInnerValue] = React.useState<T | undefined>(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : innerValue;

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!controlled) {
        setInnerValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [controlled, onChange],
  );

  return [currentValue, setValue] as const;
}

function getItemKey(item: NavigatorItemConfig, index: number) {
  return item.key ?? item.href ?? String(index);
}

function getPanelItemKey(
  item: NavigatorPanelItemConfig,
  parentKey: NavigatorKey,
  index: number,
) {
  return item.key ?? item.href ?? `${parentKey}-${index}`;
}

function hasPanel(item: NavigatorItemConfig) {
  return Boolean(item.content || item.children?.length);
}

function renderLabelWithIcon(
  label: React.ReactNode,
  icon?: IconProps["name"],
  description?: React.ReactNode,
) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      {icon ? <Icon name={icon} size={18} className="shrink-0" /> : null}
      <span className="min-w-0">
        <span className="block truncate">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs font-normal text-[color:var(--ldkj-color-muted-foreground)]">
            {description}
          </span>
        ) : null}
      </span>
    </span>
  );
}

function renderPanelItems(
  items: NavigatorPanelItemConfig[],
  parentKey: NavigatorKey,
) {
  return (
    <div className="grid w-[min(640px,calc(100vw-2rem))] gap-2 p-3 md:grid-cols-2">
      {items.map((item, index) => {
        const itemKey = getPanelItemKey(item, parentKey, index);
        const {
          key,
          label,
          description,
          icon,
          href,
          disabled,
          span,
          linkProps,
        } = item;

        void key;

        return (
          <NavigatorLink
            key={itemKey}
            {...linkProps}
            itemKey={itemKey}
            href={href}
            disabled={disabled}
            className={cn(
              "min-h-16 flex-col items-start justify-start whitespace-normal p-3 text-left",
              linkProps?.className,
            )}
            style={mergeSxStyle(
              span
                ? { gridColumn: `span ${span} / span ${span}` }
                : undefined,
              linkProps?.style,
            )}
          >
            {renderLabelWithIcon(label, icon, description)}
          </NavigatorLink>
        );
      })}
    </div>
  );
}

function renderNavigatorItems(items: NavigatorItemConfig[]) {
  return items.map((item, index) => {
    const itemKey = getItemKey(item, index);
    const {
      key,
      label,
      description,
      icon,
      href,
      disabled,
      content,
      children,
      itemProps,
      triggerProps,
      contentProps,
      linkProps,
    } = item;

    void key;

    if (hasPanel(item)) {
      return (
        <NavigatorItem key={itemKey} {...itemProps}>
          <NavigatorTrigger
            itemKey={itemKey}
            disabled={disabled}
            {...triggerProps}
          >
            {renderLabelWithIcon(label, icon)}
          </NavigatorTrigger>
          <NavigatorContent {...contentProps}>
            {content ?? (children ? renderPanelItems(children, itemKey) : null)}
          </NavigatorContent>
        </NavigatorItem>
      );
    }

    return (
      <NavigatorItem key={itemKey} {...itemProps}>
        <NavigatorLink
          itemKey={itemKey}
          href={href}
          disabled={disabled}
          {...linkProps}
        >
          {renderLabelWithIcon(label, icon, description)}
        </NavigatorLink>
      </NavigatorItem>
    );
  });
}

export type NavigatorPanelItemConfig = {
  key?: NavigatorKey;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconProps["name"];
  href?: string;
  disabled?: boolean;
  span?: number;
  linkProps?: Omit<
    NavigatorLinkProps,
    "children" | "itemKey" | "href" | "disabled"
  >;
};

export type NavigatorItemConfig = {
  key?: NavigatorKey;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconProps["name"];
  href?: string;
  disabled?: boolean;
  content?: React.ReactNode;
  children?: NavigatorPanelItemConfig[];
  itemProps?: Omit<NavigatorItemProps, "children">;
  triggerProps?: Omit<NavigatorTriggerProps, "children" | "disabled" | "itemKey">;
  contentProps?: Omit<NavigatorContentProps, "children">;
  linkProps?: Omit<
    NavigatorLinkProps,
    "children" | "itemKey" | "href" | "disabled"
  >;
};

export type NavigatorProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
> &
  StyledProps & {
    items?: NavigatorItemConfig[];
    activeKey?: NavigatorKey;
    defaultActiveKey?: NavigatorKey;
    onActiveKeyChange?: (key: NavigatorKey) => void;
    showViewport?: boolean;
    showIndicator?: boolean;
    listProps?: NavigatorListProps;
    viewportProps?: NavigatorViewportProps;
    indicatorProps?: NavigatorIndicatorProps;
  };

export type NavigatorListProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
> &
  StyledProps;

export type NavigatorItemProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Item
> &
  StyledProps;

export type NavigatorTriggerProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
> &
  StyledProps & {
    itemKey?: NavigatorKey;
    hideIcon?: boolean;
  };

export type NavigatorContentProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Content
> &
  StyledProps;

export type NavigatorLinkProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Link
> &
  StyledProps & {
    itemKey?: NavigatorKey;
    active?: boolean;
    disabled?: boolean;
  };

export type NavigatorViewportProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
> &
  StyledProps & {
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
  };

export type NavigatorIndicatorProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
> &
  StyledProps;

export const NavigatorList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigatorListProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "navigator-list m-0 flex flex-1 list-none items-center justify-center gap-1 p-0",
        styledProps.className,
      )}
      style={mergeSxStyle(
        { listStyle: "none", margin: 0, padding: 0 },
        styledProps.style,
      )}
      {...props}
    />
  );
});
NavigatorList.displayName = NavigationMenuPrimitive.List.displayName;

export const NavigatorItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  NavigatorItemProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      className={cn("navigator-item", styledProps.className)}
      style={styledProps.style}
      {...props}
    />
  );
});
NavigatorItem.displayName = NavigationMenuPrimitive.Item.displayName;

export const NavigatorTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigatorTriggerProps
>(
  (
    {
      className,
      class: legacyClass,
      sx,
      style,
      children,
      itemKey,
      hideIcon = false,
      ...props
    },
    ref,
  ) => {
    const styledProps = useStyledProps({
      className,
      class: legacyClass,
      sx,
      style,
    });
    const context = React.useContext(NavigatorContext);
    const active = Boolean(itemKey && context?.activeKey === itemKey);

    return (
      <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={cn(navigatorTriggerStyle(), "navigator-trigger", styledProps.className)}
        style={styledProps.style}
        data-active={active ? "true" : undefined}
        {...props}
      >
        {children}
        {hideIcon ? null : (
          <Icon
            name="chevron_right"
            size={16}
            className="ml-1 shrink-0 rotate-90 transition-transform duration-200 group-data-[state=open]:-rotate-90"
          />
        )}
      </NavigationMenuPrimitive.Trigger>
    );
  },
);
NavigatorTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export const NavigatorContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigatorContentProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "navigator-content left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
        styledProps.className,
      )}
      style={styledProps.style}
      {...props}
    />
  );
});
NavigatorContent.displayName = NavigationMenuPrimitive.Content.displayName;

export const NavigatorLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigatorLinkProps
>(
  (
    {
      className,
      class: legacyClass,
      sx,
      style,
      itemKey,
      active: activeProp,
      disabled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const styledProps = useStyledProps({
      className,
      class: legacyClass,
      sx,
      style,
    });
    const context = React.useContext(NavigatorContext);
    const active = activeProp ?? Boolean(itemKey && context?.activeKey === itemKey);

    return (
      <NavigationMenuPrimitive.Link
        ref={ref}
        className={cn(
          "navigator-link inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium !text-[color:var(--ldkj-color-foreground)] transition-colors hover:bg-[color:var(--ldkj-color-accent)] hover:!text-[color:var(--ldkj-color-accent-foreground)] focus:bg-[color:var(--ldkj-color-accent)] focus:!text-[color:var(--ldkj-color-accent-foreground)] focus:outline-none data-[active=true]:bg-[color:var(--ldkj-color-primary)] data-[active=true]:!text-[color:var(--ldkj-color-primary-foreground)]",
          disabled && "pointer-events-none opacity-50",
          styledProps.className,
        )}
        style={styledProps.style}
        active={active}
        data-active={active ? "true" : undefined}
        aria-current={active ? "page" : undefined}
        aria-disabled={disabled || undefined}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          if (itemKey) {
            context?.setActiveKey(itemKey);
          }
          onClick?.(event);
        }}
        {...props}
      />
    );
  },
);
NavigatorLink.displayName = NavigationMenuPrimitive.Link.displayName;

export const NavigatorViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigatorViewportProps
>(
  (
    {
      className,
      class: legacyClass,
      sx,
      style,
      wrapperClassName,
      wrapperStyle,
      ...props
    },
    ref,
  ) => {
    const styledProps = useStyledProps({
      className,
      class: legacyClass,
      sx,
      style,
    });

    return (
      <div
        className={cn("navigator-viewport-wrapper absolute left-0 top-full flex justify-center", wrapperClassName)}
        style={wrapperStyle}
      >
        <NavigationMenuPrimitive.Viewport
          ref={ref}
          className={cn(
            "navigator-viewport relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-surface)] text-[color:var(--ldkj-color-surface-foreground)] shadow-[var(--ldkj-shadow-popover)] data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
            styledProps.className,
          )}
          style={styledProps.style}
          {...props}
        />
      </div>
    );
  },
);
NavigatorViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

export const NavigatorIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigatorIndicatorProps
>(({ className, class: legacyClass, sx, style, children, ...props }, ref) => {
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "navigator-indicator top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        styledProps.className,
      )}
      style={styledProps.style}
      {...props}
    >
      {children ?? (
        <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-[color:var(--ldkj-color-border)] shadow-sm" />
      )}
    </NavigationMenuPrimitive.Indicator>
  );
});
NavigatorIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

type NavigatorCompound = {
  List: typeof NavigatorList;
  Item: typeof NavigatorItem;
  Trigger: typeof NavigatorTrigger;
  Content: typeof NavigatorContent;
  Link: typeof NavigatorLink;
  Viewport: typeof NavigatorViewport;
  Indicator: typeof NavigatorIndicator;
};

type NavigatorComponent = React.FC<NavigatorProps> & NavigatorCompound;

function NavigatorRoot(props: NavigatorProps) {
  const {
    items,
    activeKey: activeKeyProp,
    defaultActiveKey,
    onActiveKeyChange,
    showViewport = true,
    showIndicator = true,
    listProps,
    viewportProps,
    indicatorProps,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const [activeKey, setActiveKey] = useControllableValue<NavigatorKey>({
    value: activeKeyProp,
    defaultValue: defaultActiveKey,
    onChange: onActiveKeyChange,
  });
  const context = React.useMemo<NavigatorContextValue>(
    () => ({
      activeKey,
      setActiveKey,
    }),
    [activeKey, setActiveKey],
  );
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <NavigatorContext.Provider value={context}>
      <NavigationMenuPrimitive.Root
        className={cn(
          "navigator relative z-10 flex max-w-max flex-1 items-center justify-center",
          styledProps.className,
        )}
        style={styledProps.style}
        {...restProps}
      >
        {hasItems ? (
          <NavigatorList {...listProps}>{renderNavigatorItems(items)}</NavigatorList>
        ) : (
          children
        )}
        {showIndicator ? <NavigatorIndicator {...indicatorProps} /> : null}
        {showViewport ? <NavigatorViewport {...viewportProps} /> : null}
      </NavigationMenuPrimitive.Root>
    </NavigatorContext.Provider>
  );
}

export const Navigator = Object.assign(NavigatorRoot, {
  List: NavigatorList,
  Item: NavigatorItem,
  Trigger: NavigatorTrigger,
  Content: NavigatorContent,
  Link: NavigatorLink,
  Viewport: NavigatorViewport,
  Indicator: NavigatorIndicator,
}) as NavigatorComponent;

Navigator.displayName = "Navigator";
Navigator.List.displayName = "Navigator.List";
Navigator.Item.displayName = "Navigator.Item";
Navigator.Trigger.displayName = "Navigator.Trigger";
Navigator.Content.displayName = "Navigator.Content";
Navigator.Link.displayName = "Navigator.Link";
Navigator.Viewport.displayName = "Navigator.Viewport";
Navigator.Indicator.displayName = "Navigator.Indicator";
