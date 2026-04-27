import * as React from "react";
import type { CSSProperties, ElementType } from "react";
import { Button, type ButtonProps } from "../button";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";

const ghostButtonSizeClasses = {
  xs: "h-8 w-8 text-xs",
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-14 w-14 text-lg",
  xl: "h-16 w-16 text-xl",
} as const;

type GhostButtonSizePreset = keyof typeof ghostButtonSizeClasses;
export type GhostButtonSize = GhostButtonSizePreset | number | string;

type GhostButtonPositionProps = Pick<
  CSSProperties,
  "position" | "left" | "top" | "right" | "bottom" | "zIndex"
>;

export type GhostButtonProps<T extends ElementType = "button"> = Omit<
  ButtonProps<T>,
  "size"
> &
  GhostButtonPositionProps & {
    size?: GhostButtonSize;
  };

function resolveGhostButtonSize(size: GhostButtonSize | undefined): {
  sizeClassName?: string;
  sizeStyle?: CSSProperties;
} {
  if (size === undefined) {
    return {
      sizeClassName: ghostButtonSizeClasses.md,
    };
  }

  if (typeof size === "string" && size in ghostButtonSizeClasses) {
    return {
      sizeClassName:
        ghostButtonSizeClasses[size as keyof typeof ghostButtonSizeClasses],
    };
  }

  const squareSize = typeof size === "number" ? `${size}px` : size;

  return {
    sizeStyle: {
      width: squareSize,
      height: squareSize,
    },
  };
}

export function GhostButton<T extends ElementType = "button">(
  props: GhostButtonProps<T>,
) {
  const {
    component,
    size = "md",
    position = "fixed",
    left,
    top,
    right = 16,
    bottom = 16,
    zIndex,
    rounded = "full",
    className,
    style,
    ...restProps
  } = props;
  const { sizeClassName, sizeStyle } = resolveGhostButtonSize(size);
  const buttonProps = {
    ...restProps,
    component,
    size: "icon",
    rounded,
    className: cn("shrink-0 overflow-hidden p-0", sizeClassName, className),
    style: mergeSxStyle(
      {
        position,
        left,
        top,
        right,
        bottom,
        zIndex,
      },
      sizeStyle,
      style,
    ),
  } as unknown as ButtonProps<T>;

  return (
    <Button {...buttonProps} />
  );
}

GhostButton.displayName = "GhostButton";
