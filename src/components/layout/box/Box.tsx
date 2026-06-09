import * as React from "react";
import type { ElementType } from "react";
import {
  resolveRounded,
  roundedPresetClasses,
  type Rounded,
} from "@/components/shared/rounded";
import {
  resolveShadow,
  shadowPresetClasses,
  type Shadow,
} from "@/components/shared/shadow";
import { useLongPress } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type PolymorphicProps<T extends ElementType> = {
  component?: T;
  className?: string;
  class?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

type BoxOwnProps = {
  sx?: SxProps;
  rounded?: Rounded;
  shadow?: Shadow;
  onLongPress?: () => void;
  longPressDelay?: number;
  loading?: boolean;
  loadingContent?: React.ReactNode;
  modal?: boolean;
  modalContent?: React.ReactNode;
  onModalMaskClick?: React.MouseEventHandler<HTMLDivElement>;
};

/**
 * Box 是通用基础容器组件，支持多态渲染、sx 样式入口，以及元素范围内的 loading/modal 遮罩层。
 */
export type BoxProps<T extends ElementType = "div"> = PolymorphicProps<T> &
  BoxOwnProps;

function DefaultLoadingIndicator() {
  return (
    <span
      className="h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--ldkj-color-border)] border-t-[color:var(--ldkj-color-primary)]"
      aria-hidden="true"
    />
  );
}

export function Box<T extends ElementType = "div">(props: BoxProps<T>) {
  const {
    component,
    sx,
    rounded,
    shadow,
    onLongPress,
    longPressDelay = 500,
    style,
    className,
    class: legacyClass,
    loading = false,
    loadingContent,
    modal = false,
    modalContent,
    onModalMaskClick,
    children,
    ...restProps
  } = props;
  const Comp = (component ?? "div") as ElementType;
  const theme = useSxTheme();
  const { roundedPreset, roundedStyle } = resolveRounded(rounded);
  const { shadowPreset, shadowStyle } = resolveShadow(shadow);
  const longPressHandlers = useLongPress(() => {
    onLongPress?.();
  }, longPressDelay);
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const shouldContainOverlay = loading || modal;
  const computedStyle: React.CSSProperties | undefined =
    shouldContainOverlay && style?.position === undefined
      ? { position: "relative" }
      : undefined;

  return (
    <Comp
      className={cn(
        roundedPreset && roundedPresetClasses[roundedPreset],
        shadowPreset && shadowPresetClasses[shadowPreset],
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        style,
        roundedStyle,
        shadowStyle,
        computedStyle,
        sxInlineStyle,
      )}
      aria-busy={loading || undefined}
      {...(onLongPress ? longPressHandlers : undefined)}
      {...restProps}
    >
      {children}

      {loading ? (
        <div
          className="box-loading-mask absolute inset-0 z-10 flex items-center justify-center bg-[color:var(--ldkj-color-background)]/65"
          aria-hidden="true"
        >
          {loadingContent ?? <DefaultLoadingIndicator />}
        </div>
      ) : null}

      {modal ? (
        <div
          className="box-modal-mask absolute inset-0 z-20 flex items-center justify-center bg-[color:var(--ldkj-color-overlay)] p-4"
          onClick={onModalMaskClick}
        >
          <div
            className="box-modal-content max-w-full rounded-lg bg-[color:var(--ldkj-color-popover)] p-4 text-[color:var(--ldkj-color-popover-foreground)] shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            {modalContent}
          </div>
        </div>
      ) : null}
    </Comp>
  );
}

Box.displayName = "Box";
