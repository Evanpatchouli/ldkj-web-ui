import * as React from "react";
import { cn } from "@/lib/utils";
import {
  mergeSxStyle,
  resolveSx,
  useSxTheme,
  type SxProps,
} from "@/styling";
import { Box, type BoxProps } from "../box";

export type MasonryVariant = "regular" | "balanced";

export type MasonryLayoutInfo = {
  columns: number;
  height: number;
  itemWidth: number;
};

type MasonryRatioProps =
  | {
      /** 项目宽高比，例如 `16 / 9`。 */
      aspectRatio: number;
      width?: never;
      height?: never;
    }
  | {
      /** 用于计算宽高比的原始宽度。 */
      width: number;
      /** 用于计算宽高比的原始高度。 */
      height: number;
      aspectRatio?: never;
    };

export type MasonryItemProps = BoxProps<React.ElementType> &
  MasonryRatioProps & {
    children?: React.ReactNode;
  };

export type MasonryProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> & {
  /** 兼容库内其他布局组件的类名别名。 */
  class?: string;
  /** CSS-in-JS 样式入口。 */
  sx?: SxProps;
  /** 项目的目标最小宽度，单位 px。 */
  frameWidth?: number;
  /** 项目之间的水平和垂直间距，单位 px。 */
  gap?: number;
  /** `regular` 保持固定列分配，`balanced` 优先放入当前最短列。 */
  variant?: MasonryVariant;
  /** 禁用瀑布流计算，使用响应式 CSS Grid 降级布局。 */
  disabled?: boolean;
  /** 每次有效布局完成后触发。 */
  onLayout?: (layout: MasonryLayoutInfo) => void;
  /** 仅支持直接传入 `Masonry.Item`。 */
  children?: React.ReactNode;
};

type ItemLayout = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type ComputedLayout = MasonryLayoutInfo & {
  items: ItemLayout[];
};

type MasonryItemInternalProps = MasonryItemProps & {
  __layout?: ItemLayout;
  __positioned?: boolean;
};

const DEFAULT_FRAME_WIDTH = 240;
const DEFAULT_GAP = 16;
const MASONRY_ITEM_SYMBOL = Symbol("ldkj-masonry-item");

type MasonryItemComponent = React.ForwardRefExoticComponent<
  MasonryItemProps & React.RefAttributes<HTMLDivElement>
> & {
  [MASONRY_ITEM_SYMBOL]: true;
};

type MasonryComponent = React.ForwardRefExoticComponent<
  MasonryProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: MasonryItemComponent;
};

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function normalizePositiveNumber(
  value: number | undefined,
  fallback: number,
): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

function normalizeGap(gap: number | undefined): number {
  return typeof gap === "number" && Number.isFinite(gap) && gap >= 0
    ? gap
    : DEFAULT_GAP;
}

function resolveAspectRatio(props: MasonryItemProps): number {
  const ratio =
    props.aspectRatio !== undefined
      ? props.aspectRatio
      : props.width / props.height;

  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new Error(
      "Masonry.Item requires a finite positive aspectRatio or width/height pair.",
    );
  }

  return ratio;
}

function findShortestColumn(columnHeights: number[]): number {
  let shortestIndex = 0;

  for (let index = 1; index < columnHeights.length; index += 1) {
    if (columnHeights[index] < columnHeights[shortestIndex]) {
      shortestIndex = index;
    }
  }

  return shortestIndex;
}

function computeLayout(
  containerWidth: number,
  ratios: number[],
  frameWidth: number,
  gap: number,
  variant: MasonryVariant,
): ComputedLayout {
  const columns = Math.max(
    1,
    Math.floor((containerWidth + gap) / (frameWidth + gap)),
  );
  const itemWidth = Math.max(
    0,
    (containerWidth - gap * (columns - 1)) / columns,
  );
  const columnHeights = Array.from({ length: columns }, () => 0);
  const items = ratios.map((ratio, index) => {
    const column =
      variant === "balanced"
        ? findShortestColumn(columnHeights)
        : index % columns;
    const height = itemWidth / ratio;
    const itemLayout = {
      x: column * (itemWidth + gap),
      y: columnHeights[column],
      width: itemWidth,
      height,
    };

    columnHeights[column] += height + gap;
    return itemLayout;
  });
  const occupiedHeights = columnHeights.map((height) =>
    height > 0 ? height - gap : 0,
  );

  return {
    columns,
    itemWidth,
    height: Math.max(0, ...occupiedHeights),
    items,
  };
}

function isMasonryItemElement(
  node: React.ReactNode,
): node is React.ReactElement<MasonryItemInternalProps, MasonryItemComponent> {
  return (
    React.isValidElement(node) &&
    Boolean(
      (node.type as MasonryItemComponent | undefined)?.[MASONRY_ITEM_SYMBOL],
    )
  );
}

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

