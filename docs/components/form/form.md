# Form

`Form` 用于组织表单内容。它默认仍然是原生 `form` 容器，保留浏览器提交、系统校验、标准语义和可访问性；当传入 `form`、`onFinish`、`onValuesChange` 等增强参数时，会启用 `useForm` 状态层，用于统一管理字段值、校验、重置、提交和字段联动。

## Basic

最小可用模式：原生 `form` 提交、标签关联和基础输入控件。

<FormBasicDemo />

## useForm

通过 `Form.useForm()` 或 `useForm()` 创建实例，再用 `Form.Item name` 把字段接入表单状态。常见输入组件会自动匹配 `value/checked` 与对应的变化回调。

<FormUseFormDemo />

## 常见场景

### 登录表单

`Form` 可用于登录、后台信息录入、账户编辑等单表单场景。只需要原生提交时，可以继续直接使用 `name`、`action` 和 `method`。

<FormLoginDemo />

### 字段联动

`Form.useFormWatch` 监听单个字段，`Form.useFormValue` 读取整个表单或指定字段，适合预览、联动开关、动态提示和提交前摘要。

<FormWatchDemo />

### 校验与提交

`Form.Item rules` 支持同步和异步校验；增强提交会先执行校验，成功触发 `onFinish`，失败触发 `onFinishFailed`。

<FormValidationDemo />

### 筛选搜索

在搜索条、过滤区、结构化搜索或控制面板中，可以通过 `className="space-y-0"` 去掉默认纵向间距，再用 `sx` 管理容器布局。

<FormInlineDemo />

## Usage

### 原生表单

```tsx
import { Button, Form, Input, Label } from "@ldkj/web-ui";

export function NativeExample() {
  return (
    <Form
      action="/api/login"
      method="post"
      style={{ maxWidth: 380 }}
    >
      <div className="space-y-2">
        <Label htmlFor="account">账号</Label>
        <Input id="account" name="account" placeholder="请输入账号" />
      </div>
      <Button type="submit">提交</Button>
    </Form>
  );
}
```

### 受控表单

```tsx
import { Button, Form, Input, Switch } from "@ldkj/web-ui";

type UserFormValues = {
  account: string;
  enabled: boolean;
};

export function ControlledExample() {
  const [form] = Form.useForm<UserFormValues>();

  return (
    <Form
      form={form}
      initialValues={{ account: "demo", enabled: true }}
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <Form.Item name="account" label="账号" rules={[{ required: true }]}>
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item name="enabled" label="状态">
        <Switch label="启用账号" />
      </Form.Item>
      <Button type="submit">提交</Button>
    </Form>
  );
}
```

### 字段联动

```tsx
import { Form, Input } from "@ldkj/web-ui";

function Preview() {
  const account = Form.useFormWatch<string>("account");
  return <div>当前账号：{account || "未填写"}</div>;
}

export function WatchExample() {
  return (
    <Form initialValues={{ account: "" }}>
      <Form.Item name="account" label="账号">
        <Input />
      </Form.Item>
      <Preview />
    </Form>
  );
}
```

## API

### Form

`Form` 继承原生 `form` 的大部分属性，同时额外支持表单实例、提交回调和样式入口。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 表单内容 | `React.ReactNode` | - |
| `form` | `useForm` 创建的表单实例 | `FormInstance` | 内部自动创建 |
| `initialValues` | 初始字段值，支持嵌套对象 | `Record<string, unknown>` | `{}` |
| `onValuesChange` | 用户交互导致字段值变化时触发 | `(changedValues, values) => void` | - |
| `onFieldsChange` | 用户交互或校验导致字段状态变化时触发 | `(changedFields, fields) => void` | - |
| `onFinish` | 校验通过后的提交回调 | `(values) => void` | - |
| `onFinishFailed` | 校验失败后的提交回调 | `(info) => void` | - |
| `nativeSubmit` | 强制保留原生提交，不接管 submit | `boolean` | `false` |
| `className` / `class` | 自定义类名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `action` / `method` / `target` / `encType` | 原生表单提交属性 | 原生 `form` 属性 | - |

### Form.Item

