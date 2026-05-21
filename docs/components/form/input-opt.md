# InputOPT

`InputOPT` 是一次性验证码输入组件。组件名沿用项目既有命名以保持兼容，语义上对应常见的 OTP / PinInput 场景。

组件内部使用一个真实 `input` 承接输入、自动填充和表单提交，再用多个槽位展示字符，因此可以稳定支持线性输入、连续删除、粘贴分发、自动完成回调和无障碍访问。

## Basic

默认渲染 6 位数字验证码。首次进入页面时会自动聚焦到第一个未填写槽位，输入过程中始终只能填写第一个未填写的位置。

<InputOPTDemo />

## 常见场景

### 粘贴与分隔符

验证码常见于短信、邮箱和双因素认证场景。粘贴 `123-456`、`123 456` 这类文本时，可以先用 `pasteTransformer` 清洗，再由组件按顺序填入槽位。

<InputOPTPasteDemo />

### 字母数字与掩码

如果验证码不是纯数字，可以切换 `type`。`mask` 只影响视觉展示，不改变 `value`、`onChange` 和表单提交值。

<InputOPTMaskDemo />

### 表单提交

传入 `name` 后，`InputOPT` 会通过内部真实输入参与原生表单提交。

<InputOPTFormDemo />

### 状态

支持错误、只读和禁用状态。错误态只负责视觉表达，校验时机仍由表单或业务层控制。

<InputOPTStatesDemo />

### SX Styling

可以通过 `sx` 定制根节点，也可以基于槽位上的 `data-active`、`data-filled` 做主题化样式。

<InputOPTSxDemo />

## Usage

```tsx
import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";

export function Example() {
  const [code, setCode] = React.useState("");

  return (
    <InputOPT
      value={code}
      length={6}
      name="otp"
      onChange={setCode}
      onComplete={(value) => console.log("验证码已填满", value)}
      aria-label="短信验证码"
    />
  );
}
```

非受控用法：

```tsx
import { InputOPT } from "@ldkj/web-ui";

export function UncontrolledExample() {
  return <InputOPT defaultValue="12" length={6} name="otp" />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控验证码值 | `string` | - |
| `defaultValue` | 非受控默认值 | `string` | `""` |
| `length` | 验证码位数 | `number` | `6` |
| `onChange` | 值变化回调，返回过滤后的字符串 | `(value: string) => void` | - |
| `onComplete` | 填满所有位后触发 | `(value: string) => void` | - |
| `type` | 字符类型过滤规则 | `"numeric" \| "alphabetic" \| "alphanumeric"` | `"numeric"` |
| `pattern` | 自定义单字符过滤规则，优先于 `type` | `RegExp \| string` | - |
| `pasteTransformer` | 粘贴内容进入过滤前的转换函数 | `(value: string) => string` | - |
| `mask` | 是否视觉掩码展示，传字符串可自定义掩码字符 | `boolean \| string` | `false` |
| `placeholder` | 空槽位占位字符，仅取第一个字符 | `string` | `""` |
| `autoFocus` | 挂载后是否自动聚焦 | `boolean` | `true` |
| `oneTimeCode` | 是否启用一次性验证码自动填充语义 | `boolean` | `true` |
| `name` | 表单字段名 | `string` | - |
| `required` | 是否参与原生必填校验 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `invalid` | 是否展示错误态 | `boolean` | `false` |
| `size` | 槽位尺寸 | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | 槽位视觉风格 | `"outline" \| "filled" \| "underline"` | `"outline"` |
| `separator` | 槽位间分隔内容 | `React.ReactNode \| ((index: number) => React.ReactNode)` | - |
| `className` | 根节点类名 | `string` | - |
| `class` | 兼容旧写法的根节点类名字段 | `string` | - |
| `inputClassName` | 内部真实输入类名 | `string` | - |
| `slotClassName` | 单个槽位类名 | `string` | - |
| `style` | 根节点原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `aria-label` | 内部真实输入的可访问名称 | `string` | `"一次性验证码"` |

此外，组件会透传常用原生 `input` 属性，如 `id`、`form`、`autoComplete`、`inputMode`、`onFocus`、`onBlur`、`onKeyDown`、`onPaste` 等。

## 行为规则 / 优先级

- 输入永远发生在第一个未填写位置；点击任意槽位都会聚焦真实输入，并把光标同步到当前值末尾。
- `Backspace` 与 `Delete` 都会删除最后一位，长按会按顺序向前逐位删除。
- 粘贴时会从第一个未填写位置继续填充，执行顺序为 `pasteTransformer -> pattern/type 过滤 -> length 截断`。
- `pattern` 存在时优先作为单字符过滤规则；未传 `pattern` 时使用 `type`。
- `onComplete` 只在新的完整验证码首次出现时触发；删除后再次填满会重新触发。
- `mask` 只影响槽位展示，不影响真实值、表单提交值和回调值。
- `oneTimeCode=true` 时，内部输入会使用 `autoComplete="one-time-code"`。

## Notes

- 一个页面存在多个 `InputOPT` 时，建议只有主验证码输入保留默认 `autoFocus`，其他示例或备用输入设置 `autoFocus={false}`。
- 验证码位数变化时，超出部分会被截断，最小位数为 `1`。
- 建议始终提供业务语义明确的 `aria-label`，如“短信验证码”“邮箱验证码”。
- 如果需要服务端提交，优先传入 `name`，让组件参与标准表单链路。
