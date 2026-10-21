import * as React from "react";
import { Icon } from "@/components/data-display/icon";
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
  type BaseStepperSize,
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

export type StepperStatus = BaseStepperStatus;
export type StepperSize = BaseStepperSize;
export type StepperOrientation = "horizontal" | "vertical";
export type StepperLabelPlacement = "end" | "bottom";
export type StepperVariant = "default" | "dot" | "navigation";

export type StepperItem = BaseStepperItem;
export type StepperStepProps = BaseStepperStepProps;
export type StepperRenderState = BaseStepperRenderState<StepperItem> & {
  percent?: number;
};
export type StepperChangeMeta = BaseStepperChangeMeta<StepperItem>;

export type StepperProps = Omit<
  React.ComponentPropsWithoutRef<"nav">,
  "onChange"
> &
  StyledProps & {
    items?: StepperItem[];
    current?: number;
    defaultCurrent?: number;
    onCurrentChange?: (current: number, meta: StepperChangeMeta) => void;
    onStepClick?: (index: number, meta: StepperChangeMeta) => void;
    status?: StepperStatus;
    orientation?: StepperOrientation;
    labelPlacement?: StepperLabelPlacement;
    variant?: StepperVariant;
    size?: StepperSize;
    clickable?: boolean;
    linear?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    showConnector?: boolean;
    showContent?: boolean;
    progress?: number;
    renderIcon?: (
      item: StepperItem,
      state: StepperRenderState,
    ) => React.ReactNode;
    renderLabel?: (
      item: StepperItem,
      state: StepperRenderState,
    ) => React.ReactNode;
    listProps?: React.ComponentPropsWithoutRef<"ol"> & StyledProps;
    contentProps?: React.ComponentPropsWithoutRef<"div"> & StyledProps;
  };

type StepperCompound = {
  Step: typeof StepperStep;
};

type StepperComponent = React.FC<StepperProps> & StepperCompound;

const iconSizeClass: Record<StepperSize, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
};

const dotSizeClass: Record<StepperSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

const labelTextClass: Record<StepperSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

const descriptionTextClass: Record<StepperSize, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

const contentPaddingClass: Record<StepperSize, string> = {
  sm: "pl-10",
  md: "pl-11",
  lg: "pl-14",
};

function StepperStep(props: StepperStepProps) {
  return <BaseStepperStep {...props} />;
}

StepperStep.displayName = "Stepper.Step";

function useStyledProps(props: StyledProps) {
  const { sx, style, className, class: legacyClass } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return {
    className: cn(sxClassName, className, legacyClass),
    style: mergeSxStyle(style, sxInlineStyle),
  };
}

function getIconToneClass(status: StepperStatus) {
  if (status === "finish") {
    return "border-[color:var(--ldkj-color-primary)] bg-[color:var(--ldkj-color-primary)]/10 text-[color:var(--ldkj-color-primary)]";
  }
  if (status === "process") {
    return "border-[color:var(--ldkj-color-primary)] bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)] ring-4 ring-[color:var(--ldkj-color-ring)]";
  }
  if (status === "error") {
    return "border-[color:var(--ldkj-color-danger)] bg-[color:var(--ldkj-color-danger)] text-[color:var(--ldkj-color-danger-foreground)]";
  }

  return "border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] text-[color:var(--ldkj-color-muted-foreground)]";
}

function getLabelToneClass(state: StepperRenderState) {
  if (state.disabled) return "text-[color:var(--ldkj-color-muted-foreground)]";
  if (state.error) return "text-[color:var(--ldkj-color-danger)]";
  if (state.active) return "text-[color:var(--ldkj-color-foreground)]";
  if (state.completed) return "text-[color:var(--ldkj-color-foreground)]";

  return "text-[color:var(--ldkj-color-muted-foreground)]";
}

function getConnectorClass(state: StepperRenderState) {
  if (state.error) return "bg-[color:var(--ldkj-color-danger)]";
  if (state.completed) return "bg-[color:var(--ldkj-color-primary)]";

  return "bg-[color:var(--ldkj-color-border)]";
}

function renderDefaultIcon(
  item: StepperItem,
  state: StepperRenderState,
  variant: StepperVariant,
  size: StepperSize,
) {
  if (item.icon) return item.icon;

  if (variant === "dot") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "rounded-full transition-colors",
          dotSizeClass[size],
          state.status === "wait"
            ? "bg-[color:var(--ldkj-color-muted-foreground)]/45"
            : "bg-current",
        )}
      />
    );
  }

  if (state.status === "finish") {
    return <Icon name="check" size={16} />;
  }
  if (state.status === "error") {
    return <Icon name="close" size={16} />;
  }

  return state.index + 1;
}

