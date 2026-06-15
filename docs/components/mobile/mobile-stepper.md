# MobileStepper

`MobileStepper` 是面向移动端的多步流程组件，适合 H5 表单、预约流程和窄屏向导。它与 `Stepper` 共享 `items`、`current/defaultCurrent/onCurrentChange`、`status`、`clickable`、`linear` 等基础行为，并扩展移动端胶囊头部、内容保活、指示器、滑动切换和底部操作区。

## Basic

默认 `indicator="titles"` 会渲染横向可滚动的胶囊步骤头，激活项显示标题，非激活项压缩为数字。

<MobileStepperBasicDemo />

## 常见场景

### 受控流程

`current` 可由业务状态控制，适合在进入下一步前做表单校验或接口提交。

<MobileStepperControlledDemo />

### 指示器形态

`indicator` 支持 `titles`、`dots`、`progress`、`text` 和 `none`，可以按页面密度选择。

<MobileStepperIndicatorDemo />

### 底部操作

设置 `showActions` 可使用默认上一页/下一页按钮；`renderActions` 可接管操作区。

<MobileStepperActionsDemo />

## Usage

```tsx
import { MobileStepper } from "@ldkj/web-ui";

export function Example() {
  return (
    <MobileStepper defaultCurrent={0} size="sm" showActions>
      <MobileStepper.Step label="商户信息" description="填写账号信息">
        填写商户名称、手机号和营业执照资料。
      </MobileStepper.Step>
      <MobileStepper.Step label="门店信息" description="填写初始门店">
        补充门店地址、联系人和营业时间。
      </MobileStepper.Step>
      <MobileStepper.Step label="确认提交" description="确认信息无误">
        检查资料后提交审核。
      </MobileStepper.Step>
    </MobileStepper>
  );
}
```

## API

### MobileStepper

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 配置式步骤项 | `MobileStepperItem[]` | - |
| `current` | 受控当前步骤索引，从 `0` 开始 | `number` | - |
| `defaultCurrent` | 非受控默认步骤索引 | `number` | `0` |
| `onCurrentChange` | 当前步骤变化回调 | `(current, meta) => void` | - |
| `onStepClick` | 点击步骤头回调 | `(index, meta) => void` | - |
| `onPrevious` | 点击上一页后的回调 | `(current, meta) => void` | - |
| `onNext` | 点击下一页后的回调 | `(current, meta) => void` | - |
| `onFinish` | 最后一步完成回调 | `(current, meta) => void` | - |
| `status` | 当前步骤默认状态 | `"wait" \| "process" \| "finish" \| "error"` | `"process"` |
| `size` | 胶囊尺寸 | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `indicator` | 指示器形态 | `"titles" \| "dots" \| "progress" \| "text" \| "none"` | `"titles"` |
| `indicatorPlacement` | 指示器位置 | `"top" \| "bottom"` | `"top"` |
| `clickable` | 是否允许点击步骤头切换 | `boolean` | `true` |
| `linear` | 是否按线性流程限制跳转 | `boolean` | `true` |
| `disabled` | 是否整体禁用 | `boolean` | `false` |
| `readOnly` | 是否只读 | `boolean` | `false` |
| `keepMounted` | 是否保留非激活内容 DOM | `boolean` | `true` |
| `swipeable` | 是否允许左右滑动切换 | `boolean` | `false` |
| `showActions` | 是否显示底部操作区 | `boolean` | `false` |
| `showInactiveLabels` | 胶囊头是否展示非激活标题 | `boolean` | `false` |
| `safeArea` | 底部操作区是否适配安全区 | `boolean` | `false` |
| `stickyActions` | 操作区是否吸附底部 | `boolean` | `false` |
| `progress` | `progress` 指示器或当前步骤内部进度 | `number` | 自动按步骤数计算 |
| `previousText` | 默认上一页按钮文案 | `React.ReactNode` | `上一步` |
| `nextText` | 默认下一页按钮文案 | `React.ReactNode` | `下一步` |
| `finishText` | 默认完成按钮文案 | `React.ReactNode` | `完成` |
| `renderIcon` | 自定义步骤图标 | `(item, state) => React.ReactNode` | - |
| `renderLabel` | 自定义标题文本 | `(item, state) => React.ReactNode` | - |
| `renderIndicatorItem` | 自定义单个标题胶囊 | `(item, state) => React.ReactNode` | - |
| `renderContent` | 自定义步骤内容 | `(item, state) => React.ReactNode` | - |
| `renderActions` | 自定义底部操作区 | `(actions) => React.ReactNode` | - |
| `headerProps` | 透传给头部指示器容器 | `div props` | - |
| `contentProps` | 透传给内容容器 | `div props` | - |
| `footerProps` | 透传给底部操作区 | `div props` | - |
| `previousButtonProps` | 透传给默认上一页按钮 | `ButtonProps` | - |
| `nextButtonProps` | 透传给默认下一页/完成按钮 | `ButtonProps` | - |
| `className` / `class` | 根节点类名 | `string` | - |
| `style` | 根节点样式 | `React.CSSProperties` | - |
| `sx` | 根节点 `sx` 样式 | `SxProps` | - |

### MobileStepperItem

与 `StepperItem` 保持一致：`key`、`label`、`description`、`optional`、`content`、`status`、`disabled`、`icon`、`className/class`、`style`。

## Compound API

| 子组件 | 说明 |
| --- | --- |
| `MobileStepper.Step` | 声明移动端步骤，支持 `label`、`description`、`status`、`disabled`、`icon`，子节点作为步骤内容 |

## 行为规则 / 优先级

- `items` 存在且非空时优先渲染配置式步骤；否则读取 `MobileStepper.Step` 子节点。
- 默认 `keepMounted=true`，非激活步骤内容会隐藏但保留 DOM，适合多步表单保留输入状态。
- `clickable=true` 只表示步骤头可交互；`linear=true` 时仍会限制只能回退或进入已完成步骤。
- 默认操作区只负责切换步骤和触发 `onFinish`，不内置表单校验。
- `renderActions` 存在时会完全接管底部操作区。

## Notes

- PC 或宽屏后台页面优先使用 [Stepper](/components/navigation/stepper)，移动端表单优先使用 `MobileStepper`。
- 表单校验建议放在外部 `current` 受控逻辑中，校验通过后再更新 `current`。
- 步骤很多时建议使用默认 `titles` 指示器，它支持横向滚动；极窄页面可改用 `dots` 或 `progress`。

