# Table

`Table` 用于展示结构化数据。它是一个基于 `Box` 的数据容器，内部保留语义化表格结构，并支持 `sx`、选择、分页、空态和 loading。

## Basic

没有传入 `columns` 时，`Table` 会根据第一条数据自动生成列。

<TableBasicDemo />

## Render

通过 `columns.render` 可以自定义单元格内容。

<TableRenderDemo />

## Column

也可以使用 `Table.Column` 组合式声明列。未传入 `columns` 时，`Table` 会从 children 中提取 `Table.Column` 作为列配置。

<TableColumnDemo />

## Selection

`rowSelection` 支持受控选择、全选、半选和禁用行。

<TableSelectionDemo />

## Pagination

`pagination` 会使用本库 `Pagination` 渲染页码，并对 `dataSource` 做前端分页。

<TablePaginationDemo />

## States

`Table` 继承 `Box` 的 `loading` 能力，也支持自定义空态。

<TableStateDemo />

## SX Styling

`Table` 和列配置均支持 `sx`。

<TableSxDemo />

## 常见场景

### 基础展示

用于页面主体、列表项或卡片中直接展示 Table 的默认形态。

### 状态与数据驱动

当内容来自接口或业务状态时，优先把状态转换为组件 props，再交给 Table 渲染。

### 样式组合

需要贴近业务页面时，通过 `className`、`class`、`style` 或 `sx` 做局部覆盖。

## Usage

```tsx
import { Table, type TableColumn } from "@ldkj/web-ui";

type User = {
  id: number;
  name: string;
  role: string;
};

const columns: TableColumn<User>[] = [
  { dataIndex: "name", title: "姓名" },
  { dataIndex: "role", title: "角色" },
];

export function Example() {
  return <Table rowKey="id" columns={columns} dataSource={data} />;
}
```

组合式列：

```tsx
import { Table } from "@ldkj/web-ui";

export function ColumnExample() {
  return (
    <Table rowKey="id" dataSource={data}>
      <Table.Column dataIndex="name" title="姓名" />
      <Table.Column dataIndex="role" title="角色" />
    </Table>
  );
}
```

## API

### Table

| 属性           | 说明                         | 类型                                  | 默认值       |
| -------------- | ---------------------------- | ------------------------------------- | ------------ |
| `columns`      | 列配置                       | `TableColumn<T>[]`                    | 自动推导     |
| `dataSource`   | 数据源                       | `T[]`                                 | `[]`         |
| `rowKey`       | 行 key                       | `keyof T \| (record, index) => Key`   | `"id"`       |
| `size`         | 单元格尺寸                   | `"sm" \| "md" \| "lg"`               | `"md"`       |
| `variant`      | 容器样式                     | `"outlined" \| "filled" \| "ghost"` | `"outlined"` |
| `striped`      | 是否显示斑马纹               | `boolean`                             | `false`      |
| `bordered`     | 是否显示列分割线             | `boolean`                             | `false`      |
| `hoverable`    | 是否显示行 hover 效果        | `boolean`                             | `true`       |
| `stickyHeader` | 表头是否吸顶                 | `boolean`                             | `false`      |
| `loading`      | 加载态                       | `boolean`                             | `false`      |
| `empty`        | 空态内容                     | `React.ReactNode`                     | `"暂无数据"` |
| `caption`      | 表格标题                     | `React.ReactNode`                     | -            |
| `indexColumn`  | 是否展示序号列               | `boolean \| { title; width }`         | `false`      |
| `rowSelection` | 行选择配置                   | `TableRowSelection<T>`                | -            |
| `pagination`   | 分页配置，传 `false` 可关闭  | `false \| TablePaginationConfig`      | -            |
| `tableProps`   | 透传给内部 table             | `BoxProps<"table">`                   | -            |
| `headProps`    | 透传给内部 thead             | `BoxProps<"thead">`                   | -            |
| `bodyProps`    | 透传给内部 tbody             | `BoxProps<"tbody">`                   | -            |
| `rowProps`     | 行属性或行属性生成函数       | `BoxProps<"tr"> \| (record) => props` | -            |
| `sx`           | CSS-in-JS 样式入口           | `SxProps`                             | -            |
| `children`     | 可包含 `Table.Column` 或后置内容 | `React.ReactNode`                  | -            |

### TableColumn / Table.Column

| 属性              | 说明             | 类型                         | 默认值 |
| ----------------- | ---------------- | ---------------------------- | ------ |
| `key`             | 列 key           | `React.Key`                  | -      |
| `dataIndex`       | 数据字段         | `keyof T \| string`          | -      |
| `title`           | 表头内容         | `React.ReactNode`            | -      |
| `hidden`          | 是否隐藏列       | `boolean`                    | `false` |
| `width`           | 列宽             | `number \| string`           | -      |
| `align`           | 单元格对齐       | `"left" \| "center" \| "right"` | `"left"` |
| `headerAlign`     | 表头对齐         | `"left" \| "center" \| "right"` | 跟随 `align` |
| `className`       | 单元格类名       | `string`                     | -      |
| `headerClassName` | 表头类名         | `string`                     | -      |
| `sx`              | 单元格样式       | `SxProps`                    | -      |
| `headerSx`        | 表头样式         | `SxProps`                    | -      |
| `render`          | 自定义渲染       | `(value, record, index) => ReactNode` | - |

### TableRowSelection

| 属性                     | 说明             | 类型                         | 默认值 |
| ------------------------ | ---------------- | ---------------------------- | ------ |
| `selectedRowKeys`        | 受控选中行       | `React.Key[]`                | -      |
| `defaultSelectedRowKeys` | 默认选中行       | `React.Key[]`                | `[]`   |
| `onChange`               | 选择变化回调     | `(keys, rows) => void`       | -      |
| `getCheckboxProps`       | 获取复选框属性   | `(record, index) => props`   | -      |

### TablePaginationConfig

| 属性           | 说明             | 类型                              | 默认值 |
| -------------- | ---------------- | --------------------------------- | ------ |
| `page`         | 当前页           | `number`                          | -      |
| `defaultPage`  | 默认当前页       | `number`                          | `1`    |
| `pageSize`     | 每页条数         | `number`                          | 数据总数 |
| `total`        | 总条数           | `number`                          | `dataSource.length` |
| `onPageChange` | 页码变化回调     | `(page, pageSize) => void`        | -      |
| `position`     | 分页位置         | `"left" \| "center" \| "right"`   | `"right"` |

## 行为规则 / 优先级

- 数据展示组件只负责渲染当前输入，不在内部请求数据。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Table 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `Table` 适合轻量数据展示；复杂表格能力由 `DataGrid` 承担。
- 分页目前基于 `dataSource` 做前端分页；服务端分页可以通过受控 `pagination.page` 与外部数据请求组合。
- `rowKey` 建议显式传入稳定字段。
