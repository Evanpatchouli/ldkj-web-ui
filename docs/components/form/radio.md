# Radio

`Radio` 和 `RadioGroup` 用于一组互斥选项。它们基于 Radix RadioGroup 实现，支持受控/非受控、原生表单提交和 `sx` 样式定制。

## Basic

`RadioGroup` 可以通过 `options` 快速渲染一组选项。

<RadioBasicDemo />

## Controlled

通过 `value` 和 `onValueChange` 管理受控值。

<RadioControlledDemo />

## Form Submit

传入 `name` 后，`RadioGroup` 可以放入原生 `form`，提交时会输出当前选中的值。

<RadioFormDemo />

## SX Styling

可以通过 `sx` 定制分组容器，也可以通过 `options.radioProps` 定制单个 Radio。

<RadioSxDemo />

## 常见场景

### 基础表单

在普通表单项中使用 Radio，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Radio。

## Usage

```tsx
import * as React from "react";
import { RadioGroup } from "@ldkj/web-ui";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise", disabled: true },
];

export function Example() {
  const [value, setValue] = React.useState("pro");

  return (
    <RadioGroup
      name="plan"
      value={value}
      onValueChange={setValue}
      options={options}
    />
  );
}
```

组合式用法：

```tsx
import { Label, Radio, RadioGroup } from "@ldkj/web-ui";

export function ComposeExample() {
  return (
    <RadioGroup name="size" defaultValue="md">
      <Label>
        <Radio value="sm" />
        小号
      </Label>
      <Label>
        <Radio value="md" />
        中号
      </Label>
    </RadioGroup>
  );
}
```

## API

### RadioGroup

| 属性            | 说明               | 类型                                      | 默认值       |
| --------------- | ------------------ | ----------------------------------------- | ------------ |
| `options`       | 选项列表           | `RadioGroupOption[]`                      | -            |
| `name`          | 表单字段名         | `string`                                  | -            |
| `value`         | 受控值             | `string`                                  | -            |
| `defaultValue`  | 默认值             | `string`                                  | -            |
| `onValueChange` | 值变化回调         | `(value: string) => void`                 | -            |
| `disabled`      | 是否禁用整组       | `boolean`                                 | `false`      |
| `direction`     | 排列方向           | `"vertical" \| "horizontal"`              | `"vertical"` |
| `gap`           | 选项间距           | `"xs" \| "sm" \| "md" \| "lg" \| number \| string` | `"md"` |
| `className`     | 自定义类名         | `string`                                  | -            |
| `class`         | 类名别名           | `string`                                  | -            |
| `style`         | 原生样式           | `React.CSSProperties`                     | -            |
| `sx`            | CSS-in-JS 样式入口 | `SxProps`                                 | -            |

### RadioGroupOption

| 属性          | 说明              | 类型              | 默认值  |
| ------------- | ----------------- | ----------------- | ------- |
| `label`       | 选项显示内容      | `React.ReactNode` | -       |
| `value`       | 选项值            | `string`          | -       |
| `disabled`    | 是否禁用该选项    | `boolean`         | `false` |
| `description` | 选项辅助描述      | `React.ReactNode` | -       |
| `className`   | 选项 label 类名   | `string`          | -       |
| `radioProps`  | 透传给内部 Radio  | `RadioProps`      | -       |

### Radio

| 属性        | 说明               | 类型                  | 默认值 |
| ----------- | ------------------ | --------------------- | ------ |
| `value`     | 选项值             | `string`              | -      |
| `disabled`  | 是否禁用           | `boolean`             | `false` |
| `children`  | 自定义状态指示器   | `React.ReactNode`     | -      |
| `className` | 自定义类名         | `string`              | -      |
| `class`     | 类名别名           | `string`              | -      |
| `style`     | 原生样式           | `React.CSSProperties` | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -      |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Radio 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `Radio` 需要放在 `RadioGroup` 内使用。
- `RadioGroup` 的单选语义不可取消，适合必须从一组选项中选择一个值的场景。
- 如果需要可取消的单选外观，可以继续使用 `CheckboxGroup type="single"`。
