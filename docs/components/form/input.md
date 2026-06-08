# Input

`Input` 用于收集单行文本、邮箱、密码、文件等原生输入内容。它保留原生 `input` 属性，并支持 `class` 别名和 `sx` 样式定制。

## Basic

基础输入框通常通过 `placeholder` 提示输入内容。

<InputBasicDemo />

## States

Input 支持只读、禁用、密码和文件输入等原生状态。

<InputStatesDemo />

## SX Styling

可以通过 `sx` 定制尺寸、圆角、颜色和聚焦状态。

<InputSxDemo />

## Format Hook

`useInputValue` 用于管理文本输入的字符串状态，并可在失焦时统一格式化。常见场景包括去除首尾空格、转大写、账号规范化等。

```tsx
import { Input, useInputValue } from "@ldkj/web-ui";

export function FormatExample() {
  const account = useInputValue({
    defaultValue: " admin ",
    formatOnBlur: (value) => value.trim().toLowerCase(),
  });

  return <Input {...account.inputProps} placeholder="请输入账号" />;
}
```

## 常见场景

### 基础表单

在普通表单项中使用 Input，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Input。

## Usage

```tsx
import { Input } from "@ldkj/web-ui";

export function Example() {
  return <Input name="projectName" placeholder="请输入项目名称" />;
}
```

受控用法：

```tsx
import * as React from "react";
import { Input } from "@ldkj/web-ui";

export function ControlledExample() {
  const [value, setValue] = React.useState("");

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="请输入关键字"
    />
  );
}
```

## API

`Input` 基于原生 `input`，支持全部原生输入属性。

| 属性        | 说明               | 类型                  | 默认值   |
| ----------- | ------------------ | --------------------- | -------- |
| `type`      | 输入类型           | `HTMLInputTypeAttribute` | `"text"` |
| `value`     | 受控值             | `string \| number \| readonly string[]` | - |
| `defaultValue` | 默认值          | `string \| number \| readonly string[]` | - |
| `onChange`  | 输入变化回调       | `(event) => void`     | -        |
| `disabled`  | 是否禁用           | `boolean`             | `false`  |
| `readOnly`  | 是否只读           | `boolean`             | `false`  |
| `placeholder` | 占位提示        | `string`              | -        |
| `name`      | 表单字段名         | `string`              | -        |
| `className` | 自定义类名         | `string`              | -        |
| `class`     | 类名别名           | `string`              | -        |
| `style`     | 原生样式           | `React.CSSProperties` | -        |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -        |

### useInputValue

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控字符串值 | `string` | - |
| `defaultValue` | 非受控默认字符串值 | `string` | `""` |
| `onValueChange` | 输入值变化回调 | `(value: string, meta: InputValueChangeMeta) => void` | - |
| `formatOnBlur` | 失焦时格式化字符串 | `(value: string) => string` | - |

返回值：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `value` | 当前字符串值 | `string` |
| `setValue` | 主动设置字符串值 | `(value: string) => void` |
| `inputProps` | 可直接展开到 `Input` 上的 `value/onChange/onBlur` | `object` |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Input 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 建议配合 `label`、`aria-label` 或 `aria-labelledby` 提供可访问名称。
- `sx` 的基础样式会以内联样式形式合并，优先级高于默认类名。
- `type="file"` 会保留浏览器原生文件选择行为。
