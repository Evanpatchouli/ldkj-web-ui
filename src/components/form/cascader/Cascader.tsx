import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
} from "@/components/interact/popover";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type CascaderFieldNames = {
  label?: string;
  value?: string;
  children?: string;
  disabled?: string;
  isLeaf?: string;
  loading?: string;
};

export type CascaderOption = {
  label?: React.ReactNode;
  value?: string;
  children?: CascaderOption[];
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
} & Record<string, unknown>;

export type CascaderValue = string[];

export type CascaderValueChangeReason = "select" | "clear";

export type CascaderValueChangeMeta = {
  reason: CascaderValueChangeReason;
  path: string[];
  options: CascaderOption[];
  option?: CascaderOption;
  labels: React.ReactNode[];
  event?: React.SyntheticEvent;
};

export type CascaderLoadDataMeta = {
  option: CascaderOption;
  path: string[];
  options: CascaderOption[];
};

export type CascaderRenderOptionState = {
  active: boolean;
  checked: boolean;
  disabled: boolean;
  hasChildren: boolean;
  isLeaf: boolean;
  level: number;
  loading: boolean;
  path: string[];
  selected: boolean;
};

export type CascaderRef = {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  getValue: () => CascaderValue;
};

type StyledProps = {
  className?: string;
  class?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

type ControllableOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

type ResolvedOption = {
  option: CascaderOption;
  value: string;
  label: Exclude<React.ReactNode, undefined>;
  children: CascaderOption[];
  disabled: boolean;
  isLeaf: boolean;
  loading: boolean;
};

function useResolvedSx(sx: SxProps | undefined) {
  const theme = useSxTheme();
  return resolveSx(sx, theme);
}

function useControllableValue<T>(options: ControllableOptions<T>) {
  const { value, defaultValue, onChange } = options;
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const mergedValue = controlled ? value : innerValue;

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!controlled) {
        setInnerValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [controlled, onChange],
  );

  return [mergedValue, setValue] as const;
}

function normalizePath(value?: CascaderValue) {
  return Array.isArray(value) ? value.filter((item) => item !== "") : [];
}

function toOptionArray(optionValue: unknown): CascaderOption[] {
  return Array.isArray(optionValue) ? (optionValue as CascaderOption[]) : [];
}

function getFieldName(fieldNames: CascaderFieldNames | undefined, key: keyof CascaderFieldNames) {
  return fieldNames?.[key] ?? key;
}

function getOptionValue(option: CascaderOption, fieldNames?: CascaderFieldNames) {
  const key = getFieldName(fieldNames, "value");
  return typeof option[key] === "string" ? (option[key] as string) : option.value;
}

function getOptionLabel(
  option: CascaderOption,
  fieldNames?: CascaderFieldNames,
): Exclude<React.ReactNode, undefined> {
  const key = getFieldName(fieldNames, "label");
  return option[key] as React.ReactNode ?? option.label ?? option.value ?? "";
}

function getOptionChildren(option: CascaderOption, fieldNames?: CascaderFieldNames) {
  const key = getFieldName(fieldNames, "children");
  return toOptionArray(option[key]);
}

function getOptionDisabled(option: CascaderOption, fieldNames?: CascaderFieldNames) {
  const key = getFieldName(fieldNames, "disabled");
  return Boolean(option[key] ?? option.disabled);
}

function getOptionIsLeaf(option: CascaderOption, fieldNames?: CascaderFieldNames) {
  const key = getFieldName(fieldNames, "isLeaf");
  const value = option[key];
  return typeof value === "boolean" ? value : option.isLeaf;
}

function getOptionLoading(option: CascaderOption, fieldNames?: CascaderFieldNames) {
  const key = getFieldName(fieldNames, "loading");
  return Boolean(option[key] ?? option.loading);
}

function resolveOption(option: CascaderOption, fieldNames?: CascaderFieldNames) {
  const value = getOptionValue(option, fieldNames);

  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  const children = getOptionChildren(option, fieldNames);
  const isLeafFlag = getOptionIsLeaf(option, fieldNames);
  const isLeaf = typeof isLeafFlag === "boolean" ? isLeafFlag : children.length === 0;

  return {
    option,
    value,
    label: getOptionLabel(option, fieldNames),
    children,
    disabled: getOptionDisabled(option, fieldNames),
    isLeaf,
    loading: getOptionLoading(option, fieldNames),
  } satisfies ResolvedOption;
}

