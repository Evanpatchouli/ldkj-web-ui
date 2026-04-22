import * as React from "react";
import type { ElementType } from "react";
import { chipVariants, type ChipVariants } from "./variants";
import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export type ChipProps<T extends ElementType = "span"> =
  PolymorphicProps<T> & ChipVariants;

export function Chip<T extends ElementType = "span">(props: ChipProps<T>) {
  const {
    component,
    variant,
    outline,
    size,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const Comp = (component ?? "span") as ElementType;

  return (
    <Comp
      className={cn(
        chipVariants({ variant, outline, size }),
        className,
        legacyClass,
      )}
      {...restProps}
    />
  );
}

Chip.displayName = "Chip";
