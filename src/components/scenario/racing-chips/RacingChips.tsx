import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import "./racing-chips.css";

export type RacingChipsDirection = "left" | "right";

/** A notice and its optional per-item motion overrides. */
export type RacingChipsItem = {
  /** Stable React key. The array index is used when omitted. */
  key?: React.Key;
  /** Any renderable notice content. */
  content: React.ReactNode;
  /** Zero-based lane index. */
  lane?: number;
  /** Initial animation delay in seconds. */
  delay?: number;
  /** One traversal duration in seconds. */
  duration?: number;
};

export type RacingChipsProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  /** Notices to render. Plain React nodes use the shared motion settings. */
  items: Array<React.ReactNode | RacingChipsItem>;
  /** Number of lanes used when an item does not specify `lane`. */
  laneCount?: number;
  /** Vertical distance between adjacent lanes in pixels. */
  laneGap?: number;
  /** One traversal duration in seconds. */
  duration?: number;
  /** Delay increment between adjacent items in seconds. */
  delayStep?: number;
  /** Horizontal movement direction. */
  direction?: RacingChipsDirection;
  /** Pauses all animations without changing their progress. */
  paused?: boolean;
  /** Class name applied to every notice pill. */
  itemClassName?: string;
  /** Inline style applied to every notice pill. */
  itemStyle?: React.CSSProperties;
  /** SX styles applied to the mask container. */
  sx?: SxProps;
  /** Legacy alias for `className`. */
  class?: string;
};

type RacingChipsStyle = React.CSSProperties & {
  "--ldkj-racing-chips-lane-gap": string;
};

type NoticeItemStyle = React.CSSProperties & {
  "--ldkj-racing-chips-delay": string;
  "--ldkj-racing-chips-duration": string;
  "--ldkj-racing-chips-lane": number;
};

function isRacingChipsItem(value: React.ReactNode | RacingChipsItem): value is RacingChipsItem {
  return Boolean(
    value &&
      typeof value === "object" &&
      !React.isValidElement(value) &&
      "content" in value,
  );
}

/**
 * Renders arbitrary notices on looping horizontal lanes inside a masked viewport.
 * The component is presentational and never creates business data by itself.
 */
export function RacingChips(props: RacingChipsProps) {
  const {
    items,
    laneCount = 3,
    laneGap = 28,
    duration = 6,
    delayStep = 1.2,
    direction = "left",
    paused = false,
    itemClassName,
    itemStyle,
    className,
    class: legacyClass,
    sx,
    style,
    role,
    "aria-hidden": ariaHiddenProp,
    "aria-label": ariaLabel,
    ...rest
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const safeLaneCount = Math.max(1, Math.floor(laneCount));
  const ariaHidden = ariaHiddenProp ?? (ariaLabel ? undefined : true);

  return (
    <div
      {...rest}
      className={cn(
        "ldkj-racing-chips",
        `ldkj-racing-chips--${direction}`,
        paused && "ldkj-racing-chips--paused",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(
        {
          "--ldkj-racing-chips-lane-gap": `${Math.max(0, laneGap)}px`,
          ...style,
        } as RacingChipsStyle,
        sxInlineStyle,
      )}
      role={role ?? (ariaHidden ? undefined : "list")}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    >
      {items.map((rawItem, index) => {
        const item = isRacingChipsItem(rawItem) ? rawItem : { content: rawItem };
        const lane = Math.max(0, Math.floor(item.lane ?? index % safeLaneCount));
        const noticeStyle: NoticeItemStyle = {
          "--ldkj-racing-chips-delay": `${item.delay ?? -(index * Math.max(0, delayStep))}s`,
          "--ldkj-racing-chips-duration": `${Math.max(0.1, item.duration ?? duration)}s`,
          "--ldkj-racing-chips-lane": lane,
          ...itemStyle,
        };

        return (
          <div
            className={cn("ldkj-racing-chips__item", itemClassName)}
            key={item.key ?? index}
            style={noticeStyle}
            role={ariaHidden ? undefined : "listitem"}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
