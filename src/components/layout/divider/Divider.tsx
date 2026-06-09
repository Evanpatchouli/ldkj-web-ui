import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type DividerVariant = "full" | "middle" | "inset";
export type DividerAlign = "center" | "left" | "right";

export type DividerProps = React.ComponentPropsWithoutRef<"div"> & {
  vertical?: boolean;
  variant?: DividerVariant;
  align?: DividerAlign;
  type?: React.CSSProperties["borderStyle"];
  color?: string;
  sx?: SxProps;
};

const horizontalVariantClass: Record<DividerVariant, string> = {
  full: "",
  middle: "px-4",
  inset: "pl-4",
};

const verticalVariantClass: Record<DividerVariant, string> = {
  full: "",
  middle: "py-4",
  inset: "pt-4",
};

export function Divider(props: DividerProps) {
  const {
    vertical = false,
    variant = "full",
    align = "center",
    type = "solid",
    color = "text-[color:var(--ldkj-color-border)]",
    sx,
    children,
    className,
    style,
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const mergedStyle = mergeSxStyle(style, sxInlineStyle);

  if (vertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "inline-flex min-h-6 self-stretch items-stretch text-[color:var(--ldkj-color-border)]",
          verticalVariantClass[variant],
          sxClassName,
          className,
        )}
        style={mergedStyle}
        {...restProps}
      >
        <span
          aria-hidden
          className={cn("border-l border-current", color)}
          style={{ borderStyle: type }}
        />
      </div>
    );
  }

  const hasChildren = children !== undefined && children !== null;
  const beforeLineClass =
    align === "left" ? "w-8 flex-none" : align === "right" ? "flex-1" : "flex-1";
  const afterLineClass =
    align === "right" ? "w-8 flex-none" : align === "left" ? "flex-1" : "flex-1";

  if (!hasChildren) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          "w-full text-[color:var(--ldkj-color-border)]",
          horizontalVariantClass[variant],
          sxClassName,
          className,
        )}
        style={mergedStyle}
        {...restProps}
      >
        <span
          aria-hidden
          className={cn("block w-full border-t border-current", color)}
          style={{ borderStyle: type }}
        />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-center text-[color:var(--ldkj-color-border)]",
        horizontalVariantClass[variant],
        sxClassName,
        className,
      )}
      style={mergedStyle}
      {...restProps}
    >
      <span
        aria-hidden
        className={cn(beforeLineClass, "border-t border-current", color)}
        style={{ borderStyle: type }}
      />
      <span className="shrink-0 px-3 text-[color:var(--ldkj-color-muted-foreground)]">{children}</span>
      <span
        aria-hidden
        className={cn(afterLineClass, "border-t border-current", color)}
        style={{ borderStyle: type }}
      />
    </div>
  );
}

Divider.displayName = "Divider";
