import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type SplitterOrientation = "horizontal" | "vertical";
export type SplitterSize = number | string;
export type SplitterSemanticDOM = "root" | "panel" | "dragger";

export type SplitterSemanticClassNames =
  | Partial<Record<SplitterSemanticDOM, string>>
  | ((info: { props: SplitterProps }) => Partial<Record<SplitterSemanticDOM, string>>);

export type SplitterSemanticStyles =
  | Partial<Record<SplitterSemanticDOM, React.CSSProperties>>
  | ((info: { props: SplitterProps }) => Partial<Record<SplitterSemanticDOM, React.CSSProperties>>);

export type SplitterCollapsibleConfig = {
  motion?: boolean;
  icon?: {
    start?: React.ReactNode;
    end?: React.ReactNode;
  };
};

export type SplitterPanelCollapsible =
  | boolean
  | {
      start?: boolean;
      end?: boolean;
      showCollapsibleIcon?: boolean | "auto";
    };

export type SplitterPanelProps = React.ComponentPropsWithoutRef<"div"> & {
  collapsible?: SplitterPanelCollapsible;
  defaultSize?: SplitterSize;
  destroyOnHidden?: boolean;
  max?: SplitterSize;
  min?: SplitterSize;
  resizable?: boolean;
  size?: SplitterSize;
};

export type SplitterProps = Omit<React.ComponentPropsWithoutRef<"div">, "onResize"> & {
  children?: React.ReactNode;
  classNames?: SplitterSemanticClassNames;
  collapsible?: SplitterCollapsibleConfig;
  destroyOnHidden?: boolean;
  draggerIcon?: React.ReactNode;
  lazy?: boolean;
  layout?: SplitterOrientation;
  orientation?: SplitterOrientation;
  styles?: SplitterSemanticStyles;
  sx?: SxProps;
  vertical?: boolean;
  onCollapse?: (collapsed: boolean[], sizes: number[]) => void;
  onDraggerDoubleClick?: (index: number) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  onResizeStart?: (sizes: number[]) => void;
};

type SplitterComponent = React.ForwardRefExoticComponent<
  SplitterProps & React.RefAttributes<HTMLDivElement>
> & {
  Panel: typeof SplitterPanel;
};

type DragState = {
  baseline: number[];
  index: number;
  start: number;
};

const DRAGGER_SIZE = 8;
const KEYBOARD_STEP = 10;
const EPSILON = 0.5;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseSize(size: SplitterSize | undefined, total: number): number | undefined {
  if (size === undefined || size === null) return undefined;
  if (typeof size === "number") return Number.isFinite(size) ? Math.max(0, size) : undefined;

  const normalized = size.trim();
  if (!normalized) return undefined;

  if (normalized.endsWith("%")) {
    const percent = Number.parseFloat(normalized.slice(0, -1));
    return Number.isFinite(percent) ? Math.max(0, (total * percent) / 100) : undefined;
  }

  if (normalized.endsWith("px")) {
    const px = Number.parseFloat(normalized.slice(0, -2));
    return Number.isFinite(px) ? Math.max(0, px) : undefined;
  }

  const px = Number.parseFloat(normalized);
  return Number.isFinite(px) ? Math.max(0, px) : undefined;
}

function getPanelMin(panel: SplitterPanelProps, total: number, allowCollapsed = false) {
  if (allowCollapsed) return 0;
  return parseSize(panel.min, total) ?? 0;
}

function getPanelMax(panel: SplitterPanelProps, total: number) {
  const min = parseSize(panel.min, total) ?? 0;
  const max = parseSize(panel.max, total);
  if (max === undefined) return Number.POSITIVE_INFINITY;
  return Math.max(min, max);
}

function normalizeSizes(
  input: number[],
  panels: SplitterPanelProps[],
  total: number,
) {
  if (!panels.length) return [];

  const sizes = panels.map((panel, index) => {
    const value = input[index] ?? 0;
    const allowCollapsed = value <= EPSILON;
    return clamp(value, getPanelMin(panel, total, allowCollapsed), getPanelMax(panel, total));
  });

  let delta = total - sizes.reduce((sum, size) => sum + size, 0);
  let guard = panels.length * 4;

  while (Math.abs(delta) > EPSILON && guard > 0) {
    guard -= 1;
    const grow = delta > 0;
    const candidates = sizes
      .map((size, index) => {
        const min = getPanelMin(panels[index], total, size <= EPSILON);
        const max = getPanelMax(panels[index], total);
        const capacity = grow ? max - size : size - min;
        return { capacity, index };
      })
      .filter((item) => item.capacity > EPSILON);

    if (!candidates.length) break;

    const share = Math.abs(delta) / candidates.length;
    let consumed = 0;

    for (const item of candidates) {
      const amount = Math.min(share, item.capacity);
      sizes[item.index] += grow ? amount : -amount;
      consumed += amount;
    }

    if (consumed <= EPSILON) break;
    delta += grow ? -consumed : consumed;
  }

  return sizes.map((size) => Math.max(0, size));
}

