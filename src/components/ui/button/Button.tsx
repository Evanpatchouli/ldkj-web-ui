import * as React from "react";
import type { ElementType } from "react";
import { buttonVariants, type ButtonVariants } from "./variants";
import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export type ButtonProps<T extends ElementType = "button"> =
  PolymorphicProps<T> & ButtonVariants;

export function Button<T extends ElementType = "button">(
  props: ButtonProps<T>,
) {
  const {
    component,
    variant,
    size,
    bounce,
    splash,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const Comp = (component ?? "button") as ElementType;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, bounce, splash }),
        className,
        legacyClass,
      )}
      {...restProps}
    />
  );
}

Button.displayName = "Button";
