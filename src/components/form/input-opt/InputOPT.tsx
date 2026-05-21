import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";

export type InputOPTValueType = "numeric" | "alphabetic" | "alphanumeric";
export type InputOPTSize = "sm" | "md" | "lg";
export type InputOPTVariant = "outline" | "filled" | "underline";

type NativeInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  | "autoFocus"
  | "children"
  | "className"
  | "defaultValue"
  | "maxLength"
  | "onChange"
  | "pattern"
  | "placeholder"
  | "size"
  | "style"
  | "type"
  | "value"
>;

export type InputOPTProps = NativeInputProps & {
  /** 受控验证码值。 */
  value?: string;
  /** 非受控默认验证码值。 */
  defaultValue?: string;
  /** 验证码位数。 */
  length?: number;
  /** 值变化回调，返回过滤后的完整验证码字符串。 */
  onChange?: (value: string) => void;
  /** 填满所有位后触发。 */
  onComplete?: (value: string) => void;
  /** 字符类型过滤规则。 */
  type?: InputOPTValueType;
  /** 自定义单字符过滤规则。 */
  pattern?: RegExp | string;
  /** 粘贴内容进入过滤前的转换函数。 */
  pasteTransformer?: (value: string) => string;
  /** 是否视觉掩码展示，传入字符串可自定义掩码字符。 */
  mask?: boolean | string;
  /** 空槽位占位字符。 */
  placeholder?: string;
  /** 首次挂载时是否自动聚焦输入。 */
  autoFocus?: boolean;
  /** 是否启用一次性验证码自动填充语义。 */
  oneTimeCode?: boolean;
  /** 槽位尺寸。 */
  size?: InputOPTSize;
  /** 槽位视觉风格。 */
  variant?: InputOPTVariant;
  /** 是否展示错误态。 */
  invalid?: boolean;
  /** 根节点类名。 */
  className?: string;
  /** 兼容旧写法的根节点类名。 */
  class?: string;
  /** 真实 input 的类名。 */
  inputClassName?: string;
  /** 单个槽位类名。 */
  slotClassName?: string;
  /** 槽位之间的分隔内容。 */
  separator?: React.ReactNode | ((index: number) => React.ReactNode);
  /** 根节点样式。 */
  style?: React.CSSProperties;
  /** CSS-in-JS 样式入口。 */
  sx?: SxProps;
};

const valueTypePatterns: Record<InputOPTValueType, RegExp> = {
  numeric: /^[0-9]$/,
  alphabetic: /^[A-Za-z]$/,
  alphanumeric: /^[A-Za-z0-9]$/,
};

const nativePatterns: Record<InputOPTValueType, string> = {
  numeric: "[0-9]*",
  alphabetic: "[A-Za-z]*",
  alphanumeric: "[A-Za-z0-9]*",
};

const slotSizeClasses: Record<InputOPTSize, string> = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};

const slotVariantClasses: Record<InputOPTVariant, string> = {
  outline: "rounded-md border border-slate-300 bg-white text-slate-900",
  filled: "rounded-md border border-slate-100 bg-slate-100 text-slate-900",
  underline: "border-0 border-b border-slate-300 bg-transparent text-slate-900",
};

function toSafeLength(length: number | undefined) {
  if (!Number.isFinite(length)) {
    return 6;
  }

  return Math.max(1, Math.floor(length ?? 6));
}

function createCharTester(type: InputOPTValueType, pattern?: RegExp | string) {
  const matcher = pattern
    ? typeof pattern === "string"
      ? new RegExp(pattern)
      : pattern
    : valueTypePatterns[type];

  return (char: string) => {
    matcher.lastIndex = 0;
    return matcher.test(char);
  };
}

function normalizeValue(value: string, length: number, testChar: (char: string) => boolean) {
  return Array.from(value).filter(testChar).slice(0, length).join("");
}

function getPatternAttribute(type: InputOPTValueType, pattern?: RegExp | string) {
  if (typeof pattern === "string") {
    return pattern;
  }

  if (pattern instanceof RegExp) {
    return pattern.source;
  }

  return nativePatterns[type];
}

/**
 * InputOPT 是一次性验证码输入组件。它使用一个真实 input 承接输入、自动填充和表单提交，
 * 再用槽位展示验证码字符，确保线性输入、连续删除和粘贴分发行为稳定一致。
 */
