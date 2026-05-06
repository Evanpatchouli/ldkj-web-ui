import * as React from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type ScrollBehavior = "smooth" | "instant" | "auto";
type ScrollLogicalPosition = "start" | "center" | "end" | "nearest";

type AnchorCommonProps = {
  id: string;
  offset?: number;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  onNavigate?: (id: string) => void;
  className?: string;
  class?: string;
  sx?: SxProps;
  style?: React.CSSProperties;
};

type AnchorHashModeProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "id" | "className" | "style"
> &
  AnchorCommonProps & {
    hash: true;
    component?: never;
  };

type AnchorScrollModeProps<T extends ElementType = "button"> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "id" | "className" | "style" | "onClick" | "onKeyDown"
> &
  AnchorCommonProps & {
    hash?: false | undefined;
    component?: T;
    onClick?: React.MouseEventHandler<Element>;
    onKeyDown?: React.KeyboardEventHandler<Element>;
  };

export type AnchorProps<T extends ElementType = "button"> =
  | AnchorHashModeProps
  | AnchorScrollModeProps<T>;

function scrollToId(
  targetId: string,
  options: {
    behavior: ScrollBehavior;
    block: ScrollLogicalPosition;
    inline: ScrollLogicalPosition;
    offset: number;
  },
) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) {
    return;
  }

  if (options.offset !== 0) {
    const rect = element.getBoundingClientRect();
    const top = window.scrollY + rect.top - options.offset;
    window.scrollTo({
      top,
      behavior: options.behavior,
    });
    return;
  }

  element.scrollIntoView({
    behavior: options.behavior,
    block: options.block,
    inline: options.inline,
  });
}

export function Anchor<T extends ElementType = "button">(props: AnchorProps<T>) {
  const {
    id,
    offset = 0,
    behavior = "smooth",
    block = "start",
    inline = "nearest",
    onNavigate,
    className,
    class: legacyClass,
    sx,
    style,
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const mergedClassName = cn("inline-flex w-fit p-0", sxClassName, className, legacyClass);
  const mergedStyle = mergeSxStyle(style, sxInlineStyle);
  const performNavigation = () => {
    scrollToId(id, { behavior, block, inline, offset });
    onNavigate?.(id);
  };

  if (props.hash === true) {
    const {
      hash: _hash,
      onClick,
      href,
      onNavigate: _onNavigate,
      class: _legacyClass,
      sx: _sx,
      offset: _offset,
      behavior: _behavior,
      block: _block,
      inline: _inline,
      ...rest
    } = props;

    return (
      <a
        href={href ?? `#${id}`}
        className={mergedClassName}
        style={mergedStyle}
        onClick={(event) => {
          event.preventDefault();
          performNavigation();
          onClick?.(event);
        }}
        {...rest}
      />
    );
  }

  const {
    component,
    onClick,
    onKeyDown,
    hash: _hash,
    onNavigate: _onNavigate,
    class: _legacyClass,
    sx: _sx,
    offset: _offset,
    behavior: _behavior,
    block: _block,
    inline: _inline,
    ...rest
  } = props as AnchorScrollModeProps<T>;

  const Comp = (component ?? "button") as ElementType;
  const isButton = Comp === "button";

  return (
    <Comp
      className={mergedClassName}
      style={mergedStyle}
      type={isButton ? "button" : undefined}
      role={isButton ? undefined : "button"}
      tabIndex={isButton ? undefined : 0}
      onClick={(event: React.MouseEvent<Element>) => {
        performNavigation();
        onClick?.(event);
      }}
      onKeyDown={(event: React.KeyboardEvent<Element>) => {
        if (!isButton && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          performNavigation();
        }
        onKeyDown?.(event);
      }}
      {...rest}
    />
  );
}

Anchor.displayName = "Anchor";
