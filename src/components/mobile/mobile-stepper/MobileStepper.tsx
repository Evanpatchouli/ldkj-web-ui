import * as React from "react";
import { Icon } from "@/components/data-display/icon";
import { Button, type ButtonProps } from "@/components/interact/button";
import {
  BaseStepperStep,
  canActivateStepperItem,
  clampStepperPercent,
  collectStepperItems,
  getStepperItemKey,
  getStepperStatus,
  useStepperCurrent,
  type BaseStepperChangeMeta,
  type BaseStepperChangeReason,
  type BaseStepperItem,
  type BaseStepperRenderState,
  type BaseStepperStatus,
  type BaseStepperStepProps,
} from "@/components/shared/stepper";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export type MobileStepperStatus = BaseStepperStatus;
export type MobileStepperSize = "xs" | "sm" | "md" | "lg" | "xl";
export type MobileStepperIndicator = "titles" | "dots" | "progress" | "text" | "none";
export type MobileStepperIndicatorPlacement = "top" | "bottom";

export type MobileStepperItem = BaseStepperItem;
export type MobileStepperStepProps = BaseStepperStepProps;
export type MobileStepperRenderState = BaseStepperRenderState<MobileStepperItem> & {
  percent?: number;
};
export type MobileStepperChangeMeta = BaseStepperChangeMeta<MobileStepperItem>;

export type MobileStepperActions = {
  current: number;
  count: number;
  item: MobileStepperItem;
  isFirst: boolean;
  isLast: boolean;
  canPrevious: boolean;
  canNext: boolean;
  previous: () => void;
  next: () => void;
  finish: () => void;
};

export type MobileStepperProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange"
> &
  StyledProps & {
    items?: MobileStepperItem[];
    current?: number;
    defaultCurrent?: number;
    onCurrentChange?: (current: number, meta: MobileStepperChangeMeta) => void;
    onStepClick?: (index: number, meta: MobileStepperChangeMeta) => void;
    onPrevious?: (current: number, meta: MobileStepperChangeMeta) => void;
    onNext?: (current: number, meta: MobileStepperChangeMeta) => void;
    onFinish?: (current: number, meta: MobileStepperChangeMeta) => void;
    status?: MobileStepperStatus;
    size?: MobileStepperSize;
    indicator?: MobileStepperIndicator;
    indicatorPlacement?: MobileStepperIndicatorPlacement;
    clickable?: boolean;
    linear?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    keepMounted?: boolean;
    swipeable?: boolean;
    showActions?: boolean;
    showInactiveLabels?: boolean;
    safeArea?: boolean;
    stickyActions?: boolean;
    progress?: number;
    previousText?: React.ReactNode;
    nextText?: React.ReactNode;
    finishText?: React.ReactNode;
    renderIcon?: (
      item: MobileStepperItem,
      state: MobileStepperRenderState,
    ) => React.ReactNode;
    renderLabel?: (
      item: MobileStepperItem,
      state: MobileStepperRenderState,
    ) => React.ReactNode;
    renderIndicatorItem?: (
      item: MobileStepperItem,
      state: MobileStepperRenderState,
    ) => React.ReactNode;
    renderContent?: (
      item: MobileStepperItem,
      state: MobileStepperRenderState,
    ) => React.ReactNode;
    renderActions?: (actions: MobileStepperActions) => React.ReactNode;
    headerProps?: React.ComponentPropsWithoutRef<"div"> & StyledProps;
    contentProps?: React.ComponentPropsWithoutRef<"div"> & StyledProps;
    footerProps?: React.ComponentPropsWithoutRef<"div"> & StyledProps;
    previousButtonProps?: Omit<
      ButtonProps<"button">,
      "children" | "disabled" | "onClick" | "type"
    >;
    nextButtonProps?: Omit<
      ButtonProps<"button">,
      "children" | "disabled" | "onClick" | "type"
    >;
  };

type MobileStepperCompound = {
  Step: typeof MobileStepperStep;
};

type MobileStepperComponent = React.FC<MobileStepperProps> &
  MobileStepperCompound;