function resolveOptions(
  options: CascaderOption[],
  fieldNames?: CascaderFieldNames,
) {
  const resolved: ResolvedOption[] = [];

  for (const option of options) {
    const next = resolveOption(option, fieldNames);
    if (next) {
      resolved.push(next);
    }
  }

  return resolved;
}

function findPath(options: CascaderOption[], path: string[], fieldNames?: CascaderFieldNames) {
  const resolvedOptions: ResolvedOption[] = [];
  const resolvedLabels: React.ReactNode[] = [];
  let currentOptions = options;

  for (const segment of path) {
    const nextOption = resolveOptions(currentOptions, fieldNames).find(
      (item) => item.value === segment,
    );

    if (!nextOption) {
      break;
    }

    resolvedOptions.push(nextOption);
    resolvedLabels.push(nextOption.label);
    currentOptions = nextOption.children;
  }

  return {
    matched: resolvedOptions,
    labels: resolvedLabels,
    path: resolvedOptions.map((item) => item.value),
  };
}

function getColumns(
  options: CascaderOption[],
  path: string[],
  fieldNames?: CascaderFieldNames,
) {
  const columns: ResolvedOption[][] = [];
  let currentOptions = options;

  columns.push(resolveOptions(currentOptions, fieldNames));

  for (const segment of path) {
    const current = resolveOptions(currentOptions, fieldNames).find(
      (item) => item.value === segment,
    );

    if (!current) {
      break;
    }

    currentOptions = current.children;

    if (currentOptions.length === 0) {
      break;
    }

    columns.push(
      currentOptions
        .map((item) => resolveOption(item, fieldNames))
        .filter((item): item is ResolvedOption => Boolean(item)),
    );
  }

  return columns;
}

function isPrefix(path: string[], prefix: string[]) {
  return prefix.every((item, index) => path[index] === item);
}

function joinPath(
  labels: React.ReactNode[],
  separator: React.ReactNode,
): React.ReactNode {
  return (
    <>
      {labels.map((label, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <span className="mx-1 text-slate-400">{separator}</span>
          ) : null}
          <span className="min-w-0 truncate">{label}</span>
        </React.Fragment>
      ))}
    </>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClearIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4.5 4.5L11.5 11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11.5 4.5L4.5 11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
      aria-hidden="true"
    />
  );
}

export type CascaderProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "value" | "defaultValue" | "onChange"
> & {
  class?: string;
  sx?: SxProps;
  options?: CascaderOption[];
  value?: CascaderValue;
  defaultValue?: CascaderValue;
  onValueChange?: (value: CascaderValue, meta: CascaderValueChangeMeta) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  placeholder?: React.ReactNode;
  separator?: React.ReactNode;
  displayRender?: (labels: React.ReactNode[], options: CascaderOption[]) => React.ReactNode;
  renderOption?: (
    option: CascaderOption,
    state: CascaderRenderOptionState,
  ) => React.ReactNode;
  fieldNames?: CascaderFieldNames;
  changeOnSelect?: boolean;
  expandTrigger?: "click" | "hover";
  clearable?: boolean;
  readOnly?: boolean;
  required?: boolean;
  loadData?: (
    selectedOptions: CascaderOption[],
    meta: CascaderLoadDataMeta,
  ) => void | Promise<void>;
  contentWidth?: number | string;
  maxPanelHeight?: number | string;
  side?: PopoverContentProps["side"];
  align?: PopoverContentProps["align"];
  sideOffset?: number;
  contentClassName?: string;
  contentClass?: string;
  contentStyle?: React.CSSProperties;
  contentSx?: SxProps;
  optionClassName?: string;
  optionClass?: string;
  optionStyle?: React.CSSProperties;
  optionSx?: SxProps;
};

