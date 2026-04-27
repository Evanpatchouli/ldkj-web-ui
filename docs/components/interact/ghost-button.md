# GhostButton

用于页面级悬浮操作的圆形按钮组件。默认 `fixed` 定位，默认停靠在右下角，并继承 `Button` 的绝大多数 API。

## Basic

默认行为是 `position: fixed`、`right: 16`、`bottom: 16`、`rounded="full"`、`overflow: hidden`。下面的演示为了限制在示例区域内，额外把 `position` 改成了 `absolute`。

<GhostButtonBasicDemo />

## Size

`GhostButton` 内置 `xs` 到 `xl` 五档预设尺寸，也支持数字和任意 CSS 尺寸字符串。传入数字时会自动补全为 `px`。

<GhostButtonSizeDemo />

## Position

可以直接通过 `position`、`left`、`top`、`right`、`bottom`、`zIndex` 控制悬浮位置和层级。默认右下角吸附，覆盖某个方向时记得把另一侧设为 `auto`。

<GhostButtonPositionDemo />

## Button API

除了定位相关 props 和新的 `size` 规则外，其他常用属性基本与 `Button` 同步，例如 `variant`、`rounded`、`shadow`、`bounce`、`splash`、`sx`、`component`、`disabled`、`onClick` 和 `aria-*` 等原生属性。

```tsx
import { GhostButton } from "@ldkj/web-ui";

export function Example() {
  return (
    <GhostButton
      aria-label="Create item"
      variant="primary"
      size="lg"
      shadow="lg"
      bottom={24}
      right={24}
      bounce
      splash
    >
      +
    </GhostButton>
  );
}
```

## Scoped Container

如果你不想让它固定在整个视口上，可以直接传 `position`，或者通过 `sx` / `style` 继续做更细的覆盖，把它挂到局部容器中：

```tsx
import { GhostButton } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="relative h-56">
      <GhostButton
        aria-label="Open panel"
        position="absolute"
      >
        ?
      </GhostButton>
    </div>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 按钮尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `position` | 定位方式 | `React.CSSProperties['position']` | `'fixed'` |
| `left` | 左侧定位 | `React.CSSProperties['left']` | - |
| `top` | 顶部定位 | `React.CSSProperties['top']` | - |
| `right` | 右侧定位 | `React.CSSProperties['right']` | `16` |
| `bottom` | 底部定位 | `React.CSSProperties['bottom']` | `16` |
| `zIndex` | 层级 | `React.CSSProperties['zIndex']` | `10` |
| `rounded` | 圆角，默认是圆形按钮 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | `'full'` |
| `variant` | 按钮风格，同 `Button` | `'dark' \| 'primary' \| 'secondary' \| 'minor' \| 'success' \| 'warning' \| 'danger' \| 'outline' \| 'ghost' \| 'link' \| 'text'` | `'primary'` |
| `shadow` | 阴影，同 `Button` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'inner' \| string` | - |
| `bounce` | 点击时是否弹起 | `boolean` | `false` |
| `splash` | 点击时是否闪烁 | `boolean` | `false` |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `component` | 指定渲染元素或组件 | `React.ElementType` | `'button'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `children` | 按钮内容 | `React.ReactNode` | - |
| `...rest` | 其余原生按钮属性和事件 | `React.ComponentPropsWithoutRef<T>` | - |
