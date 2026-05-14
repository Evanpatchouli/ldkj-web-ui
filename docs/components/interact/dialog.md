# Dialog

Dialog 用于承载需要用户聚焦处理的短流程。当前实现基于本库 `Modal` 内核，保留原有组合式 API，并接入本库的 `className`、`class`、`style`、`sx` 样式能力。

## Basic

<DialogBasicDemo />

## Controlled

`Dialog` 支持 `open` 与 `onOpenChange`，适合由表单状态、异步提交结果或路由状态控制开合。

<DialogControlledDemo />

## Custom Layout / SX

`DialogContent` 可以通过 `showClose={false}` 隐藏默认关闭按钮，也可以使用 `overlayClassName`、`overlaySx`、`overlayBlur` 单独调整遮罩层。

<DialogCustomLayoutDemo />

## Usage

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger>打开</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认操作</DialogTitle>
          <DialogDescription>请确认当前操作是否继续。</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>取消</DialogClose>
          <button type="button">确认</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

也可以使用静态子组件写法：

```tsx
<Dialog>
  <Dialog.Trigger>打开</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>标题</Dialog.Title>
  </Dialog.Content>
</Dialog>
```

## API

### Components

| 组件 | 说明 |
| --- | --- |
| `Dialog` | 根组件，支持 `open`、`defaultOpen`、`onOpenChange`、`modal`、`lockScroll`、`destroyOnClose`、`closeOnMaskClick`。 |
| `DialogTrigger` / `Dialog.Trigger` | 触发器。 |
| `DialogPortal` / `Dialog.Portal` | Portal 容器。 |
| `DialogClose` / `Dialog.Close` | 关闭控件。 |
| `DialogOverlay` / `Dialog.Overlay` | 遮罩层，支持本库样式能力。 |
| `DialogContent` / `Dialog.Content` | 弹窗内容，会自动渲染遮罩和可选关闭按钮。 |
| `DialogHeader` / `Dialog.Header` | 标题区域布局辅助组件。 |
| `DialogFooter` / `Dialog.Footer` | 操作区布局辅助组件。 |
| `DialogTitle` / `Dialog.Title` | 可访问标题。 |
| `DialogDescription` / `Dialog.Description` | 可访问描述。 |

### Dialog Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` | 受控开关状态 | `boolean` | - |
| `defaultOpen` | 非受控默认开关状态 | `boolean` | - |
| `onOpenChange` | 开关状态变化回调 | `(open: boolean) => void` | - |
| `modal` | 是否启用模态交互语义 | `boolean` | `true` |
| `lockScroll` | 打开时是否锁定页面滚动；`false` 时会强制 `modal=false` | `boolean` | `true` |

其余属性继承当前组件根级约定。

### Styling Props

以下可渲染 DOM 的组件支持 `className`、`class`、`style`、`sx`：

- `DialogTrigger`
- `DialogClose`
- `DialogOverlay`
- `DialogContent`
- `DialogHeader`
- `DialogFooter`
- `DialogTitle`
- `DialogDescription`

### DialogContent Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showClose` | 是否显示内置关闭按钮 | `boolean` | `true` |
| `overlayClassName` | 传给自动生成遮罩层的类名 | `string` | - |
| `overlaySx` | 传给自动生成遮罩层的 `sx` 样式 | `SxProps` | - |
| `overlayBlur` | 自动生成遮罩层是否启用默认模糊 | `boolean` | `true` |
| `className` | 内容容器类名 | `string` | - |
| `class` | 内容容器类名别名 | `string` | - |
| `style` | 内容容器行内样式 | `CSSProperties` | - |
| `sx` | 内容容器本库样式对象 | `SxProps` | - |

`DialogContent` 支持 `onOpenAutoFocus`、`onCloseAutoFocus`、`onEscapeKeyDown`、`onPointerDownOutside` 等行为控制属性。

### DialogOverlay Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `blur` | 是否启用默认遮罩模糊 | `boolean` | `true` |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容历史 class 写法 | `string` | - |
| `style` | 原生行内样式 | `CSSProperties` | - |
| `sx` | 本库 sx 样式入口 | `SxProps` | - |

其余属性继承原生 `div` 属性。

### Trigger / Close / Header / Footer / Title / Description Props

| 组件 | 扩展属性 |
| --- | --- |
| `DialogTrigger` | `className`、`class`、`style`、`sx`、`asChild`、`asChildWrapper` |
| `DialogClose` | `className`、`class`、`style`、`sx`、`asChild`、`asChildWrapper` |
| `DialogHeader` | `class`、`sx`（其余继承原生 `div` 属性） |
| `DialogFooter` | `class`、`sx`（其余继承原生 `div` 属性） |
| `DialogTitle` | `className`、`class`、`style`、`sx`（其余继承原生 `h2` 属性） |
| `DialogDescription` | `className`、`class`、`style`、`sx`（其余继承原生 `p` 属性） |

## Notes

- 推荐始终提供 `DialogTitle`；如果视觉上不需要标题，也应使用可访问隐藏样式保留语义。
- `DialogTitle` 与 `DialogDescription` 会重置标题/段落的默认排版样式，避免文档站或富文本容器的全局 `h2`、`p` 样式影响弹窗布局。
- 内置关闭按钮使用 `aria-label="关闭弹窗"`，并会在 `showClose={false}` 时完全不渲染。
- 自定义关闭按钮请使用 `DialogClose`，以保留统一关闭语义。
- `DialogContent` 默认自动生成遮罩层；需要自定义结构时可以组合 `DialogPortal`、`DialogOverlay` 与 `DialogContent`。
- `lockScroll={false}` 时页面可滚动；若同时 `closeOnMaskClick=true`，点击遮罩会触发关闭回调链路。
