import * as React from "react";
import type { ElementType } from "react";
import { Icon } from "@/components/data-display/icon";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

type BreadcrumbContextValue = {
  separator?: React.ReactNode;
};

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({});

export type BreadcrumbItemConfig = {
  key?: React.Key;
  label: React.ReactNode;
  href?: string;
  current?: boolean;
  separator?: React.ReactNode;
  ellipsis?: boolean;
  itemProps?: BreadcrumbItemProps;
  linkProps?: Omit<BreadcrumbLinkProps, "children" | "href">;
  pageProps?: Omit<BreadcrumbPageProps, "children">;
};

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav"> &
  StyledProps & {
    separator?: React.ReactNode;
    items?: BreadcrumbItemConfig[];
    listProps?: BreadcrumbListProps;
  };

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      separator,
      items,
      listProps,
      sx,
      style,
      className,
      class: legacyClass,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const hasItems = Array.isArray(items) && items.length > 0;

    return (
      <BreadcrumbContext.Provider value={{ separator }}>
        <nav
          ref={ref}
          aria-label="breadcrumb"
          className={cn(sxClassName, className, legacyClass)}
          style={mergeSxStyle(style, sxInlineStyle)}
          {...props}
        >
          {hasItems ? (
            <BreadcrumbList {...listProps}>
              {items.map((item, index) => {
                const {
                  key,
                  label,
                  href,
                  current,
                  separator: itemSeparator,
                  ellipsis,
                  itemProps,
                  linkProps,
                  pageProps,
                } = item;
                const isLast = index === items.length - 1;
                const isCurrent = current ?? isLast;

                return (
                  <React.Fragment key={key ?? index}>
                    <BreadcrumbItem {...itemProps}>
                      {ellipsis ? (
                        <BreadcrumbEllipsis />
                      ) : isCurrent ? (
                        <BreadcrumbPage {...pageProps}>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href} {...linkProps}>
                          {label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>

                    {!isLast ? (
                      <BreadcrumbSeparator>
                        {itemSeparator}
                      </BreadcrumbSeparator>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          ) : (
            children
          )}
        </nav>
      </BreadcrumbContext.Provider>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol"> & StyledProps;

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ sx, style, className, class: legacyClass, ...props }, ref) => {
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const resetListStyle: React.CSSProperties = {
      listStyle: "none",
      margin: 0,
      padding: 0,
    };

    return (
      <ol
        ref={ref}
        className={cn(
          "m-0 flex list-none flex-wrap items-center gap-1.5 break-words p-0 text-sm text-muted-foreground sm:gap-2.5",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(resetListStyle, style, sxInlineStyle)}
        {...props}
      />
    );
  },
);
BreadcrumbList.displayName = "BreadcrumbList";

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li"> & StyledProps;

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ sx, style, className, class: legacyClass, ...props }, ref) => {
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const resetItemStyle: React.CSSProperties = {
      margin: 0,
      display: "inline-flex",
      alignItems: "center",
    };

    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5 leading-none", sxClassName, className, legacyClass)}
        style={mergeSxStyle(resetItemStyle, style, sxInlineStyle)}
        {...props}
      />
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> &
  StyledProps & {
    component?: ElementType;
  };

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ component, sx, style, className, class: legacyClass, ...props }, ref) => {
    const Comp = (component ?? "a") as ElementType;
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center leading-none transition-colors hover:text-foreground",
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
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span"> & StyledProps;

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ sx, style, className, class: legacyClass, ...props }, ref) => {
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn(
          "inline-flex items-center font-normal leading-none text-foreground",
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
BreadcrumbPage.displayName = "BreadcrumbPage";

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"li"> & StyledProps;

export const BreadcrumbSeparator = ({
  children,
  sx,
  style,
  className,
  class: legacyClass,
  ...props
}: BreadcrumbSeparatorProps) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const { separator } = React.useContext(BreadcrumbContext);
  const resetItemStyle: React.CSSProperties = {
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
  };

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(
        "shrink-0 leading-none [&>svg]:h-3.5 [&>svg]:w-3.5",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(resetItemStyle, style, sxInlineStyle)}
      {...props}
    >
      {children ?? separator ?? <Icon name="chevron_right" />}
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export type BreadcrumbEllipsisProps = React.ComponentPropsWithoutRef<"span"> & StyledProps;

export const BreadcrumbEllipsis = ({ sx, style, className, class: legacyClass, ...props }: BreadcrumbEllipsisProps) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...props}
    >
      <Icon name="more_horiz" className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
