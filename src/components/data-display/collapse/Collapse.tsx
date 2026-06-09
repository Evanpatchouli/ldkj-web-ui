import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type CollapseKey = string | number;
export type CollapseActiveKey = CollapseKey | CollapseKey[] | null;
export type CollapseSize = "sm" | "md" | "lg";
export type CollapseVariant = "outlined" | "filled" | "plain" | "ghost";
export type CollapseExpandIconPosition = "start" | "end";

type StyledDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
  className?: string;
  class?: string;
  sx?: SxProps;
};

export type CollapseExpandIconRenderProps = {
  active: boolean;
  disabled: boolean;
  value: CollapseKey;
};

export type CollapseItemConfig = {
  key: CollapseKey;
  label: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  collapsible?: boolean;
  extra?: React.ReactNode;
  forceRender?: boolean;
  lazyMount?: boolean;
  destroyOnHidden?: boolean;
  showArrow?: boolean;
  itemProps?: Omit<CollapseItemProps, "children" | "value" | "disabled">;
  headerProps?: Omit<CollapseHeaderProps, "children">;
  triggerProps?: Omit<CollapseTriggerProps, "children" | "disabled" | "showArrow">;
  contentProps?: Omit<CollapseContentProps, "children" | "forceRender">;
  bodyProps?: StyledDivProps;
};

export type CollapseProps = Omit<StyledDivProps, "onChange"> & {
  /**
   * 数据式面板配置。传入后组件会自动渲染 Item / Header / Trigger / Content。
   */
  items?: CollapseItemConfig[];
  /**
   * 当前展开项。`accordion` 模式下通常传单个 key，多开模式可传 key 数组。
   */
  activeKey?: CollapseActiveKey;
  /**
   * 非受控默认展开项。
   */
  defaultActiveKey?: CollapseActiveKey;
  /**
   * 展开项变化回调。`accordion` 模式返回单个 key 或 null，多开模式返回 key 数组。
   */
  onChange?: (activeKey: CollapseActiveKey) => void;
  /**
   * 手风琴模式，同一时间只允许展开一个面板。
   */
  accordion?: boolean;
  /**
   * 是否允许多个面板同时展开。`accordion` 为 true 时该配置会被忽略。
   */
  multiple?: boolean;
  /**
   * 单开模式下，已展开面板是否允许再次点击关闭。
   */
  collapsible?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  size?: CollapseSize;
  variant?: CollapseVariant;
  expandIconPosition?: CollapseExpandIconPosition;
  expandIcon?: (props: CollapseExpandIconRenderProps) => React.ReactNode;
  lazyMount?: boolean;
  destroyOnHidden?: boolean;
  forceRender?: boolean;
  itemProps?: Omit<CollapseItemProps, "children" | "value" | "disabled">;
  headerProps?: Omit<CollapseHeaderProps, "children">;
  triggerProps?: Omit<CollapseTriggerProps, "children" | "disabled" | "showArrow">;
  contentProps?: Omit<CollapseContentProps, "children" | "forceRender">;
  bodyProps?: StyledDivProps;
};

export type CollapseItemProps = StyledDivProps & {
  value: CollapseKey;
  disabled?: boolean;
  collapsible?: boolean;
  forceRender?: boolean;
  lazyMount?: boolean;
  destroyOnHidden?: boolean;
};

export type CollapseHeaderProps = StyledDivProps & {
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

export type CollapseTriggerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  className?: string;
  class?: string;
  sx?: SxProps;
  showArrow?: boolean;
};

export type CollapseContentProps = StyledDivProps & {
  forceRender?: boolean;
};

export type CollapseActionsProps = StyledDivProps;

type CollapseContextValue = {
  activeKeys: string[];
  accordion: boolean;
  allowMultiple: boolean;
  collapsible: boolean;
  disabled: boolean;
  bordered: boolean;
  size: CollapseSize;
  variant: CollapseVariant;
  expandIconPosition: CollapseExpandIconPosition;
  lazyMount: boolean;
  destroyOnHidden: boolean;
  forceRender: boolean;
  expandIcon?: (props: CollapseExpandIconRenderProps) => React.ReactNode;
  toggle: (value: CollapseKey, itemCollapsible?: boolean) => void;
  isActive: (value: CollapseKey) => boolean;
  registerTrigger: (value: CollapseKey, node: HTMLButtonElement | null) => void;
  focusTrigger: (value: CollapseKey, direction: "prev" | "next" | "first" | "last") => void;
};

