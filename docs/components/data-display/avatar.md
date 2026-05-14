# Avatar

用于展示用户头像、组织标识或占位缩写的图形组件，基于 Radix Avatar 构建。

## Basic

<AvatarBasicDemo />

## Size

`size` 支持 `xs | sm | md | lg | xl` 预设，也支持 `number` 与任意 CSS 尺寸字符串。

<AvatarSizeDemo />

## Rounded

`rounded` 支持预设圆角和自由值，方便适配不同业务视觉。

<AvatarRoundedDemo />

## Shadow

`shadow` 支持预设阴影和自定义 `box-shadow` 字符串。

<AvatarShadowDemo />

## Image & Fallback

`Avatar.Image` 负责图片渲染，加载失败或延迟时展示 `Avatar.Fallback`。

<AvatarImageFallbackDemo />

## Group

可通过简单的负边距组合实现群组头像效果。

<AvatarGroupDemo />

## SX Styling

Avatar 支持 `sx`，可按需增强背景、颜色和内部 fallback 样式。

<AvatarSxDemo />

## Compound API

推荐使用组合式子组件 `Avatar.Image` 与 `Avatar.Fallback`，结构更清晰，也更符合 Avatar 语义。

<AvatarExportDemo />

## Usage

```tsx
import { Avatar } from "@ldkj/web-ui";

export function Example() {
  return (
    <Avatar size="lg" rounded="full" shadow="sm">
      <Avatar.Image src="https://example.com/u.png" alt="用户头像" />
      <Avatar.Fallback>LD</Avatar.Fallback>
    </Avatar>
  );
}
```

## Accessibility

- 建议给 `Avatar.Image` 传递有意义的 `alt` 文案。
- 纯装饰头像可将 `alt=""`，并在外层补充可读文本。
- 若头像承担状态含义，建议在外层配合 `aria-label` 或文案说明。

## API

### Avatar

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `rounded` | 圆角 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | `'full'` |
| `shadow` | 阴影 | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'inner' \| string` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 兼容旧写法类名 | `string` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 子节点（通常为 Image/Fallback） | `React.ReactNode` | - |

其余属性透传至 `@radix-ui/react-avatar` 的 `Avatar.Root`。

### Avatar.Image

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 追加类名 | `string` | - |
| `class` | 兼容旧写法类名 | `string` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性透传至 `Avatar.Image`（如 `src`、`alt`、`onLoadingStatusChange`）。

### Avatar.Fallback

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `delayMs` | fallback 展示延迟（毫秒） | `number` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 兼容旧写法类名 | `string` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性透传至 `Avatar.Fallback`。

## Compound API

| 子组件 | 说明 |
| --- | --- |
| `Avatar.Image` | 头像图片层，通常传入 `src` 与 `alt` |
| `Avatar.Fallback` | 图片不可用或延迟时的回退内容层 |
