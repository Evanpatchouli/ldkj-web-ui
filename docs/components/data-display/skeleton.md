# Skeleton

`Skeleton` 用于在内容加载期间占位，降低页面布局跳动。它不绑定业务数据结构，适合和 `Card`、列表、表单区块组合使用。

## Basic

<SkeletonBasicDemo />

## Variants

`variant` 支持文本、矩形和圆形三种基础形态。

<SkeletonVariantsDemo />

## Text Rows

`SkeletonText` 用于快速生成多行文本占位，可通过 `widths` 控制每一行宽度。

<SkeletonTextRowsDemo />

## Card Loading / SX

`SkeletonCard` 是轻量组合组件。所有 Skeleton 组件都支持 `sx`，可覆盖基础颜色或局部选择器。

<SkeletonCardSxDemo />

## Usage

```tsx
import { Skeleton, SkeletonAvatar, SkeletonText } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="flex items-start gap-3">
      <SkeletonAvatar size={40} />
      <SkeletonText rows={3} widths={["48%", "100%", "72%"]} />
    </div>
  );
}
```

## API

### Skeleton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 占位形态 | `'text' \| 'rect' \| 'circle'` | `'rect'` |
| `width` | 宽度，数字自动转为 px | `number \| string` | `text: '100%'`，`circle: 40` |
| `height` | 高度，数字自动转为 px | `number \| string` | `text: '1em'`，`circle: 40` |
| `inline` | 是否以内联块显示 | `boolean` | `false` |
| `animated` | 是否启用脉冲动画 | `boolean` | `true` |
| `rounded` | 圆角，支持预设、数字和 CSS 值 | `Rounded` | `text: 'sm'`，`rect: 'md'`，`circle: 'full'` |
| `sx` | 样式增强，支持对象、数组、函数与选择器 | `SxProps` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 自定义类名别名 | `string` | - |
| `style` | 原生行内样式 | `React.CSSProperties` | - |

`Skeleton` 透传原生 `div` 属性。

### SkeletonText

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rows` | 文本行数 | `number` | `3` |
| `rowHeight` | 单行高度 | `number \| string` | `'0.875rem'` |
| `gap` | 行间距，数字自动转为 px | `number \| string` | `8` |
| `widths` | 每行宽度 | `Array<number \| string>` | 最后一行默认 `'68%'` |
| `width` | 整体容器宽度 | `number \| string` | - |
| `inline` | 是否以内联模式渲染 | `boolean` | `false` |
| `animated` | 是否启用脉冲动画 | `boolean` | `true` |
| `rounded` | 每行圆角 | `Rounded` | 跟随 `Skeleton` 默认策略 |
| `sx` | 样式增强 | `SxProps` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 自定义类名别名 | `string` | - |
| `style` | 原生行内样式 | `React.CSSProperties` | - |

`SkeletonText` 透传原生 `div` 属性。

### SkeletonAvatar

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 头像宽高，数字自动转为 px | `number \| string` | `40` |

其余属性继承 `Skeleton`（不含 `children`、`variant`、`width`、`height`）。

### SkeletonButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `width` | 按钮占位宽度 | `number \| string` | `96` |
| `height` | 按钮占位高度 | `number \| string` | `36` |
| `rounded` | 按钮占位圆角 | `Rounded` | `'md'` |

其余属性继承 `Skeleton`（不含 `children`、`variant`）。

### SkeletonCard

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showAvatar` | 是否显示头像占位 | `boolean` | `true` |
| `rows` | 文本行数 | `number` | `3` |
| `width` | 卡片宽度 | `number \| string` | - |
| `animated` | 是否启用脉冲动画 | `boolean` | `true` |
| `rounded` | 卡片圆角 | `Rounded` | `'lg'` |
| `sx` | 样式增强 | `SxProps` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 自定义类名别名 | `string` | - |
| `style` | 原生行内样式 | `React.CSSProperties` | - |

## Notes

- Skeleton 默认使用 `bg-gray-200`，不依赖 shadcn 私有 token。
- `style`、组件内部样式与 `sx` 会合并，`sx` 最终覆盖同名基础样式。
- `SkeletonText` 会确保至少渲染 1 行，`rows` 传入小数时向下取整。
- 需要完全静态占位时可以设置 `animated={false}`。
