# Progress

`Progress` 用于展示任务完成度、配额使用、批处理进度和步骤占比。组件支持线形与圆形两种形态，并提供状态色和格式化文案。

## Basic

线形进度条适合列表、表单步骤和卡片中的横向展示。

<ProgressDemo />

## 常见场景

### 圆形进度

`type="circle"` 用 SVG 渲染环形进度，适合卡片指标、上传进度和仪表盘入口。

<ProgressCircleDemo />

### 状态与格式化

`status` 控制进度色；`format` 可把百分比改成业务文案。

<ProgressStatusDemo />

## Usage

```tsx
import { Progress } from "@ldkj/web-ui";

export function Example() {
  return (
    <Progress
      type="circle"
      value={18}
      max={24}
      showInfo
      format={(percent, value, max) => `${value}/${max} 人 · ${percent}%`}
    />
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前值 | `number` | `0` |
| `max` | 最大值 | `number` | `100` |
| `type` | 展示形态 | `"line" \| "circle"` | `"line"` |
| `showInfo` | 是否显示进度文案 | `boolean` | `false` |
| `status` | 状态色 | `"normal" \| "success" \| "warning" \| "exception"` | 达到 100% 时为 `"success"`，否则 `"normal"` |
| `size` | 圆形尺寸，单位 px | `number` | `96` |
| `strokeWidth` | 线宽；线形为高度，圆形为描边宽度 | `number` | `8` |
| `strokeColor` | 自定义进度色 | `string` | - |
| `trailColor` | 轨道色 | `string` | `"#e2e8f0"` |
| `format` | 自定义信息文案 | `(percent, value, max) => React.ReactNode` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |

其余属性继承原生 `div` 属性。

## 行为规则 / 优先级

- 百分比按 `value / max * 100` 计算，并限制在 `0` 到 `100` 之间。
- `max <= 0`、`NaN` 或非有限数字会按 `0%` 处理。
- `strokeColor` 存在时优先于 `status` 的默认颜色。
- `format` 接收四舍五入后的百分比、原始 `value` 与 `max`；未传时显示 `xx%`。
- 圆形进度只在 `showInfo=true` 时显示居中文案。

## Notes

- 线形进度适合展示连续流程，圆形进度适合展示单个指标。
- 圆形进度的 `size` 应大于 `strokeWidth * 3`，否则视觉空间会过于拥挤。
- 组件默认带 `role="progressbar"`、`aria-valuemin`、`aria-valuemax` 和 `aria-valuenow`。
