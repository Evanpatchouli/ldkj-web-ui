import * as React from "react";
import type { ElementType } from "react";
import { chipVariants, type ChipRounded, type ChipVariants } from "./variants";
import { resolveRounded } from "../shared/rounded";
import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type ChipOwnProps = Omit<ChipVariants, "rounded"> & {
  rounded?: ChipRounded;
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
    style,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const Comp = (component ?? "span") as ElementType;
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);

  return (
    <Comp
      className={cn(
        chipVariants({ variant, outline, size, rounded: roundedPreset }),
        className,
        legacyClass,
      )}
      style={{ ...style, ...roundedStyle }}
      {...restProps}
    />
  );
}

Chip.displayName = "Chip";
