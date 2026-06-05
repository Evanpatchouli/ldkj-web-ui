# Select

`Select` 用于在有限候选项中选择单个值。组件基于 Radix Select 封装，保留组合式 API，并统一支持 `className`、`class`、`style` 与本库 `sx` 样式系统。

## Basic

最小用法由 `Select`、`SelectTrigger`、`SelectValue`、`SelectContent` 和选项组成。常规业务表单推荐使用 `SelectItems` 从配置生成选项，便于复用选项数据和禁用状态。

<SelectBasicDemo />

## 常见场景

### 受控选择

当选中值需要驱动筛选、查询或联动表单时，使用 `value` 与 `onValueChange` 管理状态。`SelectValue` 只负责显示当前选项或占位文案，不接管业务状态。

<SelectControlledDemo />

### 分组与分隔线

复杂选项可以直接使用组合式 API。`SelectGroup` 管理语义分组，`SelectLabel` 渲染不可选择的分组标题，`SelectSeparator` 用于分隔选项区域。

<SelectGroupedDemo />

### 禁用与样式

`Select disabled` 会禁用整组选择；单个选项的禁用状态通过 `SelectItem disabled` 或 `SelectOption.disabled` 设置。根组件以外的触发器、弹层、选项、分组标题、分隔线和滚动按钮都支持 `sx`。

<SelectDisabledSxDemo />

### 页面滚动策略

`Select` 默认允许页面在弹层打开时继续滚动，适合筛选栏、详情页表单和长页面中的内联选择。需要恢复打开弹层时锁定页面滚动的行为时，设置 `lockScroll`。

<SelectScrollBehaviorDemo />

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
  { label: "全部状态", value: "all" },
  { label: "待处理", value: "pending" },
  { label: "处理中", value: "processing" },
  { label: "已完成", value: "done" },
];

export function Example() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-64" aria-label="订单状态">
        <SelectValue placeholder="请选择订单状态" />
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
    <Select defaultValue="wechat">
      <SelectTrigger className="w-72" aria-label="通知渠道">
        <SelectValue placeholder="请选择通知渠道" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>即时通知</SelectLabel>
          <SelectItem value="sms">短信</SelectItem>
          <SelectItem value="wechat">企业微信</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>异步通知</SelectLabel>
          <SelectItem value="email">邮件</SelectItem>
          <SelectItem value="message">站内信</SelectItem>
        </SelectGroup>
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
- `SelectProps`（类型）

### Select

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控值 | `string` | - |
| `defaultValue` | 默认值 | `string` | - |
| `onValueChange` | 值变化回调 | `(value: string) => void` | - |
| `open` | 受控打开状态 | `boolean` | - |
| `defaultOpen` | 默认打开状态 | `boolean` | `false` |
| `onOpenChange` | 打开状态变化回调 | `(open: boolean) => void` | - |
| `disabled` | 是否禁用整组 | `boolean` | `false` |
| `name` | 表单字段名 | `string` | - |
| `required` | 是否必填 | `boolean` | `false` |
| `dir` | 文本方向 | `"ltr" \| "rtl"` | - |
| `lockScroll` | 弹层打开时是否锁定页面滚动 | `boolean` | `false` |

其余属性继承 Radix `Select.Root`。

### SelectTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 触发器内容 | `React.ReactNode` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性继承 Radix `Select.Trigger`。

### SelectContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `position` | Radix 定位模式 | `"item-aligned" \| "popper"` | `"popper"` |
| `side` | 弹层方向 | `"top" \| "right" \| "bottom" \| "left"` | - |
| `align` | 弹层对齐 | `"start" \| "center" \| "end"` | - |
| `sideOffset` | 弹层与触发器间距 | `number` | - |
| `collisionPadding` | 碰撞检测边距 | `number \| { top?: number; right?: number; bottom?: number; left?: number }` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

其余属性继承 Radix `Select.Content`。

### SelectItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选项值，必须是非空字符串 | `string` | - |
| `disabled` | 是否禁用该选项 | `boolean` | `false` |
| `textValue` | 文本值，用于键盘搜索和无障碍读法 | `string` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

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

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 选项或分组选项列表 | `(SelectOption \| SelectOptionGroup)[]` | - |
| `itemProps` | 透传给每个 `SelectItem` | `SelectItemProps` | - |
| `labelProps` | 透传给每个 `SelectLabel` | `SelectLabelProps` | - |
| `separatorProps` | 透传给分组分隔线 | `SelectSeparatorProps` | - |

### SelectOption

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 选项显示内容 | `React.ReactNode` | - |
| `value` | 选项值 | `string` | - |
| `disabled` | 是否禁用该选项 | `boolean` | `false` |
| `textValue` | 文本值，用于键盘搜索和无障碍读法 | `string` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

### SelectOptionGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 分组标题 | `React.ReactNode` | - |
| `options` | 分组选项 | `SelectOption[]` | - |
| `separator` | 分组末尾是否渲染分隔线 | `boolean` | `false` |

## 行为规则 / 优先级

1. 值状态遵循 React 常规受控规则：传入 `value` 时由外部状态决定当前值；未传入 `value` 时使用内部状态，并可通过 `defaultValue` 设置初始值。
2. 打开状态同样支持受控和非受控：`open` 优先于内部打开状态；`defaultOpen` 只作为非受控初始值。
3. `SelectItems` 只是渲染工具，不会接管 `Select` 的值状态、打开状态或表单提交行为。
4. `SelectOption` 上的 `className`、`class`、`style`、`sx` 会与 `itemProps` 合并；单个选项的样式在合并时靠后，适合覆盖通用项样式。
5. `lockScroll=false` 时，弹层打开后页面仍可滚动；`lockScroll=true` 时保留 Radix Select 的滚动锁定行为。
6. `SelectContent` 默认通过 Portal 渲染到页面末端，并使用 `position="popper"` 按触发器宽度设置最小宽度。

## Notes

- `SelectItem` 必须提供非空字符串 `value`。清空或占位状态应通过业务状态和 `SelectValue placeholder` 表达。
- `SelectValue`、`SelectGroup` 等子组件保留 Radix 原始语义，可与 `SelectItems` 混用。
- 触发器需要可访问名称。没有可见表单标签时，应给 `SelectTrigger` 设置 `aria-label`。
- 自定义复杂选项时建议提供 `textValue`，保证键盘搜索和读屏文本稳定。
- 长列表会在内容区域内滚动，并按需显示 `SelectScrollUpButton` / `SelectScrollDownButton`。
- 选项数量很多、需要远程搜索或自由输入时，优先使用 `AutoComplete`，不要把大量动态结果塞进 `Select`。
- 弹层样式请优先加在 `SelectContent` 上；触发器样式请加在 `SelectTrigger` 上，避免根组件承担视觉样式。
