import * as React from "react";
import type { CSSProperties, ElementType, MouseEventHandler, ReactElement, ReactNode } from "react";
import { GhostButton, type GhostButtonProps } from "./GhostButton";
import { cn } from "@/lib/utils";

type GhostButtonGroupTrigger = "click" | "hover";
type GhostButtonGroupDirection = "up" | "down" | "left" | "right";
type GhostButtonGroupMenuPhase = "closed" | "preparing" | "open" | "exiting";
type GhostButtonGroupPositionProps = Pick<CSSProperties, "position" | "left" | "top" | "right" | "bottom" | "zIndex">;
const GHOST_BUTTON_GROUP_ITEM_MARK = "__LDKJ_GHOST_BUTTON_GROUP_ITEM__";

type GhostButtonGroupItemPositionlessProps<T extends ElementType = "button"> = Omit<
  GhostButtonProps<T>,
  keyof GhostButtonGroupPositionProps
>;

export type GhostButtonGroupItemProps<T extends ElementType = "button"> = GhostButtonGroupItemPositionlessProps<T> & {
  itemKey?: React.Key;
};

export type GhostButtonGroupItemConfig<T extends ElementType = "button"> = GhostButtonGroupItemProps<T> & {
  key?: React.Key;
};

export type GhostButtonGroupProps<T extends ElementType = "button"> = Omit<
  GhostButtonProps<T>,
  keyof GhostButtonGroupPositionProps
> &
  GhostButtonGroupPositionProps & {
    trigger?: GhostButtonGroupTrigger | GhostButtonGroupTrigger[];
    direction?: GhostButtonGroupDirection;
    gap?: number | string;
    items?: GhostButtonGroupItemConfig[];
    children?: ReactNode;
  };

type GhostButtonGroupCompound = {
  Item: <T extends ElementType = "button">(props: GhostButtonGroupItemProps<T>) => ReactElement | null;
};

type GhostButtonGroupComponent = (<T extends ElementType = "button">(
  props: GhostButtonGroupProps<T>,
) => ReactElement | null) &
  GhostButtonGroupCompound;

function GhostButtonGroupItem<T extends ElementType = "button">(_props: GhostButtonGroupItemProps<T>) {
  return null;
}

GhostButtonGroupItem.displayName = "GhostButtonGroup.Item";
(GhostButtonGroupItem as typeof GhostButtonGroupItem & Record<string, boolean>)[GHOST_BUTTON_GROUP_ITEM_MARK] = true;

function isGhostButtonGroupItemType(type: unknown) {
  return Boolean(
    type &&
    typeof type === "function" &&
    (type as unknown as Record<string, unknown>)[GHOST_BUTTON_GROUP_ITEM_MARK] === true,
  );
}

function normalizeGap(gap: number | string) {
  return typeof gap === "number" ? `${gap}px` : gap;
}

function hasTrigger(trigger: GhostButtonGroupTrigger[], expected: GhostButtonGroupTrigger) {
  return trigger.includes(expected);
}

function resolveItemsFromChildren(children: ReactNode): {
  triggerChildren: ReactNode[];
  itemChildren: ReactElement[];
} {
  const triggerChildren: ReactNode[] = [];
  const itemChildren: ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && isGhostButtonGroupItemType(child.type)) {
      itemChildren.push(child);
      return;
    }

    triggerChildren.push(child);
  });

  return { triggerChildren, itemChildren };
}

function resolveMenuStyle(direction: GhostButtonGroupDirection, gap: string): CSSProperties {
  switch (direction) {
    case "down":
      return {
        position: "absolute",
        top: `calc(100% + ${gap})`,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap,
      };
    case "left":
      return {
        position: "absolute",
        right: `calc(100% + ${gap})`,
        top: 0,
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap,
      };
    case "right":
      return {
        position: "absolute",
        left: `calc(100% + ${gap})`,
        top: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap,
      };
    case "up":
    default:
      return {
        position: "absolute",
        bottom: `calc(100% + ${gap})`,
        right: 0,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "flex-end",
        gap,
      };
  }
}

function resolveItemHiddenTransform(direction: GhostButtonGroupDirection) {
  switch (direction) {
    case "down":
      return "translateY(-16px) scale(0.78)";
    case "left":
      return "translateX(16px) scale(0.78)";
    case "right":
      return "translateX(-16px) scale(0.78)";
    case "up":
    default:
      return "translateY(16px) scale(0.78)";
  }
}

