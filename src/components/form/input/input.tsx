import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

type InputSlotType = "prefix" | "suffix" | "addonBefore" | "addonAfter";

export type InputSlotProps = {
  children?: React.ReactNode;
};

export type InputAddonProps = InputSlotProps & {
  position?: "before" | "after";
};

export type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "prefix"> & {
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  class?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  sx?: SxProps;
};

function createInputSlot(displayName: string, slotType: InputSlotType) {
  const Slot = (props: InputSlotProps) => <>{props.children}</>;

  Slot.displayName = displayName;
  Object.defineProperty(Slot, "__ldkjInputSlot", {
    value: slotType,
  });

  return Slot;
}

const InputPrefix = createInputSlot("Input.Prefix", "prefix");
const InputSuffix = createInputSlot("Input.Suffix", "suffix");
const InputAddonBefore = createInputSlot("Input.AddonBefore", "addonBefore");
const InputAddonAfter = createInputSlot("Input.AddonAfter", "addonAfter");

const InputAddon = (props: InputAddonProps) => <>{props.children}</>;
InputAddon.displayName = "Input.Addon";
Object.defineProperty(InputAddon, "__ldkjInputSlot", {
  value: "addon",
});

function getInputSlotType(child: React.ReactNode): InputSlotType | undefined {
  if (!React.isValidElement(child)) {
    return undefined;
  }

  const component = child.type as { __ldkjInputSlot?: InputSlotType | "addon" };
  const slotType = component.__ldkjInputSlot;

  if (slotType === "addon") {
    const position = (child.props as InputAddonProps).position ?? "before";

    return position === "after" ? "addonAfter" : "addonBefore";
  }

  return slotType;
}

function resolveInputSlots(
  children: React.ReactNode,
  props: Pick<InputProps, "addonAfter" | "addonBefore" | "prefix" | "suffix">,
) {
  const slots = {
    addonAfter: props.addonAfter,
    addonBefore: props.addonBefore,
    prefix: props.prefix,
    suffix: props.suffix,
  };

  React.Children.forEach(children, (child) => {
    const slotType = getInputSlotType(child);

    if (!slotType || !React.isValidElement(child)) {
      return;
    }

    slots[slotType] = child.props.children;
  });

  return slots;
}

function hasInputSlot(slots: ReturnType<typeof resolveInputSlots>) {
  return Object.values(slots).some((slot) => slot !== undefined && slot !== null);
}

/**
 * Input 是基础文本输入框组件，支持原生 input 属性、`class` 别名与本库 `sx` 样式系统。
 */
const InputBase = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    addonAfter,
    addonBefore,
    children,
    className,
    class: legacyClass,
    prefix,
    suffix,
    sx,
    style,
    type = "text",
    ...restProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const slots = resolveInputSlots(children, {
    addonAfter,
    addonBefore,
    prefix,
    suffix,
  });
  const decorated = hasInputSlot(slots);
  const inputClassName = cn(
    decorated
      ? "min-w-0 flex-1 appearance-none border-0 bg-transparent px-0 py-0 text-sm text-[color:var(--ldkj-color-foreground)] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[color:var(--ldkj-color-foreground)] placeholder:text-[color:var(--ldkj-color-muted-foreground)] focus-visible:outline-none disabled:cursor-not-allowed disabled:text-[color:var(--ldkj-color-muted-foreground)]"
      : "flex h-9 w-full appearance-none rounded-md border border-solid border-[color:var(--ldkj-color-input)] bg-[color:var(--ldkj-color-surface)] px-3 py-2 text-sm text-[color:var(--ldkj-color-foreground)] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[color:var(--ldkj-color-foreground)] placeholder:text-[color:var(--ldkj-color-muted-foreground)] focus-visible:border-[color:var(--ldkj-color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)] disabled:cursor-not-allowed disabled:bg-[color:var(--ldkj-color-surface-muted)] disabled:text-[color:var(--ldkj-color-muted-foreground)] disabled:opacity-70",
    !decorated && sxClassName,
    !decorated && className,
    !decorated && legacyClass,
  );

  const input = (
    <input
      ref={ref}
      type={type}
      className={inputClassName}
      style={decorated ? undefined : mergeSxStyle(style, sxInlineStyle)}
      {...restProps}
    />
  );

  if (!decorated) {
    return input;
  }

  const disabled = Boolean(restProps.disabled);

  return (
    <span
      className={cn(
        "inline-flex h-9 w-full items-stretch rounded-md text-sm shadow-sm transition-colors",
        disabled && "opacity-70",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
    >
      {slots.addonBefore ? (
        <span className="inline-flex shrink-0 items-center rounded-l-md border border-r-0 border-solid border-[color:var(--ldkj-color-input)] bg-[color:var(--ldkj-color-surface-muted)] px-3 text-[color:var(--ldkj-color-muted-foreground)]">
          {slots.addonBefore}
        </span>
      ) : null}
      <span
        className={cn(
          "inline-flex min-w-0 flex-1 items-center gap-2 border border-solid border-[color:var(--ldkj-color-input)] bg-[color:var(--ldkj-color-surface)] px-3 text-[color:var(--ldkj-color-foreground)] transition-colors",
          slots.addonBefore ? "rounded-l-none" : "rounded-l-md",
          slots.addonAfter ? "rounded-r-none" : "rounded-r-md",
          "focus-within:border-[color:var(--ldkj-color-primary)] focus-within:ring-2 focus-within:ring-[color:var(--ldkj-color-ring)]",
          disabled &&
            "bg-[color:var(--ldkj-color-surface-muted)] text-[color:var(--ldkj-color-muted-foreground)]",
        )}
      >
        {slots.prefix ? (
          <span className="inline-flex shrink-0 items-center text-[color:var(--ldkj-color-muted-foreground)]">
            {slots.prefix}
          </span>
        ) : null}
        {input}
        {slots.suffix ? (
          <span className="inline-flex shrink-0 items-center text-[color:var(--ldkj-color-muted-foreground)]">
            {slots.suffix}
          </span>
        ) : null}
      </span>
      {slots.addonAfter ? (
        <span className="inline-flex shrink-0 items-center rounded-r-md border border-l-0 border-solid border-[color:var(--ldkj-color-input)] bg-[color:var(--ldkj-color-surface-muted)] px-3 text-[color:var(--ldkj-color-muted-foreground)]">
          {slots.addonAfter}
        </span>
      ) : null}
    </span>
  );
});

InputBase.displayName = "Input";

export const Input = Object.assign(InputBase, {
  Addon: InputAddon,
  AddonAfter: InputAddonAfter,
  AddonBefore: InputAddonBefore,
  Prefix: InputPrefix,
  Suffix: InputSuffix,
});
