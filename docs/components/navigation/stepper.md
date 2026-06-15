# Stepper

`Stepper` 用于展示 PC 端和通用页面中的流程进度，适合审批、发布、配置向导和任务履约状态。它提供与 `MobileStepper` 一致的基础行为：`items`、`current/defaultCurrent/onCurrentChange`、`status`、`clickable`、`linear` 与自定义渲染；同时扩展水平、垂直、连接线、内容区和导航式外观。

## Basic

配置 `items` 可以快速渲染横向流程。`progress` 会展示当前步骤内部进度。

<StepperBasicDemo />

## 常见场景

### 垂直内容

`orientation="vertical"` 会把当前步骤内容渲染在步骤下方，适合工单、物流和审批详情。

<StepperVerticalDemo />

### 受控切换

`current` / `onCurrentChange` 可与业务校验、路由或外部按钮联动；`linear=false` 允许非线性跳转。

<StepperControlledDemo />

### 状态与禁用

步骤可通过 `status` 显式标记为 `finish`、`process`、`error` 或 `wait`，也可以通过 `disabled` 禁止交互。

<StepperStatusDemo />

### 组合式 API

复杂内容可使用 `Stepper.Step` 组合，子节点会作为该步骤的内容。

<StepperCompoundDemo />

## Usage

```tsx
import { Stepper } from "@ldkj/web-ui";

export function Example() {
  return (
    <Stepper
      defaultCurrent={1}
      clickable
      items={[
        { label: "基础信息", description: "填写客户与合同资料" },
        { label: "方案配置", description: "确认服务、费用和规则" },
        { label: "提交审核", description: "推送给主管审批" },
      ]}
    />
  );
}
```

## API

### Stepper

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 配置式步骤项 | `StepperItem[]` | - |
| `current` | 受控当前步骤索引，从 `0` 开始 | `number` | - |
| `defaultCurrent` | 非受控默认步骤索引 | `number` | `0` |
| `onCurrentChange` | 当前步骤变化回调 | `(current, meta) => void` | - |
| `onStepClick` | 步骤点击回调 | `(index, meta) => void` | - |
| `status` | 当前步骤默认状态 | `"wait" \| "process" \| "finish" \| "error"` | `"process"` |
| `orientation` | 布局方向 | `"horizontal" \| "vertical"` | `"horizontal"` |
| `labelPlacement` | 水平模式下标题位置 | `"end" \| "bottom"` | `"bottom"` |
| `variant` | 视觉变体 | `"default" \| "dot" \| "navigation"` | `"default"` |
| `size` | 尺寸 | `"sm" \| "md" \| "lg"` | `"md"` |
| `clickable` | 是否允许点击步骤切换 | `boolean` | `false` |
| `linear` | 是否按线性流程限制跳转 | `boolean` | `true` |
| `disabled` | 是否整体禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `showConnector` | 是否显示连接线 | `boolean` | `true` |
| `showContent` | 是否显示当前步骤内容 | `boolean` | 垂直模式默认 `true` |
| `progress` | 当前步骤内部进度，限制在 `0-100` | `number` | - |
| `renderIcon` | 自定义步骤图标 | `(item, state) => React.ReactNode` | - |
| `renderLabel` | 自定义标题区域 | `(item, state) => React.ReactNode` | - |
| `listProps` | 透传给步骤列表 | `ol props` | - |
| `contentProps` | 透传给内容容器 | `div props` | - |
| `className` / `class` | 根节点类名 | `string` | - |
| `style` | 根节点样式 | `React.CSSProperties` | - |
| `sx` | 根节点 `sx` 样式 | `SxProps` | - |

### StepperItem

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 步骤唯一标识，未传时使用索引 |
| `label` | 步骤标题 | `React.ReactNode` |
| `description` | 步骤描述 | `React.ReactNode` |
| `optional` | 可选提示 | `React.ReactNode` |
| `content` | 步骤内容 | `React.ReactNode` |
| `status` | 覆盖该步骤状态 | `StepperStatus` |
| `disabled` | 禁用该步骤 | `boolean` |
| `icon` | 自定义图标内容 | `React.ReactNode` |
| `className` / `class` | 步骤项类名 | `string` |
| `style` | 步骤项样式 | `React.CSSProperties` |

## Compound API

| 子组件 | 说明 |
| --- | --- |
| `Stepper.Step` | 声明一个步骤，支持 `label`、`description`、`optional`、`status`、`disabled`、`icon`，子节点作为步骤内容 |

## 行为规则 / 优先级

- `items` 存在且非空时优先渲染配置式步骤；否则读取 `Stepper.Step` 子节点。
- `item.status` 优先级高于根组件 `status`；未显式传入时，当前步骤之前为 `finish`，当前步骤为 `process`，之后为 `wait`。
- `clickable=false` 时步骤只展示不响应点击；`readOnly=true` 保留展示但禁止交互。
- `linear=true` 时只允许点击当前步骤、已完成步骤或当前步骤之前的步骤；`linear=false` 允许跳转到任意未禁用步骤。
- `showContent` 不传时，垂直模式默认显示当前步骤内容，水平模式默认不显示。

## Notes

- `Stepper` 不内置业务校验；需要“下一步前校验”时应在外部按钮或 `onCurrentChange` 前置逻辑中处理。
- 移动端多步表单优先使用 [MobileStepper](/components/mobile/mobile-stepper)，它提供更适合窄屏的胶囊头部、内容保活和底部操作。
- 长标题建议配合 `labelPlacement="bottom"` 或垂直模式，避免横向空间拥挤。
