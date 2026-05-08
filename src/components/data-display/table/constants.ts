import type { TableSize, TableVariant } from "./types";

export const sizeCellClass: Record<TableSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

export const variantRootClass: Record<TableVariant, string> = {
  outlined: "border border-slate-200 bg-white",
  filled: "border border-slate-100 bg-slate-50",
  ghost: "border border-transparent bg-transparent",
};
