import * as React from "react";
import { cn } from "@/lib/utils";
import { mergeSxStyle, resolveSx, useSxTheme, type SxProps } from "@/styling";
import {
  FormContext,
  getNamePathKey,
  getNamePathString,
  type FormCallbacks,
  type FormFieldData,
  type FormInstance,
  type FormNamePath,
  type FormRule,
  type FormValidateTrigger,
  type FormValues,
  useForm,
  useFormFieldMeta,
  useFormInstance,
  useFormValue,
  useFormWatch,
} from "./useForm";

type AnyRecord = Record<string, unknown>;
type EventHandler = (...args: unknown[]) => void;

/**
 * Form 组件属性。默认保持原生 `form` 语义，传入增强回调或 `form` 实例后启用状态管理提交链路。
 */
export type FormProps<TValues extends FormValues = FormValues> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> &
  FormCallbacks<TValues> & {
    class?: string;
    form?: FormInstance<TValues>;
    initialValues?: Partial<TValues>;
    nativeSubmit?: boolean;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    sx?: SxProps;
  };

/**
 * `Form.Item` render props，用于自定义字段渲染时读取当前值、meta 和表单实例。
 */
export type FormItemRenderProps<TValues extends FormValues = FormValues> = {
  form: FormInstance<TValues>;
  value: unknown;
  values: TValues;
  meta: ReturnType<FormInstance<TValues>["getFieldMeta"]>;
};

/**
 * `Form.Item` 属性。通过 `name` 注册字段，并把子控件自动接入 `useForm` 状态层。
 */
export type FormItemProps<TValues extends FormValues = FormValues> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> & {
  children?:
    | React.ReactNode
    | ((props: FormItemRenderProps<TValues>) => React.ReactNode);
  class?: string;
  controlClassName?: string;
  controlStyle?: React.CSSProperties;
  dependencies?: FormNamePath[];
  extra?: React.ReactNode;
  getValueFromEvent?: (...args: unknown[]) => unknown;
  getValueProps?: (value: unknown) => AnyRecord;
  help?: React.ReactNode;
  initialValue?: unknown;
  label?: React.ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  name?: FormNamePath;
  noStyle?: boolean;
  preserve?: boolean;
  required?: boolean;
  rules?: FormRule<TValues>[];
  sx?: SxProps;
  trigger?: string;
  validateFirst?: boolean;
  validateStatus?: "error" | "success" | "warning" | "validating";
  validateTrigger?: FormValidateTrigger;
  valuePropName?: string;
};

type ControlAdapter = {
  emptyValue?: unknown;
  skipValueProp?: boolean;
  trigger: string;
  valuePropName: string;
};

const defaultAdapter: ControlAdapter = {
  emptyValue: "",
  trigger: "onChange",
  valuePropName: "value",
};

const controlAdapters: Record<string, ControlAdapter> = {
  AutoComplete: {
    emptyValue: "",
    trigger: "onValueChange",
    valuePropName: "value",
  },
  Cascader: {
    emptyValue: [],
    trigger: "onValueChange",
    valuePropName: "value",
  },
  Checkbox: {
    emptyValue: false,
    trigger: "onCheckedChange",
    valuePropName: "checked",
  },
  CheckboxGroup: {
    emptyValue: [],
    trigger: "onChange",
    valuePropName: "value",
  },
  Input: defaultAdapter,
  InputNumber: defaultAdapter,
  InputOPT: defaultAdapter,
  RadioGroup: {
    trigger: "onValueChange",
    valuePropName: "value",
  },
  Rate: {
    emptyValue: 0,
    trigger: "onChange",
    valuePropName: "value",
  },
  Select: {
    trigger: "onValueChange",
    valuePropName: "value",
  },
  Slider: {
    emptyValue: 0,
    trigger: "onValueChange",
    valuePropName: "value",
  },
  Switch: {
    emptyValue: false,
    trigger: "onCheckedChange",
    valuePropName: "checked",
  },
  Uploader: {
    emptyValue: null,
    trigger: "onValueChange",
    valuePropName: "value",
  },
};

function getDisplayName(element: React.ReactElement) {
  const type = element.type as {
    displayName?: string;
    name?: string;
    render?: { displayName?: string; name?: string };
  };

  return type.displayName ?? type.name ?? type.render?.displayName ?? type.render?.name;
}

function getAdapter(element: React.ReactElement | null): ControlAdapter {
  if (!element) return defaultAdapter;

  const displayName = getDisplayName(element);

  if (displayName && controlAdapters[displayName]) {
    return controlAdapters[displayName];
  }

  return defaultAdapter;
}

