import * as React from "react";

export type BaseStepperStatus = "wait" | "process" | "finish" | "error";
export type BaseStepperSize = "sm" | "md" | "lg";
export type BaseStepperChangeReason = "click" | "previous" | "next" | "finish";

export type BaseStepperItem = {
  key?: React.Key;
  label?: React.ReactNode;
  description?: React.ReactNode;
  optional?: React.ReactNode;
  content?: React.ReactNode;
  status?: BaseStepperStatus;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  class?: string;
  style?: React.CSSProperties;
};

export type BaseStepperStepProps = BaseStepperItem & {
  children?: React.ReactNode;
};

export type BaseStepperRenderState<T extends BaseStepperItem = BaseStepperItem> = {
  index: number;
  current: number;
  item: T;
  status: BaseStepperStatus;
  active: boolean;
  completed: boolean;
  error: boolean;
  disabled: boolean;
  clickable: boolean;
  last: boolean;
};

export type BaseStepperChangeMeta<T extends BaseStepperItem = BaseStepperItem> = {
  previous: number;
  current: number;
  item: T;
  status: BaseStepperStatus;
  reason: BaseStepperChangeReason;
};

export function BaseStepperStep(props: BaseStepperStepProps) {
  return <>{props.children}</>;
}

BaseStepperStep.displayName = "BaseStepperStep";

export function clampStepperIndex(index: number | undefined, count: number) {
  if (count <= 0) return 0;
  if (!Number.isFinite(index)) return 0;

  return Math.max(0, Math.min(count - 1, Math.trunc(index ?? 0)));
}

export function clampStepperPercent(percent: number | undefined) {
  if (percent === undefined || !Number.isFinite(percent)) return undefined;

  return Math.max(0, Math.min(100, percent));
}

export function getStepperItemKey(item: BaseStepperItem, index: number) {
  return item.key ?? index;
}

export function collectStepperItems<T extends BaseStepperItem>(
  items: T[] | undefined,
  children: React.ReactNode,
) {
  if (Array.isArray(items) && items.length > 0) {
    return items;
  }

  return React.Children.toArray(children)
    .filter(React.isValidElement<BaseStepperStepProps>)
    .map((child, index) => {
      const {
        children: childContent,
        key,
        label,
        description,
        optional,
        content,
        status,
        disabled,
        icon,
        className,
        class: legacyClass,
        style,
      } = child.props;

      return {
        key: key ?? child.key ?? index,
        label,
        description,
        optional,
        content: content ?? childContent,
        status,
        disabled,
        icon,
        className,
        class: legacyClass,
        style,
      } as T;
    });
}

export function getStepperStatus(
  index: number,
  current: number,
  status: BaseStepperStatus | undefined,
  itemStatus: BaseStepperStatus | undefined,
) {
  if (itemStatus) return itemStatus;
  if (index < current) return "finish";
  if (index === current) return status ?? "process";

  return "wait";
}

export function canActivateStepperItem(options: {
  index: number;
  current: number;
  status: BaseStepperStatus;
  clickable: boolean;
  linear: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const {
    index,
    current,
    status,
    clickable,
    linear,
    disabled,
    readOnly,
  } = options;

  if (disabled || readOnly || !clickable) return false;
  if (!linear) return true;

  return index <= current || status === "finish";
}

export function useStepperCurrent(options: {
  count: number;
  current?: number;
  defaultCurrent?: number;
}) {
  const { count, current, defaultCurrent = 0 } = options;
  const controlled = current !== undefined;
  const [innerCurrent, setInnerCurrent] = React.useState(() =>
    clampStepperIndex(defaultCurrent, count),
  );
  const resolvedCurrent = clampStepperIndex(
    controlled ? current : innerCurrent,
    count,
  );

  React.useEffect(() => {
    if (!controlled) {
      setInnerCurrent((value) => clampStepperIndex(value, count));
    }
  }, [controlled, count]);

  const setCurrent = React.useCallback(
    (nextCurrent: number) => {
      const normalizedCurrent = clampStepperIndex(nextCurrent, count);

      if (!controlled) {
        setInnerCurrent(normalizedCurrent);
      }

      return normalizedCurrent;
    },
    [controlled, count],
  );

  return {
    current: resolvedCurrent,
    setCurrent,
    controlled,
  };
}

