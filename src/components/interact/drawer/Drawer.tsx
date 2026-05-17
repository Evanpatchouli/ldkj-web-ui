import * as React from "react";
import { cn } from "@/lib/utils";

export type DrawerProps = {
  open: boolean;
  title?: React.ReactNode;
  width?: number | string;
  className?: string;
  class?: string;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function Drawer(props: DrawerProps) {
  const { open, title, width = 360, className, class: legacyClass, children, onOpenChange } = props;
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/45" onClick={() => onOpenChange?.(false)} />
      <div
        className={cn("absolute right-0 top-0 h-full bg-white p-4 shadow-xl", className, legacyClass)}
        style={{ width }}
      >
        {title ? <div className="mb-3 text-base font-medium">{title}</div> : null}
        {children}
      </div>
    </div>
  );
}