# RacingChips

`RacingChips` 用多轨道循环动画展示任意 Chip 内容，适合营销落地页的领取动态、交易播报、库存变化或实时业务状态。组件只负责布局和运动，不生成手机号等业务数据。

## Basic

传入 React 可渲染内容数组即可使用。普通数组项会按照索引自动分配轨道、延迟和速度。

<RacingChipsBasicDemo />

## 常见场景

### 营销页脱敏手机号播报

手机号数据应由调用方准备；组件不会随机生成或持有用户信息。生产环境建议使用后端返回的合规脱敏数据，示例中的号码均为虚构内容。

<RacingChipsPhoneDemo />

### 自定义业务内容与运动参数

对象项可单独设置 `lane`、`delay`、`duration`。`content` 支持任意 ReactNode，并可通过 `itemStyle` / `itemClassName` 统一定制通知外观。

<RacingChipsCustomDemo />

## Usage

```tsx
import { RacingChips, type RacingChipsItem } from "@ldkj/web-ui";

const items: RacingChipsItem[] = [
  { key: "approved", content: "申请已通过", lane: 0 },
  { key: "delivered", content: "权益已到账", lane: 1, delay: 1.5 },
];

export function Example() {
  return (
    <RacingChips
      items={items}
      laneCount={2}
      laneGap={32}
      duration={7}
      delayStep={1.2}
      style={{ height: 72 }}
    />
  );
}
```

## API

### RacingChipsProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | Chip 内容；支持普通 ReactNode 或对象项 | `Array<ReactNode \| RacingChipsItem>` | 必填 |
| `laneCount` | 自动分配时使用的轨道数 | `number` | `3` |
| `laneGap` | 相邻轨道的垂直间距（px） | `number` | `28` |
| `duration` | 单次横穿容器的时长（秒） | `number` | `6` |
| `delayStep` | 相邻数组项的默认错峰时间（秒） | `number` | `1.2` |
| `direction` | 运动方向 | `'left' \| 'right'` | `'left'` |
| `paused` | 暂停并保留当前动画进度 | `boolean` | `false` |
| `itemClassName` | 追加到每个通知项的类名 | `string` | - |
| `itemStyle` | 追加到每个通知项的内联样式 | `CSSProperties` | - |
| `sx` | 容器 SX 样式 | `SxProps` | - |
| `className` / `class` | 容器追加类名 | `string` | - |
| `style` | 容器原生内联样式，常用于设置高度和定位 | `CSSProperties` | - |
| `aria-label` | 为非装饰性通知组提供可访问名称 | `string` | - |

### RacingChipsItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | 稳定的 React key | `React.Key` | 数组索引 |
| `content` | 通知内容 | `ReactNode` | 必填 |
| `lane` | 指定零起始轨道索引 | `number` | `index % laneCount` |
| `delay` | 覆盖 CSS 动画延迟（秒，可为负数） | `number` | `-(index * delayStep)` |
| `duration` | 覆盖单次横穿时长（秒） | `number` | 根组件 `duration` |

## 行为规则 / 优先级

1. 对象项的 `lane`、`delay`、`duration` 优先于根组件默认值。
2. 未指定 `lane` 时按 `index % laneCount` 循环分配；`laneCount` 小于 `1` 时按 `1` 处理。
3. 自动错峰使用负动画延迟，使页面首次渲染时已有 Chip 分布在轨道中；显式 `delay` 按 CSS 动画延迟处理，正值表示等待，负值表示从周期中途开始。
4. `itemStyle` 统一作用于所有通知项；需要逐项差异化内容时在 `content` 内组合元素，运动差异使用对象项字段。
5. `paused` 仅暂停动画，不重置当前进度；再次设为 `false` 后从原位置继续。
6. 运动距离基于 `RacingChips` 自身宽度，不依赖视口宽度，因此可嵌入局部容器。

## A11Y

- 默认将整组内容视为装饰并设置 `aria-hidden="true"`，避免循环内容被读屏反复朗读。
- 传入 `aria-label` 后，组件默认以 `role="list"` 暴露，每个通知项使用 `role="listitem"`。只有内容确实需要辅助技术读取时才这样做。
- 不要把必须及时获知的错误、支付结果或安全告警仅放在滚动区域中；应同时提供稳定的静态文本或状态区域。
- 系统启用“减少动态效果”时，组件自动停止运动并以静态换行列表展示。

## Notes

- 默认高度为 `88px`。调整 `laneCount`、`laneGap` 或通知项高度后，应同步通过 `style.height` 或 `sx` 设置足够的容器高度。
- 建议通知文案保持简短，长内容会增加单项宽度并降低信息出现频率。
- 大量通知会持续占用合成层资源；通常保持 4～12 项即可形成连续视觉，页面不可见时可用 `paused` 停止动画。
- 组件通过 `container-type` 与容器查询单位计算移动距离，面向现代浏览器环境。
- 手机号、订单号等敏感标识必须在传入前完成脱敏，组件不会自动处理数据合规。
