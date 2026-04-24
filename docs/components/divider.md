# Divider

用于分割内容区域的分割线组件，默认是水平实线。

## Variant

通过 `variant` 控制分割线缩进方式：

- `full`: 撑满可用宽度
- `middle`: 两端保留固定空隙
- `inset`: 起始端保留固定空隙

<DividerVariantsDemo />

## Content + Align

传入 `children` 后可在分割线中放置元素，并通过 `align` 控制位置：

- `left`: 元素在左部
- `center`: 元素居中（默认）
- `right`: 元素在右部

<DividerContentDemo />

## Vertical

传入 `vertical` 切换为垂直分割线。

<DividerVerticalDemo />

## Type + Color

通过 `type` 设置线型（默认 `solid`），通过 `color` 设置颜色类（默认 `text-gray-200`）。

<DividerTypeColorDemo />

## Usage

```tsx
import { Divider } from "@ldkj/web-ui";

export function Example() {
  return (
    <div>
      <p>Section A</p>
      <Divider variant="middle">OR</Divider>
      <p>Section B</p>
    </div>
  );
}
```

## API

| 属性        | 说明                        | 类型                                 | 默认值            |
| ----------- | --------------------------- | ------------------------------------ | ----------------- |
| `vertical`  | 是否为垂直分割线            | `boolean`                            | `false`           |
| `variant`   | 分割线变体                  | `'full' \| 'middle' \| 'inset'`      | `'full'`          |
| `align`     | `children` 位置（水平模式） | `'left' \| 'center' \| 'right'`      | `'center'`        |
| `type`      | 分割线类型                  | `React.CSSProperties['borderStyle']` | `'solid'`         |
| `color`     | 分割线颜色类名              | `string`                             | `'text-gray-200'` |
| `children`  | 中间内容                    | `React.ReactNode`                    | -                 |
| `className` | 追加类名                    | `string`                             | -                 |
| `style`     | 内联样式                    | `React.CSSProperties`                | -                 |
