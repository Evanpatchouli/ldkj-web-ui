import * as React from "react";
import { Icon } from "@/components/data-display/icon";
import { cn } from "@/lib/utils";
import { setNotificationBridge } from "./bridge";
import type {
  NotificationContextValue,
  NotificationCreateInput,
  NotificationOffset,
  NotificationOptions,
  NotificationPlacement,
  NotificationType,
} from "./types";
import "./notification.css";

const NOTIFICATION_LEAVE_MS = 200;
const DEFAULT_OFFSET = 24;

const notificationTypeStyles: Record<
  NotificationType,
  {
    icon: string;
    iconColor: string;
    role: "status" | "alert";
    live: "polite" | "assertive";
  }
> = {
  info: {
    icon: "info",
    iconColor: "var(--ldkj-color-info)",
    role: "status",
    live: "polite",
  },
  success: {
    icon: "check_circle",
    iconColor: "var(--ldkj-color-success)",
    role: "status",
    live: "polite",
  },
  warn: {
    icon: "warning",
    iconColor: "var(--ldkj-color-warning)",
    role: "alert",
    live: "assertive",
  },
  error: {
    icon: "error",
    iconColor: "var(--ldkj-color-danger)",
    role: "alert",
    live: "assertive",
  },
};

type ResolvedOffset = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type NotificationRecord = {
  id: string;
  type: NotificationType;
  message: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  placement: NotificationPlacement;
  offset: ResolvedOffset;
  closable: boolean;
  icon?: NotificationCreateInput["icon"];
  iconColor?: string;
  onClose?: () => void;
  leaving: boolean;
};

export interface NotificationProviderProps {
  children?: React.ReactNode;
  placement?: NotificationPlacement;
  duration?: number;
  queueLimit?: number;
  offset?: NotificationOffset;
  closable?: boolean;
}

const NotificationContext =
  React.createContext<NotificationContextValue | null>(null);

let idSeed = 0;

function createNotificationId() {
  idSeed += 1;
  return `ldkj-notification-${Date.now()}-${idSeed}`;
}

function resolveOffset(
  offset: NotificationOffset | undefined,
  fallback: NotificationOffset | undefined,
): ResolvedOffset {
  const fallbackValue = fallback ?? DEFAULT_OFFSET;
  const base =
    typeof fallbackValue === "number"
      ? {
          top: fallbackValue,
          right: fallbackValue,
          bottom: fallbackValue,
          left: fallbackValue,
        }
      : {
          top: fallbackValue.top ?? DEFAULT_OFFSET,
          right: fallbackValue.right ?? DEFAULT_OFFSET,
          bottom: fallbackValue.bottom ?? DEFAULT_OFFSET,
          left: fallbackValue.left ?? DEFAULT_OFFSET,
        };

  if (offset === undefined) {
    return base;
  }

  if (typeof offset === "number") {
    return {
      top: offset,
      right: offset,
      bottom: offset,
      left: offset,
    };
  }

  return {
    top: offset.top ?? base.top,
    right: offset.right ?? base.right,
    bottom: offset.bottom ?? base.bottom,
    left: offset.left ?? base.left,
  };
}

function getGroupKey(
  placement: NotificationPlacement,
  offset: ResolvedOffset,
) {
  return `${placement}:${offset.top}:${offset.right}:${offset.bottom}:${offset.left}`;
}

function groupByPlacementAndOffset(list: NotificationRecord[]) {
  const grouped = new Map<string, NotificationRecord[]>();
  for (const item of list) {
    const key = getGroupKey(item.placement, item.offset);
    const current = grouped.get(key);
    if (current) {
      current.push(item);
    } else {
      grouped.set(key, [item]);
    }
  }
  return grouped;
}

function hasNode(value: React.ReactNode) {
  return value !== undefined && value !== null && value !== false;
}

