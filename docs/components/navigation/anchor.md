# Anchor

`Anchor` 用于点击后滚动到指定锚点元素，适合目录导航、长页面分段跳转、回到指定区块等场景。

## Basic

通过 `id` 指定目标元素，`hash` 为 `true` 时渲染为 `a` 标签。

<AnchorBasicDemo />

## Offset + SX

`offset` 可用于吸顶头部场景，`onNavigate` 可用于埋点或导航后逻辑，组件同时支持 `sx`。

<AnchorOffsetDemo />

## 常见场景

### 基础导航

用于页面跳转、层级定位或内容切换，帮助用户理解当前位置。

### 受控状态

当前项、展开项、页码或激活项需要和路由/查询参数同步时，使用受控模式。

### 可访问操作

导航项应保持可聚焦、可读，并在禁用或当前状态时给出明确语义。

## Usage

```tsx
import { Anchor } from "@ldkj/web-ui";

export function Example() {
  return (
    <>
      <Anchor id="target" hash>
        跳转到目标
      </Anchor>

      <Anchor
        id="target"
        offset={64}
        onNavigate={(targetId) => {
          console.log("navigated:", targetId);
        }}
      >
        偏移跳转
      </Anchor>

      <section id="target">目标区域</section>
    </>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 目标元素 id | `string` | - |
| `hash` | 是否使用锚点模式（渲染为 `a`） | `boolean` | `false` |
| `component` | 非 `hash` 模式下自定义渲染标签/组件 | `React.ElementType` | `"button"` |
| `offset` | 垂直滚动偏移（通常用于吸顶场景） | `number` | `0` |
| `behavior` | 滚动行为 | `"smooth" \| "instant" \| "auto"` | `"smooth"` |
| `block` | 垂直对齐策略 | `"start" \| "center" \| "end" \| "nearest"` | `"start"` |
| `inline` | 水平对齐策略 | `"start" \| "center" \| "end" \| "nearest"` | `"nearest"` |
| `onNavigate` | 每次触发跳转后的回调 | `(id: string) => void` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `...rest` | 原生属性透传（取决于 `hash/component`） | `React.ComponentPropsWithoutRef<T>` | - |

## 行为规则 / 优先级

- 导航组件应让当前项、禁用项和跳转目标保持一致。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Anchor 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 当 `hash=true` 时，组件会统一通过脚本滚动，确保 `behavior/block/inline/offset` 行为一致。
- 当目标 id 不存在时，组件会安全返回，不会抛出异常。
- 在 SSR 环境下组件会自动跳过 `document/window` 访问。
