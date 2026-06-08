# Label

`Label` 用于表单字段标注。它基于 Radix Label 实现，保留原生 label 的点击聚焦与可访问性语义，同时支持必填标记、冒号、标签宽度、对齐、左右/上下布局和 `sx` 样式定制。

## Basic

普通用法与原生 `label` 接近，可以通过 `htmlFor` 关联输入控件。

<LabelBasicDemo />

## Required / Colon

传入 `label` 后，`Label` 会渲染“标签 + 控件”的布局。`required` 只展示星号，不代表校验逻辑。

<LabelRequiredDemo />

## Layout

通过 `labelWidth`、`labelAlign` 和 `position` 控制表单标签对齐方式。

<LabelLayoutDemo />

## SX Styling

`sx` 作用于标签本身，`containerSx` 作用于“标签 + 控件”的外层容器。

<LabelSxDemo />

## 常见场景

### 基础表单

在普通表单项中使用 Label，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Label。

## Usage

```tsx
import { Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Label
      htmlFor="phone"
      label="联系电话"
      required
      colon
      labelWidth={120}
      labelAlign="right"
    >
      <Input id="phone" placeholder="请输入联系电话" />
    </Label>
  );
}
```

普通 label 用法：

```tsx
import { Input, Label } from "@ldkj/web-ui";

export function BasicExample() {
  return (
    <div>
      <Label htmlFor="name">项目名称</Label>
      <Input id="name" />
    </div>
  );
}
```

## API

| 属性                 | 说明                         | 类型                                | 默认值   |
| -------------------- | ---------------------------- | ----------------------------------- | -------- |
| `label`              | 标签内容                     | `React.ReactNode`                   | -        |
| `children`           | 控件或普通 label 子内容      | `React.ReactNode`                   | -        |
| `htmlFor`            | 关联控件 id                  | `string`                            | -        |
| `required`           | 是否展示必填星号             | `boolean`                           | `false`  |
| `colon`              | 是否展示冒号或自定义冒号内容 | `boolean \| React.ReactNode`        | -        |
| `labelWidth`         | 标签宽度                     | `number \| string`                  | -        |
| `labelAlign`         | 标签内容对齐                 | `"left" \| "center" \| "right"`    | `"left"` |
| `position`           | 标签与控件布局方向           | `"left" \| "top"`                  | `"left"` |
| `className`          | 标签类名                     | `string`                            | -        |
| `class`              | 标签类名别名                 | `string`                            | -        |
| `style`              | 标签原生样式                 | `React.CSSProperties`               | -        |
| `sx`                 | 标签 CSS-in-JS 样式入口      | `SxProps`                           | -        |
| `containerClassName` | 外层容器类名                 | `string`                            | -        |
| `containerClass`     | 外层容器类名别名             | `string`                            | -        |
| `containerStyle`     | 外层容器原生样式             | `React.CSSProperties`               | -        |
| `containerSx`        | 外层容器 CSS-in-JS 样式入口  | `SxProps`                           | -        |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Label 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 当没有传入 `label` 时，`Label` 会像普通原生 label 一样直接渲染 `children`。
- 当传入 `label` 时，`Label` 会额外渲染外层容器，用于实现标签与控件的布局。
- `required` 只负责视觉标记，不会触发表单校验。
