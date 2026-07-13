# Columns

`Columns` 是固定分栏布局容器，适合看板、信息摘要和卡片集合。它按子节点传入顺序轮询分配到每一列，保证数据分配稳定且不依赖项目尺寸。

> `Columns` 不是 Masonry / Waterfalls：它不测量项目高度，也不保证各列高度均衡。需要高度均衡的瀑布流时，应由业务侧采用专门的布局策略。

## Basic

最小可用示例。使用 `columns` 指定固定分栏数，`gap` 同时控制列间与同列项目间的间距。

<ColumnsBasicDemo />

## 常见场景

### 工作台卡片

卡片高度不同时仍可保持稳定的轮询分配；它适用于不要求底边对齐的工作台区块。

<ColumnsCardsDemo />

### 响应式收拢

`Columns` 不预设断点。小屏布局可通过 `className` 或 `sx` 覆盖容器样式；此时请同时在业务样式中处理列内项目的垂直间距。

<ColumnsResponsiveDemo />

## Usage

```tsx
import { Columns } from "@ldkj/web-ui";

export function Dashboard() {
  return (
    <Columns columns={3} gap={16}>
      <OverviewCard />
      <TodoCard />
      <CalendarCard />
      <ActivityCard />
      <MessageCard />
    </Columns>
  );
}
```

## API

`Columns` 继承 [Box](/components/layout/box) 的通用容器能力，包括 `component`、`className`、`style`、`sx`、`rounded`、`shadow`、`loading` 与原生属性透传。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 固定列数；小于 1、非有限数会回退为默认值，小数向下取整 | `number` | `4` |
| `gap` | 列间与列内项目间距；数字按 px 处理 | `number \| string` | `8` |
| `children` | 待分配到列中的内容 | `React.ReactNode` | - |
| `className` / `style` | 根节点追加类名和内联样式 | `string` / `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

## 行为规则 / 优先级

- 子节点先经 `React.Children.toArray` 规范化，再按索引取模分配：第 1、`columns + 1`、`columns * 2 + 1` 个项目位于第一列。
- `columns` 仅影响分栏和分配规则，不会根据容器宽度自动变化。
- `gap` 同时用于横向列间距与纵向项目间距。
- `style` 与 `sx` 可覆盖根容器计算样式；若覆盖 `display`、`gap` 或 `width`，布局行为会随之改变。
- `columns` 与 `gap` 是内部布局参数，不会透传到根 `div`。

## A11Y

- `Columns` 只提供布局，不新增列表、网格或区域角色；子内容应自行选择合适的语义元素，例如 `article`、`ul` / `li` 或 `section`。
- 视觉分列后，屏幕阅读器和键盘焦点仍按传入的节点顺序读取。不要把必须按行阅读的表格数据放入 `Columns`。

## Notes

- 项目高度差异较大时，固定轮询分配可能造成某列较长，这是该组件刻意保持简单和可预测的结果。
- 需要在小屏变成单列时，推荐由外层媒体查询覆盖布局，或根据断点在业务层调整 `columns`。
- 大量项目（如数千条）建议先进行虚拟列表或分页；Columns 只负责布局，不负责渲染窗口管理。
