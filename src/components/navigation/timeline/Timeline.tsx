import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export type TimelinePosition = "left" | "right" | "alternate" | "alternate-reverse";
export type TimelineItemPosition = "left" | "right";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineVariant = "filled" | "outlined" | "soft";
export type TimelineColor =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | (string & {});

export type TimelineItemConfig = {
  key?: React.Key;
  oppositeContent?: React.ReactNode;
  children?: React.ReactNode;
  content?: React.ReactNode;
  dot?: React.ReactNode;
  icon?: React.ReactNode;
  color?: TimelineColor;
  variant?: TimelineVariant;
  position?: TimelineItemPosition;
  loading?: boolean;
  disabled?: boolean;
  hideConnector?: boolean;
  itemProps?: Omit<TimelineItemProps, "children">;
  dotProps?: Omit<TimelineDotProps, "children">;
  connectorProps?: TimelineConnectorProps;
  contentProps?: TimelineContentProps;
  oppositeContentProps?: TimelineOppositeContentProps;
  separatorProps?: TimelineSeparatorProps;
};

export type TimelineRenderState = {
  index: number;
  count: number;
  item?: TimelineItemConfig;
  position: TimelineItemPosition;
  first: boolean;
  last: boolean;
  pending: boolean;
  disabled: boolean;
};

export type TimelineProps = Omit<React.ComponentPropsWithoutRef<"ol">, "children"> &
  StyledProps & {
    /**
     * 数据式时间线配置。复杂结构优先使用组合式 API。
     */
    items?: TimelineItemConfig[];
    children?: React.ReactNode;
    /**
     * 内容相对时间轴的位置。对齐 MUI Timeline 的 position 命名。
     */
    position?: TimelinePosition;
    size?: TimelineSize;
    variant?: TimelineVariant;
    color?: TimelineColor;
    reverse?: boolean;
    pending?: boolean | React.ReactNode;
    pendingDot?: React.ReactNode;
    hideLastConnector?: boolean;
    renderDot?: (
      item: TimelineItemConfig,
      state: TimelineRenderState,
    ) => React.ReactNode;
    renderItem?: (
      item: TimelineItemConfig,
      state: TimelineRenderState,
      node: React.ReactNode,
    ) => React.ReactNode;
  };

export type TimelineItemProps = Omit<React.ComponentPropsWithoutRef<"li">, "children"> &
  StyledProps & {
    children?: React.ReactNode;
    position?: TimelineItemPosition;
    disabled?: boolean;
    __timelineIndex?: number;
    __timelineCount?: number;
    __timelinePending?: boolean;
  };

export type TimelineSeparatorProps = React.ComponentPropsWithoutRef<"div"> &
  StyledProps & {
    children?: React.ReactNode;
  };

export type TimelineDotProps = React.ComponentPropsWithoutRef<"span"> &
  StyledProps & {
    color?: TimelineColor;
    variant?: TimelineVariant;
    loading?: boolean;
  };

export type TimelineConnectorProps = React.ComponentPropsWithoutRef<"span"> &
  StyledProps & {
    hidden?: boolean;
  };

export type TimelineContentProps = React.ComponentPropsWithoutRef<"div"> &
  StyledProps;

export type TimelineOppositeContentProps = React.ComponentPropsWithoutRef<"div"> &
  StyledProps;

type TimelineContextValue = {
  position: TimelinePosition;
  size: TimelineSize;
  variant: TimelineVariant;
  color: TimelineColor;
  hideLastConnector: boolean;
};

type TimelineItemContextValue = {
  position: TimelineItemPosition;
  last: boolean;
  disabled: boolean;
};

type TimelineCompound = {
  Item: typeof TimelineItem;
  Separator: typeof TimelineSeparator;
  Dot: typeof TimelineDot;
  Connector: typeof TimelineConnector;
  Content: typeof TimelineContent;
  OppositeContent: typeof TimelineOppositeContent;
};

type TimelineComponent = React.FC<TimelineProps> & TimelineCompound;

const TimelineContext = React.createContext<TimelineContextValue | null>(null);
const TimelineItemContext = React.createContext<TimelineItemContextValue | null>(null);

const dotSizeClass: Record<TimelineSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

