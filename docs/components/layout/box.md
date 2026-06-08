# Box

`Box` 是基础容器组件，支持多态 `component`、`sx`、`rounded`、`shadow`，以及元素范围内的 `loading/modal` 遮罩层。

## Basic

<BoxBasicDemo />

## Polymorphic Component

通过 `component` 可以让 `Box` 渲染为不同语义标签（例如 `section`、`button`）。

<BoxPolymorphicDemo />

## Rounded + Shadow

`Box` 支持 `rounded` 与 `shadow` 预设，也支持自由 CSS 值。

<BoxRoundedShadowDemo />

## Loading + Modal

`loading` 与 `modal` 都是元素范围内遮罩，不是全屏。

<BoxOverlayDemo />

## Long Press

`onLongPress` 与 `longPressDelay` 可用于长按交互（鼠标按住或触摸按住）：

<BoxLongPressDemo />

## 常见场景

### 基础布局

用于组织页面结构、控制间距、对齐和响应式布局。

### 组合嵌套

复杂页面推荐拆成多个 Box 组合，避免在单个容器中堆叠过多职责。

### 响应式适配

可通过尺寸、间距、`className` 或 `sx` 处理不同屏幕下的布局变化。

## Usage

```tsx
import { Box } from "@ldkj/web-ui";

export function Example() {
  return (
    <Box
      component="section"
      rounded="xl"
      shadow="lg"
      className="border p-4"
      loading={false}
      modal={false}
      sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}
    >
      Content
    </Box>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `component` | 渲染标签或组件 | `React.ElementType` | `"div"` |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `rounded` | 圆角 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | - |
| `shadow` | 阴影 | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'inner' \| string` | - |
| `onLongPress` | 长按触发回调 | `() => void` | - |
| `longPressDelay` | 长按触发延时（毫秒） | `number` | `500` |
| `loading` | 是否显示 loading 遮罩 | `boolean` | `false` |
| `loadingContent` | 自定义 loading 内容 | `React.ReactNode` | 内置 spinner |
| `modal` | 是否显示元素级 modal | `boolean` | `false` |
| `modalContent` | modal 内容节点 | `React.ReactNode` | - |
| `onModalMaskClick` | 点击 modal 遮罩回调 | `MouseEventHandler<HTMLDivElement>` | - |
| `children` | 内容 | `React.ReactNode` | - |
| `...rest` | 原生属性透传（含 `aria-*`/`data-*`/事件） | `React.ComponentPropsWithoutRef<T>` | - |

> 事件优先级：当你显式传入 `onMouseDown`、`onMouseUp`、`onMouseLeave`、`onTouchStart`、`onTouchEnd` 时，会覆盖 `onLongPress` 自动注入的对应处理器。

## 行为规则 / 优先级

- 布局组件只处理结构、尺寸和对齐，不承载业务状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Box 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 布局层尽量保持语义清晰，避免把业务点击行为隐藏在纯布局组件里。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
