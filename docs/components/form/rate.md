# Rate

`Rate` 用于星级评分、满意度打分和简单反馈收集。它支持受控与非受控两种模式，提供悬停预览、键盘操作、表单提交能力，并保留了 `className`、`class`、`style` 和 `sx` 这些常用扩展入口。

## Basic

最小用法通常只需要提供 `value` 和 `onChange`，即可得到一个可交互的评分控件。

<RateBasicDemo />

## 无边框

`borderless` 会去掉外层的边框、背景和阴影，适合嵌入卡片正文、表格单元格或浅色内容块中。

<RateBorderlessDemo />

## 常见场景

### 可清空评分

当用户再次点击当前星级时，可以把评分清空。这个行为适合反馈类场景，允许用户表达“暂不评分”。

<RateClearableDemo />

### 表单提交

传入 `name` 后，`Rate` 会把当前值同步到隐藏表单字段，能够直接参与原生表单提交。

<RateFormDemo />

### 状态与数量

`Rate` 支持禁用、只读和自定义星级总数，适合用于展示历史评分或更细粒度的打分刻度。

<RateStatesDemo />

## Usage

受控用法：

```tsx
import * as React from "react";
import { Rate } from "@ldkj/web-ui";

export function Example() {
  const [value, setValue] = React.useState(4);

  return <Rate value={value} onChange={setValue} size="lg" />;
}
```

表单用法：

```tsx
import * as React from "react";
import { Rate } from "@ldkj/web-ui";

export function FormExample() {
  const [submitted, setSubmitted] = React.useState<number | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(Number(formData.get("serviceRate")));
      }}
      style={{ display: "grid", gap: 12 }}
    >
      <Rate name="serviceRate" defaultValue={4} />
      <button type="submit">提交</button>
      <div>表单值：{submitted === null ? "尚未提交" : submitted}</div>
    </form>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控评分值 | `number` | - |
| `defaultValue` | 非受控默认评分值 | `number` | `0` |
| `count` | 星级总数 | `number` | `5` |
| `allowClear` | 再次点击当前值时是否清空 | `boolean` | `true` |
| `borderless` | 是否移除外层边框、背景与阴影 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `name` | 原生表单字段名 | `string` | - |
| `onChange` | 评分变更回调 | `(value: number) => void` | - |
| `onHoverChange` | 悬停预览值变更回调 | `(value: number \| null) => void` | - |
| `size` | 星星尺寸 | `"sm" \| "md" \| "lg"` | `"md"` |
| `character` | 自定义评分图标 | `React.ReactNode` | 星形图标 |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容旧写法的类名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |

## 行为规则 / 优先级

- `value` 优先于 `defaultValue`。一旦传入 `value`，组件就进入受控模式。
- 悬停预览只是一种临时状态，鼠标移出后会恢复到当前值。
- `allowClear` 仅影响“再次点击当前值”这一条路径，不会改变普通点击的新值写入。
- `borderless` 只影响容器视觉外壳，不会改变星级、键盘或表单行为。
- `disabled` 和 `readOnly` 都会阻止交互，但 `readOnly` 更适合“保留展示、禁止修改”的只读场景。
- 如果同时传入 `name`，组件会通过隐藏字段参与原生表单提交，提交值始终是当前评分的字符串。

## Notes

- 建议始终配合 `aria-label` 或 `aria-labelledby` 使用，确保评分组有清晰的可访问名称。
- `count` 最小值会被约束为 `1`，传入非法值时会自动回落到安全范围。
- 如果业务需要更强的视觉定制，可以优先用 `sx` 调整外层容器，再用 `character` 替换图标。
- 读写分离的场景建议使用受控模式，这样能更容易把评分和表单状态、业务校验统一起来。
