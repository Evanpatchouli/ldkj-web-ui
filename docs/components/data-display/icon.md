# Icon

基于 `@material-symbols/svg-400` 的按需加载 SVG 图标组件。
`loaders.ts` 预置了常用的 372个图标。

## Basic

<IconBasicDemo />

## Usage

```tsx
import { Icon } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Icon name="home" />
      <Icon name="search" color="#2563eb" />
      <Icon name="settings" variant="rounded" size={28} />
    </div>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 图标名称（material symbols 名称）；当未传 `svg/src` 时使用 | `string` | - |
| `svg` | 自定义 SVG 组件（优先级最高） | `SvgComponent` | - |
| `src` | 自定义图标资源地址（如 svg url/data url） | `string` | - |
| `variant` | 图标风格 | `'outlined' \| 'rounded' \| 'sharp'` | `'outlined'` |
| `fill` | 是否使用实填充色 | `boolean` | `false` |
| `size` | 图标大小 | `number \| string` | `24` |
| `color` | 图标颜色 | `string` | `'currentColor'` |
| `className` | 追加类名 | `string` | - |
| `title` | 无障碍标题 | `string` | - |

## Notes

- 渲染优先级: `svg > src > name`。
- `variant` 仅对内置 `name` 图标生效。
- `src` 渲染为 `<img>`，`fill/color` 对其不生效（颜色由资源本身决定）。
