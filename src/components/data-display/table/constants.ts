import type { TableSize, TableVariant } from "./types";

export const sizeCellClass: Record<TableSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

export const variantRootClass: Record<TableVariant, string> = {
  outlined: "border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-card)] text-[color:var(--ldkj-color-card-foreground)]",
  filled: "border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-foreground)]",
  ghost: "border border-transparent bg-transparent",
};