function getViewportStyle(
  placement: NotificationPlacement,
  offset: ResolvedOffset,
): React.CSSProperties {
  if (placement === "center") {
    return {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  const style: React.CSSProperties = {};
  if (placement.includes("Top")) {
    style.top = offset.top;
  }
  if (placement.includes("Bottom")) {
    style.bottom = offset.bottom;
  }
  if (placement.includes("right")) {
    style.right = offset.right;
  }
  if (placement.includes("left")) {
    style.left = offset.left;
  }
  return style;
}

function renderIcon(record: NotificationRecord) {
  const typeMeta = notificationTypeStyles[record.type];
  const resolvedIconColor = record.iconColor ?? typeMeta.iconColor;

  if (typeof record.icon === "string") {
    return (
      <Icon
        name={record.icon}
        color={resolvedIconColor}
        size={22}
        className="ldkj-notification-icon"
        title={`${record.type} icon`}
      />
    );
  }

  if (record.icon?.svg || record.icon?.src) {
    return (
      <Icon
        svg={record.icon.svg}
        src={record.icon.src}
        color={resolvedIconColor}
        size={22}
        className="ldkj-notification-icon"
        title={`${record.type} icon`}
      />
    );
  }

  return (
    <Icon
      name={typeMeta.icon}
      color={resolvedIconColor}
      size={22}
      className="ldkj-notification-icon"
      title={`${record.type} icon`}
    />
  );
}

export function NotificationProvider(props: NotificationProviderProps) {
  const {
    children,
    placement = "rightTop",
    duration = 4500,
    queueLimit = 5,
    offset = DEFAULT_OFFSET,
    closable = true,
  } = props;
  const [notifications, setNotifications] = React.useState<
    NotificationRecord[]
  >([]);
  const dismissTimersRef = React.useRef<Map<string, number>>(new Map());
  const removeTimersRef = React.useRef<Map<string, number>>(new Map());
  const closedIdsRef = React.useRef<Set<string>>(new Set());

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

  const notifyClose = React.useCallback((record: NotificationRecord) => {
    if (closedIdsRef.current.has(record.id)) {
      return;
    }
    closedIdsRef.current.add(record.id);
    record.onClose?.();
  }, []);

  const remove = React.useCallback(
    (id: string) => {
      setNotifications((prev) => {
        const target = prev.find((item) => item.id === id);
        if (!target) {
          return prev;
        }
        clearTimers(id);
        notifyClose(target);
        return prev.filter((item) => item.id !== id);
      });
    },
    [clearTimers, notifyClose],
  );

  const dismiss = React.useCallback(
    (id: string) => {
      clearTimers(id);
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id && !item.leaving ? { ...item, leaving: true } : item,
        ),
      );
      const removeTimer = window.setTimeout(() => {
        remove(id);
      }, NOTIFICATION_LEAVE_MS);
      removeTimersRef.current.set(id, removeTimer);
    },
    [clearTimers, remove],
  );

  const clear = React.useCallback(() => {
    setNotifications((prev) => {
      prev.forEach((item) => {
        clearTimers(item.id);
        notifyClose(item);
      });
      return [];
    });
  }, [clearTimers, notifyClose]);

  const push = React.useCallback(
    (input: NotificationCreateInput) => {
      const notificationId = input.id ?? createNotificationId();
      closedIdsRef.current.delete(notificationId);
      clearTimers(notificationId);

      const resolvedPlacement = input.placement ?? placement;
      const resolvedOffset = resolveOffset(input.offset, offset);
      const record: NotificationRecord = {
        id: notificationId,
        type: input.type ?? "info",
        message: input.message,
        description: input.description,
        content: input.content,
        actions: input.actions,
        placement: resolvedPlacement,
        offset: resolvedOffset,
        closable: input.closable ?? closable,
        icon: input.icon,
        iconColor: input.iconColor,
        onClose: input.onClose,
        leaving: false,
      };
      const groupKey = getGroupKey(resolvedPlacement, resolvedOffset);

      setNotifications((prev) => {
        const withoutSameId = prev.filter((item) => item.id !== notificationId);
        const next = [...withoutSameId, record];
        const bucket = next.filter(
          (item) => getGroupKey(item.placement, item.offset) === groupKey,
        );

        if (bucket.length <= queueLimit) {
          return next;
        }

        const overflow = bucket.length - queueLimit;
        const removedIds = new Set(bucket.slice(0, overflow).map((item) => item.id));
        bucket.slice(0, overflow).forEach((item) => {
          clearTimers(item.id);
          notifyClose(item);
        });
        return next.filter((item) => !removedIds.has(item.id));
      });

      const resolvedDuration = input.duration ?? duration;
      if (resolvedDuration > 0) {
        const dismissTimer = window.setTimeout(() => {
          dismiss(notificationId);
        }, resolvedDuration);
        dismissTimersRef.current.set(notificationId, dismissTimer);
      }

      return notificationId;
    },
    [
      clearTimers,
      closable,
      dismiss,
      duration,
      notifyClose,
      offset,
      placement,
      queueLimit,
    ],
  );

  React.useEffect(() => {
    return () => {
      dismissTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      removeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      dismissTimersRef.current.clear();
      removeTimersRef.current.clear();
    };
  }, []);

  const contextValue = React.useMemo<NotificationContextValue>(
    () => ({ push, dismiss, clear }),
    [clear, dismiss, push],
  );

  React.useEffect(() => {
    setNotificationBridge(contextValue);
    return () => setNotificationBridge(null);
  }, [contextValue]);

  const groupedNotifications = React.useMemo(
    () => groupByPlacementAndOffset(notifications),
    [notifications],
  );
  const groups = Array.from(groupedNotifications.entries());

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {groups.map(([key, list]) => {
        const first = list[0];
        if (!first) {
          return null;
        }

        return (
          <div
            key={key}
            className={cn(
              "ldkj-notification-viewport",
              `ldkj-notification-viewport-${first.placement}`,
            )}
            style={getViewportStyle(first.placement, first.offset)}
            aria-hidden={list.length === 0}
          >
            {list.map((record) => {
              const typeMeta = notificationTypeStyles[record.type];
              return (
                <div
                  key={record.id}
                  className={cn(
                    "ldkj-notification-card",
                    `ldkj-notification-card-${record.type}`,
                    record.leaving
                      ? "ldkj-notification-leave"
                      : "ldkj-notification-appear",
                  )}
                  role={typeMeta.role}
                  aria-live={typeMeta.live}
                  aria-atomic="true"
                >
                  <div className="ldkj-notification-icon-wrap">
                    {renderIcon(record)}
                  </div>
                  <div className="ldkj-notification-main">
                    <div className="ldkj-notification-title">
                      {record.message}
                    </div>
                    {hasNode(record.description) ? (
                      <div className="ldkj-notification-description">
                        {record.description}
                      </div>
                    ) : null}
                    {hasNode(record.content) ? (
                      <div className="ldkj-notification-content">
                        {record.content}
                      </div>
                    ) : null}
                    {hasNode(record.actions) ? (
                      <div className="ldkj-notification-actions">
                        {record.actions}
                      </div>
                    ) : null}
                  </div>
                  {record.closable ? (
                    <button
                      type="button"
                      className="ldkj-notification-close"
                      aria-label="关闭通知"
                      onClick={() => dismiss(record.id)}
                    >
                      <Icon
                        name="close"
                        size={16}
                        className="ldkj-notification-close-icon"
                      />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </NotificationContext.Provider>
  );
}

NotificationProvider.displayName = "NotificationProvider";

/**
 * 获取当前 NotificationProvider 提供的通知 API。
 */
export function useNotification() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification 必须在 NotificationProvider 内使用。");
  }

  const open = React.useCallback(
    (options: NotificationOptions) => context.push(options),
    [context],
  );

  const info = React.useCallback(
    (options: NotificationOptions | string) =>
      context.push(normalizeShortcutInput("info", options)),
    [context],
  );

  const success = React.useCallback(
    (options: NotificationOptions | string) =>
      context.push(normalizeShortcutInput("success", options)),
    [context],
  );

  const warn = React.useCallback(
    (options: NotificationOptions | string) =>
      context.push(normalizeShortcutInput("warn", options)),
    [context],
  );

  const error = React.useCallback(
    (options: NotificationOptions | string) =>
      context.push(normalizeShortcutInput("error", options)),
    [context],
  );

  return React.useMemo(
    () => ({
      open,
      info,
      success,
      warn,
      error,
      dismiss: context.dismiss,
      clear: context.clear,
    }),
    [context.clear, context.dismiss, error, info, open, success, warn],
  );
}

function normalizeShortcutInput(
  type: NotificationType,
  options: NotificationOptions | string,
): NotificationCreateInput {
  if (typeof options === "string") {
    return { type, message: options };
  }
  return {
    ...options,
    type,
  };
}
