import * as React from "react";
import { cn } from "@/lib/utils";

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
  showInfo?: boolean;
  class?: string;
};

export function Progress(props: ProgressProps) {
  const { value = 0, max = 100, showInfo = false, className, class: legacyClass, ...rest } = props;
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className, legacyClass)} {...rest}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full bg-blue-600 transition-all" style={{ width: `${percent}%` }} />
      </div>
      {showInfo ? <div className="mt-1 text-xs text-slate-500">{Math.round(percent)}%</div> : null}
    </div>
  );
}