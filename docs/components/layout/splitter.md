# Splitter

`Splitter` 用于在一个固定区域内创建可拖拽调整尺寸的分隔面板。它参考 Ant Design Splitter 的核心交互：水平/垂直分隔、面板尺寸限制、受控尺寸、折叠、多面板和双击重置，并按本库风格提供 `Splitter.Panel` 组合式 API。

> Splitter 需要读取子元素的 Panel 配置计算尺寸，因此子元素仅支持 `Splitter.Panel`。

## Basic

最小可用示例：设置容器高度后，通过 `defaultSize` 初始化面板尺寸，通过 `min` / `max` 限制拖拽范围。

<SplitterBasicDemo />

## 常见场景

### 垂直分隔

通过 `orientation="vertical"` 切换为上下分隔。垂直模式下容器必须有明确高度，否则浏览器无法计算可分配空间。

<SplitterVerticalDemo />

### 受控尺寸

通过 `Panel.size` 和 `onResize` 管理尺寸。受控场景建议同时维护所有面板尺寸，避免父组件状态和用户拖拽结果不一致。

<SplitterControlledDemo />

### 多面板与折叠

`Splitter` 支持嵌套组合、`lazy` 延迟提交尺寸、语义化 `classNames/styles` 和 `Panel.collapsible` 折叠入口。

<SplitterComplexDemo />

## Usage

```tsx
import { Splitter } from "@ldkj/web-ui";

export function Example() {
  return (
    <Splitter className="h-[360px] rounded-lg border">
      <Splitter.Panel defaultSize="30%" min={180} collapsible>
        Sidebar
      </Splitter.Panel>
      <Splitter.Panel min={240}>
        Content
      </Splitter.Panel>
    </Splitter>
  );
}
```

## API

### Splitter

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `orientation` | 面板排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `vertical` | 是否垂直排列，低优先级快捷写法 | `boolean` | `false` |
| `layout` | 方向别名，兼容 Ant Design 写法 | `'horizontal' \| 'vertical'` | - |
| `lazy` | 拖拽时只显示参考线，松手后提交尺寸 | `boolean` | `false` |
| `destroyOnHidden` | 面板折叠到 `0` 时是否销毁内容，可被 Panel 覆盖 | `boolean` | `false` |
| `collapsible` | 全局折叠配置，当前用于动画和默认图标 | `{ motion?: boolean; icon?: { start?: ReactNode; end?: ReactNode } }` | - |
| `draggerIcon` | 自定义拖拽条中间图标 | `React.ReactNode` | - |
| `classNames` | 自定义语义结构类名 | `Partial<Record<'root' \| 'panel' \| 'dragger', string>> \| (info) => ...` | - |
| `styles` | 自定义语义结构内联样式 | `Partial<Record<'root' \| 'panel' \| 'dragger', CSSProperties>> \| (info) => ...` | - |
| `onResizeStart` | 开始拖拽时触发 | `(sizes: number[]) => void` | - |
| `onResize` | 尺寸变化时触发，返回像素数组 | `(sizes: number[]) => void` | - |
| `onResizeEnd` | 拖拽、键盘调整、折叠或双击重置结束时触发 | `(sizes: number[]) => void` | - |
| `onCollapse` | 折叠/展开后触发 | `(collapsed: boolean[], sizes: number[]) => void` | - |
| `onDraggerDoubleClick` | 双击拖拽条后触发 | `(index: number) => void` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `className` / `style` | 根节点样式 | `string` / `React.CSSProperties` | - |

### Splitter.Panel

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `defaultSize` | 初始尺寸，支持数字 px、`'120px'`、`'30%'` | `number \| string` | 平分剩余空间 |
| `size` | 受控尺寸，支持数字 px、`'120px'`、`'30%'` | `number \| string` | - |
| `min` | 最小拖拽尺寸 | `number \| string` | `0` |
| `max` | 最大拖拽尺寸 | `number \| string` | - |
| `resizable` | 是否允许与相邻面板拖拽调整 | `boolean` | `true` |
| `collapsible` | 是否显示快捷折叠入口 | `boolean \| { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | `false` |
| `destroyOnHidden` | 折叠到 `0` 时是否销毁当前面板内容 | `boolean` | 继承 Splitter |
| `children` | 面板内容 | `React.ReactNode` | - |
| `className` / `style` | 面板节点样式 | `string` / `React.CSSProperties` | - |

## 行为规则 / 优先级

- `orientation` 优先级最高；未传时读取 `layout`；再未传时读取 `vertical`。
- 尺寸优先级为 `Panel.size` > `Panel.defaultSize` > 平分剩余空间。
- 数字尺寸按 px 处理；字符串支持百分比和 px，百分比基于当前 Splitter 主轴可用空间计算。
- 拖拽只调整拖拽条两侧相邻面板，其他面板尺寸保持不变。
- 任一相邻面板 `resizable={false}` 时，该拖拽条不可拖拽也不可键盘调整。
- `min` / `max` 约束拖拽尺寸；折叠会把面板尺寸置为 `0`，展开时优先恢复折叠前尺寸，其次使用 `defaultSize`。
- 双击拖拽条会按 `defaultSize` / `size` 重新计算整组面板尺寸，并触发 `onDraggerDoubleClick`。
- `lazy` 模式下拖拽过程只移动参考线，松手时提交尺寸并触发 `onResize`。
- `styles` 和 `classNames` 作用在语义结构上；如覆盖 `flex`、`width`、`height` 等核心样式，可能改变尺寸计算结果。

## A11Y

- 拖拽条使用 `role="separator"`，并根据方向设置 `aria-orientation`。
- 拖拽条可聚焦，水平模式支持 `ArrowLeft` / `ArrowRight`，垂直模式支持 `ArrowUp` / `ArrowDown`，每次调整 `10px`。
- 折叠按钮提供 `aria-label`，用于说明展开或折叠目标面板。
- 面板内容的标题、导航、表单标签仍应由业务内容自行提供语义，Splitter 只负责可调整布局。

## Notes

- Splitter 的父容器必须有可测量的主轴尺寸；水平模式通常需要宽度，垂直模式必须有高度。
- 复杂嵌套建议控制最外层高度，并为内部 Panel 设置合理 `min`，避免内容挤压到不可读。
- 大型图表、代码编辑器或表格放入 Panel 后，建议监听 `onResizeEnd` 再触发重排，减少拖拽过程中的重复计算。
- 折叠时如内容初始化成本较高，可使用 `destroyOnHidden`；如希望保留内部状态，应保持默认值 `false`。