type CollapseItemContextValue = {
  value: CollapseKey;
  active: boolean;
  disabled: boolean;
  collapsible?: boolean;
  forceRender?: boolean;
  lazyMount?: boolean;
  destroyOnHidden?: boolean;
  triggerId: string;
  contentId: string;
};

type CollapseComponent = React.ForwardRefExoticComponent<
  CollapseProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof CollapseItem;
  Header: typeof CollapseHeader;
  Trigger: typeof CollapseTrigger;
  Content: typeof CollapseContent;
  Actions: typeof CollapseActions;
};

const CollapseContext = React.createContext<CollapseContextValue | null>(null);
const CollapseItemContext = React.createContext<CollapseItemContextValue | null>(null);

const sizeClass: Record<CollapseSize, { trigger: string; body: string; icon: string }> = {
  sm: {
    trigger: "min-h-10 px-3 py-2 text-sm",
    body: "px-3 py-3 text-sm",
    icon: "h-4 w-4",
  },
  md: {
    trigger: "min-h-12 px-4 py-3 text-sm",
    body: "px-4 py-4 text-sm",
    icon: "h-4 w-4",
  },
  lg: {
    trigger: "min-h-14 px-5 py-4 text-base",
    body: "px-5 py-5 text-sm",
    icon: "h-5 w-5",
  },
};

const rootVariantClass: Record<CollapseVariant, string> = {
  outlined: "bg-white",
  filled: "bg-slate-50",
  plain: "bg-transparent",
  ghost: "bg-transparent",
};

const itemVariantClass: Record<CollapseVariant, string> = {
  outlined: "bg-white",
  filled: "bg-slate-50",
  plain: "bg-transparent",
  ghost: "bg-transparent",
};

const triggerVariantClass: Record<CollapseVariant, string> = {
  outlined: "hover:bg-slate-50",
  filled: "hover:bg-slate-100",
  plain: "hover:bg-slate-50",
  ghost: "hover:bg-slate-50",
};

function normalizeKey(value: CollapseKey) {
  return String(value);
}

function normalizeActiveKey(value: CollapseActiveKey | undefined) {
  if (value === undefined || value === null) return [];
  return (Array.isArray(value) ? value : [value]).map(normalizeKey);
}

function toChangeValue(keys: string[], accordion: boolean): CollapseActiveKey {
  if (accordion) return keys[0] ?? null;
  return keys;
}

function useControlledKeys(props: {
  activeKey?: CollapseActiveKey;
  defaultActiveKey?: CollapseActiveKey;
  accordion: boolean;
  onChange?: (activeKey: CollapseActiveKey) => void;
}) {
  const { activeKey, defaultActiveKey, accordion, onChange } = props;
  const controlled = activeKey !== undefined;
  const [innerKeys, setInnerKeys] = React.useState(() =>
    normalizeActiveKey(defaultActiveKey),
  );
  const activeKeys = controlled ? normalizeActiveKey(activeKey) : innerKeys;

  const setActiveKeys = React.useCallback(
    (nextKeys: string[]) => {
      if (!controlled) {
        setInnerKeys(nextKeys);
      }
      onChange?.(toChangeValue(nextKeys, accordion));
    },
    [accordion, controlled, onChange],
  );

  return [activeKeys, setActiveKeys] as const;
}

function useResolvedSx(sx: SxProps) {
  const theme = useSxTheme();
  return resolveSx(sx, theme);
}

function useCollapseContext(component: string) {
  const context = React.useContext(CollapseContext);
  if (!context) {
    throw new Error(`${component} must be used inside Collapse.`);
  }
  return context;
}

function useCollapseItemContext(component: string) {
  const context = React.useContext(CollapseItemContext);
  if (!context) {
    throw new Error(`${component} must be used inside Collapse.Item.`);
  }
  return context;
}

