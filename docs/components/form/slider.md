# Slider

`Slider` 是对原生 `input[type="range"]` 的轻量封装，用于连续数值、比例、音量、进度、预算上限等需要拖拽调整的场景。组件保留浏览器原生拖拽、键盘和表单语义，同时补齐本库统一的视觉样式、`trackSize`、`thumbSize`、`class` 兼容字段和 `sx` 样式入口。

## Basic

最小可用示例只需要提供范围、默认值和可访问名称。`min`、`max`、`step` 都沿用原生 range 属性。

<SliderBasicDemo />

## 常见场景

### 受控反馈

使用 `value` / `onValueChange` 管理当前值，可以把滑块变化实时同步到业务文案、预览面板或筛选条件。

<SliderControlledDemo />

### 步进档位

使用 `step` 描述固定档位，例如 5%、50 元、15 分钟。步进约束由浏览器原生 range 行为处理，业务只需要接收最终数字。

<SliderStepDemo />

### 尺寸、状态与样式

`trackSize` 控制轨道粗细，`thumbSize` 控制滑块头尺寸。它们适合做常规尺寸调整；如果要统一主题色，再通过 `sx` 覆盖 CSS 变量和 thumb 伪元素。

<SliderStateDemo />

## Usage

### 基础用法

```tsx
import { Slider } from "@ldkj/web-ui";

export function Example() {
  return <Slider min={0} max={100} defaultValue={35} aria-label="完成进度" />;
}
```

### 受控用法

```tsx
import * as React from "react";
import { Slider } from "@ldkj/web-ui";

export function ControlledExample() {
  const [value, setValue] = React.useState(45);

  return (
    <Slider
      min={0}
      max={100}
      step={5}
      value={value}
      onValueChange={setValue}
      aria-label="音量"
    />
  );
}
```

### 调整轨道和滑块头尺寸

```tsx
import { Slider } from "@ldkj/web-ui";

export function SizeExample() {
  return (
    <Slider
      min={0}
      max={100}
      defaultValue={64}
      trackSize={10}
      thumbSize={22}
      aria-label="完成度"
    />
  );
}
```

### 自定义样式

```tsx
import { Slider } from "@ldkj/web-ui";

export function StyledExample() {
  return (
    <Slider
      min={0}
      max={100}
      defaultValue={76}
      trackSize={10}
      thumbSize={22}
      sx={{
        "--ldkj-slider-fill": "#16a34a",
        "--ldkj-slider-track": "#dcfce7",
        "&::-webkit-slider-thumb": {
          backgroundColor: "#16a34a",
        },
        "&::-moz-range-thumb": {
          backgroundColor: "#16a34a",
        },
      }}
      aria-label="完成度"
    />
  );
}
```

## API

`Slider` 基于原生 `input[type="range"]`，除下表外，还会透传常用原生输入属性，例如 `name`、`disabled`、`aria-*`、`form`、`tabIndex`、`required`、`autoFocus` 等。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控值 | `number` | - |
| `defaultValue` | 非受控初始值，来自原生 `input` 属性 | `string \| number \| readonly string[]` | - |
| `min` | 最小值 | `string \| number` | - |
| `max` | 最大值 | `string \| number` | - |
| `step` | 步进值 | `string \| number` | - |
| `trackSize` | 轨道粗细。数字自动转换为 `px`，字符串按 CSS 长度值透传 | `number \| string` | `8px` |
| `thumbSize` | 滑块头尺寸。数字自动转换为 `px`，字符串按 CSS 长度值透传 | `number \| string` | `16px` |
| `onValueChange` | 数值变化回调，返回解析后的数字 | `(value: number) => void` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容旧写法的类名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口，支持伪元素和 CSS 变量 | `SxProps` | - |

## 行为规则 / 优先级

- `value` 优先于 `defaultValue`，传入 `value` 后组件按受控模式工作。
- `onValueChange` 在原生 range 值变化时触发，返回 `Number(event.currentTarget.value)`。
- `min`、`max`、`step` 完全遵循浏览器原生规则，不会额外做业务层裁剪。
- `trackSize` 和 `thumbSize` 会写入 CSS 变量，影响默认轨道高度和 thumb 宽高。
- `disabled` 保留原生不可交互语义，会影响鼠标、键盘和辅助技术行为。
- 轨道填充比例根据当前值、`min` 和 `max` 计算；当 `max <= min` 时填充比例回退为 0。
- 样式合并顺序为默认样式、`style`、`sx`，因此 `sx` 更适合做最终主题覆盖。

## Notes

- `Slider` 适合连续或近似连续的数值调整，不建议替代单选、分段按钮或枚举选择。
- 没有可见标签时，请提供 `aria-label` 或 `aria-labelledby`，避免只留下无名称的滑块。
- 如果需要双滑块区间、刻度标记、拖拽气泡或 tooltip，建议扩展专用组件，不要把复杂交互继续堆在基础 `Slider` 上。
- 通过 `sx` 覆盖 thumb 颜色时需要同时处理 `::-webkit-slider-thumb` 和 `::-moz-range-thumb`，以兼顾 Chromium/Safari 与 Firefox。
