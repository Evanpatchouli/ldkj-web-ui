import * as React from "react";

import { Icon } from "@/components/data-display/icon";
import { Button, type ButtonProps } from "@/components/interact/button";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

const paginationEllipsisValue = "ellipsis" as const;
export type PaginationVariant = "outline" | "filled";

type PaginationGeneratedItem =
  | {
      type: "page";
      page: number;
      selected: boolean;
      disabled: boolean;
    }
  | {
      type: "previous" | "next";
      page: number;
      selected: false;
      disabled: boolean;
    }
  | {
      type: "ellipsis";
      page: null;
      selected: false;
      disabled: true;
    };

export type PaginationRenderItem = PaginationGeneratedItem & {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type PaginationProps = React.ComponentPropsWithoutRef<"nav"> &
  StyledProps & {
    count?: number;
    page?: number;
    defaultPage?: number;
    onPageChange?: (
      event: React.MouseEvent<HTMLAnchorElement>,
      page: number,
    ) => void;
    siblingCount?: number;
    boundaryCount?: number;
    variant?: PaginationVariant;
    showPreviousNext?: boolean;
    disabled?: boolean;
    getItemHref?: (
      page: number,
      type: PaginationGeneratedItem["type"],
    ) => string;
    renderItem?: (item: PaginationRenderItem) => React.ReactNode;
    contentProps?: React.ComponentProps<typeof PaginationContent>;
  };

function clampPage(page: number, count: number) {
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(Math.trunc(page), 1), count);
}

function range(start: number, end: number) {
  const length = Math.max(end - start + 1, 0);
  return Array.from({ length }, (_, index) => start + index);
}

function usePaginationState(props: {
  count: number;
  page?: number;
  defaultPage?: number;
}) {
  const { count, page, defaultPage = 1 } = props;
  const [uncontrolledPage, setUncontrolledPage] = React.useState(() =>
    clampPage(defaultPage, count),
  );
  const isControlled = page !== undefined;
  const resolvedPage = clampPage(isControlled ? page : uncontrolledPage, count);

  React.useEffect(() => {
    if (!isControlled) {
      setUncontrolledPage((current) => clampPage(current, count));
    }
  }, [count, isControlled]);

  return {
    page: resolvedPage,
    setPage: setUncontrolledPage,
    isControlled,
  };
}

function getPaginationItems(props: {
  count: number;
  page: number;
  siblingCount: number;
  boundaryCount: number;
  showPreviousNext: boolean;
  disabled: boolean;
}): PaginationGeneratedItem[] {
  const {
    count,
    page,
    siblingCount,
    boundaryCount,
    showPreviousNext,
    disabled,
  } = props;
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );
  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );
  const itemValues: Array<number | typeof paginationEllipsisValue> = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? [paginationEllipsisValue]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? [paginationEllipsisValue]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];
  const pageItems = itemValues.map<PaginationGeneratedItem>((item) =>
    item === paginationEllipsisValue
      ? {
          type: "ellipsis",
          page: null,
          selected: false,
          disabled: true,
        }
      : {
          type: "page",
          page: item,
          selected: item === page,
          disabled,
        },
  );

  if (!showPreviousNext) return pageItems;

  return [
    {
      type: "previous",
      page: Math.max(page - 1, 1),
      selected: false,
      disabled: disabled || page <= 1,
    },
    ...pageItems,
    {
      type: "next",
      page: Math.min(page + 1, count),
      selected: false,
      disabled: disabled || page >= count,
    },
  ];
}

