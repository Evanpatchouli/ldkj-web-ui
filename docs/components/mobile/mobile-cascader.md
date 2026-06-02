# MobileCascader

`MobileCascader` 是移动端级联抽屉，适合省市区、业务分类、组织层级等路径选择。它沿用 `Cascader` 的路径数组值模型，并在移动端抽屉内提供分级 tab 与确认提交。

## Basic

传入 `options` 后，点击触发器会从底部打开抽屉。`levelLabels` 可用于展示“省 / 市 / 区”这类固定层级标题。

<MobileCascaderBasicDemo />

## 常见场景

### 受控路径

使用 `value` / `onValueChange` 管理路径数组，适合和表单、筛选条件或地址回填联动。

<MobileCascaderControlledDemo />

### 选项水平对齐

`align` 控制抽屉列表内选项内容的水平对齐方式。业务分类、短文本枚举可使用 `center`，长地址文本建议使用默认 `left`。

<MobileCascaderControlledDemo />

## Usage

```tsx
import { MobileCascader } from "@ldkj/web-ui";

const areaOptions = [
  {
    label: "新疆维吾尔自治区",
    value: "xinjiang",
    children: [
      {
        label: "乌鲁木齐市",
        value: "urumqi",
        children: [
          { label: "天山区", value: "tianshan" },
          { label: "沙依巴克区", value: "shayibak" },
        ],
      },
    ],
  },
];

export function Example() {
  return (
    <MobileCascader
      options={areaOptions}
      defaultValue={["xinjiang", "urumqi", "shayibak"]}
      title="门店地区"
      placeholder="请选择门店地区"
      levelLabels={["省", "市", "区"]}
      clearable
    />
  );
}
```

## API

### MobileCascader

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 级联选项数据 | `CascaderOption[]` | `[]` |
| `value` | 受控路径值 | `string[]` | - |
| `defaultValue` | 非受控默认路径值 | `string[]` | `[]` |
| `onValueChange` | 确认或清空后的回调 | `(value, meta) => void` | - |
| `open` | 受控抽屉打开状态 | `boolean` | - |
| `defaultOpen` | 非受控默认打开状态 | `boolean` | `false` |
| `onOpenChange` | 打开状态变化回调 | `(open: boolean) => void` | - |
| `placeholder` | 未选择时的触发器文案 | `React.ReactNode` | `请选择` |
| `title` | 抽屉标题 | `React.ReactNode` | `请选择` |
| `cancelText` | 取消按钮文案 | `React.ReactNode` | `取消` |
| `confirmText` | 确认按钮文案 | `React.ReactNode` | `确定` |
| `separator` | 触发器路径分隔符 | `React.ReactNode` | `/` |
| `displayRender` | 自定义触发器显示内容 | `(labels, options) => React.ReactNode` | - |
| `renderOption` | 自定义选项内容 | `(option, state) => React.ReactNode` | - |
| `fieldNames` | 自定义数据字段名映射 | `CascaderFieldNames` | - |
| `changeOnSelect` | 是否允许确认中间层路径 | `boolean` | `false` |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` |
| `loadData` | 懒加载回调 | `(selectedOptions, meta) => void \| Promise<void>` | - |
| `align` | 选项内容水平对齐 | `"left" \| "center" \| "right"` | `left` |
| `levelLabels` | 每一层 tab 标题 | `React.ReactNode[]` | - |
| `name` | 表单字段名，提交 JSON 路径数组字符串 | `string` | - |
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

### CascaderOption

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 显示内容 | `React.ReactNode` |
| `value` | 节点值 | `string` |
| `children` | 子节点 | `CascaderOption[]` |
| `disabled` | 是否禁用 | `boolean` |
| `isLeaf` | 是否叶子节点；`false` 可配合 `loadData` 懒加载 | `boolean` |
| `loading` | 节点加载态 | `boolean` |

## 行为规则 / 优先级

- 选项点击只更新抽屉内临时路径，点击“确定”后才提交 `onValueChange`。
- `changeOnSelect=false` 时，有子级的中间层不能直接确认；需要选到叶子节点。设置为 `true` 后可确认任意已选层级。
- `displayRender` 优先于默认的 `separator` 拼接规则。
- `fieldNames` 会统一作用于 `label`、`value`、`children`、`disabled`、`isLeaf`、`loading` 的读取。
- `align` 只影响选项行内容对齐，不影响 tab、触发器和抽屉布局。

## Notes

- 表单提交时，`name` 对应隐藏字段写入路径数组 JSON 字符串，例如 `["xinjiang","urumqi"]`。
- 懒加载节点建议显式设置 `isLeaf: false`，并由外部 `options` 状态补齐 `children`。
- 长文本地址建议使用默认左对齐，短枚举或数字项可以使用 `center` 或 `right`。
