# Modal

`Modal` 是全屏遮罩容器，适合承载轻量对话内容、确认框、临时操作面板等场景。

组件来源于 `evp-modal`，已改造成当前 UI 库统一规范，支持 `className`、`class`、`style`、`sx` 与内容区独立样式能力。

## Basic

<ModalBasicDemo />

## Position / Blur

可通过 `x/y/translateX/translateY` 控制内容定位，并通过 `alpha/blur` 调整遮罩视觉。

<ModalPositionBlurDemo />

## Mask / Destroy

`closeOnMaskClick` 默认 `false`；`destroyOnClose` 控制关闭后是否卸载 DOM。

<ModalMaskDestroyDemo />

## 常见场景

### 基础反馈

用于按钮点击、异步流程或页面局部状态变化时给出明确反馈。

### 受控交互

打开、关闭、显示或隐藏等状态应由业务侧控制，组件负责渲染与回调。

### 样式与内容扩展

复杂内容通过 `children` 或插槽类 props 组合，视觉细节通过样式入口覆盖。

## Usage

```tsx
import { Modal } from "@ldkj/web-ui";

export function Example() {
  return (
    <Modal
      open
      closeOnMaskClick={false}
      destroyOnClose={false}
      blur
      alpha={0.5}
    >
      <div className="rounded-lg bg-white p-5">内容区</div>
    </Modal>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `open` | 是否打开 | `boolean` | `false` |
| `destroyOnClose` | 关闭时是否销毁节点 | `boolean` | `false` |
| `closeOnMaskClick` | 点击遮罩是否触发关闭回调 | `boolean` | `false` |
| `scrollable` | 打开时是否允许页面滚动 | `boolean` | `false` |
| `alpha` | 遮罩透明度（0-1） | `number` | `0.5` |
| `blur` | 遮罩模糊 | `boolean \| number \| string` | - |
| `x` | 内容区 left 值 | `string` | `"50%"` |
| `y` | 内容区 top 值 | `string` | `"50%"` |
| `translateX` | 内容区 translateX | `string` | `"-50%"` |
| `translateY` | 内容区 translateY | `string` | `"-50%"` |
| `onOpen` | 打开回调（`open` 变化后触发） | `() => void` | - |
| `onClose` | 关闭回调（`open` 变化后触发） | `() => void` | - |
| `className` | 遮罩层自定义类名 | `string` | - |
| `class` | 遮罩层类名别名 | `string` | - |
| `style` | 遮罩层原生样式 | `React.CSSProperties` | - |
| `sx` | 遮罩层 `sx` 样式入口 | `SxProps` | - |
| `contentClassName` | 内容区自定义类名 | `string` | - |
| `contentClass` | 内容区类名别名 | `string` | - |
| `contentStyle` | 内容区原生样式 | `React.CSSProperties` | - |
| `contentSx` | 内容区 `sx` 样式入口 | `SxProps` | - |

其余属性继承原生 `div` 属性（作用于遮罩层根节点）。

## 行为规则 / 优先级

- 交互组件触发回调后，最终状态以业务侧传回的受控值为准。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Modal 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `Modal` 是受控组件：需要通过外部 `open` 状态驱动。
- `closeOnMaskClick` 只触发 `onClose`，是否真正关闭取决于你在回调中如何更新 `open`。
- `destroyOnClose=false` 时会保留节点并使用 `hidden` 隐藏，适合保留内部状态。
