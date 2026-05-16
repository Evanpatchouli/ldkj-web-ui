# Badge

`Badge` 用于给目标元素叠加状态信息，典型场景包括未读消息数、告警点、活动标记、功能状态标识。

## 何时使用

- 需要在按钮、头像、入口卡片上叠加数量提示。
- 需要用小红点表达“有更新/需关注”。
- 需要用紧凑标签表达状态（如 `NEW`、`HOT`、`BETA`）。

## 快速开始

<BadgeBasicDemo />

## 计数模式（数字、上限、零值）

<BadgeCountDemo />

说明：

- 当 `badgeContent` 为数字且大于 `max` 时，显示为 `max+`。
- 默认 `badgeContent={0}` 不显示，设置 `showZero` 后会显示 `0`。

## 红点、填充与轻量风格

<BadgeDotVariantDemo />

说明：

- `variant` 默认使用填充风格（`neutral / primary / success / warning / danger`）。
- 设置 `light={true}` 可切换为轻量风格。
- 当 `dot={true}` 时会忽略 `light`，始终使用填充风格（因为无文本内容，需要主色作为底色）。

## 与不同宿主元素组合

<BadgeLayoutDemo />

说明：

- `Badge` 对子元素类型没有限制，可以包裹按钮、头像、卡片入口等。
- 可通过 `sx`、`className` 调整角标视觉。

## 用法示例

```tsx
import { Badge, Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Badge badgeContent={23} max={99} variant="danger">
      <Button size="sm">收件箱</Button>
    </Badge>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `badgeContent` | 角标内容（数字/文本） | `React.ReactNode` | - |
| `dot` | 是否显示红点模式 | `boolean` | `false` |
| `light` | 是否使用轻量风格（dot 模式忽略） | `boolean` | `false` |
| `showZero` | 数字为 `0` 时是否展示 | `boolean` | `false` |
| `max` | 计数上限，超过显示 `max+` | `number` | `99` |
| `variant` | 语义色风格（默认填充） | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` |
| `sx` | 样式扩展入口 | `SxProps` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 兼容旧写法的类名字段 | `string` | - |
| `children` | 宿主元素内容 | `React.ReactNode` | - |

## 注意事项

- `Badge` 采用绝对定位叠加，建议宿主元素本身有明确尺寸。
- 长文本角标（如 `LONG-TEXT`）会挤压布局，建议控制在短标签范围。
- 如果你只需要“是否有更新”，优先使用 `dot`，视觉更轻。