import * as React from "react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  variant?: AlertVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const toneMap: Record<AlertVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
};

export function Alert(props: AlertProps) {
  const { className, class: legacyClass, variant = "info", title, description, children, ...rest } = props;
  return (
    <div className={cn("rounded-md border p-3", toneMap[variant], className, legacyClass)} {...rest}>
      {title ? <div className="font-medium">{title}</div> : null}
      {description ? <div className="mt-1 text-sm">{description}</div> : children}
    </div>
  );
}