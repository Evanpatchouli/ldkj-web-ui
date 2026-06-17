import * as React from "react";
import { cn } from "@/lib/utils";
import { SafeAreaBottom } from "@/components/layout/safe-area";
import { RootPage, type RootPageProps } from "./RootPage";
import type { PageTabChangeHandler, PageTabDefinition } from "./types";

export interface TabRootPageProps<TTabId extends string = string>
  extends Omit<RootPageProps, "footer" | "contentProps" | "copyright"> {
  tabs: readonly (PageTabDefinition & { id: TTabId })[];
  tabId: TTabId;
  onTabChange?: PageTabChangeHandler<TTabId>;
  tabContentId?: string;
  tabContentProps?: React.HTMLAttributes<HTMLDivElement>;
  tabBarProps?: React.HTMLAttributes<HTMLDivElement>;
  copyright?: React.ReactNode | boolean;
}

function renderTabIcon(tab: PageTabDefinition, active: boolean) {
  if (typeof tab.icon === "function") {
    return tab.icon(active);
  }
  return tab.icon;
}

export function TabRootPage<TTabId extends string = string>(
  props: TabRootPageProps<TTabId>,
) {
  const {
    tabs,
    tabId,
    onTabChange,
    tabContentId,
    tabContentProps,
    tabBarProps,
    copyright,
    children,
    ...rootProps
  } = props;

  return (
    <RootPage
      {...rootProps}
      className={cn("h-[100dvh]", rootProps.className)}
      contentProps={{
        ...tabContentProps,
        id: tabContentId ?? tabContentProps?.id,
        className: cn(
          "min-h-0 flex-1 overflow-y-auto",
          tabContentProps?.className,
        ),
      }}
      footer={
        <SafeAreaBottom
          component="nav"
          className="border-t border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] shadow-[0_-1px_2px_rgba(0,0,0,0.05)]"
          aria-label="底部导航"
        >
          <div
            {...tabBarProps}
            className={cn(
              "flex h-20 items-center justify-around bg-[color:var(--ldkj-color-background)]",
              tabBarProps?.className,
            )}
          >
            {tabs.map((tab) => {
              const active = tab.id === tabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={cn(
                    "flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2",
                    "select-none text-sm transition-colors",
                    "hover:bg-[color:var(--ldkj-color-muted)] focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--ldkj-color-ring)]",
                    active
                      ? "font-medium text-[color:var(--ldkj-color-primary)]"
                      : "text-[color:var(--ldkj-color-muted-foreground)]",
                    tab.disabled && "cursor-not-allowed opacity-50",
                  )}
                  aria-current={active ? "page" : undefined}
                  disabled={tab.disabled}
                  onClick={() => {
                    onTabChange?.(tab.id, tab);
                  }}
                >
                  {tab.icon ? (
                    <span className="flex h-6 items-center justify-center" aria-hidden="true">
                      {renderTabIcon(tab, active)}
                    </span>
                  ) : null}
                  <span className="max-w-full truncate whitespace-nowrap">
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>
        </SafeAreaBottom>
      }
    >
      {children}
      {copyright ? (
        <div className="flex justify-center py-4">
          {copyright === true ? (
            <span className="text-xs text-[color:var(--ldkj-color-muted-foreground)]">
              Copyright
            </span>
          ) : (
            copyright
          )}
        </div>
      ) : null}
    </RootPage>
  );
}

TabRootPage.displayName = "TabRootPage";
