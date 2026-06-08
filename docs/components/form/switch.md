# Switch

`Switch` 用于在开启和关闭之间切换单个设置，支持非受控、受控、标签说明、尺寸和 `sx` 样式定制。

## Basic

基础开关可以直接使用，也可以通过 `label` 提供可访问名称。

<SwitchBasicDemo />

## Controlled

通过 `checked` 与 `onCheckedChange` 可以受控管理开关状态。

<SwitchControlledDemo />

## Label Description

`label` 与 `description` 会渲染为开关旁的文本区域，并通过 `aria-describedby` 关联说明文本。

<SwitchLabelDescriptionDemo />

## Sizes / SX

`size` 提供常用尺寸，`sx` 定制开关本体，`containerSx` 定制带标签时的外层容器。

<SwitchSizesSxDemo />

## 常见场景

### 基础表单

在普通表单项中使用 Switch，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Switch。

## Usage

```tsx
import { Switch } from "@ldkj/web-ui";

export function Example() {
  return <Switch defaultChecked label="接收系统通知" />;
}
```

受控用法：

```tsx
import * as React from "react";
import { Switch } from "@ldkj/web-ui";

export function ControlledExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
      label="自动同步"
    />
  );
}
```

## API

`Switch` 基于 `@radix-ui/react-switch`，支持其 Root 的常用属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `checked` | 受控开启状态 | `boolean` | - |
| `defaultChecked` | 默认开启状态 | `boolean` | - |
| `onCheckedChange` | 状态变化回调 | `(checked: boolean) => void` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `required` | 是否必填 | `boolean` | `false` |
| `name` | 表单字段名 | `string` | - |
| `value` | 表单提交值 | `string` | `"on"` |
| `size` | 开关尺寸 | `"sm" \| "md" \| "lg"` | `"md"` |
| `label` | 标签内容 | `React.ReactNode` | - |
| `description` | 说明内容 | `React.ReactNode` | - |
| `labelPosition` | 标签位置 | `"left" \| "right"` | `"right"` |
| `className` | 开关自定义类名 | `string` | - |
| `class` | 开关类名别名 | `string` | - |
| `style` | 开关原生样式 | `React.CSSProperties` | - |
| `sx` | 开关 CSS-in-JS 样式入口 | `SxProps` | - |
| `containerClassName` | 外层容器自定义类名 | `string` | - |
| `containerClass` | 外层容器类名别名 | `string` | - |
| `containerStyle` | 外层容器原生样式 | `React.CSSProperties` | - |
| `containerSx` | 外层容器 CSS-in-JS 样式入口 | `SxProps` | - |

其余属性继承 Radix `Switch.Root`，例如 `id`、`aria-label`、`aria-labelledby`、`aria-describedby` 等可访问性属性。

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Switch 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 未传入 `label` 时，请通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。
- `label` 与 `description` 只负责展示和无障碍关联，业务状态仍由 Radix 的 `checked` / `defaultChecked` / `onCheckedChange` 管理。
- `sx` 作用于开关根节点；需要调整带文本布局时使用 `containerSx`。
