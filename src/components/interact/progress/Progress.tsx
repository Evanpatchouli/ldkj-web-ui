import * as React from "react";
import { cn } from "@/lib/utils";

export type ProgressType = "line" | "circle";
export type ProgressStatus = "normal" | "success" | "warning" | "exception";
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
  showInfo?: boolean;
  type?: ProgressType;
  status?: ProgressStatus;
  size?: ProgressSize;
  strokeWidth?: number;
  strokeColor?: string;
  trailColor?: string;
  format?: (percent: number, value: number, max: number) => React.ReactNode;
  class?: string;
};

const statusColorMap: Record<ProgressStatus, string> = {
  normal: "var(--ldkj-color-primary)",
  success: "var(--ldkj-color-success)",
  warning: "var(--ldkj-color-warning)",
  exception: "var(--ldkj-color-danger)",
};

const circleSizeMap: Record<Exclude<ProgressSize, number>, number> = {
  xs: 48,
  sm: 64,
  md: 96,
  lg: 120,
  xl: 144,
};

const lineSizeMap: Record<Exclude<ProgressSize, number>, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
};

function getPercent(value: number, max: number) {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

function resolveProgressSize(size: ProgressSize, type: ProgressType) {
  if (typeof size === "number") return size;
  return type === "circle" ? circleSizeMap[size] : lineSizeMap[size];
}

export function Progress(props: ProgressProps) {
  const {
    value = 0,
    max = 100,
    showInfo = false,
    type = "line",
    status,
    size = "md",
    strokeWidth,
    strokeColor,
    trailColor = "var(--ldkj-color-muted)",
    format,
    className,
    class: legacyClass,
    ...rest
  } = props;
  const percent = getPercent(value, max);
  const activeStatus = status ?? (percent >= 100 ? "success" : "normal");
  const activeColor = strokeColor ?? statusColorMap[activeStatus];
  const info = format ? format(Math.round(percent), value, max) : `${Math.round(percent)}%`;
  const resolvedSize = resolveProgressSize(size, type);
  const resolvedStrokeWidth = strokeWidth ?? (type === "circle" ? 8 : resolvedSize);

  if (type === "circle") {
    const normalizedStroke = Math.max(1, Math.min(48, resolvedStrokeWidth));
    const radius = 50 - normalizedStroke / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percent / 100);

    return (
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.max(0, Math.min(max, value))}
        className={cn("relative inline-flex items-center justify-center", className, legacyClass)}
        style={{ width: resolvedSize, height: resolvedSize }}
        {...rest}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={trailColor}
            strokeWidth={normalizedStroke}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeLinecap="round"
            strokeWidth={normalizedStroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset,stroke] duration-300 ease-out"
          />
        </svg>
        {showInfo ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[color:var(--ldkj-color-foreground)]">
            {info}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.max(0, Math.min(max, value))}
      className={cn("w-full", className, legacyClass)}
      {...rest}
    >
      <div
        className="w-full overflow-hidden rounded-full"
        style={{ height: resolvedStrokeWidth, backgroundColor: trailColor }}
      >
        <div
          className="h-full transition-[width,background-color] duration-300 ease-out"
          style={{ width: `${percent}%`, backgroundColor: activeColor }}
        />
      </div>
      {showInfo ? (
        <div className="mt-1 text-xs text-[color:var(--ldkj-color-muted-foreground)]">
          {info}
        </div>
      ) : null}
    </div>
  );
}
