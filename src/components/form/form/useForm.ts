import * as React from "react";

/**
 * 表单字段路径，支持字符串、数字或数组路径，例如 `user.name` 或 `["user", "name"]`。
 */
export type FormNamePath = string | number | readonly (string | number)[];

/**
 * 表单值对象类型。
 */
export type FormValues = Record<string, unknown>;

/**
 * 字段校验触发器名称，通常是 `onChange`、`onBlur` 或控件自定义事件。
 */
export type FormValidateTrigger = string | readonly string[];

/**
 * 字段校验规则，支持必填、值转换和同步/异步自定义校验。
 */
export type FormRule<TValues extends FormValues = FormValues> = {
  required?: boolean;
  message?: React.ReactNode;
  validateTrigger?: FormValidateTrigger;
  transform?: (value: unknown) => unknown;
  validator?: (
    value: unknown,
    values: TValues,
    form: FormInstance<TValues>,
  ) => void | boolean | React.ReactNode | Promise<void | boolean | React.ReactNode>;
};

/**
 * 字段状态信息，用于展示 touched、validating 与错误文案。
 */
export type FormFieldMeta = {
  touched: boolean;
  validating: boolean;
  errors: React.ReactNode[];
};

/**
 * 字段数据快照，用于 `setFields` 与 `onFieldsChange`。
 */
export type FormFieldData = {
  name: FormNamePath;
  value?: unknown;
  touched?: boolean;
  validating?: boolean;
  errors?: React.ReactNode[];
};

/**
 * 校验失败字段信息。
 */
export type FormErrorField = {
  name: FormNamePath;
  errors: React.ReactNode[];
};

/**
 * 表单提交失败回调参数。
 */
export type FormFinishFailedInfo<TValues extends FormValues = FormValues> = {
  values: TValues;
  errorFields: FormErrorField[];
  outOfDate: boolean;
};

/**
 * 表单增强回调集合。
 */
export type FormCallbacks<TValues extends FormValues = FormValues> = {
  onValuesChange?: (changedValues: Partial<TValues>, values: TValues) => void;
  onFieldsChange?: (changedFields: FormFieldData[], fields: FormFieldData[]) => void;
  onFinish?: (values: TValues) => void;
  onFinishFailed?: (info: FormFinishFailedInfo<TValues>) => void;
};

/**
 * 校验选项，内部校验可指定字段、触发器和仅校验模式。
 */
export type FormValidateOptions = {
  names?: FormNamePath[];
  trigger?: string;
  validateOnly?: boolean;
};

type FormFieldEntity<TValues extends FormValues = FormValues> = {
  name: FormNamePath;
  rules: FormRule<TValues>[];
  validateTrigger?: FormValidateTrigger;
  dependencies: FormNamePath[];
  validateFirst?: boolean;
};

type FormSetValueOptions = {
  touched?: boolean;
  trigger?: string;
  source?: "internal" | "external";
};

type FormInternalHooks<TValues extends FormValues = FormValues> = {
  getStoreSnapshot: () => TValues;
  getMetaSnapshot: (name: FormNamePath) => FormFieldMeta;
  setCallbacks: (callbacks: FormCallbacks<TValues>) => void;
  setInitialValues: (values: Partial<TValues> | undefined, init: boolean) => void;
  registerField: (
    entity: FormFieldEntity<TValues>,
  ) => (options?: { preserve?: boolean }) => void;
  setFieldValue: (
    name: FormNamePath,
    value: unknown,
    options?: FormSetValueOptions,
  ) => void;
  validateFields: (
    names?: FormNamePath[],
    options?: Pick<FormValidateOptions, "trigger" | "validateOnly">,
  ) => Promise<TValues>;
};

/**
 * 表单实例 API，用于读取、写入、重置、校验、提交和订阅表单状态。
 */
