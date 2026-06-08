# Tooltip

用于在悬停、聚焦触发元素时展示简短说明。底层基于 Radix Tooltip，保留组合式 API，并补充本库的 `className`、`class`、`style`、`sx` 样式入口。

## Basic

<TooltipBasicDemo />

## Placement

通过 `side` 和 `align` 控制提示内容位置。

<TooltipPlacementDemo />

## Provider Delay

`TooltipProvider` 可统一配置子树内 Tooltip 的打开延迟，默认 `delayDuration=0`（即悬停立即触发）。

<TooltipProviderDelayDemo />

## Tone / SX

`TooltipContent` 支持 `tone` 快速切换视觉语气，也可以通过 `sx` 做精细样式控制。

<TooltipToneSxDemo />

## 常见场景

### 基础反馈

用于按钮点击、异步流程或页面局部状态变化时给出明确反馈。

### 受控交互

打开、关闭、显示或隐藏等状态应由业务侧控制，组件负责渲染与回调。

### 样式与内容扩展

复杂内容通过 `children` 或插槽类 props 组合，视觉细节通过样式入口覆盖。

## Usage

```tsx
import { Tooltip } from "@ldkj/web-ui";

export function Example() {
  return <Tooltip />;
}
```

## API

### 导出项

| 名称 | 说明 |
| --- | --- |
| `TooltipProvider` | Radix Tooltip Provider，用于统一配置延迟 |
| `Tooltip` | Radix Tooltip Root，单个 Tooltip 实例根节点 |
| `TooltipTrigger` | 触发元素，支持 `asChild`，子组件无需 `forwardRef` |
| `TooltipContent` | 提示内容，支持本库样式能力与 `tone/arrow` |
| `TooltipPortal` | Portal 容器 |
| `TooltipArrow` | 箭头组件 |

### TooltipProvider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `delayDuration` | 打开延迟（毫秒） | `number` | `0` |
| `skipDelayDuration` | 在连续触发场景下跳过延迟的窗口时长（毫秒） | `number` | Radix 默认值 |

其余属性继承 Radix `Tooltip.Provider`。

### Tooltip Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` | 受控开关状态 | `boolean` | - |
| `defaultOpen` | 非受控默认开关状态 | `boolean` | - |
| `onOpenChange` | 开关状态变化回调 | `(open: boolean) => void` | - |

其余属性继承 Radix `Tooltip.Root`。

### TooltipContent Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tone` | 视觉语气 | `'dark' \| 'light' \| 'primary'` | `'dark'` |
| `arrow` | 是否显示箭头 | `boolean` | `false` |
| `sideOffset` | 与触发元素的间距 | `number` | `6` |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容历史 class 写法 | `string` | - |
| `style` | 原生行内样式 | `CSSProperties` | - |
| `sx` | 本库 sx 样式入口，支持对象、数组、函数与选择器 | `SxProps` | - |

其余属性继承 Radix `Tooltip.Content`。

### TooltipTrigger / TooltipArrow Props

`TooltipTrigger` 与 `TooltipArrow` 同样支持 `className`、`class`、`style`、`sx`。其余属性分别继承 Radix `Tooltip.Trigger` 与 `Tooltip.Arrow`。

`TooltipTrigger` 额外支持：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `asChildWrapper` | `asChild=true` 时用于包裹 `children` 的元素或组件 | `React.ElementType` | `'span'` |

`TooltipArrow` 额外支持：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tone` | 箭头颜色语气 | `'dark' \| 'light' \| 'primary'` | `'dark'` |

## 行为规则 / 优先级

- 交互组件触发回调后，最终状态以业务侧传回的受控值为准。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Tooltip 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `arrow` 默认为 `false`，需要箭头时在 `TooltipContent` 上显式开启。
- 推荐使用 `TooltipProvider` 在应用或页面局部统一配置 `delayDuration`；不传时默认立即触发。
- `TooltipTrigger` 使用 `asChild` 时，本库会渲染一层触发容器承接 Radix 的 ref 和事件，默认是 `span`，可通过 `asChildWrapper` 覆盖。
- Tooltip 内容应保持简短；复杂交互内容更适合使用 Popover。
