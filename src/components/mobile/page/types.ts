import type * as React from "react";

export type PageBackTarget = "$parent" | "$prev" | string;

export type PagePullRefreshLabels = {
  pulling?: React.ReactNode;
  release?: React.ReactNode;
  refreshing?: React.ReactNode;
};

export type PageTabDefinition = {
  id: string;
  title: React.ReactNode;
  icon?: React.ReactNode | ((active: boolean) => React.ReactNode);
  route?: string;
  disabled?: boolean;
};

export type PageTabChangeHandler<TTabId extends string = string> = (
  tabId: TTabId,
  tab: PageTabDefinition,
) => void;
