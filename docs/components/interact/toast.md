# Toast

页面级轻提示组件。底层使用 `ToastProvider + useToast`，并提供静态 `toast` facade 便于在非组件模块调用。

## Basic

<ToastBasicDemo />

## useToast（组件内）

`useToast` 适用于 React 组件内部逻辑：  
你能直接拿到当前 `ToastProvider` 的上下文能力，适合页面交互按钮、表单提交反馈等 UI 事件。

<ToastUseToastDemo />

## static toast（组件外）

静态 `toast` 适用于组件外调用：  
例如请求封装、工具函数、状态管理模块中，无法直接使用 Hook 时，用静态方法最方便。

<ToastStaticDemo />

## Closable

<ToastClosableDemo />

## Custom Icon

<ToastCustomIconDemo />

## 常见场景

### 基础反馈

用于按钮点击、异步流程或页面局部状态变化时给出明确反馈。

### 受控交互

打开、关闭、显示或隐藏等状态应由业务侧控制，组件负责渲染与回调。

### 样式与内容扩展

复杂内容通过 `children` 或插槽类 props 组合，视觉细节通过样式入口覆盖。

## Usage

```tsx
import { ToastProvider, toast, useToast } from "@ldkj/web-ui";

function Actions() {
  const api = useToast();
  return (
    <>
      <button onClick={() => api.success("保存成功")}>useToast</button>
      <button onClick={() => toast.error("提交失败")}>static toast</button>
    </>
  );
}

export function Example() {
  return (
    <ToastProvider placement="top" queueLimit={5}>
      <Actions />
    </ToastProvider>
  );
}
```

## API

### ToastProvider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `placement` | 默认提示位置 | `'top' \| 'bottom' \| 'leftTop' \| 'rightTop' \| 'leftBottom' \| 'rightBottom' \| 'center'` | `'top'` |
| `duration` | 默认停留时长（毫秒） | `number` | `3000` |
| `queueLimit` | 队列上限（超出后淘汰最早提示） | `number` | `5` |
| `reverse` | 反向展示（新消息在下方） | `boolean` | `false` |

### useToast

`useToast()` 返回：

- `show(message, options)`
- `info(message, options)`
- `success(message, options)`
- `warn(message, options)`
- `error(message, options)`
- `dismiss(id)`
- `clear()`

`options` 类型：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 自定义 toast id | `string` | 自动生成 |
| `duration` | 当前消息停留时长（毫秒） | `number` | 继承 `ToastProvider` |
| `placement` | 当前消息位置 | 同 `ToastProvider.placement` | 继承 `ToastProvider` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `icon` | 自定义图标（名称或 `{ svg/src }`） | `string \| { svg?: Component; src?: string }` | 按 `type` 使用内置图标 |
| `iconColor` | 自定义图标颜色 | `string` | 按 `type` 使用内置颜色 |

### static toast

- `toast.show(message, options)`
- `toast.info/success/warn/error(message, options)`
- `toast.dismiss(id)`
- `toast.clear()`
- `toast.config({ placement, duration, closable })`
- `toast.resetConfig()`

> 使用静态 `toast` 前，请先在应用根节点挂载 `ToastProvider`。
>
> 图标优先级：`options.icon` > `type` 默认图标。

## 行为规则 / 优先级

- 交互组件触发回调后，最终状态以业务侧传回的受控值为准。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Toast 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `useToast` 使用的是最近一层 `ToastProvider`（React Context 就近原则）。
- 静态 `toast` 使用的是全局 bridge 指向的 `ToastProvider`，不走 Context。
- 如果存在多层 `ToastProvider`，并且混用 `useToast` 与静态 `toast`，两者可能落到不同 Provider，出现提示分流或视觉重叠。
- 推荐在应用根节点只挂载一个全局 `ToastProvider`；若业务必须局部再包一层，请在该局部区域只使用 `useToast`，避免再调用静态 `toast`。
