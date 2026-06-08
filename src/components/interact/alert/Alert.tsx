import * as React from "react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  variant?: AlertVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Custom leading icon. Pass showIcon to use the built-in tone marker. */
  icon?: React.ReactNode;
  /** Whether to render the leading icon area. */
  showIcon?: boolean;
  /** Optional trailing action, such as a retry button or detail link. */
  action?: React.ReactNode;
  /** Render a close button. */
  closable?: boolean;
  /** Controlled visibility. */
  open?: boolean;
  /** Fired after the close button is clicked. */
  onClose?: () => void;
  /** Controlled visibility callback. */
  onOpenChange?: (open: boolean) => void;
};

const toneMap: Record<AlertVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
};

const iconToneMap: Record<AlertVariant, string> = {
  info: "bg-blue-600 text-white",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-white",
  error: "bg-rose-600 text-white",
};

const iconTextMap: Record<AlertVariant, string> = {
  info: "i",
  success: "ok",
  warning: "!",
  error: "!",
};

export function Alert(props: AlertProps) {
  const {
    className,
    class: legacyClass,
    variant = "info",
    title,
    description,
    children,
    icon,
    showIcon = Boolean(icon),
    action,
    closable = false,
    open,
    onClose,
    onOpenChange,
    role = variant === "error" || variant === "warning" ? "alert" : "status",
    ...rest
  } = props;
  const [internalOpen, setInternalOpen] = React.useState(true);
  const isOpen = open ?? internalOpen;

  if (!isOpen) return null;

  const handleClose = () => {
    setInternalOpen(false);
    onOpenChange?.(false);
    onClose?.();
  };

  return (
    <div
      role={role}
      className={cn("rounded-md border p-3", toneMap[variant], className, legacyClass)}
      {...rest}
    >
      <div className="flex items-start gap-3">
        {showIcon ? (
          <span
            aria-hidden
            className={cn(
              "mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none",
              iconToneMap[variant],
            )}
          >
            {icon ?? iconTextMap[variant]}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          {title ? <div className="font-medium">{title}</div> : null}
          {description ? <div className="mt-1 text-sm opacity-90">{description}</div> : children}
          {action ? <div className="mt-2">{action}</div> : null}
        </div>
        {closable ? (
          <button
            type="button"
            aria-label="Close alert"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-current opacity-70 transition hover:bg-current/10 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current/30"
            onClick={handleClose}
          >
            x
          </button>
        ) : null}
      </div>
    </div>
  );
}
