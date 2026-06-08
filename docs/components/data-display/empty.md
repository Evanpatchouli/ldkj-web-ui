# Empty

`Empty` 用于表达当前区域暂无内容，适合查询无结果、列表为空、权限空态等场景。  
组件基于 [Box](/components/layout/box)，因此可直接使用 `sx`、`rounded`、`shadow`、`loading`、`modal` 等能力。

## Basic

<EmptyBasicDemo />

## Custom Image

通过 `image` 替换默认插图，可传入图标、图片或任意 React 节点。
<EmptyImageDemo />

## With Action

通过 `children` 放置动作按钮或引导入口。
<EmptyActionDemo />

## Box Ability

`Empty` 继承 `Box` 的容器能力，可直接配置圆角、阴影和样式系统。
<EmptyBoxDemo />

## 常见场景

### 基础展示

用于页面主体、列表项或卡片中直接展示 Empty 的默认形态。

### 状态与数据驱动

当内容来自接口或业务状态时，优先把状态转换为组件 props，再交给 Empty 渲染。

### 样式组合

需要贴近业务页面时，通过 `className`、`class`、`style` 或 `sx` 做局部覆盖。

## Usage

```tsx
import { Empty, Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Empty
      description="暂无收藏内容"
      image={<div className="text-4xl">☆</div>}
      rounded="lg"
      sx={{ border: "1px dashed #cbd5e1", minHeight: 220 }}
    >
      <Button size="sm">去浏览</Button>
    </Empty>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 空状态描述内容 | `React.ReactNode` | `"暂无数据"` |
| `image` | 空状态插图 | `React.ReactNode` | 内置图形 |
| `children` | 额外内容（常用于按钮） | `React.ReactNode` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `rounded` | 圆角（继承 Box） | `Rounded` | - |
| `shadow` | 阴影（继承 Box） | `Shadow` | - |
| `loading` | 是否显示元素级 loading 遮罩 | `boolean` | `false` |
| `modal` | 是否显示元素级 modal 遮罩 | `boolean` | `false` |
| `...rest` | 其他透传属性 | `BoxProps<"div">` | - |

## 行为规则

1. `description` 和 `image` 都支持 React 节点。  
2. `children` 始终渲染在描述区之后。  
3. 组件不提供 `actions` 数组配置，动作区由业务层自定义。

## 行为规则 / 优先级

- 数据展示组件只负责渲染当前输入，不在内部请求数据。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Empty 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes
- 建议为空态区域设置最小高度，避免页面跳动。  
- 空态引导区建议保留一个主动作按钮。  
- 若页面同时有“加载态 + 空态”，建议由外层状态统一控制。

## Notes

- `sx` 作用于外层容器，`image` 节点样式请在 `image` 内部控制。  
- 默认布局为纵向居中并包含基础留白。
