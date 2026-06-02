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
        "h-[var(--ldkj-slider-track-size)] w-full cursor-pointer appearance-none rounded-full bg-transparent",
        "accent-sky-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/30",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "[&::-webkit-slider-thumb]:h-[var(--ldkj-slider-thumb-size)] [&::-webkit-slider-thumb]:w-[var(--ldkj-slider-thumb-size)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-sky-600 [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(2,132,199,0.28)]",
        "[&::-moz-range-thumb]:h-[var(--ldkj-slider-thumb-size)] [&::-moz-range-thumb]:w-[var(--ldkj-slider-thumb-size)] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-sky-600 [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(2,132,199,0.28)]",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        {
          "--ldkj-slider-fill": "rgb(2 132 199)",
          "--ldkj-slider-thumb-size": toCssSize(thumbSize, "1rem"),
          "--ldkj-slider-track": "rgb(226 232 240)",
          "--ldkj-slider-track-size": toCssSize(trackSize, "0.5rem"),
          "--ldkj-slider-percent": `${clampedPercent}%`,
          background:
            "linear-gradient(90deg, var(--ldkj-slider-fill) 0%, var(--ldkj-slider-fill) var(--ldkj-slider-percent), var(--ldkj-slider-track) var(--ldkj-slider-percent), var(--ldkj-slider-track) 100%)",
        } as React.CSSProperties,
        style,
        sxInlineStyle,
      )}
    />
  );
}

Slider.displayName = "Slider";
