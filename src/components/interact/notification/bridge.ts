import type { NotificationContextValue } from "./types";

let bridge: NotificationContextValue | null = null;

export function setNotificationBridge(next: NotificationContextValue | null) {
  bridge = next;
}

export function getNotificationBridge() {
  return bridge;
}
