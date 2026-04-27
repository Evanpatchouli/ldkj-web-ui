# Grid

`Grid` 是弹性栅格容器，基于 12 列系统。

## Basic

通过 `container` + `size` 组织栅格项。

<GridBasicDemo />

## Spacing

支持 `spacing`，以及更细粒度的 `rowSpacing` / `columnSpacing`。

<GridSpacingDemo />

## Columns

通过 `columns` 调整总列数（默认 12）。

<GridColumnsDemo />

## Offset

支持 `offset` 控制起始偏移，支持数字和 `auto`。

<GridOffsetDemo />

## Grow

`size="grow"` 可让栅格项填充剩余空间。

<GridGrowDemo />

## Direction + Wrap

`direction` 支持 `row` / `row-reverse`，`wrap` 支持 `boolean` 或标准 `flexWrap` 值。

<GridDirectionWrapDemo />

## Nested Grid

支持在 `Grid` item 内继续作为 `container` 使用，构建复杂布局。

<GridNestedDemo />

## Dashboard Layout

仪表盘类布局示例（图表区 + 指标区 + 表格区）。

<GridDashboardDemo />

## Form / Detail Layout

表单与详情页常见布局示例。

<GridFormDetailDemo />

## Usage

```tsx
import { Grid } from "@ldkj/web-ui";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>Main</Grid>
      <Grid size={4}>Aside</Grid>
    </Grid>
  );
}
```

## API

`Grid` 继承 [Box](/components/layout/box) 的基础能力，支持 `component`、`class`、`loading`、`loadingContent`、`modal`、`modalContent`、`onModalMaskClick` 以及原生属性透传。

| 属性            | 说明                     | 类型                                         | 默认值   |
| --------------- | ------------------------ | -------------------------------------------- | -------- |
| `container`     | 是否作为栅格容器         | `boolean`                                    | `false`  |
| `size`          | 栅格项占列数或自适应增长 | `number \| 'grow'`                           | -        |
| `offset`        | 栅格项偏移列数或自动偏移 | `number \| 'auto'`                           | -        |
| `columns`       | 列总数（容器/上下文）    | `number`                                     | `12`     |
| `spacing`       | 行列统一间距             | `number \| string`                           | -        |
| `rowSpacing`    | 行间距                   | `number \| string`                           | -        |
| `columnSpacing` | 列间距                   | `number \| string`                           | -        |
| `wrap`          | 换行模式                 | `boolean \| React.CSSProperties['flexWrap']` | `'wrap'` |
| `direction`     | 主轴方向（容器）         | `'row' \| 'row-reverse'`                     | `'row'`  |
| `className`     | 追加类名                 | `string`                                     | -        |
| `style`         | 内联样式                 | `React.CSSProperties`                        | -        |
| `sx`            | CSS-in-JS 样式入口       | `SxProps`（支持对象/数组/函数，支持伪类、选择器、媒体查询） | - |
| `children`      | 内容                     | `React.ReactNode`                            | -        |