function resolveItemMotionStyle(
  direction: GhostButtonGroupDirection,
  phase: GhostButtonGroupMenuPhase,
  index: number,
  total: number,
): CSSProperties {
  const isVisible = phase === "open";
  const enterDelay = index * 85;
  const exitDelay = Math.max(total - index - 1, 0) * 65;

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : resolveItemHiddenTransform(direction),
    transitionProperty: "opacity, transform",
    transitionDuration: isVisible ? "380ms" : "260ms",
    transitionTimingFunction: isVisible ? "cubic-bezier(0.16, 1, 0.3, 1)" : "cubic-bezier(0.4, 0, 1, 1)",
    transitionDelay: `${isVisible ? enterDelay : exitDelay}ms`,
    willChange: "opacity, transform",
  };
}

function GhostButtonGroupRoot<T extends ElementType = "button">(props: GhostButtonGroupProps<T>) {
  const {
    trigger = "click",
    direction = "up",
    gap = 12,
    items,
    children,
    position = "fixed",
    left,
    top,
    right = 16,
    bottom = 16,
    zIndex = 10,
    onClick,
    ...restProps
  } = props;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  const gapValue = normalizeGap(gap);
  const { triggerChildren, itemChildren } = resolveItemsFromChildren(children);
  const resolvedItems = [
    ...(items ?? []),
    ...itemChildren.map((child) => ({
      ...(child.props as GhostButtonGroupItemConfig),
      key: child.key ?? undefined,
    })),
  ];
  const [open, setOpen] = React.useState(false);
  const [menuPhase, setMenuPhase] = React.useState<GhostButtonGroupMenuPhase>("closed");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerChildrenNode = triggerChildren.length > 0 ? <>{triggerChildren}</> : undefined;
  const supportsHover = hasTrigger(triggers, "hover");
  const supportsClick = hasTrigger(triggers, "click");
  const exitDuration = Math.max(resolvedItems.length - 1, 0) * 65;
  const menuVisible = menuPhase !== "closed";

  React.useEffect(() => {
    if (open) {
      if (menuPhase === "open" || menuPhase === "preparing") return;

      setMenuPhase("preparing");

      return;
    }

    if (menuPhase === "closed" || menuPhase === "exiting") return;

    setMenuPhase("exiting");

    const timeout = window.setTimeout(() => {
      setMenuPhase("closed");
    }, exitDuration);

    return () => window.clearTimeout(timeout);
  }, [exitDuration, menuPhase, open]);

  React.useLayoutEffect(() => {
    if (menuPhase !== "preparing") return;

    // Force the hidden state to commit before switching to the visible phase.
    void menuRef.current?.offsetHeight;

    const frame = window.requestAnimationFrame(() => {
      setMenuPhase((current) => (current === "preparing" ? "open" : current));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [menuPhase]);

  React.useEffect(() => {
    if (!open || !supportsClick) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, supportsClick]);

  const handleTriggerClick: MouseEventHandler<HTMLElement> = (event) => {
    if (supportsClick) {
      setOpen((prev) => !prev);
    }

    onClick?.(event as React.MouseEvent<any>);
  };

  const triggerButtonProps = {
    ...restProps,
    position: "static",
    right: undefined,
    bottom: undefined,
    left: undefined,
    top: undefined,
    zIndex: zIndex,
    onClick: handleTriggerClick,
    "aria-expanded": open,
    "aria-haspopup": "menu",
    children: triggerChildrenNode,
  } as unknown as GhostButtonProps<T>;

  return (
    <div
      ref={rootRef}
      className={cn("inline-flex w-fit")}
      style={{ position, left, top, right, bottom, zIndex }}
      onMouseEnter={supportsHover ? () => setOpen(true) : undefined}
      onMouseLeave={supportsHover ? () => setOpen(false) : undefined}
    >
      <div className={cn("relative inline-flex w-fit")}>
        {menuVisible && resolvedItems.length > 0 ? (
          <div
            ref={menuRef}
            style={{
              ...resolveMenuStyle(direction, gapValue),
              pointerEvents: menuPhase === "open" ? "auto" : "none",
            }}
          >
            {resolvedItems.map((item, index) => {
              const { itemKey, onClick: itemOnClick, ...itemProps } = item;

              return (
                <div
                  key={itemKey ?? item.key ?? index}
                  style={resolveItemMotionStyle(direction, menuPhase, index, resolvedItems.length)}
                >
                  <GhostButton
                    position="static"
                    {...itemProps}
                    onClick={(event) => {
                      itemOnClick?.(event as React.MouseEvent<any>);
                      setOpen(false);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        <GhostButton {...triggerButtonProps} />
      </div>
    </div>
  );
}

export const GhostButtonGroup = Object.assign(GhostButtonGroupRoot, {
  Item: GhostButtonGroupItem,
}) as GhostButtonGroupComponent;

(GhostButtonGroup as React.FC).displayName = "GhostButtonGroup";

export type { GhostButtonGroupTrigger, GhostButtonGroupDirection, GhostButtonGroupPositionProps };