export const InputOPT = React.forwardRef<HTMLInputElement, InputOPTProps>((props, ref) => {
  const {
    value,
    defaultValue = "",
    length = 6,
    disabled,
    readOnly,
    className,
    class: legacyClass,
    inputClassName,
    slotClassName,
    onChange,
    onComplete,
    type = "numeric",
    pattern,
    pasteTransformer,
    mask = false,
    placeholder = "",
    autoFocus = true,
    oneTimeCode = true,
    size = "md",
    variant = "outline",
    invalid = false,
    separator,
    style,
    sx,
    inputMode,
    autoComplete,
    onBlur,
    onFocus,
    onKeyDown,
    onPaste,
    "aria-label": ariaLabel,
    ...inputProps
  } = props;
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const safeLength = toSafeLength(length);
  const testChar = React.useMemo(() => createCharTester(type, pattern), [pattern, type]);
  const normalize = React.useCallback(
    (nextValue: string) => normalizeValue(nextValue, safeLength, testChar),
    [safeLength, testChar],
  );
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    normalize(defaultValue),
  );
  const currentValue = normalize(isControlled ? value ?? "" : uncontrolledValue);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const currentValueRef = React.useRef(currentValue);
  const completedValueRef = React.useRef<string | null>(null);
  const [focused, setFocused] = React.useState(false);
  const chars = Array.from(currentValue);
  const activeIndex = Math.min(chars.length, safeLength - 1);
  const placeholderChar = Array.from(placeholder)[0] ?? "";
  const maskChar = typeof mask === "string" ? mask : "•";

  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  React.useEffect(() => {
    currentValueRef.current = currentValue;
  }, [currentValue]);

  React.useEffect(() => {
    if (!isControlled) {
      setUncontrolledValue((prevValue) => normalize(prevValue));
    }
  }, [isControlled, normalize]);

  const moveCaretToEnd = React.useCallback(() => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    const end = input.value.length;

    try {
      input.setSelectionRange(end, end);
    } catch {
      // 个别输入实现不支持 selection range，保持聚焦即可。
    }
  }, []);

  const commitValue = React.useCallback(
    (nextValue: string) => {
      const normalizedValue = normalize(nextValue);
      const previousValue = currentValueRef.current;

      currentValueRef.current = normalizedValue;

      if (!isControlled) {
        setUncontrolledValue(normalizedValue);
      }

      if (normalizedValue !== previousValue) {
        onChange?.(normalizedValue);
      }

      if (normalizedValue.length === safeLength) {
        if (completedValueRef.current !== normalizedValue) {
          completedValueRef.current = normalizedValue;
          onComplete?.(normalizedValue);
        }
      } else {
        completedValueRef.current = null;
      }

      window.requestAnimationFrame(moveCaretToEnd);
    },
    [isControlled, moveCaretToEnd, normalize, onChange, onComplete, safeLength],
  );

  const focusInput = React.useCallback(() => {
    if (disabled) {
      return;
    }

    inputRef.current?.focus();
    window.requestAnimationFrame(moveCaretToEnd);
  }, [disabled, moveCaretToEnd]);

  React.useEffect(() => {
    if (!autoFocus || disabled) {
      return;
    }

    const input = inputRef.current;
    const ownerDocument = input?.ownerDocument;

    if (!input || !ownerDocument || ownerDocument.activeElement !== ownerDocument.body) {
      return;
    }

    input.focus();
    moveCaretToEnd();
  }, [autoFocus, disabled, moveCaretToEnd]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    commitValue(event.target.value);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
    window.requestAnimationFrame(moveCaretToEnd);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();

      if (!readOnly && currentValueRef.current.length > 0) {
        commitValue(currentValueRef.current.slice(0, -1));
      }

      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      moveCaretToEnd();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event);

    if (event.defaultPrevented || readOnly) {
      return;
    }

    event.preventDefault();

    const pastedText = event.clipboardData.getData("text");
    const nextText = pasteTransformer ? pasteTransformer(pastedText) : pastedText;

    commitValue(`${currentValueRef.current}${nextText}`);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    event.preventDefault();
    focusInput();
  };

  const renderSeparator = (index: number) => {
    if (index >= safeLength - 1) {
      return null;
    }

    return typeof separator === "function" ? separator(index) : separator;
  };

  return (
    <div
      className={cn("inline-flex flex-col gap-2", sxClassName, className, legacyClass)}
      style={mergeSxStyle(style, sxInlineStyle)}
      data-disabled={disabled ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      data-complete={currentValue.length === safeLength ? "" : undefined}
    >
      <div className="relative inline-flex items-center gap-2" onMouseDown={handleMouseDown}>
        <input
          {...inputProps}
          ref={inputRef}
          type="text"
          value={currentValue}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={safeLength}
          inputMode={inputMode ?? (type === "numeric" ? "numeric" : "text")}
          autoComplete={oneTimeCode ? "one-time-code" : autoComplete}
          pattern={getPatternAttribute(type, pattern)}
          aria-label={ariaLabel ?? "一次性验证码"}
          aria-invalid={invalid || inputProps["aria-invalid"] ? true : undefined}
          className={cn(
            "absolute inset-0 z-10 h-full w-full cursor-text border-0 bg-transparent p-0 text-transparent opacity-0 outline-none",
            "disabled:cursor-not-allowed",
            inputClassName,
          )}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        {Array.from({ length: safeLength }).map((_, index) => {
          const char = chars[index] ?? "";
          const filled = char.length > 0;
          const active = focused && !disabled && index === activeIndex;
          const content = filled ? (mask ? maskChar : char) : placeholderChar;
          const separatorNode = renderSeparator(index);

          return (
            <React.Fragment key={index}>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex shrink-0 select-none items-center justify-center font-semibold transition-colors",
                  slotSizeClasses[size],
                  slotVariantClasses[variant],
                  !filled && "font-normal text-slate-400",
                  active && "border-blue-500 ring-2 ring-blue-500/30",
                  invalid && "border-red-500 text-red-600",
                  active && invalid && "ring-red-500/25",
                  disabled && "cursor-not-allowed bg-slate-50 text-slate-400 opacity-70",
                  readOnly && !disabled && "bg-slate-50",
                  slotClassName,
                )}
                data-active={active ? "" : undefined}
                data-filled={filled ? "" : undefined}
              >
                {content}
              </span>
              {separatorNode ? (
                <span aria-hidden="true" className="select-none text-sm text-slate-400">
                  {separatorNode}
                </span>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});

InputOPT.displayName = "InputOPT";
