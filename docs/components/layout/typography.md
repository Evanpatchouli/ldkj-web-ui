# Typography

`Typography` 用于统一页面中的文本层级，适合标题、正文、辅助说明、链接文本等基础排版场景。

## Basic

<TypographyBasicDemo />

## Variants

`variant` 控制视觉层级，不直接决定最终渲染标签。

<TypographyVariantsDemo />

## Semantic Component

通过 `component` 可以指定语义标签或自定义组件。例如页面主标题可渲染为 `h1`，正文仍可渲染为 `p`，链接文本可渲染为 `a`。

<TypographySemanticDemo />

## SX Custom

通过 `sx` 覆盖局部样式，适合一次性颜色、间距、边框或伪类状态。

<TypographySxDemo />

## Usage

```tsx
import { Typography } from "@ldkj/web-ui";

export function Example() {
  return (
    <section>
      <Typography component="h1" variant="h1">
        数据看板
      </Typography>
      <Typography variant="body">
        查看关键指标、近期趋势和待处理事项。
      </Typography>
      <Typography variant="caption" sx={{ color: "#64748b" }}>
        更新时间: 2026-05-17 14:30
      </Typography>
    </section>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 文本视觉层级 | `"h1" \| "h2" \| "h3" \| "body" \| "caption"` | `"body"` |
| `component` | 渲染标签或组件 | `React.ElementType` | `"p"` |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口，支持对象、数组、函数与嵌套选择器 | `SxProps` | - |
| `children` | 文本或节点内容 | `React.ReactNode` | - |
| `...rest` | 原生属性透传，类型随 `component` 变化 | `React.ComponentPropsWithoutRef<T>` | - |

## Notes

- `variant` 只表示视觉层级；需要正确文档结构时，请同时传入合适的 `component`。
- 默认渲染为 `p`。如果在按钮、表格单元格或紧凑布局中使用，可按语义改为 `span`。
- 样式合并顺序与其他接入 `sx` 的组件一致：基础变体类名先应用，`className/class` 追加，`sx` 生成的样式可覆盖局部视觉。
