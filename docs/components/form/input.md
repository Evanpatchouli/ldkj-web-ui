# Input

`Input` 用于收集单行文本、邮箱、密码、文件等原生输入内容。它保留原生 `input` 属性，并支持 `class` 别名和 `sx` 样式定制。

## Basic

基础输入框通常通过 `placeholder` 提示输入内容。

<InputBasicDemo />

## States

Input 支持只读、禁用、密码和文件输入等原生状态。

<InputStatesDemo />

## Prefix / Suffix / Addon

`prefix` 与 `suffix` 渲染在输入框内部，适合图标、单位、短提示；`addonBefore` 与 `addonAfter` 渲染在输入框外侧，适合协议、区号、币种和固定标签。四者既支持 props，也支持组合式子组件。

<InputAffixAddonDemo />

## SX Styling

可以通过 `sx` 定制尺寸、圆角、颜色和聚焦状态。

<InputSxDemo />

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
| `prefix` | 输入框内部前缀 | `React.ReactNode` | - |
| `suffix` | 输入框内部后缀 | `React.ReactNode` | - |
| `addonBefore` | 输入框外侧前置标签 | `React.ReactNode` | - |
| `addonAfter` | 输入框外侧后置标签 | `React.ReactNode` | - |
| `name`      | 表单字段名         | `string`              | -        |
| `className` | 自定义类名         | `string`              | -        |
| `class`     | 类名别名           | `string`              | -        |
| `style`     | 原生样式           | `React.CSSProperties` | -        |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -        |

### 组合式组件

| 组件 | 说明 |
| --- | --- |
| `Input.Prefix` | 等价于 `prefix`，渲染在输入框内部左侧 |
| `Input.Suffix` | 等价于 `suffix`，渲染在输入框内部右侧 |
| `Input.AddonBefore` | 等价于 `addonBefore`，渲染在输入框外侧左侧 |
| `Input.AddonAfter` | 等价于 `addonAfter`，渲染在输入框外侧右侧 |
| `Input.Addon` | 通用 Addon，`position="before"` 时等价于 `AddonBefore`，`position="after"` 时等价于 `AddonAfter` |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 未传 `prefix`、`suffix`、`addonBefore`、`addonAfter` 且没有组合式子组件时，Input 仍直接渲染原生 `input`。
- 组合式子组件会覆盖同名 prop，例如同时传 `prefix` 和 `Input.Prefix` 时，以 `Input.Prefix` 为准。
- `prefix/suffix` 是输入框内部装饰，`addonBefore/addonAfter` 是输入框外侧分组标签；四者都不参与实际输入值。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Input 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 建议配合 `label`、`aria-label` 或 `aria-labelledby` 提供可访问名称。
- `sx` 的基础样式会以内联样式形式合并，优先级高于默认类名。
- `type="file"` 会保留浏览器原生文件选择行为。
