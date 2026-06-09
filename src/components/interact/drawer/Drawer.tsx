import * as React from "react";
import { cn } from "@/lib/utils";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  title?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  placement?: DrawerPlacement;
  className?: string;
  class?: string;
  overlayClassName?: string;
  bodyClassName?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  /** Enables slide/fade transitions. Set false when a test or host app needs instant state changes. */
  animated?: boolean;
  /** Transition duration in ms. */
  animationDuration?: number;
  /** Locks document scrolling while the drawer is open. */
  lockScroll?: boolean;
  /** Close when clicking the mask. */
  maskClosable?: boolean;
  /** Close when pressing Escape. */
  closeOnEsc?: boolean;
  /** Keep content mounted after close. */
  destroyOnClose?: boolean;
};

let lockCount = 0;
let originalBodyOverflow = "";

function lockBodyScroll() {
  if (typeof document === "undefined") return () => undefined;

  if (lockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  lockCount += 1;

  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = originalBodyOverflow;
    }
  };
}

function getPanelPosition(placement: DrawerPlacement) {
  switch (placement) {
    case "left":
      return {
        position: "left-0 top-0 h-full",
        open: "translate-x-0",
        closed: "-translate-x-full",
      };
    case "top":
      return {
        position: "left-0 top-0 w-full",
        open: "translate-y-0",
        closed: "-translate-y-full",
      };
    case "bottom":
      return {
        position: "bottom-0 left-0 w-full",
        open: "translate-y-0",
        closed: "translate-y-full",
      };
    case "right":
    default:
      return {
        position: "right-0 top-0 h-full",
        open: "translate-x-0",
        closed: "translate-x-full",
      };
  }
}

export function Drawer(props: DrawerProps) {
  const {
    open,
    title,
    width = 360,
    height = 320,
    placement = "right",
    className,
    class: legacyClass,
    overlayClassName,
    bodyClassName,
    footer,
    children,
    onOpenChange,
    animated = true,
    animationDuration = 220,
    lockScroll = true,
    maskClosable = true,
    closeOnEsc = true,
    destroyOnClose = true,
    role = "dialog",
    ...rest
  } = props;
  const [mounted, setMounted] = React.useState(open);
  const [visible, setVisible] = React.useState(open);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const panelPosition = getPanelPosition(placement);
  const isHorizontal = placement === "left" || placement === "right";

  React.useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);

    if (!animated) {
      if (destroyOnClose) setMounted(false);
      return;
    }

    const timer = window.setTimeout(() => {
      if (destroyOnClose) setMounted(false);
    }, animationDuration);

    return () => window.clearTimeout(timer);
  }, [animated, animationDuration, destroyOnClose, open]);

  React.useEffect(() => {
    if (!open || !lockScroll) return;
    return lockBodyScroll();
  }, [lockScroll, open]);

  React.useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange?.(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onOpenChange, open]);

  React.useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[var(--ldkj-z-drawer)]" aria-hidden={!visible}>
      <div
        className={cn(
          "absolute inset-0 bg-[color:var(--ldkj-color-overlay)]",
          animated && "transition-opacity ease-out",
          visible ? "opacity-100" : "opacity-0",
          overlayClassName,
        )}
        style={{ transitionDuration: animated ? `${animationDuration}ms` : "0ms" }}
        onClick={() => {
          if (maskClosable) onOpenChange?.(false);
        }}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role={role}
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={cn(
          "absolute flex max-h-full max-w-full flex-col bg-[color:var(--ldkj-color-surface)] text-[color:var(--ldkj-color-surface-foreground)] shadow-[var(--ldkj-shadow-modal)] outline-none",
          panelPosition.position,
          animated && "transition-transform ease-out will-change-transform",
          visible ? panelPosition.open : panelPosition.closed,
          className,
          legacyClass,
        )}
        style={{
          width: isHorizontal ? width : undefined,
          height: isHorizontal ? undefined : height,
          transitionDuration: animated ? `${animationDuration}ms` : "0ms",
        }}
        {...rest}
      >
        {title ? (
          <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--ldkj-color-border)] px-4 py-3">
            <div className="min-w-0 text-base font-medium text-[color:var(--ldkj-color-foreground)]">{title}</div>
            <button
              type="button"
              aria-label="Close drawer"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-[color:var(--ldkj-color-muted-foreground)] transition hover:bg-[color:var(--ldkj-color-accent)] hover:text-[color:var(--ldkj-color-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ldkj-color-ring)]"
              onClick={() => onOpenChange?.(false)}
            >
              x
            </button>
          </div>
        ) : null}
        <div className={cn("min-h-0 flex-1 overflow-auto p-4", bodyClassName)}>{children}</div>
        {footer ? (
          <div className="shrink-0 border-t border-[color:var(--ldkj-color-border)] px-4 py-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
