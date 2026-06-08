# Icon

基于 `@material-symbols/svg-400` 的按需加载 SVG 图标组件。
`loaders.ts` 预置了常用的 372个图标。

## Basic

<IconBasicDemo />

## Variant

`variant` 用于切换 `outlined / rounded / sharp`，默认为 `outlined` ：

<IconVariantFillDemo />

## Size

`size` 控制图标尺寸，默认 `24`。

<IconSizeDemo />

## Color

`color` 控制图标颜色，默认 `currentColor`。

<IconColorDemo />

## Title

`title` 用于提供无障碍名称（屏幕阅读器可读）。

<IconTitleDemo />

## 常见场景

### 基础展示

用于页面主体、列表项或卡片中直接展示 Icon 的默认形态。

### 状态与数据驱动

当内容来自接口或业务状态时，优先把状态转换为组件 props，再交给 Icon 渲染。

### 样式组合

需要贴近业务页面时，通过 `className`、`class`、`style` 或 `sx` 做局部覆盖。

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

## Register Icon

如果你希望业务侧自己控制可用 `iconName`，可以在应用入口注册加载器，来全局注册自定义图标：

<IconRegisterDemo />

### Registry API Demo

下面示例演示 `registerIconLoaders / setIconLoaders / resetIconLoaders / getRegisteredIconNames` 的实际行为：

<IconRegistryApiDemo />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 图标名称（material symbols 名称）；当未传 `svg/src` 时使用 | `string` | - |
| `svg` | 自定义 SVG 组件（优先级最高） | `SvgComponent` | - |
| `src` | 自定义图标资源地址（如 svg url/data url） | `string` | - |
| `variant` | 图标风格 | `'outlined' \| 'rounded' \| 'sharp'` | `'outlined'` |
| `useColorAsFill` | 是否将 `color` 作为 `fill` 颜色 | `boolean` | `false` |
| `size` | 图标大小 | `number \| string` | `24` |
| `color` | 图标颜色 | `string` | `'currentColor'` |
| `title` | 无障碍标题 | `string` | - |

### Icon Registry API

| 方法 | 说明 | 签名 |
| --- | --- | --- |
| `registerIconLoaders` | 合并注册加载器；同名会覆盖 | `(loaders: IconLoaderRegistry) => void` |
| `setIconLoaders` | 全量替换运行时加载器 | `(loaders: IconLoaderRegistry) => void` |
| `resetIconLoaders` | 清空运行时加载器 | `() => void` |
| `getRegisteredIconNames` | 获取当前可用图标名（运行时 + 内置） | `() => string[]` |

## 行为规则 / 优先级

- 数据展示组件只负责渲染当前输入，不在内部请求数据。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Icon 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 渲染优先级: `svg > src > name`。
- `variant` 仅对内置 `name` 图标生效。
- `src` 渲染为 `<img>`，`color` 对其不生效（颜色由资源本身决定）。
- 图标加载器优先级: `register/set` 注册的运行时加载器 > 内置 `materialSymbolLoaders`。
