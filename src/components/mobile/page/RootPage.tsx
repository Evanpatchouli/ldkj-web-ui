import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";
import { SafeAreaBottom, SafeAreaTop } from "@/components/layout/safe-area";
import type { PagePullRefreshLabels } from "./types";

const PULL_REFRESH_THRESHOLD = 58;
const PULL_REFRESH_MAX_DISTANCE = 78;

export interface RootPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode | false;
  documentTitle?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  onPullRefresh?: () => void | Promise<void>;
  refreshing?: boolean;
  pullRefreshLabels?: PagePullRefreshLabels;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  footer?: React.ReactNode;
  copyright?: React.ReactNode | boolean;
  safeAreaBottom?: boolean;
  headerSticky?: boolean;
}

function useDocumentTitle(title?: string) {
  React.useEffect(() => {
    if (typeof document === "undefined" || title === undefined) {
      return;
    }
    document.title = title;
  }, [title]);
}

function getScrollTop(target: EventTarget | null) {
  if (target instanceof HTMLElement) {
    return target.scrollTop;
  }
  if (typeof window === "undefined") {
    return 0;
  }
  return window.scrollY;
}

function RefreshIcon({ refreshing }: { refreshing: boolean }) {
  return (
    <span
      className={cn(
        "inline-block h-3.5 w-3.5 rounded-full border border-current border-t-transparent",
        refreshing && "animate-spin",
      )}
      aria-hidden="true"
    />
  );
}

export function RootPage(props: RootPageProps) {
  const {
    title,
    documentTitle,
    headerLeft,
    headerRight,
    onPullRefresh,
    refreshing = false,
    pullRefreshLabels,
    contentProps,
    footer,
    copyright,
    safeAreaBottom = false,
    headerSticky = true,
    className,
    style,
    children,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...restProps
  } = props;
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const touchStartYRef = React.useRef<number | null>(null);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [pullRefreshing, setPullRefreshing] = React.useState(false);

  useDocumentTitle(documentTitle);

  const handleTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      onTouchStart?.(event);
      if (
        event.defaultPrevented ||
        !onPullRefresh ||
        pullRefreshing ||
        (contentRef.current
          ? contentRef.current.scrollTop > 0
          : getScrollTop(event.currentTarget) > 0)
      ) {
        touchStartYRef.current = null;
        return;
      }
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    },
    [onPullRefresh, onTouchStart, pullRefreshing],
  );

  const handleTouchMove = React.useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      onTouchMove?.(event);
      if (event.defaultPrevented || touchStartYRef.current == null) {
        return;
      }
      if (
        contentRef.current
          ? contentRef.current.scrollTop > 0
          : getScrollTop(event.currentTarget) > 0
      ) {
        return;
      }
      const currentY = event.touches[0]?.clientY;
      if (currentY == null) {
        return;
      }
      const distance = currentY - touchStartYRef.current;
      if (distance <= 0) {
        setPullDistance(0);
        return;
      }
      setPullDistance(
        Math.min(
          Math.round(distance * 0.45),
          PULL_REFRESH_MAX_DISTANCE,
        ),
      );
    },
    [onTouchMove],
  );

  const handleTouchEnd = React.useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      onTouchEnd?.(event);
      const shouldRefresh = pullDistance >= PULL_REFRESH_THRESHOLD;
      touchStartYRef.current = null;
      setPullDistance(0);
      if (!shouldRefresh || !onPullRefresh) {
        return;
      }
      setPullRefreshing(true);
      Promise.resolve(onPullRefresh()).finally(() => {
        setPullRefreshing(false);
      });
    },
    [onPullRefresh, onTouchEnd, pullDistance],
  );

  const isRefreshing = refreshing || pullRefreshing;
  const pullVisible = pullDistance > 0 || isRefreshing;
  const refreshText = isRefreshing
    ? (pullRefreshLabels?.refreshing ?? "刷新中...")
    : pullDistance >= PULL_REFRESH_THRESHOLD
      ? (pullRefreshLabels?.release ?? "松开刷新")
      : (pullRefreshLabels?.pulling ?? "下拉刷新");
  const copyrightNode =
    copyright === true ? (
      <span className="text-xs text-[color:var(--ldkj-color-muted-foreground)]">
        Copyright
      </span>
    ) : (
      copyright
    );
  const contentStyle = mergeSxStyle(
    contentProps?.style,
    onPullRefresh ? { overscrollBehaviorY: "contain" } : undefined,
  );

  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] w-full min-w-0 flex-col bg-[#f2f6ff] text-[color:var(--ldkj-color-foreground)]",
        className,
      )}
      style={style}
      {...restProps}
    >
      {title !== false ? (
        <SafeAreaTop
          component="header"
          className={cn(
            "z-10 border-b border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] shadow-sm",
            headerSticky && "sticky top-0",
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex h-14 w-full items-center justify-between px-2">
            <div className="z-[1] flex h-full min-w-11 shrink-0 items-center justify-start">
              {headerLeft}
            </div>
            <div className="pointer-events-none absolute inset-x-14 inset-y-0 flex items-center justify-center text-center text-base font-medium">
              <span className="block max-w-full truncate leading-none">
                {title}
              </span>
            </div>
            <div className="z-[1] flex h-full min-w-11 shrink-0 items-center justify-end">
              {headerRight}
            </div>
          </div>
        </SafeAreaTop>
      ) : null}

      <div
        {...contentProps}
        ref={contentRef}
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          contentProps?.className,
        )}
        style={contentStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="overflow-hidden text-[color:var(--ldkj-color-muted-foreground)] transition-[height,opacity] duration-150 ease-out"
          style={{
            height: pullVisible ? 32 : 0,
            opacity: pullVisible ? 1 : 0,
            transition: pullDistance ? "none" : undefined,
          }}
          aria-live="polite"
        >
          <div className="flex h-8 items-center justify-center gap-1.5 text-xs">
            <RefreshIcon refreshing={isRefreshing} />
            <span>{refreshText}</span>
          </div>
        </div>
        {children}
        {copyrightNode ? (
          <div className="flex justify-center py-4">{copyrightNode}</div>
        ) : null}
      </div>

      {footer}
      {safeAreaBottom ? <SafeAreaBottom aria-hidden="true" /> : null}
    </div>
  );
}

RootPage.displayName = "RootPage";
