# Alert

`Alert` 用于展示页面内的重要提示、操作结果、风险提醒和可关闭反馈。它是内容型提示，不会自动浮出或定时关闭；需要全局浮层反馈时使用 `Toast` 或 `Notification`。

## Basic

`variant` 决定颜色语义，`title` 与 `description` 适合多数短提示。

<AlertDemo />

## 常见场景

### 图标与操作

通过 `showIcon` 展示内置语义图标区域，`action` 放置重试、查看详情等操作。

<AlertActionDemo />

### 可关闭提示

`closable` 会渲染关闭按钮；受控场景使用 `open` 和 `onOpenChange`。

<AlertClosableDemo />

## Usage

```tsx
import { Alert, Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Alert
      showIcon
      variant="warning"
      title="额度即将用尽"
      description="当前批次剩余额度不足 10%，建议及时补充。"
      action={<Button size="sm">查看明细</Button>}
    />
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 提示类型 | `"info" \| "success" \| "warning" \| "error"` | `"info"` |
| `title` | 标题内容 | `React.ReactNode` | - |
| `description` | 描述内容；存在时优先于 `children` 展示 | `React.ReactNode` | - |
| `children` | 自定义正文内容 | `React.ReactNode` | - |
| `showIcon` | 是否展示图标区域 | `boolean` | `Boolean(icon)` |
| `icon` | 自定义图标内容 | `React.ReactNode` | - |
| `action` | 右下或正文后的操作区域 | `React.ReactNode` | - |
| `closable` | 是否展示关闭按钮 | `boolean` | `false` |
| `open` | 受控显示状态 | `boolean` | - |
| `onOpenChange` | 显示状态变化回调 | `(open: boolean) => void` | - |
| `onClose` | 点击关闭后的回调 | `() => void` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |

其余属性继承原生 `div` 属性。

## 行为规则 / 优先级

- `description` 存在时会作为正文显示；否则显示 `children`。
- `open` 传入时组件由外部控制；未传入时关闭按钮会更新内部状态。
- 点击关闭按钮会依次触发内部关闭、`onOpenChange(false)` 和 `onClose()`。
- `role` 默认随类型变化：`warning`、`error` 为 `alert`，其他类型为 `status`；可通过原生 `role` 覆盖。

## Notes

- `Alert` 适合保留在页面布局中，不适合替代确认弹窗。
- `action` 中的按钮应保持简短，复杂操作建议链接到详情页或打开 Drawer。
- 长文本提示建议使用 `children` 自定义段落结构。
