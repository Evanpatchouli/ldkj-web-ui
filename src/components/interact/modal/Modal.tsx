import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type ModalBlur = boolean | number | string;

export type ModalProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "onClose" | "onOpen"
> & {
  open?: boolean;
  destroyOnClose?: boolean;
  closeOnMaskClick?: boolean;
  scrollable?: boolean;
  alpha?: number;
  blur?: ModalBlur;
  x?: string;
  y?: string;
  translateX?: string;
  translateY?: string;
  onClose?: () => void;
  onOpen?: () => void;
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  contentClassName?: string;
  contentClass?: string;
  contentStyle?: React.CSSProperties;
  contentSx?: SxProps;
};

function parseBlur(blur: ModalBlur | undefined) {
  if (blur === undefined || blur === null) return undefined;
  if (typeof blur === "boolean") return blur ? "blur(5px)" : undefined;
  if (typeof blur === "number") return `blur(${blur}px)`;
  return `blur(${blur})`;
}

/**
 * Modal 全屏遮罩容器，适用于轻量弹层和临时聚焦内容。
 */
export function Modal(props: ModalProps) {
  const {
    open = false,
    destroyOnClose = false,
    closeOnMaskClick = false,
    scrollable = false,
    alpha = 0.5,
    blur,
    x = "50%",
    y = "50%",
    translateX = "-50%",
    translateY = "-50%",
    onClose,
    onOpen,
    className,
    class: legacyClass,
    style,
    sx,
    contentClassName,
    contentClass,
    contentStyle,
    contentSx,
    children,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const { sxClassName: contentSxClassName, sxInlineStyle: contentSxInlineStyle } =
    resolveSx(contentSx, theme);
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      if (open) onOpen?.();
      else onClose?.();
      return;
    }
    didMountRef.current = true;
  }, [open, onClose, onOpen]);

  React.useEffect(() => {
    if (!open || scrollable) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, scrollable]);

  if (!open && destroyOnClose) {
    return null;
  }

  return (
    <div
      hidden={!open}
      className={cn("fixed inset-0 z-[9999]", sxClassName, className, legacyClass)}
      style={mergeSxStyle(
        {
          backgroundColor: `rgba(0, 0, 0, ${alpha})`,
          backdropFilter: parseBlur(blur),
          WebkitBackdropFilter: parseBlur(blur),
        },
        style,
        sxInlineStyle,
      )}
      onTouchStart={(event) => {
        if (!scrollable) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onClick={() => {
        if (closeOnMaskClick) {
          onClose?.();
        }
      }}
      {...restProps}
    >
      <div
        className={cn("absolute", contentSxClassName, contentClassName, contentClass)}
        style={mergeSxStyle(
          {
            left: x,
            top: y,
            transform: `translate(${translateX}, ${translateY})`,
          },
          contentStyle,
          contentSxInlineStyle,
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

Modal.displayName = "Modal";
