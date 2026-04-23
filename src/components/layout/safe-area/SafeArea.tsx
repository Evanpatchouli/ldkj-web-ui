import * as React from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export type SafeAreaPosition = "top" | "bottom" | "both" | "none";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type SafeAreaOwnProps = {
  position?: SafeAreaPosition;
  horizontal?: boolean;
};

export type SafeAreaProps<T extends ElementType = "div"> = PolymorphicProps<T> &
  SafeAreaOwnProps;

function resolveSafeAreaStyle(
  position: SafeAreaPosition,
  horizontal: boolean,
): React.CSSProperties {
  const includeTop = position === "top" || position === "both";
  const includeBottom = position === "bottom" || position === "both";

  return {
    paddingTop: includeTop ? "env(safe-area-inset-top, 0px)" : undefined,
    paddingBottom: includeBottom
      ? "env(safe-area-inset-bottom, 0px)"
      : undefined,
    paddingLeft: horizontal ? "env(safe-area-inset-left, 0px)" : undefined,
    paddingRight: horizontal ? "env(safe-area-inset-right, 0px)" : undefined,
  };
}

/**
 * SafeArea 用于适配移动端刘海屏，灵动岛和手势区域等的安全区容器。
 */
export function SafeArea<T extends ElementType = "div">(
  props: SafeAreaProps<T>,
) {
  const {
    component,
    position = "both",
    horizontal = false,
    className,
    style,
    children,
    ...restProps
  } = props;
  const Comp = (component ?? "div") as ElementType;

  return (
    <Comp
      className={cn("box-border", className)}
      style={{ ...style, ...resolveSafeAreaStyle(position, horizontal) }}
      {...restProps}
    >
      {children}
    </Comp>
  );
}

export type SafeAreaTopProps = Omit<SafeAreaProps<ElementType>, "position">;
export type SafeAreaBottomProps = Omit<SafeAreaProps<ElementType>, "position">;

/**
 * SafeAreaTop 仅应用顶部安全区内边距。
 */
export function SafeAreaTop(props: SafeAreaTopProps) {
  return <SafeArea {...props} position="top" />;
}

/**
 * SafeAreaBottom 仅应用底部安全区内边距。
 */
export function SafeAreaBottom(props: SafeAreaBottomProps) {
  return <SafeArea {...props} position="bottom" />;
}

SafeArea.displayName = "SafeArea";
SafeAreaTop.displayName = "SafeAreaTop";
SafeAreaBottom.displayName = "SafeAreaBottom";
