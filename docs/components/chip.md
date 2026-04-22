# Chip

用于展示状态、标签或分类信息的轻量级标记组件。

## Variant

`Chip` 提供多种语义色彩，默认样式为 `primary`。

<ChipVariantsDemo />

## Outline

通过 `outline` 切换为描边风格，适合更轻量的视觉层级。

<ChipOutlineDemo />

## Size

`Chip` 支持 `xs` 到 `xl` 五档尺寸，默认值为 `md`。

<ChipSizesDemo />

## Usage

```tsx
import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Chip variant="success" size="sm">
      Online
    </Chip>
  );
}
```

## As Component

`Chip` 支持通过 `component` 指定渲染元素，便于在链接或按钮语义中复用样式。

```tsx
import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Chip component="a" href="/orders" variant="primary" outline>
      View Orders
    </Chip>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 颜色变体 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'minor' \| 'dark' \| 'light' \| 'text'` | `'primary'` |
| `outline` | 是否使用描边样式 | `boolean` | `false` |
| `size` | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `component` | 指定渲染的元素或组件 | `React.ElementType` | `'span'` |
| `className` | 追加类名 | `string` | - |
| `class` | 兼容旧写法的类名字段 | `string` | - |
| `children` | 内容 | `React.ReactNode` | - |
