# Box

`Box` 是基础容器组件，支持多态 `component`、`sx`、以及元素范围内的 `loading/modal` 遮罩层。

## Basic

<BoxBasicDemo />

## Polymorphic Component

通过 `component` 可以让 `Box` 渲染为不同语义标签（例如 `section`、`button`）。

<BoxPolymorphicDemo />

## Loading + Modal

`loading` 与 `modal` 都是元素范围内遮罩，不是全屏。

<BoxOverlayDemo />

## Usage

```tsx
import { Box } from "@ldkj/web-ui";

export function Example() {
  return (
    <Box
      component="section"
      className="rounded-lg border p-4"
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
| `loading` | 是否显示 loading 遮罩 | `boolean` | `false` |
| `loadingContent` | 自定义 loading 内容 | `React.ReactNode` | 内置 spinner |
| `modal` | 是否显示元素级 modal | `boolean` | `false` |
| `modalContent` | modal 内容节点 | `React.ReactNode` | - |
| `onModalMaskClick` | 点击 modal 遮罩回调 | `MouseEventHandler<HTMLDivElement>` | - |
| `children` | 内容 | `React.ReactNode` | - |
| `...rest` | 原生属性透传（含 `aria-*`/`data-*`/事件） | `React.ComponentPropsWithoutRef<T>` | - |
