# Notification

页面级通知卡片，用于承载标题、描述、操作按钮和较长的业务反馈。它与 `Toast` 的区别是：`Toast` 是轻量吐司条，`Notification` 是默认出现在网页右上角的卡片通知。

## Basic

<NotificationBasicDemo />

## 常见场景

### 位置

支持右上、右下、左上、左下和中央展示。默认位置是 `rightTop`。

<NotificationPlacementDemo />

### 操作区

通知可以携带 `actions`，适合审批、任务提醒、告警确认等需要用户继续处理的场景。`duration: 0` 表示不会自动关闭。

<NotificationActionsDemo />

### 自定义偏移

`offset` 用于避开固定 Header、侧边栏或底部工具条。数字会同时作用到四边，对象写法可以单独指定某一侧。

<NotificationOffsetDemo />

## Usage

```tsx
import {
  Button,
  NotificationProvider,
  notification,
  useNotification,
} from "@ldkj/web-ui";

function Actions() {
  const api = useNotification();

  return (
    <>
      <Button
        onClick={() =>
          api.success({
            message: "保存成功",
            description: "客户资料已同步到最新版本。",
          })
        }
      >
        useNotification
      </Button>
      <Button
        onClick={() =>
          notification.warn({
            message: "额度接近上限",
            description: "建议检查当前套餐余量。",
            placement: "rightTop",
            offset: { top: 80, right: 24 },
          })
        }
      >
        static notification
      </Button>
    </>
  );
}

export function Example() {
  return (
    <NotificationProvider placement="rightTop" queueLimit={5}>
      <Actions />
    </NotificationProvider>
  );
}
```

## API

### NotificationProvider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `placement` | 默认通知位置 | `'rightTop' \| 'rightBottom' \| 'leftTop' \| 'leftBottom' \| 'center'` | `'rightTop'` |
| `duration` | 默认停留时长，`0` 表示不自动关闭 | `number` | `4500` |
| `queueLimit` | 同一位置与偏移下的队列上限 | `number` | `5` |
| `offset` | 默认位置偏移 | `number \| { top?: number; right?: number; bottom?: number; left?: number }` | `24` |
| `closable` | 默认是否显示关闭按钮 | `boolean` | `true` |

### useNotification

`useNotification()` 返回：

- `open(options)`
- `info(options | message)`
- `success(options | message)`
- `warn(options | message)`
- `error(options | message)`
- `dismiss(id)`
- `clear()`

`options` 类型：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 自定义 notification id | `string` | 自动生成 |
| `message` | 通知标题 | `ReactNode` | - |
| `description` | 描述文本或节点 | `ReactNode` | - |
| `content` | 自定义正文区域 | `ReactNode` | - |
| `actions` | 操作区内容 | `ReactNode` | - |
| `duration` | 当前通知停留时长，`0` 表示不自动关闭 | `number` | 继承 Provider |
| `placement` | 当前通知位置 | 同 `NotificationProvider.placement` | 继承 Provider |
| `offset` | 当前通知位置偏移 | 同 `NotificationProvider.offset` | 继承 Provider |
| `closable` | 是否显示关闭按钮 | `boolean` | 继承 Provider |
| `icon` | 自定义图标（名称或 `{ svg/src }`） | `string \| { svg?: Component; src?: string }` | 按状态使用内置图标 |
| `iconColor` | 自定义图标颜色 | `string` | 按状态使用内置颜色 |
| `onClose` | 关闭后的回调 | `() => void` | - |

### static notification

- `notification.open(options)`
- `notification.info/success/warn/error(options | message)`
- `notification.dismiss(id)`
- `notification.clear()`
- `notification.config({ placement, duration, closable, offset })`
- `notification.resetConfig()`

使用静态 `notification` 前，请先在应用根节点挂载 `NotificationProvider`。

## 行为规则 / 优先级

- 快捷方法支持字符串兼容：`notification.success("保存成功")` 等价于 `notification.success({ message: "保存成功" })`。
- 默认展示在 `rightTop`；单条通知的 `placement` 优先于 Provider 默认值。
- `offset` 对象只覆盖传入的方向，未传方向继承 Provider 默认偏移。
- 同一 `placement + offset` 队列超过 `queueLimit` 时，会淘汰最早的通知。
- `duration > 0` 时自动关闭；`duration: 0` 时只允许手动关闭、`dismiss` 或 `clear`。
- 图标优先级：`options.icon` > 状态默认图标。

## Notes

- Notification 适合有标题、描述、操作区或需要较长停留的业务反馈；短文本即时反馈优先使用 Toast。
- `useNotification` 使用最近一层 `NotificationProvider`，静态 `notification` 使用全局 bridge。
- 如果页面存在多层 `NotificationProvider`，建议局部区域只使用 `useNotification`，避免静态 facade 与局部 Provider 分流。
- 中央通知使用 `placement: "center"`，不建议同时堆叠大量持久通知。