const pillSizeClass: Record<MobileStepperSize, string> = {
  xs: "min-h-7 gap-1 rounded-full px-2 py-1 text-xs",
  sm: "min-h-8 gap-1.5 rounded-full px-2.5 py-1.5 text-xs",
  md: "min-h-9 gap-1.5 rounded-full px-3 py-2 text-sm",
  lg: "min-h-10 gap-2 rounded-full px-3.5 py-2 text-sm",
  xl: "min-h-11 gap-2 rounded-full px-4 py-2.5 text-base",
};

const compactPillSizeClass: Record<MobileStepperSize, string> = {
  xs: "h-7 w-7 p-0 text-xs",
  sm: "h-8 w-8 p-0 text-xs",
  md: "h-9 w-9 p-0 text-sm",
  lg: "h-10 w-10 p-0 text-sm",
  xl: "h-11 w-11 p-0 text-base",
};

const numberSizeClass: Record<MobileStepperSize, string> = {
  xs: "h-4 w-4 text-[10px]",
  sm: "h-5 w-5 text-[11px]",
  md: "h-6 w-6 text-xs",
  lg: "h-7 w-7 text-sm",
  xl: "h-8 w-8 text-sm",
};

function MobileStepperStep(props: MobileStepperStepProps) {
  return <BaseStepperStep {...props} />;
}

MobileStepperStep.displayName = "MobileStepper.Step";

function useStyledProps(props: StyledProps) {
  const { sx, style, className, class: legacyClass } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return {
    className: cn(sxClassName, className, legacyClass),
    style: mergeSxStyle(style, sxInlineStyle),
  };
}

function getPillToneClass(state: MobileStepperRenderState) {
  if (state.disabled) {
    return "border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-muted-foreground)] opacity-60";
  }
  if (state.error) {
    return "border-[color:var(--ldkj-color-danger)] bg-[color:var(--ldkj-color-danger)] text-[color:var(--ldkj-color-danger-foreground)]";
  }
  if (state.active) {
    return "border-[color:var(--ldkj-color-primary)] bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)]";
  }
  if (state.completed) {
    return "border-[color:var(--ldkj-color-primary)] bg-[color:var(--ldkj-color-primary)]/10 text-[color:var(--ldkj-color-primary)]";
  }

  return "border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-muted-foreground)]";
}

function renderDefaultIcon(
  item: MobileStepperItem,
  state: MobileStepperRenderState,
) {
  if (item.icon) return item.icon;
  if (state.status === "error") return <Icon name="close" size={14} />;

  return state.index + 1;
}

function renderDefaultLabel(
  item: MobileStepperItem,
  state: MobileStepperRenderState,
  showInactiveLabels: boolean,
) {
  if (!state.active && !showInactiveLabels) return null;

  return (
    <span className="min-w-0 truncate font-medium leading-5">
      {item.label}
    </span>
  );
}

function getActionMeta(
  previous: number,
  current: number,
  item: MobileStepperItem,
  status: MobileStepperStatus,
  reason: BaseStepperChangeReason,
): MobileStepperChangeMeta {
  return {
    previous,
    current,
    item,
    status,
    reason,
  };
}

