# GhostButtonGroup

用于承载一组悬浮快捷操作的按钮组组件。主触发按钮沿用 `GhostButton` 的大部分能力，展开后的子按钮也会逐个使用 `GhostButton` 渲染。

## Basic

默认使用 `click` 触发，默认向上展开。下面的示例为了限制在演示区域内，将整个组的 `position` 设置为 `absolute`。

<GhostButtonGroupBasicDemo />

## Trigger

`trigger` 支持 `"click"`、`"hover"` 或两者组合的数组。`click` 模式下支持点外部关闭和 `Esc` 关闭，`hover` 模式下进入按钮组时展开、移出时收起。

<GhostButtonGroupTriggerDemo />

## Compose

除了通过 `items` 数组传入展开项，也可以使用组合式写法，通过 `GhostButtonGroup.Item` 声明每一个子按钮。非 `Item` 的 children 会作为主触发按钮内容。

<GhostButtonGroupComposeDemo />

## Direction And Gap

可以通过 `direction` 控制展开方向，支持 `up`、`down`、`left`、`right`；通过 `gap` 控制主按钮与展开项、以及展开项之间的间距，支持数字和任意 CSS 尺寸字符串。

```tsx
import { GhostButtonGroup } from "@ldkj/web-ui";

export function Example() {
  return (
    <GhostButtonGroup
      direction="right"
      gap="0.75rem"
      trigger={["click", "hover"]}
      position="absolute"
      items={[
        { "aria-label": "One", children: "1" },
        { "aria-label": "Two", children: "2" },
      ]}
    >
      +
    </GhostButtonGroup>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `trigger` | 展开触发方式 | `'click' \| 'hover' \| Array<'click' \| 'hover'>` | `'click'` |
| `direction` | 展开方向 | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` |
| `gap` | 展开间距 | `number \| string` | `12` |
| `items` | 数据式展开项配置 | `GhostButtonGroupItemConfig[]` | - |
| `position` | 按钮组定位方式 | `React.CSSProperties['position']` | `'fixed'` |
| `left` | 左侧定位 | `React.CSSProperties['left']` | - |
| `top` | 顶部定位 | `React.CSSProperties['top']` | - |
| `right` | 右侧定位 | `React.CSSProperties['right']` | `16` |
| `bottom` | 底部定位 | `React.CSSProperties['bottom']` | `16` |
| `zIndex` | 层级 | `React.CSSProperties['zIndex']` | `10` |
| `variant` | 主触发按钮风格，同 `GhostButton` | 同 `GhostButton` | `'primary'` |
| `size` | 主触发按钮尺寸，同 `GhostButton` | 同 `GhostButton` | `'md'` |
| `rounded` | 主触发按钮圆角，同 `GhostButton` | 同 `GhostButton` | `'full'` |
| `shadow` | 主触发按钮阴影，同 `GhostButton` | 同 `GhostButton` | - |
| `bounce` | 主触发按钮点击弹起 | `boolean` | `false` |
| `splash` | 主触发按钮点击闪烁 | `boolean` | `false` |
| `sx` | 主触发按钮的 CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 主触发按钮内容，或组合式 `Item` 集合 | `React.ReactNode` | - |
| `...rest` | 其余主触发按钮原生属性和事件 | `React.ComponentPropsWithoutRef<T>` | - |

## GhostButtonGroup.Item

`GhostButtonGroup.Item` 用于组合式声明展开项。它的常用属性基本与 `GhostButton` 对齐，但不接收组级定位属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `itemKey` | 展开项 key | `React.Key` | - |
| `variant` | 子按钮风格 | 同 `GhostButton` | `'primary'` |
| `size` | 子按钮尺寸 | 同 `GhostButton` | `'md'` |
| `rounded` | 子按钮圆角 | 同 `GhostButton` | `'full'` |
| `shadow` | 子按钮阴影 | 同 `GhostButton` | - |
| `bounce` | 子按钮点击弹起 | `boolean` | `false` |
| `splash` | 子按钮点击闪烁 | `boolean` | `false` |
| `children` | 子按钮内容 | `React.ReactNode` | - |
