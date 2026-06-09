import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type SliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  value?: number;
  class?: string;
  /**
   * 视觉变体。
   * - `"solid"`：纯色风格，与组件库整体风格统一（默认）
   * - `"gradient"`：渐变色风格，提供更丰富的视觉效果
   */
  variant?: "solid" | "gradient";
  /**
   * 轨道粗细。数字会自动转换为 px，字符串会作为 CSS 长度值透传。
   */
  trackSize?: number | string;
  /**
   * 滑块头尺寸。数字会自动转换为 px，字符串会作为 CSS 长度值透传。
   */
  thumbSize?: number | string;
  sx?: SxProps;
  onValueChange?: (value: number) => void;
};

function toNumber(value: string | number | readonly string[] | undefined) {
  if (Array.isArray(value)) {
    return Number(value[0] ?? 0);
  }

  return Number(value ?? 0);
}

function toFiniteNumber(value: string | number | undefined, fallback: number) {
  const nextValue = Number(value);

  return Number.isFinite(nextValue) ? nextValue : fallback;
}

function toCssSize(value: number | string | undefined, fallback: string) {
  if (value === undefined) {
    return fallback;
  }

  return typeof value === "number" ? `${value}px` : value;
}

/** 各 variant 对应的 CSS 变量值 */
const variantStyles = {
  solid: {
    "--ldkj-slider-fill": "var(--ldkj-color-primary)",
    "--ldkj-slider-fill-end": "var(--ldkj-color-primary)",
    "--ldkj-slider-focus-ring": "var(--ldkj-color-ring)",
    "--ldkj-slider-thumb": "var(--ldkj-color-primary)",
    "--ldkj-slider-thumb-ring": "color-mix(in srgb, var(--ldkj-color-primary) 18%, transparent)",
    "--ldkj-slider-track": "var(--ldkj-color-muted)",
    "--ldkj-slider-track-shadow": "inset 0 1px 2px rgb(15 23 42 / 10%)",
    "--ldkj-slider-thumb-shadow":
      "0 0 0 3px var(--ldkj-slider-thumb-ring), 0 4px 12px -2px rgba(0,0,0,0.12)",
    "--ldkj-slider-thumb-shadow-hover":
      "0 0 0 5px var(--ldkj-slider-thumb-ring), 0 6px 20px -4px rgba(0,0,0,0.16)",
  },
  gradient: {
    "--ldkj-slider-fill": "var(--ldkj-color-secondary)",
    "--ldkj-slider-fill-end": "var(--ldkj-color-primary)",
    "--ldkj-slider-focus-ring": "var(--ldkj-color-ring)",
    "--ldkj-slider-thumb":
      "linear-gradient(145deg, var(--ldkj-color-secondary) 0%, var(--ldkj-color-primary) 72%, var(--ldkj-color-primary-hover) 100%)",
    "--ldkj-slider-thumb-ring": "color-mix(in srgb, var(--ldkj-color-secondary) 16%, transparent)",
    "--ldkj-slider-track": "var(--ldkj-color-muted)",
    "--ldkj-slider-track-shadow": "inset 0 1px 2px rgb(15 23 42 / 16%)",
    "--ldkj-slider-thumb-shadow":
      "0 0 0 5px var(--ldkj-slider-thumb-ring), 0 10px 24px -10px rgba(14,116,144,0.9)",
    "--ldkj-slider-thumb-shadow-hover":
      "0 0 0 7px var(--ldkj-slider-thumb-ring), 0 14px 28px -12px rgba(14,116,144,0.95)",
  },
} as const;

/**
 * Slider 是原生 range 输入的封装，保留浏览器原生交互语义，
 * 同时提供更符合本库风格的视觉样式与数值回调。
 */
