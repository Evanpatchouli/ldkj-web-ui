import * as React from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle } from "@/styling";
import { Box, type BoxProps } from "../box";

export type SafeAreaPosition = "top" | "bottom" | "both" | "none";

type SafeAreaOwnProps = {
  position?: SafeAreaPosition;
  horizontal?: boolean;
};

export type SafeAreaProps = BoxProps<ElementType> & SafeAreaOwnProps;

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
export function SafeArea(props: SafeAreaProps) {
  const {
    component,
    position = "both",
    horizontal = false,
    sx,
    className,
    style,
    children,
    ...restProps
  } = props;
  const safeAreaStyle = resolveSafeAreaStyle(position, horizontal);

  return (
    <Box
      component={component}
      className={cn("box-border", className)}
      style={mergeSxStyle(style, safeAreaStyle)}
      sx={sx}
      {...restProps}
    >
      {children}
    </Box>
  );
}

export type SafeAreaTopProps = Omit<SafeAreaProps, "position">;
export type SafeAreaBottomProps = Omit<SafeAreaProps, "position">;

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
