# Card

`Card` 是基于 [Box](/components/layout/box) 的区域化内容容器，适合承载信息块、详情区和轻量操作区。

## Basic

<CardBasicDemo />

## Variant

`variant` 用于控制卡片在页面里的视觉层级。

<CardVariantDemo />

## Slots

`Card` 支持 `header`、`footer`、`left/right`、`start/end`（比 `left/right` 更规范的国际化用法） 与默认内容区。

<CardSlotsDemo />

## State

`hoverable`、`selected`、`disabled` 适合可点击卡片、选择卡片和禁用态。

<CardStateDemo />

## Loading

`loading` 作用于整张卡片，`contentLoading` 只作用于内容区。

<CardLoadingDemo />

## Compound API

复杂结构可以使用 `Card.Header`、`Card.Content`、`Card.Footer` 等组合式写法。

<CardCompoundDemo />

## Usage

```tsx
import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <Card
      variant="outlined"
      padding="md"
      divided
      hoverable
      header={<div>标题</div>}
      footer={<button>操作</button>}
      rounded="lg"
      shadow="sm"
    >
      内容
    </Card>
  );
}
```

## API

`Card` 继承 [Box](/components/layout/box) 的基础能力，支持 `component`、`rounded`、`shadow`、`loading`、`modal`、`sx` 以及原生属性透传。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 视觉变体 | `'outlined' \| 'elevated' \| 'filled' \| 'ghost'` | `'outlined'` |
| `padding` | 区域内边距 | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| `divided` | 区域分割线 | `boolean \| 'x' \| 'y'` | `true` |
| `hoverable` | 是否启用 hover 反馈 | `boolean` | `false` |
| `selected` | 是否选中 | `boolean` | `false` |
| `disabled` | 是否禁用交互 | `boolean` | `false` |
| `header` | 头部区域 | `React.ReactNode` | - |
| `footer` | 底部区域 | `React.ReactNode` | - |
| `left` | 左侧区域 | `React.ReactNode` | - |
| `right` | 右侧区域 | `React.ReactNode` | - |
| `start` | 起始侧区域，作为 `left` 的语义别名 | `React.ReactNode` | - |
| `end` | 结束侧区域，作为 `right` 的语义别名 | `React.ReactNode` | - |
| `contentLoading` | 内容区 loading | `boolean` | `false` |
| `headerProps` | 头部区域 Box 属性 | `CardSlotProps` | - |
| `footerProps` | 底部区域 Box 属性 | `CardSlotProps` | - |
| `leftProps` | 左侧区域 Box 属性 | `CardSlotProps` | - |
| `rightProps` | 右侧区域 Box 属性 | `CardSlotProps` | - |
| `startProps` | 起始侧区域 Box 属性 | `CardSlotProps` | - |
| `endProps` | 结束侧区域 Box 属性 | `CardSlotProps` | - |
| `contentProps` | 内容区域 Box 属性 | `CardSlotProps` | - |
| `children` | 内容区节点，或 compound 子组件 | `React.ReactNode` | - |

## Compound API

| 子组件 | 说明 |
| --- | --- |
| `Card.Header` | 头部区域 |
| `Card.Content` | 内容区域 |
| `Card.Footer` | 底部区域 |
| `Card.Left` | 左侧区域 |
| `Card.Right` | 右侧区域 |
| `Card.Start` | 起始侧区域 |
| `Card.End` | 结束侧区域 |
