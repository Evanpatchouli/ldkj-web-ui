import * as React from "react";
import type { SelectOption, SelectOptionGroup } from "@/components/form/select";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import {
  getAlignClass,
  MobileDrawer,
  MobileTrigger,
  useControllableValue,
  type MobileOptionAlign,
} from "../shared";

export type MobileSelectValueChangeReason = "select" | "clear";

export type MobileSelectValueChangeMeta = {
  reason: MobileSelectValueChangeReason;
  option?: SelectOption;
  event?: React.SyntheticEvent;
};

export type MobileSelectRenderOptionState = {
  active: boolean;
  checked: boolean;
  disabled: boolean;
};

export type MobileSelectRef = {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  getValue: () => string;
};

export type MobileSelectProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "value" | "defaultValue" | "onChange"
> & {
  class?: string;
  sx?: SxProps;
  options?: Array<SelectOption | SelectOptionGroup>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, meta: MobileSelectValueChangeMeta) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: React.ReactNode;
  title?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  clearable?: boolean;
  readOnly?: boolean;
  required?: boolean;
  align?: MobileOptionAlign;
  displayRender?: (option: SelectOption | undefined) => React.ReactNode;
  renderOption?: (
    option: SelectOption,
    state: MobileSelectRenderOptionState,
  ) => React.ReactNode;
  drawerClassName?: string;
  drawerClass?: string;
  drawerStyle?: React.CSSProperties;
  drawerSx?: SxProps;
  maxDrawerHeight?: number | string;
  optionClassName?: string;
  optionClass?: string;
  optionStyle?: React.CSSProperties;
  optionSx?: SxProps;
};

type SelectGroupBlock = {
  type: "group";
  label?: React.ReactNode;
  options: SelectOption[];
  separator?: boolean;
};

type SelectPlainBlock = {
  type: "plain";
  option: SelectOption;
};

type SelectBlock = SelectGroupBlock | SelectPlainBlock;

function isOptionGroup(
  option: SelectOption | SelectOptionGroup,
): option is SelectOptionGroup {
  return "options" in option;
}

function toBlocks(options: Array<SelectOption | SelectOptionGroup>) {
  return options.map((option): SelectBlock => {
    if (isOptionGroup(option)) {
      return {
        type: "group",
        label: option.label,
        options: option.options,
        separator: option.separator,
      };
    }

    return {
      type: "plain",
      option,
    };
  });
}

function flattenOptions(options: Array<SelectOption | SelectOptionGroup>) {
  const result: SelectOption[] = [];

  for (const option of options) {
    if (isOptionGroup(option)) {
      result.push(...option.options);
    } else {
      result.push(option);
    }
  }

  return result;
}

/**
 * MobileSelect 是面向移动端的单选抽屉，沿用 Select 的 option 数据模型。
 */