function renderDefaultLabel(
  item: StepperItem,
  state: StepperRenderState,
  size: StepperSize,
) {
  return (
    <div className="min-w-0">
      <div
        className={cn(
          "min-w-0 font-medium leading-5",
          labelTextClass[size],
          getLabelToneClass(state),
        )}
      >
        {item.label}
      </div>
      {item.description ? (
        <div
          className={cn(
            "mt-1 min-w-0 leading-5 text-[color:var(--ldkj-color-muted-foreground)]",
            descriptionTextClass[size],
          )}
        >
          {item.description}
        </div>
      ) : null}
      {item.optional ? (
        <div className="mt-1 text-xs leading-5 text-[color:var(--ldkj-color-muted-foreground)]">
          {item.optional}
        </div>
      ) : null}
      {state.percent !== undefined && state.active ? (
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-[color:var(--ldkj-color-muted)]"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-[color:var(--ldkj-color-primary)] transition-[width] duration-300"
            style={{ width: `${state.percent}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

function StepperContent(props: {
  item: StepperItem;
  state: StepperRenderState;
  contentProps?: StepperProps["contentProps"];
  vertical?: boolean;
  size: StepperSize;
}) {
  const { item, state, contentProps, vertical = false, size } = props;
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = contentProps ?? {};
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const content = children ?? item.content;

  if (content === undefined || content === null) return null;

  return (
    <div
      data-stepper-content=""
      data-active={state.active ? "true" : undefined}
      className={cn(
        "stepper-content text-sm leading-6 text-[color:var(--ldkj-color-foreground)]",
        vertical
          ? "mt-3 rounded-md border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-surface)] p-4"
          : "mt-4 rounded-md border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-surface)] p-4",
        vertical && contentPaddingClass[size],
        styledProps.className,
      )}
      style={styledProps.style}
      {...restProps}
    >
      {content}
    </div>
  );
}

function StepperRoot(props: StepperProps) {
  const {
    items: itemsProp,
    current: currentProp,
    defaultCurrent,
    onCurrentChange,
    onStepClick,
    status,
    orientation = "horizontal",
    labelPlacement = "bottom",
    variant = "default",
    size = "md",
    clickable = false,
    linear = true,
    disabled = false,
    readOnly = false,
    showConnector = true,
    showContent,
    progress,
    renderIcon,
    renderLabel,
    listProps,
    contentProps,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    "aria-label": ariaLabel,
    ...navProps
  } = props;
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const items = collectStepperItems<StepperItem>(itemsProp, children);
  const { current, setCurrent } = useStepperCurrent({
    count: items.length,
    current: currentProp,
    defaultCurrent,
  });
  const percent = clampStepperPercent(progress);
  const resolvedShowContent =
    showContent ?? (orientation === "vertical" && variant !== "navigation");
  const {
    className: listClassName,
    class: listLegacyClass,
    sx: listSx,
    style: listStyle,
    ...olProps
  } = listProps ?? {};
  const listStyledProps = useStyledProps({
    className: listClassName,
    class: listLegacyClass,
    sx: listSx,
    style: listStyle,
  });

  const getState = React.useCallback(
    (item: StepperItem, index: number): StepperRenderState => {
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
        percent: active ? percent : undefined,
      };
    },
    [clickable, current, disabled, items.length, linear, percent, readOnly, status],
  );

  const activateStep = (
    item: StepperItem,
    state: StepperRenderState,
    reason: BaseStepperChangeReason,
  ) => {
    if (!state.clickable) return;

    const previous = current;
    const nextCurrent = setCurrent(state.index);
    const meta: StepperChangeMeta = {
      previous,
      current: nextCurrent,
      item,
      status: state.status,
      reason,
    };

    onStepClick?.(state.index, meta);
    if (previous !== nextCurrent) {
      onCurrentChange?.(nextCurrent, meta);
    }
  };

  const renderStepControl = (item: StepperItem, state: StepperRenderState) => {
    const controlClassName = cn(
      "stepper-icon inline-flex shrink-0 items-center justify-center rounded-full border font-semibold transition",
      variant === "dot"
        ? "border-transparent bg-transparent"
        : iconSizeClass[size],
      variant !== "dot" && getIconToneClass(state.status),
      state.clickable &&
        "cursor-pointer hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)] focus-visible:ring-offset-2",
      state.disabled && "cursor-not-allowed opacity-50",
    );
    const icon = renderIcon
      ? renderIcon(item, state)
      : renderDefaultIcon(item, state, variant, size);

    if (state.clickable) {
      return (
        <button
          type="button"
          className={controlClassName}
          aria-current={state.active ? "step" : undefined}
          aria-label={
            typeof item.label === "string"
              ? `切换到 ${item.label}`
              : `切换到第 ${state.index + 1} 步`
          }
          onClick={() => activateStep(item, state, "click")}
        >
          {icon}
        </button>
      );
    }

    return (
      <span
        className={controlClassName}
        aria-current={state.active ? "step" : undefined}
        aria-disabled={state.disabled || undefined}
      >
        {icon}
      </span>
    );
  };

  const renderStepLabel = (item: StepperItem, state: StepperRenderState) => {
    if (renderLabel) return renderLabel(item, state);

    return renderDefaultLabel(item, state, size);
  };

  const activeItem = items[current];
  const activeState = activeItem ? getState(activeItem, current) : null;

  return (
    <nav
      aria-label={ariaLabel ?? "步骤"}
      className={cn(
        "stepper w-full text-[color:var(--ldkj-color-foreground)]",
        variant === "navigation" &&
          "rounded-lg border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-surface)] p-3",
        styledProps.className,
      )}
      style={styledProps.style}
      {...navProps}
    >
      <ol
        className={cn(
          "m-0 list-none p-0",
          orientation === "horizontal"
            ? "flex w-full items-start"
            : "flex flex-col",
          listStyledProps.className,
        )}
        style={mergeSxStyle(
          { listStyle: "none", margin: 0, padding: 0 },
          listStyledProps.style,
        )}
        {...olProps}
      >
        {items.map((item, index) => {
          const state = getState(item, index);
          const key = getStepperItemKey(item, index);
          const itemClassName = cn(item.className, item.class);

          if (orientation === "vertical") {
            return (
              <li
                key={key}
                data-status={state.status}
                data-active={state.active ? "true" : undefined}
                className={cn(
                  "stepper-item flex min-w-0 gap-3",
                  itemClassName,
                )}
                style={item.style}
              >
                <div className="flex shrink-0 flex-col items-center">
                  {renderStepControl(item, state)}
                  {showConnector && !state.last ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "my-2 w-px flex-1 rounded-full",
                        getConnectorClass(state),
                      )}
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 pb-4">
                  {renderStepLabel(item, state)}
                  {resolvedShowContent && state.active ? (
                    <StepperContent
                      item={item}
                      state={state}
                      contentProps={contentProps}
                      vertical
                      size={size}
                    />
                  ) : null}
                </div>
              </li>
            );
          }

          return (
            <li
              key={key}
              data-status={state.status}
              data-active={state.active ? "true" : undefined}
              className={cn(
                "stepper-item min-w-0 flex-1",
                labelPlacement === "bottom"
                  ? "relative grid grid-rows-[2.5rem_auto] justify-items-center text-center"
                  : "flex items-start",
                state.last && labelPlacement !== "bottom" && "flex-none",
                itemClassName,
              )}
              style={item.style}
            >
              {labelPlacement === "bottom" ? (
                <>
                  <div className="row-start-1 flex h-10 min-w-0 items-center justify-center">
                    {renderStepControl(item, state)}
                  </div>
                  <div className="row-start-2 min-w-0 max-w-32">
                    {renderStepLabel(item, state)}
                  </div>
                </>
              ) : (
                <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-3 text-left">
                  {renderStepControl(item, state)}
                  <div className="min-w-0 max-w-56 pt-1">
                    {renderStepLabel(item, state)}
                  </div>
                </div>
              )}
              {showConnector && !state.last ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    labelPlacement === "bottom"
                      ? "absolute left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] top-5 h-px rounded-full"
                      : "mx-3 mt-4 h-px min-w-8 flex-1 rounded-full",
                    labelPlacement !== "bottom" && size === "lg" && "mt-5",
                    getConnectorClass(state),
                  )}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
      {resolvedShowContent && orientation === "horizontal" && activeItem && activeState ? (
        <StepperContent
          item={activeItem}
          state={activeState}
          contentProps={contentProps}
          size={size}
        />
      ) : null}
    </nav>
  );
}

export const Stepper = Object.assign(StepperRoot, {
  Step: StepperStep,
}) as StepperComponent;

Stepper.displayName = "Stepper";
Stepper.Step.displayName = "Stepper.Step";
