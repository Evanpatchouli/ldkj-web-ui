import { getNotificationBridge } from "./bridge";
import type {
  NotificationCreateInput,
  NotificationOffset,
  NotificationOptions,
  NotificationPlacement,
  NotificationType,
} from "./types";

export interface NotificationFacadeConfig {
  placement?: NotificationPlacement;
  duration?: number;
  closable?: boolean;
  offset?: NotificationOffset;
}

const defaultConfig: Required<NotificationFacadeConfig> = {
  placement: "rightTop",
  duration: 4500,
  closable: true,
  offset: 24,
};

const facadeConfig: Required<NotificationFacadeConfig> = { ...defaultConfig };
let hasWarnedMissingProvider = false;

function withDefaultOptions(options: NotificationOptions): NotificationOptions {
  return {
    ...options,
    placement: options.placement ?? facadeConfig.placement,
    duration: options.duration ?? facadeConfig.duration,
    closable: options.closable ?? facadeConfig.closable,
    offset: options.offset ?? facadeConfig.offset,
  };
}

function ensureBridge() {
  const bridge = getNotificationBridge();
  if (bridge) {
    return bridge;
  }

  if (!hasWarnedMissingProvider) {
    hasWarnedMissingProvider = true;
    // eslint-disable-next-line no-console
    console.warn(
      "notification 调用失败：请先在应用根节点挂载 NotificationProvider。",
    );
  }
  return null;
}

function normalizeShortcutInput(
  type: NotificationType,
  input: NotificationOptions | string,
): NotificationCreateInput {
  if (typeof input === "string") {
    return {
      ...withDefaultOptions({ message: input }),
      type,
    };
  }

  return {
    ...withDefaultOptions(input),
    type,
  };
}

function show(type: NotificationType, input: NotificationOptions | string) {
  const bridge = ensureBridge();
  if (!bridge) {
    return "";
  }

  return bridge.push(normalizeShortcutInput(type, input));
}

/**
 * 全局 notification facade。请先挂载 NotificationProvider，再在任意业务模块调用。
 */
export const notification = {
  open(options: NotificationOptions) {
    const bridge = ensureBridge();
    if (!bridge) {
      return "";
    }
    return bridge.push(withDefaultOptions(options));
  },
  info(options: NotificationOptions | string) {
    return show("info", options);
  },
  success(options: NotificationOptions | string) {
    return show("success", options);
  },
  warn(options: NotificationOptions | string) {
    return show("warn", options);
  },
  error(options: NotificationOptions | string) {
    return show("error", options);
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
  config(config: NotificationFacadeConfig) {
    facadeConfig.placement = config.placement ?? facadeConfig.placement;
    facadeConfig.duration = config.duration ?? facadeConfig.duration;
    facadeConfig.closable = config.closable ?? facadeConfig.closable;
    facadeConfig.offset = config.offset ?? facadeConfig.offset;
  },
  resetConfig() {
    facadeConfig.placement = defaultConfig.placement;
    facadeConfig.duration = defaultConfig.duration;
    facadeConfig.closable = defaultConfig.closable;
    facadeConfig.offset = defaultConfig.offset;
  },
};
