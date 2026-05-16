# Empty

`Empty` 用于表达当前区域没有可展示内容，适合查询无结果、列表为空、收藏为空、权限空态等场景。它基于 [Box](/components/layout/box) 实现，因此可以直接使用 `sx`、`rounded`、`shadow`、`loading` 等基础能力。

## Basic

<EmptyBasicDemo />

## Custom Image

通过 `image` 替换默认图形，可传入图标、图片、插画或任意 React 节点。

<EmptyImageDemo />

## With Action

`Empty` 会渲染 `children`，适合放置刷新、创建、跳转等操作按钮。

<EmptyActionDemo />

## Box Ability

`Empty` 继承 `Box` 的基础能力，可直接使用 `rounded`、`shadow`、`sx`、`loading`、`modal` 等属性。

<EmptyBoxDemo />

## Usage

```tsx
import { Empty, Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Empty
      description="暂无收藏内容"
      image={<div className="text-4xl">□</div>}
      rounded="lg"
      sx={{ border: "1px dashed #cbd5e1" }}
    >
      <Button size="sm">去浏览</Button>
    </Empty>
  );
}
```

## API

`Empty` 继承 [Box](/components/layout/box) 的样式与遮罩能力，支持 `className`、`class`、`style`、`sx`、`rounded`、`shadow`、`loading`、`modal` 以及 `div` 原生属性透传。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 空状态描述内容 | `React.ReactNode` | `"暂无数据"` |
| `image` | 自定义空状态图形 | `React.ReactNode` | 内置方块图形 |
| `children` | 额外内容，通常为操作按钮 | `React.ReactNode` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口，支持对象、数组、函数与嵌套选择器 | `SxProps` | - |
| `rounded` | 圆角，继承自 Box | `Rounded` | - |
| `shadow` | 阴影，继承自 Box | `Shadow` | - |
| `loading` | 是否显示元素级 loading 遮罩 | `boolean` | `false` |
| `modal` | 是否显示元素级 modal 遮罩 | `boolean` | `false` |
| `...rest` | 原生属性透传 | `BoxProps<"div">` | - |

## Notes

- `Empty` 默认使用纵向居中布局，并带有 `py-10` 的纵向留白。
- `description` 和 `image` 都支持 React 节点，可组合文本、图标、图片或自定义插画。
- 行动按钮通过 `children` 传入；组件本身不提供 `actions` 数组或按钮配置 API。
- 需要让空态占满某个区域时，可通过 `sx` 设置 `minHeight`，或由外层容器控制高度。
