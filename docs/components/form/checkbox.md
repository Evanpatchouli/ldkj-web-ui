# Checkbox

`Checkbox` 用于在一组选项中进行多选，支持非受控、受控、半选、禁用状态和 `sx` 样式定制。

## Basic

基础复选框通常与 `label` 一起使用，扩大可点击区域并提供文本语义。

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

## Usage

```tsx
import { Checkbox } from "@ldkj/web-ui";

export function Example() {
  return (
    <label className="flex items-center gap-2">
      <Checkbox defaultChecked />
      接收系统通知
    </label>
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

## Notes

- 建议与 `label` 搭配使用，或通过 `aria-label` / `aria-labelledby` 提供可访问名称。
- 半选状态不会自动参与业务逻辑，需要在受控状态中显式传入 `"indeterminate"`。
- 传入 `children` 时会覆盖默认的勾选与半选指示器。
