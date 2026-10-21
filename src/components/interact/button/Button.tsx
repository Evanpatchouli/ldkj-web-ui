import * as React from "react";
import type { ElementType } from "react";
import { debounce as createDebounce } from "es-toolkit";
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

const DEFAULT_BUTTON_DEBOUNCE_MS = 300;

function DefaultButtonLoadingIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type ButtonOwnProps = Omit<ButtonVariants, "rounded" | "shadow"> & {
  rounded?: ButtonRounded;
  shadow?: ButtonShadow;
  sx?: SxProps;
  /** Shows a loading indicator and prevents the button from being activated. */
  loading?: boolean;
  /** Replaces the button content while loading. `null` intentionally renders no text. */
  loadingText?: React.ReactNode;
  /** Overrides the default loading indicator. `null` intentionally hides it. */
  loadingIcon?: React.ReactNode;
  /**
   * Enables debounced click handling. `true` uses 300ms, and a number sets the wait time in milliseconds.
   */
  debounce?: boolean | number;
};

export type ButtonProps<T extends ElementType = "button"> =
  PolymorphicProps<T> & ButtonOwnProps;

function Button<T extends ElementType = "button">(props: ButtonProps<T>) {
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
    debounce,
    loading = false,
    loadingText,
    loadingIcon,
    disabled: disabledProp,
    children,
    "aria-busy": ariaBusy,
    "aria-disabled": ariaDisabled,
    onClick,
    className,
    class: legacyClass,
    ...restProps
  } = props;
  const Comp = (component ?? "button") as ElementType;
  const isLoading = loading === true;
  const isDisabled = Boolean(disabledProp || isLoading);
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const { shadowPreset, shadowStyle } = resolveShadow(shadow);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const onClickRef = React.useRef(onClick);
  onClickRef.current = onClick;
  const debounceMs =
    debounce === true
      ? DEFAULT_BUTTON_DEBOUNCE_MS
      : typeof debounce === "number"
        ? debounce
        : undefined;
  const shouldDebounceClick =
    debounceMs !== undefined && typeof onClick === "function";

  const debouncedOnClick = React.useMemo(() => {
    if (!shouldDebounceClick || debounceMs === undefined) {
      return undefined;
    }

    return createDebounce(
      (...args: Parameters<NonNullable<typeof onClick>>) => {
        onClickRef.current?.(...args);
      },
      debounceMs,
    );
  }, [debounceMs, shouldDebounceClick]);

  React.useEffect(() => {
    return () => {
      debouncedOnClick?.cancel();
    };
  }, [debouncedOnClick]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    if (debouncedOnClick) {
      (
        debouncedOnClick as unknown as (
          clickEvent: React.MouseEvent<HTMLElement>,
        ) => void
      )(event);
      return;
    }

    onClickRef.current?.(event as never);
  };

  const renderedChildren = isLoading ? (
    <span className="inline-flex items-center gap-2">
      {loadingIcon !== undefined ? loadingIcon : <DefaultButtonLoadingIcon />}
      {loadingText !== undefined ? loadingText : children}
    </span>
  ) : (
    children
  );

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
      onClick={handleClick}
      disabled={isDisabled}
      aria-busy={isLoading ? true : ariaBusy}
      aria-disabled={isDisabled ? true : ariaDisabled}
      children={renderedChildren}
      {...restProps}
    />
  );
}

Button.displayName = "Button";

export { Button };
