import * as React from "react";
import { cn } from "@/lib/utils";

export type ProgressType = "line" | "circle";
export type ProgressStatus = "normal" | "success" | "warning" | "exception";

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
  showInfo?: boolean;
  type?: ProgressType;
  status?: ProgressStatus;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  trailColor?: string;
  format?: (percent: number, value: number, max: number) => React.ReactNode;
  class?: string;
};

const statusColorMap: Record<ProgressStatus, string> = {
  normal: "#2563eb",
  success: "#059669",
  warning: "#d97706",
  exception: "#e11d48",
};

function getPercent(value: number, max: number) {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

export function Progress(props: ProgressProps) {
  const {
    value = 0,
    max = 100,
    showInfo = false,
    type = "line",
    status,
    size = 96,
    strokeWidth = type === "circle" ? 8 : 8,
    strokeColor,
    trailColor = "#e2e8f0",
    format,
    className,
    class: legacyClass,
    ...rest
  } = props;
  const percent = getPercent(value, max);
  const activeStatus = status ?? (percent >= 100 ? "success" : "normal");
  const activeColor = strokeColor ?? statusColorMap[activeStatus];
  const info = format ? format(Math.round(percent), value, max) : `${Math.round(percent)}%`;

  if (type === "circle") {
    const normalizedStroke = Math.max(1, Math.min(48, strokeWidth));
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
        style={{ width: size, height: size }}
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
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-slate-700">
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
        style={{ height: strokeWidth, backgroundColor: trailColor }}
      >
        <div
          className="h-full transition-[width,background-color] duration-300 ease-out"
          style={{ width: `${percent}%`, backgroundColor: activeColor }}
        />
      </div>
      {showInfo ? <div className="mt-1 text-xs text-slate-500">{info}</div> : null}
    </div>
  );
}
