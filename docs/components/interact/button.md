# Button

基础的 React 按钮组件。

## Variant

设置按钮样式，默认样式为 `primary`。按钮被禁用时，会追加禁用态透明度。

<ButtonVariantsDemo />

## Size

设置按钮大小，默认大小为 `md`。

<ButtonSizesDemo />

## Rounded

设置按钮圆角，支持 `xs`、`sm`、`md`、`lg`、`xl`、`full`，也支持数字（自动转 `px`）与任意 CSS 字符串。

<ButtonRoundedDemo />

## Shadow

设置按钮阴影，支持 `none`、`xs`、`sm`、`md`、`lg`、`xl`、`inner`，也支持任意 `box-shadow` 字符串。

<ButtonShadowDemo />

## Bounce

点击按钮时，按钮会产生弹起反馈。

<ButtonBounceDemo />

## Splash

点击按钮时，按钮会产生闪烁反馈。

<ButtonSplashDemo />

## Debounce

用于提交、搜索、保存等容易重复点击的操作。`debounce` 为 `true` 时默认等待 `300ms` 后触发 `onClick`；传入数字时会启用防抖，并使用该数字作为等待时间；未设置或为 `false` 时保持原生点击行为。

<ButtonDebounceDemo />

## Basic

最小用法展示 Button 的默认形态。优先从 Basic 示例开始，再按业务场景叠加状态、样式和交互。

<ButtonVariantsDemo />

## 常见场景

### 基础反馈

用于按钮点击、异步流程或页面局部状态变化时给出明确反馈。

### 受控交互

打开、关闭、显示或隐藏等状态应由业务侧控制，组件负责渲染与回调。

### 样式与内容扩展

复杂内容通过 `children` 或插槽类 props 组合，视觉细节通过样式入口覆盖。

## Usage

```tsx
import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Button
      rounded="full"
      shadow="lg"
      debounce
      onClick={() => {
        console.log("debounced click");
      }}
      sx={{
        "&:hover": { transform: "translateY(-1px)" },
        "@media (max-width: 768px)": { width: "100%" },
      }}
    >
      Click me
    </Button>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 按钮样式 | `'dark' \| 'primary' \| 'secondary' \| 'minor' \| 'success' \| 'warning' \| 'danger' \| 'outline' \| 'ghost' \| 'link' \| 'text'` | `'primary'` |
| `size` | 按钮大小 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon'` | `'md'` |
| `rounded` | 按钮圆角 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | 默认样式圆角 |
| `shadow` | 按钮阴影 | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'inner' \| string` | - |
| `disabled` | 禁用按钮 | `boolean` | `false` |
| `bounce` | 点击时是否弹起 | `boolean` | `false` |
| `splash` | 点击时是否闪烁 | `boolean` | `false` |
| `debounce` | 是否防抖 `onClick`，`true` 使用 300ms，数字表示等待毫秒数 | `boolean \| number` | `false` |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `onClick` | 点击按钮时的回调函数 | `() => void` | - |

## 行为规则 / 优先级

- 交互组件触发回调后，最终状态以业务侧传回的受控值为准。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- `debounce` 只处理 `onClick`：`true` 等价于 `300`，数字值会作为毫秒等待时间，未设置或 `false` 不启用防抖。
- 启用 `debounce` 时使用尾触发策略，连续点击只会在最后一次点击停止后触发一次；组件卸载或防抖配置变化时会取消待执行回调。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Button 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 交互反馈应避免和 Toast、Notification、Modal 等组件表达同一件事。
- `debounce` 适合防重复提交，不适合需要即时视觉响应或按下即执行的操作。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
