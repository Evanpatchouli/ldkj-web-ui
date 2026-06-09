import * as React from "react";
import { cn } from "@/lib/utils";
import { Spin, type SpinProps } from "@/components/interact/spin";

export type LoadingVariant = "inline" | "block" | "overlay" | "fullscreen";

export type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Loading text. Set to null to hide text while keeping the spinner. */
  text?: React.ReactNode;
  /** Layout mode for inline hints, blocks, overlays, or full-screen masks. */
  variant?: LoadingVariant;
  /** Spinner size. Numbers are treated as px. */
  size?: SpinProps["size"];
  /** Spinner tone. */
  tone?: SpinProps["tone"];
  /** Set to false to hide loading state without unmounting wrapped children. */
  spinning?: boolean;
  /** Delay in ms before showing the loading indicator. */
  delay?: number;
  class?: string;
};

function useDelayedVisible(spinning: boolean, delay: number) {
  const [visible, setVisible] = React.useState(spinning && delay <= 0);

  React.useEffect(() => {
    if (!spinning) {
      setVisible(false);
      return;
    }

    if (delay <= 0) {
      setVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay, spinning]);

  return visible;
}

export function Loading(props: LoadingProps) {
  const {
    text = "加载中...",
    variant = "inline",
    size = 18,
    tone = "primary",
    spinning = true,
    delay = 0,
    children,
    className,
    class: legacyClass,
    ...rest
  } = props;
  const visible = useDelayedVisible(spinning, delay);

  const indicator = visible ? (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center justify-center gap-2 text-sm text-[color:var(--ldkj-color-muted-foreground)]",
        variant === "block" && "min-h-24 w-full",
        variant === "overlay" &&
          "absolute inset-0 z-10 bg-[color:color-mix(in_srgb,var(--ldkj-color-surface)_75%,transparent)] backdrop-blur-[1px]",
        variant === "fullscreen" &&
          "fixed inset-0 z-[var(--ldkj-z-modal)] bg-[color:color-mix(in_srgb,var(--ldkj-color-surface)_80%,transparent)] backdrop-blur-[1px]",
        className,
        legacyClass,
      )}
      {...rest}
    >
      <Spin size={size} tone={tone} />
      {text ? <span>{text}</span> : null}
    </div>
  ) : null;

  if (children) {
    return (
      <div className="relative" aria-busy={spinning || undefined}>
        {children}
        {variant === "overlay" || variant === "fullscreen" ? indicator : null}
      </div>
    );
  }

  if (!indicator) return null;

  return (
    <div className={cn(variant === "block" && "flex w-full justify-center")}>
      {indicator}
    </div>
  );
}
