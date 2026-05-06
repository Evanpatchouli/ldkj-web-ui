# Space

`Space` 用于对子元素做统一排布与间距控制，适合按钮组、标签组、操作区、信息块等场景。

## Basic

<SpaceBasicDemo />

## Responsive

`direction`、`size`、`wrap`、`align`、`justify` 支持响应式对象写法。

<SpaceResponsiveDemo />

## Space.Item

使用 `Space.Item` 可以对单项设置 `flex`、`grow`、`shrink`、`basis`、`order`、`alignSelf`。

<SpaceItemDemo />

## Split

通过 `split` 可在子项之间插入分隔内容。

<SpaceSplitDemo />

## Usage

```tsx
import { Space, Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Space
      direction={{ xs: "vertical", md: "horizontal" }}
      size={{ xs: "sm", md: { row: "md", column: "xl" } }}
      split={<span>|</span>}
    >
      <Button size="sm">保存</Button>
      <Button size="sm" variant="secondary">预览</Button>
      <Button size="sm" variant="outline">取消</Button>
    </Space>
  );
}
```

## API

`Space` 继承 [Box](/components/layout/box) 的基础能力，支持 `component`、`class`、`loading`、`loadingContent`、`modal`、`modalContent`、`onModalMaskClick` 以及原生属性透传。

### Space

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 排列方向，支持响应式 | `"horizontal" \| "vertical" \| Responsive<...>` | `"horizontal"` |
| `size` | 间距，支持单值/双值/对象与响应式 | `SpaceGap \| Responsive<SpaceGap>` | `"md"` |
| `wrap` | 是否换行，支持响应式 | `boolean \| flexWrap \| Responsive<...>` | `true` |
| `align` | 交叉轴对齐，支持响应式 | `alignItems \| Responsive<...>` | - |
| `justify` | 主轴对齐，支持响应式 | `justifyContent \| Responsive<...>` | - |
| `split` | 子项间分隔内容 | `React.ReactNode` | - |
| `itemClassName` | 统一注入到每个子项容器 | `string` | - |
| `itemStyle` | 统一注入到每个子项容器 | `React.CSSProperties` | - |
| `itemSx` | 统一注入到每个子项容器 | `SxProps` | - |
| `component` | 自定义渲染元素 | `React.ElementType` | `"div"` |
| `className`/`class`/`style`/`sx` | 通用样式入口 | - | - |
| `...rest` | 透传原生属性 | `BoxProps<T>` | - |

### Space.Item

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `flex` | flex 缩写 | `React.CSSProperties["flex"]` | - |
| `grow` | flex-grow | `React.CSSProperties["flexGrow"]` | - |
| `shrink` | flex-shrink | `React.CSSProperties["flexShrink"]` | - |
| `basis` | flex-basis | `React.CSSProperties["flexBasis"]` | - |
| `order` | 排序 | `React.CSSProperties["order"]` | - |
| `alignSelf` | 子项对齐 | `React.CSSProperties["alignSelf"]` | - |
| `className`/`class`/`style`/`sx` | 子项样式入口 | - | - |
| `...rest` | 透传到子项容器 | `div props` | - |
