# Flex

`Flex` 是用于对齐的弹性布局容器。

## Direction / Justify / Items

通过 `direction`、`justify`、`items` 控制主轴方向和对齐方式。

<FlexDirectionDemo />

## Wrap + Gap

通过 `wrap` 控制是否换行；`gap` 默认 `md`，支持 `xs | sm | md | lg | xl | number | string`。

<FlexGapWrapDemo />

## Width + Height

`width` 与 `height` 支持 `number | string`，数字会自动转成 `px`。

<FlexSizeDemo />

## Basic

最小用法展示 Flex 的默认形态。优先从 Basic 示例开始，再按业务场景叠加状态、样式和交互。

<FlexDirectionDemo />

## 常见场景

### 基础布局

用于组织页面结构、控制间距、对齐和响应式布局。

### 组合嵌套

复杂页面推荐拆成多个 Flex 组合，避免在单个容器中堆叠过多职责。

### 响应式适配

可通过尺寸、间距、`className` 或 `sx` 处理不同屏幕下的布局变化。

## Usage

```tsx
import { Flex } from "@ldkj/web-ui";

export function Example() {
  return (
    <Flex direction="row" justify="space-between" items="center" gap="md">
      <div>Left</div>
      <div>Right</div>
    </Flex>
  );
}
```

## API

`Flex` 继承 [Box](/components/layout/box) 的基础能力，支持 `component`、`class`、`loading`、`loadingContent`、`modal`、`modalContent`、`onModalMaskClick` 以及原生属性透传。

| 属性        | 说明                          | 类型                                                       | 默认值     |
| ----------- | ----------------------------- | ---------------------------------------------------------- | ---------- |
| `direction` | 主轴方向（`flex-direction`）  | `'row' \| 'row-reverse' \| 'col' \| 'col-reverse'`         | `'row'`    |
| `justify`   | 主轴对齐（`justify-content`） | `React.CSSProperties['justifyContent']`                    | -          |
| `items`     | 交叉轴对齐（`align-items`）   | `React.CSSProperties['alignItems']`                        | -          |
| `flex`      | `flex` 简写属性               | `React.CSSProperties['flex']`                              | -          |
| `wrap`      | 是否换行（`flex-wrap`）       | `boolean \| React.CSSProperties['flexWrap']`               | `'nowrap'` |
| `gap`       | 间距                          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'`     |
| `width`     | 宽度                          | `number \| string`                                         | -          |
| `height`    | 高度                          | `number \| string`                                         | -          |
| `className` | 追加类名                      | `string`                                                   | -          |
| `style`     | 内联样式                      | `React.CSSProperties`                                      | -          |
| `sx`        | CSS-in-JS 样式入口            | `SxProps`（支持对象/数组/函数，支持伪类、选择器、媒体查询） | -          |
| `children`  | 内容                          | `React.ReactNode`                                          | -          |

## 行为规则 / 优先级

- 布局组件只处理结构、尺寸和对齐，不承载业务状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Flex 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 布局层尽量保持语义清晰，避免把业务点击行为隐藏在纯布局组件里。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