const iconDotSizeClass: Record<TimelineSize, string> = {
  sm: "min-h-6 min-w-6 text-xs",
  md: "min-h-7 min-w-7 text-sm",
  lg: "min-h-8 min-w-8 text-base",
};

const contentClass: Record<TimelineSize, string> = {
  sm: "px-3 py-1.5 text-sm leading-5",
  md: "px-4 py-1.5 text-sm leading-6",
  lg: "px-5 py-2 text-base leading-7",
};

const oppositeClass: Record<TimelineSize, string> = {
  sm: "px-3 py-1.5 text-xs leading-5",
  md: "px-4 py-1.5 text-xs leading-6",
  lg: "px-5 py-2 text-sm leading-7",
};

const itemMinHeightClass: Record<TimelineSize, string> = {
  sm: "min-h-14",
  md: "min-h-[72px]",
  lg: "min-h-20",
};

const dotMarginClass: Record<TimelineSize, string> = {
  sm: "my-2",
  md: "my-2.5",
  lg: "my-3",
};

const colorValue: Record<string, string> = {
  neutral: "var(--ldkj-color-muted-foreground)",
  primary: "var(--ldkj-color-primary)",
  success: "var(--ldkj-color-success)",
  warning: "var(--ldkj-color-warning)",
  danger: "var(--ldkj-color-danger)",
  info: "var(--ldkj-color-info)",
};

function useStyledProps(props: StyledProps) {
  const { sx, style, className, class: legacyClass } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  return {
    className: cn(sxClassName, className, legacyClass),
    style: mergeSxStyle(style, sxInlineStyle),
  };
}

function useTimelineContext(component: string) {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error(`${component} must be used inside Timeline.`);
  }
  return context;
}

function useTimelineItemContext(component: string) {
  const context = React.useContext(TimelineItemContext);
  if (!context) {
    throw new Error(`${component} must be used inside Timeline.Item.`);
  }
  return context;
}

function resolvePosition(position: TimelinePosition, index: number): TimelineItemPosition {
  if (position === "left") return "left";
  if (position === "right") return "right";
  if (position === "alternate-reverse") return index % 2 === 0 ? "left" : "right";
  return index % 2 === 0 ? "right" : "left";
}

function resolveColor(color: TimelineColor) {
  return colorValue[color] ?? color;
}

function getContentPlacementClass(position: TimelineItemPosition) {
  return position === "left"
    ? "col-start-1 row-start-1 text-right"
    : "col-start-3 row-start-1 text-left";
}

function getOppositePlacementClass(position: TimelineItemPosition) {
  return position === "left"
    ? "col-start-3 row-start-1 text-left"
    : "col-start-1 row-start-1 text-right";
}

function LoadingDot(props: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block rounded-full border-2 border-current border-r-transparent",
        props.className,
      )}
    />
  );
}

function renderPendingItem(
  pending: boolean | React.ReactNode,
  pendingDot?: React.ReactNode,
): TimelineItemConfig | null {
  if (!pending) return null;

  return {
    key: "__timeline_pending__",
    content: pending === true ? "处理中" : pending,
    loading: pendingDot === undefined,
    dot: pendingDot,
  } satisfies TimelineItemConfig;
}

function buildItems(props: Pick<TimelineProps, "items" | "reverse" | "pending" | "pendingDot">) {
  const pendingItem = renderPendingItem(props.pending, props.pendingDot);
  const items = pendingItem ? [...(props.items ?? []), pendingItem] : [...(props.items ?? [])];
  return props.reverse ? items.reverse() : items;
}

function renderDataItem(
  item: TimelineItemConfig,
  state: TimelineRenderState,
  props: Pick<
    TimelineProps,
    "color" | "variant" | "hideLastConnector" | "renderDot" | "renderItem"
  >,
) {
  const {
    content = item.children,
    dot,
    icon,
    oppositeContent,
    color = props.color,
    variant = props.variant,
    loading,
    hideConnector,
    itemProps,
    dotProps,
    connectorProps,
    contentProps,
    oppositeContentProps,
    separatorProps,
  } = item;
  const resolvedDot =
    props.renderDot?.(item, state) ??
    dot ??
    (icon ? (
      <TimelineDot color={color} variant={variant} loading={loading} {...dotProps}>
        {icon}
      </TimelineDot>
    ) : (
      <TimelineDot color={color} variant={variant} loading={loading} {...dotProps} />
    ));
  const node = (
    <TimelineItem
      position={state.position}
      disabled={state.disabled}
      __timelineIndex={state.index}
      __timelineCount={state.count}
      __timelinePending={state.pending}
      {...itemProps}
    >
      <TimelineOppositeContent {...oppositeContentProps}>
        {oppositeContent}
      </TimelineOppositeContent>
      <TimelineSeparator {...separatorProps}>
        {resolvedDot}
        <TimelineConnector
          {...connectorProps}
          hidden={hideConnector ?? (props.hideLastConnector && state.last)}
        />
      </TimelineSeparator>
      <TimelineContent {...contentProps}>{content}</TimelineContent>
    </TimelineItem>
  );

  return props.renderItem?.(item, state, node) ?? node;
}