function createInitialSizes(
  panels: SplitterPanelProps[],
  total: number,
  previous?: number[],
) {
  if (!panels.length) return [];

  if (previous?.length === panels.length && previous.some((size) => size > 0)) {
    return normalizeSizes(previous, panels, total);
  }

  const sizes = panels.map((panel) => parseSize(panel.size ?? panel.defaultSize, total));
  const knownTotal = sizes.reduce<number>((sum, size) => sum + (size ?? 0), 0);
  const missing = sizes.filter((size) => size === undefined).length;
  const remaining = Math.max(0, total - knownTotal);
  const fallback = missing > 0 ? remaining / missing : total / panels.length;

  return normalizeSizes(
    sizes.map((size) => size ?? fallback),
    panels,
    total,
  );
}

function resizeAdjacentPanels(
  baseSizes: number[],
  panels: SplitterPanelProps[],
  total: number,
  index: number,
  delta: number,
) {
  const left = panels[index];
  const right = panels[index + 1];
  if (!left || !right) return baseSizes;
  if (left.resizable === false || right.resizable === false) return baseSizes;

  const next = [...baseSizes];
  const pairTotal = (next[index] ?? 0) + (next[index + 1] ?? 0);
  const leftMin = getPanelMin(left, total, (next[index] ?? 0) <= EPSILON);
  const rightMin = getPanelMin(right, total, (next[index + 1] ?? 0) <= EPSILON);
  const leftMax = getPanelMax(left, total);
  const rightMax = getPanelMax(right, total);
  const minLeft = Math.max(leftMin, pairTotal - rightMax);
  const maxLeft = Math.min(leftMax, pairTotal - rightMin);

  if (minLeft > maxLeft) return baseSizes;

  next[index] = clamp((baseSizes[index] ?? 0) + delta, minLeft, maxLeft);
  next[index + 1] = pairTotal - next[index];
  return next;
}

function getPanelDefaultSize(
  panel: SplitterPanelProps,
  total: number,
  fallback: number,
) {
  return parseSize(panel.defaultSize ?? panel.size, total) ?? fallback;
}

function isPanelElement(node: React.ReactNode): node is React.ReactElement<SplitterPanelProps> {
  return React.isValidElement(node) && node.type === SplitterPanel;
}

function resolveCollapsible(
  collapsible: SplitterPanelCollapsible | undefined,
  side: "start" | "end",
) {
  if (!collapsible) return { enabled: false, show: false };
  if (collapsible === true) return { enabled: true, show: true };
  const enabled = collapsible[side] !== false;
  return {
    enabled,
    show: enabled && collapsible.showCollapsibleIcon !== false,
    auto: collapsible.showCollapsibleIcon === "auto",
  };
}

function SplitterPanel(_props: SplitterPanelProps) {
  return null;
}

SplitterPanel.displayName = "Splitter.Panel";

