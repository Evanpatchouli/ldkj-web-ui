import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type RateSize = "sm" | "md" | "lg";

export type RateProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "onChange"
> & {
  /** 受控评分值。 */
  value?: number;
  /** 非受控默认评分值。 */
  defaultValue?: number;
  /** 星级总数，最小为 `1`。 */
  count?: number;
  /** 是否允许再次点击当前值后清空。 */
  allowClear?: boolean;
  /** 是否移除外层边框与背景。 */
  borderless?: boolean;
  /** 是否禁用。 */
  disabled?: boolean;
  /** 是否只读。只读时保留展示，不响应交互。 */
  readOnly?: boolean;
  /** 与原生表单联动的字段名。 */
  name?: string;
  /** 评分变更回调。 */
  onChange?: (value: number) => void;
  /** 鼠标悬停预览值变更回调。 */
  onHoverChange?: (value: number | null) => void;
  /** 星星尺寸。 */
  size?: RateSize;
  /** 评分图标。 */
  character?: React.ReactNode;
  /** 根节点类名。 */
  className?: string;
  /** 兼容旧写法的类名。 */
  class?: string;
  /** 根节点样式。 */
  style?: React.CSSProperties;
  /** CSS-in-JS 样式入口。 */
  sx?: SxProps;
};

const sizeClasses: Record<RateSize, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

const iconSizes: Record<RateSize, string> = {
  sm: "h-4 w-4",
  md: "h-[18px] w-[18px]",
  lg: "h-5 w-5",
};

function clampRating(value: number, count: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(count, Math.round(value)));
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill="currentColor"
      />
    </svg>
  );
}

type RateStarProps = {
  fill: number;
  size: RateSize;
  active: boolean;
  preview: boolean;
  disabled?: boolean;
  tabIndex: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onFocus: React.FocusEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onMouseEnter: React.MouseEventHandler<HTMLButtonElement>;
  setRef: (node: HTMLButtonElement | null) => void;
  label: string;
  character?: React.ReactNode;
};

function RateStar(props: RateStarProps) {
  const {
    fill,
    size,
    active,
    preview,
    disabled,
    tabIndex,
    onClick,
    onFocus,
    onKeyDown,
    onMouseEnter,
    setRef,
    label,
    character,
  } = props;

  const icon = character ?? <StarIcon className={iconSizes[size]} />;

  return (
    <button
      ref={setRef}
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={label}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full outline-none transition",
        "focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]/35 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        preview ? "scale-[1.03]" : "scale-100",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex items-center justify-center transition-colors",
          preview ? "text-[color:var(--ldkj-color-warning)]/70" : "text-[color:var(--ldkj-color-warning)]",
        )}
      >
        <span className="text-[color:var(--ldkj-color-border)]">{icon}</span>
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fill}%` }}
        >
          <span className="text-current">{icon}</span>
        </span>
      </span>
    </button>
  );
}

/**
 * Rate 用于星级评分、满意度打分和快速反馈场景，支持受控/非受控、悬停预览、键盘操作与表单提交。
 */
export const Rate = React.forwardRef<HTMLDivElement, RateProps>((props, ref) => {
  const {
    value,
    defaultValue = 0,
    count = 5,
    allowClear = true,
    borderless = false,
    disabled = false,
    readOnly = false,
    name,
    onChange,
    onHoverChange,
    size = "md",
    character,
    className,
    class: legacyClass,
    style,
    sx,
    onMouseLeave,
    onKeyDown,
    ...divProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const isControlled = value !== undefined;
  const safeCount = Math.max(1, Math.floor(count || 1));
  const [innerValue, setInnerValue] = React.useState(() =>
    clampRating(defaultValue, safeCount),
  );
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const currentValue = clampRating(isControlled ? value ?? 0 : innerValue, safeCount);
  const displayValue = hoverValue ?? currentValue;
  const rootId = React.useId();

  const commitValue = React.useCallback(
    (nextValue: number) => {
      if (disabled || readOnly) {
        return;
      }

      const normalizedValue = clampRating(nextValue, safeCount);
      const resolvedValue =
        allowClear && normalizedValue === currentValue ? 0 : normalizedValue;

      if (!isControlled) {
        setInnerValue(resolvedValue);
      }

      onChange?.(resolvedValue);
    },
    [allowClear, currentValue, disabled, isControlled, onChange, readOnly, safeCount],
  );

  const clearHover = React.useCallback(() => {
    setHoverValue(null);
    onHoverChange?.(null);
  }, [onHoverChange]);

  const focusStar = React.useCallback((index: number) => {
    buttonRefs.current[index]?.focus();
  }, []);

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    clearHover();
    onMouseLeave?.(event);
  };

  const handleKeyDownItem = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const rootKeyDown = onKeyDown as
      | React.KeyboardEventHandler<HTMLButtonElement>
      | undefined;

    rootKeyDown?.(event);

    if (event.defaultPrevented || disabled || readOnly) {
      return;
    }

    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowDown" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }

    event.preventDefault();

    if (event.key === "Home") {
      clearHover();
      focusStar(0);
      commitValue(0);
      return;
    }

    if (event.key === "End") {
      clearHover();
      focusStar(safeCount - 1);
      commitValue(safeCount);
      return;
    }

    const direction = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : -1;
    const nextIndex = Math.max(0, Math.min(safeCount - 1, index + direction));

    clearHover();
    focusStar(nextIndex);
    commitValue(nextIndex + 1);
  };

  return (
    <div
      {...divProps}
      ref={ref}
      role="radiogroup"
      aria-label={divProps["aria-label"] ?? "评分"}
      aria-readonly={readOnly || undefined}
      data-disabled={disabled ? "" : undefined}
      data-borderless={borderless ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      data-size={size}
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 transition-colors",
        borderless
          ? "border-0 bg-transparent shadow-none"
          : "border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] shadow-sm",
        !borderless && !disabled ? "hover:border-[color:var(--ldkj-color-input)]" : undefined,
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      onMouseLeave={handleMouseLeave}
    >
      {name ? <input type="hidden" name={name} value={String(currentValue)} /> : null}
      {Array.from({ length: safeCount }).map((_, index) => {
        const current = index + 1;
        const filled = Math.max(0, Math.min(1, displayValue - index)) * 100;
        const active = currentValue === current;
        const preview = hoverValue !== null;

        return (
          <RateStar
            key={`${rootId}-${current}`}
            fill={filled}
            size={size}
            active={active}
            preview={preview && current <= displayValue}
            disabled={disabled || readOnly}
            tabIndex={currentValue === 0 ? (index === 0 ? 0 : -1) : active ? 0 : -1}
            label={`选择 ${current} 星`}
            character={character}
            setRef={(node) => {
              buttonRefs.current[index] = node;
            }}
            onClick={() => {
              clearHover();
              commitValue(current);
            }}
            onFocus={() => {
              if (disabled || readOnly) {
                return;
              }
              clearHover();
            }}
            onKeyDown={(event) => handleKeyDownItem(event, index)}
            onMouseEnter={() => {
              if (disabled || readOnly) {
                return;
              }
              setHoverValue(current);
              onHoverChange?.(current);
            }}
          />
        );
      })}
    </div>
  );
});

Rate.displayName = "Rate";
