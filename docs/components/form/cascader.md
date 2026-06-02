# Cascader

`Cascader` 是多级联动选择器，适合省市区、组织层级、类目路径、区域树等“先选父级，再选子级”的场景。  
组件默认以“路径数组”作为值模型，内置受控/非受控、清除、懒加载、`changeOnSelect`、自定义选项渲染与可访问性支持。

## Basic

最小用法只需要传入 `options`。`value` 的形态是路径数组，例如 `["zhejiang", "hangzhou"]`。

<CascaderDemo />

## 常见场景

### 受控路径

当业务需要联动表单、回填草稿或在提交前统一校验时，使用 `value` / `onValueChange` 管理路径数组。

<CascaderControlledDemo />

### 选中即提交中间层

开启 `changeOnSelect` 后，选择非叶子节点也会立即提交当前路径，适合“选到某一层就足够”的场景。

<CascaderAdvancedDemo />

### 懒加载与自定义渲染

`loadData` 用于按需加载子节点，`renderOption` 和 `displayRender` 可分别控制面板行与触发器文本。

<CascaderAdvancedDemo />

## Usage

### 基础用法

```tsx
import { Cascader } from "@ldkj/web-ui";

const options = [
  {
    label: "浙江",
    value: "zhejiang",
    children: [
      { label: "杭州", value: "hangzhou" },
      { label: "宁波", value: "ningbo" },
    ],
  },
  {
    label: "江苏",
    value: "jiangsu",
    children: [
      { label: "南京", value: "nanjing" },
      { label: "苏州", value: "suzhou" },
    ],
  },
];

export function Example() {
  return (
    <Cascader
      options={options}
      placeholder="请选择地区"
      clearable
    />
  );
}
```

### 受控用法

```tsx
import * as React from "react";
import { Cascader } from "@ldkj/web-ui";

export function ControlledExample() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Cascader
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="请选择组织路径"
      clearable
    />
  );
}
```

### 懒加载用法

```tsx
import * as React from "react";
import { Cascader, type CascaderOption } from "@ldkj/web-ui";

export function LazyExample() {
  const [options, setOptions] = React.useState<CascaderOption[]>([
    { label: "亚洲", value: "asia", isLeaf: false },
    { label: "欧洲", value: "europe", isLeaf: false },
  ]);

  const loadData = async (selectedOptions: CascaderOption[]) => {
    const target = selectedOptions[selectedOptions.length - 1];
    if (!target?.value) return;

    const children =
      target.value === "asia"
        ? [
            { label: "中国", value: "china" },
            { label: "日本", value: "japan" },
          ]
        : [
            { label: "法国", value: "france" },
            { label: "德国", value: "germany" },
          ];

    setOptions((current) =>
      current.map((item) =>
        item.value === target.value ? { ...item, children } : item,
      ),
    );
  };

  return <Cascader options={options} loadData={loadData} placeholder="点击加载" />;
}
```

## API

