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

## 常见场景

### 基础布局

用于组织页面结构、控制间距、对齐和响应式布局。

### 组合嵌套

复杂页面推荐拆成多个 Space 组合，避免在单个容器中堆叠过多职责。

### 响应式适配

可通过尺寸、间距、`className` 或 `sx` 处理不同屏幕下的布局变化。

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

## 行为规则 / 优先级

- 布局组件只处理结构、尺寸和对齐，不承载业务状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Space 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 布局层尽量保持语义清晰，避免把业务点击行为隐藏在纯布局组件里。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
