import * as React from "react";
import { Input, type InputProps } from "@/components/form/input";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type AutoCompleteOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  description?: React.ReactNode;
  keywords?: string[];
  textValue?: string;
};

export type AutoCompleteValueChangeReason = "input" | "select";

export type AutoCompleteValueChangeMeta = {
  reason: AutoCompleteValueChangeReason;
  option?: AutoCompleteOption;
  event: React.ChangeEvent<HTMLInputElement>;
};

export type AutoCompleteFilterOption = (
  option: AutoCompleteOption,
  keyword: string,
) => boolean;

export type AutoCompleteRenderOptionState = {
  active: boolean;
  disabled: boolean;
  inputValue: string;
  selected: boolean;
};

export type AutoCompleteProps = Omit<
  InputProps,
  "defaultValue" | "list" | "onChange" | "value"
> & {
  options?: AutoCompleteOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 返回输入值变化。`reason` 为 `select` 时表示来自建议项选择。
   */
  onValueChange?: (value: string, meta: AutoCompleteValueChangeMeta) => void;
  /**
   * 点击或键盘确认建议项时触发。
   */
  onOptionSelect?: (
    option: AutoCompleteOption,
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement>,
  ) => void;
  /**
   * 自定义过滤逻辑。传入 `false` 时不做本地过滤。
   */
  filterOption?: AutoCompleteFilterOption | false;
  /**
   * 输入框聚焦时是否立即展示建议面板。
   */
  openOnFocus?: boolean;
  /**
   * 没有匹配项时的提示内容。传入 `null` 可隐藏空状态面板。
   */
  emptyText?: React.ReactNode;
  /**
   * 自定义建议项渲染。
   */
  renderOption?: (
    option: AutoCompleteOption,
    state: AutoCompleteRenderOptionState,
  ) => React.ReactNode;
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  rootSx?: SxProps;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownSx?: SxProps;
  optionClassName?: string;
  optionStyle?: React.CSSProperties;
  optionSx?: SxProps;
};

function toInputValue(value: string | number | null | undefined) {
  return value === null || value === undefined ? "" : String(value);
}

function getOptionLabelText(label: React.ReactNode) {
  return typeof label === "string" || typeof label === "number"
    ? String(label)
    : "";
}