### Cascader

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 级联选项数据 | `CascaderOption[]` | `[]` |
| `value` | 受控路径值 | `string[]` | - |
| `defaultValue` | 非受控初始路径值 | `string[]` | `[]` |
| `onValueChange` | 路径变化回调 | `(value: string[], meta: CascaderValueChangeMeta) => void` | - |
| `open` | 受控展开状态 | `boolean` | - |
| `defaultOpen` | 非受控初始展开状态 | `boolean` | `false` |
| `onOpenChange` | 展开状态变化回调 | `(open: boolean) => void` | - |
| `placeholder` | 未选择时的占位文案 | `React.ReactNode` | `请选择` |
| `separator` | 默认路径分隔符 | `React.ReactNode` | `/` |
| `displayRender` | 自定义触发器显示内容 | `(labels, options) => React.ReactNode` | - |
| `renderOption` | 自定义面板选项渲染 | `(option, state) => React.ReactNode` | - |
| `fieldNames` | 自定义数据字段名映射 | `CascaderFieldNames` | - |
| `changeOnSelect` | 选择中间层时是否立即提交 | `boolean` | `false` |
| `expandTrigger` | 展开触发方式 | `"click" \| "hover"` | `click` |
| `clearable` | 是否显示清除按钮 | `boolean` | `false` |
| `loadData` | 懒加载回调 | `(selectedOptions, meta) => void \| Promise<void>` | - |
| `contentWidth` | 弹层宽度 | `number \| string` | `"auto"` |
| `maxPanelHeight` | 弹层最大高度 | `number \| string` | `336` |
| `side` | 弹层方向 | `PopoverContentProps["side"]` | `bottom` |
| `align` | 弹层对齐方式 | `PopoverContentProps["align"]` | `start` |
| `sideOffset` | 弹层偏移 | `number` | `8` |
| `name` | 表单字段名。提交时会写入路径数组的 JSON 字符串 | `string` | - |
| `required` | 是否必填 | `boolean` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读。允许查看，但禁止改值 | `boolean` | `false` |
| `className` / `class` | 触发器样式类名 | `string` | - |
| `style` | 触发器原生样式 | `React.CSSProperties` | - |
| `sx` | 触发器 `sx` 样式 | `SxProps` | - |
| `contentClassName` / `contentClass` | 弹层样式类名 | `string` | - |
| `contentStyle` | 弹层原生样式 | `React.CSSProperties` | - |
| `contentSx` | 弹层 `sx` 样式 | `SxProps` | - |
| `optionClassName` / `optionClass` | 选项样式类名 | `string` | - |
| `optionStyle` | 选项原生样式 | `React.CSSProperties` | - |
| `optionSx` | 选项 `sx` 样式 | `SxProps` | - |

### CascaderOption

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 显示文本 | `React.ReactNode` |
| `value` | 节点值 | `string` |
| `children` | 子节点 | `CascaderOption[]` |
| `disabled` | 是否禁用 | `boolean` |
| `isLeaf` | 是否叶子节点。`false` 时可作为懒加载节点 | `boolean` |
| `loading` | 节点加载态 | `boolean` |

### CascaderValueChangeMeta

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `reason` | 变更原因 | `"select" \| "clear"` |
| `path` | 解析后的路径 | `string[]` |
| `options` | 当前路径对应的选项对象 | `CascaderOption[]` |
| `option` | 本次触发的节点 | `CascaderOption \| undefined` |
| `labels` | 当前路径对应的展示文本 | `React.ReactNode[]` |
| `event` | 原始事件 | `React.SyntheticEvent \| undefined` |

### CascaderRef

| 方法 | 说明 |
| --- | --- |
| `focus()` | 聚焦触发器 |
| `blur()` | 取消聚焦 |
| `open()` | 打开面板 |
| `close()` | 关闭面板 |
| `clear()` | 清空当前路径 |
| `getValue()` | 获取当前路径数组 |

## 行为规则 / 优先级

- `displayRender` 优先于默认的 `separator` 拼接规则。
- `changeOnSelect` 优先于“仅叶子节点提交”的默认行为。
- `renderOption` 只改变面板行的视觉表现，不改变选择逻辑。
- `fieldNames` 会统一作用于 `label` / `value` / `children` / `disabled` / `isLeaf` / `loading` 的读取。
- `loadData` 只负责异步补齐数据，真正的 children 仍建议由外部 `options` 状态驱动更新。
- `clearable` 只在当前路径非空时显示。
- `disabled` 会禁用整个控件；`readOnly` 允许查看和展开，但禁止改值与清空。

## Notes

- `value` 的推荐模型是“路径数组”，不要把它当成单个字符串使用。
- 如果 `label` 不是纯字符串，建议同时配合 `displayRender` 控制触发器文案。
- 懒加载节点建议显式设置 `isLeaf={false}`，这样组件会把它识别为可展开分支。
- 表单提交时，`name` 对应的隐藏字段会写入路径数组的 JSON 字符串，例如 `["zhejiang","hangzhou"]`。
- 交互上，触发器支持 `Enter` / `ArrowDown` 打开，`Escape` 关闭；面板内用 `Tab` 正常切换焦点。
- 如果你需要完全不同的渲染布局，优先用 `renderOption` 和 `displayRender`，不要直接改数据结构。
