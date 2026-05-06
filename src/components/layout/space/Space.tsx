import * as React from "react";
import type { ElementType } from "react";
import { mergeSxStyle, type SxObject, type SxProps } from "@/styling";
import { Box, type BoxProps } from "../box";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
type Responsive<T> = T | Partial<Record<Breakpoint, T>>;
type SpaceDirection = "horizontal" | "vertical";
type SpaceAlign = React.CSSProperties["alignItems"];
type SpaceJustify = React.CSSProperties["justifyContent"];
type SpaceWrap = boolean | React.CSSProperties["flexWrap"];
type SpaceGapPreset = "xs" | "sm" | "md" | "lg" | "xl";
type SpaceGapUnit = SpaceGapPreset | number | string;
type SpaceGap =
  | SpaceGapUnit
  | [SpaceGapUnit, SpaceGapUnit]
  | { row?: SpaceGapUnit; column?: SpaceGapUnit }
  | { x?: SpaceGapUnit; y?: SpaceGapUnit };

type SpaceItemOwnProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  flex?: React.CSSProperties["flex"];
  grow?: React.CSSProperties["flexGrow"];
  shrink?: React.CSSProperties["flexShrink"];
  basis?: React.CSSProperties["flexBasis"];
  order?: React.CSSProperties["order"];
  alignSelf?: React.CSSProperties["alignSelf"];
  children?: React.ReactNode;
};

type SpaceItemProps = React.ComponentPropsWithoutRef<"div"> & SpaceItemOwnProps;

const SPACE_BREAKPOINT_MIN_WIDTH: Record<Exclude<Breakpoint, "xs">, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const SPACE_GAP_PRESET_VALUE: Record<SpaceGapPreset, string> = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
};

const SPACE_ITEM_SYMBOL = Symbol("ldkj-space-item");

type SpaceItemComponent = React.FC<SpaceItemProps> & {
  [SPACE_ITEM_SYMBOL]: true;
};

const SpaceItemBase = ((props: SpaceItemProps) => {
  const {
    className,
    class: legacyClass,
    style,
    sx,
    flex,
    grow,
    shrink,
    basis,
    order,
    alignSelf,
    children,
    ...restProps
  } = props;

  return (
    <Box
      className={[className, legacyClass].filter(Boolean).join(" ")}
      style={mergeSxStyle(style, {
        flex,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
        order,
        alignSelf,
      })}
      sx={sx}
      {...restProps}
    >
      {children}
    </Box>
  );
}) as SpaceItemComponent;

SpaceItemBase.displayName = "SpaceItem";
SpaceItemBase[SPACE_ITEM_SYMBOL] = true;

type SpaceOwnProps = {
  direction?: Responsive<SpaceDirection>;
  size?: Responsive<SpaceGap>;
  wrap?: Responsive<SpaceWrap>;
  align?: Responsive<SpaceAlign>;
  justify?: Responsive<SpaceJustify>;
  split?: React.ReactNode;
  itemStyle?: React.CSSProperties;
  itemClassName?: string;
  itemSx?: SxProps;
};

export type SpaceProps = BoxProps<React.ElementType> & SpaceOwnProps;

type SpaceComputedStyle = React.CSSProperties & {
  rowGap?: React.CSSProperties["rowGap"];
  columnGap?: React.CSSProperties["columnGap"];
};

function isResponsiveObject<T>(value: Responsive<T>): value is Partial<Record<Breakpoint, T>> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const keys = Object.keys(value);
  return keys.some((key) => ["xs", "sm", "md", "lg", "xl"].includes(key));
}

function resolveResponsiveBase<T>(value: Responsive<T> | undefined): T | undefined {
  if (value === undefined) return undefined;
  if (!isResponsiveObject(value)) return value;
  return value.xs;
}

function resolveResponsiveSx<T>(
  value: Responsive<T> | undefined,
  mapper: (item: T) => React.CSSProperties,
): SxObject | undefined {
  if (value === undefined || !isResponsiveObject(value)) return undefined;

  const responsiveStyle: SxObject = {};
  (Object.keys(SPACE_BREAKPOINT_MIN_WIDTH) as Array<Exclude<Breakpoint, "xs">>).forEach(
    (breakpoint) => {
      const breakpointValue = value[breakpoint];
      if (breakpointValue === undefined) return;
      const minWidth = SPACE_BREAKPOINT_MIN_WIDTH[breakpoint];
      (responsiveStyle as Record<string, unknown>)[`@media (min-width: ${minWidth}px)`] = mapper(
        breakpointValue,
      );
    },
  );

  return Object.keys(responsiveStyle).length ? responsiveStyle : undefined;
}

function normalizeDirection(direction: SpaceDirection | undefined): React.CSSProperties["flexDirection"] {
  return direction === "vertical" ? "column" : "row";
}

function normalizeWrap(wrap: SpaceWrap | undefined): React.CSSProperties["flexWrap"] {
  if (wrap === undefined) return "wrap";
  if (typeof wrap === "boolean") return wrap ? "wrap" : "nowrap";
  return wrap;
}

function normalizeGapUnit(value: SpaceGapUnit): string {
  if (typeof value === "number") return `${value}px`;
  if (value in SPACE_GAP_PRESET_VALUE) return SPACE_GAP_PRESET_VALUE[value as SpaceGapPreset];
  return value;
}