function TimelineRoot(props: TimelineProps) {
  const {
    items,
    children,
    position = "right",
    size = "md",
    variant = "filled",
    color = "primary",
    reverse = false,
    pending,
    pendingDot,
    hideLastConnector = true,
    renderDot,
    renderItem,
    className,
    class: legacyClass,
    sx,
    style,
    "aria-label": ariaLabel,
    ...olProps
  } = props;
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const context = React.useMemo<TimelineContextValue>(
    () => ({
      color,
      hideLastConnector,
      position,
      size,
      variant,
    }),
    [color, hideLastConnector, position, size, variant],
  );
  const itemSource = items ? buildItems({ items, reverse, pending, pendingDot }) : null;

  const renderedChildren = itemSource
    ? itemSource.map((item, index) => {
        const count = itemSource.length;
        const itemPosition = item.position ?? resolvePosition(position, index);
        const state: TimelineRenderState = {
          count,
          disabled: Boolean(item.disabled),
          first: index === 0,
          index,
          item,
          last: index === count - 1,
          pending: Boolean(item.loading && item.key === "__timeline_pending__"),
          position: itemPosition,
        };

        return (
          <React.Fragment key={item.key ?? index}>
            {renderDataItem(item, state, {
              color,
              hideLastConnector,
              renderDot,
              renderItem,
              variant,
            })}
          </React.Fragment>
        );
      })
    : React.Children.map(children, (child, index) => {
        if (!React.isValidElement<TimelineItemProps>(child)) return child;
        return React.cloneElement(child, {
          __timelineCount: React.Children.count(children),
          __timelineIndex: index,
        });
      });

  return (
    <TimelineContext.Provider value={context}>
      <ol
        aria-label={ariaLabel ?? "时间线"}
        className={cn(
          "timeline m-0 grid list-none p-0 text-[color:var(--ldkj-color-foreground)]",
          styledProps.className,
        )}
        style={styledProps.style}
        data-position={position}
        {...olProps}
      >
        {renderedChildren}
      </ol>
    </TimelineContext.Provider>
  );
}

function TimelineItem(props: TimelineItemProps) {
  const {
    position: positionProp,
    disabled = false,
    __timelineIndex = 0,
    __timelineCount = 1,
    __timelinePending = false,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...liProps
  } = props;
  const root = useTimelineContext("Timeline.Item");
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const itemPosition = positionProp ?? resolvePosition(root.position, __timelineIndex);
  const last = __timelineIndex === __timelineCount - 1;
  const context = React.useMemo<TimelineItemContextValue>(
    () => ({
      disabled,
      last,
      position: itemPosition,
    }),
    [disabled, last, itemPosition],
  );

  return (
    <TimelineItemContext.Provider value={context}>
      <li
        className={cn(
          "timeline-item grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
          itemMinHeightClass[root.size],
          disabled && "opacity-55",
          styledProps.className,
        )}
        style={styledProps.style}
        data-position={itemPosition}
        data-pending={__timelinePending ? "true" : undefined}
        data-disabled={disabled ? "" : undefined}
        {...liProps}
      >
        {children}
      </li>
    </TimelineItemContext.Provider>
  );
}

function TimelineSeparator(props: TimelineSeparatorProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <div
      className={cn(
        "timeline-separator col-start-2 row-start-1 flex shrink-0 flex-col items-center self-stretch",
        styledProps.className,
      )}
      style={styledProps.style}
      {...restProps}
    >
      {children}
    </div>
  );
}