function defaultFilterOption(option: AutoCompleteOption, keyword: string) {
  const query = keyword.trim().toLowerCase();

  if (!query) {
    return true;
  }

  const searchText = [
    option.value,
    option.textValue,
    getOptionLabelText(option.label),
    ...(option.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchText.includes(query);
}

function getEnabledIndex(
  options: AutoCompleteOption[],
  startIndex: number,
  direction: 1 | -1,
) {
  if (!options.length) {
    return -1;
  }

  let nextIndex = startIndex;

  for (let step = 0; step < options.length; step += 1) {
    nextIndex = (nextIndex + direction + options.length) % options.length;

    if (!options[nextIndex]?.disabled) {
      return nextIndex;
    }
  }

  return -1;
}

function setNativeInputValue(input: HTMLInputElement, value: string) {
  const prototype = window.HTMLInputElement.prototype;
  const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

  valueSetter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function setRef<TValue>(
  ref: React.ForwardedRef<TValue> | undefined,
  value: TValue,
) {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  ref.current = value;
}

function useComposedRef<TValue>(
  ...refs: Array<React.ForwardedRef<TValue> | undefined>
) {
  return React.useCallback(
    (value: TValue) => {
      for (const ref of refs) {
        setRef(ref, value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}

/**
 * AutoComplete 是带建议面板的文本输入组件。组件使用自绘 listbox 替代原生
 * datalist，使下拉样式、键盘交互和空状态与本库表单组件保持一致。
 */
export const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  (props, ref) => {
    const {
      autoComplete = "off",
      class: legacyClass,
      className,
      defaultValue,
      disabled,
      dropdownClassName,
      dropdownStyle,
      dropdownSx,
      emptyText = "暂无匹配结果",
      filterOption = defaultFilterOption,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onOptionSelect,
      onValueChange,
      openOnFocus = true,
      optionClassName,
      optionStyle,
      optionSx,
      options = [],
      readOnly,
      renderOption,
      rootClassName,
      rootStyle,
      rootSx,
      value,
      ...restProps
    } = props;
    const theme = useSxTheme();
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const pendingSelectionRef = React.useRef<AutoCompleteOption | null>(null);
    const listboxId = React.useId();
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
      toInputValue(defaultValue),
    );
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const isValueControlled = value !== undefined;
    const inputValue = isValueControlled
      ? toInputValue(value)
      : uncontrolledValue;
    const interactive = !disabled && !readOnly;
    const rootResolvedSx = resolveSx(rootSx, theme);
    const dropdownResolvedSx = resolveSx(dropdownSx, theme);
    const optionResolvedSx = resolveSx(optionSx, theme);
    const composedInputRef = useComposedRef(inputRef, ref);

    const filteredOptions = React.useMemo(() => {
      if (filterOption === false) {
        return options;
      }

      return options.filter((option) => filterOption(option, inputValue));
    }, [filterOption, inputValue, options]);

    const showDropdown =
      open && interactive && (filteredOptions.length > 0 || emptyText !== null);
    const activeOption = activeIndex >= 0 ? filteredOptions[activeIndex] : undefined;
    const activeDescendant =
      showDropdown && activeOption
        ? `${listboxId}-option-${activeIndex}`
        : undefined;

    React.useEffect(() => {
      if (!open) {
        return;
      }

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target;

        if (
          target instanceof Node &&
          rootRef.current &&
          !rootRef.current.contains(target)
        ) {
          setOpen(false);
          setActiveIndex(-1);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);

      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [open]);

    React.useEffect(() => {
      if (activeIndex >= filteredOptions.length) {
        setActiveIndex(-1);
      }
    }, [activeIndex, filteredOptions.length]);

    const commitOption = (
      option: AutoCompleteOption,
      event:
        | React.KeyboardEvent<HTMLInputElement>
        | React.MouseEvent<HTMLDivElement>,
    ) => {
      if (option.disabled) {
        return;
      }

      pendingSelectionRef.current = option;

      if (!isValueControlled) {
        setUncontrolledValue(option.value);
      }

      if (inputRef.current) {
        setNativeInputValue(inputRef.current, option.value);
      }

      setOpen(false);
      setActiveIndex(-1);
      onOptionSelect?.(option, event);
      inputRef.current?.focus();

      window.setTimeout(() => {
        if (pendingSelectionRef.current === option) {
          pendingSelectionRef.current = null;
        }
      }, 0);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      const selectedOption = pendingSelectionRef.current;

      pendingSelectionRef.current = null;

      if (!isValueControlled) {
        setUncontrolledValue(nextValue);
      }

      if (interactive) {
        setOpen(selectedOption ? false : true);
      }

      setActiveIndex(-1);
      onChange?.(event);
      onValueChange?.(nextValue, {
        event,
        option: selectedOption ?? undefined,
        reason: selectedOption ? "select" : "input",
      });
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (interactive && openOnFocus) {
        setOpen(true);
      }

      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const relatedTarget = event.relatedTarget;

      if (
        relatedTarget instanceof Node &&
        rootRef.current?.contains(relatedTarget)
      ) {
        onBlur?.(event);
        return;
      }

      setOpen(false);
      setActiveIndex(-1);
      onBlur?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!interactive) {
        onKeyDown?.(event);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((current) =>
          getEnabledIndex(
            filteredOptions,
            current < 0 ? -1 : current,
            1,
          ),
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((current) =>
          getEnabledIndex(
            filteredOptions,
            current < 0 ? filteredOptions.length : current,
            -1,
          ),
        );
      } else if (event.key === "Enter" && open && activeOption) {
        event.preventDefault();
        commitOption(activeOption, event);
      } else if (event.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
      } else if (event.key === "Tab") {
        setOpen(false);
        setActiveIndex(-1);
      }

      onKeyDown?.(event);
    };

    return (
      <div
        ref={rootRef}
        className={cn(
          "relative w-full",
          rootResolvedSx.sxClassName,
          rootClassName,
        )}
        style={mergeSxStyle(rootStyle, rootResolvedSx.sxInlineStyle)}
      >
        <Input
          {...restProps}
          ref={composedInputRef}
          autoComplete={autoComplete}
          class={legacyClass}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={showDropdown ? listboxId : undefined}
          aria-expanded={showDropdown}
          aria-activedescendant={activeDescendant}
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        {showDropdown ? (
          <div
            id={listboxId}
            role="listbox"
            className={cn(
              "absolute left-0 top-full z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-solid border-slate-200 bg-white p-1 text-slate-900 shadow-lg",
              "animate-in fade-in-0 zoom-in-95",
              dropdownResolvedSx.sxClassName,
              dropdownClassName,
            )}
            style={mergeSxStyle(dropdownStyle, dropdownResolvedSx.sxInlineStyle)}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const active = activeIndex === index;
                const selected = option.value === inputValue;
                const disabledOption = Boolean(option.disabled);

                return (
                  <div
                    key={`${option.value}-${index}`}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-disabled={disabledOption || undefined}
                    aria-selected={selected}
                    className={cn(
                      "grid cursor-default select-none gap-0.5 rounded-sm px-2 py-1.5 text-sm leading-5 outline-none transition-colors",
                      active && "bg-blue-50 text-blue-700",
                      selected && !active && "bg-slate-50 text-slate-900",
                      disabledOption
                        ? "pointer-events-none text-slate-400 opacity-70"
                        : "text-slate-700",
                      optionResolvedSx.sxClassName,
                      optionClassName,
                    )}
                    style={mergeSxStyle(
                      optionStyle,
                      optionResolvedSx.sxInlineStyle,
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => {
                      if (!disabledOption) {
                        setActiveIndex(index);
                      }
                    }}
                    onClick={(event) => commitOption(option, event)}
                  >
                    {renderOption ? (
                      renderOption(option, {
                        active,
                        disabled: disabledOption,
                        inputValue,
                        selected,
                      })
                    ) : (
                      <>
                        <span className="truncate font-medium">{option.label}</span>
                        {option.description ? (
                          <span className="truncate text-xs text-slate-500">
                            {option.description}
                          </span>
                        ) : null}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-2 py-2 text-sm text-slate-500">{emptyText}</div>
            )}
          </div>
        ) : null}
      </div>
    );
  },
);

AutoComplete.displayName = "AutoComplete";