function normalizeGap(gap: SpaceGap | undefined): Pick<SpaceComputedStyle, "rowGap" | "columnGap"> {
  if (gap === undefined) {
    const normalized = normalizeGapUnit("md");
    return {
      rowGap: normalized,
      columnGap: normalized,
    };
  }

  if (Array.isArray(gap)) {
    return {
      rowGap: normalizeGapUnit(gap[0]),
      columnGap: normalizeGapUnit(gap[1]),
    };
  }

  if (typeof gap === "object") {
    if ("row" in gap || "column" in gap) {
      return {
        rowGap: normalizeGapUnit(gap.row ?? "md"),
        columnGap: normalizeGapUnit(gap.column ?? "md"),
      };
    }
    if ("x" in gap || "y" in gap) {
      return {
        rowGap: normalizeGapUnit(gap.y ?? "md"),
        columnGap: normalizeGapUnit(gap.x ?? "md"),
      };
    }
  }

  const normalized = normalizeGapUnit(gap as SpaceGapUnit);
  return {
    rowGap: normalized,
    columnGap: normalized,
  };
}

function isSpaceItemElement(
  element: React.ReactElement,
): element is React.ReactElement<SpaceItemProps, SpaceItemComponent> {
  return Boolean((element.type as SpaceItemComponent)?.[SPACE_ITEM_SYMBOL]);
}

function renderSpaceChild(
  child: React.ReactNode,
  index: number,
  itemClassName?: string,
  itemStyle?: React.CSSProperties,
  itemSx?: SxProps,
) {
  if (React.isValidElement(child) && isSpaceItemElement(child)) {
    const mergedClassName = [itemClassName, child.props.className, child.props.class]
      .filter(Boolean)
      .join(" ");

    return (
      <SpaceItemBase
        key={child.key ?? `space-item-${index}`}
        {...child.props}
        className={mergedClassName || undefined}
        style={mergeSxStyle(itemStyle, child.props.style)}
        sx={[itemSx, child.props.sx]}
      >
        {child.props.children}
      </SpaceItemBase>
    );
  }

  return (
    <SpaceItemBase
      key={React.isValidElement(child) ? (child.key ?? `space-item-${index}`) : `space-item-${index}`}
      className={itemClassName}
      style={itemStyle}
      sx={itemSx}
    >
      {child}
    </SpaceItemBase>
  );
}

function renderChildrenWithSplit(
  children: React.ReactNode,
  split: React.ReactNode,
  itemClassName?: string,
  itemStyle?: React.CSSProperties,
  itemSx?: SxProps,
) {
  const nodes = React.Children.toArray(children);
  const merged: React.ReactNode[] = [];

  nodes.forEach((child, index) => {
    merged.push(renderSpaceChild(child, index, itemClassName, itemStyle, itemSx));
    if (index < nodes.length - 1) {
      merged.push(
        <SpaceItemBase key={`space-split-${index}`} aria-hidden="true">
          {split}
        </SpaceItemBase>,
      );
    }
  });

  return merged;
}

type SpaceComponent = React.FC<SpaceProps> & {
  Item: typeof SpaceItemBase;
};

export const Space: SpaceComponent = (props) => {
  const {
    direction = "horizontal",
    size = "md",
    wrap = true,
    align,
    justify,
    split,
    itemClassName,
    itemStyle,
    itemSx,
    sx,
    children,
    style,
    ...restProps
  } = props;

  const baseDirection = resolveResponsiveBase(direction) ?? "horizontal";
  const baseSize = resolveResponsiveBase(size) ?? "md";
  const baseWrap = resolveResponsiveBase(wrap) ?? true;
  const baseAlign = resolveResponsiveBase(align);
  const baseJustify = resolveResponsiveBase(justify);
  const gapStyle = normalizeGap(baseSize);

  const computedStyle: SpaceComputedStyle = {
    display: "flex",
    flexDirection: normalizeDirection(baseDirection),
    flexWrap: normalizeWrap(baseWrap),
    alignItems: baseAlign,
    justifyContent: baseJustify,
    rowGap: gapStyle.rowGap,
    columnGap: gapStyle.columnGap,
  };

  const responsiveDirectionSx = resolveResponsiveSx(direction, (item) => ({
    flexDirection: normalizeDirection(item),
  }));
  const responsiveSizeSx = resolveResponsiveSx(size, (item) => normalizeGap(item));
  const responsiveWrapSx = resolveResponsiveSx(wrap, (item) => ({
    flexWrap: normalizeWrap(item),
  }));
  const responsiveAlignSx = resolveResponsiveSx(align, (item) => ({
    alignItems: item,
  }));
  const responsiveJustifySx = resolveResponsiveSx(justify, (item) => ({
    justifyContent: item,
  }));
  const mergedSx: SxProps = [
    responsiveDirectionSx,
    responsiveSizeSx,
    responsiveWrapSx,
    responsiveAlignSx,
    responsiveJustifySx,
    sx,
  ];

  const childrenContent =
    split !== undefined && split !== null
      ? renderChildrenWithSplit(children, split, itemClassName, itemStyle, itemSx)
      : React.Children.toArray(children).map((child, index) =>
          renderSpaceChild(child, index, itemClassName, itemStyle, itemSx),
        );

  return (
    <Box
      style={mergeSxStyle(style, computedStyle)}
      sx={mergedSx}
      {...restProps}
    >
      {childrenContent}
    </Box>
  );
};

Space.displayName = "Space";
Space.Item = SpaceItemBase;