export type FormInstance<TValues extends FormValues = FormValues> = {
  getFieldValue: (name: FormNamePath) => unknown;
  getFieldsValue: (names?: FormNamePath[]) => TValues;
  getFieldError: (name: FormNamePath) => React.ReactNode[];
  getFieldsError: (names?: FormNamePath[]) => FormErrorField[];
  getFieldMeta: (name: FormNamePath) => FormFieldMeta;
  isFieldTouched: (name: FormNamePath) => boolean;
  isFieldsTouched: (names?: FormNamePath[]) => boolean;
  setFieldValue: (name: FormNamePath, value: unknown) => void;
  setFieldsValue: (values: Partial<TValues>) => void;
  setFields: (fields: FormFieldData[]) => void;
  resetFields: (names?: FormNamePath[]) => void;
  validateFields: (names?: FormNamePath[]) => Promise<TValues>;
  submit: () => Promise<void>;
  subscribe: (listener: () => void) => () => void;
  __INTERNAL__: FormInternalHooks<TValues>;
};

/**
 * Form 内部上下文，供 `Form.Item` 和表单 hooks 读取当前表单实例。
 */
export const FormContext = React.createContext<FormInstance | null>(null);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as T;
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, cloneValue(item)]),
    ) as T;
  }

  return value;
}

/**
 * 将字段路径统一转换为数组路径。
 */
export function toNamePath(name: FormNamePath): (string | number)[] {
  return typeof name === "string" || typeof name === "number"
    ? [name]
    : Array.from(name);
}

/**
 * 获取字段路径的稳定 key，用于字段注册表和 meta 映射。
 */
export function getNamePathKey(name: FormNamePath) {
  return JSON.stringify(toNamePath(name));
}

/**
 * 获取字段路径字符串，用于透传原生控件 `name` 属性。
 */
export function getNamePathString(name: FormNamePath) {
  return toNamePath(name).join(".");
}

function getValueByPath(values: unknown, name: FormNamePath) {
  let current = values;

  for (const segment of toNamePath(name)) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = (current as Record<string | number, unknown>)[segment];
  }

  return current;
}

function setValueByPath<TValues extends FormValues>(
  values: TValues,
  name: FormNamePath,
  value: unknown,
): TValues {
  const path = toNamePath(name);

  if (path.length === 0) {
    return values;
  }

  const setAt = (source: unknown, index: number): unknown => {
    const segment = path[index];
    const isLast = index === path.length - 1;
    const base = Array.isArray(source)
      ? [...source]
      : isPlainObject(source)
        ? { ...source }
        : typeof segment === "number"
          ? []
          : {};

    (base as Record<string | number, unknown>)[segment] = isLast
      ? value
      : setAt((base as Record<string | number, unknown>)[segment], index + 1);

    return base;
  };

  return setAt(values, 0) as TValues;
}

function deleteValueByPath<TValues extends FormValues>(
  values: TValues,
  name: FormNamePath,
): TValues {
  const path = toNamePath(name);

  if (path.length === 0) {
    return values;
  }

  const deleteAt = (source: unknown, index: number): unknown => {
    if (!Array.isArray(source) && !isPlainObject(source)) {
      return source;
    }

    const segment = path[index];
    const base = Array.isArray(source) ? [...source] : { ...source };

    if (index === path.length - 1) {
      delete (base as Record<string | number, unknown>)[segment];
      return base;
    }

    (base as Record<string | number, unknown>)[segment] = deleteAt(
      (base as Record<string | number, unknown>)[segment],
      index + 1,
    );

    return base;
  };

  return deleteAt(values, 0) as TValues;
}

function buildPathValue<TValues extends FormValues>(
  name: FormNamePath,
  value: unknown,
) {
  return setValueByPath({} as TValues, name, value) as Partial<TValues>;
}

function mergeValues<TValues extends FormValues>(
  source: TValues,
  patch: Partial<TValues>,
): TValues {
  const merge = (current: unknown, next: unknown): unknown => {
    if (isPlainObject(current) && isPlainObject(next)) {
      const result: Record<string, unknown> = { ...current };

      for (const [key, value] of Object.entries(next)) {
        result[key] = merge(result[key], value);
      }

      return result;
    }

    return cloneValue(next);
  };

  return merge(source, patch) as TValues;
}