function TimelineDot(props: TimelineDotProps) {
  const {
    color,
    variant,
    loading = false,
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const root = useTimelineContext("Timeline.Dot");
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const resolvedVariant = variant ?? root.variant;
  const resolvedColor = resolveColor(color ?? root.color);
  const hasChildren = children !== undefined && children !== null;
  const dotStyle = {
    "--timeline-dot-color": resolvedColor,
  } as React.CSSProperties;

  return (
    <span
      className={cn(
        "timeline-dot z-10 inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
        dotMarginClass[root.size],
        hasChildren || loading ? iconDotSizeClass[root.size] : dotSizeClass[root.size],
        resolvedVariant === "filled" &&
          "border-[color:var(--timeline-dot-color)] bg-[color:var(--timeline-dot-color)] text-[color:var(--ldkj-color-primary-foreground)]",
        resolvedVariant === "outlined" &&
          "border-[color:var(--timeline-dot-color)] bg-[color:var(--ldkj-color-background)] text-[color:var(--timeline-dot-color)]",
        resolvedVariant === "soft" &&
          "border-transparent bg-[color:var(--ldkj-color-accent)] text-[color:var(--timeline-dot-color)]",
        styledProps.className,
      )}
      style={mergeSxStyle(dotStyle, styledProps.style)}
      {...restProps}
    >
      {loading ? (
        <LoadingDot
          className={cn(
            "animate-spin",
            root.size === "sm" ? "h-3.5 w-3.5" : root.size === "lg" ? "h-5 w-5" : "h-4 w-4",
          )}
        />
      ) : (
        children
      )}
    </span>
  );
}

function TimelineConnector(props: TimelineConnectorProps) {
  const {
    hidden,
    className,
    class: legacyClass,
    sx,
    style,
    ...restProps
  } = props;
  const root = useTimelineContext("Timeline.Connector");
  const item = useTimelineItemContext("Timeline.Connector");
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });
  const shouldHide = hidden ?? (root.hideLastConnector && item.last);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "timeline-connector min-h-6 w-px flex-1 rounded-full bg-[color:var(--ldkj-color-border)]",
        shouldHide && "invisible",
        styledProps.className,
      )}
      style={styledProps.style}
      {...restProps}
    />
  );
}

function TimelineContent(props: TimelineContentProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const root = useTimelineContext("Timeline.Content");
  const item = useTimelineItemContext("Timeline.Content");
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <div
      className={cn(
        "timeline-content min-w-0 text-[color:var(--ldkj-color-foreground)]",
        contentClass[root.size],
        getContentPlacementClass(item.position),
        styledProps.className,
      )}
      style={styledProps.style}
      {...restProps}
    >
      {children}
    </div>
  );
}

function TimelineOppositeContent(props: TimelineOppositeContentProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const root = useTimelineContext("Timeline.OppositeContent");
  const item = useTimelineItemContext("Timeline.OppositeContent");
  const styledProps = useStyledProps({ className, class: legacyClass, sx, style });

  return (
    <div
      className={cn(
        "timeline-opposite-content min-w-0 text-[color:var(--ldkj-color-muted-foreground)]",
        oppositeClass[root.size],
        getOppositePlacementClass(item.position),
        styledProps.className,
      )}
      style={styledProps.style}
      {...restProps}
    >
      {children}
    </div>
  );
}

export const Timeline = Object.assign(TimelineRoot, {
  Connector: TimelineConnector,
  Content: TimelineContent,
  Dot: TimelineDot,
  Item: TimelineItem,
  OppositeContent: TimelineOppositeContent,
  Separator: TimelineSeparator,
}) as TimelineComponent;

Timeline.displayName = "Timeline";
(Timeline.Item as React.FC<TimelineItemProps>).displayName = "Timeline.Item";
(Timeline.Separator as React.FC<TimelineSeparatorProps>).displayName = "Timeline.Separator";
(Timeline.Dot as React.FC<TimelineDotProps>).displayName = "Timeline.Dot";
(Timeline.Connector as React.FC<TimelineConnectorProps>).displayName = "Timeline.Connector";
(Timeline.Content as React.FC<TimelineContentProps>).displayName = "Timeline.Content";
(Timeline.OppositeContent as React.FC<TimelineOppositeContentProps>).displayName =
  "Timeline.OppositeContent";
