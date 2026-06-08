# CheckboxGroup

`CheckboxGroup` 用于管理一组选项的选择状态，支持多选、单选、禁用项、原生表单提交和 `sx` 样式定制。

## Multiple

默认是多选模式，`value` 是字符串数组。

<CheckboxGroupMultipleDemo />

## Single

设置 `type="single"` 后进入单选模式，`value` 是字符串或 `undefined`。再次点击已选中项会取消选择。

<CheckboxGroupSingleDemo />

## Form Submit

传入 `name` 后，`CheckboxGroup` 可以放入原生 `form`。多选模式会提交多个同名字段。

<CheckboxGroupFormDemo />

## Compose

`CheckboxGroup` 也支持组合式用法。放在组内且带有 `value` 的 `Checkbox` 会自动接入组的选中状态、`name` 和禁用态。

<CheckboxGroupComposeDemo />

## SX Styling

可以通过 `sx` 定制分组容器，也可以通过 `options.checkboxProps` 定制单个 Checkbox。

<CheckboxGroupSxDemo />

## Basic

最小用法展示 CheckboxGroup 的默认形态。优先从 Basic 示例开始，再按业务场景叠加状态、样式和交互。

<CheckboxGroupMultipleDemo />

## 常见场景

### 基础表单

在普通表单项中使用 CheckboxGroup，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 CheckboxGroup。

## Usage

```tsx
import * as React from "react";
import { CheckboxGroup } from "@ldkj/web-ui";

const options = [
  { label: "订单管理", value: "orders" },
  { label: "库存管理", value: "inventory" },
  { label: "财务报表", value: "finance", disabled: true },
];

export function Example() {
  const [value, setValue] = React.useState<string[]>(["orders"]);

  return (
    <CheckboxGroup
      name="modules"
      value={value}
      onChange={setValue}
      options={options}
    />
  );
}
```

单选用法：

```tsx
import * as React from "react";
import { CheckboxGroup } from "@ldkj/web-ui";

export function SingleExample() {
  const [value, setValue] = React.useState<string | undefined>("pro");

  return (
    <CheckboxGroup
      type="single"
      name="plan"
      value={value}
      onChange={setValue}
      options={[
        { label: "标准版", value: "standard" },
        { label: "专业版", value: "pro" },
      ]}
    />
  );
}
```

组合式用法：

```tsx
import * as React from "react";
import { Checkbox, CheckboxGroup, Label } from "@ldkj/web-ui";

export function ComposeExample() {
  const [value, setValue] = React.useState<string[]>(["orders"]);

  return (
    <CheckboxGroup name="modules" value={value} onChange={setValue}>
      <Label>
        <Checkbox value="orders" />
        订单管理
      </Label>
      <Label>
        <Checkbox value="inventory" />
        库存管理
      </Label>
    </CheckboxGroup>
  );
}
```

## API

### CheckboxGroup

| 属性           | 说明               | 类型                                      | 默认值       |
| -------------- | ------------------ | ----------------------------------------- | ------------ |
| `type`         | 选择模式           | `"multiple" \| "single"`                  | `"multiple"` |
| `options`      | 配置式选项列表     | `CheckboxGroupOption[]`                   | -            |
| `children`     | 组合式选项内容     | `React.ReactNode`                         | -            |
| `name`         | 表单字段名         | `string`                                  | -            |
| `value`        | 受控值             | `string[] \| string \| undefined`         | -            |
| `defaultValue` | 默认值             | `string[] \| string`                      | -            |
| `onChange`     | 值变化回调         | `(value) => void`                         | -            |
| `disabled`     | 是否禁用整组       | `boolean`                                 | `false`      |
| `direction`    | 排列方向           | `"vertical" \| "horizontal"`              | `"vertical"` |
| `gap`          | 选项间距           | `"xs" \| "sm" \| "md" \| "lg" \| number \| string` | `"md"` |
| `className`    | 自定义类名         | `string`                                  | -            |
| `class`        | 类名别名           | `string`                                  | -            |
| `style`        | 原生样式           | `React.CSSProperties`                     | -            |
| `sx`           | CSS-in-JS 样式入口 | `SxProps`                                 | -            |

### CheckboxGroupOption

| 属性            | 说明               | 类型              | 默认值 |
| --------------- | ------------------ | ----------------- | ------ |
| `label`         | 选项显示内容       | `React.ReactNode` | -      |
| `value`         | 选项值             | `string`          | -      |
| `disabled`      | 是否禁用该选项     | `boolean`         | `false` |
| `description`   | 选项辅助描述       | `React.ReactNode` | -      |
| `className`     | 选项 label 类名    | `string`          | -      |
| `checkboxProps` | 透传给内部 Checkbox | `CheckboxProps`   | -      |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- CheckboxGroup 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `CheckboxGroup` 使用 `label` 包裹每个选项，点击文本也会切换选择状态。
- 组合式用法中，子级 `Checkbox` 必须传入字符串 `value` 才会自动接入 Group 状态。
- `options` 与 `children` 可以同时渲染，但常规用法建议二选一，避免选项来源混杂。
- 多选模式放入表单时，会按 HTML 语义提交多个同名字段。
- 单选模式仍保持 Checkbox 语义，点击已选中的选项会取消选择；如果需要不可取消的单选，请使用 RadioGroup。