export function Slider(props: SliderProps) {
  const {
    className,
    class: legacyClass,
    defaultValue,
    max,
    min,
    style,
    sx,
    thumbSize,
    trackSize,
    value,
    variant = "solid",
    onValueChange,
    ...rest
  } = props;

  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    toNumber(defaultValue),
  );

  const currentValue = isControlled ? value : uncontrolledValue;
  const resolvedMin = toFiniteNumber(min as string | number | undefined, 0);
  const resolvedMax = toFiniteNumber(max as string | number | undefined, 100);
  const resolvedValue = Number.isFinite(currentValue) ? currentValue : resolvedMin;
  const percent =
    resolvedMax > resolvedMin
      ? ((resolvedValue - resolvedMin) / (resolvedMax - resolvedMin)) * 100
      : 0;
  const clampedPercent = Math.max(0, Math.min(100, percent));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.currentTarget.value);

    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <input
      {...rest}
      type="range"
      {...(isControlled ? { value } : { defaultValue })}
      min={min}
      max={max}
      onChange={handleChange}
      className={cn(
        "h-[var(--ldkj-slider-track-size)] w-full cursor-pointer appearance-none rounded-full border border-white/70 bg-transparent align-middle",
        "accent-[var(--ldkj-slider-fill-end)] shadow-[var(--ldkj-slider-track-shadow),0_1px_0_rgba(255,255,255,0.88)]",
        "transition-[filter,opacity,box-shadow] duration-200 ease-out hover:brightness-105",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ldkj-slider-focus-ring)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-55 disabled:grayscale",
        "[&::-webkit-slider-thumb]:h-[var(--ldkj-slider-thumb-size)] [&::-webkit-slider-thumb]:w-[var(--ldkj-slider-thumb-size)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:[background:var(--ldkj-slider-thumb)] [&::-webkit-slider-thumb]:shadow-[var(--ldkj-slider-thumb-shadow),inset_0_1px_0_rgba(255,255,255,0.55)] [&::-webkit-slider-thumb]:transition-[transform,box-shadow,filter] [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:ease-out",
        "hover:[&::-webkit-slider-thumb]:scale-110 hover:[&::-webkit-slider-thumb]:shadow-[var(--ldkj-slider-thumb-shadow-hover),inset_0_1px_0_rgba(255,255,255,0.65)] active:[&::-webkit-slider-thumb]:scale-95",
        "[&::-moz-range-thumb]:h-[var(--ldkj-slider-thumb-size)] [&::-moz-range-thumb]:w-[var(--ldkj-slider-thumb-size)] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:[background:var(--ldkj-slider-thumb)] [&::-moz-range-thumb]:shadow-[var(--ldkj-slider-thumb-shadow),inset_0_1px_0_rgba(255,255,255,0.55)] [&::-moz-range-thumb]:transition-[transform,box-shadow,filter] [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:ease-out",
        "hover:[&::-moz-range-thumb]:scale-110 hover:[&::-moz-range-thumb]:shadow-[var(--ldkj-slider-thumb-shadow-hover),inset_0_1px_0_rgba(255,255,255,0.65)] active:[&::-moz-range-thumb]:scale-95",
        "[&::-moz-range-track]:h-[var(--ldkj-slider-track-size)] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        {
          ...(variantStyles[variant] as Record<string, string>),
          "--ldkj-slider-thumb-size": toCssSize(thumbSize, "1.05rem"),
          "--ldkj-slider-track-size": toCssSize(trackSize, "0.4rem"),
          "--ldkj-slider-percent": `${clampedPercent}%`,
          background:
            "linear-gradient(90deg, var(--ldkj-slider-fill) 0%, var(--ldkj-slider-fill-end) var(--ldkj-slider-percent), transparent var(--ldkj-slider-percent), transparent 100%), linear-gradient(180deg, rgba(255,255,255,0.86), rgba(148,163,184,0.22)), var(--ldkj-slider-track)",
        } as React.CSSProperties,
        style,
        sxInlineStyle,
      )}
    />
  );
}

Slider.displayName = "Slider";
