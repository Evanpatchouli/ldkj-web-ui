# Flex

`Flex` 是用于对齐的弹性布局容器。

## Direction / Justify / Items

通过 `direction`、`justify`、`items` 控制主轴方向和对齐方式。

<FlexDirectionDemo />

## Wrap + Gap

通过 `wrap` 控制是否换行；`gap` 默认 `md`，支持 `xs | sm | md | lg | xl | number | string`。

<FlexGapWrapDemo />

## Width + Height

`width` 与 `height` 支持 `number | string`，数字会自动转成 `px`。

<FlexSizeDemo />

## Usage

```tsx
import { Flex } from "@ldkj/web-ui";

export function Example() {
  return (
    <Flex direction="row" justify="space-between" items="center" gap="md">
      <div>Left</div>
      <div>Right</div>
    </Flex>
  );
}
```

## API

`Flex` 继承 [Box](/components/layout/box) 的基础能力，支持 `component`、`class`、`loading`、`loadingContent`、`modal`、`modalContent`、`onModalMaskClick` 以及原生属性透传。

| 属性        | 说明                          | 类型                                                       | 默认值     |
| ----------- | ----------------------------- | ---------------------------------------------------------- | ---------- |
| `direction` | 主轴方向（`flex-direction`）  | `'row' \| 'row-reverse' \| 'col' \| 'col-reverse'`         | `'row'`    |
| `justify`   | 主轴对齐（`justify-content`） | `React.CSSProperties['justifyContent']`                    | -          |
| `items`     | 交叉轴对齐（`align-items`）   | `React.CSSProperties['alignItems']`                        | -          |
| `flex`      | `flex` 简写属性               | `React.CSSProperties['flex']`                              | -          |
| `wrap`      | 是否换行（`flex-wrap`）       | `boolean \| React.CSSProperties['flexWrap']`               | `'nowrap'` |
| `gap`       | 间距                          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'`     |
| `width`     | 宽度                          | `number \| string`                                         | -          |
| `height`    | 高度                          | `number \| string`                                         | -          |
| `className` | 追加类名                      | `string`                                                   | -          |
| `style`     | 内联样式                      | `React.CSSProperties`                                      | -          |
| `sx`        | CSS-in-JS 样式入口            | `SxProps`（支持对象/数组/函数，支持伪类、选择器、媒体查询） | -          |
| `children`  | 内容                          | `React.ReactNode`                                          | -          |
