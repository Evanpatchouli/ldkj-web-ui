# Header

`Header` 是基于 [Box](/components/layout/box) 的页面顶部布局组件，用于组织品牌区、导航区、操作区和顶部安全区。它只负责页头结构和定位，不负责路由跳转、菜单展开或导航状态管理。

## Basic

最小可用页头通常由 `brand`、`nav` 和 `actions` 组成。

<HeaderBasicDemo />

## 常见场景

### 品牌 + 导航 + 操作区

通过 `start`、`brand`、`nav`、`actions`、`end` 可以覆盖大部分后台、门户和业务系统页头。

<HeaderSlotsDemo />

### 吸顶页头

`sticky` 适合滚动容器内的固定表头或局部工作台页头；如果需要固定在视口顶部，使用 `fixed`。

<HeaderStickyDemo />

### 移动端与安全区

移动端通常隐藏完整导航，只保留菜单入口和关键操作。`safeArea` 会在顶部补齐 `env(safe-area-inset-top)`。

<HeaderResponsiveDemo />

### 组合式写法

复杂页头可以使用 `Header.Brand`、`Header.Nav`、`Header.Actions` 等子组件按顺序组合。

<HeaderCompoundDemo />

## Usage

```tsx
import { Button, Header, Icon } from "@ldkj/web-ui";

export function Example() {
  return (
    <Header
      sticky
      size="md"
      variant="default"
      maxWidth={1200}
      brand={<span className="font-semibold">控制台</span>}
      nav={
        <>
          <a href="/dashboard">概览</a>
          <a href="/projects">项目</a>
        </>
      }
      actions={
        <Button type="button" variant="ghost" size="icon" aria-label="搜索">
          <Icon name="search" size={18} />
        </Button>
      }
    />
  );
}
```

## API

`Header` 继承 [Box](/components/layout/box) 的基础能力，支持 `component`、`rounded`、`shadow`、`loading`、`modal`、`sx` 以及原生属性透传。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 视觉变体 | `'default' \| 'transparent' \| 'solid' \| 'subtle'` | `'default'` |
| `size` | 页头高度密度 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `maxWidth` | 内层内容最大宽度，数字会转为 `px` | `number \| string` | `1200` |
| `fluid` | 内层内容是否铺满容器 | `boolean` | `false` |
| `bordered` | 是否显示底部分割线 | `boolean` | `true` |
| `sticky` | 是否使用 `position: sticky; top: 0` | `boolean` | `false` |
| `fixed` | 是否使用 `position: fixed; top: 0` | `boolean` | `false` |
| `safeArea` | 是否补齐顶部安全区 | `boolean` | `false` |
| `gap` | 插槽间距 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `start` | 起始操作区，通常放菜单按钮 | `React.ReactNode` | - |
| `brand` | 品牌区 | `React.ReactNode` | - |
| `nav` | 导航区 | `React.ReactNode` | - |
| `actions` | 操作区 | `React.ReactNode` | - |
| `end` | 末尾补充区 | `React.ReactNode` | - |
| `children` | 中间内容区；使用组合式子组件时按原顺序渲染 | `React.ReactNode` | - |
| `startProps` | 起始操作区 Box 属性 | `HeaderSlotProps` | - |
| `brandProps` | 品牌区 Box 属性 | `HeaderSlotProps` | - |
| `navProps` | 导航区 Box 属性 | `HeaderSlotProps` | - |
| `actionsProps` | 操作区 Box 属性 | `HeaderSlotProps` | - |
| `endProps` | 末尾补充区 Box 属性 | `HeaderSlotProps` | - |
| `contentProps` | 中间内容区 Box 属性 | `HeaderSlotProps` | - |

## Compound API

| 子组件 | 说明 |
| --- | --- |
| `Header.Brand` | 品牌区 |
| `Header.Nav` | 导航区，默认渲染为 `nav` |
| `Header.Actions` | 操作区 |
| `Header.Start` | 起始操作区 |
| `Header.End` | 末尾补充区 |
| `Header.Content` | 中间内容区 |

## 行为规则 / 优先级

- Header 只负责页头布局、视觉密度和定位，不处理导航选中态、折叠菜单状态或路由跳转。
- `fixed` 与 `sticky` 同时传入时，`fixed` 优先；固定页头会脱离文档流，业务侧需要自行给页面内容留出顶部空间。
- `fluid` 为 `true` 时忽略 `maxWidth`，内层内容随容器宽度铺满。
- props 插槽按 `start -> brand -> nav -> children -> actions -> end` 渲染；一旦 children 中包含 `Header.Brand` 等组合式子组件，则按 children 原顺序渲染。
- `Header.Nav` 默认在小屏隐藏，适合配合 `start` 放菜单按钮；需要移动端显示时可通过 `navProps.className` 或组合式写法覆盖。

## Notes

- 顶部导航的选中态建议交给后续 `Navigator`、`Menu` 或业务路由状态处理。
- `safeArea` 只处理顶部安全区；底部手势区域请使用 [SafeArea](/components/layout/safe-area)。
- 操作按钮应提供清晰的 `aria-label`，特别是只有图标的按钮。
- 长品牌名或长导航项需要业务侧结合 `truncate`、换行或响应式隐藏策略处理。
