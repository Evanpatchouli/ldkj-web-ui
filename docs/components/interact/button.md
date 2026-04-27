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

## Usage

```tsx
import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Button
      rounded="full"
      shadow="lg"
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
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `onClick` | 点击按钮时的回调函数 | `() => void` | - |
