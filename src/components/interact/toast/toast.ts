import { getToastBridge } from "./bridge";
import type { ToastOptions, ToastPlacement } from "./types";

export interface ToastFacadeConfig {
  placement?: ToastPlacement;
  duration?: number;
  closable?: boolean;
}

const defaultConfig: Required<ToastFacadeConfig> = {
  placement: "top",
  duration: 3000,
  closable: true,
};

let hasWarnedMissingProvider = false;
const facadeConfig: Required<ToastFacadeConfig> = { ...defaultConfig };

function withDefaultOptions(options?: ToastOptions): ToastOptions {
  return {
    placement: options?.placement ?? facadeConfig.placement,
    duration: options?.duration ?? facadeConfig.duration,
    id: options?.id,
    closable: options?.closable ?? facadeConfig.closable,
    icon: options?.icon,
    iconColor: options?.iconColor,
  };
}

function ensureBridge() {
  const bridge = getToastBridge();
  if (bridge) {
    return bridge;
  }
  if (!hasWarnedMissingProvider) {
    hasWarnedMissingProvider = true;
    // eslint-disable-next-line no-console
    console.warn("toast 调用失败：请先在应用根节点挂载 ToastProvider。");
  }
  return null;
}

function show(
  type: "info" | "success" | "warn" | "error",
  message: string,
  options?: ToastOptions,
) {
  const bridge = ensureBridge();
  if (!bridge) {
    return "";
  }
  return bridge.push({
    type,
    message,
    ...withDefaultOptions(options),
  });
}

/**
 * 全局 toast facade。请先挂载 ToastProvider，再在任意业务模块调用。
 */
export const toast = {
  show(message: string, options?: ToastOptions) {
    const bridge = ensureBridge();
    if (!bridge) {
      return "";
    }
    return bridge.push({
      type: "info",
      message: typeof message === "string" ? message : String(message),
      ...withDefaultOptions(options),
    });
  },
  info(message: string, options?: ToastOptions) {
    return show("info", message, options);
  },
  success(message: string, options?: ToastOptions) {
    return show("success", message, options);
  },
  warn(message: string, options?: ToastOptions) {
    return show("warn", message, options);
  },
  error(message: string, options?: ToastOptions) {
    return show("error", message, options);
  },
  dismiss(id: string) {
    const bridge = ensureBridge();
    if (!bridge) {
      return;
    }
    bridge.dismiss(id);
  },
  clear() {
    const bridge = ensureBridge();
    if (!bridge) {
      return;
    }
    bridge.clear();
  },
  config(config: ToastFacadeConfig) {
    facadeConfig.placement = config.placement ?? facadeConfig.placement;
    facadeConfig.duration = config.duration ?? facadeConfig.duration;
    facadeConfig.closable = config.closable ?? facadeConfig.closable;
  },
  resetConfig() {
    facadeConfig.placement = defaultConfig.placement;
    facadeConfig.duration = defaultConfig.duration;
    facadeConfig.closable = defaultConfig.closable;
  },
};
