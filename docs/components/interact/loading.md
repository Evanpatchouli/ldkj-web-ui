# Loading

`Loading` 组合 `Spin` 与文案布局，用于段落、区块、遮罩和全屏加载状态。它适合表达“当前区域不可操作或等待数据返回”的状态。

## Basic

默认是行内加载提示；`text={null}` 可以只展示旋转图形。

<LoadingDemo />

## 常见场景

### 区块遮罩

`variant="overlay"` 会把加载层覆盖在子内容上，适合列表刷新、卡片局部提交和表格二次请求。

<LoadingOverlayDemo />

### 受控状态与延迟

`spinning` 控制显示状态，`delay` 用于避免极短请求造成闪烁。

<LoadingStateDemo />

## Usage

```tsx
import { Loading } from "@ldkj/web-ui";

export function Example() {
  return (
    <Loading variant="overlay" text="正在刷新订单..." spinning>
      <div className="rounded-md border border-slate-200 p-4">
        订单列表内容
      </div>
    </Loading>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 加载文案，传 `null` 隐藏 | `React.ReactNode` | `"加载中..."` |
| `variant` | 布局模式 | `"inline" \| "block" \| "overlay" \| "fullscreen"` | `"inline"` |
| `size` | `Spin` 尺寸 | `number \| string` | `18` |
| `tone` | `Spin` 色调 | `SpinTone` | `"primary"` |
| `spinning` | 是否展示加载状态 | `boolean` | `true` |
| `delay` | 延迟显示时间，单位 ms | `number` | `0` |
| `children` | 被遮罩或包裹的内容 | `React.ReactNode` | - |
| `className` | 加载层自定义类名 | `string` | - |
| `class` | 加载层类名别名 | `string` | - |

其余属性继承原生 `div` 属性，作用在加载提示节点上。

## 行为规则 / 优先级

- 无 `children` 时，`variant` 决定加载提示自身布局。
- 有 `children` 时，组件会创建 `relative` 包裹层；只有 `overlay` 与 `fullscreen` 会覆盖子内容。
- `delay` 只延迟显示，不延迟隐藏；`spinning=false` 会立即移除加载提示。
- `variant="fullscreen"` 使用固定定位，适合页面级提交，不建议在普通卡片中使用。

## Notes

- 局部刷新建议优先使用 `overlay`，避免用户误操作正在刷新的区域。
- 请求非常快时设置 `delay={150}` 到 `300`，可以减少闪烁。
- `Loading` 带 `aria-live="polite"` 与 `role="status"`；文案应说明具体动作，如“正在刷新订单”。
