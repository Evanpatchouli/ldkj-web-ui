import * as React from "react";
import {
  resolveRounded,
  roundedPresetClasses,
  type Rounded,
} from "@/components/shared/rounded";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type SkeletonVariant = "text" | "rect" | "circle";
export type SkeletonSize = number | string;

export type SkeletonProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  className?: string;
  class?: string;
  sx?: SxProps;
  rounded?: Rounded;
  width?: SkeletonSize;
  height?: SkeletonSize;
  inline?: boolean;
  animated?: boolean;
  variant?: SkeletonVariant;
};

export type SkeletonTextProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  className?: string;
  class?: string;
  sx?: SxProps;
  rounded?: Rounded;
  width?: SkeletonSize;
  inline?: boolean;
  animated?: boolean;
  rows?: number;
  rowHeight?: SkeletonSize;
  gap?: SkeletonSize;
  widths?: SkeletonSize[];
};

export type SkeletonAvatarProps = Omit<
  SkeletonProps,
  "children" | "variant" | "width" | "height"
> & {
  size?: SkeletonSize;
};

export type SkeletonButtonProps = Omit<
  SkeletonProps,
  "children" | "variant"
>;

export type SkeletonCardProps = Omit<
  SkeletonProps,
  "children" | "variant" | "height"
> & {
  showAvatar?: boolean;
  rows?: number;
};

const variantClass: Record<SkeletonVariant, string> = {
  text: "origin-left rounded-sm",
  rect: "",
  circle: "rounded-full",
};

function toCssSize(value: SkeletonSize | undefined) {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

function resolveDefaultSize(
  variant: SkeletonVariant,
  width?: SkeletonSize,
  height?: SkeletonSize,
) {
  if (variant === "circle") {
    return {
      width: toCssSize(width ?? height ?? 40),
      height: toCssSize(height ?? width ?? 40),
    };
  }

  if (variant === "text") {
    return {
      width: toCssSize(width ?? "100%"),
      height: toCssSize(height ?? "1em"),
    };
  }

  return {
    width: toCssSize(width),
    height: toCssSize(height),
  };
}

function getTextLineWidth(
  index: number,
  rows: number,
  widths: SkeletonSize[] | undefined,
  inheritedWidth: SkeletonSize | undefined,
) {
  if (widths?.[index] !== undefined) return widths[index];
  if (rows > 1 && index === rows - 1) return "68%";
  return inheritedWidth ?? "100%";
}

/**
 * Skeleton renders a neutral placeholder block for content that is still loading.
 */
export function Skeleton(props: SkeletonProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    rounded,
    width,
    height,
    inline = false,
    animated = true,
    variant = "rect",
    role,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { roundedPreset, roundedStyle } = resolveRounded(
    rounded ?? (variant === "circle" ? "full" : variant === "rect" ? "md" : "sm"),
  );
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const sizeStyle = resolveDefaultSize(variant, width, height);

  return (
    <div
      role={role ?? "status"}
      aria-live="polite"
      aria-label={props["aria-label"] ?? "Loading"}
      className={cn(
        "skeleton bg-gray-200",
        inline ? "inline-block align-middle" : "block",
        animated && "animate-pulse",
        variantClass[variant],
        roundedPreset && roundedPresetClasses[roundedPreset],
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sizeStyle, roundedStyle, sxInlineStyle)}
      {...restProps}
    />
  );
}

/**
 * SkeletonText renders one or more text-like loading rows.
 */
export function SkeletonText(props: SkeletonTextProps) {
  const {
    rows = 3,
    rowHeight = "0.875rem",
    gap = 8,
    widths,
    width,
    sx,
    style,
    className,
    class: legacyClass,
    rounded,
    animated,
    inline = false,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const safeRows = Math.max(1, Math.floor(rows));

  return (
    <div
      className={cn(
        "skeleton-text flex-col",
        inline ? "inline-flex align-middle" : "flex",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        style,
        { gap: toCssSize(gap), width: toCssSize(width) },
        sxInlineStyle,
      )}
      {...restProps}
    >
      {Array.from({ length: safeRows }).map((_, index) => (
        <Skeleton
          key={index}
          {...restProps}
          animated={animated}
          rounded={rounded}
          variant="text"
          width={getTextLineWidth(index, safeRows, widths, width)}
          height={rowHeight}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonAvatar renders a circular placeholder for user or object avatars.
 */
export function SkeletonAvatar(props: SkeletonAvatarProps) {
  const { size = 40, ...restProps } = props;
  return <Skeleton {...restProps} variant="circle" width={size} height={size} />;
}

/**
 * SkeletonButton renders a rounded placeholder sized like a common button.
 */
export function SkeletonButton(props: SkeletonButtonProps) {
  const { width = 96, height = 36, rounded = "md", ...restProps } = props;
  return (
    <Skeleton
      {...restProps}
      variant="rect"
      width={width}
      height={height}
      rounded={rounded}
    />
  );
}

/**
 * SkeletonCard renders a compact card loading layout composed from Skeleton parts.
 */
export function SkeletonCard(props: SkeletonCardProps) {
  const {
    showAvatar = true,
    rows = 3,
    width,
    animated = true,
    rounded = "lg",
    className,
    class: legacyClass,
    style,
    sx,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <div
      className={cn(
        "skeleton-card border border-gray-200 bg-white p-4",
        roundedPreset && roundedPresetClasses[roundedPreset],
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        style,
        { width: toCssSize(width) },
        roundedStyle,
        sxInlineStyle,
      )}
      {...restProps}
    >
      <div className="flex items-start gap-3">
        {showAvatar ? <SkeletonAvatar animated={animated} size={40} /> : null}
        <div className="min-w-0 flex-1">
          <SkeletonText
            animated={animated}
            rows={rows}
            widths={["56%", "100%", "76%"]}
          />
        </div>
      </div>
    </div>
  );
}

Skeleton.displayName = "Skeleton";
SkeletonText.displayName = "SkeletonText";
SkeletonAvatar.displayName = "SkeletonAvatar";
SkeletonButton.displayName = "SkeletonButton";
SkeletonCard.displayName = "SkeletonCard";