function getDefaultValueFromEvent(valuePropName: string, args: unknown[]) {
  const [firstArg] = args;

  if (
    firstArg &&
    typeof firstArg === "object" &&
    "target" in firstArg &&
    (firstArg as { target?: unknown }).target
  ) {
    const target = (firstArg as { target: HTMLInputElement }).target;
    return valuePropName === "checked" ? target.checked : target.value;
  }

  return firstArg;
}

function normalizeValidateTrigger(trigger: FormValidateTrigger | undefined) {
  if (trigger === undefined) return [];
  return Array.isArray(trigger) ? [...trigger] : [trigger];
}

function getControlledValue(
  value: unknown,
  adapter: ControlAdapter,
  valuePropName: string,
) {
  if (value !== undefined) {
    return value;
  }

  if (valuePropName === "checked") {
    return false;
  }

  return adapter.emptyValue;
}

function composeHandler(
  current: EventHandler | undefined,
  next: EventHandler,
) {
  return (...args: unknown[]) => {
    current?.(...args);
    next(...args);
  };
}

function FormBase<TValues extends FormValues = FormValues>(
  props: FormProps<TValues>,
) {
  const {
    className,
    class: legacyClass,
    form,
    initialValues,
    nativeSubmit = false,
    onFieldsChange,
    onFinish,
    onFinishFailed,
    onReset,
    onSubmit,
    onValuesChange,
    style,
    sx,
    ...rest
  } = props;
  const [formInstance] = useForm<TValues>(form);
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const initializedRef = React.useRef(false);
  const enhancedSubmit =
    !nativeSubmit &&
    (form !== undefined ||
      onFinish !== undefined ||
      onFinishFailed !== undefined ||
      onValuesChange !== undefined ||
      onFieldsChange !== undefined);

  formInstance.__INTERNAL__.setCallbacks({
    onFieldsChange,
    onFinish,
    onFinishFailed,
    onValuesChange,
  });
  formInstance.__INTERNAL__.setInitialValues(
    initialValues,
    !initializedRef.current,
  );
  initializedRef.current = true;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit?.(event);

    if (event.defaultPrevented || !enhancedSubmit) {
      return;
    }

    event.preventDefault();
    void formInstance.submit();
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    onReset?.(event);

    if (event.defaultPrevented || !enhancedSubmit) {
      return;
    }

    formInstance.resetFields();
  };

  return (
    <FormContext.Provider value={formInstance as FormInstance}>
      <form
        className={cn("space-y-4", sxClassName, className, legacyClass)}
        style={mergeSxStyle(style, sxInlineStyle)}
        onReset={handleReset}
        onSubmit={handleSubmit}
        {...rest}
      />
    </FormContext.Provider>
  );
}

