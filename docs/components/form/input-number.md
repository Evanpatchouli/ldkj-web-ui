# InputNumber

`InputNumber` 用于收集数量、金额、阈值、比例等数字内容。它基于 `Input` 封装原生 `type="number"`，保留浏览器的数字输入、校验和表单提交能力，并提供可选的失焦归一化能力。

## Basic

最小用法只需要传入数字相关约束。`InputNumber` 默认设置 `inputMode="decimal"`，移动端会优先唤起数字键盘。

<InputNumberDemo />

## 常见场景

### 区间与步进

使用 `min`、`max`、`step` 描述业务约束。默认情况下它们只参与原生表单校验；开启 `clampOnBlur` 后，组件会在失焦时把值修正到合法区间和步进。

<InputNumberRangeStepDemo />

### 金额与库存

金额、库存等业务字段通常建议用受控值承接输入内容，提交或失焦时再做格式化与精度处理。

<InputNumberBusinessDemo />

### Headless 行为

当 `InputNumber` 的结构无法满足需求时，可以使用 `useNumberInput` 绑定到 `Input` 或原生 `input`，保留数值解析、提交和事件合并能力。

<InputNumberHeadlessDemo />

### 状态

`InputNumber` 继承原生输入框状态，支持 `readOnly`、`disabled`、`required` 等属性。

<InputNumberStatesDemo />

### SX Styling

可以通过 `sx` 调整尺寸、颜色、圆角、阴影和聚焦态。

<InputNumberSxDemo />

## Usage

```tsx
import { InputNumber } from "@ldkj/web-ui";

export function Example() {
  return (
    <InputNumber
      name="quantity"
      min={1}
      max={999}
      step={1}
      placeholder="请输入数量"
      aria-label="采购数量"
    />
  );
}
```

受控用法建议保存字符串值，避免破坏 `-`、`1.`、空值等输入中间态：

```tsx
import * as React from "react";
import { InputNumber } from "@ldkj/web-ui";

export function ControlledExample() {
  const [value, setValue] = React.useState("25");

  return (
    <InputNumber
      value={value}
      onValueChange={(_, meta) => setValue(meta.valueAsString)}
      clampOnBlur
      min={0}
      max={100}
      step={5}
    />
  );
}
```

如果需要完全自定义结构，可以使用 `useNumberInput` 获取 headless 行为，再把 `getInputProps()` 返回值绑定到 `Input` 或原生 `input`：

```tsx
import { Input, useNumberInput } from "@ldkj/web-ui";

export function HeadlessExample() {
  const amount = useNumberInput({
    clampOnBlur: true,
    defaultValue: 25,
    max: 100,
    min: 0,
    step: 5,
  });

  return (
    <Input
      {...amount.getInputProps({
        "aria-label": "采购数量",
        placeholder: "请输入数量",
      })}
    />
  );
}
```

如果只需要监听解析后的数字值，也可以直接使用 `onValueChange`：

```tsx
import { InputNumber } from "@ldkj/web-ui";

export function ValueChangeExample() {
  return (
    <InputNumber
      min={0}
      step={1}
      onValueChange={(value) => {
        console.log(value);
      }}
    />
  );
}
```

## API

`InputNumber` 基于 `Input`，除 `type` 与 `inputMode` 由组件内部固定外，支持原生 `input` 的常用属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控值 | `string \| number \| readonly string[]` | - |
| `defaultValue` | 非受控默认值 | `string \| number \| readonly string[]` | - |
| `onChange` | 输入变化回调 | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - |
| `onValueChange` | 数值变化回调，返回解析后的数字和触发原因 | `(value: number \| null, meta: InputNumberValueChangeMeta) => void` | - |
| `onValueCommit` | 输入值提交回调，失焦或按下 Enter 时触发 | `(value: number \| null, meta: InputNumberValueChangeMeta) => void` | - |
| `min` | 原生最小值约束 | `number` | - |
| `max` | 原生最大值约束 | `number` | - |
| `step` | 原生步进约束 | `number` | - |
| `clampOnBlur` | 失焦时是否按 `min/max/step` 归一化 | `boolean` | `false` |
| `precision` | 失焦归一化后的固定小数位数 | `number` | - |
| `placeholder` | 占位提示 | `string` | - |
| `name` | 表单字段名 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `required` | 是否必填 | `boolean` | `false` |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容旧写法的类名字段 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

## 行为规则 / 优先级

- `InputNumber` 始终渲染为 `type="number"`，调用方不能覆盖为其他输入类型。
- `inputMode` 固定为 `decimal`，用于优化移动端键盘；如果需要整数校验，请配合 `step={1}` 和业务校验。
- 默认情况下，`min`、`max`、`step` 只使用浏览器原生校验语义，不会主动阻止临时输入非法值。
- 开启 `clampOnBlur` 后，失焦时先按 `min/max` 裁剪，再按 `step` 对齐，最后再次裁剪到边界内。
- `min`、`max`、`step`、`precision` 由 `InputNumber` 或 `useNumberInput` 统一用于失焦 / Enter 提交归一化。
- `onValueChange` 在输入时以 `reason="input"` 触发，在 `clampOnBlur` 提交归一化后以 `reason="commit"` 触发；通过 hook 的 `setValue` 主动设置时以 `reason="set"` 触发。
- `onValueCommit` 在失焦或按下 Enter 时触发；如果开启 `clampOnBlur`，提交值会先归一化。
- `onChange` 返回的是原生事件，`event.target.value` 仍然是字符串；需要数字时由业务按提交时机转换。

## Hooks

### useNumberInput

`useNumberInput` 是数字输入的 headless 行为层，用于自定义输入结构。它统一管理字符串展示值、解析后的数值、失焦 / Enter 提交、`clampOnBlur` 归一化和事件合并。普通业务优先使用 `InputNumber`，只有组件结构不满足时再使用 hook。

参数：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控展示值 | `string \| number \| null` | - |
| `defaultValue` | 非受控默认值 | `string \| number \| null` | `""` |
| `min` | 最小值约束 | `number` | - |
| `max` | 最大值约束 | `number` | - |
| `step` | 步进约束 | `number` | - |
| `clampOnBlur` | 提交时是否按约束归一化 | `boolean` | `false` |
| `precision` | 提交归一化后的固定小数位数 | `number` | - |
| `onValueChange` | 展示值变化或归一化提交时触发 | `(value, meta) => void` | - |
| `onValueCommit` | 失焦或按下 Enter 提交时触发 | `(value, meta) => void` | - |

返回值：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `value` | 当前输入框展示值 | `string` |
| `numberValue` | 当前解析后的数字，空值或非法临时值为 `null` | `number \| null` |
| `setValue` | 主动设置输入值 | `(value: string \| number \| null) => void` |
| `commitValue` | 主动提交并返回归一化结果 | `(value?: string \| number \| null) => { value, valueAsString }` |
| `getInputProps` | 合并输入控件属性和事件处理器 | `(props?: InputProps) => InputProps` |

## Notes

- 金额类字段如果有精度要求，建议保持字符串输入，提交时用业务规则统一格式化，避免浮点误差。
- 空值是合法输入中间态，不建议在 `onChange` 中直接 `Number("")`。
- 自定义结构时优先使用 `getInputProps()` 合并 `onChange`、`onBlur`、`onKeyDown`，避免手写展开顺序导致事件丢失。
- 建议配合 `label`、`aria-label` 或 `aria-labelledby` 提供可访问名称。
