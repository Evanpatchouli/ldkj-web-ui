# AutoComplete

`AutoComplete` 是带建议面板的文本输入组件。它基于自绘 `listbox` 实现，不依赖原生 `datalist`，因此可以更稳定地控制下拉样式、键盘交互、空状态和选项渲染，同时尽量保留 `Input` 的使用方式。

## Basic

最小用法只需要传入 `options`。组件会在输入时根据关键词过滤建议项，支持 `label`、`value`、`description` 和 `disabled`。

<AutoCompleteDemo />

## 常见场景

### 受控联想

使用 `value` / `onValueChange` 管理当前输入值时，可以同时拿到变化原因和被选中的建议项，适合做表单联动或提交前校验。

<AutoCompleteControlledDemo />

### 自定义展示

`renderOption` 可以完全接管单条建议项的渲染。配合 `textValue`、`keywords` 和 `description`，可以把“展示文本”和“搜索文本”分离开。

<AutoCompleteRenderDemo />

### 状态与样式

组件支持 `disabled`、`readOnly`、`openOnFocus`、`emptyText` 以及 `rootSx` / `dropdownSx` / `optionSx`。这使它既能做轻量联想，也能做更强定制的业务搜索框。

<AutoCompleteStateSxDemo />

## Usage

### 基础联想

```tsx
import { AutoComplete } from "@ldkj/web-ui";

const options = [
  { label: "北京", value: "北京", description: "华北中心" },
  { label: "上海", value: "上海", description: "华东中心" },
  { label: "深圳", value: "深圳", description: "华南中心" },
];

export function Example() {
  return <AutoComplete options={options} placeholder="请输入城市" />;
}
```

### 受控用法

```tsx
import * as React from "react";
import { AutoComplete } from "@ldkj/web-ui";

const options = [
  { label: "北京", value: "北京" },
  { label: "上海", value: "上海" },
  { label: "深圳", value: "深圳" },
];

export function ControlledExample() {
  const [value, setValue] = React.useState("");

  return (
    <AutoComplete
      value={value}
      options={options}
      placeholder="搜索城市"
      onValueChange={(nextValue) => setValue(nextValue)}
    />
  );
}
```

### 自定义渲染

```tsx
import {
  AutoComplete,
  type AutoCompleteRenderOptionState,
} from "@ldkj/web-ui";

const options = [
  {
    label: "上海虹桥",
    value: "SHA",
    textValue: "上海虹桥",
    description: "Shanghai Hongqiao",
    keywords: ["虹桥", "上海机场"],
  },
];

function renderOption(
  option: (typeof options)[number],
  state: AutoCompleteRenderOptionState,
) {
  return (
    <div>
      <div>{option.label}</div>
      <div>{option.description}</div>
      <div>{state.selected ? "已选" : state.active ? "高亮" : option.value}</div>
    </div>
  );
}

export function RenderExample() {
  return (
    <AutoComplete
      options={options}
      renderOption={renderOption}
      placeholder="搜索机场"
    />
  );
}
```

## API

### AutoComplete

`AutoComplete` 透传大部分 `InputProps`，但会接管 `defaultValue`、`list`、`onChange` 和 `value`，用于统一建议面板与输入框的状态。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 建议项列表 | `AutoCompleteOption[]` | `[]` |
| `value` | 受控输入值 | `string / number` | - |
| `defaultValue` | 非受控初始值 | `string / number` | - |
| `onChange` | 原生输入事件回调 | `React.ChangeEventHandler<HTMLInputElement>` | - |
| `onValueChange` | 输入值变化回调，附带变化原因和建议项 | `(value: string, meta: AutoCompleteValueChangeMeta) => void` | - |
| `onOptionSelect` | 点击或回车选中建议项时触发 | `(option: AutoCompleteOption, event: KeyboardEvent / MouseEvent) => void` | - |
| `filterOption` | 自定义本地过滤逻辑，传 `false` 可关闭本地过滤 | `AutoCompleteFilterOption / false` | 默认过滤 |
| `openOnFocus` | 聚焦时是否立即展开建议面板 | `boolean` | `true` |
| `emptyText` | 没有匹配项时显示的文案，传 `null` 可隐藏空状态 | `React.ReactNode` | `暂无匹配结果` |
| `renderOption` | 自定义建议项渲染 | `(option, state) => React.ReactNode` | - |
| `rootClassName` | 根容器类名 | `string` | - |
| `rootStyle` | 根容器原生样式 | `React.CSSProperties` | - |
| `rootSx` | 根容器 `sx` 样式 | `SxProps` | - |
| `dropdownClassName` | 下拉面板类名 | `string` | - |
| `dropdownStyle` | 下拉面板原生样式 | `React.CSSProperties` | - |
| `dropdownSx` | 下拉面板 `sx` 样式 | `SxProps` | - |
| `optionClassName` | 单条建议项类名 | `string` | - |
| `optionStyle` | 单条建议项原生样式 | `React.CSSProperties` | - |
| `optionSx` | 单条建议项 `sx` 样式 | `SxProps` | - |

### AutoCompleteOption

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 建议项展示内容 | `React.ReactNode` | - |
| `value` | 建议项实际值 | `string` | - |
| `disabled` | 是否禁用该项 | `boolean` | `false` |
| `description` | 次要描述文案 | `React.ReactNode` | - |
| `keywords` | 额外搜索关键词 | `string[]` | - |
| `textValue` | 搜索用文本，常用于 `label` 为 ReactNode 的场景 | `string` | - |

### AutoCompleteValueChangeMeta

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `reason` | 变化原因，`input` 表示手动输入，`select` 表示选择建议项 | `input / select` |
| `option` | 当 `reason = "select"` 时，对应的建议项 | `AutoCompleteOption / undefined` |
| `event` | 原生输入事件 | `React.ChangeEvent<HTMLInputElement>` |

## 行为规则 / 优先级

- 默认过滤会按 `value`、`textValue`、字符串类型的 `label`，以及 `keywords` 做包含匹配，全部转为小写后比较。
- `filterOption={false}` 时，组件不做本地过滤，直接展示传入的 `options`。
- 键盘交互遵循 `ArrowDown` / `ArrowUp` 切换、`Enter` 确认、`Escape` 关闭、`Tab` 收起。
- `ArrowDown` / `ArrowUp` 会跳过 `disabled` 项，并在列表中循环。
- 点击建议项后，输入框会回填该项的 `value`，并触发 `onOptionSelect` 与 `onValueChange(reason="select")`。
- `onChange` 仍然是原生输入事件回调，适合做底层监听；业务语义建议优先使用 `onValueChange`。
- 当 `emptyText={null}` 时，空状态面板会被隐藏，但下拉容器仍然遵循当前打开状态。

## Notes

- `label` 如果是 ReactNode，建议同时提供 `textValue`，否则默认过滤无法从复杂节点中提取可搜索文本。
- 如果建议项来自远程接口，建议关闭本地过滤并把搜索逻辑放到上层，避免“二次过滤”导致结果被意外隐藏。
- 建议始终配合 `label`、`aria-label` 或 `aria-labelledby` 使用，确保输入框具备可访问名称。
- `description` 更适合放辅助信息，不建议承载关键唯一值。
- 当你需要完全不同的交互模型时，可以考虑把 `renderOption` 与自定义 `filterOption` 一起使用，保持数据模型不变，只替换展示层。
