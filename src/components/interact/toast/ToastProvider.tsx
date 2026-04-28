import * as React from "react";
import { Icon } from "@/components/data-display/icon";
import { cn } from "@/lib/utils";
import { setToastBridge } from "./bridge";
import type {
  ToastContextValue,
  ToastCreateInput,
  ToastOptions,
  ToastPlacement,
  ToastType,
} from "./types";
import "./toast.css";

const TOAST_LEAVE_MS = 200;

const toastTypeStyles: Record<
  ToastType,
  {
    icon: string;
    iconColor: string;
    role: "status" | "alert";
    live: "polite" | "assertive";
  }
> = {
  info: { icon: "info", iconColor: "#6b7280", role: "status", live: "polite" },
  success: {
    icon: "check_circle",
    iconColor: "#16a34a",
    role: "status",
    live: "polite",
  },
  warn: {
    icon: "warning",
    iconColor: "#d97706",
    role: "alert",
    live: "assertive",
  },
  error: {
    icon: "error",
    iconColor: "#dc2626",
    role: "alert",
    live: "assertive",
  },
};

type ToastRecord = {
  id: string;
  message: string;
  type: ToastType;
  placement: ToastPlacement;
  closable: boolean;
  icon?: ToastCreateInput["icon"];
  iconColor?: string;
  leaving: boolean;
};