function composeRefs<T>(
  ...refs: Array<React.ForwardedRef<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
        return;
      }
      (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DefaultExpandIcon(props: CollapseExpandIconRenderProps & { className?: string }) {
  const { active, className } = props;
  return (
    <ChevronIcon
      className={cn(
        "shrink-0 text-slate-500 transition-transform duration-200",
        active && "rotate-180",
        className,
      )}
    />
  );
}

function CollapseBody(props: StyledDivProps) {
  const {
    className,
    class: legacyClass,
    sx,
    style,
    children,
    ...restProps
  } = props;
  const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

  return (
    <div
      className={cn(sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    >
      {children}
    </div>
  );
}

function renderItems(items: CollapseItemConfig[], props: CollapseProps) {
  const {
    itemProps,
    headerProps,
    triggerProps,
    contentProps,
    bodyProps,
    lazyMount,
    destroyOnHidden,
    forceRender,
  } = props;

  return items.map((item) => (
    <CollapseItem
      key={item.key}
      value={item.key}
      disabled={item.disabled}
      collapsible={item.collapsible}
      forceRender={item.forceRender ?? forceRender}
      lazyMount={item.lazyMount ?? lazyMount}
      destroyOnHidden={item.destroyOnHidden ?? destroyOnHidden}
      {...itemProps}
      {...item.itemProps}
    >
      <CollapseHeader {...headerProps} {...item.headerProps}>
        <CollapseTrigger
          showArrow={item.showArrow}
          {...triggerProps}
          {...item.triggerProps}
        >
          {item.label}
        </CollapseTrigger>
        {item.extra ? <CollapseActions>{item.extra}</CollapseActions> : null}
      </CollapseHeader>
      <CollapseContent
        forceRender={item.forceRender ?? forceRender}
        {...contentProps}
        {...item.contentProps}
      >
        <CollapseBody {...bodyProps} {...item.bodyProps}>
          {item.children}
        </CollapseBody>
      </CollapseContent>
    </CollapseItem>
  ));
}

const CollapseRoot = React.forwardRef<HTMLDivElement, CollapseProps>(
  function CollapseRoot(props, ref) {
    const {
      items,
      activeKey,
      defaultActiveKey,
      onChange,
      accordion = false,
      multiple = true,
      collapsible,
      disabled = false,
      bordered = true,
      size = "md",
      variant = "outlined",
      expandIcon,
      expandIconPosition = "end",
      lazyMount = false,
      destroyOnHidden = false,
      forceRender = false,
      itemProps: _itemProps,
      headerProps: _headerProps,
      triggerProps: _triggerProps,
      contentProps: _contentProps,
      bodyProps: _bodyProps,
      className,
      class: legacyClass,
      sx,
      style,
      children,
      ...restProps
    } = props;
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const triggerRefs = React.useRef(new Map<string, HTMLButtonElement>());
    const allowMultiple = !accordion && multiple;
    const canCollapse = collapsible ?? !accordion;
    const [activeKeys, setActiveKeys] = useControlledKeys({
      activeKey,
      defaultActiveKey,
      accordion,
      onChange,
    });

    const isActive = React.useCallback(
      (value: CollapseKey) => activeKeys.includes(normalizeKey(value)),
      [activeKeys],
    );

    const toggle = React.useCallback(
      (value: CollapseKey, itemCollapsible?: boolean) => {
        if (disabled || itemCollapsible === false) return;

        const key = normalizeKey(value);
        const open = activeKeys.includes(key);
        let nextKeys: string[];

        if (allowMultiple) {
          nextKeys = open ? activeKeys.filter((item) => item !== key) : [...activeKeys, key];
        } else if (open) {
          nextKeys = canCollapse ? [] : activeKeys;
        } else {
          nextKeys = [key];
        }

        if (nextKeys.join("\u0000") !== activeKeys.join("\u0000")) {
          setActiveKeys(nextKeys);
        }
      },
      [activeKeys, allowMultiple, canCollapse, disabled, setActiveKeys],
    );

    const registerTrigger = React.useCallback(
      (value: CollapseKey, node: HTMLButtonElement | null) => {
        const key = normalizeKey(value);
        if (node) {
          triggerRefs.current.set(key, node);
          return;
        }
        triggerRefs.current.delete(key);
      },
      [],
    );

    const focusTrigger = React.useCallback(
      (value: CollapseKey, direction: "prev" | "next" | "first" | "last") => {
        const entries = Array.from(triggerRefs.current.entries()).filter(
          ([, node]) => !node.disabled,
        );
        if (entries.length === 0) return;

        const index = entries.findIndex(([key]) => key === normalizeKey(value));
        const last = entries.length - 1;
        const nextIndex =
          direction === "first"
            ? 0
            : direction === "last"
              ? last
              : direction === "next"
                ? index >= last
                  ? 0
                  : index + 1
                : index <= 0
                  ? last
                  : index - 1;

        entries[nextIndex]?.[1].focus();
      },
      [],
    );

    const context = React.useMemo<CollapseContextValue>(
      () => ({
        activeKeys,
        accordion,
        allowMultiple,
        bordered,
        collapsible: canCollapse,
        disabled,
        destroyOnHidden,
        expandIcon,
        expandIconPosition,
        focusTrigger,
        forceRender,
        isActive,
        lazyMount,
        registerTrigger,
        size,
        toggle,
        variant,
      }),
      [
        activeKeys,
        accordion,
        allowMultiple,
        bordered,
        canCollapse,
        disabled,
        destroyOnHidden,
        expandIcon,
        expandIconPosition,
        focusTrigger,
        forceRender,
        isActive,
        lazyMount,
        registerTrigger,
        size,
        toggle,
        variant,
      ],
    );

    return (
      <CollapseContext.Provider value={context}>
        <div
          ref={ref}
          className={cn(
            "w-full overflow-hidden",
            bordered && variant !== "plain" && "rounded-md border border-slate-200",
            rootVariantClass[variant],
            variant === "ghost" && "space-y-2 overflow-visible",
            sxClassName,
            className,
            legacyClass,
          )}
          style={mergeSxStyle(style, sxInlineStyle)}
          data-accordion={accordion ? "" : undefined}
          {...restProps}
        >
          {items ? renderItems(items, props) : children}
        </div>
      </CollapseContext.Provider>
    );
  },
);

CollapseRoot.displayName = "Collapse";

const CollapseItem = React.forwardRef<HTMLDivElement, CollapseItemProps>(
  function CollapseItem(props, ref) {
    const {
      value,
      disabled = false,
      collapsible,
      forceRender,
      lazyMount,
      destroyOnHidden,
      className,
      class: legacyClass,
      sx,
      style,
      children,
      ...restProps
    } = props;
    const root = useCollapseContext("Collapse.Item");
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const active = root.isActive(value);
    const reactId = React.useId();
    const itemDisabled = root.disabled || disabled;
    const context = React.useMemo<CollapseItemContextValue>(
      () => ({
        active,
        collapsible,
        contentId: `${reactId}-content`,
        destroyOnHidden,
        disabled: itemDisabled,
        forceRender,
        lazyMount,
        triggerId: `${reactId}-trigger`,
        value,
      }),
      [
        active,
        collapsible,
        destroyOnHidden,
        forceRender,
        itemDisabled,
        lazyMount,
        reactId,
        value,
      ],
    );

    return (
      <CollapseItemContext.Provider value={context}>
        <div
          ref={ref}
          className={cn(
            "overflow-hidden",
            root.variant === "ghost" && "rounded-md border border-slate-200",
            root.bordered && root.variant !== "ghost" && "border-b border-slate-200 last:border-b-0",
            itemVariantClass[root.variant],
            itemDisabled && "opacity-60",
            sxClassName,
            className,
            legacyClass,
          )}
          style={mergeSxStyle(style, sxInlineStyle)}
          data-state={active ? "open" : "closed"}
          data-disabled={itemDisabled ? "" : undefined}
          {...restProps}
        >
          {children}
        </div>
      </CollapseItemContext.Provider>
    );
  },
);

CollapseItem.displayName = "CollapseItem";

const CollapseHeader = React.forwardRef<HTMLDivElement, CollapseHeaderProps>(
  function CollapseHeader(props, ref) {
    const {
      headingLevel,
      className,
      class: legacyClass,
      sx,
      style,
      children,
      ...restProps
    } = props;
    const item = useCollapseItemContext("Collapse.Header");
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const Heading = headingLevel ? (`h${headingLevel}` as const) : "div";

    return (
      <Heading
        ref={ref}
        className={cn(
          "m-0 flex min-w-0 items-stretch text-slate-900",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        data-state={item.active ? "open" : "closed"}
        {...restProps}
      >
        {children}
      </Heading>
    );
  },
);

CollapseHeader.displayName = "CollapseHeader";

const CollapseTrigger = React.forwardRef<HTMLButtonElement, CollapseTriggerProps>(
  function CollapseTrigger(props, ref) {
    const {
      className,
      class: legacyClass,
      sx,
      style,
      children,
      disabled,
      showArrow = true,
      onClick,
      onKeyDown,
      type = "button",
      ...restProps
    } = props;
    const root = useCollapseContext("Collapse.Trigger");
    const item = useCollapseItemContext("Collapse.Trigger");
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const finalDisabled = root.disabled || item.disabled || disabled || item.collapsible === false;
    const icon =
      showArrow === false
        ? null
        : root.expandIcon?.({
            active: item.active,
            disabled: finalDisabled,
            value: item.value,
          }) ?? (
            <DefaultExpandIcon
              active={item.active}
              disabled={finalDisabled}
              value={item.value}
              className={sizeClass[root.size].icon}
            />
          );

    const triggerRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        root.registerTrigger(item.value, node);
      },
      [item.value, root],
    );

    return (
      <button
        ref={composeRefs(ref, triggerRef)}
        id={item.triggerId}
        type={type}
        className={cn(
          "flex min-w-0 flex-1 items-center gap-3 text-left font-medium leading-5 text-slate-900 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-inset",
          "disabled:cursor-not-allowed disabled:text-slate-500",
          sizeClass[root.size].trigger,
          triggerVariantClass[root.variant],
          root.expandIconPosition === "start" && "flex-row-reverse justify-end",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        disabled={finalDisabled}
        aria-expanded={item.active}
        aria-controls={item.contentId}
        data-state={item.active ? "open" : "closed"}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          root.toggle(item.value, item.collapsible);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            root.focusTrigger(item.value, "next");
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            root.focusTrigger(item.value, "prev");
          } else if (event.key === "Home") {
            event.preventDefault();
            root.focusTrigger(item.value, "first");
          } else if (event.key === "End") {
            event.preventDefault();
            root.focusTrigger(item.value, "last");
          }
        }}
        {...restProps}
      >
        {root.expandIconPosition === "start" ? icon : null}
        <span className="min-w-0 flex-1">{children}</span>
        {root.expandIconPosition === "end" ? icon : null}
      </button>
    );
  },
);

CollapseTrigger.displayName = "CollapseTrigger";

const CollapseContent = React.forwardRef<HTMLDivElement, CollapseContentProps>(
  function CollapseContent(props, ref) {
    const {
      className,
      class: legacyClass,
      sx,
      style,
      children,
      forceRender,
      ...restProps
    } = props;
    const root = useCollapseContext("Collapse.Content");
    const item = useCollapseItemContext("Collapse.Content");
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const active = item.active;
    const [mountedOnce, setMountedOnce] = React.useState(active);
    const finalForceRender = forceRender ?? item.forceRender ?? root.forceRender;
    const finalDestroyOnHidden = item.destroyOnHidden ?? root.destroyOnHidden;
    const finalLazyMount = item.lazyMount ?? root.lazyMount;

    React.useEffect(() => {
      if (active) setMountedOnce(true);
    }, [active]);

    const shouldMount =
      finalForceRender ||
      active ||
      (!finalLazyMount && !finalDestroyOnHidden) ||
      (mountedOnce && !finalDestroyOnHidden);

    if (!shouldMount) return null;

    return (
      <div
        ref={ref}
        id={item.contentId}
        role="region"
        aria-labelledby={item.triggerId}
        aria-hidden={!active}
        className={cn(
          "grid overflow-hidden text-slate-600 transition-[grid-template-rows,opacity] duration-200 ease-out",
          active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        data-state={active ? "open" : "closed"}
        {...restProps}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={sizeClass[root.size].body}>{children}</div>
        </div>
      </div>
    );
  },
);

CollapseContent.displayName = "CollapseContent";

const CollapseActions = React.forwardRef<HTMLDivElement, CollapseActionsProps>(
  function CollapseActions(props, ref) {
    const {
      className,
      class: legacyClass,
      sx,
      style,
      onClick,
      children,
      ...restProps
    } = props;
    const root = useCollapseContext("Collapse.Actions");
    const item = useCollapseItemContext("Collapse.Actions");
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);

    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center gap-2 text-sm text-slate-500",
          sizeClass[root.size].trigger,
          item.disabled && "pointer-events-none",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, sxInlineStyle)}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

CollapseActions.displayName = "CollapseActions";

export const Collapse = Object.assign(CollapseRoot, {
  Actions: CollapseActions,
  Content: CollapseContent,
  Header: CollapseHeader,
  Item: CollapseItem,
  Trigger: CollapseTrigger,
}) as CollapseComponent;