function collectLeafPaths(
  value: unknown,
  prefix: (string | number)[] = [],
): (string | number)[][] {
  if (!isPlainObject(value) && !Array.isArray(value)) {
    return prefix.length ? [prefix] : [];
  }

  const entries = Array.isArray(value)
    ? value.map((item, index) => [index, item] as const)
    : Object.entries(value);

  if (entries.length === 0) {
    return prefix.length ? [prefix] : [];
  }

  return entries.flatMap(([key, item]) => collectLeafPaths(item, [...prefix, key]));
}

function createDefaultMeta(): FormFieldMeta {
  return {
    errors: [],
    touched: false,
    validating: false,
  };
}

function isEmptyValue(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

function normalizeTrigger(trigger: FormValidateTrigger | undefined) {
  if (trigger === undefined) return [];
  return Array.isArray(trigger) ? trigger : [trigger];
}

function shouldValidateByTrigger(
  eventTrigger: string | undefined,
  ruleTrigger: FormValidateTrigger | undefined,
  fieldTrigger: FormValidateTrigger | undefined,
) {
  if (!eventTrigger) {
    return true;
  }

  const triggers = normalizeTrigger(ruleTrigger ?? fieldTrigger);
  return triggers.length === 0 || triggers.includes(eventTrigger);
}

function toErrorMessage(error: unknown, fallback: React.ReactNode) {
  if (React.isValidElement(error)) {
    return error;
  }

  if (typeof error === "string" || typeof error === "number") {
    return String(error);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

/**
 * 创建独立表单实例。通常优先使用 `useForm`，测试或外部 store 场景可直接使用。
 */
export function createForm<TValues extends FormValues = FormValues>(
  initialValues?: Partial<TValues>,
): FormInstance<TValues> {
  let store = cloneValue((initialValues ?? {}) as TValues);
  let initialStore = cloneValue(store);
  let callbacks: FormCallbacks<TValues> = {};
  let validateId = 0;

  const listeners = new Set<() => void>();
  const fields = new Map<string, FormFieldEntity<TValues>>();
  const metas = new Map<string, FormFieldMeta>();

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const getMeta = (name: FormNamePath) =>
    metas.get(getNamePathKey(name)) ?? createDefaultMeta();

  const setMeta = (name: FormNamePath, nextMeta: Partial<FormFieldMeta>) => {
    const key = getNamePathKey(name);
    metas.set(key, { ...getMeta(name), ...nextMeta });
  };

  const getAllFieldData = () =>
    Array.from(fields.values()).map<FormFieldData>((field) => ({
      name: field.name,
      value: getValueByPath(store, field.name),
      ...getMeta(field.name),
    }));

  const emitFieldsChange = (changedFields: FormFieldData[]) => {
    callbacks.onFieldsChange?.(changedFields, getAllFieldData());
  };

  const runValidateField = async (
    field: FormFieldEntity<TValues>,
    options: { trigger?: string; validateOnly?: boolean; id: number },
  ) => {
    const matchedRules = field.rules.filter((rule) =>
      shouldValidateByTrigger(options.trigger, rule.validateTrigger, field.validateTrigger),
    );

    if (matchedRules.length === 0) {
      return [] as React.ReactNode[];
    }

    if (!options.validateOnly) {
      setMeta(field.name, { validating: true });
      notify();
    }

    const errors: React.ReactNode[] = [];

    for (const rule of matchedRules) {
      const rawValue = getValueByPath(store, field.name);
      const value = rule.transform ? rule.transform(rawValue) : rawValue;
      const message = rule.message ?? "该字段为必填项";

      if (rule.required && isEmptyValue(value)) {
        errors.push(message);
        if (field.validateFirst) break;
        continue;
      }

      if (!rule.validator) {
        continue;
      }

      try {
        const result = await rule.validator(value, cloneValue(store), form);

        if (result === false) {
          errors.push(message);
        } else if (result !== undefined && result !== true) {
          errors.push(result);
        }
      } catch (error) {
        errors.push(toErrorMessage(error, message));
      }

      if (field.validateFirst && errors.length > 0) {
        break;
      }
    }

    if (!options.validateOnly && options.id === validateId) {
      setMeta(field.name, { errors, validating: false });
      emitFieldsChange([
        {
          name: field.name,
          value: getValueByPath(store, field.name),
          ...getMeta(field.name),
          errors,
          validating: false,
        },
      ]);
      notify();
    }

    return errors;
  };

  const validateFieldsInternal = async (
    names: FormNamePath[] | undefined,
    options: Pick<FormValidateOptions, "trigger" | "validateOnly"> = {},
  ) => {
    const currentValidateId = ++validateId;
    const targetKeys = names?.map(getNamePathKey);
    const targetFields = Array.from(fields.values()).filter((field) =>
      targetKeys ? targetKeys.includes(getNamePathKey(field.name)) : true,
    );

    const results = await Promise.all(
      targetFields.map(async (field) => ({
        field,
        errors: await runValidateField(field, {
          id: currentValidateId,
          trigger: options.trigger,
          validateOnly: options.validateOnly,
        }),
      })),
    );

    const errorFields = results
      .filter((item) => item.errors.length > 0)
      .map<FormErrorField>((item) => ({
        errors: item.errors,
        name: item.field.name,
      }));

    if (errorFields.length > 0) {
      throw {
        errorFields,
        outOfDate: currentValidateId !== validateId,
        values: cloneValue(store),
      } satisfies FormFinishFailedInfo<TValues>;
    }

    return cloneValue(store);
  };

  const validateRelatedFields = (changedName: FormNamePath, trigger?: string) => {
    const changedKey = getNamePathKey(changedName);

    for (const field of fields.values()) {
      const shouldValidate =
        getNamePathKey(field.name) === changedKey ||
        field.dependencies.some((dependency) => getNamePathKey(dependency) === changedKey);

      if (shouldValidate) {
        void validateFieldsInternal([field.name], { trigger }).catch(() => undefined);
      }
    }
  };

  const setFieldValueInternal = (
    name: FormNamePath,
    value: unknown,
    options: FormSetValueOptions = {},
  ) => {
    store = setValueByPath(store, name, value);

    if (options.touched) {
      setMeta(name, { touched: true });
    }

    const changedField: FormFieldData = {
      name,
      value,
      ...getMeta(name),
    };

    if (options.source !== "external") {
      callbacks.onValuesChange?.(buildPathValue(name, value), cloneValue(store));
      emitFieldsChange([changedField]);
    }

    notify();

    if (options.trigger) {
      validateRelatedFields(name, options.trigger);
    }
  };

  const form: FormInstance<TValues> = {
    getFieldValue: (name) => getValueByPath(store, name),
    getFieldsValue: (names) => {
      if (!names) {
        return cloneValue(store);
      }

      return names.reduce(
        (result, name) =>
          setValueByPath(result, name, getValueByPath(store, name)),
        {} as TValues,
      );
    },
    getFieldError: (name) => getMeta(name).errors,
    getFieldsError: (names) => {
      const targetNames = names ?? Array.from(fields.values()).map((field) => field.name);

      return targetNames.map((name) => ({
        errors: getMeta(name).errors,
        name,
      }));
    },
    getFieldMeta: (name) => getMeta(name),
    isFieldTouched: (name) => getMeta(name).touched,
    isFieldsTouched: (names) => {
      const targetNames = names ?? Array.from(fields.values()).map((field) => field.name);
      return targetNames.some((name) => getMeta(name).touched);
    },
    setFieldValue: (name, value) =>
      setFieldValueInternal(name, value, { source: "external" }),
    setFieldsValue: (values) => {
      store = mergeValues(store, values);

      notify();
    },
    setFields: (nextFields) => {
      for (const field of nextFields) {
        if ("value" in field) {
          store = setValueByPath(store, field.name, field.value);
        }

        setMeta(field.name, {
          errors: field.errors ?? getMeta(field.name).errors,
          touched: field.touched ?? getMeta(field.name).touched,
          validating: field.validating ?? getMeta(field.name).validating,
        });
      }

      emitFieldsChange(nextFields);
      notify();
    },
    resetFields: (names) => {
      const targetNames = names ?? Array.from(fields.values()).map((field) => field.name);

      if (!names) {
        store = cloneValue(initialStore);
        metas.clear();
      } else {
        for (const name of targetNames) {
          store = setValueByPath(store, name, getValueByPath(initialStore, name));
          metas.delete(getNamePathKey(name));
        }
      }

      emitFieldsChange(
        targetNames.map((name) => ({
          name,
          value: getValueByPath(store, name),
          ...getMeta(name),
        })),
      );
      notify();
    },
    validateFields: (names) => validateFieldsInternal(names),
    submit: async () => {
      try {
        const values = await validateFieldsInternal(undefined);
        callbacks.onFinish?.(values);
      } catch (error) {
        callbacks.onFinishFailed?.(error as FormFinishFailedInfo<TValues>);
      }
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    __INTERNAL__: {
      getStoreSnapshot: () => store,
      getMetaSnapshot: (name) => getMeta(name),
      setCallbacks: (nextCallbacks) => {
        callbacks = nextCallbacks;
      },
      setInitialValues: (values, init) => {
        initialStore = cloneValue((values ?? {}) as TValues);

        if (init) {
          store = cloneValue(initialStore);
        }
      },
      registerField: (entity) => {
        const key = getNamePathKey(entity.name);
        fields.set(key, entity);

        if (!metas.has(key)) {
          metas.set(key, createDefaultMeta());
        }

        return (options) => {
          fields.delete(key);

          if (options?.preserve === false) {
            store = deleteValueByPath(store, entity.name);
            metas.delete(key);
            notify();
          }
        };
      },
      setFieldValue: setFieldValueInternal,
      validateFields: validateFieldsInternal,
    },
  };

  return form;
}

/**
 * 创建或复用表单实例，返回值结构与 Ant Design 的 `Form.useForm()` 保持一致。
 */
export function useForm<TValues extends FormValues = FormValues>(
  form?: FormInstance<TValues>,
) {
  const formRef = React.useRef<FormInstance<TValues> | null>(null);

  if (!formRef.current) {
    formRef.current = form ?? createForm<TValues>();
  }

  return [form ?? formRef.current] as const;
}

/**
 * 从当前 Form 上下文读取表单实例。
 */
export function useFormInstance<TValues extends FormValues = FormValues>() {
  const form = React.useContext(FormContext) as FormInstance<TValues> | null;

  if (!form) {
    throw new Error("Form hooks must be used inside a Form or receive a form instance.");
  }

  return form;
}

/**
 * 订阅并读取字段值；不传 `name` 时返回整份表单值。
 */
export function useFormValue<TValue = unknown>(
  name?: FormNamePath,
  form?: FormInstance,
) {
  const contextForm = React.useContext(FormContext);
  const targetForm = form ?? contextForm;

  if (!targetForm) {
    throw new Error("useFormValue must be used inside a Form or receive a form instance.");
  }

  return React.useSyncExternalStore(
    targetForm.subscribe,
    () =>
      name === undefined
        ? targetForm.__INTERNAL__.getStoreSnapshot()
        : targetForm.getFieldValue(name),
    () =>
      name === undefined
        ? targetForm.__INTERNAL__.getStoreSnapshot()
        : targetForm.getFieldValue(name),
  ) as TValue;
}

/**
 * `useFormValue` 的语义化别名，用于表达字段监听场景。
 */
export function useFormWatch<TValue = unknown>(
  name?: FormNamePath,
  form?: FormInstance,
) {
  return useFormValue<TValue>(name, form);
}

/**
 * 订阅字段 meta，用于 `Form.Item` 内部和高级自定义字段状态展示。
 */
export function useFormFieldMeta(name: FormNamePath, form?: FormInstance) {
  const contextForm = React.useContext(FormContext);
  const targetForm = form ?? contextForm;

  if (!targetForm) {
    throw new Error("useFormFieldMeta must be used inside a Form or receive a form instance.");
  }

  return React.useSyncExternalStore(
    targetForm.subscribe,
    () => targetForm.__INTERNAL__.getMetaSnapshot(name),
    () => targetForm.__INTERNAL__.getMetaSnapshot(name),
  );
}
