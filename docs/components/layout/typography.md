# Typography

`Typography` 用于统一文本层级，覆盖标题、正文、说明和辅助文字场景。  
它将视觉层级（`variant`）与语义标签（`component`）解耦，便于在不破坏语义的前提下控制样式。

## Basic

<TypographyBasicDemo />

## Variants

`variant` 只控制视觉表现，不直接决定 DOM 标签。
<TypographyVariantsDemo />

## Semantic Component

通过 `component` 指定最终渲染标签或组件。
<TypographySemanticDemo />

## SX Custom

通过 `sx` 覆盖局部样式，适合临时色彩、间距和状态样式调整。
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
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 文本或节点内容 | `React.ReactNode` | - |
| `...rest` | 原生属性透传（随 `component` 变化） | `React.ComponentPropsWithoutRef<T>` | - |

## 行为规则

1. `variant` 决定视觉，不决定语义。  
2. `component` 决定最终渲染标签。  
3. `variant` 与 `component` 不一致时，以 `component` 语义为准。

## 推荐实践

- 语义敏感内容优先先定 `component`，再定 `variant`。  
- 紧凑布局中可使用 `component="span"` 避免块级换行。  
- `caption` 用于辅助信息，避免承载主业务文案。

## Notes

- 样式合并顺序：变体基础样式 -> `className/class` -> `sx/style`。  
- 出现样式冲突时优先在 `sx` 显式覆盖字号、行高、颜色、字重。
