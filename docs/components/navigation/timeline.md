# Timeline

`Timeline` 用于按时间顺序展示事件、审批、物流、发布记录等信息。组件采用 MUI Timeline 的结构模型：`Timeline.Item`、`Timeline.OppositeContent`、`Timeline.Separator`、`Timeline.Dot`、`Timeline.Connector` 和 `Timeline.Content`；同时补充本库常用的 `items` 数据式 API、`sx` 样式入口，以及 `pending` / `reverse` 等状态展示能力。

## Basic

最小可用示例使用 `items` 渲染事件列表。`oppositeContent` 通常放时间、阶段或来源信息，`content` 放主要内容。

<TimelineBasicDemo />

## 常见场景

### 位置与交替排布

`position` 对齐 MUI 命名，支持 `left`、`right`、`alternate` 和 `alternate-reverse`。单个 `item.position` 可覆盖根组件位置。

<TimelinePositionDemo />

### 组合式 API

复杂节点可使用组合式 API，显式控制 Dot、Connector、Content 与 OppositeContent。

<TimelineCustomDemo />

### 处理中与倒序

`pending` 用于追加一个处理中节点；`reverse` 会反转数据式列表顺序，适合“最新在上”的记录流。

<TimelinePendingDemo />

### SX Custom

`sx` 可用于根节点样式，也可以通过 `.timeline-content`、`.timeline-dot` 等内部类定制局部。

<TimelineSxDemo />

## Usage

```tsx
import { Timeline } from "@ldkj/web-ui";

export function Example() {
  return (
    <Timeline
      position="alternate"
      items={[
        {
          oppositeContent: "09:30",
          content: "创建采购申请",
        },
        {
          oppositeContent: "10:15",
          content: "部门负责人审批通过",
          color: "success",
        },
        {
          oppositeContent: "11:40",
          content: "等待财务复核",
          color: "warning",
        },
      ]}
      pending="财务正在处理"
    />
  );
}
```

组合式写法：

```tsx
import { Timeline } from "@ldkj/web-ui";

export function Example() {
  return (
    <Timeline position="right">
      <Timeline.Item>
        <Timeline.OppositeContent>09:30</Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot color="success" />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>审批通过</Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}
```

## API

### Timeline

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 数据式事件配置 | `TimelineItemConfig[]` | - |
| `position` | 内容相对时间轴的位置 | `"left" \| "right" \| "alternate" \| "alternate-reverse"` | `"right"` |
| `size` | 尺寸密度 | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | 默认节点样式 | `"filled" \| "outlined" \| "soft"` | `"filled"` |
| `color` | 默认节点颜色 | `TimelineColor` | `"primary"` |
| `reverse` | 是否反转 `items` 渲染顺序 | `boolean` | `false` |
| `pending` | 追加处理中节点 | `boolean \| React.ReactNode` | `false` |
| `pendingDot` | 自定义处理中节点 Dot | `React.ReactNode` | - |
| `hideLastConnector` | 是否隐藏最后一个连接线 | `boolean` | `true` |
| `renderDot` | 数据式 API 下自定义 Dot | `(item, state) => React.ReactNode` | - |
| `renderItem` | 数据式 API 下自定义整项渲染 | `(item, state, node) => React.ReactNode` | - |
| `className` / `class` | 根节点类名 | `string` | - |
| `style` | 根节点样式 | `React.CSSProperties` | - |
| `sx` | 根节点 `sx` 样式 | `SxProps` | - |
| `...rest` | 原生 `ol` 属性透传 | `React.ComponentPropsWithoutRef<"ol">` | - |

### TimelineItemConfig

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 列表唯一标识 | `React.Key` |
| `oppositeContent` | 轴线另一侧内容，常用于时间或阶段 | `React.ReactNode` |
| `content` / `children` | 主内容 | `React.ReactNode` |
| `dot` | 完整自定义 Dot 节点 | `React.ReactNode` |
| `icon` | Dot 内部图标或文本 | `React.ReactNode` |
| `color` | 覆盖当前节点颜色 | `TimelineColor` |
| `variant` | 覆盖当前节点样式 | `TimelineVariant` |
| `position` | 覆盖当前节点位置 | `"left" \| "right"` |
| `loading` | 当前节点 Dot 显示加载态 | `boolean` |
| `disabled` | 降低当前节点可用性视觉 | `boolean` |
| `hideConnector` | 隐藏当前节点连接线 | `boolean` |
| `itemProps` | 透传给 `Timeline.Item` | `TimelineItemProps` |
| `dotProps` | 透传给 `Timeline.Dot` | `TimelineDotProps` |
| `connectorProps` | 透传给 `Timeline.Connector` | `TimelineConnectorProps` |
| `contentProps` | 透传给 `Timeline.Content` | `TimelineContentProps` |
| `oppositeContentProps` | 透传给 `Timeline.OppositeContent` | `TimelineOppositeContentProps` |
| `separatorProps` | 透传给 `Timeline.Separator` | `TimelineSeparatorProps` |

### Compound API

| 子组件 | 说明 |
| --- | --- |
| `Timeline.Item` | 单个事件容器，渲染为 `li` |
| `Timeline.OppositeContent` | 时间轴另一侧内容 |
| `Timeline.Separator` | Dot 与 Connector 的容器 |
| `Timeline.Dot` | 时间节点，支持 `color`、`variant`、`loading` |
| `Timeline.Connector` | 节点之间的连接线 |
| `Timeline.Content` | 主内容区域 |

## 行为规则 / 优先级

1. `items` 存在时优先使用数据式渲染；否则渲染 `children` 组合式内容。
2. `item.position` 优先级高于根组件 `position`。
3. `item.color` / `item.variant` 优先级高于根组件 `color` / `variant`。
4. `renderDot` 优先级高于 `item.dot`、`item.icon` 和默认 Dot。
5. `hideConnector` 优先级高于 `hideLastConnector`。
6. `pending` 只影响 `items` 数据式渲染，会追加一个加载态节点；`reverse` 会连同 pending 节点一起反转。

## A11Y

- 根节点使用 `ol`，事件项使用 `li`，默认 `aria-label="时间线"`。
- `Timeline.Dot` 默认是装饰性元素；如果 Dot 内部传入有语义的图标或文本，应由业务侧补充可理解的文本内容。
- 时间、阶段、来源等辅助信息建议放在 `oppositeContent`，不要只依赖颜色表达状态。

## Notes

- `Timeline` 只负责事件展示，不内置展开、筛选、分页或流程推进逻辑。
- 需要流程状态控制、可点击步骤或线性跳转时优先使用 [Stepper](/components/navigation/stepper)。
- 长文本建议保持 `position="right"`；交替布局更适合短标题、短描述的时间轴。
- 自定义颜色可以传 CSS 颜色值或 CSS 变量，例如 `color="var(--ldkj-color-secondary)"`。