function FormItem<TValues extends FormValues = FormValues>(
  props: FormItemProps<TValues>,
) {
  const {
    children,
    className,
    class: legacyClass,
    controlClassName,
    controlStyle,
    dependencies = [],
    extra,
    getValueFromEvent,
    getValueProps,
    help,
    initialValue,
    label,
    labelClassName,
    labelStyle,
    name,
    noStyle = false,
    preserve = true,
    required,
    rules = [],
    sx,
    style,
    trigger,
    validateFirst = false,
    validateStatus,
    validateTrigger = "onChange",
    valuePropName,
    ...rest
  } = props;
  const form = useFormInstance<TValues>();
  const theme = useSxTheme();
  const { sxClassName, sxInlineStyle } = resolveSx(sx, theme);
  const allValues = useFormValue<TValues>(undefined, form as FormInstance);
  const nameKey = name === undefined ? undefined : getNamePathKey(name);
  const value = name === undefined ? undefined : form.getFieldValue(name);
  const meta = useFormFieldMeta(name ?? "__FORM_ITEM__", form as FormInstance);
  const child =
    React.isValidElement(children) && typeof children.type !== "string"
      ? children
      : null;
  const adapter = getAdapter(child);
  const resolvedValuePropName = valuePropName ?? adapter.valuePropName;
  const resolvedTrigger = trigger ?? adapter.trigger;
  const hasRequiredRule = rules.some((rule) => rule.required);
  const mergedRules = React.useMemo(
    () => (required && !hasRequiredRule ? [{ required: true }, ...rules] : rules),
    [hasRequiredRule, required, rules],
  );
  const dependencyKey = React.useMemo(
    () => JSON.stringify(dependencies.map(getNamePathKey)),
    [dependencies],
  );
  const rulesRef = React.useRef(mergedRules);

  rulesRef.current = mergedRules;

  React.useEffect(() => {
    if (name === undefined) {
      return undefined;
    }

    if (initialValue !== undefined && form.getFieldValue(name) === undefined) {
      form.__INTERNAL__.setFieldValue(name, initialValue, {
        source: "external",
      });
    }

    const unregister = form.__INTERNAL__.registerField({
      dependencies,
      name,
      rules: rulesRef.current,
      validateFirst,
      validateTrigger,
    });

    return () => unregister({ preserve });
  }, [
    dependencyKey,
    form,
    initialValue,
    name,
    nameKey,
    preserve,
    validateFirst,
    validateTrigger,
  ]);

  const renderProps: FormItemRenderProps<TValues> = {
    form,
    meta,
    value,
    values: allValues,
  };

  const renderChild = () => {
    if (typeof children === "function") {
      return children(renderProps);
    }

    if (!child || name === undefined) {
      return children;
    }

    const childProps = child.props as AnyRecord;
    const controlProps = getValueProps
      ? getValueProps(value)
      : adapter.skipValueProp
        ? {}
        : {
            [resolvedValuePropName]: getControlledValue(
              value,
              adapter,
              resolvedValuePropName,
            ),
          };

    if (childProps.name === undefined) {
      controlProps.name = getNamePathString(name);
    }

    controlProps[resolvedTrigger] = composeHandler(
      childProps[resolvedTrigger] as EventHandler | undefined,
      (...args) => {
        const nextValue = getValueFromEvent
          ? getValueFromEvent(...args)
          : getDefaultValueFromEvent(resolvedValuePropName, args);

        form.__INTERNAL__.setFieldValue(name, nextValue, {
          source: "internal",
          touched: true,
          trigger: resolvedTrigger,
        });
      },
    );

    for (const eventName of normalizeValidateTrigger(validateTrigger)) {
      if (eventName === resolvedTrigger) {
        continue;
      }

      controlProps[eventName] = composeHandler(
        (controlProps[eventName] ?? childProps[eventName]) as
          | EventHandler
          | undefined,
        () => {
          void form.__INTERNAL__
            .validateFields([name], { trigger: eventName })
            .catch(() => undefined);
        },
      );
    }

    return React.cloneElement(child, controlProps);
  };

  const errors = meta.errors;
  const mergedHelp = help ?? errors[0];
  const mergedStatus =
    validateStatus ??
    (meta.validating ? "validating" : errors.length > 0 ? "error" : undefined);
  const itemNode = (
    <>
      {label !== undefined ? (
        <div
          className={cn("text-sm font-medium leading-5 text-slate-700", labelClassName)}
          style={labelStyle}
        >
          {label}
          {required || hasRequiredRule ? (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          ) : null}
        </div>
      ) : null}
      <div className={controlClassName} style={controlStyle}>
        {renderChild()}
      </div>
      {mergedHelp !== undefined ? (
        <div
          className={cn(
            "text-xs leading-5",
            mergedStatus === "error" ? "text-red-600" : "text-slate-500",
          )}
          aria-live={mergedStatus === "error" ? "polite" : undefined}
          role={mergedStatus === "error" ? "alert" : undefined}
        >
          {mergedHelp}
        </div>
      ) : null}
      {extra !== undefined ? (
        <div className="text-xs leading-5 text-slate-500">{extra}</div>
      ) : null}
    </>
  );

  if (noStyle) {
    return itemNode;
  }

  return (
    <div
      className={cn(
        "space-y-2",
        mergedStatus === "error" && "[&_input]:border-red-500",
        sxClassName,
        className,
        legacyClass,
      )}
      style={mergeSxStyle(style, sxInlineStyle)}
      {...rest}
    >
      {itemNode}
    </div>
  );
}

FormItem.displayName = "FormItem";

type FormComponent = (<TValues extends FormValues = FormValues>(
  props: FormProps<TValues>,
) => React.ReactElement) & {
  displayName?: string;
  Item: typeof FormItem;
  useForm: typeof useForm;
  useFormInstance: typeof useFormInstance;
  useFormValue: typeof useFormValue;
  useFormWatch: typeof useFormWatch;
};

const Form = Object.assign(FormBase, {
  Item: FormItem,
  useForm,
  useFormInstance,
  useFormValue,
  useFormWatch,
}) as FormComponent;

Form.displayName = "Form";

export {
  Form,
  FormItem,
  useForm,
  useFormInstance,
  useFormValue,
  useFormWatch,
};
