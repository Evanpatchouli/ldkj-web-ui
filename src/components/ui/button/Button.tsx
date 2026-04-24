import * as React from "react";
import type { ElementType } from "react";
import {
  buttonVariants,
  type ButtonRounded,
  type ButtonVariants,
} from "./variants";
import { resolveRounded } from "../shared/rounded";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type ButtonOwnProps = Omit<ButtonVariants, "rounded"> & {
  rounded?: ButtonRounded;
  sx?: SxProps;
};

export type ButtonProps<T extends ElementType = "button"> =
  PolymorphicProps<T> & ButtonOwnProps;

export function Button<T extends ElementType = "button">(
  props: ButtonProps<T>,
) {
  const {
    component,
    variant,
    size,
    rounded,
    bounce,
    splash,
    sx,
    style,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const Comp = (component ?? "button") as ElementType;
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, rounded: roundedPreset, bounce, splash }),
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, roundedStyle, sxInlineStyle)}
      {...restProps}
    />
  );
}

Button.displayName = "Button";