const SplitterBase = React.forwardRef<HTMLDivElement, SplitterProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    collapsible,
    destroyOnHidden = false,
    draggerIcon,
    lazy = false,
    layout,
    orientation: orientationProp,
    style,
    styles,
    sx,
    vertical = false,
    onCollapse,
    onDraggerDoubleClick,
    onResize,
    onResizeEnd,
    onResizeStart,
    ...restProps
  } = props;
  const orientation = orientationProp ?? layout ?? (vertical ? "vertical" : "horizontal");
  const isHorizontal = orientation === "horizontal";
  const theme = useSxTheme();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const rememberedSizesRef = React.useRef<number[]>([]);
  const dragStateRef = React.useRef<DragState | null>(null);
  const previewSizesRef = React.useRef<number[] | null>(null);
  const [containerSize, setContainerSize] = React.useState(0);
  const [sizes, setSizes] = React.useState<number[]>([]);
  const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null);
  const [previewSizes, setPreviewSizes] = React.useState<number[] | null>(null);

  React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

  const panelElements = React.useMemo(
    () => React.Children.toArray(children).filter(isPanelElement),
    [children],
  );
  const panels = React.useMemo(
    () => panelElements.map((panel) => panel.props),
    [panelElements],
  );
  const panelSignature = panels
    .map((panel) =>
      [
        panel.defaultSize,
        panel.size,
        panel.min,
        panel.max,
        panel.resizable,
        panel.destroyOnHidden,
      ].join(":"),
    )
    .join("|");
  const availableSize = Math.max(0, containerSize - Math.max(0, panels.length - 1) * DRAGGER_SIZE);
  const hasControlledSize = panels.some((panel) => panel.size !== undefined);
  const motionEnabled = collapsible?.motion !== false;

  const resolvedClassNames =
    typeof classNames === "function" ? classNames({ props }) : classNames;
  const resolvedStyles = typeof styles === "function" ? styles({ props }) : styles;
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);

  useIsomorphicLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setContainerSize(isHorizontal ? rect.width : rect.height);
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [isHorizontal]);

  React.useEffect(() => {
    if (!panels.length || availableSize <= 0) {
      setSizes([]);
      return;
    }

    setSizes((current) => {
      const next = hasControlledSize
        ? createInitialSizes(panels, availableSize)
        : createInitialSizes(panels, availableSize, current);
      const same =
        next.length === current.length &&
        next.every((size, index) => Math.abs(size - current[index]) <= EPSILON);
      return same ? current : next;
    });
  }, [availableSize, hasControlledSize, panelSignature, panels.length]);

  React.useEffect(() => {
    if (draggingIndex === null) return;

    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const current = isHorizontal ? event.clientX : event.clientY;
      const delta = current - dragState.start;
      const next = resizeAdjacentPanels(
        dragState.baseline,
        panels,
        availableSize,
        dragState.index,
        delta,
      );

      if (lazy) {
        previewSizesRef.current = next;
        setPreviewSizes(next);
        return;
      }

      previewSizesRef.current = next;
      setSizes(next);
      setPreviewSizes(next);
      onResize?.(next);
    };

    const handlePointerUp = () => {
      const next = previewSizesRef.current ?? previewSizes ?? sizes;
      dragStateRef.current = null;
      previewSizesRef.current = null;
      setDraggingIndex(null);
      setPreviewSizes(null);
      setSizes(next);
      if (lazy) onResize?.(next);
      onResizeEnd?.(next);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    availableSize,
    draggingIndex,
    isHorizontal,
    lazy,
    onResize,
    onResizeEnd,
    panels,
    previewSizes,
    sizes,
  ]);

  const commitSizes = React.useCallback(
    (next: number[], notifyResize = true) => {
      setSizes(next);
      if (notifyResize) onResize?.(next);
    },
    [onResize],
  );

  const startResize = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>, index: number) => {
      if (panels[index]?.resizable === false || panels[index + 1]?.resizable === false) return;
      event.preventDefault();

      const baseline = sizes.length === panels.length ? sizes : createInitialSizes(panels, availableSize);
      dragStateRef.current = {
        baseline,
        index,
        start: isHorizontal ? event.clientX : event.clientY,
      };
      setDraggingIndex(index);
      previewSizesRef.current = baseline;
      setPreviewSizes(baseline);
      onResizeStart?.(baseline);
      document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    },
    [availableSize, isHorizontal, onResizeStart, panels, sizes],
  );

  const resizeFromKeyboard = React.useCallback(
    (index: number, delta: number) => {
      const base = previewSizes ?? sizes;
      const next = resizeAdjacentPanels(base, panels, availableSize, index, delta);
      commitSizes(next);
      onResizeEnd?.(next);
    },
    [availableSize, commitSizes, onResizeEnd, panels, previewSizes, sizes],
  );

  const resetFromDragger = React.useCallback(
    (index: number) => {
      const next = createInitialSizes(panels, availableSize);
      commitSizes(next);
      onDraggerDoubleClick?.(index);
      onResizeEnd?.(next);
    },
    [availableSize, commitSizes, onDraggerDoubleClick, onResizeEnd, panels],
  );

  const toggleCollapse = React.useCallback(
    (panelIndex: number, donateIndex: number) => {
      const current = sizes.length === panels.length ? sizes : createInitialSizes(panels, availableSize);
      const next = [...current];
      const collapsed = next[panelIndex] <= EPSILON;

      if (!panels[panelIndex] || !panels[donateIndex]) return;

      if (collapsed) {
        const donorMin = getPanelMin(panels[donateIndex], availableSize, next[donateIndex] <= EPSILON);
        const fallback = Math.max(
          getPanelMin(panels[panelIndex], availableSize),
          availableSize / panels.length,
        );
        const target = rememberedSizesRef.current[panelIndex] || getPanelDefaultSize(
          panels[panelIndex],
          availableSize,
          fallback,
        );
        const availableFromDonor = Math.max(0, next[donateIndex] - donorMin);
        const restored = Math.min(target, availableFromDonor);
        if (restored <= EPSILON) return;
        next[panelIndex] = restored;
        next[donateIndex] -= restored;
      } else {
        rememberedSizesRef.current[panelIndex] = next[panelIndex];
        next[donateIndex] += next[panelIndex];
        next[panelIndex] = 0;
      }

      commitSizes(next);
      onCollapse?.(
        next.map((size) => size <= EPSILON),
        next,
      );
      onResizeEnd?.(next);
    },
    [availableSize, commitSizes, onCollapse, onResizeEnd, panels, sizes],
  );

  const renderCollapseButton = (
    draggerIndex: number,
    panelIndex: number,
    side: "start" | "end",
  ) => {
    const panel = panels[panelIndex];
    const target = resolveCollapsible(panel?.collapsible, side);
    if (!target.enabled || !target.show) return null;

    const donateIndex = side === "start" ? panelIndex - 1 : panelIndex + 1;
    if (donateIndex < 0 || donateIndex >= panels.length) return null;

    const collapsed = (sizes[panelIndex] ?? 0) <= EPSILON;
    const icon = collapsible?.icon?.[side];
    const label = collapsed ? "Expand panel" : "Collapse panel";
    const horizontalText = side === "start" ? ">" : "<";
    const verticalText = side === "start" ? "v" : "^";
    const text = icon ?? (isHorizontal ? horizontalText : verticalText);

    return (
      <button
        type="button"
        aria-label={`${label} ${panelIndex + 1}`}
        className={cn(
          "absolute z-10 flex h-5 w-4 items-center justify-center rounded border border-[color:var(--ldkj-color-border)] bg-[color:var(--ldkj-color-background)] text-[10px] leading-none text-[color:var(--ldkj-color-muted-foreground)] shadow-sm transition hover:border-[color:var(--ldkj-color-primary)] hover:text-[color:var(--ldkj-color-primary)] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
          target.auto ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          isHorizontal
            ? side === "start"
              ? "top-[calc(50%_-_22px)]"
              : "top-[calc(50%_+_2px)]"
            : side === "start"
              ? "left-[calc(50%_-_22px)]"
              : "left-[calc(50%_+_2px)]",
        )}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleCollapse(panelIndex, donateIndex);
        }}
      >
        {text}
      </button>
    );
  };

  const displaySizes = !lazy && previewSizes ? previewSizes : sizes;
  const ghostOffset =
    lazy && previewSizes && draggingIndex !== null
      ? previewSizes
          .slice(0, draggingIndex + 1)
          .reduce((sum, size) => sum + size, draggingIndex * DRAGGER_SIZE)
      : undefined;

  return (
    <div
      ref={rootRef}
      className={cn(
        "ldkj-splitter relative flex min-h-0 min-w-0 overflow-hidden text-[color:var(--ldkj-color-foreground)]",
        isHorizontal ? "h-full w-full flex-row" : "h-full w-full flex-col",
        sxClassName,
        resolvedClassNames?.root,
        className,
      )}
      style={mergeSxStyle(style, resolvedStyles?.root, sxInlineStyle)}
      {...restProps}
    >
      {panelElements.map((panel, index) => {
        const panelProps = panel.props;
        const size = displaySizes[index];
        const hidden = size <= EPSILON;
        const shouldDestroy = panelProps.destroyOnHidden ?? destroyOnHidden;
        const basis = size === undefined ? `${100 / panelElements.length}%` : `${Math.max(0, size)}px`;
        const panelStyle: React.CSSProperties = {
          flex: `0 0 ${basis}`,
          maxWidth: isHorizontal ? basis : undefined,
          maxHeight: isHorizontal ? undefined : basis,
        };

        return (
          <React.Fragment key={panel.key ?? index}>
            <div
              className={cn(
                "ldkj-splitter-panel min-h-0 min-w-0 overflow-auto",
                motionEnabled && draggingIndex === null && "transition-[flex-basis,max-width,max-height] duration-200 ease-out",
                hidden && "overflow-hidden",
                resolvedClassNames?.panel,
                panelProps.className,
              )}
              style={mergeSxStyle(panelProps.style, panelStyle, resolvedStyles?.panel)}
              data-splitter-panel={index}
              data-collapsed={hidden ? "" : undefined}
              {...Object.fromEntries(
                Object.entries(panelProps).filter(
                  ([key]) =>
                    ![
                      "children",
                      "collapsible",
                      "defaultSize",
                      "destroyOnHidden",
                      "max",
                      "min",
                      "resizable",
                      "size",
                      "style",
                      "className",
                    ].includes(key),
                ),
              )}
            >
              {hidden && shouldDestroy ? null : panelProps.children}
            </div>

            {index < panelElements.length - 1 ? (
              <div
                role="separator"
                aria-orientation={isHorizontal ? "vertical" : "horizontal"}
                aria-valuemin={0}
                aria-valuemax={Math.round(availableSize)}
                aria-valuenow={Math.round(displaySizes[index] ?? 0)}
                tabIndex={panels[index]?.resizable === false || panels[index + 1]?.resizable === false ? -1 : 0}
                className={cn(
                  "ldkj-splitter-dragger group relative z-[1] flex flex-none items-center justify-center bg-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]",
                  isHorizontal ? "cursor-col-resize px-[3px]" : "cursor-row-resize py-[3px]",
                  panels[index]?.resizable === false || panels[index + 1]?.resizable === false
                    ? "cursor-not-allowed opacity-60"
                    : "hover:bg-[color:var(--ldkj-color-muted)]/60",
                  draggingIndex === index && "bg-[color:var(--ldkj-color-muted)]/80",
                  resolvedClassNames?.dragger,
                )}
                style={mergeSxStyle(
                  isHorizontal
                    ? { width: DRAGGER_SIZE, minWidth: DRAGGER_SIZE }
                    : { height: DRAGGER_SIZE, minHeight: DRAGGER_SIZE },
                  resolvedStyles?.dragger,
                )}
                data-splitter-dragger={index}
                onPointerDown={(event) => startResize(event, index)}
                onDoubleClick={() => resetFromDragger(index)}
                onKeyDown={(event) => {
                  if (isHorizontal && event.key === "ArrowLeft") {
                    event.preventDefault();
                    resizeFromKeyboard(index, -KEYBOARD_STEP);
                  }
                  if (isHorizontal && event.key === "ArrowRight") {
                    event.preventDefault();
                    resizeFromKeyboard(index, KEYBOARD_STEP);
                  }
                  if (!isHorizontal && event.key === "ArrowUp") {
                    event.preventDefault();
                    resizeFromKeyboard(index, -KEYBOARD_STEP);
                  }
                  if (!isHorizontal && event.key === "ArrowDown") {
                    event.preventDefault();
                    resizeFromKeyboard(index, KEYBOARD_STEP);
                  }
                }}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block rounded-full bg-[color:var(--ldkj-color-border)] transition-colors group-hover:bg-[color:var(--ldkj-color-primary)]",
                    isHorizontal ? "h-7 w-0.5" : "h-0.5 w-7",
                  )}
                />
                {draggerIcon ? (
                  <span className="pointer-events-none absolute text-[color:var(--ldkj-color-muted-foreground)]">
                    {draggerIcon}
                  </span>
                ) : null}
                {renderCollapseButton(index, index, "end")}
                {renderCollapseButton(index, index + 1, "start")}
              </div>
            ) : null}
          </React.Fragment>
        );
      })}

      {ghostOffset !== undefined ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute z-10 bg-[color:var(--ldkj-color-primary)] shadow-[0_0_0_1px_var(--ldkj-color-primary)]",
            isHorizontal ? "bottom-0 top-0 w-0.5" : "left-0 right-0 h-0.5",
          )}
          style={isHorizontal ? { left: ghostOffset } : { top: ghostOffset }}
        />
      ) : null}
    </div>
  );
});

SplitterBase.displayName = "Splitter";

export const Splitter = Object.assign(SplitterBase, {
  Panel: SplitterPanel,
}) as SplitterComponent;
