"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { format } from "date-fns";
import { Trigger } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/interact/button";
import { Icon } from "@/components/data-display/icon";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent } from "@/components/interact/popover";
import "./date-time-picker.css";

export type DateTimePickerProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-label"
  | "aria-labelledby"
  | "aria-describedby"
  | "aria-invalid"
  | "onBlur"
> & {
  id?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

function Separator({
  orientation = "horizontal",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "shrink-0 bg-[color:var(--ldkj-color-border)]",
        orientation === "vertical" ? "w-px self-stretch" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}

type TimeColumnProps = {
  id: string;
  label: string;
  value: number;
  size: number;
  onValueChange: (value: number) => void;
};

type TimePart = "hours" | "minutes" | "seconds";

const HOUR_OPTION_COUNT = 24;
const MINUTE_SECOND_OPTION_COUNT = 60;
const TIME_COLUMN_ITEM_HEIGHT = 32;
const TIME_COLUMN_IDLE_DELAY = 72;
const TIME_COLUMN_MAX_INERTIA_DISTANCE = TIME_COLUMN_ITEM_HEIGHT * 6;
const TIME_COLUMN_INERTIA_PROJECTION = 100;
const TIME_COLUMN_MAX_VELOCITY = 1.2;
const TIME_COLUMN_EASING = 0.3;
const TIME_COLUMN_SETTLE_EPSILON = 0.08;
const TIME_COLUMN_OFFSETS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as const;

const wrapTimeValue = (value: number, size: number) =>
  ((value % size) + size) % size;

const createDraftValue = (value?: Date) => {
  const next = value ? new Date(value) : new Date();

  if (value) {
    next.setMilliseconds(0);
  } else {
    next.setHours(0, 0, 0, 0);
  }

  return next;
};

const setTimePart = (date: Date, part: TimePart, value: number) => {
  const next = new Date(date);
  const hours = part === "hours" ? value : next.getHours();
  const minutes = part === "minutes" ? value : next.getMinutes();
  const seconds = part === "seconds" ? value : next.getSeconds();

  next.setHours(hours, minutes, seconds, 0);
  return next;
};

const TimeColumn = ({
  id,
  label,
  value,
  size,
  onValueChange,
}: TimeColumnProps) => {
  const listboxRef = React.useRef<HTMLDivElement>(null);
  const timeWindowRef = React.useRef<HTMLDivElement>(null);
  const selectedTimeWindowRef = React.useRef<HTMLDivElement>(null);
  const valueRef = React.useRef(value);
  const onValueChangeRef = React.useRef(onValueChange);
  const resetMotionRef = React.useRef<() => void>(() => undefined);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  React.useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  React.useEffect(() => {
    const listbox = listboxRef.current;
    const timeWindow = timeWindowRef.current;
    const selectedTimeWindow = selectedTimeWindowRef.current;
    if (!listbox || !timeWindow || !selectedTimeWindow) return;

    let currentOffset = 0;
    let targetOffset = 0;
    let velocity = 0;
    let wheelEventCount = 0;
    let lastWheelTime = 0;
    let lastFrameTime = 0;
    let animationFrame: number | null = null;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let prefersReducedMotion = reducedMotionQuery.matches;

    const setScrolling = (isScrolling: boolean) => {
      if (isScrolling) {
        listbox.dataset.scrolling = "true";
        return;
      }

      delete listbox.dataset.scrolling;
    };

    const renderOffset = () => {
      if (Math.abs(currentOffset) < TIME_COLUMN_SETTLE_EPSILON) {
        timeWindow.style.removeProperty("transform");
        selectedTimeWindow.style.removeProperty("transform");
        return;
      }

      const transform = `translate3d(0, calc(-50% + ${currentOffset}px), 0)`;
      timeWindow.style.transform = transform;
      selectedTimeWindow.style.transform = transform;
    };

    const commitSteps = (steps: number) => {
      if (steps === 0) return;

      const wrappedValue = wrapTimeValue(valueRef.current + steps, size);
      valueRef.current = wrappedValue;

      // 循环中心与像素补偿必须在同一帧提交，避免回收节点时闪跳。
      flushSync(() => onValueChangeRef.current(wrappedValue));
    };

    const recycleCrossedRows = () => {
      let steps = 0;

      while (currentOffset <= -TIME_COLUMN_ITEM_HEIGHT) {
        currentOffset += TIME_COLUMN_ITEM_HEIGHT;
        targetOffset += TIME_COLUMN_ITEM_HEIGHT;
        steps += 1;
      }

      while (currentOffset >= TIME_COLUMN_ITEM_HEIGHT) {
        currentOffset -= TIME_COLUMN_ITEM_HEIGHT;
        targetOffset -= TIME_COLUMN_ITEM_HEIGHT;
        steps -= 1;
      }

      commitSteps(steps);
    };

    const animate = (timestamp: number) => {
      const elapsed = lastFrameTime
        ? Math.min(timestamp - lastFrameTime, 32)
        : 16.67;
      lastFrameTime = timestamp;
      const frameProgress =
        1 - Math.pow(1 - TIME_COLUMN_EASING, elapsed / 16.67);
      const difference = targetOffset - currentOffset;

      currentOffset += difference * frameProgress;

      if (Math.abs(targetOffset - currentOffset) < TIME_COLUMN_SETTLE_EPSILON) {
        currentOffset = targetOffset;
      }

      recycleCrossedRows();
      renderOffset();

      if (
        Math.abs(targetOffset - currentOffset) >= TIME_COLUMN_SETTLE_EPSILON
      ) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      animationFrame = null;
      lastFrameTime = 0;
      if (idleTimer === null) setScrolling(false);
    };

    const ensureAnimation = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const settleToNearestRow = () => {
      if (wheelEventCount > 1) {
        // 多个连续 wheel 事件视为一次手势，按末速度投射有限惯性。
        const inertiaDistance = Math.max(
          -TIME_COLUMN_MAX_INERTIA_DISTANCE,
          Math.min(
            velocity * TIME_COLUMN_INERTIA_PROJECTION,
            TIME_COLUMN_MAX_INERTIA_DISTANCE,
          ),
        );
        targetOffset += inertiaDistance;
      }

      const direction = Math.sign(targetOffset);
      const snappedRows =
        direction *
        Math.round(Math.abs(targetOffset) / TIME_COLUMN_ITEM_HEIGHT);
      targetOffset = snappedRows * TIME_COLUMN_ITEM_HEIGHT;
      wheelEventCount = 0;
      velocity = 0;
      idleTimer = null;
      ensureAnimation();
    };

    const resetMotion = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      currentOffset = 0;
      targetOffset = 0;
      velocity = 0;
      wheelEventCount = 0;
      lastWheelTime = 0;
      lastFrameTime = 0;
      setScrolling(false);
      renderOffset();
    };

    resetMotionRef.current = resetMotion;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;

      event.preventDefault();
      const rawDelta =
        event.deltaMode === 1
          ? event.deltaY * TIME_COLUMN_ITEM_HEIGHT
          : event.deltaMode === 2
            ? Math.sign(event.deltaY) * TIME_COLUMN_ITEM_HEIGHT
            : event.deltaY;
      const normalizedDelta =
        Math.sign(rawDelta) *
        Math.min(Math.abs(rawDelta), TIME_COLUMN_ITEM_HEIGHT);

      if (prefersReducedMotion) {
        resetMotion();
        commitSteps(Math.sign(normalizedDelta));
        return;
      }

      setScrolling(true);

      if (idleTimer) {
        clearTimeout(idleTimer);
      }

      const now = performance.now();
      const elapsed = lastWheelTime
        ? Math.max(8, Math.min(now - lastWheelTime, 48))
        : 16.67;
      const movement = -normalizedDelta;
      const instantVelocity = movement / elapsed;

      velocity =
        wheelEventCount === 0
          ? instantVelocity
          : velocity * 0.6 + instantVelocity * 0.4;
      velocity = Math.max(
        -TIME_COLUMN_MAX_VELOCITY,
        Math.min(velocity, TIME_COLUMN_MAX_VELOCITY),
      );
      wheelEventCount += 1;
      lastWheelTime = now;
      targetOffset += movement;
      ensureAnimation();

      idleTimer = setTimeout(settleToNearestRow, TIME_COLUMN_IDLE_DELAY);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (event.matches) resetMotion();
    };

    listbox.addEventListener("wheel", handleWheel, { passive: false });
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      listbox.removeEventListener("wheel", handleWheel);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      resetMotion();
      resetMotionRef.current = () => undefined;
    };
  }, [size]);

  const commitValue = (nextValue: number) => {
    resetMotionRef.current();
    const wrappedValue = wrapTimeValue(nextValue, size);
    valueRef.current = wrappedValue;
    onValueChangeRef.current(wrappedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keySteps: Partial<Record<string, number>> = {
      ArrowDown: 1,
      ArrowUp: -1,
      PageDown: 5,
      PageUp: -5,
    };
    const steps = keySteps[event.key];

    if (steps !== undefined) {
      event.preventDefault();
      commitValue(valueRef.current + steps);
      return;
    }

    if (event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    commitValue(event.key === "Home" ? 0 : size - 1);
  };

  return (
    <div
      data-slot="date-time-picker-time-column"
      className="flex w-12 flex-col"
    >
      <div
        id={`${id}-label`}
        className="flex h-10 items-center justify-center text-sm font-medium"
      >
        {label}
      </div>
      <Separator />
      <div
        ref={listboxRef}
        id={id}
        role="listbox"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={`${id}-${String(value).padStart(2, "0")}`}
        className="group/time-listbox relative min-h-0 flex-1 overflow-hidden overscroll-contain outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        onKeyDown={handleKeyDown}
      >
        <div
          data-slot="date-time-picker-selection-band"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1 top-1/2 h-8 -translate-y-1/2 rounded-md bg-[color:var(--ldkj-color-primary)]"
        />
        <div
          ref={timeWindowRef}
          data-slot="date-time-picker-time-window"
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col will-change-transform [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]"
        >
          {TIME_COLUMN_OFFSETS.map((offset) => {
            const optionValue = wrapTimeValue(value + offset, size);
            const option = String(optionValue).padStart(2, "0");
            const isSelected = offset === 0;

            return (
              <Button
                key={offset}
                id={`${id}-${option}`}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={isSelected}
                aria-posinset={optionValue + 1}
                aria-setsize={size}
                variant="ghost"
                size="sm"
                className={cn(
                  "mx-1 h-8 w-auto shrink-0 p-0 text-sm transition-colors duration-150 group-data-[scrolling=true]/time-listbox:hover:bg-transparent",
                  isSelected &&
                    "hover:bg-transparent dark:hover:bg-transparent",
                )}
                onClick={() => commitValue(optionValue)}
              >
                {option}
              </Button>
            );
          })}
        </div>
        <div
          data-slot="date-time-picker-selected-viewport"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-1 top-1/2 z-20 h-8 -translate-y-1/2 overflow-hidden rounded-md"
        >
          <div
            ref={selectedTimeWindowRef}
            data-slot="date-time-picker-selected-window"
            className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col text-[color:var(--ldkj-color-primary-foreground)] will-change-transform"
          >
            {TIME_COLUMN_OFFSETS.map((offset) => {
              const option = String(
                wrapTimeValue(value + offset, size),
              ).padStart(2, "0");

              return (
                <span
                  key={offset}
                  className="flex h-8 shrink-0 items-center justify-center text-sm font-medium"
                >
                  {option}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 选择本地日期和精确到秒的 24 小时制时间。
 */
export const DateTimePicker = React.forwardRef<
  HTMLButtonElement,
  DateTimePickerProps
>(
  (
    {
      id,
      value,
      onChange,
      placeholder = "选择日期和时间",
      disabled,
      className,
      class: legacyClass,
      style,
      sx,
      ...triggerProps
    },
    ref,
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(ref, () => triggerRef.current!);
    const theme = useSxTheme();
    const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
    const generatedId = React.useId();
    const timeFieldId = id ?? generatedId;
    const [open, setOpen] = React.useState(false);
    const [draftValue, setDraftValue] = React.useState(() =>
      createDraftValue(value),
    );

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
        setDraftValue(createDraftValue(value));
      }

      setOpen(nextOpen);
    };

    const handleDateSelect = (date?: Date) => {
      if (!date) return;

      setDraftValue((current) => {
        const next = new Date(date);
        next.setHours(
          current.getHours(),
          current.getMinutes(),
          current.getSeconds(),
          0,
        );
        return next;
      });
    };

    const handleTimePartChange = (part: TimePart, timePartValue: number) => {
      setDraftValue((current) => setTimePart(current, part, timePartValue));
    };

    const handleTodayStart = () => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      setDraftValue(todayStart);
    };

    const handleNow = () => {
      const now = new Date();
      now.setMilliseconds(0);
      setDraftValue(now);
    };

    const handleCancel = () => {
      setOpen(false);
    };

    const handleConfirm = () => {
      onChange?.(new Date(draftValue));
      setOpen(false);
    };

    const handleClear = () => {
      setOpen(false);
      onChange?.(undefined);
      triggerRef.current?.focus();
    };

    return (
      <div className="relative w-full" data-slot="date-time-picker">
        <Popover open={open && !disabled} onOpenChange={handleOpenChange}>
          <Trigger
            {...triggerProps}
            ref={triggerRef}
            id={id}
            type="button"
            disabled={disabled}
            className={cn(
              buttonVariants({ variant: "ghost", size: "md" }),
              "w-full justify-start border-[color:var(--ldkj-color-input)] bg-[color:var(--ldkj-color-background)] px-3 text-left font-normal",
              value && !disabled && "pr-10",
              !value && "text-[color:var(--ldkj-color-muted-foreground)]",
              sxClassName,
              className,
              legacyClass,
            )}
            style={mergeSxStyle(style, sxInlineStyle)}
          >
            <Icon name="calendar_today" size={16} />

            <span className="flex-1 truncate">
              {value ? format(value, "yyyy-MM-dd HH:mm:ss") : placeholder}
            </span>
          </Trigger>

          <PopoverContent
            width="auto"
            className="ldkj-date-time-picker-panel overflow-auto p-0"
            align="start"
            aria-labelledby={`${timeFieldId}-title`}
            aria-describedby={undefined}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              triggerRef.current?.focus();
            }}
          >
            <h2 id={`${timeFieldId}-title`} className="sr-only">
              选择日期和时间
            </h2>

            <div className="ldkj-date-time-picker-main flex">
              <Calendar
                mode="single"
                required
                selected={draftValue}
                onSelect={handleDateSelect}
                defaultMonth={draftValue}
              />

              <Separator
                data-slot="date-time-picker-main-separator"
                orientation="vertical"
                className="!h-auto self-stretch"
              />

              <div className="flex">
                <TimeColumn
                  id={`${timeFieldId}-hours`}
                  label="时"
                  value={draftValue.getHours()}
                  size={HOUR_OPTION_COUNT}
                  onValueChange={(nextValue) =>
                    handleTimePartChange("hours", nextValue)
                  }
                />
                <Separator
                  orientation="vertical"
                  className="!h-auto self-stretch"
                />
                <TimeColumn
                  id={`${timeFieldId}-minutes`}
                  label="分"
                  value={draftValue.getMinutes()}
                  size={MINUTE_SECOND_OPTION_COUNT}
                  onValueChange={(nextValue) =>
                    handleTimePartChange("minutes", nextValue)
                  }
                />
                <Separator
                  orientation="vertical"
                  className="!h-auto self-stretch"
                />
                <TimeColumn
                  id={`${timeFieldId}-seconds`}
                  label="秒"
                  value={draftValue.getSeconds()}
                  size={MINUTE_SECOND_OPTION_COUNT}
                  onValueChange={(nextValue) =>
                    handleTimePartChange("seconds", nextValue)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center justify-between gap-2 p-2">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleTodayStart}
                >
                  今天零点
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleNow}
                >
                  此刻
                </Button>
              </div>

              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  取消
                </Button>
                <Button type="button" size="sm" onClick={handleConfirm}>
                  确定
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {value && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ldkj-date-time-picker-clear absolute right-1 top-1/2"
            aria-label="清除日期和时间"
            onClick={handleClear}
          >
            <Icon name="close" size={16} />
          </Button>
        )}
      </div>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";
