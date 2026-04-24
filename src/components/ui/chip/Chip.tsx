import * as React from "react";
import type { ElementType } from "react";
import { chipVariants, type ChipRounded, type ChipVariants } from "./variants";
import { resolveRounded } from "../shared/rounded";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type ChipOwnProps = Omit<ChipVariants, "rounded"> & {
  rounded?: ChipRounded;
  sx?: SxProps;
};

export type ChipProps<T extends ElementType = "span"> =
  PolymorphicProps<T> & ChipOwnProps;

export function Chip<T extends ElementType = "span">(props: ChipProps<T>) {
  const {
    component,
    variant,
    outline,
    size,
    rounded,
    sx,
    style,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const Comp = (component ?? "span") as ElementType;
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return (
    <Comp
      className={cn(
        chipVariants({ variant, outline, size, rounded: roundedPreset }),
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, roundedStyle, sxInlineStyle)}
      {...restProps}
    />
  );
}

Chip.displayName = "Chip";
