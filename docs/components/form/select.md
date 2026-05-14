# Select

`Select` 用于从一组选项中选择单个值。组件基于 Radix Select 实现，保留组合式 API，并支持 `className`、`class`、`style` 与本库 `sx` 样式系统。

## Basic

可以使用 `SelectItems` 根据配置快速渲染选项。

<SelectBasicDemo />

## Controlled

通过 `value` 和 `onValueChange` 管理受控值。

<SelectControlledDemo />

## Grouped

需要更复杂的分组、分隔线或自定义选项结构时，可以直接使用 Radix compound API。

<SelectGroupedDemo />

## Disabled / SX

`SelectTrigger`、`SelectContent`、`SelectItem`、`SelectLabel`、`SelectSeparator` 和滚动按钮均支持 `sx`。根组件可使用 Radix 原生的 `disabled` 禁用整组。

<SelectDisabledSxDemo />

## Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise", disabled: true },
];

export function Example() {
  return (
    <Select defaultValue="pro">
      <SelectTrigger>
        <SelectValue placeholder="请选择版本" />
      </SelectTrigger>
      <SelectContent>
        <SelectItems options={options} />
      </SelectContent>
    </Select>
  );
}
```

组合式用法：

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

export function ComposeExample() {
  return (
    <Select defaultValue="week">
      <SelectTrigger>
        <SelectValue placeholder="请选择周期" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>常用</SelectLabel>
          <SelectItem value="day">按日</SelectItem>
          <SelectItem value="week">按周</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="month">按月</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## API

### Exports

- `Select`
- `SelectGroup`
- `SelectValue`
- `SelectTrigger`
- `SelectContent`
- `SelectLabel`
- `SelectItem`
- `SelectSeparator`
- `SelectScrollUpButton`
- `SelectScrollDownButton`
- `SelectItems`
- `SelectOption`（类型）
- `SelectOptionGroup`（类型）

### Select

| 属性            | 说明         | 类型                      | 默认值 |
| --------------- | ------------ | ------------------------- | ------ |
| `value`         | 受控值       | `string`                  | -      |
| `defaultValue`  | 默认值       | `string`                  | -      |
| `onValueChange` | 值变化回调   | `(value: string) => void` | -      |
| `disabled`      | 是否禁用整组 | `boolean`                 | `false` |
| `name`          | 表单字段名   | `string`                  | -      |
| `required`      | 是否必填     | `boolean`                 | `false` |

其余属性继承 Radix `Select.Root`。

### SelectTrigger

| 属性        | 说明               | 类型                  | 默认值 |
| ----------- | ------------------ | --------------------- | ------ |
| `children`  | 触发器内容         | `React.ReactNode`     | -      |
| `className` | 自定义类名         | `string`              | -      |
| `class`     | 类名别名           | `string`              | -      |
| `style`     | 原生样式           | `React.CSSProperties` | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -      |

其余属性继承 Radix `Select.Trigger`。

### SelectContent

| 属性        | 说明               | 类型                  | 默认值     |
| ----------- | ------------------ | --------------------- | ---------- |
| `position`  | Radix 定位模式     | `"item-aligned" \| "popper"` | `"popper"` |
| `side`      | 弹层方向           | `"top" \| "right" \| "bottom" \| "left"` | - |
| `align`     | 弹层对齐           | `"start" \| "center" \| "end"` | - |
| `className` | 自定义类名         | `string`              | -          |
| `class`     | 类名别名           | `string`              | -          |
| `style`     | 原生样式           | `React.CSSProperties` | -          |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -          |

其余属性继承 Radix `Select.Content`。

### SelectItem

| 属性        | 说明               | 类型                  | 默认值 |
| ----------- | ------------------ | --------------------- | ------ |
| `value`     | 选项值             | `string`              | -      |
| `disabled`  | 是否禁用该选项     | `boolean`             | `false` |
| `textValue` | 文本值，用于搜索和无障碍 | `string`       | -      |
| `className` | 自定义类名         | `string`              | -      |
| `class`     | 类名别名           | `string`              | -      |
| `style`     | 原生样式           | `React.CSSProperties` | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -      |

其余属性继承 Radix `Select.Item`。

### SelectLabel

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 分组标题内容 | `React.ReactNode` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性继承 Radix `Select.Label`。

### SelectSeparator

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性继承 Radix `Select.Separator`。

### SelectScrollUpButton / SelectScrollDownButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性继承 Radix 对应滚动按钮组件属性。

### SelectGroup / SelectValue

- `SelectGroup` 继承 Radix `Select.Group`。
- `SelectValue` 继承 Radix `Select.Value`，常用属性包括 `placeholder`、`aria-label`。

### SelectItems

| 属性             | 说明                  | 类型                              | 默认值 |
| ---------------- | --------------------- | --------------------------------- | ------ |
| `options`        | 选项或分组选项列表    | `(SelectOption \| SelectOptionGroup)[]` | - |
| `itemProps`      | 透传给每个 `SelectItem` | `SelectItemProps`                 | -      |
| `labelProps`     | 透传给每个 `SelectLabel` | `SelectLabelProps`                | -      |
| `separatorProps` | 透传给分组分隔线      | `SelectSeparatorProps`            | -      |

### SelectOption

| 属性        | 说明               | 类型                  | 默认值 |
| ----------- | ------------------ | --------------------- | ------ |
| `label`     | 选项显示内容       | `React.ReactNode`     | -      |
| `value`     | 选项值             | `string`              | -      |
| `disabled`  | 是否禁用该选项     | `boolean`             | `false` |
| `textValue` | 文本值，用于搜索和无障碍 | `string`       | -      |
| `className` | 自定义类名         | `string`              | -      |
| `class`     | 类名别名           | `string`              | -      |
| `style`     | 原生样式           | `React.CSSProperties` | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`             | -      |

### SelectOptionGroup

| 属性        | 说明               | 类型             | 默认值 |
| ----------- | ------------------ | ---------------- | ------ |
| `label`     | 分组标题           | `React.ReactNode` | -     |
| `options`   | 分组选项           | `SelectOption[]` | -      |
| `separator` | 分组末尾是否渲染分隔线 | `boolean`    | `false` |

## Notes

- `SelectValue`、`SelectGroup` 等子组件保留 Radix 原始语义，可与 `SelectItems` 混用。
- `SelectItem` 必须提供非空字符串 `value`，占位文案应通过 `SelectValue placeholder` 设置。
- `SelectContent` 默认通过 Portal 渲染到页面末端，弹层样式请优先加在 `SelectContent` 上。
- `SelectItems` 是便捷渲染工具，不会接管 `Select` 的受控状态。
