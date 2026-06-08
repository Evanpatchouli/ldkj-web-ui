# Drawer

`Drawer` 是受控抽屉容器，用于侧边筛选、详情编辑、轻量表单和不离开当前页面的上下文任务。组件默认带遮罩、ESC 关闭、页面滚动锁和丝滑滑入动画。

## Basic

最小用法需要外部维护 `open`，并在 `onOpenChange` 中同步状态。

<DrawerDemo />

## 常见场景

### 打开方向

通过 `placement` 控制从左、右、上、下打开；左右方向使用 `width`，上下方向使用 `height`。

<DrawerPlacementDemo />

### 动画与滚动策略

`animated` 控制是否启用滑入/退出动画，`animationDuration` 控制时长；`lockScroll` 控制打开期间是否锁定页面滚动。

<DrawerBehaviorDemo />

## Usage

```tsx
import * as React from "react";
import { Button, Drawer } from "@ldkj/web-ui";

export function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="筛选条件"
        animated
        lockScroll
        footer={<Button size="sm">应用筛选</Button>}
      >
        筛选表单内容
      </Drawer>
    </>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` | 是否打开 | `boolean` | 必填 |
| `onOpenChange` | 打开状态变化回调 | `(open: boolean) => void` | - |
| `title` | 标题内容 | `React.ReactNode` | - |
| `children` | 主体内容 | `React.ReactNode` | - |
| `footer` | 底部固定区域 | `React.ReactNode` | - |
| `placement` | 打开方向 | `"left" \| "right" \| "top" \| "bottom"` | `"right"` |
| `width` | 左右抽屉宽度 | `number \| string` | `360` |
| `height` | 上下抽屉高度 | `number \| string` | `320` |
| `animated` | 是否启用滑入/退出动画 | `boolean` | `true` |
| `animationDuration` | 动画时长，单位 ms | `number` | `220` |
| `lockScroll` | 打开期间是否锁定页面滚动 | `boolean` | `true` |
| `maskClosable` | 点击遮罩是否关闭 | `boolean` | `true` |
| `closeOnEsc` | 按 ESC 是否关闭 | `boolean` | `true` |
| `destroyOnClose` | 关闭后是否卸载内容 | `boolean` | `true` |
| `className` | 面板自定义类名 | `string` | - |
| `class` | 面板类名别名 | `string` | - |
| `overlayClassName` | 遮罩自定义类名 | `string` | - |
| `bodyClassName` | 内容区自定义类名 | `string` | - |

其余属性继承原生 `div` 属性，作用于抽屉面板。

## 行为规则 / 优先级

- `Drawer` 是受控组件，遮罩、关闭按钮和 ESC 只调用 `onOpenChange(false)`。
- `animated=true` 时关闭后会保留节点到动画结束，再根据 `destroyOnClose` 决定是否卸载。
- `animated=false` 时打开和关闭立即生效，适合自动化测试或宿主环境不希望保留过渡的场景。
- `lockScroll=true` 会在打开期间设置 `document.body.style.overflow="hidden"`，多个 Drawer 同时打开时按计数恢复。
- 有 `title` 时会自动渲染关闭按钮；无 `title` 时需要在内容中提供关闭入口。

## Notes

- 右侧筛选和详情推荐使用默认 `placement="right"`；移动端底部任务面板可使用 `placement="bottom"`。
- 抽屉内容区默认 `overflow-auto`，长表单应把提交按钮放入 `footer`，避免跟随内容滚走。
- `aria-modal="true"` 与 `role="dialog"` 会自动设置；业务上建议提供文本 `title` 作为可访问名称。
