import * as React from "react";
import type {
  CascaderFieldNames,
  CascaderLoadDataMeta,
  CascaderOption,
  CascaderRenderOptionState,
  CascaderValue,
  CascaderValueChangeMeta,
} from "@/components/form/cascader";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import {
  ChevronRightIcon,
  getAlignClass,
  LoadingSpinner,
  MobileDrawer,
  MobileTrigger,
  useControllableValue,
  type MobileOptionAlign,
} from "../shared";

export type MobileCascaderRef = {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  getValue: () => CascaderValue;
};

export type MobileCascaderProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "value" | "defaultValue" | "onChange"
> & {
  class?: string;
  sx?: SxProps;
  options?: CascaderOption[];
  value?: CascaderValue;
  defaultValue?: CascaderValue;
  onValueChange?: (value: CascaderValue, meta: CascaderValueChangeMeta) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: React.ReactNode;
  title?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  separator?: React.ReactNode;
  displayRender?: (labels: React.ReactNode[], options: CascaderOption[]) => React.ReactNode;
  renderOption?: (
    option: CascaderOption,
    state: CascaderRenderOptionState,
  ) => React.ReactNode;
  fieldNames?: CascaderFieldNames;
  changeOnSelect?: boolean;
  clearable?: boolean;
  readOnly?: boolean;
  required?: boolean;
  loadData?: (
    selectedOptions: CascaderOption[],
    meta: CascaderLoadDataMeta,
  ) => void | Promise<void>;
  align?: MobileOptionAlign;
  levelLabels?: React.ReactNode[];
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

type ResolvedOption = {
  option: CascaderOption;
  value: string;
  label: Exclude<React.ReactNode, undefined>;
  children: CascaderOption[];
  disabled: boolean;
  isLeaf: boolean;
  loading: boolean;
};

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
  return (option[key] as React.ReactNode) ?? option.label ?? option.value ?? "";
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

function resolveOptions(options: CascaderOption[], fieldNames?: CascaderFieldNames) {
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
  const matched: ResolvedOption[] = [];
  const labels: React.ReactNode[] = [];
  let currentOptions = options;

  for (const segment of path) {
    const current = resolveOptions(currentOptions, fieldNames).find(
      (item) => item.value === segment,
    );

    if (!current) break;

    matched.push(current);
    labels.push(current.label);
    currentOptions = current.children;
  }

  return {
    matched,
    labels,
    path: matched.map((item) => item.value),
  };
}

function getColumns(
  options: CascaderOption[],
  path: string[],
  fieldNames?: CascaderFieldNames,
) {
  const columns: ResolvedOption[][] = [resolveOptions(options, fieldNames)];
  let currentOptions = options;

  for (const segment of path) {
    const current = resolveOptions(currentOptions, fieldNames).find(
      (item) => item.value === segment,
    );

    if (!current || current.children.length === 0) break;

    currentOptions = current.children;
    columns.push(resolveOptions(currentOptions, fieldNames));
  }

  return columns;
}

function isPrefix(path: string[], prefix: string[]) {
  return prefix.every((item, index) => path[index] === item);
}

function joinPath(labels: React.ReactNode[], separator: React.ReactNode) {
  return (
    <>
      {labels.map((label, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <span className="mx-1 text-[color:var(--ldkj-color-muted-foreground)]">{separator}</span>
          ) : null}
          <span className="min-w-0 truncate">{label}</span>
        </React.Fragment>
      ))}
    </>
  );
}

function getFallbackLevelLabel(index: number) {
  return `第${index + 1}级`;
}

/**
 * MobileCascader 是移动端级联抽屉，沿用 Cascader 的路径数组值模型。
 */
export const MobileCascader = React.forwardRef<
  MobileCascaderRef,
  MobileCascaderProps
