# Spin

`Spin` 是轻量加载指示器，适合按钮内、表格单元格、局部状态位和短时异步操作。组件只渲染旋转图形，不负责遮罩和文案布局；需要区块加载时使用 `Loading`。

## Basic

通过 `size` 调整尺寸，数字会按 `px` 处理；`strokeWidth` 控制环宽。

<SpinDemo />

## 常见场景

### 状态色

`tone` 用于匹配业务反馈色。它只改变视觉，不改变语义；无障碍语义仍由 `label` 描述。

<SpinToneDemo />

### 行内组合

在按钮、提示文案或状态栏中使用时，推荐显式传入 `label`，并让外层负责文案布局。

<SpinInlineDemo />

## Usage

```tsx
import { Button, Spin } from "@ldkj/web-ui";

export function Example() {
  return (
    <Button size="sm">
      <span className="inline-flex items-center gap-2">
        <Spin size={14} strokeWidth={2} label="提交中" />
        提交中
      </span>
    </Button>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸，数字按 `px` 处理 | `number \| string` | `18` |
| `strokeWidth` | 环宽，数字按 `px` 处理 | `number \| string` | `2` |
| `tone` | 活动色调 | `"primary" \| "muted" \| "success" \| "warning" \| "danger"` | `"primary"` |
| `label` | 屏幕阅读器读到的加载说明 | `string` | `"loading"` |
| `spinning` | 是否渲染旋转图形 | `boolean` | `true` |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |

其余属性继承原生 `span` 属性。

## 行为规则 / 优先级

- `spinning=false` 时直接返回 `null`，适合在调用处保留统一 JSX。
- `style` 会覆盖组件内联的 `width`、`height`、`borderWidth`，谨慎同时传入。
- `className` 与 `class` 会追加到默认类名之后，可覆盖动画、边框或颜色。
- `tone` 只影响颜色，不会自动设置成功、错误等业务语义。

## Notes

- `Spin` 默认带 `role="status"` 和隐藏文案；业务场景中建议传入更具体的 `label`。
- 行内使用时可以传 `size="1em"`，让指示器跟随字体大小。
- 长时间加载、带遮罩或带延迟展示的场景应使用 `Loading`。
