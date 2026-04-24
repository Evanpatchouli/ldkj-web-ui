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

## Rounded

`Chip` 支持 `rounded` 圆角控制，支持 `xs`、`sm`、`md`、`lg`、`xl`、`full`，也支持数字（自动转 `px`）与任意 CSS 字符串。

<ChipRoundedDemo />

## Usage

```tsx
import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Chip variant="success" size="sm" rounded={12}>
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
    <Chip component="a" href="/orders" variant="primary" outline rounded="full">
      View Orders
    </Chip>
  );
}
```

## API

| 属性        | 说明                 | 类型                                                                                        | 默认值       |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------- | ------------ |
| `variant`   | 颜色变体             | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'minor' \| 'dark' \| 'light' \| 'text'` | `'primary'`  |
| `outline`   | 是否使用描边样式     | `boolean`                                                                                   | `false`      |
| `size`      | 尺寸                 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                      | `'md'`       |
| `rounded`   | 圆角                 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string`                        | 默认样式圆角 |
| `component` | 指定渲染的元素或组件 | `React.ElementType`                                                                         | `'span'`     |
| `className` | 追加类名             | `string`                                                                                    | -            |
| `class`     | 兼容旧写法的类名字段 | `string`                                                                                    | -            |
| `children`  | 内容                 | `React.ReactNode`                                                                           | -            |
