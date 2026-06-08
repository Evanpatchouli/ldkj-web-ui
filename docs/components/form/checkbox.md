# Checkbox

`Checkbox` 用于在一组选项中进行多选，支持非受控、受控、半选、禁用状态和 `sx` 样式定制。

## Basic

基础复选框通常与 `Label` 一起使用，扩大可点击区域并提供文本语义。

<CheckboxBasicDemo />

## Controlled

通过 `checked` 与 `onCheckedChange` 可以受控管理选中状态。

<CheckboxControlledDemo />

## States

Checkbox 支持默认、选中、半选和禁用状态。半选状态使用 Radix 的 `"indeterminate"`。

<CheckboxStatesDemo />

## SX Styling

可以通过 `sx` 定制尺寸、圆角、颜色以及状态选择器。

<CheckboxSxDemo />

## 常见场景

### 基础表单

在普通表单项中使用 Checkbox，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Checkbox。

## Usage

```tsx
import { Checkbox, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Label className="flex items-center gap-2">
      <Checkbox defaultChecked />
      接收系统通知
    </Label>
  );
}
```

受控用法：

```tsx
import * as React from "react";
import { Checkbox } from "@ldkj/web-ui";

export function ControlledExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => setChecked(value === true)}
    />
  );
}
```

## API

`Checkbox` 基于 `@radix-ui/react-checkbox`，支持其 Root 的全部属性。

| 属性              | 说明                 | 类型                                  | 默认值 |
| ----------------- | -------------------- | ------------------------------------- | ------ |
| `checked`         | 受控选中状态         | `boolean \| "indeterminate"`          | -      |
| `defaultChecked`  | 默认选中状态         | `boolean \| "indeterminate"`          | -      |
| `onCheckedChange` | 选中状态变化回调     | `(checked) => void`                   | -      |
| `disabled`        | 是否禁用             | `boolean`                             | `false` |
| `required`        | 是否必填             | `boolean`                             | `false` |
| `name`            | 表单字段名           | `string`                              | -      |
| `value`           | 表单提交值           | `string`                              | `"on"` |
| `children`        | 自定义选中状态内容   | `React.ReactNode`                     | -      |
| `className`       | 自定义类名           | `string`                              | -      |
| `class`           | 类名别名             | `string`                              | -      |
| `style`           | 原生样式             | `React.CSSProperties`                 | -      |
| `sx`              | CSS-in-JS 样式入口   | `SxProps`                             | -      |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Checkbox 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 建议与本库 `Label` 搭配使用，或通过 `aria-label` / `aria-labelledby` 提供可访问名称。
- 半选状态不会自动参与业务逻辑，需要在受控状态中显式传入 `"indeterminate"`。
- 传入 `children` 时会覆盖默认的勾选与半选指示器。
