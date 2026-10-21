# Masonry

`Masonry` 用于构建真实的响应式瀑布流。它根据容器宽度和每个项目的已知宽高比计算列数与位置，减少不同高度媒体之间的纵向空隙。

> `Masonry` 适合图片、视频封面等比例已知的媒体项目。任意动态高度的业务卡片应使用 [Columns](/components/layout/columns)，或在业务层先确定稳定比例。

## Basic

通过 `frameWidth` 设置期望的最小项目宽度；容器变宽或变窄时，组件会自动重新计算列数。每个 `Masonry.Item` 必须提供 `width` / `height` 或 `aspectRatio`。

<MasonryBasicDemo />

## 常见场景

### Regular 与 Balanced

`regular` 按 DOM 索引固定分配列，视觉阅读顺序更容易预测；`balanced` 每次选择当前最短列，通常能得到更紧凑的整体高度。

<MasonryVariantsDemo />

### 暂停布局计算

`disabled` 会停止绝对定位，退回响应式 CSS Grid。它适合打印模式、服务端首屏或业务需要临时展示规则网格的场景。

<MasonryDisabledDemo />

## Usage

```tsx
import { Masonry } from "@ldkj/web-ui";

export function Gallery() {
  return (
    <Masonry frameWidth={220} gap={16} variant="balanced">
      {photos.map((photo) => (
        <Masonry.Item
          key={photo.id}
          width={photo.width}
          height={photo.height}
          className="overflow-hidden rounded-xl"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </Masonry.Item>
      ))}
    </Masonry>
  );
}
```

## API

### Masonry

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `frameWidth` | 期望的最小项目宽度，单位 px；组件据此计算列数 | `number` | `240` |
| `gap` | 水平与垂直间距，单位 px | `number` | `16` |
| `variant` | 列分配算法 | `'regular' \| 'balanced'` | `'balanced'` |
| `disabled` | 禁用布局计算并退回 CSS Grid | `boolean` | `false` |
| `onLayout` | 有效布局完成回调 | `(info: { columns; height; itemWidth }) => void` | - |
| `className` / `class` | 根节点追加类名 | `string` | - |
| `style` | 根节点内联样式；核心定位样式优先级更高 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| 其他属性 | 透传到根 `div` | `React.HTMLAttributes<HTMLDivElement>` | - |

### Masonry.Item

`Masonry.Item` 继承 [Box](/components/layout/box) 的内容容器能力。`className`、`style`、`sx` 与原生属性作用于比例框内部的内容节点，外层定位框由 Masonry 控制。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `aspectRatio` | 直接提供宽高比，与 `width/height` 二选一 | `number` | - |
| `width` / `height` | 原始媒体尺寸，仅用于计算比例 | `number` / `number` | - |
| `component` | 内容节点使用的元素或组件 | `React.ElementType` | `'div'` |
| `children` | 项目内容 | `React.ReactNode` | - |

## 行为规则 / 优先级

- 比例来源只能二选一：`aspectRatio`，或同时提供 `width` 与 `height`；非有限数、零和负数会抛出错误。
- `Masonry` 只接受直接的 `Masonry.Item` 子节点。条件渲染的 `null` 会被忽略，但 Fragment 和普通元素会抛出错误。
- 列数按 `floor((容器宽度 + gap) / (frameWidth + gap))` 计算，最少为一列；实际项目宽度会均分当前容器。
- `regular` 使用 `项目索引 % 列数` 确定列；`balanced` 将项目放入当前累计高度最小的列，列高相同时选择靠前列。
- `disabled` 优先级最高，启用后不运行两种定位算法。
- `frameWidth` 必须为有限正数，`gap` 必须为有限非负数；无效值分别回退为 `240` 和 `16`。
- `style` 可设置背景、边框等根样式，但 `position`、`display`、`width`、`height` 等核心布局值由组件控制；`sx` 最后应用，覆盖核心值可能破坏布局。

## A11Y

- DOM、屏幕阅读器和键盘焦点顺序始终与传入顺序一致。`balanced` 只改变视觉位置，因此不要用于必须严格按二维视觉顺序理解的数据。
- 组件不自动添加 `list`、`grid` 或 `region` 角色。媒体集合可在根节点传入 `role="list"`，并让项目内容使用合适的语义元素。
- 图片必须提供有意义的 `alt`；纯装饰图片使用 `alt=""`。

## 性能与 SSR

- 服务端和首次测量前使用 CSS Grid 降级布局；客户端测得容器宽度后切换为瀑布流。稳定比例可显著减少切换时的 CLS。
- 组件只观察根容器尺寸，不观察每个项目内容。请在接口或图片元数据中提前取得宽高，不要等待图片加载后再猜测比例。
- 图片建议使用 `loading="lazy"`、`decoding="async"`、响应式 `srcSet` / `sizes`，并让媒体填满比例框。
- 数千个项目仍应配合分页、增量加载或专用虚拟化方案；Masonry 不内置窗口化。

## Notes

- `Masonry` 解决比例已知媒体的紧凑排列；`Columns` 解决任意内容的固定分栏，两者不互为别名。
- 如果内容可能超出比例框，应该在内容节点上设置 `overflow` 策略；外层定位框不接受业务样式。
- `onLayout` 可能在容器尺寸变化后多次触发，不要在回调中无条件同步修改 Masonry 自身宽度。