export interface ToastProviderProps {
  children?: React.ReactNode;
  placement?: ToastPlacement;
  duration?: number;
  queueLimit?: number;
  reverse?: boolean;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

let idSeed = 0;

function createToastId() {
  idSeed += 1;
  return `ldkj-toast-${Date.now()}-${idSeed}`;
}

function removeById(list: ToastRecord[], id: string) {
  return list.filter((item) => item.id !== id);
}

function groupByPlacement(list: ToastRecord[]) {
  const grouped = new Map<ToastPlacement, ToastRecord[]>();
  for (const toast of list) {
    const current = grouped.get(toast.placement);
    if (current) {
      current.push(toast);
    } else {
      grouped.set(toast.placement, [toast]);
    }
  }
  return grouped;
}

export function ToastProvider(props: ToastProviderProps) {
  const {
    children,
    placement = "top",
    duration = 3000,
    queueLimit = 5,
    reverse = false,
  } = props;
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const dismissTimersRef = React.useRef<Map<string, number>>(new Map());
  const removeTimersRef = React.useRef<Map<string, number>>(new Map());

  const clearTimers = React.useCallback((id: string) => {
    const dismissTimer = dismissTimersRef.current.get(id);
    if (dismissTimer !== undefined) {
      window.clearTimeout(dismissTimer);
      dismissTimersRef.current.delete(id);
    }
    const removeTimer = removeTimersRef.current.get(id);
    if (removeTimer !== undefined) {
      window.clearTimeout(removeTimer);
      removeTimersRef.current.delete(id);
    }
  }, []);

  const remove = React.useCallback(
    (id: string) => {
      clearTimers(id);
      setToasts((prev) => removeById(prev, id));
    },
    [clearTimers],
  );

  const dismiss = React.useCallback(
    (id: string) => {
      clearTimers(id);
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id && !toast.leaving
            ? { ...toast, leaving: true }
            : toast,
        ),
      );
      const removeTimer = window.setTimeout(() => {
        remove(id);
      }, TOAST_LEAVE_MS);
      removeTimersRef.current.set(id, removeTimer);
    },
    [clearTimers, remove],
  );

  const clear = React.useCallback(() => {
    setToasts((prev) => {
      prev.forEach((item) => clearTimers(item.id));
      return [];
    });
  }, [clearTimers]);

  const push = React.useCallback(
    (input: ToastCreateInput) => {
      const resolvedDuration = input.duration ?? duration;
      const toastId = input.id ?? createToastId();
      const record: ToastRecord = {
        id: toastId,
        message: input.message,
        type: input.type ?? "info",
        placement: input.placement ?? placement,
        closable: input.closable ?? true,
        icon: input.icon,
        iconColor: input.iconColor,
        leaving: false,
      };

      setToasts((prev) => {
        const next = [...prev, record];
        if (next.length <= queueLimit) {
          return next;
        }
        const overflow = next.length - queueLimit;
        const removed = next.slice(0, overflow);
        removed.forEach((item) => clearTimers(item.id));
        return next.slice(overflow);
      });

      const dismissTimer = window.setTimeout(
        () => {
          dismiss(toastId);
        },
        Math.max(resolvedDuration, 0),
      );
      dismissTimersRef.current.set(toastId, dismissTimer);

      return toastId;
    },
    [clearTimers, dismiss, duration, placement, queueLimit],
  );

  React.useEffect(() => {
    return () => {
      dismissTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      removeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      dismissTimersRef.current.clear();
      removeTimersRef.current.clear();
    };
  }, []);

  const contextValue = React.useMemo<ToastContextValue>(
    () => ({ push, dismiss, clear }),
    [clear, dismiss, push],
  );

  React.useEffect(() => {
    setToastBridge(contextValue);
    return () => setToastBridge(null);
  }, [contextValue]);

  const groupedToasts = React.useMemo(() => groupByPlacement(toasts), [toasts]);
  const placements = Array.from(groupedToasts.keys());

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {placements.map((position) => {
        const bucket = groupedToasts.get(position) ?? [];
        const list = reverse ? [...bucket].reverse() : bucket;

        return (
          <div
            key={position}
            className={cn(
              "ldkj-toast-viewport",
              `ldkj-toast-viewport-${position}`,
            )}
            aria-hidden={list.length === 0}
          >
            {list.map((toast) => {
              const typeMeta = toastTypeStyles[toast.type];
              const resolvedIconColor = toast.iconColor ?? typeMeta.iconColor;
              return (
                <div
                  key={toast.id}
                  className={cn(
                    "ldkj-toast-item",
                    toast.leaving ? "ldkj-toast-leave" : "ldkj-toast-appear",
                  )}
                  role={typeMeta.role}
                  aria-live={typeMeta.live}
                  aria-atomic="true"
                >
                  {typeof toast.icon === "string" ? (
                    <Icon
                      name={toast.icon}
                      color={resolvedIconColor}
                      size={20}
                      className="ldkj-toast-icon"
                      title={`${toast.type} icon`}
                    />
                  ) : toast.icon?.svg || toast.icon?.src ? (
                    <Icon
                      svg={toast.icon.svg}
                      src={toast.icon.src}
                      color={resolvedIconColor}
                      size={20}
                      className="ldkj-toast-icon"
                      title={`${toast.type} icon`}
                    />
                  ) : (
                    <Icon
                      name={typeMeta.icon}
                      color={resolvedIconColor}
                      size={20}
                      className="ldkj-toast-icon"
                      title={`${toast.type} icon`}
                    />
                  )}
                  <div className="ldkj-toast-message">{toast.message}</div>
                  {toast.closable ? (
                    <button
                      type="button"
                      className="ldkj-toast-close"
                      aria-label="关闭提示"
                      onClick={() => dismiss(toast.id)}
                    >
                      <Icon
                        name="close"
                        size={16}
                        className="ldkj-toast-close-icon"
                      />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast 必须在 ToastProvider 内使用。");
  }

  const show = React.useCallback(
    (message: string, options?: ToastOptions) => {
      return context.push({
        message,
        ...options,
      });
    },
    [context],
  );

  const info = React.useCallback(
    (message: string, options?: ToastOptions) =>
      context.push({ type: "info", message, ...options }),
    [context],
  );

  const success = React.useCallback(
    (message: string, options?: ToastOptions) =>
      context.push({ type: "success", message, ...options }),
    [context],
  );

  const warn = React.useCallback(
    (message: string, options?: ToastOptions) =>
      context.push({ type: "warn", message, ...options }),
    [context],
  );

  const error = React.useCallback(
    (message: string, options?: ToastOptions) =>
      context.push({ type: "error", message, ...options }),
    [context],
  );

  return React.useMemo(
    () => ({
      show,
      info,
      success,
      warn,
      error,
      dismiss: context.dismiss,
      clear: context.clear,
    }),
    [context.clear, context.dismiss, error, info, show, success, warn],
  );
}
