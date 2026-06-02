# MobileSelect

`MobileSelect` 是移动端单选抽屉。它复用 `SelectOption` / `SelectOptionGroup` 数据结构，点击触发器后从底部打开抽屉，用户选择候选项后点击“确定”提交。

## Basic

最小用法只需要传入 `options`。`value` 与 `defaultValue` 使用单个字符串，和桌面 `Select` 保持一致。

<MobileSelectBasicDemo />

## 常见场景

### 选项水平对齐

`align` 控制抽屉内选项内容的水平对齐方式，支持 `left`、`center`、`right`。

<MobileSelectAlignDemo />

### 分组选项

移动端选项同样支持 `SelectOptionGroup`。分组标题会渲染为弱化文本，`separator` 会在分组之间增加分割线。

<MobileSelectAlignDemo />

## Usage

```tsx
import { MobileSelect } from "@ldkj/web-ui";

const options = [
  { label: "标准洗车", value: "wash" },
  { label: "精致美容", value: "beauty" },
  { label: "轮胎养护", value: "tire" },
];

export function Example() {
  return (
    <MobileSelect
      options={options}
      defaultValue="beauty"
      title="选择服务"
      placeholder="请选择服务项目"
      clearable
    />
  );
}
```

## API

### MobileSelect

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 选项或分组选项列表 | `(SelectOption \| SelectOptionGroup)[]` | `[]` |
| `value` | 受控值 | `string` | - |
| `defaultValue` | 非受控默认值 | `string` | `""` |
| `onValueChange` | 确认或清空后的回调 | `(value, meta) => void` | - |
| `open` | 受控抽屉打开状态 | `boolean` | - |
| `defaultOpen` | 非受控默认打开状态 | `boolean` | `false` |
| `onOpenChange` | 打开状态变化回调 | `(open: boolean) => void` | - |
| `placeholder` | 未选择时的触发器文案 | `React.ReactNode` | `请选择` |
| `title` | 抽屉标题 | `React.ReactNode` | `请选择` |
| `cancelText` | 取消按钮文案 | `React.ReactNode` | `取消` |
| `confirmText` | 确认按钮文案 | `React.ReactNode` | `确定` |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` |
| `align` | 选项内容水平对齐 | `"left" \| "center" \| "right"` | `left` |
| `displayRender` | 自定义触发器显示内容 | `(option) => React.ReactNode` | - |
| `renderOption` | 自定义选项内容 | `(option, state) => React.ReactNode` | - |
| `name` | 表单字段名 | `string` | - |
| `required` | 是否必填 | `boolean` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `className` / `class` | 触发器类名 | `string` | - |
| `style` | 触发器原生样式 | `React.CSSProperties` | - |
| `sx` | 触发器 `sx` 样式 | `SxProps` | - |
| `drawerClassName` / `drawerClass` | 抽屉类名 | `string` | - |
| `drawerStyle` | 抽屉原生样式 | `React.CSSProperties` | - |
| `drawerSx` | 抽屉 `sx` 样式 | `SxProps` | - |
| `maxDrawerHeight` | 抽屉最大高度 | `number \| string` | `76vh` |
| `optionClassName` / `optionClass` | 选项类名 | `string` | - |
| `optionStyle` | 选项原生样式 | `React.CSSProperties` | - |
| `optionSx` | 选项 `sx` 样式 | `SxProps` | - |

### MobileSelectValueChangeMeta

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `reason` | 变更原因 | `"select" \| "clear"` |
| `option` | 当前确认的选项 | `SelectOption \| undefined` |
| `event` | 清空时的原始事件 | `React.SyntheticEvent \| undefined` |

## 行为规则 / 优先级

- 用户点击选项时只更新抽屉内的临时值，点击“确定”后才触发 `onValueChange`。
- 点击“取消”或遮罩会关闭抽屉，并丢弃本次未确认的临时选择。
- `displayRender` 优先于默认的 `option.label` 触发器显示。
- `disabled` 会禁用触发器；`readOnly` 允许查看当前值，但不会提交或清空新值。

## Notes

- `MobileSelect` 适合移动端页面、H5 内嵌页和窄屏表单；桌面优先场景仍建议使用 `Select`。
- `align` 只影响抽屉内选项内容，不影响触发器文案和抽屉本身的位置。
- 表单提交时，`name` 对应的隐藏字段值是当前选中字符串。