export const MobileSelect = React.forwardRef<MobileSelectRef, MobileSelectProps>(
  (props, ref) => {
    const {
      options = [],
      value,
      defaultValue = "",
      onValueChange,
      open,
      defaultOpen = false,
      onOpenChange,
      placeholder = "请选择",
      title = "请选择",
      cancelText,
      confirmText,
      clearable = false,
      readOnly = false,
      required,
      align = "left",
      displayRender,
      renderOption,
      drawerClassName,
      drawerClass: legacyDrawerClass,
      drawerStyle,
      drawerSx,
      maxDrawerHeight,
      optionClassName,
      optionClass: legacyOptionClass,
      optionStyle,
      optionSx,
      className,
      class: legacyClass,
      style,
      sx,
      disabled = false,
      name,
      id,
      autoFocus,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      ...restProps
    } = props;

    const [selectedValue, setSelectedValue, valueControlled] =
      useControllableValue<string>({
        value,
        defaultValue,
      });
    const [openState, setOpenState] = useControllableValue<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [pendingValue, setPendingValue] = React.useState(selectedValue);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const theme = useSxTheme();

    const flatOptions = React.useMemo(() => flattenOptions(options), [options]);
    const blocks = React.useMemo(() => toBlocks(options), [options]);
    const selectedOption = React.useMemo(
      () => flatOptions.find((option) => option.value === selectedValue),
      [flatOptions, selectedValue],
    );
    const pendingOption = React.useMemo(
      () => flatOptions.find((option) => option.value === pendingValue),
      [flatOptions, pendingValue],
    );
    const hasValue = selectedValue !== "" && Boolean(selectedOption);
    const triggerDisplay = hasValue
      ? displayRender?.(selectedOption) ?? selectedOption?.label
      : placeholder;

    React.useEffect(() => {
      if (openState) {
        setPendingValue(selectedValue);
      }
    }, [openState, selectedValue]);

    const commitValue = React.useCallback(
      (
        nextValue: string,
        meta: Omit<MobileSelectValueChangeMeta, "option"> & {
          option?: SelectOption;
        },
      ) => {
        if (!valueControlled) {
          setSelectedValue(nextValue);
        }
        onValueChange?.(nextValue, meta);
      },
      [onValueChange, setSelectedValue, valueControlled],
    );

    const handleClear = React.useCallback(
      (event?: React.SyntheticEvent) => {
        if (disabled || readOnly) return;

        setPendingValue("");
        commitValue("", {
          reason: "clear",
          event,
        });
      },
      [commitValue, disabled, readOnly],
    );

    const handleConfirm = React.useCallback(() => {
      if (disabled || readOnly) {
        setOpenState(false);
        return;
      }

      if (!pendingOption) {
        setOpenState(false);
        return;
      }

      commitValue(pendingOption.value, {
        reason: "select",
        option: pendingOption,
      });
      setOpenState(false);
    }, [commitValue, disabled, pendingOption, readOnly, setOpenState]);

    const openPanel = React.useCallback(() => {
      if (disabled) return;
      setOpenState(true);
    }, [disabled, setOpenState]);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => triggerRef.current?.focus(),
        blur: () => triggerRef.current?.blur(),
        open: openPanel,
        close: () => setOpenState(false),
        clear: () => handleClear(),
        getValue: () => selectedValue,
      }),
      [handleClear, openPanel, selectedValue, setOpenState],
    );

    return (
      <>
        <MobileTrigger
          ref={triggerRef}
          id={id}
          open={openState}
          clearable={clearable}
          hasValue={hasValue}
          placeholder={placeholder}
          display={triggerDisplay}
          className={className}
          class={legacyClass}
          style={style}
          sx={sx}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onClear={handleClear}
          onClick={(event) => {
            onClick?.(event);
            openPanel();
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (disabled) return;
            if (event.key === "ArrowDown" || event.key === "Enter") {
              event.preventDefault();
              openPanel();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              setOpenState(false);
            }
          }}
          {...restProps}
        />

        <MobileDrawer
          open={openState}
          title={title}
          cancelText={cancelText}
          confirmText={confirmText}
          confirmDisabled={!pendingOption || Boolean(pendingOption.disabled)}
          maxHeight={maxDrawerHeight}
          className={drawerClassName}
          class={legacyDrawerClass}
          style={drawerStyle}
          sx={drawerSx}
          onCancel={() => setPendingValue(selectedValue)}
          onConfirm={handleConfirm}
          onOpenChange={setOpenState}
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
            {blocks.length === 0 ? (
              <div className="flex min-h-32 items-center justify-center text-sm text-slate-400">
                暂无可选项
              </div>
            ) : (
              <div className="grid gap-1">
                {blocks.map((block, index) => {
                  if (block.type === "plain") {
                    const option = block.option;
                    const checked = pendingValue === option.value;
                    const state: MobileSelectRenderOptionState = {
                      active: checked,
                      checked,
                      disabled: Boolean(option.disabled),
                    };
                    const resolvedOptionSx = resolveSx([optionSx, option.sx], theme);

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "flex min-h-10 w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                          getAlignClass(align),
                          checked
                            ? "bg-blue-600 text-white"
                            : "text-slate-800 hover:bg-blue-50 hover:text-blue-700",
                          option.disabled &&
                            "cursor-not-allowed bg-transparent text-slate-400 opacity-70 hover:bg-transparent hover:text-slate-400",
                          resolvedOptionSx.sxClassName,
                          optionClassName,
                          legacyOptionClass,
                          option.className,
                          option.class,
                        )}
                        style={mergeSxStyle(
                          optionStyle,
                          resolvedOptionSx.sxInlineStyle,
                          option.style,
                        )}
                        disabled={disabled || readOnly || option.disabled}
                        onClick={(event) => {
                          event.preventDefault();
                          setPendingValue(option.value);
                        }}
                      >
                        <span className="min-w-0 truncate">
                          {renderOption ? renderOption(option, state) : option.label}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <div
                      key={`group-${index}`}
                      className={cn(block.separator && index > 0 && "border-t border-slate-200 pt-2")}
                    >
                      {block.label ? (
                        <div className="px-3 py-2 text-xs font-medium text-slate-500">
                          {block.label}
                        </div>
                      ) : null}
                      <div className="grid gap-1">
                        {block.options.map((option) => {
                          const checked = pendingValue === option.value;
                          const state: MobileSelectRenderOptionState = {
                            active: checked,
                            checked,
                            disabled: Boolean(option.disabled),
                          };
                          const resolvedOptionSx = resolveSx([optionSx, option.sx], theme);

                          return (
                            <button
                              key={option.value}
                              type="button"
                              className={cn(
                                "flex min-h-10 w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                                getAlignClass(align),
                                checked
                                  ? "bg-blue-600 text-white"
                                  : "text-slate-800 hover:bg-blue-50 hover:text-blue-700",
                                option.disabled &&
                                  "cursor-not-allowed bg-transparent text-slate-400 opacity-70 hover:bg-transparent hover:text-slate-400",
                                resolvedOptionSx.sxClassName,
                                optionClassName,
                                legacyOptionClass,
                                option.className,
                                option.class,
                              )}
                              style={mergeSxStyle(
                                optionStyle,
                                resolvedOptionSx.sxInlineStyle,
                                option.style,
                              )}
                              disabled={disabled || readOnly || option.disabled}
                              onClick={(event) => {
                                event.preventDefault();
                                setPendingValue(option.value);
                              }}
                            >
                              <span className="min-w-0 truncate">
                                {renderOption
                                  ? renderOption(option, state)
                                  : option.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </MobileDrawer>

        {name ? (
          <input
            type="hidden"
            name={name}
            required={required}
            value={selectedValue}
          />
        ) : null}
      </>
    );
  },
);

MobileSelect.displayName = "MobileSelect";
