export type ToastType = "info" | "success" | "warn" | "error";
export type ToastCustomSvg = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export type ToastIconOption =
  | string
  | {
      svg?: ToastCustomSvg;
      src?: string;
    };

export type ToastPlacement =
  | "top"
  | "bottom"
  | "leftTop"
  | "rightTop"
  | "leftBottom"
  | "rightBottom"
  | "center";

export interface ToastOptions {
  id?: string;
  duration?: number;
  placement?: ToastPlacement;
  closable?: boolean;
  icon?: ToastIconOption;
  iconColor?: string;
}

export interface ToastCreateInput extends ToastOptions {
  type?: ToastType;
  message: string;
}

export interface ToastContextValue {
  push: (input: ToastCreateInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}