`Form.Item` 负责把字段接入 `FormInstance`，并将值和事件注入给子控件。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 字段名，支持字符串、数字和路径数组 | `FormNamePath` | - |
| `label` | 字段标签 | `React.ReactNode` | - |
| `children` | 表单控件或 render props | `React.ReactNode \| (props) => React.ReactNode` | - |
| `rules` | 校验规则，支持同步和异步 validator | `FormRule[]` | `[]` |
| `required` | 快捷必填标记，会追加必填规则 | `boolean` | `false` |
| `dependencies` | 依赖字段变化后重新校验当前字段 | `FormNamePath[]` | `[]` |
| `initialValue` | 单字段初始值 | `unknown` | - |
| `valuePropName` | 子控件接收值的 prop，如 `checked` | `string` | 自动识别 |
| `trigger` | 子控件触发值变化的回调名 | `string` | 自动识别 |
| `validateTrigger` | 触发校验的事件名 | `string \| string[]` | `"onChange"` |
| `getValueFromEvent` | 从事件参数中提取字段值 | `(...args) => unknown` | 自动提取 |
| `getValueProps` | 自定义注入给子控件的值 props | `(value) => object` | - |
| `help` | 自定义帮助或错误文案 | `React.ReactNode` | 当前首条错误 |
| `extra` | 额外说明 | `React.ReactNode` | - |
| `preserve` | 卸载字段时是否保留值 | `boolean` | `true` |
| `noStyle` | 不渲染外层布局，只注入字段能力 | `boolean` | `false` |
| `validateFirst` | 命中首条错误后停止后续规则 | `boolean` | `false` |
| `className` / `class` / `style` / `sx` | 字段容器样式 | 常用样式类型 | - |

### FormInstance

| 方法 | 说明 |
| --- | --- |
| `getFieldValue(name)` | 获取单个字段值 |
| `getFieldsValue(names?)` | 获取全部或指定字段值 |
| `setFieldValue(name, value)` | 设置单个字段值 |
| `setFieldsValue(values)` | 批量合并字段值 |
| `setFields(fields)` | 批量设置字段值、错误、触碰状态 |
| `getFieldError(name)` | 获取单字段错误 |
| `getFieldsError(names?)` | 获取字段错误列表 |
| `getFieldMeta(name)` | 获取字段 `touched / validating / errors` |
| `isFieldTouched(name)` | 字段是否被用户触碰 |
| `isFieldsTouched(names?)` | 任一字段是否被触碰 |
| `validateFields(names?)` | 校验字段，成功返回 values，失败抛出错误信息 |
| `resetFields(names?)` | 重置全部或指定字段 |
| `submit()` | 触发表单校验与提交 |
| `subscribe(listener)` | 订阅表单变化，通常由 hooks 内部使用 |

### Hooks

| Hook | 说明 |
| --- | --- |
| `useForm(form?)` / `Form.useForm(form?)` | 创建或复用表单实例 |
| `useFormInstance()` / `Form.useFormInstance()` | 从上下文获取当前表单实例 |
| `useFormValue(name?, form?)` / `Form.useFormValue(name?, form?)` | 读取字段或整个表单值 |
| `useFormWatch(name?, form?)` / `Form.useFormWatch(name?, form?)` | 监听字段或整个表单值，语义上用于联动 |

## 行为规则 / 优先级

- 未传入 `form`、`onFinish`、`onFinishFailed`、`onValuesChange` 或 `onFieldsChange` 时，`Form` 默认保持原生提交行为。
- 启用增强提交后，`submit` 会阻止浏览器跳转，先执行 `validateFields`，再触发 `onFinish` 或 `onFinishFailed`。
- `Form.Item` 会自动识别常见控件：`Input`、`InputNumber`、`InputOPT` 使用 `value/onChange`，`AutoComplete`、`Select`、`RadioGroup`、`Slider`、`Cascader` 使用 `value/onValueChange`，`Switch`、`Checkbox` 使用 `checked/onCheckedChange`，`CheckboxGroup`、`Rate` 使用 `value/onChange`，`Uploader` 使用 `onChange(FileList | null)`。
- `valuePropName`、`trigger`、`getValueFromEvent` 和 `getValueProps` 优先级高于自动识别，适合接入自定义控件。
- `initialValues` 只在首次挂载时写入当前值；后续变化会更新重置基准，不会覆盖用户正在编辑的值。
- `setFieldValue` 和 `setFieldsValue` 会通知 `useFormWatch` / `useFormValue`，但不会触发 `onValuesChange`，避免程序化写值形成循环。
- `rules` 支持返回 `false`、错误文案、抛出异常或返回 Promise；异步校验期间字段 `validating` 为 `true`。
- `preserve={false}` 时，字段卸载会从表单值中移除对应字段。

## Notes

- `Form.Item` 会把字段名透传给子控件的 `name`。路径数组会转成点号名称，例如 `["user", "email"] -> "user.email"`。
- `Uploader` 可以放入 `Form.Item`，表单会收集 `FileList | null`；由于浏览器文件输入不能被安全受控，Form 不会向 `Uploader` 注入 `value`。
- `InputNumber` 默认按输入框字符串接入，避免破坏 `-`、`1.` 等输入中间态；如果业务需要数字值，可手动设置 `trigger="onValueChange"`。
- 原生后端提交优先使用 `name`、`action`、`method`；复杂前端校验和联动优先使用 `useForm`。
- 有可见标签时建议使用 `label` 或外部 `Label`，无可见标签时为控件补充 `aria-label` 或 `aria-labelledby`。
