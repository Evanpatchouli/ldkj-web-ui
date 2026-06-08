# Row / Col

`Row` / `Col` 是基于 `Grid` 的语法糖，适合团队习惯 24 栅格写法的场景。

## Basic

<RowColBasicDemo />

## Gutter

`gutter` 支持单值（行列统一）和二元组（`[row, column]`）。

<RowColGutterDemo />

## Align + Justify

`Row` 支持 `align` 和 `justify` 直接控制交叉轴与主轴对齐。

<RowColAlignDemo />

## 常见场景

### 基础布局

用于组织页面结构、控制间距、对齐和响应式布局。

### 组合嵌套

复杂页面推荐拆成多个 Row / Col 组合，避免在单个容器中堆叠过多职责。

### 响应式适配

可通过尺寸、间距、`className` 或 `sx` 处理不同屏幕下的布局变化。

## Usage

```tsx
import { Row, Col } from "@ldkj/web-ui";

export function Example() {
  return (
    <Row gutter={[1, 2]} align="center" justify="space-between">
      <Col span={8}>Left</Col>
      <Col span={8}>Center</Col>
      <Col span={8}>Right</Col>
    </Row>
  );
}
```

## API

### Row

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `gutter` | 间距，支持单值和二元组 | `GridSpacing \| [GridSpacing, GridSpacing]` | `0` |
| `align` | 交叉轴对齐 | `React.CSSProperties["alignItems"]` | - |
| `justify` | 主轴对齐 | `React.CSSProperties["justifyContent"]` | - |
| `wrap` | 换行模式 | `boolean \| React.CSSProperties["flexWrap"]` | `"wrap"` |
| `direction` | 主轴方向 | `"row" \| "row-reverse"` | `"row"` |
| `...rest` | 透传到 `Grid container` | `Omit<GridProps, "container" \| "spacing" \| "rowSpacing" \| "columnSpacing">` | - |

### Col

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `span` | 占用列数或自适应增长 | `number \| "grow"` | - |
| `offset` | 偏移列数或自动偏移 | `number \| "auto"` | - |
| `flex` | flex 缩写 | `React.CSSProperties["flex"]` | - |
| `...rest` | 透传到 `Grid item` | `Omit<GridProps, "container" \| "size">` | - |

## 行为规则 / 优先级

- 布局组件只处理结构、尺寸和对齐，不承载业务状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Row / Col 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 布局层尽量保持语义清晰，避免把业务点击行为隐藏在纯布局组件里。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
