import type { ToastContextValue } from "./types";

let bridge: ToastContextValue | null = null;

export function setToastBridge(next: ToastContextValue | null) {
  bridge = next;
}

export function getToastBridge() {
  return bridge;
}
