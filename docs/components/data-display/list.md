# List

`List` 是轻量列表容器，用于统一 `ul` 的基础样式，并按需提供边框与分割线。  
它不接管列表项渲染，适合承载业务自定义 `li` 结构。

## Basic

<ListBasicDemo />

## Bordered

开启 `bordered` 后，列表会增加外边框、圆角和子项分割线。
<ListBorderedDemo />

## Rich Item

列表项可包含标题、描述、状态、时间和操作区。
<ListRichItemDemo />

## SX Custom

通过 `sx` 可统一控制容器和子项状态样式。
<ListSxDemo />

## Usage

```tsx
import { List } from "@ldkj/web-ui";

export function Example() {
  return (
    <List bordered className="bg-white">
      <li className="px-4 py-3">订单 1001</li>
      <li className="px-4 py-3">订单 1002</li>
      <li className="px-4 py-3">订单 1003</li>
    </List>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `bordered` | 是否启用外边框与分割线 | `boolean` | `false` |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 列表项内容（通常为 `li`） | `React.ReactNode` | - |
| `...rest` | `ul` 原生属性透传 | `React.HTMLAttributes<HTMLUListElement>` | - |

## 行为规则

1. 组件会重置 `ul` 默认 `margin/padding/list-style`。  
2. `bordered` 仅控制容器边框和分割线，不管理 `li` 内部布局。  
3. 组件不提供 `dataSource`/`renderItem`。

## 推荐实践

- 每个 `li` 建议显式设置 `padding`。  
- 复杂项建议采用“左内容 + 右操作”布局。  
- 仅在需要边界视觉时启用 `bordered`。

## Notes

- 需要有序语义时请直接使用原生 `ol`。  
- `sx` 适合做子选择器定制，例如 `li:hover`、`li:last-child`。
