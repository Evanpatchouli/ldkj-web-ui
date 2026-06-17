import * as React from "react";
import { cn } from "@/lib/utils";
import { RootPage, type RootPageProps } from "./RootPage";
import type { PageBackTarget } from "./types";

export interface SubPageProps
  extends Omit<RootPageProps, "headerLeft" | "title"> {
  title?: React.ReactNode;
  back?: PageBackTarget | false;
  backLabel?: string;
  backIcon?: React.ReactNode;
  onBack?: (target: PageBackTarget, event: React.MouseEvent<HTMLButtonElement>) => void;
  headerLeft?: React.ReactNode;
}

function DefaultBackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function SubPage({
  back = "$parent",
  backLabel = "返回",
  backIcon,
  onBack,
  headerLeft,
  ...props
}: SubPageProps) {
  const fallbackHeaderLeft =
    back === false ? null : (
      <button
        type="button"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full",
          "text-[color:var(--ldkj-color-foreground)] transition-colors",
          "hover:bg-[color:var(--ldkj-color-muted)] focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
        )}
        aria-label={backLabel}
        onClick={(event) => {
          onBack?.(back, event);
        }}
      >
        {backIcon ?? <DefaultBackIcon />}
      </button>
    );

  return (
    <RootPage
      {...props}
      headerLeft={headerLeft ?? fallbackHeaderLeft}
    />
  );
}

SubPage.displayName = "SubPage";