function MobileStepperRoot(props: MobileStepperProps) {
  const {
    items: itemsProp,
    current: currentProp,
    defaultCurrent,
    onCurrentChange,
    onStepClick,
    onPrevious,
    onNext,
    onFinish,
    status,
    size = "md",
    indicator = "titles",
    indicatorPlacement = "top",
    clickable = true,
    linear = true,
    disabled = false,
    readOnly = false,
    keepMounted = true,
    swipeable = false,
    showActions = false,
    showInactiveLabels = false,
    safeArea = false,
    stickyActions = false,
    progress,
    previousText = "上一步",
    nextText = "下一步",
    finishText = "完成",
    renderIcon,
    renderLabel,
    renderIndicatorItem,
    renderContent,
    renderActions,
    headerProps,
    contentProps,
    footerProps,
    previousButtonProps,
    nextButtonProps,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...divProps
  } = props;
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const items = collectStepperItems<MobileStepperItem>(itemsProp, children);
  const { current, setCurrent } = useStepperCurrent({
    count: items.length,
    current: currentProp,
    defaultCurrent,
  });
  const explicitPercent = clampStepperPercent(progress);
  const fallbackPercent =
    items.length <= 0 ? 0 : Math.round(((current + 1) / items.length) * 100);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const {
    className: headerClassName,
    class: headerLegacyClass,
    sx: headerSx,
    style: headerStyle,
    ...headerRestProps
  } = headerProps ?? {};
  const headerStyledProps = useStyledProps({
    className: headerClassName,
    class: headerLegacyClass,
    sx: headerSx,
    style: headerStyle,
  });

  const {
    className: contentClassName,
    class: contentLegacyClass,
    sx: contentSx,
    style: contentStyle,
    ...contentRestProps
  } = contentProps ?? {};
  const contentStyledProps = useStyledProps({
    className: contentClassName,
    class: contentLegacyClass,
    sx: contentSx,
    style: contentStyle,
  });

  const {
    className: footerClassName,
    class: footerLegacyClass,
    sx: footerSx,
    style: footerStyle,
    ...footerRestProps
  } = footerProps ?? {};
  const footerStyledProps = useStyledProps({
    className: footerClassName,
    class: footerLegacyClass,
    sx: footerSx,
    style: footerStyle,
  });

  const getState = React.useCallback(
    (item: MobileStepperItem, index: number): MobileStepperRenderState => {
      const itemStatus = getStepperStatus(index, current, status, item.status);
      const itemDisabled = disabled || Boolean(item.disabled);
      const active = index === current;

      return {
        index,
        current,
        item,
        status: itemStatus,
        active,
        completed: itemStatus === "finish",
        error: itemStatus === "error",
        disabled: itemDisabled,
        clickable: canActivateStepperItem({
          index,
          current,
          status: itemStatus,
          clickable,
          linear,
          disabled: itemDisabled,
          readOnly,
        }),
        last: index === items.length - 1,
        percent: active ? explicitPercent : undefined,
      };
    },
    [
      clickable,
      current,
      disabled,
      explicitPercent,
      items.length,
      linear,
      readOnly,
      status,
    ],
  );

  const commitCurrent = (
    nextCurrent: number,
    reason: BaseStepperChangeReason,
  ) => {
    const item = items[nextCurrent];
    if (!item || disabled || readOnly || item.disabled) return null;

    const previous = current;
    const nextStatus = getStepperStatus(nextCurrent, nextCurrent, status, item.status);
    const normalizedCurrent = setCurrent(nextCurrent);
    const meta = getActionMeta(
      previous,
      normalizedCurrent,
      item,
      nextStatus,
      reason,
    );

    if (previous !== normalizedCurrent) {
      onCurrentChange?.(normalizedCurrent, meta);
    }

    return meta;
  };

  const activateStep = (item: MobileStepperItem, state: MobileStepperRenderState) => {
    if (!state.clickable) return;

    const meta = commitCurrent(state.index, "click");
    if (meta) {
      onStepClick?.(state.index, meta);
    }
  };

  const goPrevious = () => {
    if (current <= 0) return;

    const nextCurrent = current - 1;
    const meta = commitCurrent(nextCurrent, "previous");
    if (meta) {
      onPrevious?.(nextCurrent, meta);
    }
  };

  const goNext = () => {
    if (current >= items.length - 1) return;

    const nextCurrent = current + 1;
    const meta = commitCurrent(nextCurrent, "next");
    if (meta) {
      onNext?.(nextCurrent, meta);
    }
  };

  const finish = () => {
    const item = items[current];
    if (!item || disabled || readOnly) return;

    const itemStatus = getStepperStatus(current, current, status, item.status);
    const meta = getActionMeta(current, current, item, itemStatus, "finish");
    onFinish?.(current, meta);
  };

  const canPrevious = current > 0 && !disabled && !readOnly;
  const canNext =
    current < items.length - 1 &&
    !disabled &&
    !readOnly &&
    !items[current + 1]?.disabled;
  const activeItem = items[current];
  const isLast = current >= items.length - 1;

  const renderStepPill = (item: MobileStepperItem, state: MobileStepperRenderState) => {
    const compact =
      !state.active &&
      !showInactiveLabels &&
      !renderLabel &&
      !renderIndicatorItem;
    const content =
      renderIndicatorItem?.(item, state) ?? (
        <>
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full bg-current/10 font-semibold",
              numberSizeClass[size],
            )}
          >
            {renderIcon ? renderIcon(item, state) : renderDefaultIcon(item, state)}
          </span>
          {renderLabel
            ? renderLabel(item, state)
            : renderDefaultLabel(item, state, showInactiveLabels)}
        </>
      );
    const pillClassName = cn(
      "mobile-stepper-pill inline-flex shrink-0 items-center justify-center rounded-full border transition",
      compact ? compactPillSizeClass[size] : pillSizeClass[size],
      getPillToneClass(state),
      state.clickable &&
        "cursor-pointer hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)] focus-visible:ring-offset-2",
      state.disabled && "cursor-not-allowed",
    );

    if (state.clickable) {
      return (
        <button
          type="button"
          className={pillClassName}
          aria-current={state.active ? "step" : undefined}
          onClick={() => activateStep(item, state)}
        >
          {content}
        </button>
      );
    }

    return (
      <span
        className={pillClassName}
        aria-current={state.active ? "step" : undefined}
        aria-disabled={state.disabled || undefined}
      >
        {content}
      </span>
    );
  };

  const renderDots = () => (
    <div
      className="mobile-stepper-dots flex items-center justify-center gap-2"
      role="tablist"
      aria-label="移动端步骤"
    >
      {items.map((item, index) => {
        const state = getState(item, index);
        const dotClassName = cn(
          "h-2.5 rounded-full transition-all",
          state.active
            ? "w-6 bg-[color:var(--ldkj-color-primary)]"
            : "w-2.5 bg-[color:var(--ldkj-color-border)]",
          state.error && "bg-[color:var(--ldkj-color-danger)]",
          state.completed && !state.active && "bg-[color:var(--ldkj-color-primary)]/60",
          state.clickable &&
            "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)] focus-visible:ring-offset-2",
        );

        if (state.clickable) {
          return (
            <button
              key={getStepperItemKey(item, index)}
              type="button"
              className={dotClassName}
              aria-current={state.active ? "step" : undefined}
              aria-label={`切换到第 ${index + 1} 步`}
              onClick={() => activateStep(item, state)}
            />
          );
        }

        return (
          <span
            key={getStepperItemKey(item, index)}
            className={dotClassName}
            aria-current={state.active ? "step" : undefined}
          />
        );
      })}
    </div>
  );

  const renderProgress = () => (
    <div className="mobile-stepper-progress grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="min-w-0 truncate font-medium text-[color:var(--ldkj-color-foreground)]">
          {activeItem?.label}
        </span>
        <span className="shrink-0 text-xs text-[color:var(--ldkj-color-muted-foreground)]">
          {current + 1} / {items.length}
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-[color:var(--ldkj-color-muted)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={explicitPercent ?? fallbackPercent}
      >
        <div
          className="h-full rounded-full bg-[color:var(--ldkj-color-primary)] transition-[width] duration-300"
          style={{ width: `${explicitPercent ?? fallbackPercent}%` }}
        />
      </div>
    </div>
  );

  const renderTextIndicator = () => (
    <div className="mobile-stepper-text rounded-lg bg-[color:var(--ldkj-color-muted)] px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-[color:var(--ldkj-color-foreground)]">
            {activeItem?.label}
          </div>
          {activeItem?.description ? (
            <div className="mt-0.5 truncate text-xs text-[color:var(--ldkj-color-muted-foreground)]">
              {activeItem.description}
            </div>
          ) : null}
        </div>
        <div className="shrink-0 rounded-full bg-[color:var(--ldkj-color-background)] px-2 py-1 text-xs font-medium text-[color:var(--ldkj-color-muted-foreground)]">
          {current + 1} / {items.length}
        </div>
      </div>
    </div>
  );

  const renderIndicator = () => {
    if (indicator === "none") return null;

    return (
      <div
        className={cn(
          "mobile-stepper-header",
          indicator === "titles" && "-mx-1 overflow-x-auto px-1 py-1",
          headerStyledProps.className,
        )}
        style={headerStyledProps.style}
        {...headerRestProps}
      >
        {indicator === "titles" ? (
          <ol
            className="m-0 flex list-none items-center gap-2 p-0"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {items.map((item, index) => {
              const state = getState(item, index);

              return (
                <li key={getStepperItemKey(item, index)} className="shrink-0">
                  {renderStepPill(item, state)}
                </li>
              );
            })}
          </ol>
        ) : null}
        {indicator === "dots" ? renderDots() : null}
        {indicator === "progress" ? renderProgress() : null}
        {indicator === "text" ? renderTextIndicator() : null}
      </div>
    );
  };

  const renderContentPanels = () => {
    if (!keepMounted) {
      const item = items[current];
      const state = item ? getState(item, current) : null;
      const content = item && state
        ? renderContent?.(item, state) ?? item.content
        : null;

      return content ? (
        <div
          data-mobile-stepper-panel=""
          data-active="true"
          className="mobile-stepper-panel"
        >
          {content}
        </div>
      ) : null;
    }

    return items.map((item, index) => {
      const state = getState(item, index);
      const content = renderContent?.(item, state) ?? item.content;

      return (
        <div
          key={getStepperItemKey(item, index)}
          hidden={!state.active}
          data-mobile-stepper-panel=""
          data-active={state.active ? "true" : undefined}
          className="mobile-stepper-panel"
        >
          {content}
        </div>
      );
    });
  };

  const renderFooter = () => {
    if (!showActions || !activeItem) return null;

    const actions: MobileStepperActions = {
      current,
      count: items.length,
      item: activeItem,
      isFirst: current === 0,
      isLast,
      canPrevious,
      canNext,
      previous: goPrevious,
      next: goNext,
      finish,
    };

    return (
      <div
        className={cn(
          "mobile-stepper-footer grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2",
          stickyActions &&
            "sticky bottom-0 z-10 border-t border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] py-3",
          safeArea && "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          footerStyledProps.className,
        )}
        style={footerStyledProps.style}
        {...footerRestProps}
      >
        {renderActions ? (
          renderActions(actions)
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={!canPrevious}
              onClick={goPrevious}
              {...previousButtonProps}
            >
              <Icon name="arrow_back" size={16} />
              {previousText}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={isLast ? disabled || readOnly : !canNext}
              onClick={isLast ? finish : goNext}
              {...nextButtonProps}
            >
              {isLast ? finishText : nextText}
              <Icon name="arrow_forward" size={16} />
            </Button>
          </>
        )}
      </div>
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeable || event.touches.length !== 1) return;

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!swipeable || !start || event.changedTouches.length !== 1) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < 48 || Math.abs(dy) > 60) return;
    if (dx < 0) {
      goNext();
      return;
    }

    goPrevious();
  };

  const indicatorNode = renderIndicator();
  const footerNode = renderFooter();

  return (
    <div
      className={cn(
        "mobile-stepper grid gap-3 text-[color:var(--ldkj-color-foreground)]",
        styledProps.className,
      )}
      style={styledProps.style}
      {...divProps}
    >
      {indicatorPlacement === "top" ? indicatorNode : null}
      <div
        className={cn("mobile-stepper-content min-w-0", contentStyledProps.className)}
        style={contentStyledProps.style}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        {...contentRestProps}
      >
        {renderContentPanels()}
      </div>
      {indicatorPlacement === "bottom" ? indicatorNode : null}
      {footerNode}
    </div>
  );
}

export const MobileStepper = Object.assign(MobileStepperRoot, {
  Step: MobileStepperStep,
}) as MobileStepperComponent;

MobileStepper.displayName = "MobileStepper";
MobileStepper.Step.displayName = "MobileStepper.Step";
