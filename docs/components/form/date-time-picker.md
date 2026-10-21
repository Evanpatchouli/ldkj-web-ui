# DateTimePicker

选择本地日期和精确到秒的 24 小时制时间。面板包含单选日历、循环时分秒滚轮和快捷操作，点击“确定”后才向外提交。

## Basic

使用 `value` 和 `onChange` 保存受控值。空值传入 `undefined`，首次打开时草稿为今天零点。组件不维护已提交值，业务需要在回调中更新 `value`。

<DateTimePickerBasicDemo />

## 常见场景

### 编辑任务时间、禁用与样式

传入已有 `Date` 时，打开面板会恢复该日期及时间；选日期会保留草稿中的时分秒。`disabled` 同时禁止打开和清除，空值时显示 `placeholder`。`className`、`class`、`style`、`sx` 作用于触发按钮，外层默认占满父容器宽度，通过父容器控制整体宽度。

<DateTimePickerStatesDemo />

### 快速排期

“今天零点”将草稿设为今天 `00:00:00`；“此刻”将草稿设为当前本地时间并去掉毫秒。两者都需要再点击“确定”提交，适合发布、执行任务、活动开始等排期。

### 表单必填与重置

`Form.Item` 可直接绑定 `DateTimePicker`，值类型为 `Date | undefined`。清除后必填校验会失败，调用 `form.resetFields()` 可恢复初始值。所有内部按钮均为 `type="button"`，选择或确认日期不会意外提交表单。

<DateTimePickerFormDemo />

## Usage

```tsx
import * as React from "react";
import { DateTimePicker, Label } from "@ldkj/web-ui";
import "@ldkj/web-ui/style.css";

export function PublishSchedule() {
  const [publishAt, setPublishAt] = React.useState<Date>();
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <Label htmlFor="publish-time">发布时间</Label>
      <DateTimePicker
        id="publish-time"
        value={publishAt}
        onChange={setPublishAt}
        placeholder="选择发布时间"
        aria-describedby="publish-time-help"
      />
      <small id="publish-time-help">时间按当前设备时区选择，精确到秒。</small>
    </div>
  );
}
```

## API

根入口导出 `DateTimePicker` 和 `DateTimePickerProps`，支持通过 `ref` 获取触发按钮。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 触发按钮 ID，用于关联外部 Label | `string` | 自动生成内部 ID |
| `value` | 已提交的本地日期时间 | `Date` | `undefined` |
| `onChange` | 确定或清除时调用；清除传入 `undefined` | `(date?: Date) => void` | - |
| `placeholder` | 空值时的提示 | `string` | `选择日期和时间` |
| `disabled` | 禁用打开及清除 | `boolean` | `false` |
| `className` / `class` | 触发按钮自定义类名 | `string` | - |
| `style` | 触发按钮内联样式 | `React.CSSProperties` | - |
| `sx` | 本库样式入口，覆盖内联样式中的同名设置 | `SxProps` | - |
| `aria-label` / `aria-labelledby` | 触发按钮的无障碍名称 | `string` | - |
| `aria-describedby` | 关联说明文本 | `string` | - |
| `aria-invalid` | 标识字段校验状态 | `React.AriaAttributes["aria-invalid"]` | - |
| `onBlur` | 触发按钮失焦回调；打开面板的焦点转移也可能触发 | `React.FocusEventHandler<HTMLButtonElement>` | - |

## 行为规则 / 优先级

1. 每次打开都从当前 `value` 复制草稿，未选值时从今天零点开始。传入的 `Date` 不会被原地修改。
2. 日历选择仅更新年月日，时间列仅更新相应时、分、秒。毫秒统一归零；时间使用浏览器本地时区和原生 `Date` 的夏令时归一化规则。
3. 时间列循环取值：时为 `00–23`，分和秒为 `00–59`，跨边界不进位到其他列或日期。
4. 点击“确定”调用一次 `onChange(new Date(draft))` 并关闭；取消、Escape、点击外部只关闭，草稿不提交。面板打开期间外部 `value` 的更新将在下一次打开时载入。
5. 有值且未禁用时显示独立清除按钮，点击后立即调用 `onChange(undefined)` 并关闭。没有 `onChange` 或业务不更新 `value` 时，触发按钮保持原值。
6. 显示格式固定为 `yyyy-MM-dd HH:mm:ss`，不提供手工文本输入、范围选择或日期限制 API。

## Notes

### A11Y 与键盘

- 通过 `Label htmlFor` + `id`，或 `aria-label` / `aria-labelledby` 提供字段名称；清除按钮拥有独立的“清除日期和时间”名称。
- 触发按钮支持 Enter / Space 打开。面板具有带标题的 dialog 语义，打开时焦点移入面板，Escape 关闭后焦点返回触发按钮；Tab 可访问日历、时间列与操作按钮。
- 日历使用方向键移动日期，PageUp / PageDown 切换月份；时间列使用 ↑ / ↓ 调整一格、PageUp / PageDown 调整五格、Home / End 到首尾值，也可用鼠标点击可见选项。
- 每列使用 listbox、option、`aria-selected` 和 `aria-activedescendant` 描述当前值；选项自身不占用额外 Tab 位。

### 性能与边界

- 每个时间列只渲染当前值附近的 11 个选项，滚动支持有限惯性和自动吸附；系统开启减少动态效果时直接逐格更新。
- 面板关闭后卸载内容并清理滚轮监听、定时器和动画帧。窄屏下日历与时间列上下排列，面板根据可用高度滚动。
- `value` 必须是有效的 `Date`；字符串或时间戳请在业务层转换。接口提交可使用 `toISOString()` 或时间戳，并明确服务端时区约定。
- 组件不生成原生表单字段。使用本库 `Form` 收集值，或在业务提交事件中读取受控状态。
