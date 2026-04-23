# Button

基础的 React 按钮组件.

## Variant

设置按钮的样式，默认样式为 `primary`。按钮被禁用时，在当前 `variant` 效果上 追加 50% 的透明度。

<ButtonVariantsDemo />

## Size

设置按钮的大小，默认大小为 `md`

<ButtonSizesDemo />

## Rounded

设置按钮圆角，支持 `xs`、`sm`、`md`、`lg`、`xl`、`full`，也支持传入数字（自动转 `px`）与任意 CSS 字符串。

<ButtonRoundedDemo />

## Bounce

点击按钮时，按钮会弹起

<ButtonBounceDemo />

## Splash

点击按钮时，按钮会闪烁

<ButtonSplashDemo />

## Usage

```tsx
import { Button } from "@ldkj/web-ui";

export function Example() {
  return <Button rounded="full">Click me</Button>;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 按钮样式 | `'dark' \| 'primary' \| 'secondary' \| 'minor' \| 'success' \| 'warning' \| 'danger' \| 'outline' \| 'ghost' \| 'link' \| 'text'` | `'primary'` |
| `size` | 按钮大小 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon'` | `'md'` |
| `rounded` | 按钮圆角 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | 默认样式圆角 |
| `disabled` | 禁用按钮 | `boolean` | `false` |
| `bounce` | 点击时是否弹起 | `boolean` | `false` |
| `splash` | 点击时是否闪烁 | `boolean` | `false` |
| `onClick` | 点击按钮时的回调函数 | `() => void` | - |
