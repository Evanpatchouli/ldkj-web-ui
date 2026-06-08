import type * as React from "react";

export type NotificationType = "info" | "success" | "warn" | "error";

export type NotificationPlacement =
  | "rightTop"
  | "rightBottom"
  | "leftTop"
  | "leftBottom"
  | "center";

export type NotificationOffset =
  | number
  | {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

export type NotificationCustomSvg = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export type NotificationIconOption =
  | string
  | {
      svg?: NotificationCustomSvg;
      src?: string;
    };

export interface NotificationOptions {
  id?: string;
  message: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  duration?: number;
  placement?: NotificationPlacement;
  offset?: NotificationOffset;
  closable?: boolean;
  icon?: NotificationIconOption;
  iconColor?: string;
  onClose?: () => void;
}

export interface NotificationCreateInput extends NotificationOptions {
  type?: NotificationType;
}

export type NotificationShortcutInput = string | NotificationOptions;

export interface NotificationContextValue {
  push: (input: NotificationCreateInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}
