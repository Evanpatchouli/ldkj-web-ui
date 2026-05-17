# List

`List` 是轻量列表容器，用于重置 `ul` 默认样式，并按需提供边框与分割线。它不接管列表项渲染，适合承载简单文本、信息行、操作入口或业务自定义列表项。

## Basic

<ListBasicDemo />

## Bordered

开启 `bordered` 后，列表会增加外边框、圆角和子项分割线。

<ListBorderedDemo />

## Rich Item

列表项由业务自己组织，可放置标题、描述、状态、时间和操作区。

<ListRichItemDemo />

## SX Custom

通过 `sx` 可以统一控制列表容器和子项状态，适合做轻量 hover 或局部视觉定制。

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

`List` 继承 `ul` 原生属性，支持 `aria-*`、`data-*`、事件和子节点透传。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `bordered` | 是否启用外边框、圆角和子项分割线 | `boolean` | `false` |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口，支持对象、数组、函数与嵌套选择器 | `SxProps` | - |
| `children` | 列表项内容，通常为 `li` | `React.ReactNode` | - |
| `...rest` | `ul` 原生属性透传 | `React.HTMLAttributes<HTMLUListElement>` | - |

## Notes

- `List` 默认会移除 `ul` 的 margin、padding 和 list-style，不会自动为 `li` 添加内边距。
- `bordered` 只提供容器边框和分割线，列表项内容布局仍由业务通过 `li` 的 className/style/sx 组织。
- 需要有序列表语义时不建议使用 `List`，应直接使用原生 `ol` 或业务封装。
