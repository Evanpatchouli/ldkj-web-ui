import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type MobileOptionAlign = "left" | "center" | "right";

export type MobileDrawerProps = {
  open: boolean;
  title?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  confirmDisabled?: boolean;
  maxHeight?: number | string;
  children?: React.ReactNode;
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  onCancel?: () => void;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
};

export type MobileTriggerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  open?: boolean;
  clearable?: boolean;
  hasValue?: boolean;
  readOnly?: boolean;
  placeholder?: React.ReactNode;
  display?: React.ReactNode;
  class?: string;
  sx?: SxProps;
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type ControllableOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableValue<T>(options: ControllableOptions<T>) {
  const { value, defaultValue, onChange } = options;
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const mergedValue = controlled ? value : innerValue;

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!controlled) {
        setInnerValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [controlled, onChange],
  );

  return [mergedValue, setValue, controlled] as const;
}

export function useResolvedSx(sx: SxProps | undefined) {
  const theme = useSxTheme();
  return resolveSx(sx, theme);
}

export function resolveLength(value: number | string | undefined) {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function getAlignClass(align: MobileOptionAlign | undefined) {
  if (align === "center") return "justify-center text-center";
  if (align === "right") return "justify-end text-right";
  return "justify-start text-left";
}

export function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClearIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4.5 4.5L11.5 11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11.5 4.5L4.5 11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoadingSpinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
      aria-hidden="true"
    />
  );
}

export function MobileDrawer(props: MobileDrawerProps) {
  const {
    open,
    title,
    cancelText = "取消",
    confirmText = "确定",
    confirmDisabled = false,
    maxHeight = "76vh",
    children,
    className,
    class: legacyClass,
    style,
    sx,
    onCancel,
    onConfirm,
    onOpenChange,
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  React.useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel?.();
        onOpenChange?.(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel, onOpenChange, open]);

  if (!open) return null;

  const closeByCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="关闭选择面板"
        className="absolute inset-0 h-full w-full cursor-default border-0 bg-black/45 p-0"
        onClick={closeByCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "移动端选择面板"}
        className={cn(
          "absolute bottom-0 left-0 right-0 flex max-h-[76vh] flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(
          { maxHeight: resolveLength(maxHeight) },
          style,
          sxInlineStyle,
        )}
      >
        <div className="flex min-h-12 shrink-0 items-center gap-3 border-b border-slate-200 px-4">
          {title ? (
            <div className="min-w-0 flex-1 truncate text-left text-sm font-medium text-slate-900">
              {title}
            </div>
          ) : (
            <div className="min-w-0 flex-1" />
          )}

          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
              onClick={closeByCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:bg-blue-200"
              disabled={confirmDisabled}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export const MobileTrigger = React.forwardRef<HTMLButtonElement, MobileTriggerProps>(
  (props, ref) => {
    const {
      open = false,
      clearable = false,
      hasValue = false,
      placeholder = "请选择",
      display,
      className,
      class: legacyClass,
      style,
      sx,
      disabled,
      readOnly,
      onClear,
      ...restProps
    } = props;
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

    return (
      <span className="relative inline-flex w-full items-stretch">
        <button
          ref={ref}
          type="button"
          className={cn(
            "flex h-10 w-full min-w-0 items-center gap-2 rounded-md border border-solid border-slate-300 bg-white px-3 text-left text-sm text-slate-900 shadow-sm transition-colors",
            "focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:opacity-70",
            readOnly && "cursor-default",
            clearable && hasValue && !disabled && !readOnly ? "pr-16" : "pr-9",
            sxClassName,
            className,
            legacyClass,
          )}
          style={mergeSxStyle(style, sxInlineStyle)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          {...restProps}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              !hasValue && "text-slate-400",
            )}
          >
            {hasValue ? display : placeholder}
          </span>
          <ChevronDownIcon className="absolute right-3 h-4 w-4 text-slate-500" />
        </button>

        {clearable && hasValue && !disabled && !readOnly ? (
          <button
            type="button"
            className="absolute right-8 top-1/2 z-10 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
            aria-label="清除选择"
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClear?.(event);
            }}
          >
            <ClearIcon className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </span>
    );
  },
);

MobileTrigger.displayName = "MobileTrigger";