const MasonryItemBase = React.forwardRef<
  HTMLDivElement,
  MasonryItemInternalProps
>((props, ref) => {
  const {
    aspectRatio,
    width,
    height,
    __layout,
    __positioned = false,
    className,
    style,
    children,
    ...restProps
  } = props;
  const ratio = resolveAspectRatio(
    aspectRatio !== undefined
      ? { ...props, aspectRatio }
      : { ...props, width: width as number, height: height as number },
  );
  const frameStyle: React.CSSProperties = __positioned && __layout
    ? {
        position: "absolute",
        left: 0,
        top: 0,
        width: __layout.width,
        height: __layout.height,
        transform: `translate3d(${__layout.x}px, ${__layout.y}px, 0)`,
      }
    : {
        position: "relative",
        width: "100%",
        aspectRatio: String(ratio),
      };

  return (
    <div ref={ref} className="ldkj-masonry__frame" style={frameStyle}>
      <Box
        className={cn("ldkj-masonry__item", className)}
        style={mergeSxStyle(style, {
          position: "absolute",
          inset: 0,
          minWidth: 0,
          minHeight: 0,
        })}
        {...restProps}
      >
        {children}
      </Box>
    </div>
  );
});

MasonryItemBase.displayName = "Masonry.Item";
(MasonryItemBase as unknown as MasonryItemComponent)[MASONRY_ITEM_SYMBOL] = true;

const MasonryBase = React.forwardRef<HTMLDivElement, MasonryProps>(
  (props, forwardedRef) => {
    const {
      frameWidth,
      gap,
      variant = "balanced",
      disabled = false,
      onLayout,
      className,
      class: legacyClass,
      sx,
      style,
      children,
      ...restProps
    } = props;
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = React.useState(0);
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const resolvedFrameWidth = normalizePositiveNumber(
      frameWidth,
      DEFAULT_FRAME_WIDTH,
    );
    const resolvedGap = normalizeGap(gap);
    const { items, ratios } = React.useMemo(() => {
      const nextItems = React.Children.toArray(children).map((node) => {
        if (!isMasonryItemElement(node)) {
          throw new Error(
            "Masonry only accepts direct Masonry.Item children. Fragments and arbitrary elements are not supported.",
          );
        }
        return node;
      });

      return {
        items: nextItems,
        ratios: nextItems.map((item) => resolveAspectRatio(item.props)),
      };
    }, [children]);
    const positioned = !disabled && containerWidth > 0;
    const layout = React.useMemo(
      () =>
        positioned
          ? computeLayout(
              containerWidth,
              ratios,
              resolvedFrameWidth,
              resolvedGap,
              variant,
            )
          : undefined,
      [
        containerWidth,
        positioned,
        ratios,
        resolvedFrameWidth,
        resolvedGap,
        variant,
      ],
    );

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        assignRef(forwardedRef, node);
      },
      [forwardedRef],
    );

    useIsomorphicLayoutEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateWidth = () => {
        const nextWidth = container.getBoundingClientRect().width;
        setContainerWidth((current) =>
          Math.abs(current - nextWidth) < 0.5 ? current : nextWidth,
        );
      };

      updateWidth();
      if (typeof ResizeObserver === "undefined") return;

      const observer = new ResizeObserver(updateWidth);
      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (!layout) return;
      onLayout?.({
        columns: layout.columns,
        height: layout.height,
        itemWidth: layout.itemWidth,
      });
    }, [layout, onLayout]);

    const computedStyle: React.CSSProperties = positioned && layout
      ? {
          position: "relative",
          display: "block",
          width: "100%",
          height: layout.height,
        }
      : {
          position: "relative",
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${resolvedFrameWidth}px), 1fr))`,
          gap: resolvedGap,
        };

    return (
      <div
        ref={setContainerRef}
        className={cn(
          "ldkj-masonry",
          sxClassName,
          className,
          legacyClass,
        )}
        style={mergeSxStyle(style, computedStyle, sxInlineStyle)}
        data-masonry-columns={layout?.columns}
        data-masonry-positioned={positioned ? "true" : "false"}
        data-masonry-variant={variant}
        {...restProps}
      >
        {items.map((item, index) =>
          React.cloneElement(item, {
            key: item.key ?? `masonry-item-${index}`,
            __layout: layout?.items[index],
            __positioned: positioned,
          }),
        )}
      </div>
    );
  },
);

MasonryBase.displayName = "Masonry";

/**
 * Masonry 是面向已知宽高比媒体项目的响应式瀑布流容器。
 * 使用 `Masonry.Item` 声明每个项目的稳定比例。
 */
export const Masonry = Object.assign(MasonryBase, {
  Item: MasonryItemBase as unknown as MasonryItemComponent,
}) as MasonryComponent;