const Pagination = ({
  count,
  page: pageProp,
  defaultPage,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  variant = "filled",
  showPreviousNext = true,
  disabled = false,
  getItemHref,
  renderItem,
  contentProps,
  className,
  class: legacyClass,
  sx,
  style,
  children,
  ...props
}: PaginationProps) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const hasGeneratedItems = typeof count === "number" && count > 0;
  const { page, setPage, isControlled } = usePaginationState({
    count: hasGeneratedItems ? count : 1,
    page: pageProp,
    defaultPage,
  });
  const items = hasGeneratedItems
    ? getPaginationItems({
        count,
        page,
        siblingCount: Math.max(Math.trunc(siblingCount), 0),
        boundaryCount: Math.max(Math.trunc(boundaryCount), 0),
        showPreviousNext,
        disabled,
      })
    : [];

  const handleChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    nextPage: number,
    itemDisabled: boolean,
  ) => {
    if (itemDisabled) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    if (!isControlled) {
      setPage(nextPage);
    }
    onPageChange?.(event, nextPage);
  };

  return (
    <nav
      role="navigation"
      aria-label="分页"
      className={cn(
        "mx-auto flex w-full justify-center",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...props}
    >
      {hasGeneratedItems ? (
        <PaginationContent {...contentProps}>
          {items.map((item, index) => {
            const key = `${item.type}-${item.page ?? index}`;
            const href =
              item.page === null
                ? undefined
                : (getItemHref?.(item.page, item.type) ?? `#page-${item.page}`);
            const onClick =
              item.page === null
                ? undefined
                : (event: React.MouseEvent<HTMLAnchorElement>) =>
                    handleChange(event, item.page, item.disabled);
            const renderPayload: PaginationRenderItem = {
              ...item,
              href,
              onClick,
            };

            if (renderItem) {
              return (
                <PaginationItem key={key}>
                  {renderItem(renderPayload)}
                </PaginationItem>
              );
            }

            if (item.type === "ellipsis") {
              return (
                <PaginationItem key={key}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            if (item.type === "previous") {
              return (
                <PaginationItem key={key}>
                  <PaginationPrevious
                    href={href}
                    variant={variant}
                    disabled={item.disabled}
                    onClick={onClick}
                  />
                </PaginationItem>
              );
            }

            if (item.type === "next") {
              return (
                <PaginationItem key={key}>
                  <PaginationNext
                    href={href}
                    variant={variant}
                    disabled={item.disabled}
                    onClick={onClick}
                  />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={key}>
                <PaginationLink
                  href={href}
                  variant={variant}
                  isActive={item.selected}
                  disabled={item.disabled}
                  onClick={onClick}
                >
                  {item.page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      ) : (
        children
      )}
    </nav>
  );
};
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul"> & StyledProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const resetListStyle: React.CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  return (
    <ul
      ref={ref}
      className={cn(
        "m-0 flex list-none flex-row items-center gap-1 p-0",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(resetListStyle, style, sxInlineStyle)}
      {...props}
    />
  );
});
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li"> & StyledProps
>(({ className, class: legacyClass, sx, style, ...props }, ref) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <li
      ref={ref}
      className={cn(sxClassName, className, legacyClass)}
      style={mergeSxStyle(
        { listStyle: "none", margin: 0 },
        style,
        sxInlineStyle,
      )}
      {...props}
    />
  );
});
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
  variant?: PaginationVariant;
} & Omit<ButtonProps<"a">, "component" | "variant" | "disabled">;

function resolvePaginationLinkVariant(
  variant: PaginationVariant,
  isActive: boolean | undefined,
): ButtonProps<"a">["variant"] {
  if (!isActive) return "ghost";
  return variant === "filled" ? "primary" : "outline";
}

const PaginationLink = ({
  className,
  class: legacyClass,
  isActive,
  disabled,
  variant = "outline",
  size = "icon",
  tabIndex,
  ...props
}: PaginationLinkProps) => (
  <Button
    component="a"
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? true : undefined}
    variant={resolvePaginationLinkVariant(variant, isActive)}
    size={size}
    tabIndex={disabled ? -1 : tabIndex}
    className={cn(
      disabled && "pointer-events-none opacity-50",
      isActive && variant === "filled" && "!text-white hover:!text-white",
      className,
      legacyClass,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="上一页"
    size="md"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    {children ?? (
      <>
        <Icon name="chevron_left" size={16} />
        <span>上一页</span>
      </>
    )}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="下一页"
    size="md"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    {children ?? (
      <>
        <span>下一页</span>
        <Icon name="chevron_right" size={16} />
      </>
    )}
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  class: legacyClass,
  sx,
  style,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & StyledProps) => {
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <span
      aria-hidden
      className={cn(
        "flex h-8 w-8 items-center justify-center",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...props}
    >
      <Icon name="more_horiz" size={16} />
      <span className="sr-only">更多页码</span>
    </span>
  );
};
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