>((props, ref) => {
  const {
    options = [],
    value,
    defaultValue = [],
    onValueChange,
    open,
    defaultOpen = false,
    onOpenChange,
    placeholder = "请选择",
    title = "请选择",
    cancelText,
    confirmText,
    separator = "/",
    displayRender,
    renderOption,
    fieldNames,
    changeOnSelect = false,
    clearable = false,
    readOnly = false,
    required,
    loadData,
    align = "left",
    levelLabels,
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

  const normalizedControlledValue = value === undefined ? undefined : normalizePath(value);
  const [selectedPath, setSelectedPath, valueControlled] =
    useControllableValue<CascaderValue>({
      value: normalizedControlledValue,
      defaultValue: normalizePath(defaultValue),
    });
  const [openState, setOpenState] = useControllableValue<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [pendingPath, setPendingPath] = React.useState<CascaderValue>(() =>
    normalizePath(defaultValue),
  );
  const [activeLevel, setActiveLevel] = React.useState(0);
  const [loadingPathKey, setLoadingPathKey] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const mountedRef = React.useRef(true);
  const loadDataRef = React.useRef(loadData);
  const theme = useSxTheme();

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    loadDataRef.current = loadData;
  }, [loadData]);

  React.useEffect(() => {
    if (openState) {
      const normalized = normalizePath(selectedPath);
      setPendingPath(normalized);
      setActiveLevel(Math.max(normalized.length - 1, 0));
    }
  }, [openState, selectedPath]);

  const selectedResolved = React.useMemo(
    () => findPath(options, selectedPath, fieldNames),
    [fieldNames, options, selectedPath],
  );
  const selectedOptions = selectedResolved.matched.map((item) => item.option);
  const pendingResolved = React.useMemo(
    () => findPath(options, pendingPath, fieldNames),
    [fieldNames, options, pendingPath],
  );
  const columns = React.useMemo(
    () => getColumns(options, pendingPath, fieldNames),
    [fieldNames, options, pendingPath],
  );
  const safeActiveLevel = Math.min(activeLevel, Math.max(columns.length - 1, 0));
  const activeColumn = columns[safeActiveLevel] ?? [];
  const lastPendingOption = pendingResolved.matched[pendingResolved.matched.length - 1];
  const confirmDisabled =
    pendingResolved.path.length === 0 ||
    Boolean(lastPendingOption?.disabled) ||
    (!changeOnSelect &&
      Boolean(lastPendingOption) &&
      !lastPendingOption?.isLeaf &&
      (lastPendingOption?.children.length ?? 0) > 0);

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

  const commitValue = React.useCallback(
    (
      nextPath: string[],
      meta: Omit<CascaderValueChangeMeta, "path" | "options" | "labels">,
    ) => {
      const resolved = findPath(options, normalizePath(nextPath), fieldNames);

      if (!valueControlled) {
        setSelectedPath(resolved.path);
      }

      onValueChange?.(resolved.path, {
        ...meta,
        path: resolved.path,
        options: resolved.matched.map((item) => item.option),
        labels: resolved.labels,
      });
    },
    [fieldNames, onValueChange, options, setSelectedPath, valueControlled],
  );

  const handleClear = React.useCallback(
    (event?: React.SyntheticEvent) => {
      if (disabled || readOnly) return;

      setPendingPath([]);
      setActiveLevel(0);
      commitValue([], {
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

    if (confirmDisabled) return;

    commitValue(pendingResolved.path, {
      reason: "select",
      option: lastPendingOption?.option,
    });
    setOpenState(false);
  }, [
    commitValue,
    confirmDisabled,
    disabled,
    lastPendingOption?.option,
    pendingResolved.path,
    readOnly,
    setOpenState,
  ]);

  const handleOptionSelect = React.useCallback(
    async (
      option: ResolvedOption,
      level: number,
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (disabled || readOnly || option.disabled) return;

      const nextPath = [...pendingPath.slice(0, level), option.value];
      const hasChildren = option.children.length > 0;
      const canLoad = !option.isLeaf && !hasChildren && Boolean(loadDataRef.current);
      const canExpand = hasChildren || canLoad;
      const pathKey = nextPath.join("\u0001");

      setPendingPath(nextPath);

      if (canExpand) {
        setActiveLevel(level + 1);
      } else {
        setActiveLevel(level);
      }

      if (canLoad && loadDataRef.current) {
        const resolved = findPath(options, nextPath, fieldNames);
        setLoadingPathKey(pathKey);
        try {
          await loadDataRef.current(resolved.matched.map((item) => item.option), {
            option: option.option,
            path: nextPath,
            options,
          });
        } finally {
          if (mountedRef.current) {
            setLoadingPathKey((current) => (current === pathKey ? null : current));
          }
        }
      }

      if (changeOnSelect && !canExpand) {
        event.currentTarget.focus();
      }
    },
    [changeOnSelect, disabled, fieldNames, options, pendingPath, readOnly],
  );

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
      getValue: () => selectedPath.slice(),
    }),
    [handleClear, openPanel, selectedPath, setOpenState],
  );

  return (
    <>
      <MobileTrigger
        ref={triggerRef}
        id={id}
        open={openState}
        clearable={clearable}
        hasValue={selectedResolved.path.length > 0}
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
        confirmDisabled={confirmDisabled}
        maxHeight={maxDrawerHeight}
        className={drawerClassName}
        class={legacyDrawerClass}
        style={drawerStyle}
        sx={drawerSx}
        onCancel={() => {
          setPendingPath(selectedPath);
          setActiveLevel(Math.max(selectedPath.length - 1, 0));
        }}
        onConfirm={handleConfirm}
        onOpenChange={setOpenState}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 border-b border-[color:var(--ldkj-color-border)] px-4">
            {columns.map((_, level) => {
              const checked = safeActiveLevel === level;
              const fallbackLabel =
                pendingResolved.labels[level] ?? getFallbackLevelLabel(level);
              const label = levelLabels?.[level] ?? fallbackLabel;

              return (
                <button
                  key={`level-${level}`}
                  type="button"
                  className={cn(
                    "relative min-h-10 min-w-12 px-3 text-sm text-[color:var(--ldkj-color-foreground)] transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ldkj-color-ring)]/30",
                    checked && "font-medium text-[color:var(--ldkj-color-primary)]",
                  )}
                  onClick={() => setActiveLevel(level)}
                >
                  {label}
                  {checked ? (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[color:var(--ldkj-color-primary)]" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
            {activeColumn.length === 0 ? (
              <div className="flex min-h-32 items-center justify-center text-sm text-[color:var(--ldkj-color-muted-foreground)]">
                {loadingPathKey ? (
                  <span className="inline-flex items-center gap-2">
                    <LoadingSpinner />
                    加载中
                  </span>
                ) : (
                  "暂无可选项"
                )}
              </div>
            ) : (
              <div className="grid gap-1">
                {activeColumn.map((item) => {
                  const path = [...pendingPath.slice(0, safeActiveLevel), item.value];
                  const checked =
                    pendingResolved.path.length === path.length &&
                    isPrefix(pendingResolved.path, path);
                  const active =
                    isPrefix(pendingResolved.path, path) ||
                    isPrefix(path, pendingResolved.path);
                  const loading =
                    loadingPathKey === path.join("\u0001") || item.loading;
                  const hasChildren =
                    item.children.length > 0 ||
                    (!item.isLeaf && Boolean(loadDataRef.current) && !loading);
                  const state: CascaderRenderOptionState = {
                    active,
                    checked,
                    disabled: item.disabled,
                    hasChildren,
                    isLeaf: item.isLeaf,
                    level: safeActiveLevel,
                    loading,
                    path,
                    selected: checked,
                  };
                  const resolvedOptionSx = resolveSx([optionSx, item.option.sx], theme);

                  return (
                    <button
                      key={path.join("\u0001")}
                      type="button"
                      className={cn(
                        "flex min-h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        getAlignClass(align),
                        checked
                          ? "bg-[color:var(--ldkj-color-primary)] text-[color:var(--ldkj-color-primary-foreground)]"
                          : "text-[color:var(--ldkj-color-foreground)] hover:bg-[color:var(--ldkj-color-accent)] hover:text-[color:var(--ldkj-color-accent-foreground)]",
                        active && !checked && "bg-[color:var(--ldkj-color-muted)] text-[color:var(--ldkj-color-foreground)]",
                        item.disabled &&
                          "cursor-not-allowed bg-transparent text-[color:var(--ldkj-color-muted-foreground)] opacity-70 hover:bg-transparent hover:text-[color:var(--ldkj-color-muted-foreground)]",
                        resolvedOptionSx.sxClassName,
                        optionClassName,
                        legacyOptionClass,
                        item.option.className,
                        item.option.class,
                      )}
                      style={mergeSxStyle(
                        optionStyle,
                        resolvedOptionSx.sxInlineStyle,
                        item.option.style,
                      )}
                      disabled={disabled || readOnly || item.disabled}
                      onClick={(event) => {
                        event.preventDefault();
                        void handleOptionSelect(item, safeActiveLevel, event);
                      }}
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {renderOption ? renderOption(item.option, state) : item.label}
                      </span>
                      {loading ? (
                        <LoadingSpinner />
                      ) : hasChildren ? (
                        <ChevronRightIcon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            checked ? "text-[color:var(--ldkj-color-primary-foreground)]" : "text-[color:var(--ldkj-color-muted-foreground)]",
                          )}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </MobileDrawer>

      {name ? (
        <input
          type="hidden"
          name={name}
          required={required}
          value={selectedPath.length > 0 ? JSON.stringify(selectedPath) : ""}
        />
      ) : null}
    </>
  );
});

MobileCascader.displayName = "MobileCascader";