/**
 * Cascader 是多级联动选择器，支持受控/非受控、路径值、清除、懒加载与自定义选项渲染。
 *
 * 组件默认按路径数组提交值，例如 `["zhejiang", "hangzhou"]`。
 * 如果开启 `changeOnSelect`，选择中间层节点也会立即提交当前路径。
 */
export const Cascader = React.forwardRef<CascaderRef, CascaderProps>(
  (props, ref) => {
    const {
      options = [],
      value,
      defaultValue = [],
      onValueChange,
      onOpenChange,
      open,
      defaultOpen = false,
      placeholder = "请选择",
      separator = "/",
      displayRender,
      renderOption,
      fieldNames,
      changeOnSelect = false,
      expandTrigger = "click",
      clearable = false,
      contentWidth = "auto",
      maxPanelHeight = 336,
      side = "bottom",
      align = "start",
      sideOffset = 8,
      contentClassName,
      contentClass: legacyContentClass,
      contentStyle,
      contentSx,
      class: legacyClass,
      sx,
      readOnly = false,
      required,
      loadData,
      optionClassName,
      optionClass: legacyOptionClass,
      optionStyle,
      optionSx,
      className,
      style,
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

    const [selectedPath, setSelectedPath] = useControllableValue<CascaderValue>({
      value: value === undefined ? undefined : normalizePath(value),
      defaultValue: normalizePath(defaultValue),
      onChange: (nextValue) => {
        // 受控模式下由外部 state 驱动，内部只负责同步。
      },
    });
    const [openState, setOpenState] = useControllableValue<boolean>({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    const [panelPath, setPanelPath] = React.useState<string[]>(() =>
      normalizePath(defaultValue),
    );
    const [loadingPathKey, setLoadingPathKey] = React.useState<string | null>(
      null,
    );
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const mountedRef = React.useRef(true);
    const prevOpenRef = React.useRef(openState);
    const { sxClassName, sxInlineStyle } = useResolvedSx(sx);
    const { sxClassName: contentSxClassName, sxInlineStyle: contentSxInlineStyle } =
      useResolvedSx(contentSx);
    const { sxClassName: optionSxClassName, sxInlineStyle: optionSxInlineStyle } =
      useResolvedSx(optionSx);

    React.useEffect(() => {
      return () => {
        mountedRef.current = false;
      };
    }, []);

    React.useEffect(() => {
      if (openState && !prevOpenRef.current) {
        setPanelPath(selectedPath);
      }

      prevOpenRef.current = openState;
    }, [openState, selectedPath]);

    const selectedResolved = React.useMemo(
      () => findPath(options, selectedPath, fieldNames),
      [fieldNames, options, selectedPath],
    );
    const selectedOptions = selectedResolved.matched.map((item) => item.option);

    const activePath = openState ? panelPath : selectedPath;
    const activeResolved = React.useMemo(
      () => findPath(options, activePath, fieldNames),
      [activePath, fieldNames, options],
    );
    const columns = React.useMemo(
      () => getColumns(options, activePath, fieldNames),
      [activePath, fieldNames, options],
    );
    const trailingPlaceholder = React.useMemo(() => {
      const last = activeResolved.matched[activeResolved.matched.length - 1];

      if (!openState || !last) {
        return false;
      }

      return last.children.length === 0 && !last.isLeaf;
    }, [activeResolved.matched, openState]);

    const triggerDisplay = React.useMemo(() => {
      if (selectedResolved.labels.length > 0) {
        if (displayRender) {
          return displayRender(selectedResolved.labels, selectedOptions);
        }

        return joinPath(selectedResolved.labels, separator);
      }

      return placeholder;
    }, [
      displayRender,
      placeholder,
      selectedOptions,
      selectedResolved.labels,
      separator,
    ]);

    const isControlled = value !== undefined;

    const commitValue = React.useCallback(
      (
        nextPath: string[],
        meta: Omit<CascaderValueChangeMeta, "path" | "options" | "labels">,
      ) => {
        const normalizedPath = normalizePath(nextPath);
        const resolved = findPath(options, normalizedPath, fieldNames);

        if (!isControlled) {
          setSelectedPath(normalizedPath);
        }

        onValueChange?.(normalizedPath, {
          ...meta,
          path: resolved.path,
          options: resolved.matched.map((item) => item.option),
          labels: resolved.labels,
        });
      },
      [fieldNames, isControlled, onValueChange, options, setSelectedPath],
    );

    const handleClear = React.useCallback(
      (event?: React.SyntheticEvent) => {
        if (disabled || readOnly) {
          return;
        }

        if (!isControlled) {
          setSelectedPath([]);
        }

        setPanelPath([]);
        onValueChange?.([], {
          reason: "clear",
          path: [],
          options: [],
          labels: [],
          event,
        });
      },
      [disabled, isControlled, onValueChange, readOnly, setSelectedPath],
    );

    const loadDataRef = React.useRef(loadData);

    React.useEffect(() => {
      loadDataRef.current = loadData;
    }, [loadData]);

    const handleOptionSelect = React.useCallback(
      async (
        option: ResolvedOption,
        path: string[],
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
      ) => {
        if (disabled || readOnly || option.disabled) {
          return;
        }

        const hasChildren = option.children.length > 0;
        const canExpand = hasChildren || (!option.isLeaf && Boolean(loadDataRef.current));
        const pathKey = path.join("\u0001");

        if (canExpand && !hasChildren && loadDataRef.current) {
          setLoadingPathKey(pathKey);
          try {
            await loadDataRef.current([option.option], {
              option: option.option,
              path,
              options,
            });
          } finally {
            if (mountedRef.current) {
              setLoadingPathKey((current) => (current === pathKey ? null : current));
            }
          }
        }

        if (changeOnSelect || !canExpand) {
          commitValue(path, {
            reason: "select",
            option: option.option,
            event,
          });
          setOpenState(false);
          return;
        }

        setPanelPath(path);
        setOpenState(true);
      },
      [changeOnSelect, commitValue, disabled, options, readOnly, setOpenState],
    );

    const openPanelAtPath = React.useCallback(
      (path: string[]) => {
        if (disabled) {
          return;
        }

        setPanelPath(path);
        setOpenState(true);
      },
      [disabled, setOpenState],
    );

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => triggerRef.current?.focus(),
        blur: () => triggerRef.current?.blur(),
        open: () => openPanelAtPath(selectedPath),
        close: () => setOpenState(false),
        clear: () => handleClear(),
        getValue: () => selectedPath.slice(),
      }),
      [handleClear, openPanelAtPath, selectedPath, setOpenState],
    );

    const renderLoadingState = loadingPathKey !== null;

    return (
      <div className="relative inline-flex w-full items-stretch">
        <Popover open={openState} onOpenChange={setOpenState}>
          <PopoverTrigger asChild>
            <button
              ref={triggerRef}
              id={id}
              type="button"
              className={cn(
                "flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-solid border-slate-300 bg-white px-3 text-left text-sm text-slate-900 shadow-sm transition-colors",
                "focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
                "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:opacity-70",
                readOnly && "cursor-default",
                clearable && selectedPath.length > 0 && !disabled && !readOnly
                  ? "pr-16"
                  : "pr-9",
                sxClassName,
                className,
                legacyClass,
              )}
              style={mergeSxStyle(style, sxInlineStyle)}
              autoFocus={autoFocus}
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={openState}
              aria-disabled={disabled || undefined}
              aria-readonly={readOnly || undefined}
              onClick={(event) => {
                onClick?.(event);
              }}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={(event) => {
                onKeyDown?.(event);
                if (disabled) {
                  return;
                }

                if (event.key === "ArrowDown" || event.key === "Enter") {
                  event.preventDefault();
                  setOpenState(true);
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  setOpenState(false);
                }
              }}
              {...restProps}
            >
              <span
                className={cn(
                  "min-w-0 flex-1 truncate",
                  selectedResolved.labels.length === 0 && "text-slate-400",
                )}
              >
                {triggerDisplay}
              </span>

              <ChevronDownIcon className="absolute right-3 h-4 w-4 text-slate-500" />
            </button>
          </PopoverTrigger>

          {clearable && selectedPath.length > 0 && !disabled && !readOnly ? (
            <button
              type="button"
              className="absolute right-8 top-1/2 z-10 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
              aria-label="清除选择"
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleClear(event);
              }}
            >
              <ClearIcon className="h-3.5 w-3.5" />
            </button>
          ) : null}

          <PopoverContent
            side={side}
            align={align}
            sideOffset={sideOffset}
            width={contentWidth}
            className={cn(
              "overflow-hidden p-0",
              contentSxClassName,
              contentClassName,
              legacyContentClass,
            )}
            style={mergeSxStyle(contentStyle, contentSxInlineStyle)}
            role="dialog"
            aria-label="级联选择"
          >
            <div
              className="flex min-w-[320px] overflow-hidden bg-white"
              style={{ maxHeight: typeof maxPanelHeight === "number" ? `${maxPanelHeight}px` : maxPanelHeight }}
            >
              {columns.map((column, level) => {
                const parentPath = activePath.slice(0, level);

                if (column.length === 0) {
                  return (
                    <div
                      key={`empty-${level}`}
                      className="flex min-w-44 items-center justify-center border-r border-slate-200 px-4 py-6 text-sm text-slate-400 last:border-r-0"
                    >
                      {renderLoadingState && level === columns.length - 1 ? (
                        <span className="inline-flex items-center gap-2">
                          <LoadingSpinner />
                          加载中
                        </span>
                      ) : (
                        "暂无可选项"
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={`column-${level}`}
                    className={cn(
                      "min-w-48 border-r border-slate-200 last:border-r-0",
                      level > 0 && "bg-slate-50/40",
                    )}
                  >
                    <div className="max-h-full overflow-y-auto p-1">
                      {column.map((item) => {
                      const path = [...parentPath, item.value];
                      const checked = selectedPath.length === path.length && isPrefix(selectedPath, path);
                      const active = isPrefix(activePath, path) || isPrefix(path, activePath);
                      const loading = loadingPathKey === path.join("\u0001") || item.loading;
                        const hasChildren = item.children.length > 0 || (!item.isLeaf && Boolean(loadDataRef.current) && !loading);
                        const state: CascaderRenderOptionState = {
                          active,
                          checked,
                          disabled: item.disabled,
                          hasChildren,
                          isLeaf: item.isLeaf,
                          level,
                          loading,
                          path,
                          selected: checked,
                        };

                        return (
                          <button
                            key={path.join("\u0001")}
                            type="button"
                            className={cn(
                              "flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors",
                              "hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
                              checked && "bg-blue-50 text-blue-700",
                              active && !checked && "bg-slate-100 text-slate-900",
                              item.disabled &&
                                "cursor-not-allowed text-slate-400 opacity-70 hover:bg-transparent hover:text-slate-400",
                              optionSxClassName,
                              optionClassName,
                              legacyOptionClass,
                            )}
                            style={mergeSxStyle(
                              optionStyle,
                              optionSxInlineStyle,
                            )}
                            disabled={disabled || readOnly || item.disabled}
                            onMouseEnter={() => {
                              if (expandTrigger === "hover" && !item.disabled && hasChildren) {
                                setPanelPath(path);
                                setOpenState(true);
                              }
                            }}
                            onClick={(event) => {
                              event.preventDefault();
                              void handleOptionSelect(item, path, event);
                            }}
                          >
                            <span className="min-w-0 flex-1 truncate">
                              {renderOption ? renderOption(item.option, state) : item.label}
                            </span>
                            {loading ? (
                              <LoadingSpinner />
                            ) : hasChildren ? (
                              <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-400" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {trailingPlaceholder ? (
                <div className="flex min-w-44 items-center justify-center border-l border-slate-200 px-4 py-6 text-sm text-slate-400">
                  {renderLoadingState ? (
                    <span className="inline-flex items-center gap-2">
                      <LoadingSpinner />
                      加载中
                    </span>
                  ) : (
                    "请继续选择"
                  )}
                </div>
              ) : null}
            </div>
          </PopoverContent>
        </Popover>

        {name ? (
          <input
            type="hidden"
            name={name}
            required={required}
            value={selectedPath.length > 0 ? JSON.stringify(selectedPath) : ""}
          />
        ) : null}
      </div>
    );
  },
);

Cascader.displayName = "Cascader";
