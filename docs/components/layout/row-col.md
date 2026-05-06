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
