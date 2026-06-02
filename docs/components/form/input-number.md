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

受控用法：

```tsx
import { InputNumber, useInputNumberState } from "@ldkj/web-ui";

export function ControlledExample() {
  const amount = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 25,
    max: 100,
    min: 0,
    step: 5,
  });

  return <InputNumber {...amount.inputProps} />;
}
```

如果业务更希望把数字约束留在组件层，也可以只让 `useInputNumberState` 管理 `clampOnBlur` 和初始值，再把 `min`、`max`、`step` 直接传给 `InputNumber`。这种写法同样会在失焦时生效，因为最终执行归一化的是 `InputNumber` 本身：

```tsx
import { InputNumber, useInputNumberState } from "@ldkj/web-ui";

export function ControlledByComponentExample() {
  const amount = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 25,
  });

  return (
    <InputNumber
      {...amount.inputProps}
      min={0}
      max={100}
      step={5}
    />
  );
}
```

如果你希望 hook 自己就携带完整的数字约束，也可以把 `min`、`max`、`step` 一并传给 `useInputNumberState`，再直接展开到组件：

```tsx
import { InputNumber, useInputNumberState } from "@ldkj/web-ui";

export function ControlledByHookExample() {
  const amount = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 25,
    max: 100,
    min: 0,
    step: 5,
  });

  return <InputNumber {...amount.inputProps} />;
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
- `min`、`max`、`step`、`precision` 只要最终传到同一个 `InputNumber` 实例上，就会参与 `clampOnBlur` 的失焦归一化；`useInputNumberState` 本身不负责执行归一化，只负责接收并同步 `commit` 结果。
- `useInputNumberState` 会自动处理受控展示值与 `commit` 同步，推荐在需要 `clampOnBlur` 的场景中使用。
- `onValueChange` 在输入时以 `reason="input"` 触发，在 `clampOnBlur` 提交归一化后以 `reason="commit"` 触发。
- `onChange` 返回的是原生事件，`event.target.value` 仍然是字符串；需要数字时由业务按提交时机转换。

## Hooks

### useInputNumberState

`useInputNumberState` 用于管理数字输入的字符串展示值和解析后的数值。它会自动接住 `clampOnBlur` 的提交结果，因此业务不需要手写 `meta.reason === "commit"` 分支。数字约束可以由 hook 统一提供，也可以只在最终渲染的 `InputNumber` 上提供。

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `value` | 当前输入框展示值 | `string` |
| `numberValue` | 当前解析后的数字，空值或非法临时值为 `null` | `number \| null` |
| `setValue` | 主动设置输入值 | `(value: string \| number \| null) => void` |
| `inputProps` | 可直接展开到 `InputNumber` 上的属性 | `Pick<InputNumberProps, ...>` |

## Notes

- 金额类字段如果有精度要求，建议保持字符串输入，提交时用业务规则统一格式化，避免浮点误差。
- 空值是合法输入中间态，不建议在 `onChange` 中直接 `Number("")`。
- 需要失焦归一化的受控场景优先使用 `useInputNumberState`，避免手写重复同步逻辑。
- 建议配合 `label`、`aria-label` 或 `aria-labelledby` 提供可访问名称。
