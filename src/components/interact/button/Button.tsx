import * as React from "react";
import type { ElementType } from "react";
import {
  buttonVariants,
  type ButtonRounded,
  type ButtonShadow,
  type ButtonVariants,
} from "./variants";
import { resolveRounded } from "@/components/shared/rounded";
import { resolveShadow } from "@/components/shared/shadow";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type ButtonOwnProps = Omit<ButtonVariants, "rounded" | "shadow"> & {
  rounded?: ButtonRounded;
  shadow?: ButtonShadow;
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
    shadow,
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
  const { shadowPreset, shadowStyle } = resolveShadow(shadow);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          rounded: roundedPreset,
          shadow: shadowPreset,
          bounce,
          splash,
        }),
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, roundedStyle, shadowStyle, sxInlineStyle)}
      {...restProps}
    />
  );
}

Button.displayName = "Button";
