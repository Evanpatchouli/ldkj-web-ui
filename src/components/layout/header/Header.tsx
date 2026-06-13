import * as React from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";
import { Box, type BoxProps } from "../box";

export type HeaderVariant = "default" | "transparent" | "solid" | "subtle";
export type HeaderSize = "sm" | "md" | "lg";
export type HeaderGapPreset = "xs" | "sm" | "md" | "lg" | "xl";
export type HeaderGap = HeaderGapPreset | number | string;
export type HeaderMaxWidth = number | string;
export type HeaderSlotProps = BoxProps<ElementType>;

type HeaderSlotComponent = React.FC<HeaderSlotProps>;

export type HeaderProps = BoxProps<ElementType> & {
  variant?: HeaderVariant;
  size?: HeaderSize;
  maxWidth?: HeaderMaxWidth;
  fluid?: boolean;
  bordered?: boolean;
  sticky?: boolean;
  fixed?: boolean;
  safeArea?: boolean;
  gap?: HeaderGap;
  brand?: React.ReactNode;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  brandProps?: HeaderSlotProps;
  navProps?: HeaderSlotProps;
  actionsProps?: HeaderSlotProps;
  startProps?: HeaderSlotProps;
  endProps?: HeaderSlotProps;
  contentProps?: HeaderSlotProps;
};

type HeaderCompound = {
  Brand: HeaderSlotComponent;
  Nav: HeaderSlotComponent;
  Actions: HeaderSlotComponent;
  Start: HeaderSlotComponent;
  End: HeaderSlotComponent;
  Content: HeaderSlotComponent;
};

type HeaderComponent = React.FC<HeaderProps> & HeaderCompound;

const variantClass: Record<HeaderVariant, string> = {
  default:
    "bg-[color:var(--ldkj-color-background)] text-[color:var(--ldkj-color-foreground)]",
  transparent: "bg-transparent text-[color:var(--ldkj-color-foreground)]",
  solid:
    "bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)]",
  subtle:
    "bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-foreground)]",
};

const contentSizeClass: Record<HeaderSize, string> = {
  sm: "min-h-12 px-3",
  md: "min-h-14 px-4",
  lg: "min-h-16 px-6",
};

const gapPresetValue: Record<HeaderGapPreset, string> = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
};

function hasNode(value: React.ReactNode) {
  return value !== undefined && value !== null;
}

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function normalizeGap(gap: HeaderGap) {
  if (typeof gap === "number") return `${gap}px`;
  if (gap in gapPresetValue) return gapPresetValue[gap as HeaderGapPreset];
  return gap;
}

function normalizeMaxWidth(maxWidth: HeaderMaxWidth) {
  return toCssLength(maxWidth);
}

function isHeaderCompoundType(type: unknown) {
  return (
    type === HeaderBrand ||
    type === HeaderNav ||
    type === HeaderActions ||
    type === HeaderStart ||
    type === HeaderEnd ||
    type === HeaderContent
  );
}

function hasCompoundChildren(children: React.ReactNode) {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && isHeaderCompoundType(child.type)) {
      found = true;
    }
  });
  return found;
}

function HeaderBrand(props: HeaderSlotProps) {
  const { className, class: legacyClass, ...restProps } = props;

  return (
    <Box
      className={cn("header-brand flex min-w-0 shrink-0 items-center gap-2 font-semibold", className, legacyClass)}
      data-header-slot="brand"
      {...restProps}
    />
  );
}

function HeaderNav(props: HeaderSlotProps) {
  const {
    component,
    className,
    class: legacyClass,
    "aria-label": ariaLabel,
    ...restProps
  } = props;

  return (
    <Box
      component={component ?? "nav"}
      className={cn("header-nav hidden min-w-0 items-center gap-1 md:flex", className, legacyClass)}
      aria-label={ariaLabel ?? "Header navigation"}
      data-header-slot="nav"
      {...restProps}
    />
  );
}

