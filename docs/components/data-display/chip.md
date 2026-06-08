# Chip

用于展示状态、标签或分类信息的轻量级标记组件。

## Variant

`Chip` 提供多种语义色彩，默认样式为 `primary`。

<ChipVariantsDemo />

## Outline

通过 `outline` 切换为描边风格，适合更轻量的视觉层级。

<ChipOutlineDemo />

## Size

`Chip` 支持 `xs` 到 `xl` 五档尺寸，默认值为 `md`。

<ChipSizesDemo />

## Rounded

`Chip` 支持 `rounded` 圆角控制，支持 `xs`、`sm`、`md`、`lg`、`xl`、`full`，也支持数字（自动转 `px`）与任意 CSS 字符串。

<ChipRoundedDemo />

## Shadow

`Chip` 支持 `shadow` 阴影控制，支持 `none`、`xs`、`sm`、`md`、`lg`、`xl`、`inner`，也支持任意 `box-shadow` 字符串。

<ChipShadowDemo />

## Basic

最小用法展示 Chip 的默认形态。优先从 Basic 示例开始，再按业务场景叠加状态、样式和交互。

<ChipVariantsDemo />

## 常见场景

### 基础展示

用于页面主体、列表项或卡片中直接展示 Chip 的默认形态。

### 状态与数据驱动

当内容来自接口或业务状态时，优先把状态转换为组件 props，再交给 Chip 渲染。

### 样式组合

需要贴近业务页面时，通过 `className`、`class`、`style` 或 `sx` 做局部覆盖。

## Usage

```tsx
import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Chip
      variant="success"
      size="sm"
      rounded={12}
      shadow="sm"
      sx={{
        "&:hover": { opacity: 0.9 },
        "@media (max-width: 768px)": { fontSize: "12px" },
      }}
    >
      Online
    </Chip>
  );
}
```

## As Component

`Chip` 支持通过 `component` 指定渲染元素，便于在链接或按钮语义中复用样式。

```tsx
import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Chip component="a" href="/orders" variant="primary" outline rounded="full">
      View Orders
    </Chip>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 颜色变体 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'minor' \| 'dark' \| 'light' \| 'text'` | `'primary'` |
| `outline` | 是否使用描边样式 | `boolean` | `false` |
| `size` | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `rounded` | 圆角 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | 默认样式圆角 |
| `shadow` | 阴影 | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'inner' \| string` | - |
| `component` | 指定渲染的元素或组件 | `React.ElementType` | `'span'` |
| `className` | 追加类名 | `string` | - |
| `class` | 兼容旧写法的类名字段 | `string` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 内容 | `React.ReactNode` | - |

## 行为规则 / 优先级

- 数据展示组件只负责渲染当前输入，不在内部请求数据。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Chip 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 注意空态、长文本、加载中和错误态，必要时配合 Skeleton、Empty 或 Alert。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
