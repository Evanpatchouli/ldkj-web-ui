# Divider

用于分割内容区域的分割线组件，默认是水平实线。

## Variant

通过 `variant` 控制分割线缩进方式：

- `full`: 撑满可用宽度
- `middle`: 两端保留固定空隙
- `inset`: 起始端保留固定空隙

<DividerVariantsDemo />

## Content + Align

传入 `children` 后可在分割线中放置元素，并通过 `align` 控制位置：

- `left`: 元素在左部
- `center`: 元素居中（默认）
- `right`: 元素在右部

<DividerContentDemo />

## Vertical

传入 `vertical` 切换为垂直分割线。

<DividerVerticalDemo />

## Type + Color

通过 `type` 设置线型（默认 `solid`），通过 `color` 设置颜色类（默认 `text-gray-200`）。

<DividerTypeColorDemo />

## Basic

最小用法展示 Divider 的默认形态。优先从 Basic 示例开始，再按业务场景叠加状态、样式和交互。

<DividerVariantsDemo />

## 常见场景

### 基础布局

用于组织页面结构、控制间距、对齐和响应式布局。

### 组合嵌套

复杂页面推荐拆成多个 Divider 组合，避免在单个容器中堆叠过多职责。

### 响应式适配

可通过尺寸、间距、`className` 或 `sx` 处理不同屏幕下的布局变化。

## Usage

```tsx
import { Divider } from "@ldkj/web-ui";

export function Example() {
  return (
    <div>
      <p>Section A</p>
      <Divider variant="middle">OR</Divider>
      <p>Section B</p>
    </div>
  );
}
```

## API

| 属性        | 说明                        | 类型                                 | 默认值            |
| ----------- | --------------------------- | ------------------------------------ | ----------------- |
| `vertical`  | 是否为垂直分割线            | `boolean`                            | `false`           |
| `variant`   | 分割线变体                  | `'full' \| 'middle' \| 'inset'`      | `'full'`          |
| `align`     | `children` 位置（水平模式） | `'left' \| 'center' \| 'right'`      | `'center'`        |
| `type`      | 分割线类型                  | `React.CSSProperties['borderStyle']` | `'solid'`         |
| `color`     | 分割线颜色类名              | `string`                             | `'text-gray-200'` |
| `children`  | 中间内容                    | `React.ReactNode`                    | -                 |
| `className` | 追加类名                    | `string`                             | -                 |
| `style`     | 内联样式                    | `React.CSSProperties`                | -                 |
| `sx`        | CSS-in-JS 样式入口          | `SxProps`（支持对象/数组/函数，支持伪类、选择器、媒体查询） | - |

## 行为规则 / 优先级

- 布局组件只处理结构、尺寸和对齐，不承载业务状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Divider 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 布局层尽量保持语义清晰，避免把业务点击行为隐藏在纯布局组件里。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