function HeaderActions(props: HeaderSlotProps) {
  const { className, class: legacyClass, ...restProps } = props;

  return (
    <Box
      className={cn("header-actions flex shrink-0 items-center gap-2", className, legacyClass)}
      data-header-slot="actions"
      {...restProps}
    />
  );
}

function HeaderStart(props: HeaderSlotProps) {
  const { className, class: legacyClass, ...restProps } = props;

  return (
    <Box
      className={cn("header-start flex shrink-0 items-center gap-2", className, legacyClass)}
      data-header-slot="start"
      {...restProps}
    />
  );
}

function HeaderEnd(props: HeaderSlotProps) {
  const { className, class: legacyClass, ...restProps } = props;

  return (
    <Box
      className={cn("header-end flex shrink-0 items-center gap-2", className, legacyClass)}
      data-header-slot="end"
      {...restProps}
    />
  );
}

function HeaderContent(props: HeaderSlotProps) {
  const { className, class: legacyClass, ...restProps } = props;

  return (
    <Box
      className={cn("header-content flex min-w-0 flex-1 items-center", className, legacyClass)}
      data-header-slot="content"
      {...restProps}
    />
  );
}

function HeaderRoot(props: HeaderProps) {
  const {
    variant = "default",
    size = "md",
    maxWidth = 1200,
    fluid = false,
    bordered = true,
    sticky = false,
    fixed = false,
    safeArea = false,
    gap = "md",
    brand,
    nav,
    actions,
    start,
    end,
    brandProps,
    navProps,
    actionsProps,
    startProps,
    endProps,
    contentProps,
    component,
    className,
    class: legacyClass,
    style,
    children,
    ...restProps
  } = props;

  const useCompoundChildren = hasCompoundChildren(children);
  const rootStyle: React.CSSProperties = {
    paddingTop: safeArea ? "env(safe-area-inset-top, 0px)" : undefined,
  };
  const innerStyle: React.CSSProperties = {
    gap: normalizeGap(gap),
    maxWidth: fluid ? undefined : normalizeMaxWidth(maxWidth),
  };

  return (
    <Box
      component={component ?? "header"}
      className={cn(
        "header z-30 w-full",
        variantClass[variant],
        bordered && "border-b border-[color:var(--ldkj-color-border)]",
        sticky && !fixed && "sticky top-0",
        fixed && "fixed left-0 right-0 top-0",
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, rootStyle)}
      {...restProps}
    >
      <Box
        className={cn(
          "header-inner mx-auto box-border flex w-full items-center",
          contentSizeClass[size],
        )}
        style={innerStyle}
      >
        {useCompoundChildren ? (
          children
        ) : (
          <>
            {hasNode(start) ? (
              <HeaderStart {...startProps}>
                {start}
              </HeaderStart>
            ) : null}
            {hasNode(brand) ? (
              <HeaderBrand {...brandProps}>
                {brand}
              </HeaderBrand>
            ) : null}
            {hasNode(nav) ? (
              <HeaderNav {...navProps}>
                {nav}
              </HeaderNav>
            ) : null}
            {hasNode(children) ? (
              <HeaderContent
                {...contentProps}
                className={cn("justify-center", contentProps?.className)}
              >
                {children}
              </HeaderContent>
            ) : null}
            {hasNode(actions) ? (
              <HeaderActions {...actionsProps}>
                {actions}
              </HeaderActions>
            ) : null}
            {hasNode(end) ? (
              <HeaderEnd {...endProps}>
                {end}
              </HeaderEnd>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  );
}

export const Header = Object.assign(HeaderRoot, {
  Brand: HeaderBrand,
  Nav: HeaderNav,
  Actions: HeaderActions,
  Start: HeaderStart,
  End: HeaderEnd,
  Content: HeaderContent,
}) as HeaderComponent;

Header.displayName = "Header";
Header.Brand.displayName = "Header.Brand";
Header.Nav.displayName = "Header.Nav";
Header.Actions.displayName = "Header.Actions";
Header.Start.displayName = "Header.Start";
Header.End.displayName = "Header.End";
Header.Content.displayName = "Header.Content";
