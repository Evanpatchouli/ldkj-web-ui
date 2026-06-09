import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export type TabsItemConfig = {
  value: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  triggerProps?: Omit<TabsTriggerProps, "value" | "children" | "disabled">;
  contentProps?: Omit<TabsContentProps, "value" | "children">;
};

export type TabsProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Root
> &
  StyledProps & {
    items?: TabsItemConfig[];
    listProps?: TabsListProps;
  };

export function Tabs(props: TabsProps) {
  const {
    items,
    listProps,
    sx,
    style,
    className,
    class: legacyClass,
    children,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <TabsPrimitive.Root
      className={cn("w-full", sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      {hasItems ? (
        <>
          <TabsList {...listProps}>
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                {...item.triggerProps}
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item) => (
            <TabsContent
              key={item.value}
              value={item.value}
              {...item.contentProps}
            >
              {item.content}
            </TabsContent>
          ))}
        </>
      ) : (
        children
      )}
    </TabsPrimitive.Root>
  );
}

Tabs.displayName = "Tabs";

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
> &
  StyledProps;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex min-h-10 items-center gap-1 rounded-lg bg-[color:var(--ldkj-color-muted)] p-1 text-[color:var(--ldkj-color-muted-foreground)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...props}
    />
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

export type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> &
  StyledProps;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[color:var(--ldkj-color-background)] data-[state=active]:text-[color:var(--ldkj-color-primary)] data-[state=active]:shadow-sm",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...props}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
> &
  StyledProps & {
    borderless?: boolean;
  };

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(
  (
    { className, class: legacyClass, sx, style, borderless = false, ...props },
    ref,
  ) => {
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
          !borderless && "rounded-lg border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-card)] p-4 text-[color:var(--ldkj-color-card-foreground)]",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        {...props}
      />
    );
  },
);

TabsContent.displayName = TabsPrimitive.Content.displayName;
